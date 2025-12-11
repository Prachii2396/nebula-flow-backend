import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleDuration: number;
  twinkleDelay: number;
}

const StarField = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const stars: Star[] = [];
    const starCount = 200;

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.7 + 0.3,
        twinkleDuration: Math.random() * 4 + 2,
        twinkleDelay: Math.random() * 5,
      });
    }

    const container = containerRef.current;
    container.innerHTML = '';

    stars.forEach((star) => {
      const starEl = document.createElement('div');
      starEl.className = 'star';
      starEl.style.cssText = `
        left: ${star.x}%;
        top: ${star.y}%;
        width: ${star.size}px;
        height: ${star.size}px;
        --twinkle-duration: ${star.twinkleDuration}s;
        --twinkle-delay: ${star.twinkleDelay}s;
        opacity: ${star.opacity};
      `;
      container.appendChild(starEl);
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
};

export default StarField;
