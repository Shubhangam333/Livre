import React from "react";
import { Product } from "../../types";
import { useCart } from "../../contexts/CartContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleCart = () => {
    if (product.stock > 0) {
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        quantity: 1,
        stock: product.stock,
        image: product.images[0]?.secure_url,
      });
      toast.success("Item added");
    } else {
      toast.error("Sorry, this product is out of stock.");
    }
  };

  const navigate = useNavigate();

  return (
    <div className="card card-compact bg-base-100 w-60 shadow-xl ">
      <figure
        className="w-full h-72 cursor-pointer"
        onClick={() => navigate(`/product/${product.id}`)}
      >
        <img
          src={product?.images[0]?.secure_url}
          alt={product.title}
          className="w-full h-full object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{product.title}</h2>
        <div className="card-actions ">
          <button className="btn btn-primary w-full">Buy Now</button>
          <button
            className="btn btn-success text-white w-full"
            onClick={handleCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
