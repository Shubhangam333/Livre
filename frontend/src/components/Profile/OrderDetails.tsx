import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import * as apiClient from "../../api-client";

const OrderDetails = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { data, isLoading, error } = useQuery({
    queryKey: ["orderDetails", orderId],
    queryFn: () => apiClient.getOrderById(Number(orderId)),
  });

  if (isLoading) {
    return <div className="text-center text-lg">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-lg text-error">
        Error fetching order details: {(error as Error).message}
      </div>
    );
  }

  const order = data!;

  return (
    <div className="flex justify-center items-center">
      <div className="bg-base-100 shadow-md rounded-lg p-6">
        <h2 className="text-3xl font-bold mb-4">
          Order Details (ID: {order.id})
        </h2>

        <div className="flex flex-wrap max-w-lg">
          <div className="mb-6">
            <h3 className="text-2xl font-semibold mb-2">Order Summary</h3>
            <p className="text-lg mb-1">
              <span className="font-medium">Total Amount:</span> $
              {order.totalAmount}
            </p>
            <p className="text-lg mb-1">
              <span className="font-medium">Payment Status:</span>{" "}
              {order.paymentStatus}
            </p>
            <p className="text-lg mb-1">
              <span className="font-medium">Payment Type:</span>{" "}
              {order.paymentType}
            </p>
            <p className="text-lg mb-1">
              <span className="font-medium">Order Date:</span>{" "}
              {new Date(order.createdAt).toLocaleDateString()}
            </p>
            <p className="text-lg mb-1">
              <span className="font-medium">Coupon Code:</span>{" "}
              {order.couponCode || "N/A"}
            </p>
            <p className="text-lg mb-4">
              <span className="font-medium">Coupon Value:</span> $
              {order.couponValue || 0}
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-2xl font-semibold mb-2">Order Items</h3>
            <ul className="list-disc pl-5">
              {order.items.map((item) => (
                <li key={item.id} className="text-lg mb-2">
                  <span className="font-medium">Product ID:</span>{" "}
                  {item.productId},
                  <span className="font-medium"> Quantity:</span>{" "}
                  {item.purchasedQty},
                  <span className="font-medium"> Price:</span> $
                  {item.payablePrice}
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-2xl font-semibold mb-2">Order Status</h3>
            <ul className="list-disc pl-5">
              {order.orderStatus.map((status) => (
                <li key={status.id} className="text-lg mb-2">
                  <span className="font-medium">{status.type}:</span>{" "}
                  {status.isCompleted ? "Completed" : "Pending"} on{" "}
                  {new Date(status.date).toLocaleDateString()}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-2">Delivery Address</h3>
            {order.address ? (
              <p className="text-lg">
                {order.address.street}, {order.address.city},{" "}
                {order.address.state}, {order.address.zipCode},{" "}
                {order.address.country}
              </p>
            ) : (
              <p className="text-lg">No address provided.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
