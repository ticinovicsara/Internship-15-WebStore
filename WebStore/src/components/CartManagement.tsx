import { useState, useEffect } from "react";
import { ProductProps } from "../components/ProductProps";
import { toast } from "react-toastify";

export const CartManagement = () => {
  const [cart, setCart] = useState<ProductProps[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const handleAddToCart = (product: ProductProps) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.success("Product added to cart successfully!");
    window.dispatchEvent(new Event("cartUpdated"));
  };

  return { cart, handleAddToCart };
};
