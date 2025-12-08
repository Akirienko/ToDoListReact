import './TodoContainer.scss'

import { useState, useEffect } from "react"

import TaskList from '../TaskList/TaskList';
import Button from '../Button';
import AddTask from '../modals/AddTask/AddTask';
import { useTodoStore } from '../../store/todoStore'




function TodoContainer() {

  const { taskList, fetchTasks } = useTodoStore()

  useEffect(() => {
    fetchTasks()
  }, [])

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

        <Button customClassName="add-task-button" onClick={() => setAddTaskModal(true)} >Add Task</Button>
      </div>
    </>
  )
}

export default TodoContainer