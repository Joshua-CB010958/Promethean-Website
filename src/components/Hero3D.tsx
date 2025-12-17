import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';

function AnimatedSphere() {
  const meshRef = useRef<any>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.3) * 0.2;
      meshRef.current.rotation.y += 0.003;
    }
  });

  return (
    <group>
      <mesh ref={meshRef} scale={2.5}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial 
          color="#6366f1"
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
      
      <mesh scale={2.8}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="#8b5cf6" wireframe opacity={0.1} transparent />
      </mesh>
    </group>
  );
}

function Particles() {
  const particlesRef = useRef<any>(null);
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 1000; i++) {
      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 20;
      const z = (Math.random() - 0.5) * 20;
      temp.push(x, y, z);
    }
    return new Float32Array(temp);
  }, []);

  useFrame(({ clock }) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#06b6d4" transparent opacity={0.6} />
    </points>
  );
}

export function Hero3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const ySpring = useSpring(y, springConfig);

  return (
    <section ref={containerRef} className="hero-3d-section">
      <div className="hero-3d-canvas">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -5]} intensity={0.5} color="#8b5cf6" />
          <AnimatedSphere />
          <Particles />
        </Canvas>
      </div>

      <motion.div 
        className="hero-3d-content"
        style={{ y: ySpring, opacity, scale }}
      >
        <div className="container mx-auto">
          <div className="hero-content-wrapper">
            <motion.div 
              className="hero-badge"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Sparkles size={16} />
              <span>Next-Generation Business Solutions</span>
            </motion.div>
            
            <motion.h1 
              className="hero-title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, type: "spring", stiffness: 100 }}
            >
              AI-Powered Software, Web & Automation Solutions for Modern Businesses
            </motion.h1>
            
            <motion.p 
              className="hero-subtitle"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Transform your business with cutting-edge mobile apps, custom web development, 
              intelligent software solutions, and enterprise-grade AI integration. We build 
              scalable systems that automate workflows and accelerate growth.
            </motion.p>
            
            <motion.div 
              className="hero-actions"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <motion.a 
                href="#booking" 
                className="btn btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Book a Consultation
                <ArrowRight size={20} />
              </motion.a>
              <motion.a 
                href="#portfolio" 
                className="btn btn-secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                See Our Work
              </motion.a>
            </motion.div>

            <motion.div 
              className="hero-stats"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
            >
              {[
                { value: "500+", label: "Projects Delivered" },
                { value: "98%", label: "Client Satisfaction" },
                { value: "24/7", label: "Support Available" }
              ].map((stat, index) => (
                <motion.div 
                  key={index}
                  className="hero-stat"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.2 + index * 0.1, type: "spring" }}
                  whileHover={{ y: -5, transition: { type: "spring", stiffness: 300 } }}
                >
                  <div className="hero-stat-value">{stat.value}</div>
                  <div className="hero-stat-label">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>

      <style>{`
        .hero-3d-section {
          min-height: 100vh;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          max-width: 100vw;
          box-sizing: border-box;
        }

        .hero-3d-canvas {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          background: radial-gradient(ellipse at center, rgba(99, 102, 241, 0.1) 0%, var(--color-background) 70%);
        }

        .hero-3d-content {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 100vw;
          padding: var(--space-5xl) 0;
          box-sizing: border-box;
          overflow-x: hidden;
        }

        .hero-content-wrapper {
          max-width: 56rem;
          width: 100%;
          margin: 0 auto;
          text-align: center;
          padding: 0 var(--space-md);
          box-sizing: border-box;
          overflow-x: hidden;
        }

        @media (min-width: 640px) {
          .hero-content-wrapper {
            padding: 0 var(--space-lg);
          }
        }

        @media (min-width: 768px) {
          .hero-content-wrapper {
            padding: 0 var(--space-xl);
          }
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: var(--space-xs);
          padding: var(--space-xs) var(--space-md);
          background: var(--glass-background);
          backdrop-filter: var(--glass-blur);
          -webkit-backdrop-filter: var(--glass-blur);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-full);
          color: var(--color-accent-bright);
          margin-bottom: var(--space-lg);
          font-size: 0.75rem;
          font-weight: 600;
          max-width: 95%;
        }

        @media (min-width: 640px) {
          .hero-badge {
            gap: var(--space-sm);
            padding: var(--space-sm) var(--space-lg);
            margin-bottom: var(--space-xl);
            font-size: 0.875rem;
            max-width: 100%;
          }
        }

        .hero-title {
          margin-bottom: var(--space-xl);
          background: linear-gradient(135deg, var(--color-text-primary) 0%, var(--color-text-secondary) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-subtitle {
          margin-bottom: var(--space-2xl);
          font-size: clamp(0.9375rem, 2vw, 1.25rem);
          max-width: 48rem;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.6;
        }

        .hero-actions {
          display: flex;
          gap: var(--space-lg);
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: var(--space-4xl);
        }

        .hero-actions .btn {
          gap: var(--space-sm);
        }

        .hero-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: var(--space-xl);
          padding-top: var(--space-2xl);
          border-top: 1px solid var(--color-border);
          max-width: 48rem;
          margin: 0 auto;
        }

        .hero-stat {
          text-align: center;
          cursor: pointer;
        }

        .hero-stat-value {
          font-size: clamp(2rem, 4vw, 2.5rem);
          font-weight: 700;
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1.2;
        }

        .hero-stat-label {
          color: var(--color-text-secondary);
          margin-top: var(--space-xs);
          font-size: 0.875rem;
        }

        @media (max-width: 768px) {
          .hero-3d-section {
            min-height: auto;
            padding: var(--space-2xl) 0;
          }

          .hero-3d-canvas {
            opacity: 0.5;
          }

          .hero-3d-content {
            padding: var(--space-4xl) 0 var(--space-3xl);
          }

          .hero-actions {
            flex-direction: column;
            align-items: stretch;
            gap: var(--space-md);
          }

          .hero-actions .btn {
            width: 100%;
            justify-content: center;
          }

          .hero-stats {
            grid-template-columns: 1fr;
            gap: var(--space-lg);
            padding-top: var(--space-lg);
          }
        }

        @media (max-width: 480px) {
          .hero-3d-content {
            padding: var(--space-3xl) 0 var(--space-2xl);
          }

          .hero-stat-label {
            font-size: 0.8125rem;
          }

          .hero-actions {
            gap: var(--space-sm);
          }
        }
      `}</style>
    </section>
  );
}