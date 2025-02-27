import { useState, useEffect } from "react";
import { ProductProps } from "../components/product/ProductProps";

export const useFetchProduct = (productId: string | undefined) => {
  const [product, setProduct] = useState<ProductProps | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!productId) return;

    setLoading(true);
    setError(null);

    const fetchProduct = async () => {
      try {
        const storedProducts = JSON.parse(
          localStorage.getItem("customProducts") || "[]"
        );

        const localProduct = storedProducts.find(
          (p: ProductProps) => p.id === Number(productId)
        );
        if (localProduct) {
          setProduct(localProduct);
          setLoading(false);
          return;
        }

        const res = await fetch(
          `https://fakestoreapi.com/products/${productId}`
        );
        const data: ProductProps = await res.json();

        setProduct(data);
      } catch (error) {
        setError("Failed to fetch product");
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  return { product, loading, error };
};
