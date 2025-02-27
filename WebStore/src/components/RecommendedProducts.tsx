import { ProductProps } from "../components/ProductProps";
import { Product } from "../components/Product";

interface RecommendedProductsProps {
  recommendedProducts: ProductProps[];
  currentCategory: string;
}

const RecommendedProducts: React.FC<RecommendedProductsProps> = ({
  recommendedProducts,
}) => {
  return (
    <div className="recommended-products">
      <h2>Items you might like checking out</h2>
      {recommendedProducts.length === 0 ? (
        <p className="no-recommendations">
          No recommended products in this category.
        </p>
      ) : (
        <div className="recommended-list">
          {recommendedProducts.slice(0, 4).map((item) => (
            <Product key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RecommendedProducts;
