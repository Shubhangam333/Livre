import React from "react";

const PriceRadio: React.FC = () => {
  return (
    <div className="flex justify-between items-center ">
      <input
        type="radio"
        name="radio-2"
        id="radios"
        className="radio radio-primary"
        defaultChecked
      />
      <label htmlFor="radios">Rs. 839 to Rs. 1272</label>
    </div>
  );
};

export default PriceRadio;
