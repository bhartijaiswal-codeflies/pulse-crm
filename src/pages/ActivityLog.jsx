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
  Clock,
  ChevronDown,
  RotateCw,
  X,
  Calendar,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ActivityLog = () => {
  const { activityLogs, showToast } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [resultFilter, setResultFilter] = useState('All');
  const [timeFilter, setTimeFilter] = useState('All');

  const adminCount = activityLogs.filter(l => l.category === 'Admin').length;
  const sysCount = activityLogs.filter(l => l.category === 'System').length;
  const compCount = activityLogs.filter(l => l.category === 'Company').length;
  const userCount = activityLogs.filter(l => l.category === 'User').length;

  const handleClearFilters = () => {
    setSearchTerm('');
    setCategoryFilter('All');
    setResultFilter('All');
    setTimeFilter('All');
  };

  const handleRefresh = () => {
    showToast('Activity audit trail refreshed', 'info');
  };

  const filteredLogs = activityLogs.filter(l => {
    const matchesSearch = l.actor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.target.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.ip.includes(searchTerm);
    const matchesCategory = categoryFilter === 'All' || l.category === categoryFilter;
    const matchesResult = resultFilter === 'All' || (resultFilter === 'Success' ? !l.action.toLowerCase().includes('failed') : l.action.toLowerCase().includes('failed'));
    const matchesTime = timeFilter === 'All' || (timeFilter === 'Today' ? l.timestamp.includes('Today') || l.timestamp.includes('min') || l.timestamp.includes('hour') : true);
    return matchesSearch && matchesCategory && matchesResult && matchesTime;
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
      <div className="bg-white dark:bg-[#0D152D] p-3 sm:p-3.5 rounded-2xl border border-[#E5EAF2] dark:border-[#1A2548] shadow-xs flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-3">
        {/* Left: Filters group */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 flex-1 min-w-0">
          {/* 1. Primary Dropdown Pill: Category with count */}
          <div className="relative inline-flex items-center">
            <Shield className="w-4 h-4 text-blue-600 dark:text-blue-400 absolute left-3 pointer-events-none" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="pl-9 pr-8 py-2 text-xs font-semibold bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 rounded-xl text-blue-600 dark:text-blue-400 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
            >
              <option value="All">All Audit Events ({activityLogs.length})</option>
              <option value="Admin">Admin ({adminCount})</option>
              <option value="System">System ({sysCount})</option>
              <option value="Company">Company ({compCount})</option>
              <option value="User">User ({userCount})</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 absolute right-2.5 pointer-events-none" />
          </div>

          {/* 2. Search Input */}
          <div className="relative flex-1 min-w-[180px] sm:min-w-[220px] max-w-xs">
            <Search className="w-4 h-4 text-[#8292AD] dark:text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by actor, action, IP..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-white dark:bg-[#0A1128] border border-[#E5EAF2] dark:border-[#1E2D54] rounded-xl focus:outline-none focus:border-blue-500 text-[#172033] dark:text-white placeholder:text-[#8292AD] dark:placeholder:text-slate-500 transition-colors"
            />
          </div>

          {/* 3. Second Dropdown: Result */}
          <div className="relative inline-flex items-center">
            <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 absolute left-3 pointer-events-none" />
            <select
              value={resultFilter}
              onChange={(e) => setResultFilter(e.target.value)}
              className="pl-9 pr-8 py-2 text-xs font-medium bg-white dark:bg-[#0A1128] border border-[#E5EAF2] dark:border-[#1E2D54] rounded-xl text-[#172033] dark:text-white appearance-none cursor-pointer focus:outline-none focus:border-blue-500 transition-colors"
            >
              <option value="All">All Results</option>
              <option value="Success">Success Only</option>
              <option value="Failed">Failed / Warning</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#8292AD] dark:text-slate-400 absolute right-2.5 pointer-events-none" />
          </div>

          {/* 4. Third Dropdown: Date / Period */}
          <div className="relative inline-flex items-center">
            <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400 absolute left-3 pointer-events-none" />
            <select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className="pl-9 pr-8 py-2 text-xs font-medium bg-white dark:bg-[#0A1128] border border-[#E5EAF2] dark:border-[#1E2D54] rounded-xl text-[#172033] dark:text-white appearance-none cursor-pointer focus:outline-none focus:border-blue-500 transition-colors"
            >
              <option value="All">All Dates</option>
              <option value="Today">Today Only</option>
              <option value="Last 7 Days">Last 7 Days</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#8292AD] dark:text-slate-400 absolute right-2.5 pointer-events-none" />
          </div>
        </div>

        {/* Right: Clear, Count, Refresh, and Export */}
        <div className="flex items-center justify-between sm:justify-end gap-2.5 sm:gap-3 flex-shrink-0 pt-2 xl:pt-0 border-t xl:border-t-0 border-[#E5EAF2] dark:border-[#1A2548]">
          {/* Clear button */}
          <button
            type="button"
            onClick={handleClearFilters}
            className={`px-3 py-1.5 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer border ${
              searchTerm || categoryFilter !== 'All' || resultFilter !== 'All' || timeFilter !== 'All'
                ? 'text-rose-500 dark:text-rose-400 bg-rose-50/80 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/60 border-rose-200 dark:border-rose-900/60 shadow-2xs'
                : 'text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
            title="Reset all filters"
          >
            <X className="w-3.5 h-3.5" />
            <span>Clear</span>
          </button>

          <div className="h-4 w-px bg-[#E5EAF2] dark:bg-[#1E2D54] hidden sm:block" />

          {/* Filter count text */}
          <span className="text-xs text-[#8292AD] dark:text-slate-400 whitespace-nowrap">
            Filtered: {filteredLogs.length} Shown of {activityLogs.length}
          </span>

          {/* Refresh icon */}
          <button
            type="button"
            onClick={handleRefresh}
            className="p-1.5 rounded-lg text-[#8292AD] hover:text-[#172033] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#1E2D54] transition-colors cursor-pointer"
            title="Refresh audit trail"
            aria-label="Refresh"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>

          {/* Export CSV */}
          <button
            type="button"
            onClick={handleExport}
            className="px-3 py-1.5 text-xs bg-white dark:bg-[#121D3D] hover:bg-slate-50 dark:hover:bg-[#1A2548] border border-[#E5EAF2] dark:border-[#1E2D54] rounded-xl text-[#172033] dark:text-white font-semibold flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer whitespace-nowrap"
            title="Export audit trail as CSV"
          >
            <Download className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
            <span className="hidden sm:inline">Export Audit Log</span>
          </button>
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-white dark:bg-[#0D152D] rounded-2xl border border-[#E5EAF2] dark:border-[#1A2548] shadow-[0_1px_3px_rgba(0,0,0,0.04)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F7F9FC] dark:bg-[#0A1128] border-b border-[#E5EAF2] dark:border-[#1A2548] text-[11px] font-bold text-[#8292AD] dark:text-slate-400 uppercase tracking-wider">
                <th className="py-3.5 px-3 lg:px-4">Event Category</th>
                <th className="py-3.5 px-3 lg:px-4">Actor / Subject</th>
                <th className="py-3.5 px-3 lg:px-4">Action Performed</th>
                <th className="py-3.5 px-3 lg:px-4 hidden lg:table-cell">Target Entity</th>
                <th className="py-3.5 px-3 lg:px-4 hidden xl:table-cell">IP Address</th>
                <th className="py-3.5 px-3 lg:px-4 hidden lg:table-cell">Timestamp</th>
                <th className="py-3.5 px-3 lg:px-4 text-right">Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5EAF2] dark:divide-[#1A2548] text-xs">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-[#F7F9FC]/80 dark:hover:bg-[#121D3D]/60 transition-colors">
                  <td className="py-3.5 px-3 lg:px-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-slate-50 dark:bg-[#14234b] border border-[#E5EAF2] dark:border-[#1E2D54]">
                        {getCategoryIcon(log.category)}
                      </div>
                      <span className="font-semibold text-[#172033] dark:text-white">{log.category}</span>
                    </div>
                  </td>

                  <td className="py-3.5 px-3 lg:px-4 font-bold text-[#172033] dark:text-white whitespace-nowrap">
                    {log.actor}
                  </td>

                  <td className="py-3.5 px-3 lg:px-4 font-medium text-[#172033] dark:text-white">
                    <div>{log.action}</div>
                    <div className="text-[11px] text-[#8292AD] dark:text-slate-400 lg:hidden flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {log.time}
                    </div>
                  </td>

                  <td className="py-3.5 px-3 lg:px-4 text-[#8292AD] dark:text-slate-400 max-w-xs truncate hidden lg:table-cell">
                    {log.target}
                  </td>

                  <td className="py-3.5 px-3 lg:px-4 font-mono text-[11px] text-[#8292AD] dark:text-slate-400 whitespace-nowrap hidden xl:table-cell">
                    <span className="flex items-center gap-1">
                      <Globe className="w-3 h-3 text-slate-400" />
                      {log.ip}
                    </span>
                  </td>

                  <td className="py-3.5 px-3 lg:px-4 text-[#8292AD] dark:text-slate-400 whitespace-nowrap hidden lg:table-cell">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {log.time}
                    </span>
                  </td>

                  <td className="py-3.5 px-3 lg:px-4 text-right whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                      log.status === 'Success'
                        ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/60'
                        : 'bg-red-50 dark:bg-red-950/60 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-900/60'
                    }`}>
                      {log.status === 'Success' ? (
                        <CheckCircle className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                      ) : (
                        <XCircle className="w-3 h-3 text-red-600 dark:text-red-400" />
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

