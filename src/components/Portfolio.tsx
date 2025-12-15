import { useState } from 'react';
import { ExternalLink } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'FinanceTrack Pro',
    category: 'mobile',
    description: 'AI-powered personal finance management app with predictive analytics',
    image: 'finance mobile app',
    tech: ['React Native', 'TensorFlow', 'Node.js'],
  },
  {
    id: 2,
    title: 'MediConnect Platform',
    category: 'web',
    description: 'Telemedicine platform connecting patients with healthcare providers',
    image: 'medical platform',
    tech: ['Next.js', 'WebRTC', 'AWS'],
  },
  {
    id: 3,
    title: 'RetailOS',
    category: 'software',
    description: 'Enterprise retail management system with inventory automation',
    image: 'retail software',
    tech: ['React', 'PostgreSQL', 'Microservices'],
  },
  {
    id: 4,
    title: 'SmartHome Hub',
    category: 'ai',
    description: 'Voice-controlled smart home automation with ML-powered routines',
    image: 'smart home',
    tech: ['IoT', 'Machine Learning', 'Python'],
  },
  {
    id: 5,
    title: 'EduLearn LMS',
    category: 'web',
    description: 'Learning management system with adaptive content delivery',
    image: 'education platform',
    tech: ['React', 'GraphQL', 'MongoDB'],
  },
  {
    id: 6,
    title: 'LogiFlow',
    category: 'automation',
    description: 'Supply chain automation platform with real-time tracking',
    image: 'logistics automation',
    tech: ['Workflow Engine', 'APIs', 'Cloud'],
  },
];

const categories = [
  { id: 'all', label: 'All Projects' },
  { id: 'mobile', label: 'Mobile Apps' },
  { id: 'web', label: 'Web Development' },
  { id: 'software', label: 'Software Solutions' },
  { id: 'ai', label: 'AI Integration' },
  { id: 'automation', label: 'Automation' },
];

export function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [loadedImages, setLoadedImages] = useState<{ [key: number]: string }>({});

  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <section id="portfolio" className="section">
      <div className="container mx-auto">
        <div className="section-title">
          <h2>Our Portfolio</h2>
          <p className="section-subtitle">
            Explore our recent projects spanning mobile, web, AI, and automation solutions 
            delivered for clients across industries.
          </p>
        </div>

        <div className="portfolio-filters">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`filter-button ${activeCategory === category.id ? 'active' : ''}`}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="portfolio-grid">
          {filteredProjects.map((project) => (
            <div key={project.id} className="portfolio-card card glow-effect">
              <div className="portfolio-image">
                <div className="image-placeholder">
                  <span className="placeholder-text">{project.title}</span>
                </div>
              </div>
              
              <div className="portfolio-content">
                <h3 className="portfolio-title">{project.title}</h3>
                <p className="portfolio-description">{project.description}</p>
                
                <div className="portfolio-tech">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="tech-tag">{tech}</span>
                  ))}
                </div>
                
                <a href="#contact" className="portfolio-link">
                  View Case Study
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .portfolio-filters {
          display: flex;
          justify-content: center;
          gap: var(--space-md);
          margin-bottom: var(--space-3xl);
          flex-wrap: wrap;
          padding: 0 var(--space-xl);
        }

        .filter-button {
          padding: var(--space-sm) var(--space-lg);
          background: var(--color-surface-elevated);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-full);
          color: var(--color-text-secondary);
          cursor: pointer;
          transition: all var(--transition-base);
          font-family: var(--font-sans);
          font-size: 0.9rem;
          font-weight: 500;
        }

        .filter-button:hover {
          border-color: var(--color-primary);
          color: var(--color-text-primary);
          background: rgba(99, 102, 241, 0.1);
        }

        .filter-button.active {
          background: var(--gradient-primary);
          color: white;
          border-color: transparent;
          box-shadow: var(--shadow-glow);
        }

        .portfolio-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: var(--space-xl);
          padding: 0 var(--space-xl);
        }

        .portfolio-card {
          display: flex;
          flex-direction: column;
          overflow: hidden;
          padding: 0;
        }

        .portfolio-image {
          width: 100%;
          height: 240px;
          overflow: hidden;
          position: relative;
        }

        .image-placeholder {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, var(--color-surface) 0%, var(--color-surface-elevated) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          border-bottom: 1px solid var(--color-border);
        }

        .placeholder-text {
          color: var(--color-text-tertiary);
          font-weight: 600;
        }

        .portfolio-content {
          padding: var(--space-xl);
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }

        .portfolio-title {
          color: var(--color-text-primary);
          margin-bottom: var(--space-sm);
        }

        .portfolio-description {
          color: var(--color-text-secondary);
          margin-bottom: var(--space-lg);
          flex-grow: 1;
          font-size: 1rem;
        }

        .portfolio-tech {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-xs);
          margin-bottom: var(--space-lg);
        }

        .tech-tag {
          padding: var(--space-xs) var(--space-sm);
          background: rgba(99, 102, 241, 0.1);
          border: 1px solid rgba(99, 102, 241, 0.2);
          border-radius: var(--radius-sm);
          color: var(--color-primary-light);
          font-size: 0.75rem;
          font-weight: 500;
        }

        .portfolio-link {
          display: inline-flex;
          align-items: center;
          gap: var(--space-xs);
          color: var(--color-primary-light);
          font-weight: 600;
          transition: gap var(--transition-base);
        }

        .portfolio-link:hover {
          gap: var(--space-sm);
        }

        @media (max-width: 768px) {
          .portfolio-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
