import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Building2, MoreVertical, ArrowRight } from 'lucide-react';

const RECENT_COMPANIES = [
  {
    name: 'Acme Corp',
    letter: 'A',
    avatarBg: 'bg-[#2563EB]',
    plan: 'Pro Plan',
    status: 'Active',
    users: 24,
    nextBilling: 'Dec 15, 2026'
  },
  {
    name: 'GlobalTech Ltd',
    letter: 'G',
    avatarBg: 'bg-[#2563EB]',
    plan: 'Business Plan',
    status: 'Active',
    users: 48,
    nextBilling: 'Dec 20, 2026'
  },
  {
    name: 'Bright Media',
    letter: 'B',
    avatarBg: 'bg-[#2563EB]',
    plan: 'Pro Plan',
    status: 'Trial',
    users: 12,
    nextBilling: 'Nov 25, 2026'
  },
  {
    name: 'NextGen Solutions',
    letter: 'N',
    avatarBg: 'bg-[#F97316]',
    plan: 'Business Plan',
    status: 'Active',
    users: 36,
    nextBilling: 'Dec 10, 2026'
  },
  {
    name: 'DreamWorks Co',
    letter: 'D',
    avatarBg: 'bg-[#3B82F6]',
    plan: 'Starter Plan',
    status: 'Cancelled',
    users: 8,
    nextBilling: '—'
  }
];

export const RecentCompanies = () => {
  const [activeMenu, setActiveMenu] = useState(null);

  const renderStatus = (status) => {
    switch (status) {
      case 'Active':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#DCFCE7] text-[#15803D]">
            Active
          </span>
        );
      case 'Trial':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#DBEAFE] text-[#1D4ED8]">
            Trial
          </span>
        );
      case 'Cancelled':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#FEE2E2] text-[#B91C1C]">
            Cancelled
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-[#E5EAF2] shadow-[0_1px_3px_rgba(0,0,0,0.03)] h-full flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between pb-3">
        <div className="flex items-center gap-2">
          <Building2 className="w-5 h-5 text-[#2563EB]" />
          <h3 className="text-base font-bold text-[#172033]">Recent Companies</h3>
        </div>

        <NavLink
          to="/companies"
          className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </NavLink>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#F1F5F9] text-xs font-semibold text-[#64748B]">
              <th className="py-2.5 px-2 font-medium">Company</th>
              <th className="py-2.5 px-2 font-medium">Plan</th>
              <th className="py-2.5 px-2 font-medium">Status</th>
              <th className="py-2.5 px-2 font-medium">Users</th>
              <th className="py-2.5 px-2 font-medium">Next Billing</th>
              <th className="py-2.5 px-1 text-right"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F1F5F9] text-xs">
            {RECENT_COMPANIES.map((c, idx) => (
              <tr key={idx} className="hover:bg-[#F8FAFC] transition-colors">
                <td className="py-3 px-2">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-7 h-7 rounded-lg ${c.avatarBg} text-white font-bold text-xs flex items-center justify-center flex-shrink-0 shadow-xs`}
                    >
                      {c.letter}
                    </div>
                    <span className="font-semibold text-[#172033]">{c.name}</span>
                  </div>
                </td>
                <td className="py-3 px-2 text-[#475569]">{c.plan}</td>
                <td className="py-3 px-2">{renderStatus(c.status)}</td>
                <td className="py-3 px-2 font-medium text-[#172033]">{c.users}</td>
                <td className="py-3 px-2 text-[#475569]">{c.nextBilling}</td>
                <td className="py-3 px-1 text-right relative">
                  <button
                    onClick={() => setActiveMenu(activeMenu === idx ? null : idx)}
                    className="p-1 rounded-md text-[#94A3B8] hover:text-[#172033] hover:bg-slate-100 transition-colors"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
