import React, { createContext, useContext, useState } from 'react';
import { storageService } from '../services/storageService';
import { MEDITATIONS } from '../data/meditationsData';
import { SLEEP_STORIES } from '../data/sleepData';
import { THERAPISTS } from '../data/therapistsData';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(storageService.getUserProfile());
  const [activeTab, setActiveTab] = useState('home'); // 'home', 'explore', 'ai', 'community', 'therapists', 'dashboard'
  const [exploreSubCategory, setExploreSubCategory] = useState('All'); // 'All', 'Meditation', 'Breathing', 'Yoga', 'Sleep', 'Journal', 'Focus', 'Stress Relief'
  
  // Audio player state
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Modals & Panels state
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isCrisisOpen, setIsCrisisOpen] = useState(false);
  const [isSukoonMomentOpen, setIsSukoonMomentOpen] = useState(false);
  const [bookingTherapist, setBookingTherapist] = useState(null);

  // Notifications
  const [notifications, setNotifications] = useState([
    { id: 'n-1', text: 'Take a moment for yourself — try a 2-min breathing exercise.', target: { type: 'tool', id: 'breathing' }, time: '10m ago', unread: true },
    { id: 'n-2', text: 'Your evening relaxation meditation is ready.', target: { type: 'session', id: 'm-4' }, time: '1h ago', unread: true },
    { id: 'n-3', text: 'Weekly streak updated! You completed 5 wellness check-ins.', target: { type: 'route', id: 'dashboard' }, time: 'Yesterday', unread: false }
  ]);

  const loginDemo = (name = 'Aarav Sharma', email = 'aarav.s@university.edu') => {
    const updated = { ...user, name, email, isLoggedIn: true };
    setUser(updated);
    storageService.setUserProfile(updated);
    setIsAuthOpen(false);
  };

  const logoutDemo = () => {
    const updated = { ...user, isLoggedIn: false };
    setUser(updated);
    storageService.setUserProfile(updated);
  };

  const playMeditation = (track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const markAllNotificationsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  const navigateToExploreSub = (subCat) => {
    setExploreSubCategory(subCat);
    setActiveTab('explore');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /**
   * Universal Smart Navigation / Deep-Link Resolver
   * Resolves target descriptors to exact detail views, modals, sub-categories, or top-level tabs.
   */
  const navigateTarget = (target) => {
    if (!target) return;

    // Close drawers if open
    setIsAiOpen(false);

    let targetObj = target;
    if (typeof target === 'string') {
      targetObj = { type: 'tool', id: target };
    }

    const { type, id, data } = targetObj;

    switch (type) {
      case 'session': {
        // Direct session execution: Find session by id in catalog and play!
        const track = MEDITATIONS.find((m) => m.id === id) || 
                      SLEEP_STORIES.find((s) => s.id === id) || 
                      data;
        if (track) {
          playMeditation({
            id: track.id,
            title: track.title,
            category: track.category || 'Guided Session',
            instructor: track.instructor || track.reader || 'Sukoon Guide',
            audioUrl: track.audioUrl || 'https://cdn.pixabay.com/download/audio/2022/10/14/audio_9939f604b8.mp3?filename=sleep-meditation-ambient-124376.mp3',
            image: track.image,
            minutesCount: track.minutesCount || 5
          });
        } else {
          navigateToExploreSub('Meditation');
        }
        break;
      }

      case 'tool': {
        const subCatMap = {
          breathing: 'Breathing',
          meditation: 'Meditation',
          sleep: 'Sleep',
          journal: 'Journal',
          yoga: 'Yoga',
          focus: 'Focus',
          stress: 'Stress Relief'
        };
        const subCat = subCatMap[id?.toLowerCase()] || id || 'All';
        navigateToExploreSub(subCat);
        break;
      }

      case 'therapist': {
        setActiveTab('therapists');
        const therapist = THERAPISTS.find((t) => t.id === id) || data;
        if (therapist) {
          setBookingTherapist(therapist);
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
        break;
      }

      case 'community':
      case 'community-post': {
        setActiveTab('community');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        break;
      }

      case 'crisis':
      case 'CRISIS_PANEL': {
        setIsCrisisOpen(true);
        break;
      }

      case 'route':
      default: {
        const validTabs = ['home', 'explore', 'community', 'therapists', 'dashboard'];
        if (id && validTabs.includes(id)) {
          setActiveTab(id);
        } else if (id && ['breathing', 'meditation', 'sleep', 'journal', 'yoga', 'focus', 'stress'].includes(id.toLowerCase())) {
          navigateToExploreSub(id);
        } else {
          setActiveTab('explore');
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        activeTab,
        setActiveTab,
        exploreSubCategory,
        setExploreSubCategory,
        navigateToExploreSub,
        navigateTarget,
        currentTrack,
        setCurrentTrack,
        isPlaying,
        setIsPlaying,
        playMeditation,
        isAiOpen,
        setIsAiOpen,
        isAuthOpen,
        setIsAuthOpen,
        isNotificationsOpen,
        setIsNotificationsOpen,
        isCrisisOpen,
        setIsCrisisOpen,
        isSukoonMomentOpen,
        setIsSukoonMomentOpen,
        bookingTherapist,
        setBookingTherapist,
        notifications,
        markAllNotificationsRead,
        loginDemo,
        logoutDemo
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
