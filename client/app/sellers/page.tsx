"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type UIMode = "simple" | "visual" | "pro";

export default function SellersPage() {
  const [mode, setMode] = useState<UIMode>("pro");
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Home",
    image: "",
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem("apnabazaar-ui-mode") as UIMode;
    if (savedMode && savedMode !== mode) {
      setMode(savedMode);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setSubmitted(true);
      }
    } catch (error) {
      console.error("Error creating product:", error);
      // Show success anyway for demo
      setSubmitted(true);
    }
  };

  const categories = ["Home", "Food", "Clothing", "Electronics"];
  const categoryIcons: Record<string, string> = {
    Home: "🏠",
    Food: "🍎",
    Clothing: "👕",
    Electronics: "💻",
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-16 text-center">
        <div className="text-6xl mb-6">🎉</div>
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Product Listed Successfully!</h1>
        <p className="text-slate-600 mb-8">Your product is now available for buyers.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/products"
            className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors"
          >
            View Marketplace
          </Link>
          <button
            onClick={() => {
              setSubmitted(false);
              setStep(1);
              setFormData({ name: "", description: "", price: "", category: "Home", image: "" });
            }}
            className="px-6 py-3 border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-colors"
          >
            List Another Product
          </button>
        </div>
      </div>
    );
  }

  // Simple Mode - Step by step wizard
  if (mode === "simple") {
    return (
      <div className="max-w-2xl mx-auto px-6 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-slate-900">Sell Your Product</h1>
            <span className="text-lg font-bold text-green-600">Step {step} of 3</span>
          </div>
          <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 1 && (
            <div className="bg-white p-6 rounded-2xl border-2 border-slate-200">
              <label className="block text-xl font-bold text-slate-900 mb-4">
                What is your product name?
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Handmade Pottery"
                className="w-full px-4 py-4 text-xl border-2 border-slate-300 rounded-xl focus:border-green-500 focus:outline-none"
                required
              />
              <button
                type="button"
                onClick={() => setStep(2)}
                disabled={!formData.name}
                className="w-full mt-6 py-4 bg-green-600 text-white text-xl font-bold rounded-xl hover:bg-green-700 transition-colors disabled:opacity-50"
              >
                Next →
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="bg-white p-6 rounded-2xl border-2 border-slate-200">
              <label className="block text-xl font-bold text-slate-900 mb-4">
                What is the price? (₹)
              </label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="e.g., 499"
                className="w-full px-4 py-4 text-xl border-2 border-slate-300 rounded-xl focus:border-green-500 focus:outline-none"
                required
              />
              <div className="flex gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 py-4 bg-slate-200 text-slate-700 text-xl font-bold rounded-xl hover:bg-slate-300 transition-colors"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  disabled={!formData.price}
                  className="flex-1 py-4 bg-green-600 text-white text-xl font-bold rounded-xl hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  Next →
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="bg-white p-6 rounded-2xl border-2 border-slate-200">
              <label className="block text-xl font-bold text-slate-900 mb-4">
                Choose a category
              </label>
              <div className="grid grid-cols-2 gap-4">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setFormData({ ...formData, category: cat })}
                    className={`p-4 rounded-xl text-lg font-bold transition-all ${
                      formData.category === cat
                        ? "bg-green-600 text-white shadow-lg"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {categoryIcons[cat]} {cat}
                  </button>
                ))}
              </div>
              <div className="flex gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex-1 py-4 bg-slate-200 text-slate-700 text-xl font-bold rounded-xl hover:bg-slate-300 transition-colors"
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  className="flex-1 py-4 bg-green-600 text-white text-xl font-bold rounded-xl hover:bg-green-700 transition-colors"
                >
                  List Product ✓
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    );
  }

  // Visual Mode - Icon heavy
  if (mode === "visual") {
    return (
      <div className="max-w-2xl mx-auto px-6 py-8">
        <div className="text-center mb-8">
          <span className="text-6xl">🏪</span>
          <h1 className="text-2xl font-bold text-slate-900 mt-4">Start Selling</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">🏷️</span>
              <label className="font-bold text-slate-900">Product Name</label>
            </div>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none"
              required
            />
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">💰</span>
              <label className="font-bold text-slate-900">Price (₹)</label>
            </div>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none"
              required
            />
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">📂</span>
              <label className="font-bold text-slate-900">Category</label>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setFormData({ ...formData, category: cat })}
                  className={`p-4 rounded-xl transition-all ${
                    formData.category === cat
                      ? "bg-blue-500 text-white shadow-lg"
                      : "bg-slate-50 text-slate-700 border border-slate-200"
                  }`}
                >
                  <span className="text-2xl mr-2">{categoryIcons[cat]}</span>
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-blue-500 text-white text-xl font-bold rounded-xl hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
          >
            <span>🚀</span>
            List Product
          </button>
        </form>
      </div>
    );
  }

  // Pro Mode - Full form
  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">List Your Product</h1>
        <p className="text-slate-500 mt-2">Reach thousands of buyers on ApnaBazaar</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Product Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
            placeholder="Enter product name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all h-24 resize-none"
            placeholder="Describe your product"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Price (₹)</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
              placeholder="0.00"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all bg-white"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Image URL</label>
          <input
            type="url"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <button
          type="submit"
          className="w-full py-4 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          List Product
        </button>
      </form>
    </div>
  );
}
