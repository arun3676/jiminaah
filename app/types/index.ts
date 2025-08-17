import { LucideIcon } from "lucide-react";

export interface MoodOption {
  mood: string;
  label: string;
  icon: LucideIcon;
  color: string;
}

export interface MoodEntry {
  mood: string;
  timestamp: number;
};
