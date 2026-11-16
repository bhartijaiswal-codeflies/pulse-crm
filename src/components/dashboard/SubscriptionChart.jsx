import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { PieChart as PieIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const STATUS_DATA = [
  { name: 'Active', value: 225, percentage: '90.7%', color: '#10B981' },
  { name: 'Trial', value: 8, percentage: '3.2%', color: '#2563EB' },
  { name: 'Cancelled', value: 7, percentage: '2.8%', color: '#F59E0B' },
  { name: 'Expired', value: 8, percentage: '3.2%', color: '#94A3B8' }
];

export const SubscriptionChart = () => {
  const navigate = useNavigate();

  const handleSelectStatus = (statusName) => {
    navigate(`/subscriptions?status=${encodeURIComponent(statusName)}`);
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-[#E5EAF2] shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <PieIcon className="w-5 h-5 text-[#2563EB] fill-[#2563EB]" />
          <h3 className="text-base font-bold text-[#172033]">Subscription Status</h3>
        </div>
        <button
          onClick={() => navigate('/subscriptions')}
          className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline"
        >
          View All
        </button>
      </div>

      {/* Donut and Legend row */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 lg:gap-3 xl:gap-5 my-auto pt-2">
        {/* Donut Chart with Center Total */}
        <div className="relative w-36 h-36 sm:w-40 sm:h-40 xl:w-44 xl:h-44 flex-shrink-0 flex items-center justify-center cursor-pointer" onClick={() => navigate('/subscriptions')}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-white border border-[#E5EAF2] px-2.5 py-1.5 rounded-xl shadow-md text-xs">
                        <p className="font-semibold text-[#172033]">{data.name}</p>
                        <p className="text-[#64748B]">{data.value} ({data.percentage})</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Pie
                data={STATUS_DATA}
                cx="50%"
                cy="50%"
                innerRadius={46}
                outerRadius={64}
                paddingAngle={2}
                dataKey="value"
                startAngle={110}
                endAngle={-250}
                isAnimationActive={false}
              >
                {STATUS_DATA.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    stroke="none"
                    className="hover:opacity-80 transition-opacity cursor-pointer"
                    onClick={() => handleSelectStatus(entry.name)}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Center text: 248 Total */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-xl sm:text-2xl font-bold text-[#172033] leading-none">248</span>
            <span className="text-[10px] sm:text-xs text-[#8292AD] mt-1 font-medium">Total</span>
          </div>
        </div>

        {/* Legend Table on Right */}
        <div className="flex-1 w-full min-w-0 space-y-2 pl-0 sm:pl-2 xl:pl-3">
          {STATUS_DATA.map((item) => (
            <div
              key={item.name}
              onClick={() => handleSelectStatus(item.name)}
              className="flex items-center justify-between gap-2 text-xs font-medium p-1 sm:p-1.5 -mx-1 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group"
              title={`View ${item.name} subscriptions`}
            >
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-[#334155] group-hover:text-blue-600 transition-colors font-medium truncate">
                  {item.name}
                </span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 text-right flex-shrink-0">
                <span className="font-bold text-[#172033] min-w-[20px] text-right">{item.value}</span>
                <span className="text-[#64748B] min-w-[38px] text-right text-[11px] font-normal">{item.percentage}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
