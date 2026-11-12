import React, { useState } from 'react';
import {
  Settings as SettingsIcon,
  User,
  Bell,
  Shield,
  Key,
  Globe,
  Save,
  Check,
  Copy,
  RefreshCw,
  Lock,
  Mail
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Settings = () => {
  const { showToast } = useApp();
  const [activeTab, setActiveTab] = useState('general');

  // General Settings
  const [generalForm, setGeneralForm] = useState({
    platformName: 'Pulse CRM SaaS Hub',
    supportEmail: 'support@pulsecrm.io',
    defaultCurrency: 'INR (₹)',
    timezone: 'Asia/Kolkata (IST +05:30)',
    portalDomain: 'app.pulsecrm.io'
  });

  // Profile Settings
  const [profileForm, setProfileForm] = useState({
    name: 'Saurabh H.',
    email: 'saurabh.h@pulsecrm.io',
    role: 'Super Administrator',
    phone: '+91 99887 66554',
    twoFactor: true
  });

  // API Key State
  const [apiKey, setApiKey] = useState('pls_live_9a8f7c6e5d4b3a210987654321fedcba');
  const [copied, setCopied] = useState(false);

  // Notification toggles
  const [notifs, setNotifs] = useState({
    emailOnPayment: true,
    emailOnTicket: true,
    weeklyReport: true,
    slackWebhook: true,
    overdueAlert: true
  });

  const handleCopyKey = () => {
    navigator.clipboard?.writeText(apiKey);
    setCopied(true);
    showToast('API Key copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRotateKey = () => {
    const newKey = `pls_live_${Math.random().toString(36).substring(2)}${Math.random().toString(36).substring(2)}`;
    setApiKey(newKey);
    showToast('New production API key generated and activated!');
  };

  const handleSaveGeneral = (e) => {
    e.preventDefault();
    showToast('General platform settings updated successfully!');
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    showToast('Admin profile saved successfully!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-[#172033] tracking-tight">
          System Settings & Platform Governance
        </h1>
        <p className="text-xs md:text-sm text-[#8292AD] mt-1 font-medium">
          Configure multi-tenant portal parameters, security keys, notification routing, and admin profile
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1.5 border-b border-[#E5EAF2] pb-3 overflow-x-auto">
        {[
          { id: 'general', name: 'General Platform', icon: Globe },
          { id: 'profile', name: 'Profile & Security', icon: User },
          { id: 'notifications', name: 'Notifications & Webhooks', icon: Bell },
          { id: 'api', name: 'API Keys & Secrets', icon: Key }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-[#8292AD] hover:text-[#172033] hover:bg-slate-100'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.name}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: General Platform */}
      {activeTab === 'general' && (
        <div className="bg-white rounded-2xl p-6 border border-[#E5EAF2] shadow-xs max-w-3xl space-y-5 animate-in fade-in duration-150">
          <div>
            <h3 className="text-base font-bold text-[#172033]">Tenant Branding & Locale</h3>
            <p className="text-xs text-[#8292AD]">Global parameters applied across all tenant organizations</p>
          </div>

          <form onSubmit={handleSaveGeneral} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#172033] mb-1">Platform Brand Name</label>
                <input
                  type="text"
                  value={generalForm.platformName}
                  onChange={(e) => setGeneralForm({ ...generalForm, platformName: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5EAF2] focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#172033] mb-1">Support Dispatch Email</label>
                <input
                  type="email"
                  value={generalForm.supportEmail}
                  onChange={(e) => setGeneralForm({ ...generalForm, supportEmail: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5EAF2] focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#172033] mb-1">Default Base Currency</label>
                <select
                  value={generalForm.defaultCurrency}
                  onChange={(e) => setGeneralForm({ ...generalForm, defaultCurrency: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5EAF2] focus:border-blue-500 bg-white"
                >
                  <option value="INR (₹)">INR - Indian Rupee (₹)</option>
                  <option value="USD ($)">USD - US Dollar ($)</option>
                  <option value="EUR (€)">EUR - Euro (€)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#172033] mb-1">System Timezone</label>
                <input
                  type="text"
                  value={generalForm.timezone}
                  onChange={(e) => setGeneralForm({ ...generalForm, timezone: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5EAF2] focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#172033] mb-1">Custom Portal Domain</label>
              <input
                type="text"
                value={generalForm.portalDomain}
                onChange={(e) => setGeneralForm({ ...generalForm, portalDomain: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5EAF2] focus:border-blue-500"
              />
            </div>

            <div className="pt-4 border-t border-[#E5EAF2] flex justify-end">
              <button
                type="submit"
                className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/20"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Platform Settings</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tab 2: Profile & Security */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-2xl p-6 border border-[#E5EAF2] shadow-xs max-w-3xl space-y-6 animate-in fade-in duration-150">
          <div>
            <h3 className="text-base font-bold text-[#172033]">Administrator Profile</h3>
            <p className="text-xs text-[#8292AD]">Super user credentials and multi-factor authentication</p>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="flex items-center gap-4 pb-4 border-b border-[#E5EAF2]">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&crop=faces"
                alt="Saurabh H."
                className="w-16 h-16 rounded-full object-cover ring-4 ring-blue-500/20"
              />
              <div>
                <p className="text-sm font-bold text-[#172033]">{profileForm.name}</p>
                <p className="text-xs text-[#8292AD]">{profileForm.role}</p>
                <button
                  type="button"
                  onClick={() => showToast('Avatar upload simulated')}
                  className="mt-2 text-xs font-semibold text-blue-600 hover:underline"
                >
                  Change Profile Photo
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#172033] mb-1">Full Name</label>
                <input
                  type="text"
                  value={profileForm.name}
                  onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5EAF2] focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#172033] mb-1">Email Address</label>
                <input
                  type="email"
                  value={profileForm.email}
                  onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5EAF2] focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            {/* 2FA Toggle */}
            <div className="p-4 rounded-xl bg-[#F7F9FC] border border-[#E5EAF2] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#172033]">Two-Factor Authentication (2FA)</p>
                  <p className="text-[11px] text-[#8292AD]">Hardware TOTP authenticator enabled</p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={profileForm.twoFactor}
                onChange={(e) => setProfileForm({ ...profileForm, twoFactor: e.target.checked })}
                className="w-4 h-4 text-blue-600 rounded"
              />
            </div>

            <div className="pt-4 border-t border-[#E5EAF2] flex justify-end">
              <button
                type="submit"
                className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/20"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Profile</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tab 3: Notifications */}
      {activeTab === 'notifications' && (
        <div className="bg-white rounded-2xl p-6 border border-[#E5EAF2] shadow-xs max-w-3xl space-y-5 animate-in fade-in duration-150">
          <div>
            <h3 className="text-base font-bold text-[#172033]">Automated Alerts & Webhook Triggers</h3>
            <p className="text-xs text-[#8292AD]">Real-time operational notifications dispatched across channels</p>
          </div>

          <div className="space-y-3">
            {[
              { id: 'emailOnPayment', label: 'Instant Payment Confirmation', desc: 'Send receipt on every successful gateway charge' },
              { id: 'emailOnTicket', label: 'Support Ticket Urgent Escalation', desc: 'Notify admins when a Critical ticket is logged' },
              { id: 'weeklyReport', label: 'Weekly MRR & Churn Digest', desc: 'Consolidated PDF summary dispatched every Monday' },
              { id: 'slackWebhook', label: 'Slack Operations Webhook Sync', desc: 'Stream audit logs directly to #pulse-crm-alerts' },
              { id: 'overdueAlert', label: 'Grace Period Overdue Warning', desc: 'Trigger automated retry notice at 7-day mark' }
            ].map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3.5 rounded-xl border border-[#E5EAF2] hover:bg-slate-50 transition-colors"
              >
                <div>
                  <p className="text-xs font-bold text-[#172033]">{item.label}</p>
                  <p className="text-[11px] text-[#8292AD] mt-0.5">{item.desc}</p>
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

          <div className="pt-4 border-t border-[#E5EAF2] flex justify-end">
            <button
              onClick={() => showToast('Notification preferences updated!')}
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/20"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Preferences</span>
            </button>
          </div>
        </div>
      )}

      {/* Tab 4: API Keys */}
      {activeTab === 'api' && (
        <div className="bg-white rounded-2xl p-6 border border-[#E5EAF2] shadow-xs max-w-3xl space-y-5 animate-in fade-in duration-150">
          <div>
            <h3 className="text-base font-bold text-[#172033]">Production API Credentials</h3>
            <p className="text-xs text-[#8292AD]">Use these REST tokens to authenticate webhooks and automate tenant billing</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-[#E5EAF2] space-y-3">
            <label className="block text-xs font-bold text-[#172033]">Master Secret Key</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={apiKey}
                className="flex-1 font-mono text-xs px-3 py-2 bg-white border border-[#E5EAF2] rounded-xl text-[#172033] select-all"
              />
              <button
                onClick={handleCopyKey}
                className="px-3.5 py-2 bg-white border border-[#E5EAF2] hover:bg-slate-100 rounded-xl text-xs font-bold text-[#172033] flex items-center gap-1.5 shadow-xs"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <p className="text-[11px] text-[#8292AD]">
              Keep this key confidential. Do not expose in client-side code repositories.
            </p>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-[#E5EAF2]">
            <span className="text-xs text-[#8292AD]">Last rotated: Nov 12, 2026</span>
            <button
              onClick={handleRotateKey}
              className="flex items-center gap-2 px-4 py-2 border border-red-200 text-red-600 hover:bg-red-50 text-xs font-bold rounded-xl transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Rotate API Secret Key</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

