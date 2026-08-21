import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { THERAPISTS } from '../../data/therapistsData';
import { SectionHeading } from '../common/SectionHeading';
import { TherapistCard } from './TherapistCard';
import { ShieldCheck, HeartHandshake, Lock } from 'lucide-react';

export const TherapistSection = () => {
  const { setBookingTherapist } = useAuth();

  return (
    <section className="py-20 sm:py-28 lg:py-32 bg-[#F4EDE1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          badge="Verified Professional Care"
          title="Student Counselors & Therapists"
          subtitle="Empathetic, licensed mental health professionals who understand college pressure, placement anxiety, and young adult life."
        />

        {/* Trust Badges */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs text-[#6F766F]">
          <div className="flex items-center gap-1.5 bg-[#FAF6EF] px-4 py-2 rounded-full border border-[#5E7F68]/15 shadow-xs">
            <ShieldCheck className="w-4 h-4 text-[#5E7F68]" />
            <span className="font-medium text-[#1E2921]">Verified Counselors</span>
          </div>
          <div className="flex items-center gap-1.5 bg-[#FAF6EF] px-4 py-2 rounded-full border border-[#5E7F68]/15 shadow-xs">
            <Lock className="w-4 h-4 text-[#5E7F68]" />
            <span className="font-medium text-[#1E2921]">100% Confidential</span>
          </div>
          <div className="flex items-center gap-1.5 bg-[#FAF6EF] px-4 py-2 rounded-full border border-[#5E7F68]/15 shadow-xs">
            <HeartHandshake className="w-4 h-4 text-[#5E7F68]" />
            <span className="font-medium text-[#1E2921]">Student Discounted Rates</span>
          </div>
        </div>

        {/* Therapist Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {THERAPISTS.map((t) => (
            <TherapistCard
              key={t.id}
              therapist={t}
              onBook={setBookingTherapist}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
