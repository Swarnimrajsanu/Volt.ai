import FeaturesSection from './components/FeaturesSection';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import HowItWorksSection from './components/HowItWorksSection';
import Navbar from './components/Navbar';
import ParticleBackground from './components/ParticleBackground';
import PricingSection from './components/PricingSection';
import TemplatesSection from './components/TemplatesSection';

export default function App() {
  return (
    <div className="relative min-h-screen bg-dark-900 text-white">
      <ParticleBackground />
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <TemplatesSection />
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
}
