import { PlusCircle, RocketLaunch } from 'phosphor-react'
import { FormEvent, useState } from 'react'
import { Task } from './components/Task'
import styles from './App.module.css'

export interface ITask {
  id: string,
  title: string,
  isCompleted: boolean
}

export function App() {

  const [newTask, setNewTask] = useState("")
  const [tasks, setTasks] = useState<ITask[]>([])

  const tasksQuantity = tasks.length
  const completedTasks = tasks.filter(task => task.isCompleted).length

  function handleCreateNewTask(e: FormEvent) {
    e.preventDefault()
    setTasks([...tasks, {
      id: crypto.randomUUID(),
      title: newTask,
      isCompleted: false
    }])
  }

  function handleDeleteTask(taskToDelete: string) {
    const updatedTasks = tasks.filter(task => task.id !== taskToDelete)

    setTasks(updatedTasks)
  }

  function toggleTaskCompletedById( taskId: string) {
    const newTasks = tasks.map(task => {
      if(task.id === taskId){
        return {
          ...task,
          isCompleted: !task.isCompleted
        };
      }
      return task
    })

    setTasks(newTasks)
  }

  return (
    <div className={styles.appContainer}>
      <h1 className={styles.title}>
        <RocketLaunch />  
        todo
      </h1>

      <form className={styles.formContainer} onSubmit={handleCreateNewTask}>
        <input 
          type='text'
          placeholder='Adicione uma nova tarefa' 
          onChange={ e => setNewTask(e.target.value)}
          className={styles.input}/>
        <button className={styles.createButton} type='submit'>
          Criar
          <PlusCircle size={20} />
          </button>
      </form>

      <div className={styles.tasksContent}>
        <div className={styles.tasksCount}>
          <h4>Tarefas Criadas <span>{tasksQuantity}</span></h4>
          <h4>Concluídas <span>{ tasksQuantity !== 0 ? `${completedTasks} de ${tasksQuantity}` : 0}</span></h4>
        </div>

        {tasks.map(task => {
          return <Task task={task} onDelete={handleDeleteTask} onConplete={toggleTaskCompletedById} />
        })}
      </div>
    </div>
  )
} 
