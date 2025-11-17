import React, { useState } from 'react';
import './SearchBar.css';

function SearchBar({ onSearch }) {
  const [term, setTerm] = useState('');
  const [filter, setFilter] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch({ term, filter });
  };

  const handleTermChange = (e) => {
    const novoTermo = e.target.value;
    setTerm(novoTermo); 

    if (novoTermo === '') {
      onSearch({ term: '', filter: filter });
    }
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };


  return (
    <form className="search-bar-container" onSubmit={handleSubmit}>
      <input
        type="text"
        className="search-input"
        placeholder="Buscar produtos..."
        value={term}
        // 5. Usa a nova função aqui
        onChange={handleTermChange} 
      />

      <select
        className="search-filter"
        value={filter}
        onChange={handleFilterChange} 
      >
        <option value="" disabled hidden>Ordenar por...</option>
        
        <option value="price_desc">Preço: Maior &rarr; Menor</option>
        <option value="price_asc">Preço: Menor &rarr; Maior</option>
        <option value="name_asc">Ordem Alfabética: (A-Z)</option>
        <option value="name_desc">Ordem Alfabética: (Z-A)</option>
      </select>

      <button type="submit" className="search-button">
        Buscar
      </button>
    </form>
  );
}

export default SearchBar;