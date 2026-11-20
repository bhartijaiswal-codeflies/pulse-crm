import React, { useState } from 'react';
import {
  Users as UsersIcon,
  Plus,
  Search,
  Shield,
  Mail,
  Building2,
  Clock,
  MoreVertical,
  CheckCircle,
  XCircle,
  X,
  Lock,
  Phone,
  Edit2,
  Trash2,
  Eye,
  Video,
  Copy,
  Check,
  Sparkles,
  ChevronDown,
  RotateCw,
  Download,
  Briefcase,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ImageUploadOption } from '../components/common/ImageUploadOption';
import { DeleteConfirmModal } from '../components/common/DeleteConfirmModal';

export const Users = () => {
  const { users, addUser, updateUser, deleteUser, showToast } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [deptFilter, setDeptFilter] = useState('All');
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [permissionsUser, setPermissionsUser] = useState(null);
  const [videoCallUser, setVideoCallUser] = useState(null);
  const [deletingUser, setDeletingUser] = useState(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const adminCount = users.filter(u => u.role === 'Super Administrator' || u.role === 'Super Admin').length;
  const companyAdminCount = users.filter(u => u.role === 'Company Admin').length;
  const billingCount = users.filter(u => u.role === 'Billing Manager').length;
  const devCount = users.filter(u => u.role === 'Developer').length;

  const handleClearFilters = () => {
    setSearchTerm('');
    setRoleFilter('All');
    setStatusFilter('All');
    setDeptFilter('All');
  };

  const handleRefresh = () => {
    showToast('User roster refreshed', 'info');
  };

  const exportUsersCSV = () => {
    const headers = ['Name', 'Email', 'Role', 'Company', 'Department', 'Status'];
    const rows = filteredUsers.map(u => [
      `"${u.name}"`,
      `"${u.email}"`,
      `"${u.role}"`,
      `"${u.company}"`,
      `"${u.department || 'Operations'}"`,
      `"${u.status || 'Active'}"`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `pulse_users_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Users exported successfully!', 'success');
  };

  const [permissions, setPermissions] = useState({
    viewAnalytics: true,
    manageBilling: true,
    editCompanies: true,
    inviteUsers: true,
    apiAccess: false,
    deleteRecords: false
  });

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    avatar: '',
    role: 'Company Admin',
    company: 'Pulse CRM HQ',
    department: 'Operations',
    phone: '+91 98000 11223'
  });

  const filteredUsers = users.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'All' || u.role === roleFilter || (roleFilter === 'Super Admin' && u.role.includes('Super'));
    const matchesStatus = statusFilter === 'All' || (u.status || 'Active') === statusFilter;
    const matchesDept = deptFilter === 'All' || (u.department || 'Operations') === deptFilter;
    return matchesSearch && matchesRole && matchesStatus && matchesDept;
  });

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email) {
      showToast('Name and email are required', 'error');
      return;
    }
    addUser(newUser);
    setIsAddUserOpen(false);
    setNewUser({
      name: '',
      email: '',
      role: 'Company Admin',
      company: 'Pulse CRM HQ',
      department: 'Operations',
      phone: '+91 98000 11223'
    });
  };

  const getRoleBadge = (role) => {
    switch (role) {
      case 'Super Administrator':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Company Admin':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Billing Manager':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Developer':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <h1 className="text-2xl font-bold text-[#172033] dark:text-white tracking-tight">
              Users & Team Access
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#EFF6FF] text-[#2563EB] dark:bg-blue-950/60 dark:text-blue-400 border border-blue-100 dark:border-blue-900/40">
              {users.length} Total Users
            </span>
          </div>
          <p className="text-xs text-[#8292AD] dark:text-slate-400 mt-1 font-normal">
            Manage admin privileges, tenant administrators, and role-based access control.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <button
            type="button"
            onClick={exportUsersCSV}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#172033] dark:text-white bg-white dark:bg-[#0D152D] hover:bg-slate-50 dark:hover:bg-[#121D3D] border border-[#E5EAF2] dark:border-[#1E2D54] rounded-xl shadow-2xs transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-[#64748B] dark:text-slate-400" />
            <span>Export CSV</span>
          </button>
          <button
            type="button"
            onClick={() => setIsAddUserOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#2563EB] hover:bg-blue-700 rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Invite User</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        {/* Card 1: Total Users */}
        <div className="bg-[#F8FAFF] dark:bg-[#0D152D] p-4 rounded-2xl border border-[#E2EDFF] dark:border-[#1E2D54] shadow-xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-[#2563EB] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
            <UsersIcon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#172033] dark:text-white leading-tight">
              {users.length}
            </h3>
            <p className="text-xs text-[#64748B] dark:text-slate-400 font-normal mt-0.5 leading-tight">
              Total Team Members
            </p>
          </div>
        </div>

        {/* Card 2: Active Accounts */}
        <div className="bg-[#F6FDF9] dark:bg-[#0D152D] p-4 rounded-2xl border border-[#DCFCE7] dark:border-[#1E2D54] shadow-xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-[#10B981] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
            <CheckCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#172033] dark:text-white leading-tight">
              {users.filter(u => (u.status || 'Active') === 'Active').length}
            </h3>
            <p className="text-xs text-[#64748B] dark:text-slate-400 font-normal mt-0.5 leading-tight">
              Active Accounts
            </p>
          </div>
        </div>

        {/* Card 3: Super Administrators */}
        <div className="bg-[#FAF7FF] dark:bg-[#0D152D] p-4 rounded-2xl border border-[#F3E8FF] dark:border-[#1E2D54] shadow-xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-[#7C3AED] text-white flex items-center justify-center flex-shrink-0 font-bold shadow-xs">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#172033] dark:text-white leading-tight">
              {adminCount}
            </h3>
            <p className="text-xs text-[#64748B] dark:text-slate-400 font-normal mt-0.5 leading-tight">
              Super Administrators
            </p>
          </div>
        </div>

        {/* Card 4: Tenant Admins */}
        <div className="bg-[#F0F9FF] dark:bg-[#0D152D] p-4 rounded-2xl border border-[#BAE6FD]/80 dark:border-[#1E2D54] shadow-xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-[#0284C7] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#172033] dark:text-white leading-tight">
              {companyAdminCount}
            </h3>
            <p className="text-xs text-[#64748B] dark:text-slate-400 font-normal mt-0.5 leading-tight">
              Company Admins
            </p>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-[#0D152D] p-3 sm:p-3.5 rounded-2xl border border-[#E5EAF2] dark:border-[#1A2548] shadow-xs flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-3">
        {/* Left: Filters group */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 flex-1 min-w-0">
          {/* 1. Primary Dropdown Pill: Role with count */}
          <div className="relative inline-flex items-center">
            <UsersIcon className="w-4 h-4 text-blue-600 dark:text-blue-400 absolute left-3 pointer-events-none" />
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="select-primary-blue pl-9 pr-8 py-2 text-xs font-semibold bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 rounded-xl text-blue-600 dark:text-blue-400 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
            >
              <option value="All">All Users ({users.length})</option>
              <option value="Super Admin">Super Admin ({adminCount})</option>
              <option value="Company Admin">Company Admin ({companyAdminCount})</option>
              <option value="Billing Manager">Billing Manager ({billingCount})</option>
              <option value="Developer">Developer ({devCount})</option>
            </select>
          </div>

          {/* 2. Search Input */}
          <div className="relative flex-1 min-w-[180px] sm:min-w-[220px] max-w-xs">
            <Search className="w-4 h-4 text-[#8292AD] dark:text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search employee, ID, email..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-white dark:bg-[#0A1128] border border-[#E5EAF2] dark:border-[#1E2D54] rounded-xl focus:outline-none focus:border-blue-500 text-[#172033] dark:text-white placeholder:text-[#8292AD] dark:placeholder:text-slate-500 transition-colors"
            />
          </div>

          {/* 3. Second Dropdown: Status */}
          <div className="relative inline-flex items-center">
            <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 absolute left-3 pointer-events-none" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-9 pr-8 py-2 text-xs font-medium bg-white dark:bg-[#0A1128] border border-[#E5EAF2] dark:border-[#1E2D54] rounded-xl text-[#172033] dark:text-white cursor-pointer focus:outline-none focus:border-blue-500 transition-colors"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          {/* 4. Third Dropdown: Department */}
          <div className="relative inline-flex items-center">
            <Briefcase className="w-4 h-4 text-blue-600 dark:text-blue-400 absolute left-3 pointer-events-none" />
            <select
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
              className="pl-9 pr-8 py-2 text-xs font-medium bg-white dark:bg-[#0A1128] border border-[#E5EAF2] dark:border-[#1E2D54] rounded-xl text-[#172033] dark:text-white cursor-pointer focus:outline-none focus:border-blue-500 transition-colors"
            >
              <option value="All">All Departments</option>
              <option value="Executive">Executive</option>
              <option value="Engineering">Engineering</option>
              <option value="Finance">Finance</option>
              <option value="Operations">Operations</option>
              <option value="Product">Product</option>
              <option value="Security">Security</option>
            </select>
          </div>
        </div>

        {/* Right: Count, Refresh, and Export */}
        <div className="flex items-center justify-between sm:justify-end gap-2.5 sm:gap-3 flex-shrink-0 pt-2 xl:pt-0 border-t xl:border-t-0 border-[#E5EAF2] dark:border-[#1A2548]">
          {/* Filter count text */}
          <span className="text-xs text-[#8292AD] dark:text-slate-400 whitespace-nowrap">
            Filtered: {filteredUsers.length} Shown of {users.length}
          </span>

          {/* Refresh icon */}
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
            onClick={exportUsersCSV}
            className="px-3 py-1.5 text-xs bg-white dark:bg-[#121D3D] hover:bg-slate-50 dark:hover:bg-[#1A2548] border border-[#E5EAF2] dark:border-[#1E2D54] rounded-xl text-[#172033] dark:text-white font-semibold flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer whitespace-nowrap"
            title="Export filtered users as CSV"
          >
            <Download className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
            <span className="hidden sm:inline">Export CSV</span>
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white dark:bg-[#0D152D] rounded-2xl border border-[#E5EAF2] dark:border-[#1A2548] shadow-[0_1px_3px_rgba(0,0,0,0.04)] overflow-hidden">
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F7F9FC] dark:bg-[#0A1128] border-b border-[#E5EAF2] dark:border-[#1A2548] text-[11px] font-bold text-[#8292AD] dark:text-slate-400 uppercase tracking-wider">
                <th className="py-3.5 px-3 lg:px-4">User</th>
                <th className="py-3.5 px-3 lg:px-4">Role</th>
                <th className="py-3.5 px-3 lg:px-4 hidden lg:table-cell">Organization</th>
                <th className="py-3.5 px-3 lg:px-4 hidden xl:table-cell">Department</th>
                <th className="py-3.5 px-3 lg:px-4">Status</th>
                <th className="py-3.5 px-3 lg:px-4 hidden lg:table-cell">Last Active</th>
                <th className="py-3.5 px-1 sm:px-2 text-center font-bold text-[11px] text-[#8292AD] dark:text-slate-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5EAF2] dark:divide-[#1A2548] text-xs">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-[#F7F9FC]/80 dark:hover:bg-[#121D3D]/60 transition-colors group">
                  <td className="py-3.5 px-3 lg:px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-9 h-9 rounded-full object-cover border border-[#E5EAF2] dark:border-[#1E2D54]"
                      />
                      <div>
                        <p className="font-bold text-[#172033] dark:text-white group-hover:text-blue-600 transition-colors">
                          {user.name}
                        </p>
                        <p className="text-[11px] text-[#8292AD] dark:text-slate-400">
                          {user.email} <span className="lg:hidden text-[#64748B] dark:text-slate-400 font-medium">• {user.company}</span>
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-3 lg:px-4 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${getRoleBadge(user.role)}`}>
                      <Shield className="w-3 h-3" />
                      {user.role}
                    </span>
                  </td>

                  <td className="py-3.5 px-3 lg:px-4 whitespace-nowrap font-medium text-[#172033] dark:text-white hidden lg:table-cell">
                    {user.company}
                  </td>

                  <td className="py-3.5 px-3 lg:px-4 whitespace-nowrap text-[#8292AD] dark:text-slate-400 hidden xl:table-cell">
                    {user.department}
                  </td>

                  <td className="py-3.5 px-3 lg:px-4 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                      user.status === 'Active'
                        ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
                    }`}>
                      {user.status === 'Active' ? (
                        <CheckCircle className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                      ) : (
                        <XCircle className="w-3 h-3 text-slate-400" />
                      )}
                      {user.status}
                    </span>
                  </td>

                  <td className="py-3.5 px-3 lg:px-4 whitespace-nowrap text-[#8292AD] dark:text-slate-400 hidden lg:table-cell">
                    {user.lastActive}
                  </td>

                  <td className="py-2.5 px-1 sm:px-2 text-center whitespace-nowrap">
                    <div className="flex items-center justify-center gap-1 sm:gap-1 lg:gap-1.5">
                      {/* View Permissions (Eye - Blue) */}
                      <button
                        type="button"
                        onClick={() => {
                          setPermissionsUser(user);
                          setPermissions({
                            viewAnalytics: true,
                            manageBilling: user.role.includes('Admin') || user.role.includes('Billing'),
                            editCompanies: user.role.includes('Admin'),
                            inviteUsers: user.role.includes('Admin'),
                            apiAccess: user.role.includes('Admin') || user.role.includes('Developer'),
                            deleteRecords: user.role === 'Super Administrator'
                          });
                        }}
                        className="w-7 h-7 lg:w-8 lg:h-8 rounded-full border border-[#93C5FD] dark:border-blue-500/40 bg-[#EFF6FF]/70 dark:bg-blue-950/40 text-[#2563EB] dark:text-blue-400 flex items-center justify-center hover:bg-[#DBEAFE] dark:hover:bg-blue-900/60 hover:border-[#3B82F6] hover:scale-105 transition-all shadow-xs cursor-pointer flex-shrink-0"
                        title="View Permissions & Access"
                      >
                        <Eye className="w-3.5 h-3.5 lg:w-4 lg:h-4 stroke-[1.8]" />
                      </button>

                      {/* Edit User (Pencil - Green) */}
                      <button
                        type="button"
                        onClick={() => setEditingUser(user)}
                        className="w-7 h-7 lg:w-8 lg:h-8 rounded-full border border-[#86EFAC] dark:border-emerald-500/40 bg-[#F0FDF4]/70 dark:bg-emerald-950/40 text-[#16A34A] dark:text-emerald-400 flex items-center justify-center hover:bg-[#DCFCE7] dark:hover:bg-emerald-900/60 hover:border-[#22C55E] hover:scale-105 transition-all shadow-xs cursor-pointer flex-shrink-0"
                        title="Edit User"
                      >
                        <Edit2 className="w-3.5 h-3.5 lg:w-4 lg:h-4 stroke-[1.8]" />
                      </button>

                      {/* Video Call (Video - Purple) */}
                      <button
                        type="button"
                        onClick={() => setVideoCallUser(user)}
                        className="w-7 h-7 lg:w-8 lg:h-8 rounded-full border border-[#C7D2FE] dark:border-indigo-500/40 bg-[#EEF2FF]/70 dark:bg-indigo-950/40 text-[#4F46E5] dark:text-indigo-400 flex items-center justify-center hover:bg-[#E0E7FF] dark:hover:bg-indigo-900/60 hover:border-[#6366F1] hover:scale-105 transition-all shadow-xs cursor-pointer flex-shrink-0"
                        title="Start Video Meeting"
                      >
                        <Video className="w-3.5 h-3.5 lg:w-4 lg:h-4 stroke-[1.8]" />
                      </button>

                      {/* Delete User (Trash - Red) */}
                      <button
                        type="button"
                        onClick={() => setDeletingUser(user)}
                        className="w-7 h-7 lg:w-8 lg:h-8 rounded-full border border-[#FECDD3] dark:border-rose-500/40 bg-[#FFF1F2]/70 dark:bg-rose-950/40 text-[#E11D48] dark:text-rose-400 flex items-center justify-center hover:bg-[#FFE4E6] dark:hover:bg-rose-900/60 hover:border-[#F43F5E] hover:scale-105 transition-all shadow-xs cursor-pointer flex-shrink-0"
                        title="Delete User"
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
      </div>

      {/* Add User Modal */}
      {isAddUserOpen && (
        <div className="fixed top-16 bottom-0 right-0 left-0 md:left-[76px] z-40 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="absolute inset-0" onClick={() => setIsAddUserOpen(false)} />
          <div className="relative w-full max-w-lg bg-white dark:bg-[#0D152D] rounded-2xl shadow-2xl border border-[#E5EAF2] dark:border-[#1A2548] overflow-hidden z-10 animate-in zoom-in-95 p-4 sm:p-6 space-y-4 max-h-[90vh] sm:max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5EAF2] dark:border-[#1A2548]">
              <div className="flex items-center gap-2">
                <UsersIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h3 className="text-base font-bold text-[#172033] dark:text-white">Invite New User</h3>
              </div>
              <button onClick={() => setIsAddUserOpen(false)} className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              {/* User Avatar Option */}
              <ImageUploadOption
                value={newUser.avatar}
                onChange={(newAvatar) => setNewUser({ ...newUser, avatar: newAvatar })}
                label="User Photo / Avatar"
                shape="rounded-full"
                type="user"
              />

              <div>
                <label className="block text-xs font-semibold text-[#172033] dark:text-white mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  placeholder="e.g. Rachel Zane"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5EAF2] dark:border-[#1E2D54] bg-white dark:bg-[#0D1938] text-[#172033] dark:text-white focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#172033] dark:text-white mb-1">Work Email *</label>
                <input
                  type="email"
                  required
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  placeholder="rachel@tenant.com"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5EAF2] dark:border-[#1E2D54] bg-white dark:bg-[#0D1938] text-[#172033] dark:text-white focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#172033] dark:text-white mb-1">Access Role</label>
                  <select
                    value={newUser.role}
                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5EAF2] dark:border-[#1E2D54] focus:border-blue-500 bg-white dark:bg-[#0D1938] text-[#172033] dark:text-white"
                  >
                    <option value="Company Admin">Company Admin</option>
                    <option value="Billing Manager">Billing Manager</option>
                    <option value="Support Agent">Support Agent</option>
                    <option value="Developer">Developer</option>
                    <option value="Member">Member</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#172033] dark:text-white mb-1">Organization</label>
                  <input
                    type="text"
                    value={newUser.company}
                    onChange={(e) => setNewUser({ ...newUser, company: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5EAF2] dark:border-[#1E2D54] bg-white dark:bg-[#0D1938] text-[#172033] dark:text-white focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-[#E5EAF2] dark:border-[#1A2548] flex flex-col sm:flex-row justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsAddUserOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-[#8292AD] dark:text-slate-400 hover:text-[#172033] dark:hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl cursor-pointer"
                >
                  Send Invitation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {editingUser && (
        <div className="fixed top-16 bottom-0 right-0 left-0 md:left-[76px] z-40 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="absolute inset-0" onClick={() => setEditingUser(null)} />
          <div className="relative w-full max-w-lg bg-white dark:bg-[#0D152D] rounded-2xl shadow-2xl border border-[#E5EAF2] dark:border-[#1A2548] overflow-hidden z-10 animate-in zoom-in-95 p-4 sm:p-6 space-y-4 max-h-[90vh] sm:max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5EAF2] dark:border-[#1A2548]">
              <div className="flex items-center gap-2">
                <Edit2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h3 className="text-base font-bold text-[#172033] dark:text-white">Edit User Profile</h3>
              </div>
              <button onClick={() => setEditingUser(null)} className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateUser(editingUser.id, editingUser);
                setEditingUser(null);
              }}
              className="space-y-4"
            >
              {/* User Avatar Option */}
              <ImageUploadOption
                value={editingUser.avatar}
                onChange={(newAvatar) => setEditingUser({ ...editingUser, avatar: newAvatar })}
                label="User Photo / Avatar"
                shape="rounded-full"
                type="user"
              />

              <div>
                <label className="block text-xs font-semibold text-[#172033] dark:text-white mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={editingUser.name}
                  onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5EAF2] dark:border-[#1E2D54] bg-white dark:bg-[#0D1938] text-[#172033] dark:text-white focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#172033] dark:text-white mb-1">Work Email</label>
                <input
                  type="email"
                  required
                  value={editingUser.email}
                  onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5EAF2] dark:border-[#1E2D54] bg-white dark:bg-[#0D1938] text-[#172033] dark:text-white focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#172033] dark:text-white mb-1">Access Role</label>
                  <select
                    value={editingUser.role}
                    onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5EAF2] dark:border-[#1E2D54] focus:border-blue-500 bg-white dark:bg-[#0D1938] text-[#172033] dark:text-white"
                  >
                    <option value="Super Admin">Super Admin</option>
                    <option value="Company Admin">Company Admin</option>
                    <option value="Billing Manager">Billing Manager</option>
                    <option value="Support Agent">Support Agent</option>
                    <option value="Developer">Developer</option>
                    <option value="Member">Member</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#172033] dark:text-white mb-1">Status</label>
                  <select
                    value={editingUser.status}
                    onChange={(e) => setEditingUser({ ...editingUser, status: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5EAF2] dark:border-[#1E2D54] focus:border-blue-500 bg-white dark:bg-[#0D1938] text-[#172033] dark:text-white"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#172033] dark:text-white mb-1">Organization</label>
                  <input
                    type="text"
                    value={editingUser.company}
                    onChange={(e) => setEditingUser({ ...editingUser, company: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5EAF2] dark:border-[#1E2D54] bg-white dark:bg-[#0D1938] text-[#172033] dark:text-white focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#172033] dark:text-white mb-1">Department</label>
                  <input
                    type="text"
                    value={editingUser.department}
                    onChange={(e) => setEditingUser({ ...editingUser, department: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5EAF2] dark:border-[#1E2D54] bg-white dark:bg-[#0D1938] text-[#172033] dark:text-white focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-[#E5EAF2] dark:border-[#1A2548] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setDeletingUser(editingUser)}
                  className="px-3 py-2 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition-colors flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete User</span>
                </button>
                <div className="flex gap-2 w-full sm:w-auto justify-end">
                  <button
                    type="button"
                    onClick={() => setEditingUser(null)}
                    className="flex-1 sm:flex-initial px-4 py-2 text-xs font-semibold text-[#8292AD] dark:text-slate-400 hover:text-[#172033] dark:hover:text-white cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 sm:flex-initial px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl cursor-pointer"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Permissions Modal */}
      {permissionsUser && (
        <div className="fixed top-16 bottom-0 right-0 left-0 md:left-[76px] z-40 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="absolute inset-0" onClick={() => setPermissionsUser(null)} />
          <div className="relative w-full max-w-md bg-white dark:bg-[#0D152D] rounded-2xl shadow-2xl border border-[#E5EAF2] dark:border-[#1A2548] overflow-hidden z-10 animate-in zoom-in-95 p-4 sm:p-6 space-y-4 max-h-[90vh] sm:max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5EAF2] dark:border-[#1A2548]">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <div>
                  <h3 className="text-base font-bold text-[#172033] dark:text-white">Access Permissions</h3>
                  <p className="text-xs text-[#8292AD] dark:text-slate-400">{permissionsUser.name} • {permissionsUser.role}</p>
                </div>
              </div>
              <button onClick={() => setPermissionsUser(null)} className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 pt-1">
              {[
                { key: 'viewAnalytics', title: 'Dashboard & Analytics', desc: 'Can view revenue charts, MRR numbers, and conversion rates' },
                { key: 'manageBilling', title: 'Billing & Invoicing', desc: 'Can issue invoices, mark payments paid, and manage cards' },
                { key: 'editCompanies', title: 'Manage Companies', desc: 'Can create, edit details, and modify tenant accounts' },
                { key: 'inviteUsers', title: 'Invite & Manage Team', desc: 'Can invite new administrators and update role assignments' },
                { key: 'apiAccess', title: 'API Keys & Webhooks', desc: 'Can rotate secret API credentials and view audit telemetry' },
                { key: 'deleteRecords', title: 'Delete Records', desc: 'Can delete companies, subscriptions, or team members' },
              ].map(perm => (
                <label
                  key={perm.key}
                  className="flex items-start gap-3 p-2.5 rounded-xl border border-[#E5EAF2] dark:border-[#1A2548] hover:bg-slate-50 dark:hover:bg-[#121D3D] cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={permissions[perm.key]}
                    onChange={(e) => setPermissions({ ...permissions, [perm.key]: e.target.checked })}
                    className="mt-1 w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0D1938]"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-[#172033] dark:text-white">{perm.title}</p>
                    <p className="text-[11px] text-[#8292AD] dark:text-slate-400 mt-0.5">{perm.desc}</p>
                  </div>
                </label>
              ))}
            </div>

            <div className="pt-3 border-t border-[#E5EAF2] dark:border-[#1A2548] flex flex-col sm:flex-row justify-end gap-2">
              <button
                type="button"
                onClick={() => setPermissionsUser(null)}
                className="px-4 py-2 text-xs font-semibold text-[#8292AD] dark:text-slate-400 hover:text-[#172033] dark:hover:text-white cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  showToast(`Access permissions updated for ${permissionsUser.name}!`, 'success');
                  setPermissionsUser(null);
                }}
                className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs cursor-pointer"
              >
                Save Permissions
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Instant Video Meeting Modal */}
      {videoCallUser && (
        <div className="fixed top-16 bottom-0 right-0 left-0 md:left-[76px] z-40 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div
            className="absolute inset-0"
            onClick={() => setVideoCallUser(null)}
          />
          <div className="relative w-full max-w-md bg-white dark:bg-[#0D152D] rounded-2xl shadow-2xl border border-[#E5EAF2] dark:border-[#1A2548] overflow-hidden z-10 animate-in zoom-in-95 duration-150 max-h-[90vh] sm:max-h-[85vh] overflow-y-auto">
            {/* Header */}
            <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-[#E5EAF2] dark:border-[#1A2548] flex items-center justify-between bg-gradient-to-r from-indigo-50/60 to-purple-50/60 dark:from-indigo-950/60 dark:to-purple-950/60">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md flex-shrink-0">
                  <Video className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-[#172033] dark:text-white">Direct Video Call</h3>
                  <p className="text-xs text-[#8292AD] dark:text-slate-400">{videoCallUser.name}</p>
                </div>
              </div>
              <button
                onClick={() => setVideoCallUser(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="p-4 sm:p-6 space-y-4">
              <div className="flex items-center gap-3 p-3 bg-[#F8FAFC] dark:bg-[#0A1128] border border-[#E5EAF2] dark:border-[#1A2548] rounded-xl">
                <img src={videoCallUser.avatar} alt={videoCallUser.name} className="w-10 h-10 rounded-full object-cover border border-[#E5EAF2] dark:border-[#1E2D54] flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-[#172033] dark:text-white truncate">{videoCallUser.name}</p>
                  <p className="text-xs text-[#8292AD] dark:text-slate-400 truncate">{videoCallUser.role} • {videoCallUser.email}</p>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 flex-shrink-0">
                  Online
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#172033] dark:text-white mb-1.5">Personal Meeting Room</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={`https://meet.pulsecrm.io/call/${videoCallUser.id || 'live'}`}
                    className="flex-1 min-w-0 px-3 py-2 text-xs bg-[#F8FAFC] dark:bg-[#0A1128] rounded-xl border border-[#E5EAF2] dark:border-[#1E2D54] text-[#475569] dark:text-slate-200 font-mono select-all"
                  />
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(`https://meet.pulsecrm.io/call/${videoCallUser.id || 'live'}`);
                      setCopiedLink(true);
                      showToast('Call link copied to clipboard!', 'info');
                      setTimeout(() => setCopiedLink(false), 2000);
                    }}
                    className="px-3 py-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800/60 rounded-xl transition-colors flex items-center gap-1.5 flex-shrink-0 cursor-pointer"
                  >
                    {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedLink ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60 flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-indigo-900 dark:text-indigo-200 leading-relaxed">
                  Initiate 1-on-1 team discussion or invite guests with end-to-end encrypted video.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    showToast(`Calling ${videoCallUser.name}...`, 'success');
                    window.open(`https://meet.google.com/new`, '_blank');
                    setVideoCallUser(null);
                  }}
                  className="flex-1 py-2.5 px-4 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Video className="w-4 h-4" />
                  <span>Connect Video Call</span>
                </button>
                <button
                  type="button"
                  onClick={() => setVideoCallUser(null)}
                  className="py-2.5 px-4 text-xs font-semibold text-[#8292AD] dark:text-slate-400 hover:text-[#172033] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
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
        isOpen={!!deletingUser}
        title="Delete Team Member"
        itemName={deletingUser?.name}
        itemSubtitle={`${deletingUser?.role} • ${deletingUser?.company}`}
        itemImage={deletingUser?.avatar}
        warningMessage="Are you sure you want to remove this user? Their account access, permissions, and session tokens will be permanently revoked."
        confirmText="Yes, Delete User"
        onConfirm={() => {
          if (deletingUser) {
            deleteUser(deletingUser.id);
            setDeletingUser(null);
            if (editingUser?.id === deletingUser.id) {
              setEditingUser(null);
            }
          }
        }}
        onClose={() => setDeletingUser(null)}
      />
    </div>
  );
};

