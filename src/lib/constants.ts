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
    color: '#FFDC58',
    dimColor: '#B89B2A',
    bgColor: '#2A2000',
    gradient: 'radial-gradient(circle at 40% 40%, #FFF3B0, #FFDC58 50%, #F0C830)',
  },
  growth: {
    id: 'growth',
    label: 'Growth',
    subtitle: 'Longing',
    color: '#64BFFF',
    dimColor: '#3A8AC4',
    bgColor: '#0A1A2E',
    gradient: 'radial-gradient(circle at 40% 40%, #B8E4FF, #64BFFF 50%, #3EA8F0)',
  },
  courage: {
    id: 'courage',
    label: 'Courage',
    subtitle: 'Adventure',
    color: '#FF8A65',
    dimColor: '#C4623A',
    bgColor: '#2A1208',
    gradient: 'radial-gradient(circle at 40% 40%, #FFCAB0, #FF8A65 50%, #F07040)',
  },
  peace: {
    id: 'peace',
    label: 'Peace',
    subtitle: 'Belonging',
    color: '#66E8A0',
    dimColor: '#3AAE6A',
    bgColor: '#0A2418',
    gradient: 'radial-gradient(circle at 40% 40%, #B8FFD8, #66E8A0 50%, #40D080)',
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
