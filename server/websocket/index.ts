import { Server as HTTPServer } from 'http'
import { Server as SocketIOServer } from 'socket.io'
import { defineEventHandler } from 'h3'
import type { H3Event } from 'h3'

// Extend Socket.IO socket type to include custom properties
declare module 'socket.io' {
  interface Socket {
    userId?: string
    isAuthenticated?: boolean
    userData?: any
  }
}

// WebSocket event types based on design document
interface WebSocketMessage {
  id: string
  type: string
  payload: any
  timestamp: number
  userId?: string
  room?: string
}

interface TrafficIncidentEvent {
  type: 'incident_created' | 'incident_updated' | 'incident_resolved'
  incidentId: string
  location: { lat: number; lng: number }
  incidentType: 'accident' | 'construction' | 'jam' | 'closure' | 'flood'
  severity: 'low' | 'medium' | 'high' | 'critical'
  description: string
  reporterId?: string
  timestamp: Date
  affectedRoutes: string[]
}

interface TrafficFlowEvent {
  type: 'flow_update'
  segmentId: string
  location: { lat: number; lng: number }
  speed: number // km/h
  congestionLevel: 'free' | 'moderate' | 'heavy' | 'blocked'
  timestamp: Date
  confidence: number // 0-1
}

// In-memory storage for development (replace with Redis in production)
const connectedClients = new Map<string, any>()
const activeRooms = new Map<string, Set<string>>()
const trafficIncidents = new Map<string, TrafficIncidentEvent>()
const trafficFlows = new Map<string, TrafficFlowEvent>()

// WebSocket server instance
let io: SocketIOServer | null = null

export function initializeWebSocketServer(httpServer: HTTPServer) {
  io = new SocketIOServer(httpServer, {
    cors: {
      origin: process.env.NODE_ENV === 'production'
        ? ['https://smkn2-singosari.sch.id']
        : ['http://localhost:3000', 'http://127.0.0.1:3000'],
      methods: ['GET', 'POST'],
      credentials: true
    },
    transports: ['websocket', 'polling'],
    pingTimeout: 60000,
    pingInterval: 25000,
    maxHttpBufferSize: 1e6, // 1MB
    connectTimeout: 10000
  })

  // Authentication middleware
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token

      if (!token) {
        // Allow anonymous connections for basic features
        socket.userId = `anon_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        socket.isAuthenticated = false
        return next()
      }

      // For now, accept any token as valid (simplified auth for development)
      // In production, implement proper JWT verification
      socket.userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      socket.isAuthenticated = true
      socket.userData = { userId: socket.userId }

      next()
    } catch (error) {
      console.error('WebSocket authentication error:', error)
      next(new Error('Authentication failed'))
    }
  })

  // Connection handling
  io.on('connection', (socket) => {
    console.log(`Client connected: ${socket.id} (User: ${socket.userId})`)

    // Store client connection
    connectedClients.set(socket.id, {
      socket,
      userId: socket.userId,
      connectedAt: new Date(),
      rooms: new Set<string>(),
      subscriptions: new Map<string, any>()
    })

    // Handle subscription to traffic updates
    socket.on('subscribe', (message: WebSocketMessage) => {
      handleSubscription(socket, message)
    })

    // Handle traffic incident reports
    socket.on('report_incident', (message: WebSocketMessage) => {
      handleIncidentReport(socket, message)
    })

    // Handle traffic flow updates (for future sensor integration)
    socket.on('flow_update', (message: WebSocketMessage) => {
      handleFlowUpdate(socket, message)
    })

    // Handle room joining/leaving
    socket.on('join_room', (message: WebSocketMessage) => {
      handleRoomJoin(socket, message)
    })

    socket.on('leave_room', (message: WebSocketMessage) => {
      handleRoomLeave(socket, message)
    })

    // Handle disconnection
    socket.on('disconnect', (reason) => {
      handleDisconnection(socket, reason)
    })

    // Handle connection errors
    socket.on('error', (error) => {
      console.error(`Socket error for ${socket.id}:`, error)
    })

    // Send welcome message
    socket.emit('connected', {
      id: `conn_${Date.now()}`,
      type: 'connection_established',
      payload: {
        clientId: socket.id,
        userId: socket.userId,
        isAuthenticated: socket.isAuthenticated,
        serverTime: new Date().toISOString()
      },
      timestamp: Date.now()
    } as WebSocketMessage)
  })

  // Periodic cleanup and health checks
  setInterval(() => {
    cleanupInactiveConnections()
  }, 300000) // 5 minutes

  console.log('WebSocket server initialized')
  return io
}

export function getSocketIOServer(): SocketIOServer | null {
  return io
}

// Subscription handling
function handleSubscription(socket: any, message: WebSocketMessage) {
  try {
    const { channel, filters } = message.payload
    const subscriptionId = `sub_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // Validate subscription request
    if (!channel || !filters) {
      socket.emit('error', {
        id: message.id,
        type: 'subscription_error',
        payload: { error: 'Invalid subscription parameters' },
        timestamp: Date.now()
      } as WebSocketMessage)
      return
    }

    // Join appropriate rooms based on filters
    if (filters.location) {
      const { lat, lng, radius = 10 } = filters.location
      const geoRoom = `geo:${lat.toFixed(2)}:${lng.toFixed(2)}:${radius}`
      socket.join(geoRoom)

      // Track room membership
      if (!activeRooms.has(geoRoom)) {
        activeRooms.set(geoRoom, new Set())
      }
      activeRooms.get(geoRoom)?.add(socket.id)

      const clientData = connectedClients.get(socket.id)
      if (clientData) {
        clientData.rooms.add(geoRoom)
        clientData.subscriptions.set(subscriptionId, { channel, filters, room: geoRoom })
      }
    }

    // Send confirmation
    socket.emit('subscription_confirmed', {
      id: message.id,
      type: 'subscription_confirmed',
      payload: {
        subscriptionId,
        activeFilters: filters,
        initialData: getInitialTrafficData(filters)
      },
      timestamp: Date.now()
    } as WebSocketMessage)

  } catch (error) {
    console.error('Subscription error:', error)
    socket.emit('error', {
      id: message.id,
      type: 'subscription_error',
      payload: { error: 'Failed to process subscription' },
      timestamp: Date.now()
    } as WebSocketMessage)
  }
}

