import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import the carousel styles
import * as apiClient from "../../api-client";

const AdminProductDetails = () => {
  const { productId } = useParams<{ productId: string }>();

  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => apiClient.getAdminProductById(Number(productId)),
    enabled: !!productId,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>Error fetching product details: {(error as Error).message}</div>
    );
  }

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">{product.title}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column: Product Information */}
        <div className="mt-6">
          <p className="mb-2">
            <strong>Price:</strong> ${product.price}
          </p>
          <p className="mb-2">
            <strong>Publisher:</strong> {product.publisher}
          </p>
          <p className="mb-2">
            <strong>Author:</strong> {product.author}
          </p>
          <p className="mb-2">
            <strong>Description:</strong> {product.description}
          </p>
          <p className="mb-2">
            <strong>Stock:</strong> {product.stock}
          </p>
          <p className="mb-2">
            <strong>Rating:</strong> {product.rating || "No rating available"}
          </p>
          <p className="mb-4">
            <strong>Genre:</strong> {product.genre.name}
          </p>
        </div>

        {/* Right Column: Carousel for Product Images */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Images:</h3>
          <Carousel showThumbs={false} infiniteLoop useKeyboardArrows>
            {product.images.map((image) => (
              <div key={image.id}>
                <img src={image.secure_url} alt="Product Image" />
              </div>
            ))}
          </Carousel>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Reviews:</h3>
        {product.reviews.length > 0 ? (
          product.reviews.map((review) => (
            <div key={review.id} className="mb-4">
              <p>
                <strong>Rating:</strong> {review.rating}
              </p>
              <p>
                <strong>Comment:</strong> {review.comment}
              </p>
            </div>
          ))
        ) : (
          <p>No reviews available.</p>
        )}
      </div>

      <p className="mt-4">
        <strong>Created At:</strong>{" "}
        {new Date(product.createdAt).toLocaleDateString()}
      </p>
      <p>
        <strong>Updated At:</strong>{" "}
        {new Date(product.updatedAt).toLocaleDateString()}
      </p>
    </div>
  );
};

export default AdminProductDetails;
