import React from "react";
import hero from "/hero.png";

const Hero: React.FC = () => {
  return (
    <div className="hero bg-base-100 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse gap-4">
        <img
          src={hero}
          className="mask mask-circle lg:max-w-md sm:max-w-[70%] md:max-w-[70%] rounded-lg shadow-2xl"
        />
        <div className="flex flex-col  justify-between items-center lg:max-w-xl">
          <h1 className="text-5xl font-bold">Livre Book Shop</h1>
          <p className="py-6 lg:text-lg sm:text-center">
            Discover a World of Books at Our Online Bookstore – From Bestsellers
            to Classics, Find Your Next Great Read
          </p>
          <button className="btn btn-primary rounded-lg sm:w-full lg:w-44">
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
