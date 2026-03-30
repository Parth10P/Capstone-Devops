"use client";

import { useState, useEffect } from "react";

type UIMode = "simple" | "visual" | "pro";

export default function HelpPage() {
  const [mode, setMode] = useState<UIMode>("pro");

  useEffect(() => {
    const savedMode = localStorage.getItem("apnabazaar-ui-mode") as UIMode;
    if (savedMode && savedMode !== mode) {
      setMode(savedMode);
    }
  }, []);

  const faqs = [
    {
      question: "How do I buy a product?",
      answer: "Browse products, click on the one you like, and press the 'Buy Now' button. Follow the simple checkout process.",
    },
    {
      question: "How do I sell my product?",
      answer: "Click on 'Sell' in the navigation, fill in your product details, and click 'List Product'. It's that easy!",
    },
    {
      question: "Is my payment secure?",
      answer: "Yes! We use industry-standard encryption to protect your payment information.",
    },
    {
      question: "Can I change the look of the app?",
      answer: "Yes! Use the mode switcher at the top right to choose between Simple, Visual, or Pro modes.",
    },
  ];

  // Simple mode - large, clear help
  if (mode === "simple") {
    return (
      <div className="max-w-3xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-green-800 text-center mb-8">Help Center</h1>

        <div className="bg-green-50 rounded-2xl p-8 mb-8 text-center">
          <div className="text-6xl mb-4">📞</div>
          <h2 className="text-2xl font-bold text-green-800 mb-2">Need Help?</h2>
          <p className="text-xl text-green-700 mb-4">Call our support line</p>
          <a
            href="tel:18001234567"
            className="inline-block px-8 py-4 bg-green-600 text-white text-2xl font-bold rounded-xl hover:bg-green-700 transition-colors"
          >
            1800-123-4567
          </a>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl border-2 border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-2">{faq.question}</h3>
              <p className="text-lg text-slate-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Visual mode - icon heavy
  if (mode === "visual") {
    return (
      <div className="max-w-3xl mx-auto px-6 py-8">
        <div className="text-center mb-8">
          <span className="text-6xl">❓</span>
          <h1 className="text-2xl font-bold text-slate-900 mt-4">How Can We Help?</h1>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <a href="tel:18001234567" className="bg-blue-50 p-6 rounded-2xl text-center hover:bg-blue-100 transition-colors">
            <span className="text-4xl">📞</span>
            <p className="font-bold text-slate-700 mt-2">Call Us</p>
          </a>
          <button className="bg-blue-50 p-6 rounded-2xl text-center hover:bg-blue-100 transition-colors">
            <span className="text-4xl">💬</span>
            <p className="font-bold text-slate-700 mt-2">Chat</p>
          </button>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white p-4 rounded-xl shadow-sm">
              <h3 className="font-bold text-slate-900 mb-1">{faq.question}</h3>
              <p className="text-sm text-slate-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Pro mode
  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-slate-900">Help Center</h1>
        <p className="text-slate-500 mt-2">Find answers to common questions</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <a href="tel:18001234567" className="bg-indigo-50 p-6 rounded-2xl text-center hover:bg-indigo-100 transition-colors">
          <div className="w-12 h-12 mx-auto bg-indigo-100 rounded-xl flex items-center justify-center text-2xl mb-3">
            📞
          </div>
          <h3 className="font-semibold text-slate-900">Phone Support</h3>
          <p className="text-sm text-slate-500 mt-1">1800-123-4567</p>
        </a>
        <button className="bg-indigo-50 p-6 rounded-2xl text-center hover:bg-indigo-100 transition-colors">
          <div className="w-12 h-12 mx-auto bg-indigo-100 rounded-xl flex items-center justify-center text-2xl mb-3">
            💬
          </div>
          <h3 className="font-semibold text-slate-900">Live Chat</h3>
          <p className="text-sm text-slate-500 mt-1">Available 24/7</p>
        </button>
        <button className="bg-indigo-50 p-6 rounded-2xl text-center hover:bg-indigo-100 transition-colors">
          <div className="w-12 h-12 mx-auto bg-indigo-100 rounded-xl flex items-center justify-center text-2xl mb-3">
            📧
          </div>
          <h3 className="font-semibold text-slate-900">Email Us</h3>
          <p className="text-sm text-slate-500 mt-1">support@apnabazaar.com</p>
        </button>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900">Frequently Asked Questions</h2>
        {faqs.map((faq, index) => (
          <details
            key={index}
            className="group bg-white border border-slate-200 rounded-xl overflow-hidden"
          >
            <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-50 transition-colors">
              <span className="font-medium text-slate-900">{faq.question}</span>
              <svg
                className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="px-4 pb-4 text-slate-600">{faq.answer}</div>
          </details>
        ))}
      </div>
    </div>
  );
}
