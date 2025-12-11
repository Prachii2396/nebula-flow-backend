interface PlanetProps {
  size: number;
  color: 'orange' | 'blue' | 'purple';
  position: { top?: string; bottom?: string; left?: string; right?: string };
  hasRing?: boolean;
  className?: string;
}

const Planet = ({ size, color, position, hasRing = false, className = '' }: PlanetProps) => {
  const colorMap = {
    orange: {
      gradient: 'radial-gradient(circle at 30% 30%, hsl(30 80% 60%), hsl(20 70% 45%), hsl(15 60% 30%))',
      glow: 'hsl(25 80% 50% / 0.3)',
    },
    blue: {
      gradient: 'radial-gradient(circle at 30% 30%, hsl(210 80% 70%), hsl(220 70% 50%), hsl(230 60% 35%))',
      glow: 'hsl(210 80% 60% / 0.3)',
    },
    purple: {
      gradient: 'radial-gradient(circle at 30% 30%, hsl(280 70% 70%), hsl(270 60% 50%), hsl(260 50% 35%))',
      glow: 'hsl(270 70% 60% / 0.3)',
    },
  };

  const { gradient, glow } = colorMap[color];

  return (
    <div
      className={`absolute pointer-events-none float-slow ${className}`}
      style={{
        ...position,
        width: size,
        height: size,
      }}
    >
      {/* Planet Glow */}
      <div
        className="absolute inset-0 rounded-full blur-xl"
        style={{ background: glow }}
      />

      {/* Planet Body */}
      <div
        className="relative w-full h-full rounded-full"
        style={{
          background: gradient,
          boxShadow: `
            inset -${size * 0.15}px -${size * 0.1}px ${size * 0.3}px rgba(0, 0, 0, 0.5),
            0 0 ${size * 0.3}px ${glow}
          `,
        }}
      />

      {/* Ring */}
      {hasRing && (
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: size * 1.8,
            height: size * 0.5,
            border: `2px solid hsl(35 60% 60% / 0.4)`,
            borderRadius: '50%',
            transform: 'translate(-50%, -50%) rotateX(70deg)',
            boxShadow: `
              0 0 10px hsl(35 60% 60% / 0.2),
              inset 0 0 10px hsl(35 60% 60% / 0.1)
            `,
          }}
        />
      )}
    </div>
  );
};

export default Planet;
