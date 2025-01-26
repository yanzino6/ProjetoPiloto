import React from 'react'

const Lista = ({tarefas, deletaTarefa,concluiTarefa}) => {
  return (
    <div className="tarefas"
    style={{textDecoration: tarefas.concluida ? "line-through":""}}>
          <div className="content">
            <p>{tarefas.texto}</p>
            <p className="categoria">({tarefas.categoria})</p>
          </div>
          <div>
          <button className='complete' onClick={()=>concluiTarefa(tarefas.id)}>Concluir</button>
          <button className='delete' onClick={()=>deletaTarefa(tarefas.id)}>X</button>
          </div>
    </div>
  )
}

export default Lista