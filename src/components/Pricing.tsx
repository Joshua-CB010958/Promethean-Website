import { Check, Zap, Globe, Settings, BarChart3, Bot, Workflow, Smartphone } from 'lucide-react';

const services = [
  {
    name: 'Website Development',
    icon: Globe,
    packages: [
      {
        tier: 'Basic',
        price: '£399',
        features: ['5-page static site', 'Responsive design', 'Basic SEO']
      },
      {
        tier: 'Growth',
        price: '£999',
        features: ['10-15 pages', 'CMS (WordPress/Webflow)', 'On-page SEO', 'Speed optimization']
      },
      {
        tier: 'Pro',
        price: '£2,499',
        features: ['Custom design', 'Advanced animations', 'API integrations', 'Optional e-commerce'],
        featured: true
      }
    ]
  },
  {
    name: 'Software Solutions',
    icon: Settings,
    packages: [
      {
        tier: 'Basic',
        price: '£1,499',
        features: ['Simple internal web app', 'Core business logic']
      },
      {
        tier: 'Growth',
        price: '£4,999',
        features: ['Multi-module system', '3rd-party integrations', 'Admin dashboard']
      },
      {
        tier: 'Pro',
        price: '£9,999',
        features: ['Custom architecture', 'Role-based access', 'Scalable infrastructure'],
        featured: true
      }
    ]
  },
  {
    name: 'CRM Development',
    icon: BarChart3,
    packages: [
      {
        tier: 'Basic',
        price: '£3,500',
        features: ['CRM MVP', 'Leads & contacts', 'Deal pipeline', 'Notes & activities', 'Basic dashboard']
      },
      {
        tier: 'Growth',
        price: '£7,000 - £9,000',
        features: ['Custom fields & workflows', 'Email integrations', 'Advanced reporting']
      },
      {
        tier: 'Pro',
        price: '£12,000 - £16,000',
        features: ['Granular roles & permissions', 'Scalable architecture', 'Audit logs', 'Automation-ready'],
        featured: true
      }
    ]
  },
  {
    name: 'AI Automations',
    icon: Bot,
    packages: [
      {
        tier: 'Basic',
        price: '£299',
        features: ['Single AI automation', 'Basic prompt logic']
      },
      {
        tier: 'Growth',
        price: '£999',
        features: ['Multi-step automations', 'API-based AI tools', 'Error handling']
      },
      {
        tier: 'Pro',
        price: '£2,999',
        features: ['Custom AI workflows', 'Autonomous agents', 'BI layer'],
        featured: true
      }
    ]
  },
  {
    name: 'Workflow Automations',
    icon: Workflow,
    packages: [
      {
        tier: 'Basic',
        price: '£199',
        features: ['3-step workflow (Zapier/Make)']
      },
      {
        tier: 'Growth',
        price: '£599',
        features: ['10-step workflow', 'Multiple app connections']
      },
      {
        tier: 'Pro',
        price: '£1,999',
        features: ['Full process automation', 'Custom logic', 'Monitoring'],
        featured: true
      }
    ]
  },
  {
    name: 'Mobile App Creation',
    icon: Smartphone,
    packages: [
      {
        tier: 'Basic',
        price: '£2,999',
        features: ['MVP app', 'Single platform (Android or iOS)']
      },
      {
        tier: 'Growth',
        price: '£6,999',
        features: ['Cross-platform (Flutter/React Native)', 'Backend included']
      },
      {
        tier: 'Pro',
        price: '£14,999',
        features: ['Complex features', 'Realtime sync', 'Admin panel', 'Robust backend'],
        featured: true
      }
    ]
  }
];

const addOns = [
  { name: 'Maintenance & Support', price: '£99 – £499 / month', description: 'Ongoing updates, bug fixes, and technical support' },
  { name: 'Hosting & Infrastructure', price: '£49 – £199 / month', description: 'Reliable hosting with monitoring and backups' },
  { name: 'AI Monitoring & Improvements', price: '£149 – £599 / month', description: 'Continuous AI model optimization and monitoring' },
  { name: 'SLA / Priority Support', price: '£199 – £1,000 / month', description: 'Guaranteed response times and priority assistance' }
];

