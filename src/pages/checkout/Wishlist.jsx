import { useCart } from "../../context/CartContext";

export default function Wishlist() {
  const { wishlist, toggleWishlist, addToCart } = useCart();

  return (
    <div>
      <h2>❤️ Meus Favoritos</h2>
      {wishlist.length === 0 ? (
        <p>Você ainda não favoritou nenhum produto.</p>
      ) : (
        wishlist.map((item) => (
          <div key={item.id}>
            <h4>{item.name}</h4>
            <button onClick={() => addToCart(item)}>Adicionar ao Carrinho</button>
            <button onClick={() => toggleWishlist(item)}>Remover ❤️</button>
          </div>
        ))
      )}
    </div>
  );
}
