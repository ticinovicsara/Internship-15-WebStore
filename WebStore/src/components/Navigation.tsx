import { ReactElement } from "react";
import { Link } from "react-router-dom";
import "../styles/header/navbar.css";

export const Navigation = (): ReactElement => {
  return (
    <div>
      <nav>
        <h1 className="logo">WebStore</h1>
        <div className="nav-items">
          <Link to="/">Home</Link>
          <Link to="/add-product">Add Product</Link>
        </div>
      </nav>
    </div>
  );
};
