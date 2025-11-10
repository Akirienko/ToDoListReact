import './TodoContainer.scss'

import { useState, useRef } from "react"
import type { Task } from '../types'



function TodoContainer() {

  const [taskList, setTaskList] = useState<Task[]>([
    {id: 1, title: 'Learn React', created_at: new Date().toISOString(), isDone: false},
    {id: 2, title: 'Build a ToDo App', created_at: new Date().toISOString(), isDone: false},
    {id: 3, title: 'Deploy to Vercel', created_at: new Date().toISOString(), isDone: false},
    {id: 4, title: 'Add TypeScript', created_at: new Date().toISOString(), isDone: false},
  ])

  const [taskInput, setTaskInput] = useState<string>('');

  const handleAddTask = () => {
    const newTask: Task = {
      id: Date.now(),
      title: taskInput,
      created_at: new Date().toISOString(),
      isDone: false,
    }

    setTaskList([...taskList, newTask]);
    setTaskInput('');
  }


  return (
    <>
      <div className="todo-wrap">
        <h3>Your Tasks</h3>

        <input
          value={taskInput}
          type="text"
          placeholder="Add a new task"
          onChange={(e) => setTaskInput(e.target.value)}
        />

        <ul>
          {taskList.map((item) => (
            <li key={item.id}>
              {item.title}
            </li>
          ))}
        </ul>

        <button onClick={handleAddTask}>Add Task</button>
      </div>
    </>
  )
}

export default TodoContainer