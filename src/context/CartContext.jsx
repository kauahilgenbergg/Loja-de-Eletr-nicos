// src/context/CartContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
// 1. Importe sua 'api' centralizada
import { api } from '../services/api';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [products, setProducts] = useState([]); 
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  // Busca inicial (Corrigido)
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        setIsLoading(true);
        const response = await api.get('/produtos'); // Usa api.get()
        const formattedProducts = response.data.map(p => ({
          ...p,
          preco: parseFloat(p.preco),
          qtdCarrinho: parseInt(p.qtdCarrinho, 10) || 0, 
        }));
        setProducts(formattedProducts);
      } catch (err) {
        console.error("Erro ao buscar produtos:", err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllProducts();
  }, []); 

  // --- ⬇⬇⬇ FUNÇÕES OTIMISTAS CORRIGIDAS ⬇⬇⬇ ---
  
  const toggleWishlist = (id) => {
    const product = products.find(p => p.id === id);
    if (!product) return;
    const updatedProduct = { ...product, presenteListaDesejos: !product.presenteListaDesejos };
    const originalProducts = [...products]; // Backup
    
    setProducts(prev => prev.map(p => p.id === id ? updatedProduct : p)); // UI
    
    // CORRIGIDO: Usa api.put()
    api.put(`/produtos/${id}`, updatedProduct) // API
      .catch(err => {
        console.error("ERRO: Falha ao atualizar wishlist:", err);
        setProducts(originalProducts); // Reverte
      });
  };

  const increaseQty = (id) => {
    const product = products.find(p => p.id === id);
    if (!product) return;
    const newQty = (product.qtdCarrinho || 0) + 1;
    const updatedProduct = { ...product, qtdCarrinho: newQty, presenteCarrinho: true };
    const originalProducts = [...products]; // Backup

    setProducts(prev => prev.map(p => p.id === id ? updatedProduct : p)); // UI
    
    // CORRIGIDO: Usa api.put()
    api.put(`/produtos/${id}`, updatedProduct) // API
      .catch(err => {
        console.error("ERRO: Falha ao aumentar qtd:", err);
        setProducts(originalProducts); // Reverte
      });
  };

  const decreaseQty = (id) => {
    const product = products.find(p => p.id === id);
    if (!product || product.qtdCarrinho <= 0) return; 
    const newQty = product.qtdCarrinho - 1;
    const updatedProduct = { ...product, qtdCarrinho: newQty, presenteCarrinho: newQty > 0 };
    const originalProducts = [...products]; // Backup

    setProducts(prev => prev.map(p => p.id === id ? updatedProduct : p)); // UI
    
    // CORRIGIDO: Usa api.put()
    api.put(`/produtos/${id}`, updatedProduct) // API
      .catch(err => {
        console.error("ERRO: Falha ao diminuir qtd:", err);
        setProducts(originalProducts); // Reverte
      });
  };

  const removeFromCart = (id) => {
    const product = products.find(p => p.id === id);
    if (!product || product.qtdCarrinho === 0) return;
    const updatedProduct = { ...product, qtdCarrinho: 0, presenteCarrinho: false };
    const originalProducts = [...products]; // Backup

    setProducts(prev => prev.map(p => p.id === id ? updatedProduct : p)); // UI
    
    // CORRIGIDO: Usa api.put()
    api.put(`/produtos/${id}`, updatedProduct) // API
      .catch(err => {
        console.error("ERRO: Falha ao remover do carrinho:", err);
        setProducts(originalProducts); // Reverte
      });
  };


  // --- FUNÇÕES DE LIMPEZA (CORRIGIDAS) ---
  
  const clearCart = () => {
    const originalProducts = [...products];
    
    const updatedProducts = products.map(p =>
      p.qtdCarrinho > 0 ? { ...p, qtdCarrinho: 0, presenteCarrinho: false } : p
    );
    setProducts(updatedProducts);
    setIsUpdating(true);

    const itemsToClear = originalProducts.filter(p => p.qtdCarrinho > 0);
    const clearPromises = itemsToClear.map(item => {
      const updatedItem = { ...item, qtdCarrinho: 0, presenteCarrinho: false };
      // CORRIGIDO: Usa api.put()
      return api.put(`/produtos/${item.id}`, updatedItem);
    });

    Promise.all(clearPromises)
      .catch(err => {
        console.error("Erro ao limpar o carrinho:", err);
        setProducts(originalProducts); 
        setError(new Error("Não foi possível limpar o carrinho."));
      })
      .finally(() => {
        setIsUpdating(false);
      });
  };

  const clearWishlist = () => {
    const originalProducts = [...products];
    
    const updatedProducts = products.map(p =>
      p.presenteListaDesejos === true ? { ...p, presenteListaDesejos: false } : p
    );
    setProducts(updatedProducts);
    setIsUpdating(true);

    const itemsToClear = originalProducts.filter(p => p.presenteListaDesejos === true);
    const clearPromises = itemsToClear.map(item => {
      const updatedItem = { ...item, presenteListaDesejos: false };
      // CORRIGIDO: Usa api.put()
      return api.put(`/produtos/${item.id}`, updatedItem);
    });

    Promise.all(clearPromises)
      .catch(err => {
        console.error("Erro ao limpar a wishlist:", err);
        setProducts(originalProducts); 
        setError(new Error("Não foi possível limpar seus favoritos."));
      })
      .finally(() => {
        setIsUpdating(false);
      });
  };

  // --- FUNÇÃO DE FINALIZAR COMPRA (JÁ CORRIGIDA) ---
  const finalizePurchase = (itemsPurchased) => {
    const originalProducts = [...products];
    setIsUpdating(true);

    const purchasedIds = new Set(itemsPurchased.map(item => item.id));

    const updatedProducts = products.map(p => {
      if (purchasedIds.has(p.id)) {
        return {
          ...p,
          presenteCarrinho: false,
          qtdCarrinho: 0,
          presenteListaDesejos: false,
          presentePedido: true,
          qtdPedido: p.qtdCarrinho
        };
      }
      return p;
    });
    setProducts(updatedProducts);

    const purchasePromises = itemsPurchased.map(item => {
      const updatedPayload = {
        ...item,
        presenteCarrinho: false,
        qtdCarrinho: 0,
        presenteListaDesejos: false,
        presentePedido: true,
        qtdPedido: item.qtdCarrinho
      };
      // CORRIGIDO: Usa api.put()
      return api.put(`/produtos/${item.id}`, updatedPayload);
    });

    Promise.all(purchasePromises)
      .catch(err => {
        console.error("ERRO: Falha ao finalizar a compra de produtos:", err);
        setProducts(originalProducts); 
        setError(new Error("Não foi possível registrar seus produtos comprados."));
      })
      .finally(() => {
        setIsUpdating(false);
      });
  };

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
        finalizePurchase
      }}
    >
      {children}
    </CartContext.Provider>
  );
};