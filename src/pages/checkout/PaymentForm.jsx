// src/pages/checkout/PaymentForm.jsx
import React from 'react';

// Recebe a nova prop 'isLoading'
export default function PaymentForm({ onCompleteOrder, isLoading }) {
  
  const handlePaymentSelect = (method) => {
    // Não faz nada se já estiver carregando
    if (isLoading) return; 
    onCompleteOrder(method);
  };

  return (
    <div className="checkout-form-container">
      <h3>💳 Forma de Pagamento</h3>
      <p>Como você prefere pagar?</p>
      
      <div className="payment-options">
        <button 
          className="payment-option-btn"
          onClick={() => handlePaymentSelect('Pix')}
          disabled={isLoading} // <-- MUDANÇA AQUI
        >
          PIX
        </button>
        
        <button 
          className="payment-option-btn"
          onClick={() => handlePaymentSelect('Cartão de Crédito (na entrega)')}
          disabled={isLoading} // <-- MUDANÇA AQUI
        >
          Cartão (na entrega)
        </button>

        <button 
          className="payment-option-btn"
          onClick={() => handlePaymentSelect('Dinheiro (na entrega)')}
          disabled={isLoading} // <-- MUDANÇA AQUI
        >
          Dinheiro (na entrega)
        </button>
      </div>
      
      {isLoading && <p>Finalizando pedido...</p>}
    </div>
  );
}