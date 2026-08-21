import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { SectionHeading } from '../common/SectionHeading';
import { MeditationSection } from '../meditation/MeditationSection';
import { BreathingCircle } from '../breathing/BreathingCircle';
import { YogaSection } from './YogaSection';
import { SleepHavenSection } from '../sleep/SleepHavenSection';
import { JournalSection } from '../journal/JournalSection';
import { Headphones, Wind, Sun, Moon, BookOpen, Sparkles, ArrowRight } from 'lucide-react';

const EXPLORE_SUB_TABS = [
  'All',
  'Meditation',
  'Breathing',
  'Yoga',
  'Sleep',
  'Journal',
  'Focus',
  'Stress Relief'
];

export const ExploreSection = () => {
  const { exploreSubCategory, setExploreSubCategory } = useAuth();

  return (
    <div className="py-12 sm:py-20 lg:py-24 bg-[#F4EDE1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 mb-8 sm:mb-12">
        
        <SectionHeading
          badge="Wellness Pillars"
          title="Explore Your Digital Sanctuary"
          subtitle="Short, intentional tools tailored for college life: Guided Meditations, 2-Min Breathing, Sleep Haven & Journaling."
        />

        {/* Sub-Category Filter Navigation Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {EXPLORE_SUB_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setExploreSubCategory(tab)}
              className={`px-5 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                exploreSubCategory === tab
                  ? 'bg-[#5E7F68] text-[#F4EDE1] shadow-md'
                  : 'bg-[#ECE1CF] text-[#6F766F] hover:bg-[#FAF6EF] border border-[#5E7F68]/15'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Dynamic Display Based on Selected Sub-Category */}
      <div className="w-full space-y-0">
        {(exploreSubCategory === 'All' || exploreSubCategory === 'Meditation' || exploreSubCategory === 'Focus') && (
          <MeditationSection />
        )}

        {(exploreSubCategory === 'All' || exploreSubCategory === 'Breathing' || exploreSubCategory === 'Stress Relief') && (
          <BreathingCircle />
        )}

        {(exploreSubCategory === 'All' || exploreSubCategory === 'Yoga') && (
          <YogaSection />
        )}

        {(exploreSubCategory === 'All' || exploreSubCategory === 'Sleep') && (
          <SleepHavenSection />
        )}

        {(exploreSubCategory === 'All' || exploreSubCategory === 'Journal') && (
          <JournalSection />
        )}
      </div>
    </div>
  );
};
