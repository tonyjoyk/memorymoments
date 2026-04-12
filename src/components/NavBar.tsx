import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface NavBarProps {
  title?: string;
  backTo?: string;
  rightAction?: React.ReactNode;
}

export default function NavBar({ title, backTo, rightAction }: NavBarProps) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between px-5 py-4 sticky top-0 z-10 bg-background/80 backdrop-blur-lg">
      {backTo ? (
        <button
          onClick={() => navigate(backTo)}
          className="w-10 h-10 flex items-center justify-center rounded-full active:bg-secondary transition-colors -ml-2"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
      ) : (
        <div className="w-10" />
      )}
      {title && (
        <h2 className="font-display text-lg text-foreground">{title}</h2>
      )}
      {rightAction || <div className="w-10" />}
    </div>
  );
}
