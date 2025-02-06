import { useState, useEffect } from 'react';
import styles from '../../styles/App.module.css';
import Lista from '../../components/Lista';
import AddForms from '../../components/AddForms';
import SearchBar from '../../components/SearchBar';
import Filtro from '../../components/Filtro';
import api from '../../api';

export function App() {
  const [tarefas, setTarefas] = useState([]); 

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.get("/tasks");
        console.log("Dados recebidos:", response.data); 
        if (Array.isArray(response.data)) {
          setTarefas(response.data); 
        } else {
          console.error("Erro: API retornou um formato inesperado", response.data);
        }
      } catch (error) {
        console.error("Erro ao carregar tarefas:", error);
      }
    };

    fetchTasks();
  }, []);
  const atualizaTarefaNoEstado = (tarefaAtualizada) => {
    setTarefas((tarefasAnteriores) =>
      tarefasAnteriores.map((t) =>
        t.id === tarefaAtualizada.id ? tarefaAtualizada : t
      )
    );
  };
  const contaConcluidas = () => tarefas.filter((t) => t.done).length;
  const contaTarefas = () => tarefas.length;

  const adicionaTarefa = async (texto, categoria) => {
    try {
      const response = await api.post("/tasks", { label: texto, categorie: categoria });
      setTarefas([...tarefas, response.data]);
    } catch (error) {
      alert("Erro ao adicionar tarefa.");
    }
  };

  const editaTarefa = async (id, novoTexto, novaCategoria) => {
    try {
      await api.patch(`/tasks/${id}`, { label: novoTexto, categorie: novaCategoria });
      const novaLista = tarefas.map((tarefa) =>
        tarefa.id === id ? { ...tarefa, texto: novoTexto, categoria: novaCategoria } : tarefa
      );
      setTarefas(novaLista);
    } catch (error) {
      alert("Erro ao editar tarefa.");
    }
  };

  const deletaTarefa = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTarefas(tarefas.filter((tarefa) => tarefa.id !== id));
    } catch (error) {
      alert("Erro ao deletar tarefa.");
    }
  };

  const concluiTarefa = async (id) => {
    try {
      const tarefa = tarefas.find((t) => t.id === id);
      const response = await api.patch(`/tasks/${id}`, { done: !tarefa.done });

      setTarefas((tarefas) => tarefas.map((t) =>
        t.id === id ? response.data : t
      ));
    } catch (error) {
      alert("Erro ao marcar como concluída.");
    }
  };

  const [searchBar, setSearchBar] = useState("");
  const tarefasFiltradas = tarefas.filter((t) =>
    t.label.toLowerCase().includes(searchBar.toLowerCase())
  );

  return (
    <div className={styles.app}>
      <div className={styles.titulo}>
        <h1>To do List</h1>
      </div>
      <div className={styles.counter}>
        <h3>{contaConcluidas()} of {contaTarefas()} tasks done</h3>
      </div>
      <SearchBar searchBar={searchBar} setSearchBar={setSearchBar} />
      <div className={styles.listadetarefas}>
        {tarefasFiltradas
          
          .map((tarefa) => (
            <Lista atualizaTarefaNoEstado={atualizaTarefaNoEstado} key={tarefa.id} tarefas={tarefa} deletaTarefa={deletaTarefa} concluiTarefa={concluiTarefa} editaTarefa={editaTarefa} />
          ))}
      </div>
      <AddForms adicionaTarefa={adicionaTarefa} />
    </div>
  );
}