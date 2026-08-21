import React from 'react';

export const SectionHeading = ({ badge, title, subtitle, centered = true, dark = false }) => {
  return (
    <div className={`space-y-3.5 ${centered ? 'text-center max-w-3xl mx-auto' : 'text-left max-w-2xl'}`}>
      {badge && (
        <span className={`inline-block px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider uppercase ${
          dark 
            ? 'bg-[#C7A24A]/20 text-[#C7A24A] border border-[#C7A24A]/30' 
            : 'bg-[#5E7F68]/10 text-[#5E7F68] border border-[#5E7F68]/20'
        }`}>
          {badge}
        </span>
      )}
      
      <h2 className={`font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.15] ${
        dark ? 'text-[#F4EDE1]' : 'text-[#1E2921]'
      }`}>
        {title}
      </h2>

      {subtitle && (
        <p className={`text-base sm:text-lg leading-[1.65] font-normal ${
          dark ? 'text-[#F4EDE1]/80' : 'text-[#6F766F]'
        }`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};
