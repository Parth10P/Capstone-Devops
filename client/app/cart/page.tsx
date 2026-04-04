"use client";

import Link from "next/link";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ArrowLeft,
  PackageCheck,
} from "lucide-react";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, clearCart, getCartTotal } =
    useCart();
  const total = getCartTotal();
  const deliveryFee = total >= 499 ? 0 : 49;
  const grandTotal = total + deliveryFee;

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <ShoppingBag size={64} className="text-gray-300 mx-auto mb-6" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Your cart is empty
        </h1>
        <p className="text-gray-500 mb-8">
          Looks like you haven&apos;t added anything to your cart yet.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-colors"
        >
          <ArrowLeft size={18} />
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Title */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          🛒 Your Cart
        </h1>
        <button
          onClick={clearCart}
          className="text-sm text-red-500 hover:text-red-600 font-medium flex items-center gap-1 cursor-pointer"
        >
          <Trash2 size={14} />
          Clear All
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart items */}
        <div className="flex-1 space-y-4">
          {items.map(({ product, quantity }) => {
            const categoryEmoji: Record<string, string> = {
              clothing: "👗",
              electronics: "📱",
              home: "🏠",
              grocery: "🛒",
              beauty: "✨",
              books: "📚",
            };
            return (
              <div
                key={product.id}
                className="flex gap-4 bg-white rounded-2xl border border-gray-100 p-4 shadow-sm"
              >
                {/* Product image placeholder */}
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center text-4xl shrink-0">
                  {categoryEmoji[product.category] || "🛍️"}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/product/${product.id}`}
                    className="text-base font-semibold text-gray-900 hover:text-orange-600 transition-colors line-clamp-1"
                  >
                    {product.name}
                  </Link>
                  <p className="text-sm text-gray-400 uppercase tracking-wider mt-0.5">
                    {product.category}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-lg font-bold text-gray-900">
                      ₹{product.price}
                    </span>
                    {product.originalPrice > product.price && (
                      <span className="text-sm text-gray-400 line-through">
                        ₹{product.originalPrice}
                      </span>
                    )}
                  </div>

                  {/* Quantity controls */}
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() =>
                          updateQuantity(product.id, quantity - 1)
                        }
                        className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors cursor-pointer"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-10 text-center font-semibold text-gray-900">
                        {quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(product.id, quantity + 1)
                        }
                        className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors cursor-pointer"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="text-red-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                      title="Remove"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Order summary */}
        <div className="lg:w-80 shrink-0">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm sticky top-36">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Order Summary
            </h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">
                  Subtotal ({items.reduce((c, i) => c + i.quantity, 0)} items)
                </span>
                <span className="font-semibold text-gray-900">
                  ₹{total.toFixed(0)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Delivery Fee</span>
                <span
                  className={`font-semibold ${
                    deliveryFee === 0 ? "text-green-600" : "text-gray-900"
                  }`}
                >
                  {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
                </span>
              </div>
              {deliveryFee > 0 && (
                <p className="text-xs text-orange-500">
                  Add ₹{(499 - total).toFixed(0)} more for free delivery!
                </p>
              )}
              <hr className="border-gray-100" />
              <div className="flex justify-between text-base">
                <span className="font-bold text-gray-900">Total</span>
                <span className="font-bold text-gray-900">
                  ₹{grandTotal.toFixed(0)}
                </span>
              </div>
            </div>

            <button className="w-full mt-6 py-3.5 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-green-200 flex items-center justify-center gap-2 cursor-pointer">
              <PackageCheck size={20} />
              Proceed to Checkout
            </button>

            <Link
              href="/"
              className="w-full mt-3 py-3 border-2 border-gray-200 hover:border-orange-300 text-gray-700 hover:text-orange-600 font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <ArrowLeft size={16} />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
