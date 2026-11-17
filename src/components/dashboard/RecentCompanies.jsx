import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Building2,
  MoreVertical,
  ArrowRight,
  Edit2,
  ExternalLink,
  X,
  Eye,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Sparkles,
  CheckCircle2,
  Video,
  Trash2,
  Copy,
  Check
} from 'lucide-react';
import { ImageUploadOption } from '../common/ImageUploadOption';
import { useApp } from '../../context/AppContext';

const RECENT_COMPANIES = [
  {
    id: 'CMP-1001',
    name: 'Acme Corp',
    letter: 'A',
    avatarBg: 'bg-[#2563EB]',
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop&crop=faces',
    plan: 'Pro Plan',
    status: 'Active',
    users: 24,
    mrr: '₹19,999',
    industry: 'Enterprise SaaS',
    contactPerson: 'Elena Rostova',
    email: 'contact@acmetech.io',
    phone: '+91 98765 43210',
    location: 'Bangalore, India',
    nextBilling: 'Dec 15, 2026'
  },
  {
    id: 'CMP-1002',
    name: 'GlobalTech Ltd',
    letter: 'G',
    avatarBg: 'bg-[#2563EB]',
    logo: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=100&h=100&fit=crop&crop=faces',
    plan: 'Business Plan',
    status: 'Active',
    users: 48,
    mrr: '₹34,999',
    industry: 'Cloud Infrastructure',
    contactPerson: 'Marcus Vance',
    email: 'mvance@globaltech.com',
    phone: '+91 98111 22334',
    location: 'Mumbai, India',
    nextBilling: 'Dec 20, 2026'
  },
  {
    id: 'CMP-1003',
    name: 'Bright Media',
    letter: 'B',
    avatarBg: 'bg-[#2563EB]',
    logo: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=100&h=100&fit=crop&crop=faces',
    plan: 'Pro Plan',
    status: 'Trial',
    users: 12,
    mrr: '₹14,999',
    industry: 'Digital Marketing',
    contactPerson: 'Aakash Rawat',
    email: 'arawat@brightmedia.agency',
    phone: '+91 99887 76655',
    location: 'Hyderabad, India',
    nextBilling: 'Nov 25, 2026'
  },
  {
    id: 'CMP-1004',
    name: 'NextGen Solutions',
    letter: 'N',
    avatarBg: 'bg-[#F97316]',
    logo: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=100&h=100&fit=crop&crop=faces',
    plan: 'Business Plan',
    status: 'Active',
    users: 36,
    mrr: '₹29,999',
    industry: 'AI & Data Platforms',
    contactPerson: 'David Chen',
    email: 'admin@nextgensol.io',
    phone: '+91 97234 11223',
    location: 'Pune, India',
    nextBilling: 'Dec 10, 2026'
  },
  {
    id: 'CMP-1005',
    name: 'DreamWorks Co',
    letter: 'D',
    avatarBg: 'bg-[#3B82F6]',
    logo: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=100&h=100&fit=crop&crop=faces',
    plan: 'Starter Plan',
    status: 'Cancelled',
    users: 8,
    mrr: '₹7,999',
    industry: 'Creative & Animation',
    contactPerson: 'Alexei Ivanov',
    email: 'ops@dreamworks.co',
    phone: '+91 99001 55443',
    location: 'Delhi NCR, India',
    nextBilling: '—'
  }
];

