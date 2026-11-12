import React from 'react';
import { StatCards } from '../components/dashboard/StatCards';
import { RevenueChart } from '../components/dashboard/RevenueChart';
import { SubscriptionChart } from '../components/dashboard/SubscriptionChart';
import { RecentCompanies } from '../components/dashboard/RecentCompanies';
import { RecentActivity } from '../components/dashboard/RecentActivity';
import { Plus, Download, Sparkles, AlertTriangle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

export const Dashboard = () => {
  const { setIsAddCompanyOpen, showToast, invoices } = useApp();
  const navigate = useNavigate();

  const handleExport = () => {
    showToast('Exporting executive dashboard summary report (CSV)...', 'info');
  };

  const pendingCount = invoices.filter(i => i.status === 'Pending' || i.status === 'Overdue').length;

  return (
    <div className="space-y-6">
      {/* Page Title & Actions Header (Matches Screenshot Typography) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#172033] tracking-tight">
            Dashboard
          </h1>
          <p className="text-xs md:text-sm text-[#8292AD] mt-1 font-medium">
            Admin Overview & SaaS Operations
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-[#172033] bg-white border border-[#E5EAF2] hover:bg-slate-50 rounded-xl transition-colors shadow-xs"
          >
            <Download className="w-3.5 h-3.5 text-[#8292AD]" />
            <span>Export Report</span>
          </button>

          <button
            onClick={() => setIsAddCompanyOpen(true)}
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-[#2563EB] hover:bg-blue-700 rounded-xl shadow-md shadow-blue-500/20 transition-all hover:scale-[1.02]"
          >
            <Plus className="w-4 h-4" />
            <span>Add Company</span>
          </button>
        </div>
      </div>

      {/* Pending Payments Alert Callout if any */}
      {pendingCount > 0 && (
        <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 flex-shrink-0">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-amber-900">
                {pendingCount} Pending & Overdue Invoices
              </span>
              <p className="text-amber-700 text-[11px] mt-0.5">
                ₹2.4L outstanding across tenant accounts. Automated retry scheduled.
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate('/billing')}
            className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl self-start sm:self-auto transition-colors whitespace-nowrap shadow-xs"
          >
            Review Invoices →
          </button>
        </div>
      )}

      {/* 1. KPI Summary Cards (4 Cards) */}
      <StatCards />

      {/* 2. Analytics Row: Revenue Overview & Subscription Donut Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        <div>
          <SubscriptionChart />
        </div>
      </div>

      {/* 3. Bottom Row: Recent Companies Table & Recent Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <RecentCompanies />
        </div>
        <div>
          <RecentActivity />
        </div>
      </div>
    </div>
  );
};

