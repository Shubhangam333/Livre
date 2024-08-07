import React, { useState, useEffect } from "react";
import { useCart } from "../contexts/CartContext";
import ShippingAddressForm from "../components/ShippingAddressForm";
import PayPalButton from "../components/PayPalButton";
import {
  Address,
  AddressInput,
  OrderInput,
  VerifyPaymentRequest,
} from "../types";
import { useMutation, useQuery } from "@tanstack/react-query";
import * as apiClient from "../api-client";
import { showErrorMessage } from "../utils/showErrorMessage";
import { OnApproveData } from "@paypal/paypal-js";
import { useProfile } from "../hooks/useProfile";
import { toast } from "react-toastify";

const Checkout: React.FC = () => {
  const { items, subtotal } = useCart();
  const { data: user } = useProfile();
  const [address, setAddress] = useState<Address | null>(null);

  const { data: addresses, refetch: refetchAddresses } = useQuery({
    queryKey: ["addresses"],
    queryFn: apiClient.getAddresses,
  });

  useEffect(() => {
    if (addresses && addresses.length > 0) {
      setAddress(addresses[0]);
    }
  }, [addresses]);

  const addAddressMutation = useMutation({
    mutationFn: (newAddress: AddressInput) =>
      apiClient.createAddress(newAddress),
    onSuccess: () => {
      refetchAddresses(); // Refetch addresses after adding a new one
    },
    onError: (error) => {
      showErrorMessage(error);
    },
  });

  const handleSaveAddress = (newAddress: AddressInput) => {
    addAddressMutation.mutate(newAddress);
  };

  const verifyPaymentMutation = useMutation({
    mutationFn: (data: VerifyPaymentRequest) => apiClient.verifyPayment(data),
    onSuccess: (data) => {
      if (!user) return;
      console.log("Payment verified:", data);

      const orderInput: OrderInput = {
        userId: user?.id,
        totalAmount: subtotal,
        paymentStatus: data.order.statusCode === 200 ? "succeeded" : "pending",
        paymentType: "card",
        addressId: address?.id,
        items: items.map((item) => ({
          productId: item.id,
          purchasedQty: item.quantity,
          payablePrice: item.price,
        })),
        orderStatus: [
          {
            type: "ordered",
            date: new Date(),
            isCompleted: true,
          },
        ],
      };

      createOrderMutation.mutate(orderInput);
    },
    onError: (error) => {
      showErrorMessage(error);
    },
  });

  const createOrderMutation = useMutation({
    mutationFn: (data: OrderInput) => apiClient.createOrder(data),
    onSuccess: (data) => {
      toast.success("Payment Succesfull");
    },
    onError: (error) => {
      showErrorMessage(error);
    },
  });

  const handlePaymentSuccess = (details: any, data: OnApproveData) => {
    if (data && data.orderID) {
      verifyPaymentMutation.mutate({ orderID: data.orderID });
    } else {
      toast.error("Something went wrong");
    }
  };

  if (!user) return null;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center text-primary-content">
        Checkout
      </h1>
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
          {address && (
            <div className="mt-4 p-4 border rounded shadow">
              <h2 className="text-xl font-bold">Shipping Address</h2>
              <p>{address.street}</p>
              <p>{address.city}</p>
              <p>{address.state}</p>
              <p>{address.zipCode}</p>
              <p>{address.country}</p>
            </div>
          )}
          <div className="mt-4">
            {addresses && addresses?.length > 0 && (
              <PayPalButton
                amount={subtotal}
                onSuccess={handlePaymentSuccess}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
