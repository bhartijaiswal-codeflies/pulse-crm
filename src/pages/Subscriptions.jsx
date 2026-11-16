import React, { useState } from 'react';
import {
  Repeat,
  CheckCircle,
  Clock,
  AlertTriangle,
  XCircle,
  Search,
  ArrowUpRight,
  Shield,
  Zap,
  Calendar,
  X,
  CreditCard,
  Building2,
  Edit2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ImageUploadOption } from '../components/common/ImageUploadOption';

export const Subscriptions = () => {
  const { companies, updateCompany, showToast } = useApp();
  const [activeTab, setActiveTab] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSub, setSelectedSub] = useState(null);
  const [editingSub, setEditingSub] = useState(null);

  const tabs = [
    { name: 'All', count: companies.length },
    { name: 'Active', count: companies.filter(c => c.status === 'Active').length },
    { name: 'Trial', count: companies.filter(c => c.status === 'Trial').length },
    { name: 'Pending Payment', count: companies.filter(c => c.status === 'Pending Payment').length },
    { name: 'Cancelled', count: companies.filter(c => c.status === 'Cancelled').length },
  ];

  const filtered = companies.filter(c => {
    const matchesTab = activeTab === 'All' || c.status === activeTab;
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.plan.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const toggleAutoRenew = (company) => {
    showToast(`Auto-renew updated for ${company.name}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#172033] tracking-tight">
            Subscriptions
          </h1>
          <p className="text-xs md:text-sm text-[#8292AD] mt-1 font-medium">
            Monitor client billing cycles, renewals, churn rates, and tier upgrades
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200">
            92.4% Net Revenue Retention
          </span>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#E5EAF2] shadow-xs">
          <p className="text-xs font-bold text-[#8292AD] uppercase">Active Subscriptions</p>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-2xl font-black text-[#172033]">225</span>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">+8% MoM</span>
          </div>
          <p className="text-[11px] text-[#8292AD] mt-1">90.7% of total tenant portfolio</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E5EAF2] shadow-xs">
          <p className="text-xs font-bold text-[#8292AD] uppercase">Trial Subscriptions</p>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-2xl font-black text-blue-600">8</span>
            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">62% Conversion</span>
          </div>
          <p className="text-[11px] text-[#8292AD] mt-1">Avg 5 days remaining</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E5EAF2] shadow-xs">
          <p className="text-xs font-bold text-[#8292AD] uppercase">Cancelled / At Risk</p>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-2xl font-black text-red-500">7</span>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">-1.2% Churn</span>
          </div>
          <p className="text-[11px] text-[#8292AD] mt-1">Industry low churn benchmark</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E5EAF2] shadow-xs">
          <p className="text-xs font-bold text-[#8292AD] uppercase">Avg Revenue / Account (ARPU)</p>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-2xl font-black text-[#172033]">₹7,820</span>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">+14% Growth</span>
          </div>
          <p className="text-[11px] text-[#8292AD] mt-1">Boosted by Enterprise tier</p>
        </div>
      </div>

      {/* Tabs and Search */}
      <div className="bg-white p-4 rounded-2xl border border-[#E5EAF2] shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 bg-[#F7F9FC] p-1 rounded-xl border border-[#E5EAF2] w-full md:w-auto overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                activeTab === tab.name
                  ? 'bg-white text-blue-600 shadow-xs'
                  : 'text-[#8292AD] hover:text-[#172033]'
              }`}
            >
              <span>{tab.name}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                activeTab === tab.name ? 'bg-blue-100 text-blue-700' : 'bg-slate-200 text-slate-600'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-[#8292AD] absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search subscription..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-[#F7F9FC] border border-[#E5EAF2] rounded-xl focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Subscriptions Table */}
      <div className="bg-white rounded-2xl border border-[#E5EAF2] shadow-[0_1px_3px_rgba(0,0,0,0.04)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F7F9FC] border-b border-[#E5EAF2] text-[11px] font-bold text-[#8292AD] uppercase tracking-wider">
                <th className="py-3.5 px-4">Company</th>
                <th className="py-3.5 px-4">Plan Tier</th>
                <th className="py-3.5 px-4">Recurring MRR</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Auto Renew</th>
                <th className="py-3.5 px-4">Next Renewal</th>
                <th className="py-3.5 px-4 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5EAF2] text-xs">
              {filtered.map((company) => (
                <tr
                  key={company.id}
                  className="hover:bg-[#F7F9FC]/80 transition-colors group cursor-pointer"
                  onClick={() => setSelectedSub(company)}
                >
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={company.logo}
                        alt={company.name}
                        className="w-9 h-9 rounded-xl object-cover border border-[#E5EAF2]"
                      />
                      <div>
                        <p className="font-bold text-[#172033] group-hover:text-blue-600">
                          {company.name}
                        </p>
                        <p className="text-[11px] text-[#8292AD]">Since {company.joinedDate}</p>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="font-semibold text-blue-600 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full text-[11px]">
                      {company.plan}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="font-bold text-[#172033]">{company.mrr}</span>
                    <span className="text-[10px] text-[#8292AD] block">Billed Monthly</span>
                  </td>

                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                      company.status === 'Active'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : company.status === 'Trial'
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : company.status === 'Pending Payment'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-red-50 text-red-700 border border-red-200'
                    }`}>
                      {company.status}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => toggleAutoRenew(company)}
                      className={`px-2 py-0.5 text-[11px] font-semibold rounded-lg border transition-colors ${
                        company.status === 'Cancelled'
                          ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                          : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                      }`}
                    >
                      {company.status === 'Cancelled' ? 'Disabled' : 'Enabled'}
                    </button>
                  </td>

                  <td className="py-3.5 px-4 whitespace-nowrap text-[#8292AD]">
                    {company.nextBilling}
                  </td>

                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingSub(company);
                        }}
                        className="px-2.5 py-1 text-xs font-semibold text-blue-600 hover:text-white hover:bg-blue-600 border border-blue-200 rounded-xl transition-all flex items-center gap-1"
                      >
                        <Edit2 className="w-3 h-3" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedSub(company);
                        }}
                        className="px-2.5 py-1 text-xs font-semibold text-slate-600 hover:text-[#172033] hover:bg-slate-100 border border-[#E5EAF2] rounded-xl transition-all"
                      >
                        Details
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Subscription Details Modal */}
      {selectedSub && (
        <div className="fixed top-10 bottom-0 right-0 left-0 md:left-[76px] z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="fixed top-10 bottom-0 right-0 left-0 md:left-[76px]" onClick={() => setSelectedSub(null)} />
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-[#E5EAF2] overflow-hidden z-10 animate-in zoom-in-95 p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5EAF2]">
              <div className="flex items-center gap-3">
                <img src={selectedSub.logo} alt={selectedSub.name} className="w-10 h-10 rounded-xl object-cover" />
                <div>
                  <h3 className="text-base font-bold text-[#172033]">{selectedSub.name}</h3>
                  <p className="text-xs text-[#8292AD]">Subscription #{selectedSub.id}</p>
                </div>
              </div>
              <button onClick={() => setSelectedSub(null)} className="p-1.5 text-slate-400 hover:text-slate-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-[#F7F9FC] p-4 rounded-xl border border-[#E5EAF2] space-y-2.5 text-xs">
              <div className="flex justify-between">
                <span className="text-[#8292AD]">Plan Tier:</span>
                <span className="font-bold text-blue-600">{selectedSub.plan} Plan</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8292AD]">MRR Amount:</span>
                <span className="font-bold text-[#172033]">{selectedSub.mrr}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8292AD]">Next Billing Date:</span>
                <span className="font-bold text-[#172033]">{selectedSub.nextBilling}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8292AD]">Allocated Seats:</span>
                <span className="font-bold text-[#172033]">{selectedSub.users} Active Users</span>
              </div>
            </div>

            <div className="flex items-center justify-between gap-2.5 pt-3 border-t border-[#E5EAF2]">
              <button
                onClick={() => {
                  setEditingSub(selectedSub);
                  setSelectedSub(null);
                }}
                className="px-3 py-2 text-xs font-semibold text-blue-600 hover:bg-blue-50 rounded-xl transition-colors flex items-center gap-1.5 border border-blue-200"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit Logo & Plan</span>
              </button>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedSub(null)}
                  className="px-4 py-2 text-xs font-semibold text-[#8292AD]"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    showToast(`Invoice reminder triggered for ${selectedSub.name}`);
                    setSelectedSub(null);
                  }}
                  className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl"
                >
                  Send Notice
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Subscription Modal */}
      {editingSub && (
        <div className="fixed top-10 bottom-0 right-0 left-0 md:left-[76px] z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="fixed top-10 bottom-0 right-0 left-0 md:left-[76px]" onClick={() => setEditingSub(null)} />
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-[#E5EAF2] overflow-hidden z-10 animate-in zoom-in-95 p-6 space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5EAF2]">
              <div className="flex items-center gap-2">
                <Edit2 className="w-5 h-5 text-blue-600" />
                <h3 className="text-base font-bold text-[#172033]">Edit Subscription: {editingSub.name}</h3>
              </div>
              <button onClick={() => setEditingSub(null)} className="p-1.5 text-slate-400 hover:text-slate-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateCompany(editingSub.id, editingSub);
                setEditingSub(null);
              }}
              className="space-y-4"
            >
              {/* Image Option */}
              <ImageUploadOption
                value={editingSub.logo}
                onChange={(newLogo) => setEditingSub({ ...editingSub, logo: newLogo })}
                label="Company Logo / Image"
                shape="rounded-xl"
                type="company"
              />

              <div>
                <label className="block text-xs font-semibold text-[#172033] mb-1">Company Name</label>
                <input
                  type="text"
                  value={editingSub.name}
                  onChange={(e) => setEditingSub({ ...editingSub, name: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5EAF2] focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#172033] mb-1">Plan Tier</label>
                  <select
                    value={editingSub.plan}
                    onChange={(e) => setEditingSub({ ...editingSub, plan: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5EAF2] focus:border-blue-500 bg-white"
                  >
                    <option value="Starter">Starter</option>
                    <option value="Growth">Growth</option>
                    <option value="Enterprise">Enterprise</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#172033] mb-1">Status</label>
                  <select
                    value={editingSub.status}
                    onChange={(e) => setEditingSub({ ...editingSub, status: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5EAF2] focus:border-blue-500 bg-white"
                  >
                    <option value="Active">Active</option>
                    <option value="Trial">Trial</option>
                    <option value="Pending Payment">Pending Payment</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#172033] mb-1">User Seats</label>
                  <input
                    type="number"
                    value={editingSub.users}
                    onChange={(e) => setEditingSub({ ...editingSub, users: parseInt(e.target.value) || 1 })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5EAF2] focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#172033] mb-1">Monthly Billing</label>
                  <input
                    type="text"
                    value={editingSub.mrr}
                    onChange={(e) => setEditingSub({ ...editingSub, mrr: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5EAF2] focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-[#E5EAF2] flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingSub(null)}
                  className="px-4 py-2 text-xs font-semibold text-[#8292AD]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl"
                >
                  Save Subscription
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

