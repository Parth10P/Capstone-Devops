import { Truck, ShieldCheck, Headphones, RotateCcw } from "lucide-react";
import ProductGrid from "./components/ProductGrid";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            {/* Hero text */}
            <div className="flex-1 text-center lg:text-left">
              <span className="inline-block px-4 py-1.5 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold mb-4">
                🇮🇳 Made for India
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
                Welcome to{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">
                  ApnaBazaar
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-xl mx-auto lg:mx-0 mb-8">
                Your neighbourhood marketplace — now online. Shop quality
                products from local sellers at the best prices. Simple, safe,
                and accessible for everyone.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start">
                <a
                  href="#shop"
                  className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-base rounded-xl shadow-lg shadow-orange-200 hover:shadow-orange-300 transition-all duration-200 text-center"
                >
                  🛒 Start Shopping
                </a>
                <a
                  href="#"
                  className="w-full sm:w-auto px-8 py-3.5 bg-white text-gray-700 font-semibold text-base rounded-xl border-2 border-gray-200 hover:border-orange-300 hover:text-orange-600 transition-all duration-200 text-center"
                >
                  Become a Seller
                </a>
              </div>
            </div>

            {/* Hero visual */}
            <div className="flex-1 max-w-md lg:max-w-lg">
              <div className="relative">
                <div className="w-full aspect-square rounded-3xl bg-gradient-to-br from-orange-200 to-amber-100 flex items-center justify-center shadow-2xl shadow-orange-200/60">
                  <div className="text-center p-8">
                    <div className="text-7xl sm:text-8xl mb-4">🏪</div>
                    <p className="text-orange-800 font-bold text-xl sm:text-2xl">
                      अपना बाज़ार
                    </p>
                    <p className="text-orange-600 text-sm mt-1">
                      Everyone&apos;s Marketplace
                    </p>
                  </div>
                </div>
                {/* Floating badges */}
                <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 w-20 h-20 sm:w-24 sm:h-24 bg-green-500 rounded-2xl flex flex-col items-center justify-center text-white shadow-lg rotate-6">
                  <span className="text-xl sm:text-2xl font-extrabold">60%</span>
                  <span className="text-[10px] sm:text-xs font-semibold">OFF</span>
                </div>
                <div className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 w-20 h-20 sm:w-24 sm:h-24 bg-blue-500 rounded-2xl flex flex-col items-center justify-center text-white shadow-lg -rotate-6">
                  <span className="text-xs sm:text-sm font-bold">Free</span>
                  <span className="text-[10px] sm:text-xs">Delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                icon: <Truck size={28} className="text-orange-500" />,
                title: "Free Delivery",
                desc: "On orders above ₹499",
              },
              {
                icon: <ShieldCheck size={28} className="text-green-500" />,
                title: "Secure Payments",
                desc: "100% safe checkout",
              },
              {
                icon: <RotateCcw size={28} className="text-blue-500" />,
                title: "Easy Returns",
                desc: "7-day return policy",
              },
              {
                icon: <Headphones size={28} className="text-purple-500" />,
                title: "24/7 Support",
                desc: "Call or chat anytime",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gray-50 flex items-center justify-center shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section id="shop" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProductGrid />
      </section>

      {/* CTA Banner */}
      <section className="bg-gradient-to-r from-orange-500 to-amber-500 mt-10 sm:mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-center text-white">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">
            Are you a local seller?
          </h2>
          <p className="text-orange-100 text-base sm:text-lg max-w-md mx-auto mb-6">
            Join ApnaBazaar and reach thousands of customers across India. Easy setup, no technical skills needed.
          </p>
          <button className="px-8 py-3.5 bg-white text-orange-600 font-bold text-base rounded-xl hover:bg-orange-50 transition-colors shadow-lg">
            Register as Seller →
          </button>
        </div>
      </section>
    </>
  );
}
