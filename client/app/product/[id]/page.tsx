"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  Star,
  ShoppingCart,
  Heart,
  ArrowLeft,
  Truck,
  ShieldCheck,
  RotateCcw,
  Loader2,
  AlertCircle,
  Minus,
  Plus,
  Check,
} from "lucide-react";
import { fetchProductById, type Product } from "../../lib/api";
import { useCart } from "../../context/CartContext";

export default function ProductDetailPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    if (!id) return;
    fetchProductById(id)
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Failed to load product");
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32">
        <Loader2 size={40} className="text-orange-500 animate-spin mb-4" />
        <p className="text-gray-500 text-lg">Loading product...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex flex-col items-center justify-center py-32 px-4">
        <AlertCircle size={48} className="text-red-400 mb-4" />
        <p className="text-red-500 text-lg font-semibold mb-2">
          Product not found
        </p>
        <p className="text-gray-500 text-sm mb-6">{error}</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 transition-colors"
        >
          <ArrowLeft size={18} />
          Back to Shop
        </Link>
      </div>
    );
  }

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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-orange-600 transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="capitalize">{product.category}</span>
        <span>/</span>
        <span className="text-gray-900 font-medium truncate max-w-xs">
          {product.name}
        </span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Product image */}
        <div className="flex-1 max-w-lg">
          <div className="w-full aspect-square rounded-3xl bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center shadow-lg relative overflow-hidden">
            <span className="text-9xl opacity-70">
              {categoryEmoji[product.category] || "🛍️"}
            </span>
            {product.badge && (
              <span className="absolute top-4 left-4 px-3 py-1.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-sm font-bold rounded-lg shadow-md">
                {product.badge}
              </span>
            )}
            {discount > 0 && (
              <span className="absolute top-4 right-4 px-3 py-1.5 bg-green-500 text-white text-sm font-bold rounded-lg shadow">
                {discount}% OFF
              </span>
            )}
          </div>
        </div>

        {/* Product details */}
        <div className="flex-1">
          <span className="text-xs font-semibold text-orange-500 uppercase tracking-widest">
            {product.category}
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1 mb-1">
            {product.name}
          </h1>
          {product.nameHi && (
            <p className="text-base text-gray-400 mb-3">{product.nameHi}</p>
          )}

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  className={
                    i < Math.floor(product.rating)
                      ? "text-amber-400 fill-amber-400"
                      : "text-gray-200 fill-gray-200"
                  }
                />
              ))}
            </div>
            <span className="text-sm text-gray-600 font-medium">
              {product.rating} ({product.reviews} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-4">
            <span className="text-3xl font-extrabold text-gray-900">
              ₹{product.price}
            </span>
            {product.originalPrice > product.price && (
              <>
                <span className="text-lg text-gray-400 line-through">
                  ₹{product.originalPrice}
                </span>
                <span className="text-sm font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-lg">
                  Save ₹{product.originalPrice - product.price}
                </span>
              </>
            )}
          </div>

          {/* Stock status */}
          <div className="mb-5">
            {product.inStock ? (
              <span className="inline-flex items-center gap-1.5 text-green-600 font-semibold text-sm">
                <Check size={16} /> In Stock
              </span>
            ) : (
              <span className="text-red-500 font-semibold text-sm">
                Out of Stock
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed mb-6">
            {product.description}
          </p>

          {/* Quantity & Add to Cart */}
          {product.inStock && (
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <Minus size={16} />
                </button>
                <span className="w-12 text-center font-bold text-gray-900 text-lg">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <Plus size={16} />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className={`flex-1 py-3.5 rounded-xl font-bold text-base flex items-center justify-center gap-2 transition-all duration-200 shadow-md cursor-pointer ${
                  addedToCart
                    ? "bg-green-600 text-white shadow-green-200"
                    : "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-green-200 hover:shadow-lg"
                }`}
              >
                {addedToCart ? (
                  <>
                    <Check size={20} /> Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingCart size={20} /> Add to Cart
                  </>
                )}
              </button>

              <button
                className="w-12 h-12 rounded-xl border-2 border-gray-200 hover:border-red-300 hover:bg-red-50 flex items-center justify-center transition-colors cursor-pointer"
                title="Add to Wishlist"
              >
                <Heart size={20} className="text-gray-400 hover:text-red-500" />
              </button>
            </div>
          )}

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-3 pt-6 border-t border-gray-100">
            <div className="flex flex-col items-center text-center p-3">
              <Truck size={22} className="text-orange-500 mb-1.5" />
              <span className="text-xs font-semibold text-gray-700">
                Free Delivery
              </span>
              <span className="text-[10px] text-gray-400">Above ₹499</span>
            </div>
            <div className="flex flex-col items-center text-center p-3">
              <ShieldCheck size={22} className="text-green-500 mb-1.5" />
              <span className="text-xs font-semibold text-gray-700">
                Secure Payment
              </span>
              <span className="text-[10px] text-gray-400">100% Safe</span>
            </div>
            <div className="flex flex-col items-center text-center p-3">
              <RotateCcw size={22} className="text-blue-500 mb-1.5" />
              <span className="text-xs font-semibold text-gray-700">
                Easy Returns
              </span>
              <span className="text-[10px] text-gray-400">7-day policy</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
