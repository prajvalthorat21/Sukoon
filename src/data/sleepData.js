import silentStarlightRailwayImg from '../assets/silent-starlight-railway.jpg';
import ancientForestSanctuaryImg from '../assets/ancient-forest-sanctuary.jpg';
import floatingIslandSleepImg from '../assets/floating-island-sleep.jpg';

// Sukoon Sleep Haven Catalog

export const SLEEP_SOUND_TRACKS = [
  { id: 'rain', name: 'Monsoon Rain', icon: 'CloudRain', color: 'from-blue-900/40 to-slate-900/60', description: 'Gentle raindrops falling on leaves outside a window' },
  { id: 'ocean', name: 'Midnight Waves', icon: 'Waves', color: 'from-teal-950/50 to-indigo-950/60', description: 'Rhythmic, slow ocean tide washing up the shore' },
  { id: 'wind', name: 'Soft Mountain Wind', icon: 'Wind', color: 'from-slate-800/40 to-zinc-900/60', description: 'Calm breeze blowing through tall pine forests' },
  { id: 'fireplace', name: 'Warm Fireplace', icon: 'Flame', color: 'from-amber-950/40 to-orange-950/60', description: 'Cozy hearth crackling gently in a quiet cabin' }
];

export const SLEEP_STORIES = [
  {
    id: 'ss-1',
    title: 'The Silent Starlight Railway',
    reader: 'Narrated by Kabir Verma',
    duration: '22 min',
    image: silentStarlightRailwayImg,
    description: 'Journey across peaceful starry mountains and quiet misty valleys aboard a slow midnight train.',
    category: 'Sleep Story'
  },
  {
    id: 'ss-2',
    title: 'The Ancient Forest Sanctuary',
    reader: 'Narrated by Priya Mukherjee',
    duration: '18 min',
    image: ancientForestSanctuaryImg,
    description: 'Wander through a tranquil moonlit bamboo forest with gently flowing stream waters.',
    category: 'Sleep Story'
  },
  {
    id: 'ss-3',
    title: 'Drifting on a Floating Island',
    reader: 'Narrated by Dr. Ananya Sharma',
    duration: '25 min',
    image: floatingIslandSleepImg,
    description: 'A soothing visualization designed to release bodily weight and drift into cloud-like slumber.',
    category: 'Guided Sleep Visualization'
  }
];
