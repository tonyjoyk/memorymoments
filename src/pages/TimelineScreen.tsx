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

  const byQuarter = QUARTERS.reduce<Record<string, typeof memories>>((acc, q) => {
    const qMems = memories.filter(m => m.quarter === q);
    if (qMems.length > 0) acc[q] = qMems;
    return acc;
  }, {});

  useEffect(() => {
    const el = quarterRefs.current[currentQ];
    if (el) {
      const offset = el.offsetTop - window.innerHeight / 2 + el.offsetHeight / 2;
      window.scrollTo({ top: Math.max(0, offset), behavior: 'smooth' });
    }
  }, [currentQ]);

  const hasMemories = Object.keys(byQuarter).length > 0;

  return (
    <div className="min-h-screen pb-28">
      {/* Header */}
      <div className="px-5 pt-14 pb-2">
        <h1 className="font-display text-[28px] text-foreground mb-1">Timeline</h1>
        {hasMemories && (
          <p className="text-sm text-muted-foreground">
            {memories.length} moment{memories.length !== 1 ? 's' : ''} across time
          </p>
        )}
      </div>

      {hasMemories ? (
        <div className="px-5 pt-4 space-y-10">
          {QUARTERS.map(q => {
            const qMems = byQuarter[q];
            if (!qMems) return null;
            const isCurrent = q === currentQ;
            return (
              <div key={q} ref={el => { quarterRefs.current[q] = el; }} className="animate-fade-in">
                <div className="flex items-center gap-2.5 mb-4">
                  <p className="label-text">{q}</p>
                  {isCurrent && (
                    <span className="text-[9px] uppercase tracking-wider font-bold px-2.5 py-0.5 rounded-full bg-primary/15 text-primary">
                      Now
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
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
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center px-8 py-20 text-center">
          <div className="relative w-36 h-36 mb-8">
            <div className="absolute inset-0 rounded-full" style={{ background: 'radial-gradient(circle, hsl(var(--primary) / 0.15), transparent 70%)' }} />
            <div className="absolute inset-0 flex items-center justify-center">
              <Plus className="w-10 h-10 text-muted-foreground/60" />
            </div>
          </div>
          <h2 className="font-display text-[22px] text-foreground mb-3">Your timeline is empty</h2>
          <p className="text-muted-foreground text-sm max-w-[260px] leading-relaxed mb-8">
            Start by adding a memory — something that happened, or something you're planning.
          </p>
          <button
            onClick={() => navigate('/emotions')}
            className="bg-primary text-primary-foreground font-semibold text-[15px] px-8 py-4 rounded-full active:scale-95 transition-transform"
          >
            Add your first memory
          </button>
        </div>
      )}

      {/* FAB */}
      {hasMemories && (
        <button
          onClick={() => navigate('/emotions')}
          className="fixed bottom-28 right-5 w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center active:scale-90 transition-transform z-20"
          style={{ boxShadow: '0 4px 24px hsl(var(--primary) / 0.35)' }}
        >
          <Plus className="w-6 h-6" />
        </button>
      )}

      <BottomNav />
    </div>
  );
}
