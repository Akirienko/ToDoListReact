import "./taskItem.scss"
import type { Task } from '../../types'
import { optimizeDate } from "../../utils/helpers";

import { useTodoStore } from '../../store/todoStore'

function TaskItem({ task }: { task: Task }) {

  const { toggleDone, deleteTask } = useTodoStore();

  const onDelete = (id: number | string) => {
    deleteTask(id);
  }

  const onToggleDone = (id: number | string) => {
    toggleDone(id);
  }

  return (
    <>
      <div className={`task-card ${task.isDone ? 'done' : ''}`}>
        <div className="task-card__left" onClick={() => onToggleDone(task.id)}>
          <div className="task-card__check" ></div>
          <p className="task-card__text">{task.title}</p>
        </div>

        <div className="task-card__right">
          <span className="task-card__date">{optimizeDate(task.created_at)}</span>
          <button className="task-card__delete" onClick={() => onDelete(task.id)}>
            ✕
          </button>
        </div>

      </div>
    </>

  )

}

export default TaskItem