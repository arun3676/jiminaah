'use client';

import { useState } from 'react';
import { X, Music, Sparkles } from 'lucide-react';
import { PromiseCategory, CATEGORY_SONGS, PromiseFrequency } from '@/app/lib/promiseTypes';
import { usePromises } from '@/app/hooks/usePromises';

interface PromiseFormProps {
  onClose: () => void;
}

const categories: PromiseCategory[] = ['Self-Love', 'Health & Wellness', 'Creativity', 'Relationships', 'Growth', 'Mindfulness'];

export default function PromiseForm({ onClose }: PromiseFormProps) {
  const { addPromise } = usePromises();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<PromiseCategory>('Self-Love');
  const [frequency, setFrequency] = useState<PromiseFrequency>('daily');
  const [selectedSong, setSelectedSong] = useState(0);

  const handleCategoryChange = (newCategory: PromiseCategory) => {
    setCategory(newCategory);
    setSelectedSong(0); // Reset to first song suggestion
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const songSuggestion = CATEGORY_SONGS[category][selectedSong];
    
    const success = addPromise({
      title: title.trim(),
      description: description.trim(),
      category,
      inspiredSong: songSuggestion.song,
      inspiredArtist: songSuggestion.artist,
      frequency
    });

    if (success) {
      onClose();
    }
  };

  const examplePromises = {
    'Self-Love': 'Practice daily self-compassion and celebrate my unique qualities',
    'Health & Wellness': 'Take a 10-minute walk and drink more water',
    'Creativity': 'Spend 15 minutes creating something beautiful',
    'Relationships': 'Reach out to someone meaningful in my life',
    'Growth': 'Learn something new that expands my horizons',
    'Mindfulness': 'Take 5 minutes for mindful breathing and reflection'
  };

  const currentSongs = CATEGORY_SONGS[category];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
          <h2 className="text-xl font-bold text-gray-800">Create Promise</h2>
          <Sparkles className="w-5 h-5 text-purple-500" />
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Promise Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What do you promise yourself?"
            className="w-full p-3 rounded-xl bg-white/80 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-gray-800 placeholder-gray-500"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => handleCategoryChange(e.target.value as PromiseCategory)}
            className="w-full p-3 rounded-xl bg-white/80 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-gray-800"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Example prompt */}
        <div className="p-3 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200/50">
          <p className="text-sm text-gray-600">
            <span className="font-medium">Example:</span> {examplePromises[category]}
          </p>
        </div>

        {/* Song Suggestions */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Song Inspiration
          </label>
          <div className="space-y-2">
            {currentSongs.map((song, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setSelectedSong(index)}
                className={`w-full p-3 rounded-xl text-left transition-all ${
                  selectedSong === index
                    ? 'bg-gradient-to-r from-amber-100 to-orange-100 border border-amber-300'
                    : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Music className="w-4 h-4 text-amber-600" />
                  <div>
                    <div className="font-medium text-gray-800">{song.song} - {song.artist}</div>
                    <div className="text-xs text-gray-600">{song.message}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Frequency */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Frequency
          </label>
          <div className="grid grid-cols-2 gap-3">
            {(['daily', 'weekly'] as const).map((freq) => (
              <button
                key={freq}
                type="button"
                onClick={() => setFrequency(freq)}
                className={`p-3 rounded-xl font-medium text-sm transition-all ${
                  frequency === freq
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {freq.charAt(0).toUpperCase() + freq.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Notes (Optional)
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add any additional details..."
            rows={2}
            className="w-full p-3 rounded-xl bg-white/80 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-gray-800 placeholder-gray-500 resize-none"
          />
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 px-6 rounded-xl font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-all"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!title.trim()}
            className="flex-1 py-3 px-6 rounded-xl font-medium text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
          >
            Create Promise
          </button>
        </div>
      </form>
    </div>
  );
}
