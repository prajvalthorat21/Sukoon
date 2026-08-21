import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { audioEngine } from '../../services/audioEngine';
import { storageService } from '../../services/storageService';
import { X, Sparkles, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export const SukoonMomentModal = () => {
  const { isSukoonMomentOpen, setIsSukoonMomentOpen } = useAuth();
  
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [phaseText, setPhaseText] = useState('Breathe in.');
  const [isFinished, setIsFinished] = useState(false);
  const [ringScale, setRingScale] = useState(1);

  const timerRef = useRef(null);

  useEffect(() => {
    if (!isSukoonMomentOpen) {
      audioEngine.stopSukoonDrone();
      setSecondsElapsed(0);
      setIsFinished(false);
      setPhaseText('Breathe in.');
      setRingScale(1);
      return;
    }

    // Audio starts only AFTER user clicks "Take a Sukoon Moment", then fades in smoothly
    audioEngine.startSukoonDrone();

    timerRef.current = setInterval(() => {
      setSecondsElapsed((prev) => {
        const nextSec = prev + 1;

        if (nextSec >= 60) {
          clearInterval(timerRef.current);
          setIsFinished(true);
          storageService.addMeditationMinutes(1);
          try {
            confetti({ particleCount: 60, spread: 80, origin: { y: 0.5 } });
          } catch (e) {}
          return 60;
        }

        // Phase text management
        const cyclePosition = nextSec % 12;
        if (cyclePosition < 4) {
          setPhaseText('Breathe in.');
          setRingScale(1.4);
        } else if (cyclePosition < 8) {
          setPhaseText('Hold.');
          setRingScale(1.4);
        } else {
          setPhaseText('Let go.');
          setRingScale(0.9);
        }

        return nextSec;
      });
    }, 1000);

    return () => {
      clearInterval(timerRef.current);
    };
  }, [isSukoonMomentOpen]);

  if (!isSukoonMomentOpen) return null;

  const handleClose = () => {
    audioEngine.stopSukoonDrone();
    setIsSukoonMomentOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#173B28]/95 backdrop-blur-2xl transition-all duration-700 animate-fadeIn">
      
      {/* Background Soft Gold Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C7A24A]/10 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />

      {/* Close Button */}
      <button
        onClick={handleClose}
        className="absolute top-6 right-6 p-3 rounded-full text-[#F4EDE1]/60 hover:text-[#F4EDE1] hover:bg-white/10 transition-colors cursor-pointer z-10"
        aria-label="Exit Sukoon Moment"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Center Container */}
      <div className="max-w-lg w-full flex flex-col items-center justify-center text-center space-y-8 relative z-10">
        
        {/* Header Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C7A24A]/20 border border-[#C7A24A]/30 text-[#C7A24A] text-xs font-semibold uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Sukoon Moment ✦ 60-Sec Reset</span>
        </div>

        {!isFinished ? (
          <div className="space-y-12 w-full">
            
            {/* Concentric Hypnotic Breathing Ring */}
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 mx-auto flex items-center justify-center">
              
              {/* Outer Ring */}
              <div 
                className="absolute inset-0 rounded-full bg-[#5E7F68]/20 blur-md transition-transform duration-[3000ms] ease-in-out"
                style={{ transform: `scale(${ringScale * 1.2})` }}
              />

              {/* Middle Ring */}
              <div 
                className="absolute inset-4 rounded-full bg-gradient-to-tr from-[#5E7F68]/50 via-[#5E7F68]/30 to-[#C7A24A]/40 border-2 border-[#C7A24A]/30 transition-transform duration-[3000ms] ease-in-out shadow-2xl"
                style={{ transform: `scale(${ringScale})` }}
              />

              {/* Inner Core */}
              <div className="relative z-10 w-44 h-44 sm:w-56 sm:h-56 rounded-full bg-[#173B28]/90 border border-[#C7A24A]/40 shadow-inner flex flex-col items-center justify-center p-4">
                <span className="font-display font-bold text-2xl sm:text-3xl text-[#F4EDE1] tracking-wide">
                  {phaseText}
                </span>
                <span className="font-mono text-xs text-[#C7A24A] mt-2 font-semibold">
                  {60 - secondsElapsed}s remaining
                </span>
              </div>
            </div>

            <p className="text-xs text-[#F4EDE1]/70 font-serif italic max-w-sm mx-auto leading-relaxed">
              “Allow your shoulders to drop. Let your jaw unclench. You are safe in this quiet moment.”
            </p>

          </div>
        ) : (
          <div className="space-y-6 animate-scaleUp py-6">
            <div className="w-20 h-20 rounded-full bg-[#C7A24A]/20 text-[#C7A24A] border-2 border-[#C7A24A]/40 flex items-center justify-center mx-auto shadow-2xl">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h2 className="font-display font-bold text-3xl text-[#F4EDE1]">
                You gave yourself a moment.
              </h2>
              <p className="text-sm text-[#C7A24A] font-serif italic max-w-md mx-auto">
                Notice how your mind feels a little lighter, calmer, and ready for whatever comes next.
              </p>
            </div>

            <button
              onClick={handleClose}
              className="px-8 py-3.5 rounded-full bg-[#C7A24A] text-[#1E2921] font-bold text-xs shadow-xl hover:bg-[#B89640] transition-colors cursor-pointer mt-4"
            >
              Return to Sukoon
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
