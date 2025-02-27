import { useEffect, useState } from "react";
import { Product } from "../components/product/Product";
import { ProductProps } from "../components/product/ProductProps";
import { fetchCategories, fetchProducts } from "../api/api";
import "../styles/home/card.css";
import "../styles/home/title.css";

function HomePage() {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const loadProductsAndCategories = async () => {
      try {
        const apiProducts = await fetchProducts();
        const customProducts = JSON.parse(
          localStorage.getItem("customProducts") ?? "[]"
        );

        const uniqueProducts = Array.from(
          new Map(
            [...apiProducts, ...customProducts].map((p) => [p.id, p])
          ).values()
        );

        setProducts(uniqueProducts);

        const catData = await fetchCategories();
        const localCategories = Array.from(
          new Set(
            customProducts.map(
              (product: ProductProps) => product.category || "uncategorized"
            )
          )
        );

        const allCategories = Array.from(
          new Set([...catData, ...localCategories])
        );
        setCategories(allCategories);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    loadProductsAndCategories();

    const handleFocus = () => {
      loadProductsAndCategories();
    };

    window.addEventListener("focus", handleFocus);
    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  const filteredProducts = products.filter((p) => {
    return (
      p.title.toLowerCase().includes(search.toLowerCase()) &&
      (!category || p.category === category)
    );
  });

  return (
    <div>
      <div className="products-container">
        <h1>Products</h1>
        <input
          type="text"
          placeholder="Search..."
          className="search-input"
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          onChange={(e) => setCategory(e.target.value)}
          className="dropdown-categories"
        >
          <option value="">All categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "15px",
          justifyContent: "center",
        }}
      >
        {filteredProducts.map((p) => {
          return <Product key={p.id} item={p} />;
        })}
      </div>
    </div>
  );
}
export default HomePage;
