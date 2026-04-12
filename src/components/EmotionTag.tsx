import { EmotionType, EMOTIONS } from '@/lib/constants';

interface EmotionTagProps {
  emotion: EmotionType;
  className?: string;
}

export default function EmotionTag({ emotion, className = '' }: EmotionTagProps) {
  const config = EMOTIONS[emotion];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold ${className}`}
      style={{
        backgroundColor: config.bgColor,
        color: config.color,
        border: `1px solid ${config.dimColor}44`,
      }}
    >
      <span
        className="w-[6px] h-[6px] rounded-full shrink-0"
        style={{ backgroundColor: config.color }}
      />
      {config.label}
    </span>
  );
}
