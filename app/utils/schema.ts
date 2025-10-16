import { z } from 'zod'

// Login Schema
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email wajib diisi')
    .email('Format email tidak valid')
    .max(100, 'Email maksimal 100 karakter'),

  password: z
    .string()
    .min(1, 'Password wajib diisi')
    .min(6, 'Password minimal 6 karakter')
    .max(100, 'Password maksimal 100 karakter'),
})

export const registerSchema = z.object({
  username: z
    .string()
    .min(1, 'Username wajib diisi')
    .min(3, 'Username minimal 3 karakter')
    .max(50, 'Username maksimal 50 karakter')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username hanya boleh berisi huruf, angka, dan underscore'),

  email: z
    .string()
    .min(1, 'Email wajib diisi')
    .email('Format email tidak valid')
    .max(100, 'Email maksimal 100 karakter'),

  password: z
    .string()
    .min(1, 'Password wajib diisi')
    .min(8, 'Password minimal 8 karakter')
    .max(100, 'Password maksimal 100 karakter')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password harus mengandung huruf besar, huruf kecil, dan angka'),

  confirmPassword: z
    .string()
    .min(1, 'Konfirmasi password wajib diisi'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Password dan konfirmasi password tidak cocok',
  path: ['confirmPassword'],
})

export const profileSchema = z.object({
  name: z
    .string()
    .min(1, 'Nama wajib diisi')
    .min(2, 'Nama minimal 2 karakter')
    .max(100, 'Nama maksimal 100 karakter'),

  username: z
    .string()
    .min(1, 'Username wajib diisi')
    .min(3, 'Username minimal 3 karakter')
    .max(50, 'Username maksimal 50 karakter')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username hanya boleh berisi huruf, angka, dan underscore'),

  email: z
    .string()
    .min(1, 'Email wajib diisi')
    .email('Format email tidak valid')
    .max(100, 'Email maksimal 100 karakter'),

  phone: z
    .string()
    .max(20, 'Nomor telepon maksimal 20 karakter')
    .optional(),

  bio: z
    .string()
    .max(500, 'Bio maksimal 500 karakter')
    .optional(),

  currentPassword: z
    .string()
    .optional(),

  newPassword: z
    .string()
    .optional()
    .refine((val) => !val || val.length >= 8, {
      message: 'Password baru minimal 8 karakter'
    })
    .refine((val) => !val || /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(val), {
      message: 'Password baru harus mengandung huruf besar, huruf kecil, dan angka'
    }),

  confirmNewPassword: z
    .string()
    .optional(),
}).refine((data) => {
  // If new password is provided, current password must be provided
  if (data.newPassword && !data.currentPassword) {
    return false
  }
  // If confirm password is provided, it must match new password
  if (data.confirmNewPassword && data.newPassword !== data.confirmNewPassword) {
    return false
  }
  return true
}, {
  message: 'Password tidak cocok atau password saat ini diperlukan',
  path: ['confirmNewPassword'],
})

export type LoginForm = z.infer<typeof loginSchema>
export type RegisterForm = z.infer<typeof registerSchema>
export type ProfileForm = z.infer<typeof profileSchema>

export const validateLogin = (data: unknown) => {
  return loginSchema.safeParse(data)
}

export const validateRegister = (data: unknown) => {
  return registerSchema.safeParse(data)
}

export const newsSchema = z.object({
  title: z
    .string()
    .min(1, 'Judul wajib diisi')
    .min(5, 'Judul minimal 5 karakter')
    .max(200, 'Judul maksimal 200 karakter'),

  subtitle: z
    .string()
    .min(1, 'Subjudul wajib diisi')
    .min(10, 'Subjudul minimal 10 karakter')
    .max(300, 'Subjudul maksimal 300 karakter'),

  content: z
    .string()
    .min(1, 'Konten wajib diisi')
    .min(50, 'Konten minimal 50 karakter'),

  tags: z
    .string()
    .min(1, 'Tag wajib diisi')
    .refine((val) => val.split(',').filter(tag => tag.trim()).length > 0, {
      message: 'Minimal 1 tag diperlukan'
    }),

  publishedAt: z
    .string()
    .min(1, 'Tanggal publikasi wajib diisi'),
})

export type NewsForm = z.infer<typeof newsSchema>

export const validateProfile = (data: unknown) => {
  return profileSchema.safeParse(data)
}

export const validateNews = (data: unknown) => {
  return newsSchema.safeParse(data)
}

// Anonymous BK Form Schema
export const anonymousBKSchema = z.object({
  story: z
    .string()
    .min(1, 'Cerita wajib diisi')
    .min(10, 'Cerita minimal 10 karakter')
    .max(2000, 'Cerita maksimal 2000 karakter'),

  category: z
    .string()
    .min(1, 'Kategori wajib dipilih'),

  contactMethod: z
    .enum(['none', 'email', 'phone'])
    .default('none'),

  contactInfo: z
    .string()
    .optional()
    .refine((val) => {
      // If contact method is provided, contact info must be provided
      if (val && val.length > 0) {
        return true
      }
      return true // Optional field
    }, {
      message: 'Informasi kontak wajib diisi jika metode kontak dipilih'
    }),
})

export type AnonymousBKForm = z.infer<typeof anonymousBKSchema>

// SI Sarana Form Schema
export const siSaranaSchema = z.object({
  category: z
    .string()
    .min(1, 'Kategori wajib dipilih'),

  title: z
    .string()
    .min(1, 'Judul laporan wajib diisi')
    .min(5, 'Judul minimal 5 karakter')
    .max(100, 'Judul maksimal 100 karakter'),

  description: z
    .string()
    .min(1, 'Deskripsi wajib diisi')
    .min(20, 'Deskripsi minimal 20 karakter')
    .max(1000, 'Deskripsi maksimal 1000 karakter'),

  location: z
    .string()
    .min(1, 'Lokasi wajib diisi')
    .max(200, 'Lokasi maksimal 200 karakter'),

  urgency: z
    .enum(['low', 'medium', 'high', 'critical'])
    .default('medium'),

  reporterName: z
    .string()
    .optional()
    .refine((val) => !val || val.length >= 2, {
      message: 'Nama pelapor minimal 2 karakter'
    }),

  reporterContact: z
    .string()
    .optional()
    .refine((val) => !val || /^[\w\.-]+@[\w\.-]+\.\w+$|^[\+]?[0-9\s\-\(\)]+$/.test(val), {
      message: 'Format kontak tidak valid (email atau nomor telepon)'
    }),

  attachments: z
    .array(z.instanceof(File))
    .max(5, 'Maksimal 5 file')
    .optional()
    .refine((files) => {
      if (!files) return true
      return files.every(file => file.size <= 5 * 1024 * 1024) // 5MB max per file
    }, {
      message: 'Setiap file maksimal 5MB'
    })
    .refine((files) => {
      if (!files) return true
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf']
      return files.every(file => allowedTypes.includes(file.type))
    }, {
      message: 'Tipe file tidak didukung. Gunakan JPG, PNG, GIF, atau PDF'
    }),
})

export type SiSaranaForm = z.infer<typeof siSaranaSchema>

// Traffic Tracker Form Schema
export const trafficTrackerSchema = z.object({
  origin: z
    .string()
    .min(1, 'Alamat asal wajib diisi')
    .min(5, 'Alamat asal minimal 5 karakter')
    .max(200, 'Alamat asal maksimal 200 karakter'),

  destination: z
    .string()
    .default('SMK Negeri 2 Singosari, Jl. Raya Singosari No.10, Singosari, Malang, Jawa Timur'),

  travelMode: z
    .enum(['driving', 'walking', 'transit', 'bicycling'])
    .default('driving'),

  avoidTolls: z
    .boolean()
    .default(false),

  avoidHighways: z
    .boolean()
    .default(false),

  departureTime: z
    .string()
    .optional(),
})

export type TrafficTrackerForm = z.infer<typeof trafficTrackerSchema>

// Validation functions
export const validateAnonymousBK = (data: unknown) => {
  return anonymousBKSchema.safeParse(data)
}

export const validateSiSarana = (data: unknown) => {
  return siSaranaSchema.safeParse(data)
}

export const validateTrafficTracker = (data: unknown) => {
  return trafficTrackerSchema.safeParse(data)
}