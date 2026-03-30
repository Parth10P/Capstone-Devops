"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
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

export default function Home() {
  const [mode, setMode] = useState<UIMode>("pro");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load mode from localStorage
    const savedMode = localStorage.getItem("apnabazaar-ui-mode") as UIMode;
    if (savedMode) {
      setMode(savedMode);
    }

    // Fetch products from API
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/products");
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
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Hero Section for Simple Mode
  const SimpleHero = () => (
    <section className="py-12 bg-green-50">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-6">
          Welcome to ApnaBazaar
        </h1>
        <p className="text-xl text-green-700 mb-8 max-w-2xl mx-auto">
          Simple shopping for everyone. Large buttons, clear prices.
        </p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 px-8 py-4 bg-green-600 text-white text-xl font-bold rounded-2xl hover:bg-green-700 transition-colors shadow-lg"
        >
          Start Shopping
          <span className="text-2xl">🛒</span>
        </Link>
        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/help"
            className="px-6 py-3 bg-white text-green-700 text-lg font-bold rounded-xl border-2 border-green-300 hover:border-green-500 transition-colors"
          >
            Need Help? 📞
          </Link>
        </div>
      </div>
    </section>
  );

  // Hero Section for Visual Mode
  const VisualHero = () => (
    <section className="py-8 bg-blue-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-wrap justify-center gap-6">
          <Link
            href="/products"
            className="flex flex-col items-center gap-3 p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all"
          >
            <span className="text-5xl">🛍️</span>
            <span className="text-lg font-bold text-slate-700">Shop</span>
          </Link>
          <Link
            href="/sellers"
            className="flex flex-col items-center gap-3 p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all"
          >
            <span className="text-5xl">🏪</span>
            <span className="text-lg font-bold text-slate-700">Sell</span>
          </Link>
          <Link
            href="/help"
            className="flex flex-col items-center gap-3 p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all"
          >
            <span className="text-5xl">❓</span>
            <span className="text-lg font-bold text-slate-700">Help</span>
          </Link>
        </div>
      </div>
    </section>
  );

  // Hero Section for Pro Mode
  const ProHero = () => (
    <section className="py-16 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Everyone&apos;s Marketplace
            </h1>
            <p className="text-lg md:text-xl text-indigo-100 mb-8 max-w-lg">
              Buy and sell products with ease. Built for everyone - from first-time internet users to digital natives.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-indigo-600 font-semibold rounded-xl hover:bg-indigo-50 transition-colors"
              >
                Explore Products
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/sellers"
                className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-500/30 text-white font-semibold rounded-xl hover:bg-indigo-500/50 transition-colors backdrop-blur-sm"
              >
                Start Selling
              </Link>
            </div>
            <div className="mt-8 flex items-center gap-6 text-sm text-indigo-200">
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Free Shipping
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Easy Returns
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                24/7 Support
              </span>
            </div>
          </div>
          <div className="hidden md:grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <span className="text-4xl">🏠</span>
                <h3 className="font-semibold mt-2">Home</h3>
                <p className="text-sm text-indigo-200">Daily essentials</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <span className="text-4xl">👕</span>
                <h3 className="font-semibold mt-2">Fashion</h3>
                <p className="text-sm text-indigo-200">Clothing &amp; accessories</p>
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <span className="text-4xl">🍎</span>
                <h3 className="font-semibold mt-2">Food</h3>
                <p className="text-sm text-indigo-200">Fresh &amp; organic</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <span className="text-4xl">💻</span>
                <h3 className="font-semibold mt-2">Electronics</h3>
                <p className="text-sm text-indigo-200">Gadgets &amp; devices</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <div>
      {/* Hero Section based on mode */}
      {mode === "simple" && <SimpleHero />}
      {mode === "visual" && <VisualHero />}
      {mode === "pro" && <ProHero />}

      {/* Products Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className={`font-bold text-slate-900 ${
              mode === "simple" ? "text-3xl" : mode === "visual" ? "text-2xl" : "text-2xl"
            }`}>
              {mode === "simple" ? "Products For You" : "Featured Products"}
            </h2>
            <Link
              href="/products"
              className={`font-medium transition-colors ${
                mode === "simple"
                  ? "text-green-600 text-lg hover:text-green-700"
                  : "text-indigo-600 hover:text-indigo-700"
              }`}
            >
              {mode === "simple" ? "See All →" : "View all products →"}
            </Link>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
          ) : (
            <ProductGrid products={products.slice(0, 8)} mode={mode} />
          )}
        </div>
      </section>

      {/* Features Section (Pro mode only) */}
      {mode === "pro" && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900">Why Choose ApnaBazaar?</h2>
              <p className="text-slate-500 mt-2">Built for everyone in India</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6 rounded-2xl bg-slate-50">
                <div className="w-14 h-14 mx-auto bg-indigo-100 rounded-xl flex items-center justify-center text-2xl mb-4">
                  👴
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Elder Friendly</h3>
                <p className="text-sm text-slate-500">Large buttons, clear text, and simple navigation for elderly users</p>
              </div>
              <div className="text-center p-6 rounded-2xl bg-slate-50">
                <div className="w-14 h-14 mx-auto bg-indigo-100 rounded-xl flex items-center justify-center text-2xl mb-4">
                  🌐
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Multilingual</h3>
                <p className="text-sm text-slate-500">Shop in your preferred language - Hindi, English, and more</p>
              </div>
              <div className="text-center p-6 rounded-2xl bg-slate-50">
                <div className="w-14 h-14 mx-auto bg-indigo-100 rounded-xl flex items-center justify-center text-2xl mb-4">
                  🏪
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Local Sellers</h3>
                <p className="text-sm text-slate-500">Support local artisans and small businesses in your community</p>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
