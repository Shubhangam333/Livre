import React, { useState } from "react";
import { Address } from "../types";

interface ShippingAddressFormProps {
  onSave: (address: Address) => void;
}

const ShippingAddressForm: React.FC<ShippingAddressFormProps> = ({
  onSave,
}) => {
  const [address, setAddress] = useState<Address>({
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(address);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="mb-4">
        <label className="block text-gray-700">Street</label>
        <input
          type="text"
          name="street"
          value={address.street}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">City</label>
        <input
          type="text"
          name="city"
          value={address.city}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">State</label>
        <input
          type="text"
          name="state"
          value={address.state}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Zip Code</label>
        <input
          type="text"
          name="zipCode"
          value={address.zipCode}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Country</label>
        <input
          type="text"
          name="country"
          value={address.country}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full px-3 py-2 text-white bg-blue-500 rounded"
      >
        Save Address
      </button>
    </form>
  );
};

export default ShippingAddressForm;
