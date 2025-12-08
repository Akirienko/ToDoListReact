import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { supabase } from '../lib/supabase'
import type { User, ProfileData } from '../types'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  loading: boolean
  error: string | null

  signUp: (email: string, password: string, profileData: ProfileData) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  getUser: () => Promise<void>
}

async function fetchUserWithProfile(userId: string, email: string): Promise<User> {

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()

  if (profileError) throw profileError

  return {
    id: userId,
    email: email!,
    username: profile.username,
    age: profile.age,
    profession: profile.profession,
    mainGoal: profile.mainGoal
  }
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      loading: false,
      error: null,

      signUp: async (email, password, profileData) => {
        set({ loading: true, error: null })

        try {
          const { data, error } = await supabase.auth.signUp({ email, password })

          if (error) throw error

          if (data.user) {
            const { error: profileError } = await supabase
              .from('profiles')
              .update(profileData)
              .eq('id', data.user.id)

            if (profileError) throw profileError

              const user = await fetchUserWithProfile(data.user.id, data.user.email!)
              set({ user, isAuthenticated: true, loading: false })
          }

        } catch (error: any) {
          set({
            error: error.message,
            loading: false
          })
        }
      },

      signIn: async (email, password) => {
        set({ loading: true, error: null })

        try {
          const { data, error } = await supabase.auth.signInWithPassword({ email, password })

          if (error) {
            console.log(error.message);
            set({ error: error.message})
            throw error
          }

          const user = await fetchUserWithProfile(data.user.id, data.user.email!)
          set({ user, isAuthenticated: true, loading: false })

        } catch (error: any) {
          set({ error: error.message, loading: false })
        }
      },

      signOut: async () => {
        try {
          const { error } = await supabase.auth.signOut();


          set({ user: null, isAuthenticated: false})

        } catch (error: any) {
          set({ error: error.message })
        }
      },

      getUser: async () => {
        set({ loading: true, error: null })

        try {
          const { data: { user: authUser }, error } = await supabase.auth.getUser()

          if (error) throw error

          if (!authUser) {
            set({ user: null, isAuthenticated: false, loading: false })
            return
          }

          const user = await fetchUserWithProfile(authUser.id, authUser.email!)
          set({ user, isAuthenticated: true, loading: false })

        } catch (error: any) {
          set({ error: error.message, loading: false })
        }
      }
    }),
    { name: 'auth' }
  )
)