import React from 'react';
import { useCart } from '../../context/CartContext';
import CartItem from '../../components/product/CartItem.jsx'; 
// (Ou o caminho correto para seu CartItem)

export default function Cart() {
  const { 
    cartItems,
    cartSubtotal,
    isLoading,
    error,
    clearCart,    // <-- NOVO
    isUpdating    // <-- NOVO
  } = useCart();

  if (isLoading) {
    return <p>Carregando carrinho...</p>;
  }

  if (error) {
    return <p>Erro ao carregar: {error.message}</p>;
  }

  return (
    <div>
      <h2>🛒 Meu Carrinho</h2>
      {cartItems.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <CartItem 
              key={item.id} 
              product={item}
              // Passar as funções para o CartItem agora é opcional,
              // já que o CartItem pode pegar direto do useCart()
            />
          ))}
          
          <h3>Total: R$ {cartSubtotal.toFixed(2)}</h3>

          {/* <-- BOTÃO NOVO ADICIONADO AQUI --> */}
          <button 
            className="clear-cart-btn" 
            onClick={clearCart} 
            disabled={isUpdating} // Desativa o botão enquanto limpa
          >
            {isUpdating ? 'Limpando...' : 'Limpar Carrinho'}
          </button>
        </>
      )}
    </div>
  );
}