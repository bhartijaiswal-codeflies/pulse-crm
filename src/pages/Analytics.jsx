import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Download,
  Calendar,
  Filter,
  DollarSign,
  Users,
  Repeat,
  ArrowUpRight,
  CheckCircle
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { REVENUE_DATA } from '../data/mockData';
import { useApp } from '../context/AppContext';

const COHORT_DATA = [
  { cohort: 'Jan', m1: 100, m2: 96, m3: 94, m4: 92, m5: 91, m6: 90 },
  { cohort: 'Feb', m1: 100, m2: 97, m3: 95, m4: 93, m5: 92, m6: null },
  { cohort: 'Mar', m1: 100, m2: 98, m3: 96, m4: 94, m5: null, m6: null },
  { cohort: 'Apr', m1: 100, m2: 97, m3: 95, m4: null, m5: null, m6: null },
  { cohort: 'May', m1: 100, m2: 98, m3: null, m4: null, m5: null, m6: null },
  { cohort: 'Jun', m1: 100, m2: null, m3: null, m4: null, m5: null, m6: null },
];

const PLAN_DISTRIBUTION_DATA = [
  { name: 'Starter', companies: 42, mrr: 3.35, color: '#10B981' },
  { name: 'Growth', companies: 128, mrr: 25.59, color: '#3B82F6' },
  { name: 'Enterprise', companies: 68, mrr: 33.99, color: '#8B5CF6' },
  { name: 'Custom Scale', companies: 10, mrr: 8.99, color: '#F59E0B' },
];

