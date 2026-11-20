import React from 'react';
import {
  Activity,
  HardDrive,
  Cpu,
  Users,
  Mail,
  AlertTriangle,
  ArrowUpRight,
  TrendingUp,
  Server
} from 'lucide-react';
import { USAGE_METRICS } from '../data/mockData';
import { useApp } from '../context/AppContext';

export const Usage = () => {
  const { showToast } = useApp();

  const handleUpgrade = (company) => {
    showToast(`Quota increase request initiated for ${company}`);
  };

  return (
    <div className="space-y-6">
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <h1 className="text-2xl font-bold text-[#172033] dark:text-white tracking-tight">
              Usage & System Limits
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#EFF6FF] text-[#2563EB] dark:bg-blue-950/60 dark:text-blue-400 border border-blue-100 dark:border-blue-900/40">
              Cluster Healthy
            </span>
          </div>
          <p className="text-xs text-[#8292AD] dark:text-slate-400 mt-1 font-normal">
            Infrastructure capacity, storage allocations, API quotas, and limit governance.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => showToast('Capacity audit refreshed', 'info')}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#172033] dark:text-white bg-white dark:bg-[#0D152D] hover:bg-slate-50 dark:hover:bg-[#121D3D] border border-[#E5EAF2] dark:border-[#1E2D54] rounded-xl shadow-2xs transition-colors cursor-pointer"
          >
            <Server className="w-3.5 h-3.5 text-[#64748B] dark:text-slate-400" />
            <span>Refresh Cluster</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        {/* Card 1: Storage */}
        <div className="bg-[#F8FAFF] dark:bg-[#0D152D] p-4 rounded-2xl border border-[#E2EDFF] dark:border-[#1E2D54] shadow-xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-[#2563EB] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
            <HardDrive className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold text-[#172033] dark:text-white leading-tight">
              {USAGE_METRICS.storage.used} {USAGE_METRICS.storage.unit}
            </div>
            <div className="text-xs text-[#64748B] dark:text-slate-400 font-normal mt-0.5 leading-tight">
              Storage Capacity ({USAGE_METRICS.storage.percentage}% used)
            </div>
          </div>
        </div>

        {/* Card 2: Active Seats */}
        <div className="bg-[#F6FDF9] dark:bg-[#0D152D] p-4 rounded-2xl border border-[#DCFCE7] dark:border-[#1E2D54] shadow-xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-[#10B981] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold text-[#172033] dark:text-white leading-tight">
              {USAGE_METRICS.activeSeats.used}
            </div>
            <div className="text-xs text-[#64748B] dark:text-slate-400 font-normal mt-0.5 leading-tight">
              Active Seats ({USAGE_METRICS.activeSeats.percentage}% of {USAGE_METRICS.activeSeats.total})
            </div>
          </div>
        </div>

        {/* Card 3: API Gateway */}
        <div className="bg-[#F0F9FF] dark:bg-[#0D152D] p-4 rounded-2xl border border-[#BAE6FD]/80 dark:border-[#1E2D54] shadow-xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-[#0284C7] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold text-[#172033] dark:text-white leading-tight">
              {USAGE_METRICS.apiRequests.used}M
            </div>
            <div className="text-xs text-[#64748B] dark:text-slate-400 font-normal mt-0.5 leading-tight">
              API Calls ({USAGE_METRICS.apiRequests.percentage}% of {USAGE_METRICS.apiRequests.total}M)
            </div>
          </div>
        </div>

        {/* Card 4: Email / SMS Relay */}
        <div className="bg-[#FFFDF5] dark:bg-[#0D152D] p-4 rounded-2xl border border-[#FEF3C7] dark:border-[#1E2D54] shadow-xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-[#D97706] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold text-[#172033] dark:text-white leading-tight">
              {USAGE_METRICS.emailCredits.used}k
            </div>
            <div className="text-xs text-[#64748B] dark:text-slate-400 font-normal mt-0.5 leading-tight">
              Email Relay ({USAGE_METRICS.emailCredits.percentage}% of {USAGE_METRICS.emailCredits.total}k)
            </div>
          </div>
        </div>
      </div>

      {/* Warning Callout for Limit Breach */}
      <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 flex-shrink-0">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div>
            <p className="font-bold text-amber-900">
              Vortex FinTech is approaching 85% of allocated Enterprise API quota
            </p>
            <p className="text-amber-700 text-[11px] mt-0.5">
              3.8M of 5M requests consumed in current billing cycle. Auto-throttle protection active.
            </p>
          </div>
        </div>
        <button
          onClick={() => handleUpgrade('Vortex FinTech')}
          className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl transition-colors whitespace-nowrap shadow-xs self-start sm:self-auto"
        >
          Increase Quota
        </button>
      </div>

      {/* Top Consuming Tenants Table */}
      <div className="bg-white rounded-2xl border border-[#E5EAF2] shadow-[0_1px_3px_rgba(0,0,0,0.04)] overflow-hidden">
        <div className="px-5 py-4 border-b border-[#E5EAF2]">
          <h3 className="text-base font-bold text-[#172033]">Top Resource Consuming Tenants</h3>
          <p className="text-xs text-[#8292AD]">Live bandwidth, file storage, and webhook execution metrics</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F7F9FC] border-b border-[#E5EAF2] text-[11px] font-bold text-[#8292AD] uppercase tracking-wider">
                <th className="py-3.5 px-3 lg:px-4">Company</th>
                <th className="py-3.5 px-3 lg:px-4">Plan Tier</th>
                <th className="py-3.5 px-3 lg:px-4">Cloud Storage</th>
                <th className="py-3.5 px-3 lg:px-4 hidden xl:table-cell">API Invocations</th>
                <th className="py-3.5 px-3 lg:px-4 hidden lg:table-cell">Seats Used</th>
                <th className="py-3.5 px-3 lg:px-4">Quota Health</th>
                <th className="py-3.5 px-3 lg:px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5EAF2] text-xs">
              {USAGE_METRICS.topCompaniesUsage.map((c, i) => (
                <tr key={i} className="hover:bg-[#F7F9FC]/80 transition-colors">
                  <td className="py-3.5 px-3 lg:px-4 font-bold text-[#172033] whitespace-nowrap">{c.name}</td>
                  <td className="py-3.5 px-3 lg:px-4 whitespace-nowrap">
                    <span className="font-semibold text-blue-600 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full text-[11px]">
                      {c.plan}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 lg:px-4 font-semibold text-[#172033] whitespace-nowrap">{c.storage}</td>
                  <td className="py-3.5 px-3 lg:px-4 text-[#8292AD] whitespace-nowrap hidden xl:table-cell">{c.apiCalls}</td>
                  <td className="py-3.5 px-3 lg:px-4 font-semibold text-[#172033] whitespace-nowrap hidden lg:table-cell">{c.users} active</td>
                  <td className="py-3.5 px-3 lg:px-4 whitespace-nowrap">
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                      c.status.includes('Warning')
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    }`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 lg:px-4 text-right whitespace-nowrap">
                    <button
                      onClick={() => handleUpgrade(c.name)}
                      className="text-xs font-bold text-blue-600 hover:text-blue-700 whitespace-nowrap"
                    >
                      Manage Limit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
