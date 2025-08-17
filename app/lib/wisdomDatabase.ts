export type Feeling = "Happy" | "Sad" | "Anxious" | "Depressed" | "Mixed" | "Empowered" | "Lonely" | "Excited" | "Confused" | "Hopeful";

export const FEELINGS: Feeling[] = [
  "Happy", "Sad", "Anxious", "Depressed", "Mixed", 
  "Empowered", "Lonely", "Excited", "Confused", "Hopeful"
];

export interface WisdomEntry {
  id: string;
  message: string;
  song: string;
  artist: string;
  category: string;
  keywords: string[];
  gradient: string;
  icon: string;
  feelings: Feeling[];
  dailyTip: string;
}

export const wisdomDatabase: WisdomEntry[] = [
  // Happy entries
  {
    id: 'jimin-serendipity-happy',
    message: "Inspired by Jimin's 'Serendipity': Let joyful surprises fill your day with light and warmth.",
    song: "Serendipity",
    artist: "Jimin",
    category: "Joy & Celebration",
    keywords: ["joy", "surprise", "light", "warmth", "serendipity"],
    gradient: "from-pink-300 via-purple-400 to-blue-500",
    icon: "✨",
    feelings: ["Happy"],
    dailyTip: "Share a smile with someone today"
  },
  {
    id: 'taylor-lovestory-happy',
    message: "Inspired by Taylor Swift's 'Love Story': Revel in the magic of happy connections and beautiful moments.",
    song: "Love Story",
    artist: "Taylor Swift",
    category: "Joy & Celebration",
    keywords: ["love", "magic", "connection", "beautiful", "moments"],
    gradient: "from-yellow-400 via-pink-500 to-red-500",
    icon: "💕",
    feelings: ["Happy"],
    dailyTip: "Express gratitude to loved ones"
  },
  {
    id: 'jimin-vibe-happy',
    message: "Inspired by Jimin's 'VIBE': Sync with the positive energy flowing around you and within you.",
    song: "VIBE",
    artist: "Jimin",
    category: "Joy & Celebration",
    keywords: ["vibe", "positive", "energy", "sync", "flow"],
    gradient: "from-green-400 via-blue-500 to-purple-600",
    icon: "🌊",
    feelings: ["Happy"],
    dailyTip: "Play uplifting music"
  },

  // Sad entries
  {
    id: 'taylor-alltoowell-sad',
    message: "Inspired by Taylor Swift's 'All Too Well': Cherish bittersweet memories as they guide your healing journey.",
    song: "All Too Well",
    artist: "Taylor Swift",
    category: "Healing & Reflection",
    keywords: ["memories", "bittersweet", "healing", "journey", "cherish"],
    gradient: "from-gray-400 via-blue-500 to-purple-600",
    icon: "🍂",
    feelings: ["Sad"],
    dailyTip: "Listen to soothing music"
  },
  {
    id: 'jimin-lie-sad',
    message: "Inspired by Jimin's 'Lie': Gently acknowledge your inner pain to find the path forward.",
    song: "Lie",
    artist: "Jimin",
    category: "Healing & Reflection",
    keywords: ["pain", "acknowledge", "gentle", "path", "forward"],
    gradient: "from-gray-600 via-purple-600 to-pink-600",
    icon: "🌙",
    feelings: ["Sad"],
    dailyTip: "Take a quiet walk"
  },
  {
    id: 'taylor-fortnight-sad',
    message: "Inspired by Taylor Swift's 'Fortnight': Endure this sorrow knowing that renewal awaits you.",
    song: "Fortnight",
    artist: "Taylor Swift",
    category: "Healing & Reflection",
    keywords: ["endure", "sorrow", "renewal", "awaits", "time"],
    gradient: "from-blue-300 via-gray-400 to-purple-500",
    icon: "⏳",
    feelings: ["Sad"],
    dailyTip: "Rest and recharge"
  },

  // Anxious entries
  {
    id: 'taylor-antihero-anxious',
    message: "Inspired by Taylor Swift's 'Anti-Hero': Face your doubts with gentle self-compassion and understanding.",
    song: "Anti-Hero",
    artist: "Taylor Swift",
    category: "Self-Acceptance",
    keywords: ["doubts", "self-compassion", "understanding", "face", "gentle"],
    gradient: "from-purple-400 via-blue-500 to-teal-600",
    icon: "🤗",
    feelings: ["Anxious"],
    dailyTip: "Practice grounding breaths"
  },
  {
    id: 'jimin-likecrazy-anxious',
    message: "Inspired by Jimin's 'Like Crazy': Steady yourself amid the chaos to find your inner calm.",
    song: "Like Crazy",
    artist: "Jimin",
    category: "Finding Balance",
    keywords: ["steady", "chaos", "calm", "inner", "balance"],
    gradient: "from-purple-500 via-pink-500 to-red-500",
    icon: "🧘",
    feelings: ["Anxious"],
    dailyTip: "Meditate briefly"
  },

  // Empowered entries
  {
    id: 'taylor-shakeitoff-empowered',
    message: "Inspired by Taylor Swift's 'Shake It Off': Own your power and brush off any doubts that hold you back.",
    song: "Shake It Off",
    artist: "Taylor Swift",
    category: "Empowerment",
    keywords: ["power", "brush", "doubts", "hold", "back"],
    gradient: "from-pink-400 via-rose-500 to-red-500",
    icon: "💃",
    feelings: ["Empowered"],
    dailyTip: "Strike a confident pose"
  },
  {
    id: 'jimin-setmefree-empowered',
    message: "Inspired by Jimin's 'Set Me Free Pt.2': Break free with unshakeable confidence in who you are.",
    song: "Set Me Free Pt.2",
    artist: "Jimin",
    category: "Empowerment",
    keywords: ["break", "free", "confidence", "unshakeable", "who"],
    gradient: "from-indigo-600 via-purple-600 to-pink-600",
    icon: "🕊️",
    feelings: ["Empowered"],
    dailyTip: "Stand tall and proud"
  },

  // Lonely entries
  {
    id: 'jimin-who-lonely',
    message: "Inspired by Jimin's 'Who': Seek meaningful connections starting with kindness to yourself.",
    song: "Who",
    artist: "Jimin",
    category: "Connection",
    keywords: ["seek", "connections", "kindness", "yourself", "meaningful"],
    gradient: "from-teal-400 via-blue-500 to-purple-600",
    icon: "🔍",
    feelings: ["Lonely"],
    dailyTip: "Call a loved one"
  },

  // Depressed entries
  {
    id: "depressed-1",
    message: "Even in the darkest moments, remember that storms don't last forever. Your heart has weathered difficult times before and emerged stronger. Take it one breath at a time.",
    song: "Spring Day",
    artist: "Jimin (BTS)",
    category: "Healing & Reflection",
    keywords: ["darkness", "storms", "weathered", "stronger", "breath"],
    gradient: "from-gray-500 via-blue-600 to-purple-700",
    icon: "🌧️",
    feelings: ["Depressed"],
    dailyTip: "Step outside for fresh air"
  },
  {
    id: "depressed-2",
    message: "Your pain is valid, and it's okay to not be okay. Like winter eventually gives way to spring, this heavy feeling will lift. You are more resilient than you know.",
    song: "Soon You'll Get Better",
    artist: "Taylor Swift",
    category: "Healing & Reflection",
    keywords: ["pain", "valid", "winter", "spring", "resilient"],
    gradient: "from-gray-600 via-purple-500 to-blue-400",
    icon: "🌱",
    feelings: ["Depressed"],
    dailyTip: "Practice gentle self-care"
  },
  {
    id: "depressed-3",
    message: "Depression whispers lies, but your worth isn't determined by your lowest moments. You matter, you belong, and tomorrow holds possibilities you can't see today.",
    song: "Breathe Me",
    artist: "Jimin (BTS)",
    category: "Self-Acceptance",
    keywords: ["whispers", "lies", "worth", "matter", "possibilities"],
    gradient: "from-gray-400 via-purple-600 to-pink-500",
    icon: "💜",
    feelings: ["Depressed"],
    dailyTip: "Reach out to someone you trust"
  },

  // Mixed entries
  {
    id: "mixed-1",
    message: "Life is a beautiful contradiction - joy and sorrow dancing together. It's okay to feel everything at once. Your complexity makes you beautifully human.",
    song: "Serendipity",
    artist: "Jimin (BTS)",
    category: "Finding Balance",
    keywords: ["contradiction", "joy", "sorrow", "dancing", "complexity"],
    gradient: "from-yellow-400 via-purple-500 to-blue-600",
    icon: "🎭",
    feelings: ["Mixed"],
    dailyTip: "Journal your feelings"
  },
  {
    id: "mixed-2",
    message: "Like a kaleidoscope of emotions, you contain multitudes. There's beauty in feeling deeply, even when those feelings seem to contradict each other.",
    song: "The Moment I Knew",
    artist: "Taylor Swift",
    category: "Self-Discovery",
    keywords: ["kaleidoscope", "multitudes", "beauty", "deeply", "contradict"],
    gradient: "from-pink-400 via-orange-500 to-purple-600",
    icon: "🌈",
    feelings: ["Mixed"],
    dailyTip: "Create art or music"
  },
  {
    id: "mixed-3",
    message: "Your heart is vast enough to hold opposing feelings. Like seasons changing, emotions flow and transform. Trust the process of feeling it all.",
    song: "Filter",
    artist: "Jimin (BTS)",
    category: "Self-Acceptance",
    keywords: ["vast", "opposing", "seasons", "transform", "process"],
    gradient: "from-teal-400 via-purple-500 to-pink-600",
    icon: "🔄",
    feelings: ["Mixed"],
    dailyTip: "Take a mindful walk"
  },

  // Excited entries
  {
    id: "excited-1",
    message: "Your excitement is contagious magic! Like fireworks lighting up the night sky, let your enthusiasm illuminate the world around you. Dream big and chase those dreams.",
    song: "Dynamite",
    artist: "Jimin (BTS)",
    category: "Joy & Celebration",
    keywords: ["contagious", "magic", "fireworks", "enthusiasm", "dreams"],
    gradient: "from-yellow-300 via-orange-500 to-red-600",
    icon: "🎆",
    feelings: ["Excited"],
    dailyTip: "Share your excitement with others"
  },
  {
    id: "excited-2",
    message: "This energy you feel is your soul recognizing infinite possibilities ahead. Like a shooting star, you're meant to shine bright and make wishes come true.",
    song: "22",
    artist: "Taylor Swift",
    category: "Passion & Dreams",
    keywords: ["energy", "soul", "possibilities", "shooting", "shine"],
    gradient: "from-pink-300 via-yellow-400 to-orange-500",
    icon: "⭐",
    feelings: ["Excited"],
    dailyTip: "Make a vision board"
  },
  {
    id: "excited-3",
    message: "Your excitement is proof that beautiful things await you. Like spring flowers blooming, let this joy burst forth and color your world with endless potential.",
    song: "Promise",
    artist: "Jimin (BTS)",
    category: "New Beginnings",
    keywords: ["proof", "beautiful", "spring", "blooming", "potential"],
    gradient: "from-green-400 via-yellow-500 to-pink-500",
    icon: "🌸",
    feelings: ["Excited"],
    dailyTip: "Plan something fun"
  },

  // Confused entries
  {
    id: "confused-1",
    message: "In the maze of uncertainty, remember that being lost sometimes leads to the most beautiful discoveries. Trust that clarity will come when you're ready to receive it.",
    song: "Lost",
    artist: "Jimin (BTS)",
    category: "Self-Discovery",
    keywords: ["maze", "uncertainty", "lost", "discoveries", "clarity"],
    gradient: "from-blue-400 via-purple-500 to-teal-600",
    icon: "🧭",
    feelings: ["Confused"],
    dailyTip: "Write down your thoughts"
  },
  {
    id: "confused-2",
    message: "Confusion is not your enemy - it's your mind making space for new understanding. Like fog lifting from a mountain, answers will emerge in their own time.",
    song: "The Moment I Knew",
    artist: "Taylor Swift",
    category: "Finding Balance",
    keywords: ["confusion", "enemy", "understanding", "fog", "mountain"],
    gradient: "from-gray-300 via-blue-500 to-purple-600",
    icon: "🌫️",
    feelings: ["Confused"],
    dailyTip: "Take breaks to clear your mind"
  },
  {
    id: "confused-3",
    message: "It's okay not to have all the answers right now. Like a puzzle being solved piece by piece, your path will reveal itself as you keep moving forward.",
    song: "Reflection",
    artist: "Jimin (BTS)",
    category: "Self-Discovery",
    keywords: ["answers", "puzzle", "piece", "path", "forward"],
    gradient: "from-teal-400 via-blue-500 to-indigo-600",
    icon: "🧩",
    feelings: ["Confused"],
    dailyTip: "Talk to a trusted friend"
  },

  // Hopeful entries
  {
    id: "hopeful-1",
    message: "Hope is the light that never goes out, even in your darkest hour. Like dawn breaking after the longest night, better days are always on their way to you.",
    song: "Spring Day",
    artist: "Jimin (BTS)",
    category: "New Beginnings",
    keywords: ["hope", "light", "darkest", "dawn", "better"],
    gradient: "from-yellow-300 via-orange-400 to-pink-500",
    icon: "🌅",
    feelings: ["Hopeful"],
    dailyTip: "Set a small, achievable goal"
  },
  {
    id: "hopeful-2",
    message: "Your hope is a seed planted in fertile ground. With patience and care, it will grow into something beautiful beyond your wildest dreams.",
    song: "The Best Day",
    artist: "Taylor Swift",
    category: "Renewal",
    keywords: ["hope", "seed", "fertile", "patience", "beautiful"],
    gradient: "from-green-300 via-blue-400 to-purple-500",
    icon: "🌱",
    feelings: ["Hopeful"],
    dailyTip: "Visualize your bright future"
  },
  {
    id: "hopeful-3",
    message: "Every sunrise is proof that new beginnings are possible. Your hopeful heart knows that the universe is conspiring to help you succeed.",
    song: "Promise",
    artist: "Jimin (BTS)",
    category: "New Beginnings",
    keywords: ["sunrise", "proof", "beginnings", "universe", "succeed"],
    gradient: "from-orange-300 via-yellow-400 to-green-500",
    icon: "☀️",
    feelings: ["Hopeful"],
    dailyTip: "Practice gratitude"
  }
];

