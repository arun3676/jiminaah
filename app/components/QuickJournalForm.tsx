'use client';

import { useState } from 'react';
import { Save, X, Smile } from 'lucide-react';
import { MAX_NOTE_LENGTH } from '@/app/lib/journalTypes';
import { moodOptions } from '@/app/lib/moods';
import SongAdvicePopup from './SongAdvicePopup';

interface QuickJournalFormProps {
  onSave: (mood: string, note: string) => void;
  onCancel: () => void;
}

// Mood to emoji mapping for quick selection
const MOOD_EMOJIS: Record<string, string> = {
  'Joyful': '☀️',
  'Calm': '☁️', 
  'Sad': '🌧️',
  'Angry': '⛈️',
  'Peaceful': '❄️',
  'Anxious': '💨'
};

export default function QuickJournalForm({ onSave, onCancel }: QuickJournalFormProps) {
  const [selectedMood, setSelectedMood] = useState('');
  const [note, setNote] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [showAdvice, setShowAdvice] = useState(false);

  const handleSave = async () => {
    if (!selectedMood || !note.trim()) return;
    
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 500)); // Brief delay for UX
    onSave(selectedMood, note.trim());
    setIsSaving(false);
  };

  const remainingChars = MAX_NOTE_LENGTH - note.length;

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 z-50 mobile-safe-area animate-fade-in"
      onClick={onCancel}
    >
      <div
        className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 w-full max-w-md shadow-2xl modal-content animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20">
              <Smile className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">
                Quick Journal Entry
              </h3>
              <p className="text-sm text-gray-600">
                Capture your current vibe
              </p>
            </div>
          </div>
          <button
            onClick={onCancel}
            className="p-2 rounded-full hover:bg-white/20 transition-colors touch-target"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Mood Selection */}
        <div className="mb-4 sm:mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
            How are you feeling?
          </label>
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {moodOptions.map((mood) => (
              <button
                key={mood.label}
                onClick={() => {
                  setSelectedMood(mood.label);
                  setShowAdvice(true);
                }}
                className={`p-2 sm:p-3 rounded-xl border-2 transition-all duration-200 text-center cursor-pointer hover:scale-105 touch-target ${
                  selectedMood === mood.label
                    ? 'border-purple-300 bg-purple-50 shadow-md'
                    : 'border-gray-200 bg-white/60 hover:bg-white/80'
                }`}
              >
                <div className="text-2xl mb-1">
                  {MOOD_EMOJIS[mood.label] || '💭'}
                </div>
                <div className={`text-xs font-medium ${
                  selectedMood === mood.label ? 'text-purple-700' : 'text-gray-600'
                }`}>
                  {mood.label}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Note Input */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            What's on your mind?
          </label>
          <div className="relative">
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="e.g., Had a productive morning working on my goals. Feeling motivated and ready to tackle the day!"
              className="w-full h-32 p-4 rounded-xl border border-gray-200 bg-white/80 backdrop-blur-sm resize-none focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-300 transition-all text-sm keyboard-avoiding"
              maxLength={MAX_NOTE_LENGTH}
              autoFocus
            />
            
            {/* Character counter */}
            <div className={`absolute bottom-2 right-3 text-xs font-medium ${
              remainingChars < 20 ? 'text-red-500' : 'text-gray-400'
            }`}>
              {remainingChars} left
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-3 rounded-xl font-semibold text-gray-700 bg-white/60 hover:bg-white/80 transition-all border border-gray-200 touch-target"
          >
            Cancel
          </button>
          
          <button
            onClick={handleSave}
            disabled={!selectedMood || !note.trim() || isSaving}
            className="flex-1 px-4 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl touch-target"
          >
            <span className="flex items-center justify-center gap-2">
              {isSaving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Entry
                </>
              )}
            </span>
          </button>
        </div>

        {/* Helpful tip */}
        <p className="text-xs sm:text-sm text-gray-500 text-center mt-4">
          💡 Tip: Regular journaling helps track patterns in your mood and growth over time
        </p>
      </div>

      {/* Song Advice Popup */}
      {showAdvice && selectedMood && (
        <SongAdvicePopup
          mood={selectedMood}
          onClose={() => setShowAdvice(false)}
        />
      )}
    </div>
  );
}
