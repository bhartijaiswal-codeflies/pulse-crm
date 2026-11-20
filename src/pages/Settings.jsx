import React, { useState, useRef } from 'react';
import {
  User,
  Building2,
  Building,
  Mail,
  Phone,
  Clock,
  Globe,
  Shield,
  Lock,
  CheckCircle2,
  CheckCircle,
  RotateCw,
  Save,
  Upload,
  Camera,
  CreditCard,
  Key,
  Bell,
  ExternalLink,
  ChevronDown,
  Check,
  Copy,
  RefreshCw,
  Smartphone,
  Laptop,
  AlertCircle,
  Plus,
  Eye,
  EyeOff,
  Trash2,
  Zap,
  SlidersHorizontal,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Settings = () => {
  const { showToast } = useApp();
  const fileInputRef = useRef(null);

  // Active Top Tab
  const [activeTab, setActiveTab] = useState('general');

  // Avatar State
  const [avatarImage, setAvatarImage] = useState(null);

  // Profile Form State
  const [profileForm, setProfileForm] = useState({
    firstName: 'Bobby',
    lastName: 'Singh',
    email: 'bobby@codeflies.com',
    phone: '+91 98765 43210',
    roleTitle: 'Super Admin',
    department: 'Platform Engineering & Operations',
    bio: 'Lead SaaS Administrator responsible for multi-tenant billing, quotas, and platform infrastructure.'
  });

  // Organization & SaaS Console Branding State
  const [brandForm, setBrandForm] = useState({
    consoleTitle: 'XyroCRM — SaaS Management Console',
    legalEntity: 'Codeflies Technologies',
    supportEmail: 'support@codeflies.com',
    hotlinePhone: '+91 120 4567890',
    currency: 'INR (₹) — Indian Rupee',
    timezone: '(UTC+05:30) Asia/Kolkata (IST)',
    portalDomain: 'app.xyrocrm.com',
    coverageWindow: 'Mon - Fri, 9:00 AM - 7:00 PM IST'
  });

  // API Key State
  const [apiKey, setApiKey] = useState('pls_live_9a8f7c6e5d4b3a210987654321fedcba');
  const [copiedKey, setCopiedKey] = useState(false);
  const [showKey, setShowKey] = useState(false);

  // Notification / Alert Rules State
  const [notifs, setNotifs] = useState({
    emailOnPayment: true,
    emailOnTicket: true,
    weeklyReport: true,
    slackWebhook: true,
    overdueAlert: true
  });

  // 2FA & Security State
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [passForm, setPassForm] = useState({ current: '', next: '', confirm: '' });

  // Handle Photo Upload
  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2.5 * 1024 * 1024) {
        showToast('Image size exceeds 2.5MB limit', 'error');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        setAvatarImage(event.target?.result);
        showToast('Profile photo updated successfully!', 'success');
      };
      reader.readAsDataURL(file);
    }
  };

  // Reset to Defaults
  const handleResetDefaults = () => {
    setProfileForm({
      firstName: 'Bobby',
      lastName: 'Singh',
      email: 'bobby@codeflies.com',
      phone: '+91 98765 43210',
      roleTitle: 'Super Admin',
      department: 'Platform Engineering & Operations',
      bio: 'Lead SaaS Administrator responsible for multi-tenant billing, quotas, and platform infrastructure.'
    });
    setBrandForm({
      consoleTitle: 'XyroCRM — SaaS Management Console',
      legalEntity: 'Codeflies Technologies',
      supportEmail: 'support@codeflies.com',
      hotlinePhone: '+91 120 4567890',
      currency: 'INR (₹) — Indian Rupee',
      timezone: '(UTC+05:30) Asia/Kolkata (IST)',
      portalDomain: 'app.xyrocrm.com',
      coverageWindow: 'Mon - Fri, 9:00 AM - 7:00 PM IST'
    });
    setAvatarImage(null);
    showToast('Reset all profile and console settings to system defaults', 'info');
  };

  // Save Settings
  const handleSaveAll = (e) => {
    if (e) e.preventDefault();
    showToast('Profile and organization configurations saved successfully!', 'success');
  };

  // Copy API Key
  const handleCopyKey = () => {
    navigator.clipboard?.writeText(apiKey);
    setCopiedKey(true);
    showToast('Master REST API key copied to clipboard', 'info');
    setTimeout(() => setCopiedKey(false), 2000);
  };

  // Rotate API Key
  const handleRotateKey = () => {
    const newKey = `pls_live_${Math.random().toString(36).substring(2)}${Math.random().toString(36).substring(2)}`;
    setApiKey(newKey);
    showToast('New production API key generated and activated!', 'success');
  };

  const tabs = [
    { id: 'general', name: 'General & Profile', icon: User },
    { id: 'gateways', name: 'Payment Gateways', icon: CreditCard },
    { id: 'api', name: 'API & Webhooks', icon: Key },
    { id: 'security', name: 'Security & 2FA', icon: Shield },
    { id: 'alerts', name: 'Alert Rules', icon: Bell }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Hidden File Input for Avatar Upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handlePhotoUpload}
        className="hidden"
      />

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <h1 className="text-2xl font-bold text-[#172033] dark:text-white tracking-tight">
              Settings & Profile
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#EFF6FF] text-[#2563EB] dark:bg-blue-950/60 dark:text-blue-400 border border-blue-100 dark:border-blue-900/40">
              Super Admin Console
            </span>
          </div>
          <p className="text-xs text-[#8292AD] dark:text-slate-400 mt-1 font-normal">
            Manage your personal administrator identity, photo avatar, security credentials, and global SaaS configurations.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <button
            type="button"
            onClick={handleSaveAll}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#2563EB] hover:bg-blue-700 rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Changes</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <div className="bg-white dark:bg-[#0D152D] p-1.5 rounded-2xl border border-[#E5EAF2] dark:border-[#1E2D54] shadow-xs flex items-center gap-1 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#2563EB] text-white shadow-xs'
                  : 'text-[#64748B] dark:text-slate-400 hover:text-[#172033] dark:hover:text-white hover:bg-slate-50 dark:hover:bg-[#121D3D]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.name}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: General & Profile (Matches exact mockup design) */}
      {activeTab === 'general' && (
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* ================= LEFT COLUMN: Overview Sidebar ================= */}
          <div className="w-full lg:w-[320px] xl:w-[340px] flex-shrink-0 space-y-5">
            {/* Main Profile Summary Card */}
            <div className="bg-white dark:bg-[#0D152D] rounded-2xl border border-[#E5EAF2] dark:border-[#1E2D54] p-6 shadow-xs text-center flex flex-col items-center">
              {/* Circular Avatar with Gradient Ring and Camera Button */}
              <div className="relative group">
                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#1E3A8A] via-[#2563EB] to-[#38BDF8] p-1 ring-4 ring-blue-50 dark:ring-blue-950/40 relative flex items-center justify-center overflow-hidden shadow-md">
                  {avatarImage ? (
                    <img
                      src={avatarImage}
                      alt={`${profileForm.firstName} ${profileForm.lastName}`}
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <span className="text-white text-2xl font-black tracking-wider">
                      {profileForm.firstName?.[0] || 'B'}
                      {profileForm.lastName?.[0] || 'S'}
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  title="Change avatar photo"
                  className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-[#2563EB] text-white flex items-center justify-center ring-2 ring-white dark:ring-[#0D152D] shadow-xs cursor-pointer hover:bg-blue-700 transition-colors"
                >
                  <Camera className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Name & Subtitle */}
              <h2 className="text-lg font-bold text-[#172033] dark:text-white mt-3.5">
                {profileForm.firstName} {profileForm.lastName}
              </h2>
              <p className="text-xs text-[#8292AD] dark:text-slate-400 font-medium mt-0.5">
                {brandForm.legalEntity}
              </p>

              {/* Badges Row */}
              <div className="flex items-center justify-center gap-2 mt-3 flex-wrap">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border border-purple-200 dark:border-purple-800/60 uppercase tracking-wide flex items-center gap-1">
                  <Shield className="w-3 h-3 text-[#7C3AED]" />
                  <span>SUPER ADMIN</span>
                </span>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Active Session</span>
                </span>
              </div>

              {/* Upload Photo Button */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="mt-4 px-4 py-2 rounded-xl text-xs font-semibold text-[#172033] dark:text-white bg-white dark:bg-[#121D3D] border border-[#E5EAF2] dark:border-[#1E2D54] hover:bg-slate-50 dark:hover:bg-[#1A2548] transition-colors shadow-2xs flex items-center gap-1.5 cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5 text-[#64748B] dark:text-slate-400" />
                <span>Upload Photo</span>
              </button>
              <p className="text-[10px] text-[#8292AD] dark:text-slate-500 mt-1.5">
                JPG, PNG, GIF or WEBP up to 2.5MB
              </p>

              {/* Divider */}
              <div className="w-full h-px bg-[#E5EAF2] dark:bg-[#1E2D54] my-5" />

              {/* Contact & Locale Meta Items */}
              <div className="w-full space-y-3.5 text-left text-xs">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-slate-50 dark:bg-[#121D3D] border border-[#E5EAF2] dark:border-[#1E2D54] flex items-center justify-center flex-shrink-0 text-[#64748B] dark:text-slate-400 mt-0.5">
                    <Building className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-bold text-[#8292AD] uppercase tracking-wider">
                      Operating Organization
                    </p>
                    <p className="text-xs font-semibold text-[#172033] dark:text-white truncate mt-0.5">
                      {brandForm.legalEntity}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-slate-50 dark:bg-[#121D3D] border border-[#E5EAF2] dark:border-[#1E2D54] flex items-center justify-center flex-shrink-0 text-[#64748B] dark:text-slate-400 mt-0.5">
                    <Mail className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-bold text-[#8292AD] uppercase tracking-wider">
                      Super Admin Email
                    </p>
                    <p className="text-xs font-semibold text-[#172033] dark:text-white truncate mt-0.5">
                      {profileForm.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-slate-50 dark:bg-[#121D3D] border border-[#E5EAF2] dark:border-[#1E2D54] flex items-center justify-center flex-shrink-0 text-[#64748B] dark:text-slate-400 mt-0.5">
                    <Phone className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-bold text-[#8292AD] uppercase tracking-wider">
                      Direct Contact
                    </p>
                    <p className="text-xs font-semibold text-[#172033] dark:text-white truncate mt-0.5">
                      {profileForm.phone}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-slate-50 dark:bg-[#121D3D] border border-[#E5EAF2] dark:border-[#1E2D54] flex items-center justify-center flex-shrink-0 text-[#64748B] dark:text-slate-400 mt-0.5">
                    <Clock className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-bold text-[#8292AD] uppercase tracking-wider">
                      Region & Timezone
                    </p>
                    <p className="text-xs font-semibold text-[#172033] dark:text-white truncate mt-0.5">
                      {brandForm.timezone}
                    </p>
                  </div>
                </div>
              </div>

              {/* Privilege Mini-Box */}
              <div className="w-full mt-5 bg-[#F8FAFF] dark:bg-[#080D20] rounded-xl p-3.5 border border-[#E2EDFF] dark:border-[#1E2D54] space-y-2 text-left">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#8292AD] dark:text-slate-400 text-[11px]">Root Privilege</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 dark:bg-blue-950/80 dark:text-blue-300 border border-blue-200 dark:border-blue-900/60 flex items-center gap-1">
                    <Lock className="w-2.5 h-2.5" />
                    <span>Unrestricted</span>
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#8292AD] dark:text-slate-400 text-[11px]">Multi-Factor 2FA</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/60">
                    • Enforced
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs pt-1 border-t border-[#E2EDFF] dark:border-[#1E2D54]">
                  <span className="text-[#8292AD] dark:text-slate-400 text-[11px]">Platform Environment</span>
                  <span className="text-xs font-bold text-[#172033] dark:text-white">
                    Production Live
                  </span>
                </div>
              </div>
            </div>

            {/* SOC2 Compliance Callout Card */}
            <div className="bg-white dark:bg-[#0D152D] rounded-2xl border border-[#E5EAF2] dark:border-[#1E2D54] p-4 sm:p-5 shadow-xs flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#172033] dark:text-white">
                  SOC2 Type II Protected
                </h4>
                <p className="text-[11px] text-[#8292AD] dark:text-slate-400 mt-0.5 leading-relaxed">
                  Console actions, token rotations, and tenant mutations are cryptographically signed.
                </p>
              </div>
            </div>
          </div>

          {/* ================= RIGHT COLUMN: Forms Area ================= */}
          <div className="flex-1 min-w-0 space-y-6">
            {/* Card 1: Super Admin Personal Profile */}
            <div className="bg-white dark:bg-[#0D152D] rounded-2xl border border-[#E5EAF2] dark:border-[#1E2D54] p-5 sm:p-6 shadow-xs">
              {/* Header */}
              <div className="flex items-center justify-between gap-3 border-b border-[#E5EAF2] dark:border-[#1E2D54] pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#172033] dark:text-white">
                      Super Admin Personal Profile
                    </h3>
                    <p className="text-xs text-[#8292AD] dark:text-slate-400">
                      Primary identity, contact credentials, and avatar photo for this console account.
                    </p>
                  </div>
                </div>
                <span className="text-[11px] text-[#8292AD] dark:text-slate-500 hidden sm:block">
                  Fields marked with <span className="text-red-500">*</span> are required
                </span>
              </div>

              {/* Sub-Card: Profile Information Photo */}
              <div className="mt-5 p-4 rounded-xl bg-[#F8FAFF] dark:bg-[#080D20] border border-[#E2EDFF] dark:border-[#1E2D54] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-sm flex-shrink-0 overflow-hidden shadow-xs">
                    {avatarImage ? (
                      <img src={avatarImage} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <span>
                        {profileForm.firstName?.[0] || 'B'}
                        {profileForm.lastName?.[0] || 'S'}
                      </span>
                    )}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#172033] dark:text-white">
                      Profile Information Photo
                    </h4>
                    <p className="text-[11px] text-[#8292AD] dark:text-slate-400 mt-0.5">
                      Shown on the dashboard top bar, sidebar user badge, audit trails, and tenant ticket replies.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-[#172033] dark:text-white bg-white dark:bg-[#121D3D] border border-[#E5EAF2] dark:border-[#1E2D54] hover:bg-slate-50 dark:hover:bg-[#1A2548] shadow-2xs flex items-center gap-1.5 self-start sm:self-auto cursor-pointer transition-colors"
                >
                  <Camera className="w-3.5 h-3.5 text-[#64748B] dark:text-slate-400" />
                  <span>Upload Photo</span>
                </button>
              </div>

              {/* Form Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
                <div>
                  <label className="block text-xs font-semibold text-[#172033] dark:text-white mb-1.5">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={profileForm.firstName}
                    onChange={(e) => setProfileForm({ ...profileForm, firstName: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs text-[#172033] dark:text-white bg-white dark:bg-[#080D20] border border-[#E5EAF2] dark:border-[#1E2D54] rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    placeholder="First Name"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#172033] dark:text-white mb-1.5">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={profileForm.lastName}
                    onChange={(e) => setProfileForm({ ...profileForm, lastName: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs text-[#172033] dark:text-white bg-white dark:bg-[#080D20] border border-[#E5EAF2] dark:border-[#1E2D54] rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    placeholder="Last Name"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#172033] dark:text-white mb-1.5">
                    Primary Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative flex items-center">
                    <Mail className="w-4 h-4 text-[#8292AD] dark:text-slate-500 absolute left-3.5 pointer-events-none" />
                    <input
                      type="email"
                      value={profileForm.email}
                      onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                      className="w-full pl-10 pr-3.5 py-2.5 text-xs text-[#172033] dark:text-white bg-white dark:bg-[#080D20] border border-[#E5EAF2] dark:border-[#1E2D54] rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                      placeholder="admin@codeflies.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#172033] dark:text-white mb-1.5">
                    Direct Contact Phone
                  </label>
                  <div className="relative flex items-center">
                    <Phone className="w-4 h-4 text-[#8292AD] dark:text-slate-500 absolute left-3.5 pointer-events-none" />
                    <input
                      type="tel"
                      value={profileForm.phone}
                      onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                      className="w-full pl-10 pr-3.5 py-2.5 text-xs text-[#172033] dark:text-white bg-white dark:bg-[#080D20] border border-[#E5EAF2] dark:border-[#1E2D54] rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#172033] dark:text-white mb-1.5">
                    Administrative Role Title
                  </label>
                  <input
                    type="text"
                    value={profileForm.roleTitle}
                    onChange={(e) => setProfileForm({ ...profileForm, roleTitle: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs text-[#172033] dark:text-white bg-white dark:bg-[#080D20] border border-[#E5EAF2] dark:border-[#1E2D54] rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    placeholder="Super Admin"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#172033] dark:text-white mb-1.5">
                    Department / Org Unit
                  </label>
                  <input
                    type="text"
                    value={profileForm.department}
                    onChange={(e) => setProfileForm({ ...profileForm, department: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs text-[#172033] dark:text-white bg-white dark:bg-[#080D20] border border-[#E5EAF2] dark:border-[#1E2D54] rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    placeholder="Platform Engineering & Operations"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-[#172033] dark:text-white mb-1.5">
                    Admin Biography / Scope Note
                  </label>
                  <textarea
                    rows={3}
                    value={profileForm.bio}
                    onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs text-[#172033] dark:text-white bg-white dark:bg-[#080D20] border border-[#E5EAF2] dark:border-[#1E2D54] rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-y leading-relaxed"
                    placeholder="Lead SaaS Administrator responsible for multi-tenant billing, quotas, and platform infrastructure."
                  />
                </div>
              </div>
            </div>

            {/* Card 2: Organization & SaaS Console Branding */}
            <div className="bg-white dark:bg-[#0D152D] rounded-2xl border border-[#E5EAF2] dark:border-[#1E2D54] p-5 sm:p-6 shadow-xs">
              {/* Header */}
              <div className="flex items-center gap-3 border-b border-[#E5EAF2] dark:border-[#1E2D54] pb-4">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#172033] dark:text-white">
                    Organization & SaaS Console Branding
                  </h3>
                  <p className="text-xs text-[#8292AD] dark:text-slate-400">
                    Configure SaaS branding title, operating corporate legal entity, regional currency, and support details.
                  </p>
                </div>
              </div>

              {/* Form Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
                <div>
                  <label className="block text-xs font-semibold text-[#172033] dark:text-white mb-1.5">
                    Console Title
                  </label>
                  <input
                    type="text"
                    value={brandForm.consoleTitle}
                    onChange={(e) => setBrandForm({ ...brandForm, consoleTitle: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs text-[#172033] dark:text-white bg-white dark:bg-[#080D20] border border-[#E5EAF2] dark:border-[#1E2D54] rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    placeholder="XyroCRM — SaaS Management Console"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#172033] dark:text-white mb-1.5">
                    Operating Legal Entity
                  </label>
                  <input
                    type="text"
                    value={brandForm.legalEntity}
                    onChange={(e) => setBrandForm({ ...brandForm, legalEntity: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs text-[#172033] dark:text-white bg-white dark:bg-[#080D20] border border-[#E5EAF2] dark:border-[#1E2D54] rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    placeholder="Codeflies Technologies"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#172033] dark:text-white mb-1.5">
                    Customer Support Email
                  </label>
                  <div className="relative flex items-center">
                    <Mail className="w-4 h-4 text-[#8292AD] dark:text-slate-500 absolute left-3.5 pointer-events-none" />
                    <input
                      type="email"
                      value={brandForm.supportEmail}
                      onChange={(e) => setBrandForm({ ...brandForm, supportEmail: e.target.value })}
                      className="w-full pl-10 pr-3.5 py-2.5 text-xs text-[#172033] dark:text-white bg-white dark:bg-[#080D20] border border-[#E5EAF2] dark:border-[#1E2D54] rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                      placeholder="support@codeflies.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#172033] dark:text-white mb-1.5">
                    Support Hotline Phone
                  </label>
                  <div className="relative flex items-center">
                    <Phone className="w-4 h-4 text-[#8292AD] dark:text-slate-500 absolute left-3.5 pointer-events-none" />
                    <input
                      type="tel"
                      value={brandForm.hotlinePhone}
                      onChange={(e) => setBrandForm({ ...brandForm, hotlinePhone: e.target.value })}
                      className="w-full pl-10 pr-3.5 py-2.5 text-xs text-[#172033] dark:text-white bg-white dark:bg-[#080D20] border border-[#E5EAF2] dark:border-[#1E2D54] rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                      placeholder="+91 120 4567890"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#172033] dark:text-white mb-1.5">
                    Default Billing Currency
                  </label>
                  <select
                    value={brandForm.currency}
                    onChange={(e) => setBrandForm({ ...brandForm, currency: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs text-[#172033] dark:text-white bg-white dark:bg-[#080D20] border border-[#E5EAF2] dark:border-[#1E2D54] rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer"
                  >
                    <option value="INR (₹) — Indian Rupee">INR (₹) — Indian Rupee</option>
                    <option value="USD ($) — US Dollar">USD ($) — US Dollar</option>
                    <option value="EUR (€) — Euro">EUR (€) — Euro</option>
                    <option value="GBP (£) — British Pound">GBP (£) — British Pound</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#172033] dark:text-white mb-1.5">
                    Console Timezone
                  </label>
                  <select
                    value={brandForm.timezone}
                    onChange={(e) => setBrandForm({ ...brandForm, timezone: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs text-[#172033] dark:text-white bg-white dark:bg-[#080D20] border border-[#E5EAF2] dark:border-[#1E2D54] rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer"
                  >
                    <option value="(UTC+05:30) Asia/Kolkata (IST)">(UTC+05:30) Asia/Kolkata (IST)</option>
                    <option value="(UTC+00:00) UTC (GMT)">(UTC+00:00) UTC (GMT)</option>
                    <option value="(UTC-05:00) America/New_York (EST)">(UTC-05:00) America/New_York (EST)</option>
                    <option value="(UTC-08:00) America/Los_Angeles (PST)">(UTC-08:00) America/Los_Angeles (PST)</option>
                    <option value="(UTC+08:00) Asia/Singapore (SGT)">(UTC+08:00) Asia/Singapore (SGT)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#172033] dark:text-white mb-1.5">
                    Tenant Web Portal Domain
                  </label>
                  <div className="relative flex items-center">
                    <Globe className="w-4 h-4 text-[#8292AD] dark:text-slate-500 absolute left-3.5 pointer-events-none" />
                    <input
                      type="text"
                      value={brandForm.portalDomain}
                      onChange={(e) => setBrandForm({ ...brandForm, portalDomain: e.target.value })}
                      className="w-full pl-10 pr-3.5 py-2.5 text-xs text-[#172033] dark:text-white bg-white dark:bg-[#080D20] border border-[#E5EAF2] dark:border-[#1E2D54] rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                      placeholder="app.xyrocrm.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#172033] dark:text-white mb-1.5">
                    Support Coverage Window
                  </label>
                  <div className="relative flex items-center">
                    <Clock className="w-4 h-4 text-[#8292AD] dark:text-slate-500 absolute left-3.5 pointer-events-none" />
                    <input
                      type="text"
                      value={brandForm.coverageWindow}
                      onChange={(e) => setBrandForm({ ...brandForm, coverageWindow: e.target.value })}
                      className="w-full pl-10 pr-3.5 py-2.5 text-xs text-[#172033] dark:text-white bg-white dark:bg-[#080D20] border border-[#E5EAF2] dark:border-[#1E2D54] rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                      placeholder="Mon - Fri, 9:00 AM - 7:00 PM IST"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Synchronization & Actions Card */}
            <div className="bg-white dark:bg-[#0D152D] rounded-2xl border border-[#E5EAF2] dark:border-[#1E2D54] p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span className="text-xs text-[#64748B] dark:text-slate-400 font-medium">
                  Profile information and photo updates will synchronize across your active sessions.
                </span>
              </div>

              <div className="flex items-center gap-2.5 self-end sm:self-auto">
                <button
                  type="button"
                  onClick={handleResetDefaults}
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#172033] dark:text-white bg-white dark:bg-[#121D3D] hover:bg-slate-50 dark:hover:bg-[#1A2548] border border-[#E5EAF2] dark:border-[#1E2D54] rounded-xl shadow-2xs transition-colors cursor-pointer"
                >
                  <RotateCw className="w-3.5 h-3.5 text-[#64748B] dark:text-slate-400" />
                  <span>Reset Defaults</span>
                </button>
                <button
                  type="button"
                  onClick={handleSaveAll}
                  className="flex items-center gap-1.5 px-4 sm:px-5 py-2 text-xs font-semibold text-white bg-[#2563EB] hover:bg-blue-700 rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Profile & Settings</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Payment Gateways */}
      {activeTab === 'gateways' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Stripe Card */}
            <div className="bg-white dark:bg-[#0D152D] rounded-2xl border border-[#E5EAF2] dark:border-[#1E2D54] p-5 sm:p-6 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#635BFF]/10 text-[#635BFF] flex items-center justify-center font-bold text-sm">
                      S
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[#172033] dark:text-white">Stripe Integration</h3>
                      <p className="text-xs text-[#8292AD] dark:text-slate-400">Global credit card & subscription recurring engine</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200">
                    Live Active
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#8292AD] mb-1">Webhook Endpoint</label>
                    <input
                      type="text"
                      readOnly
                      value="https://api.xyrocrm.com/v1/webhooks/stripe"
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-[#080D20] border border-[#E5EAF2] dark:border-[#1E2D54] text-[#172033] dark:text-white font-mono select-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#8292AD] mb-1">Publishable Key</label>
                    <input
                      type="text"
                      readOnly
                      value="pk_live_51M0abcdef1234567890XYZ..."
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-[#080D20] border border-[#E5EAF2] dark:border-[#1E2D54] text-[#172033] dark:text-white font-mono"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-[#E5EAF2] dark:border-[#1E2D54] flex items-center justify-between">
                <span className="text-[11px] text-[#8292AD]">Last charge: 24 mins ago</span>
                <button
                  type="button"
                  onClick={() => showToast('Stripe gateway configurations refreshed', 'info')}
                  className="px-3 py-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Configure Webhooks →
                </button>
              </div>
            </div>

            {/* Razorpay Card */}
            <div className="bg-white dark:bg-[#0D152D] rounded-2xl border border-[#E5EAF2] dark:border-[#1E2D54] p-5 sm:p-6 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#0C2340]/10 text-[#0C2340] dark:text-blue-400 flex items-center justify-center font-bold text-sm">
                      R
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[#172033] dark:text-white">Razorpay Subscriptions</h3>
                      <p className="text-xs text-[#8292AD] dark:text-slate-400">Domestic INR UPI, Netbanking & e-Mandates</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200">
                    Live Active
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#8292AD] mb-1">Key ID</label>
                    <input
                      type="text"
                      readOnly
                      value="rzp_live_K891234765abcdef"
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-[#080D20] border border-[#E5EAF2] dark:border-[#1E2D54] text-[#172033] dark:text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#8292AD] mb-1">e-Mandate Auto-Debit</label>
                    <div className="p-2.5 rounded-xl bg-blue-50/50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/40 flex items-center justify-between">
                      <span className="text-xs text-blue-700 dark:text-blue-300 font-semibold">UPI AutoPay / eNACH</span>
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">Enabled</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-[#E5EAF2] dark:border-[#1E2D54] flex items-center justify-between">
                <span className="text-[11px] text-[#8292AD]">Success Rate: 99.4%</span>
                <button
                  type="button"
                  onClick={() => showToast('Razorpay keys verified successfully', 'success')}
                  className="px-3 py-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Test Connection →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: API & Webhooks */}
      {activeTab === 'api' && (
        <div className="bg-white dark:bg-[#0D152D] rounded-2xl p-5 sm:p-6 border border-[#E5EAF2] dark:border-[#1E2D54] shadow-xs space-y-6">
          <div>
            <h3 className="text-base font-bold text-[#172033] dark:text-white">
              Production Master REST API Credentials
            </h3>
            <p className="text-xs text-[#8292AD] dark:text-slate-400 mt-0.5">
              Use these tokens to authenticate tenant mutations, sync webhooks, and automate billing flows.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#F8FAFF] dark:bg-[#080D20] border border-[#E2EDFF] dark:border-[#1E2D54] space-y-3">
            <label className="block text-xs font-bold text-[#172033] dark:text-white">
              Master Live Secret Token
            </label>
            <div className="flex items-center gap-2">
              <input
                type={showKey ? 'text' : 'password'}
                readOnly
                value={apiKey}
                className="flex-1 min-w-0 font-mono text-xs px-3.5 py-2.5 bg-white dark:bg-[#0D152D] border border-[#E5EAF2] dark:border-[#1E2D54] rounded-xl text-[#172033] dark:text-white select-all"
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="p-2.5 bg-white dark:bg-[#0D152D] border border-[#E5EAF2] dark:border-[#1E2D54] rounded-xl hover:bg-slate-50 dark:hover:bg-[#121D3D] text-[#64748B] dark:text-slate-400 cursor-pointer"
                title={showKey ? 'Hide key' : 'Show key'}
              >
                {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
              <button
                type="button"
                onClick={handleCopyKey}
                className="px-3.5 py-2.5 bg-white dark:bg-[#0D152D] border border-[#E5EAF2] dark:border-[#1E2D54] hover:bg-slate-50 dark:hover:bg-[#121D3D] rounded-xl text-xs font-bold text-[#172033] dark:text-white flex items-center gap-1.5 shadow-2xs flex-shrink-0 cursor-pointer"
              >
                {copiedKey ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey ? 'Copied' : 'Copy Key'}</span>
              </button>
            </div>
            <p className="text-[11px] text-[#8292AD] dark:text-slate-400">
              Keep this key confidential. Never expose master tokens in public client-side repositories.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-4 border-t border-[#E5EAF2] dark:border-[#1E2D54]">
            <span className="text-xs text-[#8292AD] dark:text-slate-400">Last rotated: Nov 12, 2026 by Bobby Singh</span>
            <button
              type="button"
              onClick={handleRotateKey}
              className="flex items-center gap-2 px-4 py-2 border border-red-200 dark:border-red-900/60 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 text-xs font-bold rounded-xl transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Rotate API Secret Key</span>
            </button>
          </div>
        </div>
      )}

      {/* TAB 4: Security & 2FA */}
      {activeTab === 'security' && (
        <div className="bg-white dark:bg-[#0D152D] rounded-2xl p-5 sm:p-6 border border-[#E5EAF2] dark:border-[#1E2D54] shadow-xs space-y-6">
          <div>
            <h3 className="text-base font-bold text-[#172033] dark:text-white">
              Administrator Security & 2FA Governance
            </h3>
            <p className="text-xs text-[#8292AD] dark:text-slate-400 mt-0.5">
              Hardware keys, TOTP authenticator status, and active administrative sessions.
            </p>
          </div>

          {/* 2FA Status Row */}
          <div className="p-4 rounded-xl bg-[#F8FAFF] dark:bg-[#080D20] border border-[#E2EDFF] dark:border-[#1E2D54] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#172033] dark:text-white">
                  Multi-Factor Authentication (2FA) Enforced
                </p>
                <p className="text-[11px] text-[#8292AD] dark:text-slate-400">
                  TOTP Google Authenticator & 1Password Hardware Passkeys configured.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => showToast('2FA settings verified and active', 'success')}
              className="px-3 py-1.5 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs font-bold rounded-xl"
            >
              Enforced
            </button>
          </div>

          {/* Active Sessions List */}
          <div>
            <h4 className="text-xs font-bold text-[#172033] dark:text-white mb-3">
              Active Authorized Sessions
            </h4>
            <div className="space-y-2.5">
              <div className="p-3.5 rounded-xl border border-[#E5EAF2] dark:border-[#1E2D54] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Laptop className="w-4 h-4 text-blue-600" />
                  <div>
                    <p className="text-xs font-semibold text-[#172033] dark:text-white">
                      MacBook Pro 16" • Chrome 130 (Current Session)
                    </p>
                    <p className="text-[11px] text-[#8292AD]">Bangalore, India • 103.21.244.18</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                  Online Now
                </span>
              </div>

              <div className="p-3.5 rounded-xl border border-[#E5EAF2] dark:border-[#1E2D54] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Smartphone className="w-4 h-4 text-slate-500" />
                  <div>
                    <p className="text-xs font-semibold text-[#172033] dark:text-white">
                      iPhone 15 Pro • Safari Mobile
                    </p>
                    <p className="text-[11px] text-[#8292AD]">Bangalore, India • Active 2h ago</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => showToast('Mobile session revoked successfully', 'info')}
                  className="text-xs font-semibold text-red-600 hover:underline"
                >
                  Revoke
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: Alert Rules */}
      {activeTab === 'alerts' && (
        <div className="bg-white dark:bg-[#0D152D] rounded-2xl p-5 sm:p-6 border border-[#E5EAF2] dark:border-[#1E2D54] shadow-xs space-y-5">
          <div>
            <h3 className="text-base font-bold text-[#172033] dark:text-white">
              Automated Alerts & Webhook Triggers
            </h3>
            <p className="text-xs text-[#8292AD] dark:text-slate-400 mt-0.5">
              Real-time operational notifications dispatched across administrator channels.
            </p>
          </div>

          <div className="space-y-3">
            {[
              { id: 'emailOnPayment', label: 'Instant Payment Confirmation', desc: 'Send receipt on every successful gateway charge' },
              { id: 'emailOnTicket', label: 'Support Ticket Urgent Escalation', desc: 'Notify admins when a Critical ticket is logged' },
              { id: 'weeklyReport', label: 'Weekly MRR & Churn Digest', desc: 'Consolidated PDF summary dispatched every Monday morning' },
              { id: 'slackWebhook', label: 'Slack Operations Webhook Sync', desc: 'Stream audit logs directly to #pulse-crm-alerts' },
              { id: 'overdueAlert', label: 'Grace Period Overdue Warning', desc: 'Trigger automated retry notice at 7-day mark' }
            ].map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3.5 rounded-xl border border-[#E5EAF2] dark:border-[#1E2D54] hover:bg-slate-50 dark:hover:bg-[#121D3D] transition-colors"
              >
                <div>
                  <p className="text-xs font-bold text-[#172033] dark:text-white">{item.label}</p>
                  <p className="text-[11px] text-[#8292AD] dark:text-slate-400 mt-0.5">{item.desc}</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifs[item.id]}
                  onChange={(e) => setNotifs({ ...notifs, [item.id]: e.target.checked })}
                  className="w-4 h-4 text-blue-600 rounded cursor-pointer"
                />
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-[#E5EAF2] dark:border-[#1E2D54] flex justify-end">
            <button
              type="button"
              onClick={() => showToast('Notification rules saved successfully!', 'success')}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#2563EB] hover:bg-blue-700 rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Alert Rules</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export const Profile = Settings;
export default Settings;
