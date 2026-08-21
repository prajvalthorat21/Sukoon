import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Sparkles, ArrowRight, ShieldCheck, Wind, Heart, Smile } from 'lucide-react';
import heroDailyReflectionImg from '../../assets/hero-daily-reflection.jpg';

export const HeroSection = ({ onBeginJourney }) => {
  const { setIsAiOpen, setIsSukoonMomentOpen } = useAuth();

  return (
    <section id="hero-section" className="relative pt-8 pb-16 lg:pt-14 lg:pb-24 bg-[#F4EDE1] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Column: Headline & Primary Action Controls */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Contextual Eyebrow Tagline */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ECE1CF] border border-[#5E7F68]/15 text-xs font-semibold text-[#5E7F68]">
              <span>Student Mental Wellness Platform</span>
            </div>

            {/* Main Editorial Serif Headline */}
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#1E2921] leading-[1.08]">
              A calmer mind. <br className="hidden sm:block" />
              <span className="italic font-serif-subtle text-[#5E7F68] font-normal">
                A better you.
              </span>
            </h1>

            {/* Supporting Description */}
            <p className="text-base sm:text-lg text-[#6F766F] max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              A private, low-stimulation sanctuary for college students to breathe, reflect, manage stress, and find support whenever they need it.
            </p>

            {/* Primary & Secondary Action Controls */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
              
              {/* ONE Clear Primary CTA */}
              <button
                onClick={onBeginJourney}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#5E7F68] text-[#F4EDE1] font-semibold text-base shadow-xs hover:bg-[#173B28] transition-colors duration-200 flex items-center justify-center gap-3 cursor-pointer group"
              >
                <span>Begin Your Journey</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Visually Subordinate Secondary Action */}
              <button
                onClick={() => setIsAiOpen(true)}
                className="w-full sm:w-auto px-6 py-4 rounded-full bg-[#ECE1CF]/70 text-[#1E2921] border border-[#5E7F68]/15 font-medium text-sm hover:bg-[#FAF6EF] transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#C7A24A]" />
                <span>Talk to Sukoon AI</span>
              </button>
            </div>

            {/* Trust Features Badge Row */}
            <div className="pt-4 grid grid-cols-3 gap-4 border-t border-[#5E7F68]/15 max-w-lg mx-auto lg:mx-0 text-left">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#5E7F68] shrink-0" />
                <span className="text-xs text-[#6F766F] font-medium">100% Private</span>
              </div>
              <div className="flex items-center gap-2">
                <Wind className="w-4 h-4 text-[#5E7F68] shrink-0" />
                <span className="text-xs text-[#6F766F] font-medium">Science Backed</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-[#5E7F68] shrink-0" />
                <span className="text-xs text-[#6F766F] font-medium">Student Focused</span>
              </div>
            </div>

          </div>

          {/* Right Column: Integrated Hero Visual */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Visual Image Card */}
              <div className="relative rounded-3xl overflow-hidden shadow-md border border-[#5E7F68]/15 bg-[#FAF6EF] aspect-[4/5] group">
                <img
                  src={heroDailyReflectionImg}
                  alt="College student quietly reflecting by a sunlit dorm window"
                  className="w-full h-full object-cover object-top group-hover:scale-103 transition-transform duration-700"
                  loading="eager"
                />
                
                {/* Visual Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#173B28]/80 via-transparent to-transparent" />

                {/* Floating Micro-Card Quote */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl glass-panel-dark text-[#F4EDE1] space-y-1">
                  <div className="flex items-center gap-2 text-xs text-[#C7A24A] font-semibold uppercase tracking-wider">
                    <Smile className="w-3.5 h-3.5" />
                    <span>Daily Student Reflection</span>
                  </div>
                  <p className="text-xs italic font-serif text-[#F4EDE1]/90 leading-relaxed">
                    “You don’t have to solve everything today. Just take one slow breath at a time.”
                  </p>
                </div>
              </div>

              {/* Floating Reset Micro Badge */}
              <button
                onClick={() => setIsSukoonMomentOpen(true)}
                className="absolute -top-5 -left-5 px-4 py-3 rounded-2xl bg-[#FAF6EF] border border-[#5E7F68]/15 shadow-md hidden sm:flex items-center gap-3 hover:bg-[#ECE1CF] transition-colors cursor-pointer text-left z-10"
              >
                <div className="w-8 h-8 rounded-xl bg-[#5E7F68]/15 text-[#5E7F68] flex items-center justify-center font-bold text-sm shrink-0">
                  <Sparkles className="w-4 h-4 text-[#5E7F68]" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-[#1E2921]">60-Sec Reset</span>
                  <span className="block text-[10px] text-[#6F766F]">Take a Sukoon Moment</span>
                </div>
              </button>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
