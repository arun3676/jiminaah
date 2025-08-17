'use client';

import { useState, useEffect } from 'react';
import { 
  Feeling, 
  WisdomEntry, 
  trackShownWisdom, 
  getShownWisdom, 
  resetShownWisdom,
  wisdomDatabase 
} from '@/app/lib/wisdomDatabase';

export function useWisdomTracking() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const getWisdomForFeeling = (feeling: Feeling): WisdomEntry[] => {
    if (!isClient) return [];

    // Get previously shown wisdom IDs for this feeling
    const shownIds = getShownWisdom(feeling);
    
    // Get all wisdom entries for this feeling
    const allMatches = wisdomDatabase.filter(entry => 
      entry.feelings.includes(feeling)
    );
    
    // Filter out already shown entries
    const availableMatches = allMatches.filter(entry => 
      !shownIds.includes(entry.id)
    );
    
    // If we have fewer than 2 available entries, reset the tracking for this feeling
    if (availableMatches.length < 2) {
      resetShownWisdom(feeling);
      // Get fresh matches after reset
      const freshMatches = allMatches.slice();
      const shuffled = freshMatches.sort(() => Math.random() - 0.5);
      const selected = shuffled.slice(0, 2);
      
      // Track the newly selected wisdom
      trackShownWisdom(feeling, selected.map(w => w.id));
      return selected;
    }
    
    // Shuffle available matches and take 2
    const shuffled = availableMatches.sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 2);
    
    // Track the selected wisdom
    trackShownWisdom(feeling, selected.map(w => w.id));
    
    return selected;
  };

  const resetFeelingHistory = (feeling: Feeling) => {
    if (!isClient) return;
    resetShownWisdom(feeling);
  };

  const getShownCount = (feeling: Feeling): number => {
    if (!isClient) return 0;
    return getShownWisdom(feeling).length;
  };

  const getTotalAvailable = (feeling: Feeling): number => {
    return wisdomDatabase.filter(entry => 
      entry.feelings.includes(feeling)
    ).length;
  };

  return {
    getWisdomForFeeling,
    resetFeelingHistory,
    getShownCount,
    getTotalAvailable,
    isClient
  };
}
