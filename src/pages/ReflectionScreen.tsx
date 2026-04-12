import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMemories } from '@/contexts/MemoryContext';
import { EMOTIONS, EmotionType, EMOTION_LIST } from '@/lib/constants';
import NavBar from '@/components/NavBar';
import EmotionOrb from '@/components/EmotionOrb';
import { toast } from 'sonner';

export default function ReflectionScreen() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getMemory, completeMemory } = useMemories();

  const memory = getMemory(id || '');
  const [reflection, setReflection] = useState('');
  const [selectedEmotions, setSelectedEmotions] = useState<EmotionType[]>(memory?.emotions || []);

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

  const toggleEmotion = (e: EmotionType) => {
    setSelectedEmotions(prev =>
      prev.includes(e) ? prev.filter(x => x !== e) : [...prev, e]
    );
  };

  const handleSave = () => {
    if (selectedEmotions.length === 0) return;
    completeMemory(memory.id, reflection.trim() || undefined, selectedEmotions);
    toast.success('Memory marked as happened');
    navigate('/timeline');
  };

  const primaryEmotion = EMOTIONS[selectedEmotions[0] || memory.emotions[0]];

  return (
    <div className="min-h-screen flex flex-col">
      <div
        style={{
          background: `linear-gradient(180deg, ${primaryEmotion.bgColor} 0%, hsl(0 0% 5.1%) 100%)`,
        }}
      >
        <NavBar backTo={`/memory/${memory.id}`} transparent />
        <div className="px-5 pb-8 text-center">
          <p className="label-text mb-3">This happened</p>
          <h1 className="font-display text-[24px] text-foreground leading-snug">
            {memory.title}
          </h1>
        </div>
      </div>

      <div className="flex-1 px-5 py-6 space-y-8">
        <div>
          <p className="label-text mb-4">How did it actually feel?</p>
          <div className="grid grid-cols-2 gap-3">
            {EMOTION_LIST.map(e => {
              const isSelected = selectedEmotions.includes(e.id);
              return (
                <button
                  key={e.id}
                  onClick={() => toggleEmotion(e.id)}
                  className="flex items-center gap-3 p-4 rounded-xl transition-all duration-200 active:scale-[0.97]"
                  style={{
                    backgroundColor: isSelected ? e.bgColor : 'hsl(var(--surface))',
                    border: isSelected ? `1.5px solid ${e.dimColor}` : '1.5px solid transparent',
                  }}
                >
                  <EmotionOrb emotion={e.id} size={32} />
                  <span className={`text-sm font-medium ${isSelected ? 'text-foreground' : 'text-muted-foreground'}`}>{e.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <p className="label-text mb-2">A small reflection</p>
          <textarea
            value={reflection}
            onChange={e => setReflection(e.target.value)}
            placeholder="How do you feel now that it's happened?"
            rows={3}
            maxLength={500}
            className="w-full rounded-xl px-4 py-3.5 text-sm text-foreground border border-border placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring resize-none"
            style={{ backgroundColor: 'hsl(var(--surface))' }}
          />
        </div>
      </div>

      <div className="sticky bottom-0 p-5 bg-background/95 backdrop-blur-xl border-t border-border safe-bottom">
        <button
          onClick={handleSave}
          disabled={selectedEmotions.length === 0}
          className="w-full py-4 rounded-full font-semibold text-[15px] active:scale-[0.98] transition-transform disabled:opacity-30"
          style={{
            backgroundColor: primaryEmotion.color,
            color: '#000000',
          }}
        >
          Save reflection
        </button>
      </div>
    </div>
  );
}
