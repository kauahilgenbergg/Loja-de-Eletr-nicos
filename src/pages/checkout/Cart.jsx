import { useCart } from "../../context/CartContext";

export default function Cart() {
  const { cart } = useCart();

  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div>
      <h2>🛒 Meu Carrinho</h2>
      {cart.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <>
          {cart.map((item) => (
            <CartItem key={item.id} product={item} />
          ))}
          <h3>Total: R$ {total.toFixed(2)}</h3>
        </>
      )}
    </div>
  );
}