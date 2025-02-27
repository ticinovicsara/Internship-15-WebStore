// Ovaj fajl sadrži funkcije za API pozive

// Funkcija za preuzimanje proizvoda
export const fetchProducts = async () => {
  try {
    const res = await fetch("https://fakestoreapi.com/products?limit=20");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// Funkcija za preuzimanje kategorija proizvoda
export const fetchCategories = async () => {
  try {
    const res = await fetch("https://fakestoreapi.com/products/categories");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};
