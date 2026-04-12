import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMemories } from '@/contexts/MemoryContext';
import { EMOTIONS, EmotionType, EMOTION_LIST } from '@/lib/constants';
import NavBar from '@/components/NavBar';
import EmotionOrb from '@/components/EmotionOrb';

export default function ReflectionScreen() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getMemory, completeMemory } = useMemories();

  const memory = getMemory(id || '');
  const [reflection, setReflection] = useState('');
  const [selectedEmotions, setSelectedEmotions] = useState<EmotionType[]>(memory?.emotions || []);

  if (!memory) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Memory not found.
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
    navigate('/memories');
  };

  const primaryEmotion = EMOTIONS[selectedEmotions[0] || memory.emotions[0]];

  return (
    <div className="min-h-screen flex flex-col">
      <div
        style={{
          background: `linear-gradient(180deg, ${primaryEmotion.bgColor} 0%, hsl(0 0% 5.1%) 100%)`,
        }}
      >
        <NavBar backTo={`/memory/${memory.id}`} />
        <div className="px-5 pb-8 text-center">
          <p className="label-text mb-3">This happened</p>
          <h1 className="font-display text-[24px] text-foreground leading-snug">
            {memory.title}
          </h1>
        </div>
      </div>

      <div className="flex-1 px-5 py-6 space-y-8">
        {/* Re-select emotions */}
        <div>
          <p className="label-text mb-3">How did it actually feel?</p>
          <div className="grid grid-cols-4 gap-3">
            {EMOTION_LIST.map(e => {
              const isSelected = selectedEmotions.includes(e.id);
              return (
                <button
                  key={e.id}
                  onClick={() => toggleEmotion(e.id)}
                  className="flex flex-col items-center gap-2 p-3 rounded-xl transition-all"
                  style={{
                    backgroundColor: isSelected ? e.bgColor : 'transparent',
                    border: isSelected ? `1.5px solid ${e.dimColor}` : '1.5px solid transparent',
                  }}
                >
                  <EmotionOrb emotion={e.id} size={36} />
                  <span className="text-[10px] text-muted-foreground">{e.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Reflection */}
        <div>
          <p className="label-text mb-2">A small reflection</p>
          <textarea
            value={reflection}
            onChange={e => setReflection(e.target.value)}
            placeholder="How do you feel now that it's happened?"
            rows={3}
            className="w-full rounded-lg px-4 py-3 text-sm text-foreground border border-border placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring resize-none"
            style={{ backgroundColor: 'hsl(var(--surface))' }}
          />
        </div>
      </div>

      <div className="sticky bottom-0 p-5 bg-background/90 backdrop-blur-lg border-t border-border">
        <button
          onClick={handleSave}
          disabled={selectedEmotions.length === 0}
          className="w-full py-3.5 rounded-full font-medium text-sm active:scale-[0.98] transition-transform disabled:opacity-30"
          style={{
            backgroundColor: primaryEmotion.color,
            color: '#0d0d0d',
          }}
        >
          Save reflection
        </button>
      </div>
    </div>
  );
}
