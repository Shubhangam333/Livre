// ProductListing.tsx
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getProducts } from "../../api-client";
import { PaginatedProductsResponse, Product } from "../../types";
import Loading from "../../ui/Loader";
import { useFilter } from "../../contexts/FilterContext";

const ProductListing: React.FC = () => {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(6);

  const { genre, priceRange, search } = useFilter();

  const { data, error, isLoading } = useQuery<PaginatedProductsResponse, Error>(
    {
      queryKey: ["products", page, pageSize, genre, priceRange, search],
      queryFn: () => getProducts(page, pageSize, genre, priceRange, search),
    }
  );

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  if (isLoading) return <Loading />;
  if (error) return <div>Error fetching products</div>;

  return (
    <div>
      <div className="p-4 items-center  justify-center flex gap-2 flex-wrap">
        {data?.products.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="flex justify-center items-center mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={page === 1}
          className="btn btn-primary"
        >
          Previous
        </button>
        <span className="mx-4">
          Page {page} of {data?.totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={page === data?.totalPages}
          className="btn btn-primary"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductListing;
