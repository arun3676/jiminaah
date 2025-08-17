"use client";

import { useLocalStorage } from "@/app/lib/hooks/useLocalStorage";
import { MoodEntry } from "@/app/types";
import { moodOptions } from "@/app/lib/moods";
import Link from "next/link";
import { BookOpen } from "lucide-react";

export default function MoodSummary() {
  const [moodHistory] = useLocalStorage<MoodEntry[]>("moodHistory", []);

  if (moodHistory.length === 0) {
    return null;
  }

  const lastEntry = moodHistory[moodHistory.length - 1];
  const lastMood = moodOptions.find(m => m.mood === lastEntry.mood);

  if (!lastMood) {
    return null;
  }

  const { icon: Icon, label, color } = lastMood;

  return (
    <div className="mt-12 p-8 rounded-3xl glass border border-white/30 shadow-2xl w-full max-w-md mx-auto relative overflow-hidden group hover:scale-[1.02] transition-all duration-500 animate-fade-in">
      
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-purple-500/10 pointer-events-none"></div>
      
      {/* Floating particles */}
      <div className="absolute top-4 right-4 w-2 h-2 bg-purple-400 rounded-full opacity-60 float"></div>
      <div className="absolute bottom-6 left-6 w-1.5 h-1.5 bg-pink-400 rounded-full opacity-40 float" style={{animationDelay: '1s'}}></div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
          <h3 className="text-xl font-black text-gray-800 tracking-tight">Your Last Vibe</h3>
          <div className="w-2 h-2 bg-gradient-to-r from-pink-500 to-blue-500 rounded-full"></div>
        </div>
        
        <div className="flex items-center gap-6">
          {/* Enhanced icon container */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl blur-lg"></div>
            <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl glass border border-white/40">
              <Icon className={`w-8 h-8 ${color} drop-shadow-sm`} />
            </div>
          </div>
          
          <div className="flex-1">
            <p className={`text-2xl font-black ${color} mb-2 tracking-tight`}>{label}</p>
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              <p className="text-sm text-gray-500 font-medium">
                {new Date(lastEntry.timestamp).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Journal Link */}
        <div className="mt-6 pt-4 border-t border-white/20">
          <Link 
            href="/journal"
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20 transition-all duration-200 group"
          >
            <BookOpen className="w-4 h-4 text-purple-600 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-semibold text-purple-600">View Journal</span>
          </Link>
        </div>
      </div>
    </div>
  );
}