'use client';

import { motion } from 'framer-motion';

interface AnimatedButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
}

const AnimatedButton = ({ onClick, children }: AnimatedButtonProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold shadow-lg hover:bg-blue-700 transition-colors"
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
};

export default AnimatedButton; 