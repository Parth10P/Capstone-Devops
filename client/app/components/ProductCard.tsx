"use client";

import Link from "next/link";
import { Star, ShoppingCart, Heart, Eye } from "lucide-react";
import type { Product } from "../lib/api";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { isAuthenticated, openAuthModal } = useAuth();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      openAuthModal();
    } else {
      addToCart(product);
    }
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      openAuthModal();
    } else {
      console.log("Added to wishlist");
    }
  };

  const discount =
    product.originalPrice > 0
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) *
            100
        )
      : 0;

  const categoryEmoji: Record<string, string> = {
    clothing: "👗",
    electronics: "📱",
    home: "🏠",
    grocery: "🛒",
    beauty: "✨",
    books: "📚",
  };

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-orange-200 transition-all duration-300 overflow-hidden flex flex-col">
      {/* Image area — clickable */}
      <Link href={`/product/${product.id}`} className="block">
        <div className="relative h-52 sm:h-56 bg-gradient-to-br from-orange-50 to-amber-50 overflow-hidden">
          {/* Emoji placeholder */}
          <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-60">
            {categoryEmoji[product.category] || "🛍️"}
          </div>

          {/* Badge */}
          {product.badge && (
            <span className="absolute top-3 left-3 px-2.5 py-1 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold rounded-lg shadow-md z-10">
              {product.badge}
            </span>
          )}

          {/* Discount badge */}
          {discount > 0 && (
            <span className="absolute top-3 right-3 px-2 py-1 bg-green-500 text-white text-xs font-bold rounded-lg shadow z-10">
              {discount}% OFF
            </span>
          )}

          {/* Out of stock overlay */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-20">
              <span className="px-4 py-2 bg-red-500 text-white font-bold rounded-xl text-sm">
                Out of Stock
              </span>
            </div>
          )}

          {/* Hover actions */}
          <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 z-10">
            <button
              className="w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-red-50 hover:text-red-500 transition-colors cursor-pointer"
              title="Add to Wishlist"
              onClick={handleWishlist}
            >
              <Heart size={16} />
            </button>
            <div
              className="w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-blue-50 hover:text-blue-500 transition-colors cursor-pointer"
              title="Quick View"
            >
              <Eye size={16} />
            </div>
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        {/* Category tag */}
        <span className="text-[11px] font-semibold text-orange-500 uppercase tracking-wider mb-1">
          {product.category}
        </span>

        {/* Product name — clickable */}
        <Link href={`/product/${product.id}`}>
          <h3 className="text-base font-semibold text-gray-900 leading-snug mb-1 line-clamp-2 group-hover:text-orange-700 transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-2">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={
                  i < Math.floor(product.rating)
                    ? "text-amber-400 fill-amber-400"
                    : "text-gray-200 fill-gray-200"
                }
              />
            ))}
          </div>
          <span className="text-xs text-gray-500 font-medium">
            {product.rating} ({product.reviews})
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-3">
          {product.description}
        </p>

        {/* Price & CTA */}
        <div className="mt-auto flex items-end justify-between gap-2">
          <div>
            <span className="text-2xl font-bold text-gray-900">
              ₹{product.price}
            </span>
            {product.originalPrice > product.price && (
              <span className="ml-2 text-sm text-gray-400 line-through">
                ₹{product.originalPrice}
              </span>
            )}
          </div>

          <button
            disabled={!product.inStock}
            onClick={handleAddToCart}
            className={`
              flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 shadow-sm cursor-pointer
              ${
                product.inStock
                  ? "bg-green-500 hover:bg-green-600 active:scale-95 text-white shadow-green-200 hover:shadow-green-300 hover:shadow-md"
                  : "bg-gray-200 text-gray-400 !cursor-not-allowed"
              }
            `}
          >
            <ShoppingCart size={18} />
            <span className="hidden sm:inline">Add</span>

          </button>
        </div>
      </div>
    </div>
  );
}
