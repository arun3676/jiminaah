'use client';

import { Feeling, FEELINGS } from '@/app/lib/wisdomDatabase';

interface FeelingSelectorProps {
  selectedFeeling: Feeling | null;
  onFeelingSelect: (feeling: Feeling) => void;
  className?: string;
}

const feelingEmojis: Record<Feeling, string> = {
  "Happy": "😊",
  "Sad": "😢", 
  "Anxious": "😰",
  "Depressed": "😔",
  "Mixed": "😵‍💫",
  "Empowered": "💪",
  "Lonely": "😞",
  "Excited": "🤩",
  "Confused": "🤔",
  "Hopeful": "🌟"
};

const feelingColors: Record<Feeling, string> = {
  "Happy": "from-yellow-400 to-orange-500",
  "Sad": "from-blue-400 to-gray-500",
  "Anxious": "from-purple-400 to-blue-500", 
  "Depressed": "from-gray-400 to-blue-600",
  "Mixed": "from-purple-500 to-pink-500",
  "Empowered": "from-red-500 to-pink-600",
  "Lonely": "from-gray-500 to-purple-500",
  "Excited": "from-orange-400 to-red-500",
  "Confused": "from-teal-400 to-blue-500",
  "Hopeful": "from-green-400 to-blue-500"
};

export default function FeelingSelector({ selectedFeeling, onFeelingSelect, className = "" }: FeelingSelectorProps) {
  return (
    <div className={`w-full ${className}`}>
      <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
        How are you feeling today?
      </h3>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {FEELINGS.map((feeling) => (
          <button
            key={feeling}
            onClick={() => onFeelingSelect(feeling)}
            className={`
              relative p-4 rounded-xl transition-all duration-300 transform hover:scale-105
              bg-gradient-to-br ${feelingColors[feeling]}
              ${selectedFeeling === feeling 
                ? 'ring-4 ring-white ring-opacity-60 shadow-xl scale-105' 
                : 'hover:shadow-lg'
              }
              text-white font-medium text-sm
              active:scale-95
            `}
          >
            <div className="flex flex-col items-center space-y-2">
              <span className="text-2xl">{feelingEmojis[feeling]}</span>
              <span className="text-xs font-semibold tracking-wide">
                {feeling}
              </span>
            </div>
            
            {selectedFeeling === feeling && (
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
            )}
          </button>
        ))}
      </div>
      
      {selectedFeeling && (
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Selected: <span className="font-semibold text-gray-800">{selectedFeeling}</span>
          </p>
        </div>
      )}
    </div>
  );
}
