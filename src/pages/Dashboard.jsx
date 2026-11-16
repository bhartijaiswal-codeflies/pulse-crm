import React, { useState, useRef, useEffect } from 'react';
import { StatCards } from '../components/dashboard/StatCards';
import { RevenueChart } from '../components/dashboard/RevenueChart';
import { SubscriptionChart } from '../components/dashboard/SubscriptionChart';
import { RecentCompanies } from '../components/dashboard/RecentCompanies';
import { RecentActivity } from '../components/dashboard/RecentActivity';
import { Calendar, ChevronDown, Check } from 'lucide-react';

const DATE_OPTIONS = [
  'Today',
  'Last 7 Days',
  'Last 30 Days',
  'Last 90 Days',
  'This Year (2026)'
];

const rangeToTabMap = {
  'Today': '7D',
  'Last 7 Days': '7D',
  'Last 30 Days': '30D',
  'Last 90 Days': '90D',
  'This Year (2026)': '1Y'
};

const tabToRangeMap = {
  '7D': 'Last 7 Days',
  '30D': 'Last 30 Days',
  '90D': 'Last 90 Days',
  '1Y': 'This Year (2026)'
};

export const Dashboard = () => {
  const [selectedRange, setSelectedRange] = useState('Last 30 Days');
  const [isDateOpen, setIsDateOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDateOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="space-y-5 animate-in fade-in duration-150">
      {/* Top Header: Title + Subtitle on Left, Date Filter on Right */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#172033] tracking-tight">
            Dashboard
          </h1>
          <p className="text-xs text-[#8292AD] mt-1 font-normal">
            Overview of your SaaS business
          </p>
        </div>

        {/* Date Dropdown button matching screenshot */}
        <div className="relative self-start sm:self-auto" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsDateOpen(!isDateOpen)}
            className="flex items-center gap-2 bg-white border border-[#E5EAF2] hover:bg-slate-50 text-xs font-medium text-[#172033] px-3.5 py-2 rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-[#64748B]" />
            <span>{selectedRange}</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#64748B] ml-0.5" />
          </button>

          {isDateOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-[#E5EAF2] rounded-xl shadow-xl py-1.5 z-30 animate-in fade-in duration-100">
              {DATE_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => {
                    setSelectedRange(opt);
                    setIsDateOpen(false);
                  }}
                  className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-[#F8FAFC] transition-colors cursor-pointer ${
                    selectedRange === opt ? 'text-[#2563EB] font-bold bg-blue-50/50' : 'text-[#334155]'
                  }`}
                >
                  <span>{opt}</span>
                  {selectedRange === opt && <Check className="w-3.5 h-3.5" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 1. 4 KPI Summary Cards */}
      <StatCards />

      {/* 2. Middle Row: Revenue Overview & Subscription Status */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        <div className="lg:col-span-7">
          <RevenueChart
            externalFilter={rangeToTabMap[selectedRange] || '30D'}
            onFilterChange={(tab) => {
              if (tabToRangeMap[tab]) {
                setSelectedRange(tabToRangeMap[tab]);
              }
            }}
          />
        </div>
        <div className="lg:col-span-5">
          <SubscriptionChart />
        </div>
      </div>

      {/* 3. Bottom Row: Recent Companies & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        <div className="lg:col-span-7">
          <RecentCompanies />
        </div>
        <div className="lg:col-span-5">
          <RecentActivity />
        </div>
      </div>
    </div>
  );
};
