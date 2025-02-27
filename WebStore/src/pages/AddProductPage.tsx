import { useState } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import {
  AttachMoney,
  Category,
  Image,
  ShoppingCart,
  Description,
} from "@mui/icons-material";
import { toast } from "react-toastify";
import { validateProductForm } from "../components/validation";
import { ProductProps } from "../components/product/ProductProps";
import "react-toastify/dist/ReactToastify.css";
import "../styles/new-product/form.css";

const AddProductPage: React.FC = () => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImage, setProductImage] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const handleAddProduct = (event: React.FormEvent) => {
    event.preventDefault();

    const validationError = validateProductForm(
      productName,
      productPrice,
      productImage,
      category,
      description
    );

    if (validationError) {
      toast.error(validationError, {
        position: "bottom-left",
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
      category: category,
      description: description,
    };

    const storedProducts = JSON.parse(localStorage.getItem("products") ?? "[]");

    const updatedProducts = [...storedProducts, newProduct];

    saveToLocalStorage(updatedProducts);

    const storedCategories = JSON.parse(
      localStorage.getItem("categories") ?? "[]"
    );
    if (!storedCategories.includes(category)) {
      saveToLocalStorage([...storedCategories, category]);
    }

    window.dispatchEvent(new Event("storage"));

    toast.success("Product added successfully!");

    setProductName("");
    setProductPrice("");
    setProductImage("");
    setCategory("");
    setDescription("");
  };

  const saveToLocalStorage = (products: ProductProps[]) => {
    localStorage.setItem("customProducts", JSON.stringify(products));
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
        id="product-category"
        label="Category"
        placeholder="Enter category"
        variant="filled"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Category />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        required
        id="product-description"
        label="Description"
        placeholder="Enter description"
        variant="filled"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Description />
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
    </form>
  );
};

export default AddProductPage;
