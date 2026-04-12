import { EMOTIONS, EmotionType } from '@/lib/constants';
import { useNavigate } from 'react-router-dom';

interface MemoryBubbleProps {
  id: string;
  title: string;
  emotions: EmotionType[];
  isCompleted: boolean;
}

const BUBBLE_COLORS: Record<EmotionType, { gradient: string }> = {
  courage: {
    gradient: 'radial-gradient(circle at 35% 35%, #FFB89A, #FF7D56 60%, #E86A3A)',
  },
  joy: {
    gradient: 'radial-gradient(circle at 35% 35%, #FFF1A0, #FCE354 60%, #E0C830)',
  },
  growth: {
    gradient: 'radial-gradient(circle at 35% 35%, #B0EDFF, #5FD8FF 60%, #3ABDE0)',
  },
  peace: {
    gradient: 'radial-gradient(circle at 35% 35%, #B8FFD4, #6AFFA5 60%, #45E085)',
  },
};

const BUBBLE_SIZE = 100;

export default function MemoryBubble({ id, title, emotions, isCompleted }: MemoryBubbleProps) {
  const navigate = useNavigate();
  const primary = emotions[0];
  const colors = BUBBLE_COLORS[primary];
  const emotionColor = EMOTIONS[primary].color;

  return (
    <button
      onClick={() => navigate(`/memory/${id}`)}
      className="rounded-full flex items-center justify-center active:scale-90 transition-all duration-200 shrink-0"
      style={{
        width: BUBBLE_SIZE,
        height: BUBBLE_SIZE,
        background: colors.gradient,
        opacity: isCompleted ? 1 : 0.55,
        boxShadow: isCompleted ? `0 4px 20px ${emotionColor}20` : 'none',
        border: isCompleted ? 'none' : `2px dashed ${emotionColor}66`,
      }}
    >
      <span
        className="text-[12px] font-semibold leading-tight text-center px-2.5"
        style={{ color: '#000000' }}
      >
        {title.length > 24 ? title.slice(0, 22) + '…' : title}
      </span>
    </button>
  );
}

export { BUBBLE_COLORS, BUBBLE_SIZE };
