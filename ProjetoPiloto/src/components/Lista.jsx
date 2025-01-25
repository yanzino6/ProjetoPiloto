import React from 'react'

const Lista = ({tarefas}) => {
  return (
    <div className="tarefas">
          <div className="content">
            <p>{tarefas.texto}</p>
            <p className="categoria">({tarefas.categoria})</p>
          </div>
          <div>
          <button className='complete'>Concluir</button>
          <button className='delete'>X</button>
          </div>
    </div>
  )
}

export default Lista