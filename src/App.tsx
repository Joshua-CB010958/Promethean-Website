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
//import { CustomCursor } from './components/CustomCursor';
import { FloatingElements } from './components/FloatingElements';

export default function App() {
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