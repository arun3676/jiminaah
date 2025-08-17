"use client";

import WeatherMoodPicker from '../components/WeatherMoodPicker';
import MoodSummary from '../components/MoodSummary';
import BottomNav from "@/app/components/BottomNav";
import BackButton from "@/app/components/BackButton";
export default function MoodCheckInPage() {
  return (
    <>
      <main className="min-h-screen mobile-safe-area smooth-scroll">
        {/* Background decorative elements - hidden on very small screens */}
        <div className="hidden sm:block absolute top-20 left-10 w-3 h-3 bg-purple-400/30 rounded-full blur-sm float"></div>
        <div className="hidden sm:block absolute top-40 right-16 w-2 h-2 bg-pink-400/40 rounded-full blur-sm float" style={{animationDelay: '1s'}}></div>
        <div className="hidden sm:block absolute bottom-60 left-20 w-2.5 h-2.5 bg-yellow-400/30 rounded-full blur-sm float" style={{animationDelay: '2s'}}></div>
        
        {/* Back Button */}
        <div className="absolute top-6 left-6 z-10">
          <BackButton />
        </div>
        
        <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8">
          <div className="w-full max-w-2xl text-center">
            {/* Header - optimized for mobile */}
            <div className="mb-8 md:mb-12 animate-fade-in">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-3 md:mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
                What&apos;s your weather?
              </h1>
              <p className="text-base md:text-lg text-gray-600 font-medium px-4">
                Choose the vibe that matches your inner climate today ✨
              </p>
            </div>

            {/* Mood Picker - mobile optimized */}
            <div className="px-2 animate-fade-in" style={{animationDelay: '0.2s'}}>
              <WeatherMoodPicker />
            </div>

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