import React from 'react';
import { Building2, Users, Wallet, CreditCard, ArrowUpRight, AlertCircle } from 'lucide-react';
import { KPI_DATA } from '../../data/mockData';
import { useApp } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';

export const StatCards = () => {
  const { companies, invoices } = useApp();
  const navigate = useNavigate();

  // Dynamic calculations from base numbers in specification
  const additionalCompanies = Math.max(0, companies.length - 10);
  const totalCompaniesCount = 248 + additionalCompanies;
  const activeSubsCount = 225 + Math.max(0, companies.filter(c => c.status === 'Active').length - 7);
  const pendingCount = 12;

  const cards = [
    {
      title: 'Total Companies',
      value: totalCompaniesCount,
      growth: '+12%',
      comparison: 'vs previous 30 days',
      trend: 'up',
      icon: Building2,
      iconColor: 'text-[#3B82F6]',
      iconBg: 'bg-blue-50 border-blue-100',
      badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-100',
      onClick: () => navigate('/companies')
    },
    {
      title: 'Active Subscriptions',
      value: activeSubsCount,
      growth: '+8%',
      comparison: 'vs previous 30 days',
      trend: 'up',
      icon: Users,
      iconColor: 'text-[#10B981]',
      iconBg: 'bg-emerald-50 border-emerald-100',
      badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-100',
      onClick: () => navigate('/subscriptions')
    },
    {
      title: 'Monthly Recurring Revenue',
      value: '₹17.6L',
      growth: '+14%',
      comparison: 'vs previous 30 days',
      trend: 'up',
      icon: Wallet,
      iconColor: 'text-[#8B5CF6]',
      iconBg: 'bg-purple-50 border-purple-100',
      badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-100',
      onClick: () => navigate('/billing')
    },
    {
      title: 'Pending Payments',
      value: pendingCount,
      growth: '₹2.4L outstanding',
      comparison: '₹2.4L outstanding',
      trend: 'warning',
      icon: CreditCard,
      iconColor: 'text-[#F59E0B]',
      iconBg: 'bg-amber-50 border-amber-100',
      badgeBg: 'bg-amber-50 text-amber-700 border-amber-100',
      onClick: () => navigate('/billing')
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            onClick={card.onClick}
            className="bg-white rounded-2xl p-5 border border-[#E5EAF2] hover:border-blue-200 transition-all duration-200 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_12px_rgba(37,99,235,0.08)] cursor-pointer group flex flex-col justify-between"
          >
            {/* Top row: Icon and Growth Badge */}
            <div className="flex items-center justify-between">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center border ${card.iconBg} ${card.iconColor} transition-transform group-hover:scale-105`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full border ${card.badgeBg}`}>
                {card.trend === 'up' && <ArrowUpRight className="w-3 h-3" />}
                {card.trend === 'warning' && <AlertCircle className="w-3 h-3" />}
                {card.growth}
              </span>
            </div>

            {/* Bottom info */}
            <div className="mt-4">
              <p className="text-xs font-semibold text-[#8292AD] uppercase tracking-wide">
                {card.title}
              </p>
              <h3 className="text-2xl font-extrabold text-[#172033] mt-1 tracking-tight">
                {card.value}
              </h3>
              <p className="text-[11px] text-[#8292AD] mt-1 font-medium">
                {card.comparison}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

