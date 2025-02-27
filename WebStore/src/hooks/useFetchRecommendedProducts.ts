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
    if (!category || !productId) return;

    setLoading(true);
    setError(null);

    console.log("Fetching recommended products for category:", category);
    console.log("Excluding productId:", productId);

    const fetchRecommendedProducts = async () => {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/`);
        const data: ProductProps[] = await res.json();

        console.log("Fetched all products:", data);

        const filteredData = data.filter(
          (item) => item.category === category && item.id !== Number(productId)
        );

        console.log("Filtered recommended products:", filteredData);

        setRecommendedProducts(filteredData);
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
