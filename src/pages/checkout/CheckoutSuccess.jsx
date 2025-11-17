// src/pages/checkout/CheckoutSuccess.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Importe o Link para navegação
import './CheckoutSuccess.css'; // Importaremos nosso novo CSS

export default function CheckoutSuccess({ orderDetails }) {
  return (
    <div className="success-container-wrapper">
      <div className="success-card">
        
        {/* 1. Ícone de Sucesso Animado */}
        <div className="success-icon-wrapper">
          <div className="success-checkmark">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
              <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
              <path className="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
            </svg>
          </div>
        </div>

        {/* 2. Mensagens Claras */}
        <h2 className="success-title">🎉 Pedido Realizado!</h2>
        <p className="success-message">
          Obrigado pela sua compra. <strong>Seu pedido será entregue ainda hoje.</strong>
        </p>

        {/* 3. Box de Detalhes (mais organizado) */}
        {orderDetails && (
          <div className="order-details-box">
            <h4 className="details-title">Resumo da Entrega</h4>
            <p>
              <strong>Endereço:</strong> {orderDetails.rua}, {orderDetails.numero}
            </p>
            <p>
              <strong>Bairro:</strong> {orderDetails.bairro}
            </p>
          </div>
        )}

        {/* 4. Botão de Ação (Funcional) */}
        <Link to="/home" className="cta-button">
          Voltar ao Início
        </Link>
      </div>
    </div>
  );
}