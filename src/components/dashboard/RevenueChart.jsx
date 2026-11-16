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
import { BarChart2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const REVENUE_TIMEFRAME_DATA = {
  '30D': {
    value: '₹17.6L',
    growth: '↑ +15%',
    data: [
      { date: 'Oct 15', revenue: 6.8, showTick: true },
      { date: 'Oct 17', revenue: 6.8 },
      { date: 'Oct 19', revenue: 8.5 },
      { date: 'Oct 21', revenue: 7.2 },
      { date: 'Oct 22', revenue: 9.8, showTick: true },
      { date: 'Oct 24', revenue: 9.2 },
      { date: 'Oct 26', revenue: 11.4 },
      { date: 'Oct 28', revenue: 9.0 },
      { date: 'Oct 29', revenue: 10.8, showTick: true },
      { date: 'Oct 31', revenue: 11.8 },
      { date: 'Nov 01', revenue: 13.5 },
      { date: 'Nov 02', revenue: 15.2 },
      { date: 'Nov 03', revenue: 14.1 },
      { date: 'Nov 04', revenue: 12.0, showTick: true },
      { date: 'Nov 06', revenue: 14.0 },
      { date: 'Nov 07', revenue: 13.2 },
      { date: 'Nov 08', revenue: 15.6 },
      { date: 'Nov 09', revenue: 14.2 },
      { date: 'Nov 10', revenue: 16.0 },
      { date: 'Nov 11', revenue: 17.6, showTick: true }
    ]
  },
  '7D': {
    value: '₹4.8L',
    growth: '↑ +8.4%',
    data: [
      { date: 'Nov 05', revenue: 12.5, showTick: true },
      { date: 'Nov 06', revenue: 13.8 },
      { date: 'Nov 07', revenue: 13.2, showTick: true },
      { date: 'Nov 08', revenue: 15.6 },
      { date: 'Nov 09', revenue: 14.2, showTick: true },
      { date: 'Nov 10', revenue: 16.0 },
      { date: 'Nov 11', revenue: 17.6, showTick: true }
    ]
  },
  '90D': {
    value: '₹51.2L',
    growth: '↑ +22.1%',
    data: [
      { date: 'Aug 15', revenue: 9.4, showTick: true },
      { date: 'Sep 01', revenue: 11.2, showTick: true },
      { date: 'Sep 15', revenue: 12.5 },
      { date: 'Oct 01', revenue: 13.8, showTick: true },
      { date: 'Oct 15', revenue: 14.6 },
      { date: 'Nov 01', revenue: 16.2, showTick: true },
      { date: 'Nov 11', revenue: 17.6, showTick: true }
    ]
  },
  '1Y': {
    value: '₹1.82Cr',
    growth: '↑ +38.6%',
    data: [
      { date: 'Jan', revenue: 6.2, showTick: true },
      { date: 'Mar', revenue: 8.5, showTick: true },
      { date: 'May', revenue: 10.4, showTick: true },
      { date: 'Jul', revenue: 12.8, showTick: true },
      { date: 'Sep', revenue: 14.9, showTick: true },
      { date: 'Nov', revenue: 17.6, showTick: true }
    ]
  }
};

export const RevenueChart = ({ externalFilter, onFilterChange }) => {
  const { isDarkMode } = useApp();
  const [internalFilter, setInternalFilter] = useState('30D');
  const activeFilter = externalFilter || internalFilter;

  const currentConfig = REVENUE_TIMEFRAME_DATA[activeFilter] || REVENUE_TIMEFRAME_DATA['30D'];
  const chartData = currentConfig.data;
  const visibleTicks = chartData.filter(d => d.showTick).map(d => d.date);

  const handleSelect = (tab) => {
    if (onFilterChange) onFilterChange(tab);
    setInternalFilter(tab);
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-[#E5EAF2] shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col justify-between h-full">
      {/* Header: Title on Left, Filter pills on Right */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div className="flex items-center gap-2">
          <BarChart2 className="w-5 h-5 text-[#2563EB]" />
          <h3 className="text-base font-bold text-[#172033]">Revenue Overview</h3>
        </div>

        <div className="flex items-center gap-1 self-start sm:self-auto bg-white">
          {['7D', '30D', '90D', '1Y'].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => handleSelect(tab)}
              className={`px-2.5 sm:px-3 py-1 text-xs font-semibold rounded-full transition-colors cursor-pointer ${
                activeFilter === tab
                  ? 'bg-[#EBF3FF] text-[#2563EB]'
                  : 'text-[#8292AD] hover:text-[#172033] hover:bg-slate-50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Metric Display */}
      <div className="flex items-center gap-3 mt-3 mb-2">
        <span className="text-3xl font-extrabold text-[#172033] tracking-tight">
          {currentConfig.value}
        </span>
        <span className="inline-flex items-center text-xs font-semibold text-emerald-600 bg-[#ECFDF5] border border-[#A7F3D0]/60 px-2.5 py-0.5 rounded-full">
          {currentConfig.growth}
        </span>
      </div>

      {/* Area Chart */}
      <div className="w-full h-56 mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563EB" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#2563EB" stopOpacity={0.01} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="0"
              vertical={false}
              stroke={isDarkMode ? '#1E2D54' : '#F1F5F9'}
            />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              ticks={visibleTicks}
              tick={{ fill: isDarkMode ? '#94A3B8' : '#8292AD', fontSize: 11 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              domain={[0, 20]}
              ticks={[0, 5, 10, 15, 20]}
              tick={{ fill: isDarkMode ? '#94A3B8' : '#8292AD', fontSize: 11 }}
              tickFormatter={(v) => `${v}L`}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-white border border-[#E5EAF2] p-2.5 rounded-xl shadow-md text-xs">
                      <p className="font-semibold text-[#172033]">{label}</p>
                      <p className="text-[#2563EB] font-bold mt-0.5">₹{payload[0].value}L</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#2563EB"
              strokeWidth={2.5}
              isAnimationActive={false}
              fill="url(#blueGradient)"
              dot={{ r: 3.5, fill: '#FFFFFF', stroke: '#2563EB', strokeWidth: 2 }}
              activeDot={{ r: 5, fill: '#2563EB', stroke: '#FFFFFF', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
