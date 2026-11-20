import React from 'react';
import { Building2, Users, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const StatCards = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: 'Total Companies',
      value: '248',
      growth: '+12%',
      comparison: 'vs previous 30 days',
      trendColor: 'text-[#10B981]',
      icon: (
        <div className="w-10 h-10 rounded-xl bg-[#EBF3FF] dark:bg-[#1E293B] flex items-center justify-center text-[#2563EB] dark:text-[#60A5FA] flex-shrink-0">
          <Building2 className="w-5 h-5" />
        </div>
      ),
      sparkline: (
        <svg viewBox="0 0 100 35" fill="none" className="w-16 h-7 sm:w-20 sm:h-8" preserveAspectRatio="none">
          <path
            d="M 2 24 C 15 24, 25 18, 38 21 C 50 25, 62 10, 75 14 C 85 16, 92 8, 98 6"
            stroke="#3B82F6"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      ),
      onClick: () => navigate('/companies')
    },
    {
      title: 'Active Subscriptions',
      value: '225',
      growth: '+8%',
      comparison: 'vs previous 30 days',
      trendColor: 'text-[#10B981]',
      icon: (
        <div className="w-10 h-10 rounded-xl bg-[#ECFDF5] dark:bg-[#064E3B]/40 flex items-center justify-center text-[#10B981] dark:text-[#34D399] flex-shrink-0">
          <Users className="w-5 h-5" />
        </div>
      ),
      sparkline: (
        <svg viewBox="0 0 100 35" fill="none" className="w-16 h-7 sm:w-20 sm:h-8" preserveAspectRatio="none">
          <path
            d="M 2 22 C 16 22, 28 26, 42 18 C 55 12, 68 22, 80 14 C 90 8, 94 12, 98 4"
            stroke="#10B981"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      ),
      onClick: () => navigate('/subscriptions')
    },
    {
      title: 'Monthly Recurring Revenue',
      value: '₹17.6L',
      growth: '+15%',
      comparison: 'vs previous 30 days',
      trendColor: 'text-[#10B981]',
      icon: (
        <div className="w-10 h-10 rounded-xl bg-[#F5F3FF] dark:bg-[#3B1F64]/50 flex items-center justify-center text-[#7C3AED] dark:text-[#A78BFA] flex-shrink-0 font-bold text-lg">
          ₹
        </div>
      ),
      sparkline: (
        <svg viewBox="0 0 100 35" fill="none" className="w-16 h-7 sm:w-20 sm:h-8" preserveAspectRatio="none">
          <path
            d="M 2 22 C 14 22, 24 25, 36 21 C 48 16, 60 26, 74 18 C 86 10, 92 16, 98 8"
            stroke="#8B5CF6"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      ),
      onClick: () => navigate('/billing')
    },
    {
      title: 'Pending Payments',
      value: '12',
      customComparison: '₹2.4L outstanding',
      trendColor: 'text-[#F59E0B]',
      icon: (
        <div className="w-10 h-10 rounded-xl bg-[#FFFBEB] dark:bg-[#451A03]/50 flex items-center justify-center text-[#F59E0B] dark:text-[#FBBF24] flex-shrink-0">
          <CreditCard className="w-5 h-5" />
        </div>
      ),
      sparkline: (
        <svg viewBox="0 0 100 35" fill="none" className="w-16 h-7 sm:w-20 sm:h-8" preserveAspectRatio="none">
          <path
            d="M 2 20 C 15 16, 26 22, 38 18 C 50 14, 62 20, 74 12 C 86 6, 92 14, 98 10"
            stroke="#F59E0B"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      ),
      onClick: () => navigate('/billing')
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
      {cards.map((card, idx) => (
        <div
          key={idx}
          onClick={card.onClick}
          className="bg-white dark:bg-[#0D152D] rounded-2xl p-4 sm:p-5 border border-[#E5EAF2] dark:border-[#1E2D54] shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between"
        >
          {/* Top Row: Icon + Title/Value on Left, Sparkline on Right */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {card.icon}
              <div>
                <p className="text-xs font-medium text-[#64748B] dark:text-slate-400 leading-tight">
                  {card.title}
                </p>
                <h3 className="text-2xl font-bold text-[#172033] dark:text-white mt-1 tracking-tight">
                  {card.value}
                </h3>
              </div>
            </div>
            <div className="flex-shrink-0">
              {card.sparkline}
            </div>
          </div>

          {/* Bottom Row: Percentage & Subtitle */}
          <div className="mt-4 pt-0.5 flex items-center text-xs">
            {card.growth ? (
              <>
                <span className={`${card.trendColor} font-semibold flex items-center gap-0.5 flex-shrink-0`}>
                  ↑ {card.growth}
                </span>
                <span className="text-[#64748B] dark:text-slate-400 ml-1.5 font-normal truncate">
                  {card.comparison}
                </span>
              </>
            ) : (
              <span className="text-[#D97706] font-semibold truncate">
                {card.customComparison}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
