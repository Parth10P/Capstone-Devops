import { useApp } from "@/contexts/AppContext";
import { products } from "@/data/products";
import ProductCard from "./ProductCard";

const ProductGrid = () => {
  const { t, mode } = useApp();

  const gridCols = mode === "simple"
    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
    : mode === "visual"
    ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
    : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4";

  return (
    <section className="container mx-auto px-4 py-12" aria-label={t("trending")}>
      <div className="flex items-center justify-between mb-8">
        <h2 className={`font-bold ${mode === "simple" ? "text-2xl" : "text-xl md:text-2xl"}`}>
          {t("trending")} 🔥
        </h2>
        <button className="text-sm font-medium text-primary hover:underline">
          {t("viewAll")} →
        </button>
      </div>

      <div className={`grid ${gridCols} gap-4 md:gap-5`}>
        {products.map((product, i) => (
          <div key={product.id} className="animate-fade-in-up opacity-0" style={{ animationDelay: `${i * 0.08}s` }}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;
