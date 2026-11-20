import React, { useState } from 'react';
import {
  TrendingUp,
  Download,
  Award,
  RotateCw
} from 'lucide-react';
import { useApp } from '../context/AppContext';

// 6 Months MRR Trajectory Data (matches design image)
const MRR_DATA_6M = [
  { month: 'Jun', value: '₹11.4L', percentage: 50 },
  { month: 'Jul', value: '₹12.6L', percentage: 58 },
  { month: 'Aug', value: '₹13.8L', percentage: 67 },
  { month: 'Sep', value: '₹14.9L', percentage: 76 },
  { month: 'Oct', value: '₹16.2L', percentage: 86 },
  { month: 'Nov', value: '₹17.6L', percentage: 95 }
];

// 1 Year MRR Trajectory Data (for 1Y toggle)
const MRR_DATA_1Y = [
  { month: 'Dec', value: '₹7.8L', percentage: 35 },
  { month: 'Jan', value: '₹8.6L', percentage: 38 },
  { month: 'Feb', value: '₹9.4L', percentage: 42 },
  { month: 'Mar', value: '₹10.1L', percentage: 46 },
  { month: 'Apr', value: '₹10.8L', percentage: 48 },
  { month: 'May', value: '₹11.0L', percentage: 49 },
  { month: 'Jun', value: '₹11.4L', percentage: 50 },
  { month: 'Jul', value: '₹12.6L', percentage: 58 },
  { month: 'Aug', value: '₹13.8L', percentage: 67 },
  { month: 'Sep', value: '₹14.9L', percentage: 76 },
  { month: 'Oct', value: '₹16.2L', percentage: 86 },
  { month: 'Nov', value: '₹17.6L', percentage: 95 }
];

// Revenue Contribution by Plan Data (matches design image)
const PLAN_CONTRIBUTIONS = [
  {
    name: 'Pro Plan',
    companies: 102,
    revenue: '₹6.34L',
    percentage: 36,
    barWidth: '85%'
  },
  {
    name: 'Business Plan',
    companies: 51,
    revenue: '₹5.98L',
    percentage: 34,
    barWidth: '80%'
  },
  {
    name: 'Enterprise Plan',
    companies: 18,
    revenue: '₹3.34L',
    percentage: 19,
    barWidth: '44%'
  },
  {
    name: 'Starter Plan',
    companies: 54,
    revenue: '₹1.94L',
    percentage: 11,
    barWidth: '26%'
  }
];

// Monthly Customer Retention Cohorts Data (matches design image)
const COHORT_ROWS = [
  { cohort: 'Jun 2026', newCos: 38, m1: '100%', m2: '94%', m3: '92%', m4: '89%', m5: '89%' },
  { cohort: 'Jul 2026', newCos: 41, m1: '100%', m2: '95%', m3: '93%', m4: '90%', m5: null },
  { cohort: 'Aug 2026', newCos: 46, m1: '100%', m2: '96%', m3: '93%', m4: null, m5: null },
  { cohort: 'Sep 2026', newCos: 52, m1: '100%', m2: '96%', m3: null, m4: null, m5: null },
  { cohort: 'Oct 2026', newCos: 49, m1: '100%', m2: null, m3: null, m4: null, m5: null }
];

