'use client';

import { useState, useEffect } from 'react';
import { Promise, PromiseStats, PromiseHistory } from '@/app/lib/promiseTypes';

export function usePromises() {
  const [promises, setPromises] = useState<Promise[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== 'undefined') {
      loadPromises();
    }
  }, []);

  const loadPromises = () => {
    if (typeof window === 'undefined') return;
    
    const stored = localStorage.getItem('serendipity-promises');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setPromises(parsed);
      } catch (error) {
        console.error('Error parsing promises:', error);
        setPromises([]);
      }
    }
  };

  const savePromises = (updatedPromises: Promise[]) => {
    if (typeof window === 'undefined') return;
    
    localStorage.setItem('serendipity-promises', JSON.stringify(updatedPromises));
    setPromises(updatedPromises);
  };

  const getTodayString = () => {
    return new Date().toISOString().split('T')[0];
  };

  const addPromise = (newPromise: Omit<Promise, 'id' | 'createdAt' | 'streak' | 'history'>) => {
    if (promises.length >= 5) {
      return false; // Limit to 5 active promises
    }

    const promise: Promise = {
      ...newPromise,
      id: `promise_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
      streak: 0,
      history: []
    };

    const updatedPromises = [...promises, promise];
    savePromises(updatedPromises);
    return true;
  };

  const completePromise = (promiseId: string, notes?: string) => {
    const today = getTodayString();
    
    const updatedPromises = promises.map(promise => {
      if (promise.id === promiseId) {
        // Check if already completed today
        const todayEntry = promise.history.find(h => h.date === today);
        if (todayEntry && todayEntry.completed) {
          return promise; // Already completed today
        }

        // Add or update today's entry
        const updatedHistory = promise.history.filter(h => h.date !== today);
        updatedHistory.push({
          date: today,
          completed: true,
          notes
        });

        // Calculate new streak
        let newStreak = 0;
        const sortedHistory = updatedHistory
          .filter(h => h.completed)
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        // Count consecutive days from today backwards
        const todayDate = new Date(today);
        for (let i = 0; i < sortedHistory.length; i++) {
          const expectedDate = new Date(todayDate);
          expectedDate.setDate(todayDate.getDate() - i);
          const expectedDateStr = expectedDate.toISOString().split('T')[0];
          
          if (sortedHistory.find(h => h.date === expectedDateStr)) {
            newStreak++;
          } else {
            break;
          }
        }

        return {
          ...promise,
          streak: newStreak,
          history: updatedHistory,
          lastCompleted: today,
          notes: notes || promise.notes
        };
      }
      return promise;
    });

    savePromises(updatedPromises);
  };

  const deletePromise = (promiseId: string) => {
    const updatedPromises = promises.filter(p => p.id !== promiseId);
    savePromises(updatedPromises);
  };

  const isCompletedToday = (promise: Promise): boolean => {
    const today = getTodayString();
    const todayEntry = promise.history.find(h => h.date === today);
    return todayEntry?.completed || false;
  };

  const isDueToday = (promise: Promise): boolean => {
    if (isCompletedToday(promise)) return false;
    
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, etc.
    
    if (promise.frequency === 'daily') {
      return true;
    } else if (promise.frequency === 'weekly') {
      // Due on Sundays (day 0) for weekly promises
      return dayOfWeek === 0;
    }
    
    return false;
  };

  const getStats = (): PromiseStats => {
    const activeCount = promises.length;
    const dueToday = promises.filter(isDueToday);
    const totalStreak = promises.reduce((sum, promise) => sum + promise.streak, 0);

    return {
      activeCount,
      dueToday,
      totalStreak
    };
  };

  return {
    promises,
    addPromise,
    completePromise,
    deletePromise,
    isCompletedToday,
    isDueToday,
    getStats,
    isClient
  };
}
