import { useState } from 'react';
import { useMemories } from '@/contexts/MemoryContext';
import { EMOTION_LIST, EmotionType } from '@/lib/constants';
import BottomNav from '@/components/BottomNav';
import MemoryBubble from '@/components/MemoryBubble';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AllMemoriesScreen() {
  const { memories } = useMemories();
  const navigate = useNavigate();
  const [filter, setFilter] = useState<EmotionType | 'all'>('all');

  const filteredMemories = filter === 'all'
    ? memories
    : memories.filter(m => m.emotions.includes(filter));

  // Sort by emotion for visual clustering (group same-emotion bubbles together)
  const sortedMemories = [...filteredMemories].sort((a, b) => {
    const emotionOrder: EmotionType[] = ['courage', 'joy', 'growth', 'peace'];
    return emotionOrder.indexOf(a.emotions[0]) - emotionOrder.indexOf(b.emotions[0]);
  });

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <div className="px-5 pt-14 pb-4">
        <h1 className="font-display text-[28px] text-foreground mb-1">All Memories</h1>
        {memories.length > 0 && (
          <p className="text-sm text-muted-foreground">
            {filteredMemories.length} moment{filteredMemories.length !== 1 ? 's' : ''}
          </p>
        )}
      </div>

      {memories.length > 0 ? (
        <>
          {/* Filter chips */}
          <div className="px-5 mb-6 flex gap-2 overflow-x-auto scrollbar-none">
            <button
              onClick={() => setFilter('all')}
              className={`shrink-0 px-3 py-1.5 rounded-full text-[11px] font-medium transition-colors border ${
                filter === 'all'
                  ? 'bg-secondary text-foreground border-border'
                  : 'text-muted-foreground border-transparent'
              }`}
            >
              All
            </button>
            {EMOTION_LIST.map(e => (
              <button
                key={e.id}
                onClick={() => setFilter(e.id)}
                className="shrink-0 px-3 py-1.5 rounded-full text-[11px] font-medium transition-colors flex items-center gap-1.5"
                style={{
                  backgroundColor: filter === e.id ? e.bgColor : 'transparent',
                  color: filter === e.id ? e.color : 'hsl(var(--muted-foreground))',
                  border: filter === e.id ? `1px solid ${e.dimColor}44` : '1px solid transparent',
                }}
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: e.color }} />
                {e.label}
              </button>
            ))}
          </div>

          {/* Dense bubble cluster — no labels, no dividers */}
          <div className="px-3">
            <div className="flex flex-wrap" style={{ gap: '6px', justifyContent: 'center' }}>
              {sortedMemories.map(m => (
                <MemoryBubble
                  key={m.id}
                  id={m.id}
                  title={m.title}
                  emotions={m.emotions}
                  isCompleted={m.isCompleted}
                />
              ))}
            </div>
          </div>

          {filteredMemories.length === 0 && (
            <p className="text-center text-muted-foreground text-sm py-12">No memories match this filter.</p>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center px-8 py-20 text-center">
          <div className="relative w-32 h-32 mb-8">
            <div className="absolute inset-0 rounded-full opacity-20" style={{ background: 'radial-gradient(circle, #5FD8FF, transparent 70%)' }} />
            <div className="absolute inset-0 flex items-center justify-center">
              <Plus className="w-10 h-10 text-muted-foreground" />
            </div>
          </div>
          <h2 className="font-display text-xl text-foreground mb-2">No memories yet</h2>
          <p className="text-muted-foreground text-sm max-w-[260px] leading-relaxed mb-8">
            Add your first memory and it will appear here as a coloured bubble.
          </p>
          <button
            onClick={() => navigate('/emotions')}
            className="bg-primary text-primary-foreground font-medium text-sm px-8 py-3.5 rounded-full active:scale-95 transition-transform"
          >
            Add a memory
          </button>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
