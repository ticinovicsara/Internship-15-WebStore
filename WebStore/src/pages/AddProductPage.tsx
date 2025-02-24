import React from "react";
import TextField from "@mui/material/TextField";
import "../styles/new-product/form.css";

const AddProductPage: React.FC = () => {
  return (
    <div className="form-container">
      <h1>Add New Product</h1>
      <TextField
        required
        id="filled-required"
        label="Required"
        placeholder="Product Name"
        variant="filled"
      />
      <TextField
        id="filled-number"
        label="Number"
        type="number"
        variant="filled"
        placeholder="Product Price"
        slotProps={{
          inputLabel: {
            shrink: true,
          },
        }}
      />
      <TextField
        required
        id="filled-required"
        label="Required"
        placeholder="Product Image"
        variant="filled"
      />

      <button className="newProduct-btn">Add Product</button>
    </div>
  );
};

export default AddProductPage;
