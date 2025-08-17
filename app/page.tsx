import { Sparkles, Heart, Star } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen mobile-safe-area smooth-scroll relative overflow-hidden">
      {/* Background decorative elements - hidden on mobile */}
      <div className="hidden md:block absolute top-20 left-10 w-3 h-3 bg-purple-400/30 rounded-full blur-sm float"></div>
      <div className="hidden md:block absolute top-40 right-16 w-2 h-2 bg-pink-400/40 rounded-full blur-sm float" style={{animationDelay: '1s'}}></div>
      <div className="hidden md:block absolute bottom-60 left-20 w-2.5 h-2.5 bg-yellow-400/30 rounded-full blur-sm float" style={{animationDelay: '2s'}}></div>
      <div className="hidden md:block absolute bottom-60 right-12 w-1 h-1 bg-blue-400 rounded-full opacity-30 float" style={{animationDelay: '0.5s'}}></div>

      <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8">
        <div className="relative w-full max-w-lg mx-auto">
          {/* Main Card */}
          <div className="relative rounded-3xl glass p-8 overflow-hidden group hover:scale-[1.02] transition-all duration-500">
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Content */}
            <div className="relative z-10 text-center">
              {/* Welcome badge */}
              <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg mb-6 glow">
                <Sparkles className="h-4 w-4" />
                Welcome to Magic
              </div>

              {/* App title */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-gray-900 mb-3 leading-tight">
                Serendipity{" "}
                <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                  Vibes
                </span>
              </h1>
              
              {/* Personal greeting */}
              <p className="text-lg sm:text-xl font-semibold text-gray-700 mb-4">
                Hello Keerthana 👋
              </p>

              {/* Subtitle with icons */}
              <div className="flex items-center justify-center gap-2 mb-6">
                <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-pink-500" />
                <p className="text-base sm:text-lg text-gray-600 font-medium text-center">
                  Your daily companion for growth & positivity
                </p>
                <Star className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500" />
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col gap-3 justify-center">
                <Link 
                  href="/mood-check-in"
                  className="group inline-flex items-center justify-center gap-3 rounded-full px-6 py-3 sm:px-8 sm:py-4 text-white font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 glow touch-target"
                >
                  <span>Check Your Vibe</span>
                  <span className="transition-transform group-hover:translate-x-1">🌤️</span>
                </Link>
                
                <Link 
                  href="/wisdom"
                  className="group inline-flex items-center justify-center gap-3 rounded-full px-6 py-3 sm:px-8 sm:py-4 text-white font-bold bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 touch-target"
                >
                  <span>Find Wisdom</span>
                  <span className="transition-transform group-hover:translate-x-1">✨</span>
                </Link>
                
                <Link 
                  href="/promises"
                  className="group inline-flex items-center justify-center gap-3 rounded-full px-6 py-3 sm:px-8 sm:py-4 text-white font-bold bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 touch-target"
                >
                  <span>Track Promises</span>
                  <span className="transition-transform group-hover:translate-x-1">🎯</span>
                </Link>
                
                <Link 
                  href="/chat"
                  className="group inline-flex items-center justify-center gap-3 rounded-full px-6 py-3 sm:px-8 sm:py-4 text-white font-bold bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 touch-target"
                >
                  <span>Chat with Jimin</span>
                  <span className="transition-transform group-hover:translate-x-1">💜</span>
                </Link>
              </div>

              {/* Small decorative text */}
              <p className="mt-6 text-xs sm:text-sm text-gray-500 font-medium">
                Track moods • Find wisdom • Chat with Jimin • Grow daily
              </p>
            </div>
          </div>

          {/* Decorative blurs - hidden on mobile */}
          <div className="hidden sm:block absolute -top-8 -left-8 w-24 h-24 bg-purple-400/30 rounded-full blur-2xl"></div>
          <div className="hidden sm:block absolute -bottom-8 -right-8 w-32 h-32 bg-pink-400/30 rounded-full blur-2xl"></div>
        </div>
      </div>
    </main>
  );
}