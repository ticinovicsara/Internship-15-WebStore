import { useState, useEffect } from "react";
import { ProductProps } from "../components/ProductProps";

export const useFetchProduct = (productId: string | undefined) => {
  const [product, setProduct] = useState<ProductProps | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      setLoading(true);

      const localProducts = localStorage.getItem("products");
      if (localProducts) {
        const productsArray: ProductProps[] = JSON.parse(localProducts);
        const localProduct = productsArray.find(
          (p) => p.id === Number(productId)
        );

        if (localProduct) {
          setProduct((prev) =>
            JSON.stringify(prev) === JSON.stringify(localProduct)
              ? prev
              : localProduct
          );
          setLoading(false);
          return;
        }
      }

      try {
        const res = await fetch(
          `https://fakestoreapi.com/products/${productId}`
        );
        const data = await res.json();

        setProduct((prev) =>
          JSON.stringify(prev) === JSON.stringify(data) ? prev : data
        );
      } catch (error) {
        console.error("Failed to fetch product");
      }

      setLoading(false);
    };

    fetchProduct();
  }, [productId]);

  return { product, loading };
};
