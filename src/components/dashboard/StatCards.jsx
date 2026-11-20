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
      trendColor: 'text-[#137333] dark:text-emerald-400',
      bgClass: 'bg-[#F8FAFF] dark:bg-[#0D152D] border-[#E2EDFF] dark:border-[#1E2D54]',
      icon: (
        <div className="w-9 h-9 rounded-xl bg-[#E8F0FE] dark:bg-blue-950/60 flex items-center justify-center text-[#1A73E8] dark:text-blue-400 flex-shrink-0">
          <Building2 className="w-4 h-4" />
        </div>
      ),
      sparkline: (
        <svg viewBox="0 0 100 35" fill="none" className="w-16 h-7 sm:w-20 sm:h-8" preserveAspectRatio="none">
          <defs>
            <linearGradient id="blueSpark" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.0" />
            </linearGradient>
          </defs>
          <path
            d="M 2 24 C 15 24, 25 18, 38 21 C 50 25, 62 10, 75 14 C 85 16, 92 8, 98 6 L 98 35 L 2 35 Z"
            fill="url(#blueSpark)"
          />
          <path
            d="M 2 24 C 15 24, 25 18, 38 21 C 50 25, 62 10, 75 14 C 85 16, 92 8, 98 6"
            stroke="#3B82F6"
            strokeWidth="2"
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
      trendColor: 'text-[#137333] dark:text-emerald-400',
      bgClass: 'bg-[#F6FDF9] dark:bg-[#0D152D] border-[#DCFCE7] dark:border-[#1E2D54]',
      icon: (
        <div className="w-9 h-9 rounded-xl bg-[#E6F4EA] dark:bg-emerald-950/60 flex items-center justify-center text-[#137333] dark:text-emerald-400 flex-shrink-0">
          <Users className="w-4 h-4" />
        </div>
      ),
      sparkline: (
        <svg viewBox="0 0 100 35" fill="none" className="w-16 h-7 sm:w-20 sm:h-8" preserveAspectRatio="none">
          <defs>
            <linearGradient id="greenSpark" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
            </linearGradient>
          </defs>
          <path
            d="M 2 22 C 16 22, 28 26, 42 18 C 55 12, 68 22, 80 14 C 90 8, 94 12, 98 4 L 98 35 L 2 35 Z"
            fill="url(#greenSpark)"
          />
          <path
            d="M 2 22 C 16 22, 28 26, 42 18 C 55 12, 68 22, 80 14 C 90 8, 94 12, 98 4"
            stroke="#10B981"
            strokeWidth="2"
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
      trendColor: 'text-[#137333] dark:text-emerald-400',
      bgClass: 'bg-[#FAF7FF] dark:bg-[#0D152D] border-[#F3E8FF] dark:border-[#1E2D54]',
      icon: (
        <div className="w-9 h-9 rounded-xl bg-[#F3E8FF] dark:bg-purple-950/60 flex items-center justify-center text-[#7C3AED] dark:text-purple-400 flex-shrink-0 font-bold text-sm">
          ₹
        </div>
      ),
      sparkline: (
        <svg viewBox="0 0 100 35" fill="none" className="w-16 h-7 sm:w-20 sm:h-8" preserveAspectRatio="none">
          <defs>
            <linearGradient id="purpleSpark" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.0" />
            </linearGradient>
          </defs>
          <path
            d="M 2 22 C 14 22, 24 25, 36 21 C 48 16, 60 26, 74 18 C 86 10, 92 16, 98 8 L 98 35 L 2 35 Z"
            fill="url(#purpleSpark)"
          />
          <path
            d="M 2 22 C 14 22, 24 25, 36 21 C 48 16, 60 26, 74 18 C 86 10, 92 16, 98 8"
            stroke="#8B5CF6"
            strokeWidth="2"
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
      trendColor: 'text-[#D97706] dark:text-amber-400',
      bgClass: 'bg-[#FFFDF5] dark:bg-[#0D152D] border-[#FEF3C7] dark:border-[#1E2D54]',
      icon: (
        <div className="w-9 h-9 rounded-xl bg-[#FEF3C7] dark:bg-amber-950/60 flex items-center justify-center text-[#D97706] dark:text-amber-400 flex-shrink-0">
          <CreditCard className="w-4 h-4" />
        </div>
      ),
      sparkline: (
        <svg viewBox="0 0 100 35" fill="none" className="w-16 h-7 sm:w-20 sm:h-8" preserveAspectRatio="none">
          <defs>
            <linearGradient id="amberSpark" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.0" />
            </linearGradient>
          </defs>
          <path
            d="M 2 20 C 15 16, 26 22, 38 18 C 50 14, 62 20, 74 12 C 86 6, 92 14, 98 10 L 98 35 L 2 35 Z"
            fill="url(#amberSpark)"
          />
          <path
            d="M 2 20 C 15 16, 26 22, 38 18 C 50 14, 62 20, 74 12 C 86 6, 92 14, 98 10"
            stroke="#F59E0B"
            strokeWidth="2"
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
          className={`${card.bgClass} rounded-2xl p-4 sm:p-5 border shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between`}
        >
          {/* Top Row: Icon + Title/Value on Left, Sparkline on Right */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {card.icon}
              <div>
                <p className="text-xs font-normal text-[#64748B] dark:text-slate-400 leading-tight">
                  {card.title}
                </p>
                <h3 className="text-2xl font-bold text-[#172033] dark:text-white mt-0.5 tracking-tight">
                  {card.value}
                </h3>
              </div>
            </div>
            <div className="flex-shrink-0">
              {card.sparkline}
            </div>
          </div>

          {/* Bottom Row: Percentage & Subtitle */}
          <div className="mt-3.5 pt-0.5 flex items-center text-xs">
            {card.growth ? (
              <>
                <span className={`${card.trendColor} font-medium flex items-center gap-0.5 flex-shrink-0`}>
                  ↑ {card.growth}
                </span>
                <span className="text-[#8292AD] dark:text-slate-400 ml-1 font-normal truncate">
                  {card.comparison}
                </span>
              </>
            ) : (
              <span className="text-[#D97706] dark:text-amber-400 font-medium truncate">
                {card.customComparison}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