// Incident report handling
function handleIncidentReport(socket: any, message: WebSocketMessage) {
  try {
    const incidentData = message.payload

    // Validate incident data
    if (!incidentData.location || !incidentData.type || !incidentData.description) {
      socket.emit('error', {
        id: message.id,
        type: 'report_error',
        payload: { error: 'Invalid incident report data' },
        timestamp: Date.now()
      } as WebSocketMessage)
      return
    }

    // Create incident event
    const incident: TrafficIncidentEvent = {
      type: 'incident_created',
      incidentId: `inc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      location: incidentData.location,
      incidentType: incidentData.type,
      severity: incidentData.severity || 'medium',
      description: incidentData.description,
      reporterId: socket.userId,
      timestamp: new Date(),
      affectedRoutes: incidentData.affectedRoutes || []
    }

    // Store incident
    trafficIncidents.set(incident.incidentId, incident)

    // Broadcast to relevant rooms
    broadcastToNearbyClients(incident.location, 'traffic_incident', {
      id: `incident_${Date.now()}`,
      type: 'traffic_incident',
      payload: {
        incidentId: incident.incidentId,
        action: 'created',
        data: incident
      },
      timestamp: Date.now()
    })

    // Send confirmation to reporter
    socket.emit('incident_reported', {
      id: message.id,
      type: 'incident_reported',
      payload: {
        incidentId: incident.incidentId,
        status: 'received',
        message: 'Incident report submitted successfully'
      },
      timestamp: Date.now()
    } as WebSocketMessage)

  } catch (error) {
    console.error('Incident report error:', error)
    socket.emit('error', {
      id: message.id,
      type: 'report_error',
      payload: { error: 'Failed to process incident report' },
      timestamp: Date.now()
    } as WebSocketMessage)
  }
}

// Flow update handling (for future sensor integration)
function handleFlowUpdate(socket: any, message: WebSocketMessage) {
  try {
    const flowData = message.payload

    const flow: TrafficFlowEvent = {
      type: 'flow_update',
      segmentId: flowData.segmentId || `seg_${Date.now()}`,
      location: flowData.location,
      speed: flowData.speed,
      congestionLevel: flowData.congestionLevel,
      timestamp: new Date(),
      confidence: flowData.confidence || 0.8
    }

    // Store flow data
    trafficFlows.set(flow.segmentId, flow)

    // Broadcast flow update
    broadcastToNearbyClients(flow.location, 'traffic_flow', {
      id: `flow_${Date.now()}`,
      type: 'traffic_flow',
      payload: flow,
      timestamp: Date.now()
    })

  } catch (error) {
    console.error('Flow update error:', error)
  }
}

// Room management
function handleRoomJoin(socket: any, message: WebSocketMessage) {
  try {
    const roomName = message.payload.room
    if (roomName) {
      socket.join(roomName)

      if (!activeRooms.has(roomName)) {
        activeRooms.set(roomName, new Set())
      }
      activeRooms.get(roomName)?.add(socket.id)

      const clientData = connectedClients.get(socket.id)
      if (clientData) {
        clientData.rooms.add(roomName)
      }

      socket.emit('room_joined', {
        id: message.id,
        type: 'room_joined',
        payload: { room: roomName },
        timestamp: Date.now()
      } as WebSocketMessage)
    }
  } catch (error) {
    console.error('Room join error:', error)
  }
}

function handleRoomLeave(socket: any, message: WebSocketMessage) {
  try {
    const roomName = message.payload.room
    if (roomName) {
      socket.leave(roomName)

      const roomClients = activeRooms.get(roomName)
      if (roomClients) {
        roomClients.delete(socket.id)
        if (roomClients.size === 0) {
          activeRooms.delete(roomName)
        }
      }

      const clientData = connectedClients.get(socket.id)
      if (clientData) {
        clientData.rooms.delete(roomName)
      }

      socket.emit('room_left', {
        id: message.id,
        type: 'room_left',
        payload: { room: roomName },
        timestamp: Date.now()
      } as WebSocketMessage)
    }
  } catch (error) {
    console.error('Room leave error:', error)
  }
}

// Disconnection handling
function handleDisconnection(socket: any, reason: string) {
  console.log(`Client disconnected: ${socket.id} (Reason: ${reason})`)

  // Clean up client data
  const clientData = connectedClients.get(socket.id)
  if (clientData) {
    // Leave all rooms
    clientData.rooms.forEach((room: string) => {
      const roomClients = activeRooms.get(room)
      if (roomClients) {
        roomClients.delete(socket.id)
        if (roomClients.size === 0) {
          activeRooms.delete(room)
        }
      }
    })

    connectedClients.delete(socket.id)
  }
}

// Utility functions
function broadcastToNearbyClients(location: { lat: number; lng: number }, event: string, message: WebSocketMessage, radiusKm: number = 10) {
  if (!io) return

  // Find rooms within radius and broadcast
  activeRooms.forEach((clients, roomName) => {
    if (roomName.startsWith('geo:')) {
      const [, roomLat, roomLng, roomRadius] = roomName.split(':').map(parseFloat)
      const distance = calculateDistance(location.lat, location.lng, roomLat, roomLng)

      if (distance <= (parseFloat(roomRadius.toString()) + radiusKm)) {
        io?.to(roomName).emit(event, message)
      }
    }
  })
}

function getInitialTrafficData(filters: any) {
  // Return recent incidents and flow data for initial subscription
  const incidents = Array.from(trafficIncidents.values())
    .filter(incident => {
      if (filters.location) {
        const distance = calculateDistance(
          incident.location.lat, incident.location.lng,
          filters.location.lat, filters.location.lng
        )
        return distance <= (filters.location.radius || 10)
      }
      return true
    })
    .slice(-10) // Last 10 incidents

  const flows = Array.from(trafficFlows.values())
    .filter(flow => {
      if (filters.location) {
        const distance = calculateDistance(
          flow.location.lat, flow.location.lng,
          filters.location.lat, filters.location.lng
        )
        return distance <= (filters.location.radius || 10)
      }
      return true
    })
    .slice(-20) // Last 20 flow updates

  return { incidents, flows }
}

function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371 // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLng = (lng2 - lng1) * Math.PI / 180
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLng/2) * Math.sin(dLng/2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  return R * c
}

function cleanupInactiveConnections() {
  // This would be enhanced with Redis in production
  const now = Date.now()
  const timeout = 3600000 // 1 hour

  for (const [socketId, clientData] of connectedClients.entries()) {
    if (now - clientData.connectedAt.getTime() > timeout) {
      // Force disconnect inactive clients
      clientData.socket.disconnect(true)
      connectedClients.delete(socketId)
    }
  }

  console.log(`Active connections: ${connectedClients.size}, Active rooms: ${activeRooms.size}`)
}

// Export for use in Nitro plugins
export default defineEventHandler((event: H3Event) => {
  // This ensures the WebSocket server is initialized when Nitro starts
  // Note: In Nuxt 3, WebSocket initialization is handled differently
  // This will be called during server startup
})