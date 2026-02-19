import { AppProvider } from "@/contexts/AppContext";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ModeSelector from "@/components/ModeSelector";
import CategoryGrid from "@/components/CategoryGrid";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <AppProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <HeroSection />
          <ModeSelector />
          <CategoryGrid />
          <ProductGrid />
        </main>
        <Footer />
      </div>
    </AppProvider>
  );
};

export default Index;
