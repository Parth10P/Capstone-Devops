import { useApp } from "@/contexts/AppContext";
import heroBg from "@/assets/hero-bazaar.jpg";

const HeroSection = () => {
  const { t, mode } = useApp();

  return (
    <section className="relative overflow-hidden" aria-label="Hero">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Vibrant Indian marketplace"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent" />
      </div>

      <div className="relative container mx-auto px-4 py-16 md:py-28">
        <div className="max-w-xl space-y-6">
          <div className="inline-block">
            <span className="bg-primary/20 text-primary-foreground text-sm font-semibold px-4 py-1.5 rounded-full backdrop-blur-sm border border-primary/30">
              {t("madeInIndia")}
            </span>
          </div>
          <h1
            className={`font-extrabold tracking-tight text-primary-foreground leading-tight ${
              mode === "simple" ? "text-4xl md:text-5xl" : "text-3xl md:text-5xl lg:text-6xl"
            }`}
            style={{ animationDelay: "0.1s" }}
          >
            {t("heroTitle")}
          </h1>
          <p
            className={`text-primary-foreground/80 max-w-md ${
              mode === "simple" ? "text-xl" : "text-base md:text-lg"
            }`}
          >
            {t("heroSubtitle")}
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <button className="bazaar-btn-primary text-base md:text-lg px-8 py-4 shadow-warm">
              {t("shopNow")} →
            </button>
            <button className="bazaar-btn-outline border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
              {t("exploreCategories")}
            </button>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="relative bg-foreground/30 backdrop-blur-md border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 text-primary-foreground/90 text-xs md:text-sm font-medium">
            <span className="flex items-center gap-1.5">🚚 {t("freeDelivery")}</span>
            <span className="flex items-center gap-1.5">🔄 {t("easyReturns")}</span>
            <span className="flex items-center gap-1.5">🔒 {t("securePayment")}</span>
            <span className="flex items-center gap-1.5">🤝 {t("supportLocal")}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
