import './TodoContainer.scss'

import { useState } from "react"
import type { Task } from '../../types'

import TaskList from '../TaskList/TaskList';
import Button from '../Button';
import AddTask from '../modals/AddTask/AddTask';



function TodoContainer() {

  const [taskList, setTaskList] = useState<Task[]>([
    {id: 1, title: 'Learn React', created_at: new Date().toISOString(), isDone: true},
    {id: 2, title: 'Build a ToDo App', created_at: new Date().toISOString(), isDone: false},
    {id: 3, title: 'Deploy to Vercel', created_at: new Date().toISOString(), isDone: false},
    {id: 4, title: 'Add TypeScript', created_at: new Date().toISOString(), isDone: false},
  ])

  const [addTaskModal, setAddTaskModal] = useState<boolean>(false);

  const handleAddTask = (task: string) => {
    const newTask: Task = {
      id: Date.now(),
      title: task,
      created_at: new Date().toISOString(),
      isDone: false,
    }

    setTaskList([...taskList, newTask]);
    setAddTaskModal(false);
  }

  const handleToggleDone = (id: number | string) => {
    setTaskList(taskList.map(task =>
      task.id === id
        ? { ...task, isDone: !task.isDone }
        : task
    ))
  }

  const handleDelete = (id: number | string) => {
    setTaskList(taskList.filter(task => task.id !== id));
  }

  const rejectAddTask = () => {
    setAddTaskModal(false);
  }


  return (
    <>
      <div className="todo-wrap">
        <h3>Your Tasks</h3>

        <TaskList list={taskList} onToggleDone={handleToggleDone} onDelete={handleDelete} />

        {addTaskModal && (
          <AddTask clickAccept={handleAddTask} clickCancel={rejectAddTask} />
        )}


        {/* не працює клас, чому? */}
        <Button customClassName="add-task-button" onClick={() => setAddTaskModal(true)} >Add Task</Button>
      </div>
    </>
  )
}

export default TodoContainer