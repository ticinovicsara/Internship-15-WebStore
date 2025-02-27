import { ReactElement, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CartIcon } from "./Cart";
import "../styles/header/navbar.css";
import "../styles/header/cart.css";

export const Navigation = (): ReactElement => {
  return (
    <div>
      <nav>
        <h1 className="logo">WebStore</h1>
        <div className="nav-items">
          <Link to="/">Home</Link>
          <Link to="/add-product">Add Product</Link>
          <CartIcon />
        </div>
      </nav>
    </div>
  );
};
