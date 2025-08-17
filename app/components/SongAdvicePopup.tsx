'use client';

import { X, Music, Heart } from 'lucide-react';

interface SongAdvicePopupProps {
  mood: string;
  onClose: () => void;
}

// Song advice based on mood selection
const MOOD_ADVICE: Record<string, { song: string; artist: string; lyric: string; advice: string }> = {
  'Joyful': {
    song: 'Promise',
    artist: 'Jimin (BTS)',
    lyric: '"I want to be your light, baby, you should be your light"',
    advice: 'Let this joy radiate outward! Share your positive energy with others and remember to celebrate these beautiful moments.'
  },
  'Calm': {
    song: 'Serendipity',
    artist: 'Jimin (BTS)',
    lyric: '"I\'m your calico cat, here to see you"',
    advice: 'Embrace this peaceful moment. Use this calm energy to reflect on what truly matters and set gentle intentions.'
  },
  'Sad': {
    song: 'Soon You\'ll Get Better',
    artist: 'Taylor Swift',
    lyric: '"And I hate to make this all about me, but who am I gonna talk to?"',
    advice: 'It\'s okay to feel sad. Reach out to someone you trust, or write about what\'s weighing on your heart. You\'re not alone.'
  },
  'Angry': {
    song: 'Bad Blood',
    artist: 'Taylor Swift',
    lyric: '"Now we got problems, and I don\'t think we can solve them"',
    advice: 'Channel this energy constructively. Take deep breaths, go for a walk, or express your feelings through movement or art.'
  },
  'Peaceful': {
    song: 'Filter',
    artist: 'Jimin (BTS)',
    lyric: '"I wanna be your filter, all your love is all I need"',
    advice: 'Savor this tranquility. This is a perfect time for meditation, gentle stretching, or simply being present in the moment.'
  },
  'Anxious': {
    song: 'Breathe Me',
    artist: 'Taylor Swift',
    lyric: '"I\'m small and I\'m tired, and I can\'t catch my breath"',
    advice: 'Focus on your breathing. Try the 4-7-8 technique: inhale for 4, hold for 7, exhale for 8. You\'ve got this, one breath at a time.'
  }
};

export default function SongAdvicePopup({ mood, onClose }: SongAdvicePopupProps) {
  const advice = MOOD_ADVICE[mood];
  
  if (!advice) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="glass p-6 rounded-3xl border border-white/30 shadow-2xl max-w-md w-full mobile-modal animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20">
                <Music className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800">
                  Musical Wisdom
                </h3>
                <p className="text-sm text-gray-600">
                  For when you&apos;re feeling {mood.toLowerCase()}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/20 transition-colors touch-target"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Song Info */}
          <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100">
            <div className="flex items-center gap-2 mb-3">
              <Heart className="w-4 h-4 text-purple-500" />
              <span className="font-semibold text-purple-700">{advice.song}</span>
              <span className="text-sm text-gray-600">by {advice.artist}</span>
            </div>
            
            {/* Lyric */}
            <blockquote className="text-gray-700 italic text-center py-3 border-l-4 border-purple-300 pl-4 mb-4">
              {advice.lyric}
            </blockquote>
          </div>

          {/* Advice */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <span className="text-lg">💫</span>
              Gentle Guidance
            </h4>
            <p className="text-gray-700 leading-relaxed text-sm">
              {advice.advice}
            </p>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="w-full px-4 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg hover:shadow-xl touch-target"
          >
            Continue Journaling ✨
          </button>

          {/* Decorative elements */}
          <div className="absolute top-4 right-16 w-2 h-2 bg-purple-400/40 rounded-full animate-pulse"></div>
          <div className="absolute bottom-8 left-8 w-1.5 h-1.5 bg-pink-400/40 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
      </div>
    </div>
  );
}
