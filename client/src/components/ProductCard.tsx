import { Star } from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import type { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { t, language, mode } = useApp();

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <article className="bazaar-card overflow-hidden group" aria-label={product.name[language]}>
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name[language]}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {discount > 0 && (
          <span className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-lg">
            {discount}% {t("off")}
          </span>
        )}
      </div>

      {/* Details */}
      <div className={`p-3 md:p-4 space-y-2 ${mode === "simple" ? "p-5" : ""}`}>
        <h3 className={`font-semibold line-clamp-2 leading-snug ${mode === "simple" ? "text-lg" : "text-sm"}`}>
          {product.name[language]}
        </h3>

        {mode !== "visual" && (
          <p className="text-xs text-muted-foreground">
            {t("seller")}: {product.seller[language]}
          </p>
        )}

        {/* Rating */}
        <div className="flex items-center gap-1">
          <div className="flex items-center gap-0.5 bg-secondary text-secondary-foreground px-1.5 py-0.5 rounded text-xs font-semibold">
            <Star className="w-3 h-3 fill-current" />
            {product.rating}
          </div>
          {mode !== "visual" && (
            <span className="text-xs text-muted-foreground">
              ({product.reviews} {t("reviews")})
            </span>
          )}
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className={`font-bold text-foreground ${mode === "simple" ? "text-xl" : "text-base"}`}>
            ₹{product.price.toLocaleString("en-IN")}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ₹{product.originalPrice.toLocaleString("en-IN")}
            </span>
          )}
        </div>

        {/* Add to Cart */}
        <button
          className={`w-full bazaar-btn-primary text-sm mt-1 ${
            mode === "simple" ? "py-4 text-base" : "py-2.5"
          }`}
        >
          🛒 {t("addToCart")}
        </button>
      </div>
    </article>
  );
};

export default ProductCard;
