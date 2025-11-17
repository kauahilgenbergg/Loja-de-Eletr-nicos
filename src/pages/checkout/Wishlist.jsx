import React from 'react';
import { useCart } from "../../context/CartContext";

export default function Wishlist() {
  // 1. Pega o 'clearWishlist' e o 'isUpdating'
  const { 
    wishlistItems, 
    toggleWishlist, 
    increaseQty,
    isLoading,
    error,
    clearWishlist,  // <-- Pega a nova função
    isUpdating      // <-- Pega o estado de "carregando"
  } = useCart();

  if (isLoading) {
    return <p>Carregando favoritos...</p>;
  }

  if (error) {
    return <p>Erro ao carregar: {error.message}</p>;
  }

  return (
    <div>
      <h2>❤️ Meus Favoritos</h2>
      {wishlistItems.length === 0 ? (
        <p>Você ainda não favoritou nenhum produto.</p>
      ) : (
        <>
          {/* 2. Adiciona o botão "Limpar Favoritos" */}
          <button 
            className="clear-wishlist-btn"
            onClick={clearWishlist}
            disabled={isUpdating} // Desativa se 'isUpdating' for true
          >
            {isUpdating ? 'Limpando...' : 'Limpar Favoritos'}
          </button>
          
          <hr /> 

          {wishlistItems.map((item) => (
            <div key={item.id} className="wishlist-item">
              <h4>{item.name}</h4>
              
              {/* 3. Desativa o botão individual */}
              <button 
                onClick={() => increaseQty(item.id)} 
                disabled={isUpdating} 
              >
                Adicionar ao Carrinho
              </button>
              
              {/* 4. Desativa o botão individual */}
              <button 
                onClick={() => toggleWishlist(item.id)} 
                disabled={isUpdating} 
              >
                Remover ❤️
              </button>
            </div>
          ))}
        </>
      )}
    </div>
  );
}