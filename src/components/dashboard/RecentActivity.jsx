import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Zap, ArrowRight, CheckCircle2, AlertCircle, RefreshCw, Sparkles } from 'lucide-react';

const ACTIVITIES = [
  {
    dotColor: 'bg-[#10B981]',
    title: 'Payment received from Acme Corp',
    subtext: '₹1,50,000 • 2 hours ago',
    badge: 'Success',
    badgeClass: 'bg-[#DCFCE7] text-[#15803D] dark:bg-emerald-950/60 dark:text-emerald-400',
    path: '/billing'
  },
  {
    dotColor: 'bg-[#2563EB]',
    title: 'New company registered: GlobalTech Ltd',
    subtext: '3 hours ago',
    badge: 'New',
    badgeClass: 'bg-[#DBEAFE] text-[#1D4ED8] dark:bg-blue-950/60 dark:text-blue-400',
    path: '/companies'
  },
  {
    dotColor: 'bg-[#F59E0B]',
    title: 'Subscription cancelled: Bright Media',
    subtext: '5 hours ago',
    badge: 'Cancelled',
    badgeClass: 'bg-[#FEE2E2] text-[#B91C1C] dark:bg-red-950/60 dark:text-red-400',
    path: '/subscriptions'
  }
];

export const RecentActivity = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white dark:bg-[#0D152D] rounded-2xl p-5 border border-[#E5EAF2] dark:border-[#1E2D54] shadow-[0_1px_3px_rgba(0,0,0,0.03)] h-full flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between pb-3">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-[#2563EB] fill-[#2563EB]" />
          <h3 className="text-base font-bold text-[#172033] dark:text-white">Recent Activity</h3>
        </div>

        <NavLink
          to="/activity"
          className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </NavLink>
      </div>

      {/* Activity Items */}
      <div className="space-y-3.5 my-auto pt-1">
        {ACTIVITIES.map((act, idx) => (
          <div
            key={idx}
            onClick={() => navigate(act.path)}
            className="flex items-center justify-between gap-3 p-1.5 -mx-1.5 rounded-xl hover:bg-slate-50 dark:hover:bg-[#121D3D] transition-colors cursor-pointer group"
          >
            <div className="flex items-start gap-3 min-w-0">
              <span
                className={`w-2.5 h-2.5 rounded-full flex-shrink-0 mt-1.5 ${act.dotColor}`}
              />
              <div className="min-w-0 truncate">
                <p className="text-xs font-semibold text-[#172033] dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                  {act.title}
                </p>
                <p className="text-[11px] text-[#64748B] dark:text-slate-400 mt-0.5">
                  {act.subtext}
                </p>
              </div>
            </div>

            <span
              className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium flex-shrink-0 ${act.badgeClass}`}
            >
              {act.badge}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
