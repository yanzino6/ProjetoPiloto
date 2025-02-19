import React, { useState } from "react";
import styles from "../styles/Lista.module.css";
import api from "../api"; 

const Lista = ({ tarefas, atualizaTarefaNoEstado, deletaTarefa, concluiTarefa }) => {
  const [editando, setEditando] = useState(false);
  const [novoTexto, setNovoTexto] = useState(tarefas.label); 
  const [novaCategoria, setNovaCategoria] = useState(tarefas.categorie); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 

  const salvarEdicao = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.patch(`/tasks/${tarefas.id}`, {
        label: novoTexto.trim(),
        categorie: novaCategoria,
        done: tarefas.done,
      });

      atualizaTarefaNoEstado(response.data);
      setEditando(false);
    } catch (error) {
      console.error("Erro ao editar tarefa:", error);
      setError("Erro ao atualizar tarefa. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return editando ? (
    <div className={styles.edicaoTarefa}>
      <input
        type="text"
        value={novoTexto}
        onChange={(e) => setNovoTexto(e.target.value)}
        disabled={loading} 
      />
     
      {error && <p className={styles.error}>{error}</p>}
      <button className={styles.save} onClick={salvarEdicao} disabled={loading}>
        {loading ? "Salvando..." : "Salvar"}
      </button>
      <button
        className={styles.cancel}
        onClick={() => setEditando(false)}
        disabled={loading}
      >
        Cancelar
      </button>
    </div>
  ) : (
    <div className={styles.tarefas}>
      <div className="content">
          <p className={styles.tarefa} style={{ textDecoration: tarefas.done ? "line-through" : "none" }}>
            {tarefas.label}
          </p>
        
      </div>
      <div>
          <button className={styles.complete} onClick={() => concluiTarefa(tarefas.id)}>
            {tarefas.done ? "Desfazer" : "Concluir"}
          </button>
        <button className={styles.edit} onClick={() => setEditando(true)}>Editar</button>
        <button className={styles.delete} onClick={() => deletaTarefa(tarefas.id)}>X</button>
      </div>
    </div>
  );
};

export default Lista;