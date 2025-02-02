import React from 'react'
import { useState } from 'react'
import styles from "../styles/Forms.module.css"


const AddForms = ({ adicionaTarefa }) => {
  const [task, setTask] = useState("")
  const [categoria, setCategoria] = useState("")
  const subForm = (e) => {
    e.preventDefault();
    if (!task || !categoria) return
    adicionaTarefa(task, categoria)
    setCategoria("")
    setTask("")

  }

  return <div className={styles.AddForm}>
    <h2>Add Task</h2>
    <form onSubmit={subForm}>
      <input className={styles.label} type="text" placeholder='Task label'
        onChange={(e) => setTask(e.target.value)}
        value={task}
      />
      <select className={styles.categ} onChange={(e) => setCategoria(e.target.value)}
        value={categoria}>
        <option value="">Select a task type</option>
        <option value="Work">Work</option>
        <option value="Studies">Studies</option>
        <option value="Personal">Personal</option>
      </select>
      <button className={styles.create} type='submit'>Create task</button>
    </form>
  </div>
}

export default AddForms