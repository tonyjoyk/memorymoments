export type EmotionType = 'joy' | 'growth' | 'courage' | 'peace';

export interface EmotionConfig {
  id: EmotionType;
  label: string;
  subtitle: string;
  color: string;
  dimColor: string;
  bgColor: string;
  gradient: string;
}

export const EMOTIONS: Record<EmotionType, EmotionConfig> = {
  joy: {
    id: 'joy',
    label: 'Joy',
    subtitle: 'Celebration',
    color: '#FCE354',
    dimColor: '#a8861e',
    bgColor: '#1e1800',
    gradient: 'radial-gradient(circle at 40% 40%, #FFF1A0, #FCE354 50%, #E0C830)',
  },
  growth: {
    id: 'growth',
    label: 'Growth',
    subtitle: 'Longing',
    color: '#5FD8FF',
    dimColor: '#2d7a9a',
    bgColor: '#071520',
    gradient: 'radial-gradient(circle at 40% 40%, #B0EDFF, #5FD8FF 50%, #3ABDE0)',
  },
  courage: {
    id: 'courage',
    label: 'Courage',
    subtitle: 'Adventure',
    color: '#FF7D56',
    dimColor: '#a0511a',
    bgColor: '#180c00',
    gradient: 'radial-gradient(circle at 40% 40%, #FFB89A, #FF7D56 50%, #E86A3A)',
  },
  peace: {
    id: 'peace',
    label: 'Peace',
    subtitle: 'Belonging',
    color: '#6AFFA5',
    dimColor: '#2d6e40',
    bgColor: '#061209',
    gradient: 'radial-gradient(circle at 40% 40%, #B8FFD4, #6AFFA5 50%, #45E085)',
  },
};

export const EMOTION_LIST = Object.values(EMOTIONS);

export interface ActionStep {
  id: string;
  text: string;
  completed: boolean;
}

export interface Memory {
  id: string;
  title: string;
  emotions: EmotionType[];
  quarter: string;
  whyMatters: string;
  whatYoudMiss: string;
  actions: ActionStep[];
  isCompleted: boolean;
  reflection?: string;
  createdAt: string;
}

export const QUARTERS = [
  'Jan – Mar 2025',
  'Apr – Jun 2025',
  'Jul – Sep 2025',
  'Oct – Dec 2025',
  'Jan – Mar 2026',
  'Apr – Jun 2026',
  'Jul – Sep 2026',
  'Oct – Dec 2026',
];

export const ONBOARDING_KEY = 'memory-moments-onboarded';
