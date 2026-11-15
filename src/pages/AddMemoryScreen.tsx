import { useState } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { EmotionType, getQuarters, currentQuarter } from '@/lib/constants';
import { useMemories } from '@/contexts/MemoryContext';
import NavBar from '@/components/NavBar';
import EmotionTag from '@/components/EmotionTag';
import { Plus, X, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';

export default function AddMemoryScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const { addMemory } = useMemories();

  const emotions = (location.state?.emotions as EmotionType[]) || [];

  const [title, setTitle] = useState('');
  const [quarter, setQuarter] = useState(currentQuarter);
  const [quarterOptions] = useState(() => getQuarters());
  const [whyMatters, setWhyMatters] = useState('');
  const [whatYoudMiss, setWhatYoudMiss] = useState('');
  const [actions, setActions] = useState<{ id: string; text: string }[]>([]);
  const [newAction, setNewAction] = useState('');
  const [titleError, setTitleError] = useState(false);

  // Redirect if no emotions selected
  if (emotions.length === 0) {
    return <Navigate to="/emotions" replace />;
  }

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

      <div className="flex-1 px-5 pb-8 space-y-5">
        {/* Emotion tags */}
        <div className="flex flex-wrap gap-2">
          {emotions.map(e => (
            <EmotionTag key={e} emotion={e} />
          ))}
        </div>

        {/* Quarter */}
        <div>
          <label className="label-text block mb-2">When</label>
          <div className="relative">
            <select
              value={quarter}
              onChange={e => setQuarter(e.target.value)}
              className="w-full rounded-xl px-4 py-3.5 text-sm text-foreground border border-border focus:outline-none focus:ring-1 focus:ring-ring appearance-none pr-10"
              style={{ backgroundColor: 'hsl(var(--surface))' }}
            >
              {quarterOptions.map(q => (
                <option key={q} value={q}>{q}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          </div>
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
            className="w-full rounded-xl px-4 py-3.5 text-sm text-foreground border placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring transition-colors"
            style={{
              backgroundColor: 'hsl(var(--surface))',
              borderColor: titleError ? '#FF7D56' : 'hsl(var(--border))',
            }}
          />
          {titleError && (
            <p className="text-[11px] mt-1.5 font-medium" style={{ color: '#FF7D56' }}>Give your memory a title</p>
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
            className="w-full rounded-xl px-4 py-3.5 text-sm text-foreground border border-border placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring resize-none"
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
            className="w-full rounded-xl px-4 py-3.5 text-sm text-foreground border border-border placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring resize-none"
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
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-foreground border border-border"
                style={{ backgroundColor: 'hsl(var(--surface))' }}
              >
                <span className="flex-1">{a.text}</span>
                <button onClick={() => removeAction(a.id)} className="text-muted-foreground p-1 rounded-full active:bg-secondary transition-colors">
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
              className="flex-1 rounded-xl px-4 py-3 text-sm text-foreground border border-border placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              style={{ backgroundColor: 'hsl(var(--surface))' }}
            />
            <button
              onClick={addAction}
              disabled={!newAction.trim()}
              className="w-11 h-11 rounded-xl bg-secondary flex items-center justify-center text-foreground active:scale-95 transition-transform disabled:opacity-30"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="sticky bottom-0 p-5 bg-background/95 backdrop-blur-xl border-t border-border flex gap-3 safe-bottom">
        <button
          onClick={() => navigate(-1)}
          className="flex-1 py-3.5 rounded-full font-semibold text-sm border border-border text-foreground active:scale-[0.98] transition-transform"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="flex-1 py-3.5 rounded-full font-semibold text-sm bg-primary text-primary-foreground active:scale-[0.98] transition-transform"
        >
          Save memory
        </button>
      </div>
    </div>
  );
}
