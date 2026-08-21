import sleepProblemsImg from '../assets/sleep-problems.jpg';
import overthinkingStressImg from '../assets/overthinking-stress.jpg';
import morningEnergyGratitudeImg from '../assets/morning-energy-gratitude.jpg';
import campusResetImg from '../assets/campus-reset.jpg';
import midtermExamAnxietyImg from '../assets/midterm-exam-anxiety.jpg';
import deepFocusStudyImg from '../assets/deep-focus-study.jpg';

// Sukoon Meditation & Mindful Exercises Catalog

export const MEDITATION_CATEGORIES = [
  'All',
  'Guided Meditation',
  'Stress Relief',
  'Anxiety Relief',
  'Sleep',
  'Focus',
  'Relaxation'
];

export const MEDITATIONS = [
  {
    id: 'm-1',
    title: '5-Minute Campus Reset',
    category: 'Guided Meditation',
    duration: '5 min',
    minutesCount: 5,
    description: 'A quick mind refresh designed for study breaks between lectures. Release academic tension and ground your focus.',
    image: campusResetImg,
    altText: 'College student taking a quiet study break outdoors on campus',
    audioUrl: 'https://actions.google.com/sounds/v1/water/rain_heavy.ogg',
    instructor: 'Dr. Ananya Sharma',
    popular: true,
  },
  {
    id: 'm-2',
    title: 'Calming Midterm Exam Anxiety',
    category: 'Anxiety Relief',
    duration: '8 min',
    minutesCount: 8,
    description: 'Ease racing thoughts, release physical muscle tightness, and restore inner confidence before exams or presentations.',
    image: midtermExamAnxietyImg,
    altText: 'Student pausing during exam preparation at a library desk',
    audioUrl: 'https://actions.google.com/sounds/v1/ambiences/outdoor_ambience.ogg',
    instructor: 'Counselor Meera Nair',
    popular: true,
  },
  {
    id: 'm-3',
    title: 'Deep Focus & Study Flow State',
    category: 'Focus',
    duration: '10 min',
    minutesCount: 10,
    description: 'Binaural-inspired subtle background rhythm combined with gentle breathing cues to enter effortless concentration.',
    image: deepFocusStudyImg,
    altText: 'College student focused on studying at a desk with headphones',
    audioUrl: 'https://actions.google.com/sounds/v1/water/waves_crashing_on_rock_beach.ogg',
    instructor: 'Rohan Mehta',
    popular: false,
  },
  {
    id: 'm-4',
    title: 'Dorm Room Night Sleep Drift',
    category: 'Sleep',
    duration: '15 min',
    minutesCount: 15,
    description: 'Let go of the day’s mental chatter and drift smoothly into restful, deep sleep with soft ambient soundscapes.',
    image: sleepProblemsImg,
    altText: 'A student resting in a softly lit bedroom at night',
    audioUrl: 'https://actions.google.com/sounds/v1/weather/rain_on_leaves.ogg',
    instructor: 'Priya Mukherjee',
    popular: true,
  },
  {
    id: 'm-5',
    title: 'Releasing Overthinking & Stress',
    category: 'Stress Relief',
    duration: '7 min',
    minutesCount: 7,
    description: 'Learn gentle cognitive techniques to distance yourself from intrusive thoughts and regain perspective.',
    image: overthinkingStressImg,
    altText: 'A student sitting thoughtfully near a window in evening light',
    audioUrl: 'https://actions.google.com/sounds/v1/weather/wind_gusts.ogg',
    instructor: 'Dr. Ananya Sharma',
    popular: false,
  },
  {
    id: 'm-6',
    title: 'Morning Energy & Gratitude',
    category: 'Relaxation',
    duration: '6 min',
    minutesCount: 6,
    description: 'Start your college morning with positive intention, gentle awareness, and a calm, resilient mindset.',
    image: morningEnergyGratitudeImg,
    altText: 'Student journaling in soft morning sunlight',
    audioUrl: 'https://actions.google.com/sounds/v1/ambiences/daytime_forest_bonfire.ogg',
    instructor: 'Vikram Sengupta',
    popular: false,
  }
];
