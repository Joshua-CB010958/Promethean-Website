import { motion } from 'motion/react';

export function FloatingElements() {
  const shapes = [
    { size: 100, delay: 0, duration: 20, x: '10%', y: '20%' },
    { size: 60, delay: 2, duration: 15, x: '80%', y: '30%' },
    { size: 80, delay: 4, duration: 18, x: '15%', y: '70%' },
    { size: 120, delay: 1, duration: 25, x: '85%', y: '75%' },
    { size: 50, delay: 3, duration: 12, x: '50%', y: '10%' },
  ];

  return (
    <div className="floating-elements">
      {shapes.map((shape, index) => (
        <motion.div
          key={index}
          className="floating-shape"
          style={{
            width: shape.size,
            height: shape.size,
            left: shape.x,
            top: shape.y,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            rotate: [0, 180, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: shape.duration,
            delay: shape.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <style>{`
        .floating-elements {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: -1;
          overflow: hidden;
        }

        .floating-shape {
          position: absolute;
          border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
          background: radial-gradient(ellipse at center, rgba(99, 102, 241, 0.1) 0%, transparent 70%);
          filter: blur(40px);
        }

        @media (max-width: 768px) {
          .floating-shape {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
