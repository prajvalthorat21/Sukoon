import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { VERIFIED_CRISIS_CONTACTS, CRISIS_DISCLAIMER } from '../../data/verifiedCrisisData';
import { ShieldAlert, Phone, Sparkles, X, AlertTriangle, HeartHandshake } from 'lucide-react';

export const CrisisPanel = () => {
  const { isCrisisOpen, setIsCrisisOpen, setIsAiOpen } = useAuth();

  if (!isCrisisOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/55 backdrop-blur-xs animate-fadeIn">
      <div className="w-full max-w-2xl bg-[#FAF6EF] rounded-3xl p-4 sm:p-8 shadow-2xl border border-[#C94B4B]/30 relative max-h-[90vh] overflow-y-auto animate-scaleUp">
        
        {/* Close Button */}
        <button
          onClick={() => setIsCrisisOpen(false)}
          aria-label="Close crisis support panel"
          className="absolute top-5 right-5 p-2 rounded-full text-[#6F766F] hover:bg-[#ECE1CF] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Serious & Compassionate Header */}
        <div className="flex items-start gap-4 border-b border-[#5E7F68]/15 pb-5">
          <div className="p-3 rounded-2xl bg-[#C94B4B]/10 text-[#C94B4B] shrink-0 border border-[#C94B4B]/20">
            <ShieldAlert className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#C94B4B] block">
              Emergency & Crisis Assistance
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#1E2921] leading-tight">
              You don’t have to face this alone.
            </h2>
            <p className="text-xs text-[#6F766F] leading-relaxed">
              If you are in distress, overwhelmed, or in immediate danger, please reach out to these free, confidential, 24/7 verified resources.
            </p>
          </div>
        </div>

        {/* Action Buttons Grid */}
        <div className="py-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5 border-b border-[#5E7F68]/15">
          <a
            href="tel:14416"
            aria-label="Call Tele-MANAS emergency helpline at 14416"
            className="p-4 rounded-2xl bg-[#C94B4B] text-white font-bold text-xs sm:text-sm shadow-xs hover:bg-[#B33E3E] transition-colors flex items-center justify-center gap-2 cursor-pointer text-center"
          >
            <Phone className="w-4 h-4 fill-white shrink-0" />
            <div className="flex items-center gap-1.5 flex-wrap justify-center">
              <span>Call Tele-MANAS</span>
              <span className="font-mono bg-white/20 px-2 py-0.5 rounded text-xs font-bold">14416</span>
            </div>
          </a>

          <button
            onClick={() => { setIsCrisisOpen(false); setIsAiOpen(true); }}
            aria-label="Talk to Sukoon AI Immediately"
            className="p-4 rounded-2xl bg-[#173B28] text-[#F4EDE1] font-bold text-xs sm:text-sm shadow-xs hover:bg-[#224932] transition-colors flex items-center justify-center gap-3 cursor-pointer text-center"
          >
            <Sparkles className="w-4 h-4 text-[#C7A24A]" />
            <span>Talk to Sukoon AI Immediately</span>
          </button>
        </div>

        {/* Verified Helpline Directory */}
        <div className="py-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-base sm:text-lg text-[#1E2921]">
              Support Helplines & Services (India)
            </h3>
            <span className="text-[10px] font-semibold text-[#5E7F68] bg-[#5E7F68]/10 px-2.5 py-1 rounded-full border border-[#5E7F68]/20">
              Toll-Free & Confidential
            </span>
          </div>

          <div className="space-y-3">
            {VERIFIED_CRISIS_CONTACTS.map((c) => (
              <div
                key={c.name}
                className="p-4 rounded-2xl bg-[#F4EDE1]/60 border border-[#5E7F68]/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <strong className="text-xs sm:text-sm text-[#1E2921] font-bold">{c.name}</strong>
                    <span className="text-[10px] bg-[#ECE1CF] text-[#5E7F68] px-2 py-0.5 rounded-full font-semibold">
                      {c.category}
                    </span>
                  </div>
                  <p className="text-xs text-[#6F766F] leading-relaxed">{c.description}</p>
                </div>

                <a
                  href={`tel:${c.number.replace(/\s+/g, '')}`}
                  aria-label={`Call ${c.name} at ${c.number}`}
                  className="px-4 py-2 rounded-xl bg-[#FAF6EF] text-[#C94B4B] border border-[#C94B4B]/30 hover:bg-[#C94B4B]/10 text-xs font-mono font-bold shrink-0 flex items-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{c.number}</span>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Safety Disclaimer Notice */}
        <div className="p-4 rounded-2xl bg-amber-50/90 border border-amber-200 text-xs text-amber-950 space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-amber-900">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Important Safety Notice</span>
          </div>
          <p className="leading-relaxed text-[11px] text-amber-900/90">{CRISIS_DISCLAIMER}</p>
        </div>

      </div>
    </div>
  );
};
