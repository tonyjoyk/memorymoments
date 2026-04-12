import { useParams, useNavigate } from 'react-router-dom';
import { useMemories } from '@/contexts/MemoryContext';
import { EMOTIONS } from '@/lib/constants';
import NavBar from '@/components/NavBar';
import EmotionTag from '@/components/EmotionTag';
import ActionItem from '@/components/ActionItem';

export default function MemoryDetailScreen() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getMemory, toggleAction } = useMemories();

  const memory = getMemory(id || '');
  if (!memory) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Memory not found.
      </div>
    );
  }

  const primaryEmotion = EMOTIONS[memory.emotions[0]];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero with emotion tint */}
      <div
        className="relative"
        style={{
          background: `linear-gradient(180deg, ${primaryEmotion.bgColor} 0%, hsl(0 0% 5.1%) 100%)`,
        }}
      >
        <NavBar backTo="/memories" />
        <div className="px-5 pb-8 pt-2">
          <div className="flex flex-wrap gap-1.5 mb-4">
            {memory.emotions.map(e => (
              <EmotionTag key={e} emotion={e} />
            ))}
          </div>
          <h1 className="font-display text-[26px] leading-snug text-foreground mb-2">
            {memory.title}
          </h1>
          <p className="text-[12px] text-muted-foreground">
            {memory.quarter} · {memory.isCompleted ? 'Happened' : 'Planned'}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-5 py-6 space-y-6">
        {memory.whyMatters && (
          <div>
            <p className="label-text mb-2">Why this matters</p>
            <p className="text-sm text-foreground/90 leading-relaxed">{memory.whyMatters}</p>
          </div>
        )}

        {memory.whatYoudMiss && (
          <div>
            <p className="label-text mb-2">What you'd miss</p>
            <p className="text-sm text-foreground/90 leading-relaxed">{memory.whatYoudMiss}</p>
          </div>
        )}

        {memory.actions.length > 0 && (
          <div>
            <p className="label-text mb-2">Action steps</p>
            <div className="rounded-lg p-3" style={{ backgroundColor: 'hsl(var(--surface))' }}>
              {memory.actions.map(action => (
                <ActionItem
                  key={action.id}
                  text={action.text}
                  completed={action.completed}
                  onToggle={() => toggleAction(memory.id, action.id)}
                />
              ))}
            </div>
          </div>
        )}

        {memory.isCompleted && memory.reflection && (
          <div
            className="rounded-lg p-4 border"
            style={{
              backgroundColor: primaryEmotion.bgColor,
              borderColor: `${primaryEmotion.dimColor}44`,
            }}
          >
            <p className="label-text mb-2" style={{ color: primaryEmotion.color }}>Reflection</p>
            <p className="text-sm text-foreground/90 leading-relaxed italic">"{memory.reflection}"</p>
          </div>
        )}
      </div>

      {/* CTAs */}
      <div className="sticky bottom-0 p-5 bg-background/90 backdrop-blur-lg border-t border-border flex gap-3">
        <button
          onClick={() => navigate('/memories')}
          className="flex-1 py-3.5 rounded-full font-medium text-sm border border-border text-foreground active:scale-[0.98] transition-transform"
        >
          Back to memories
        </button>
        {!memory.isCompleted && (
          <button
            onClick={() => navigate(`/reflect/${memory.id}`)}
            className="flex-1 py-3.5 rounded-full font-medium text-sm active:scale-[0.98] transition-transform"
            style={{
              backgroundColor: primaryEmotion.color,
              color: '#0d0d0d',
            }}
          >
            This happened ✦
          </button>
        )}
      </div>
    </div>
  );
}
