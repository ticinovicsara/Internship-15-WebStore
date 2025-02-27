import { useParams } from "react-router-dom";
import { useFetchProduct } from "../hooks/useFetchProduct";
import { useFetchRecommendedProducts } from "../hooks/useFetchRecommendedProducts";
import { CartManagement } from "../components/Cart/CartManagement";
import ProductDetails from "../components/product/ProductDetails";
import RecommendedProducts from "../components/product/RecommendedProducts";
import "../styles/product/product.css";
import "../styles/product/purchase-component.css";
import "../styles/product/recommended.css";
import NotFoundPage from "./NotFoundPage";

const ProductPage = () => {
  const { productId } = useParams();
  const { product, loading } = useFetchProduct(productId) || {};

  const category = product ? product.category : "";
  const {
    recommendedProducts,
    loading: recommendedLoading,
    error,
  } = useFetchRecommendedProducts(category, productId);

  const { handleAddToCart } = CartManagement();

  if (loading) {
    return <p>Loading product...</p>;
  }

  if (!product) {
    return <NotFoundPage />;
  }

  return (
    <div className="details-container">
      <ProductDetails
        product={product}
        onAddToCart={() => handleAddToCart(product)}
      />
      <div className="description-box">
        <p>Description: {product.description}</p>
      </div>

      {product.category &&
        (recommendedLoading ? (
          <p>Loading recommended products...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <RecommendedProducts
            recommendedProducts={recommendedProducts}
            currentCategory={product.category}
          />
        ))}
    </div>
  );
};

export default ProductPage;
