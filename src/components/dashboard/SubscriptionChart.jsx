import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Repeat, ShieldCheck } from 'lucide-react';
import { SUBSCRIPTION_STATUS_DATA } from '../../data/mockData';

export const SubscriptionChart = () => {
  const total = SUBSCRIPTION_STATUS_DATA.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className="bg-white rounded-2xl p-5 border border-[#E5EAF2] shadow-[0_1px_3px_rgba(0,0,0,0.04)] flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#E5EAF2]">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
            <Repeat className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#172033]">Subscription Status</h3>
            <p className="text-xs text-[#8292AD]">Active licenses & lifecycle churn</p>
          </div>
        </div>

        <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
          90.7% Retention
        </span>
      </div>

      {/* Donut chart with total in center */}
      <div className="relative h-56 min-h-[224px] my-2 flex items-center justify-center">
        <ResponsiveContainer width="100%" height={224}>
          <PieChart>
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-white border border-[#E5EAF2] p-2.5 rounded-xl shadow-lg text-xs">
                      <p className="font-bold text-[#172033]">{data.name} Subscriptions</p>
                      <p className="text-[#8292AD]">
                        Count: <span className="font-semibold text-[#172033]">{data.value}</span> ({data.percentage})
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Pie
              data={SUBSCRIPTION_STATUS_DATA}
              cx="50%"
              cy="50%"
              innerRadius={68}
              outerRadius={88}
              paddingAngle={3}
              dataKey="value"
              isAnimationActive={false}
            >
              {SUBSCRIPTION_STATUS_DATA.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Center overlay text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-2xl font-black text-[#172033] leading-none">{total}</span>
          <span className="text-[11px] font-semibold text-[#8292AD] mt-1">Total Subs</span>
        </div>
      </div>

      {/* Breakdown Legend items */}
      <div className="grid grid-cols-2 gap-2 pt-3 border-t border-[#E5EAF2]">
        {SUBSCRIPTION_STATUS_DATA.map((item) => (
          <div
            key={item.name}
            className="flex items-center justify-between p-2 rounded-xl bg-[#F7F9FC] border border-[#E5EAF2]"
          >
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-xs font-medium text-[#172033]">{item.name}</span>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-[#172033]">{item.value}</span>
              <span className="text-[10px] text-[#8292AD] ml-1">({item.percentage})</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

