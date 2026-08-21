import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Bell, CheckCheck, X, Sparkles, Heart } from 'lucide-react';

export const NotificationPanel = () => {
  const { isNotificationsOpen, setIsNotificationsOpen, notifications, markAllNotificationsRead, navigateTarget } = useAuth();

  if (!isNotificationsOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs transition-opacity animate-fadeIn">
      <div className="w-full max-w-sm bg-[#F4EDE1] h-full shadow-2xl flex flex-col border-l border-[#5E7F68]/20 animate-slideLeft">
        
        {/* Panel Header */}
        <div className="p-5 border-b border-[#5E7F68]/15 flex items-center justify-between bg-[#ECE1CF]">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-[#5E7F68]" />
            <h3 className="font-display font-semibold text-lg text-[#1E2921]">
              Notifications
            </h3>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={markAllNotificationsRead}
              className="text-xs text-[#5E7F68] hover:underline font-medium cursor-pointer"
              title="Mark all as read"
            >
              <CheckCheck className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsNotificationsOpen(false)}
              className="p-1 rounded-full text-[#6F766F] hover:bg-[#FAF6EF] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => {
                if (n.target) navigateTarget(n.target);
                setIsNotificationsOpen(false);
              }}
              className={`p-4 rounded-xl border transition-all cursor-pointer hover:border-[#5E7F68]/40 ${
                n.unread
                  ? 'bg-amber-50/70 border-amber-200/80 shadow-xs'
                  : 'bg-[#ECE1CF] border-[#5E7F68]/10'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-full bg-[#5E7F68]/10 text-[#5E7F68] shrink-0 mt-0.5">
                  <Sparkles className="w-4 h-4 text-[#C7A24A]" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-[#1E2921] leading-relaxed font-medium">
                    {n.text}
                  </p>
                  <span className="text-[10px] text-[#6F766F] mt-1 block">
                    {n.time}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#F1F3E9] border-t border-[#315D3C]/15 text-center text-xs text-[#6F766F]">
          Stay mindful. Take small moments for yourself throughout the day.
        </div>
      </div>
    </div>
  );
};
