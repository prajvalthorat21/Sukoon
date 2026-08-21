import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { X, User, Mail, Sparkles, CheckCircle2, LogOut } from 'lucide-react';

export const AuthModal = () => {
  const { isAuthOpen, setIsAuthOpen, user, loginDemo, logoutDemo } = useAuth();
  const [name, setName] = useState(user?.name || 'Aarav Sharma');
  const [email, setEmail] = useState(user?.email || 'aarav.s@university.edu');

  if (!isAuthOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    loginDemo(name, email);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn">
      <div className="w-full max-w-md bg-[#FAF6EF] rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#5E7F68]/20 relative animate-scaleUp">
        
        {/* Close Button */}
        <button
          onClick={() => setIsAuthOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-full text-[#6F766F] hover:bg-[#ECE1CF] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2 mb-6">
          <div className="w-12 h-12 rounded-full bg-[#5E7F68] text-[#F4EDE1] flex items-center justify-center mx-auto font-display font-bold text-2xl shadow-md">
            S
          </div>
          <h3 className="font-display text-2xl font-bold text-[#1E2921]">
            {user?.isLoggedIn ? 'Your Student Profile' : 'Welcome to Sukoon'}
          </h3>
          <p className="text-xs text-[#6F766F]">
            {user?.isLoggedIn 
              ? 'Your wellness streak & journal progress are saved locally on this browser.' 
              : 'Sign in to sync your mood check-ins, journal entries, and progress.'}
          </p>
        </div>

        {user?.isLoggedIn ? (
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-[#ECE1CF] border border-[#5E7F68]/15 flex items-center gap-4">
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="w-14 h-14 rounded-full object-cover border-2 border-[#5E7F68]"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-sm text-[#1E2921] truncate">{user.name}</h4>
                <p className="text-xs text-[#6F766F] truncate">{user.email}</p>
                <span className="inline-block mt-1 text-[10px] px-2 py-0.5 rounded-md bg-[#5E7F68]/15 text-[#5E7F68] font-semibold">
                  {user.college}
                </span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 space-y-1">
              <div className="flex items-center gap-1.5 font-semibold text-amber-950">
                <CheckCircle2 className="w-4 h-4 text-amber-600" />
                <span>Demo Persistence Active</span>
              </div>
              <p>Your journal entries, streak minutes, and custom sleep sound mixes persist automatically in LocalStorage.</p>
            </div>

            <button
              onClick={logoutDemo}
              className="w-full py-3 rounded-2xl bg-red-50 text-[#C94B4B] font-semibold text-xs border border-red-200 hover:bg-red-100 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out of Demo</span>
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#1E2921] mb-1.5">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-[#6F766F] absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#ECE1CF] border border-[#5E7F68]/20 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#5E7F68]"
                  placeholder="e.g. Aarav Sharma"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1E2921] mb-1.5">College Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#6F766F] absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#ECE1CF] border border-[#5E7F68]/20 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#5E7F68]"
                  placeholder="name@university.edu"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-[#5E7F68] text-[#F4EDE1] font-semibold text-xs shadow-md hover:bg-[#173B28] transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#C7A24A]" />
              <span>Enter Sukoon Sanctuary</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
