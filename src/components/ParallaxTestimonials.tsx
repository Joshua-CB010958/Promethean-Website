import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'CEO, TechVenture Inc.',
    company: 'TechVenture',
    rating: 5,
    text: 'Promethean AI transformed our outdated systems into a modern, AI-powered platform. The automation alone saved us 200+ hours monthly. Their expertise is unmatched.',
    avatar: 'SC',
  },
  {
    name: 'Michael Rodriguez',
    role: 'CTO, HealthCare Plus',
    company: 'HealthCare Plus',
    rating: 5,
    text: 'The telemedicine platform they built exceeded all expectations. Scalable, secure, and beautifully designed. Our patient engagement increased by 300%.',
    avatar: 'MR',
  },
  {
    name: 'Emily Watson',
    role: 'Founder, RetailEdge',
    company: 'RetailEdge',
    rating: 5,
    text: 'From concept to launch in 8 weeks! The mobile app they developed is intuitive and powerful. The AI recommendations feature has been a game-changer for our customers.',
    avatar: 'EW',
  },
  {
    name: 'David Kim',
    role: 'VP of Operations, LogiCorp',
    company: 'LogiCorp',
    rating: 5,
    text: 'Their automation solutions streamlined our entire supply chain. Real-time tracking and predictive analytics have reduced our operational costs by 35%.',
    avatar: 'DK',
  },
  {
    name: 'Jessica Martinez',
    role: 'Director of IT, EduGlobal',
    company: 'EduGlobal',
    rating: 5,
    text: 'Outstanding technical expertise and communication. They delivered a custom LMS that handles 50K+ concurrent users flawlessly. Support has been exceptional.',
    avatar: 'JM',
  },
  {
    name: 'Robert Taylor',
    role: 'Managing Partner, FinServe',
    company: 'FinServe',
    rating: 5,
    text: 'The AI integration into our financial platform was seamless. Predictive analytics and fraud detection have significantly improved our service quality and security.',
    avatar: 'RT',
  },
];

function TestimonialCard({ testimonial, index }: { testimonial: typeof testimonials[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8]);
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [-5, 0, 5]);

  const ySpring = useSpring(y, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      ref={cardRef}
      className="testimonial-wrapper"
      style={{
        y: ySpring,
        opacity,
        scale,
        rotate,
      }}
    >
      <motion.div 
        className="testimonial-card card glow-effect"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.6, delay: index * 0.1, type: "spring" }}
        whileHover={{ 
          scale: 1.05, 
          rotateY: 5,
          transition: { type: "spring", stiffness: 300 }
        }}
      >
        <motion.div 
          className="quote-icon"
          animate={{ 
            rotate: [0, 10, 0, -10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <Quote size={40} />
        </motion.div>
        
        <div className="testimonial-rating">
          {[...Array(testimonial.rating)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.1, type: "spring" }}
            >
              <Star size={16} fill="currentColor" />
            </motion.div>
          ))}
        </div>
        
        <p className="testimonial-text">{testimonial.text}</p>
        
        <div className="testimonial-author">
          <motion.div 
            className="author-avatar"
            whileHover={{ scale: 1.2, rotate: 360 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {testimonial.avatar}
          </motion.div>
          <div className="author-info">
            <div className="author-name">{testimonial.name}</div>
            <div className="author-role">{testimonial.role}</div>
            <div className="author-company">{testimonial.company}</div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function ParallaxTestimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const backgroundYSpring = useSpring(backgroundY, { stiffness: 100, damping: 30 });

  return (
    <section id="testimonials" ref={containerRef} className="section testimonials-section">
      <motion.div 
        className="testimonials-background"
        style={{ y: backgroundYSpring }}
      />

      <div className="container mx-auto">
        <motion.div 
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <h2>What Our Clients Say</h2>
          <p className="section-subtitle">
            Don't just take our word for it. Here's what industry leaders say about 
            working with Promethean AI.
          </p>
        </motion.div>

        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} index={index} />
          ))}
        </div>
      </div>

      <style>{`
        .testimonials-section {
          position: relative;
          overflow: hidden;
        }

        .testimonials-background {
          position: absolute;
          top: -10%;
          left: 50%;
          transform: translateX(-50%);
          width: 120%;
          height: 120%;
          background: radial-gradient(ellipse at center, rgba(99, 102, 241, 0.1) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: var(--space-xl);
          padding: 0 var(--space-xl);
          position: relative;
          z-index: 1;
          justify-items: center;
          max-width: 1400px;
          margin: 0 auto;
        }

        .testimonial-wrapper {
          perspective: 1000px;
          width: 100%;
          max-width: 400px;
        }

        .testimonial-card {
          display: flex;
          flex-direction: column;
          position: relative;
          transform-style: preserve-3d;
        }

        .quote-icon {
          position: absolute;
          top: var(--space-lg);
          right: var(--space-lg);
          color: var(--color-primary);
          opacity: 0.1;
        }

        .testimonial-rating {
          display: flex;
          gap: var(--space-xs);
          color: #fbbf24;
          margin-bottom: var(--space-lg);
        }

        .testimonial-text {
          color: var(--color-text-secondary);
          margin-bottom: var(--space-xl);
          flex-grow: 1;
          font-size: 1rem;
          line-height: 1.7;
        }

        .testimonial-author {
          display: flex;
          gap: var(--space-md);
          align-items: center;
          padding-top: var(--space-lg);
          border-top: 1px solid var(--color-border);
        }

        .author-avatar {
          width: 3rem;
          height: 3rem;
          border-radius: var(--radius-full);
          background: var(--gradient-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 700;
          flex-shrink: 0;
          cursor: pointer;
        }

        .author-info {
          flex-grow: 1;
        }

        .author-name {
          color: var(--color-text-primary);
          font-weight: 600;
          margin-bottom: 0.125rem;
        }

        .author-role {
          color: var(--color-text-secondary);
          font-size: 0.875rem;
          margin-bottom: 0.125rem;
        }

        .author-company {
          color: var(--color-text-tertiary);
          font-size: 0.75rem;
        }

        @media (max-width: 768px) {
          .testimonials-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
