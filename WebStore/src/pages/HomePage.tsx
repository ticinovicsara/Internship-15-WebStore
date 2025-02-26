import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/home/card.css";
import "../styles/home/title.css";

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
};

function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("https://fakestoreapi.com/products?limit=20");
        const data = await res.json();

        const localProducts = JSON.parse(
          localStorage.getItem("products") ?? "[]"
        );

        setProducts([...data, ...localProducts]);

        const catRes = await fetch(
          "https://fakestoreapi.com/products/categories"
        );
        const catData = await catRes.json();

        const localCategories = [
          ...new Set(localProducts.map((p) => p.category)),
        ];

        setCategories([...new Set([...catData, ...localCategories])]);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchData();
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
        {filteredProducts.map((p) => (
          <Link key={p.id} to={`/product/${p.id}`} className="item-card">
            <div className="image-container">
              <img src={p.image} alt={p.title} />
            </div>
            <div className="text-box">
              <h4>{p.title}</h4>
              <p>{p.price} &euro;</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
export default HomePage;
