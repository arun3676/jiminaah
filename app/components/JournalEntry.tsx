'use client';

import { useState } from 'react';
import { Edit3, Trash2, Save, X, Calendar } from 'lucide-react';
import { JournalEntry as JournalEntryType } from '@/app/lib/journalTypes';

interface JournalEntryProps {
  entry: JournalEntryType;
  onUpdate: (id: string, note: string) => void;
  onDelete: (id: string) => void;
}

// Mood to emoji mapping
const MOOD_EMOJIS: Record<string, string> = {
  'Joyful': '☀️',
  'Calm': '☁️', 
  'Sad': '🌧️',
  'Angry': '⛈️',
  'Peaceful': '❄️',
  'Anxious': '💨',
  'Hopeful': '🌈',
  'Grateful': '✨',
  'Excited': '🎉',
  'Reflective': '🌙'
};

export default function JournalEntry({ entry, onUpdate, onDelete }: JournalEntryProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editNote, setEditNote] = useState(entry.note);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleSave = () => {
    if (editNote.trim() && editNote !== entry.note) {
      onUpdate(entry.id, editNote.trim());
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditNote(entry.note);
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDelete(entry.id);
    setShowDeleteConfirm(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined
      });
    }
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="glass p-4 sm:p-5 rounded-2xl border border-white/30 shadow-lg animate-fade-in">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="text-2xl sm:text-3xl">
            {MOOD_EMOJIS[entry.mood] || '💭'}
          </div>
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="w-3 h-3" />
              <span className="font-medium">{formatDate(entry.date)}</span>
              <span className="text-gray-400">•</span>
              <span>{formatTime(entry.date)}</span>
            </div>
            <div className="text-sm font-semibold text-purple-600 mt-1">
              {entry.mood}
            </div>
          </div>
        </div>

        {/* Action buttons */}
        {!isEditing && (
          <div className="flex gap-2">
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 rounded-lg hover:bg-white/20 transition-colors touch-target"
              title="Edit note"
            >
              <Edit3 className="w-4 h-4 text-gray-600" />
            </button>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="p-2 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors touch-target"
              title="Delete entry"
            >
              <Trash2 className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        )}
      </div>

      {/* Note content */}
      {isEditing ? (
        <div className="space-y-3 animate-fade-in">
            <textarea
              value={editNote}
              onChange={(e) => setEditNote(e.target.value)}
              className="w-full h-24 p-3 rounded-xl border border-gray-200 bg-white/80 backdrop-blur-sm resize-none focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-300 transition-all text-sm"
              maxLength={300}
              autoFocus
            />
            <div className="flex gap-2">
              <button
                onClick={handleCancel}
                className="flex-1 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 bg-white/60 hover:bg-white/80 transition-colors touch-target"
              >
                <X className="w-4 h-4 inline mr-1" />
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={!editNote.trim()}
                className="flex-1 px-3 py-2 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 transition-all touch-target"
              >
                <Save className="w-4 h-4 inline mr-1" />
                Save
              </button>
            </div>
        </div>
      ) : (
        <p className="text-gray-700 text-sm sm:text-base leading-relaxed animate-fade-in">
          {entry.note}
        </p>
      )}

      {/* Delete confirmation modal */}
      {showDeleteConfirm && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in"
          onClick={() => setShowDeleteConfirm(false)}
        >
          <div
            className="glass p-6 rounded-2xl border border-white/30 shadow-2xl max-w-sm w-full mobile-modal animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
              <div className="text-center">
                <div className="text-4xl mb-4">🗑️</div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  Delete this entry?
                </h3>
                <p className="text-sm text-gray-600 mb-6">
                  This action cannot be undone. Your journal note will be permanently removed.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="flex-1 px-4 py-3 rounded-xl font-semibold text-gray-700 bg-white/60 hover:bg-white/80 transition-all touch-target"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    className="flex-1 px-4 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 transition-all shadow-lg hover:shadow-xl touch-target"
                  >
                    Delete
                  </button>
                </div>
              </div>
          </div>
        </div>
      )}
    </div>
  );
}
