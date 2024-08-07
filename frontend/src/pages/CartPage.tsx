import React from "react";
import { useCart } from "../contexts/CartContext";
import CartItem from "../components/CartItem";

const CartPage: React.FC = () => {
  const { items } = useCart();
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-primary-content text-center">
        Shopping Cart
      </h1>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
          <div className="mt-4 text-right">
            <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
