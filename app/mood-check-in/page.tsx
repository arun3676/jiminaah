"use client";

import { useState } from "react";
import { moodOptions } from "@/app/lib/moods";
import { useLocalStorage } from "@/app/lib/hooks/useLocalStorage";
import { MoodEntry } from "@/app/types";
import BottomNav from "@/app/components/BottomNav";
import MoodSummary from "@/app/components/MoodSummary";
import WeatherMoodPicker from "@/app/components/WeatherMoodPicker";
import { motion } from "framer-motion";

export default function MoodCheckInPage() {
  return (
    <>
      <main className="min-h-screen mobile-safe-area smooth-scroll">
        {/* Background decorative elements - hidden on very small screens */}
        <div className="hidden sm:block absolute top-20 left-10 w-3 h-3 bg-purple-400/30 rounded-full blur-sm float"></div>
        <div className="hidden sm:block absolute top-40 right-16 w-2 h-2 bg-pink-400/40 rounded-full blur-sm float" style={{animationDelay: '1s'}}></div>
        <div className="hidden sm:block absolute bottom-60 left-20 w-2.5 h-2.5 bg-yellow-400/30 rounded-full blur-sm float" style={{animationDelay: '2s'}}></div>
        
        <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8">
          <div className="w-full max-w-2xl text-center">
            {/* Header - optimized for mobile */}
            <motion.div 
              className="mb-8 md:mb-12"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-3 md:mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
                What's your weather?
              </h1>
              <p className="text-base md:text-lg text-gray-600 font-medium px-4">
                Choose the vibe that matches your inner climate today ✨
              </p>
            </motion.div>

            {/* Mood Picker - mobile optimized */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="px-2"
            >
              <WeatherMoodPicker />
            </motion.div>

            {/* Mood Summary */}
            <div className="px-2">
              <MoodSummary />
            </div>
          </div>
        </div>
      </main>
      
      <BottomNav />
    </>
  );
}