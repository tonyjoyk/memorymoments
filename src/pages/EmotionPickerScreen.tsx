import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EmotionType, EMOTION_LIST } from '@/lib/constants';
import EmotionOrb from '@/components/EmotionOrb';
import NavBar from '@/components/NavBar';

export default function EmotionPickerScreen() {
  const [selected, setSelected] = useState<EmotionType[]>([]);
  const navigate = useNavigate();

  const toggle = (id: EmotionType) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]
    );
  };

  const handleContinue = () => {
    if (selected.length === 0) return;
    navigate('/add', { state: { emotions: selected } });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar backTo="/timeline" />

      <div className="flex-1 px-5 pb-8">
        <div className="mb-8">
          <h1 className="font-display text-[26px] text-foreground mb-2 leading-snug">How does this memory feel?</h1>
          <p className="text-sm text-muted-foreground leading-relaxed">You can mix feelings — most memories carry more than one.</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {EMOTION_LIST.map(emotion => {
            const isSelected = selected.includes(emotion.id);
            return (
              <button
                key={emotion.id}
                onClick={() => toggle(emotion.id)}
                className="rounded-2xl p-6 transition-all duration-200 active:scale-[0.95] flex flex-col items-center gap-4"
                style={{
                  backgroundColor: isSelected ? emotion.bgColor : 'hsl(var(--surface))',
                  border: `1.5px solid ${isSelected ? emotion.dimColor : 'transparent'}`,
                  boxShadow: isSelected ? `0 0 24px ${emotion.color}15` : 'none',
                }}
              >
                <EmotionOrb emotion={emotion.id} size={60} />
                <div className="text-center">
                  <p className="text-sm font-semibold text-foreground">{emotion.label}</p>
                  <p className="text-[11px] text-muted-foreground mt-1">{emotion.subtitle}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Continue button */}
      <div className="sticky bottom-0 p-5 bg-background/95 backdrop-blur-xl border-t border-border safe-bottom">
        <button
          onClick={handleContinue}
          disabled={selected.length === 0}
          className="w-full py-4 rounded-full font-semibold text-[15px] transition-all disabled:opacity-30 disabled:cursor-not-allowed bg-primary text-primary-foreground active:scale-[0.98]"
        >
          {selected.length === 0 ? 'Select an emotion' : `Continue with ${selected.length} feeling${selected.length > 1 ? 's' : ''}`}
        </button>
      </div>
    </div>
  );
}
