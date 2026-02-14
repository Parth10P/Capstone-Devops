import { Search, ShoppingCart, User, Menu, X, HelpCircle, Globe } from "lucide-react";
import { useState } from "react";
import { useApp } from "@/contexts/AppContext";

const Navbar = () => {
  const { t, language, setLanguage, mode } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount] = useState(2);

  const navItems = [
    { key: "home", icon: "🏠" },
    { key: "products", icon: "📦" },
    { key: "sellers", icon: "🏪" },
    { key: "help", icon: "❓" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-card/90 backdrop-blur-md border-b border-border">
      <div className="container mx-auto flex items-center justify-between py-3 px-4">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <span className="text-2xl font-extrabold text-gradient-saffron tracking-tight">
            {t("brand")}
          </span>
          <span className="hidden sm:inline text-xs font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
            {t("tagline")}
          </span>
        </div>

        {/* Search Bar - Pro/Visual mode */}
        {mode !== "simple" && (
          <div className="hidden md:flex items-center flex-1 max-w-md mx-6">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder={t("search")}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-muted border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                aria-label={t("search")}
              />
            </div>
          </div>
        )}

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Language Toggle */}
          <button
            onClick={() => setLanguage(language === "en" ? "hi" : "en")}
            className="flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-muted transition-colors text-sm font-medium"
            aria-label="Switch language"
          >
            <Globe className="w-4 h-4" />
            <span className="hidden sm:inline">{language === "en" ? "हिंदी" : "English"}</span>
          </button>

          {/* Cart */}
          <button className="relative p-2 rounded-lg hover:bg-muted transition-colors" aria-label={t("cart")}>
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 flex items-center justify-center bg-primary text-primary-foreground text-xs font-bold rounded-full">
                {cartCount}
              </span>
            )}
          </button>

          {/* Account */}
          <button className="p-2 rounded-lg hover:bg-muted transition-colors" aria-label={t("account")}>
            <User className="w-5 h-5" />
          </button>

          {/* Mobile menu */}
          <button
            className="p-2 rounded-lg hover:bg-muted transition-colors md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 ml-2" aria-label="Main navigation">
            {navItems.map((item) => (
              <button
                key={item.key}
                className="px-3 py-2 rounded-lg hover:bg-muted transition-colors text-sm font-medium flex items-center gap-1.5"
              >
                <span>{item.icon}</span>
                <span>{t(item.key)}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      {menuOpen && (
        <nav className="md:hidden border-t border-border bg-card animate-fade-in px-4 pb-4" aria-label="Mobile navigation">
          {/* Mobile search */}
          <div className="relative my-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder={t("search")}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-muted border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => (
              <button
                key={item.key}
                className="flex items-center gap-2 px-4 py-3 rounded-xl hover:bg-muted transition-colors text-sm font-medium"
              >
                <span className="text-lg">{item.icon}</span>
                <span>{t(item.key)}</span>
              </button>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
