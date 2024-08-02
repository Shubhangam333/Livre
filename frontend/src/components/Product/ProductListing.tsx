import React from "react";
import ProductCard from "./ProductCard";

const ProductListing: React.FC = () => {
  return (
    <div className="flex-[5] p-4  items-center justify-center flex gap-2 flex-wrap">
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
    </div>
  );
};

export default ProductListing;
