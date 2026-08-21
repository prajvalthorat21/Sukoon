import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { storageService } from '../../services/storageService';
import { SectionHeading } from '../common/SectionHeading';
import { 
  Sparkles, 
  ArrowRight, 
  RotateCcw,
  CheckCircle2,
  Heart
} from 'lucide-react';

const MOOD_OPTIONS = [
  { id: 'Great', label: 'Great', icon: '😊' },
  { id: 'Good', label: 'Good', icon: '😌' },
  { id: 'Okay', label: 'Okay', icon: '😐' },
  { id: 'Low', label: 'Low', icon: '😔' },
  { id: 'Stressed', label: 'Stressed', icon: '😫' },
  { id: 'Anxious', label: 'Anxious', icon: '😟' }
];

const TRIGGER_OPTIONS = [
  { id: 'Academics', label: 'Academics 📚' },
  { id: 'Exams', label: 'Exams 📝' },
  { id: 'Career', label: 'Career 🎯' },
  { id: 'Relationships', label: 'Relationships 🤝' },
  { id: 'Family', label: 'Family 🏡' },
  { id: 'Finances', label: 'Finances 💳' },
  { id: 'Loneliness', label: 'Loneliness 🍂' },
  { id: 'Sleep', label: 'Sleep 🌙' },
  { id: 'Other', label: 'Other 💭' }
];

