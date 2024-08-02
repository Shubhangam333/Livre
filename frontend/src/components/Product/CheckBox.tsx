import React from "react";

const CheckBox: React.FC = () => {
  return (
    <>
      <div className="form-control ">
        <label className="label cursor-pointer flex justify-between items-center">
          <span className="label-text">Remember me</span>
          <input
            type="checkbox"
            defaultChecked
            className="checkbox checkbox-primary"
          />
        </label>
      </div>
    </>
  );
};

export default CheckBox;
