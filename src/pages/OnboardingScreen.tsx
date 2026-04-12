import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmotionOrb from '@/components/EmotionOrb';
import { ONBOARDING_KEY } from '@/lib/constants';

const SLIDES = [
  {
    title: 'Memory\nMoments',
    body: 'Log the moments that matter — past, planned, and everything in between.',
    orbs: true,
  },
  {
    title: 'Feel it first',
    body: 'Start by choosing how a memory feels. Joy, growth, courage, peace — or a mix.',
    orbs: false,
    emotion: 'joy' as const,
  },
  {
    title: 'Then capture it',
    body: 'Give it a name, a reason it matters, and what you\'d miss if it never happened.',
    orbs: false,
    emotion: 'growth' as const,
  },
  {
    title: 'Watch it grow',
    body: 'Your timeline fills with moments — planned and past — colour-coded by how they feel.',
    orbs: false,
    emotion: 'peace' as const,
  },
];

export default function OnboardingScreen() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const slide = SLIDES[step];
  const isLast = step === SLIDES.length - 1;

  const handleNext = () => {
    if (isLast) {
      localStorage.setItem(ONBOARDING_KEY, 'true');
      navigate('/timeline', { replace: true });
    } else {
      setStep(s => s + 1);
    }
  };

  const handleSkip = () => {
    localStorage.setItem(ONBOARDING_KEY, 'true');
    navigate('/timeline', { replace: true });
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-screen px-8 py-14 text-center safe-bottom">
      {/* Skip */}
      <div className="w-full flex justify-end">
        {!isLast ? (
          <button
            onClick={handleSkip}
            className="text-muted-foreground text-xs font-medium px-3 py-2 -mr-3 rounded-full active:bg-secondary transition-colors"
          >
            Skip
          </button>
        ) : (
          <div className="h-8" />
        )}
      </div>

      {/* Visual */}
      <div className="flex-1 flex flex-col items-center justify-center animate-fade-in" key={step}>
        {slide.orbs ? (
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
        ) : (
          <div className="mb-12">
            <EmotionOrb emotion={slide.emotion!} size={120} animate />
          </div>
        )}

        <h1 className="font-display text-[34px] leading-tight text-foreground mb-4 whitespace-pre-line">
          {slide.title}
        </h1>
        <p className="text-muted-foreground text-[15px] max-w-[280px] leading-relaxed">
          {slide.body}
        </p>
      </div>

      {/* Bottom */}
      <div className="w-full space-y-5">
        {/* Dots */}
        <div className="flex justify-center gap-2.5">
          {SLIDES.map((_, i) => (
            <div
              key={i}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === step ? 24 : 8,
                height: 8,
                backgroundColor: i === step ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground) / 0.25)',
              }}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="w-full py-4 rounded-full font-semibold text-[15px] bg-primary text-primary-foreground active:scale-[0.98] transition-transform"
        >
          {isLast ? 'Get started' : 'Continue'}
        </button>
      </div>
    </div>
  );
}
