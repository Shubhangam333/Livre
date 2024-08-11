import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import * as apiClient from "../../api-client";
import { getProductResponse } from "../../types";

const AdminProducts = () => {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryKey: ["allProducts", page],
    queryFn: () => apiClient.getProducts(page, 10),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching products: {(error as Error).message}</div>;
  }

  const { products, currentPage, totalPages } = data!;

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

  const viewProductDetails = (productId: number) => {
    navigate(`/products/admin/${productId}`);
  };

  return (
    <div>
      <h2>All Products</h2>
      {products.length > 0 ? (
        <>
          <table className="min-w-full border">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b">Product Title</th>
                <th className="px-6 py-3 border-b">Price</th>
                <th className="px-6 py-3 border-b">Publisher</th>
                <th className="px-6 py-3 border-b">Author</th>
                <th className="px-6 py-3 border-b">Image</th>
                <th className="px-6 py-3 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product: getProductResponse) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 border-b">{product.title}</td>
                  <td className="px-6 py-4 border-b">${product.price}</td>
                  <td className="px-6 py-4 border-b">{product.publisher}</td>
                  <td className="px-6 py-4 border-b">{product.author}</td>
                  <td className="px-6 py-4 border-b">
                    <img
                      src={product.images[0]?.secure_url}
                      alt={product.title}
                      className="w-20 h-20 object-cover"
                    />
                  </td>
                  <td className="px-6 py-4 border-b">
                    <button
                      onClick={() => viewProductDetails(product.id)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      View Product
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
        <p>No products found.</p>
      )}
    </div>
  );
};

export default AdminProducts;
