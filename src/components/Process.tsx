import { Search, Palette, Code, Cpu, Rocket, Headphones } from 'lucide-react';

const steps = [
  {
    icon: Search,
    number: '01',
    title: 'Discovery',
    description: 'We dive deep into your business goals, challenges, and requirements to create a comprehensive project roadmap.',
  },
  {
    icon: Palette,
    number: '02',
    title: 'Design',
    description: 'Our design team crafts intuitive, visually stunning interfaces that align with your brand and user needs.',
  },
  {
    icon: Code,
    number: '03',
    title: 'Development',
    description: 'Expert engineers build your solution using cutting-edge technologies and industry best practices.',
  },
  {
    icon: Cpu,
    number: '04',
    title: 'AI Integration',
    description: 'We embed intelligent automation and AI capabilities to enhance functionality and user experience.',
  },
  {
    icon: Rocket,
    number: '05',
    title: 'Deployment',
    description: 'Seamless launch with comprehensive testing, optimization, and production environment setup.',
  },
  {
    icon: Headphones,
    number: '06',
    title: 'Maintenance',
    description: 'Ongoing support, updates, and continuous optimization to ensure peak performance and security.',
  },
];

export function Process() {
  return (
    <section id="process" className="section process-section">
      <div className="container mx-auto">
        <div className="section-title">
          <h2>Our Process</h2>
          <p className="section-subtitle">
            A proven methodology that transforms ideas into exceptional digital products 
            through collaboration, innovation, and technical excellence.
          </p>
        </div>

        <div className="process-timeline">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isEven = index % 2 === 0;
            
            return (
              <div key={index} className={`process-step ${isEven ? 'step-left' : 'step-right'}`}>
                <div className="step-content card-glass">
                  <div className="step-header">
                    <div className="step-icon-wrapper icon-wrapper">
                      <Icon size={24} color="white" />
                    </div>
                    <span className="step-number">{step.number}</span>
                  </div>
                  
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-description">{step.description}</p>
                </div>
                
                {index < steps.length - 1 && (
                  <div className="step-connector"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .process-section {
          background: var(--color-surface);
          position: relative;
          overflow: hidden;
        }

        .process-timeline {
          position: relative;
          max-width: 64rem;
          margin: 0 auto;
          padding: 0 var(--space-xl);
        }

        .process-timeline::before {
          content: '';
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 2px;
          background: linear-gradient(180deg, 
            transparent 0%, 
            var(--color-primary) 10%, 
            var(--color-primary) 90%, 
            transparent 100%
          );
          transform: translateX(-50%);
        }

        .process-step {
          position: relative;
          margin-bottom: var(--space-4xl);
          display: flex;
          justify-content: flex-end;
          width: 100%;
        }

        .step-left {
          justify-content: flex-start;
        }

        .step-left .step-content {
          margin-right: calc(50% + var(--space-3xl));
        }

        .step-right {
          justify-content: flex-end;
        }

        .step-right .step-content {
          margin-left: calc(50% + var(--space-3xl));
        }

        .step-content {
          max-width: 24rem;
          position: relative;
        }

        .step-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: var(--space-lg);
        }

        .step-icon-wrapper {
          width: 3.5rem;
          height: 3.5rem;
        }

        .step-number {
          font-size: 3rem;
          font-weight: 700;
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          opacity: 0.3;
          line-height: 1;
        }

        .step-title {
          color: var(--color-text-primary);
          margin-bottom: var(--space-sm);
        }

        .step-description {
          color: var(--color-text-secondary);
          font-size: 1rem;
        }

        .step-connector {
          position: absolute;
          width: var(--space-3xl);
          height: 2px;
          background: var(--gradient-primary);
          top: 2rem;
          left: 50%;
          transform: translateX(-50%);
        }

        @media (max-width: 1024px) {
          .process-timeline::before {
            left: var(--space-xl);
          }

          .process-step {
            justify-content: flex-start !important;
          }

          .step-left .step-content,
          .step-right .step-content {
            margin-left: calc(var(--space-xl) + var(--space-3xl));
            margin-right: 0;
          }

          .step-connector {
            display: none;
          }
        }

        @media (max-width: 768px) {
          .process-timeline::before {
            left: var(--space-lg);
          }

          .step-content {
            max-width: 100%;
          }

          .step-left .step-content,
          .step-right .step-content {
            margin-left: calc(var(--space-lg) + var(--space-2xl));
          }

          .step-number {
            font-size: 2rem;
          }

          .step-icon-wrapper {
            width: 3rem;
            height: 3rem;
          }
        }
      `}</style>
    </section>
  );
}
