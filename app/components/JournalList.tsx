'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Calendar, TrendingUp } from 'lucide-react';
import { useJournal } from '@/app/hooks/useJournal';
import JournalEntry from './JournalEntry';

export default function JournalList() {
  const { entries, isLoading, updateEntry, deleteEntry } = useJournal();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-purple-500/30 border-t-purple-500 rounded-full"
        />
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="glass p-8 rounded-3xl border border-white/30 max-w-md mx-auto">
          <div className="text-6xl mb-4">📖</div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            No journal entries yet
          </h3>
          <p className="text-gray-600 mb-6">
            Start by checking in with your mood and adding your first journal note!
          </p>
        </div>
      </div>
    );
  }

  // Group entries by date
  const groupedEntries = entries.reduce((groups, entry) => {
    const date = entry.date.split('T')[0];
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(entry);
    return groups;
  }, {} as Record<string, typeof entries>);

  const formatGroupDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', { 
        weekday: 'long',
        month: 'long', 
        day: 'numeric',
        year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined
      });
    }
  };

  // Stats
  const totalEntries = entries.length;
  const uniqueDays = Object.keys(groupedEntries).length;
  const recentStreak = calculateRecentStreak();

  function calculateRecentStreak() {
    const dates = Object.keys(groupedEntries).sort().reverse();
    let streak = 0;
    const today = new Date().toISOString().split('T')[0];
    
    for (let i = 0; i < dates.length; i++) {
      const expectedDate = new Date();
      expectedDate.setDate(expectedDate.getDate() - i);
      const expectedDateStr = expectedDate.toISOString().split('T')[0];
      
      if (dates[i] === expectedDateStr) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        <div className="glass p-3 sm:p-4 rounded-2xl border border-white/30 text-center">
          <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500 mx-auto mb-2" />
          <div className="text-lg sm:text-2xl font-black text-gray-800">{totalEntries}</div>
          <div className="text-xs sm:text-sm text-gray-600">entries</div>
        </div>
        
        <div className="glass p-3 sm:p-4 rounded-2xl border border-white/30 text-center">
          <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500 mx-auto mb-2" />
          <div className="text-lg sm:text-2xl font-black text-gray-800">{uniqueDays}</div>
          <div className="text-xs sm:text-sm text-gray-600">days</div>
        </div>
        
        <div className="glass p-3 sm:p-4 rounded-2xl border border-white/30 text-center">
          <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 mx-auto mb-2" />
          <div className="text-lg sm:text-2xl font-black text-gray-800">{recentStreak}</div>
          <div className="text-xs sm:text-sm text-gray-600">streak</div>
        </div>
      </div>

      {/* Journal Entries */}
      <div className="space-y-6">
        <AnimatePresence>
          {Object.entries(groupedEntries)
            .sort(([a], [b]) => b.localeCompare(a)) // Sort by date desc
            .map(([date, dayEntries]) => (
              <motion.div
                key={date}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-3"
              >
                {/* Date header */}
                <div className="flex items-center gap-3">
                  <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent flex-1"></div>
                  <div className="text-sm font-bold text-gray-600 bg-white/80 px-3 py-1 rounded-full">
                    {formatGroupDate(date)}
                  </div>
                  <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent flex-1"></div>
                </div>

                {/* Entries for this date */}
                <div className="space-y-3">
                  {dayEntries
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                    .map((entry) => (
                      <JournalEntry
                        key={entry.id}
                        entry={entry}
                        onUpdate={updateEntry}
                        onDelete={deleteEntry}
                      />
                    ))}
                </div>
              </motion.div>
            ))}
        </AnimatePresence>
      </div>

      {/* Encouraging message */}
      {totalEntries > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass p-4 rounded-2xl border border-white/30 text-center"
        >
          <p className="text-sm text-gray-600">
            {recentStreak > 0 ? (
              <>🔥 You're on a {recentStreak}-day streak! Keep reflecting on your journey.</>
            ) : (
              <>✨ Every entry is a step toward self-awareness. Keep going!</>
            )}
          </p>
        </motion.div>
      )}
    </div>
  );
}
