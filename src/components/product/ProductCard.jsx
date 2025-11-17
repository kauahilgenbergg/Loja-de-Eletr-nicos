// src/components/product/ProductCard.jsx
import React from 'react';
import "./ProductCard.css";

/**
 * Função auxiliar para limpar o preço.
 */
const parsePrice = (price) => {
  if (typeof price === 'number') {
    return price;
  }
  if (typeof price !== 'string') {
    return 0;
  }
  
  const cleanString = price
    .replace("R$", "")     
    .replace(/\./g, "")    
    .replace(",", ".")     
    .trim();                
    
  const number = parseFloat(cleanString);
  return isNaN(number) ? 0 : number;
};


export default function ProductCard({ 
  product, 
  onAddToCart, 
  onToggleWishlist,
  variant = 'catalog' // <-- 1. ADICIONE ESTA PROP
}) {

  const isFav = product.presenteListaDesejos;
  const price = parsePrice(product.preco).toFixed(2);

  return (
    <div className="product-card">
      <img src={product.imagem} alt={product.name} /> 
      
      <h4>{product.name}</h4>
      
      <p>R$ {price.replace(".", ",")}</p>
      
      <div className="actions">
        {/* 2. ADICIONE UMA CLASSE AO BOTÃO DE ADICIONAR */}
        <button className="add-to-cart-btn" onClick={onAddToCart}>🛒 Adicionar</button>
        
        {/* --- 3. ATUALIZE A LÓGICA DO BOTÃO DE FAVORITO --- */}
        {variant === 'catalog' ? (
          // Versão do Catálogo (coração normal)
          <button 
            className={`wishlist-btn ${isFav ? 'active' : ''}`} 
            onClick={onToggleWishlist}
            title="Adicionar aos Favoritos"
          >
            {isFav ? "❤️" : "🤍"} 
          </button>
        ) : (
          // Versão da Wishlist (coração partido para remover)
          <button 
            className="wishlist-btn remove" 
            onClick={onToggleWishlist}
            title="Remover dos Favoritos"
          >
            💔
          </button>
        )}
        {/* --- FIM DAS MUDANÇAS --- */}

      </div>
    </div>
  );
}