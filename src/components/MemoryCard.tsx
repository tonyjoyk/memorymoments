import { Memory, EMOTIONS } from '@/lib/constants';
import EmotionTag from './EmotionTag';
import { useNavigate } from 'react-router-dom';

interface MemoryCardProps {
  memory: Memory;
}

export default function MemoryCard({ memory }: MemoryCardProps) {
  const navigate = useNavigate();
  const primaryEmotion = EMOTIONS[memory.emotions[0]];
  const completedActions = memory.actions.filter(a => a.completed).length;

  return (
    <button
      onClick={() => navigate(`/memory/${memory.id}`)}
      className="w-full text-left rounded-lg overflow-hidden transition-all active:scale-[0.98]"
      style={{ backgroundColor: 'hsl(var(--surface))' }}
    >
      <div className="flex">
        {/* Color bar */}
        <div
          className="w-1 shrink-0"
          style={{ backgroundColor: primaryEmotion.color }}
        />
        <div className="flex-1 p-4 space-y-2.5">
          <h3 className="font-display text-[17px] leading-snug text-foreground">
            {memory.title}
          </h3>
          <div className="flex flex-wrap items-center gap-1.5">
            {memory.emotions.map(e => (
              <EmotionTag key={e} emotion={e} />
            ))}
          </div>
          <div className="flex items-center gap-3 text-[12px] text-muted-foreground">
            <span>{memory.quarter}</span>
            {memory.actions.length > 0 && (
              <span>{completedActions}/{memory.actions.length} steps</span>
            )}
            {memory.isCompleted && (
              <span className="text-peace">✓ Happened</span>
            )}
          </div>
        </div>
      </div>
    </button>
  );
}
