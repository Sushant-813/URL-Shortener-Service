import LandingHero from "../../components/landing/LandingHero";
import FeaturesSection from "../../components/landing/FeaturesSection";
import HowItWorksSection from "../../components/landing/HowItWorksSection";
import DashboardPreview from "../../components/landing/DashboardPreview";
import TechStackSection from "../../components/landing/TechStackSection";
import LandingFooter from "../../components/landing/LandingFooter";

function Landing() {
  return (
    <div className="min-h-screen bg-[var(--color-canvas)] text-[var(--color-text-primary)]">
      <div className="mx-auto max-w-[var(--dashboard-content-width)] px-4 sm:px-6 lg:px-8">
        <LandingHero />
        <FeaturesSection />
        <HowItWorksSection />
        <DashboardPreview />
        <TechStackSection />
      </div>
      <LandingFooter />
    </div>
  );
}

export default Landing;
