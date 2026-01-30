import { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

function App() {
  const [products, setProducts] = useState([]);
  const [mode, setMode] = useState("pro"); // 'pro' or 'simple'
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    image: "https://via.placeholder.com/200",
    category: "General",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_URL}/products`);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });
      if (res.ok) {
        fetchProducts();
        setNewProduct({
          name: "",
          description: "",
          price: "",
          image: "https://via.placeholder.com/200",
          category: "General",
        });
      }
    } catch (err) {
      console.error("Error creating product:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/products/${id}`, { method: "DELETE" });
      fetchProducts();
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  const toggleMode = () => {
    setMode((prev) => (prev === "pro" ? "simple" : "pro"));
  };

  return (
    <div className={`app-container mode-${mode}`}>
      <nav className="navbar">
        <h1>ApnaBazaar {mode === "simple" && "🏠"}</h1>
        <button onClick={toggleMode} className="mode-toggle">
          Switch to {mode === "pro" ? "Simple Mode" : "Pro Mode"}
        </button>
      </nav>

      {mode === "pro" && (
        <section className="admin-section">
          <h2>Add New Product (Seller Dashboard)</h2>
          <form
            onSubmit={handleCreate}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
            }}
          >
            <div className="form-group">
              <label>Product Name</label>
              <input
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
                required
              />
            </div>
            <div className="form-group">
              <label>Price</label>
              <input
                type="number"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, price: e.target.value })
                }
                required
              />
            </div>
            <div className="form-group" style={{ gridColumn: "span 2" }}>
              <label>Description</label>
              <textarea
                value={newProduct.description}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, description: e.target.value })
                }
                required
              />
            </div>
            <button
              type="submit"
              className="btn-primary"
              style={{ gridColumn: "span 2" }}
            >
              Add Product
            </button>
          </form>
        </section>
      )}

      <h2>Featured Products</h2>
      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div className="product-grid">
          {products.length === 0 && <p>No products found. Add some above!</p>}
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <img
                src={product.image}
                alt={product.name}
                className="product-image"
              />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>
                <strong>₹{product.price}</strong>
              </p>
              <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
                <button className="btn-primary">
                  {mode === "simple" ? "BUY NOW" : "Add to Cart"}
                </button>
                {mode === "pro" && (
                  <button
                    onClick={() => handleDelete(product.id)}
                    style={{
                      background: "#ff4d4d",
                      color: "white",
                      border: "none",
                      padding: "0.5rem 1rem",
                      borderRadius: "4px",
                    }}
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
