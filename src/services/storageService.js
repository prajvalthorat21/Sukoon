// LocalStorage Persistence Service for SUKOON Demo Data

const STORAGE_KEYS = {
  USER_PROFILE: 'sukoon_user_profile',
  MOOD_LOGS: 'sukoon_mood_logs',
  JOURNAL_ENTRIES: 'sukoon_journal_entries',
  STREAK: 'sukoon_streak_data',
  COMMUNITY_POSTS: 'sukoon_community_posts',
  SAVED_MEDITATIONS: 'sukoon_saved_meditations',
  NOTIFICATIONS: 'sukoon_notifications',
};

// Initial default user state
const DEFAULT_USER = {
  name: 'Aarav Sharma',
  email: 'aarav.s@university.edu',
  college: 'Delhi Technological University',
  joinedDate: 'August 2026',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
  isLoggedIn: true,
};

// Default initial journal entry
const DEFAULT_JOURNALS = [
  {
    id: 'j-1',
    date: new Date(Date.now() - 86400000).toISOString(),
    prompt: "What's been on your mind lately?",
    content: "Feeling a bit overwhelmed with semester midterms approaching. Taking 10 minutes out to meditate helped bring clarity. Remind myself to take it step by step.",
    mood: 'Okay',
    tags: ['Academics', 'Midterms', 'Mindfulness']
  },
  {
    id: 'j-2',
    date: new Date(Date.now() - 172800000).toISOString(),
    prompt: "What are you grateful for today?",
    content: "Grateful for a quiet evening walk in the campus garden, catching up with my roommate, and finding time for 4-7-8 breathing practice.",
    mood: 'Good',
    tags: ['Gratitude', 'Friendship']
  }
];

export const storageService = {
  getUserProfile: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
      return data ? JSON.parse(data) : DEFAULT_USER;
    } catch {
      return DEFAULT_USER;
    }
  },

  setUserProfile: (profile) => {
    try {
      localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
    } catch (e) {
      console.error('Failed to save profile:', e);
    }
  },

  getMoodLogs: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.MOOD_LOGS);
      return data ? JSON.parse(data) : [
        { mood: 'Good', trigger: 'Academics', timestamp: new Date(Date.now() - 259200000).toISOString() },
        { mood: 'Stressed', trigger: 'Exams', timestamp: new Date(Date.now() - 172800000).toISOString() },
        { mood: 'Okay', trigger: 'Sleep', timestamp: new Date(Date.now() - 86400000).toISOString() },
        { mood: 'Great', trigger: 'Relationships', timestamp: new Date().toISOString() },
      ];
    } catch {
      return [];
    }
  },

  logMood: (mood, trigger, recommendation) => {
    try {
      const logs = storageService.getMoodLogs();
      const newEntry = {
        id: `mood-${Date.now()}`,
        mood,
        trigger,
        recommendation,
        timestamp: new Date().toISOString(),
      };
      const updated = [newEntry, ...logs];
      localStorage.setItem(STORAGE_KEYS.MOOD_LOGS, JSON.stringify(updated));
      storageService.updateStreak();
      return newEntry;
    } catch (e) {
      console.error('Failed to log mood:', e);
    }
  },

  getJournalEntries: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.JOURNAL_ENTRIES);
      return data ? JSON.parse(data) : DEFAULT_JOURNALS;
    } catch {
      return DEFAULT_JOURNALS;
    }
  },

  saveJournalEntry: (entry) => {
    try {
      const entries = storageService.getJournalEntries();
      const newEntry = {
        id: `j-${Date.now()}`,
        date: new Date().toISOString(),
        ...entry
      };
      const updated = [newEntry, ...entries];
      localStorage.setItem(STORAGE_KEYS.JOURNAL_ENTRIES, JSON.stringify(updated));
      return updated;
    } catch (e) {
      console.error('Failed to save journal:', e);
      return [];
    }
  },

  deleteJournalEntry: (id) => {
    try {
      const entries = storageService.getJournalEntries();
      const updated = entries.filter(item => item.id !== id);
      localStorage.setItem(STORAGE_KEYS.JOURNAL_ENTRIES, JSON.stringify(updated));
      return updated;
    } catch (e) {
      console.error('Failed to delete journal:', e);
      return [];
    }
  },

  getStreakData: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.STREAK);
      return data ? JSON.parse(data) : { streakDays: 5, totalMinutes: 68, checkInsCount: 14, lastActiveDate: new Date().toDateString() };
    } catch {
      return { streakDays: 5, totalMinutes: 68, checkInsCount: 14, lastActiveDate: new Date().toDateString() };
    }
  },

  updateStreak: () => {
    try {
      const streak = storageService.getStreakData();
      const today = new Date().toDateString();
      if (streak.lastActiveDate !== today) {
        streak.streakDays += 1;
        streak.lastActiveDate = today;
      }
      streak.checkInsCount += 1;
      localStorage.setItem(STORAGE_KEYS.STREAK, JSON.stringify(streak));
      return streak;
    } catch (e) {
      console.error('Failed to update streak:', e);
    }
  },

  addMeditationMinutes: (minutes) => {
    try {
      const streak = storageService.getStreakData();
      streak.totalMinutes += minutes;
      localStorage.setItem(STORAGE_KEYS.STREAK, JSON.stringify(streak));
      return streak;
    } catch (e) {
      console.error('Failed to add minutes:', e);
    }
  }
};
