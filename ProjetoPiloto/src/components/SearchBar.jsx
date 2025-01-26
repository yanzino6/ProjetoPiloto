import React from 'react'
import "../styles/Filter&Search.modules.css"

const SearchBar = ({searchBar,setSearchBar}) => {
  return <div className='searchBar'>
    <h2>Search task</h2>
    <input type="text" value={searchBar} onChange={(e)=>setSearchBar(e.target.value)}placeholder='Search for a task'/>
  </div>
  
}

export default SearchBar