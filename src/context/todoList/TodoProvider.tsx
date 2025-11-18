import { useState } from "react"
import { TodoContext } from "./TodoContext";
import type { Task } from '../../types';

interface TodoProviderProps {
  children: React.ReactNode;
}

export const TodoProvider = ({ children }: TodoProviderProps) => {

  const [taskList, setTaskList] = useState<Task[]>([
    {id: 1, title: 'Learn React', created_at: new Date().toISOString(), isDone: true},
    {id: 2, title: 'Build a ToDo App', created_at: new Date().toISOString(), isDone: false},
    {id: 3, title: 'Deploy to Vercel', created_at: new Date().toISOString(), isDone: false},
    {id: 4, title: 'Add TypeScript', created_at: new Date().toISOString(), isDone: false},
  ])

  const addTask = (title: string) => {
    const newTask: Task = {
      id: Date.now(),
      title: title,
      created_at: new Date().toISOString(),
      isDone: false,
    }

    setTaskList([...taskList, newTask]);
  }

  const toggleDone = (id: number | string) => {
    setTaskList(taskList.map(task =>
      task.id === id
        ? { ...task, isDone: !task.isDone }
        : task
    ))
  }

  const deleteTask = (id: number | string) => {
    setTaskList(taskList.filter(task => task.id !== id));
  }

  return (
    <TodoContext.Provider value={{ taskList, addTask, toggleDone, deleteTask }}>
      {children}
    </TodoContext.Provider>
  )
}