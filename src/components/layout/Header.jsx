import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; 

function Header() {
  return (
    <header className="app-header">
      <Link to="/Home" className="logo">Eritrônicos</Link>
      
      {/* <SearchBar /> */}

      <nav>
        <Link to="/about">Sobre Nós</Link>
        <Link to="/catalog">Catálogo</Link>
        <Link to="/Wishlist" className="nav-icon">❤️</Link>
        <Link to="/Cart" className="nav-icon">🛒</Link>
        <Link to="/profile" className="nav-icon">👤</Link>
      </nav>
    </header>
  );
}

export default Header;