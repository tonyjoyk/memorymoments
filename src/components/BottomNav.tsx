import { useLocation, useNavigate } from 'react-router-dom';
import { Clock, Circle } from 'lucide-react';

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  const tabs = [
    { path: '/timeline', label: 'Timeline', icon: Clock },
    { path: '/all', label: 'All Memories', icon: Circle },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-20 bg-background/90 backdrop-blur-lg border-t border-border">
      <div className="max-w-lg mx-auto flex">
        {tabs.map(tab => {
          const isActive = location.pathname === tab.path;
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className={`flex-1 flex flex-col items-center gap-1 py-3 transition-colors ${
                isActive ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span className="text-[11px] font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
