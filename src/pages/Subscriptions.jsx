import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
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
  Edit2,
  Plus,
  Power,
  Eye,
  Video,
  Trash2,
  Copy,
  Check,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ImageUploadOption } from '../components/common/ImageUploadOption';

export const Subscriptions = () => {
  const { companies, updateCompany, deleteCompany, setIsAddCompanyOpen, showToast } = useApp();
  const [searchParams] = useSearchParams();
  const statusParam = searchParams.get('status');

  const [activeTab, setActiveTab] = useState(statusParam || 'All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSub, setSelectedSub] = useState(null);
  const [editingSub, setEditingSub] = useState(null);
  const [videoCallCompany, setVideoCallCompany] = useState(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleStartVideoCall = (company) => {
    setVideoCallCompany(company);
  };

  const handleCopyMeetingLink = (url) => {
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    showToast('Meeting invite link copied to clipboard!', 'info');
    setTimeout(() => setCopiedLink(false), 2000);
  };

  useEffect(() => {
    if (statusParam) {
      setActiveTab(statusParam);
    }
  }, [statusParam]);

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

        <div className="flex items-center gap-2.5">
          <span className="hidden sm:inline-flex text-xs font-semibold px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200">
            92.4% Net Revenue Retention
          </span>
          <button
            type="button"
            onClick={() => setIsAddCompanyOpen(true)}
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md shadow-blue-500/20 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>New Subscription</span>
          </button>
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
                <th className="py-3.5 px-4 text-center font-bold text-[11px] text-[#8292AD] uppercase tracking-wider">Actions</th>
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

                  <td
                    className="py-2.5 px-2 md:py-3.5 md:px-4 text-center whitespace-nowrap"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center justify-center gap-1 sm:gap-1.5 md:gap-2">
                      {/* View Details */}
                      <button
                        type="button"
                        onClick={() => setSelectedSub(company)}
                        className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full border border-[#93C5FD] bg-[#EFF6FF]/70 text-[#2563EB] flex items-center justify-center hover:bg-[#DBEAFE] hover:border-[#3B82F6] hover:scale-105 transition-all shadow-xs cursor-pointer"
                        title="View Subscription"
                      >
                        <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 stroke-[1.8]" />
                      </button>

                      {/* Edit Subscription */}
                      <button
                        type="button"
                        onClick={() => setEditingSub(company)}
                        className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full border border-[#86EFAC] bg-[#F0FDF4]/70 text-[#16A34A] flex items-center justify-center hover:bg-[#DCFCE7] hover:border-[#22C55E] hover:scale-105 transition-all shadow-xs cursor-pointer"
                        title="Edit Plan"
                      >
                        <Edit2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 stroke-[1.8]" />
                      </button>

                      {/* Video Call */}
                      <button
                        type="button"
                        onClick={() => handleStartVideoCall(company)}
                        className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full border border-[#C7D2FE] bg-[#EEF2FF]/70 text-[#4F46E5] flex items-center justify-center hover:bg-[#E0E7FF] hover:border-[#6366F1] hover:scale-105 transition-all shadow-xs cursor-pointer"
                        title="Schedule Renewal Call"
                      >
                        <Video className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 stroke-[1.8]" />
                      </button>

                      {/* Cancel / Delete Subscription */}
                      <button
                        type="button"
                        onClick={() => {
                          deleteCompany(company.id);
                          showToast(`Subscription for ${company.name} cancelled`, 'info');
                        }}
                        className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full border border-[#FECDD3] bg-[#FFF1F2]/70 text-[#E11D48] flex items-center justify-center hover:bg-[#FFE4E6] hover:border-[#F43F5E] hover:scale-105 transition-all shadow-xs cursor-pointer"
                        title="Cancel / Delete Subscription"
                      >
                        <Trash2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 stroke-[1.8]" />
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
        <div className="fixed top-10 bottom-0 right-0 left-0 md:left-[76px] z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="fixed top-10 bottom-0 right-0 left-0 md:left-[76px]" onClick={() => setSelectedSub(null)} />
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-[#E5EAF2] overflow-hidden z-10 animate-in zoom-in-95 p-4 sm:p-6 space-y-4 sm:space-y-5 max-h-[90vh] sm:max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5EAF2]">
              <div className="flex items-center gap-3">
                <img src={selectedSub.logo} alt={selectedSub.name} className="w-10 h-10 rounded-xl object-cover" />
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-[#172033]">{selectedSub.name}</h3>
                  <p className="text-[11px] sm:text-xs text-[#8292AD]">Subscription #{selectedSub.id}</p>
                </div>
              </div>
              <button onClick={() => setSelectedSub(null)} className="p-1.5 text-slate-400 hover:text-slate-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-[#F7F9FC] p-3.5 sm:p-4 rounded-xl border border-[#E5EAF2] space-y-2.5 text-xs">
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

            <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 pt-3 border-t border-[#E5EAF2]">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => {
                    setEditingSub(selectedSub);
                    setSelectedSub(null);
                  }}
                  className="px-3 py-2 text-xs font-semibold text-blue-600 hover:bg-blue-50 rounded-xl transition-colors flex items-center gap-1.5 border border-blue-200"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit Plan</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const nextStatus = selectedSub.status === 'Cancelled' ? 'Active' : 'Cancelled';
                    updateCompany(selectedSub.id, { ...selectedSub, status: nextStatus });
                    showToast(`Subscription for ${selectedSub.name} is now ${nextStatus}`, nextStatus === 'Active' ? 'success' : 'warning');
                    setSelectedSub(null);
                  }}
                  className={`px-3 py-2 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5 border ${
                    selectedSub.status === 'Cancelled'
                      ? 'text-emerald-700 bg-emerald-50 border-emerald-200 hover:bg-emerald-100'
                      : 'text-red-600 bg-red-50 border-red-200 hover:bg-red-100'
                  }`}
                >
                  <Power className="w-3.5 h-3.5" />
                  <span>{selectedSub.status === 'Cancelled' ? 'Reactivate' : 'Cancel Plan'}</span>
                </button>
              </div>

              <div className="flex gap-2 w-full sm:w-auto justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedSub(null)}
                  className="px-4 py-2 text-xs font-semibold text-[#8292AD] hover:text-[#172033]"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    showToast(`Invoice notice dispatched to ${selectedSub.name}`);
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
        <div className="fixed top-10 bottom-0 right-0 left-0 md:left-[76px] z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="fixed top-10 bottom-0 right-0 left-0 md:left-[76px]" onClick={() => setEditingSub(null)} />
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-[#E5EAF2] overflow-hidden z-10 animate-in zoom-in-95 p-4 sm:p-6 space-y-4 max-h-[90vh] sm:max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5EAF2]">
              <div className="flex items-center gap-2">
                <Edit2 className="w-5 h-5 text-blue-600" />
                <h3 className="text-sm sm:text-base font-bold text-[#172033]">Edit Subscription: {editingSub.name}</h3>
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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

      {/* Instant Video Meeting Modal */}
      {videoCallCompany && (
        <div className="fixed top-10 bottom-0 right-0 left-0 md:left-[76px] z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div
            className="fixed top-10 bottom-0 right-0 left-0 md:left-[76px]"
            onClick={() => setVideoCallCompany(null)}
          />
          <div className="relative w-full max-w-md max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border border-[#E5EAF2] z-10 animate-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="px-4 sm:px-6 py-3.5 sm:py-4 border-b border-[#E5EAF2] flex items-center justify-between bg-gradient-to-r from-indigo-50/60 to-purple-50/60">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md">
                  <Video className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-[#172033]">Instant Video Meeting</h3>
                  <p className="text-[11px] sm:text-xs text-[#8292AD]">{videoCallCompany.name}</p>
                </div>
              </div>
              <button
                onClick={() => setVideoCallCompany(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="p-4 sm:p-6 space-y-4">
              <div className="flex items-center gap-3 p-3 bg-[#F8FAFC] border border-[#E5EAF2] rounded-xl">
                {videoCallCompany.logo ? (
                  <img src={videoCallCompany.logo} alt={videoCallCompany.name} className="w-10 h-10 rounded-xl object-cover border" />
                ) : (
                  <div className="w-10 h-10 rounded-xl bg-indigo-500 text-white font-bold flex items-center justify-center">
                    {videoCallCompany.name.charAt(0)}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-[#172033] truncate">{videoCallCompany.name}</p>
                  <p className="text-xs text-[#8292AD] truncate">{videoCallCompany.contactPerson || 'Account Lead'} • {videoCallCompany.plan} Plan</p>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-200">
                  Ready
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#172033] mb-1.5">Meeting Invite Link</label>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={`https://meet.pulsecrm.io/room/${videoCallCompany.id || 'live'}`}
                    className="flex-1 px-3 py-2 text-xs bg-[#F8FAFC] rounded-xl border border-[#E5EAF2] text-[#475569] font-mono select-all"
                  />
                  <button
                    onClick={() => handleCopyMeetingLink(`https://meet.pulsecrm.io/room/${videoCallCompany.id || 'live'}`)}
                    className="px-3 py-2 text-xs font-semibold text-indigo-600 hover:bg-indigo-50 border border-indigo-200 rounded-xl transition-colors flex items-center justify-center gap-1.5"
                  >
                    {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedLink ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-indigo-50/60 border border-indigo-100 flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-indigo-600 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-indigo-900 leading-relaxed">
                  HD video room for account renewals, tier upgrades, and feature consultations.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    showToast(`Launching secure video call with ${videoCallCompany.name}...`, 'success');
                    window.open(`https://meet.google.com/new`, '_blank');
                    setVideoCallCompany(null);
                  }}
                  className="w-full sm:flex-1 py-2.5 px-4 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer text-center"
                >
                  <Video className="w-4 h-4" />
                  <span>Join Video Call Now</span>
                </button>
                <button
                  type="button"
                  onClick={() => setVideoCallCompany(null)}
                  className="w-full sm:w-auto py-2.5 px-4 text-xs font-semibold text-[#8292AD] hover:text-[#172033] hover:bg-slate-100 rounded-xl transition-colors cursor-pointer text-center"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

