// Sukoon AI Service — Modular Conversational Assistant
// Structured to allow plug-and-play replacement with OpenAI / Gemini backend APIs

const CRISIS_KEYWORDS = [
  'suicide', 'kill myself', 'want to die', 'end my life', 'self harm', 
  'harm myself', 'no reason to live', 'hopeless', 'end it all'
];

const INTENT_RESPONSES = {
  STRESS: [
    "I hear you. College can get immensely overwhelming with deadlines, expectations, and exams stacking up. Take a slow, deep breath with me right now. Let's break down whatever is on your plate into just one small, manageable step today.",
    "Stress is your body's way of signaling that you care deeply, but your mind needs a moment to reset. Try placing one hand on your heart and one on your stomach. Let's do a quick 2-minute breathing cycle together."
  ],
  SLEEP: [
    "Struggling to sleep often happens when our active mind keeps running over tomorrow's worries. Try dimming your screen, closing your eyes, and listening to our soothing Rain or Soft Ocean soundscape in the Sleep Haven.",
    "Let's try a progressive muscle relaxation: unclenching your jaw, lowering your shoulders away from your ears, and releasing the tension in your forehead. Would you like me to guide you through a 5-minute sleep meditation?"
  ],
  LONELY: [
    "Feeling lonely in college is far more common than people admit, even in a crowded campus. Remember that your feelings are completely valid. You are not alone in this journey. Our Student Community is always open to share stories and support.",
    "I'm here with you. It takes courage to acknowledge loneliness. How about writing down a brief entry in your Sukoon Journal tonight, or reaching out to a peer support thread?"
  ],
  FOCUS: [
    "When focus breaks, it's often a sign of cognitive fatigue rather than lack of discipline. Try the Pomodoro rhythm: 25 minutes of gentle, single-task focus followed by a strict 5-minute break away from screens.",
    "Let's clear the mental clutter. Close all unnecessary tabs, take 3 deep breaths, and commit to working on just ONE sentence or one problem for the next 10 minutes."
  ],
  CALM: [
    "Let's pause together right here. Notice 3 things you can see around you, 2 physical textures you can feel, and 1 quiet sound in your room. Grounding your senses brings your awareness right back to the calm present moment.",
    "You have survived 100% of your hardest days so far. Breathe in peace... breathe out tension. I'm right here with you."
  ]
};

export const aiService = {
  /**
   * Process incoming user prompt and generate an empathetic response.
   * Can be replaced with `fetch('/api/chat', ...)` when OpenAI backend is connected.
   */
  sendMessage: async (userMessage) => {
    // Simulate natural AI thinking delay
    await new Promise((resolve) => setTimeout(resolve, 800 + Math.random() * 600));

    const lowerMsg = userMessage.toLowerCase();

    // Check for crisis trigger
    const isCrisis = CRISIS_KEYWORDS.some((kw) => lowerMsg.includes(kw));
    if (isCrisis) {
      return {
        text: "I hear how much pain you're in right now, and I want you to know that your life matters. Please reach out to someone who can help immediately. You don't have to carry this alone.",
        isCrisis: true,
        crisisContacts: [
          { name: "Tele-MANAS (Govt of India)", number: "14416 / 1800 891 4416" },
          { name: "Vandrevala Foundation Helpline", number: "+91 9999 666 555" },
          { name: "NIMHANS Helpline", number: "080-46110007" },
          { name: "KIRAN Mental Health Line", number: "1800-599-0019" }
        ],
        actionSuggestion: { label: "Open Crisis Support Panel", type: "CRISIS_PANEL", target: { type: "crisis" } }
      };
    }

    // Match intent
    let responseCategory = 'CALM';
    if (lowerMsg.includes('stress') || lowerMsg.includes('exam') || lowerMsg.includes('exam panic') || lowerMsg.includes('assignment') || lowerMsg.includes('marks')) {
      responseCategory = 'STRESS';
    } else if (lowerMsg.includes('sleep') || lowerMsg.includes('insomnia') || lowerMsg.includes('night') || lowerMsg.includes('tired')) {
      responseCategory = 'SLEEP';
    } else if (lowerMsg.includes('lonely') || lowerMsg.includes('alone') || lowerMsg.includes('friend') || lowerMsg.includes('isolate')) {
      responseCategory = 'LONELY';
    } else if (lowerMsg.includes('focus') || lowerMsg.includes('study') || lowerMsg.includes('distract') || lowerMsg.includes('procrastinat')) {
      responseCategory = 'FOCUS';
    }

    const responses = INTENT_RESPONSES[responseCategory];
    const responseText = responses[Math.floor(Math.random() * responses.length)];

    // Actionable recommendation depending on context
    let suggestion = null;
    if (responseCategory === 'STRESS' || responseCategory === 'CALM') {
      suggestion = { label: "Start 2-Minute Breathing Exercise", type: "BREATHING", target: { type: "tool", id: "breathing" } };
    } else if (responseCategory === 'SLEEP') {
      suggestion = { label: "Open Sleep Haven Sound Mixer", type: "SLEEP_MIXER", target: { type: "tool", id: "sleep" } };
    } else if (responseCategory === 'LONELY') {
      suggestion = { label: "Write a Reflection in Journal", type: "JOURNAL", target: { type: "tool", id: "journal" } };
    } else if (responseCategory === 'FOCUS') {
      suggestion = { label: "Listen to Focus & Concentration Meditation", type: "MEDITATION", targetId: "m-3", target: { type: "session", id: "m-3" } };
    }

    return {
      text: responseText,
      isCrisis: false,
      actionSuggestion: suggestion
    };
  }
};
