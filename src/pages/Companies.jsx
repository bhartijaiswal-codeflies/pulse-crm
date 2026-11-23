import React, { useState } from 'react';
import {
  Building2,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Mail,
  Phone,
  MapPin,
  Users,
  Calendar,
  ExternalLink,
  Edit2,
  Trash2,
  CheckCircle,
  Clock,
  AlertTriangle,
  XCircle,
  Eye,
  X,
  Download,
  Video,
  Copy,
  Check,
  Sparkles,
  ChevronDown,
  RotateCw,
  Layers,
  Briefcase
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ImageUploadOption } from '../components/common/ImageUploadOption';
import { DeleteConfirmModal } from '../components/common/DeleteConfirmModal';

export const Companies = () => {
  const {
    companies,
    deleteCompany,
    updateCompany,
    setIsAddCompanyOpen,
    showToast
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [planFilter, setPlanFilter] = useState('All');
  const [industryFilter, setIndustryFilter] = useState('All');
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [editingCompany, setEditingCompany] = useState(null);
  const [videoCallCompany, setVideoCallCompany] = useState(null);
  const [deletingCompany, setDeletingCompany] = useState(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [actionMenuId, setActionMenuId] = useState(null);

  const activeCount = companies.filter(c => c.status === 'Active').length;
  const trialCount = companies.filter(c => c.status === 'Trial').length;
  const pendingCount = companies.filter(c => c.status === 'Pending Payment').length;
  const cancelledCount = companies.filter(c => c.status === 'Cancelled').length;

  const handleClearFilters = () => {
    setSearchTerm('');
    setStatusFilter('All');
    setPlanFilter('All');
    setIndustryFilter('All');
  };

  const handleRefresh = () => {
    showToast('Company records refreshed', 'info');
  };

  const handleStartVideoCall = (company) => {
    setVideoCallCompany(company);
  };

  const handleCopyMeetingLink = (url) => {
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    showToast('Meeting invite link copied to clipboard!', 'info');
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Filter logic
  const filtered = companies.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.contactPerson && c.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'All' || c.status === statusFilter;
    const matchesPlan = planFilter === 'All' || c.plan === planFilter;
    const matchesIndustry = industryFilter === 'All' || c.industry.toLowerCase().includes(industryFilter.toLowerCase());
    return matchesSearch && matchesStatus && matchesPlan && matchesIndustry;
  });

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
            14-Day Trial
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

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editingCompany) return;
    updateCompany(editingCompany.id, editingCompany);
    setEditingCompany(null);
  };

  const exportToCSV = () => {
    const headers = 'ID,Company,Contact,Email,Plan,Status,Seats,MRR,NextBilling\n';
    const rows = filtered.map(c =>
      `"${c.id}","${c.name}","${c.contactPerson}","${c.email}","${c.plan}","${c.status}",${c.users},"${c.mrr}","${c.nextBilling}"`
    ).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Pulse_Companies.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Companies data exported to CSV successfully!');
  };

  return (
    <div className="space-y-6 w-full max-w-full min-w-0">
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <h1 className="text-2xl font-bold text-[#172033] dark:text-white tracking-tight">
              Companies
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#EFF6FF] text-[#2563EB] dark:bg-blue-950/60 dark:text-blue-400 border border-blue-100 dark:border-blue-900/40">
              {companies.length} Total Tenants
            </span>
          </div>
          <p className="text-xs text-[#8292AD] dark:text-slate-400 mt-1 font-normal">
            Manage customer organizations, seat allocations, subscription tiers, and billing states.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <button
            type="button"
            onClick={exportToCSV}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#172033] dark:text-white bg-white dark:bg-[#0D152D] hover:bg-slate-50 dark:hover:bg-[#121D3D] border border-[#E5EAF2] dark:border-[#1E2D54] rounded-xl shadow-2xs transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-[#64748B] dark:text-slate-400" />
            <span>Export CSV</span>
          </button>
          <button
            type="button"
            onClick={() => setIsAddCompanyOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#2563EB] hover:bg-blue-700 rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Company</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        {/* Card 1: Total Registered */}
        <div className="bg-[#F8FAFF] dark:bg-[#0D152D] p-4 rounded-2xl border border-[#E2EDFF] dark:border-[#1E2D54] shadow-xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-[#2563EB] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#172033] dark:text-white leading-tight">
              {companies.length}
            </h3>
            <p className="text-xs text-[#64748B] dark:text-slate-400 font-normal mt-0.5 leading-tight">
              Total Registered
            </p>
          </div>
        </div>

        {/* Card 2: Active Paying Tenants */}
        <div className="bg-[#F6FDF9] dark:bg-[#0D152D] p-4 rounded-2xl border border-[#DCFCE7] dark:border-[#1E2D54] shadow-xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-[#10B981] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
            <CheckCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#172033] dark:text-white leading-tight">
              {activeCount}
            </h3>
            <p className="text-xs text-[#64748B] dark:text-slate-400 font-normal mt-0.5 leading-tight">
              Active Paying Tenants
            </p>
          </div>
        </div>

        {/* Card 3: Active Trials */}
        <div className="bg-[#F0F9FF] dark:bg-[#0D152D] p-4 rounded-2xl border border-[#BAE6FD]/80 dark:border-[#1E2D54] shadow-xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-[#0284C7] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#172033] dark:text-white leading-tight">
              {trialCount}
            </h3>
            <p className="text-xs text-[#64748B] dark:text-slate-400 font-normal mt-0.5 leading-tight">
              Active Trials
            </p>
          </div>
        </div>

        {/* Card 4: Cancelled & Expired */}
        <div className="bg-[#FEF2F2] dark:bg-[#0D152D] p-4 rounded-2xl border border-[#FEE2E2] dark:border-[#1E2D54] shadow-xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-[#DC2626] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
            <XCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#172033] dark:text-white leading-tight">
              {cancelledCount + pendingCount}
            </h3>
            <p className="text-xs text-[#64748B] dark:text-slate-400 font-normal mt-0.5 leading-tight">
              Cancelled & Expired
            </p>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-[#0D152D] p-3 sm:p-3.5 rounded-2xl border border-[#E5EAF2] dark:border-[#1A2548] shadow-xs flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-3">
        {/* Left: Filters group */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 flex-1 min-w-0">
          {/* 1. Primary Dropdown Pill: Status with count */}
          <div className="relative inline-flex items-center w-full sm:w-auto">
            <Building2 className="w-4 h-4 text-blue-600 dark:text-blue-400 absolute left-3 pointer-events-none" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="select-primary-blue w-full sm:w-auto pl-9 pr-8 py-2 text-xs font-semibold bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 rounded-xl text-blue-600 dark:text-blue-400 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all truncate"
            >
              <option value="All">All Companies ({companies.length})</option>
              <option value="Active">Active ({activeCount})</option>
              <option value="Trial">Trial ({trialCount})</option>
              <option value="Pending Payment">Pending ({pendingCount})</option>
              <option value="Cancelled">Cancelled ({cancelledCount})</option>
            </select>
          </div>

          {/* 2. Search Input */}
          <div className="relative w-full sm:w-auto sm:flex-1 sm:min-w-[180px] sm:max-w-xs">
            <Search className="w-4 h-4 text-[#8292AD] dark:text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search companies, industry, contact..."
              className="w-full pl-9 pr-8 py-2 text-xs bg-white dark:bg-[#0A1128] border border-[#E5EAF2] dark:border-[#1E2D54] rounded-xl focus:outline-none focus:border-blue-500 text-[#172033] dark:text-white placeholder:text-[#8292AD] dark:placeholder:text-slate-500 transition-colors"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                title="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* 3 & 4. Secondary Dropdowns in a 2-column grid on mobile, inline on tablet/desktop */}
          <div className="grid grid-cols-2 gap-2 w-full min-w-0 sm:contents">
            {/* Second Dropdown: Plan Tier */}
            <div className="relative w-full min-w-0 sm:w-auto">
              <Layers className="w-4 h-4 text-blue-600 dark:text-blue-400 absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <select
                value={planFilter}
                onChange={(e) => setPlanFilter(e.target.value)}
                className="w-full min-w-0 sm:w-auto pl-8 sm:pl-9 pr-8 py-2 text-xs font-medium bg-white dark:bg-[#0A1128] border border-[#E5EAF2] dark:border-[#1E2D54] rounded-xl text-[#172033] dark:text-white cursor-pointer focus:outline-none focus:border-blue-500 transition-colors truncate"
              >
                <option value="All">All Plans</option>
                <option value="Starter">Starter</option>
                <option value="Growth">Growth</option>
                <option value="Enterprise">Enterprise</option>
              </select>
            </div>

            {/* Third Dropdown: Industry */}
            <div className="relative w-full min-w-0 sm:w-auto">
              <Briefcase className="w-4 h-4 text-blue-600 dark:text-blue-400 absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <select
                value={industryFilter}
                onChange={(e) => setIndustryFilter(e.target.value)}
                className="w-full min-w-0 sm:w-auto pl-8 sm:pl-9 pr-8 py-2 text-xs font-medium bg-white dark:bg-[#0A1128] border border-[#E5EAF2] dark:border-[#1E2D54] rounded-xl text-[#172033] dark:text-white cursor-pointer focus:outline-none focus:border-blue-500 transition-colors truncate"
              >
                <option value="All">All Industries</option>
                <option value="Enterprise Software">Enterprise Software</option>
                <option value="Fintech">Fintech</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Cybersecurity">Cybersecurity</option>
                <option value="Cloud Infrastructure">Cloud Infrastructure</option>
              </select>
            </div>
          </div>
        </div>

        {/* Right: Count, Reset, Refresh, and Export */}
        <div className="flex items-center justify-between sm:justify-end gap-2.5 sm:gap-3 flex-shrink-0 pt-2 xl:pt-0 border-t xl:border-t-0 border-[#E5EAF2] dark:border-[#1A2548]">
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#8292AD] dark:text-slate-400 whitespace-nowrap">
              Filtered: {filtered.length} Shown of {companies.length}
            </span>
            {(searchTerm || statusFilter !== 'All' || planFilter !== 'All' || industryFilter !== 'All') && (
              <button
                type="button"
                onClick={handleClearFilters}
                className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
              >
                Reset
              </button>
            )}
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={handleRefresh}
              className="p-1.5 rounded-lg text-[#8292AD] hover:text-[#172033] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#1E2D54] transition-colors cursor-pointer"
              title="Refresh list"
              aria-label="Refresh"
            >
              <RotateCw className="w-3.5 h-3.5" />
            </button>

            {/* Export CSV */}
            <button
              type="button"
              onClick={exportToCSV}
              className="px-3 py-1.5 text-xs bg-white dark:bg-[#121D3D] hover:bg-slate-50 dark:hover:bg-[#1A2548] border border-[#E5EAF2] dark:border-[#1E2D54] rounded-xl text-[#172033] dark:text-white font-semibold flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer whitespace-nowrap"
              title="Export filtered companies as CSV"
            >
              <Download className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
              <span className="hidden sm:inline">Export CSV</span>
            </button>
          </div>
        </div>
      </div>

      {/* Companies Data Table */}
      <div className="bg-white dark:bg-[#0D152D] rounded-2xl border border-[#E5EAF2] dark:border-[#1A2548] shadow-[0_1px_3px_rgba(0,0,0,0.04)] overflow-hidden w-full max-w-full">
        <div className="overflow-x-auto no-scrollbar w-full">
          <table className="w-full min-w-[500px] text-left border-collapse">
            <thead>
              <tr className="bg-[#F7F9FC] dark:bg-[#0A1128] border-b border-[#E5EAF2] dark:border-[#1A2548] text-[11px] font-bold text-[#8292AD] dark:text-slate-400 uppercase tracking-wider">
                <th className="py-3.5 px-2 sm:px-3 lg:px-4">Company</th>
                <th className="py-3.5 px-3 lg:px-4 hidden lg:table-cell">Contact</th>
                <th className="py-3.5 px-2 sm:px-3 lg:px-4">Plan & MRR</th>
                <th className="py-3.5 px-2 sm:px-3 lg:px-4">Status</th>
                <th className="py-3.5 px-2 lg:px-4 text-center hidden lg:table-cell">Seats</th>
                <th className="py-3.5 px-3 lg:px-4 hidden xl:table-cell">Next Billing</th>
                <th className="py-3.5 px-1 sm:px-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5EAF2] dark:divide-[#1A2548] text-xs">
              {filtered.map((company) => (
                <tr
                  key={company.id}
                  className="hover:bg-[#F7F9FC]/80 dark:hover:bg-[#121D3D]/60 transition-colors group cursor-pointer"
                  onClick={() => setSelectedCompany(company)}
                >
                  {/* Company */}
                  <td className="py-3.5 px-2 sm:px-3 lg:px-4">
                    <div className="flex items-center gap-2 sm:gap-2.5">
                      <img
                        src={company.logo}
                        alt={company.name}
                        className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-xl object-cover border border-[#E5EAF2] dark:border-[#1E2D54] flex-shrink-0"
                      />
                      <div>
                        <p className="font-bold text-[#172033] dark:text-white group-hover:text-blue-600 transition-colors">
                          {company.name}
                        </p>
                        <p className="text-[11px] text-[#8292AD] dark:text-slate-400 flex items-center gap-1">
                          <MapPin className="w-3 h-3 flex-shrink-0" />
                          <span>{company.location || 'India'}</span>
                          <span className="lg:hidden text-[#64748B] dark:text-slate-400 font-medium">• {company.contactPerson}</span>
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Contact - Desktop */}
                  <td className="py-3.5 px-3 lg:px-4 hidden lg:table-cell">
                    <p className="font-semibold text-[#172033] dark:text-white">{company.contactPerson}</p>
                    <p className="text-[11px] text-[#8292AD] dark:text-slate-400">{company.email}</p>
                  </td>

                  {/* Plan & MRR */}
                  <td className="py-3.5 px-2 sm:px-3 lg:px-4 whitespace-nowrap">
                    <span className="font-bold text-[#172033] dark:text-white">{company.mrr}</span>
                    <span className="block text-[11px] text-[#8292AD] dark:text-slate-400">
                      {company.plan} Tier <span className="lg:hidden text-[#64748B] dark:text-slate-400 font-medium">• {company.users} seats</span>
                    </span>
                  </td>

                  {/* Status */}
                  <td className="py-3.5 px-2 sm:px-3 lg:px-4 whitespace-nowrap">
                    {getStatusBadge(company.status)}
                  </td>

                  {/* Seats - Desktop */}
                  <td className="py-3.5 px-2 lg:px-4 whitespace-nowrap text-center hidden lg:table-cell">
                    <span className="font-semibold text-[#172033] dark:text-white">{company.users}</span>
                    <span className="text-[#8292AD] dark:text-slate-400 ml-1 text-[11px]">users</span>
                  </td>

                  {/* Next Billing - XL screens */}
                  <td className="py-3.5 px-3 lg:px-4 whitespace-nowrap text-[#8292AD] dark:text-slate-400 hidden xl:table-cell">
                    {company.nextBilling}
                  </td>

                  {/* Actions Column matching reference: Eye (Blue), Edit (Green), Video (Purple), Delete (Red) */}
                  <td
                    className="py-2.5 px-1 sm:px-2 text-center whitespace-nowrap"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center justify-center gap-1 sm:gap-1 lg:gap-1.5">
                      {/* View Details */}
                      <button
                        type="button"
                        onClick={() => setSelectedCompany(company)}
                        className="w-7 h-7 lg:w-8 lg:h-8 rounded-full border border-[#93C5FD] dark:border-blue-500/40 bg-[#EFF6FF]/70 dark:bg-blue-950/40 text-[#2563EB] dark:text-blue-400 flex items-center justify-center hover:bg-[#DBEAFE] dark:hover:bg-blue-900/60 hover:border-[#3B82F6] hover:scale-105 transition-all shadow-xs cursor-pointer flex-shrink-0"
                        title="View Details"
                      >
                        <Eye className="w-3.5 h-3.5 lg:w-4 lg:h-4 stroke-[1.8]" />
                      </button>

                      {/* Edit Company */}
                      <button
                        type="button"
                        onClick={() => setEditingCompany(company)}
                        className="w-7 h-7 lg:w-8 lg:h-8 rounded-full border border-[#86EFAC] dark:border-emerald-500/40 bg-[#F0FDF4]/70 dark:bg-emerald-950/40 text-[#16A34A] dark:text-emerald-400 flex items-center justify-center hover:bg-[#DCFCE7] dark:hover:bg-emerald-900/60 hover:border-[#22C55E] hover:scale-105 transition-all shadow-xs cursor-pointer flex-shrink-0"
                        title="Edit Company"
                      >
                        <Edit2 className="w-3.5 h-3.5 lg:w-4 lg:h-4 stroke-[1.8]" />
                      </button>

                      {/* Video Call */}
                      <button
                        type="button"
                        onClick={() => handleStartVideoCall(company)}
                        className="w-7 h-7 lg:w-8 lg:h-8 rounded-full border border-[#C7D2FE] dark:border-indigo-500/40 bg-[#EEF2FF]/70 dark:bg-indigo-950/40 text-[#4F46E5] dark:text-indigo-400 flex items-center justify-center hover:bg-[#E0E7FF] dark:hover:bg-indigo-900/60 hover:border-[#6366F1] hover:scale-105 transition-all shadow-xs cursor-pointer flex-shrink-0"
                        title="Start Video Meeting"
                      >
                        <Video className="w-3.5 h-3.5 lg:w-4 lg:h-4 stroke-[1.8]" />
                      </button>

                      {/* Delete Company */}
                      <button
                        type="button"
                        onClick={() => setDeletingCompany(company)}
                        className="w-7 h-7 lg:w-8 lg:h-8 rounded-full border border-[#FECDD3] dark:border-rose-500/40 bg-[#FFF1F2]/70 dark:bg-rose-950/40 text-[#E11D48] dark:text-rose-400 flex items-center justify-center hover:bg-[#FFE4E6] dark:hover:bg-rose-900/60 hover:border-[#F43F5E] hover:scale-105 transition-all shadow-xs cursor-pointer flex-shrink-0"
                        title="Delete Company"
                      >
                        <Trash2 className="w-3.5 h-3.5 lg:w-4 lg:h-4 stroke-[1.8]" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer info */}
        <div className="p-4 bg-[#F7F9FC] dark:bg-[#0A1128] border-t border-[#E5EAF2] dark:border-[#1A2548] flex items-center justify-between text-xs text-[#8292AD] dark:text-slate-400">
          <span>Showing {filtered.length} of {companies.length} companies</span>
          <span>Data synced live</span>
        </div>
      </div>

      {/* Company Details Modal / Drawer */}
      {selectedCompany && (
        <div className="fixed top-16 bottom-0 right-0 left-0 md:left-[76px] z-40 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div
            className="absolute inset-0"
            onClick={() => setSelectedCompany(null)}
          />
          <div className="relative w-full max-w-xl bg-white dark:bg-[#0D152D] rounded-2xl shadow-2xl border border-[#E5EAF2] dark:border-[#1A2548] overflow-hidden z-10 animate-in zoom-in-95 duration-150 max-h-[90vh] sm:max-h-[85vh] flex flex-col">
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
                onClick={() => setSelectedCompany(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 sm:p-6 space-y-4 sm:space-y-5 overflow-y-auto">
              {/* Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
                <div className="bg-[#F7F9FC] dark:bg-[#0A1128] p-3 rounded-xl border border-[#E5EAF2] dark:border-[#1A2548]">
                  <p className="text-[11px] text-[#8292AD] dark:text-slate-400 font-semibold">Current Plan</p>
                  <p className="text-sm font-bold text-[#172033] dark:text-white mt-0.5">{selectedCompany.plan}</p>
                </div>
                <div className="bg-[#F7F9FC] dark:bg-[#0A1128] p-3 rounded-xl border border-[#E5EAF2] dark:border-[#1A2548]">
                  <p className="text-[11px] text-[#8292AD] dark:text-slate-400 font-semibold">Monthly Value</p>
                  <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">{selectedCompany.mrr}</p>
                </div>
                <div className="bg-[#F7F9FC] dark:bg-[#0A1128] p-3 rounded-xl border border-[#E5EAF2] dark:border-[#1A2548]">
                  <p className="text-[11px] text-[#8292AD] dark:text-slate-400 font-semibold">Status</p>
                  <div className="mt-1">{getStatusBadge(selectedCompany.status)}</div>
                </div>
              </div>

              {/* Contact information */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-bold text-[#172033] dark:text-white uppercase tracking-wider">
                  Contact & Organization Info
                </h4>
                <div className="bg-white dark:bg-[#0A1128] border border-[#E5EAF2] dark:border-[#1A2548] rounded-xl p-3 sm:p-3.5 space-y-2 text-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-0.5 sm:gap-2">
                    <span className="text-[#8292AD] dark:text-slate-400 flex items-center gap-2">
                      <Users className="w-3.5 h-3.5" /> Primary Contact
                    </span>
                    <span className="font-semibold text-[#172033] dark:text-white">{selectedCompany.contactPerson}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-0.5 sm:gap-2">
                    <span className="text-[#8292AD] dark:text-slate-400 flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5" /> Work Email
                    </span>
                    <span className="font-semibold text-blue-600 dark:text-blue-400 break-all">{selectedCompany.email}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-0.5 sm:gap-2">
                    <span className="text-[#8292AD] dark:text-slate-400 flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5" /> Phone Number
                    </span>
                    <span className="font-semibold text-[#172033] dark:text-white">{selectedCompany.phone || '+91 98765 00000'}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-0.5 sm:gap-2">
                    <span className="text-[#8292AD] dark:text-slate-400 flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5" /> Headquarters
                    </span>
                    <span className="font-semibold text-[#172033] dark:text-white">{selectedCompany.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#8292AD] dark:text-slate-400 flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5" /> Next Billing Date
                    </span>
                    <span className="font-semibold text-[#172033] dark:text-white">{selectedCompany.nextBilling}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 py-3.5 border-t border-[#E5EAF2] dark:border-[#1A2548] bg-[#F7F9FC] dark:bg-[#0A1128] flex items-center justify-end gap-2.5">
              <button
                onClick={() => setSelectedCompany(null)}
                className="px-4 py-2 text-xs font-semibold text-[#8292AD] dark:text-slate-400 hover:text-[#172033] dark:hover:text-white"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setEditingCompany(selectedCompany);
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

      {/* Edit Company Modal */}
      {editingCompany && (
        <div className="fixed top-16 bottom-0 right-0 left-0 md:left-[76px] z-40 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div
            className="absolute inset-0"
            onClick={() => setEditingCompany(null)}
          />
          <div className="relative w-full max-w-lg bg-white dark:bg-[#0D152D] rounded-2xl shadow-2xl border border-[#E5EAF2] dark:border-[#1A2548] overflow-hidden z-10 animate-in zoom-in-95 duration-150 max-h-[90vh] flex flex-col">
            <div className="px-4 sm:px-6 py-3.5 sm:py-4 border-b border-[#E5EAF2] dark:border-[#1A2548] flex items-center justify-between bg-[#F7F9FC] dark:bg-[#0A1128]">
              <h3 className="text-sm sm:text-base font-bold text-[#172033] dark:text-white">Edit Company Details</h3>
              <button onClick={() => setEditingCompany(null)} className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="p-4 sm:p-6 space-y-4 overflow-y-auto">
              {/* Image / Logo Upload Option */}
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
                    <option value="Starter">Starter</option>
                    <option value="Growth">Growth</option>
                    <option value="Enterprise">Enterprise</option>
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
                    <option value="Pending Payment">Pending Payment</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#172033] dark:text-white mb-1">User Seats</label>
                  <input
                    type="number"
                    value={editingCompany.users}
                    onChange={(e) => setEditingCompany({ ...editingCompany, users: parseInt(e.target.value) || 1 })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5EAF2] dark:border-[#1E2D54] bg-white dark:bg-[#0A1128] text-[#172033] dark:text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#172033] dark:text-white mb-1">Monthly Billing</label>
                  <input
                    type="text"
                    value={editingCompany.mrr}
                    onChange={(e) => setEditingCompany({ ...editingCompany, mrr: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5EAF2] dark:border-[#1E2D54] bg-white dark:bg-[#0A1128] text-[#172033] dark:text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-[#E5EAF2] dark:border-[#1A2548] flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setEditingCompany(null)}
                  className="px-4 py-2 text-xs font-semibold text-[#8292AD] dark:text-slate-400 hover:text-[#172033] dark:hover:text-white"
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
        <div className="fixed top-16 bottom-0 right-0 left-0 md:left-[76px] z-40 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div
            className="absolute inset-0"
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
                className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
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
                    {videoCallCompany.name.charAt(0)}
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
                    className="px-3 py-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800/60 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
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
                  className="w-full sm:w-auto py-2.5 px-4 text-xs font-semibold text-[#8292AD] dark:text-slate-400 hover:text-[#172033] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer text-center"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={!!deletingCompany}
        title="Delete Company Account"
        itemName={deletingCompany?.name}
        itemSubtitle={`${deletingCompany?.industry || 'Enterprise SaaS'} • ${deletingCompany?.plan || 'Pro'} Plan`}
        itemImage={deletingCompany?.logo}
        warningMessage="Are you sure you want to delete this company? All company subscriptions, tenant settings, and associated data will be permanently removed."
        confirmText="Yes, Delete Company"
        onConfirm={() => {
          if (deletingCompany) {
            deleteCompany(deletingCompany.id);
            setDeletingCompany(null);
          }
        }}
        onClose={() => setDeletingCompany(null)}
      />
    </div>
  );
};

