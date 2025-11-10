import React from 'react';
// 1. Importe o Link para navegação
import { Link } from 'react-router-dom';
import './Header.css'; // O CSS é o mesmo de antes, mas atualizado

function Header() {
  // Nota: Removi o 'onNavigate' prop, o Router cuida disso agora.
  return (
    <header className="app-header">
      {/* A logo agora é um Link para a página inicial */}
      <Link to="/" className="logo">Eritrônicos</Link>
      
      {/* (Erick) Pode adicionar o SearchBar aqui */}
      {/* <SearchBar /> */}

      <nav>
        {/* 2. Substitua os <button> por <Link> */}
        <Link to="/catalog">Catálogo</Link>
        <Link to="/about">Sobre Nós</Link>
        
        {/* (Zanon) Links para Carrinho e Desejos */}
        <Link to="/wishlist" className="nav-icon">❤️</Link>
        <Link to="/cart" className="nav-icon">🛒</Link>
        
        {/* (Kauã) Link para Perfil/Login */}
        <Link to="/profile" className="nav-icon">👤</Link>
      </nav>
    </header>
  );
}

export default Header;