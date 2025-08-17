export const audioMappings: Record<string, string> = {
  // Happy/Positive moods
  Joyful: '/audio/bts_serendipity_2.mp3',
  Happy: '/audio/bts_serendipity_2.mp3',
  Excited: '/audio/jimin_so_lovely.mp3',
  Hopeful: '/audio/bts_serendipity_2.mp3',
  
  // Calm/Peaceful moods
  Calm: '/audio/jimin_so_lovely.mp3',
  Peaceful: '/audio/jimin_so_lovely.mp3',
  Grateful: '/audio/jimin_so_lovely.mp3',
  
  // Sad/Down moods
  Sad: '/audio/olivia_rodrigo_vampire.mp3',
  Depressed: '/audio/olivia_rodrigo_vampire.mp3',
  Lonely: '/audio/olivia_rodrigo_vampire.mp3',
  Mixed: '/audio/olivia_rodrigo_vampire.mp3',
  
  // Angry/Anxious moods
  Angry: '/audio/good_4_you.mp3',
  Anxious: '/audio/good_4_you.mp3',
  Confused: '/audio/good_4_you.mp3',
  Overwhelmed: '/audio/good_4_you.mp3',
  
  // Empowered/Motivated moods
  Empowered: '/audio/jimin_filter.mp3',
  Motivated: '/audio/jimin_filter.mp3',
  Resilient: '/audio/good_4_you.mp3'
};

export function getClipForMood(mood: string): string {
  return audioMappings[mood] || '/audio/bts_serendipity_2.mp3';
}

export function getClipForChat(input: string): string {
  const lowerInput = input.toLowerCase();
  
  if (lowerInput.includes('sad') || lowerInput.includes('depressed') || lowerInput.includes('lonely')) {
    return '/audio/olivia_rodrigo_vampire.mp3';
  }
  
  if (lowerInput.includes('happy') || lowerInput.includes('excited') || lowerInput.includes('joyful')) {
    return '/audio/jimin_so_lovely.mp3';
  }
  
  if (lowerInput.includes('anxious') || lowerInput.includes('angry') || lowerInput.includes('overwhelmed')) {
    return '/audio/good_4_you.mp3';
  }
  
  if (lowerInput.includes('empowered') || lowerInput.includes('motivated') || lowerInput.includes('strong')) {
    return '/audio/jimin_filter.mp3';
  }
  
  if (lowerInput.includes('calm') || lowerInput.includes('peaceful') || lowerInput.includes('grateful')) {
    return '/audio/jimin_so_lovely.mp3';
  }
  
  // Default fallback
  return '/audio/bts_serendipity_2.mp3';
}
