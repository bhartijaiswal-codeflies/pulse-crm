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
        <div className="w-10 h-10 rounded-xl bg-[#EBF3FF] flex items-center justify-center text-[#2563EB] flex-shrink-0">
          <Building2 className="w-5 h-5" />
        </div>
      ),
      sparkline: (
        <svg viewBox="0 0 100 35" fill="none" className="w-24 h-9">
          <path
            d="M 2 24 C 15 24, 25 18, 38 21 C 50 25, 62 10, 75 14 C 85 16, 92 8, 98 6"
            stroke="#3B82F6"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      ),
      bgClass: 'bg-gradient-to-br from-[#F5F8FF]/80 via-white to-white border-[#E0EDFD]',
      onClick: () => navigate('/companies')
    },
    {
      title: 'Active Subscriptions',
      value: '225',
      growth: '+8%',
      comparison: 'vs previous 30 days',
      trendColor: 'text-[#10B981]',
      icon: (
        <div className="w-10 h-10 rounded-xl bg-[#ECFDF5] flex items-center justify-center text-[#10B981] flex-shrink-0">
          <Users className="w-5 h-5" />
        </div>
      ),
      sparkline: (
        <svg viewBox="0 0 100 35" fill="none" className="w-24 h-9">
          <path
            d="M 2 22 C 16 22, 28 26, 42 18 C 55 12, 68 22, 80 14 C 90 8, 94 12, 98 4"
            stroke="#10B981"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      ),
      bgClass: 'bg-gradient-to-br from-[#F2FDF6]/80 via-white to-white border-[#DCFCE7]',
      onClick: () => navigate('/subscriptions')
    },
    {
      title: 'Monthly Recurring Revenue',
      value: '₹17.6L',
      growth: '+15%',
      comparison: 'vs previous 30 days',
      trendColor: 'text-[#10B981]',
      icon: (
        <div className="w-10 h-10 rounded-xl bg-[#F5F3FF] flex items-center justify-center text-[#7C3AED] flex-shrink-0 font-bold text-lg">
          ₹
        </div>
      ),
      sparkline: (
        <svg viewBox="0 0 100 35" fill="none" className="w-24 h-9">
          <path
            d="M 2 22 C 14 22, 24 25, 36 21 C 48 16, 60 26, 74 18 C 86 10, 92 16, 98 8"
            stroke="#8B5CF6"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      ),
      bgClass: 'bg-gradient-to-br from-[#FAF5FF]/80 via-white to-white border-[#F3E8FF]',
      onClick: () => navigate('/billing')
    },
    {
      title: 'Pending Payments',
      value: '12',
      customComparison: '₹2.4L outstanding',
      trendColor: 'text-[#F59E0B]',
      icon: (
        <div className="w-10 h-10 rounded-xl bg-[#FFFBEB] flex items-center justify-center text-[#F59E0B] flex-shrink-0">
          <CreditCard className="w-5 h-5" />
        </div>
      ),
      sparkline: (
        <svg viewBox="0 0 100 35" fill="none" className="w-24 h-9">
          <path
            d="M 2 20 C 15 16, 26 22, 38 18 C 50 14, 62 20, 74 12 C 86 6, 92 14, 98 10"
            stroke="#F59E0B"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      ),
      bgClass: 'bg-gradient-to-br from-[#FFFDF5]/80 via-white to-white border-[#FEF3C7]',
      onClick: () => navigate('/billing')
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
      {cards.map((card, idx) => (
        <div
          key={idx}
          onClick={card.onClick}
          className={`rounded-2xl p-5 border ${card.bgClass} shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between`}
        >
          {/* Top Row: Icon + Title & Value on Left, Sparkline on Right */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-3">
              {card.icon}
              <div>
                <p className="text-xs font-medium text-[#475569] leading-tight">
                  {card.title}
                </p>
                <h3 className="text-2xl font-bold text-[#172033] mt-1 tracking-tight">
                  {card.value}
                </h3>
              </div>
            </div>

            {/* Sparkline curve */}
            <div className="flex-shrink-0 pt-1">
              {card.sparkline}
            </div>
          </div>

          {/* Bottom Row: Percentage & Subtitle */}
          <div className="mt-4 pt-1 flex items-center text-xs">
            {card.growth ? (
              <>
                <span className={`${card.trendColor} font-semibold flex items-center gap-0.5`}>
                  ↑ {card.growth}
                </span>
                <span className="text-[#64748B] ml-1.5 font-normal">
                  {card.comparison}
                </span>
              </>
            ) : (
              <span className="text-[#D97706] font-semibold">
                {card.customComparison}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
