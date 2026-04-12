import { useEffect, useRef } from 'react';
import { useMemories } from '@/contexts/MemoryContext';
import { QUARTERS } from '@/lib/constants';
import BottomNav from '@/components/BottomNav';
import MemoryBubble from '@/components/MemoryBubble';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function getCurrentQuarter(): string {
  const now = new Date();
  const month = now.getMonth();
  const year = now.getFullYear();
  if (month < 3) return `Jan – Mar ${year}`;
  if (month < 6) return `Apr – Jun ${year}`;
  if (month < 9) return `Jul – Sep ${year}`;
  return `Oct – Dec ${year}`;
}

export default function TimelineScreen() {
  const { memories } = useMemories();
  const navigate = useNavigate();
  const currentQ = getCurrentQuarter();
  const quarterRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Group by quarter, only quarters that have memories
  const byQuarter = QUARTERS.reduce<Record<string, typeof memories>>((acc, q) => {
    const qMems = memories.filter(m => m.quarter === q);
    if (qMems.length > 0) acc[q] = qMems;
    return acc;
  }, {});

  // Auto-scroll to current quarter on mount
  useEffect(() => {
    const el = quarterRefs.current[currentQ];
    if (el) {
      const offset = el.offsetTop - window.innerHeight / 2 + el.offsetHeight / 2;
      window.scrollTo({ top: Math.max(0, offset), behavior: 'smooth' });
    }
  }, [currentQ]);

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <div className="px-5 pt-14 pb-4">
        <h1 className="font-display text-[28px] text-foreground mb-1">Timeline</h1>
        <p className="text-sm text-muted-foreground">
          {memories.length} moment{memories.length !== 1 ? 's' : ''} across time
        </p>
      </div>

      {/* Quarter groups */}
      <div className="px-5 space-y-8">
        {QUARTERS.map(q => {
          const qMems = byQuarter[q];
          if (!qMems) return null;
          const isCurrent = q === currentQ;
          return (
            <div
              key={q}
              ref={el => { quarterRefs.current[q] = el; }}
            >
              <div className="flex items-center gap-2 mb-4">
                <p className="label-text">{q}</p>
                {isCurrent && (
                  <span className="text-[9px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-primary/15 text-primary">
                    Now
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-3 justify-start">
                {qMems.map(m => (
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

        {Object.keys(byQuarter).length === 0 && (
          <div className="flex flex-col items-center justify-center px-8 py-20 text-center">
            <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
              <Plus className="w-6 h-6 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground text-sm">No memories yet. Start by adding your first one.</p>
          </div>
        )}
      </div>

      {/* FAB */}
      <button
        onClick={() => navigate('/emotions')}
        className="fixed bottom-24 right-5 w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg active:scale-90 transition-transform z-20"
      >
        <Plus className="w-6 h-6" />
      </button>

      <BottomNav />
    </div>
  );
}
