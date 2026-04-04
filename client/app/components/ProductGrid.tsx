"use client";

import { useState, useEffect } from "react";
import {
  LayoutGrid,
  Shirt,
  Smartphone,
  Home,
  Apple,
  Sparkles,
  BookOpen,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { fetchProducts, type Product } from "../lib/api";
import ProductCard from "./ProductCard";

const categories = [
  { id: "all", label: "All", icon: "grid" },
  { id: "clothing", label: "Clothing", icon: "shirt" },
  { id: "electronics", label: "Electronics", icon: "smartphone" },
  { id: "home", label: "Home & Kitchen", icon: "home" },
  { id: "grocery", label: "Grocery", icon: "apple" },
  { id: "beauty", label: "Beauty", icon: "sparkles" },
  { id: "books", label: "Books", icon: "book-open" },
];

const iconMap: Record<string, React.ReactNode> = {
  grid: <LayoutGrid size={20} />,
  shirt: <Shirt size={20} />,
  smartphone: <Smartphone size={20} />,
  home: <Home size={20} />,
  apple: <Apple size={20} />,
  sparkles: <Sparkles size={20} />,
  "book-open": <BookOpen size={20} />,
};

export default function ProductGrid() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts()
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Failed to load products");
        setLoading(false);
      });
  }, []);

  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <section className="py-10 sm:py-14">
      {/* Section header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          🛍️ Shop by Category
        </h2>
        <p className="text-gray-500 text-base max-w-md mx-auto">
          Browse our curated collection of quality products at the best prices
        </p>
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-10 px-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`
              flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 border-2 cursor-pointer
              ${
                activeCategory === cat.id
                  ? "bg-orange-500 text-white border-orange-500 shadow-lg shadow-orange-200"
                  : "bg-white text-gray-600 border-gray-200 hover:border-orange-300 hover:text-orange-600 hover:bg-orange-50"
              }
            `}
          >
            {iconMap[cat.icon]}
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Loading state */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 size={40} className="text-orange-500 animate-spin mb-4" />
          <p className="text-gray-500 text-lg font-medium">Loading products...</p>
        </div>
      )}

      {/* Error state */}
      {error && !loading && (
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <AlertCircle size={48} className="text-red-400 mb-4" />
          <p className="text-red-500 text-lg font-semibold mb-2">
            Could not load products
          </p>
          <p className="text-gray-500 text-sm mb-4 text-center max-w-md">
            {error}. Make sure the server is running on port 5001.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2.5 bg-orange-500 text-white font-semibold rounded-xl hover:bg-orange-600 transition-colors cursor-pointer"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Products */}
      {!loading && !error && (
        <>
          {/* Product count */}
          <p className="text-sm text-gray-400 mb-4 font-medium">
            Showing {filteredProducts.length} product
            {filteredProducts.length !== 1 ? "s" : ""}
          </p>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-5xl mb-4">😕</p>
              <p className="text-gray-500 text-lg font-medium">
                No products found in this category yet.
              </p>
            </div>
          )}
        </>
      )}
    </section>
  );
}
