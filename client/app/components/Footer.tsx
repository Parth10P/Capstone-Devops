import {
  Phone,
  Mail,
  MapPin,
  Globe,
  Camera,
  MessageCircle,
  Heart,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white font-bold text-lg shadow">
                अ
              </div>
              <div>
                <h3 className="text-white text-lg font-bold">ApnaBazaar</h3>
                <p className="text-orange-400 text-xs font-medium">
                  Everyone&apos;s Marketplace
                </p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-gray-400 mb-4">
              An inclusive e-commerce platform designed for everyone — bridging the digital divide in India.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-orange-500 flex items-center justify-center transition-colors">
                <Globe size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-orange-500 flex items-center justify-center transition-colors">
                <Camera size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-orange-500 flex items-center justify-center transition-colors">
                <MessageCircle size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-base mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {["Home", "All Products", "Deals & Offers", "Become a Seller", "About Us"].map(
                (link) => (
                  <li key={link}>
                    <a href="#" className="text-sm hover:text-orange-400 transition-colors">
                      {link}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Help & Support */}
          <div>
            <h4 className="text-white font-semibold text-base mb-4">Help & Support</h4>
            <ul className="space-y-2.5">
              {[
                "How to Order",
                "Returns & Refunds",
                "Shipping Info",
                "FAQs",
                "Accessibility",
              ].map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm hover:text-orange-400 transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-base mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2.5 text-sm">
                <Phone size={16} className="text-orange-400 shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm">
                <Mail size={16} className="text-orange-400 shrink-0" />
                <span>help@apnabazaar.in</span>
              </li>
              <li className="flex items-start gap-2.5 text-sm">
                <MapPin size={16} className="text-orange-400 shrink-0 mt-0.5" />
                <span>Ahmedabad, Gujarat, India</span>
              </li>
            </ul>

            {/* Language toggle stub */}
            <div className="mt-6 p-3 bg-gray-800 rounded-xl">
              <p className="text-xs text-gray-400 mb-2 font-medium">Language / भाषा</p>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 rounded-lg bg-orange-500 text-white text-xs font-semibold">
                  English
                </button>
                <button className="px-3 py-1.5 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-300 text-xs font-semibold transition-colors">
                  हिन्दी
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
          <p>© 2026 ApnaBazaar. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart size={12} className="text-red-400 fill-red-400" /> in India
          </p>
        </div>
      </div>
    </footer>
  );
}
