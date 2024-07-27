import React from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  icon: string;
};

const Logo: React.FC<Props> = ({ icon }) => {
  const navigate = useNavigate();
  return (
    <div
      className="flex items-center gap-2 basis-32 cursor-pointer"
      onClick={() => navigate("/")}
    >
      <picture className=" block">
        <img src={icon} alt="logo" className="w-full h-full object-cover" />
      </picture>
      <h2 className="font-bold text-primary uppercase text-2xl">Livre.</h2>
    </div>
  );
};

export default Logo;
