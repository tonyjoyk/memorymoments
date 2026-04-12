import { EMOTIONS, EmotionType } from '@/lib/constants';
import { useNavigate } from 'react-router-dom';

interface MemoryBubbleProps {
  id: string;
  title: string;
  emotions: EmotionType[];
  isCompleted: boolean;
}

const BUBBLE_COLORS: Record<EmotionType, { base: string; gradient: string }> = {
  courage: {
    base: '#FF7D56',
    gradient: 'radial-gradient(circle at 35% 35%, #FFB89A, #FF7D56 60%, #E86A3A)',
  },
  joy: {
    base: '#FCE354',
    gradient: 'radial-gradient(circle at 35% 35%, #FFF1A0, #FCE354 60%, #E0C830)',
  },
  growth: {
    base: '#5FD8FF',
    gradient: 'radial-gradient(circle at 35% 35%, #B0EDFF, #5FD8FF 60%, #3ABDE0)',
  },
  peace: {
    base: '#6AFFA5',
    gradient: 'radial-gradient(circle at 35% 35%, #B8FFD4, #6AFFA5 60%, #45E085)',
  },
};

const BUBBLE_SIZE = 100;

export default function MemoryBubble({ id, title, emotions, isCompleted }: MemoryBubbleProps) {
  const navigate = useNavigate();
  const primary = emotions[0];
  const colors = BUBBLE_COLORS[primary];

  return (
    <button
      onClick={() => navigate(`/memory/${id}`)}
      className="rounded-full flex items-center justify-center active:scale-90 transition-transform shrink-0"
      style={{
        width: BUBBLE_SIZE,
        height: BUBBLE_SIZE,
        background: colors.gradient,
        opacity: isCompleted ? 1 : 0.7,
      }}
    >
      <span
        className="text-[13px] font-medium leading-tight text-center px-3"
        style={{ color: '#000000' }}
      >
        {title.length > 24 ? title.slice(0, 22) + '…' : title}
      </span>
    </button>
  );
}

export { BUBBLE_COLORS, BUBBLE_SIZE };
