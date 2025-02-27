import { ProductProps } from "../components/ProductProps";
import { Product } from "../components/Product";

interface RecommendedProductsProps {
  recommendedProducts: ProductProps[];
  currentCategory: string;
}

const RecommendedProducts: React.FC<RecommendedProductsProps> = ({
  recommendedProducts,
  currentCategory,
}) => {
  console.log("Current Category:", currentCategory);
  console.log("Recommended Products:", recommendedProducts);

  const filteredProducts = recommendedProducts.filter((item) => {
    const categoryMatch =
      item.category.trim().toLowerCase() ===
      currentCategory.trim().toLowerCase();
    console.log(
      `Checking product ${item.id} with category "${item.category}" against "${currentCategory}": ${categoryMatch}`
    );
    return categoryMatch;
  });

  console.log("Filtered Products:", filteredProducts);

  return (
    <div className="recommended-products">
      <h2>Items You might like checking out</h2>
      {filteredProducts.length === 0 ? (
        <p className="no-recommendations">
          No recommended products in this category.
        </p>
      ) : (
        <div className="recommended-list">
          {filteredProducts.map((item) => (
            <Product key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RecommendedProducts;
