// src/pages/checkout/PaymentForm.jsx
import React from 'react';
import './PaymentForm.css'; // Vamos importar nosso novo CSS

/**
 * Um componente simples de Spinner e texto para o loading.
 */
const LoadingIndicator = () => (
  <div className="loading-indicator">
    <div className="spinner"></div> 
    <span>Finalizando pedido...</span>
  </div>
);

// Define as opções de pagamento em um array para facilitar a manutenção
const paymentMethods = [
  { 
    key: 'Pix', 
    label: 'PIX', 
    icon: '⚡' // Ícones (emojis) ajudam na identificação rápida
  },
  { 
    key: 'Cartão de Crédito (na entrega)', 
    label: 'Cartão (na entrega)', 
    icon: '💳' 
  },
  { 
    key: 'Dinheiro (na entrega)', 
    label: 'Dinheiro (na entrega)', 
    icon: '💵' 
  }
];

export default function PaymentForm({ onCompleteOrder, isLoading }) {
  
  const handlePaymentSelect = (method) => {
    // A verificação de 'isLoading' já existe no 'disabled' do botão,
    // mas é uma boa prática manter aqui para evitar qualquer clique
    // antes do React desabilitar o botão.
    if (isLoading) return; 
    onCompleteOrder(method);
  };

  return (
    <div className="checkout-form-container">
      <h3>💳 Forma de Pagamento</h3>
      <p>Como você prefere pagar?</p>
      
      {/* Usamos um grid para os cartões de pagamento */}
      <div className="payment-options-grid">
        {paymentMethods.map((method) => (
          <button 
            key={method.key}
            className="payment-option-card"
            onClick={() => handlePaymentSelect(method.key)}
            // Desabilita o botão se 'isLoading' for verdadeiro
            disabled={isLoading} 
          >
            {/* aria-hidden para emojis decorativos */}
            <span className="payment-icon" aria-hidden="true">{method.icon}</span>
            <span className="payment-label">{method.label}</span>
          </button>
        ))}
      </div>
      
      {/* Mostra o indicador de carregamento se estiver carregando */}
      {isLoading && <LoadingIndicator />} 
    </div>
  );
}