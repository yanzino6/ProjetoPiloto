import React from 'react'
import { useState } from 'react'
import styles from "../styles/Forms.module.css"
import api from '../api'

const AddForms = ({ adicionaTarefa }) => {
  const [label, setLabel] = useState("");
  const [categorie, setCategorie] = useState("Work");

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      const taskData = {
        label: label.trim(),
        categorie: categorie
      };
      JSON.stringify(taskData, null, 2)
      console.log("📩 Enviando para API:", taskData);

      const response = await api.post("/tasks", taskData);

      alert("Tarefa adicionada com sucesso!");
      adicionaTarefa(response.data);
    } catch (error) {
      alert("Erro ao criar tarefa. Verifique se está logado.");
      console.error("❌ Erro ao criar tarefa:", error);
    }
  };

  return <div className={styles.AddForm}>
    <h2>Add Task</h2>
    <form onSubmit={handleCreateTask}>
      <input className={styles.label} type="text" placeholder='Task label'
        onChange={(e) => setLabel(e.target.value)}
        value={label}
      />

      <button className={styles.create} type='submit'>Create task</button>
    </form>
  </div>
}

export default AddForms