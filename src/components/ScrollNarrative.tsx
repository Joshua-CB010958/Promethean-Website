import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { Brain, Sparkles, Rocket, Target } from 'lucide-react';

const scenes = [
  {
    icon: Brain,
    title: 'Intelligent Solutions',
    description: 'We leverage cutting-edge AI and machine learning to create systems that think, learn, and adapt to your business needs.',
    stat: '10x',
    statLabel: 'Efficiency Gain',
  },
  {
    icon: Sparkles,
    title: 'Innovation First',
    description: 'Every project is an opportunity to push boundaries and implement the latest technologies that give you a competitive edge.',
    stat: '95%',
    statLabel: 'Innovation Rate',
  },
  {
    icon: Rocket,
    title: 'Rapid Deployment',
    description: 'Our agile methodology and automation-first approach means faster time-to-market without sacrificing quality.',
    stat: '3-8 weeks',
    statLabel: 'Average Launch',
  },
  {
    icon: Target,
    title: 'Results Driven',
    description: 'We measure success by your success. Every solution is designed to deliver measurable ROI and business impact.',
    stat: '250%',
    statLabel: 'Avg. ROI',
  },
];

export function ScrollNarrative() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const scrollYProgressSpring = useSpring(scrollYProgress, springConfig);

  return (
    <section ref={containerRef} className="scroll-narrative">
      <div className="narrative-sticky-wrapper">
        {scenes.map((scene, index) => {
          const start = index / scenes.length;
          const end = (index + 1) / scenes.length;
          
          const opacity = useTransform(
            scrollYProgressSpring,
            [start - 0.1, start, end - 0.2, end],
            [0, 1, 1, 0]
          );
          
          const scale = useTransform(
            scrollYProgressSpring,
            [start - 0.1, start, end - 0.2, end],
            [0.8, 1, 1, 0.8]
          );
          
          const y = useTransform(
            scrollYProgressSpring,
            [start - 0.1, start, end - 0.2, end],
            [100, 0, 0, -100]
          );

          const Icon = scene.icon;

          return (
            <motion.div
              key={index}
              className="narrative-scene"
              style={{ opacity, scale, y }}
            >
              <div className="container mx-auto">
                <div className="scene-content">
                  <motion.div 
                    className="scene-icon-wrapper"
                    animate={{ 
                      rotate: [0, 360],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                      scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                    }}
                  >
                    <Icon size={64} color="white" />
                  </motion.div>
                  
                  <h2 className="scene-title">{scene.title}</h2>
                  <p className="scene-description">{scene.description}</p>
                  
                  <div className="scene-stat">
                    <motion.div 
                      className="stat-value"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                    >
                      {scene.stat}
                    </motion.div>
                    <div className="stat-label">{scene.statLabel}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Progress Indicator */}
      <motion.div 
        className="progress-indicator"
        style={{ scaleY: scrollYProgressSpring }}
      />

      <style>{`
        .scroll-narrative {
          position: relative;
          height: 400vh;
          background: var(--color-background);
        }

        .narrative-sticky-wrapper {
          position: sticky;
          top: 0;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .narrative-scene {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: var(--space-xl);
        }

        .scene-content {
          max-width: 48rem;
          text-align: center;
          padding: var(--space-3xl);
          background: var(--glass-background);
          backdrop-filter: var(--glass-blur);
          -webkit-backdrop-filter: var(--glass-blur);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-2xl);
          box-shadow: var(--shadow-xl);
        }

        .scene-icon-wrapper {
          width: 8rem;
          height: 8rem;
          margin: 0 auto var(--space-2xl);
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--gradient-primary);
          border-radius: var(--radius-2xl);
          box-shadow: var(--shadow-glow);
        }

        .scene-title {
          color: var(--color-text-primary);
          margin-bottom: var(--space-lg);
        }

        .scene-description {
          color: var(--color-text-secondary);
          font-size: 1.25rem;
          margin-bottom: var(--space-2xl);
          line-height: 1.8;
        }

        .scene-stat {
          padding-top: var(--space-xl);
          border-top: 1px solid var(--color-border);
        }

        .stat-value {
          font-size: 4rem;
          font-weight: 700;
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1;
          margin-bottom: var(--space-md);
        }

        .stat-label {
          color: var(--color-text-tertiary);
          font-size: 1rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .progress-indicator {
          position: fixed;
          top: 0;
          right: 0;
          width: 4px;
          height: 100vh;
          background: var(--gradient-primary);
          transform-origin: top;
          z-index: 100;
        }

        @media (max-width: 768px) {
          .scroll-narrative {
            height: 300vh;
          }

          .scene-content {
            padding: var(--space-2xl) var(--space-lg);
          }

          .scene-icon-wrapper {
            width: 6rem;
            height: 6rem;
          }

          .scene-icon-wrapper :global(svg) {
            width: 48px;
            height: 48px;
          }

          .stat-value {
            font-size: 3rem;
          }

          .scene-description {
            font-size: 1rem;
          }
        }
      `}</style>
    </section>
  );
}
