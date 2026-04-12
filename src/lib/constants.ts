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
    color: '#F5C842',
    dimColor: '#a8861e',
    bgColor: '#1e1800',
    gradient: 'radial-gradient(circle at 40% 40%, #fde68a, #F5C842 50%, #a8861e)',
  },
  growth: {
    id: 'growth',
    label: 'Growth',
    subtitle: 'Longing',
    color: '#4A90D9',
    dimColor: '#2d5a8a',
    bgColor: '#071525',
    gradient: 'radial-gradient(circle at 40% 40%, #93c5fd, #4A90D9 50%, #2d5a8a)',
  },
  courage: {
    id: 'courage',
    label: 'Courage',
    subtitle: 'Adventure',
    color: '#E8823A',
    dimColor: '#a0511a',
    bgColor: '#180c00',
    gradient: 'radial-gradient(circle at 40% 40%, #fdba74, #E8823A 50%, #a0511a)',
  },
  peace: {
    id: 'peace',
    label: 'Peace',
    subtitle: 'Belonging',
    color: '#5BAD72',
    dimColor: '#2d6e40',
    bgColor: '#061209',
    gradient: 'radial-gradient(circle at 40% 40%, #86efac, #5BAD72 50%, #2d6e40)',
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

export const SAMPLE_MEMORIES: Memory[] = [
  {
    id: '1',
    title: 'Netherlands trip with college friends',
    emotions: ['joy', 'courage'],
    quarter: 'Apr – Jun 2025',
    whyMatters: 'Haven\'t traveled with this group since graduation. It\'s a chance to reconnect and make new memories together.',
    whatYoudMiss: 'The feeling of being young and carefree with people who knew you before life got complicated.',
    actions: [
      { id: 'a1', text: 'Book flights by March', completed: true },
      { id: 'a2', text: 'Plan Amsterdam itinerary', completed: false },
      { id: 'a3', text: 'Get travel insurance', completed: false },
    ],
    isCompleted: false,
    createdAt: '2025-02-15',
  },
  {
    id: '2',
    title: 'One year living in Goa',
    emotions: ['peace', 'growth'],
    quarter: 'Jan – Mar 2025',
    whyMatters: 'A full year of choosing a slower life. Proof that I can design my days instead of just surviving them.',
    whatYoudMiss: 'Morning walks to the beach, the sound of rain on a tin roof, and the version of myself that emerged here.',
    actions: [
      { id: 'b1', text: 'Write a reflection essay', completed: true },
      { id: 'b2', text: 'Photograph favourite spots', completed: true },
    ],
    isCompleted: true,
    reflection: 'This year changed everything. I learned to be still.',
    createdAt: '2025-01-10',
  },
  {
    id: '3',
    title: 'Solo trek in Coorg',
    emotions: ['courage'],
    quarter: 'Jul – Sep 2025',
    whyMatters: 'Pushing past comfort zones. Haven\'t done anything solo and physically challenging in a long time.',
    whatYoudMiss: 'The quiet pride of finishing something hard, alone.',
    actions: [
      { id: 'c1', text: 'Research trails', completed: false },
      { id: 'c2', text: 'Buy trekking shoes', completed: false },
    ],
    isCompleted: false,
    createdAt: '2025-03-20',
  },
  {
    id: '4',
    title: 'Ship Memory Moments',
    emotions: ['growth', 'joy'],
    quarter: 'Apr – Jun 2026',
    whyMatters: 'Building something meaningful from scratch. This is the project that proves I can create, not just consume.',
    whatYoudMiss: 'The satisfaction of seeing an idea become something real that others can use.',
    actions: [
      { id: 'd1', text: 'Finish MVP', completed: false },
      { id: 'd2', text: 'Get 10 beta users', completed: false },
      { id: 'd3', text: 'Write launch post', completed: false },
    ],
    isCompleted: false,
    createdAt: '2025-04-01',
  },
  {
    id: '5',
    title: 'Sunrise at Palolem beach',
    emotions: ['peace'],
    quarter: 'Oct – Dec 2025',
    whyMatters: 'A moment of perfect stillness. No agenda, no people, just the ocean and the light.',
    whatYoudMiss: 'That rare feeling of being exactly where you\'re supposed to be.',
    actions: [],
    isCompleted: true,
    reflection: 'Woke up at 5am and walked alone. The sky turned pink, then gold. I cried a little.',
    createdAt: '2025-11-15',
  },
];
