import { useParams } from "react-router-dom";
import { useFetchProduct } from "../hooks/useFetchProduct";
import { useFetchRecommendedProducts } from "../hooks/useFetchRecommendedProducts";
import { CartManagement } from "../components/CartManagement";
import ProductDetails from "../components/ProductDetails";
import RecommendedProducts from "../components/RecommendedProducts";
import { ToastContainer } from "react-toastify";
import "../styles/product/product.css";
import "../styles/product/purchase-component.css";
import "../styles/product/recommended.css";

const ProductPage = () => {
  const { productId } = useParams();
  const { product, loading } = useFetchProduct(productId);
  const recommendedProducts = useFetchRecommendedProducts(
    product?.category || "",
    productId
  );
  const { handleAddToCart } = CartManagement();

  if (loading) {
    return <p>Loading product...</p>;
  }

  if (!product) {
    return <p>Product not found!</p>;
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
      <RecommendedProducts recommendedProducts={recommendedProducts} />
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={true}
      />
    </div>
  );
};

export default ProductPage;
