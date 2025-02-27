import { ProductProps } from "../components/ProductProps";
import { Product } from "../components/Product";

interface RecommendedProductsProps {
  recommendedProducts: ProductProps[];
}

const RecommendedProducts: React.FC<RecommendedProductsProps> = ({
  recommendedProducts,
}) => {
  return (
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
  );
};

export default RecommendedProducts;
