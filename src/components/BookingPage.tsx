import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Smartphone, Globe, Code2, Cpu, Zap, Workflow, Check, ArrowRight, ArrowLeft } from 'lucide-react';

const services = [
  {
    id: 'mobile',
    icon: Smartphone,
    title: 'Mobile App Development',
    description: 'Native and cross-platform mobile applications for iOS and Android.',
    features: ['iOS & Android', 'React Native', 'Flutter', 'Progressive Web Apps'],
    color: '#6366f1',
  },
  {
    id: 'web',
    icon: Globe,
    title: 'Custom Web Development',
    description: 'Bespoke web applications tailored to your business requirements.',
    features: ['React & Next.js', 'Full-stack Solutions', 'Cloud Architecture', 'API Development'],
    color: '#8b5cf6',
  },
  {
    id: 'template',
    icon: Code2,
    title: 'Template-Based Websites',
    description: 'Fast, cost-effective website solutions using premium templates.',
    features: ['Rapid Deployment', 'Cost-Effective', 'Brand Customization', 'SEO Optimized'],
    color: '#06b6d4',
  },
  {
    id: 'software',
    icon: Cpu,
    title: 'Software Solutions',
    description: 'Enterprise-grade software engineering for complex challenges.',
    features: ['Custom Software', 'System Integration', 'Legacy Modernization', 'Cloud Migration'],
    color: '#22d3ee',
  },
  {
    id: 'ai',
    icon: Zap,
    title: 'AI Integration',
    description: 'Custom AI models and intelligent automation solutions.',
    features: ['Machine Learning', 'Natural Language Processing', 'Predictive Analytics', 'Computer Vision'],
    color: '#818cf8',
  },
  {
    id: 'automation',
    icon: Workflow,
    title: 'Automation & Workflows',
    description: 'Intelligent business process automation and system orchestration.',
    features: ['Process Automation', 'Workflow Design', 'Integration Platforms', 'RPA Solutions'],
    color: '#4f46e5',
  },
];

interface BookingPageProps {
  onBack: () => void;
}

