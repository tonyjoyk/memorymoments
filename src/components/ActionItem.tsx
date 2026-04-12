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
      className="flex items-center gap-3 w-full text-left py-3 group active:opacity-70 transition-opacity"
    >
      <div
        className={`w-[22px] h-[22px] rounded-md border-[1.5px] flex items-center justify-center shrink-0 transition-all duration-200 ${
          completed
            ? 'bg-primary border-primary'
            : 'border-muted-foreground/30 bg-transparent'
        }`}
      >
        {completed && <Check className="w-3.5 h-3.5 text-primary-foreground" strokeWidth={3} />}
      </div>
      <span
        className={`text-sm leading-snug transition-colors ${
          completed ? 'text-muted-foreground line-through' : 'text-foreground'
        }`}
      >
        {text}
      </span>
    </button>
  );
}
