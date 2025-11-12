import "./taskList.scss"
import TaskItem from "../TaskItem/TaskItem"

import type { Task } from '../../types'

function TaskList({ list }: { list: Task[] }) {
  return (
    <div className="tasks">
      <div className="tasks-body">
        {list.length === 0 ? (
          <div className="empty">
            <p>Now your tasks list is empty, add a task to see it here</p>
          </div>
        ) : (
            <>
              {list.map((item) => (
                <TaskItem key={item.id} task={item} />
              ))}
            </>
        )}
      </div>
    </div>
  )
}

export default TaskList