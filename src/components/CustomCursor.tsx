import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      
      if (!isVisible) {
        setIsVisible(true);
      }
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    // Track interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [role="button"]');
    
    window.addEventListener('mousemove', moveCursor);
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [cursorX, cursorY, isVisible]);

  // Hide custom cursor on mobile
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  if (isMobile) return null;

  return (
    <>
      <motion.div
        className="custom-cursor"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
      />
      
      <motion.div
        className="custom-cursor-dot"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        animate={{
          scale: isHovering ? 0 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
      />

      <style jsx global>{`
        * {
          cursor: none !important;
        }

        .custom-cursor {
          position: fixed;
          width: 40px;
          height: 40px;
          border: 2px solid var(--color-primary);
          border-radius: 50%;
          pointer-events: none;
          z-index: 10000;
          transform: translate(-50%, -50%);
          mix-blend-mode: difference;
        }

        .custom-cursor-dot {
          position: fixed;
          width: 8px;
          height: 8px;
          background: var(--color-primary);
          border-radius: 50%;
          pointer-events: none;
          z-index: 10001;
          transform: translate(-50%, -50%);
        }

        @media (max-width: 768px) {
          * {
            cursor: auto !important;
          }
          
          .custom-cursor,
          .custom-cursor-dot {
            display: none;
          }
        }
      `}</style>
    </>
  );
}
