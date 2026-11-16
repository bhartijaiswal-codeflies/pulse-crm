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
  CheckCircle2
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
      <div className="overflow-x-auto md:overflow-visible">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#F1F5F9] text-xs font-semibold text-[#64748B]">
              <th className="py-2.5 px-2 font-medium">Company</th>
              <th className="py-2.5 px-2 font-medium">Plan</th>
              <th className="py-2.5 px-2 font-medium">Status</th>
              <th className="py-2.5 px-2 font-medium">Users</th>
              <th className="py-2.5 px-2 font-medium">Next Billing</th>
              <th className="py-2.5 px-1 text-right"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F1F5F9] text-xs">
            {companiesList.map((c, idx) => (
              <tr
                key={c.id || idx}
                className="hover:bg-[#F8FAFC] transition-colors group cursor-pointer"
                onClick={() => setSelectedCompany(c)}
              >
                <td className="py-3 px-2">
                  <div className="flex items-center gap-2.5">
                    {c.logo ? (
                      <img
                        src={c.logo}
                        alt={c.name}
                        className="w-7 h-7 rounded-lg object-cover border border-[#E5EAF2] flex-shrink-0"
                      />
                    ) : (
                      <div
                        className={`w-7 h-7 rounded-lg ${c.avatarBg} text-white font-bold text-xs flex items-center justify-center flex-shrink-0 shadow-xs`}
                      >
                        {c.letter}
                      </div>
                    )}
                    <span className="font-semibold text-[#172033] group-hover:text-blue-600 transition-colors">
                      {c.name}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-2 text-[#475569]">{c.plan}</td>
                <td className="py-3 px-2">{renderStatus(c.status)}</td>
                <td className="py-3 px-2 font-medium text-[#172033]">{c.users}</td>
                <td className="py-3 px-2 text-[#475569]">{c.nextBilling}</td>
                <td
                  className="py-3 px-1 text-right relative"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveMenu(activeMenu === idx ? null : idx);
                    }}
                    className={`p-1.5 rounded-lg transition-colors ${
                      activeMenu === idx
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-[#94A3B8] hover:text-[#172033] hover:bg-slate-100'
                    }`}
                    title="Actions"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>

                  {/* Backdrop and Dropdown Menu */}
                  {activeMenu === idx && (
                    <>
                      <div
                        className="fixed inset-0 z-20 cursor-default"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveMenu(null);
                        }}
                      />
                      <div
                        className={`absolute right-0 ${
                          idx >= 3 ? 'bottom-8' : 'top-8'
                        } w-44 bg-white border border-[#E5EAF2] rounded-xl shadow-xl py-1 z-30 animate-in fade-in zoom-in-95 duration-100 text-left`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          type="button"
                          onClick={() => {
                            setActiveMenu(null);
                            setSelectedCompany(c);
                          }}
                          className="w-full px-3 py-2 text-xs text-[#172033] hover:bg-[#F7F9FC] flex items-center gap-2 transition-colors font-medium"
                        >
                          <Eye className="w-3.5 h-3.5 text-blue-600" />
                          <span>View Details</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setActiveMenu(null);
                            setEditingCompany({ ...c, index: idx });
                          }}
                          className="w-full px-3 py-2 text-xs text-[#172033] hover:bg-[#F7F9FC] flex items-center gap-2 transition-colors font-medium"
                        >
                          <Edit2 className="w-3.5 h-3.5 text-slate-600" />
                          <span>Edit Company</span>
                        </button>
                        <div className="my-1 border-t border-[#E5EAF2]" />
                        <button
                          type="button"
                          onClick={() => {
                            setActiveMenu(null);
                            navigate('/companies');
                          }}
                          className="w-full px-3 py-2 text-xs text-[#172033] hover:bg-[#F7F9FC] flex items-center gap-2 transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                          <span>Manage All</span>
                        </button>
                      </div>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View Company Details Modal */}
      {selectedCompany && (
        <div className="fixed top-10 bottom-0 right-0 left-0 md:left-[76px] z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div
            className="fixed top-10 bottom-0 right-0 left-0 md:left-[76px]"
            onClick={() => setSelectedCompany(null)}
          />
          <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-[#E5EAF2] overflow-hidden z-10 animate-in zoom-in-95 duration-150 max-h-[85vh] flex flex-col text-left">
            <div className="px-6 py-4 border-b border-[#E5EAF2] flex items-center justify-between bg-[#F7F9FC]">
              <div className="flex items-center gap-3">
                <img
                  src={selectedCompany.logo}
                  alt={selectedCompany.name}
                  className="w-12 h-12 rounded-xl object-cover border border-[#E5EAF2]"
                />
                <div>
                  <h3 className="text-base font-bold text-[#172033]">{selectedCompany.name}</h3>
                  <p className="text-xs text-[#8292AD]">{selectedCompany.industry} • ID: {selectedCompany.id}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCompany(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/50"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-5 overflow-y-auto">
              {/* Snapshot Cards */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-[#F8FAFC] border border-[#E5EAF2] rounded-xl p-3">
                  <span className="text-[10px] text-[#8292AD] font-semibold uppercase tracking-wider block">Current Plan</span>
                  <span className="text-sm font-bold text-[#172033] mt-0.5 block">{selectedCompany.plan}</span>
                </div>
                <div className="bg-[#F8FAFC] border border-[#E5EAF2] rounded-xl p-3">
                  <span className="text-[10px] text-[#8292AD] font-semibold uppercase tracking-wider block">Monthly Value</span>
                  <span className="text-sm font-bold text-emerald-600 mt-0.5 block">{selectedCompany.mrr || '₹19,999'}</span>
                </div>
                <div className="bg-[#F8FAFC] border border-[#E5EAF2] rounded-xl p-3">
                  <span className="text-[10px] text-[#8292AD] font-semibold uppercase tracking-wider block">Status</span>
                  <span className="mt-1 block">{renderStatus(selectedCompany.status)}</span>
                </div>
              </div>

              {/* Organization Info */}
              <div>
                <h4 className="text-xs font-bold text-[#172033] uppercase tracking-wider mb-3">Contact & Organization Info</h4>
                <div className="space-y-2.5 text-xs text-[#475569]">
                  <div className="flex items-center justify-between py-1.5 border-b border-[#F1F5F9]">
                    <span className="flex items-center gap-2 text-[#8292AD]">
                      <Sparkles className="w-3.5 h-3.5" /> Primary Contact
                    </span>
                    <span className="font-semibold text-[#172033]">{selectedCompany.contactPerson}</span>
                  </div>
                  <div className="flex items-center justify-between py-1.5 border-b border-[#F1F5F9]">
                    <span className="flex items-center gap-2 text-[#8292AD]">
                      <Mail className="w-3.5 h-3.5" /> Work Email
                    </span>
                    <a href={`mailto:${selectedCompany.email}`} className="text-blue-600 hover:underline">
                      {selectedCompany.email}
                    </a>
                  </div>
                  <div className="flex items-center justify-between py-1.5 border-b border-[#F1F5F9]">
                    <span className="flex items-center gap-2 text-[#8292AD]">
                      <Phone className="w-3.5 h-3.5" /> Phone Number
                    </span>
                    <span>{selectedCompany.phone}</span>
                  </div>
                  <div className="flex items-center justify-between py-1.5 border-b border-[#F1F5F9]">
                    <span className="flex items-center gap-2 text-[#8292AD]">
                      <MapPin className="w-3.5 h-3.5" /> Headquarters
                    </span>
                    <span>{selectedCompany.location}</span>
                  </div>
                  <div className="flex items-center justify-between py-1.5">
                    <span className="flex items-center gap-2 text-[#8292AD]">
                      <Calendar className="w-3.5 h-3.5" /> Next Billing Date
                    </span>
                    <span className="font-medium text-[#172033]">{selectedCompany.nextBilling}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 py-3.5 border-t border-[#E5EAF2] bg-[#F8FAFC] flex justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setSelectedCompany(null)}
                className="px-4 py-2 text-xs font-semibold text-[#8292AD] hover:text-[#172033]"
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
        <div className="fixed top-10 bottom-0 right-0 left-0 md:left-[76px] z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="fixed top-10 bottom-0 right-0 left-0 md:left-[76px]" onClick={() => setEditingCompany(null)} />
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-[#E5EAF2] overflow-hidden z-10 animate-in zoom-in-95 duration-150 max-h-[85vh] flex flex-col text-left">
            <div className="px-6 py-4 border-b border-[#E5EAF2] flex items-center justify-between bg-[#F7F9FC]">
              <h3 className="text-base font-bold text-[#172033]">Edit Company Details</h3>
              <button
                type="button"
                onClick={() => setEditingCompany(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/50"
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
              className="p-6 space-y-4 overflow-y-auto"
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
                <label className="block text-xs font-semibold text-[#172033] mb-1">Company Name</label>
                <input
                  type="text"
                  value={editingCompany.name}
                  onChange={(e) => setEditingCompany({ ...editingCompany, name: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5EAF2] focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#172033] mb-1">Plan</label>
                  <select
                    value={editingCompany.plan}
                    onChange={(e) => setEditingCompany({ ...editingCompany, plan: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5EAF2] focus:border-blue-500 bg-white"
                  >
                    <option value="Starter Plan">Starter Plan</option>
                    <option value="Pro Plan">Pro Plan</option>
                    <option value="Business Plan">Business Plan</option>
                    <option value="Enterprise Plan">Enterprise Plan</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#172033] mb-1">Status</label>
                  <select
                    value={editingCompany.status}
                    onChange={(e) => setEditingCompany({ ...editingCompany, status: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5EAF2] focus:border-blue-500 bg-white"
                  >
                    <option value="Active">Active</option>
                    <option value="Trial">Trial</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#172033] mb-1">Users / Seats</label>
                  <input
                    type="number"
                    value={editingCompany.users || 0}
                    onChange={(e) => setEditingCompany({ ...editingCompany, users: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5EAF2] focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#172033] mb-1">Next Billing</label>
                  <input
                    type="text"
                    value={editingCompany.nextBilling || ''}
                    onChange={(e) => setEditingCompany({ ...editingCompany, nextBilling: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5EAF2] focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-[#E5EAF2] flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setEditingCompany(null)}
                  className="px-4 py-2 text-xs font-semibold text-[#8292AD] hover:text-[#172033]"
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
    </div>
  );
};
