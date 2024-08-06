import React, { useState } from "react";
import { useCart } from "../contexts/CartContext";
import ShippingAddressForm from "../components/ShippingAddressForm";
import { Address } from "../types";

const Checkout: React.FC = () => {
  const { items, subtotal } = useCart();
  const [address, setAddress] = useState<Address | null>(null);

  const handleSaveAddress = (newAddress: Address) => {
    setAddress(newAddress);
    // Add logic to save address and proceed with the order
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <ShippingAddressForm onSave={handleSaveAddress} />
        </div>
        <div>
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <ul>
            {items.map((item) => (
              <li key={item.id} className="flex justify-between mb-2">
                <div>{item.title}</div>
                <div>
                  {item.quantity} x ${item.price}
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <h3 className="text-lg font-bold">Total: ${subtotal.toFixed(2)}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
