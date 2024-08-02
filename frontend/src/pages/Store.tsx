import React from "react";
import SearchBar from "../components/Product/SearchBar";
import ProductListing from "../components/Product/ProductListing";
import Filters from "../components/Product/Filters";

const Store: React.FC = () => {
  return (
    <div className="w-full my-12">
      <h1 className="text-center text-4xl ">Livre Book Shop</h1>
      <div className="m-12">
        <SearchBar />
      </div>
      <div className="mx-12 flex justify-between ">
        <Filters />
        <ProductListing />
      </div>
    </div>
  );
};

export default Store;
