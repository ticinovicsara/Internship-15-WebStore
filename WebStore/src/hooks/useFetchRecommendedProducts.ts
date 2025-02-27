import { useState, useEffect } from "react";
import { ProductProps } from "../components/ProductProps";

export const useFetchRecommendedProducts = (
  category: string,
  productId: string | undefined
) => {
  const [recommendedProducts, setRecommendedProducts] = useState<
    ProductProps[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecommendedProducts = async () => {
      const localProducts = localStorage.getItem("products");
      setLoading(true);
      setError(null);

      if (localProducts) {
        const productsArray: ProductProps[] = JSON.parse(localProducts);
        const filteredProducts = productsArray.filter(
          (item) => item.category === category && item.id !== Number(productId)
        );
        setRecommendedProducts(filteredProducts);
        setLoading(false);
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
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch recommended products");
        setLoading(false);
      }
    };

    if (category) {
      fetchRecommendedProducts();
    }
  }, [category, productId]);

  return { recommendedProducts, loading, error };
};
