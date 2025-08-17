  'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import PromiseDashboard from '../components/PromiseDashboard';

export default function PromisesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Link 
            href="/"
            className="p-2 rounded-full bg-white/80 backdrop-blur-sm border border-white/20 hover:bg-white/90 transition-all duration-200 shadow-lg"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </Link>
          <div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              Promise Tracker
            </h1>
            <p className="text-gray-600 font-medium">
              Simple daily commitments inspired by Jimin & Taylor Swift
            </p>
          </div>
        </div>
      </div>

      {/* Dashboard */}
      <PromiseDashboard />
    </main>
  );
}
