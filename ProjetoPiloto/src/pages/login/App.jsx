import { useState } from 'react'
import "../../styles/App.css"
import Lista from '../../components/lista';
import AddForms from '../../components/AddForms';
import SearchBar from '../../components/SearchBar';
import Filtro from '../../components/Filtro';
function App() {
  const [tarefas, setTarefas] = useState([
    {
      id:1,
      texto: "Criar funcionalidade x no sistema",
      categoria: "Work",
      concluida: false,
    },
    {
      id:2,
      texto: "Ir pra academia",
      categoria: "Personal",
      concluida: false,
    },
    {
      id:3,
      texto: "Estudar React",
      categoria: "Studies",
      concluida: false,
    }
    
  ]);
  const contaConcluidas = ()=>{
    return tarefas.filter((tarefas)=>tarefas.concluida).length
  }

  const contaTarefas = ()=>{
    return tarefas.length
  }

  const adicionaTarefa =(texto,categoria)=>{

    const novasTarefas = [...tarefas,{
      id:Math.floor(Math.random()*10000),
      texto,
      categoria,
      concluida: false,
    },];
    setTarefas(novasTarefas);
  }
  const editaTarefa = (id, novoTexto, novaCategoria) => {
    const novaLista = tarefas.map((tarefa) =>
      tarefa.id === id
        ? { ...tarefa, texto: novoTexto, categoria: novaCategoria }
        : tarefa
    );
    setTarefas(novaLista);
  };

  const deletaTarefa = (id)=>{
    const novaLista = [...tarefas];
    const listaSemRemovido = novaLista.filter((tarefas)=>tarefas.id != id ? tarefas:null);
    setTarefas(listaSemRemovido);
  }

  const concluiTarefa = (id) => {
    const novaLista = [...tarefas];
    novaLista.map((tarefas)=>tarefas.id === id ? tarefas.concluida = !tarefas.concluida : tarefas);
    setTarefas(novaLista);
  }

  const [searchBar,setSearchBar]= useState("");

  const [filtro,setFiltro] = useState("All");
  const [ordem,setOrdem] = useState("none");
  const [categFiltro, setCategFiltro] = useState("Allcategs");
  

  return  <div className="app">
    
    <h1>To do List</h1>
    <div className="counter">
      <h3>{contaConcluidas()} of {contaTarefas()} tasks done</h3>
    </div>
    <SearchBar SearchBar={SearchBar} setSearchBar={setSearchBar}/>
    <Filtro filtro={filtro} setFiltro={setFiltro} 
    setOrdem={setOrdem} 
    categFiltro={categFiltro} setCategFiltro = {setCategFiltro}/>
    
    <div className="lista-de-tarefas">
      {tarefas
      .filter((tarefas)=> filtro==="All" ? true : filtro === "Completed" ? tarefas.concluida : !tarefas.concluida)
      .filter((tarefas)=> tarefas.texto.toLowerCase().includes(searchBar.toLowerCase()))
      .sort((a,b) => ordem==="none"?true:ordem==="A-Z" ? a.texto.localeCompare(b.texto) : b.texto.localeCompare(a.texto))
      .filter((tarefas)=> categFiltro==="Allcategs" ? true : tarefas.categoria === categFiltro)

      .map((tarefas)=>(
       <Lista key= {tarefas.id}tarefas={tarefas} deletaTarefa={deletaTarefa} concluiTarefa={concluiTarefa} editaTarefa={editaTarefa}/>
      ))}
    </div>
    <AddForms adicionaTarefa={adicionaTarefa} />
  </div>;
  

}

export default App;