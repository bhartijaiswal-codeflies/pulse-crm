import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Activity,
  CheckCircle2,
  Building2,
  TrendingUp,
  AlertCircle,
  LifeBuoy,
  UserPlus,
  ArrowRight,
  Clock
} from 'lucide-react';
import { RECENT_ACTIVITIES } from '../../data/mockData';

export const RecentActivity = () => {
  const getIcon = (type) => {
    switch (type) {
      case 'payment':
        return <CheckCircle2 className="w-4 h-4 text-emerald-600" />;
      case 'company':
        return <Building2 className="w-4 h-4 text-blue-600" />;
      case 'upgrade':
        return <TrendingUp className="w-4 h-4 text-indigo-600" />;
      case 'cancelled':
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      case 'ticket':
        return <LifeBuoy className="w-4 h-4 text-amber-600" />;
      case 'user':
        return <UserPlus className="w-4 h-4 text-cyan-600" />;
      default:
        return <Activity className="w-4 h-4 text-slate-600" />;
    }
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-[#E5EAF2] shadow-[0_1px_3px_rgba(0,0,0,0.04)] flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#E5EAF2]">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#172033]">Recent Activity</h3>
            <p className="text-xs text-[#8292AD]">Real-time operational audit events</p>
          </div>
        </div>

        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse"></span>
          Live Feed
        </span>
      </div>

      {/* Activity list */}
      <div className="divide-y divide-[#E5EAF2] my-2">
        {RECENT_ACTIVITIES.map((act) => (
          <div
            key={act.id}
            className="py-3 flex items-start gap-3 hover:bg-[#F7F9FC] px-2 rounded-xl transition-colors"
          >
            {/* Icon Box */}
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 border ${act.iconBg} border-[#E5EAF2]`}>
              {getIcon(act.type)}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs font-bold text-[#172033] truncate">{act.title}</p>
                <span className="text-[10px] text-[#8292AD] flex items-center gap-1 flex-shrink-0">
                  <Clock className="w-3 h-3" />
                  {act.time}
                </span>
              </div>
              <p className="text-[11px] text-[#8292AD] mt-0.5 line-clamp-2 leading-relaxed">
                {act.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer link to Activity Log */}
      <div className="pt-3 border-t border-[#E5EAF2] flex items-center justify-between text-xs">
        <span className="text-[#8292AD]">Showing last 6 events</span>
        <NavLink
          to="/activity"
          className="font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
        >
          <span>View Audit Trail</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </NavLink>
      </div>
    </div>
  );
};

