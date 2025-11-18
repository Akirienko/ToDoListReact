import "./taskList.scss"
import TaskItem from "../TaskItem/TaskItem"
import type { Task } from '../../types'

interface TaskListProps {
  list: Task[];
  onToggleDone: (id: number | string) => void;
  onDelete: (id: number | string) => void;
}

function TaskList({ list, onToggleDone, onDelete }: TaskListProps) {

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
                <TaskItem key={item.id} task={item} onToggleDone={onToggleDone} onDelete={onDelete} />
              ))}
            </>
        )}
      </div>
    </div>
  )
}

export default TaskList