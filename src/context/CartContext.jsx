import { createContext, useContext, useState } from "react";

// Criar o contexto
const CartContext = createContext();

// Hook para acessar facilmente o contexto
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);       // produtos do carrinho
  const [wishlist, setWishlist] = useState([]); // produtos favoritados

  // 🛒 Adicionar ao carrinho
  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        // Se já existir, apenas aumenta a quantidade
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  // ➖ Remover 1 unidade
  const decreaseQty = (id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, qty: item.qty - 1 } : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  // ❌ Remover do carrinho
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // ❤️ Adicionar/remover dos favoritos
  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) return prev.filter((item) => item.id !== product.id);
      return [...prev, product];
    });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        addToCart,
        decreaseQty,
        removeFromCart,
        toggleWishlist,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
