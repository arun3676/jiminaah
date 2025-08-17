'use client';
import { useRef, useEffect } from 'react';

interface AudioClipPlayerProps {
  src: string;
}

export default function AudioClipPlayer({ src }: AudioClipPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current && src) {
      // Attempt to play audio (browsers may block auto-play)
      audioRef.current.play().catch(() => {
        // Silently handle auto-play restrictions
      });
      
      // Stop audio after 20 seconds
      const timer = setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.pause();
        }
      }, 20000);
      
      return () => clearTimeout(timer);
    }
  }, [src]);

  if (!src) return null;

  return (
    <div className="mt-3 mb-2">
      <audio 
        ref={audioRef} 
        src={src} 
        controls 
        className="w-full max-w-sm rounded-lg shadow-sm bg-white/80 backdrop-blur-sm"
        preload="metadata"
      />
    </div>
  );
}
