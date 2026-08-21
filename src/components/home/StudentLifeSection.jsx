import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { SectionHeading } from '../common/SectionHeading';
import { BookOpen, Users, Moon, Sparkles, ArrowRight, Wind, Headphones } from 'lucide-react';
import examStressImg from '../../assets/exam-stress.jpg';
import academicPressureImg from '../../assets/academic-pressure.jpg';
import careerAnxietyImg from '../../assets/career-anxiety.jpg';
import lonelinessImg from '../../assets/loneliness.jpg';
import relationshipStressImg from '../../assets/relationship-stress.jpg';
import sleepProblemsImg from '../../assets/sleep-problems.jpg';

const STUDENT_CARDS = [
  {
    id: 'exam-stress',
    title: 'Exam Stress',
    subtitle: 'Clear your mind before the next study session.',
    image: examStressImg,
    altText: 'Student studying under upcoming exam pressure',
    icon: Wind,
    target: { type: 'tool', id: 'breathing' },
    badge: 'Breathing Tool'
  },
  {
    id: 'academic-pressure',
    title: 'Academic Pressure',
    subtitle: 'Release the weight of deadlines and high expectations.',
    image: academicPressureImg,
    altText: 'Student surrounded by heavy academic workload at a study desk',
    icon: Headphones,
    target: { type: 'tool', id: 'meditation' },
    badge: 'Guided Session'
  },
  {
    id: 'career-anxiety',
    title: 'Career Anxiety',
    subtitle: 'Navigate placement season with calm and inner confidence.',
    image: careerAnxietyImg,
    altText: 'Final-year college student reflecting on post-graduation career plans',
    icon: BookOpen,
    target: { type: 'tool', id: 'journal' },
    badge: 'Private Journal'
  },
  {
    id: 'loneliness',
    title: 'Loneliness',
    subtitle: 'Connect with peers who truly understand dorm & hostel life.',
    image: lonelinessImg,
    altText: 'College student sitting alone in a quiet campus setting',
    icon: Users,
    target: { type: 'community' },
    badge: 'Peer Threads'
  },
  {
    id: 'relationship-stress',
    title: 'Relationship Stress',
    subtitle: 'Find perspective and inner clarity during emotional shifts.',
    image: relationshipStressImg,
    altText: 'Young student reflecting after an emotionally difficult interaction',
    icon: Sparkles,
    target: { type: 'ai' },
    badge: 'Sukoon AI'
  },
  {
    id: 'sleep-problems',
    title: 'Sleep Problems',
    subtitle: 'Settle your active mind after late-night study sessions.',
    image: sleepProblemsImg,
    altText: 'Student awake in a softly lit bedroom at night',
    icon: Moon,
    target: { type: 'tool', id: 'sleep' },
    badge: 'Sleep Haven'
  }
];

export const StudentLifeSection = () => {
  const { navigateTarget, setIsAiOpen } = useAuth();

  const handleCardClick = (card) => {
    if (card.target?.type === 'ai') {
      setIsAiOpen(true);
    } else {
      navigateTarget(card.target);
    }
  };

  return (
    <section className="py-20 sm:py-28 lg:py-32 bg-[#F4EDE1] border-t border-[#5E7F68]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          badge="Tailored Student Care"
          title="Built for the moments student life feels overwhelming."
          subtitle="Whether it’s exam panic, placement burnout, or late-night overthinking, Sukoon gives you targeted tools to find ground."
        />

        {/* Grid of Unified Editorial Situation Cards */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {STUDENT_CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                onClick={() => handleCardClick(card)}
                className="group rounded-3xl bg-[#FAF6EF] border border-[#5E7F68]/15 hover:border-[#5E7F68]/35 overflow-hidden shadow-2xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                {/* Visual Editorial Image Header */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.altText || card.title}
                    className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#173B28]/80 via-[#173B28]/25 to-transparent" />
                  
                  <span className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-[#173B28]/85 backdrop-blur-md text-[#C7A24A] text-[10px] font-semibold uppercase tracking-wider border border-[#C7A24A]/30">
                    {card.badge}
                  </span>

                  <div className="absolute bottom-4 left-4 right-4 text-[#F4EDE1]">
                    <h3 className="font-display font-semibold text-xl sm:text-2xl text-[#F4EDE1]">
                      {card.title}
                    </h3>
                  </div>
                </div>

                {/* Body Details & Quiet Action */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                  <p className="text-xs sm:text-sm text-[#6F766F] leading-relaxed font-normal italic">
                    “{card.subtitle}”
                  </p>

                  <div className="pt-3 border-t border-[#5E7F68]/10 flex items-center justify-between text-xs font-semibold text-[#5E7F68] group-hover:text-[#173B28] transition-colors">
                    <span className="flex items-center gap-1.5">
                      <Icon className="w-3.5 h-3.5 text-[#5E7F68]" />
                      Explore Path
                    </span>
                    <ArrowRight className="w-4 h-4 text-[#C7A24A] group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
