import { MoodOption } from "@/app/types";

interface WeatherIconProps {
  option: MoodOption;
  isSelected: boolean;
  onSelect: () => void;
}

export default function WeatherIcon({ option, isSelected, onSelect }: WeatherIconProps) {
  const { icon: Icon, label, color } = option;

  return (
    <div
      className={`flex flex-col items-center gap-2 sm:gap-3 cursor-pointer group touch-target transition-all duration-300 hover:scale-105 hover:-translate-y-1 ${isSelected ? 'scale-110 -translate-y-1' : ''}`}
      onClick={onSelect}
    >
      {/* Main container - mobile optimized */}
      <div className={`relative flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-2xl sm:rounded-3xl transition-all duration-500 touch-target ${
        isSelected 
          ? "glass border-2 border-white/60 shadow-2xl glow" 
          : "glass border border-white/30 shadow-lg group-hover:shadow-xl group-hover:border-white/50"
      }`}>
        
        {/* Background glow for selected */}
        {isSelected && (
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-blue-500/20 rounded-2xl sm:rounded-3xl blur-sm"></div>
        )}
        
        {/* Icon - responsive sizing */}
        <Icon className={`w-10 h-10 sm:w-12 sm:h-12 transition-all duration-300 relative z-10 ${
          isSelected 
            ? `${color} drop-shadow-lg scale-110` 
            : `${color} opacity-70 group-hover:opacity-100 group-hover:scale-105`
        }`} />
        
        {/* Selection indicator */}
        {isSelected && (
          <div className="absolute -top-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg animate-fade-in">
            <span className="text-white text-xs font-bold">✓</span>
          </div>
        )}
        
        {/* Floating particles - hidden on small screens */}
        {isSelected && (
          <>
            <div className="hidden sm:block absolute -top-1 -left-1 w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse" />
            <div className="hidden sm:block absolute -bottom-1 -right-1 w-1 h-1 bg-pink-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}} />
          </>
        )}
      </div>
      
      {/* Label - responsive text */}
      <span className={`font-bold text-xs sm:text-sm transition-all duration-300 tracking-tight ${
        isSelected 
          ? `${color} scale-110` 
          : "text-gray-600 group-hover:text-gray-800 group-hover:scale-105"
      }`}>
        {label}
      </span>
    </div>
  );
}