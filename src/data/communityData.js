// Sukoon Student Community Discussion Threads

export const COMMUNITY_CATEGORIES = [
  'All Threads',
  'Exam Stress',
  'College Life',
  'Career',
  'Relationships',
  'Sleep',
  'Loneliness',
  'Self Growth'
];

export const INITIAL_COMMUNITY_POSTS = [
  {
    id: 'post-1',
    author: 'Sneha R. (Final Year Engineering)',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
    title: 'How do you deal with placement stress without losing your mind?',
    category: 'Career',
    content: 'Placements season is starting next week and every time I open LinkedIn or talk to batchmates, my anxiety spikes. Has anyone found a good routine to stay calm while preparing?',
    likes: 42,
    commentsCount: 18,
    timeAgo: '2 hours ago',
    comments: [
      { author: 'Rahul M.', text: 'I limited my LinkedIn checking to just 10 mins at 5 PM daily. Huge game changer for my peace of mind!' },
      { author: 'Kavya S.', text: 'Remember that campus placement is just one entry point. Focus on doing 2 quality coding/prep problems a day rather than 10 hurried ones.' }
    ]
  },
  {
    id: 'post-2',
    author: 'Arjun K. (2nd Year Economics)',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
    title: 'First time living away from home and feeling surprisingly lonely in the hostel',
    category: 'Loneliness',
    content: 'Everyone seems to have formed their friend groups in the first month itself. I spend most evenings in my dorm room. Looking for simple advice to break out of this shell.',
    likes: 67,
    commentsCount: 24,
    timeAgo: '5 hours ago',
    comments: [
      { author: 'Divya P.', text: 'It takes time! Joining a college club or society (like drama or music) helped me meet people with shared interests naturally.' },
      { author: 'Tanya B.', text: 'Leaving my room door propped open when sitting inside encouraged dormmates to drop in and say hi!' }
    ]
  },
  {
    id: 'post-3',
    author: 'Rohan V. (1st Year Medical Student)',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150',
    title: 'The 4-7-8 breathing exercise on Sukoon actually saved me before my viva today!',
    category: 'Exam Stress',
    content: 'The 4-7-8 breathing exercise on Sukoon helped me feel more settled before my viva today. I did a few cycles right outside the exam hall and felt much more composed going in. Highly recommend to anyone facing vivas or presentations.',
    likes: 89,
    commentsCount: 12,
    timeAgo: '1 day ago',
    comments: [
      { author: 'Pooja T.', text: 'So happy for you! Breathing exercises are seriously underrated.' }
    ]
  }
];