export function BookingPage({ onBack }: BookingPageProps) {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [step, setStep] = useState<'services' | 'details'>('services');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: '',
  });

  const toggleService = (serviceId: string) => {
    setSelectedServices(prev =>
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Get service titles instead of IDs
      const serviceNames = selectedServices.map(serviceId => {
        const service = services.find(s => s.id === serviceId);
        return service ? service.title : serviceId;
      });

      const response = await fetch('http://localhost:3002/api/send-consultation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          selectedServices: serviceNames,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        // Reset form after successful submission
        setTimeout(() => {
          setFormData({
            name: '',
            email: '',
            company: '',
            phone: '',
            message: '',
          });
          setSelectedServices([]);
          setStep('services');
          setSubmitStatus('idle');
        }, 3000);
      } else {
        throw new Error(data.error || 'Failed to send consultation request');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="booking-page">
      <div className="container mx-auto">
        <div className="booking-header">
          <button onClick={onBack} className="back-button">
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </button>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="booking-title">Book a Consultation</h1>
            <p className="booking-subtitle">
              Select the services you're interested in and tell us about your project
            </p>
          </motion.div>

          <div className="booking-steps">
            <div className={`step ${step === 'services' ? 'active' : 'completed'}`}>
              <div className="step-number">1</div>
              <span>Select Services</span>
            </div>
            <div className="step-divider"></div>
            <div className={`step ${step === 'details' ? 'active' : ''}`}>
              <div className="step-number">2</div>
              <span>Your Details</span>
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {step === 'services' ? (
            <motion.div
              key="services"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="booking-content"
            >
              <div className="services-selection">
                {services.map((service, index) => {
                  const Icon = service.icon;
                  const isSelected = selectedServices.includes(service.id);

                  return (
                    <motion.div
                      key={service.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className={`service-selection-card ${isSelected ? 'selected' : ''}`}
                      onClick={() => toggleService(service.id)}
                    >
                      <div className="service-selection-header">
                        <div className="service-selection-icon" style={{ background: service.color }}>
                          <Icon size={24} color="white" />
                        </div>
                        <div className={`service-checkbox ${isSelected ? 'checked' : ''}`}>
                          {isSelected && <Check size={18} />}
                        </div>
                      </div>

                      <h3 className="service-selection-title">{service.title}</h3>
                      <p className="service-selection-description">{service.description}</p>

                      <ul className="service-selection-features">
                        {service.features.map((feature, i) => (
                          <li key={i}>{feature}</li>
                        ))}
                      </ul>
                    </motion.div>
                  );
                })}
              </div>

              <div className="booking-actions">
                <button
                  className="btn btn-primary"
                  disabled={selectedServices.length === 0}
                  onClick={() => setStep('details')}
                >
                  Continue
                  <ArrowRight size={20} />
                </button>
                {selectedServices.length === 0 && (
                  <p className="booking-hint">Please select at least one service</p>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="details"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="booking-content"
            >
              <div className="booking-form-wrapper">
                <div className="selected-services-summary">
                  <h3>Selected Services</h3>
                  <div className="selected-services-list">
                    {selectedServices.map(serviceId => {
                      const service = services.find(s => s.id === serviceId);
                      if (!service) return null;
                      const Icon = service.icon;
                      return (
                        <div key={serviceId} className="selected-service-chip">
                          <Icon size={16} />
                          <span>{service.title}</span>
                        </div>
                      );
                    })}
                  </div>
                  <button
                    className="btn btn-ghost"
                    onClick={() => setStep('services')}
                  >
                    <ArrowLeft size={16} />
                    Change Selection
                  </button>
                </div>

                <form className="booking-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@company.com"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="company">Company Name</label>
                    <input
                      type="text"
                      id="company"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Your Company"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  <div className="form-group form-group-full">
                    <label htmlFor="message">Tell Us About Your Project *</label>
                    <textarea
                      id="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe your project goals, timeline, and any specific requirements..."
                    />
                  </div>

                  <div className="form-actions">
                    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                      {isSubmitting ? 'Sending...' : 'Submit Consultation Request'}
                      {!isSubmitting && <ArrowRight size={20} />}
                    </button>
                    
                    {submitStatus === 'success' && (
                      <div className="form-message success">
                        ✓ Thank you! We've received your request and will contact you shortly.
                      </div>
                    )}
                    
                    {submitStatus === 'error' && (
                      <div className="form-message error">
                        ✗ Something went wrong. Please try again or email us directly.
                      </div>
                    )}
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style>{`
        .booking-page {
          min-height: 100vh;
          padding: calc(var(--space-5xl) + 60px) 0 var(--space-5xl);
          background: var(--color-background);
        }

        .booking-header {
          text-align: center;
          margin-bottom: var(--space-4xl);
          position: relative;
        }

        .back-button {
          position: absolute;
          left: var(--space-xl);
          top: 0;
          display: inline-flex;
          align-items: center;
          gap: var(--space-xs);
          color: var(--color-text-secondary);
          background: none;
          border: none;
          cursor: pointer;
          padding: var(--space-sm) var(--space-md);
          border-radius: var(--radius-md);
          transition: all var(--transition-base);
          font-size: 0.95rem;
        }

        .back-button:hover {
          color: var(--color-text-primary);
          background: var(--color-surface-elevated);
        }

        .booking-title {
          margin-bottom: var(--space-md);
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .booking-subtitle {
          color: var(--color-text-secondary);
          font-size: 1.125rem;
          max-width: 42rem;
          margin: 0 auto var(--space-3xl);
        }

        .booking-steps {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-md);
          margin-top: var(--space-2xl);
        }

        .step {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-sm);
          opacity: 0.4;
          transition: opacity var(--transition-base);
        }

        .step.active,
        .step.completed {
          opacity: 1;
        }

        .step-number {
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--color-surface-elevated);
          border: 2px solid var(--color-border);
          color: var(--color-text-secondary);
          font-weight: 600;
          transition: all var(--transition-base);
        }

        .step.active .step-number {
          background: var(--gradient-primary);
          border-color: var(--color-primary);
          color: white;
        }

        .step.completed .step-number {
          background: var(--color-accent);
          border-color: var(--color-accent);
          color: white;
        }

        .step span {
          font-size: 0.875rem;
          color: var(--color-text-secondary);
        }

        .step.active span {
          color: var(--color-text-primary);
        }

        .step-divider {
          width: 4rem;
          height: 2px;
          background: var(--color-border);
        }

        .booking-content {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 var(--space-xl);
        }

        .services-selection {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: var(--space-xl);
          margin-bottom: var(--space-3xl);
        }

        .service-selection-card {
          background: var(--color-surface-elevated);
          border: 2px solid var(--color-border);
          border-radius: var(--radius-xl);
          padding: var(--space-xl);
          cursor: pointer;
          transition: all var(--transition-base);
          position: relative;
        }

        .service-selection-card:hover {
          border-color: var(--color-primary-light);
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
        }

        .service-selection-card.selected {
          border-color: var(--color-primary);
          background: rgba(99, 102, 241, 0.05);
          box-shadow: 0 0 0 1px var(--color-primary);
        }

        .service-selection-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: var(--space-lg);
        }

        .service-selection-icon {
          width: 3rem;
          height: 3rem;
          border-radius: var(--radius-lg);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .service-checkbox {
          width: 1.5rem;
          height: 1.5rem;
          border: 2px solid var(--color-border);
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all var(--transition-base);
        }

        .service-checkbox.checked {
          background: var(--color-primary);
          border-color: var(--color-primary);
          color: white;
        }

        .service-selection-title {
          margin-bottom: var(--space-sm);
          color: var(--color-text-primary);
          font-size: 1.25rem;
        }

        .service-selection-description {
          color: var(--color-text-secondary);
          margin-bottom: var(--space-lg);
          font-size: 0.95rem;
        }

        .service-selection-features {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: var(--space-xs);
        }

        .service-selection-features li {
          color: var(--color-text-tertiary);
          font-size: 0.875rem;
          padding-left: var(--space-lg);
          position: relative;
        }

        .service-selection-features li::before {
          content: '✓';
          position: absolute;
          left: 0;
          color: var(--color-accent-bright);
        }

        .booking-actions {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-md);
        }

        .booking-actions .btn {
          gap: var(--space-sm);
        }

        .booking-actions .btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .booking-hint {
          color: var(--color-text-tertiary);
          font-size: 0.875rem;
        }

        .booking-form-wrapper {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: var(--space-3xl);
          max-width: 1200px;
          margin: 0 auto;
        }

        .selected-services-summary {
          background: var(--color-surface-elevated);
          border-radius: var(--radius-xl);
          padding: var(--space-xl);
          height: fit-content;
          position: sticky;
          top: calc(var(--space-xl) + 60px);
        }

        .selected-services-summary h3 {
          margin-bottom: var(--space-lg);
          color: var(--color-text-primary);
        }

        .selected-services-list {
          display: flex;
          flex-direction: column;
          gap: var(--space-sm);
          margin-bottom: var(--space-xl);
        }

        .selected-service-chip {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
          padding: var(--space-sm) var(--space-md);
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          color: var(--color-text-secondary);
          font-size: 0.875rem;
        }

        .booking-form {
          background: var(--color-surface-elevated);
          border-radius: var(--radius-xl);
          padding: var(--space-2xl);
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--space-xl);
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: var(--space-sm);
        }

        .form-group-full {
          grid-column: 1 / -1;
        }

        .form-group label {
          color: var(--color-text-primary);
          font-weight: 600;
          font-size: 0.95rem;
        }

        .form-group input,
        .form-group textarea {
          padding: var(--space-md);
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          color: var(--color-text-primary);
          font-family: var(--font-sans);
          font-size: 1rem;
          transition: all var(--transition-base);
        }

        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: var(--color-primary);
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
        }

        .form-group textarea {
          resize: vertical;
          min-height: 120px;
        }

        .form-actions {
          grid-column: 1 / -1;
          display: flex;
          justify-content: center;
          padding-top: var(--space-lg);
        }

        .form-actions .btn {
          gap: var(--space-sm);
        }

        @media (max-width: 1024px) {
          .booking-form-wrapper {
            grid-template-columns: 1fr;
          }

          .selected-services-summary {
            position: static;
          }
        }

        .form-message {
          width: 100%;
          padding: var(--space-md);
          border-radius: var(--radius-md);
          text-align: center;
          font-weight: 600;
          margin-top: var(--space-md);
        }

        .form-message.success {
          background: rgba(34, 211, 238, 0.1);
          border: 1px solid var(--color-accent-bright);
          color: var(--color-accent-bright);
        }

        .form-message.error {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid #ef4444;
          color: #ef4444;
        }

        @media (max-width: 768px) {
          .booking-page {
            padding: calc(var(--space-3xl) + 60px) 0 var(--space-3xl);
          }

          .back-button {
            position: static;
            margin-bottom: var(--space-lg);
          }

          .booking-header {
            text-align: left;
          }

          .booking-steps {
            flex-wrap: wrap;
          }

          .services-selection {
            grid-template-columns: 1fr;
          }

          .booking-form {
            grid-template-columns: 1fr;
            padding: var(--space-xl);
          }
        }
      `}</style>
    </section>
  );
}
