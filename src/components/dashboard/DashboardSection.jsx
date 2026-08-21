import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { storageService } from '../../services/storageService';
import { SectionHeading } from '../common/SectionHeading';
import { Flame, Clock, Sparkles, Calendar, BookOpen, Smile, ArrowRight, Play, Heart, Shield } from 'lucide-react';
import campusResetImg from '../../assets/campus-reset.jpg';

export const DashboardSection = () => {
  const { user, navigateTarget } = useAuth();
  
  const [streakData, setStreakData] = useState(storageService.getStreakData());
  const [moodLogs, setMoodLogs] = useState(storageService.getMoodLogs());
  const [journalEntries, setJournalEntries] = useState(storageService.getJournalEntries());

  useEffect(() => {
    setStreakData(storageService.getStreakData());
    setMoodLogs(storageService.getMoodLogs());
    setJournalEntries(storageService.getJournalEntries());
  }, []);

  const getTimeGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  const userName = user?.name?.split(' ')[0] || 'Aarav';

  return (
    <section className="py-16 sm:py-24 lg:py-28 pb-24 sm:pb-32 bg-[#F4EDE1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-14">
        
        {/* Personal Greeting Header */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#173B28] to-[#224932] text-[#F4EDE1] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-[#C7A24A]/25">
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-[#C7A24A] uppercase tracking-wider">
              Your Sanctuary Space
            </span>
            <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
              {getTimeGreeting()}, {userName} 👋
            </h1>
            <p className="text-xs text-[#F4EDE1]/80 max-w-xl leading-relaxed">
              Welcome back to your personal sanctuary. Every small moment of reflection builds long-term mental resilience.
            </p>
          </div>

          <button
            onClick={() => navigateTarget({ type: 'tool', id: 'breathing' })}
            aria-label="Start a quick 2-minute breathing exercise"
            className="px-6 py-3.5 rounded-full bg-[#C7A24A] text-[#1E2921] font-bold text-xs shadow-2xs hover:bg-[#B89640] transition-colors flex items-center gap-2 cursor-pointer shrink-0"
          >
            <Sparkles className="w-4 h-4 text-[#1E2921]" />
            <span>Quick 2-Min Reset</span>
          </button>
        </div>

        {/* SUPPORTING STATS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
          
          <div className="p-6 sm:p-8 rounded-3xl bg-[#FAF6EF] border border-[#5E7F68]/15 shadow-2xs space-y-2">
            <div className="flex items-center justify-between text-[#5E7F68]">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#6F766F]">Wellness Streak</span>
              <Flame className="w-5 h-5 text-amber-500 fill-amber-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-display font-bold text-3xl sm:text-4xl text-[#1E2921]">{streakData.streakDays}</span>
              <span className="text-xs font-semibold text-[#6F766F]">Days Active</span>
            </div>
            <p className="text-[11px] text-[#6F766F]">Consistent check-ins build emotional balance.</p>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-[#FAF6EF] border border-[#5E7F68]/15 shadow-2xs space-y-2">
            <div className="flex items-center justify-between text-[#5E7F68]">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#6F766F]">Mindful Minutes</span>
              <Clock className="w-5 h-5 text-[#5E7F68]" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-display font-bold text-3xl sm:text-4xl text-[#1E2921]">{streakData.totalMinutes}</span>
              <span className="text-xs font-semibold text-[#6F766F]">Minutes Meditated</span>
            </div>
            <p className="text-[11px] text-[#6F766F]">Target: 10 mins / day</p>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-[#FAF6EF] border border-[#5E7F68]/15 shadow-2xs space-y-2">
            <div className="flex items-center justify-between text-[#5E7F68]">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#6F766F]">Total Check-Ins</span>
              <Smile className="w-5 h-5 text-[#5E7F68]" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-display font-bold text-3xl sm:text-4xl text-[#1E2921]">{streakData.checkInsCount}</span>
              <span className="text-xs font-semibold text-[#6F766F]">Mood Logs</span>
            </div>
            <p className="text-[11px] text-[#6F766F]">Self-awareness logged privately.</p>
          </div>

        </div>

        {/* TWO COLUMN CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left: Recommended Activity & Mood Logs */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Recommended Activity Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#5E7F68] text-[#F4EDE1] shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-[11px] font-bold text-[#C7A24A] uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>Today's Recommendation</span>
              </div>
              
              <h3 className="font-display font-bold text-2xl leading-tight">
                5-Minute Campus Reset Meditation
              </h3>

              <p className="text-xs text-[#F4EDE1]/90 leading-relaxed">
                Clear academic mental clutter and unclench posture tension before your next study session.
              </p>

              <button
                onClick={() => navigateTarget({ type: 'session', id: 'm-1' })}
                aria-label="Start 5-Minute Campus Reset Meditation"
                className="px-6 py-3 rounded-full bg-[#C7A24A] text-[#1E2921] font-bold text-xs shadow-2xs hover:bg-[#B89640] transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-[#1E2921]" />
                <span>Start 5-Min Reset</span>
              </button>
            </div>

            {/* Recent Mood Check-In History */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#FAF6EF] border border-[#5E7F68]/15 space-y-4">
              <h3 className="font-display font-bold text-xl text-[#1E2921]">
                Recent Mood Logs
              </h3>

              <div className="space-y-3">
                {moodLogs.length === 0 ? (
                  <p className="text-xs text-[#6F766F] italic">No recent mood logs yet. Check in on the home page!</p>
                ) : (
                  moodLogs.slice(0, 4).map((log, idx) => (
                    <div 
                      key={log.id || idx} 
                      className={`p-3.5 rounded-2xl border transition-all ${
                        idx === 0 
                          ? 'bg-[#FAF6EF] border-[#5E7F68]/25 shadow-2xs' 
                          : 'bg-[#F4EDE1]/50 border-[#5E7F68]/10'
                      } flex items-center justify-between text-xs`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-[#5E7F68] bg-[#5E7F68]/10 px-2.5 py-1 rounded-md">
                          {log.mood}
                        </span>
                        <div>
                          <strong className="text-[#1E2921] block">{log.trigger || 'Daily Check-in'}</strong>
                          <span className="text-[10px] text-[#6F766F]">{new Date(log.timestamp).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <span className="text-[11px] text-[#5E7F68] font-semibold">{log.recommendation || 'Breathing Practice'}</span>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>

          {/* Right: Journal Reflection Summaries */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#FAF6EF] border border-[#5E7F68]/15 space-y-4 h-full flex flex-col justify-between shadow-2xs">
              <div>
                <div className="flex items-center justify-between border-b border-[#5E7F68]/10 pb-3 mb-4">
                  <h3 className="font-display font-bold text-xl text-[#1E2921] flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-[#5E7F68]" />
                    <span>Journal Activity</span>
                  </h3>
                  <button
                    onClick={() => navigateTarget({ type: 'tool', id: 'journal' })}
                    className="text-xs text-[#5E7F68] font-bold hover:underline cursor-pointer"
                  >
                    Open Studio →
                  </button>
                </div>

                <div className="space-y-3">
                  {journalEntries.length === 0 ? (
                    <div className="p-4 rounded-2xl bg-[#F4EDE1]/60 border border-[#5E7F68]/10 text-center space-y-1">
                      <Heart className="w-5 h-5 text-[#5E7F68]/60 mx-auto" />
                      <p className="text-xs text-[#6F766F]">No saved reflections yet. Write your first thoughts today.</p>
                    </div>
                  ) : (
                    journalEntries.slice(0, 3).map((j, idx) => (
                      <div 
                        key={j.id} 
                        className={`p-4 rounded-2xl border transition-all space-y-1 ${
                          idx === 0 
                            ? 'bg-[#FAF6EF] border-[#5E7F68]/25 shadow-2xs' 
                            : 'bg-[#F4EDE1]/50 border-[#5E7F68]/10'
                        }`}
                      >
                        <span className="text-[10px] text-[#6F766F] block">{new Date(j.date).toLocaleDateString()}</span>
                        <h4 className="font-serif italic font-semibold text-xs text-[#1E2921]">“{j.prompt}”</h4>
                        <p className="text-xs text-[#6F766F] line-clamp-2">{j.content}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <button
                onClick={() => setActiveTab('journal')}
                aria-label="Write today's reflection in your private journal"
                className="w-full py-3.5 rounded-2xl bg-[#5E7F68] text-[#F4EDE1] font-bold text-xs shadow-2xs hover:bg-[#173B28] transition-colors flex items-center justify-center gap-2 cursor-pointer mt-4"
              >
                <span>Write Today's Reflection</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
