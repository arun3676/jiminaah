'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
  className?: string;
  showText?: boolean;
}

export default function BackButton({ className = '', showText = false }: BackButtonProps) {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <button
      onClick={handleBack}
      className={`
        inline-flex items-center gap-2 px-3 py-2 rounded-full
        bg-white/80 backdrop-blur-sm border border-purple-200/50
        text-gray-700 hover:text-purple-600
        hover:bg-purple-50 hover:border-purple-300
        hover:shadow-lg hover:shadow-purple-200/50
        transition-all duration-200 transform hover:scale-105
        focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-opacity-50
        ${className}
      `}
      aria-label="Go back"
    >
      <ArrowLeft size={18} />
      {showText && <span className="text-sm font-medium">Back</span>}
    </button>
  );
}