export const Analytics = () => {
  const { showToast } = useApp();
  const [timeframe, setTimeframe] = useState('monthly');

  const handleExport = () => {
    const headers = 'Month,Revenue (Lakhs),Subscriptions,Expenses (Lakhs)\n';
    const rows = REVENUE_DATA.monthly.map(m =>
      `"${m.name}",${m.revenue},${m.subscriptions},${m.expenses}`
    ).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Pulse_Revenue_Analytics.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Analytics dataset exported to CSV successfully!', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <h1 className="text-2xl font-bold text-[#172033] dark:text-white tracking-tight">
              Advanced Analytics
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#EFF6FF] text-[#2563EB] dark:bg-blue-950/60 dark:text-blue-400 border border-blue-100 dark:border-blue-900/40">
              FY 2026 Live
            </span>
          </div>
          <p className="text-xs text-[#8292AD] dark:text-slate-400 mt-1 font-normal">
            Deep financial forecasting, net revenue retention, cohort churn, and ARR run-rates.
          </p>
        </div>

        <button
          type="button"
          onClick={handleExport}
          className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#172033] dark:text-white bg-white dark:bg-[#0D152D] hover:bg-slate-50 dark:hover:bg-[#121D3D] border border-[#E5EAF2] dark:border-[#1E2D54] rounded-xl shadow-2xs transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Download className="w-3.5 h-3.5 text-[#64748B] dark:text-slate-400" />
          <span>Export CSV</span>
        </button>
      </div>

      {/* KPI Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        {/* Card 1: Annual Run Rate */}
        <div className="bg-[#F8FAFF] dark:bg-[#0D152D] p-4 rounded-2xl border border-[#E2EDFF] dark:border-[#1E2D54] shadow-xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-[#2563EB] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#172033] dark:text-white leading-tight">
              ₹2.11 Cr
            </h3>
            <p className="text-xs text-[#64748B] dark:text-slate-400 font-normal mt-0.5 leading-tight">
              Annual Run Rate (ARR)
            </p>
          </div>
        </div>

        {/* Card 2: Net Revenue Retention */}
        <div className="bg-[#F6FDF9] dark:bg-[#0D152D] p-4 rounded-2xl border border-[#DCFCE7] dark:border-[#1E2D54] shadow-xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-[#10B981] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
            <CheckCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#172033] dark:text-white leading-tight">
              118%
            </h3>
            <p className="text-xs text-[#64748B] dark:text-slate-400 font-normal mt-0.5 leading-tight">
              Net Revenue Retention
            </p>
          </div>
        </div>

        {/* Card 3: Gross Logo Churn */}
        <div className="bg-[#F0F9FF] dark:bg-[#0D152D] p-4 rounded-2xl border border-[#BAE6FD]/80 dark:border-[#1E2D54] shadow-xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-[#0284C7] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#172033] dark:text-white leading-tight">
              1.8%
            </h3>
            <p className="text-xs text-[#64748B] dark:text-slate-400 font-normal mt-0.5 leading-tight">
              Gross Logo Churn
            </p>
          </div>
        </div>

        {/* Card 4: Customer Acquisition Cost */}
        <div className="bg-[#FAF7FF] dark:bg-[#0D152D] p-4 rounded-2xl border border-[#F3E8FF] dark:border-[#1E2D54] shadow-xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-[#7C3AED] text-white flex items-center justify-center flex-shrink-0 font-bold shadow-xs">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#172033] dark:text-white leading-tight">
              ₹6,400
            </h3>
            <p className="text-xs text-[#64748B] dark:text-slate-400 font-normal mt-0.5 leading-tight">
              Customer Acquisition Cost
            </p>
          </div>
        </div>
      </div>

      {/* Primary Chart: Monthly Revenue vs Operating Costs */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 border border-[#E5EAF2] shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E5EAF2]">
          <div>
            <h3 className="text-base font-bold text-[#172033]">
              Revenue Growth & Operating Margin
            </h3>
            <p className="text-xs text-[#8292AD]">Cash inflow vs cloud infrastructure & support costs</p>
          </div>

          <div className="flex items-center bg-[#F7F9FC] border border-[#E5EAF2] rounded-xl p-1">
            {['monthly', 'weekly', 'yearly'].map((period) => (
              <button
                key={period}
                onClick={() => setTimeframe(period)}
                className={`px-3 py-1 text-xs font-semibold rounded-lg capitalize transition-all ${
                  timeframe === period ? 'bg-white text-blue-600 shadow-xs' : 'text-[#8292AD]'
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>

        <div className="h-72 w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={REVENUE_DATA[timeframe]} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#8292AD', fontSize: 11 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#8292AD', fontSize: 11 }} tickFormatter={(v) => `₹${v}L`} />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white border border-[#E5EAF2] p-3 rounded-xl shadow-lg text-xs">
                        <p className="font-bold text-[#172033] mb-1.5">{label}</p>
                        <p className="text-blue-600 font-semibold">Revenue: ₹{payload[0].value}L</p>
                        {payload[1] && (
                          <p className="text-slate-500 font-medium">Expenses: ₹{payload[1].value}L</p>
                        )}
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              <Bar dataKey="revenue" name="Total Revenue (₹L)" fill="#3B82F6" radius={[6, 6, 0, 0]} isAnimationActive={false} />
              <Bar dataKey="expenses" name="Infrastructure OpEx (₹L)" fill="#94A3B8" radius={[6, 6, 0, 0]} isAnimationActive={false} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Secondary Row: Plan Distribution & Cohort Retention */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Plan Revenue Distribution */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-[#E5EAF2] shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-[#172033]">Revenue Contribution by Plan Tier</h3>
            <p className="text-xs text-[#8292AD] mb-4">Enterprise tier contributes 47% of recurring ARR</p>

            <div className="space-y-3.5">
              {PLAN_DISTRIBUTION_DATA.map((plan) => (
                <div key={plan.name} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#172033]">{plan.name} ({plan.companies} accounts)</span>
                    <span className="font-bold text-[#172033]">₹{plan.mrr} Lakhs/mo</span>
                  </div>
                  <div className="w-full h-2 bg-[#F7F9FC] rounded-full overflow-hidden border border-[#E5EAF2]">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${(plan.mrr / 71.92) * 100}%`,
                        backgroundColor: plan.color
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-[#E5EAF2] text-xs text-[#8292AD] flex flex-col sm:flex-row justify-between gap-1">
            <span>Total Tracked Plans: 4</span>
            <span className="font-bold text-blue-600">Enterprise Upsell Pipeline: 14</span>
          </div>
        </div>

        {/* Cohort Retention Heatmap */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-[#E5EAF2] shadow-xs">
          <h3 className="text-base font-bold text-[#172033]">Customer Retention Cohort (%)</h3>
          <p className="text-xs text-[#8292AD] mb-4">Monthly subscription retention curve</p>

          <div className="overflow-x-auto">
            <table className="w-full text-center border-collapse text-xs">
              <thead>
                <tr className="text-[11px] font-bold text-[#8292AD] uppercase border-b border-[#E5EAF2]">
                  <th className="py-2 text-left">Cohort</th>
                  <th className="py-2">M1</th>
                  <th className="py-2">M2</th>
                  <th className="py-2">M3</th>
                  <th className="py-2">M4</th>
                  <th className="py-2">M5</th>
                  <th className="py-2">M6</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5EAF2]">
                {COHORT_DATA.map((row) => (
                  <tr key={row.cohort} className="hover:bg-slate-50 transition-colors">
                    <td className="py-2.5 font-bold text-left text-[#172033]">{row.cohort} 2026</td>
                    <td className="py-2.5"><span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold">{row.m1}%</span></td>
                    <td className="py-2.5">{row.m2 ? <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-medium">{row.m2}%</span> : '-'}</td>
                    <td className="py-2.5">{row.m3 ? <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-medium">{row.m3}%</span> : '-'}</td>
                    <td className="py-2.5">{row.m4 ? <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-medium">{row.m4}%</span> : '-'}</td>
                    <td className="py-2.5">{row.m5 ? <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-medium">{row.m5}%</span> : '-'}</td>
                    <td className="py-2.5">{row.m6 ? <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-medium">{row.m6}%</span> : '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
