import React, { useState } from 'react';
import {
  LifeBuoy,
  Plus,
  Search,
  MessageSquare,
  Clock,
  AlertCircle,
  CheckCircle,
  AlertTriangle,
  Send,
  X,
  User,
  Building2
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const SupportTickets = () => {
  const { tickets, addTicket, updateTicketStatus, showToast, companies } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isNewTicketOpen, setIsNewTicketOpen] = useState(false);
  const [replyText, setReplyText] = useState('');

  const [newTkt, setNewTkt] = useState({
    subject: '',
    company: companies[0]?.name || 'Nimbus Cloud Labs',
    author: 'Saurabh H.',
    priority: 'High',
    category: 'API & Integrations'
  });

  const filteredTickets = tickets.filter(t => {
    const matchesSearch = t.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || t.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newTkt.subject) {
      showToast('Subject is required', 'error');
      return;
    }
    addTicket(newTkt);
    setIsNewTicketOpen(false);
    setNewTkt({
      subject: '',
      company: companies[0]?.name || 'Nimbus Cloud Labs',
      author: 'Saurabh H.',
      priority: 'High',
      category: 'API & Integrations'
    });
  };

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    showToast('Reply dispatched to tenant contact');
    setReplyText('');
  };

  const getPriorityBadge = (p) => {
    switch (p) {
      case 'Critical':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'High':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Medium':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#172033] tracking-tight">
            Support Desk
          </h1>
          <p className="text-xs md:text-sm text-[#8292AD] mt-1 font-medium">
            Monitor client incidents, technical inquiries, SLAs, and resolution tickets
          </p>
        </div>

        <button
          onClick={() => setIsNewTicketOpen(true)}
          className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-[#2563EB] hover:bg-blue-700 rounded-xl shadow-md shadow-blue-500/20 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Create Ticket</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-[#E5EAF2] shadow-xs">
          <p className="text-xs font-bold text-[#8292AD] uppercase">Open Inquiries</p>
          <p className="text-2xl font-black text-amber-500 mt-1">
            {tickets.filter(t => t.status === 'Open').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-[#E5EAF2] shadow-xs">
          <p className="text-xs font-bold text-[#8292AD] uppercase">In Progress</p>
          <p className="text-2xl font-black text-blue-600 mt-1">
            {tickets.filter(t => t.status === 'In Progress').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-[#E5EAF2] shadow-xs">
          <p className="text-xs font-bold text-[#8292AD] uppercase">Resolved Today</p>
          <p className="text-2xl font-black text-emerald-600 mt-1">
            {tickets.filter(t => t.status === 'Resolved').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-[#E5EAF2] shadow-xs">
          <p className="text-xs font-bold text-[#8292AD] uppercase">Avg First Response</p>
          <p className="text-2xl font-black text-purple-600 mt-1">14 min</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-2xl border border-[#E5EAF2] shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-[#8292AD] absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search tickets by subject, ID, company..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-[#F7F9FC] border border-[#E5EAF2] rounded-xl focus:outline-none focus:border-blue-500 text-[#172033]"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
          {['All', 'Open', 'In Progress', 'Resolved'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                statusFilter === st
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-[#F7F9FC] text-[#8292AD] hover:text-[#172033] border border-[#E5EAF2]'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Tickets Table */}
      <div className="bg-white rounded-2xl border border-[#E5EAF2] shadow-[0_1px_3px_rgba(0,0,0,0.04)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F7F9FC] border-b border-[#E5EAF2] text-[11px] font-bold text-[#8292AD] uppercase tracking-wider">
                <th className="py-3.5 px-4">Ticket ID</th>
                <th className="py-3.5 px-4">Subject & Category</th>
                <th className="py-3.5 px-4">Company</th>
                <th className="py-3.5 px-4">Priority</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Opened</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5EAF2] text-xs">
              {filteredTickets.map((t) => (
                <tr
                  key={t.id}
                  className="hover:bg-[#F7F9FC]/80 transition-colors group cursor-pointer"
                  onClick={() => setSelectedTicket(t)}
                >
                  <td className="py-3.5 px-4 font-mono font-bold text-blue-600 whitespace-nowrap">
                    {t.id}
                  </td>

                  <td className="py-3.5 px-4">
                    <p className="font-bold text-[#172033] group-hover:text-blue-600 transition-colors">
                      {t.subject}
                    </p>
                    <span className="text-[11px] text-[#8292AD]">{t.category}</span>
                  </td>

                  <td className="py-3.5 px-4 whitespace-nowrap font-medium text-[#172033]">
                    {t.company}
                  </td>

                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${getPriorityBadge(t.priority)}`}>
                      {t.priority}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                      t.status === 'Resolved'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : t.status === 'In Progress'
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      {t.status === 'Resolved' && <CheckCircle className="w-3 h-3 text-emerald-600" />}
                      {t.status === 'In Progress' && <Clock className="w-3 h-3 text-blue-600" />}
                      {t.status === 'Open' && <AlertCircle className="w-3 h-3 text-amber-600" />}
                      {t.status}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 whitespace-nowrap text-[#8292AD]">
                    {t.createdAt}
                  </td>

                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedTicket(t);
                      }}
                      className="px-3 py-1 text-xs font-semibold text-blue-600 hover:text-white hover:bg-blue-600 border border-blue-200 rounded-xl transition-all"
                    >
                      View Thread
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Ticket Details & Thread Modal */}
      {selectedTicket && (
        <div className="fixed top-10 bottom-0 right-0 left-0 md:left-[76px] z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="fixed top-10 bottom-0 right-0 left-0 md:left-[76px]" onClick={() => setSelectedTicket(null)} />
          <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-[#E5EAF2] overflow-hidden z-10 animate-in zoom-in-95 max-h-[85vh] flex flex-col">
            <div className="px-6 py-4 border-b border-[#E5EAF2] flex items-center justify-between bg-[#F7F9FC]">
              <div>
                <span className="font-mono text-xs font-bold text-blue-600">{selectedTicket.id}</span>
                <h3 className="text-base font-bold text-[#172033] mt-0.5">{selectedTicket.subject}</h3>
              </div>
              <button onClick={() => setSelectedTicket(null)} className="p-1.5 text-slate-400 hover:text-slate-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4 overflow-y-auto flex-1">
              {/* Meta bar */}
              <div className="flex items-center justify-between bg-[#F7F9FC] p-3 rounded-xl border border-[#E5EAF2] text-xs">
                <div>
                  <span className="text-[#8292AD]">Company:</span>{' '}
                  <span className="font-bold text-[#172033]">{selectedTicket.company}</span>
                </div>
                <div>
                  <span className="text-[#8292AD]">Priority:</span>{' '}
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getPriorityBadge(selectedTicket.priority)}`}>
                    {selectedTicket.priority}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[#8292AD]">Status:</span>
                  <select
                    value={selectedTicket.status}
                    onChange={(e) => {
                      updateTicketStatus(selectedTicket.id, e.target.value);
                      setSelectedTicket({ ...selectedTicket, status: e.target.value });
                    }}
                    className="px-2 py-0.5 rounded-lg border border-[#E5EAF2] font-semibold text-xs bg-white"
                  >
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </div>
              </div>

              {/* Message thread */}
              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-slate-50 border border-[#E5EAF2] text-xs space-y-1">
                  <div className="flex items-center justify-between font-semibold text-[#172033]">
                    <span>{selectedTicket.author} (Tenant Admin)</span>
                    <span className="text-[10px] text-[#8292AD]">{selectedTicket.createdAt}</span>
                  </div>
                  <p className="text-[#172033] leading-relaxed">
                    Hello support, we encountered an unexpected behavior while deploying the custom integration in our production cluster. Could someone verify the webhook dispatch logs?
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-100 text-xs space-y-1 ml-4">
                  <div className="flex items-center justify-between font-semibold text-blue-900">
                    <span>Saurabh H. (Pulse CRM Super Admin)</span>
                    <span className="text-[10px] text-blue-500">15m ago</span>
                  </div>
                  <p className="text-[#172033] leading-relaxed">
                    We've inspected the gateway headers. The HMAC secret signature format has been validated. Please check the updated certificate.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Reply Form */}
            <form onSubmit={handleSendReply} className="p-4 border-t border-[#E5EAF2] bg-[#F7F9FC] flex items-center gap-2">
              <input
                type="text"
                placeholder="Type your official response..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="flex-1 px-3 py-2 text-xs rounded-xl border border-[#E5EAF2] bg-white focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* New Ticket Modal */}
      {isNewTicketOpen && (
        <div className="fixed top-10 bottom-0 right-0 left-0 md:left-[76px] z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="fixed top-10 bottom-0 right-0 left-0 md:left-[76px]" onClick={() => setIsNewTicketOpen(false)} />
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-[#E5EAF2] p-6 space-y-4 z-10 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5EAF2]">
              <h3 className="text-base font-bold text-[#172033]">Create Support Incident</h3>
              <button onClick={() => setIsNewTicketOpen(false)} className="p-1.5 text-slate-400 hover:text-slate-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#172033] mb-1">Subject *</label>
                <input
                  type="text"
                  required
                  placeholder="Summary of inquiry or incident"
                  value={newTkt.subject}
                  onChange={(e) => setNewTkt({ ...newTkt, subject: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5EAF2] focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#172033] mb-1">Company</label>
                  <select
                    value={newTkt.company}
                    onChange={(e) => setNewTkt({ ...newTkt, company: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5EAF2] focus:border-blue-500 bg-white"
                  >
                    {companies.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#172033] mb-1">Priority</label>
                  <select
                    value={newTkt.priority}
                    onChange={(e) => setNewTkt({ ...newTkt, priority: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5EAF2] focus:border-blue-500 bg-white"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#172033] mb-1">Category</label>
                <select
                  value={newTkt.category}
                  onChange={(e) => setNewTkt({ ...newTkt, category: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5EAF2] focus:border-blue-500 bg-white"
                >
                  <option value="API & Integrations">API & Integrations</option>
                  <option value="Billing & Invoicing">Billing & Invoicing</option>
                  <option value="Security & Auth">Security & Auth</option>
                  <option value="Data Management">Data Management</option>
                </select>
              </div>

              <div className="pt-3 border-t border-[#E5EAF2] flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsNewTicketOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-[#8292AD]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl"
                >
                  Submit Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

