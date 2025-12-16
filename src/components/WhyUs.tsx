import { Zap, Award, Lightbulb, DollarSign, TrendingUp } from 'lucide-react';

const reasons = [
  {
    icon: Zap,
    title: 'Efficiency',
    description: 'Streamlined processes and agile methodologies ensure rapid delivery without compromising quality.',
    metric: '40% faster',
    metricLabel: 'time to market',
  },
  {
    icon: Award,
    title: 'Technical Expertise',
    description: 'Our team of senior engineers brings decades of combined experience across all major tech stacks.',
    metric: '50+ experts',
    metricLabel: 'in our team',
  },
  {
    icon: Lightbulb,
    title: 'AI-First Approach',
    description: 'We leverage cutting-edge AI and machine learning to create intelligent, future-proof solutions.',
    metric: 'Industry leading',
    metricLabel: 'innovation',
  },
  {
    icon: DollarSign,
    title: 'Competitive Pricing',
    description: 'Enterprise-grade solutions at transparent, competitive rates with flexible engagement models.',
    metric: '30% savings',
    metricLabel: 'vs competitors',
  },
  {
    icon: TrendingUp,
    title: 'Scalability & Support',
    description: 'Built to scale with your business, backed by 24/7 support and continuous optimization.',
    metric: '99.9% uptime',
    metricLabel: 'guaranteed',
  },
];

export function WhyUs() {
  return (
    <section id="why-us" className="section why-us-section">
      <div className="container mx-auto">
        <div className="section-title">
          <h2>Why Choose Promethean AI</h2>
          <p className="section-subtitle">
            We combine technical excellence with business acumen to deliver solutions 
            that drive measurable results and sustainable growth.
          </p>
        </div>

        <div className="why-us-grid">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <div key={index} className="why-us-card card-glass">
                <div className="why-us-icon-wrapper icon-wrapper icon-wrapper-accent">
                  <Icon size={28} color="white" />
                </div>
                
                <div className="why-us-content">
                  <h3 className="why-us-title">{reason.title}</h3>
                  <p className="why-us-description">{reason.description}</p>
                  
                  <div className="why-us-metric">
                    <div className="metric-value">{reason.metric}</div>
                    <div className="metric-label">{reason.metricLabel}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="why-us-cta">
          <div className="cta-content">
            <h3 className="cta-title">Ready to Transform Your Business?</h3>
            <p className="cta-description">
              Join hundreds of successful companies leveraging our expertise to build the future.
            </p>
            <a href="#booking" className="btn btn-primary">
              Start Your Project Today
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .why-us-section {
          background: var(--gradient-surface);
          position: relative;
          overflow: hidden;
        }

        .why-us-section::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 800px;
          height: 800px;
          background: var(--gradient-glow);
          opacity: 0.3;
          pointer-events: none;
          border-radius: 50%;
        }

        .why-us-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: var(--space-xl);
          padding: 0 var(--space-xl);
          margin-bottom: var(--space-4xl);
          position: relative;
          z-index: 1;
          justify-items: center;
          max-width: 1400px;
          margin-left: auto;
          margin-right: auto;
        }

        .why-us-card {
          display: flex;
          flex-direction: column;
          gap: var(--space-lg);
          width: 100%;
          max-width: 400px;
        }

        .why-us-icon-wrapper {
          flex-shrink: 0;
        }

        .why-us-content {
          flex-grow: 1;
        }

        .why-us-title {
          color: var(--color-text-primary);
          margin-bottom: var(--space-sm);
        }

        .why-us-description {
          color: var(--color-text-secondary);
          margin-bottom: var(--space-lg);
          font-size: 1rem;
        }

        .why-us-metric {
          padding-top: var(--space-md);
          border-top: 1px solid var(--color-border);
        }

        .metric-value {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--color-accent-bright);
          line-height: 1.2;
        }

        .metric-label {
          color: var(--color-text-tertiary);
          font-size: 0.875rem;
          margin-top: var(--space-xs);
        }

        .why-us-cta {
          position: relative;
          z-index: 1;
          padding: 0 var(--space-xl);
        }

        .cta-content {
          background: var(--gradient-primary);
          border-radius: var(--radius-2xl);
          padding: var(--space-3xl);
          text-align: center;
          box-shadow: var(--shadow-glow);
        }

        .cta-title {
          color: white;
          margin-bottom: var(--space-md);
        }

        .cta-description {
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: var(--space-xl);
          max-width: 42rem;
          margin-left: auto;
          margin-right: auto;
        }

        .cta-content .btn {
          background: white;
          color: var(--color-primary);
        }

        .cta-content .btn:hover {
          background: rgba(255, 255, 255, 0.95);
          transform: translateY(-2px);
        }

        @media (max-width: 768px) {
          .why-us-grid {
            grid-template-columns: 1fr;
          }

          .cta-content {
            padding: var(--space-2xl) var(--space-xl);
          }
        }
      `}</style>
    </section>
  );
}
