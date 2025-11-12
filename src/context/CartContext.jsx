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

  // Busca inicial (Sem mudanças)
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(API_URL);
        const formattedProducts = response.data.map(p => ({
          ...p,
          preco: parseFloat(p.preco),
          qtdCarrinho: parseInt(p.qtdCarrinho, 10) || 0, 
        }));
        setProducts(formattedProducts);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllProducts();
  }, []); 

  // --- Funções Otimistas (Rápidas) ---
  
  // (toggleWishlist, increaseQty, decreaseQty, removeFromCart - Sem mudanças)
  // ... (elas já são otimistas e rápidas)
  const toggleWishlist = (id) => {
    const product = products.find(p => p.id === id);
    if (!product) return;
    const updatedProduct = { ...product, presenteListaDesejos: !product.presenteListaDesejos };
    const originalProducts = [...products]; // Backup
    
    setProducts(prev => prev.map(p => p.id === id ? updatedProduct : p)); // UI
    
    axios.put(`${API_URL}/${id}`, updatedProduct) // API
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
    
    axios.put(`${API_URL}/${id}`, updatedProduct) // API
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
    
    axios.put(`${API_URL}/${id}`, updatedProduct) // API
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
    
    axios.put(`${API_URL}/${id}`, updatedProduct) // API
      .catch(err => {
        console.error("ERRO: Falha ao remover do carrinho:", err);
        setProducts(originalProducts); // Reverte
      });
  };


  // --- FUNÇÕES DE LIMPEZA (AGORA OTIMISTAS) ---
  
  // <-- 'clearCart' OTIMISTA (CORRIGIDA) -->
  const clearCart = () => {
    const originalProducts = [...products]; // Backup para reverter em caso de erro
    
    // 1. ATUALIZA A TELA IMEDIATAMENTE
    const updatedProducts = products.map(p =>
      p.qtdCarrinho > 0 ? { ...p, qtdCarrinho: 0, presenteCarrinho: false } : p
    );
    setProducts(updatedProducts);
    setIsUpdating(true); // Mostra o spinner

    // 2. MANDA PARA A API EM SEGUNDO PLANO
    const itemsToClear = originalProducts.filter(p => p.qtdCarrinho > 0);
    const clearPromises = itemsToClear.map(item => {
      const updatedItem = { ...item, qtdCarrinho: 0, presenteCarrinho: false };
      return axios.put(`${API_URL}/${item.id}`, updatedItem);
    });

    Promise.all(clearPromises)
      .catch(err => {
        console.error("Erro ao limpar o carrinho:", err);
        // 3. DESFAZ a mudança se a API falhar
        setProducts(originalProducts); 
        setError(new Error("Não foi possível limpar o carrinho."));
      })
      .finally(() => {
        setIsUpdating(false); // Para o spinner
      });
  };

  // <-- 'clearWishlist' OTIMISTA (CORRIGIDA) -->
  const clearWishlist = () => {
    const originalProducts = [...products]; // Backup para reverter
    
    // 1. ATUALIZA A TELA IMEDIATAMENTE
    const updatedProducts = products.map(p =>
      p.presenteListaDesejos === true ? { ...p, presenteListaDesejos: false } : p
    );
    setProducts(updatedProducts);
    setIsUpdating(true); // Mostra o spinner

    // 2. MANDA PARA A API EM SEGUNDO PLANO
    const itemsToClear = originalProducts.filter(p => p.presenteListaDesejos === true);
    const clearPromises = itemsToClear.map(item => {
      const updatedItem = { ...item, presenteListaDesejos: false };
      return axios.put(`${API_URL}/${item.id}`, updatedItem);
    });

    Promise.all(clearPromises)
      .catch(err => {
        console.error("Erro ao limpar a wishlist:", err);
        // 3. DESFAZ a mudança se a API falhar
        setProducts(originalProducts); 
        setError(new Error("Não foi possível limpar seus favoritos."));
      })
      .finally(() => {
        setIsUpdating(false); // Para o spinner
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
      }}
    >
      {children}
    </CartContext.Provider>
  );
};