import { ProductProps } from "./ProductProps";
import { Payment } from "./Payment";

interface ProductDetailsProps {
  product: ProductProps;
  onAddToCart: () => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({
  product,
  onAddToCart,
}) => {
  return (
    <div className="product-details">
      <img src={product.image} alt={product.title} />
      <div className="details-text">
        <h1>{product.title}</h1>
        <p>Price: {product.price} &euro;</p>
        <p>Category: {product.category}</p>
        <button className="add-product-btn" onClick={onAddToCart}>
          BUY FOR ONLY {product.price} &euro;
        </button>
        <Payment />
      </div>
    </div>
  );
};

export default ProductDetails;
