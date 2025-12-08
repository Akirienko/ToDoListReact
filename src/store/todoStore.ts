import { create } from 'zustand'
import { supabase } from '../lib/supabase'
import { useAuthStore } from './authStore'

import type { Task } from '../types'

interface TodoState {
  taskList: Task[]
  loading: boolean
  error: string | null
  fetchTasks: () => Promise<void>
  addTask: (title: string) => Promise<void>
  toggleDone: (id: number | string) => Promise<void>
  deleteTask: (id: number | string) => Promise<void>
}

export const useTodoStore = create<TodoState>()(
  (set) => ({
    taskList: [],
    loading: false,
    error: null,

      fetchTasks: async () => {
        set({ loading: true, error: null })

        const userId = useAuthStore.getState().user?.id
        if (!userId) return

        const { data, error } = await supabase
          .from('tasks')
          .select('*')
          .eq('user_id', userId)
          .order('created_at', { ascending: false })

        if (error) {
          set({ error: error.message, loading: false })
        } else {
          set({ taskList: data, loading: false })
        }
      },

      addTask: async (title) => {
        const userId = useAuthStore.getState().user?.id
        if (!userId) return

        const { data, error } = await supabase
          .from('tasks')
          .insert({ title, user_id: userId, is_done: false })
          .select()
          .single()

        if (!error && data) {
          set((state) => ({ taskList: [data, ...state.taskList] }))
        }
      },

      toggleDone: async (id) => {
        const task = useTodoStore.getState().taskList.find(t => t.id === id)
        if (!task) return

        const { error } = await supabase
          .from('tasks')
          .update({ is_done: !task.isDone })
          .eq('id', id)

        if (!error) {
          set((state) => ({
            taskList: state.taskList.map((t) =>
              t.id === id ? { ...t, isDone: !t.isDone } : t
            )
          }))
        }
      },

      deleteTask: async (id) => {
        const { error } = await supabase
          .from('tasks')
          .delete()
          .eq('id', id)

        if (!error) {
          set((state) => ({
            taskList: state.taskList.filter(task => task.id !== id)
          }))
        }
      },
    })
)