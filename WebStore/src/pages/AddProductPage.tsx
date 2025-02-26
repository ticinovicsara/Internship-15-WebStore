import { useState } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import {
  AttachMoney,
  Category,
  Image,
  ShoppingCart,
} from "@mui/icons-material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/new-product/form.css";

const AddProductPage: React.FC = () => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImage, setProductImage] = useState("");

  const handleAddProduct = (event: React.FormEvent) => {
    event.preventDefault();

    const priceValue = parseFloat(productPrice);

    if (!productName || !productPrice || !productImage) {
      toast.error("All fields are required!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
      });
      return;
    } else if (priceValue <= 0) {
      toast.error("Price cannot be less than 0!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
      });
      return;
    }

    const newProduct = {
      id: Date.now(),
      title: productName,
      price: productPrice,
      image: productImage,
      category: "custom",
    };

    const storedProducts = JSON.parse(localStorage.getItem("products") ?? "[]");

    const updatedProducts = [...storedProducts, newProduct];
    localStorage.setItem("products", JSON.stringify(updatedProducts));

    toast.success("Product added successfully!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
    });

    setProductName("");
    setProductPrice("");
    setProductImage("");
  };

  return (
    <form className="form-container" onSubmit={handleAddProduct}>
      <h1>Add New Product</h1>
      <TextField
        required
        id="product-name"
        label="Product Name"
        placeholder="Enter product name"
        variant="filled"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <ShoppingCart />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        id="product-price"
        label="Price"
        type="number"
        variant="filled"
        placeholder="Enter price"
        value={productPrice}
        onChange={(e) => setProductPrice(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AttachMoney />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        required
        id="product-image"
        label="Image URL"
        placeholder="Paste image URL"
        variant="filled"
        value={productImage}
        onChange={(e) => setProductImage(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Image />
            </InputAdornment>
          ),
        }}
      />

      <button className="newProduct-btn">Add Product</button>

      <ToastContainer />
    </form>
  );
};

export default AddProductPage;
