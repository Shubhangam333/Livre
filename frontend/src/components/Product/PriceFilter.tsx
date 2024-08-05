import React from "react";
import PriceRadio from "./PriceRadio";
import { useFilter } from "../../contexts/FilterContext";

const PriceFilter: React.FC = () => {
  const priceRanges = [
    [0, 50],
    [51, 100],
    [101, 200],
    [201, 500],
    [501, 1000],
  ];
  const { setPriceRange } = useFilter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const range = e.target.value.split(",").map(Number);
    setPriceRange(range as [number, number]);
  };
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-lg">Price Range</h3>

      {priceRanges.map((range, index) => (
        <label key={index} className="block">
          <input
            type="radio"
            name="priceRange"
            value={range.join(",")}
            onChange={handleChange}
            className="mr-2"
          />
          ${range[0]} - ${range[1]}
        </label>
      ))}
    </div>
  );
};

export default PriceFilter;
