'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { getAverageColor } from '@/utils/colorExtractor';

interface GridItemProps {
  title: string;
  description: string;
  delay?: number;
  imageUrl?: string;
  isImageCard?: boolean;
  onHover?: (color: string) => void;
  onLeave?: () => void;
  isBlurred?: boolean;
}

const GridItem = ({ 
  title, 
  description, 
  delay = 0, 
  imageUrl, 
  isImageCard = false,
  onHover,
  onLeave,
  isBlurred = false
}: GridItemProps) => {
  const [dominantColor, setDominantColor] = useState('rgb(243, 244, 246)');
  const imageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (isImageCard && imageUrl) {
      const img = document.createElement('img');
      img.crossOrigin = 'anonymous';
      img.src = imageUrl;
      img.onload = async () => {
        const color = await getAverageColor(img);
        setDominantColor(color);
      };
      imageRef.current = img;
    }
  }, [imageUrl, isImageCard]);

  if (isImageCard) {
    return (
      <div className="aspect-square w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay }}
          className="relative h-full w-full overflow-hidden rounded-lg group"
          onMouseEnter={() => onHover?.(dominantColor)}
          onMouseLeave={onLeave}
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="h-full w-full"
          >
            <Image
              src={imageUrl || '/placeholder.jpg'}
              alt={title}
              fill
              className="object-cover transition-all duration-300 group-hover:blur-sm"
              sizes="(max-width: 200px) 100vw, 200px"
            />
            {/* Color overlay */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-overlay"
              style={{ backgroundColor: dominantColor }}
            />
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            {/* Title container with slide-up animation */}
            <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 group-hover:bottom-1/2 group-hover:transform group-hover:translate-y-1/2 transition-all duration-300 ease-out">
              <h3 className="text-white text-xl font-bold px-4 text-center drop-shadow-lg">{title}</h3>
            </div>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="aspect-square w-full h-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        whileHover={{ scale: 1.05 }}
        className={`h-full w-full rounded-full bg-black/30 backdrop-blur-sm border border-white/10 shadow-[0_0_15px_rgba(0,255,255,0.3)] transition-all p-6 flex flex-col justify-center items-center relative overflow-visible group
          ${isBlurred ? 'backdrop-blur-md bg-black/40' : ''}
        `}
        onMouseEnter={() => onHover?.('rgb(0, 0, 0)')}
        onMouseLeave={onLeave}
      >
        {/* Rotating circle animation */}
        <div className={`absolute inset-[-10px] rounded-full border-2 border-transparent border-t-cyan-500/50 border-r-cyan-500/50 transition-all duration-300
          ${isBlurred ? 'border-t-cyan-400/30 border-r-cyan-400/30 blur-[1px]' : 'group-hover:border-t-cyan-400/70 group-hover:border-r-cyan-400/70'}
        `}
          style={{ animation: 'spin 3s linear infinite' }}
        />
        <div className={`absolute inset-[-20px] rounded-full border-2 border-transparent border-t-cyan-500/30 border-r-cyan-500/30 transition-all duration-300
          ${isBlurred ? 'border-t-cyan-400/20 border-r-cyan-400/20 blur-[1px]' : 'group-hover:border-t-cyan-400/50 group-hover:border-r-cyan-400/50'}
        `}
          style={{ animation: 'spin 4s linear infinite' }}
        />
        <div className={`absolute inset-[-30px] rounded-full border-2 border-transparent border-t-cyan-500/20 border-r-cyan-500/20 transition-all duration-300
          ${isBlurred ? 'border-t-cyan-400/10 border-r-cyan-400/10 blur-[1px]' : 'group-hover:border-t-cyan-400/30 group-hover:border-r-cyan-400/30'}
        `}
          style={{ animation: 'spin-reverse 5s linear infinite' }}
        />

        {/* Glowing border effect */}
        <div className={`absolute inset-0 rounded-full border-2 transition-all duration-300
          ${isBlurred ? 'border-cyan-500/20 blur-[1px]' : 'border-cyan-500/30 group-hover:border-cyan-400/50'}
        `} />
        
        {/* Animated gradient background */}
        <div 
          className={`absolute inset-0 rounded-full transition-all duration-300
            ${isBlurred ? 'opacity-10' : 'opacity-20 group-hover:opacity-30'}
          `}
          style={{
            background: 'linear-gradient(45deg, transparent, rgba(0,255,255,0.3), transparent)',
            backgroundSize: '200% 200%',
            animation: 'gradient 3s ease infinite',
          }}
        />
        
        <div className={`relative z-10 text-center transition-all duration-300
          ${isBlurred ? 'blur-[2px]' : 'group-hover:blur-[2px]'}
        `}>
          <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
          <p className="text-sm text-gray-200">{description}</p>
        </div>

        {/* Decorative dots with enhanced glow on hover */}
        {[0, 90, 180, 270].map((rotation, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 rounded-full transition-all duration-300
              ${isBlurred ? 'bg-cyan-400/50 shadow-[0_0_3px_cyan] blur-[1px]' : 'bg-cyan-400 shadow-[0_0_5px_cyan] group-hover:shadow-[0_0_8px_cyan] group-hover:bg-cyan-300'}
            `}
            style={{
              transform: `rotate(${rotation}deg) translateY(-50%)`,
              transformOrigin: 'center center',
              top: '50%',
              left: rotation === 90 ? 'auto' : '50%',
              right: rotation === 270 ? '0' : 'auto',
            }}
          />
        ))}
      </motion.div>

      <style jsx global>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
      `}</style>
    </div>
  );
};

export default GridItem; 