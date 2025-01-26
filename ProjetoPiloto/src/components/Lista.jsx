import React from 'react'

const Lista = ({tarefas, deletaTarefa,concluiTarefa}) => {
  return (
    <div className="tarefas">
          <div className="content">
            <p style={{textDecoration: tarefas.concluida ? "line-through":""}}>{tarefas.texto}</p>
            <p className="categoria">{tarefas.categoria}</p>
          </div>
          <div>
          <button className='complete' onClick={()=>concluiTarefa(tarefas.id)}>Concluir</button>
          <button className='delete' onClick={()=>deletaTarefa(tarefas.id)}>X</button>
          </div>
    </div>
  )
}

export default Lista