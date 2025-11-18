import "./taskItem.scss"
import type { Task } from '../../types'
import { optimizeDate } from "../../utils/helpers";

interface TaskItemProps {
  task: Task;
  onToggleDone: (id: number | string) => void;
  onDelete: (id: number | string) => void;
}

function TaskItem({ task, onToggleDone, onDelete }: TaskItemProps) {

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