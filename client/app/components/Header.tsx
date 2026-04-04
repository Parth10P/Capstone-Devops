"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ShoppingCart,
  Search,
  Menu,
  X,
  Phone,
  Heart,
  User,
} from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  return (
    <header className="sticky top-0 z-50 bg-white border-b-2 border-orange-100 shadow-sm">
      {/* Top bar */}
      <div className="bg-gradient-to-r from-orange-600 to-amber-500 text-white text-center py-1.5 text-sm font-medium tracking-wide">
        🎉 Welcome to <strong>ApnaBazaar</strong> — Everyone&apos;s Marketplace! Free delivery on orders above ₹499
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white font-bold text-lg sm:text-xl shadow-md">
              अ
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-gray-900 leading-tight">
                ApnaBazaar
              </h1>
              <p className="text-[11px] text-orange-600 font-medium -mt-0.5">
                Everyone&apos;s Marketplace
              </p>
            </div>
          </Link>

          {/* Search bar */}
          <div className="flex-1 max-w-xl">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="🔍  Search for products..."
                className="w-full h-11 sm:h-12 pl-4 pr-12 rounded-xl border-2 border-orange-200 bg-orange-50/50 text-base focus:outline-none focus:border-orange-400 focus:bg-white transition-all placeholder:text-gray-400"
              />
              <button className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 bg-orange-500 hover:bg-orange-600 text-white rounded-lg flex items-center justify-center transition-colors">
                <Search size={18} />
              </button>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              className="relative flex flex-col items-center justify-center w-11 h-11 sm:w-14 sm:h-14 rounded-xl hover:bg-orange-50 transition-colors group"
              title="Help / Support"
            >
              <Phone size={22} className="text-gray-600 group-hover:text-orange-600 transition-colors" />
              <span className="hidden sm:block text-[10px] text-gray-500 group-hover:text-orange-600 font-medium mt-0.5">
                Help
              </span>
            </button>

            <button
              className="relative flex flex-col items-center justify-center w-11 h-11 sm:w-14 sm:h-14 rounded-xl hover:bg-orange-50 transition-colors group"
              title="Wishlist"
            >
              <Heart size={22} className="text-gray-600 group-hover:text-orange-600 transition-colors" />
              <span className="hidden sm:block text-[10px] text-gray-500 group-hover:text-orange-600 font-medium mt-0.5">
                Wishlist
              </span>
            </button>

            <button
              className="relative flex flex-col items-center justify-center w-11 h-11 sm:w-14 sm:h-14 rounded-xl hover:bg-orange-50 transition-colors group"
              title="Account"
            >
              <User size={22} className="text-gray-600 group-hover:text-orange-600 transition-colors" />
              <span className="hidden sm:block text-[10px] text-gray-500 group-hover:text-orange-600 font-medium mt-0.5">
                Account
              </span>
            </button>

            <Link
              href="/cart"
              className="relative flex flex-col items-center justify-center w-12 h-11 sm:w-16 sm:h-14 rounded-xl bg-green-50 hover:bg-green-100 border-2 border-green-200 transition-colors group"
              title="Cart"
            >
              <ShoppingCart size={24} className="text-green-700 group-hover:text-green-800 transition-colors" />
              <span className="hidden sm:block text-[10px] text-green-700 font-bold mt-0.5">
                Cart
              </span>
              {/* Cart badge */}
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[11px] font-bold rounded-full flex items-center justify-center shadow">
                {cartCount}
              </span>
            </Link>

            {/* Mobile menu toggle */}
            <button
              className="sm:hidden w-11 h-11 flex items-center justify-center rounded-xl hover:bg-orange-50 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? (
                <X size={24} className="text-gray-700" />
              ) : (
                <Menu size={24} className="text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="sm:hidden bg-white border-t border-orange-100 px-4 py-3 space-y-2 shadow-lg">
          <a href="#" className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-orange-50 text-gray-700 font-medium text-base">
            <Phone size={20} className="text-orange-500" /> Help & Support
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-orange-50 text-gray-700 font-medium text-base">
            <Heart size={20} className="text-orange-500" /> My Wishlist
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-orange-50 text-gray-700 font-medium text-base">
            <User size={20} className="text-orange-500" /> My Account
          </a>
        </div>
      )}
    </header>
  );
}
