import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { SectionHeading } from '../common/SectionHeading';
import { Sparkles, ArrowRight, Bot, User, Wind, Headphones, BookOpen } from 'lucide-react';

export const AIShowcaseSection = () => {
  const { setIsAiOpen, setActiveTab } = useAuth();

  return (
    <section className="py-20 sm:py-28 lg:py-32 bg-[#173B28] text-[#F4EDE1] relative overflow-hidden">
      
      {/* Background Soft Gold Glow */}
      <div className="absolute top-1/2 right-10 -translate-y-1/2 w-[550px] h-[550px] bg-[#C7A24A]/10 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading & Information */}
          <div className="lg:col-span-5 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C7A24A]/20 border border-[#C7A24A]/30 text-[#C7A24A] text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Companion</span>
            </div>

            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-[#F4EDE1] leading-[1.15]">
              You can talk about anything here.
            </h2>

            <p className="text-base sm:text-lg text-[#C7A24A] font-serif italic">
              “No judgment. No pressure. Just a space to begin.”
            </p>

            <p className="text-sm sm:text-base text-[#F4EDE1]/80 leading-[1.65]">
              Available 24/7 on your device to help you decompress exam panic, process relationship stress, or simply vent before sleep.
            </p>

            <div className="pt-2">
              <button
                onClick={() => setIsAiOpen(true)}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#C7A24A] text-[#1E2921] font-bold text-sm shadow-xl hover:bg-[#B89640] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Talk to Sukoon AI →</span>
              </button>
            </div>
          </div>

          {/* Right Column: Simulated Chat Preview Box */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#224932] border border-[#C7A24A]/25 shadow-2xl space-y-6">
              
              {/* Header inside preview */}
              <div className="flex items-center justify-between border-b border-[#C7A24A]/15 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#5E7F68] text-[#C7A24A] flex items-center justify-center border border-[#C7A24A]/30">
                    <Sparkles className="w-4 h-4 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-sm text-[#F4EDE1]">
                      Sukoon AI Companion
                    </h3>
                    <span className="text-[10px] text-[#C7A24A]">Empathetic Active Listening</span>
                  </div>
                </div>
                <span className="text-[10px] px-2.5 py-1 rounded-full bg-[#5E7F68]/30 text-[#C7A24A] font-mono">
                  Online
                </span>
              </div>

              {/* Conversation Messages */}
              <div className="space-y-4">
                
                {/* User Message */}
                <div className="flex flex-col items-end">
                  <div className="max-w-[85%] p-4 rounded-2xl bg-[#5E7F68] text-[#F4EDE1] rounded-br-none text-xs sm:text-sm shadow-xs">
                    “I have exams coming up and I'm really stressed.”
                  </div>
                  <span className="text-[10px] text-[#F4EDE1]/45 mt-1">Student</span>
                </div>

                {/* AI Response */}
                <div className="flex flex-col items-start space-y-3">
                  <div className="max-w-[90%] p-4 rounded-2xl bg-[#173B28] border border-[#C7A24A]/20 text-[#F4EDE1] rounded-bl-none text-xs sm:text-sm leading-relaxed shadow-xs">
                    <p>
                      “Let's slow things down for a moment. You don't need to solve everything right now.”
                    </p>
                  </div>

                  {/* Recommendation Pills inside preview */}
                  <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2">
                    <button
                      onClick={() => { setActiveTab('breathing'); window.scrollTo(0,0); }}
                      className="p-3 rounded-xl bg-[#173B28] hover:bg-[#224932] border border-[#C7A24A]/20 text-xs font-semibold text-[#C7A24A] flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <Wind className="w-4 h-4 shrink-0 text-[#5E7F68]" />
                      <span>2-Min Breathing</span>
                    </button>

                    <button
                      onClick={() => { setActiveTab('meditation'); window.scrollTo(0,0); }}
                      className="p-3 rounded-xl bg-[#173B28] hover:bg-[#224932] border border-[#C7A24A]/20 text-xs font-semibold text-[#C7A24A] flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <Headphones className="w-4 h-4 shrink-0 text-[#5E7F68]" />
                      <span>5-Min Meditation</span>
                    </button>

                    <button
                      onClick={() => { setActiveTab('journal'); window.scrollTo(0,0); }}
                      className="p-3 rounded-xl bg-[#173B28] hover:bg-[#224932] border border-[#C7A24A]/20 text-xs font-semibold text-[#C7A24A] flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <BookOpen className="w-4 h-4 shrink-0 text-[#5E7F68]" />
                      <span>Journal Prompt</span>
                    </button>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
