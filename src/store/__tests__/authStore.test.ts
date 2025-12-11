import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useAuthStore } from '../authStore'
import { supabase } from '../../lib/supabase'

vi.mock('../../lib/supabase', () => ({
  supabase: {
    auth: {
      signUp: vi.fn(),
      signInWithPassword: vi.fn(),
      signOut: vi.fn(),
      getUser: vi.fn(),
    },
    from: vi.fn(() => ({
      select: vi.fn().mockReturnThis(),
      update: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn(),
    })),
  },
}))

describe('authStore', () => {
  beforeEach(() => {
    useAuthStore.setState({ user: null, isAuthenticated: false, loading: false, error: null })
    vi.clearAllMocks()
  })

  it('initial state is correct', () => {
    const state = useAuthStore.getState()
    expect(state.user).toBe(null)
    expect(state.isAuthenticated).toBe(false)
    expect(state.loading).toBe(false)
    expect(state.error).toBe(null)
  })

  it('signIn', async () => {
    vi.mocked(supabase.auth.signInWithPassword).mockResolvedValue({
      data: {
        user: { id: '123', email: 'test@test.com' } as any,
        session: {} as any
      },
      error: null,
    })

    const mockFrom = vi.fn(() => ({
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({
        data: { username: 'Test', age: 25 },
        error: null,
      }),
    }))
    vi.mocked(supabase.from).mockImplementation(mockFrom as any)

    const promise = useAuthStore.getState().signIn('test@test.com', 'password')

    expect(useAuthStore.getState().loading).toBe(true)

    await promise

    expect(useAuthStore.getState().loading).toBe(false)
    expect(useAuthStore.getState().isAuthenticated).toBe(true)
  })

  it('signIn error', async () => {
    vi.mocked(supabase.auth.signInWithPassword).mockResolvedValue({
      data: { user: null, session: null },
      error: { message: 'Invalid credentials' } as any,
    })

    await useAuthStore.getState().signIn('wrong@test.com', 'wrong')

    expect(useAuthStore.getState().error).toBe('Invalid credentials')
    expect(useAuthStore.getState().isAuthenticated).toBe(false)
  })

  it('signUp', async () => {
    vi.mocked(supabase.auth.signUp).mockResolvedValue({
      data: {
        user: { id: '123', email: 'test@test.com' } as any,
        session: {} as any
      },
      error: null,
    })

    const mockFrom = vi.fn(() => ({
      update: vi.fn().mockReturnThis(),
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({
        data: { username: 'NewUser', age: 25 },
        error: null,
      }),
    }))
    vi.mocked(supabase.from).mockImplementation(mockFrom as any)

    const profileData = {
      username: 'NewUser',
      age: 25,
      profession: 'Developer',
      mainGoal: 'Learn testing'
    }

    const promise = useAuthStore.getState().signUp('test@test.com', 'password123', profileData)

    expect(useAuthStore.getState().loading).toBe(true)

    await promise

    expect(useAuthStore.getState().loading).toBe(false)
    expect(useAuthStore.getState().isAuthenticated).toBe(true)
    expect(useAuthStore.getState().user?.username).toBe('NewUser')
  })

  it('signOut', async () => {
    vi.mocked(supabase.auth.signOut).mockResolvedValue({
      error: null,
    })

    useAuthStore.setState({
      user: {
        id: '123',
        email: 'test@test.com',
        username: 'Test',
        age: 25
      } as any,
      isAuthenticated: true
    })

    const promise = useAuthStore.getState().signOut()

    await promise

    expect(useAuthStore.getState().isAuthenticated).toBe(false)
    expect(useAuthStore.getState().user).toBe(null)

  })
})