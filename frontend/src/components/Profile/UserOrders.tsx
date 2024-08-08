import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import * as apiClient from "../../api-client";

const UserOrders = ({ userId }: { userId: number }) => {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const { data, isLoading, error } = useQuery({
    queryKey: ["userOrders", userId, page],
    queryFn: () => apiClient.getUserOrders(userId, page),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching orders: {(error as Error).message}</div>;
  }

  const { orders, currentPage, totalPages } = data!;

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setPage(currentPage - 1);
    }
  };

  const viewOrderDetails = (orderId: number) => {
    navigate(`/orders/${orderId}`);
  };

  return (
    <div>
      <h2>Your Orders</h2>
      {orders.length > 0 ? (
        <>
          <table className="min-w-full  border">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b">Order ID</th>
                <th className="px-6 py-3 border-b">Total Amount</th>
                <th className="px-6 py-3 border-b">Payment Status</th>
                <th className="px-6 py-3 border-b">Order Date</th>
                <th className="px-6 py-3 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 border-b">{order.id}</td>
                  <td className="px-6 py-4 border-b">${order.totalAmount}</td>
                  <td className="px-6 py-4 border-b">{order.paymentStatus}</td>
                  <td className="px-6 py-4 border-b">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 border-b">
                    <button
                      onClick={() => viewOrderDetails(order.id)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      View Order
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex my-4 justify-center gap-4 items-center">
            <button
              className="btn btn-primary"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="btn btn-primary"
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default UserOrders;
