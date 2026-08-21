import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { HeroSection } from './components/home/HeroSection';
import { MoodCheckSection } from './components/home/MoodCheckSection';
import { StudentLifeSection } from './components/home/StudentLifeSection';
import { AIShowcaseSection } from './components/home/AIShowcaseSection';
import { ExploreSection } from './components/home/ExploreSection';
import { YogaSection } from './components/home/YogaSection';
import { BreathingCircle } from './components/breathing/BreathingCircle';
import { MeditationSection } from './components/meditation/MeditationSection';
import { SleepHavenSection } from './components/sleep/SleepHavenSection';
import { JournalSection } from './components/journal/JournalSection';
import { TherapistSection } from './components/therapists/TherapistSection';
import { CommunitySection } from './components/community/CommunitySection';
import { DashboardSection } from './components/dashboard/DashboardSection';
import { CampusSupportSection } from './components/crisis/CampusSupportSection';
import { AudioPlayerBar } from './components/meditation/AudioPlayerBar';
import { SukoonAIChat } from './components/ai/SukoonAIChat';
import { FloatingAIOrb } from './components/ai/FloatingAIOrb';
import { NotificationPanel } from './components/common/NotificationPanel';
import { AuthModal } from './components/common/AuthModal';
import { BookingModal } from './components/therapists/BookingModal';
import { CrisisPanel } from './components/crisis/CrisisPanel';
import { SukoonMomentModal } from './components/common/SukoonMomentModal';

const AppContent = () => {
  const { activeTab, setActiveTab } = useAuth();

  const handleScrollToMoodCheck = () => {
    const el = document.getElementById('mood-check');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      setActiveTab('home');
      setTimeout(() => {
        const moodEl = document.getElementById('mood-check');
        if (moodEl) moodEl.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <div className="w-full max-w-full min-h-screen flex flex-col bg-[#F4EDE1] text-[#1E2921] font-sans selection:bg-[#5E7F68]/20 selection:text-[#173B28]">
      {/* Sticky Global Navigation */}
      <Navbar />

      {/* Main Dynamic View Content */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <>
            <HeroSection onBeginJourney={handleScrollToMoodCheck} />
            <MoodCheckSection />
            <StudentLifeSection />
            <AIShowcaseSection />
            <ExploreSection />
            <CampusSupportSection />
          </>
        )}

        {activeTab === 'explore' && <ExploreSection />}
        {activeTab === 'community' && <CommunitySection />}
        {activeTab === 'therapists' && <TherapistSection />}
        {activeTab === 'dashboard' && <DashboardSection />}
      </main>

      {/* Editorial Footer */}
      <Footer />

      {/* Global Drawers, Players & Signature Reset Modals */}
      <SukoonMomentModal />
      <AudioPlayerBar />
      <SukoonAIChat />
      <FloatingAIOrb />
      <NotificationPanel />
      <AuthModal />
      <BookingModal />
      <CrisisPanel />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
