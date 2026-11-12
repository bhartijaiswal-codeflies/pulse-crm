import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Building2,
  Search,
  MoreVertical,
  ArrowRight,
  ExternalLink,
  Edit2,
  Trash2,
  CheckCircle,
  Clock,
  AlertTriangle,
  XCircle
} from 'lucide-react';
import { CompanyAvatar } from '../common/Avatar';
import { useApp } from '../../context/AppContext';

export const RecentCompanies = () => {
  const { companies, deleteCompany, showToast } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [actionMenuId, setActionMenuId] = useState(null);
  const navigate = useNavigate();

  const filteredCompanies = companies.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.plan.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.status.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice(0, 5);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Active':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle className="w-3 h-3 text-emerald-600" />
            Active
          </span>
        );
      case 'Trial':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            <Clock className="w-3 h-3 text-blue-600" />
            Trial
          </span>
        );
      case 'Pending Payment':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <AlertTriangle className="w-3 h-3 text-amber-600" />
            Pending Payment
          </span>
        );
      case 'Cancelled':
      case 'Expired':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-red-50 text-red-700 border border-red-200">
            <XCircle className="w-3 h-3 text-red-600" />
            {status}
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-700">
            {status}
          </span>
        );
    }
  };

  const getPlanBadge = (plan) => {
    switch (plan) {
      case 'Enterprise':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Growth':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Starter':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-[#E5EAF2] shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E5EAF2]">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#172033]">Recent Companies</h3>
            <p className="text-xs text-[#8292AD]">Key tenant accounts and upcoming renewals</p>
          </div>
        </div>

        {/* Search and View All */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-[#8292AD] absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Filter companies..."
              className="pl-8 pr-3 py-1.5 text-xs bg-[#F7F9FC] border border-[#E5EAF2] rounded-xl focus:outline-none focus:border-blue-500 w-36 sm:w-48 text-[#172033]"
            />
          </div>

          <NavLink
            to="/companies"
            className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 whitespace-nowrap"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </NavLink>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto mt-3">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#E5EAF2] text-[11px] font-bold text-[#8292AD] uppercase tracking-wider">
              <th className="py-3 px-3">Company Name</th>
              <th className="py-3 px-3">Plan</th>
              <th className="py-3 px-3">Status</th>
              <th className="py-3 px-3">Users</th>
              <th className="py-3 px-3">Next Billing</th>
              <th className="py-3 px-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5EAF2] text-xs">
            {filteredCompanies.map((company) => (
              <tr
                key={company.id}
                className="hover:bg-[#F7F9FC]/80 transition-colors group"
              >
                {/* Company Name & Avatar */}
                <td className="py-3 px-3">
                  <div className="flex items-center gap-3">
                    <CompanyAvatar src={company.logo} name={company.name} className="w-9 h-9" />
                    <div className="truncate max-w-[150px] sm:max-w-[200px]">
                      <p className="font-bold text-[#172033] truncate group-hover:text-blue-600 transition-colors">
                        {company.name}
                      </p>
                      <p className="text-[11px] text-[#8292AD] truncate">{company.industry}</p>
                    </div>
                  </div>
                </td>

                {/* Plan */}
                <td className="py-3 px-3 whitespace-nowrap">
                  <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold border ${getPlanBadge(company.plan)}`}>
                    {company.plan}
                  </span>
                </td>

                {/* Status */}
                <td className="py-3 px-3 whitespace-nowrap">
                  {getStatusBadge(company.status)}
                </td>

                {/* Users */}
                <td className="py-3 px-3 whitespace-nowrap">
                  <span className="font-semibold text-[#172033]">{company.users}</span>
                  <span className="text-[#8292AD] ml-1 text-[11px]">seats</span>
                </td>

                {/* Next Billing */}
                <td className="py-3 px-3 whitespace-nowrap">
                  <span className="text-[#172033] font-medium">{company.nextBilling}</span>
                </td>

                {/* Actions Dropdown */}
                <td className="py-3 px-3 text-right whitespace-nowrap relative">
                  <button
                    onClick={() => setActionMenuId(actionMenuId === company.id ? null : company.id)}
                    className="p-1.5 rounded-lg text-[#8292AD] hover:text-[#172033] hover:bg-slate-200/60 transition-colors"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>

                  {actionMenuId === company.id && (
                    <div
                      onMouseLeave={() => setActionMenuId(null)}
                      className="absolute right-3 top-10 w-44 bg-white border border-[#E5EAF2] rounded-xl shadow-xl py-1 z-30 animate-in fade-in zoom-in-95 duration-100 text-left"
                    >
                      <button
                        onClick={() => {
                          setActionMenuId(null);
                          navigate('/companies');
                        }}
                        className="w-full px-3 py-1.5 text-xs text-[#172033] hover:bg-[#F7F9FC] flex items-center gap-2"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-blue-600" />
                        <span>View Profile</span>
                      </button>
                      <button
                        onClick={() => {
                          setActionMenuId(null);
                          showToast(`Editing ${company.name}`, 'info');
                        }}
                        className="w-full px-3 py-1.5 text-xs text-[#172033] hover:bg-[#F7F9FC] flex items-center gap-2"
                      >
                        <Edit2 className="w-3.5 h-3.5 text-slate-500" />
                        <span>Edit Details</span>
                      </button>
                      <button
                        onClick={() => {
                          deleteCompany(company.id);
                          setActionMenuId(null);
                        }}
                        className="w-full px-3 py-1.5 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete Company</span>
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

