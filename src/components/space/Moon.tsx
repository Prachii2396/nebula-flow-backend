import { useEffect, useState } from 'react';

interface MoonProps {
  scrollProgress: number;
}

const Moon = ({ scrollProgress }: MoonProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Moon moves from right to left as user scrolls
  const translateX = mounted ? 80 - scrollProgress * 160 : 80;
  const translateY = Math.sin(scrollProgress * Math.PI) * 30;
  const scale = 1 + scrollProgress * 0.1;

  return (
    <div
      className="fixed top-20 z-10 pointer-events-none transition-transform duration-300 ease-out"
      style={{
        transform: `translateX(${translateX}vw) translateY(${translateY}px) scale(${scale})`,
      }}
    >
      {/* Moon Glow */}
      <div className="absolute inset-0 rounded-full moon-glow" />
      
      {/* Moon Surface */}
      <div
        className="relative w-24 h-24 md:w-32 md:h-32 rounded-full"
        style={{
          background: `radial-gradient(circle at 35% 35%, 
            hsl(45 20% 95%) 0%, 
            hsl(40 15% 85%) 40%, 
            hsl(35 10% 70%) 70%, 
            hsl(30 10% 60%) 100%)`,
          boxShadow: `
            inset -8px -8px 20px rgba(0, 0, 0, 0.2),
            inset 4px 4px 10px rgba(255, 255, 255, 0.3)
          `,
        }}
      >
        {/* Moon Craters */}
        <div
          className="absolute w-6 h-6 rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(0,0,0,0.3) 0%, transparent 70%)',
            top: '20%',
            left: '25%',
          }}
        />
        <div
          className="absolute w-4 h-4 rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, rgba(0,0,0,0.3) 0%, transparent 70%)',
            top: '50%',
            left: '60%',
          }}
        />
        <div
          className="absolute w-8 h-8 rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(0,0,0,0.3) 0%, transparent 70%)',
            top: '60%',
            left: '30%',
          }}
        />
        <div
          className="absolute w-3 h-3 rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, rgba(0,0,0,0.3) 0%, transparent 70%)',
            top: '30%',
            left: '55%',
          }}
        />
      </div>
    </div>
  );
};

export default Moon;
