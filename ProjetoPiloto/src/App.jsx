import { useState } from 'react'
import "./styles/App.css"
import Lista from './components/lista';
import AddForms from './components/AddForms';
function App() {
  const [tarefas, setTarefas] = useState([
    {
      id:1,
      texto: "criar funcionalidade x no sistema",
      categoria: "Trabalho",
      concluida: false,
    },
    {
      id:2,
      texto: "Ir pra academia",
      categoria: "Pessoal",
      concluida: false,
    },
    {
      id:3,
      texto: "Estudar React",
      categoria: "Estudos",
      concluida: false,
    }
  ]);

  const adicionaTarefa =(texto,categoria)=>{

    const novasTarefas = [...tarefas,{
      id:Math.floor(Math.random()*10000),
      texto,
      categoria,
      concluida: false,
    },];
    setTarefas(novasTarefas);
  }

  return  <div className="app">
    
    <h1>To do List</h1>
    <div className="lista-de-tarefas">
      {tarefas.map((tarefas)=>(
       <Lista key= {tarefas.id}tarefas={tarefas}/>
      ))}
    </div>
    <AddForms adicionaTarefa={adicionaTarefa} />
  </div>;
  

}

export default App;