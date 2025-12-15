import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'CEO, TechVenture Inc.',
    company: 'TechVenture',
    rating: 5,
    text: 'Promethean AI transformed our outdated systems into a modern, AI-powered platform. The automation alone saved us 200+ hours monthly. Their expertise is unmatched.',
  },
  {
    name: 'Michael Rodriguez',
    role: 'CTO, HealthCare Plus',
    company: 'HealthCare Plus',
    rating: 5,
    text: 'The telemedicine platform they built exceeded all expectations. Scalable, secure, and beautifully designed. Our patient engagement increased by 300%.',
  },
  {
    name: 'Emily Watson',
    role: 'Founder, RetailEdge',
    company: 'RetailEdge',
    rating: 5,
    text: 'From concept to launch in 8 weeks! The mobile app they developed is intuitive and powerful. The AI recommendations feature has been a game-changer for our customers.',
  },
  {
    name: 'David Kim',
    role: 'VP of Operations, LogiCorp',
    company: 'LogiCorp',
    rating: 5,
    text: 'Their automation solutions streamlined our entire supply chain. Real-time tracking and predictive analytics have reduced our operational costs by 35%.',
  },
  {
    name: 'Jessica Martinez',
    role: 'Director of IT, EduGlobal',
    company: 'EduGlobal',
    rating: 5,
    text: 'Outstanding technical expertise and communication. They delivered a custom LMS that handles 50K+ concurrent users flawlessly. Support has been exceptional.',
  },
  {
    name: 'Robert Taylor',
    role: 'Managing Partner, FinServe',
    company: 'FinServe',
    rating: 5,
    text: 'The AI integration into our financial platform was seamless. Predictive analytics and fraud detection have significantly improved our service quality and security.',
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="section">
      <div className="container mx-auto">
        <div className="section-title">
          <h2>What Our Clients Say</h2>
          <p className="section-subtitle">
            Don't just take our word for it. Here's what industry leaders say about 
            working with Promethean AI.
          </p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card card glow-effect">
              <div className="quote-icon">
                <Quote size={40} />
              </div>
              
              <div className="testimonial-rating">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              
              <p className="testimonial-text">{testimonial.text}</p>
              
              <div className="testimonial-author">
                <div className="author-avatar">
                  {testimonial.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="author-info">
                  <div className="author-name">{testimonial.name}</div>
                  <div className="author-role">{testimonial.role}</div>
                  <div className="author-company">{testimonial.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: var(--space-xl);
          padding: 0 var(--space-xl);
        }

        .testimonial-card {
          display: flex;
          flex-direction: column;
          position: relative;
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
