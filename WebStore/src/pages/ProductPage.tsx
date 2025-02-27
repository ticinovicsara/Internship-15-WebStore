import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Payment } from "../components/Payment";
import { Product } from "../components/Product";
import { ProductProps } from "../components/ProductProps";
import "../styles/product/product.css";
import "../styles/product/purchase-component.css";
import "../styles/product/recommended.css";

function ProductPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState<ProductProps | null>(null);
  const [recommendedProducts, setRecommendedProducts] = useState<
    ProductProps[]
  >([]);
  const [cart, setCart] = useState<ProductProps[]>([]);

  useEffect(() => {
    async function fetchProduct() {
      if (!productId) return;

      const localProducts = localStorage.getItem("products");
      if (localProducts) {
        const productsArray: ProductProps[] = JSON.parse(localProducts);
        const localProduct = productsArray.find(
          (item) => item.id === Number(productId)
        );

        if (localProduct) {
          setProduct(localProduct);
          fetchRecommendedProducts(localProduct.category);
          return;
        }
      }

      try {
        const res = await fetch(
          `https://fakestoreapi.com/products/${productId}`
        );
        const data = await res.json();
        setProduct(data);
        fetchRecommendedProducts(data.category);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    }

    async function fetchRecommendedProducts(
      category: string,
      localProducts?: ProductProps[]
    ) {
      if (localProducts) {
        const filteredProducts = localProducts.filter(
          (item) => item.category === category && item.id !== Number(productId)
        );

        if (filteredProducts.length > 0) {
          setRecommendedProducts(filteredProducts);
          return;
        }
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
    }

    fetchProduct();
  }, [productId]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const handleAddToCart = () => {
    if (!product) return;

    const updatedCart = [...cart, product];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    window.dispatchEvent(new Event("cartUpdated"));
  };

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
          <button className="add-product-btn" onClick={handleAddToCart}>
            BUY FOR ONLY {product.price} &euro;
          </button>
          <Payment />
        </div>
      </div>
      <div className="description-box">
        <p>Description: {product.description}</p>
      </div>

      <div className="recommended-products">
        <h2>Items You might like checking out</h2>
        {recommendedProducts.length === 0 ? (
          <p className="no-recommendations">
            No recommended products in this category.
          </p>
        ) : (
          <div className="recommended-list">
            {recommendedProducts.map((item) => (
              <Product key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductPage;
