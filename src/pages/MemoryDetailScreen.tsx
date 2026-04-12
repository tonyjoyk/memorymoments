import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMemories } from '@/contexts/MemoryContext';
import { EMOTIONS } from '@/lib/constants';
import NavBar from '@/components/NavBar';
import EmotionTag from '@/components/EmotionTag';
import ActionItem from '@/components/ActionItem';
import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';

export default function MemoryDetailScreen() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getMemory, toggleAction, deleteMemory } = useMemories();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const memory = getMemory(id || '');
  if (!memory) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-8 text-center">
        <p className="text-muted-foreground text-sm mb-4">This memory doesn't exist.</p>
        <button
          onClick={() => navigate('/timeline')}
          className="text-primary text-sm font-semibold"
        >
          Back to timeline
        </button>
      </div>
    );
  }

  const primaryEmotion = EMOTIONS[memory.emotions[0]];

  const handleDelete = () => {
    deleteMemory(memory.id);
    toast.success('Memory deleted');
    navigate('/timeline', { replace: true });
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero with emotion tint */}
      <div
        className="relative"
        style={{
          background: `linear-gradient(180deg, ${primaryEmotion.bgColor} 0%, hsl(0 0% 5.1%) 100%)`,
        }}
      >
        <NavBar
          backTo="/timeline"
          transparent
          rightAction={
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="w-10 h-10 flex items-center justify-center rounded-full active:bg-white/10 transition-colors -mr-2"
              aria-label="Delete memory"
            >
              <Trash2 className="w-[18px] h-[18px] text-muted-foreground" />
            </button>
          }
        />
        <div className="px-5 pb-8 pt-1">
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
            <p className="label-text mb-2">
              Action steps · {memory.actions.filter(a => a.completed).length}/{memory.actions.length}
            </p>
            <div className="rounded-xl p-4" style={{ backgroundColor: 'hsl(var(--surface))' }}>
              {memory.actions.map((action, i) => (
                <div key={action.id}>
                  <ActionItem
                    text={action.text}
                    completed={action.completed}
                    onToggle={() => toggleAction(memory.id, action.id)}
                  />
                  {i < memory.actions.length - 1 && (
                    <div className="border-b border-border/50 ml-[34px]" />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {memory.isCompleted && memory.reflection && (
          <div
            className="rounded-xl p-5 border"
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
      <div className="sticky bottom-0 p-5 bg-background/95 backdrop-blur-xl border-t border-border flex gap-3 safe-bottom">
        <button
          onClick={() => navigate(-1)}
          className="flex-1 py-3.5 rounded-full font-semibold text-sm border border-border text-foreground active:scale-[0.98] transition-transform"
        >
          Back
        </button>
        {!memory.isCompleted && (
          <button
            onClick={() => navigate(`/reflect/${memory.id}`)}
            className="flex-1 py-3.5 rounded-full font-semibold text-sm active:scale-[0.98] transition-transform"
            style={{
              backgroundColor: primaryEmotion.color,
              color: '#000000',
            }}
          >
            This happened ✦
          </button>
        )}
      </div>

      {/* Delete confirmation overlay */}
      {showDeleteConfirm && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center animate-fade-overlay"
          style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
          onClick={() => setShowDeleteConfirm(false)}
        >
          <div
            className="w-full max-w-lg rounded-t-2xl p-6 space-y-4 animate-slide-up"
            style={{ backgroundColor: 'hsl(var(--card))' }}
            onClick={e => e.stopPropagation()}
          >
            {/* Handle bar */}
            <div className="w-10 h-1 rounded-full bg-muted-foreground/30 mx-auto -mt-1 mb-2" />
            <h3 className="font-display text-lg text-foreground">Delete this memory?</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">This can't be undone. The memory and its reflection will be permanently removed.</p>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 py-3.5 rounded-full font-semibold text-sm border border-border text-foreground active:scale-[0.98] transition-transform"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 py-3.5 rounded-full font-semibold text-sm active:scale-[0.98] transition-transform"
                style={{ backgroundColor: 'hsl(var(--destructive))', color: 'hsl(var(--destructive-foreground))' }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
