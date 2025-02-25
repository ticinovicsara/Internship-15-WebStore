import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/home/card.css";

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
        setCategories(catData);
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
      <h1>Products</h1>
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => setSearch(e.target.value)}
      />

      <select onChange={(e) => setCategory(e.target.value)}>
        <option value="">All categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "15px",
          justifyContent: "center",
        }}
      >
        {filteredProducts.map((p) => (
          <div className="item-card" key={p.id}>
            <Link key={p.id} to={`/product/${p.id}`}>
              <img src={p.image} />
              <div className="text-box">
                <h4>{p.title}</h4>
                <p>{p.price}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
export default HomePage;