export const MoodCheckSection = ({ onSelectRecommendation }) => {
  const { navigateTarget } = useAuth();
  
  const [step, setStep] = useState(1); // 1: Mood, 2: Trigger, 3: Recommendation
  const [selectedMood, setSelectedMood] = useState(null);
  const [selectedTrigger, setSelectedTrigger] = useState(null);
  const [recommendation, setRecommendation] = useState(null);
  const [animatingMoodId, setAnimatingMoodId] = useState(null);

  const getMoodAnimationClass = (moodId) => {
    if (animatingMoodId !== moodId) return '';
    switch (moodId) {
      case 'Great':
        return 'animate-mood-great';
      case 'Good':
        return 'animate-mood-good';
      case 'Okay':
        return 'animate-mood-okay';
      case 'Low':
        return 'animate-mood-low';
      case 'Stressed':
        return 'animate-mood-stressed';
      case 'Anxious':
        return 'animate-mood-anxious';
      default:
        return '';
    }
  };

  const [pendingTimer, setPendingTimer] = useState(null);

  useEffect(() => {
    return () => {
      if (pendingTimer) clearTimeout(pendingTimer);
    };
  }, [pendingTimer]);

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
    setAnimatingMoodId(mood.id);

    if (pendingTimer) {
      clearTimeout(pendingTimer);
    }

    let duration = 750;
    if (mood.id === 'Good' || mood.id === 'Stressed') {
      duration = 700;
    }

    const timer = setTimeout(() => {
      setAnimatingMoodId(null);
      setStep(2);
    }, duration);

    setPendingTimer(timer);
  };

  const handleTriggerSelect = (trigger) => {
    setSelectedTrigger(trigger);
    
    // Dynamic Content Catalog for Mood & Context Ranking
    const CATALOG = [
      {
        id: 'm-1',
        type: 'session',
        title: '5-Minute Campus Reset',
        desc: 'Clear academic mental clutter and unclench posture tension before your next study session.',
        moods: ['Stressed', 'Anxious', 'Okay'],
        triggers: ['Academics 📚', 'Exams 📝', 'Other 💭']
      },
      {
        id: 'm-2',
        type: 'session',
        title: 'Calming Midterm Exam Anxiety',
        desc: 'Soothing guided session to quiet exam panic, racing thoughts, and pressure.',
        moods: ['Anxious', 'Stressed'],
        triggers: ['Exams 📝', 'Academics 📚']
      },
      {
        id: 'm-3',
        type: 'session',
        title: 'Deep Focus & Study Flow State',
        desc: 'Binaural-infused guided focus practice to build single-task study concentration.',
        moods: ['Okay', 'Good', 'Stressed'],
        triggers: ['Academics 📚', 'Career 🎯']
      },
      {
        id: 'm-4',
        type: 'session',
        title: 'Dorm Room Night Sleep Drift',
        desc: 'Soft bedtime ambient meditation to quiet overthinking and ease into restful sleep.',
        moods: ['Low', 'Anxious', 'Stressed', 'Okay'],
        triggers: ['Sleep 🌙', 'Other 💭']
      },
      {
        id: 'm-5',
        type: 'session',
        title: 'Releasing Overthinking & Stress',
        desc: 'Unpack emotional tension, relationship stress, and racing late-night thoughts.',
        moods: ['Stressed', 'Anxious', 'Low'],
        triggers: ['Relationships 🤝', 'Family 🏡', 'Finances 💳', 'Other 💭']
      },
      {
        id: 'm-6',
        type: 'session',
        title: 'Morning Energy & Gratitude',
        desc: 'Lock in your positive intention and set yourself up for a productive campus day.',
        moods: ['Great', 'Good', 'Okay'],
        triggers: ['Career 🎯', 'Academics 📚', 'Other 💭']
      },
      {
        id: 'breathing',
        type: 'tool',
        title: '2-Minute Box Breathing',
        desc: 'A quick physiological reset to lower your heart rate and ground your focus.',
        moods: ['Stressed', 'Anxious', 'Okay'],
        triggers: ['Exams 📝', 'Academics 📚', 'Finances 💳', 'Other 💭']
      },
      {
        id: 'journal',
        type: 'tool',
        title: 'Private Journal Reflection',
        desc: 'Express what’s on your mind without any judgment or pressure in a private sanctuary.',
        moods: ['Low', 'Okay', 'Stressed', 'Good', 'Great'],
        triggers: ['Relationships 🤝', 'Career 🎯', 'Family 🏡', 'Loneliness 🍂', 'Other 💭']
      },
      {
        id: 'community',
        type: 'community',
        title: 'Peer Community Threads',
        desc: 'Connect with fellow college students navigating dorm life, placement stress, and young adult life.',
        moods: ['Low', 'Okay', 'Anxious'],
        triggers: ['Loneliness 🍂', 'Relationships 🤝']
      },
      {
        id: 'sleep',
        type: 'tool',
        title: 'Sleep Haven Sound Mixer',
        desc: 'Customizable rain, ocean, and fireplace soundscapes to help you unwind.',
        moods: ['Low', 'Stressed', 'Anxious', 'Okay'],
        triggers: ['Sleep 🌙']
      }
    ];

    const moodId = selectedMood.id;
    const moodLabel = selectedMood.label.toLowerCase();

    // Deterministic Relevance Scoring: Mood Match (5 pts) + Context Match (7 pts)
    const scored = CATALOG.map((item) => {
      let score = 0;
      if (item.moods.includes(moodId)) score += 5;
      if (item.triggers.includes(trigger)) score += 7;
      return { ...item, score };
    });

    scored.sort((a, b) => b.score - a.score);

    const topMatch = scored[0];
    const secondaryMatch = scored.find(
      (item) => item.id !== topMatch.id && item.type !== topMatch.type
    ) || scored[1];

    // Dynamic Summary Generation
    let summary = `You seem a little ${moodLabel} today regarding ${trigger}. Let's take an intentional moment to re-center.`;

    if (moodId === 'Stressed' || moodId === 'Anxious') {
      if (trigger.includes('Exam') || trigger.includes('Academic')) {
        summary = `Academic pressure can feel overwhelming. Let's quiet the exam panic and give your mind space to breathe.`;
      } else if (trigger.includes('Relationship') || trigger.includes('Family')) {
        summary = `Interpersonal stress is heavy to carry alone. Let's gently unpack your thoughts and find emotional perspective.`;
      } else {
        summary = `We hear you. When feeling ${moodLabel}, a quick physiological reset helps activate your calm focus.`;
      }
    } else if (moodId === 'Low') {
      if (trigger.includes('Loneliness')) {
        summary = `Feeling isolated in college is far more common than people admit. You are not alone on this journey.`;
      } else if (trigger.includes('Sleep')) {
        summary = `A tired mind can make everything feel harder. Let's ease you into deep, restorative rest tonight.`;
      } else {
        summary = `It is completely okay to have quiet days. Thank yourself for taking a moment to check in with your mind.`;
      }
    } else if (moodId === 'Great' || moodId === 'Good') {
      summary = `Wonderful to hear you're feeling ${moodLabel}! Let's channel this positive energy into your day.`;
    }

    const rec = {
      summary,
      actionTitle: topMatch.title,
      actionType: topMatch.type.toUpperCase(),
      actionTarget: { type: topMatch.type, id: topMatch.id },
      actionDesc: topMatch.desc,
      secondaryTitle: secondaryMatch.title,
      secondaryType: secondaryMatch.type.toUpperCase(),
      secondaryTarget: { type: secondaryMatch.type, id: secondaryMatch.id }
    };

    setRecommendation(rec);
    storageService.logMood(selectedMood.id, trigger, rec.actionTitle);
    
    setStep(3);
  };

  const handleReset = () => {
    setStep(1);
    setSelectedMood(null);
    setSelectedTrigger(null);
    setRecommendation(null);
  };

  const handleExecuteAction = (target, typeFallback) => {
    if (target) {
      navigateTarget(target);
    } else {
      navigateTarget({ type: 'tool', id: typeFallback?.toLowerCase() });
    }
  };

  return (
    <section id="mood-check" className="py-20 sm:py-28 lg:py-32 bg-[#ECE1CF] relative overflow-hidden border-y border-[#5E7F68]/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          badge="Daily Check-In"
          title="How are you feeling today?"
          subtitle="Take 3 seconds to check in with yourself. No judgment, just awareness."
        />

        <div className="mt-8 sm:mt-10 p-6 sm:p-8 lg:p-10 rounded-3xl bg-[#FAF6EF] border border-[#5E7F68]/12 shadow-xs relative min-h-[360px] flex flex-col justify-between">
          
          <div className="flex items-center justify-between border-b border-[#5E7F68]/10 pb-3.5 mb-5 text-xs text-[#6F766F] font-semibold">
            <span className="flex items-center gap-1.5 text-[#5E7F68]">
              <Heart className="w-3.5 h-3.5" />
              <span>Private Wellness Reflection</span>
            </span>
            <span>
              {step === 1 && 'Step 1 of 3: Mood'}
              {step === 2 && 'Step 2 of 3: Focus Area'}
              {step === 3 && 'Step 3 of 3: Guidance'}
            </span>
          </div>

          {step === 1 && (
            <div className="space-y-6 text-center animate-fadeIn my-auto">
              <h3 className="font-display text-2xl sm:text-3xl text-[#1E2921] font-bold">
                How are you feeling right now?
              </h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 lg:gap-5">
                {MOOD_OPTIONS.map((mood) => {
                  const isSelected = selectedMood?.id === mood.id;
                  return (
                    <button
                      key={mood.id}
                      onClick={() => handleMoodSelect(mood)}
                      className={`p-6 sm:p-7 rounded-2xl border transition-all duration-200 ease-out flex flex-col items-center justify-center gap-3 cursor-pointer group focus-visible:ring-2 focus-visible:ring-[#5E7F68] focus-visible:outline-none ${
                        isSelected
                          ? 'bg-[#173B28] text-[#F4EDE1] border-[#173B28] shadow-md scale-[1.02]'
                          : 'bg-[#FAF6EF] text-[#1E2921] border-[#5E7F68]/20 hover:bg-[#ECE1CF]/80 hover:border-[#5E7F68]/40 shadow-2xs hover:shadow-xs'
                      }`}
                    >
                      <span className={`text-3xl sm:text-4xl inline-block group-hover:scale-105 transition-transform duration-200 ${getMoodAnimationClass(mood.id)}`}>
                        {mood.icon}
                      </span>
                      <span className="font-display font-semibold text-sm sm:text-base">
                        {mood.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 2 && selectedMood && (
            <div className="space-y-6 text-center animate-fadeIn my-auto">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#173B28] text-[#F4EDE1] text-xs font-semibold">
                <span>Selected: {selectedMood.icon} {selectedMood.label}</span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl text-[#1E2921] font-bold">
                What’s on your mind today?
              </h3>

              <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3">
                {TRIGGER_OPTIONS.map((trig) => (
                  <button
                    key={trig.id}
                    onClick={() => handleTriggerSelect(trig.label)}
                    className="px-5 py-3 rounded-full bg-[#FAF6EF] hover:bg-[#5E7F68] hover:text-[#F4EDE1] text-[#1E2921] border border-[#5E7F68]/20 text-sm font-semibold transition-all duration-200 cursor-pointer shadow-xs focus-visible:ring-2 focus-visible:ring-[#5E7F68] focus-visible:outline-none"
                  >
                    {trig.label}
                  </button>
                ))}
              </div>

              <div>
                <button
                  onClick={() => setStep(1)}
                  className="text-xs text-[#6F766F] hover:text-[#5E7F68] font-semibold transition-colors mt-2 inline-block cursor-pointer"
                >
                  ← Change mood choice
                </button>
              </div>
            </div>
          )}

          {step === 3 && recommendation && (
            <div className="space-y-5 animate-fadeIn my-auto">
              
              <div className="flex items-center justify-between border-b border-[#5E7F68]/15 pb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#C7A24A]" />
                  <span className="font-display font-bold text-lg text-[#1E2921]">
                    Your Sukoon Ritual
                  </span>
                </div>
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1.5 text-xs text-[#5E7F68] hover:underline font-semibold cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Check In Again</span>
                </button>
              </div>

              <div className="p-4 sm:p-5 rounded-r-2xl bg-[#ECE1CF]/60 border-l-4 border-[#5E7F68]">
                <p className="text-sm sm:text-base text-[#1E2921] leading-relaxed font-serif italic font-medium">
                  “{recommendation.summary}”
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#173B28] text-[#F4EDE1] shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-[#C7A24A]/20">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#C7A24A]">
                    Recommended Tool
                  </span>
                  <h4 className="font-display font-bold text-xl text-[#F4EDE1]">
                    {recommendation.actionTitle}
                  </h4>
                  <p className="text-xs text-[#F4EDE1]/80 max-w-md">
                    {recommendation.actionDesc}
                  </p>
                </div>

                <button
                  onClick={() => handleExecuteAction(recommendation.actionTarget, recommendation.actionType)}
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#5E7F68] text-[#F4EDE1] font-semibold text-xs shadow-xs hover:bg-[#C7A24A] hover:text-[#1E2921] transition-colors flex items-center justify-center gap-2 cursor-pointer shrink-0"
                >
                  <span>Start Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          <div className="mt-5 pt-3 border-t border-[#5E7F68]/10 flex items-center justify-between text-[11px] text-[#6F766F]">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#5E7F68]" />
              100% Private & Encrypted Locally
            </span>
            <span>Sukoon Wellness</span>
          </div>

        </div>
      </div>
    </section>
  );
};
