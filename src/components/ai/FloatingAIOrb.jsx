import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Sparkles } from 'lucide-react';

export const FloatingAIOrb = () => {
  const { setIsAiOpen, isAiOpen, activeTab, currentTrack } = useAuth();
  const [isHeroVisible, setIsHeroVisible] = useState(false);

  useEffect(() => {
    // If not on the home tab, hero is not rendered, so button is in expanded state
    if (activeTab !== 'home') {
      setIsHeroVisible(false);
      return;
    }

    const heroElement = document.getElementById('hero-section');
    if (!heroElement) {
      setIsHeroVisible(false);
      return;
    }

    // Use IntersectionObserver to detect whether the Hero section is currently in view
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroVisible(entry.isIntersecting);
      },
      {
        threshold: 0.15 // Triggers when at least 15% of Hero is visible
      }
    );

    observer.observe(heroElement);

    return () => {
      observer.disconnect();
    };
  }, [activeTab]);

  if (isAiOpen) return null;

  return (
    <button
      onClick={() => setIsAiOpen(true)}
      className={`fixed ${currentTrack ? 'bottom-24 sm:bottom-28' : 'bottom-4 sm:bottom-6'} right-4 sm:right-6 lg:right-8 z-30 bg-[#173B28] text-[#F4EDE1] border border-[#C7A24A]/30 shadow-md hover:shadow-lg hover:bg-[#224932] transition-all duration-300 ease-out flex items-center cursor-pointer overflow-hidden ${
        isHeroVisible 
          ? 'w-10 h-10 p-0 rounded-full justify-center' 
          : 'w-auto px-3.5 py-2.5 rounded-full justify-start gap-2 max-w-[calc(100vw-32px)]'
      }`}
      aria-label="Talk to Sukoon AI"
      title="Talk to Sukoon AI"
    >
      <Sparkles className="w-4 h-4 text-[#C7A24A] shrink-0" />
      
      {!isHeroVisible && (
        <span className="font-semibold text-xs text-[#F4EDE1] tracking-wide whitespace-nowrap animate-fadeIn">
          Talk to AI
        </span>
      )}
    </button>
  );
};
