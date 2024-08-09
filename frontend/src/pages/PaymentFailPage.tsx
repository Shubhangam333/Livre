import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PaymentFailPage = () => {
  const navigate = useNavigate();
  const [shouldDisplay, setShouldDisplay] = useState(false);

  useEffect(() => {
    // Using a slight delay before checking sessionStorage
    const timer = setTimeout(() => {
      const paymentFailed = sessionStorage.getItem("paymentFailed");

      if (paymentFailed) {
        sessionStorage.removeItem("paymentFailed");
        setShouldDisplay(true);

        // Redirect after 5 seconds
        setTimeout(() => {
          navigate("/");
        }, 5000);
      } else {
        navigate("/");
      }
    }, 0); // Using 0 delay to ensure the check runs after the initial render

    return () => clearTimeout(timer);
  }, [navigate]);

  // Only render the payment failure page if shouldDisplay is true
  if (!shouldDisplay) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-red-50">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <img
          src="https://cdn-icons-png.flaticon.com/512/1828/1828665.png" // Failure image URL
          alt="Failure"
          className="w-32 h-32 mx-auto mb-4"
        />
        <h1 className="text-3xl font-bold text-red-600 mb-4">
          Payment Failed!
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          Something went wrong with your payment. Please try again.
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          Go Back to Home
        </button>
      </div>
    </div>
  );
};

export default PaymentFailPage;
