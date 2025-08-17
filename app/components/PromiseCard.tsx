'use client';

import { useState } from 'react';
import { Check, Music, Flame, MessageSquare, X } from 'lucide-react';
import { Promise, MOTIVATIONAL_MESSAGES } from '@/app/lib/promiseTypes';

interface PromiseCardProps {
  promise: Promise;
  onComplete: (promiseId: string, notes?: string) => void;
  onDelete: (promiseId: string) => void;
  isCompletedToday: boolean;
  isDue: boolean;
}

export default function PromiseCard({ promise, onComplete, onDelete, isCompletedToday, isDue }: PromiseCardProps) {
  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState('');
  const [showMotivation, setShowMotivation] = useState(false);

  const getCategoryColor = (category: string) => {
    const colors = {
      'Self-Love': 'from-purple-500 to-pink-500',
      'Health & Wellness': 'from-green-500 to-teal-500',
      'Creativity': 'from-yellow-500 to-orange-500',
      'Relationships': 'from-blue-500 to-indigo-500',
      'Growth': 'from-emerald-500 to-green-500',
      'Mindfulness': 'from-gray-500 to-slate-500'
    };
    return colors[category as keyof typeof colors] || 'from-purple-500 to-pink-500';
  };

  const handleComplete = () => {
    onComplete(promise.id, notes);
    setShowMotivation(true);
    setTimeout(() => setShowMotivation(false), 3000);
    setShowNotes(false);
    setNotes('');
  };

  const handleNotesToggle = () => {
    setShowNotes(!showNotes);
    if (!showNotes) {
      setNotes('');
    }
  };

  return (
    <div className={`relative p-4 rounded-2xl bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg transition-all duration-300 ${
      isCompletedToday ? 'opacity-75' : 'hover:shadow-xl'
    }`}>
      
      {/* Motivational Message Overlay */}
      {showMotivation && (
        <div className="absolute inset-0 bg-gradient-to-br from-green-400/90 to-emerald-500/90 rounded-2xl flex items-center justify-center z-20 animate-pulse">
          <div className="text-center text-white p-4">
            <div className="text-2xl mb-2">🎉</div>
            <p className="text-sm font-medium">
              {MOTIVATIONAL_MESSAGES[promise.category]}
            </p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <div className={`w-2 h-2 bg-gradient-to-r ${getCategoryColor(promise.category)} rounded-full`}></div>
            <span className="text-xs font-medium text-gray-600">{promise.category}</span>
          </div>
          <h3 className="text-base font-bold text-gray-800 leading-tight">
            {promise.title}
          </h3>
        </div>
        
        <button
          onClick={() => onDelete(promise.id)}
          className="p-1 rounded-full hover:bg-red-100 text-gray-400 hover:text-red-500 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Song Inspiration */}
      <div className="flex items-center gap-2 mb-3 p-2 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/50">
        <Music className="w-3 h-3 text-amber-600" />
        <span className="text-xs font-medium text-gray-700">
          {promise.inspiredSong} - {promise.inspiredArtist}
        </span>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-3 mb-3">
        <div className="flex items-center gap-1">
          <Flame className={`w-4 h-4 ${promise.streak > 0 ? 'text-orange-500' : 'text-gray-400'}`} />
          <span className="text-sm font-bold text-gray-700">{promise.streak}</span>
        </div>
        <span className="text-xs text-gray-500">{promise.frequency}</span>
      </div>

      {/* Action Button */}
      {isDue && !isCompletedToday ? (
        <div className="space-y-2">
          <button
            onClick={showNotes ? handleComplete : handleNotesToggle}
            className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl font-medium text-white transition-all shadow-md hover:shadow-lg bg-gradient-to-r ${getCategoryColor(promise.category)} hover:scale-105`}
          >
            <Check className="w-4 h-4" />
            <span>{showNotes ? 'Complete' : 'Mark Complete'}</span>
          </button>
          
          {!showNotes && (
            <button
              onClick={handleNotesToggle}
              className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Add Reflection</span>
            </button>
          )}
          
          {showNotes && (
            <div className="space-y-2">
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="How did this promise make you feel? Any insights?"
                className="w-full p-3 rounded-xl bg-white/80 border border-gray-200 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                rows={3}
              />
            </div>
          )}
        </div>
      ) : isCompletedToday ? (
        <div className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl font-medium text-green-700 bg-green-100 border border-green-200">
          <Check className="w-4 h-4" />
          <span>Completed! 🎉</span>
        </div>
      ) : (
        <div className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl font-medium text-gray-500 bg-gray-50">
          <span>Not due today</span>
        </div>
      )}
    </div>
  );
}
