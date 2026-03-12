import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CTASection from './components/CTASection';
import DemoSection from './components/DemoSection';
import FeaturesSection from './components/FeaturesSection';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import Navbar from './components/Navbar';
import ParticleBackground from './components/ParticleBackground';
import PricingSection from './components/PricingSection';
import TemplatesSection from './components/TemplatesSection';
import Builder from './pages/Builder';

function LandingPage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <DemoSection />
      <TemplatesSection />
      <PricingSection />
      <CTASection />
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div className="relative min-h-screen" style={{ background: '#020010' }}>
              <ParticleBackground />
              <div className="relative z-10">
                <LandingPage />
              </div>
            </div>
          }
        />
        <Route path="/builder" element={<Builder />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
