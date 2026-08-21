import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { MEDITATIONS, MEDITATION_CATEGORIES } from '../../data/meditationsData';
import { SectionHeading } from '../common/SectionHeading';
import { MeditationCard } from './MeditationCard';

export const MeditationSection = () => {
  const { playMeditation } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredMeditations = selectedCategory === 'All'
    ? MEDITATIONS
    : MEDITATIONS.filter(m => m.category === selectedCategory);

  return (
    <section className="py-20 sm:py-28 lg:py-32 bg-[#ECE1CF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          badge="Guided Sanctuary"
          title="Meditation for College Life"
          subtitle="Choose the kind of calm you need right now — short, intentional sessions to restore mental clarity between study routines."
        />

        {/* Category Filter Tabs */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {MEDITATION_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              aria-label={`Filter sessions by ${cat}`}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#5E7F68] text-[#F4EDE1] shadow-xs'
                  : 'bg-[#FAF6EF] text-[#6F766F] hover:bg-[#F4EDE1] border border-[#5E7F68]/15'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid of Meditation Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMeditations.map((item) => (
            <MeditationCard
              key={item.id}
              meditation={item}
              onPlay={playMeditation}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
