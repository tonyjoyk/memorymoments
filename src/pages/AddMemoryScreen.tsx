import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { EmotionType, QUARTERS } from '@/lib/constants';
import { useMemories } from '@/contexts/MemoryContext';
import NavBar from '@/components/NavBar';
import EmotionTag from '@/components/EmotionTag';
import { Plus, X } from 'lucide-react';
import { toast } from 'sonner';

export default function AddMemoryScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const { addMemory } = useMemories();

  const emotions = (location.state?.emotions as EmotionType[]) || [];

  // Redirect if no emotions selected
  if (emotions.length === 0) {
    navigate('/emotions', { replace: true });
    return null;
  }

  const [title, setTitle] = useState('');
  const [quarter, setQuarter] = useState(QUARTERS[4]);
  const [whyMatters, setWhyMatters] = useState('');
  const [whatYoudMiss, setWhatYoudMiss] = useState('');
  const [actions, setActions] = useState<{ id: string; text: string }[]>([]);
  const [newAction, setNewAction] = useState('');
  const [titleError, setTitleError] = useState(false);

  const addAction = () => {
    if (!newAction.trim()) return;
    setActions(prev => [...prev, { id: crypto.randomUUID(), text: newAction.trim() }]);
    setNewAction('');
  };

  const removeAction = (id: string) => {
    setActions(prev => prev.filter(a => a.id !== id));
  };

  const handleSave = () => {
    if (!title.trim()) {
      setTitleError(true);
      return;
    }
    addMemory({
      title: title.trim(),
      emotions,
      quarter,
      whyMatters: whyMatters.trim(),
      whatYoudMiss: whatYoudMiss.trim(),
      actions: actions.map(a => ({ ...a, completed: false })),
      isCompleted: false,
    });
    toast.success('Memory saved');
    navigate('/timeline');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar title="New memory" backTo="/emotions" />

      <div className="flex-1 px-5 pb-8 space-y-6">
        {/* Emotion tags */}
        <div className="flex flex-wrap gap-2">
          {emotions.map(e => (
            <EmotionTag key={e} emotion={e} />
          ))}
        </div>

        {/* Quarter */}
        <div>
          <label className="label-text block mb-2">When</label>
          <select
            value={quarter}
            onChange={e => setQuarter(e.target.value)}
            className="w-full rounded-lg px-4 py-3 text-sm text-foreground border border-border focus:outline-none focus:ring-1 focus:ring-ring appearance-none"
            style={{ backgroundColor: 'hsl(var(--surface))' }}
          >
            {QUARTERS.map(q => (
              <option key={q} value={q}>{q}</option>
            ))}
          </select>
        </div>

        {/* Title */}
        <div>
          <label className="label-text block mb-2">Memory title *</label>
          <input
            type="text"
            value={title}
            onChange={e => { setTitle(e.target.value); setTitleError(false); }}
            placeholder="What's the moment?"
            maxLength={100}
            className="w-full rounded-lg px-4 py-3 text-sm text-foreground border placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
            style={{
              backgroundColor: 'hsl(var(--surface))',
              borderColor: titleError ? '#FF7D56' : 'hsl(var(--border))',
            }}
          />
          {titleError && (
            <p className="text-[11px] mt-1.5" style={{ color: '#FF7D56' }}>Give your memory a title</p>
          )}
        </div>

        {/* Why */}
        <div>
          <label className="label-text block mb-2">Why does this matter?</label>
          <textarea
            value={whyMatters}
            onChange={e => setWhyMatters(e.target.value)}
            placeholder="What makes this memory significant?"
            rows={3}
            maxLength={500}
            className="w-full rounded-lg px-4 py-3 text-sm text-foreground border border-border placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring resize-none"
            style={{ backgroundColor: 'hsl(var(--surface))' }}
          />
        </div>

        {/* Miss */}
        <div>
          <label className="label-text block mb-2">What would you miss?</label>
          <textarea
            value={whatYoudMiss}
            onChange={e => setWhatYoudMiss(e.target.value)}
            placeholder="If this didn't happen, what would be lost?"
            rows={3}
            maxLength={500}
            className="w-full rounded-lg px-4 py-3 text-sm text-foreground border border-border placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring resize-none"
            style={{ backgroundColor: 'hsl(var(--surface))' }}
          />
        </div>

        {/* Action steps */}
        <div>
          <label className="label-text block mb-2">Action steps (optional)</label>
          <div className="space-y-2 mb-3">
            {actions.map(a => (
              <div
                key={a.id}
                className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm text-foreground"
                style={{ backgroundColor: 'hsl(var(--surface))' }}
              >
                <span className="flex-1">{a.text}</span>
                <button onClick={() => removeAction(a.id)} className="text-muted-foreground p-1">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={newAction}
              onChange={e => setNewAction(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addAction()}
              placeholder="Add a step…"
              maxLength={200}
              className="flex-1 rounded-lg px-4 py-2.5 text-sm text-foreground border border-border placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              style={{ backgroundColor: 'hsl(var(--surface))' }}
            />
            <button
              onClick={addAction}
              className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-foreground active:scale-95 transition-transform"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="sticky bottom-0 p-5 bg-background/90 backdrop-blur-lg border-t border-border flex gap-3">
        <button
          onClick={() => navigate(-1)}
          className="flex-1 py-3.5 rounded-full font-medium text-sm border border-border text-foreground active:scale-[0.98] transition-transform"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="flex-1 py-3.5 rounded-full font-medium text-sm bg-primary text-primary-foreground active:scale-[0.98] transition-transform"
        >
          Save memory
        </button>
      </div>
    </div>
  );
}
