import { Check } from 'lucide-react';

interface ActionItemProps {
  text: string;
  completed: boolean;
  onToggle: () => void;
}

export default function ActionItem({ text, completed, onToggle }: ActionItemProps) {
  return (
    <button
      onClick={onToggle}
      className="flex items-center gap-3 w-full text-left py-2.5 group"
    >
      <div
        className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
          completed
            ? 'bg-primary border-primary'
            : 'border-border-subtle bg-transparent'
        }`}
        style={completed ? {} : { borderColor: 'hsl(var(--border-subtle))' }}
      >
        {completed && <Check className="w-3.5 h-3.5 text-primary-foreground" />}
      </div>
      <span
        className={`text-sm transition-colors ${
          completed ? 'text-muted-foreground line-through' : 'text-foreground'
        }`}
      >
        {text}
      </span>
    </button>
  );
}
