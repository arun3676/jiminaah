'use client';

import { useState, useEffect } from 'react';
import { WisdomEntry } from '@/app/lib/wisdomDatabase';

export interface DailyPlaylistEntry {
  wisdom: WisdomEntry;
  addedAt: string;
  date: string; // YYYY-MM-DD format
}

export function useDailyPlaylist() {
  const [isClient, setIsClient] = useState(false);
  const [dailyPlaylist, setDailyPlaylist] = useState<DailyPlaylistEntry[]>([]);

  const getTodayString = () => {
    return new Date().toISOString().split('T')[0];
  };

  const loadDailyPlaylist = () => {
    if (typeof window === 'undefined') return;
    
    const today = getTodayString();
    const stored = localStorage.getItem(`dailyPlaylist_${today}`);
    
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setDailyPlaylist(parsed);
      } catch (error) {
        console.error('Error parsing daily playlist:', error);
        setDailyPlaylist([]);
      }
    } else {
      setDailyPlaylist([]);
    }
  };

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== 'undefined') {
      loadDailyPlaylist();
    }
  }, [loadDailyPlaylist]);

  const saveDailyPlaylist = (playlist: DailyPlaylistEntry[]) => {
    if (typeof window === 'undefined') return;
    
    const today = getTodayString();
    localStorage.setItem(`dailyPlaylist_${today}`, JSON.stringify(playlist));
    setDailyPlaylist(playlist);
  };

  const addToPlaylist = (wisdom: WisdomEntry) => {
    if (!isClient) return false;
    
    const today = getTodayString();
    const isAlreadyAdded = dailyPlaylist.some(entry => entry.wisdom.id === wisdom.id);
    
    if (isAlreadyAdded) {
      return false; // Already in playlist
    }

    const newEntry: DailyPlaylistEntry = {
      wisdom,
      addedAt: new Date().toISOString(),
      date: today
    };

    const updatedPlaylist = [...dailyPlaylist, newEntry];
    saveDailyPlaylist(updatedPlaylist);
    return true;
  };

  const removeFromPlaylist = (wisdomId: string) => {
    if (!isClient) return;
    
    const updatedPlaylist = dailyPlaylist.filter(entry => entry.wisdom.id !== wisdomId);
    saveDailyPlaylist(updatedPlaylist);
  };

  const isInPlaylist = (wisdomId: string): boolean => {
    return dailyPlaylist.some(entry => entry.wisdom.id === wisdomId);
  };

  const clearPlaylist = () => {
    if (!isClient) return;
    
    const today = getTodayString();
    localStorage.removeItem(`dailyPlaylist_${today}`);
    setDailyPlaylist([]);
  };

  const getPlaylistCount = (): number => {
    return dailyPlaylist.length;
  };

  return {
    dailyPlaylist,
    addToPlaylist,
    removeFromPlaylist,
    isInPlaylist,
    clearPlaylist,
    getPlaylistCount,
    isClient
  };
}
