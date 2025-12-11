interface NebulaProps {
  position: { top?: string; bottom?: string; left?: string; right?: string };
  size: number;
  color: 'purple' | 'blue' | 'pink';
  opacity?: number;
}

const Nebula = ({ position, size, color, opacity = 0.15 }: NebulaProps) => {
  const colorMap = {
    purple: 'hsl(270 60% 40%)',
    blue: 'hsl(220 70% 35%)',
    pink: 'hsl(320 60% 45%)',
  };

  return (
    <div
      className="fixed pointer-events-none blur-3xl"
      style={{
        ...position,
        width: size,
        height: size,
        background: `radial-gradient(ellipse at center, ${colorMap[color]} 0%, transparent 70%)`,
        opacity,
      }}
      aria-hidden="true"
    />
  );
};

export default Nebula;
