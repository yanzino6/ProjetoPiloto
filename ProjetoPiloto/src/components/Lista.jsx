import React, { useState } from 'react'

const Lista = ({tarefas, deletaTarefa,concluiTarefa,editaTarefa}) => {

  const [editando,setEditando] = useState(false)
  const [novoTexto,setNovoTexto] = useState(tarefas.texto);
  const [novaCategoria, setNovaCategoria] = useState(tarefas.categoria);

  const salvarEdicao = () => {
    editaTarefa(tarefas.id, novoTexto, novaCategoria);
    setEditando(false);
  };

  return (editando?(
    <div className='edicaoTarefa'>
    <input
      type="text"
      value={novoTexto}
      onChange={(e) => setNovoTexto(e.target.value)}
    />
    <select onChange={(e)=>setNovaCategoria(e.target.value)}
            value={novaCategoria}>
            
            <option value="Work">Work</option>
            <option value="Studies">Studies</option>
            <option value="Personal">Personal</option>
        </select>
    <button onClick={salvarEdicao}>Salvar</button>
    <button onClick={() => setEditando(false)}>Cancelar</button>
  </div>
  ):
    <div className="tarefas">
          <div className="content">
            <p style={{textDecoration: tarefas.concluida ? "line-through":""}}>{tarefas.texto}</p>
            <p className="categoria">{tarefas.categoria}</p>
          </div>
          <div>
          <button className='complete' onClick={()=>concluiTarefa(tarefas.id)}>Concluir</button>
          <button onClick={() => setEditando(true)}>Editar</button>
          <button className='delete' onClick={()=>deletaTarefa(tarefas.id)}>X</button>
          </div>
    </div>
  )
}

export default Lista