import HeroSection from "./sections/HeroSection";
import FeaturesSection from "./sections/FeaturesSection";
import PlanSection from "./sections/PlanSection";
import SystemSection from "./sections/System";
import FAQ from "./sections/FAQ";

const Home = () => {
  return (
    <div className="text-text-primary">
      <HeroSection />
      <FeaturesSection />
      <PlanSection />
      <SystemSection />
      <FAQ />
    </div>
  );
};

export default Home;
