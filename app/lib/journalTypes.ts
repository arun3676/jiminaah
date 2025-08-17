export interface JournalEntry {
  id: string;
  date: string; // ISO string
  mood: string; // e.g., 'Joyful', 'Anxious', 'Hopeful'
  note: string; // max 300 chars
}

export type JournalEntries = JournalEntry[];

export const JOURNAL_STORAGE_KEY = 'moodJournal';
export const MAX_NOTE_LENGTH = 300;

// Pre-loaded example for first-time users
export const SAMPLE_JOURNAL_ENTRIES: JournalEntry[] = [
  {
    id: '1',
    date: '2025-08-16T12:00:00.000Z',
    mood: 'Joyful',
    note: 'Felt amazing after a great day with friends—grateful for the little things!'
  }
];
