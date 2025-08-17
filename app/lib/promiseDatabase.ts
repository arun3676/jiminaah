export interface PromiseEntry {
  id: string;
  title: string;
  description: string;
  category: PromiseCategory;
  inspiredSong: string;
  startDate: string;
  frequency: 'daily' | 'weekly' | 'custom';
  customDays?: number; // for custom frequency
  streak: number;
  bestStreak: number;
  history: PromiseHistory[];
  reflections: PromiseReflection[];
  isActive: boolean;
  createdAt: string;
}

export interface PromiseHistory {
  date: string;
  completed: boolean;
  note?: string;
}

export interface PromiseReflection {
  date: string;
  note: string;
  mood?: string;
}

export type PromiseCategory = 
  | 'Self-Love & Authenticity'
  | 'Resilience & Overcoming Challenges'
  | 'Growth & Transformation'
  | 'Dreams & Connections'
  | 'Empowerment & New Beginnings'
  | 'Hope & Positivity'
  | 'Passion & Joy'
  | 'Reflection & Independence';

export const promiseCategories: PromiseCategory[] = [
  'Self-Love & Authenticity',
  'Resilience & Overcoming Challenges',
  'Growth & Transformation',
  'Dreams & Connections',
  'Empowerment & New Beginnings',
  'Hope & Positivity',
  'Passion & Joy',
  'Reflection & Independence'
];

export const categoryInspiredSongs: Record<PromiseCategory, string[]> = {
  'Self-Love & Authenticity': [
    'Jimin - Promise',
    'Jimin - Filter',
    'Taylor Swift - Anti-Hero',
    'Taylor Swift - Bejeweled'
  ],
  'Resilience & Overcoming Challenges': [
    'Jimin - Lie',
    'Jimin - Set Me Free Pt.2',
    'Taylor Swift - Shake It Off',
    'Taylor Swift - Bad Blood',
    'Taylor Swift - Mean'
  ],
  'Growth & Transformation': [
    'Jimin - Like Crazy',
    'Jimin - Rebirth',
    'Taylor Swift - All Too Well',
    'Taylor Swift - Begin Again',
    'Taylor Swift - Fortnight'
  ],
  'Dreams & Connections': [
    'Jimin - Serendipity',
    'Jimin - Who',
    'Taylor Swift - Love Story',
    'Taylor Swift - Enchanted',
    'Taylor Swift - Cruel Summer'
  ],
  'Empowerment & New Beginnings': [
    'Jimin - Be Mine',
    'Jimin - Closer Than This',
    'Taylor Swift - Blank Space',
    'Taylor Swift - Karma',
    'Taylor Swift - ...Ready for It?'
  ],
  'Hope & Positivity': [
    'Jimin - Christmas Love',
    'Jimin - VIBE',
    'Taylor Swift - You Belong With Me',
    'Taylor Swift - Willow',
    'Taylor Swift - Long Live'
  ],
  'Passion & Joy': [
    'Jimin - Slow Dance',
    'Taylor Swift - Sparks Fly',
    'Taylor Swift - Lover',
    'Taylor Swift - Style'
  ],
  'Reflection & Independence': [
    'Jimin - Alone',
    'Jimin - Face-Off',
    'Taylor Swift - Wildest Dreams',
    'Taylor Swift - We Are Never Ever Getting Back Together',
    'Taylor Swift - Should\'ve Said No'
  ]
};

export const achievementBadges = [
  { streak: 3, name: 'First Steps', icon: '🌱', description: 'Started your journey' },
  { streak: 7, name: 'Week Warrior', icon: '⚡', description: 'One week strong' },
  { streak: 14, name: 'Fortnight Fighter', icon: '🔥', description: 'Two weeks of dedication' },
  { streak: 30, name: 'Monthly Master', icon: '👑', description: 'A full month of commitment' },
  { streak: 50, name: 'Promise Keeper', icon: '💎', description: 'Unbreakable dedication' },
  { streak: 100, name: 'Century Champion', icon: '🏆', description: 'Legendary commitment' }
];

export function generatePromiseId(): string {
  return `promise_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export function getRandomInspiredSong(category: PromiseCategory): string {
  const songs = categoryInspiredSongs[category];
  return songs[Math.floor(Math.random() * songs.length)];
}

export function calculateStreak(history: PromiseHistory[], frequency: 'daily' | 'weekly' | 'custom'): number {
  if (history.length === 0) return 0;

  const today = new Date().toISOString().split('T')[0];
  const sortedHistory = history.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  let streak = 0;
  let currentDate = new Date(today);
  
  for (const entry of sortedHistory) {
    const entryDate = new Date(entry.date);
    const daysDiff = Math.floor((currentDate.getTime() - entryDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (frequency === 'daily' && daysDiff === streak && entry.completed) {
      streak++;
      currentDate = new Date(entryDate);
    } else if (frequency === 'weekly' && daysDiff <= (streak + 1) * 7 && entry.completed) {
      streak++;
      currentDate = new Date(entryDate);
    } else {
      break;
    }
  }
  
  return streak;
}

export function shouldShowPromiseToday(promise: PromiseEntry): boolean {
  const today = new Date().toISOString().split('T')[0];
  const todayEntry = promise.history.find(h => h.date === today);
  
  if (todayEntry?.completed) return false;
  
  if (promise.frequency === 'daily') return true;
  
  if (promise.frequency === 'weekly') {
    const startDate = new Date(promise.startDate);
    const daysSinceStart = Math.floor((new Date().getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    return daysSinceStart % 7 === 0;
  }
  
  if (promise.frequency === 'custom' && promise.customDays) {
    const startDate = new Date(promise.startDate);
    const daysSinceStart = Math.floor((new Date().getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    return daysSinceStart % promise.customDays === 0;
  }
  
  return false;
}

export function getCompletionRate(history: PromiseHistory[], days: number = 30): number {
  const recentHistory = history.slice(-days);
  if (recentHistory.length === 0) return 0;
  
  const completed = recentHistory.filter(h => h.completed).length;
  return Math.round((completed / recentHistory.length) * 100);
}

export function getNextBadge(currentStreak: number) {
  return achievementBadges.find(badge => badge.streak > currentStreak);
}

export function getEarnedBadges(streak: number) {
  return achievementBadges.filter(badge => badge.streak <= streak);
}
