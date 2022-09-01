import { CheckCircle, Trash } from 'phosphor-react';
import styles from './Task.module.css';
import { ITask } from '../App'

interface Props {
  task: ITask,
  onDelete: (title: string) => void,
  onConplete: (title: string) => void
}

export function Task({ task, onDelete, onConplete } : Props ) {


  return(
    <div className={styles.taskContainer}>
      <div className={styles.taskCheck}>
        <button
          className={styles.checkContainer}
          onClick={() => onConplete(task.id)}
          >
            { task.isCompleted ? <CheckCircle size={25} color='#5E60CE'/> : <div />}
        </button>
        <h2 className={ task.isCompleted ? styles.titleCompleted : styles.title}>{task.title}</h2>
      </div>

      <button className={styles.deleteButton} onClick={() => onDelete(task.id)} >
        <Trash size={20} color='#808080' />
      </button>
    </div>
  )
}