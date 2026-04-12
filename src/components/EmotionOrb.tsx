import { EmotionType, EMOTIONS } from '@/lib/constants';

interface EmotionOrbProps {
  emotion: EmotionType;
  size?: number;
  className?: string;
  animate?: boolean;
}

export default function EmotionOrb({ emotion, size = 64, className = '', animate = false }: EmotionOrbProps) {
  const config = EMOTIONS[emotion];
  return (
    <div
      className={`rounded-full shrink-0 ${animate ? 'animate-orb-float' : ''} ${className}`}
      style={{
        width: size,
        height: size,
        background: config.gradient,
        boxShadow: `0 0 ${size * 0.4}px ${config.color}33`,
      }}
    />
  );
}
