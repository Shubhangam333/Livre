import React, { ChangeEvent } from "react";
import { useCart } from "../contexts/CartContext";
import { toast } from "react-toastify";

interface CartItemProps {
  item: {
    id: string;
    title: string;
    price: number;
    quantity: number;
    stock: number;
    image: string;
  };
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (newQuantity > 0 && newQuantity <= item.stock) {
      updateQuantity(item.id, newQuantity);
    } else {
      toast.error("Quantity not available in stock.");
    }
  };

  return (
    <div className="flex items-center justify-between p-4 shadow-md rounded-lg mb-4">
      <div className="flex items-center">
        <img
          src={item.image}
          alt={item.title}
          className="w-20 h-20 object-cover mr-4"
        />
        <div>
          <h2 className="text-lg font-semibold">{item.title}</h2>
          <p className="text-primary">${item.price.toFixed(2)}</p>
        </div>
      </div>
      <div className="flex items-center">
        <input
          type="number"
          value={item.quantity}
          onChange={handleQuantityChange}
          className="border rounded-md p-2 w-16 text-center"
        />
        <button
          onClick={() => removeFromCart(item.id)}
          className="ml-4 bg-error text-white px-4 py-2 rounded-md"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
