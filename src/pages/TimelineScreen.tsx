import { useState } from 'react';
import { useMemories } from '@/contexts/MemoryContext';
import { EMOTIONS, EmotionType, EMOTION_LIST, QUARTERS } from '@/lib/constants';
import BottomNav from '@/components/BottomNav';
import EmotionOrb from '@/components/EmotionOrb';
import { useNavigate } from 'react-router-dom';

type View = 'timeline' | 'scatter';

export default function TimelineScreen() {
  const { memories } = useMemories();
  const navigate = useNavigate();
  const [view, setView] = useState<View>('timeline');
  const [filter, setFilter] = useState<EmotionType | 'all'>('all');

  const filteredMemories = filter === 'all'
    ? memories
    : memories.filter(m => m.emotions.includes(filter));

  // Group by quarter
  const byQuarter = QUARTERS.reduce<Record<string, typeof memories>>((acc, q) => {
    const qMemories = filteredMemories.filter(m => m.quarter === q);
    if (qMemories.length > 0) acc[q] = qMemories;
    return acc;
  }, {});

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <div className="px-5 pt-14 pb-4">
        <h1 className="font-display text-[28px] text-foreground mb-1">Timeline</h1>
        <p className="text-sm text-muted-foreground">Your moments across time</p>
      </div>

      {/* View toggle */}
      <div className="px-5 mb-4">
        <div className="inline-flex rounded-lg bg-surface p-1" style={{ backgroundColor: 'hsl(var(--surface))' }}>
          <button
            onClick={() => setView('timeline')}
            className={`px-4 py-1.5 rounded-md text-xs font-medium transition-colors ${
              view === 'timeline' ? 'bg-secondary text-foreground' : 'text-muted-foreground'
            }`}
          >
            List
          </button>
          <button
            onClick={() => setView('scatter')}
            className={`px-4 py-1.5 rounded-md text-xs font-medium transition-colors ${
              view === 'scatter' ? 'bg-secondary text-foreground' : 'text-muted-foreground'
            }`}
          >
            Bubbles
          </button>
        </div>
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

      {view === 'timeline' ? (
        <div className="px-5 space-y-6">
          {Object.entries(byQuarter).map(([quarter, qMemories]) => (
            <div key={quarter}>
              <p className="label-text mb-3">{quarter}</p>
              <div className="space-y-2">
                {qMemories.map(m => {
                  const primary = EMOTIONS[m.emotions[0]];
                  return (
                    <button
                      key={m.id}
                      onClick={() => navigate(`/memory/${m.id}`)}
                      className="w-full flex items-center gap-3 text-left py-2 active:opacity-70 transition-opacity"
                    >
                      <div
                        className={`w-3 h-3 rounded-full shrink-0 ${m.isCompleted ? '' : 'border-2'}`}
                        style={{
                          backgroundColor: m.isCompleted ? primary.color : 'transparent',
                          borderColor: primary.color,
                        }}
                      />
                      <span className="text-sm text-foreground flex-1">{m.title}</span>
                      {m.isCompleted && (
                        <span className="text-[10px] text-muted-foreground">✓</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
          {Object.keys(byQuarter).length === 0 && (
            <p className="text-center text-muted-foreground text-sm py-12">No memories match this filter.</p>
          )}
        </div>
      ) : (
        /* Scatter/Bubble view */
        <div className="px-5">
          <div className="flex flex-wrap gap-4 justify-center py-8">
            {filteredMemories.map((m, i) => {
              const primary = EMOTIONS[m.emotions[0]];
              const size = 60 + (m.title.length % 4) * 12;
              return (
                <button
                  key={m.id}
                  onClick={() => navigate(`/memory/${m.id}`)}
                  className="relative rounded-full flex items-center justify-center active:scale-90 transition-transform"
                  style={{
                    width: size,
                    height: size,
                    background: primary.gradient,
                    opacity: m.isCompleted ? 1 : 0.7,
                  }}
                  title={m.title}
                >
                  <span className="text-[9px] font-medium text-center px-2 leading-tight" style={{ color: '#0d0d0d' }}>
                    {m.title.length > 20 ? m.title.slice(0, 18) + '…' : m.title}
                  </span>
                </button>
              );
            })}
          </div>
          {filteredMemories.length === 0 && (
            <p className="text-center text-muted-foreground text-sm py-12">No memories match this filter.</p>
          )}
        </div>
      )}

      {/* Legend */}
      <div className="px-5 mt-8 flex items-center justify-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-muted-foreground" />
          <span className="text-[11px] text-muted-foreground">Happened</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full border-2 border-muted-foreground" />
          <span className="text-[11px] text-muted-foreground">Planned</span>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
