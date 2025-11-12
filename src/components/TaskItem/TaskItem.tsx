import "./taskItem.scss"

import type { Task } from '../../types'

function TaskItem({ task }: { task: Task }) {
  return (
    <>
      <div className={`task-card ${task.isDone ? 'done' : ''}`}>
        <div className="task-card__left">
          <div className="task-card__check" ></div>
          <p className="task-card__text">{task.title}</p>
        </div>

        <div className="task-card__right">
          <span className="task-card__date">data</span>
          <button className="task-card__delete" >✕
          </button>
        </div>

      </div>
    </>

  )

}

export default TaskItem