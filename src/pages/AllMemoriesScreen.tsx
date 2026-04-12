import { useState } from 'react';
import { useMemories } from '@/contexts/MemoryContext';
import { EMOTIONS, EmotionType, EMOTION_LIST } from '@/lib/constants';
import BottomNav from '@/components/BottomNav';
import MemoryBubble from '@/components/MemoryBubble';

export default function AllMemoriesScreen() {
  const { memories } = useMemories();
  const [filter, setFilter] = useState<EmotionType | 'all'>('all');

  const filteredMemories = filter === 'all'
    ? memories
    : memories.filter(m => m.emotions.includes(filter));

  // Group by primary emotion for clustered layout
  const byEmotion = EMOTION_LIST.reduce<Record<EmotionType, typeof memories>>((acc, e) => {
    const eMems = filteredMemories.filter(m => m.emotions[0] === e.id);
    if (eMems.length > 0) acc[e.id] = eMems;
    return acc;
  }, {} as Record<EmotionType, typeof memories>);

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <div className="px-5 pt-14 pb-4">
        <h1 className="font-display text-[28px] text-foreground mb-1">All Memories</h1>
        <p className="text-sm text-muted-foreground">
          {filteredMemories.length} moment{filteredMemories.length !== 1 ? 's' : ''}
        </p>
      </div>

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

      {/* Dense cluster view grouped by emotion */}
      {filter === 'all' ? (
        <div className="px-5 space-y-6">
          {Object.entries(byEmotion).map(([emotionId, eMems]) => {
            const emotion = EMOTIONS[emotionId as EmotionType];
            return (
              <div key={emotionId}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: emotion.color }} />
                  <p className="label-text" style={{ color: emotion.color }}>{emotion.label}</p>
                </div>
                <div className="flex flex-wrap gap-2 justify-start">
                  {eMems.map(m => (
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
            );
          })}
        </div>
      ) : (
        <div className="px-5">
          <div className="flex flex-wrap gap-2 justify-start">
            {filteredMemories.map(m => (
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
      )}

      {filteredMemories.length === 0 && (
        <p className="text-center text-muted-foreground text-sm py-12">No memories match this filter.</p>
      )}

      <BottomNav />
    </div>
  );
}
