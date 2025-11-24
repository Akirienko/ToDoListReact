import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Task } from '../types'

interface TodoState {
  taskList: Task[]
  addTask: (title: string) => void
  toggleDone: (id: number | string) => void
  deleteTask: (id: number | string) => void
}

export const useTodoStore = create<TodoState>()(
  persist(
    (set) => ({
      taskList: [],

      addTask: (title) => set((state) => ({
        taskList: [
          ...state.taskList,
          {
            id: Date.now(),
            title: title,
            created_at: new Date().toISOString(),
            isDone: false,
          }
        ]
      })),

      toggleDone: (id) => set((state) => ({
        taskList: state.taskList.map((task) =>
          task.id === id ? { ...task, isDone: !task.isDone } : task
        )
      })),

      deleteTask: (id) => set((state) => ({
        taskList: state.taskList.filter(task => task.id !== id)
      })),
    }),
    {
      name: 'tasks',
    }
  )
)