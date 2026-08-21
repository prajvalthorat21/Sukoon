import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Play, Pause, Clock, Volume2 } from 'lucide-react';

export const MeditationCard = ({ meditation, onPlay }) => {
  const { currentTrack, isPlaying, setIsPlaying } = useAuth();
  const isCurrentTrack = currentTrack?.id === meditation.id;
  const isCurrentlyPlaying = isCurrentTrack && isPlaying;

  const handleAction = () => {
    if (isCurrentTrack) {
      setIsPlaying(!isPlaying);
    } else {
      onPlay(meditation);
    }
  };

  return (
    <div 
      className={`group rounded-3xl bg-[#FAF6EF] border transition-all duration-300 flex flex-col h-full overflow-hidden ${
        isCurrentlyPlaying 
          ? 'border-[#5E7F68] shadow-md ring-1 ring-[#5E7F68]/30' 
          : 'border-[#5E7F68]/15 shadow-xs hover:shadow-md hover:-translate-y-1'
      }`}
    >
      
      {/* Image Thumbnail Container */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={meditation.image}
          alt={meditation.altText || meditation.title || "Guided meditation session"}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#173B28]/70 via-transparent to-transparent" />

        {/* Badge & Duration overlay */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
          <span className="px-3 py-1 rounded-full bg-[#173B28]/85 backdrop-blur-md text-[#C7A24A] text-[10px] font-semibold uppercase tracking-wider border border-[#C7A24A]/25 shadow-xs">
            {meditation.category}
          </span>
          <span className="px-2.5 py-1 rounded-full bg-[#ECE1CF]/90 backdrop-blur-md text-[#1E2921] text-xs font-bold flex items-center gap-1 shadow-xs">
            <Clock className="w-3 h-3 text-[#5E7F68]" />
            <span>{meditation.duration}</span>
          </span>
        </div>

        {/* Quick Play / Pause Button Overlay */}
        <button
          onClick={handleAction}
          aria-label={isCurrentlyPlaying ? `Pause ${meditation.title}` : `Play ${meditation.title}`}
          className={`absolute inset-0 m-auto w-12 h-12 rounded-full flex items-center justify-center shadow-md transition-all duration-300 cursor-pointer z-10 ${
            isCurrentlyPlaying 
              ? 'bg-[#173B28] text-[#F4EDE1] scale-105 opacity-100 ring-2 ring-[#C7A24A]/40' 
              : 'bg-[#5E7F68] text-[#F4EDE1] opacity-90 group-hover:scale-110 group-hover:opacity-100'
          }`}
        >
          {isCurrentlyPlaying ? (
            <Pause className="w-5 h-5 fill-[#F4EDE1]" />
          ) : (
            <Play className="w-5 h-5 fill-[#F4EDE1] ml-0.5" />
          )}
        </button>
      </div>

      {/* Details Area */}
      <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-xl text-[#1E2921] group-hover:text-[#5E7F68] transition-colors leading-snug">
              {meditation.title}
            </h3>
            {isCurrentlyPlaying && (
              <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#5E7F68] bg-[#5E7F68]/10 px-2 py-0.5 rounded-full">
                <Volume2 className="w-3 h-3 animate-pulse text-[#5E7F68]" />
                Playing
              </span>
            )}
          </div>
          <p className="text-xs text-[#6F766F] leading-relaxed line-clamp-2">
            {meditation.description}
          </p>
        </div>

        <div className="pt-3 border-t border-[#5E7F68]/10 flex items-center justify-between text-xs text-[#6F766F]">
          <span>Guided by <strong className="text-[#1E2921] font-semibold">{meditation.instructor}</strong></span>
          <button
            onClick={handleAction}
            aria-label={isCurrentlyPlaying ? `Pause ${meditation.title}` : `Listen to ${meditation.title}`}
            className="text-[#5E7F68] font-bold hover:text-[#173B28] transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span>{isCurrentlyPlaying ? 'Pause' : 'Listen'}</span>
            {isCurrentlyPlaying ? (
              <Pause className="w-3 h-3 fill-[#5E7F68]" />
            ) : (
              <Play className="w-3 h-3 fill-[#5E7F68]" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
