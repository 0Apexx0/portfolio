'use client';

import GridItem from '@/components/GridItem';
import CursorFollower from '@/components/CursorFollower';
import CircuitBackground from '@/components/CircuitBackground';
import { useState } from 'react';

export default function Home() {
  const [bgColor, setBgColor] = useState('rgba(17, 24, 39, 0.2)'); // More transparent background
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const defaultBgColor = 'rgba(17, 24, 39, 0.2)';

  const handleCardHover = (color: string, index: number) => {
    const rgbValues = color.match(/\d+/g);
    if (rgbValues) {
      setBgColor(`rgba(${rgbValues[0]}, ${rgbValues[1]}, ${rgbValues[2]}, 0.7)`);
    }
    setHoveredIndex(index);
  };

  const handleCardLeave = () => {
    setBgColor(defaultBgColor);
    setHoveredIndex(null);
  };

  const gridItems = [
    { 
      title: 'Skills',
      description: 'Corner card 1',
      imageUrl: '/skills.png',
      isImageCard: true 
    },
    { 
      title: 'Experience',
      description: 'Corner card 2',
      imageUrl: '/experience.png',
      isImageCard: true 
    },
    { 
      title: 'Center',
      description: 'Main card with important information displayed in the middle of the grid layout.',
    },
    { 
      title: 'Projects',
      description: 'Corner card 3',
      imageUrl: '/projects.png',
      isImageCard: true 
    },
    { 
      title: 'About Me',
      description: 'Corner card 4',
      imageUrl: '/about_me.png',
      isImageCard: true 
    },
  ];

  return (
    <>
      <CircuitBackground />
      <CursorFollower />
      <main 
        className="relative h-screen overflow-hidden transition-colors duration-500 cursor-none backdrop-blur-sm"
        style={{ backgroundColor: bgColor }}
      >
        <div className="h-full w-full p-6">
          <div className="h-[calc(100%-3rem)] w-full">
            <div className="grid h-full w-full grid-cols-3 grid-rows-3 gap-4 place-items-center">
              {[0, 1, 2, 3, 4].map((index) => (
                <div
                  key={index}
                  className={`w-full max-w-[200px] transition-all duration-500
                    ${index === 1 ? 'col-start-3' : ''}
                    ${index === 2 ? 'col-start-2 row-start-2 rounded-full' : ''}
                    ${index === 3 ? 'row-start-3' : ''}
                    ${index === 4 ? 'col-start-3 row-start-3' : ''}
                    ${hoveredIndex !== null && hoveredIndex !== index && index !== 2 ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}
                  `}
                  style={index === 2 ? {
                    width: '200px',
                    height: '200px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(0, 0, 0, 0.5)',
                    backdropFilter: hoveredIndex !== null && hoveredIndex !== 2 ? 'blur(8px)' : 'blur(0px)',
                    border: '2px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 0 20px rgba(0, 255, 255, 0.2)',
                    transition: 'all 0.3s ease',
                  } : {}}
                >
                  <GridItem
                    {...gridItems[index]}
                    delay={0.1 * (index + 1)}
                    onHover={(color) => handleCardHover(color, index)}
                    onLeave={handleCardLeave}
                    isBlurred={hoveredIndex !== null && hoveredIndex !== 2}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
