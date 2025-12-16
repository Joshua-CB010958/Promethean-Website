import { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { Hero3D } from './components/Hero3D';
import { ServicesPhysics } from './components/ServicesPhysics';
import { WhyUs } from './components/WhyUs';
import { ScrollNarrative } from './components/ScrollNarrative';
import { InteractivePortfolio } from './components/InteractivePortfolio';
import { Process } from './components/Process';
import { ParallaxTestimonials } from './components/ParallaxTestimonials';
import { Footer } from './components/Footer';
import { SmoothScroll } from './components/SmoothScroll';
import { BookingPage } from './components/BookingPage';
//import { CustomCursor } from './components/CustomCursor';
import { FloatingElements } from './components/FloatingElements';

export default function App() {
  const [showBooking, setShowBooking] = useState(false);

  useEffect(() => {
    // Check if URL hash is #booking
    const checkHash = () => {
      setShowBooking(window.location.hash === '#booking');
    };

    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  const handleShowBooking = () => {
    window.location.hash = 'booking';
    setShowBooking(true);
    window.scrollTo(0, 0);
  };

  const handleBackToHome = () => {
    window.location.hash = '';
    setShowBooking(false);
    window.scrollTo(0, 0);
  };

  // Expose booking function globally for easy access
  useEffect(() => {
    (window as any).showBooking = handleShowBooking;
  }, []);

  if (showBooking) {
    return (
      <>
        <Navigation />
        <BookingPage onBack={handleBackToHome} />
        <Footer />
      </>
    );
  }

  return (
    <SmoothScroll>
      <FloatingElements />
      <div className="app">
        <Navigation />
        <main>
          <Hero3D />
          <ServicesPhysics />
          <WhyUs />
          <ScrollNarrative />
          <InteractivePortfolio />
          <Process />
          <ParallaxTestimonials />
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  );
}