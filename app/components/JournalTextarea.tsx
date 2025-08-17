'use client';

import { useState } from 'react';
import { Save, X } from 'lucide-react';
import { MAX_NOTE_LENGTH } from '@/app/lib/journalTypes';

interface JournalTextareaProps {
  mood: string;
  onSave: (note: string) => void;
  onCancel: () => void;
}

export default function JournalTextarea({ mood, onSave, onCancel }: JournalTextareaProps) {
  const [note, setNote] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!note.trim()) return;
    
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 500)); // Brief delay for UX
    onSave(note.trim());
    setIsSaving(false);
  };

  const remainingChars = MAX_NOTE_LENGTH - note.length;

  return (
    <div className="w-full max-w-lg mx-auto mt-6 animate-fade-in">
      <div className="glass p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-white/30 shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-800">
              Journal your vibe? ✨
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              What made you feel <span className="font-semibold text-purple-600">{mood.toLowerCase()}</span> today?
            </p>
          </div>
          <button
            onClick={onCancel}
            className="p-2 rounded-full hover:bg-white/20 transition-colors touch-target"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Textarea */}
        <div className="relative mb-4">
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="e.g., Had coffee with a friend and we laughed so much! Grateful for these moments..."
            className="w-full h-24 sm:h-32 p-4 rounded-xl border border-gray-200 bg-white/80 backdrop-blur-sm resize-none focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-300 transition-all text-sm sm:text-base keyboard-avoiding"
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

        {/* Action buttons */}
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-3 rounded-xl font-semibold text-gray-700 bg-white/60 hover:bg-white/80 transition-all border border-gray-200 touch-target"
          >
            Skip
          </button>
          
          <button
            onClick={handleSave}
            disabled={!note.trim() || isSaving}
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
                  Save Note
                </>
              )}
            </span>
          </button>
        </div>

        {/* Helpful tip */}
        <p className="text-xs text-gray-500 mt-3 text-center">
          💡 Tip: Reflect on what triggered this mood - it helps with self-awareness!
        </p>
      </div>
    </div>
  );
}
