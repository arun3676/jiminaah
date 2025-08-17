'use client';

import { useState } from 'react';
import { Plus, Target, Calendar, Flame } from 'lucide-react';
import { usePromises } from '@/app/hooks/usePromises';
import PromiseCard from './PromiseCard';
import PromiseForm from './PromiseForm';

export default function PromiseDashboard() {
  const { promises, completePromise, deletePromise, isCompletedToday, isDueToday, getStats, isClient } = usePromises();
  const [showForm, setShowForm] = useState(false);

  if (!isClient) {
    return (
      <div className="animate-pulse">
        <div className="h-32 bg-gray-200 rounded-2xl mb-6"></div>
        <div className="space-y-4">
          <div className="h-24 bg-gray-200 rounded-2xl"></div>
          <div className="h-24 bg-gray-200 rounded-2xl"></div>
        </div>
      </div>
    );
  }

  const stats = getStats();

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-100 to-pink-100 border border-purple-200/50">
          <div className="flex items-center gap-2 mb-1">
            <Target className="w-4 h-4 text-purple-600" />
            <span className="text-xs font-medium text-purple-700">Active</span>
          </div>
          <div className="text-2xl font-bold text-purple-800">{stats.activeCount}</div>
          <div className="text-xs text-purple-600">of 5 max</div>
        </div>

        <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-100 to-indigo-100 border border-blue-200/50">
          <div className="flex items-center gap-2 mb-1">
            <Calendar className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-medium text-blue-700">Due Today</span>
          </div>
          <div className="text-2xl font-bold text-blue-800">{stats.dueToday.length}</div>
          <div className="text-xs text-blue-600">promises</div>
        </div>

        <div className="p-4 rounded-2xl bg-gradient-to-br from-orange-100 to-red-100 border border-orange-200/50">
          <div className="flex items-center gap-2 mb-1">
            <Flame className="w-4 h-4 text-orange-600" />
            <span className="text-xs font-medium text-orange-700">Total Streak</span>
          </div>
          <div className="text-2xl font-bold text-orange-800">{stats.totalStreak}</div>
          <div className="text-xs text-orange-600">days</div>
        </div>
      </div>

      {/* Create Promise Button */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">Your Promises</h2>
        {promises.length < 5 && (
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            <Plus className="w-4 h-4" />
            Create Promise
          </button>
        )}
      </div>

      {/* Promise Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <PromiseForm onClose={() => setShowForm(false)} />
          </div>
        </div>
      )}

      {/* Promises List */}
      {promises.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🎯</div>
          <h3 className="text-lg font-bold text-gray-800 mb-2">No promises yet</h3>
          <p className="text-gray-600 mb-6">Create your first promise to start building positive habits!</p>
          <button
            onClick={() => setShowForm(true)}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            Create Your First Promise
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Due Today Section */}
          {stats.dueToday.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-500" />
                Due Today ({stats.dueToday.length})
              </h3>
              <div className="space-y-3">
                {stats.dueToday.map((promise) => (
                  <PromiseCard
                    key={promise.id}
                    promise={promise}
                    onComplete={completePromise}
                    onDelete={deletePromise}
                    isCompletedToday={isCompletedToday(promise)}
                    isDue={true}
                  />
                ))}
              </div>
            </div>
          )}

          {/* All Promises Section */}
          <div>
            <h3 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
              <Target className="w-4 h-4 text-purple-500" />
              All Promises ({promises.length})
            </h3>
            <div className="grid gap-3 md:grid-cols-2">
              {promises.map((promise) => (
                <PromiseCard
                  key={promise.id}
                  promise={promise}
                  onComplete={completePromise}
                  onDelete={deletePromise}
                  isCompletedToday={isCompletedToday(promise)}
                  isDue={isDueToday(promise)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
