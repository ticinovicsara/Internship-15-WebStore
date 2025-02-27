import { useState, useEffect } from "react";
import { ProductProps } from "../components/ProductProps";

export const useFetchProduct = (productId: string | undefined) => {
  const [product, setProduct] = useState<ProductProps | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) return;
      const localProducts = localStorage.getItem("products");
      if (localProducts) {
        const productsArray: ProductProps[] = JSON.parse(localProducts);
        const localProduct = productsArray.find(
          (item) => item.id === Number(productId)
        );
        if (localProduct) {
          setProduct(localProduct);
          setLoading(false);
          return;
        }
      }

      try {
        const res = await fetch(
          `https://fakestoreapi.com/products/${productId}`
        );
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  return { product, loading };
};
