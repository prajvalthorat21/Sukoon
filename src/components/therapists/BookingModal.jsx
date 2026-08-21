import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { X, Calendar, Clock, Video, MessageSquare, Phone, CheckCircle2, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export const BookingModal = () => {
  const { bookingTherapist, setBookingTherapist } = useAuth();
  
  const [selectedDate, setSelectedDate] = useState('Tomorrow');
  const [selectedTime, setSelectedTime] = useState('4:30 PM');
  const [medium, setMedium] = useState('Video Call');
  const [isConfirmed, setIsConfirmed] = useState(false);

  if (!bookingTherapist) return null;

  const handleConfirm = (e) => {
    e.preventDefault();
    setIsConfirmed(true);
    try { confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } }); } catch (e) {}
  };

  const handleClose = () => {
    setIsConfirmed(false);
    setBookingTherapist(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn">
      <div className="w-full max-w-lg bg-[#FAF6EF] rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#5E7F68]/20 relative animate-scaleUp">
        
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#6F766F] hover:bg-[#ECE1CF] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!isConfirmed ? (
          <div className="space-y-6">
            <div className="flex items-center gap-4 border-b border-[#5E7F68]/15 pb-4">
              <img
                src={bookingTherapist.image}
                alt={bookingTherapist.name}
                className="w-14 h-14 rounded-2xl object-cover border-2 border-[#5E7F68]/20"
              />
              <div>
                <h3 className="font-display font-bold text-xl text-[#1E2921]">
                  {bookingTherapist.name}
                </h3>
                <p className="text-xs text-[#5E7F68] font-semibold">
                  {bookingTherapist.title}
                </p>
                <span className="text-xs font-mono font-bold text-amber-800">
                  {bookingTherapist.price}
                </span>
              </div>
            </div>

            <form onSubmit={handleConfirm} className="space-y-4">
              
              {/* Date Selection */}
              <div>
                <label className="block text-xs font-semibold text-[#1E2921] mb-2">Select Date</label>
                <div className="grid grid-cols-3 gap-2">
                  {['Today', 'Tomorrow', 'Day After'].map((d) => (
                    <button
                      type="button"
                      key={d}
                      onClick={() => setSelectedDate(d)}
                      className={`py-2 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
                        selectedDate === d
                          ? 'bg-[#5E7F68] text-[#F4EDE1] border-[#5E7F68]'
                          : 'bg-[#ECE1CF] text-[#6F766F] border-[#5E7F68]/15'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Selection */}
              <div>
                <label className="block text-xs font-semibold text-[#1E2921] mb-2">Select Time Slot</label>
                <div className="grid grid-cols-3 gap-2">
                  {['11:00 AM', '2:30 PM', '4:30 PM', '6:00 PM', '7:30 PM'].map((t) => (
                    <button
                      type="button"
                      key={t}
                      onClick={() => setSelectedTime(t)}
                      className={`py-2 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
                        selectedTime === t
                          ? 'bg-[#5E7F68] text-[#F4EDE1] border-[#5E7F68]'
                          : 'bg-[#ECE1CF] text-[#6F766F] border-[#5E7F68]/15'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mode Selection */}
              <div>
                <label className="block text-xs font-semibold text-[#1E2921] mb-2">Consultation Medium</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: 'Video Call', icon: Video },
                    { label: 'Voice Call', icon: Phone },
                    { label: 'Private Chat', icon: MessageSquare }
                  ].map((m) => {
                    const Icon = m.icon;
                    return (
                      <button
                        type="button"
                        key={m.label}
                        onClick={() => setMedium(m.label)}
                        className={`p-3 rounded-xl text-xs font-semibold border flex flex-col items-center gap-1 transition-colors cursor-pointer ${
                          medium === m.label
                            ? 'bg-[#5E7F68] text-[#F4EDE1] border-[#5E7F68]'
                            : 'bg-[#ECE1CF] text-[#6F766F] border-[#5E7F68]/15'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{m.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-[#5E7F68] text-[#F4EDE1] font-bold text-xs shadow-lg hover:bg-[#173B28] transition-colors flex items-center justify-center gap-2 cursor-pointer mt-4"
              >
                <Sparkles className="w-4 h-4 text-[#C7A24A]" />
                <span>Confirm Demo Booking</span>
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center space-y-4 py-4 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h3 className="font-display font-bold text-2xl text-[#1E2921]">
              Booking Confirmed!
            </h3>

            <p className="text-xs text-[#6F766F] leading-relaxed max-w-sm mx-auto">
              Your confidential demo session with <strong>{bookingTherapist.name}</strong> is scheduled for <strong>{selectedDate} at {selectedTime}</strong> via <strong>{medium}</strong>.
            </p>

            <div className="p-4 rounded-2xl bg-[#ECE1CF] border border-[#5E7F68]/15 text-xs text-left space-y-1">
              <span className="font-bold text-[#1E2921] block">Joining Instructions:</span>
              <p className="text-[#6F766F]">A calendar invite & secure link have been generated for your student account.</p>
            </div>

            <button
              onClick={handleClose}
              className="w-full py-3 rounded-2xl bg-[#5E7F68] text-[#F4EDE1] font-bold text-xs shadow-md hover:bg-[#173B28] transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
