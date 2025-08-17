'use client';

import { useState, useEffect } from 'react';
import { JournalEntry, JournalEntries, JOURNAL_STORAGE_KEY, SAMPLE_JOURNAL_ENTRIES } from '@/app/lib/journalTypes';

export function useJournal() {
  const [entries, setEntries] = useState<JournalEntries>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load entries from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(JOURNAL_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setEntries(parsed);
      } else {
        // First time user - load sample entries
        setEntries(SAMPLE_JOURNAL_ENTRIES);
        localStorage.setItem(JOURNAL_STORAGE_KEY, JSON.stringify(SAMPLE_JOURNAL_ENTRIES));
      }
    } catch (error) {
      console.error('Error loading journal entries:', error);
      setEntries([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save entries to localStorage
  const saveToStorage = (newEntries: JournalEntries) => {
    try {
      localStorage.setItem(JOURNAL_STORAGE_KEY, JSON.stringify(newEntries));
      setEntries(newEntries);
    } catch (error) {
      console.error('Error saving journal entries:', error);
    }
  };

  // Add new journal entry
  const addEntry = (mood: string, note: string) => {
    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      mood,
      note: note.slice(0, 300) // Enforce max length
    };

    const newEntries = [newEntry, ...entries]; // Newest first
    saveToStorage(newEntries);
  };

  // Update existing entry
  const updateEntry = (id: string, note: string) => {
    const newEntries = entries.map(entry =>
      entry.id === id ? { ...entry, note: note.slice(0, 300) } : entry
    );
    saveToStorage(newEntries);
  };

  // Delete entry
  const deleteEntry = (id: string) => {
    const newEntries = entries.filter(entry => entry.id !== id);
    saveToStorage(newEntries);
  };

  // Get entries for today
  const getTodaysEntries = () => {
    const today = new Date().toISOString().split('T')[0];
    return entries.filter(entry => entry.date.startsWith(today));
  };

  // Get recent entries (last 7 days)
  const getRecentEntries = (days: number = 7) => {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - days);
    return entries.filter(entry => new Date(entry.date) >= cutoff);
  };

  return {
    entries,
    isLoading,
    addEntry,
    updateEntry,
    deleteEntry,
    getTodaysEntries,
    getRecentEntries
  };
}
