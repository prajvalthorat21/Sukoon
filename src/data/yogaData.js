import dormDeskNeckReleaseImg from '../assets/dorm-desk-neck-release.jpg';
import sunSalutationMorningWakeupImg from '../assets/sun-salutation-morning-wakeup.jpg';
import deepUnwindAnxietyFlowImg from '../assets/deep-unwind-anxiety-flow.jpg';
import bedsideYinDeepSleepImg from '../assets/bedside-yin-deep-sleep.jpg';

// Sukoon Yoga & Physical Mindfulness Sessions

export const YOGA_CATEGORIES = [
  'All',
  'Morning Flow',
  'Stress Relief',
  'Desk & Study Break',
  'Flexibility',
  'Evening Relaxation',
  'Sleep Preparation'
];

export const YOGA_SESSIONS = [
  {
    id: 'y-1',
    title: 'Dorm Desk Neck & Shoulder Release',
    category: 'Desk & Study Break',
    duration: '8 min',
    level: 'Beginner',
    description: 'Relieve upper body tension caused by hours of studying, computer work, and bad posture.',
    image: dormDeskNeckReleaseImg,
    altText: 'Student stretching their neck at a study desk',
    poses: ['Seated Neck Rolls', 'Eagle Arms Stretch', 'Cat-Cow Stretch', 'Child’s Pose'],
    instructor: 'Aanya Sen'
  },
  {
    id: 'y-2',
    title: 'Sun Salutation Morning Wakeup',
    category: 'Morning Flow',
    duration: '12 min',
    level: 'All Levels',
    description: 'Invigorating Surya Namaskar flow to boost blood circulation and awaken your mind for lectures.',
    image: sunSalutationMorningWakeupImg,
    altText: 'Young adult practicing a morning yoga flow in sunrise light',
    poses: ['Surya Namaskar A', 'Warrior II', 'Triangle Pose', 'Downward Dog'],
    instructor: 'Rohan Mehta'
  },
  {
    id: 'y-3',
    title: 'Deep Unwind & Anxiety Melt Flow',
    category: 'Stress Relief',
    duration: '15 min',
    level: 'Gentle',
    description: 'Slow restorative postures focusing on deep hip openers and slow diaphragmatic breathing to release stress.',
    image: deepUnwindAnxietyFlowImg,
    altText: 'Person practicing restorative yoga in a quiet room',
    poses: ['Pigeon Pose', 'Supine Twist', 'Reclining Bound Angle', 'Legs-up-the-Wall'],
    instructor: 'Aanya Sen'
  },
  {
    id: 'y-4',
    title: 'Bedside Yin Yoga for Deep Sleep',
    category: 'Sleep Preparation',
    duration: '10 min',
    level: 'Restorative',
    description: 'Gentle stretches done right on your bed to soothe the nervous system before sleep.',
    image: bedsideYinDeepSleepImg,
    altText: 'Young adult doing a gentle bedtime yoga stretch beside a bed',
    poses: ['Child’s Pose with Pillow', 'Puppy Pose', 'Corpse Pose (Savasana)'],
    instructor: 'Priya Mukherjee'
  }
];
