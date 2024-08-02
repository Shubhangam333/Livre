import React from "react";
import CheckBox from "./CheckBox";

const GenreFilter: React.FC = () => {
  return (
    <div className="flex flex-col py-4">
      <CheckBox />
      <CheckBox />
      <CheckBox />
      <CheckBox />
      <CheckBox />
      <CheckBox />
    </div>
  );
};

export default GenreFilter;