export const Analytics = () => {
  const { showToast } = useApp();
  const [range, setRange] = useState('6M');

  const activeMrrData = range === '6M' ? MRR_DATA_6M : MRR_DATA_1Y;

  const handleExport = () => {
    const csvContent =
      'Cohort,New Companies,Month 1,Month 2,Month 3,Month 4,Month 5\n' +
      COHORT_ROWS.map(
        (r) =>
          `"${r.cohort}",${r.newCos},${r.m1},${r.m2 || '—'},${r.m3 || '—'},${r.m4 || '—'},${r.m5 || '—'}`
      ).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Pulse_Analytics_BI.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Analytics BI report exported to CSV successfully!', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <h1 className="text-2xl font-bold text-[#172033] dark:text-white tracking-tight">
              Analytics
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#EFF6FF] text-[#2563EB] dark:bg-blue-950/60 dark:text-blue-400 border border-blue-100 dark:border-blue-900/40">
              NRR 108.4%
            </span>
          </div>
          <p className="text-xs text-[#8292AD] dark:text-slate-400 mt-1 font-normal">
            Deep SaaS revenue intelligence, net retention cohorts, ARPU, and churn trends.
          </p>
        </div>

        {/* Right Controls: Range Toggle + Export BI */}
        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <div className="flex items-center bg-[#F1F5F9] dark:bg-[#121D3D] p-1 rounded-xl border border-[#E5EAF2] dark:border-[#1E2D54]">
            <button
              type="button"
              onClick={() => {
                setRange('6M');
                showToast('Displaying 6-Month MRR trajectory', 'info');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                range === '6M'
                  ? 'bg-[#2563EB] text-white shadow-xs'
                  : 'text-[#64748B] dark:text-slate-400 hover:text-[#172033] dark:hover:text-white'
              }`}
            >
              6M
            </button>
            <button
              type="button"
              onClick={() => {
                setRange('1Y');
                showToast('Displaying 1-Year MRR trajectory', 'info');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                range === '1Y'
                  ? 'bg-[#2563EB] text-white shadow-xs'
                  : 'text-[#64748B] dark:text-slate-400 hover:text-[#172033] dark:hover:text-white'
              }`}
            >
              1Y
            </button>
          </div>

          <button
            type="button"
            onClick={handleExport}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[#2563EB] hover:bg-blue-700 rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export BI</span>
          </button>
        </div>
      </div>

      {/* Top 4 KPI Stat Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        {/* Card 1: Annual Run Rate (ARR) */}
        <div className="bg-[#FAF7FF] dark:bg-[#0D152D] p-4 rounded-2xl border border-[#F3E8FF] dark:border-[#1E2D54] shadow-xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-[#7C3AED] text-white flex items-center justify-center flex-shrink-0 font-bold text-lg shadow-xs">
            <span>₹</span>
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#172033] dark:text-white leading-tight">
              ₹2.11Cr
            </h3>
            <p className="text-xs text-[#64748B] dark:text-slate-400 font-normal mt-0.5 leading-tight">
              Annual Run Rate (ARR)
            </p>
          </div>
        </div>

        {/* Card 2: Net Revenue Retention */}
        <div className="bg-[#F6FDF9] dark:bg-[#0D152D] p-4 rounded-2xl border border-[#DCFCE7] dark:border-[#1E2D54] shadow-xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-[#10B981] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#172033] dark:text-white leading-tight">
              108.4%
            </h3>
            <p className="text-xs text-[#64748B] dark:text-slate-400 font-normal mt-0.5 leading-tight">
              Net Revenue Retention
            </p>
          </div>
        </div>

        {/* Card 3: Avg Revenue Per Account */}
        <div className="bg-[#F0F9FF] dark:bg-[#0D152D] p-4 rounded-2xl border border-[#BAE6FD]/80 dark:border-[#1E2D54] shadow-xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-[#0284C7] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#172033] dark:text-white leading-tight">
              ₹7,822
            </h3>
            <p className="text-xs text-[#64748B] dark:text-slate-400 font-normal mt-0.5 leading-tight">
              Avg Revenue Per Account
            </p>
          </div>
        </div>

        {/* Card 4: Monthly Logo Churn */}
        <div className="bg-[#FFFDF5] dark:bg-[#0D152D] p-4 rounded-2xl border border-[#FEF3C7] dark:border-[#1E2D54] shadow-xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-[#D97706] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
            <RotateCw className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#172033] dark:text-white leading-tight">
              2.8%
            </h3>
            <p className="text-xs text-[#64748B] dark:text-slate-400 font-normal mt-0.5 leading-tight">
              Monthly Logo Churn
            </p>
          </div>
        </div>
      </div>

      {/* Middle Section: MRR Growth Trajectory & Revenue Contribution by Plan */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        {/* Left: MRR Growth Trajectory */}
        <div className="bg-white dark:bg-[#0D152D] rounded-2xl border border-[#E5EAF2] dark:border-[#1E2D54] p-6 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between pb-4 border-b border-[#E5EAF2] dark:border-[#1E2D54]">
            <h3 className="text-sm font-bold text-[#172033] dark:text-white">
              MRR Growth Trajectory (₹ Lakhs)
            </h3>
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              +54.3% vs period start
            </span>
          </div>

          {/* Capsule Chart Columns */}
          <div className="flex items-end justify-between px-2 sm:px-6 pt-6 pb-2 min-h-[260px] overflow-x-auto gap-3">
            {activeMrrData.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center flex-1 min-w-[44px]">
                {/* Value on Top */}
                <span className="text-xs font-bold text-[#172033] dark:text-white mb-3 whitespace-nowrap">
                  {item.value}
                </span>

                {/* Capsule Column Track */}
                <div className="w-11 sm:w-13 h-48 bg-[#EEF4FF] dark:bg-[#121D3D] rounded-2xl relative flex flex-col justify-end p-0 overflow-hidden shadow-2xs">
                  {/* Filled Portion */}
                  <div
                    className="w-full rounded-2xl bg-gradient-to-t from-[#2563EB] to-[#3B82F6] transition-all duration-500 shadow-sm"
                    style={{ height: `${item.percentage}%` }}
                  />
                </div>

                {/* Month Label */}
                <span className="text-xs font-medium text-[#8292AD] dark:text-slate-400 mt-3 whitespace-nowrap">
                  {item.month}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Revenue Contribution by Plan */}
        <div className="bg-white dark:bg-[#0D152D] rounded-2xl border border-[#E5EAF2] dark:border-[#1E2D54] p-6 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between pb-4 border-b border-[#E5EAF2] dark:border-[#1E2D54]">
            <h3 className="text-sm font-bold text-[#172033] dark:text-white">
              Revenue Contribution by Plan
            </h3>
            <span className="text-xs text-[#8292AD] dark:text-slate-400 font-medium">
              ₹17.6L Total MRR
            </span>
          </div>

          <div className="space-y-6 my-auto py-4">
            {PLAN_CONTRIBUTIONS.map((plan, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-[#172033] dark:text-white">
                    {plan.name} ({plan.companies} cos)
                  </span>
                  <div>
                    <span className="font-bold text-[#172033] dark:text-white">
                      {plan.revenue}
                    </span>
                    <span className="text-[#8292AD] dark:text-slate-400 ml-1 font-normal">
                      ({plan.percentage}%)
                    </span>
                  </div>
                </div>

                {/* Horizontal Gradient Pill Bar */}
                <div className="w-full h-3 bg-transparent rounded-full flex items-center">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#2563EB] via-[#4338CA] to-[#6366F1] shadow-2xs transition-all duration-500"
                    style={{ width: plan.barWidth }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section: Monthly Customer Retention Cohorts */}
      <div className="bg-white dark:bg-[#0D152D] rounded-2xl border border-[#E5EAF2] dark:border-[#1E2D54] p-6 shadow-xs overflow-hidden">
        <div className="flex items-center justify-between pb-4 border-b border-[#E5EAF2] dark:border-[#1E2D54]">
          <h3 className="text-sm font-bold text-[#172033] dark:text-white">
            Monthly Customer Retention Cohorts
          </h3>
          <span className="text-xs text-[#8292AD] dark:text-slate-400 font-medium">
            Logo retention % over 5 months
          </span>
        </div>

        <div className="overflow-x-auto mt-2">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="text-[11px] font-bold text-[#8292AD] dark:text-slate-400 uppercase tracking-wider border-b border-[#E5EAF2] dark:border-[#1E2D54]">
                <th className="py-3 px-3">COHORT</th>
                <th className="py-3 px-3">NEW COS</th>
                <th className="py-3 px-3 text-center">MONTH 1</th>
                <th className="py-3 px-3 text-center">MONTH 2</th>
                <th className="py-3 px-3 text-center">MONTH 3</th>
                <th className="py-3 px-3 text-center">MONTH 4</th>
                <th className="py-3 px-3 text-center">MONTH 5</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5EAF2] dark:divide-[#1E2D54]">
              {COHORT_ROWS.map((row, idx) => (
                <tr key={idx} className="hover:bg-[#F8FAFF] dark:hover:bg-[#121D3D] transition-colors">
                  <td className="py-3.5 px-3 font-bold text-[#172033] dark:text-white">
                    {row.cohort}
                  </td>
                  <td className="py-3.5 px-3 font-semibold text-[#172033] dark:text-white">
                    {row.newCos}
                  </td>
                  <td className="py-3.5 px-3 text-center">
                    <span className="inline-block px-3 py-1 rounded-md text-xs font-bold bg-[#EFF6FF] text-[#2563EB] dark:bg-blue-950/60 dark:text-blue-400">
                      {row.m1}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-center">
                    {row.m2 ? (
                      <span className="inline-block px-3 py-1 rounded-md text-xs font-semibold bg-[#F0FDF4] text-[#16A34A] dark:bg-emerald-950/60 dark:text-emerald-400">
                        {row.m2}
                      </span>
                    ) : (
                      <span className="text-slate-400 dark:text-slate-600 font-bold">—</span>
                    )}
                  </td>
                  <td className="py-3.5 px-3 text-center">
                    {row.m3 ? (
                      <span className="inline-block px-3 py-1 rounded-md text-xs font-semibold bg-[#F0FDF4] text-[#16A34A] dark:bg-emerald-950/60 dark:text-emerald-400">
                        {row.m3}
                      </span>
                    ) : (
                      <span className="text-slate-400 dark:text-slate-600 font-bold">—</span>
                    )}
                  </td>
                  <td className="py-3.5 px-3 text-center">
                    {row.m4 ? (
                      <span className="inline-block px-3 py-1 rounded-md text-xs font-semibold bg-[#F0FDF4] text-[#16A34A] dark:bg-emerald-950/60 dark:text-emerald-400">
                        {row.m4}
                      </span>
                    ) : (
                      <span className="text-slate-400 dark:text-slate-600 font-bold">—</span>
                    )}
                  </td>
                  <td className="py-3.5 px-3 text-center">
                    {row.m5 ? (
                      <span className="inline-block px-3 py-1 rounded-md text-xs font-semibold bg-[#F0FDF4] text-[#16A34A] dark:bg-emerald-950/60 dark:text-emerald-400">
                        {row.m5}
                      </span>
                    ) : (
                      <span className="text-slate-400 dark:text-slate-600 font-bold">—</span>
                    )}
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

export default Analytics;
