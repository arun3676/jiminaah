import { MoodOption } from "@/app/types";
import {
  Sun,
  Cloud,
  CloudRain,
  CloudLightning,
  CloudSnow,
  Wind,
} from "lucide-react";

export const moodOptions: MoodOption[] = [
  {
    mood: "sunny",
    label: "Joyful",
    icon: Sun,
    color: "text-yellow-500",
  },
  {
    mood: "cloudy",
    label: "Calm",
    icon: Cloud,
    color: "text-gray-500",
  },
  {
    mood: "rainy",
    label: "Sad",
    icon: CloudRain,
    color: "text-blue-500",
  },
  {
    mood: "stormy",
    label: "Angry",
    icon: CloudLightning,
    color: "text-purple-600",
  },
  {
    mood: "snowy",
    label: "Peaceful",
    icon: CloudSnow,
    color: "text-sky-400",
  },
  {
    mood: "windy",
    label: "Anxious",
    icon: Wind,
    color: "text-green-500",
  },
];
