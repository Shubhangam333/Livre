import React from "react";

const SelectFilter: React.FC = () => {
  return (
    <>
      <select className="select select-primary w-full max-w-xs ml-0">
        <option disabled selected>
          What is the best TV show?
        </option>
        <option>Game of Thrones</option>
        <option>Lost</option>
        <option>Breaking Bad</option>
        <option>Walking Dead</option>
      </select>
    </>
  );
};

export default SelectFilter;
