// src/pages/Wishlist.jsx
import React from 'react';
import { useCart } from '../../context/CartContext';
import ProductCard from '../../components/product/ProductCard.jsx';
// Importe o CSS que define a grid (provavelmente o Catalog.css)
import '../Catalog.css'; 

export default function Wishlist() {
  const { 
    wishlistItems, // <-- Pega SOMENTE os itens da wishlist
    isLoading, 
    error,
    increaseQty,
    toggleWishlist
  } = useCart();

  if (isLoading) { 
    return <p>Carregando sua lista de desejos...</p>;
  }
  if (error) { 
    return <p>Erro ao carregar: {error.message}</p>;
  }

  return (
    <div className="catalog-container"> {/* Reutiliza a classe do catálogo */}
      <h1>💖 Minha Lista de Desejos</h1>
      
      <div className="product-grid"> {/* Reutiliza a classe do catálogo */}
        {wishlistItems.length > 0 ? (
          wishlistItems.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product}
              onAddToCart={() => increaseQty(product.id)}
              onToggleWishlist={() => toggleWishlist(product.id)}
              variant="wishlist" // <-- PASSA A VARIANTE AQUI
            />
          ))
        ) : (
          <p>Sua lista de desejos está vazia.</p>
        )}
      </div>
    </div>
  );
}