import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { VERIFIED_CRISIS_CONTACTS, CRISIS_DISCLAIMER } from '../../data/verifiedCrisisData';
import { SectionHeading } from '../common/SectionHeading';
import { ShieldAlert, Phone, Building2, UserCheck, MapPin, AlertCircle } from 'lucide-react';

const SUPPORT_OPTIONS = [
  {
    id: 'campus',
    title: 'Campus Counselor',
    description: 'Direct confidential appointments with your university student welfare officer.',
    icon: UserCheck
  },
  {
    id: 'centre',
    title: 'Mental Health Centre',
    description: 'On-campus clinical counseling and psychological support services.',
    icon: Building2
  },
  {
    id: 'emergency',
    title: 'Emergency Help',
    description: '24/7 National Mental Health Helpline (Tele-MANAS) & Immediate assistance.',
    icon: ShieldAlert
  },
  {
    id: 'local',
    title: 'Local Support',
    description: 'Find verified counselors and psychiatric emergency resources near your city.',
    icon: MapPin
  }
];

export const CampusSupportSection = () => {
  const { setIsCrisisOpen } = useAuth();

  return (
    <section className="py-20 sm:py-28 lg:py-32 bg-[#F4EDE1] border-t border-[#5E7F68]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        
        <SectionHeading
          badge="Human & Campus Care"
          title="Need support beyond the screen?"
          subtitle="Sukoon connects you with verified campus resources, professional counselors, and immediate helplines when digital tools aren’t enough."
        />

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {SUPPORT_OPTIONS.map((opt) => {
            const Icon = opt.icon;
            return (
              <div
                key={opt.id}
                className="p-6 sm:p-8 rounded-3xl bg-[#FAF6EF] border border-[#5E7F68]/15 shadow-sm space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="p-3 rounded-2xl bg-[#173B28] text-[#F4EDE1] w-fit">
                    <Icon className="w-6 h-6 text-[#C7A24A]" />
                  </div>
                  <h3 className="font-display font-bold text-xl text-[#1E2921]">
                    {opt.title}
                  </h3>
                  <p className="text-xs text-[#6F766F] leading-relaxed font-medium">
                    {opt.description}
                  </p>
                </div>

                <button
                  onClick={() => setIsCrisisOpen(true)}
                  className="w-full py-2.5 rounded-xl bg-[#173B28] text-[#F4EDE1] font-bold text-xs hover:bg-[#224932] transition-colors cursor-pointer text-center"
                >
                  Access Details →
                </button>
              </div>
            );
          })}
        </div>

        {/* Primary Serious CTA Box */}
        <div className="p-5 sm:p-8 rounded-3xl bg-[#173B28] text-[#F4EDE1] border-2 border-red-900/40 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-red-400 font-bold text-xs uppercase tracking-wider">
              <ShieldAlert className="w-4 h-4" />
              <span>Verified 24/7 National Emergency Helplines</span>
            </div>
            <h3 className="font-display font-bold text-2xl text-[#F4EDE1]">
              In crisis? Talk to a professional right now.
            </h3>
            <p className="text-xs text-[#F4EDE1]/75 max-w-xl">
              Tele-MANAS: <strong className="text-[#C7A24A] font-mono">14416 / 1800-89-14416</strong> | Vandrevala: <strong className="text-[#C7A24A] font-mono">+91 9999 666 555</strong> | AASRA: <strong className="text-[#C7A24A] font-mono">+91-22-27546669</strong>
            </p>
          </div>

          <button
            onClick={() => setIsCrisisOpen(true)}
            className="px-8 py-4 rounded-full bg-[#C94B4B] hover:bg-red-700 text-white font-bold text-xs shadow-lg transition-colors cursor-pointer shrink-0"
          >
            Get Help Now
          </button>
        </div>

        {/* Safety Disclaimer Notice */}
        <p className="text-center text-xs text-[#6F766F] italic max-w-3xl mx-auto leading-relaxed">
          {CRISIS_DISCLAIMER}
        </p>

      </div>
    </section>
  );
};
