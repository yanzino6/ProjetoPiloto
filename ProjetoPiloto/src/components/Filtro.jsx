import React from 'react'
import "../styles/Filter&Search.modules.css"
const Filtro = ({filtro,setFiltro,setOrdem,categFiltro, setCategFiltro}) => {
  return <div className='filtro'>
    <h2>Filter</h2>
    <div className="opcoesFiltragem">
        <div>
            <p>Status</p>
            <select value={filtro} onChange={(e)=>setFiltro(e.target.value)}>
                <option value="All">All</option>
                <option value="Completed">Completed</option>
                <option value="Not completed">Not completed</option>
            </select>
        </div>
        <div>
        <p>Categories</p>
        
        <select value={categFiltro} onChange={(e)=>setCategFiltro(e.target.value)}>
                <option value="Allcategs">All</option>
                <option value="Personal">Personal</option>
                <option value="Work">Work</option>
                <option value="Studies">Studies</option>
            </select>
        </div>
        <div>
            <p>Alphabetically sort</p>
            <button onClick={()=>setOrdem("A-Z")}>A-Z</button>
        <button onClick={()=>setOrdem("Z-A")}>Z-A</button>
        </div>

    </div>
  </div>
}

export default Filtro