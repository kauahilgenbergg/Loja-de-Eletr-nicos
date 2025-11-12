import React from 'react';
import "./ProductCard.css";

// 1. Recebe 'product', 'onAddToCart' e 'onToggleWishlist' das props
export default function ProductCard({ product, onAddToCart, onToggleWishlist }) {

  // 2. A lógica do favorito agora é lida direto do produto!
  // Não precisamos mais do 'wishlist.some(...)'
  const isFav = product.presenteListaDesejos;

  // 3. Garantir que o preço seja formatado corretamente
  const price = parseFloat(product.preco).toFixed(2);

  return (
    <div className="product-card">
      {/* 4. Corrigido para 'product.imagem' */}
      <img src={product.imagem} alt={product.name} /> 
      
      <h4>{product.name}</h4>
      
      {/* 5. Corrigido para 'product.preco' (e formatado) */}
      <p>R$ {price}</p> 
      
      <div className="actions">
        {/* 6. Chama a função 'onAddToCart' recebida via props */}
        <button onClick={onAddToCart}>🛒 Adicionar</button>
        
        {/* 7. Chama a função 'onToggleWishlist' recebida via props */}
        <button onClick={onToggleWishlist}>
          {isFav ? "❤️" : "🤍"} {/* Mostra o coração baseado no estado do produto */}
        </button>
      </div>
    </div>
  );
}