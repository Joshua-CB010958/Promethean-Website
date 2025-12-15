import { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, PanInfo } from 'motion/react';
import { ExternalLink, X } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'FinanceTrack Pro',
    category: 'mobile',
    description: 'AI-powered personal finance management app with predictive analytics and smart budgeting',
    longDescription: 'A comprehensive financial management platform that uses machine learning to predict spending patterns, automate savings, and provide personalized investment recommendations. Built with React Native and TensorFlow.',
    tech: ['React Native', 'TensorFlow', 'Node.js', 'MongoDB'],
    metrics: { users: '50K+', rating: '4.8/5', growth: '+230%' },
    color: '#6366f1',
  },
  {
    id: 2,
    title: 'MediConnect Platform',
    category: 'web',
    description: 'Telemedicine platform connecting patients with healthcare providers in real-time',
    longDescription: 'Enterprise healthcare solution featuring HD video consultations, AI-powered symptom analysis, electronic health records, and prescription management. HIPAA compliant with end-to-end encryption.',
    tech: ['Next.js', 'WebRTC', 'AWS', 'PostgreSQL'],
    metrics: { consultations: '100K+', uptime: '99.9%', doctors: '2500+' },
    color: '#8b5cf6',
  },
  {
    id: 3,
    title: 'RetailOS',
    category: 'software',
    description: 'Enterprise retail management system with inventory automation and analytics',
    longDescription: 'Full-stack retail operations platform with real-time inventory tracking, automated reordering, sales analytics, and multi-location management. Scalable microservices architecture.',
    tech: ['React', 'PostgreSQL', 'Microservices', 'Redis'],
    metrics: { stores: '500+', transactions: '1M+/day', efficiency: '+45%' },
    color: '#06b6d4',
  },
  {
    id: 4,
    title: 'SmartHome Hub',
    category: 'ai',
    description: 'Voice-controlled smart home automation with ML-powered routines and predictions',
    longDescription: 'Intelligent IoT platform that learns from user behavior to automate home systems. Features voice control, energy optimization, security monitoring, and predictive automation.',
    tech: ['IoT', 'Machine Learning', 'Python', 'MQTT'],
    metrics: { devices: '50+ types', accuracy: '94%', savings: '30% energy' },
    color: '#22d3ee',
  },
  {
    id: 5,
    title: 'EduLearn LMS',
    category: 'web',
    description: 'Learning management system with adaptive content delivery and progress tracking',
    longDescription: 'AI-enhanced learning platform that adapts to individual student pace and learning style. Includes video lectures, interactive quizzes, peer collaboration, and advanced analytics.',
    tech: ['React', 'GraphQL', 'MongoDB', 'Socket.io'],
    metrics: { students: '100K+', completion: '85%', satisfaction: '4.7/5' },
    color: '#818cf8',
  },
  {
    id: 6,
    title: 'LogiFlow',
    category: 'automation',
    description: 'Supply chain automation platform with real-time tracking and optimization',
    longDescription: 'End-to-end logistics solution with route optimization, real-time tracking, automated workflows, and predictive analytics for inventory and delivery management.',
    tech: ['Workflow Engine', 'APIs', 'Cloud', 'ML'],
    metrics: { routes: '10K+/day', cost: '-35%', accuracy: '99.2%' },
    color: '#4f46e5',
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

function ProjectModal({ project, onClose }: { project: typeof projects[0] | null; onClose: () => void }) {
  if (!project) return null;

  return (
    <motion.div
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="modal-content"
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 50 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="modal-header" style={{ background: `linear-gradient(135deg, ${project.color} 0%, rgba(99, 102, 241, 0.8) 100%)` }}>
          <h2 className="modal-title">{project.title}</h2>
          <p className="modal-category">{project.category}</p>
        </div>

        <div className="modal-body">
          <p className="modal-description">{project.longDescription}</p>

          <div className="modal-tech">
            <h4>Technologies Used</h4>
            <div className="tech-tags">
              {project.tech.map((tech, i) => (
                <motion.span
                  key={i}
                  className="tech-tag"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>

          <div className="modal-metrics">
            {Object.entries(project.metrics).map(([key, value], i) => (
              <motion.div
                key={key}
                className="metric-item"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
              >
                <div className="metric-value">{value}</div>
                <div className="metric-label">{key}</div>
              </motion.div>
            ))}
          </div>
        </div>

        <style>{`
          .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(10px);
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: var(--space-xl);
          }

          .modal-content {
            background: var(--color-surface-elevated);
            border-radius: var(--radius-2xl);
            max-width: 50rem;
            width: 100%;
            max-height: 90vh;
            overflow-y: auto;
            position: relative;
            border: 1px solid var(--color-border);
            box-shadow: var(--shadow-xl);
          }

          .modal-close {
            position: absolute;
            top: var(--space-lg);
            right: var(--space-lg);
            width: 2.5rem;
            height: 2.5rem;
            border-radius: var(--radius-md);
            background: rgba(0, 0, 0, 0.5);
            border: none;
            color: white;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10;
            transition: all var(--transition-base);
          }

          .modal-close:hover {
            background: rgba(0, 0, 0, 0.8);
            transform: rotate(90deg);
          }

          .modal-header {
            padding: var(--space-3xl) var(--space-xl);
            color: white;
          }

          .modal-title {
            color: white;
            margin-bottom: var(--space-sm);
          }

          .modal-category {
            color: rgba(255, 255, 255, 0.8);
            text-transform: capitalize;
          }

          .modal-body {
            padding: var(--space-2xl);
          }

          .modal-description {
            color: var(--color-text-secondary);
            margin-bottom: var(--space-2xl);
            line-height: 1.8;
            font-size: 1.125rem;
          }

          .modal-tech {
            margin-bottom: var(--space-2xl);
          }

          .modal-tech h4 {
            color: var(--color-text-primary);
            margin-bottom: var(--space-md);
          }

          .tech-tags {
            display: flex;
            flex-wrap: wrap;
            gap: var(--space-sm);
          }

          .tech-tag {
            padding: var(--space-sm) var(--space-lg);
            background: rgba(99, 102, 241, 0.1);
            border: 1px solid rgba(99, 102, 241, 0.3);
            border-radius: var(--radius-full);
            color: var(--color-primary-light);
            font-size: 0.875rem;
            font-weight: 500;
          }

          .modal-metrics {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: var(--space-lg);
            padding: var(--space-xl);
            background: var(--color-surface);
            border-radius: var(--radius-lg);
          }

          .metric-item {
            text-align: center;
          }

          .metric-value {
            font-size: 1.75rem;
            font-weight: 700;
            color: var(--color-accent-bright);
            margin-bottom: var(--space-xs);
          }

          .metric-label {
            color: var(--color-text-tertiary);
            font-size: 0.875rem;
            text-transform: capitalize;
          }
        `}</style>
      </motion.div>
    </motion.div>
  );
}

export function InteractivePortfolio() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const constraintsRef = useRef(null);

  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <section id="portfolio" className="section">
      <div className="container mx-auto">
        <motion.div 
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <h2>Our Portfolio</h2>
          <p className="section-subtitle">
            Explore our recent projects spanning mobile, web, AI, and automation solutions 
            delivered for clients across industries.
          </p>
        </motion.div>

        <div className="portfolio-filters">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`filter-button ${activeCategory === category.id ? 'active' : ''}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              {category.label}
            </motion.button>
          ))}
        </div>

        <motion.div 
          ref={constraintsRef}
          className="portfolio-grid"
          layout
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={index}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </motion.div>
      </div>

      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}

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
          justify-items: center;
          max-width: 1400px;
          margin: 0 auto;
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

function ProjectCard({ project, index, onClick }: { project: typeof projects[0]; index: number; onClick: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-100, 100], [10, -10]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-10, 10]), { stiffness: 300, damping: 30 });

  const handleDrag = (_: any, info: PanInfo) => {
    x.set(info.offset.x);
    y.set(info.offset.y);
  };

  const handleDragEnd = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className="portfolio-card-wrapper"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.1, type: "spring" }}
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.1}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ scale: 1.05, z: 50 }}
      onClick={onClick}
    >
      <div className="portfolio-card card glow-effect">
        <div className="portfolio-image" style={{ background: `linear-gradient(135deg, ${project.color} 0%, rgba(99, 102, 241, 0.6) 100%)` }}>
          <div className="image-overlay">
            <motion.div
              whileHover={{ scale: 1.2, rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <ExternalLink size={32} color="white" />
            </motion.div>
          </div>
        </div>
        
        <div className="portfolio-content">
          <h3 className="portfolio-title">{project.title}</h3>
          <p className="portfolio-description">{project.description}</p>
          
          <div className="portfolio-tech">
            {project.tech.slice(0, 3).map((tech, i) => (
              <span key={i} className="tech-tag">{tech}</span>
            ))}
          </div>
          
          <motion.div 
            className="portfolio-link"
            whileHover={{ x: 5 }}
          >
            View Details
            <ExternalLink size={16} />
          </motion.div>
        </div>
      </div>

      <style>{`
        .portfolio-card-wrapper {
          cursor: grab;
          transform-style: preserve-3d;
          width: 100%;
          max-width: 400px;
        }

        .portfolio-card-wrapper:active {
          cursor: grabbing;
        }

        .portfolio-card {
          display: flex;
          flex-direction: column;
          overflow: hidden;
          padding: 0;
          transform-style: preserve-3d;
        }

        .portfolio-image {
          width: 100%;
          height: 240px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .image-overlay {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.2);
          transition: background var(--transition-base);
        }

        .portfolio-card:hover .image-overlay {
          background: rgba(0, 0, 0, 0.4);
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
        }
      `}</style>
    </motion.div>
  );
}
