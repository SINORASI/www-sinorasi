import { z } from 'zod'

// Login Schema
export const loginSchema = z.object({
  username: z
    .string()
    .min(1, 'Username wajib diisi')
    .min(3, 'Username minimal 3 karakter')
    .max(50, 'Username maksimal 50 karakter')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username hanya boleh berisi huruf, angka, dan underscore'),

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

export const validateProfile = (data: unknown) => {
  return profileSchema.safeParse(data)
}