import React, { useState } from 'react'
import styles from "../styles/Lista.module.css"
const Lista = ({ tarefas, deletaTarefa, concluiTarefa, editaTarefa }) => {

  const [editando, setEditando] = useState(false)
  const [novoTexto, setNovoTexto] = useState(tarefas.texto);
  const [novaCategoria, setNovaCategoria] = useState(tarefas.categoria);

  const salvarEdicao = () => {
    editaTarefa(tarefas.id, novoTexto, novaCategoria);
    setEditando(false);
  };

  return (editando ? (
    <div className={styles.edicaoTarefa}>
      <input
        type="text"
        value={novoTexto}
        onChange={(e) => setNovoTexto(e.target.value)}
      />
      <select onChange={(e) => setNovaCategoria(e.target.value)}
        value={novaCategoria}>

        <option value="Work">Work</option>
        <option value="Studies">Studies</option>
        <option value="Personal">Personal</option>
      </select>
      <button className={styles.save} onClick={salvarEdicao}>Salvar</button>
      <button className={styles.cancel} onClick={() => setEditando(false)}>Cancelar</button>
    </div>
  ) :
    <div className={styles.tarefas}>
      <div className="content">
        <p className={styles.tarefa} style={{ textDecoration: tarefas.concluida ? "line-through" : "" }}>{tarefas.texto}</p>
        <p className={styles.categoria}>{tarefas.categoria}</p>
      </div>
      <div>
        <button className={styles.complete} onClick={() => concluiTarefa(tarefas.id)}>Concluir</button>
        <button className={styles.edit} onClick={() => setEditando(true)}>Editar</button>
        <button className={styles.delete} onClick={() => deletaTarefa(tarefas.id)}>X</button>
      </div>
    </div>
  )
}

export default Lista