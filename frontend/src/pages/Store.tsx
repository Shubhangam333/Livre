import React from "react";
import SearchBar from "../components/Product/SearchBar";
import ProductListing from "../components/Product/ProductListing";
import Filters from "../components/Product/Filters";
import { FilterProvider } from "../contexts/FilterContext";

const Store: React.FC = () => {
  return (
    <FilterProvider>
      <div className="w-full my-12">
        <h1 className="text-center text-4xl ">Livre Book Shop</h1>
        <div className="m-12">
          <SearchBar />
        </div>
        <div className="mx-12 flex ">
          <div className="w-1/5">
            <Filters />
          </div>
          <div className="w-4/5">
            <ProductListing />
          </div>
        </div>
      </div>
    </FilterProvider>
  );
};

export default Store;
