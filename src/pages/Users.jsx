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
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ImageUploadOption } from '../components/common/ImageUploadOption';

export const Users = () => {
  const { users, addUser, updateUser, deleteUser, showToast } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [permissionsUser, setPermissionsUser] = useState(null);
  const [videoCallUser, setVideoCallUser] = useState(null);
  const [copiedLink, setCopiedLink] = useState(false);
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
    const matchesRole = roleFilter === 'All' || u.role === roleFilter;
    return matchesSearch && matchesRole;
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
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#172033] tracking-tight">
            Users & Team Access
          </h1>
          <p className="text-xs md:text-sm text-[#8292AD] mt-1 font-medium">
            Manage admin privileges, tenant administrators, and role-based access control
          </p>
        </div>

        <button
          onClick={() => setIsAddUserOpen(true)}
          className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-[#2563EB] hover:bg-blue-700 rounded-xl shadow-md shadow-blue-500/20 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Invite User</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-[#E5EAF2] shadow-xs">
          <p className="text-xs font-bold text-[#8292AD] uppercase">Total Users</p>
          <p className="text-2xl font-black text-[#172033] mt-1">{users.length}</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-[#E5EAF2] shadow-xs">
          <p className="text-xs font-bold text-[#8292AD] uppercase">Active Now</p>
          <p className="text-2xl font-black text-emerald-600 mt-1">
            {users.filter(u => u.status === 'Active').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-[#E5EAF2] shadow-xs">
          <p className="text-xs font-bold text-[#8292AD] uppercase">Super Admins</p>
          <p className="text-2xl font-black text-purple-600 mt-1">1</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-[#E5EAF2] shadow-xs">
          <p className="text-xs font-bold text-[#8292AD] uppercase">2FA Enforced</p>
          <p className="text-2xl font-black text-blue-600 mt-1">100%</p>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-[#E5EAF2] shadow-xs flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        <div className="relative w-full lg:w-80 flex-1 min-w-[200px]">
          <Search className="w-4 h-4 text-[#8292AD] absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search users by name, email..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-[#F7F9FC] border border-[#E5EAF2] rounded-xl focus:outline-none focus:border-blue-500 text-[#172033]"
          />
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar flex-wrap sm:flex-nowrap">
          {['All', 'Super Administrator', 'Company Admin', 'Billing Manager', 'Developer'].map((role) => (
            <button
              key={role}
              onClick={() => setRoleFilter(role)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                roleFilter === role
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-[#F7F9FC] text-[#8292AD] hover:text-[#172033] border border-[#E5EAF2]'
              }`}
            >
              {role === 'Super Administrator' ? 'Super Admin' : role}
            </button>
          ))}
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl border border-[#E5EAF2] shadow-[0_1px_3px_rgba(0,0,0,0.04)] overflow-hidden">
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F7F9FC] border-b border-[#E5EAF2] text-[11px] font-bold text-[#8292AD] uppercase tracking-wider">
                <th className="py-3.5 px-3 lg:px-4">User</th>
                <th className="py-3.5 px-3 lg:px-4">Role</th>
                <th className="py-3.5 px-3 lg:px-4 hidden lg:table-cell">Organization</th>
                <th className="py-3.5 px-3 lg:px-4 hidden xl:table-cell">Department</th>
                <th className="py-3.5 px-3 lg:px-4">Status</th>
                <th className="py-3.5 px-3 lg:px-4 hidden lg:table-cell">Last Active</th>
                <th className="py-3.5 px-2 lg:px-4 text-center font-bold text-[11px] text-[#8292AD] uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5EAF2] text-xs">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-[#F7F9FC]/80 transition-colors group">
                  <td className="py-3.5 px-3 lg:px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-9 h-9 rounded-full object-cover border border-[#E5EAF2]"
                      />
                      <div>
                        <p className="font-bold text-[#172033] group-hover:text-blue-600">
                          {user.name}
                        </p>
                        <p className="text-[11px] text-[#8292AD]">
                          {user.email} <span className="lg:hidden text-[#64748B] font-medium">• {user.company}</span>
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

                  <td className="py-3.5 px-3 lg:px-4 whitespace-nowrap font-medium text-[#172033] hidden lg:table-cell">
                    {user.company}
                  </td>

                  <td className="py-3.5 px-3 lg:px-4 whitespace-nowrap text-[#8292AD] hidden xl:table-cell">
                    {user.department}
                  </td>

                  <td className="py-3.5 px-3 lg:px-4 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                      user.status === 'Active'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-slate-100 text-slate-600 border border-slate-200'
                    }`}>
                      {user.status === 'Active' ? (
                        <CheckCircle className="w-3 h-3 text-emerald-600" />
                      ) : (
                        <XCircle className="w-3 h-3 text-slate-400" />
                      )}
                      {user.status}
                    </span>
                  </td>

                  <td className="py-3.5 px-3 lg:px-4 whitespace-nowrap text-[#8292AD] hidden lg:table-cell">
                    {user.lastActive}
                  </td>

                  <td className="py-2 px-1.5 sm:py-3.5 sm:px-2 md:px-3 text-center whitespace-nowrap">
                    <div className="flex items-center justify-center gap-1 sm:gap-1.5">
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
                        className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full border border-[#93C5FD] bg-[#EFF6FF]/70 text-[#2563EB] flex items-center justify-center hover:bg-[#DBEAFE] hover:border-[#3B82F6] hover:scale-105 transition-all shadow-xs cursor-pointer flex-shrink-0"
                        title="View Permissions & Access"
                      >
                        <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 stroke-[1.8]" />
                      </button>

                      {/* Edit User (Pencil - Green) */}
                      <button
                        type="button"
                        onClick={() => setEditingUser(user)}
                        className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full border border-[#86EFAC] bg-[#F0FDF4]/70 text-[#16A34A] flex items-center justify-center hover:bg-[#DCFCE7] hover:border-[#22C55E] hover:scale-105 transition-all shadow-xs cursor-pointer flex-shrink-0"
                        title="Edit User"
                      >
                        <Edit2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 stroke-[1.8]" />
                      </button>

                      {/* Video Call (Video - Purple) */}
                      <button
                        type="button"
                        onClick={() => setVideoCallUser(user)}
                        className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full border border-[#C7D2FE] bg-[#EEF2FF]/70 text-[#4F46E5] flex items-center justify-center hover:bg-[#E0E7FF] hover:border-[#6366F1] hover:scale-105 transition-all shadow-xs cursor-pointer flex-shrink-0"
                        title="Start Video Meeting"
                      >
                        <Video className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 stroke-[1.8]" />
                      </button>

                      {/* Delete User (Trash - Red) */}
                      <button
                        type="button"
                        onClick={() => {
                          deleteUser(user.id);
                          showToast(`${user.name} removed from team`, 'info');
                        }}
                        className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full border border-[#FECDD3] bg-[#FFF1F2]/70 text-[#E11D48] flex items-center justify-center hover:bg-[#FFE4E6] hover:border-[#F43F5E] hover:scale-105 transition-all shadow-xs cursor-pointer flex-shrink-0"
                        title="Delete User"
                      >
                        <Trash2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 stroke-[1.8]" />
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
        <div className="fixed top-10 bottom-0 right-0 left-0 md:left-[76px] z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="fixed top-10 bottom-0 right-0 left-0 md:left-[76px]" onClick={() => setIsAddUserOpen(false)} />
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
        <div className="fixed top-10 bottom-0 right-0 left-0 md:left-[76px] z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="fixed top-10 bottom-0 right-0 left-0 md:left-[76px]" onClick={() => setEditingUser(null)} />
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
                  onClick={() => {
                    deleteUser(editingUser.id);
                    setEditingUser(null);
                  }}
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
        <div className="fixed top-10 bottom-0 right-0 left-0 md:left-[76px] z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="fixed top-10 bottom-0 right-0 left-0 md:left-[76px]" onClick={() => setPermissionsUser(null)} />
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
        <div className="fixed top-10 bottom-0 right-0 left-0 md:left-[76px] z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div
            className="fixed top-10 bottom-0 right-0 left-0 md:left-[76px]"
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
    </div>
  );
};

