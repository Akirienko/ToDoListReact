import './AddTask.scss'
import pancil from '../../../assets/image/pencil.webp'

import { useState } from "react";

import MainModal from "../MainModal/MainModal";
import { useTodoStore } from '../../../store/todoStore'
import Button from "../../Button";


interface AddTaskProps {
  clickCancel: () => void;
  onSuccess?: () => void;
}

const AddTask = ({ clickCancel, onSuccess }: AddTaskProps) => {
  const [taskInput, setTaskInput] = useState('');
  const { addTask } = useTodoStore();

  const handleAccept = () => {
    if (taskInput.trim()) {
      addTask(taskInput)
      setTaskInput('')
      onSuccess?.()
    }
  }

  return (
    <MainModal
      content={
        <div className="modal-wrap">
          <h5>Create Task</h5>

          <div className="task-input">
            <img src={pancil} alt="" />
            <input
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
              type="text"
              placeholder="Write the task name..."
            />
          </div>

          <div className="buttons">
            <Button type="secondary" onClick={clickCancel}>Cancel</Button>
            <Button onClick={handleAccept}>Accept</Button>
          </div>
        </div>
      }
    />
  );
}

export default AddTask