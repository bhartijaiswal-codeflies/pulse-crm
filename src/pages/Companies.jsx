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
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ImageUploadOption } from '../components/common/ImageUploadOption';

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
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [editingCompany, setEditingCompany] = useState(null);
  const [videoCallCompany, setVideoCallCompany] = useState(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [actionMenuId, setActionMenuId] = useState(null);

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
      c.contactPerson.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || c.status === statusFilter;
    const matchesPlan = planFilter === 'All' || c.plan === planFilter;
    return matchesSearch && matchesStatus && matchesPlan;
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
    <div className="space-y-6">
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#172033] tracking-tight">
            Companies
          </h1>
          <p className="text-xs md:text-sm text-[#8292AD] mt-1 font-medium">
            Manage client tenant organizations, subscriptions, and access
          </p>
        </div>

        <button
          onClick={() => setIsAddCompanyOpen(true)}
          className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-[#2563EB] hover:bg-blue-700 rounded-xl shadow-md shadow-blue-500/20 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Company</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-[#E5EAF2] shadow-xs">
          <p className="text-xs font-semibold text-[#8292AD]">Total Tenants</p>
          <p className="text-2xl font-black text-[#172033] mt-1">{companies.length}</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-[#E5EAF2] shadow-xs">
          <p className="text-xs font-semibold text-[#8292AD]">Active Accounts</p>
          <p className="text-2xl font-black text-emerald-600 mt-1">
            {companies.filter(c => c.status === 'Active').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-[#E5EAF2] shadow-xs">
          <p className="text-xs font-semibold text-[#8292AD]">On Trial</p>
          <p className="text-2xl font-black text-blue-600 mt-1">
            {companies.filter(c => c.status === 'Trial').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-[#E5EAF2] shadow-xs">
          <p className="text-xs font-semibold text-[#8292AD]">Total User Seats</p>
          <p className="text-2xl font-black text-purple-600 mt-1">
            {companies.reduce((sum, c) => sum + (c.users || 0), 0)}
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#E5EAF2] shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-[#8292AD] absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, industry, contact..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-[#F7F9FC] border border-[#E5EAF2] rounded-xl focus:outline-none focus:border-blue-500 text-[#172033]"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-xs bg-[#F7F9FC] border border-[#E5EAF2] rounded-xl text-[#172033] focus:outline-none focus:border-blue-500 font-medium"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Trial">Trial</option>
            <option value="Pending Payment">Pending Payment</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          {/* Plan Filter */}
          <select
            value={planFilter}
            onChange={(e) => setPlanFilter(e.target.value)}
            className="px-3 py-2 text-xs bg-[#F7F9FC] border border-[#E5EAF2] rounded-xl text-[#172033] focus:outline-none focus:border-blue-500 font-medium"
          >
            <option value="All">All Plans</option>
            <option value="Starter">Starter</option>
            <option value="Growth">Growth</option>
            <option value="Enterprise">Enterprise</option>
          </select>

          {/* Export CSV Button */}
          <button
            type="button"
            onClick={exportToCSV}
            className="px-3 py-2 text-xs bg-white hover:bg-slate-50 border border-[#E5EAF2] rounded-xl text-[#172033] font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
            title="Export filtered companies as CSV"
          >
            <Download className="w-3.5 h-3.5 text-blue-600" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Companies Data Table */}
      <div className="bg-white rounded-2xl border border-[#E5EAF2] shadow-[0_1px_3px_rgba(0,0,0,0.04)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F7F9FC] border-b border-[#E5EAF2] text-[11px] font-bold text-[#8292AD] uppercase tracking-wider">
                <th className="py-3.5 px-4">Company</th>
                <th className="py-3.5 px-4">Contact</th>
                <th className="py-3.5 px-4">Plan & MRR</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Seats</th>
                <th className="py-3.5 px-4">Next Billing</th>
                <th className="py-3.5 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5EAF2] text-xs">
              {filtered.map((company) => (
                <tr
                  key={company.id}
                  className="hover:bg-[#F7F9FC]/80 transition-colors group cursor-pointer"
                  onClick={() => setSelectedCompany(company)}
                >
                  {/* Company */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={company.logo}
                        alt={company.name}
                        className="w-10 h-10 rounded-xl object-cover border border-[#E5EAF2] flex-shrink-0"
                      />
                      <div>
                        <p className="font-bold text-[#172033] group-hover:text-blue-600 transition-colors">
                          {company.name}
                        </p>
                        <p className="text-[11px] text-[#8292AD] flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {company.location || 'India'}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Contact */}
                  <td className="py-3.5 px-4">
                    <p className="font-semibold text-[#172033]">{company.contactPerson}</p>
                    <p className="text-[11px] text-[#8292AD]">{company.email}</p>
                  </td>

                  {/* Plan & MRR */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="font-bold text-[#172033]">{company.mrr}</span>
                    <span className="block text-[11px] text-[#8292AD]">{company.plan} Tier</span>
                  </td>

                  {/* Status */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    {getStatusBadge(company.status)}
                  </td>

                  {/* Seats */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="font-semibold text-[#172033]">{company.users}</span>
                    <span className="text-[#8292AD] ml-1 text-[11px]">users</span>
                  </td>

                  {/* Next Billing */}
                  <td className="py-3.5 px-4 whitespace-nowrap text-[#8292AD]">
                    {company.nextBilling}
                  </td>

                  {/* Actions Column matching reference: Eye (Blue), Edit (Green), Video (Purple), Delete (Red) */}
                  <td
                    className="py-3.5 px-4 text-center whitespace-nowrap"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center justify-center gap-2">
                      {/* View Details */}
                      <button
                        type="button"
                        onClick={() => setSelectedCompany(company)}
                        className="w-8 h-8 rounded-full border border-[#93C5FD] bg-[#EFF6FF]/70 text-[#2563EB] flex items-center justify-center hover:bg-[#DBEAFE] hover:border-[#3B82F6] hover:scale-105 transition-all shadow-xs cursor-pointer"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4 stroke-[1.8]" />
                      </button>

                      {/* Edit Company */}
                      <button
                        type="button"
                        onClick={() => setEditingCompany(company)}
                        className="w-8 h-8 rounded-full border border-[#86EFAC] bg-[#F0FDF4]/70 text-[#16A34A] flex items-center justify-center hover:bg-[#DCFCE7] hover:border-[#22C55E] hover:scale-105 transition-all shadow-xs cursor-pointer"
                        title="Edit Company"
                      >
                        <Edit2 className="w-4 h-4 stroke-[1.8]" />
                      </button>

                      {/* Video Call */}
                      <button
                        type="button"
                        onClick={() => handleStartVideoCall(company)}
                        className="w-8 h-8 rounded-full border border-[#C7D2FE] bg-[#EEF2FF]/70 text-[#4F46E5] flex items-center justify-center hover:bg-[#E0E7FF] hover:border-[#6366F1] hover:scale-105 transition-all shadow-xs cursor-pointer"
                        title="Start Video Meeting"
                      >
                        <Video className="w-4 h-4 stroke-[1.8]" />
                      </button>

                      {/* Delete Company */}
                      <button
                        type="button"
                        onClick={() => {
                          deleteCompany(company.id);
                          showToast(`${company.name} deleted successfully`, 'info');
                        }}
                        className="w-8 h-8 rounded-full border border-[#FECDD3] bg-[#FFF1F2]/70 text-[#E11D48] flex items-center justify-center hover:bg-[#FFE4E6] hover:border-[#F43F5E] hover:scale-105 transition-all shadow-xs cursor-pointer"
                        title="Delete Company"
                      >
                        <Trash2 className="w-4 h-4 stroke-[1.8]" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer info */}
        <div className="p-4 bg-[#F7F9FC] border-t border-[#E5EAF2] flex items-center justify-between text-xs text-[#8292AD]">
          <span>Showing {filtered.length} of {companies.length} companies</span>
          <span>Data synced live</span>
        </div>
      </div>

      {/* Company Details Modal / Drawer */}
      {selectedCompany && (
        <div className="fixed top-10 bottom-0 right-0 left-0 md:left-[76px] z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div
            className="fixed top-10 bottom-0 right-0 left-0 md:left-[76px]"
            onClick={() => setSelectedCompany(null)}
          />
          <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-[#E5EAF2] overflow-hidden z-10 animate-in zoom-in-95 duration-150 max-h-[85vh] flex flex-col">
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
                onClick={() => setSelectedCompany(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-5 overflow-y-auto">
              {/* Highlights */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-[#F7F9FC] p-3 rounded-xl border border-[#E5EAF2]">
                  <p className="text-[11px] text-[#8292AD] font-semibold">Current Plan</p>
                  <p className="text-sm font-bold text-[#172033] mt-0.5">{selectedCompany.plan}</p>
                </div>
                <div className="bg-[#F7F9FC] p-3 rounded-xl border border-[#E5EAF2]">
                  <p className="text-[11px] text-[#8292AD] font-semibold">Monthly Value</p>
                  <p className="text-sm font-bold text-emerald-600 mt-0.5">{selectedCompany.mrr}</p>
                </div>
                <div className="bg-[#F7F9FC] p-3 rounded-xl border border-[#E5EAF2]">
                  <p className="text-[11px] text-[#8292AD] font-semibold">Status</p>
                  <div className="mt-1">{getStatusBadge(selectedCompany.status)}</div>
                </div>
              </div>

              {/* Contact information */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-bold text-[#172033] uppercase tracking-wider">
                  Contact & Organization Info
                </h4>
                <div className="bg-white border border-[#E5EAF2] rounded-xl p-3.5 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[#8292AD] flex items-center gap-2">
                      <Users className="w-3.5 h-3.5" /> Primary Contact
                    </span>
                    <span className="font-semibold text-[#172033]">{selectedCompany.contactPerson}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#8292AD] flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5" /> Work Email
                    </span>
                    <span className="font-semibold text-blue-600">{selectedCompany.email}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#8292AD] flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5" /> Phone Number
                    </span>
                    <span className="font-semibold text-[#172033]">{selectedCompany.phone || '+91 98765 00000'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#8292AD] flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5" /> Headquarters
                    </span>
                    <span className="font-semibold text-[#172033]">{selectedCompany.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#8292AD] flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5" /> Next Billing Date
                    </span>
                    <span className="font-semibold text-[#172033]">{selectedCompany.nextBilling}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 py-3.5 border-t border-[#E5EAF2] bg-[#F7F9FC] flex items-center justify-end gap-2.5">
              <button
                onClick={() => setSelectedCompany(null)}
                className="px-4 py-2 text-xs font-semibold text-[#8292AD] hover:text-[#172033]"
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
        <div className="fixed top-10 bottom-0 right-0 left-0 md:left-[76px] z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div
            className="fixed top-10 bottom-0 right-0 left-0 md:left-[76px]"
            onClick={() => setEditingCompany(null)}
          />
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-[#E5EAF2] overflow-hidden z-10 animate-in zoom-in-95 duration-150 max-h-[90vh] flex flex-col">
            <div className="px-6 py-4 border-b border-[#E5EAF2] flex items-center justify-between bg-[#F7F9FC]">
              <h3 className="text-base font-bold text-[#172033]">Edit Company Details</h3>
              <button onClick={() => setEditingCompany(null)} className="p-1.5 text-slate-400 hover:text-slate-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="p-6 space-y-4 overflow-y-auto">
              {/* Image / Logo Upload Option */}
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
                    <option value="Starter">Starter</option>
                    <option value="Growth">Growth</option>
                    <option value="Enterprise">Enterprise</option>
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
                    value={editingCompany.users}
                    onChange={(e) => setEditingCompany({ ...editingCompany, users: parseInt(e.target.value) || 1 })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5EAF2] focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#172033] mb-1">Monthly Billing</label>
                  <input
                    type="text"
                    value={editingCompany.mrr}
                    onChange={(e) => setEditingCompany({ ...editingCompany, mrr: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5EAF2] focus:border-blue-500 focus:outline-none"
                  />
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

      {/* Instant Video Meeting Modal */}
      {videoCallCompany && (
        <div className="fixed top-10 bottom-0 right-0 left-0 md:left-[76px] z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div
            className="fixed top-10 bottom-0 right-0 left-0 md:left-[76px]"
            onClick={() => setVideoCallCompany(null)}
          />
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-[#E5EAF2] overflow-hidden z-10 animate-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="px-6 py-4 border-b border-[#E5EAF2] flex items-center justify-between bg-gradient-to-r from-indigo-50/60 to-purple-50/60">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md">
                  <Video className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#172033]">Instant Video Meeting</h3>
                  <p className="text-xs text-[#8292AD]">{videoCallCompany.name}</p>
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
            <div className="p-6 space-y-4">
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
                  <p className="text-xs text-[#8292AD] truncate">{videoCallCompany.contactPerson || 'Lead Contact'} • {videoCallCompany.email || 'contact@client.io'}</p>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-200">
                  Ready
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#172033] mb-1.5">Meeting Invite Link</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={`https://meet.pulsecrm.io/room/${videoCallCompany.id || 'live'}`}
                    className="flex-1 px-3 py-2 text-xs bg-[#F8FAFC] rounded-xl border border-[#E5EAF2] text-[#475569] font-mono select-all"
                  />
                  <button
                    onClick={() => handleCopyMeetingLink(`https://meet.pulsecrm.io/room/${videoCallCompany.id || 'live'}`)}
                    className="px-3 py-2 text-xs font-semibold text-indigo-600 hover:bg-indigo-50 border border-indigo-200 rounded-xl transition-colors flex items-center gap-1.5"
                  >
                    {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedLink ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-indigo-50/60 border border-indigo-100 flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-indigo-600 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-indigo-900 leading-relaxed">
                  Secure HD video session with automatic CRM notes logging and screen sharing capabilities.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    showToast(`Launching secure video call with ${videoCallCompany.name}...`, 'success');
                    window.open(`https://meet.google.com/new`, '_blank');
                    setVideoCallCompany(null);
                  }}
                  className="flex-1 py-2.5 px-4 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Video className="w-4 h-4" />
                  <span>Join Video Call Now</span>
                </button>
                <button
                  type="button"
                  onClick={() => setVideoCallCompany(null)}
                  className="py-2.5 px-4 text-xs font-semibold text-[#8292AD] hover:text-[#172033] hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
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

