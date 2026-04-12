import { useMemories } from '@/contexts/MemoryContext';
import MemoryCard from '@/components/MemoryCard';
import BottomNav from '@/components/BottomNav';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function HomeScreen() {
  const { memories } = useMemories();
  const navigate = useNavigate();

  const planned = memories.filter(m => !m.isCompleted);
  const past = memories.filter(m => m.isCompleted);

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <div className="px-5 pt-14 pb-6">
        <h1 className="font-display text-[28px] text-foreground mb-1">Your memories</h1>
        <p className="text-sm text-muted-foreground">
          {memories.length} moment{memories.length !== 1 ? 's' : ''} logged
        </p>
      </div>

      {/* Planned */}
      {planned.length > 0 && (
        <div className="px-5 mb-6">
          <p className="label-text mb-3">Planned</p>
          <div className="space-y-3">
            {planned.map(m => (
              <MemoryCard key={m.id} memory={m} />
            ))}
          </div>
        </div>
      )}

      {/* Past */}
      {past.length > 0 && (
        <div className="px-5 mb-6">
          <p className="label-text mb-3">Past</p>
          <div className="space-y-3">
            {past.map(m => (
              <MemoryCard key={m.id} memory={m} />
            ))}
          </div>
        </div>
      )}

      {memories.length === 0 && (
        <div className="flex flex-col items-center justify-center px-8 py-20 text-center">
          <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
            <Plus className="w-6 h-6 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground text-sm">No memories yet. Start by adding your first one.</p>
        </div>
      )}

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
