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
  DollarSign
} from 'lucide-react';
import { CompanyAvatar } from '../components/common/Avatar';
import { useApp } from '../context/AppContext';
import { ImageUploadOption } from '../components/common/ImageUploadOption';

export const Billing = () => {
  const { invoices, markInvoicePaid, addInvoice, showToast, companies } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isCreateInvoiceOpen, setIsCreateInvoiceOpen] = useState(false);

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
    return matchesSearch && matchesStatus;
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#172033] tracking-tight">
            Billing & Payments
          </h1>
          <p className="text-xs md:text-sm text-[#8292AD] mt-1 font-medium">
            Manage customer invoicing, collections, transaction receipts, and pending dues
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 self-start sm:self-auto">
          <button
            type="button"
            onClick={exportInvoices}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#172033] bg-white border border-[#E5EAF2] hover:bg-slate-50 rounded-xl shadow-xs transition-colors whitespace-nowrap flex-shrink-0 cursor-pointer"
            title="Export invoices as CSV"
          >
            <Download className="w-4 h-4 text-blue-600 flex-shrink-0" />
            <span className="whitespace-nowrap">Export CSV</span>
          </button>
          <button
            onClick={() => setIsCreateInvoiceOpen(true)}
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-[#2563EB] hover:bg-blue-700 rounded-xl shadow-md shadow-blue-500/20 transition-all cursor-pointer whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            <span>Create Invoice</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#E5EAF2] shadow-xs">
          <p className="text-xs font-bold text-[#8292AD] uppercase">Total Collected (Nov)</p>
          <p className="text-2xl font-black text-emerald-600 mt-1">₹17.6L</p>
          <p className="text-[11px] text-[#8292AD] mt-1">94% auto-debited on schedule</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E5EAF2] shadow-xs">
          <p className="text-xs font-bold text-[#8292AD] uppercase">Pending Receivables</p>
          <p className="text-2xl font-black text-amber-500 mt-1">₹2.4L</p>
          <p className="text-[11px] text-[#8292AD] mt-1">12 invoices pending review</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E5EAF2] shadow-xs">
          <p className="text-xs font-bold text-[#8292AD] uppercase">Overdue Collections</p>
          <p className="text-2xl font-black text-red-500 mt-1">₹23,997</p>
          <p className="text-[11px] text-[#8292AD] mt-1">1 tenant in grace period</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E5EAF2] shadow-xs">
          <p className="text-xs font-bold text-[#8292AD] uppercase">Payment Success Rate</p>
          <p className="text-2xl font-black text-blue-600 mt-1">98.2%</p>
          <p className="text-[11px] text-[#8292AD] mt-1">Stripe & Razorpay integrated</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-[#E5EAF2] shadow-xs flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        <div className="relative w-full lg:w-80 flex-1 min-w-[200px]">
          <Search className="w-4 h-4 text-[#8292AD] absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search invoice #, company..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-[#F7F9FC] border border-[#E5EAF2] rounded-xl focus:outline-none focus:border-blue-500 text-[#172033]"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar flex-wrap sm:flex-nowrap">
          {['All', 'Paid', 'Pending', 'Overdue'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                statusFilter === status
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-[#F7F9FC] text-[#8292AD] hover:text-[#172033] border border-[#E5EAF2]'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white rounded-2xl border border-[#E5EAF2] shadow-[0_1px_3px_rgba(0,0,0,0.04)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F7F9FC] border-b border-[#E5EAF2] text-[11px] font-bold text-[#8292AD] uppercase tracking-wider">
                <th className="py-3.5 px-3 lg:px-4">Invoice #</th>
                <th className="py-3.5 px-3 lg:px-4">Company</th>
                <th className="py-3.5 px-3 lg:px-4 hidden xl:table-cell">Plan Description</th>
                <th className="py-3.5 px-3 lg:px-4">Amount</th>
                <th className="py-3.5 px-3 lg:px-4">Status</th>
                <th className="py-3.5 px-3 lg:px-4 hidden lg:table-cell">Due Date</th>
                <th className="py-3.5 px-2 sm:px-3 lg:px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5EAF2] text-xs">
              {filteredInvoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-[#F7F9FC]/80 transition-colors group">
                  <td className="py-3.5 px-3 lg:px-4 font-mono font-bold text-blue-600 whitespace-nowrap">
                    {inv.id}
                  </td>

                  <td className="py-3.5 px-3 lg:px-4">
                    <div className="flex items-center gap-2.5">
                      <CompanyAvatar src={inv.companyLogo} name={inv.company} className="w-8 h-8" />
                      <div>
                        <span className="font-bold text-[#172033] block">{inv.company}</span>
                        <span className="text-[11px] text-[#8292AD] xl:hidden">{inv.plan}</span>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-3 lg:px-4 text-[#8292AD] whitespace-nowrap hidden xl:table-cell">
                    <span className="text-[#172033] font-medium block">{inv.plan}</span>
                    <span className="text-[10px] text-[#8292AD]">{inv.method}</span>
                  </td>

                  <td className="py-3.5 px-3 lg:px-4 font-bold text-[#172033] whitespace-nowrap">
                    {inv.amount}
                  </td>

                  <td className="py-3.5 px-3 lg:px-4 whitespace-nowrap">
                    {inv.status === 'Paid' ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Paid
                      </span>
                    ) : inv.status === 'Pending' ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                        <Clock className="w-3 h-3 text-amber-600" /> Pending
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-red-50 text-red-700 border border-red-200">
                        <AlertTriangle className="w-3 h-3 text-red-600" /> Overdue
                      </span>
                    )}
                    <span className="block text-[10px] text-[#8292AD] lg:hidden mt-0.5">Due {inv.dueDate}</span>
                  </td>

                  <td className="py-3.5 px-3 lg:px-4 text-[#8292AD] whitespace-nowrap hidden lg:table-cell">
                    {inv.dueDate}
                  </td>

                  <td className="py-3 px-2 sm:px-3 lg:px-4 text-right whitespace-nowrap space-x-1 sm:space-x-1.5">
                    {inv.status !== 'Paid' && (
                      <>
                        <button
                          onClick={() => sendReminder(inv.company, inv.id)}
                          className="px-2.5 py-1 text-[11px] font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-lg transition-colors inline-flex items-center gap-1"
                        >
                          <Send className="w-3 h-3" /> Remind
                        </button>
                        <button
                          onClick={() => markInvoicePaid(inv.id)}
                          className="px-2.5 py-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors"
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Invoice Modal */}
      {isCreateInvoiceOpen && (
        <div className="fixed top-10 bottom-0 right-0 left-0 md:left-[76px] z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="fixed top-10 bottom-0 right-0 left-0 md:left-[76px]" onClick={() => setIsCreateInvoiceOpen(false)} />
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

