'use client';

import { useState, useEffect } from 'react';
import { Sparkles, Send, Heart, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { matchWisdomToInput, getRandomWisdom, WisdomEntry, Feeling } from '../lib/wisdomDatabase';
import { useLocalStorage } from '../lib/useLocalStorage';
import { useWisdomTracking } from '../hooks/useWisdomTracking';
import { useDailyPlaylist } from '../hooks/useDailyPlaylist';
import WisdomCard from '../components/WisdomCard';
import FeelingSelector from '../components/FeelingSelector';

export default function WisdomPage() {
  const [input, setInput] = useState('');
  const [wisdom, setWisdom] = useState<WisdomEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [savedWisdom, setSavedWisdom] = useLocalStorage<WisdomEntry[]>('saved-wisdom', []);
  const [showSaved, setShowSaved] = useState(false);
  const [selectedFeeling, setSelectedFeeling] = useState<Feeling | null>(null);
  const { getWisdomForFeeling, isClient } = useWisdomTracking();
  const { addToPlaylist, isInPlaylist } = useDailyPlaylist();

  // Load random wisdom on component mount
  useEffect(() => {
    setWisdom(getRandomWisdom(3));
  }, []);

  const handleFeelingSelect = (feeling: Feeling) => {
    setSelectedFeeling(feeling);
    setIsLoading(true);
    
    // Get exactly 2 wisdom entries for the selected feeling with non-repetition
    setTimeout(() => {
      const results = getWisdomForFeeling(feeling);
      setWisdom(results);
      setIsLoading(false);
    }, 800);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsLoading(true);
    
    // Combine feeling-based and input-based matching if both are provided
    setTimeout(() => {
      let results: WisdomEntry[];
      
      if (selectedFeeling && input.trim()) {
        // If both feeling and input are provided, get feeling-based results first
        const feelingResults = getWisdomForFeeling(selectedFeeling);
        const inputResults = matchWisdomToInput(input);
        
        // Combine and deduplicate, prioritizing feeling-based results
        const combined = [...feelingResults];
        inputResults.forEach((entry: WisdomEntry) => {
          if (!combined.find(existing => existing.id === entry.id)) {
            combined.push(entry);
          }
        });
        
        results = combined.slice(0, 3);
      } else if (selectedFeeling) {
        results = getWisdomForFeeling(selectedFeeling);
      } else {
        results = matchWisdomToInput(input);
      }
      
      setWisdom(results);
      setIsLoading(false);
    }, 800);
  };

  const handleSaveWisdom = (wisdom: WisdomEntry) => {
    const isAlreadySaved = savedWisdom.some(saved => saved.id === wisdom.id);
    
    if (isAlreadySaved) {
      setSavedWisdom(savedWisdom.filter(saved => saved.id !== wisdom.id));
    } else {
      setSavedWisdom([...savedWisdom, wisdom]);
    }
  };

  const isWisdomSaved = (wisdomId: string) => {
    return savedWisdom.some(saved => saved.id === wisdomId);
  };

  const handleAddToPlaylist = (wisdom: WisdomEntry) => {
    addToPlaylist(wisdom);
  };

  const handleGetRandomWisdom = () => {
    setIsLoading(true);
    setTimeout(() => {
      setWisdom(getRandomWisdom(3));
      setIsLoading(false);
    }, 500);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Link 
              href="/"
              className="p-2 rounded-full bg-white/70 backdrop-blur-sm hover:bg-white/90 transition-all duration-200"
            >
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </Link>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg">
              <Sparkles className="h-4 w-4" />
              Wisdom Translator
            </div>
            <button
              onClick={() => setShowSaved(!showSaved)}
              className={`p-2 rounded-full backdrop-blur-sm transition-all duration-200 ${
                showSaved 
                  ? 'bg-red-500/80 text-white' 
                  : 'bg-white/70 hover:bg-white/90 text-gray-700'
              }`}
            >
              <Heart className={`w-5 h-5 ${showSaved ? 'fill-current' : ''}`} />
            </button>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
            Find Your Wisdom
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Discover inspiration from Jimin and Taylor Swift&apos;s most uplifting songs
          </p>
        </div>

        {/* Toggle between main view and saved wisdom */}
        {showSaved ? (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Saved Wisdom</h2>
              {savedWisdom.length === 0 ? (
                <p className="text-gray-600">No saved wisdom yet. Start exploring to save your favorites!</p>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {savedWisdom.map((wisdom) => (
                    <WisdomCard
                      key={wisdom.id}
                      wisdom={wisdom}
                      onSave={handleSaveWisdom}
                      isSaved={true}
                      onAddToPlaylist={handleAddToPlaylist}
                      isInPlaylist={isInPlaylist(wisdom.id)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <>
            {/* Feeling Selector */}
            <div className="mb-8">
              <FeelingSelector
                selectedFeeling={selectedFeeling}
                onFeelingSelect={handleFeelingSelect}
                className="mb-6"
              />
            </div>

            {/* Input Form */}
            <div className="mb-8">
              <form onSubmit={handleSubmit} className="relative">
                <div className="relative">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Optional: Add more context about your situation or what you're going through..."
                    className="w-full p-6 pr-16 rounded-2xl bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent text-gray-800 placeholder-gray-500"
                    rows={4}
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="absolute bottom-4 right-4 p-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </form>

              {/* Quick Actions */}
              <div className="flex flex-wrap gap-3 mt-4 justify-center">
                <button
                  onClick={handleGetRandomWisdom}
                  disabled={isLoading}
                  className="px-4 py-2 rounded-full bg-white/70 backdrop-blur-sm text-gray-700 hover:bg-white/90 transition-all duration-200 text-sm font-medium disabled:opacity-50"
                >
                  ✨ Random Wisdom
                </button>
                <button
                  onClick={() => {
                    setInput("I'm feeling lost and need direction");
                    handleSubmit({} as React.FormEvent<HTMLFormElement>);
                  }}
                  disabled={isLoading}
                  className="px-4 py-2 rounded-full bg-white/70 backdrop-blur-sm text-gray-700 hover:bg-white/90 transition-all duration-200 text-sm font-medium disabled:opacity-50"
                >
                  🧭 Need Direction
                </button>
                <button
                  onClick={() => {
                    setInput("I want to feel more confident and authentic");
                    handleSubmit({} as React.FormEvent<HTMLFormElement>);
                  }}
                  disabled={isLoading}
                  className="px-4 py-2 rounded-full bg-white/70 backdrop-blur-sm text-gray-700 hover:bg-white/90 transition-all duration-200 text-sm font-medium disabled:opacity-50"
                >
                  💎 Build Confidence
                </button>
              </div>
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="text-center py-12">
                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/80 backdrop-blur-sm shadow-lg">
                  <div className="w-5 h-5 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-gray-700 font-medium">Finding your wisdom...</span>
                </div>
              </div>
            )}

            {/* Wisdom Results */}
            {!isLoading && wisdom.length > 0 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Wisdom</h2>
                  <p className="text-gray-600">
                    {input.trim() ? 'Based on what you shared' : 'Random inspiration for you'}
                  </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {wisdom.map((wisdomEntry: WisdomEntry, index: number) => (
                    <div
                      key={wisdomEntry.id}
                      className="animate-fade-in"
                      style={{ animationDelay: `${index * 150}ms` }}
                    >
                      <WisdomCard
                        wisdom={wisdomEntry}
                        onSave={handleSaveWisdom}
                        isSaved={isWisdomSaved(wisdomEntry.id)}
                        onAddToPlaylist={handleAddToPlaylist}
                        isInPlaylist={isInPlaylist(wisdomEntry.id)}
                      />
                    </div>
                  ))}
                </div>

                {/* Get More Wisdom Button */}
                <div className="text-center mt-8">
                  <button
                    onClick={handleGetRandomWisdom}
                    className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                  >
                    Get More Wisdom ✨
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </main>
  );
}
