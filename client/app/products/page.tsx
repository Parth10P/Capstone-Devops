"use client";

import { useState, useEffect } from "react";
import ProductGrid from "@/components/ProductGrid";

type UIMode = "simple" | "visual" | "pro";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export default function ProductsPage() {
  const [mode, setMode] = useState<UIMode>("pro");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const savedMode = localStorage.getItem("apnabazaar-ui-mode") as UIMode;
    if (savedMode) {
      setMode(savedMode);
    }

    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      // Fallback sample data
      setProducts([
        {
          id: 1,
          name: "Handwoven Basket",
          description: "Beautiful handwoven basket made by local artisans",
          price: 299,
          image: "https://images.unsplash.com/photo-1596162955779-9c8f7f3c88e1?w=400",
          category: "Home",
        },
        {
          id: 2,
          name: "Organic Honey",
          description: "Pure organic honey from the hills",
          price: 450,
          image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400",
          category: "Food",
        },
        {
          id: 3,
          name: "Cotton Kurta",
          description: "Comfortable cotton kurta for daily wear",
          price: 799,
          image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400",
          category: "Clothing",
        },
        {
          id: 4,
          name: "Mobile Charger",
          description: "Fast charging adapter for smartphones",
          price: 599,
          image: "https://images.unsplash.com/photo-1583863788434-e58a33330cf3?w=400",
          category: "Electronics",
        },
        {
          id: 5,
          name: "Spice Box",
          description: "Traditional masala dabba for your kitchen",
          price: 349,
          image: "https://images.unsplash.com/photo-1596040033229-a9821d3bbf0c?w=400",
          category: "Home",
        },
        {
          id: 6,
          name: "Handmade Soap",
          description: "Natural handmade soap with essential oils",
          price: 129,
          image: "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=400",
          category: "Home",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Simple mode header
  if (mode === "simple") {
    return (
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-green-800 mb-4">All Products</h1>
          <div className="max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 text-xl border-2 border-green-300 rounded-2xl focus:border-green-500 focus:outline-none"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-2xl">Loading...</div>
          </div>
        ) : (
          <ProductGrid products={filteredProducts} mode={mode} />
        )}
      </div>
    );
  }

  // Visual mode header
  if (mode === "visual") {
    return (
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-md">
            <span className="text-3xl">🔍</span>
            <input
              type="text"
              placeholder="What are you looking for?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 text-lg border-none focus:outline-none"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <ProductGrid products={filteredProducts} mode={mode} />
        )}
      </div>
    );
  }

  // Pro mode header
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Marketplace</h1>
        <p className="text-slate-500">Discover products from local sellers</p>
      </div>

      <div className="mb-8">
        <div className="relative max-w-xl">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
          />
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      ) : (
        <ProductGrid products={filteredProducts} mode={mode} />
      )}
    </div>
  );
}
