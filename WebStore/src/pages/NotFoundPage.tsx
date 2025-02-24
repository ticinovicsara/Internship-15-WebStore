import React from "react";
import { Link } from "react-router-dom";
import "../styles/not-found.css";

const NotFoundPage: React.FC = () => {
  return (
    <div className="not-found-container">
      <img src="/404-page.png" className="not-found-image" />
      <p className="oops-text">
        Oops! The page you are looking for does not exist.
      </p>
      <Link to="/" className="back-home">
        Back to the good stuff
      </Link>
    </div>
  );
};

export default NotFoundPage;
