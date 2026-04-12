import { useNavigate } from 'react-router-dom';
import { ONBOARDING_KEY } from '@/lib/constants';
import { useEffect } from 'react';

export default function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const hasOnboarded = localStorage.getItem(ONBOARDING_KEY);
    if (hasOnboarded) {
      navigate('/timeline', { replace: true });
    } else {
      navigate('/onboarding', { replace: true });
    }
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-8 h-8 rounded-full bg-primary animate-pulse" />
    </div>
  );
}
