"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, User, Sparkles } from 'lucide-react';

const navItems = [
  { href: '/mood-check-in', label: 'Mood', icon: Home },
  { href: '/wisdom', label: 'Wisdom', icon: Sparkles },
  { href: '/profile', label: 'You', icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] sm:w-[calc(100%-3rem)] max-w-xs mx-auto glass rounded-full shadow-2xl z-50 border border-white/30 mobile-safe-area-bottom animate-fade-in">
      
      <div className="flex justify-around items-center h-14 sm:h-16 px-3 sm:px-4">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link 
              href={href} 
              key={label} 
              className="relative flex flex-col items-center justify-center w-14 sm:w-16 h-full transition-all duration-300 touch-target"
            >
              {/* Active background */}
              {isActive && (
                <div className="absolute inset-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-20 transition-all duration-300" />
              )}
              
              {/* Icon */}
              <Icon className={`w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300 ${
                isActive 
                  ? 'text-purple-600 scale-110' 
                  : 'text-gray-500 hover:text-gray-700'
              }`} />
              
              {/* Label */}
              <span className={`text-xs font-semibold transition-all duration-300 mt-0.5 sm:mt-1 ${
                isActive 
                  ? 'text-purple-600' 
                  : 'text-gray-500'
              }`}>
                {label}
              </span>

              {/* Active dot */}
              {isActive && (
                <div className="absolute -bottom-1 w-1.5 h-1.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-300" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}