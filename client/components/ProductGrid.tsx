"use client";

import { useState } from "react";
import ProductCard from "./ProductCard";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

interface ProductGridProps {
  products: Product[];
  mode?: "simple" | "visual" | "pro";
}

export default function ProductGrid({ products, mode = "pro" }: ProductGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))];

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  // Simple mode - minimal category buttons
  if (mode === "simple") {
    return (
      <div className="space-y-6">
        <div className="flex flex-wrap gap-3 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full text-lg font-bold transition-all ${
                selectedCategory === category
                  ? "bg-green-600 text-white shadow-lg"
                  : "bg-white text-slate-700 border-2 border-slate-300 hover:border-green-500"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} mode={mode} />
          ))}
        </div>
      </div>
    );
  }

  // Visual mode - icon-based categories
  if (mode === "visual") {
    const categoryIcons: Record<string, string> = {
      All: "🏪",
      Electronics: "💻",
      Clothing: "👕",
      Food: "🍎",
      Home: "🏠",
      Default: "📦",
    };

    return (
      <div className="space-y-6">
        <div className="flex flex-wrap gap-4 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-all ${
                selectedCategory === category
                  ? "bg-blue-500 text-white shadow-lg scale-105"
                  : "bg-white text-slate-600 shadow-sm hover:shadow-md"
              }`}
            >
              <span className="text-3xl">{categoryIcons[category] || categoryIcons.Default}</span>
              <span className="text-sm font-medium">{category}</span>
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} mode={mode} />
          ))}
        </div>
      </div>
    );
  }

  // Pro mode - full featured
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === category
                ? "bg-indigo-600 text-white shadow-md"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} mode={mode} />
        ))}
      </div>
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-500">No products found in this category.</p>
        </div>
      )}
    </div>
  );
}
