'use client';

import { useEffect, useRef } from 'react';

const CircuitBackground = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(error => {
        console.log('Video autoplay failed:', error);
      });
    }
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute w-[100vh] h-[100vw] object-cover origin-center"
        style={{
          transform: 'rotate(-90deg) translateX(-100vh)',
          transformOrigin: 'top left',
          filter: 'contrast(1.2) brightness(1.1)',
          WebkitFontSmoothing: 'antialiased',
          WebkitBackfaceVisibility: 'hidden',
        }}
      >
        <source src="/backgro.mp4" type="video/mp4" />
      </video>
      {/* Minimal overlay for depth without causing blur */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(145deg, rgba(0,0,0,0.15), transparent)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};

export default CircuitBackground; 