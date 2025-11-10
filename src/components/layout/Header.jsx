import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";

export default function Header() {
  const { cart, wishlist } = useCart();

  return (
    <header className="header">
      <h1>🛒 Zanon Store</h1>
      <nav>
        <Link to="/catalog">Catálogo</Link>
        <Link to="/checkout/cart">Carrinho ({cart.length})</Link>
        <Link to="/checkout/wishlist">Favoritos ({wishlist.length})</Link>
      </nav>
    </header>
  );
}
