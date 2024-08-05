// src/components/ProductDetails.tsx
import React, { useState, FormEvent } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as apiClient from "../api-client";
import { CreateReviewRequest, Product, Review } from "../types";
import { toast } from "react-toastify";
import { showErrorMessage } from "../utils/showErrorMessage";
import { Carousel } from "react-responsive-carousel";
import { useProfile } from "../hooks/useProfile";

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const productId = id ? parseInt(id, 10) : 0;
  const queryClient = useQueryClient();
  const { data: user } = useProfile();

  // Query to fetch product data
  const { data, isLoading, error } = useQuery<Product>({
    queryKey: ["product", productId],
    queryFn: () => apiClient.getProductById(productId),
  });

  // Mutation to create a review

  const mutation = useMutation({
    mutationFn: (review: CreateReviewRequest) => apiClient.createReview(review),
    onSuccess: async () => {
      toast.success("Review submitted successfully");
      await queryClient.invalidateQueries(["product", productId]);
    },
    onError: (error: Error) => {
      showErrorMessage(error);
    },
  });

  const [reviewText, setReviewText] = useState<string>("");
  const [rating, setRating] = useState<number>(1);

  const handleReviewSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (data && user) {
      const review: CreateReviewRequest = {
        comment: reviewText,
        productId: data.id,
        rating,
        userId: user.id,
      };
      mutation.mutate(review);
      setReviewText("");
      setRating(1);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row  shadow-lg rounded-lg overflow-hidden">
        <div className="md:w-1/2">
          <Carousel showThumbs={false}>
            {data?.images.map((image) => (
              <img
                key={image.public_id}
                src={image.secure_url}
                alt={data.title}
                className="w-full h-full object-cover"
              />
            ))}
          </Carousel>
        </div>
        <div className="md:w-1/2 p-4">
          <h1 className="text-2xl font-bold mb-2">{data?.title}</h1>
          <p className=" mb-4">{data?.description}</p>
          <div className="flex items-center mb-4">
            <span className="text-xl font-semibold">${data?.price}</span>
          </div>
          <div className="mb-4">
            <p className="">Publisher: {data?.publisher}</p>
            <p className="">Author: {data?.author}</p>
            <p className="">Genre: {data?.genre.name}</p>
            <p className="">Stock: {data?.stock}</p>
          </div>
          {data?.stock > 0 ? (
            <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
              Buy Now
            </button>
          ) : (
            <button className="bg-gray-400 text-white py-2 px-4 rounded-lg cursor-not-allowed">
              Out of Stock
            </button>
          )}
        </div>
      </div>
      {user && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Reviews</h2>
          {data?.reviews.length ? (
            <div>
              {data.reviews.map((review) => (
                <div
                  key={review.id}
                  className="mb-4 p-4 border border-gray-200 rounded-lg"
                >
                  <p className="font-semibold">{review.user.name}</p>
                  <p className="text-gray-600">{review.comment}</p>
                  <p className="text-gray-500">
                    Rating: {review.rating || "N/A"}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p>No reviews yet.</p>
          )}
          <form onSubmit={handleReviewSubmit} className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Add a Review</h2>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              rows={4}
              className="w-full p-2 border border-gray-300 rounded-lg mb-4"
              placeholder="Write your review here..."
              required
            />
            <div className="flex items-center mb-4">
              <label htmlFor="rating" className="mr-2">
                Rating:
              </label>
              <select
                id="rating"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="border border-gray-300 rounded-lg"
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Submitting..." : "Submit Review"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
