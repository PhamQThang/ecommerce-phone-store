import HomeCarousel from "@/components/client/homes/HomeCarousel";
import SalesSection from "@/components/client/homes/SalesSection";
import FeaturedPhonesSection from "@/components/client/homes/FeaturedPhonesSection";
import BenefitsSection from "@/components/client/homes/BenefitsSection"; // Import mới
import NewsSection from "@/components/client/homes/NewsSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <HomeCarousel />
      <SalesSection />
      <FeaturedPhonesSection />
      <BenefitsSection />
      <NewsSection />
    </div>
  );
}
