'use client';

import BackButton from '../components/BackButton';

export default function ProfilePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Back Button */}
      <div className="absolute top-6 left-6 z-10">
        <BackButton />
      </div>
      
      <div className="text-center animate-fade-in">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Profile</h1>
        <p className="text-lg text-gray-600">This is where your mood history and insights will live.</p>
      </div>
    </main>
  );
}
