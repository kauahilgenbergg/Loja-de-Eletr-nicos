import React from 'react';
import { useCart } from '../../context/CartContext';
import './CartItem.css'; // Você pode criar um CSS para ele depois

// Recebe o produto específico que está no carrinho
export default function CartItem({ product }) {

  // Pega as funções de controle do contexto
  const { increaseQty, decreaseQty, removeFromCart } = useCart();

  return (
    <div className="cart-item">
      <img src={product.imagem} alt={product.name} />

      <div className="item-details">
        <h4>{product.name}</h4>
        <p>Preço: R$ {parseFloat(product.preco).toFixed(2)}</p>

        <div className="quantity-controls">
          {/* Botões que chamam as funções do contexto */}
          <button onClick={() => decreaseQty(product.id)}>-</button>
          <span>{product.qtdCarrinho}</span>
          <button onClick={() => increaseQty(product.id)}>+</button>
        </div>

        <p>
          Subtotal: R$ {(product.preco * product.qtdCarrinho).toFixed(2)}
        </p>

        {/* Botão para remover completamente */}
        <button 
          className="remove-btn" 
          onClick={() => removeFromCart(product.id)}
        >
          Remover
        </button>
      </div>
    </div>
  );
}