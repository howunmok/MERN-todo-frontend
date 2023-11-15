// import React from "react";
import styles from "./ToDoItem.module.css";
import { TbTrash } from "react-icons/tb";
import { BsFillCheckCircleFill } from "react-icons/bs";

export default function ToDoItem({ task, onComplete, onDelete }) {
  return (
    <div className={styles.task}>
      <button
        className={styles.checkContainer}
        onClick={() => onComplete(task._id)}
      >
        {task.done ? <BsFillCheckCircleFill /> : <div />}
      </button>
      <p className={task.done ? styles.textCompleted : ""}>{task.task}</p>

      <button
        className={styles.deleteButton}
        onClick={() => onDelete(task._id)}
      >
        <TbTrash size={25} />
      </button>
    </div>
  );
}
