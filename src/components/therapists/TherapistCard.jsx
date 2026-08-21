import React from 'react';
import { Star, Calendar, CheckCircle2 } from 'lucide-react';

export const TherapistCard = ({ therapist, onBook }) => {
  return (
    <div className="group rounded-3xl bg-[#FAF6EF] border border-[#5E7F68]/15 overflow-hidden shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full">
      
      <div className="p-6 sm:p-7 space-y-4">
        
        {/* Profile Header: Larger photo anchor */}
        <div className="flex items-start gap-4">
          <img
            src={therapist.image}
            alt={therapist.name}
            className="w-20 h-20 rounded-2xl object-cover border border-[#5E7F68]/20 shrink-0 group-hover:scale-102 transition-transform duration-300"
            loading="lazy"
          />

          <div className="min-w-0 flex-1 space-y-1">
            <div className="flex items-start justify-between gap-1">
              <h3 className="font-display font-bold text-lg text-[#1E2921] leading-snug">
                {therapist.name}
              </h3>
              <span className="flex items-center gap-1 text-[11px] font-bold text-[#C7A24A] bg-[#ECE1CF]/80 px-2 py-0.5 rounded-full shrink-0 border border-[#C7A24A]/25">
                <Star className="w-3.5 h-3.5 fill-[#C7A24A] text-[#C7A24A]" />
                <span>{therapist.rating}</span>
              </span>
            </div>

            <p className="text-xs text-[#5E7F68] font-semibold leading-tight">
              {therapist.title}
            </p>
            <p className="text-[11px] text-[#6F766F]">
              {therapist.experience}
            </p>
          </div>
        </div>

        {/* Focus Area */}
        <div className="p-3.5 rounded-2xl bg-[#F4EDE1]/60 border border-[#5E7F68]/10 text-xs space-y-1">
          <span className="font-bold text-[#5E7F68] text-[11px] uppercase tracking-wider block">
            Focus Area
          </span>
          <p className="text-[#1E2921] text-xs leading-relaxed font-medium">
            {therapist.specialization}
          </p>
        </div>

        {/* Bio */}
        <p className="text-[11.5px] text-[#6F766F]/85 leading-relaxed line-clamp-3">
          {therapist.bio}
        </p>
      </div>

      {/* Footer & Action Button */}
      <div className="p-6 sm:p-7 pt-0 space-y-3">
        <div className="flex items-center justify-between text-xs pt-3 border-t border-[#5E7F68]/10">
          <span className="text-[#5E7F68] font-semibold flex items-center gap-1.5 text-xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#5E7F68]" />
            <span>{therapist.availability}</span>
          </span>
          <strong className="font-bold text-[#1E2921] text-sm">{therapist.price}</strong>
        </div>

        <button
          onClick={() => onBook(therapist)}
          aria-label={`Book session with ${therapist.name}`}
          className="w-full py-3.5 rounded-2xl bg-[#5E7F68] text-[#F4EDE1] font-bold text-xs shadow-xs hover:bg-[#173B28] transition-colors flex items-center justify-center gap-2 cursor-pointer"
        >
          <Calendar className="w-4 h-4 text-[#C7A24A]" />
          <span>Book Session</span>
        </button>
      </div>
    </div>
  );
};
