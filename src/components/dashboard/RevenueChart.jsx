import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { TrendingUp, ArrowUpRight, BarChart2 } from 'lucide-react';
import { REVENUE_DATA } from '../../data/mockData';

export const RevenueChart = () => {
  const [timeframe, setTimeframe] = useState('monthly');

  const chartData = REVENUE_DATA[timeframe];

  // Current headline display based on timeframe
  const headline = {
    monthly: { amount: '₹17.6L', growth: '+14%', label: 'Current Month Run Rate' },
    weekly: { amount: '₹4.7L', growth: '+9.4%', label: 'Current Week Projected' },
    yearly: { amount: '₹184.2L', growth: '+28.5%', label: 'Year-to-Date Revenue' }
  }[timeframe];

  return (
    <div className="bg-white rounded-2xl p-5 border border-[#E5EAF2] shadow-[0_1px_3px_rgba(0,0,0,0.04)] flex flex-col justify-between">
      {/* Header with Title and Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E5EAF2]">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
            <BarChart2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#172033]">Revenue Overview</h3>
            <p className="text-xs text-[#8292AD]">Cash collection & recurring run-rate trend</p>
          </div>
        </div>

        {/* Timeframe selector buttons */}
        <div className="flex items-center bg-[#F7F9FC] border border-[#E5EAF2] rounded-xl p-1 self-start sm:self-auto">
          {['weekly', 'monthly', 'yearly'].map((period) => (
            <button
              key={period}
              onClick={() => setTimeframe(period)}
              className={`px-3 py-1 text-xs font-semibold rounded-lg capitalize transition-all ${
                timeframe === period
                  ? 'bg-white text-blue-600 shadow-xs'
                  : 'text-[#8292AD] hover:text-[#172033]'
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      {/* Metric highlights */}
      <div className="flex items-baseline gap-3 my-4">
        <span className="text-2xl font-black text-[#172033] tracking-tight">
          {headline.amount}
        </span>
        <span className="inline-flex items-center gap-0.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
          <ArrowUpRight className="w-3.5 h-3.5" />
          {headline.growth}
        </span>
        <span className="text-xs text-[#8292AD] font-medium hidden sm:inline">
          {headline.label}
        </span>
      </div>

      {/* Chart */}
      <div className="h-64 w-full min-h-[256px]">
        <ResponsiveContainer width="100%" height={256}>
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#8292AD', fontSize: 11 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#8292AD', fontSize: 11 }}
              tickFormatter={(v) => `₹${v}L`}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-white border border-[#E5EAF2] p-2.5 rounded-xl shadow-lg text-xs">
                      <p className="font-bold text-[#172033] mb-1">{label}</p>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                        <span className="text-[#8292AD]">Revenue:</span>
                        <span className="font-bold text-blue-600">₹{payload[0].value} Lakhs</span>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#3B82F6"
              strokeWidth={3}
              isAnimationActive={false}
              fillOpacity={1}
              fill="url(#revenueGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom Insights */}
      <div className="pt-3 border-t border-[#E5EAF2] flex items-center justify-between text-xs text-[#8292AD]">
        <div className="flex items-center gap-1.5 text-emerald-600 font-semibold">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Strongest expansion in Q4 (+18.4% YoY)</span>
        </div>
        <span className="text-[11px]">Next reconciliation: Nov 15</span>
      </div>
    </div>
  );
};

