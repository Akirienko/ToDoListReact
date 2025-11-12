import MainModal from "../MainModal/MainModal";
import pancil from '../../../assets/image/pencil.webp'
import './AddTask.scss'

import { useState } from "react";
import Button from "../../Button";

interface AddTaskProps {
  clickAccept: () => void;
  clickCancel: () => void;
}

const AddTask = ({ clickAccept, clickCancel }: AddTaskProps) => {

  const [taskInput, setTaskInput] = useState('');

  return (
    <MainModal
      content=
        {
          <div className="modal-wrap">
            <h5>Create Task</h5>

            <div className="task-input">
              {/* add ICON COMPONENT */}
              <img src={pancil} alt="" />
              <input value={taskInput} onChange={(e) => setTaskInput(e.target.value)} type="text" placeholder="Write the task name..." />
            </div>

            <div className="buttons">
              <Button type="secondary" onClick={clickCancel}>Cancel</Button>
              <Button onClick={clickAccept}>Accept</Button>
            </div>
          </div>
        }
    />
  );
}

export default AddTask