import React, { useState } from 'react';
import {
  History,
  Download,
  Search,
  Filter,
  Shield,
  Server,
  User,
  Building,
  CheckCircle,
  XCircle,
  Globe,
  Clock
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ActivityLog = () => {
  const { activityLogs, showToast } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const filteredLogs = activityLogs.filter(l => {
    const matchesSearch = l.actor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.target.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.ip.includes(searchTerm);
    const matchesCategory = categoryFilter === 'All' || l.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleExport = () => {
    const headers = 'ID,Actor,Action,Target,Category,Timestamp,IP\n';
    const rows = filteredLogs.map(l =>
      `"${l.id}","${l.actor}","${l.action}","${l.target}","${l.category}","${l.timestamp}","${l.ip}"`
    ).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Pulse_Audit_Log.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Audit trail exported to CSV successfully!', 'success');
  };

  const getCategoryIcon = (cat) => {
    switch (cat) {
      case 'Admin':
        return <Shield className="w-4 h-4 text-purple-600" />;
      case 'System':
        return <Server className="w-4 h-4 text-blue-600" />;
      case 'Company':
        return <Building className="w-4 h-4 text-emerald-600" />;
      default:
        return <User className="w-4 h-4 text-slate-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#172033] tracking-tight">
            System Activity & Audit Log
          </h1>
          <p className="text-xs md:text-sm text-[#8292AD] mt-1 font-medium">
            SOC2 Type II compliance trail of administrative actions, webhooks, and security access
          </p>
        </div>

        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-[#172033] bg-white border border-[#E5EAF2] hover:bg-slate-50 rounded-xl shadow-xs self-start sm:self-auto"
        >
          <Download className="w-4 h-4 text-[#8292AD]" />
          <span>Export Audit Log</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-[#E5EAF2] shadow-xs flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        <div className="relative w-full lg:w-80 flex-1 min-w-[200px]">
          <Search className="w-4 h-4 text-[#8292AD] absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by actor, action, IP..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-[#F7F9FC] border border-[#E5EAF2] rounded-xl focus:outline-none focus:border-blue-500 text-[#172033]"
          />
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar flex-wrap sm:flex-nowrap">
          {['All', 'Admin', 'System', 'Company', 'User'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                categoryFilter === cat
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-[#F7F9FC] text-[#8292AD] hover:text-[#172033] border border-[#E5EAF2]'
              }`}
            >
              {cat} Events
            </button>
          ))}
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-white rounded-2xl border border-[#E5EAF2] shadow-[0_1px_3px_rgba(0,0,0,0.04)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F7F9FC] border-b border-[#E5EAF2] text-[11px] font-bold text-[#8292AD] uppercase tracking-wider">
                <th className="py-3.5 px-3 lg:px-4">Event Category</th>
                <th className="py-3.5 px-3 lg:px-4">Actor / Subject</th>
                <th className="py-3.5 px-3 lg:px-4">Action Performed</th>
                <th className="py-3.5 px-3 lg:px-4 hidden lg:table-cell">Target Entity</th>
                <th className="py-3.5 px-3 lg:px-4 hidden xl:table-cell">IP Address</th>
                <th className="py-3.5 px-3 lg:px-4 hidden lg:table-cell">Timestamp</th>
                <th className="py-3.5 px-3 lg:px-4 text-right">Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5EAF2] text-xs">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-[#F7F9FC]/80 transition-colors">
                  <td className="py-3.5 px-3 lg:px-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-slate-50 border border-[#E5EAF2]">
                        {getCategoryIcon(log.category)}
                      </div>
                      <span className="font-semibold text-[#172033]">{log.category}</span>
                    </div>
                  </td>

                  <td className="py-3.5 px-3 lg:px-4 font-bold text-[#172033] whitespace-nowrap">
                    {log.actor}
                  </td>

                  <td className="py-3.5 px-3 lg:px-4 font-medium text-[#172033]">
                    <div>{log.action}</div>
                    <div className="text-[11px] text-[#8292AD] lg:hidden flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {log.time}
                    </div>
                  </td>

                  <td className="py-3.5 px-3 lg:px-4 text-[#8292AD] max-w-xs truncate hidden lg:table-cell">
                    {log.target}
                  </td>

                  <td className="py-3.5 px-3 lg:px-4 font-mono text-[11px] text-[#8292AD] whitespace-nowrap hidden xl:table-cell">
                    <span className="flex items-center gap-1">
                      <Globe className="w-3 h-3 text-slate-400" />
                      {log.ip}
                    </span>
                  </td>

                  <td className="py-3.5 px-3 lg:px-4 text-[#8292AD] whitespace-nowrap hidden lg:table-cell">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {log.time}
                    </span>
                  </td>

                  <td className="py-3.5 px-3 lg:px-4 text-right whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                      log.status === 'Success'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-red-50 text-red-700 border border-red-200'
                    }`}>
                      {log.status === 'Success' ? (
                        <CheckCircle className="w-3 h-3 text-emerald-600" />
                      ) : (
                        <XCircle className="w-3 h-3 text-red-600" />
                      )}
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

