import React, { useState } from 'react';
import { INITIAL_COMMUNITY_POSTS, COMMUNITY_CATEGORIES } from '../../data/communityData';
import { SectionHeading } from '../common/SectionHeading';
import { CreatePostModal } from './CreatePostModal';
import { Heart, MessageSquare, Plus, Users, ShieldCheck, CornerDownRight } from 'lucide-react';

export const CommunitySection = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Threads');
  const [posts, setPosts] = useState(INITIAL_COMMUNITY_POSTS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeReplyPostId, setActiveReplyPostId] = useState(null);
  const [replyInputs, setReplyInputs] = useState({});

  const filteredPosts = selectedCategory === 'All Threads'
    ? posts
    : posts.filter(p => p.category === selectedCategory);

  const handleLike = (id) => {
    setPosts(posts.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p));
  };

  const handleCreatePost = (newPostData) => {
    const newEntry = {
      id: `post-${Date.now()}`,
      ...newPostData,
      likes: 1,
      commentsCount: 0,
      timeAgo: 'Just now',
      comments: []
    };
    setPosts([newEntry, ...posts]);
  };

  const handleAddReply = (postId) => {
    const textToReply = replyInputs[postId]?.trim();
    if (!textToReply) return;
    setPosts(posts.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          commentsCount: p.commentsCount + 1,
          comments: [...p.comments, { author: 'You (Student Demo)', text: textToReply }]
        };
      }
      return p;
    }));
    setReplyInputs(prev => ({ ...prev, [postId]: '' }));
  };

  return (
    <section className="pt-16 sm:pt-24 lg:pt-28 pb-12 sm:pb-16 bg-[#F4EDE1]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Area */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-10 pb-6 border-b border-[#5E7F68]/15">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#5E7F68]/10 text-[#5E7F68]">
                Peer Support Sanctuary
              </span>
              <span className="flex items-center gap-1 text-[11px] font-medium text-[#6F766F]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#5E7F68]" />
                <span>Safe & Respectful Space</span>
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1E2921]">
              Student Community
            </h2>
            <p className="text-xs text-[#6F766F] max-w-xl leading-relaxed">
              Connect with fellow students facing similar academic, career, and personal experiences. You're not alone.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            aria-label="Share your story or ask peers a question"
            className="px-6 py-3.5 rounded-full bg-[#5E7F68] text-[#F4EDE1] font-bold text-xs shadow-xs hover:bg-[#173B28] transition-colors flex items-center gap-2 cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4 text-[#C7A24A]" />
            <span>Share Your Story</span>
          </button>
        </div>

        {/* Categories Filter Pills */}
        <div className="flex flex-wrap items-center justify-start gap-2 mb-8">
          {COMMUNITY_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              aria-label={`Filter discussions by ${cat}`}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#5E7F68] text-[#F4EDE1] shadow-xs'
                  : 'bg-[#FAF6EF] text-[#6F766F] hover:bg-[#F4EDE1] border border-[#5E7F68]/15'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Posts List */}
        <div className="space-y-6">
          {filteredPosts.length === 0 ? (
            <div className="p-8 rounded-3xl bg-[#FAF6EF] border border-[#5E7F68]/15 text-center space-y-2">
              <Users className="w-6 h-6 text-[#5E7F68]/60 mx-auto" />
              <p className="text-xs text-[#6F766F] font-medium">
                No discussion threads in this category yet. You can start the conversation when you're ready.
              </p>
            </div>
          ) : (
            filteredPosts.map((post) => (
              <div
                key={post.id}
                className="p-6 sm:p-8 rounded-3xl bg-[#FAF6EF] border border-[#5E7F68]/15 shadow-xs hover:shadow-md transition-shadow space-y-4"
              >
                {/* Author & Category Header */}
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <img
                      src={post.avatar}
                      alt={post.author}
                      className="w-9 h-9 rounded-full object-cover border border-[#5E7F68]/20"
                      loading="lazy"
                    />
                    <div>
                      <h4 className="font-semibold text-[#1E2921]">{post.author}</h4>
                      <span className="text-[10px] text-[#6F766F]">{post.timeAgo}</span>
                    </div>
                  </div>

                  <span className="px-3 py-1 rounded-full bg-[#5E7F68]/10 text-[#5E7F68] font-semibold text-[10px]">
                    {post.category}
                  </span>
                </div>

                {/* Title & Content */}
                <div className="space-y-2">
                  <h3 className="font-display font-bold text-lg text-[#1E2921] leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-xs text-[#1E2921] leading-relaxed">
                    {post.content}
                  </p>
                </div>

                {/* Interaction Bar */}
                <div className="pt-3 border-t border-[#5E7F68]/10 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-5">
                    <button
                      onClick={() => handleLike(post.id)}
                      aria-label={`Send support for ${post.title}`}
                      className="flex items-center gap-1.5 text-[#5E7F68] font-semibold hover:text-[#173B28] transition-colors cursor-pointer"
                    >
                      <Heart className="w-4 h-4 text-[#5E7F68] fill-[#5E7F68]/20" />
                      <span>{post.likes} Support</span>
                    </button>

                    <button
                      onClick={() => setActiveReplyPostId(activeReplyPostId === post.id ? null : post.id)}
                      aria-label={`View or write replies for ${post.title}`}
                      className="flex items-center gap-1.5 text-[#6F766F] hover:text-[#1E2921] font-medium transition-colors cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4 text-[#5E7F68]" />
                      <span>{post.commentsCount} {post.commentsCount === 1 ? 'Reply' : 'Replies'}</span>
                    </button>
                  </div>
                </div>

                {/* Comments Section */}
                {(activeReplyPostId === post.id || post.comments.length > 0) && (
                  <div className="pt-3 border-t border-[#5E7F68]/10 space-y-3 bg-[#F4EDE1]/60 p-4 rounded-2xl">
                    {post.comments.map((c, idx) => (
                      <div key={idx} className="text-xs space-y-0.5 flex items-start gap-2">
                        <CornerDownRight className="w-3.5 h-3.5 text-[#5E7F68] shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-[#1E2921] font-semibold block">{c.author}</strong>
                          <p className="text-[#6F766F]">{c.text}</p>
                        </div>
                      </div>
                    ))}

                    <div className="flex items-center gap-2 pt-2">
                      <input
                        type="text"
                        value={replyInputs[post.id] || ''}
                        onChange={(e) => setReplyInputs({ ...replyInputs, [post.id]: e.target.value })}
                        placeholder="Write a supportive reply..."
                        aria-label="Write a supportive reply"
                        className="flex-1 px-3.5 py-2 rounded-xl bg-[#FAF6EF] border border-[#5E7F68]/20 text-xs text-[#1E2921] focus:outline-none focus:ring-1 focus:ring-[#5E7F68]/40"
                      />
                      <button
                        onClick={() => handleAddReply(post.id)}
                        aria-label="Submit reply"
                        className="px-4 py-2 rounded-xl bg-[#5E7F68] text-[#F4EDE1] font-bold text-xs hover:bg-[#173B28] transition-colors cursor-pointer"
                      >
                        Reply
                      </button>
                    </div>
                  </div>
                )}

              </div>
            ))
          )}
        </div>

        <CreatePostModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleCreatePost}
        />

      </div>
    </section>
  );
};
