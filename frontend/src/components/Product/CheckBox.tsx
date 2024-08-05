import React from "react";

type CheckBoxProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const CheckBox: React.FC<CheckBoxProps> = ({ value, onChange }) => {
  return (
    <>
      <div className="form-control ">
        <label
          className="label cursor-pointer flex justify-between items-center"
          htmlFor={value}
        >
          <span className="label-text">{value}</span>
          <input
            type="radio"
            value={value}
            onChange={onChange}
            name={value}
            // className="cy"
            className="radio radio-primary"
          />
        </label>
      </div>
    </>
  );
};

export default CheckBox;
