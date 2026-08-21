import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  Sparkles, 
  ShieldAlert, 
  Bell, 
  Menu, 
  X 
} from 'lucide-react';

export const Navbar = () => {
  const { 
    activeTab, 
    setActiveTab, 
    setIsAiOpen, 
    setIsAuthOpen, 
    setIsNotificationsOpen, 
    setIsCrisisOpen,
    setIsSukoonMomentOpen,
    notifications,
    user
  } = useAuth();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const unreadCount = notifications.filter(n => n.unread).length;

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'explore', label: 'Explore' },
    { id: 'community', label: 'Community' },
    { id: 'therapists', label: 'Therapists' },
    { id: 'dashboard', label: 'Dashboard' }
  ];

  const handleNavClick = (id) => {
    if (id === 'ai') {
      setIsAiOpen(true);
    } else {
      setActiveTab(id);
    }
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleMoodCheckClick = () => {
    setActiveTab('home');
    setMobileMenuOpen(false);
    setTimeout(() => {
      const el = document.getElementById('mood-check');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAF6EF]/90 backdrop-blur-md border-b border-[#5E7F68]/15 transition-all duration-300">
      <div className="max-w-[1400px] mx-auto px-3 sm:px-8 lg:px-12 h-20 flex items-center justify-between gap-2 sm:gap-4 lg:gap-8">
        
        {/* Primary: Brand Logo */}
        <button 
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2.5 sm:gap-3.5 group text-left cursor-pointer shrink-0"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-[#5E7F68] text-[#F4EDE1] flex items-center justify-center font-display font-bold text-lg sm:text-xl shadow-xs group-hover:bg-[#173B28] transition-colors">
            S
          </div>
          <div>
            <span className="font-display font-bold text-xl sm:text-2xl tracking-tight text-[#1E2921] block leading-none">
              SUKOON
            </span>
            <span className="hidden sm:block text-[10px] tracking-widest text-[#6F766F] font-semibold uppercase mt-1">
              Student Mental Wellness
            </span>
          </div>
        </button>

        {/* Secondary: Main Navigation Links Container (Subtle Floating Surface) */}
        <nav className="hidden md:flex items-center gap-1 bg-[#ECE1CF]/60 p-1 rounded-2xl border border-[#5E7F68]/12">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`px-4 sm:px-5 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
                  isActive 
                    ? 'bg-[#5E7F68] text-[#F4EDE1]' 
                    : 'text-[#6F766F] hover:text-[#1E2921] hover:bg-[#FAF6EF]/80'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Action & Utility Controls Right Side */}
        <div className="flex items-center gap-1.5 sm:gap-4 shrink-0">
          
          {/* Tertiary / Single Primary CTA: Take a Sukoon Moment */}
          <button
            onClick={() => setIsSukoonMomentOpen(true)}
            className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-full bg-[#5E7F68] text-[#F4EDE1] text-xs font-semibold shadow-xs hover:bg-[#173B28] transition-colors cursor-pointer border border-[#5E7F68]/30"
            title="Start 60-Second Guided Reset"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C7A24A]" />
            <span>Take a Sukoon Moment</span>
          </button>

          {/* Subtle Mood Check Action */}
          <button
            onClick={handleMoodCheckClick}
            className="hidden xl:flex items-center gap-1 px-3 py-1.5 rounded-xl text-[#6F766F] hover:text-[#5E7F68] hover:bg-[#ECE1CF]/60 text-xs font-medium transition-colors cursor-pointer"
          >
            <span>Mood Check</span>
          </button>

          {/* Restrained Urgent: Crisis Support */}
          <button
            onClick={() => setIsCrisisOpen(true)}
            className="flex items-center gap-1 sm:gap-1.5 px-2 py-1.5 rounded-xl text-[#C94B4B] hover:bg-red-50/60 transition-colors cursor-pointer"
            title="Crisis & Helpline Support"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-[#C94B4B]" />
            <span className="text-[11px] font-medium text-[#C94B4B]">Crisis</span>
          </button>

          {/* Utility: Notifications Icon */}
          <button
            onClick={() => setIsNotificationsOpen(true)}
            className="relative p-2 rounded-full text-[#6F766F] hover:text-[#1E2921] hover:bg-[#ECE1CF] transition-colors cursor-pointer"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#C7A24A] rounded-full ring-2 ring-[#FAF6EF]" />
            )}
          </button>

          {/* Utility: Profile / Auth Control */}
          <button
            onClick={() => setIsAuthOpen(true)}
            className="flex items-center gap-1.5 p-1 sm:pl-2 sm:pr-3.5 sm:py-1.5 rounded-full bg-[#FAF6EF] hover:bg-[#ECE1CF] text-[#1E2921] text-xs font-medium transition-colors border border-[#5E7F68]/15 cursor-pointer shadow-xs"
          >
            <img 
              src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"} 
              alt={user?.name || "Profile"} 
              className="w-6 h-6 rounded-full object-cover border border-[#5E7F68]"
            />
            <span className="hidden sm:inline max-w-[85px] truncate">{user?.name?.split(' ')[0] || "Account"}</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-xl text-[#1E2921] hover:bg-[#ECE1CF] transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#F4EDE1] border-b border-[#5E7F68]/15 px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${
                  activeTab === link.id 
                    ? 'bg-[#5E7F68] text-[#F4EDE1]' 
                    : 'bg-[#ECE1CF] text-[#1E2921] hover:bg-[#FAF6EF]'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-[#5E7F68]/15 flex flex-col gap-2">
            <button
              onClick={() => { setIsSukoonMomentOpen(true); setMobileMenuOpen(false); }}
              className="w-full py-3 rounded-xl bg-[#5E7F68] text-[#F4EDE1] font-bold text-sm flex items-center justify-center gap-2 shadow-xs hover:bg-[#173B28] transition-colors cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#C7A24A]" />
              <span>Take a Sukoon Moment ✦</span>
            </button>

            <button
              onClick={handleMoodCheckClick}
              className="w-full py-2.5 rounded-xl bg-[#ECE1CF] text-[#5E7F68] font-semibold text-sm border border-[#5E7F68]/20 cursor-pointer"
            >
              Daily Mood Check
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
