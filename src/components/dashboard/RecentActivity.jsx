import React from 'react';
import { NavLink } from 'react-router-dom';
import { Zap, ArrowRight } from 'lucide-react';

const ACTIVITIES = [
  {
    dotColor: 'bg-[#10B981]',
    title: 'Payment received from Acme Corp',
    subtext: '₹1,50,000 • 2 hours ago',
    badge: 'Success',
    badgeClass: 'bg-[#DCFCE7] text-[#15803D]'
  },
  {
    dotColor: 'bg-[#2563EB]',
    title: 'New company registered: GlobalTech Ltd',
    subtext: '3 hours ago',
    badge: 'New',
    badgeClass: 'bg-[#DBEAFE] text-[#1D4ED8]'
  },
  {
    dotColor: 'bg-[#F59E0B]',
    title: 'Subscription cancelled: Bright Media',
    subtext: '5 hours ago',
    badge: 'Cancelled',
    badgeClass: 'bg-[#FEE2E2] text-[#B91C1C]'
  },
  {
    dotColor: 'bg-[#8B5CF6]',
    title: 'Plan upgraded: NextGen Solutions',
    subtext: '1 day ago',
    badge: 'Upgrade',
    badgeClass: 'bg-[#F3E8FF] text-[#7E22CE]'
  }
];

export const RecentActivity = () => {
  return (
    <div className="bg-white rounded-2xl p-5 border border-[#E5EAF2] shadow-[0_1px_3px_rgba(0,0,0,0.03)] h-full flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between pb-3">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-[#2563EB] fill-[#2563EB]" />
          <h3 className="text-base font-bold text-[#172033]">Recent Activity</h3>
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
      <div className="space-y-4 my-auto pt-1">
        {ACTIVITIES.map((act, idx) => (
          <div key={idx} className="flex items-center justify-between gap-3">
            <div className="flex items-start gap-3 min-w-0">
              <span
                className={`w-2.5 h-2.5 rounded-full flex-shrink-0 mt-1.5 ${act.dotColor}`}
              />
              <div className="min-w-0 truncate">
                <p className="text-xs font-semibold text-[#172033] truncate">
                  {act.title}
                </p>
                <p className="text-[11px] text-[#64748B] mt-0.5">
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
