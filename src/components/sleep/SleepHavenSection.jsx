import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { audioEngine } from '../../services/audioEngine';
import { SLEEP_SOUND_TRACKS, SLEEP_STORIES } from '../../data/sleepData';
import { SectionHeading } from '../common/SectionHeading';
import { CloudRain, Waves, Wind, Flame, Volume2, VolumeX, Moon, Play, Sparkles } from 'lucide-react';

export const SleepHavenSection = () => {
  const { playMeditation } = useAuth();
  
  // Mixer state: { rain: 0.5, ocean: 0.0, wind: 0.0, fireplace: 0.0 }
  const [volumes, setVolumes] = useState({
    rain: 0,
    ocean: 0,
    wind: 0,
    fireplace: 0
  });

  const [activeTracks, setActiveTracks] = useState({});

  const handleVolumeChange = (trackId, newVol) => {
    const val = parseFloat(newVol);
    setVolumes((prev) => ({ ...prev, [trackId]: val }));

    if (val > 0) {
      audioEngine.startSound(trackId, val);
      setActiveTracks((prev) => ({ ...prev, [trackId]: true }));
    } else {
      audioEngine.stopSound(trackId);
      setActiveTracks((prev) => ({ ...prev, [trackId]: false }));
    }
  };

  const handleStopAll = () => {
    audioEngine.stopAll();
    setVolumes({ rain: 0, ocean: 0, wind: 0, fireplace: 0 });
    setActiveTracks({});
  };

  const getIcon = (name) => {
    switch (name) {
      case 'CloudRain': return <CloudRain className="w-6 h-6 text-blue-300" />;
      case 'Waves': return <Waves className="w-6 h-6 text-teal-300" />;
      case 'Wind': return <Wind className="w-6 h-6 text-slate-300" />;
      case 'Flame': return <Flame className="w-6 h-6 text-amber-300" />;
      default: return <Moon className="w-6 h-6 text-[#D9B263]" />;
    }
  };

  const isAnySoundActive = Object.values(activeTracks).some(Boolean);

  return (
    <section className="py-20 sm:py-28 lg:py-32 bg-[#173B28] text-[#F4EDE1] relative overflow-hidden">
      
      {/* Stars Ambient Particle Effect Layer */}
      <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none" />
      <div className="absolute top-10 right-10 w-96 h-96 bg-[#C7A24A]/10 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <SectionHeading
          badge="Sleep Haven"
          title="Drift into Deep, Restful Slumber"
          subtitle="Mix real-time atmospheric soundscapes or listen to soothing night bedtime stories."
          dark={true}
        />

        {/* SOUND MIXER SECTION */}
        <div className="mt-12 sm:mt-16 p-6 sm:p-8 lg:p-10 rounded-3xl bg-[#224932] border border-[#C7A24A]/20 shadow-2xl space-y-8">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#C7A24A]/15 pb-4">
            <div>
              <h3 className="font-display font-bold text-2xl text-[#C7A24A] flex items-center gap-2">
                <Moon className="w-5 h-5 text-[#C7A24A]" />
                <span>Web Audio Sleep Soundscape Mixer</span>
              </h3>
              <p className="text-xs text-[#F4EDE1]/75 mt-1">
                Synthesized dynamically in real-time. Adjust individual track volume sliders to build your custom sleep ambiance.
              </p>
            </div>

            {isAnySoundActive && (
              <button
                onClick={handleStopAll}
                className="px-4 py-2 rounded-full bg-red-950/60 text-red-300 border border-red-500/30 text-xs font-semibold hover:bg-red-900 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <VolumeX className="w-4 h-4" />
                <span>Mute All Sounds</span>
              </button>
            )}
          </div>

          {/* Grid of Sound Sliders */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SLEEP_SOUND_TRACKS.map((track) => {
              const currentVol = volumes[track.id] || 0;
              const isActive = currentVol > 0;
              return (
                <div
                  key={track.id}
                  className={`p-5 rounded-2xl border transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-[#5E7F68] to-[#224932] border-[#C7A24A]/40 shadow-lg'
                      : 'bg-[#173B28]/60 border-[#C7A24A]/10'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-xl bg-[#173B28] border border-[#C7A24A]/20">
                        {getIcon(track.icon)}
                      </div>
                      <div>
                        <h4 className="font-display font-semibold text-base text-[#F4EDE1]">
                          {track.name}
                        </h4>
                        <p className="text-[11px] text-[#F4EDE1]/65">
                          {track.description}
                        </p>
                      </div>
                    </div>

                    <span className="text-xs font-mono font-bold text-[#C7A24A]">
                      {Math.round(currentVol * 100)}%
                    </span>
                  </div>

                  <div className="flex items-center gap-3 pt-1">
                    <VolumeX className="w-4 h-4 text-[#F4EDE1]/45 shrink-0" />
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={currentVol}
                      onChange={(e) => handleVolumeChange(track.id, e.target.value)}
                      className="w-full h-2 rounded-lg bg-black/40 appearance-none cursor-pointer accent-[#C7A24A]"
                    />
                    <Volume2 className="w-4 h-4 text-[#C7A24A] shrink-0" />
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* SLEEP STORIES CATALOG */}
        <div className="mt-20 space-y-8">
          <div className="text-center">
            <h3 className="font-display font-bold text-3xl text-[#F4EDE1]">
              Bedtime Sleep Stories & Visualizations
            </h3>
            <p className="text-xs text-[#F4EDE1]/75 mt-2">
              Gentle audio narratives crafted to guide college minds into peaceful rest.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SLEEP_STORIES.map((story) => (
              <div
                key={story.id}
                className="group rounded-3xl bg-[#224932] border border-[#C7A24A]/20 overflow-hidden shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#224932] via-transparent to-transparent" />
                  
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#173B28]/90 text-[#C7A24A] text-[10px] font-semibold border border-[#C7A24A]/30">
                    {story.duration}
                  </span>

                  <button
                    onClick={() => playMeditation({
                      id: story.id,
                      title: story.title,
                      category: story.category,
                      instructor: story.reader,
                      audioUrl: 'https://cdn.pixabay.com/download/audio/2022/10/14/audio_9939f604b8.mp3?filename=sleep-meditation-ambient-124376.mp3',
                      image: story.image
                    })}
                    className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-[#C7A24A] text-[#1E2921] flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform cursor-pointer"
                  >
                    <Play className="w-5 h-5 fill-[#1E2921] ml-0.5" />
                  </button>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h4 className="font-display font-bold text-lg text-[#F4EDE1] group-hover:text-[#C7A24A] transition-colors">
                      {story.title}
                    </h4>
                    <p className="text-xs text-[#F4EDE1]/75 mt-1 leading-relaxed">
                      {story.description}
                    </p>
                  </div>
                  <span className="text-[11px] text-[#C7A24A] font-medium block pt-2 border-t border-[#C7A24A]/10">
                    {story.reader}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
