import { useEffect, useRef, ReactNode } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';

interface SmoothScrollProps {
  children: ReactNode;
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <>
      {/* Smooth Scroll Progress Bar */}
      <motion.div 
        className="scroll-progress-bar"
        style={{ scaleX }}
      />
      
      <div ref={scrollRef}>
        {children}
      </div>

      <style>{`
        .scroll-progress-bar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: var(--gradient-primary);
          transform-origin: 0%;
          z-index: 9999;
          box-shadow: 0 0 10px rgba(99, 102, 241, 0.5);
        }
      `}</style>
    </>
  );
}
