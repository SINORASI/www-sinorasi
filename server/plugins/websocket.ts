import { initializeWebSocketServer } from '../websocket'

export default defineNitroPlugin((nitroApp) => {
  // Initialize WebSocket server when Nitro starts
  nitroApp.hooks.hook('request', (event) => {
    // Initialize WebSocket on first request if not already done
    const { res } = event
    if (res.socket && !(globalThis as any).ioInitialized) {
      try {
        initializeWebSocketServer((res.socket as any).server)
        ;(globalThis as any).ioInitialized = true
      } catch (error) {
        console.error('Failed to initialize WebSocket server:', error)
      }
    }
  })
})