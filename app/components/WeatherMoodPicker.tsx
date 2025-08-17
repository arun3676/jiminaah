"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import WeatherIcon from './WeatherIcon';
import JournalTextarea from './JournalTextarea';
import { useJournal } from '@/app/hooks/useJournal';
import { useLocalStorage } from "@/app/lib/hooks/useLocalStorage";
import { MoodEntry } from "@/app/types";
import { moodOptions } from '@/app/lib/moods';

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

    const selectedOption = moodOptions.find(opt => opt.label === selectedMood);
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
      {/* Grid container with mobile optimization */}
      <motion.div 
        className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6 mood-grid"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
      >
        {moodOptions.map((option, index) => (
          <motion.div
            key={option.mood}
            variants={{
              hidden: { opacity: 0, y: 30, scale: 0.8 },
              visible: { 
                opacity: 1, 
                y: 0, 
                scale: 1,
                transition: {
                  type: "spring",
                  stiffness: 200,
                  damping: 20
                }
              }
            }}
            className="touch-target"
          >
            <WeatherIcon
              option={option}
              isSelected={selectedMood === option.label}
              onSelect={() => handleSelectMood(option.label)}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Action button area - mobile optimized */}
      <div className="mt-6 md:mt-10 text-center h-16 md:h-20 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {selectedMood && (
            <motion.div
              key={isSaved ? 'saved' : 'save'}
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.8 }}
              transition={{ duration: 0.4, ease: "backOut" }}
              className="w-full max-w-xs"
            >
              {!isSaved ? (
                <motion.button 
                  onClick={handleSaveMood}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group w-full px-6 py-3 md:px-8 md:py-4 font-bold text-white rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 hover:from-purple-600 hover:via-pink-600 hover:to-blue-600 transition-all duration-300 shadow-xl hover:shadow-2xl glow touch-target"
                >
                  <span className="flex items-center justify-center gap-3">
                    <span className="text-base md:text-lg">Save Mood</span>
                    <motion.span 
                      className="text-lg md:text-xl"
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                    >
                      ✨
                    </motion.span>
                  </span>
                </motion.button>
              ) : (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="glass px-6 py-3 md:px-8 md:py-4 rounded-full border border-white/30 shadow-xl"
                >
                  <div className="flex items-center justify-center gap-3 text-base md:text-lg font-bold">
                    <motion.span
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.6, repeat: 2 }}
                      className="text-xl md:text-2xl"
                    >
                      🎉
                    </motion.span>
                    <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                      Vibe saved!
                    </span>
                    <motion.span
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.6, repeat: 2, delay: 0.2 }}
                      className="text-xl md:text-2xl"
                    >
                      ✨
                    </motion.span>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Journal Textarea */}
      <AnimatePresence>
        {showJournal && selectedMood && (
          <JournalTextarea
            mood={selectedMood}
            onSave={handleJournalSave}
            onCancel={handleJournalCancel}
          />
        )}
      </AnimatePresence>
    </div>
  );
}