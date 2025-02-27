import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { ToastContainer } from "react-toastify";
import HomePage from "./pages/HomePage";
import AddProductPage from "./pages/AddProductPage";
import ProductPage from "./pages/ProductPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add-product" element={<AddProductPage />} />
        <Route path="/product/:productId" element={<ProductPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={true}
      />
    </Router>
  );
}

export default App;
