import { useCart } from "../../context/CartContext";
import "./ProductCard.css";

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, wishlist } = useCart();

  const isFav = wishlist.some((item) => item.id === product.id);

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h4>{product.name}</h4>
      <p>R$ {product.price}</p>
      <div className="actions">
        <button onClick={() => addToCart(product)}>🛒</button>
        <button onClick={() => toggleWishlist(product)}>
          {isFav ? "❤️" : "🤍"}
        </button>
      </div>
    </div>
  );
}