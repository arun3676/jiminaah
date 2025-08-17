'use client';

import { useState } from 'react';
import { Heart, Share2, Plus } from 'lucide-react';
import { WisdomEntry } from '../lib/wisdomDatabase';

interface WisdomCardProps {
  wisdom: WisdomEntry;
  onSave: (wisdom: WisdomEntry) => void;
  isSaved: boolean;
  onAddToPlaylist?: (wisdom: WisdomEntry) => void;
  isInPlaylist?: boolean;
}

export default function WisdomCard({ wisdom, onSave, isSaved, onAddToPlaylist, isInPlaylist = false }: WisdomCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleSave = () => {
    onSave(wisdom);
  };

  const handleAddToPlaylist = () => {
    if (onAddToPlaylist) {
      onAddToPlaylist(wisdom);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Wisdom from ${wisdom.artist}'s "${wisdom.song}"`,
          text: wisdom.message,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`${wisdom.message}\n\n- Inspired by ${wisdom.artist}'s "${wisdom.song}"`);
    }
  };

  return (
    <div
      className={`relative group p-6 rounded-2xl backdrop-blur-sm border border-white/20 shadow-xl transition-all duration-300 transform hover:scale-105 ${
        isHovered ? 'shadow-2xl' : ''
      }`}
      style={{
        background: `linear-gradient(135deg, ${wisdom.gradient.replace('from-', '').replace('via-', '').replace('to-', '').split(' ').map(color => {
          const colorMap: { [key: string]: string } = {
            'purple-400': 'rgba(196, 181, 253, 0.8)',
            'pink-400': 'rgba(244, 114, 182, 0.8)',
            'purple-600': 'rgba(147, 51, 234, 0.9)',
            'purple-500': 'rgba(168, 85, 247, 0.8)',
            'pink-500': 'rgba(236, 72, 153, 0.8)',
            'indigo-600': 'rgba(79, 70, 229, 0.9)',
            'amber-400': 'rgba(251, 191, 36, 0.8)',
            'orange-500': 'rgba(249, 115, 22, 0.8)',
            'red-500': 'rgba(239, 68, 68, 0.8)',
            'yellow-400': 'rgba(250, 204, 21, 0.8)',
            'amber-500': 'rgba(245, 158, 11, 0.8)',
            'orange-600': 'rgba(234, 88, 12, 0.9)',
            'gray-600': 'rgba(75, 85, 99, 0.8)',
            'blue-500': 'rgba(59, 130, 246, 0.8)',
            'green-400': 'rgba(74, 222, 128, 0.8)',
            'teal-500': 'rgba(20, 184, 166, 0.8)',
            'blue-600': 'rgba(37, 99, 235, 0.9)',
            'cyan-400': 'rgba(34, 211, 238, 0.8)',
            'emerald-500': 'rgba(16, 185, 129, 0.8)',
            'teal-600': 'rgba(13, 148, 136, 0.9)',
            'rose-500': 'rgba(244, 63, 94, 0.8)',
            'rose-600': 'rgba(225, 29, 72, 0.9)',
          };
          return colorMap[color] || 'rgba(168, 85, 247, 0.8)';
        }).join(', ')})`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Glow Effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>
      
      {/* Content */}
      <div className="relative z-10">
        {/* Feeling Badge */}
        {wisdom.feelings && wisdom.feelings.length > 0 && (
          <div className="mb-3">
            <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium text-white bg-white/20 backdrop-blur-sm">
              <span>For {wisdom.feelings[0]} Days</span>
            </div>
          </div>
        )}

        {/* Artist Badge */}
        <div className="flex items-center justify-between mb-4">
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium text-white ${
            wisdom.artist === 'Jimin' 
              ? 'bg-purple-600/80 backdrop-blur-sm' 
              : 'bg-amber-600/80 backdrop-blur-sm'
          }`}>
            <span className="text-sm">{wisdom.icon}</span>
            <span>{wisdom.artist}</span>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleSave}
              className={`p-2 rounded-full backdrop-blur-sm transition-all duration-200 ${
                isSaved 
                  ? 'bg-red-500/80 text-white' 
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
              title={isSaved ? 'Remove from saved' : 'Save wisdom'}
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
            </button>
            {onAddToPlaylist && (
              <button
                onClick={handleAddToPlaylist}
                className={`p-2 rounded-full backdrop-blur-sm transition-all duration-200 ${
                  isInPlaylist 
                    ? 'bg-green-500/80 text-white' 
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
                title={isInPlaylist ? 'In daily playlist' : 'Add to daily playlist'}
              >
                <Plus className={`w-4 h-4 ${isInPlaylist ? 'rotate-45' : ''}`} />
              </button>
            )}
            <button
              onClick={handleShare}
              className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm transition-all duration-200"
              title="Share wisdom"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Wisdom Message */}
        <p className="text-white text-lg font-medium leading-relaxed mb-4">
          {wisdom.message}
        </p>

        {/* Song Title */}
        <div className="flex items-center gap-2">
          <div className="h-px flex-1 bg-white/30"></div>
          <span className="text-white/90 text-sm font-semibold px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm">
&ldquo;{wisdom.song}&rdquo;
          </span>
          <div className="h-px flex-1 bg-white/30"></div>
        </div>

        {/* Daily Tip */}
        {wisdom.dailyTip && (
          <div className="mt-4 p-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
            <div className="flex items-start gap-2">
              <span className="text-yellow-300 text-sm">💡</span>
              <div>
                <p className="text-white/90 text-xs font-medium mb-1">Daily Tip:</p>
                <p className="text-white/80 text-sm">{wisdom.dailyTip}</p>
              </div>
            </div>
          </div>
        )}

        {/* Category */}
        <div className="mt-3 text-center">
          <span className="text-white/70 text-xs uppercase tracking-wider">
            {wisdom.category}
          </span>
        </div>
      </div>

      {/* Hover Glow */}
      {isHovered && (
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-white/20 to-transparent blur-sm pointer-events-none"></div>
      )}
    </div>
  );
}