export const RecentCompanies = () => {
  const { showToast } = useApp();
  const navigate = useNavigate();

  const [companiesList, setCompaniesList] = useState(RECENT_COMPANIES);
  const [activeMenu, setActiveMenu] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [editingCompany, setEditingCompany] = useState(null);
  const [videoCallCompany, setVideoCallCompany] = useState(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleStartVideoCall = (c) => {
    setVideoCallCompany(c);
  };

  const handleCopyMeetingLink = (url) => {
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    showToast('Meeting invite link copied to clipboard!', 'info');
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleDelete = (id) => {
    const target = companiesList.find((c) => c.id === id);
    setCompaniesList((prev) => prev.filter((c) => c.id !== id));
    showToast(`${target?.name || 'Company'} removed from recent list`, 'info');
  };

  const renderStatus = (status) => {
    switch (status) {
      case 'Active':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#DCFCE7] text-[#15803D]">
            Active
          </span>
        );
      case 'Trial':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#DBEAFE] text-[#1D4ED8]">
            Trial
          </span>
        );
      case 'Cancelled':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#FEE2E2] text-[#B91C1C]">
            Cancelled
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-700">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-[#E5EAF2] shadow-[0_1px_3px_rgba(0,0,0,0.03)] h-full flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between pb-3">
        <div className="flex items-center gap-2">
          <Building2 className="w-5 h-5 text-[#2563EB]" />
          <h3 className="text-base font-bold text-[#172033]">Recent Companies</h3>
        </div>

        <NavLink
          to="/companies"
          className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </NavLink>
      </div>

      {/* Table */}
      <div className="overflow-x-auto no-scrollbar">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#F1F5F9] dark:border-[#17203F] text-xs font-semibold text-[#64748B] dark:text-slate-400">
              <th className="py-2.5 px-3 font-medium">Company</th>
              <th className="py-2.5 px-3 font-medium">Plan</th>
              <th className="py-2.5 px-3 font-medium">Status</th>
              <th className="py-2.5 px-2 text-center font-medium">Users</th>
              <th className="py-2.5 px-3 font-medium whitespace-nowrap text-right">Next Billing</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F1F5F9] dark:divide-[#17203F] text-xs">
            {companiesList.map((c, idx) => (
              <tr
                key={c.id || idx}
                className="hover:bg-[#F8FAFC] dark:hover:bg-[#121D3D] transition-colors group cursor-pointer"
                onClick={() => setSelectedCompany(c)}
              >
                <td className="py-2.5 px-3">
                  <div className="flex items-center gap-2.5 min-w-0 max-w-[140px] sm:max-w-[180px]">
                    {c.logo ? (
                      <img
                        src={c.logo}
                        alt={c.name}
                        className="w-7 h-7 rounded-lg object-cover border border-[#E5EAF2] dark:border-[#1E2D54] flex-shrink-0"
                      />
                    ) : (
                      <div
                        className={`w-7 h-7 rounded-lg ${c.avatarBg} text-white font-bold text-xs flex items-center justify-center flex-shrink-0 shadow-xs`}
                      >
                        {c.letter}
                      </div>
                    )}
                    <span className="font-semibold text-[#172033] dark:text-white group-hover:text-blue-600 transition-colors truncate">
                      {c.name}
                    </span>
                  </div>
                </td>
                <td className="py-2.5 px-3 text-[#475569] dark:text-slate-400 whitespace-nowrap">{c.plan}</td>
                <td className="py-2.5 px-3 whitespace-nowrap">{renderStatus(c.status)}</td>
                <td className="py-2.5 px-2 text-center font-medium text-[#172033] dark:text-white">{c.users}</td>
                <td className="py-2.5 px-3 text-right text-[#475569] dark:text-slate-400 whitespace-nowrap">{c.nextBilling}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View Company Details Modal */}
      {selectedCompany && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div
            className="fixed inset-0"
            onClick={() => setSelectedCompany(null)}
          />
          <div className="relative w-full max-w-xl bg-white dark:bg-[#0D152D] rounded-2xl shadow-2xl border border-[#E5EAF2] dark:border-[#1A2548] overflow-hidden z-10 animate-in zoom-in-95 duration-150 max-h-[90vh] sm:max-h-[85vh] flex flex-col text-left">
            <div className="px-4 sm:px-6 py-3.5 sm:py-4 border-b border-[#E5EAF2] dark:border-[#1A2548] flex items-center justify-between bg-[#F7F9FC] dark:bg-[#0A1128]">
              <div className="flex items-center gap-3">
                <img
                  src={selectedCompany.logo}
                  alt={selectedCompany.name}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl object-cover border border-[#E5EAF2] dark:border-[#1E2D54]"
                />
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-[#172033] dark:text-white">{selectedCompany.name}</h3>
                  <p className="text-[11px] sm:text-xs text-[#8292AD] dark:text-slate-400">{selectedCompany.industry} • ID: {selectedCompany.id}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCompany(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg hover:bg-slate-200/50 dark:hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 sm:p-6 space-y-4 sm:space-y-5 overflow-y-auto">
              {/* Snapshot Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
                <div className="bg-[#F8FAFC] dark:bg-[#0A1128] border border-[#E5EAF2] dark:border-[#1A2548] rounded-xl p-3">
                  <span className="text-[10px] text-[#8292AD] dark:text-slate-400 font-semibold uppercase tracking-wider block">Current Plan</span>
                  <span className="text-sm font-bold text-[#172033] dark:text-white mt-0.5 block">{selectedCompany.plan}</span>
                </div>
                <div className="bg-[#F8FAFC] dark:bg-[#0A1128] border border-[#E5EAF2] dark:border-[#1A2548] rounded-xl p-3">
                  <span className="text-[10px] text-[#8292AD] dark:text-slate-400 font-semibold uppercase tracking-wider block">Monthly Value</span>
                  <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mt-0.5 block">{selectedCompany.mrr || '₹19,999'}</span>
                </div>
                <div className="bg-[#F8FAFC] dark:bg-[#0A1128] border border-[#E5EAF2] dark:border-[#1A2548] rounded-xl p-3">
                  <span className="text-[10px] text-[#8292AD] dark:text-slate-400 font-semibold uppercase tracking-wider block">Status</span>
                  <span className="mt-1 block">{renderStatus(selectedCompany.status)}</span>
                </div>
              </div>

              {/* Organization Info */}
              <div>
                <h4 className="text-xs font-bold text-[#172033] dark:text-white uppercase tracking-wider mb-3">Contact & Organization Info</h4>
                <div className="space-y-2.5 text-xs text-[#475569] dark:text-slate-300">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between py-1.5 border-b border-[#F1F5F9] dark:border-[#17203F] gap-0.5 sm:gap-2">
                    <span className="flex items-center gap-2 text-[#8292AD] dark:text-slate-400">
                      <Sparkles className="w-3.5 h-3.5" /> Primary Contact
                    </span>
                    <span className="font-semibold text-[#172033] dark:text-white">{selectedCompany.contactPerson}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between py-1.5 border-b border-[#F1F5F9] dark:border-[#17203F] gap-0.5 sm:gap-2">
                    <span className="flex items-center gap-2 text-[#8292AD] dark:text-slate-400">
                      <Mail className="w-3.5 h-3.5" /> Work Email
                    </span>
                    <a href={`mailto:${selectedCompany.email}`} className="text-blue-600 dark:text-blue-400 hover:underline break-all">
                      {selectedCompany.email}
                    </a>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between py-1.5 border-b border-[#F1F5F9] dark:border-[#17203F] gap-0.5 sm:gap-2">
                    <span className="flex items-center gap-2 text-[#8292AD] dark:text-slate-400">
                      <Phone className="w-3.5 h-3.5" /> Phone Number
                    </span>
                    <span>{selectedCompany.phone}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between py-1.5 border-b border-[#F1F5F9] dark:border-[#17203F] gap-0.5 sm:gap-2">
                    <span className="flex items-center gap-2 text-[#8292AD] dark:text-slate-400">
                      <MapPin className="w-3.5 h-3.5" /> Headquarters
                    </span>
                    <span>{selectedCompany.location}</span>
                  </div>
                  <div className="flex items-center justify-between py-1.5">
                    <span className="flex items-center gap-2 text-[#8292AD] dark:text-slate-400">
                      <Calendar className="w-3.5 h-3.5" /> Next Billing Date
                    </span>
                    <span className="font-medium text-[#172033] dark:text-white">{selectedCompany.nextBilling}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 py-3.5 border-t border-[#E5EAF2] dark:border-[#1A2548] bg-[#F8FAFC] dark:bg-[#0A1128] flex justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setSelectedCompany(null)}
                className="px-4 py-2 text-xs font-semibold text-[#8292AD] hover:text-[#172033] dark:hover:text-white"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  const idx = companiesList.findIndex(x => x.id === selectedCompany.id);
                  setEditingCompany({ ...selectedCompany, index: idx >= 0 ? idx : 0 });
                  setSelectedCompany(null);
                }}
                className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl"
              >
                Edit Company
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Company Modal from Dashboard */}
      {editingCompany && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="fixed inset-0" onClick={() => setEditingCompany(null)} />
          <div className="relative w-full max-w-lg bg-white dark:bg-[#0D152D] rounded-2xl shadow-2xl border border-[#E5EAF2] dark:border-[#1A2548] overflow-hidden z-10 animate-in zoom-in-95 duration-150 max-h-[90vh] sm:max-h-[85vh] flex flex-col text-left">
            <div className="px-4 sm:px-6 py-3.5 sm:py-4 border-b border-[#E5EAF2] dark:border-[#1A2548] flex items-center justify-between bg-[#F7F9FC] dark:bg-[#0A1128]">
              <h3 className="text-sm sm:text-base font-bold text-[#172033] dark:text-white">Edit Company Details</h3>
              <button
                type="button"
                onClick={() => setEditingCompany(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg hover:bg-slate-200/50 dark:hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const updated = [...companiesList];
                const targetIdx = editingCompany.index ?? updated.findIndex(c => c.id === editingCompany.id);
                if (targetIdx >= 0) {
                  updated[targetIdx] = { ...editingCompany };
                  setCompaniesList(updated);
                }
                setEditingCompany(null);
                showToast && showToast(`Company "${editingCompany.name}" updated successfully!`, 'success');
              }}
              className="p-4 sm:p-6 space-y-4 overflow-y-auto"
            >
              {/* Image Option */}
              <ImageUploadOption
                value={editingCompany.logo}
                onChange={(newLogo) => setEditingCompany({ ...editingCompany, logo: newLogo })}
                label="Company Logo / Image"
                shape="rounded-xl"
                type="company"
              />

              <div>
                <label className="block text-xs font-semibold text-[#172033] dark:text-white mb-1">Company Name</label>
                <input
                  type="text"
                  value={editingCompany.name}
                  onChange={(e) => setEditingCompany({ ...editingCompany, name: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5EAF2] dark:border-[#1E2D54] bg-white dark:bg-[#0A1128] text-[#172033] dark:text-white focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#172033] dark:text-white mb-1">Plan</label>
                  <select
                    value={editingCompany.plan}
                    onChange={(e) => setEditingCompany({ ...editingCompany, plan: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5EAF2] dark:border-[#1E2D54] bg-white dark:bg-[#0A1128] text-[#172033] dark:text-white focus:border-blue-500"
                  >
                    <option value="Starter Plan">Starter Plan</option>
                    <option value="Pro Plan">Pro Plan</option>
                    <option value="Business Plan">Business Plan</option>
                    <option value="Enterprise Plan">Enterprise Plan</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#172033] dark:text-white mb-1">Status</label>
                  <select
                    value={editingCompany.status}
                    onChange={(e) => setEditingCompany({ ...editingCompany, status: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5EAF2] dark:border-[#1E2D54] bg-white dark:bg-[#0A1128] text-[#172033] dark:text-white focus:border-blue-500"
                  >
                    <option value="Active">Active</option>
                    <option value="Trial">Trial</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#172033] dark:text-white mb-1">Users / Seats</label>
                  <input
                    type="number"
                    value={editingCompany.users || 0}
                    onChange={(e) => setEditingCompany({ ...editingCompany, users: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5EAF2] dark:border-[#1E2D54] bg-white dark:bg-[#0A1128] text-[#172033] dark:text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#172033] dark:text-white mb-1">Next Billing</label>
                  <input
                    type="text"
                    value={editingCompany.nextBilling || ''}
                    onChange={(e) => setEditingCompany({ ...editingCompany, nextBilling: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5EAF2] dark:border-[#1E2D54] bg-white dark:bg-[#0A1128] text-[#172033] dark:text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-[#E5EAF2] dark:border-[#1A2548] flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setEditingCompany(null)}
                  className="px-4 py-2 text-xs font-semibold text-[#8292AD] hover:text-[#172033] dark:hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl"
                >
                  Update Company
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Instant Video Meeting Modal */}
      {videoCallCompany && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div
            className="fixed inset-0"
            onClick={() => setVideoCallCompany(null)}
          />
          <div className="relative w-full max-w-md max-h-[90vh] overflow-y-auto bg-white dark:bg-[#0D152D] rounded-2xl shadow-2xl border border-[#E5EAF2] dark:border-[#1A2548] z-10 animate-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="px-4 sm:px-6 py-3.5 sm:py-4 border-b border-[#E5EAF2] dark:border-[#1A2548] flex items-center justify-between bg-gradient-to-r from-indigo-50/60 to-purple-50/60 dark:from-indigo-950/60 dark:to-purple-950/60">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md">
                  <Video className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-[#172033] dark:text-white">Instant Video Meeting</h3>
                  <p className="text-[11px] sm:text-xs text-[#8292AD] dark:text-slate-400">{videoCallCompany.name}</p>
                </div>
              </div>
              <button
                onClick={() => setVideoCallCompany(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="p-4 sm:p-6 space-y-4">
              <div className="flex items-center gap-3 p-3 bg-[#F8FAFC] dark:bg-[#0A1128] border border-[#E5EAF2] dark:border-[#1A2548] rounded-xl">
                {videoCallCompany.logo ? (
                  <img src={videoCallCompany.logo} alt={videoCallCompany.name} className="w-10 h-10 rounded-xl object-cover border border-[#E5EAF2] dark:border-[#1E2D54]" />
                ) : (
                  <div className="w-10 h-10 rounded-xl bg-indigo-500 text-white font-bold flex items-center justify-center">
                    {videoCallCompany.letter || videoCallCompany.name.charAt(0)}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-[#172033] dark:text-white truncate">{videoCallCompany.name}</p>
                  <p className="text-xs text-[#8292AD] dark:text-slate-400 truncate">{videoCallCompany.contactPerson || 'Lead Contact'} • {videoCallCompany.email || 'contact@client.io'}</p>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                  Ready
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#172033] dark:text-white mb-1.5">Meeting Invite Link</label>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={`https://meet.pulsecrm.io/room/${videoCallCompany.id || 'live'}`}
                    className="flex-1 px-3 py-2 text-xs bg-[#F8FAFC] dark:bg-[#0A1128] rounded-xl border border-[#E5EAF2] dark:border-[#1E2D54] text-[#475569] dark:text-slate-200 font-mono select-all"
                  />
                  <button
                    onClick={() => handleCopyMeetingLink(`https://meet.pulsecrm.io/room/${videoCallCompany.id || 'live'}`)}
                    className="px-3 py-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800/60 rounded-xl transition-colors flex items-center justify-center gap-1.5"
                  >
                    {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedLink ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60 flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-indigo-900 dark:text-indigo-200 leading-relaxed">
                  Secure HD video session with automatic CRM notes logging and screen sharing capabilities.
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
