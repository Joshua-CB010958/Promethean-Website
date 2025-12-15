import { Smartphone, Globe, Code2, Cpu, Zap, Workflow } from 'lucide-react';

const services = [
  {
    icon: Smartphone,
    title: 'Mobile App Development',
    description: 'Native and cross-platform mobile applications built with cutting-edge frameworks for iOS and Android.',
    features: ['iOS & Android', 'React Native', 'Flutter', 'Progressive Web Apps'],
  },
  {
    icon: Globe,
    title: 'Custom Web Development',
    description: 'Bespoke web applications tailored to your unique business requirements with modern technologies.',
    features: ['React & Next.js', 'Full-stack Solutions', 'Cloud Architecture', 'API Development'],
  },
  {
    icon: Code2,
    title: 'Template-Based Websites',
    description: 'Fast, cost-effective website solutions using premium templates customized to match your brand.',
    features: ['Rapid Deployment', 'Cost-Effective', 'Brand Customization', 'SEO Optimized'],
  },
  {
    icon: Cpu,
    title: 'Software Solutions',
    description: 'Enterprise-grade software engineering for complex business challenges and system integrations.',
    features: ['Custom Software', 'System Integration', 'Legacy Modernization', 'Cloud Migration'],
  },
  {
    icon: Zap,
    title: 'AI Integration',
    description: 'Harness the power of artificial intelligence with custom AI models and intelligent automation.',
    features: ['Machine Learning', 'Natural Language Processing', 'Predictive Analytics', 'Computer Vision'],
  },
  {
    icon: Workflow,
    title: 'Automation & Workflows',
    description: 'Streamline operations with intelligent business process automation and system orchestration.',
    features: ['Process Automation', 'Workflow Design', 'Integration Platforms', 'RPA Solutions'],
  },
];

export function Services() {
  return (
    <section id="services" className="section">
      <div className="container mx-auto">
        <div className="services-header">
          <div className="section-title">
            <h2>Comprehensive Technology Solutions</h2>
            <p className="section-subtitle">
              From concept to deployment, we deliver end-to-end solutions that drive innovation 
              and transform how you do business.
            </p>
          </div>
        </div>

        <div className="services-grid">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div key={index} className="service-card card glow-effect">
                <div className="service-icon-wrapper icon-wrapper">
                  <Icon size={28} color="white" />
                </div>
                
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
                
                <ul className="service-features">
                  {service.features.map((feature, i) => (
                    <li key={i} className="service-feature">{feature}</li>
                  ))}
                </ul>
                
                <a href="#contact" className="service-link">
                  Learn More
                  <span className="service-link-arrow">→</span>
                </a>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .services-header {
          margin-bottom: var(--space-4xl);
          padding: 0 var(--space-xl);
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: var(--space-xl);
          padding: 0 var(--space-xl);
        }

        .service-card {
          display: flex;
          flex-direction: column;
        }

        .service-icon-wrapper {
          margin-bottom: var(--space-lg);
        }

        .service-title {
          margin-bottom: var(--space-md);
          color: var(--color-text-primary);
        }

        .service-description {
          margin-bottom: var(--space-lg);
          color: var(--color-text-secondary);
          flex-grow: 1;
        }

        .service-features {
          list-style: none;
          margin-bottom: var(--space-lg);
          display: flex;
          flex-direction: column;
          gap: var(--space-xs);
        }

        .service-feature {
          color: var(--color-text-tertiary);
          padding-left: var(--space-lg);
          position: relative;
          font-size: 0.9rem;
        }

        .service-feature::before {
          content: '✓';
          position: absolute;
          left: 0;
          color: var(--color-accent-bright);
          font-weight: 700;
        }

        .service-link {
          display: inline-flex;
          align-items: center;
          gap: var(--space-xs);
          color: var(--color-primary-light);
          font-weight: 600;
          transition: gap var(--transition-base);
        }

        .service-link:hover {
          gap: var(--space-sm);
        }

        .service-link-arrow {
          transition: transform var(--transition-base);
        }

        .service-link:hover .service-link-arrow {
          transform: translateX(4px);
        }

        @media (max-width: 768px) {
          .services-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