// Feeling-based matching functions
export function getWisdomByFeeling(feeling: Feeling, excludeIds: string[] = []): WisdomEntry[] {
  const matches = wisdomDatabase.filter(entry => 
    entry.feelings.includes(feeling) && !excludeIds.includes(entry.id)
  );
  
  // Shuffle and return up to 2 entries
  const shuffled = matches.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 2);
}

export function trackShownWisdom(feeling: Feeling, wisdomIds: string[]): void {
  if (typeof window === 'undefined') return;
  
  const key = `shownWisdom_${feeling}`;
  const existing = JSON.parse(localStorage.getItem(key) || '[]');
  const updated = [...new Set([...existing, ...wisdomIds])];
  localStorage.setItem(key, JSON.stringify(updated));
}

export function getShownWisdom(feeling: Feeling): string[] {
  if (typeof window === 'undefined') return [];
  
  const key = `shownWisdom_${feeling}`;
  return JSON.parse(localStorage.getItem(key) || '[]');
}

export function resetShownWisdom(feeling: Feeling): void {
  if (typeof window === 'undefined') return;
  
  const key = `shownWisdom_${feeling}`;
  localStorage.removeItem(key);
}

export const categories = [
  "Joy & Celebration",
  "Healing & Reflection", 
  "Self-Acceptance",
  "Finding Balance",
  "Empowerment",
  "Connection",
  "Passion & Dreams",
  "Self-Discovery",
  "New Beginnings",
  "Renewal"
];

export function matchWisdomToInput(input: string): WisdomEntry[] {
  const lowercaseInput = input.toLowerCase();
  const matches: { entry: WisdomEntry; score: number }[] = [];

  wisdomDatabase.forEach(entry => {
    let score = 0;
    entry.keywords.forEach(keyword => {
      if (lowercaseInput.includes(keyword.toLowerCase())) {
        score += 2;
      }
    });
    
    // Bonus for category-related words
    if (lowercaseInput.includes(entry.category.toLowerCase())) {
      score += 1;
    }

    if (score > 0) {
      matches.push({ entry, score });
    }
  });

  // Sort by score and return top 3, or random 3 if no matches
  if (matches.length === 0) {
    const shuffled = [...wisdomDatabase].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 3);
  }

  matches.sort((a, b) => b.score - a.score);
  return matches.slice(0, 3).map(m => m.entry);
}

export function getRandomWisdom(count: number = 3): WisdomEntry[] {
  const shuffled = [...wisdomDatabase].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
