import React, { useState, useEffect } from 'react';
import { storageService } from '../../services/storageService';
import { SectionHeading } from '../common/SectionHeading';
import { BookOpen, Save, Trash2, Calendar, Lock, CheckCircle2, Heart } from 'lucide-react';

const JOURNAL_PROMPTS = [
  "What’s been on your mind lately?",
  "What are you grateful for today?",
  "What would you like to let go of before sleeping?"
];

const MOOD_TAGS = ['Okay', 'Good', 'Stressed', 'Anxious', 'Grateful', 'Calm', 'Hopeful'];

export const JournalSection = () => {
  const [activePrompt, setActivePrompt] = useState(JOURNAL_PROMPTS[0]);
  const [content, setContent] = useState('');
  const [selectedMood, setSelectedMood] = useState('Okay');
  const [entries, setEntries] = useState([]);
  const [isSavedNotice, setIsSavedNotice] = useState(false);

  useEffect(() => {
    setEntries(storageService.getJournalEntries());
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    const newEntries = storageService.saveJournalEntry({
      prompt: activePrompt,
      content,
      mood: selectedMood,
      tags: [selectedMood, 'Personal Reflection']
    });

    setEntries(newEntries);
    setContent('');
    setIsSavedNotice(true);
    setTimeout(() => setIsSavedNotice(false), 3000);
  };

  const handleDelete = (id) => {
    const updated = storageService.deleteJournalEntry(id);
    setEntries(updated);
  };

  return (
    <section className="py-20 sm:py-28 lg:py-32 bg-[#ECE1CF]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          badge="Private Sanctuary"
          title="Let your thoughts out."
          subtitle="A quiet space to write without judgement. Stored locally and privately inside your browser."
        />

        {/* PROMPT SELECTOR PILLS */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {JOURNAL_PROMPTS.map((prompt) => (
            <button
              key={prompt}
              onClick={() => setActivePrompt(prompt)}
              aria-label={`Reflection prompt: ${prompt}`}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activePrompt === prompt
                  ? 'bg-[#5E7F68] text-[#F4EDE1] shadow-xs'
                  : 'bg-[#FAF6EF] text-[#6F766F] border border-[#5E7F68]/15 hover:bg-[#F4EDE1]'
              }`}
            >
              “{prompt}”
            </button>
          ))}
        </div>

        {/* PRIVATE NOTEBOOK WRITING SURFACE */}
        <div className="mt-10 p-6 sm:p-10 rounded-3xl bg-[#FAF6EF] border border-[#5E7F68]/20 shadow-sm space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#5E7F68]/10 pb-4 gap-2">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#5E7F68]" />
              <span className="font-display font-semibold text-base text-[#1E2921]">
                Personal Reflection
              </span>
            </div>

            <div className="flex items-center gap-3">
              {/* Privacy Indicator Badge */}
              <span className="flex items-center gap-1.5 text-[11px] font-medium text-[#6F766F] bg-[#ECE1CF]/70 px-3 py-1 rounded-full border border-[#5E7F68]/15">
                <Lock className="w-3 h-3 text-[#5E7F68]" />
                <span>Stored locally in browser</span>
              </span>

              {isSavedNotice && (
                <span className="flex items-center gap-1 text-xs font-semibold text-[#173B28] bg-[#5E7F68]/15 px-3 py-1 rounded-full border border-[#5E7F68]/30">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#5E7F68]" />
                  <span>Reflection Saved</span>
                </span>
              )}
            </div>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <h3 className="font-serif italic text-lg sm:text-xl text-[#1E2921] font-medium leading-snug">
              “{activePrompt}”
            </h3>

            <div className="relative">
              <textarea
                rows="6"
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Start typing freely... No rules, no expectations."
                aria-label="Journal reflection writing space"
                className="w-full p-5 rounded-2xl bg-[#F4EDE1]/60 border border-[#5E7F68]/20 text-sm text-[#1E2921] leading-relaxed focus:outline-none focus:ring-1 focus:ring-[#5E7F68]/40 focus:border-[#5E7F68]/40 resize-none transition-all placeholder:text-[#6F766F]/60"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
              
              {/* Mood Tag Selector */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs text-[#6F766F] font-medium">How do you feel?</span>
                {MOOD_TAGS.map((tag) => (
                  <button
                    type="button"
                    key={tag}
                    onClick={() => setSelectedMood(tag)}
                    aria-label={`Tag mood as ${tag}`}
                    className={`px-3 py-1 rounded-full text-xs font-medium cursor-pointer transition-colors ${
                      selectedMood === tag
                        ? 'bg-[#5E7F68] text-[#F4EDE1] font-semibold'
                        : 'bg-[#ECE1CF] text-[#6F766F] hover:bg-[#FAF6EF]'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>

              <button
                type="submit"
                aria-label="Save journal entry"
                className="w-full sm:w-auto px-7 py-3 rounded-full bg-[#5E7F68] text-[#F4EDE1] font-semibold text-xs shadow-xs hover:bg-[#173B28] transition-colors flex items-center justify-center gap-2 cursor-pointer shrink-0"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Reflection</span>
              </button>
            </div>
          </form>

        </div>

        {/* RECENT ENTRIES LIST */}
        <div className="mt-14 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-xl sm:text-2xl text-[#1E2921]">
              Past Reflections ({entries.length})
            </h3>
          </div>

          <div className="space-y-4">
            {entries.length === 0 ? (
              <div className="p-8 rounded-2xl bg-[#FAF6EF] border border-[#5E7F68]/15 text-center space-y-2">
                <Heart className="w-6 h-6 text-[#5E7F68]/60 mx-auto" />
                <p className="text-xs text-[#6F766F] font-medium">
                  Your private journal is empty right now. Take a breath and write your first reflection above.
                </p>
              </div>
            ) : (
              entries.map((entry) => (
                <div
                  key={entry.id}
                  className="p-6 rounded-2xl bg-[#FAF6EF] border border-[#5E7F68]/15 shadow-xs space-y-3 relative group"
                >
                  <div className="flex items-center justify-between text-xs text-[#6F766F]">
                    <div className="flex items-center gap-2.5">
                      <Calendar className="w-3.5 h-3.5 text-[#5E7F68]" />
                      <span>{new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#5E7F68]/10 text-[#5E7F68] font-semibold text-[10px]">
                        {entry.mood}
                      </span>
                    </div>

                    <button
                      onClick={() => handleDelete(entry.id)}
                      className="p-1.5 rounded-full text-slate-400 hover:text-[#C94B4B] transition-colors cursor-pointer"
                      aria-label="Delete entry"
                      title="Delete Entry"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <h4 className="font-serif italic text-sm font-semibold text-[#1E2921]">
                    “{entry.prompt}”
                  </h4>

                  <p className="text-xs text-[#1E2921] leading-relaxed whitespace-pre-line">
                    {entry.content}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
