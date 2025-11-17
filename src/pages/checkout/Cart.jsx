// src/pages/checkout/Cart.jsx

import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import CartItem from '../../components/product/CartItem.jsx';
import AddressForm from './AddressForm.jsx';
import PaymentForm from './PaymentForm.jsx';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';

// Importe o novo CSS para a página do carrinho
import './Cart.css';

export default function Cart() {
  const { 
    cartItems,
    cartSubtotal,
    clearCart,
    isUpdating,
    finalizePurchase
  } = useCart();
  
  const { user, updateUserContext } = useAuth();

  const [checkoutStep, setCheckoutStep] = useState('cart');
  const [orderDetails, setOrderDetails] = useState(null);
  const [isPersistingData, setIsPersistingData] = useState(false);
  const [checkoutError, setCheckoutError] = useState('');

  // ... (Toda a lógica de handleGoToPayment, handleCompleteOrder, etc. continua IGUAL) ...
  // --- INÍCIO DA LÓGICA (SEM MUDANÇAS) ---

  // -----------------------------------------
  // 👉 ETAPA 1 — Endereço → Pagamento
  // -----------------------------------------
  const handleGoToPayment = async (addressData) => {
    if (!user) return;

    setCheckoutError('');
    setIsPersistingData(true);

    try {
      await api.put(`/usuario/${user.id}`, addressData);
      updateUserContext(addressData); 
      setOrderDetails(addressData);
      setCheckoutStep('payment');

    } catch (err) {
      console.error("Erro ao salvar endereço:", err);
      setCheckoutError("Falha ao salvar seu endereço. Tente novamente.");
    } finally {
      setIsPersistingData(false);
    }
  };

  // -----------------------------------------
  // 👉 ETAPA 2 — Finalizar compra
  // -----------------------------------------
  const handleCompleteOrder = async (paymentMethod) => {
    if (!user) return;

    setCheckoutError('');
    setIsPersistingData(true);

    const paymentData = { formaPagamento: paymentMethod };

    try {
      await api.put(`/usuario/${user.id}`, paymentData);
      updateUserContext(paymentData);

      finalizePurchase(cartItems);

      setCheckoutStep('success');

    } catch (err) {
      console.error("Erro ao finalizar pedido:", err);
      setCheckoutError("Falha ao finalizar seu pedido. Tente novamente.");
    } finally {
      setIsPersistingData(false);
    }
  };

  // -----------------------------------------
  // 👉 Renderização de erros
  // -----------------------------------------
  const renderError = () => (
    checkoutError && (
      <p className="form-error" style={{ color: 'red' }}>
        {checkoutError}
      </p>
    )
  );

  // --- FIM DA LÓGICA (SEM MUDANÇAS) ---


  // -----------------------------------------
  // 👉 ETAPA FINAL — Sucesso
  // -----------------------------------------
  if (checkoutStep === 'success') {
    return (
      <div className="checkout-success">
        <h2>🎉 Pedido Realizado com Sucesso!</h2>
        <p>Obrigado pela sua compra.</p>
        <p><strong>Seu pedido será entregue ainda hoje.</strong></p>

        {orderDetails && (
          <p>
            Endereço: {orderDetails.rua}, {orderDetails.numero} — {orderDetails.bairro}
          </p>
        )}
      </div>
    );
  }

  // -----------------------------------------
  // 👉 ETAPA 1 — Endereço
  // -----------------------------------------
  if (checkoutStep === 'address') {
    return (
      <>
        {renderError()}
        <AddressForm 
          onGoToPayment={handleGoToPayment} 
          isLoading={isPersistingData}
        />
      </>
    );
  }

  // -----------------------------------------
  // 👉 ETAPA 2 — Pagamento
  // -----------------------------------------
  if (checkoutStep === 'payment') {
    return (
      <>
        {renderError()}
        <PaymentForm 
          onCompleteOrder={handleCompleteOrder} 
          isLoading={isPersistingData}
        />
      </>
    );
  }

  // -----------------------------------------
  // 👉 ETAPA 0 — Visualização do carrinho (Refatorada)
  // -----------------------------------------
  return (
    <div className="cart-page-container">
      <h1>🛒 Meu Carrinho</h1>

      {cartItems.length === 0 ? (
        <div className="cart-empty">
          <p>Seu carrinho está vazio.</p>
          {/* Opcional: Adicionar um botão para voltar às compras */}
          {/* <Link to="/" className="continue-shopping-btn">Continuar comprando</Link> */}
        </div>
      ) : (
        <div className="cart-content-wrapper">
          
          {/* Coluna 1: Lista de Itens */}
          <div className="cart-items-list">
            {cartItems.map((item) => (
              <CartItem 
                key={item.id}
                product={item}
              />
            ))}
          </div>

          {/* Coluna 2: Resumo do Pedido */}
          <aside className="cart-summary">
            <h2>Resumo do Pedido</h2>
            
            <div className="summary-row">
              <span>Subtotal ({cartItems.length} {cartItems.length > 1 ? 'itens' : 'item'})</span>
              <span>R$ {cartSubtotal.toFixed(2)}</span>
            </div>

            {/* Você pode adicionar frete aqui se quiser */}
            {/* <div className="summary-row">
              <span>Frete</span>
              <span>Grátis</span>
            </div> */}
            
            <div className="summary-row total">
              <span>Total</span>
              <span>R$ {cartSubtotal.toFixed(2)}</span>
            </div>

            <button
              className="checkout-start-btn"
              onClick={() => setCheckoutStep('address')}
              disabled={isUpdating}
            >
              {isUpdating ? 'Aguarde...' : 'Finalizar Pedido 💸'}
            </button>
            
            <button 
              className="clear-cart-btn" 
              onClick={clearCart}
              disabled={isUpdating}
            >
              {isUpdating ? 'Limpando...' : 'Limpar Carrinho 🗑️'}
            </button>
          </aside>

        </div>
      )}
    </div>
  );
}