import { useState, useEffect } from "react";
import { ProductProps } from "../components/product/ProductProps";

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
    if (!category || !productId) return;

    setLoading(true);
    setError(null);

    const fetchRecommendedProducts = async () => {
      try {
        const storedProducts: ProductProps[] = JSON.parse(
          localStorage.getItem("customProducts") || "[]"
        );

        const filteredLocal = storedProducts.filter(
          (item) => item.category === category && item.id !== Number(productId)
        );

        if (filteredLocal.length > 0) {
          setRecommendedProducts(filteredLocal);
          setLoading(false);
          return;
        }

        const res = await fetch(`https://fakestoreapi.com/products/`);
        const data: ProductProps[] = await res.json();

        const filteredAPI = data.filter(
          (item) => item.category === category && item.id !== Number(productId)
        );

        setRecommendedProducts(filteredAPI);

        localStorage.setItem("products", JSON.stringify(data));
      } catch (error) {
        setError("Failed to fetch recommended products");
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendedProducts();
  }, [category, productId]);

  return { recommendedProducts, loading, error };
};