export function Pricing() {
  return (
    <section id="pricing" className="section pricing-section">
      <div className="container mx-auto">
        <div className="section-title">
          <h2>Transparent Pricing</h2>
          <p className="section-subtitle">
            Choose the package that fits your needs. Every project is tailored to deliver maximum value.
          </p>
        </div>

        <div className="pricing-services">
          {services.map((service, idx) => {
            const IconComponent = service.icon;
            return (
              <div key={idx} className="pricing-service-group">
                <h3 className="service-group-title">
                  <span className="service-icon">
                    <IconComponent size={32} strokeWidth={1.5} />
                  </span>
                  {service.name}
                </h3>
              
              <div className="pricing-packages">
                {service.packages.map((pkg, pkgIdx) => (
                  <div key={pkgIdx} className={`pricing-card ${pkg.featured ? 'featured' : ''}`}>
                    {pkg.featured && (
                      <div className="featured-badge">
                        <Zap size={14} />
                        Most Popular
                      </div>
                    )}
                    <div className="package-tier">{pkg.tier}</div>
                    <div className="package-price">{pkg.price}</div>
                    <ul className="package-features">
                      {pkg.features.map((feature, fIdx) => (
                        <li key={fIdx}>
                          <Check size={16} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <a href="#booking" className="btn btn-ghost">
                      Get Started
                    </a>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
        </div>

        <div className="add-ons-section">
          <h3 className="add-ons-title">Optional Add-Ons</h3>
          <p className="add-ons-subtitle">Enhance your solution with ongoing support and services</p>
          
          <div className="add-ons-grid">
            {addOns.map((addon, idx) => (
              <div key={idx} className="addon-card">
                <div className="addon-header">
                  <h4>{addon.name}</h4>
                  <div className="addon-price">{addon.price}</div>
                </div>
                <p className="addon-description">{addon.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .pricing-section {
          background: var(--color-surface);
        }

        .pricing-services {
          display: flex;
          flex-direction: column;
          gap: var(--space-4xl);
          margin-bottom: var(--space-5xl);
        }

        .pricing-service-group {
          width: 100%;
        }

        .service-group-title {
          text-align: center;
          margin-bottom: var(--space-2xl);
          color: var(--color-text-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-md);
        }

        .service-icon {
          font-size: 2rem;
        }

        .pricing-packages {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: var(--space-xl);
          max-width: 1200px;
          margin: 0 auto;
        }

        .pricing-card {
          background: var(--color-surface-elevated);
          border: 2px solid var(--color-border);
          border-radius: var(--radius-xl);
          padding: var(--space-2xl);
          display: flex;
          flex-direction: column;
          position: relative;
          transition: all var(--transition-base);
        }

        .pricing-card:hover {
          border-color: var(--color-primary-light);
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
        }

        .pricing-card.featured {
          border-color: var(--color-primary);
          background: rgba(99, 102, 241, 0.05);
        }

        .featured-badge {
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          background: var(--gradient-primary);
          color: white;
          padding: var(--space-xs) var(--space-md);
          border-radius: var(--radius-full);
          font-size: 0.75rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: var(--space-xs);
          box-shadow: var(--shadow-md);
        }

        .package-tier {
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--color-primary-light);
          margin-bottom: var(--space-sm);
        }

        .package-price {
          font-size: 2rem;
          font-weight: 700;
          color: var(--color-text-primary);
          margin-bottom: var(--space-xl);
        }

        .package-features {
          list-style: none;
          margin-bottom: var(--space-xl);
          flex-grow: 1;
        }

        .package-features li {
          display: flex;
          align-items: flex-start;
          gap: var(--space-sm);
          padding: var(--space-sm) 0;
          color: var(--color-text-secondary);
        }

        .package-features li svg {
          color: var(--color-accent-bright);
          flex-shrink: 0;
          margin-top: 2px;
        }

        .add-ons-section {
          background: var(--color-background);
          border-radius: var(--radius-2xl);
          padding: var(--space-3xl);
          text-align: center;
        }

        .add-ons-title {
          color: var(--color-text-primary);
          margin-bottom: var(--space-md);
        }

        .add-ons-subtitle {
          color: var(--color-text-secondary);
          margin-bottom: var(--space-2xl);
        }

        .add-ons-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: var(--space-lg);
          max-width: 1200px;
          margin: 0 auto;
        }

        .addon-card {
          background: var(--color-surface-elevated);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          padding: var(--space-xl);
          text-align: left;
          transition: all var(--transition-base);
        }

        .addon-card:hover {
          border-color: var(--color-primary-light);
          transform: translateY(-2px);
        }

        .addon-header {
          display: flex;
          flex-direction: column;
          gap: var(--space-sm);
          margin-bottom: var(--space-md);
        }

        .addon-header h4 {
          color: var(--color-text-primary);
          font-size: 1.125rem;
          margin: 0;
          line-height: 1.4;
          word-wrap: break-word;
          overflow-wrap: break-word;
          hyphens: auto;
        }

        .addon-price {
          font-weight: 600;
          color: var(--color-accent-bright);
          font-size: 0.875rem;
          line-height: 1.4;
        }

        .addon-description {
          color: var(--color-text-tertiary);
          font-size: 0.9rem;
          margin: 0;
          line-height: 1.6;
          word-wrap: break-word;
          overflow-wrap: break-word;
        }

        @media (max-width: 768px) {
          .pricing-packages {
            grid-template-columns: 1fr;
          }

          .add-ons-grid {
            grid-template-columns: 1fr;
          }

          .service-group-title {
            flex-direction: column;
            gap: var(--space-sm);
          }
        }
      `}</style>
    </section>
  );
}
