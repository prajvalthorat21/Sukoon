import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { audioEngine } from '../../services/audioEngine';
import { storageService } from '../../services/storageService';
import { SectionHeading } from '../common/SectionHeading';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

const PATTERNS = {
  BOX: { name: 'Box Breathing (4-4-4-4)', inhale: 4, holdIn: 4, exhale: 4, holdOut: 4, desc: 'Used by top performers to regain calm under pressure.' },
  RELAX: { name: '4-7-8 Deep Relaxation', inhale: 4, holdIn: 7, exhale: 8, holdOut: 0, desc: 'Soothes the nervous system and prepares your mind for restful sleep.' },
  EQUAL: { name: 'Equal Breathing (4-4)', inhale: 4, holdIn: 0, exhale: 4, holdOut: 0, desc: 'Simple, balanced rhythm for study sessions and quick breaks.' }
};

export const BreathingCircle = () => {
  const [selectedPatternKey, setSelectedPatternKey] = useState('BOX');
  const pattern = PATTERNS[selectedPatternKey];

  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState('Breathe In'); // 'Breathe In', 'Hold', 'Breathe Out', 'Rest'
  const [phaseTimeLeft, setPhaseTimeLeft] = useState(pattern.inhale);
  const [completedCycles, setCompletedCycles] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [scale, setScale] = useState(1);

  const timerRef = useRef(null);

  // Determine current phase duration for smooth dynamic CSS transitions
  const getPhaseDuration = () => {
    if (phase === 'Breathe In') return pattern.inhale;
    if (phase === 'Hold') return pattern.holdIn || 1;
    if (phase === 'Breathe Out') return pattern.exhale;
    if (phase === 'Rest') return pattern.holdOut || 1;
    return 4;
  };
  const currentPhaseDuration = getPhaseDuration();

  // Handle phase transitions
  useEffect(() => {
    if (!isActive) {
      setPhase('Breathe In');
      setPhaseTimeLeft(pattern.inhale);
      setScale(1);
      return;
    }

    timerRef.current = setInterval(() => {
      setPhaseTimeLeft((prev) => {
        if (prev > 1) return prev - 1;

        // Transition to next phase
        if (phase === 'Breathe In') {
          if (pattern.holdIn > 0) {
            setPhase('Hold');
            if (soundEnabled) audioEngine.playChime(523.25); // C5 Chime
            return pattern.holdIn;
          } else {
            setPhase('Breathe Out');
            if (soundEnabled) audioEngine.playChime(392.00); // G4 Chime
            return pattern.exhale;
          }
        } else if (phase === 'Hold') {
          setPhase('Breathe Out');
          if (soundEnabled) audioEngine.playChime(392.00); // G4 Chime
          return pattern.exhale;
        } else if (phase === 'Breathe Out') {
          if (pattern.holdOut > 0) {
            setPhase('Rest');
            return pattern.holdOut;
          } else {
            setCompletedCycles((c) => {
              const newC = c + 1;
              if (newC % 3 === 0) {
                storageService.addMeditationMinutes(1);
              }
              if (newC === 5) {
                try { confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } }); } catch (e) {}
              }
              return newC;
            });
            setPhase('Breathe In');
            if (soundEnabled) audioEngine.playChime(440.00); // A4 Chime
            return pattern.inhale;
          }
        } else if (phase === 'Rest') {
          setCompletedCycles((c) => c + 1);
          setPhase('Breathe In');
          if (soundEnabled) audioEngine.playChime(440.00); // A4 Chime
          return pattern.inhale;
        }
        return pattern.inhale;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [isActive, phase, pattern, soundEnabled]);

  // Adjust circle scale smoothly based on phase
  useEffect(() => {
    if (!isActive) {
      setScale(1);
      return;
    }
    if (phase === 'Breathe In') setScale(1.36);
    else if (phase === 'Hold') setScale(1.36);
    else if (phase === 'Breathe Out') setScale(0.88);
    else if (phase === 'Rest') setScale(1);
  }, [phase, isActive]);

  const handleTogglePlay = () => {
    if (!isActive && soundEnabled) {
      audioEngine.playChime(440);
    }
    setIsActive(!isActive);
  };

  const handleReset = () => {
    setIsActive(false);
    setPhase('Breathe In');
    setPhaseTimeLeft(pattern.inhale);
    setCompletedCycles(0);
    setScale(1);
  };

  const handlePatternChange = (key) => {
    setSelectedPatternKey(key);
    setIsActive(false);
    setPhase('Breathe In');
    setPhaseTimeLeft(PATTERNS[key].inhale);
    setCompletedCycles(0);
    setScale(1);
  };

  const getDisplayPhase = () => {
    if (!isActive) return 'Ready';
    if (phase === 'Breathe In') return 'Inhale';
    if (phase === 'Hold') return 'Hold';
    if (phase === 'Breathe Out') return 'Exhale';
    if (phase === 'Rest') return 'Rest';
    return 'Breathe';
  };

  // Synchronized atmospheric light intensity derived directly from phase
  const getGlowOpacity = () => {
    if (!isActive) return 0.35;
    if (phase === 'Breathe In') return 0.85;
    if (phase === 'Hold') return 0.85;
    if (phase === 'Breathe Out') return 0.45;
    if (phase === 'Rest') return 0.35;
    return 0.35;
  };
  const glowOpacity = getGlowOpacity();

  return (
    <section className="py-20 sm:py-28 lg:py-32 bg-[#F4EDE1] relative overflow-hidden min-h-[85vh] flex flex-col justify-center">
      
      {/* Quiet Sanctuary Background Aura */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-[#5E7F68]/12 via-[#C7A24A]/8 to-transparent rounded-full blur-3xl pointer-events-none transition-opacity duration-1000 motion-reduce:hidden"
        style={{ opacity: isActive && phase === 'Breathe In' ? 0.85 : 0.45 }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        <SectionHeading
          badge="Interactive Breathwork"
          title="2-Minute Breathing Exercise"
          subtitle="Follow the expanding circle. Deep rhythmic breathing directly calms your amygdala."
        />

        {/* Technique Selector Pills */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {Object.keys(PATTERNS).map((key) => (
            <button
              key={key}
              onClick={() => handlePatternChange(key)}
              aria-label={`Select ${PATTERNS[key].name}`}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                selectedPatternKey === key
                  ? 'bg-[#5E7F68] text-[#F4EDE1] shadow-xs'
                  : 'bg-[#ECE1CF] text-[#6F766F] hover:bg-[#FAF6EF] border border-[#5E7F68]/15'
              }`}
            >
              {PATTERNS[key].name}
            </button>
          ))}
        </div>

        <p className="text-center text-xs text-[#6F766F] italic mt-3 max-w-md mx-auto">
          {pattern.desc}
        </p>

        {/* Primary Breathing Visual & Hero Guide */}
        <div className="my-14 flex flex-col items-center justify-center relative">
          
          {/* Animated Concentric Breathing Guide */}
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center">
            
            {/* Outer Soft Atmospheric Aura */}
            <div 
              className="absolute inset-0 rounded-full bg-[#5E7F68]/12 blur-lg motion-reduce:transform-none motion-reduce:transition-none"
              style={{
                transform: `scale(${scale * 1.16})`,
                opacity: glowOpacity,
                transition: `transform ${isActive ? currentPhaseDuration : 0.6}s cubic-bezier(0.4, 0, 0.2, 1), opacity ${isActive ? currentPhaseDuration : 0.6}s cubic-bezier(0.4, 0, 0.2, 1)`
              }}
            />

            {/* Inner Soft Atmospheric Glow */}
            <div 
              className="absolute inset-4 rounded-full bg-gradient-to-tr from-[#5E7F68]/30 via-[#5E7F68]/20 to-[#C7A24A]/20 border border-[#5E7F68]/25 shadow-md motion-reduce:transform-none motion-reduce:transition-none"
              style={{
                transform: `scale(${scale})`,
                opacity: glowOpacity,
                transition: `transform ${isActive ? currentPhaseDuration : 0.6}s cubic-bezier(0.4, 0, 0.2, 1), opacity ${isActive ? currentPhaseDuration : 0.6}s cubic-bezier(0.4, 0, 0.2, 1)`
              }}
            />

            {/* Inner Sanctuary Core Circle */}
            <div className="relative z-10 w-44 h-44 sm:w-56 sm:h-56 rounded-full bg-[#FAF6EF] border border-[#5E7F68]/25 shadow-inner flex flex-col items-center justify-center p-4 text-center">
              
              {/* Quiet Phase Label */}
              <span className="font-display text-xl sm:text-2xl font-semibold text-[#1E2921] tracking-wide">
                {getDisplayPhase()}
              </span>

              {/* Subordinate Timer */}
              {isActive && (
                <span className="font-mono text-2xl sm:text-3xl font-semibold text-[#5E7F68] mt-1 tracking-tight">
                  {phaseTimeLeft}s
                </span>
              )}

              {!isActive && (
                <span className="text-[11px] text-[#6F766F] mt-1.5 font-medium">
                  Tap begin to start your breath journey
                </span>
              )}
            </div>

          </div>

          {/* Cycle Counter Badge */}
          <div className="mt-8 flex items-center gap-5 text-xs text-[#6F766F] font-medium">
            <div className="flex items-center gap-1.5 bg-[#ECE1CF] px-3.5 py-1.5 rounded-full border border-[#5E7F68]/20 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#C7A24A]" />
              <span>Completed Cycles: <strong className="text-[#1E2921] font-bold">{completedCycles}</strong></span>
            </div>

            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              aria-label={soundEnabled ? 'Disable chime audio' : 'Enable chime audio'}
              className="flex items-center gap-1.5 bg-[#ECE1CF] px-3.5 py-1.5 rounded-full border border-[#5E7F68]/20 shadow-2xs hover:bg-[#FAF6EF] transition-colors cursor-pointer text-[#1E2921]"
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-[#5E7F68]" /> : <VolumeX className="w-3.5 h-3.5 text-slate-400" />}
              <span>Chime Audio</span>
            </button>
          </div>

          {/* Compact Subordinate Controls */}
          <div className="mt-6 flex items-center gap-3">
            <button
              onClick={handleTogglePlay}
              aria-label={isActive ? 'Pause breathing exercise' : 'Begin breathing exercise'}
              className="px-7 py-3 rounded-full bg-[#5E7F68] text-[#F4EDE1] font-semibold text-xs shadow-xs hover:bg-[#173B28] transition-all flex items-center gap-2 cursor-pointer"
            >
              {isActive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-[#F4EDE1]" />}
              <span>{isActive ? 'Pause Rhythm' : 'Begin Breathing'}</span>
            </button>

            <button
              onClick={handleReset}
              aria-label="Reset breathing session counter and pattern"
              className="p-3 rounded-full bg-[#ECE1CF] text-[#1E2921] border border-[#5E7F68]/20 hover:bg-[#FAF6EF] transition-colors cursor-pointer shadow-2xs"
              title="Reset Counter"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};
