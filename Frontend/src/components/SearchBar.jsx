import React from 'react'
import styles from "../styles/Filter&Search.module.css"

const SearchBar = ({searchBar,setSearchBar}) => {
  return <div className={styles.pesquisa}>
    <h2>Search task</h2>
    <input className={styles.searchBar} type="text" value={searchBar} onChange={(e)=>setSearchBar(e.target.value)}placeholder='Search for a task'/>
  </div>
  
}

export default SearchBar