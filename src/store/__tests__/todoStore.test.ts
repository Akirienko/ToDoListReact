import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useTodoStore } from '../todoStore'
import { useAuthStore } from '../authStore'
import { supabase } from '../../lib/supabase'
import type { Task } from '../types'


vi.mock('../../lib/supabase', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn().mockReturnThis(),
      insert: vi.fn().mockReturnThis(),
      update: vi.fn().mockReturnThis(),
      delete: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      order: vi.fn().mockReturnThis(),
      single: vi.fn(),
    })),
  },
}))

vi.mock('../authStore', () => ({
  useAuthStore: {
    getState: vi.fn(() => ({
      user: { id: 'test-user-123' }
    }))
  }
}))

describe('todoStore', () => {
  beforeEach(() => {
    useTodoStore.setState({ taskList: [], loading: false, error: null })
    vi.clearAllMocks()
  })

  it('initial state is correct', () => {
    const state = useTodoStore.getState()
    expect(state.taskList).toEqual([])
    expect(state.loading).toBe(false)
    expect(state.error).toBe(null)
  })

  it('fetchTasks', async () => {
    const mockTasks = [
      { id: '1', title: 'Task 1', is_done: false, user_id: 'test-user-123', created_at: '2025-01-01' },
      { id: '2', title: 'Task 2', is_done: true, user_id: 'test-user-123', created_at: '2025-01-02' }
    ]

    const mockFrom = vi.fn(() => ({
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      order: vi.fn().mockResolvedValue({
        data: mockTasks,
        error: null
      })
    }))

    vi.mocked(supabase.from).mockImplementation(mockFrom as any)

    await useTodoStore.getState().fetchTasks()

    const state = useTodoStore.getState()
    expect(state.taskList).toEqual(mockTasks)
    expect(state.loading).toBe(false)
    expect(state.error).toBe(null)
  })

  it('addTask', async () => {
    const mockTasks = [
      { id: '1', title: 'Task 1', is_done: false, user_id: 'test-user-123', created_at: '2025-01-01' },
    ]

    const mockFrom = vi.fn(() => ({
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      order: vi.fn().mockResolvedValue({
        data: mockTasks,
        error: null
      })
    }))

    vi.mocked(supabase.from).mockImplementation(mockFrom as any)

    await useTodoStore.getState().addTask()

    const state = useTodoStore.getState()
    expect(state.taskList).toEqual(mockTasks)
    expect(state.loading).toBe(false)
    expect(state.error).toBe(null)
  })

})