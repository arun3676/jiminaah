'use client';

import { useState } from 'react';
import { usePromises } from '@/app/hooks/usePromises';
import PromiseCard from './PromiseCard';
import { Promise } from '@/app/lib/promiseTypes';

export default function SamplePromiseDemo() {
  const { promises, completePromise, deletePromise, isCompletedToday, isDueToday } = usePromises();
  const [showDemo, setShowDemo] = useState(false);

  // Sample promise for demonstration
  const samplePromise: Promise = {
    id: 'demo-promise-1',
    title: 'Practice daily self-compassion',
    description: 'Take 5 minutes each morning to speak kindly to myself',
    category: 'Self-Love',
    inspiredSong: 'Promise',
    inspiredArtist: 'Jimin (BTS)',
    frequency: 'daily',
    streak: 3,
    history: [
      { date: '2025-08-14', completed: true },
      { date: '2025-08-15', completed: true },
      { date: '2025-08-16', completed: true }
    ],
    createdAt: '2025-08-14T08:00:00.000Z'
  };

  if (!showDemo) {
    return (
      <div className="p-6 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl border border-purple-200/50 mb-6">
        <h3 className="text-lg font-bold text-gray-800 mb-2">🎯 Demo: Simplified Promise Tracker</h3>
        <p className="text-gray-600 mb-4">
          See how the new streamlined Promise Tracker works with song-inspired motivation and easy check-offs.
        </p>
        <button
          onClick={() => setShowDemo(true)}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium shadow-md hover:shadow-lg transition-all hover:scale-105"
        >
          Show Sample Promise
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="p-4 bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl border border-green-200/50">
        <h3 className="text-lg font-bold text-gray-800 mb-2">✨ Sample Promise Demo</h3>
        <p className="text-gray-600 text-sm mb-3">
          This demonstrates the simplified Promise Tracker with song inspiration, easy check-offs, and reflection notes.
        </p>
        <button
          onClick={() => setShowDemo(false)}
          className="text-sm px-3 py-1 rounded-lg bg-white/80 text-gray-700 hover:bg-white transition-colors"
        >
          Hide Demo
        </button>
      </div>

      {/* Sample Promise Card */}
      <div className="max-w-md">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Sample Promise Card:</h4>
        <PromiseCard
          promise={samplePromise}
          onComplete={(id, notes) => {
            console.log('Promise completed:', id, 'Notes:', notes);
            alert(`Promise completed! ${notes ? `Notes: ${notes}` : 'No notes added.'}`);
          }}
          onDelete={(id) => {
            console.log('Promise deleted:', id);
            alert('Promise deleted!');
          }}
          isCompletedToday={false}
          isDue={true}
        />
      </div>

      {/* Features Showcase */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="p-4 bg-white/80 rounded-xl border border-gray-200">
          <h5 className="font-bold text-gray-800 mb-2">🎵 Song Integration</h5>
          <p className="text-sm text-gray-600">
            Each promise is inspired by Jimin or Taylor Swift songs with motivational messages on completion.
          </p>
        </div>
        
        <div className="p-4 bg-white/80 rounded-xl border border-gray-200">
          <h5 className="font-bold text-gray-800 mb-2">📝 Reflection Notes</h5>
          <p className="text-sm text-gray-600">
            Optional reflection input after completing promises for personal growth tracking.
          </p>
        </div>
        
        <div className="p-4 bg-white/80 rounded-xl border border-gray-200">
          <h5 className="font-bold text-gray-800 mb-2">🔥 Streak Tracking</h5>
          <p className="text-sm text-gray-600">
            Automatic streak calculation with visual indicators to maintain motivation.
          </p>
        </div>
        
        <div className="p-4 bg-white/80 rounded-xl border border-gray-200">
          <h5 className="font-bold text-gray-800 mb-2">🎯 Simple & Focused</h5>
          <p className="text-sm text-gray-600">
            Limit of 5 active promises, clean UI, and focus on daily habit building.
          </p>
        </div>
      </div>
    </div>
  );
}
