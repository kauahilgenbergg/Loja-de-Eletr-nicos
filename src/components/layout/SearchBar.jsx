import React from 'react';
import './SearchBar.css'; 

function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <input
      type="text"
      className="search-input"
      placeholder="Buscar produtos..."
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
    />
  );
}

export default SearchBar;