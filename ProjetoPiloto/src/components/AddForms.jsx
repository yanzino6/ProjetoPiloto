import React from 'react'
import { useState } from 'react'
import "../styles/Forms.modules.css"


const AddForms = ({adicionaTarefa}) => {
    const [task,setTask] = useState("")
    const [categoria,setCategoria] = useState("")
    const subForm = (e) =>{
        e.preventDefault();
        if (!task||!categoria)return
        adicionaTarefa(task,categoria)
        setCategoria("")
        setTask("")
        
    }

  return <div className="AddForm">
    <h2>Add Task</h2>
    <form onSubmit={subForm}>
        <input type="text" placeholder='Task label' 
        onChange={(e)=>setTask(e.target.value)} 
        value={task}
        />
        <select onChange={(e)=>setCategoria(e.target.value)}
            value={categoria}>
            <option value="">Select a task type</option>
            <option value="Work">Work</option>
            <option value="Studies">Studies</option>
            <option value="Personal">Personal</option>
        </select>
        <button type='submit'>Create task</button>
    </form>
  </div>
}

export default AddForms