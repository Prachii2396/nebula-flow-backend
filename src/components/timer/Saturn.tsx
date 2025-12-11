import { useRef, useEffect, useState } from 'react';

const Saturn = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 15, y: 0 });
  const [autoRotate, setAutoRotate] = useState(true);

  useEffect(() => {
    let animationFrame: number;
    let angle = 0;

    const animate = () => {
      if (autoRotate) {
        angle += 0.5;
        setRotation(prev => ({
          x: prev.x,
          y: angle % 360
        }));
      }
      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [autoRotate]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    
    setAutoRotate(false);
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const rotateY = ((e.clientX - centerX) / rect.width) * 60;
    const rotateX = ((centerY - e.clientY) / rect.height) * 30 + 15;
    
    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setAutoRotate(true);
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-64 h-64 md:w-80 md:h-80 perspective-1000 cursor-pointer mx-auto"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Saturn Planet */}
      <div 
        className="absolute inset-0 flex items-center justify-center transition-transform duration-100 ease-out"
        style={{ 
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Planet Body */}
        <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 shadow-2xl">
          {/* Planet Texture */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-amber-900/20 to-transparent" />
          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-amber-100/30 via-transparent to-amber-900/40" />
          
          {/* Planet Bands */}
          <div className="absolute top-[30%] left-0 right-0 h-[2px] bg-amber-700/30 rounded-full" />
          <div className="absolute top-[45%] left-0 right-0 h-[3px] bg-amber-600/20 rounded-full" />
          <div className="absolute top-[60%] left-0 right-0 h-[2px] bg-amber-800/25 rounded-full" />
          
          {/* Inner Glow */}
          <div className="absolute inset-0 rounded-full shadow-inner" style={{ boxShadow: 'inset -20px -20px 40px rgba(0,0,0,0.4), inset 10px 10px 20px rgba(255,255,255,0.2)' }} />
        </div>
        
        {/* Ring System */}
        <div 
          className="absolute w-56 h-56 md:w-72 md:h-72"
          style={{ 
            transform: 'rotateX(75deg)',
            transformStyle: 'preserve-3d'
          }}
        >
          {/* Outer Ring */}
          <div className="absolute inset-0 rounded-full border-[12px] md:border-[16px] border-amber-300/40 blur-[1px]" 
            style={{ boxShadow: '0 0 30px rgba(251, 191, 36, 0.3)' }} 
          />
          
          {/* Middle Ring */}
          <div className="absolute inset-4 md:inset-6 rounded-full border-[8px] md:border-[10px] border-amber-400/50" />
          
          {/* Inner Ring */}
          <div className="absolute inset-8 md:inset-12 rounded-full border-[6px] md:border-[8px] border-amber-500/30" />
          
          {/* Ring Gap */}
          <div className="absolute inset-[52px] md:inset-[68px] rounded-full border-[4px] border-amber-200/20" />
          
          {/* Ring Particles */}
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-amber-200/60 rounded-full"
              style={{
                top: `${50 + Math.sin(i * 0.5) * 45}%`,
                left: `${50 + Math.cos(i * 0.5) * 45}%`,
                animation: `twinkle ${2 + Math.random() * 2}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>
        
        {/* Shadow on Ring from Planet */}
        <div 
          className="absolute w-56 h-56 md:w-72 md:h-72"
          style={{ 
            transform: 'rotateX(75deg)',
            background: 'linear-gradient(90deg, transparent 0%, transparent 40%, rgba(0,0,0,0.4) 50%, transparent 60%, transparent 100%)',
            borderRadius: '50%'
          }}
        />
      </div>
      
      {/* Ambient Glow */}
      <div className="absolute inset-0 rounded-full bg-amber-400/10 blur-3xl animate-pulse" />
    </div>
  );
};

export default Saturn;