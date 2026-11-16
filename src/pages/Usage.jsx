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
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#172033] tracking-tight">
            Usage & System Limits
          </h1>
          <p className="text-xs md:text-sm text-[#8292AD] mt-1 font-medium">
            Infrastructure capacity, storage allocations, API quotas, and limit governance
          </p>
        </div>

        <button
          onClick={() => showToast('Capacity audit refreshed', 'info')}
          className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-[#172033] bg-white border border-[#E5EAF2] hover:bg-slate-50 rounded-xl shadow-xs self-start sm:self-auto"
        >
          <Server className="w-4 h-4 text-[#8292AD]" />
          <span>Refresh Cluster Status</span>
        </button>
      </div>

      {/* Quota Progress Cards (4 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Storage */}
        <div className="bg-white p-5 rounded-2xl border border-[#E5EAF2] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#8292AD] uppercase">Storage Capacity</span>
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <HardDrive className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2 mt-3">
              <span className="text-2xl font-black text-[#172033]">
                {USAGE_METRICS.storage.used} {USAGE_METRICS.storage.unit}
              </span>
              <span className="text-xs text-[#8292AD]">of {USAGE_METRICS.storage.total} {USAGE_METRICS.storage.unit}</span>
            </div>
            <p className="text-[11px] text-[#8292AD] mt-1">{USAGE_METRICS.storage.trend}</p>
          </div>

          <div className="mt-4">
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-[#8292AD]">Utilization</span>
              <span className="text-blue-600">{USAGE_METRICS.storage.percentage}%</span>
            </div>
            <div className="w-full h-2 bg-[#F7F9FC] rounded-full overflow-hidden border border-[#E5EAF2]">
              <div
                className="h-full bg-blue-600 rounded-full transition-all"
                style={{ width: `${USAGE_METRICS.storage.percentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* API Requests */}
        <div className="bg-white p-5 rounded-2xl border border-[#E5EAF2] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#8292AD] uppercase">API Gateway Calls</span>
              <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                <Cpu className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2 mt-3">
              <span className="text-2xl font-black text-[#172033]">
                {USAGE_METRICS.apiRequests.used}M
              </span>
              <span className="text-xs text-[#8292AD]">of {USAGE_METRICS.apiRequests.total}M</span>
            </div>
            <p className="text-[11px] text-[#8292AD] mt-1">{USAGE_METRICS.apiRequests.trend}</p>
          </div>

          <div className="mt-4">
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-[#8292AD]">Monthly Burn</span>
              <span className="text-purple-600">{USAGE_METRICS.apiRequests.percentage}%</span>
            </div>
            <div className="w-full h-2 bg-[#F7F9FC] rounded-full overflow-hidden border border-[#E5EAF2]">
              <div
                className="h-full bg-purple-600 rounded-full transition-all"
                style={{ width: `${USAGE_METRICS.apiRequests.percentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Active User Seats */}
        <div className="bg-white p-5 rounded-2xl border border-[#E5EAF2] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#8292AD] uppercase">Provisioned Seats</span>
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2 mt-3">
              <span className="text-2xl font-black text-[#172033]">
                {USAGE_METRICS.activeSeats.used}
              </span>
              <span className="text-xs text-[#8292AD]">of {USAGE_METRICS.activeSeats.total}</span>
            </div>
            <p className="text-[11px] text-[#8292AD] mt-1">{USAGE_METRICS.activeSeats.trend}</p>
          </div>

          <div className="mt-4">
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-[#8292AD]">License Pool</span>
              <span className="text-emerald-600">{USAGE_METRICS.activeSeats.percentage}%</span>
            </div>
            <div className="w-full h-2 bg-[#F7F9FC] rounded-full overflow-hidden border border-[#E5EAF2]">
              <div
                className="h-full bg-emerald-600 rounded-full transition-all"
                style={{ width: `${USAGE_METRICS.activeSeats.percentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Email Credits */}
        <div className="bg-white p-5 rounded-2xl border border-[#E5EAF2] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#8292AD] uppercase">Email & SMS Relay</span>
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                <Mail className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2 mt-3">
              <span className="text-2xl font-black text-[#172033]">
                {USAGE_METRICS.emailCredits.used}k
              </span>
              <span className="text-xs text-[#8292AD]">of {USAGE_METRICS.emailCredits.total}k</span>
            </div>
            <p className="text-[11px] text-[#8292AD] mt-1">{USAGE_METRICS.emailCredits.trend}</p>
          </div>

          <div className="mt-4">
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-[#8292AD]">SendGrid Quota</span>
              <span className="text-amber-600">{USAGE_METRICS.emailCredits.percentage}%</span>
            </div>
            <div className="w-full h-2 bg-[#F7F9FC] rounded-full overflow-hidden border border-[#E5EAF2]">
              <div
                className="h-full bg-amber-500 rounded-full transition-all"
                style={{ width: `${USAGE_METRICS.emailCredits.percentage}%` }}
              />
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
