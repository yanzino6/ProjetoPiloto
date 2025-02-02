import React from 'react'
import styles from '../styles/Filter&Search.module.css'
const Filtro = ({ filtro, setFiltro, setOrdem, categFiltro, setCategFiltro }) => {
    return <div >
        <h2>Filter</h2>
        <div className={styles.opcoesFiltragem}>
            <div>
                <p className={styles.tipoFiltro}>Status</p>
                <select className={styles.filtro} value={filtro} onChange={(e) => setFiltro(e.target.value)}>
                    <option value="All">All</option>
                    <option value="Completed">Completed</option>
                    <option value="Not completed">Not completed</option>
                </select>
            </div>
            <div>
                <p className={styles.tipoFiltro}>Categories</p>

                <select className={styles.filtro} value={categFiltro} onChange={(e) => setCategFiltro(e.target.value)}>
                    <option value="Allcategs">All</option>
                    <option value="Personal">Personal</option>
                    <option value="Work">Work</option>
                    <option value="Studies">Studies</option>
                </select>
            </div>
            <div>
                <p className={styles.tipoFiltro}>Alphabetically sort</p>
                <button className={styles.sort} onClick={() => setOrdem("none")}>None</button>
                <button className={styles.sort} onClick={() => setOrdem("A-Z")}>A-Z</button>
                <button className={styles.sort} onClick={() => setOrdem("Z-A")}>Z-A</button>
            </div>

        </div>
    </div>
}

export default Filtro