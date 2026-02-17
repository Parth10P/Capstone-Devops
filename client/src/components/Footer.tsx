import { useApp } from "@/contexts/AppContext";

const Footer = () => {
  const { t } = useApp();

  return (
    <footer className="bg-foreground text-background mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-extrabold mb-2">{t("brand")}</h3>
            <p className="text-background/60 text-sm max-w-sm">
              {t("tagline")} — Bridging the digital divide with an inclusive marketplace for every Indian.
            </p>
            <div className="flex gap-3 mt-4">
              <span className="text-sm bg-background/10 px-3 py-1.5 rounded-full">{t("madeInIndia")}</span>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-background/80 text-sm uppercase tracking-wide">Quick Links</h4>
            <ul className="space-y-2 text-sm text-background/60">
              <li><button className="hover:text-background transition-colors">{t("home")}</button></li>
              <li><button className="hover:text-background transition-colors">{t("products")}</button></li>
              <li><button className="hover:text-background transition-colors">{t("sellers")}</button></li>
              <li><button className="hover:text-background transition-colors">{t("help")}</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-background/80 text-sm uppercase tracking-wide">Features</h4>
            <ul className="space-y-2 text-sm text-background/60">
              <li>Multi-language Support</li>
              <li>Adaptive UI Modes</li>
              <li>Elder-friendly Design</li>
              <li>Seller Onboarding</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/10 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-background/40">
          <span>© 2026 {t("brand")}. All rights reserved.</span>
          <span>Designed with ❤️ for inclusive India</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
