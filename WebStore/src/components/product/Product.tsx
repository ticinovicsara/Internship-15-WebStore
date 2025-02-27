import { Link } from "react-router-dom";
import { ProductProps } from "./ProductProps";

type Props = {
  item: ProductProps;
};

export const Product = ({ item }: Props) => {
  return (
    <Link to={`/product/${item.id}`} className="item-card">
      <div className="image-container">
        <img src={item.image} alt={item.title} />
      </div>
      <div className="text-box">
        <h4>{item.title}</h4>
        <p>{item.price} &euro;</p>
      </div>
    </Link>
  );
};
