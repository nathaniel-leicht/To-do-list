import { Trash } from "phosphor-react";
import { ChangeEvent, cloneElement, InputHTMLAttributes } from "react";

import styles from "./Task.module.css";

interface TaskProps {
    id: string;
    content: string;
    onDeleteTask: (taskToDelete: string) => void;
    onTaskCompleted: (isComplete: boolean, taskToUpdate: string) => void;
    isCompleted: boolean;
}

export function Task( {id, content, onDeleteTask, onTaskCompleted, isCompleted}: TaskProps ) {
    function handleDeleteTask() {
        onDeleteTask(id);
    }

    function handleCompleteTask(event: ChangeEvent<HTMLInputElement>){
        onTaskCompleted(event.target.checked, id);
    }

  return (
    <article className={styles.taskBox}>
      <div className={styles.contentTask}>

        <div className={styles.checkbox}>
            <input 
                type="checkbox" 
                checked= {isCompleted}
                id={id}
                onChange={handleCompleteTask}
            />

            <label htmlFor={id}>
                <span>{content}</span> 
            </label>
        </div>

        <button onClick={handleDeleteTask}>
            <Trash size={14} />
        </button>
      </div>

    </article>
  );
}
