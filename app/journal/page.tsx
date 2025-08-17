'use client';

import { useState, useEffect, useRef } from 'react';
import { Plus, X, ArrowLeft, BookOpen } from 'lucide-react';
import Link from 'next/link';
import JournalList from '../components/JournalList';
import QuickJournalForm from '../components/QuickJournalForm';
import BottomNav from '../components/BottomNav';
import BackButton from '../components/BackButton';
import { useJournal } from '../hooks/useJournal';

export default function JournalPage() {
  const [showQuickForm, setShowQuickForm] = useState(false);
  const { addEntry } = useJournal();
  const journalListRef = useRef<HTMLDivElement>(null);

  const handleQuickSave = (mood: string, note: string) => {
    addEntry(mood, note);
    setShowQuickForm(false);
    
    // Smooth scroll to top to show the new entry
    setTimeout(() => {
      journalListRef.current?.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }, 100);
  };

  return (
    <main className="min-h-screen mobile-safe-area smooth-scroll bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Background decorative elements - hidden on very small screens */}
      <div className="hidden sm:block absolute top-20 left-10 w-3 h-3 bg-purple-400/30 rounded-full blur-sm float"></div>
      <div className="hidden sm:block absolute top-40 right-16 w-2 h-2 bg-pink-400/40 rounded-full blur-sm float" style={{animationDelay: '1s'}}></div>
      <div className="hidden sm:block absolute bottom-60 left-20 w-2.5 h-2.5 bg-yellow-400/30 rounded-full blur-sm float" style={{animationDelay: '2s'}}></div>
      
      <div className="px-4 py-8">
        {/* Back Button */}
        <div className="absolute top-6 left-6 z-10">
          <BackButton />
        </div>

        {/* Header */}
        <div className="flex items-center gap-3 mb-8 mt-8">
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-3 md:mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
              Your Journal
            </h1>
            <p className="text-base md:text-lg text-gray-600 font-medium">
              Reflect on your daily vibes and growth ✨
            </p>
          </div>
        </div>

        {/* Journal List */}
        <div ref={journalListRef}>
          <JournalList />
        </div>

        {/* Helpful tip */}
        <div className="mt-8 glass p-4 rounded-2xl border border-white/30 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <BookOpen className="w-5 h-5 text-purple-500" />
            <span className="font-semibold text-gray-700">Daily Reflection Tip</span>
          </div>
          <p className="text-sm text-gray-600">
            Regular journaling helps you understand patterns in your moods and triggers. 
            <span className="font-medium text-purple-600">Tap the + button</span> to add a quick entry anytime!
          </p>
        </div>
      </div>

      {/* Floating Add Button */}
      <button
        onClick={() => setShowQuickForm(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center z-40 floating-add-button hover:scale-110 animate-fade-in"
      >
        <Plus className="w-6 h-6" />
      </button>

      {/* Quick Journal Form Modal */}
      {showQuickForm && (
        <QuickJournalForm
          onSave={handleQuickSave}
          onCancel={() => setShowQuickForm(false)}
        />
      )}
    </main>
  );
}
