import StarField from './StarField';
import Moon from './Moon';
import Planet from './Planet';
import Nebula from './Nebula';
import ShootingStar from './ShootingStar';

interface SpaceBackgroundProps {
  scrollProgress: number;
}

const SpaceBackground = ({ scrollProgress }: SpaceBackgroundProps) => {
  return (
    <div className="fixed inset-0 overflow-hidden nebula-bg" aria-hidden="true">
      {/* Nebulas */}
      <Nebula position={{ top: '-10%', left: '-10%' }} size={600} color="purple" opacity={0.2} />
      <Nebula position={{ bottom: '-20%', right: '-10%' }} size={800} color="blue" opacity={0.15} />
      <Nebula position={{ top: '30%', right: '20%' }} size={400} color="pink" opacity={0.1} />

      {/* Star Field */}
      <StarField />

      {/* Shooting Stars */}
      <ShootingStar />

      {/* Moon with Parallax */}
      <Moon scrollProgress={scrollProgress} />

      {/* Planets */}
      <Planet
        size={60}
        color="orange"
        position={{ top: '15%', left: '8%' }}
        hasRing
        className="opacity-70"
      />
      <Planet
        size={40}
        color="blue"
        position={{ bottom: '25%', right: '5%' }}
        className="opacity-60"
      />
      <Planet
        size={25}
        color="purple"
        position={{ top: '60%', left: '3%' }}
        className="opacity-50"
      />
    </div>
  );
};

export default SpaceBackground;
