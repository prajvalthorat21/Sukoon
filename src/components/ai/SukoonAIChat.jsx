import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { aiService } from '../../services/aiService';
import { Sparkles, Send, X, ArrowRight } from 'lucide-react';

const QUICK_PROMPTS = [
  "I'm stressed about exams",
  "I can't sleep tonight",
  "I feel lonely in college",
  "I can't focus on studying",
  "Help me calm down right now"
];

export const SukoonAIChat = () => {
  const { isAiOpen, setIsAiOpen, navigateTarget } = useAuth();

  const [messages, setMessages] = useState([
    {
      id: 'init-1',
      sender: 'ai',
      text: "Hello, I'm Sukoon AI. I'm here to listen without judgment. How are you holding up today?",
      timestamp: 'Just now'
    }
  ]);

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  if (!isAiOpen) return null;

  const handleSend = async (textToSend) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    const userMsg = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    try {
      const response = await aiService.sendMessage(text);
      
      const aiMsg = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: response.text,
        isCrisis: response.isCrisis,
        crisisContacts: response.crisisContacts,
        actionSuggestion: response.actionSuggestion,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (e) {
      console.error("AI Error:", e);
    } finally {
      setIsTyping(false);
    }
  };

  const handleActionClick = (action) => {
    if (!action) return;
    if (action.target) {
      navigateTarget(action.target);
    } else {
      navigateTarget({ type: action.type === 'CRISIS_PANEL' ? 'crisis' : 'tool', id: action.targetId || action.type?.toLowerCase() });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/45 backdrop-blur-xs animate-fadeIn">
      <div className="w-full max-w-xl bg-[#F4EDE1] h-full shadow-2xl flex flex-col border-l border-[#5E7F68]/20 animate-slideLeft">
        
        {/* Header */}
        <div className="p-5 bg-[#173B28] text-[#F4EDE1] flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#5E7F68] text-[#C7A24A] flex items-center justify-center border border-[#C7A24A]/30 shrink-0">
              <Sparkles className="w-5 h-5 text-[#C7A24A]" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-[#F4EDE1] leading-none">
                Sukoon AI
              </h3>
              <p className="text-xs text-[#C7A24A] font-serif italic mt-1">
                “I’m here to listen.”
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAiOpen(false)}
            aria-label="Close Sukoon AI chat"
            className="p-2 rounded-full text-[#F4EDE1]/70 hover:text-[#F4EDE1] hover:bg-[#F4EDE1]/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Prompts Bar */}
        <div className="p-3.5 bg-[#ECE1CF]/80 border-b border-[#5E7F68]/15 flex flex-wrap items-center gap-2 max-h-36 overflow-y-auto">
          {QUICK_PROMPTS.map((prompt) => (
            <button
              key={prompt}
              onClick={() => handleSend(prompt)}
              aria-label={`Ask AI: ${prompt}`}
              className="px-3.5 py-1.5 rounded-full bg-[#FAF6EF] text-[#5E7F68] border border-[#5E7F68]/20 text-xs font-medium hover:bg-[#5E7F68] hover:text-[#F4EDE1] transition-colors cursor-pointer shadow-2xs"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Chat Messages Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-[#5E7F68] text-[#F4EDE1] rounded-br-none shadow-2xs'
                    : msg.isCrisis
                    ? 'bg-red-50/95 text-red-950 border border-red-300 rounded-bl-none shadow-xs'
                    : 'bg-[#FAF6EF] text-[#1E2921] border border-[#5E7F68]/15 rounded-bl-none shadow-2xs'
                }`}
              >
                <div className="whitespace-pre-line leading-relaxed space-y-2">{msg.text}</div>

                {/* Crisis contacts if triggered */}
                {msg.isCrisis && msg.crisisContacts && (
                  <div className="mt-3 pt-3 border-t border-red-200 space-y-2">
                    <span className="font-bold text-red-800 block text-xs">Emergency Helplines:</span>
                    {msg.crisisContacts.map((c) => (
                      <div key={c.name} className="flex justify-between text-xs bg-white p-2.5 rounded-xl border border-red-200">
                        <span className="font-semibold text-red-900">{c.name}</span>
                        <strong className="font-mono text-red-700">{c.number}</strong>
                      </div>
                    ))}
                  </div>
                )}

                {/* Interactive Action Suggestion Card */}
                {msg.actionSuggestion && (
                  <div className="mt-3 pt-3 border-t border-[#5E7F68]/20">
                    <button
                      onClick={() => handleActionClick(msg.actionSuggestion)}
                      aria-label={`Open ${msg.actionSuggestion.label}`}
                      className="w-full py-2.5 px-3.5 rounded-xl bg-[#5E7F68] text-[#F4EDE1] font-bold text-xs hover:bg-[#173B28] transition-colors flex items-center justify-between cursor-pointer"
                    >
                      <span>{msg.actionSuggestion.label}</span>
                      <ArrowRight className="w-4 h-4 text-[#C7A24A]" />
                    </button>
                  </div>
                )}
              </div>

              <span className="text-[10px] text-[#6F766F] mt-1 px-1">
                {msg.timestamp}
              </span>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-[#5E7F68] font-medium p-3 rounded-2xl bg-[#FAF6EF] border border-[#5E7F68]/15 w-fit">
              <Sparkles className="w-3.5 h-3.5 text-[#C7A24A] animate-pulse" />
              <span>Sukoon AI is thinking...</span>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          className="p-4 bg-[#ECE1CF]/80 border-t border-[#5E7F68]/15 flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Write your thoughts freely..."
            aria-label="Type your message to Sukoon AI"
            className="flex-1 px-4 py-3 rounded-full bg-[#FAF6EF] border border-[#5E7F68]/20 text-xs text-[#1E2921] font-medium focus:outline-none focus:ring-1 focus:ring-[#5E7F68]/40 placeholder:text-[#6F766F]/60"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            aria-label="Send message to Sukoon AI"
            className="w-10 h-10 rounded-full bg-[#5E7F68] text-[#F4EDE1] flex items-center justify-center shadow-xs disabled:opacity-40 cursor-pointer hover:bg-[#173B28] transition-colors shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
};
