// validation.ts

export function validateProductForm(
  productName: string,
  productPrice: string,
  productImage: string,
  category: string,
  description: string
) {
  const priceValue = parseFloat(productPrice);

  if (
    !productName ||
    !productPrice ||
    !productImage ||
    !category ||
    !description
  ) {
    return "All fields are required!";
  }

  if (priceValue <= 0) {
    return "Price cannot be less than 0!";
  }

  return null; // No errors
}
