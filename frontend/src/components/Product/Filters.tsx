import React from "react";
import GenreFilter from "./GenreFilter";
import PriceFilter from "./PriceFilter";

const Filters: React.FC = () => {
  return (
    <div className="flex flex-col gap-4">
      <GenreFilter />
      <PriceFilter />
    </div>
  );
};

export default Filters;
