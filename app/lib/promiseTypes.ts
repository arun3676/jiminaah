export type PromiseFrequency = 'daily' | 'weekly';

export type PromiseCategory = 
  | 'Self-Love'
  | 'Health & Wellness'
  | 'Creativity'
  | 'Relationships'
  | 'Growth'
  | 'Mindfulness';

export interface PromiseHistory {
  date: string; // YYYY-MM-DD format
  completed: boolean;
  notes?: string;
}

export interface Promise {
  id: string;
  title: string;
  description?: string;
  category: PromiseCategory;
  inspiredSong: string;
  inspiredArtist: string;
  frequency: PromiseFrequency;
  streak: number;
  history: PromiseHistory[];
  notes?: string;
  createdAt: string;
  lastCompleted?: string;
}

export interface PromiseStats {
  activeCount: number;
  dueToday: Promise[];
  totalStreak: number;
}

// Song suggestions based on categories and moods
export const CATEGORY_SONGS = {
  'Self-Love': [
    { song: 'Serendipity', artist: 'Jimin (BTS)', message: 'Love yourself like the universe loves you' },
    { song: 'ME!', artist: 'Taylor Swift', message: 'Celebrate your unique self every day' },
    { song: 'Promise', artist: 'Jimin (BTS)', message: 'Keep the promises you make to yourself' }
  ],
  'Health & Wellness': [
    { song: 'Dynamite', artist: 'BTS', message: 'Light up your body with healthy choices' },
    { song: 'Shake It Off', artist: 'Taylor Swift', message: 'Shake off what doesn\'t serve you' },
    { song: 'Filter', artist: 'Jimin (BTS)', message: 'Filter out negativity, embrace wellness' }
  ],
  'Creativity': [
    { song: '22', artist: 'Taylor Swift', message: 'Feel free and creative like you\'re 22' },
    { song: 'Lie', artist: 'Jimin (BTS)', message: 'Express your truth through creativity' },
    { song: 'Enchanted', artist: 'Taylor Swift', message: 'Let creativity enchant your world' }
  ],
  'Relationships': [
    { song: 'Love Story', artist: 'Taylor Swift', message: 'Write your own love story with others' },
    { song: 'Spring Day', artist: 'BTS', message: 'Cherish connections that last through seasons' },
    { song: 'Who', artist: 'Jimin', message: 'Be authentic in all your relationships' }
  ],
  'Growth': [
    { song: 'The Best Day', artist: 'Taylor Swift', message: 'Every day is a chance to grow' },
    { song: 'Reflection', artist: 'Jimin (BTS)', message: 'Reflect and grow from every experience' },
    { song: 'Begin Again', artist: 'Taylor Swift', message: 'Growth means beginning again, better' }
  ],
  'Mindfulness': [
    { song: 'Breathe Me', artist: 'Jimin (BTS)', message: 'Breathe mindfully through each moment' },
    { song: 'Soon You\'ll Get Better', artist: 'Taylor Swift', message: 'Be present with hope and patience' },
    { song: 'Filter', artist: 'Jimin (BTS)', message: 'Filter your thoughts with mindful awareness' }
  ]
};

export const MOTIVATIONAL_MESSAGES = {
  'Self-Love': "Like Jimin's 'Promise', you're keeping your word to love yourself!",
  'Health & Wellness': "Great job! Like 'Dynamite', you're lighting up your wellness journey!",
  'Creativity': "Amazing! Your creative spirit shines like Taylor's '22'!",
  'Relationships': "Beautiful! You're writing your own 'Love Story' with meaningful connections!",
  'Growth': "Wonderful! Like 'Begin Again', you're growing stronger every day!",
  'Mindfulness': "Perfect! You're breathing mindfully like Jimin's gentle wisdom!"
};
