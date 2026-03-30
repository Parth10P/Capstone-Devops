"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

type UIMode = "simple" | "visual" | "pro";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export default function ProductDetailPage() {
  const params = useParams();
  const [mode, setMode] = useState<UIMode>("pro");
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const savedMode = localStorage.getItem("apnabazaar-ui-mode") as UIMode;
    if (savedMode) {
      setMode(savedMode);
    }

    fetchProduct();
  }, [params.id]);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/products/${params.id}`);
      if (response.ok) {
        const data = await response.json();
        setProduct(data);
      } else {
        // Fallback sample data
        setProduct({
          id: Number(params.id),
          name: "Sample Product",
          description: "This is a sample product description.",
          price: 499,
          image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
          category: "Sample",
        });
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      setProduct({
        id: Number(params.id),
        name: "Sample Product",
        description: "This is a sample product description.",
        price: 499,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
        category: "Sample",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-center py-24">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center py-24">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Product not found</h1>
          <Link href="/products" className="text-indigo-600 hover:underline">
            Back to products
          </Link>
        </div>
      </div>
    );
  }

  // Simple mode
  if (mode === "simple") {
    return (
      <div className="max-w-4xl mx-auto px-6 py-8">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 mb-6 text-green-700 font-bold text-lg hover:text-green-800"
        >
          ← Back
        </Link>

        <div className="bg-white rounded-3xl border-2 border-slate-200 overflow-hidden">
          <div className="relative h-80 bg-slate-100">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="p-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-4">{product.name}</h1>
            <p className="text-4xl font-bold text-green-600 mb-6">
              {formatPrice(product.price)}
            </p>
            <p className="text-xl text-slate-600 mb-8">{product.description}</p>

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <span className="text-xl font-bold">Quantity:</span>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 bg-slate-200 rounded-xl text-2xl font-bold hover:bg-slate-300 transition-colors"
                  >
                    -
                  </button>
                  <span className="text-2xl font-bold w-12 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 bg-slate-200 rounded-xl text-2xl font-bold hover:bg-slate-300 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <button className="w-full py-5 bg-green-600 text-white text-2xl font-bold rounded-2xl hover:bg-green-700 transition-colors shadow-lg">
                Add to Cart 🛒
              </button>

              <button className="w-full py-4 bg-white text-green-700 text-xl font-bold rounded-2xl border-2 border-green-600 hover:bg-green-50 transition-colors">
                Call for Help 📞
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Visual mode
  if (mode === "visual") {
    return (
      <div className="max-w-4xl mx-auto px-6 py-8">
        <Link href="/products" className="inline-flex items-center gap-2 mb-6 text-lg font-medium">
          <span className="text-2xl">←</span>
        </Link>

        <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
          <div className="relative h-96 bg-slate-100">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 text-lg">
              {product.category === "Home" && "🏠"}
              {product.category === "Food" && "🍎"}
              {product.category === "Clothing" && "👕"}
              {product.category === "Electronics" && "💻"}
              {!product.category && "📦"}
            </div>
          </div>
          <div className="p-6">
            <h1 className="text-2xl font-bold text-slate-900">{product.name}</h1>
            <p className="text-3xl font-bold text-blue-600 mt-2">{formatPrice(product.price)}</p>

            <div className="flex gap-4 mt-6">
              <button className="flex-1 py-4 bg-blue-500 text-white text-lg font-bold rounded-xl hover:bg-blue-600 transition-colors flex items-center justify-center gap-2">
                <span>🛒</span>
                Buy Now
              </button>
              <button className="flex-1 py-4 bg-white text-slate-700 border-2 border-slate-300 text-lg font-bold rounded-xl hover:bg-slate-50 transition-colors">
                <span>❤️</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Pro mode
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <Link
        href="/products"
        className="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors mb-6"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to products
      </Link>

      <div className="grid md:grid-cols-2 gap-12">
        <div className="relative aspect-square bg-slate-100 rounded-2xl overflow-hidden">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-indigo-100 text-indigo-700 text-sm font-medium px-3 py-1 rounded-full">
              {product.category}
            </span>
          </div>

          <h1 className="text-3xl font-bold text-slate-900 mb-4">{product.name}</h1>
          <p className="text-4xl font-bold text-slate-900 mb-6">{formatPrice(product.price)}</p>
          <p className="text-slate-600 mb-8">{product.description}</p>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-slate-600 font-medium">Quantity</span>
              <div className="flex items-center border border-slate-200 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 hover:bg-slate-50 transition-colors"
                >
                  -
                </button>
                <span className="px-4 py-2 font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 hover:bg-slate-50 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex gap-4">
              <button className="flex-1 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Add to Cart
              </button>
              <button className="px-4 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
                <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-slate-200">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-slate-50 rounded-xl">
                <svg className="w-6 h-6 mx-auto mb-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-xs text-slate-500">Genuine Product</p>
              </div>
              <div className="text-center p-4 bg-slate-50 rounded-xl">
                <svg className="w-6 h-6 mx-auto mb-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-xs text-slate-500">Fast Delivery</p>
              </div>
              <div className="text-center p-4 bg-slate-50 rounded-xl">
                <svg className="w-6 h-6 mx-auto mb-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <p className="text-xs text-slate-500">Secure Payment</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
