import { useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Smartphone, Globe, Code2, Cpu, Zap, Workflow } from 'lucide-react';

const services = [
  {
    icon: Globe,
    title: 'Website Development',
    description: 'Professional websites from static pages to advanced custom designs with SEO and animations.',
    features: ['From £399', 'Responsive Design', 'CMS Integration', 'SEO Optimized'],
    color: '#6366f1',
    pricing: 'Starting at £399'
  },
  {
    icon: Cpu,
    title: 'Software Solutions',
    description: 'Custom software from simple web apps to enterprise-grade systems with scalable infrastructure.',
    features: ['From £1,499', 'API Integrations', 'Admin Dashboard', 'Custom Architecture'],
    color: '#8b5cf6',
    pricing: 'Starting at £1,499'
  },
  {
    icon: Code2,
    title: 'CRM Development',
    description: 'Tailored CRM systems to manage leads, contacts, and deals with advanced workflows and reporting.',
    features: ['From £3,500', 'Deal Pipeline', 'Custom Workflows', 'Advanced Reporting'],
    color: '#06b6d4',
    pricing: 'Starting at £3,500'
  },
  {
    icon: Smartphone,
    title: 'Mobile App Creation',
    description: 'Native and cross-platform mobile applications with backend integration and admin panels.',
    features: ['From £2,999', 'iOS & Android', 'Cross-platform', 'Backend Included'],
    color: '#22d3ee',
    pricing: 'Starting at £2,999'
  },
  {
    icon: Zap,
    title: 'AI Automations',
    description: 'Intelligent AI-powered automation solutions from single tasks to custom autonomous workflows.',
    features: ['From £299', 'Custom AI Models', 'Autonomous Agents', 'Multi-step Logic'],
    color: '#818cf8',
    pricing: 'Starting at £299'
  },
  {
    icon: Workflow,
    title: 'Workflow Automations',
    description: 'Streamline operations with intelligent workflow automation using Zapier, Make, and custom logic.',
    features: ['From £199', 'Multi-app Integration', 'Custom Logic', 'Process Monitoring'],
    color: '#4f46e5',
    pricing: 'Starting at £199'
  },
];

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: false, amount: 0.3 });
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useSpring(useTransform(y, [-100, 100], [5, -5]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-5, 5]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Icon = service.icon;

  return (
    <motion.div
      ref={cardRef}
      className="service-card-wrapper"
      initial={{ opacity: 0, y: 50, rotateX: -10 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 50, rotateX: -10 }}
      transition={{ 
        duration: 0.7, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
        damping: 20
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ scale: 1.02, z: 50 }}
    >
      <motion.div 
        className="service-card card glow-effect"
        style={{
          boxShadow: useTransform(
            [x, y],
            ([latestX, latestY]) => 
              `${(latestX as number) * 0.02}px ${(latestY as number) * 0.02}px 40px rgba(99, 102, 241, 0.3)`
          ),
        }}
      >
        <motion.div 
          className="service-icon-wrapper icon-wrapper"
          animate={{ 
            rotate: isInView ? [0, 360] : 0,
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          whileHover={{ scale: 1.2, rotate: 0 }}
        >
          <Icon size={28} color="white" />
        </motion.div>
        
        <h3 className="service-title">{service.title}</h3>
        <p className="service-description">{service.description}</p>
        
        <ul className="service-features">
          {service.features.map((feature, i) => (
            <motion.li 
              key={i} 
              className="service-feature"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.4, delay: index * 0.1 + i * 0.05 }}
            >
              {feature}
            </motion.li>
          ))}
        </ul>
        
        <motion.a 
          href="#contact" 
          className="service-link"
          whileHover={{ x: 10 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          Learn More
          <motion.span 
            className="service-link-arrow"
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            →
          </motion.span>
        </motion.a>
      </motion.div>
    </motion.div>
  );
}

export function ServicesPhysics() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

  return (
    <section id="services" ref={sectionRef} className="section">
      <div className="container mx-auto">
        <motion.div 
          className="services-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          <div className="section-title">
            <h2>Comprehensive Technology Solutions</h2>
            <p className="section-subtitle">
              From concept to deployment, we deliver end-to-end solutions that drive innovation 
              and transform how you do business.
            </p>
          </div>
        </motion.div>

        <div className="services-grid">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>

      <style>{`
        .services-header {
          margin-bottom: var(--space-4xl);
          padding: 0 var(--space-xl);
          text-align: center;
          max-width: 1200px;
          margin-left: auto;
          margin-right: auto;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: var(--space-xl);
          padding: 0 var(--space-xl);
          perspective: 1000px;
          justify-items: center;
          max-width: 1400px;
          margin: 0 auto;
        }

        .service-card-wrapper {
          transform-style: preserve-3d;
          width: 100%;
          max-width: 400px;
        }

        .service-card {
          display: flex;
          flex-direction: column;
          transform-style: preserve-3d;
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
        }

        .service-link-arrow {
          display: inline-block;
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
