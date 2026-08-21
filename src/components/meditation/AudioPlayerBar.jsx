import React, { useRef, useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { storageService } from '../../services/storageService';
import { audioEngine } from '../../services/audioEngine';
import { Play, Pause, X, Volume2, VolumeX, Sparkles } from 'lucide-react';

export const AudioPlayerBar = () => {
  const { currentTrack, setCurrentTrack, isPlaying, setIsPlaying } = useAuth();
  const audioRef = useRef(null);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(300); // 5 min default
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [useSynthFallback, setUseSynthFallback] = useState(false);

  // Reset fallback and position when track changes
  useEffect(() => {
    setUseSynthFallback(false);
    setCurrentTime(0);
  }, [currentTrack?.id]);

  // Unmount cleanup to prevent ghost audio
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        try {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        } catch (e) {}
      }
      audioEngine.stopAll();
    };
  }, []);

  useEffect(() => {
    let timer;
    if (isPlaying) {
      if (audioRef.current && !useSynthFallback) {
        audioRef.current.play().catch(e => {
          if (e.name === 'AbortError') {
            return;
          }
          console.warn("Falling back to synthetic audio engine:", e);
          setUseSynthFallback(true);
          audioEngine.startSukoonDrone();
        });
      } else if (useSynthFallback) {
        audioEngine.startSukoonDrone();
      }

      // Simulated smooth timer tick ONLY for synthetic fallback
      if (useSynthFallback) {
        timer = setInterval(() => {
          setCurrentTime(prev => {
            if (prev >= duration) {
              setIsPlaying(false);
              if (currentTrack?.minutesCount) {
                storageService.addMeditationMinutes(currentTrack.minutesCount);
              }
              return 0;
            }
            return prev + 1;
          });
        }, 1000);
      }
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if (useSynthFallback) {
        audioEngine.stopSukoonDrone();
      }
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPlaying, currentTrack, useSynthFallback, duration]);

  if (!currentTrack) return null;

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current && !useSynthFallback) {
      setCurrentTime(audioRef.current.currentTime);
      if (audioRef.current.duration && !isNaN(audioRef.current.duration)) {
        setDuration(audioRef.current.duration);
      }
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    if (currentTrack.minutesCount) {
      storageService.addMeditationMinutes(currentTrack.minutesCount);
    }
  };

  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current && !useSynthFallback) {
      audioRef.current.currentTime = newTime;
    }
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (audioRef.current) {
      audioRef.current.volume = val;
    }
    setIsMuted(val === 0);
  };

  const handleClose = () => {
    if (audioRef.current) {
      try {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      } catch (e) {}
    }
    if (useSynthFallback) {
      audioEngine.stopSukoonDrone();
    }
    audioEngine.stopAll();
    setIsPlaying(false);
    setCurrentTrack(null);
  };

  const formatTime = (secs) => {
    if (isNaN(secs)) return "0:00";
    const mins = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${mins}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:max-w-xl z-50 animate-slideUp">
      <audio
        ref={audioRef}
        key={currentTrack.id}
        src={currentTrack.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        onError={() => {
          setUseSynthFallback(true);
        }}
      />

      <div className="p-4 rounded-3xl glass-panel-dark text-[#F4EDE1] shadow-2xl border border-[#C7A24A]/30 flex flex-col gap-3">
        
        {/* Track Title & Close */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <img
              src={currentTrack.image}
              alt={currentTrack.title}
              className="w-11 h-11 rounded-2xl object-cover border border-[#C7A24A]/30 shrink-0"
            />
            <div className="min-w-0">
              <h4 className="font-display font-semibold text-sm text-[#F4EDE1] truncate">
                {currentTrack.title}
              </h4>
              <p className="text-[11px] text-[#C7A24A] truncate">
                {currentTrack.instructor || currentTrack.category}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={togglePlay}
              className="w-10 h-10 rounded-full bg-[#C7A24A] text-[#1E2921] flex items-center justify-center shadow-md hover:scale-105 transition-transform cursor-pointer"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-[#1E2921] ml-0.5" />}
            </button>

            <button
              onClick={handleClose}
              className="p-2 rounded-full text-[#F4EDE1]/60 hover:text-[#F4EDE1] hover:bg-[#F4EDE1]/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrub Bar & Timers */}
        <div className="space-y-1">
          <input
            type="range"
            min="0"
            max={duration || 100}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-1.5 rounded-lg bg-white/20 appearance-none cursor-pointer accent-[#C7A24A]"
          />
          <div className="flex items-center justify-between text-[10px] text-[#F4EDE1]/60 font-mono">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
