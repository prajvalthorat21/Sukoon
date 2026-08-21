import React, { useState } from 'react';
import { COMMUNITY_CATEGORIES } from '../../data/communityData';
import { X, Send, ShieldCheck } from 'lucide-react';

export const CreatePostModal = ({ isOpen, onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('College Life');
  const [content, setContent] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    onSubmit({
      title,
      category,
      content,
      author: 'You (Student Demo)',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150'
    });

    setTitle('');
    setContent('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fadeIn">
      <div className="w-full max-w-lg bg-[#FAF6EF] rounded-3xl p-6 sm:p-8 shadow-xl border border-[#5E7F68]/20 relative animate-scaleUp">
        
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-5 right-5 p-2 rounded-full text-[#6F766F] hover:bg-[#ECE1CF] transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="space-y-2 mb-6">
          <div className="flex items-center gap-1.5 text-xs text-[#5E7F68] font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>Peer Support Sanctuary</span>
          </div>
          <h3 className="font-display text-2xl font-bold text-[#1E2921]">
            Share Your Story / Ask Peers
          </h3>
          <p className="text-xs text-[#6F766F] leading-relaxed">
            Post anonymously or as a student. Keep the space compassionate, empathetic & respectful.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#1E2921] mb-1">Topic Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              aria-label="Select topic category"
              className="w-full px-4 py-2.5 rounded-xl bg-[#F4EDE1]/80 border border-[#5E7F68]/20 text-xs font-semibold text-[#1E2921] focus:outline-none focus:ring-1 focus:ring-[#5E7F68]/40"
            >
              {COMMUNITY_CATEGORIES.filter(c => c !== 'All Threads').map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1E2921] mb-1">Discussion Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. How do you handle group project stress?"
              aria-label="Discussion Title"
              className="w-full px-4 py-2.5 rounded-xl bg-[#F4EDE1]/80 border border-[#5E7F68]/20 text-xs text-[#1E2921] focus:outline-none focus:ring-1 focus:ring-[#5E7F68]/40"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1E2921] mb-1">Content / Details</label>
            <textarea
              rows="4"
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Describe what's on your mind freely..."
              aria-label="Content / Details"
              className="w-full p-4 rounded-xl bg-[#F4EDE1]/80 border border-[#5E7F68]/20 text-xs text-[#1E2921] leading-relaxed focus:outline-none focus:ring-1 focus:ring-[#5E7F68]/40 resize-none"
            />
          </div>

          <button
            type="submit"
            aria-label="Publish Discussion Thread"
            className="w-full py-3.5 rounded-2xl bg-[#5E7F68] text-[#F4EDE1] font-bold text-xs shadow-xs hover:bg-[#173B28] transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>Publish Discussion Thread</span>
          </button>
        </form>

      </div>
    </div>
  );
};
