import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { ShieldAlert, Heart, Sparkles } from 'lucide-react';

export const Footer = () => {
  const { setActiveTab, setIsCrisisOpen, setIsAiOpen, navigateToExploreSub } = useAuth();

  return (
    <footer className="bg-[#173B28] text-[#F4EDE1] pt-16 pb-12 border-t border-[#C7A24A]/20 relative overflow-hidden">
      {/* Soft background ambient glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#5E7F68]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[#F4EDE1]/10">
          
          {/* Col 1: Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#C7A24A] text-[#173B28] flex items-center justify-center font-display font-bold text-xl">
                S
              </div>
              <span className="font-display font-bold text-2xl tracking-tight text-[#F4EDE1]">
                SUKOON
              </span>
            </div>
            <p className="text-xs text-[#F4EDE1]/75 italic font-serif leading-relaxed">
              “A calmer mind. A better you.”
            </p>
            <p className="text-xs text-[#F4EDE1]/65 leading-relaxed">
              A private digital mental wellness sanctuary tailored specifically for college students to breathe, reflect, and thrive.
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="font-display font-semibold text-sm text-[#C7A24A] uppercase tracking-wider mb-4">
              Explore Sukoon
            </h4>
            <ul className="space-y-2.5 text-xs text-[#F4EDE1]/80">
              <li>
                <button onClick={() => { navigateToExploreSub('All'); }} className="hover:text-[#C7A24A] transition-colors cursor-pointer">
                  Wellness Explorer
                </button>
              </li>
              <li>
                <button onClick={() => { navigateToExploreSub('Meditation'); }} className="hover:text-[#C7A24A] transition-colors cursor-pointer">
                  Guided Meditation
                </button>
              </li>
              <li>
                <button onClick={() => { navigateToExploreSub('Breathing'); }} className="hover:text-[#C7A24A] transition-colors cursor-pointer">
                  2-Min Breathing Exercise
                </button>
              </li>
              <li>
                <button onClick={() => { navigateToExploreSub('Sleep'); }} className="hover:text-[#C7A24A] transition-colors cursor-pointer">
                  Sleep Haven Sound Mixer
                </button>
              </li>
              <li>
                <button onClick={() => { navigateToExploreSub('Journal'); }} className="hover:text-[#C7A24A] transition-colors cursor-pointer">
                  Private Journal Studio
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Student Care */}
          <div>
            <h4 className="font-display font-semibold text-sm text-[#C7A24A] uppercase tracking-wider mb-4">
              Student Care
            </h4>
            <ul className="space-y-2.5 text-xs text-[#F4EDE1]/80">
              <li>
                <button onClick={() => { setActiveTab('therapists'); window.scrollTo(0,0); }} className="hover:text-[#C7A24A] transition-colors">
                  Student Counselors & Therapists
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('community'); window.scrollTo(0,0); }} className="hover:text-[#C7A24A] transition-colors">
                  Peer Community Discussions
                </button>
              </li>
              <li>
                <button onClick={() => { setIsAiOpen(true); }} className="hover:text-[#C7A24A] transition-colors flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#C7A24A]" />
                  <span>Sukoon AI Companion</span>
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('dashboard'); window.scrollTo(0,0); }} className="hover:text-[#C7A24A] transition-colors">
                  Personal Dashboard
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Verified Helplines */}
          <div className="space-y-3">
            <h4 className="font-display font-semibold text-sm text-[#C7A24A] uppercase tracking-wider mb-2">
              Need Immediate Help?
            </h4>
            <div className="bg-[#224932] p-3.5 rounded-xl border border-[#C7A24A]/20 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-red-400 font-semibold">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>Tele-MANAS Hotline</span>
              </div>
              <p className="text-[#F4EDE1]/85 font-mono font-bold text-sm">
                14416 / 1800-891-4416
              </p>
              <p className="text-[11px] text-[#F4EDE1]/65">
                Govt. of India 24/7 free toll-free mental health support.
              </p>
              <button
                onClick={() => setIsCrisisOpen(true)}
                className="w-full mt-2 py-1.5 rounded-lg bg-red-900/40 hover:bg-red-900/60 text-red-200 text-[11px] font-medium text-center transition-colors border border-red-500/30 cursor-pointer"
              >
                View All Crisis Resources
              </button>
            </div>
          </div>
        </div>

        {/* Disclaimer & Bottom Credits */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#F4EDE1]/55 text-center md:text-left">
          <p className="max-w-2xl leading-relaxed">
            <strong className="text-[#F4EDE1]/85">Safety Note:</strong> Sukoon is a wellness support and mindfulness tool designed for educational & self-reflection purposes. It does not replace professional medical care or clinical emergency services.
          </p>
          <div className="flex items-center gap-1 text-[#F4EDE1]/70">
            <span>Crafted with care for college students</span>
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400 inline" />
          </div>
        </div>
      </div>
    </footer>
  );
};
