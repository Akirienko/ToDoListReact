import { TodoContext } from "./TodoContext";
import type { Task } from '../../types';
import { useLocalStorage } from '../../hooks/useLocalStorage';

interface TodoProviderProps {
  children: React.ReactNode;
}

export const TodoProvider = ({ children }: TodoProviderProps) => {

  const [taskList, setTaskList] = useLocalStorage<Task[]>('tasks', [])

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