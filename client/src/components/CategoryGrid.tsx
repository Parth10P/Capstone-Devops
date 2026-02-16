import { useApp } from "@/contexts/AppContext";
import { categories } from "@/data/products";

const CategoryGrid = () => {
  const { t, language, mode } = useApp();

  return (
    <section className="container mx-auto px-4 py-12" aria-label={t("categories")}>
      <div className="flex items-center justify-between mb-8">
        <h2 className={`font-bold ${mode === "simple" ? "text-2xl" : "text-xl md:text-2xl"}`}>
          {t("categories")}
        </h2>
        <button className="text-sm font-medium text-primary hover:underline">
          {t("viewAll")} →
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        {categories.map((cat, i) => (
          <button
            key={cat.id}
            className="bazaar-card flex flex-col items-center gap-2 p-4 md:p-5 hover:border-primary/30 group cursor-pointer"
            style={{ animationDelay: `${i * 0.05}s` }}
            aria-label={cat.name[language]}
          >
            <span className={`text-3xl md:text-4xl transition-transform duration-200 group-hover:scale-110 ${mode === "simple" ? "text-5xl" : ""}`}>
              {cat.icon}
            </span>
            <span className={`text-center font-medium leading-tight ${mode === "simple" ? "text-base" : "text-xs md:text-sm"}`}>
              {cat.name[language]}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default CategoryGrid;
