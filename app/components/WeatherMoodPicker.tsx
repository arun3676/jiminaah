"use client";

import { useState } from 'react';
import WeatherIcon from './WeatherIcon';
import JournalTextarea from './JournalTextarea';
import AudioClipPlayer from './AudioClipPlayer';
import { useJournal } from '@/app/hooks/useJournal';
import { useLocalStorage } from "@/app/lib/hooks/useLocalStorage";
import { MoodEntry } from "@/app/types";
import { moodOptions } from '@/app/lib/moods';
import { getClipForMood } from '@/app/lib/audioMappings';

export default function WeatherMoodPicker() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [moodHistory, setMoodHistory] = useLocalStorage<MoodEntry[]>("moodHistory", []);
  const [isSaved, setIsSaved] = useState(false);
  const [showJournal, setShowJournal] = useState(false);
  const { addEntry } = useJournal();

  const handleSelectMood = (mood: string) => {
    setSelectedMood(mood);
    setIsSaved(false);
  };

  const handleSaveMood = () => {
    if (!selectedMood) return;

    const newEntry: MoodEntry = {
      mood: selectedMood,
      timestamp: Date.now(),
    };
    setMoodHistory([...moodHistory, newEntry]);
    setIsSaved(true);

    // Show journal prompt after saving mood
    setTimeout(() => {
      setShowJournal(true);
    }, 1500);
  };

  const handleJournalSave = (note: string) => {
    if (selectedMood) {
      addEntry(selectedMood, note);
    }
    setShowJournal(false);
    setTimeout(() => {
      setSelectedMood(null);
      setIsSaved(false);
    }, 1000);
  };

  const handleJournalCancel = () => {
    setShowJournal(false);
    setTimeout(() => {
      setSelectedMood(null);
      setIsSaved(false);
    }, 1000);
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Grid container with mobile optimization - now 5 items */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6 mood-grid animate-fade-in">
        {moodOptions.map((option, index) => (
          <div
            key={option.mood}
            className="touch-target animate-fade-in"
            style={{animationDelay: `${index * 0.1}s`}}
          >
            <WeatherIcon
              option={option}
              isSelected={selectedMood === option.label}
              onSelect={() => handleSelectMood(option.label)}
            />
          </div>
        ))}
      </div>

      {/* Action button area - mobile optimized */}
      <div className="mt-6 md:mt-10 text-center h-16 md:h-20 flex items-center justify-center">
        {selectedMood && (
          <div className="w-full max-w-xs animate-fade-in">
              {!isSaved ? (
                <button 
                  onClick={handleSaveMood}
                  className="group w-full px-6 py-3 md:px-8 md:py-4 font-bold text-white rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 hover:from-purple-600 hover:via-pink-600 hover:to-blue-600 transition-all duration-300 shadow-xl hover:shadow-2xl glow touch-target hover:scale-105"
                >
                  <span className="flex items-center justify-center gap-3">
                    <span className="text-base md:text-lg">Save Mood</span>
                    <span className="text-lg md:text-xl animate-pulse">✨</span>
                  </span>
                </button>
              ) : (
                <div className="glass px-6 py-3 md:px-8 md:py-4 rounded-full border border-white/30 shadow-xl animate-fade-in">
                  <div className="flex items-center justify-center gap-3 text-base md:text-lg font-bold">
                    <span className="text-xl md:text-2xl animate-bounce">🎉</span>
                    <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                      Vibe saved!
                    </span>
                    <span className="text-xl md:text-2xl animate-bounce" style={{animationDelay: '0.2s'}}>✨</span>
                  </div>
                  {/* Audio player for saved mood */}
                  <AudioClipPlayer src={getClipForMood(selectedMood)} />
                </div>
              )}
          </div>
        )}
      </div>

      {/* Journal Textarea */}
      {showJournal && selectedMood && (
        <JournalTextarea
          mood={selectedMood}
          onSave={handleJournalSave}
          onCancel={handleJournalCancel}
        />
      )}
    </div>
  );
}