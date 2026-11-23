import React, { useState } from 'react';
import {
  CreditCard,
  Plus,
  Search,
  Download,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Send,
  FileText,
  X,
  ExternalLink,
  DollarSign,
  ChevronDown,
  RotateCw,
  Layers,
  Calendar
} from 'lucide-react';
import { CompanyAvatar } from '../components/common/Avatar';
import { useApp } from '../context/AppContext';
import { ImageUploadOption } from '../components/common/ImageUploadOption';

export const Billing = () => {
  const { invoices, markInvoicePaid, addInvoice, showToast, companies } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [planFilter, setPlanFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('All');
  const [isCreateInvoiceOpen, setIsCreateInvoiceOpen] = useState(false);

  const paidCount = invoices.filter(i => i.status === 'Paid').length;
  const pendingCount = invoices.filter(i => i.status === 'Pending').length;
  const overdueCount = invoices.filter(i => i.status === 'Overdue').length;

  const handleClearFilters = () => {
    setSearchTerm('');
    setStatusFilter('All');
    setPlanFilter('All');
    setDateFilter('All');
  };

  const handleRefresh = () => {
    showToast('Invoices data refreshed', 'info');
  };

  const exportAllInvoicesCSV = () => {
    const headers = ['InvoiceID', 'Company', 'Plan', 'Amount', 'DueDate', 'Status', 'Method'];
    const rows = filteredInvoices.map(i => [
      `"${i.id}"`,
      `"${i.company}"`,
      `"${i.plan}"`,
      `"${i.amount}"`,
      `"${i.dueDate}"`,
      `"${i.status}"`,
      `"${i.method}"`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `pulse_invoices_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Invoices exported successfully!', 'success');
  };

  // New Invoice form state
  const [newInv, setNewInv] = useState({
    company: companies[0]?.name || 'Acme Technologies',
    companyLogo: companies[0]?.logo || 'https://images.unsplash.com/photo-1557683316-973673baf926?w=100&h=100&fit=crop&crop=faces',
    plan: 'Growth (Monthly)',
    amount: '₹19,999',
    dueDate: 'Nov 30, 2026',
    method: 'Credit Card (Stripe)'
  });

  const filteredInvoices = invoices.filter(inv => {
    const matchesSearch = inv.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.plan.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || inv.status === statusFilter;
    const matchesPlan = planFilter === 'All' || inv.plan.toLowerCase().includes(planFilter.toLowerCase());
    const matchesDate = dateFilter === 'All' || (dateFilter === 'Nov 2026' ? inv.dueDate.includes('Nov') : true);
    return matchesSearch && matchesStatus && matchesPlan && matchesDate;
  });

  const handleCreateInvoice = (e) => {
    e.preventDefault();
    addInvoice({
      ...newInv,
      companyLogo: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=100&h=100&fit=crop&crop=faces'
    });
    setIsCreateInvoiceOpen(false);
  };

  const downloadPDF = (id) => {
    const inv = invoices.find(i => i.id === id);
    if (!inv) return;
    const content = `===================================================
PULSE CRM OFFICIAL INVOICE RECEIPT
===================================================
Invoice Number: ${inv.id}
Due Date:       ${inv.dueDate}
Company:        ${inv.company}
Plan:           ${inv.plan}
Payment Method: ${inv.method}
Status:         ${inv.status}
---------------------------------------------------
TOTAL AMOUNT:   ${inv.amount}
===================================================
Pulse CRM Platform • support@pulsecrm.io
===================================================`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${inv.id}_Receipt.txt`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`Invoice ${inv.id} receipt downloaded!`, 'success');
  };

  const exportInvoices = () => {
    const headers = 'Invoice ID,Company,Plan,Amount,Status,DueDate,Method\n';
    const rows = filteredInvoices.map(i =>
      `"${i.id}","${i.company}","${i.plan}","${i.amount}","${i.status}","${i.dueDate}","${i.method}"`
    ).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Pulse_Invoices.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Invoices exported to CSV successfully!');
  };

  const sendReminder = (company, id) => {
    showToast(`Payment reminder email sent to ${company} for invoice ${id}`);
  };

  return (
    <div className="space-y-6 w-full max-w-full min-w-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <h1 className="text-2xl font-bold text-[#172033] dark:text-white tracking-tight">
              Billing & Payments
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#EFF6FF] text-[#2563EB] dark:bg-blue-950/60 dark:text-blue-400 border border-blue-100 dark:border-blue-900/40">
              {invoices.length} Total Invoices
            </span>
          </div>
          <p className="text-xs text-[#8292AD] dark:text-slate-400 mt-1 font-normal">
            Manage customer invoicing, collections, transaction receipts, and pending dues.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <button
            type="button"
            onClick={exportInvoices}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#172033] dark:text-white bg-white dark:bg-[#0D152D] hover:bg-slate-50 dark:hover:bg-[#121D3D] border border-[#E5EAF2] dark:border-[#1E2D54] rounded-xl shadow-2xs transition-colors cursor-pointer"
            title="Export invoices as CSV"
          >
            <Download className="w-3.5 h-3.5 text-[#64748B] dark:text-slate-400" />
            <span>Export CSV</span>
          </button>
          <button
            type="button"
            onClick={() => setIsCreateInvoiceOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#2563EB] hover:bg-blue-700 rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create Invoice</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        {/* Card 1: Total Collected */}
        <div className="bg-[#F8FAFF] dark:bg-[#0D152D] p-4 rounded-2xl border border-[#E2EDFF] dark:border-[#1E2D54] shadow-xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-[#2563EB] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
            <CreditCard className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#172033] dark:text-white leading-tight">
              ₹17.6L
            </h3>
            <p className="text-xs text-[#64748B] dark:text-slate-400 font-normal mt-0.5 leading-tight">
              Total Collected (Nov)
            </p>
          </div>
        </div>

        {/* Card 2: Paid Invoices */}
        <div className="bg-[#F6FDF9] dark:bg-[#0D152D] p-4 rounded-2xl border border-[#DCFCE7] dark:border-[#1E2D54] shadow-xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-[#10B981] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#172033] dark:text-white leading-tight">
              {paidCount}
            </h3>
            <p className="text-xs text-[#64748B] dark:text-slate-400 font-normal mt-0.5 leading-tight">
              Paid Invoices
            </p>
          </div>
        </div>

        {/* Card 3: Pending Receivables */}
        <div className="bg-[#F0F9FF] dark:bg-[#0D152D] p-4 rounded-2xl border border-[#BAE6FD]/80 dark:border-[#1E2D54] shadow-xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-[#0284C7] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#172033] dark:text-white leading-tight">
              {pendingCount}
            </h3>
            <p className="text-xs text-[#64748B] dark:text-slate-400 font-normal mt-0.5 leading-tight">
              Pending Receivables
            </p>
          </div>
        </div>

        {/* Card 4: Overdue Collections */}
        <div className="bg-[#FEF2F2] dark:bg-[#0D152D] p-4 rounded-2xl border border-[#FEE2E2] dark:border-[#1E2D54] shadow-xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-[#DC2626] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#172033] dark:text-white leading-tight">
              {overdueCount}
            </h3>
            <p className="text-xs text-[#64748B] dark:text-slate-400 font-normal mt-0.5 leading-tight">
              Overdue Collections
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
            <CreditCard className="w-4 h-4 text-blue-600 dark:text-blue-400 absolute left-3 pointer-events-none" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="select-primary-blue w-full sm:w-auto pl-9 pr-8 py-2 text-xs font-semibold bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 rounded-xl text-blue-600 dark:text-blue-400 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all truncate"
            >
              <option value="All">All Invoices ({invoices.length})</option>
              <option value="Paid">Paid ({paidCount})</option>
              <option value="Pending">Pending ({pendingCount})</option>
              <option value="Overdue">Overdue ({overdueCount})</option>
            </select>
          </div>

          {/* 2. Search Input */}
          <div className="relative w-full sm:w-auto sm:flex-1 sm:min-w-[180px] sm:max-w-xs">
            <Search className="w-4 h-4 text-[#8292AD] dark:text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search invoice #, company..."
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
            {/* Second Dropdown: Plan */}
            <div className="relative w-full min-w-0 sm:w-auto">
              <Layers className="w-4 h-4 text-blue-600 dark:text-blue-400 absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <select
                value={planFilter}
                onChange={(e) => setPlanFilter(e.target.value)}
                className="w-full min-w-0 sm:w-auto pl-8 sm:pl-9 pr-8 py-2 text-xs font-medium bg-white dark:bg-[#0A1128] border border-[#E5EAF2] dark:border-[#1E2D54] rounded-xl text-[#172033] dark:text-white cursor-pointer focus:outline-none focus:border-blue-500 transition-colors truncate"
              >
                <option value="All">All Plans</option>
                <option value="Starter">Starter Plan</option>
                <option value="Growth">Growth Plan</option>
                <option value="Enterprise">Enterprise Plan</option>
              </select>
            </div>

            {/* Third Dropdown: Date / Period */}
            <div className="relative w-full min-w-0 sm:w-auto">
              <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400 absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-full min-w-0 sm:w-auto pl-8 sm:pl-9 pr-8 py-2 text-xs font-medium bg-white dark:bg-[#0A1128] border border-[#E5EAF2] dark:border-[#1E2D54] rounded-xl text-[#172033] dark:text-white cursor-pointer focus:outline-none focus:border-blue-500 transition-colors truncate"
              >
                <option value="All">All Dates</option>
                <option value="Nov 2026">November 2026</option>
                <option value="Dec 2026">December 2026</option>
              </select>
            </div>
          </div>
        </div>

        {/* Right: Count, Reset, Refresh, and Export */}
        <div className="flex items-center justify-between sm:justify-end gap-2.5 sm:gap-3 flex-shrink-0 pt-2 xl:pt-0 border-t xl:border-t-0 border-[#E5EAF2] dark:border-[#1A2548]">
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#8292AD] dark:text-slate-400 whitespace-nowrap">
              Filtered: {filteredInvoices.length} Shown of {invoices.length}
            </span>
            {(searchTerm || statusFilter !== 'All' || planFilter !== 'All' || dateFilter !== 'All') && (
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
              onClick={exportAllInvoicesCSV}
              className="px-3 py-1.5 text-xs bg-white dark:bg-[#121D3D] hover:bg-slate-50 dark:hover:bg-[#1A2548] border border-[#E5EAF2] dark:border-[#1E2D54] rounded-xl text-[#172033] dark:text-white font-semibold flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer whitespace-nowrap"
              title="Export filtered invoices as CSV"
            >
              <Download className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
              <span className="hidden sm:inline">Export CSV</span>
            </button>
          </div>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white dark:bg-[#0D152D] rounded-2xl border border-[#E5EAF2] dark:border-[#1A2548] shadow-[0_1px_3px_rgba(0,0,0,0.04)] overflow-hidden w-full max-w-full">
        <div className="overflow-x-auto w-full">
          <table className="w-full min-w-[500px] text-left border-collapse">
            <thead>
              <tr className="bg-[#F7F9FC] dark:bg-[#0A1128] border-b border-[#E5EAF2] dark:border-[#1A2548] text-[11px] font-bold text-[#8292AD] dark:text-slate-400 uppercase tracking-wider">
                <th className="py-3.5 px-2 sm:px-3 lg:px-4">Invoice #</th>
                <th className="py-3.5 px-2 sm:px-3 lg:px-4">Company</th>
                <th className="py-3.5 px-3 lg:px-4 hidden xl:table-cell">Plan Description</th>
                <th className="py-3.5 px-2 sm:px-3 lg:px-4">Amount</th>
                <th className="py-3.5 px-2 sm:px-3 lg:px-4">Status</th>
                <th className="py-3.5 px-3 lg:px-4 hidden lg:table-cell">Due Date</th>
                <th className="py-3.5 px-2 sm:px-3 lg:px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5EAF2] dark:divide-[#1A2548] text-xs">
              {filteredInvoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-[#F7F9FC]/80 dark:hover:bg-[#121D3D]/60 transition-colors group">
                  <td className="py-3.5 px-2 sm:px-3 lg:px-4 font-mono font-bold text-blue-600 dark:text-blue-400 whitespace-nowrap text-[11px] sm:text-xs">
                    {inv.id}
                  </td>

                  <td className="py-3.5 px-2 sm:px-3 lg:px-4">
                    <div className="flex items-center gap-2">
                      <CompanyAvatar src={inv.companyLogo} name={inv.company} className="w-7 h-7 sm:w-8 sm:h-8 flex-shrink-0" />
                      <div>
                        <span className="font-bold text-[#172033] dark:text-white block">{inv.company}</span>
                        <span className="text-[11px] text-[#8292AD] dark:text-slate-400 xl:hidden">{inv.plan}</span>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-3 lg:px-4 text-[#8292AD] dark:text-slate-400 whitespace-nowrap hidden xl:table-cell">
                    <span className="text-[#172033] dark:text-white font-medium block">{inv.plan}</span>
                    <span className="text-[10px] text-[#8292AD] dark:text-slate-400">{inv.method}</span>
                  </td>

                  <td className="py-3.5 px-2 sm:px-3 lg:px-4 font-bold text-[#172033] dark:text-white whitespace-nowrap">
                    {inv.amount}
                  </td>

                  <td className="py-3.5 px-2 sm:px-3 lg:px-4 whitespace-nowrap">
                    {inv.status === 'Paid' ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" /> Paid
                      </span>
                    ) : inv.status === 'Pending' ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
                        <Clock className="w-3 h-3 text-amber-600 dark:text-amber-400" /> Pending
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-red-50 dark:bg-red-950/60 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800">
                        <AlertTriangle className="w-3 h-3 text-red-600 dark:text-red-400" /> Overdue
                      </span>
                    )}
                    <span className="block text-[10px] text-[#8292AD] dark:text-slate-400 lg:hidden mt-0.5">Due {inv.dueDate}</span>
                  </td>

                  <td className="py-3.5 px-3 lg:px-4 text-[#8292AD] dark:text-slate-400 whitespace-nowrap hidden lg:table-cell">
                    {inv.dueDate}
                  </td>

                  <td className="py-3 px-1.5 sm:px-2.5 lg:px-4 text-right whitespace-nowrap">
                    <div className="inline-flex items-center justify-end gap-1 sm:gap-1.5">
                      {inv.status !== 'Paid' && (
                        <>
                          <button
                            onClick={() => sendReminder(inv.company, inv.id)}
                            className="px-2 py-1 text-[11px] font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-lg transition-colors inline-flex items-center gap-1"
                          >
                            <Send className="w-3 h-3" /> Remind
                          </button>
                          <button
                            onClick={() => markInvoicePaid(inv.id)}
                            className="px-2 py-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors"
                          >
                            Mark Paid
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => downloadPDF(inv.id)}
                        className="p-1.5 text-[#8292AD] hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Download PDF"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Invoice Modal */}
      {isCreateInvoiceOpen && (
        <div className="fixed top-16 bottom-0 right-0 left-0 md:left-[76px] z-40 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="absolute inset-0" onClick={() => setIsCreateInvoiceOpen(false)} />
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-[#E5EAF2] overflow-hidden z-10 animate-in zoom-in-95 p-4 sm:p-6 space-y-4 max-h-[90vh] sm:max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5EAF2]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                  <FileText className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-[#172033]">Create Custom Invoice</h3>
              </div>
              <button onClick={() => setIsCreateInvoiceOpen(false)} className="p-1.5 text-slate-400 hover:text-slate-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateInvoice} className="space-y-4">
              <ImageUploadOption
                value={newInv.companyLogo}
                onChange={(logo) => setNewInv({ ...newInv, companyLogo: logo })}
                label="Invoice Company Logo"
                shape="rounded-xl"
                type="company"
              />

              <div>
                <label className="block text-xs font-semibold text-[#172033] mb-1">Company</label>
                <select
                  value={newInv.company}
                  onChange={(e) => {
                    const comp = companies.find(c => c.name === e.target.value);
                    setNewInv({
                      ...newInv,
                      company: e.target.value,
                      companyLogo: comp?.logo || newInv.companyLogo
                    });
                  }}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5EAF2] focus:border-blue-500 bg-white"
                >
                  {companies.map(c => (
                    <option key={c.id} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#172033] mb-1">Plan / Item</label>
                  <input
                    type="text"
                    value={newInv.plan}
                    onChange={(e) => setNewInv({ ...newInv, plan: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5EAF2] focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#172033] mb-1">Amount (₹)</label>
                  <input
                    type="text"
                    value={newInv.amount}
                    onChange={(e) => setNewInv({ ...newInv, amount: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5EAF2] focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#172033] mb-1">Due Date</label>
                  <input
                    type="text"
                    value={newInv.dueDate}
                    onChange={(e) => setNewInv({ ...newInv, dueDate: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5EAF2] focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#172033] mb-1">Payment Method</label>
                  <input
                    type="text"
                    value={newInv.method}
                    onChange={(e) => setNewInv({ ...newInv, method: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5EAF2] focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-[#E5EAF2] flex flex-col sm:flex-row justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsCreateInvoiceOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-[#8292AD] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl cursor-pointer"
                >
                  Issue Invoice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

