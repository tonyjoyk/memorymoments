import { useNavigate } from 'react-router-dom';
import EmotionOrb from '@/components/EmotionOrb';

export default function SplashScreen() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-8 text-center relative overflow-hidden">
      {/* Floating orbs */}
      <div className="relative w-48 h-48 mb-12">
        <div className="absolute top-0 left-4 animate-orb-float" style={{ animationDelay: '0s' }}>
          <EmotionOrb emotion="joy" size={80} />
        </div>
        <div className="absolute top-8 right-2 animate-orb-float" style={{ animationDelay: '1s' }}>
          <EmotionOrb emotion="growth" size={64} />
        </div>
        <div className="absolute bottom-4 left-0 animate-orb-float" style={{ animationDelay: '2s' }}>
          <EmotionOrb emotion="courage" size={56} />
        </div>
        <div className="absolute bottom-0 right-8 animate-orb-float" style={{ animationDelay: '0.5s' }}>
          <EmotionOrb emotion="peace" size={72} />
        </div>
      </div>

      <h1 className="font-display text-[38px] leading-tight text-foreground mb-3">
        Memory<br />Moments
      </h1>
      <p className="text-muted-foreground text-sm max-w-[240px] mb-12 leading-relaxed">
        Log the moments that matter — past, planned, and everything in between.
      </p>

      <button
        onClick={() => navigate('/timeline')}
        className="bg-primary text-primary-foreground font-medium text-sm px-8 py-3.5 rounded-full active:scale-95 transition-transform"
      >
        Get started
      </button>
    </div>
  );
}
