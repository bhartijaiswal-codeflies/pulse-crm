import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Building2, MoreVertical, ArrowRight, Edit2, ExternalLink, X } from 'lucide-react';
import { ImageUploadOption } from '../common/ImageUploadOption';

const RECENT_COMPANIES = [
  {
    name: 'Acme Corp',
    letter: 'A',
    avatarBg: 'bg-[#2563EB]',
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop&crop=faces',
    plan: 'Pro Plan',
    status: 'Active',
    users: 24,
    nextBilling: 'Dec 15, 2026'
  },
  {
    name: 'GlobalTech Ltd',
    letter: 'G',
    avatarBg: 'bg-[#2563EB]',
    logo: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=100&h=100&fit=crop&crop=faces',
    plan: 'Business Plan',
    status: 'Active',
    users: 48,
    nextBilling: 'Dec 20, 2026'
  },
  {
    name: 'Bright Media',
    letter: 'B',
    avatarBg: 'bg-[#2563EB]',
    logo: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=100&h=100&fit=crop&crop=faces',
    plan: 'Pro Plan',
    status: 'Trial',
    users: 12,
    nextBilling: 'Nov 25, 2026'
  },
  {
    name: 'NextGen Solutions',
    letter: 'N',
    avatarBg: 'bg-[#F97316]',
    logo: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=100&h=100&fit=crop&crop=faces',
    plan: 'Business Plan',
    status: 'Active',
    users: 36,
    nextBilling: 'Dec 10, 2026'
  },
  {
    name: 'DreamWorks Co',
    letter: 'D',
    avatarBg: 'bg-[#3B82F6]',
    logo: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=100&h=100&fit=crop&crop=faces',
    plan: 'Starter Plan',
    status: 'Cancelled',
    users: 8,
    nextBilling: '—'
  }
];

export const RecentCompanies = () => {
  const [companiesList, setCompaniesList] = useState(RECENT_COMPANIES);
  const [activeMenu, setActiveMenu] = useState(null);
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
        return null;
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
      <div className="overflow-x-auto">
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
              <tr key={idx} className="hover:bg-[#F8FAFC] transition-colors">
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
                    <span className="font-semibold text-[#172033]">{c.name}</span>
                  </div>
                </td>
                <td className="py-3 px-2 text-[#475569]">{c.plan}</td>
                <td className="py-3 px-2">{renderStatus(c.status)}</td>
                <td className="py-3 px-2 font-medium text-[#172033]">{c.users}</td>
                <td className="py-3 px-2 text-[#475569]">{c.nextBilling}</td>
                <td className="py-3 px-1 text-right relative">
                  <button
                    onClick={() => setActiveMenu(activeMenu === idx ? null : idx)}
                    className="p-1 rounded-md text-[#94A3B8] hover:text-[#172033] hover:bg-slate-100 transition-colors"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>

                  {activeMenu === idx && (
                    <div
                      onMouseLeave={() => setActiveMenu(null)}
                      className="absolute right-0 top-8 w-36 bg-white border border-[#E5EAF2] rounded-xl shadow-xl py-1 z-30 animate-in fade-in duration-100 text-left"
                    >
                      <button
                        onClick={() => {
                          setActiveMenu(null);
                          setEditingCompany({ ...c, index: idx });
                        }}
                        className="w-full px-3 py-1.5 text-xs text-[#172033] hover:bg-[#F7F9FC] flex items-center gap-2"
                      >
                        <Edit2 className="w-3.5 h-3.5 text-blue-600" />
                        <span>Edit</span>
                      </button>
                      <NavLink
                        to="/companies"
                        className="w-full px-3 py-1.5 text-xs text-[#172033] hover:bg-[#F7F9FC] flex items-center gap-2"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                        <span>View All</span>
                      </NavLink>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Company Modal from Dashboard */}
      {editingCompany && (
        <div className="fixed inset-y-0 right-0 left-0 md:left-[76px] z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="fixed inset-y-0 right-0 left-0 md:left-[76px]" onClick={() => setEditingCompany(null)} />
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-[#E5EAF2] overflow-hidden z-10 animate-in zoom-in-95 duration-150 max-h-[85vh] flex flex-col text-left">
            <div className="px-6 py-4 border-b border-[#E5EAF2] flex items-center justify-between bg-[#F7F9FC]">
              <h3 className="text-base font-bold text-[#172033]">Edit Company Details</h3>
              <button onClick={() => setEditingCompany(null)} className="p-1.5 text-slate-400 hover:text-slate-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const updated = [...companiesList];
                updated[editingCompany.index] = { ...editingCompany };
                setCompaniesList(updated);
                setEditingCompany(null);
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

              <div className="pt-4 border-t border-[#E5EAF2] flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setEditingCompany(null)}
                  className="px-4 py-2 text-xs font-semibold text-[#8292AD]"
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
