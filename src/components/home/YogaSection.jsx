import React, { useState } from 'react';
import { YOGA_SESSIONS, YOGA_CATEGORIES } from '../../data/yogaData';
import { SectionHeading } from '../common/SectionHeading';
import { Sun, Play, Clock, CheckCircle2, X } from 'lucide-react';
import confetti from 'canvas-confetti';

export const YogaSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeSessionModal, setActiveSessionModal] = useState(null);
  const [completedPoses, setCompletedPoses] = useState({});

  const filteredSessions = selectedCategory === 'All'
    ? YOGA_SESSIONS
    : YOGA_SESSIONS.filter(s => s.category === selectedCategory);

  const togglePose = (poseName) => {
    setCompletedPoses(prev => {
      const updated = { ...prev, [poseName]: !prev[poseName] };
      if (Object.values(updated).filter(Boolean).length === activeSessionModal.poses.length) {
        try { confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } }); } catch (e) {}
      }
      return updated;
    });
  };

  return (
    <section className="py-20 sm:py-28 lg:py-32 bg-[#ECE1CF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          badge="Physical Mindfulness"
          title="Dorm Desk & Study Break Yoga"
          subtitle="Gentle movement sequences to relieve neck tightness, back fatigue, and study slouching."
        />

        {/* Categories */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {YOGA_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#5E7F68] text-[#F4EDE1] shadow-md'
                  : 'bg-[#FAF6EF] text-[#6F766F] hover:bg-[#F4EDE1] border border-[#5E7F68]/15'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid of Yoga Sessions */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {filteredSessions.map((session) => (
            <div
              key={session.id}
              className="group rounded-3xl bg-[#FAF6EF] border border-[#5E7F68]/15 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col md:flex-row"
            >
              <div className="relative md:w-5/12 aspect-[4/3] md:aspect-auto overflow-hidden">
                <img
                  src={session.image}
                  alt={session.altText || session.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#173B28]/80 text-[#C7A24A] text-[10px] font-semibold">
                  {session.duration}
                </span>
              </div>

              <div className="p-6 sm:p-8 md:w-7/12 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#5E7F68]">
                    {session.category} • {session.level}
                  </span>
                  <h3 className="font-display font-bold text-xl text-[#1E2921]">
                    {session.title}
                  </h3>
                  <p className="text-xs text-[#6F766F] leading-relaxed">
                    {session.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#5E7F68]/10 flex items-center justify-between">
                  <span className="text-xs text-[#6F766F]">Instructor: <strong className="text-[#1E2921]">{session.instructor}</strong></span>
                  
                  <button
                    onClick={() => {
                      setCompletedPoses({});
                      setActiveSessionModal(session);
                    }}
                    className="px-5 py-2.5 rounded-full bg-[#5E7F68] text-[#F4EDE1] font-bold text-xs shadow-md hover:bg-[#173B28] transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-[#F4EDE1]" />
                    <span>Practice Flow</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Practice Modal */}
        {activeSessionModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn">
            <div className="w-full max-w-lg bg-[#FAF6EF] rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#5E7F68]/20 relative animate-scaleUp">
              <button
                onClick={() => setActiveSessionModal(null)}
                className="absolute top-5 right-5 p-2 rounded-full text-[#6F766F] hover:bg-[#ECE1CF] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-[#5E7F68]/10 text-[#5E7F68]">
                    <Sun className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-xl text-[#1E2921]">
                      {activeSessionModal.title}
                    </h3>
                    <p className="text-xs text-[#5E7F68] font-semibold">
                      {activeSessionModal.duration} • Guided Step Flow
                    </p>
                  </div>
                </div>

                <p className="text-xs text-[#6F766F] leading-relaxed">
                  {activeSessionModal.description}
                </p>

                <div className="space-y-2 pt-2 border-t border-[#5E7F68]/15">
                  <span className="text-xs font-bold text-[#1E2921] block">Interactive Pose Tracker:</span>
                  {activeSessionModal.poses.map((pose) => (
                    <button
                      key={pose}
                      onClick={() => togglePose(pose)}
                      className={`w-full p-3 rounded-xl text-xs font-semibold border flex items-center justify-between cursor-pointer transition-colors ${
                        completedPoses[pose]
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                          : 'bg-[#ECE1CF] text-[#1E2921] border-[#5E7F68]/15 hover:bg-[#FAF6EF]'
                      }`}
                    >
                      <span>{pose}</span>
                      <CheckCircle2 className={`w-4 h-4 ${completedPoses[pose] ? 'text-emerald-600' : 'text-slate-300'}`} />
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setActiveSessionModal(null)}
                  className="w-full py-3 rounded-2xl bg-[#5E7F68] text-[#F4EDE1] font-bold text-xs shadow-md hover:bg-[#173B28] cursor-pointer mt-4"
                >
                  Complete Practice Session
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
