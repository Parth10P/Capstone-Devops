"use client";

import Image from "next/image";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

interface ProductCardProps {
  product: Product;
  mode?: "simple" | "visual" | "pro";
}

export default function ProductCard({ product, mode = "pro" }: ProductCardProps) {
  const categoryIcons: Record<string, string> = {
    Electronics: "🔌",
    Clothing: "👕",
    Food: "🍽️",
    Home: "🏠",
    Default: "📦",
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Simple Mode - Large, minimal, high contrast
  if (mode === "simple") {
    return (
      <Link
        href={`/products/${product.id}`}
        className="block bg-white rounded-2xl border-2 border-slate-300 overflow-hidden hover:border-green-500 hover:shadow-lg transition-all"
      >
        <div className="relative h-48 bg-slate-100">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="p-4">
          <h3 className="text-xl font-bold text-slate-900 leading-tight">
            {product.name}
          </h3>
          <p className="text-2xl font-bold text-green-600 mt-2">
            {formatPrice(product.price)}
          </p>
        </div>
      </Link>
    );
  }

  // Visual Mode - Image focused
  if (mode === "visual") {
    return (
      <Link
        href={`/products/${product.id}`}
        className="block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all group"
      >
        <div className="relative h-56 bg-slate-100">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-lg">
            {categoryIcons[product.category] || categoryIcons.Default}
          </div>
        </div>
        <div className="p-3">
          <p className="text-lg font-semibold text-slate-900">
            {formatPrice(product.price)}
          </p>
        </div>
      </Link>
    );
  }

  // Pro Mode - Full featured
  return (
    <Link
      href={`/products/${product.id}`}
      className="block bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg hover:border-indigo-300 transition-all group"
    >
      <div className="relative h-48 bg-slate-100">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-indigo-600 text-white text-xs font-medium px-2 py-1 rounded-full">
            {product.category}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-slate-900 line-clamp-1 group-hover:text-indigo-600 transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-slate-500 line-clamp-2 mt-1">
          {product.description}
        </p>
        <div className="flex items-center justify-between mt-3">
          <span className="text-lg font-bold text-slate-900">
            {formatPrice(product.price)}
          </span>
          <button className="text-indigo-600 hover:bg-indigo-50 p-2 rounded-lg transition-colors" aria-label="Add to cart">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </div>
    </Link>
  );
}
