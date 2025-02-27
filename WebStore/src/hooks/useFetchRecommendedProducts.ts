import { useState, useEffect } from "react";
import { ProductProps } from "../components/ProductProps";

export const useFetchRecommendedProducts = (
  category: string,
  productId: string | undefined
) => {
  const [recommendedProducts, setRecommendedProducts] = useState<
    ProductProps[]
  >([]);

  useEffect(() => {
    const fetchRecommendedProducts = async () => {
      const localProducts = localStorage.getItem("products");
      if (localProducts) {
        const productsArray: ProductProps[] = JSON.parse(localProducts);
        const filteredProducts = productsArray.filter(
          (item) => item.category === category && item.id !== Number(productId)
        );
        setRecommendedProducts(filteredProducts);
        return;
      }

      try {
        const res = await fetch(
          `https://fakestoreapi.com/products/category/${category}`
        );
        const data = await res.json();
        setRecommendedProducts(
          data.filter((item: ProductProps) => item.id !== Number(productId))
        );
      } catch (error) {
        console.error("Error fetching recommended products:", error);
      }
    };

    if (category) {
      fetchRecommendedProducts();
    }
  }, [category, productId]);

  return recommendedProducts;
};
