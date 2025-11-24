import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '../types'

interface UserState {
  user: User | null
  isAuthenticated: boolean
  login: (user: User) => void
  logout: () => void
}

export const useAuthStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: (userData) => set(() => ({
        user: userData,
        isAuthenticated: true
      })),

      logout: () => set(() =>({
        user: null,
        isAuthenticated: false
       }))

    }),
    {
      name: 'user',
    }
  )
)