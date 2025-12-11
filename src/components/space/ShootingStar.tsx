import { useEffect, useState } from 'react';

const ShootingStar = () => {
  const [stars, setStars] = useState<Array<{ id: number; top: number; left: number; delay: number }>>([]);

  useEffect(() => {
    const createStar = () => {
      const newStar = {
        id: Date.now() + Math.random(),
        top: Math.random() * 50,
        left: Math.random() * 70 + 10,
        delay: 0,
      };
      
      setStars((prev) => [...prev, newStar]);
      
      setTimeout(() => {
        setStars((prev) => prev.filter((s) => s.id !== newStar.id));
      }, 1500);
    };

    // Create shooting stars at random intervals
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        createStar();
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-5 overflow-hidden" aria-hidden="true">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute"
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            width: '100px',
            height: '2px',
            background: 'linear-gradient(90deg, transparent, hsl(45 90% 80%), transparent)',
            transform: 'rotate(45deg)',
            animation: 'shooting-star 1.5s ease-out forwards',
          }}
        />
      ))}
    </div>
  );
};

export default ShootingStar;
