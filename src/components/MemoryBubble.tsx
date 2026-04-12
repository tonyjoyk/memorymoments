import { EMOTIONS, EmotionType } from '@/lib/constants';
import { useNavigate } from 'react-router-dom';

interface MemoryBubbleProps {
  id: string;
  title: string;
  emotions: EmotionType[];
  isCompleted: boolean;
}

export default function MemoryBubble({ id, title, emotions, isCompleted }: MemoryBubbleProps) {
  const navigate = useNavigate();
  const primary = EMOTIONS[emotions[0]];
  const BUBBLE_SIZE = 80;

  return (
    <button
      onClick={() => navigate(`/memory/${id}`)}
      className="flex flex-col items-center gap-1.5 active:scale-90 transition-transform"
      style={{ width: BUBBLE_SIZE + 8 }}
    >
      <div
        className="rounded-full flex items-center justify-center shrink-0"
        style={{
          width: BUBBLE_SIZE,
          height: BUBBLE_SIZE,
          background: primary.gradient,
          opacity: isCompleted ? 1 : 0.65,
          boxShadow: `0 0 20px ${primary.color}22`,
        }}
      />
      <span
        className="text-[10px] leading-tight text-center font-medium line-clamp-2"
        style={{ color: primary.color }}
      >
        {title.length > 28 ? title.slice(0, 26) + '…' : title}
      </span>
    </button>
  );
}
