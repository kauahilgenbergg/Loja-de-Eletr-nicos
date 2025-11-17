import React from 'react';
import "./ProductCard.css";

/**
 * Função auxiliar para limpar o preço.
 * Copiada do Catalog.jsx para garantir que o preço seja
 * exibido corretamente.
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


export default function ProductCard({ product, onAddToCart, onToggleWishlist }) {

  const isFav = product.presenteListaDesejos;

  // 1. CORREÇÃO: Usar a função parsePrice antes do .toFixed()
  const price = parsePrice(product.preco).toFixed(2);

  return (
    <div className="product-card">
      <img src={product.imagem} alt={product.name} /> 
      
      <h4>{product.name}</h4>
      
      {/* 2. O 'price' agora está formatado corretamente */}
      <p>R$ {price.replace(".", ",")}</p> {/* Opcional: troca ponto por vírgula na exibição */}
      
      <div className="actions">
        <button onClick={onAddToCart}>🛒 Adicionar</button>
        
        <button onClick={onToggleWishlist}>
          {isFav ? "❤️" : "🤍"} 
        </button>
      </div>
    </div>
  );
}