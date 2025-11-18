import './TodoContainer.scss'

import { useState } from "react"
import type { Task } from '../../types'

import TaskList from '../TaskList/TaskList';
import Button from '../Button';
import AddTask from '../modals/AddTask/AddTask';
import { useTodo } from '../../context/todoList/TodoContext';



function TodoContainer() {

  const { taskList} = useTodo();

  const [addTaskModal, setAddTaskModal] = useState<boolean>(false);

  return (
    <>
      <div className="todo-wrap">
        <h3>Your Tasks</h3>

        <TaskList list={taskList} />

        {addTaskModal && (
          <AddTask
            clickCancel={() => setAddTaskModal(false)}
            onSuccess={() => setAddTaskModal(false)}
          />
        )}


        {/* не працює клас, чому? */}
        <Button customClassName="add-task-button" onClick={() => setAddTaskModal(true)} >Add Task</Button>
      </div>
    </>
  )
}

export default TodoContainer