// src/context/CartContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// SUA URL DA API
const API_URL = 'https://690d0786a6d92d83e8504357.mockapi.io/produtos';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [products, setProducts] = useState([]); 
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  // ... (useEffect, toggleWishlist, increaseQty, decreaseQty, removeFromCart, clearCart, clearWishlist - TUDO FICA IGUAL) ...
  // ... (copie e cole as funções que já existem aqui) ...
  
  // (Exemplo: suas funções otimistas)
  const toggleWishlist = (id) => { /* ...seu código ... */ };
  const increaseQty = (id) => { /* ...seu código ... */ };
  const decreaseQty = (id) => { /* ...seu código ... */ };
  const removeFromCart = (id) => { /* ...seu código ... */ };
  const clearCart = () => { /* ...seu código ... */ };
  const clearWishlist = () => { /* ...seu código ... */ };


  // --- ⬇⬇⬇ FUNÇÃO NOVA E CORRIGIDA ⬇⬇⬇ ---
  // Esta função substitui o `clearCart` e `toggleWishlist` no final do pedido
  // Ela recebe os itens que foram comprados
  const finalizePurchase = (itemsPurchased) => {
    const originalProducts = [...products]; // Backup para reverter
    setIsUpdating(true);

    // Pega os IDs dos itens comprados para facilitar a busca
    const purchasedIds = new Set(itemsPurchased.map(item => item.id));

    // 1. ATUALIZA A TELA IMEDIATAMENTE (Otimista)
    const updatedProducts = products.map(p => {
      // Se o ID do produto (p.id) estiver na lista de comprados...
      if (purchasedIds.has(p.id)) {
        // ...aplica as novas regras de negócio
        return {
          ...p,
          presenteCarrinho: false,
          qtdCarrinho: 0,
          presenteListaDesejos: false, // Remove dos favoritos
          presentePedido: true,        // Marca como pedido
          qtdPedido: p.qtdCarrinho     // Salva a quantidade que foi pedida
        };
      }
      // Se não, retorna o produto como estava
      return p;
    });
    setProducts(updatedProducts);

    // 2. MANDA PARA A API EM SEGUNDO PLANO
    // Cria uma promessa de 'PUT' para cada item comprado
    const purchasePromises = itemsPurchased.map(item => {
      const updatedPayload = {
        ...item,
        presenteCarrinho: false,
        qtdCarrinho: 0,
        presenteListaDesejos: false,
        presentePedido: true,
        qtdPedido: item.qtdCarrinho // 'item.qtdCarrinho' tem a QTD correta
      };
      return axios.put(`${API_URL}/${item.id}`, updatedPayload);
    });

    // 3. GERENCIA SUCESSO OU ERRO
    Promise.all(purchasePromises)
      .catch(err => {
        console.error("ERRO: Falha ao finalizar a compra de produtos:", err);
        // DESFAZ a mudança se a API falhar
        setProducts(originalProducts); 
        setError(new Error("Não foi possível registrar seus produtos comprados."));
      })
      .finally(() => {
        setIsUpdating(false); // Para o spinner
      });
  };
  // --- ⬆⬆⬆ FIM DA FUNÇÃO NOVA ⬆⬆⬆ ---


  // ---- Valores Fornecidos (Sem mudanças) ----
  const cartItems = products.filter(p => p.qtdCarrinho > 0);
  const wishlistItems = products.filter(p => p.presenteListaDesejos === true);
  const cartSubtotal = cartItems.reduce((total, item) => total + (item.preco * item.qtdCarrinho), 0);
  const cartCount = cartItems.reduce((total, item) => total + item.qtdCarrinho, 0);

  return (
    <CartContext.Provider
      value={{
        allProducts: products,
        isLoading,
        error,
        isUpdating,
        cartItems,
        wishlistItems,
        cartSubtotal,
        cartCount,
        increaseQty,
        decreaseQty,
        removeFromCart,
        toggleWishlist,
        clearCart,
        clearWishlist,
        finalizePurchase // <-- 3. EXPONHA A NOVA FUNÇÃO
      }}
    >
      {children}
    </CartContext.Provider>
  );
};