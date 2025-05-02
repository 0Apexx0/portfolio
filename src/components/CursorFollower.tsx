'use client';

import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

const CursorFollower = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // Balanced spring animation - smooth but still responsive
  const springConfig = { damping: 20, stiffness: 200 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      x.set(e.clientX - 25); // Offset by half the circle size (50px/2)
      y.set(e.clientY - 25);
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleHoverStart = () => setIsHovering(true);
    const handleHoverEnd = () => setIsHovering(false);

    // Add hover detection for any interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [role="button"]');
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', handleHoverStart);
      element.addEventListener('mouseleave', handleHoverEnd);
    });

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      interactiveElements.forEach(element => {
        element.removeEventListener('mouseenter', handleHoverStart);
        element.removeEventListener('mouseleave', handleHoverEnd);
      });
    };
  }, [x, y]);

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-50 mix-blend-difference"
      style={{
        x,
        y,
      }}
    >
      <motion.div
        className="rounded-full bg-white"
        animate={{
          height: isHovering ? 80 : 50,
          width: isHovering ? 80 : 50,
          scale: isHovering ? 1.2 : 1,
        }}
        transition={{ type: "spring", damping: 20, stiffness: 200 }}
      />
    </motion.div>
  );
};

export default CursorFollower; 