export const audioMappings: Record<string, string> = {
  // 5 Core Vibes with specific audio clips
  Joyful: '/audio/bts_serendipity_2.mp3',        // Uplifting, hopeful BTS track
  Sad: '/audio/olivia_rodrigo_vampire.mp3',      // Melancholic, emotional track
  Angry: '/audio/good_4_you.mp3',               // Energetic, empowering track
  Peaceful: '/audio/jimin_filter.mp3',          // Calm, introspective Jimin track  
  Anxious: '/audio/jimin_iamhere.mp3',          // Comforting, reassuring "I am here" track
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
