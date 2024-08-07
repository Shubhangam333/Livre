import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import {
  CreateOrderActions,
  OnApproveData,
  OnApproveActions,
} from "@paypal/paypal-js";

interface PayPalButtonProps {
  amount: number;
  onSuccess: (details: any, data: OnApproveData) => void;
}

const PayPalButton: React.FC<PayPalButtonProps> = ({ amount, onSuccess }) => {
  return (
    <PayPalScriptProvider
      options={{
        "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
      }}
    >
      <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={(data, actions: CreateOrderActions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: amount.toFixed(2), // Ensure amount is formatted as a string with 2 decimal places
                },
              },
            ],
          });
        }}
        onApprove={async (data: OnApproveData, actions: OnApproveActions) => {
          try {
            const details = await actions?.order?.capture();
            console.log("Payment details:", details);
            console.log("Approval data:", data);
            onSuccess(details, data);
          } catch (error) {
            console.error("PayPal payment capture failed:", error);
          }
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;
