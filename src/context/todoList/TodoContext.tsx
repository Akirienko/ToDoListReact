import { createContext, useContext } from "react";
import type { Task } from '../../types';

interface TodoContextType {
  taskList: Task[];
  addTask: (title: string) => void;
  toggleDone: (id: number | string) => void;
  deleteTask: (id: number | string) => void;
}

export const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const useTodo = () => {
  const context = useContext(TodoContext)
  if (!context) {
    throw new Error('useTodo must be used within TodoProvider')
  }
  return context
}