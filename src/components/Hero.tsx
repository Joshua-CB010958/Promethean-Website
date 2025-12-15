import { ArrowRight, Sparkles } from 'lucide-react';

export function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-glow-top"></div>
      <div className="container mx-auto">
        <div className="hero-content">
          <div className="hero-badge">
            <Sparkles size={16} />
            <span>Next-Generation Business Solutions</span>
          </div>
          
          <h1 className="hero-title animate-fade-in-up">
            AI-Powered Software, Web & Automation Solutions for Modern Businesses
          </h1>
          
          <p className="hero-subtitle">
            Transform your business with cutting-edge mobile apps, custom web development, 
            intelligent software solutions, and enterprise-grade AI integration. We build 
            scalable systems that automate workflows and accelerate growth.
          </p>
          
          <div className="hero-actions">
            <a href="#contact" className="btn btn-primary">
              Book a Consultation
              <ArrowRight size={20} />
            </a>
            <a href="#portfolio" className="btn btn-secondary">
              See Our Work
            </a>
          </div>

          <div className="hero-stats">
            <div className="hero-stat">
              <div className="hero-stat-value">500+</div>
              <div className="hero-stat-label">Projects Delivered</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-value">98%</div>
              <div className="hero-stat-label">Client Satisfaction</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-value">24/7</div>
              <div className="hero-stat-label">Support Available</div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hero-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: var(--space-5xl) 0;
          position: relative;
          overflow: hidden;
        }

        .hero-glow-top {
          position: absolute;
          top: -20%;
          left: 50%;
          transform: translateX(-50%);
          width: 100%;
          height: 100%;
          background: var(--gradient-hero);
          pointer-events: none;
          z-index: 0;
        }

        .hero-content {
          position: relative;
          z-index: 1;
          max-width: 56rem;
          margin: 0 auto;
          text-align: center;
          padding: 0 var(--space-xl);
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: var(--space-sm);
          padding: var(--space-sm) var(--space-lg);
          background: var(--glass-background);
          backdrop-filter: var(--glass-blur);
          -webkit-backdrop-filter: var(--glass-blur);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-full);
          color: var(--color-accent-bright);
          margin-bottom: var(--space-xl);
          font-size: 0.875rem;
          font-weight: 600;
        }

        .hero-title {
          margin-bottom: var(--space-xl);
          background: linear-gradient(135deg, var(--color-text-primary) 0%, var(--color-text-secondary) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-subtitle {
          margin-bottom: var(--space-2xl);
          font-size: 1.25rem;
          max-width: 48rem;
          margin-left: auto;
          margin-right: auto;
        }

        .hero-actions {
          display: flex;
          gap: var(--space-lg);
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: var(--space-4xl);
        }

        .hero-actions .btn {
          gap: var(--space-sm);
        }

        .hero-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: var(--space-xl);
          padding-top: var(--space-2xl);
          border-top: 1px solid var(--color-border);
          max-width: 48rem;
          margin: 0 auto;
        }

        .hero-stat {
          text-align: center;
        }

        .hero-stat-value {
          font-size: 2.5rem;
          font-weight: 700;
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1.2;
        }

        .hero-stat-label {
          color: var(--color-text-secondary);
          margin-top: var(--space-xs);
          font-size: 0.875rem;
        }

        @media (max-width: 768px) {
          .hero-section {
            min-height: auto;
            padding: var(--space-4xl) 0;
          }

          .hero-actions {
            flex-direction: column;
            align-items: stretch;
          }

          .hero-actions .btn {
            width: 100%;
          }

          .hero-stats {
            grid-template-columns: 1fr;
            gap: var(--space-lg);
          }
        }
      `}</style>
    </section>
  );
}
