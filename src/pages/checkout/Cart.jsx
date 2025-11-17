// src/pages/checkout/Cart.jsx
import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import CartItem from '../../components/product/CartItem.jsx';
import AddressForm from './AddressForm.jsx';
import PaymentForm from './PaymentForm.jsx';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';

export default function Cart() {
  const { 
    cartItems,
    cartSubtotal,
    clearCart,
    isUpdating,
    finalizePurchase // <- Importando a função
  } = useCart();
  
  const { user, updateUserContext } = useAuth();
  const [checkoutStep, setCheckoutStep] = useState('cart');
  const [orderDetails, setOrderDetails] = useState(null);
  const [isPersistingData, setIsPersistingData] = useState(false);
  const [checkoutError, setCheckoutError] = useState('');

  // 1. Avança do Endereço para o Pagamento
  const handleGoToPayment = async (addressData) => {
    if (!user) return; // Segurança
    
    setCheckoutError('');
    setIsPersistingData(true);
    
    try {
      // 1. PERSISTE NA API
      await api.put(`/usuario/${user.id}`, addressData);
      
      // 2. ATUALIZA O CONTEXTO GLOBAL
      updateUserContext(addressData);

      // 3. Continua o fluxo
      setOrderDetails(addressData);
      setCheckoutStep('payment');

    } catch (err) {
      console.error("Erro ao salvar endereço:", err);
      setCheckoutError("Falha ao salvar seu endereço. Tente novamente.");
    } finally {
      setIsPersistingData(false);
    }
  };

  // 2. Finaliza o Pedido
  const handleCompleteOrder = async (paymentMethod) => {
    if (!user) return;

    setCheckoutError('');
    setIsPersistingData(true);
    const paymentData = { formaPagamento: paymentMethod };

    try {
      // 1. PERSISTE O PAGAMENTO (no usuário)
      await api.put(`/usuario/${user.id}`, paymentData);
      updateUserContext(paymentData);

      // 2. CHAMA A NOVA FUNÇÃO DE FINALIZAÇÃO (nos produtos)
      finalizePurchase(cartItems);

      // 3. VAI PARA A TELA DE SUCESSO
      setCheckoutStep('success');

    } catch (err) {
      console.error("Erro ao salvar forma de pagamento:", err);
      setCheckoutError("Falha ao finalizar seu pedido. Tente novamente.");
    } finally {
      setIsPersistingData(false);
    }
  };

  // --- Renderização ---

  if (checkoutStep === 'success') {
    return (
      <div className="checkout-success">
        <h2>🎉 Pedido Realizado com Sucesso!</h2>
        <p>Obrigado pela sua compra.</p>
        <p><strong>Seu pedido será entregue ainda neste dia.</strong></p>
        {orderDetails && (
          <p>Endereço: {orderDetails.rua}, {orderDetails.numero} - {orderDetails.bairro}</p>
        )}
      </div>
    );
  }

  // Exibindo o erro da API, se houver
  const renderError = () => (
    checkoutError && <p className="form-error" style={{color: 'red'}}>{checkoutError}</p>
  );

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

  // --- Passo 0: Visualização do Carrinho (Padrão) ---
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
            />
          ))}
          
          <h3>Total: R$ {cartSubtotal.toFixed(2)}</h3>

          <div className="cart-actions">
            <button 
              className="clear-cart-btn" 
              onClick={clearCart}
              disabled={isUpdating}
            >
              {isUpdating ? 'Limpando...' : 'Limpar Carrinho'}
            </button>
            
            <button
              className="checkout-start-btn"
              onClick={() => setCheckoutStep('address')}
              disabled={isUpdating}
            >
              Gerar Pedido
            </button>
          </div>
        </>
      )}
    </div>
  );
}