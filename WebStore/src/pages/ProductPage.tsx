import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Payment } from "../components/Payment";
import "../styles/product/product.css";

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  description: string;
};

function ProductPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    async function fetchProduct() {
      if (!productId) return;

      const localProducts = localStorage.getItem("products");
      if (localProducts) {
        const productsArray: Product[] = JSON.parse(localProducts);
        const localProduct = productsArray.find(
          (item) => item.id === Number(productId)
        );

        if (localProduct) {
          setProduct(localProduct);
          return;
        }
      }

      if (productId) {
        try {
          const res = await fetch(
            `https://fakestoreapi.com/products/${productId}`
          );
          const data = await res.json();
          setProduct(data);
        } catch (error) {
          console.error("Error fetching product:", error);
        }
      }
    }

    fetchProduct();
  }, [productId]);

  if (!product) {
    return <p>Loading product...</p>;
  }

  return (
    <div className="details-container">
      <div className="product-details">
        <img src={product.image} alt={product.title} />
        <div className="details-text">
          <h1>{product.title}</h1>
          <p>Price: {product.price} &euro;</p>
          <p>Category: {product.category}</p>
          <button className="add-product-btn">
            BUY FOR ONLY {product.price} &euro;
          </button>
          <Payment />
        </div>
      </div>
      <div className="description-box">
        <p>Description: {product.description}</p>
      </div>
    </div>
  );
}

export default ProductPage;
