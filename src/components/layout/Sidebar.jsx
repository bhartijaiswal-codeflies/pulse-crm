import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutGrid,
  Building2,
  CreditCard,
  Users,
  Tag,
  Gauge,
  TrendingUp,
  Headphones,
  Clock,
  Settings,
  Zap,
  PlusCircle,
  Sparkles,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  LogOut,
  User as UserIcon
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const NAV_ITEMS = [
  { name: 'Dashboard', path: '/', icon: LayoutGrid, short: 'Dashboard' },
  { name: 'Companies', path: '/companies', icon: Building2, short: 'Companies' },
  { name: 'Subscriptions', path: '/subscriptions', icon: CreditCard, short: 'Subscriptions' },
  { name: 'Billing & Payments', path: '/billing', icon: CreditCard, short: 'Billing & Payments' },
  { name: 'Users', path: '/users', icon: Users, short: 'Users' },
  { name: 'Plans & Pricing', path: '/plans', icon: Tag, short: 'Plans & Pricing' },
  { name: 'Usage & Limits', path: '/usage', icon: Gauge, short: 'Usage & Limits' },
  { name: 'Analytics', path: '/analytics', icon: TrendingUp, short: 'Analytics' },
  { name: 'Support Tickets', path: '/support', icon: Headphones, short: 'Support Tickets' },
  { name: 'Activity Log', path: '/activity', icon: Clock, short: 'Activity Log' },
  { name: 'Settings', path: '/settings', icon: Settings, short: 'Settings' },
];

export const Sidebar = () => {
  const {
    sidebarCollapsed,
    setSidebarCollapsed,
    setIsAddCompanyOpen,
    showToast
  } = useApp();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    showToast('Signed out of Pulse CRM session', 'info');
  };

  return (
    <aside
      className={`fixed top-0 left-0 h-screen z-40 bg-[#090E23] text-white flex flex-col transition-all duration-300 ease-in-out border-r border-[#152042] ${
        sidebarCollapsed ? 'w-[80px]' : 'w-64'
      } hidden md:flex`}
    >
      {/* Brand Header */}
      <div className={`flex items-center ${sidebarCollapsed ? 'justify-center py-4' : 'justify-between px-4 h-16'} border-b border-[#152042]`}>
        <div className="flex items-center gap-3 overflow-hidden">
          {/* Circular Blue Logo Badge matching user screenshot */}
          <div className="w-10 h-10 rounded-full bg-[#1D4ED8] border-2 border-[#3B82F6] flex items-center justify-center p-2 shadow-lg shadow-blue-500/20 flex-shrink-0">
            <img
              src="/pulse-logo.png"
              alt="Pulse CRM"
              className="w-full h-full object-contain filter brightness-0 invert"
            />
          </div>
          {!sidebarCollapsed && (
            <div className="flex flex-col truncate">
              <span className="font-bold text-base tracking-tight text-white flex items-center gap-1.5">
                Pulse <span className="text-[#3B82F6]">CRM</span>
              </span>
              <span className="text-[10px] text-[#8292AD] font-medium tracking-wide uppercase">
                SaaS Admin Hub
              </span>
            </div>
          )}
        </div>

        {/* Toggle Collapse/Expand */}
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="p-1.5 rounded-lg text-[#8292AD] hover:text-white hover:bg-[#131B38] transition-colors"
          title={sidebarCollapsed ? "Expand Sidebar" : "Collapse to Rail"}
        >
          {sidebarCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Navigation List */}
      <div className={`flex-1 overflow-y-auto sidebar-scroll ${sidebarCollapsed ? 'py-2 px-1.5' : 'py-3 px-3 space-y-4'}`}>
        {/* Main Section */}
        <nav className="space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            if (sidebarCollapsed) {
              // Rail Mode
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  title={item.name}
                  className="group block relative w-full"
                >
                  <div
                    className={`w-full py-2.5 px-1 rounded-2xl flex flex-col items-center justify-center transition-all duration-150 ${
                      isActive
                        ? 'border-2 border-[#2563EB] bg-[#0c1638] text-white shadow-lg shadow-blue-600/10'
                        : 'border border-transparent text-[#94A3B8] hover:text-white hover:bg-[#131B38]/60'
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 mb-1.5 transition-transform group-hover:scale-105 ${
                        isActive ? 'text-[#3B82F6]' : 'text-slate-200 group-hover:text-white'
                      }`}
                    />
                    <span
                      className={`text-[10px] font-medium leading-none text-center tracking-tight truncate max-w-full px-0.5 ${
                        isActive ? 'text-white font-semibold' : 'text-slate-300 group-hover:text-white'
                      }`}
                    >
                      {item.short.split(' ')[0]}
                    </span>
                  </div>
                  <div className="w-8 mx-auto h-[1px] bg-white/[0.04] mt-1" />
                </NavLink>
              );
            }

            // Expanded Sidebar (Exact match to uploaded image media_1794473726456_97669800.jpg)
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group ${
                  isActive
                    ? 'bg-[#2563EB] text-white shadow-md shadow-blue-600/30 font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-[#131B38]'
                }`}
              >
                <Icon
                  className={`w-5 h-5 flex-shrink-0 transition-transform group-hover:scale-105 ${
                    isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'
                  }`}
                />
                <span className="truncate">{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Quick Actions Card (Exact match to uploaded image) */}
        {!sidebarCollapsed && (
          <div className="pt-2">
            <div className="bg-[#0E1738] rounded-2xl p-3.5 border border-[#1B274F]">
              {/* Header with Lightning icon */}
              <div className="flex items-center gap-2 text-white font-bold text-sm mb-2.5">
                <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span>Quick Actions</span>
              </div>

              {/* Items */}
              <div className="space-y-1">
                <button
                  onClick={() => setIsAddCompanyOpen(true)}
                  className="w-full flex items-center gap-2.5 py-1.5 px-2 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-white/[0.05] transition-colors text-left group"
                >
                  <PlusCircle className="w-4 h-4 text-slate-300 group-hover:text-white flex-shrink-0" />
                  <span className="truncate">Add Company</span>
                </button>

                <button
                  onClick={() => navigate('/billing')}
                  className="w-full flex items-center gap-2.5 py-1.5 px-2 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-white/[0.05] transition-colors text-left group"
                >
                  <Clock className="w-4 h-4 text-slate-300 group-hover:text-white flex-shrink-0" />
                  <span className="truncate">View Pending Payments</span>
                </button>

                <button
                  onClick={() => navigate('/plans')}
                  className="w-full flex items-center gap-2.5 py-1.5 px-2 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-white/[0.05] transition-colors text-left group"
                >
                  <Sparkles className="w-4 h-4 text-slate-300 group-hover:text-white flex-shrink-0" />
                  <span className="truncate">Upgrade Plan</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* User Profile Footer (Exact match to Bobby Singh in uploaded image) */}
      <div className="border-t border-[#152042] bg-[#070C1E] p-3.5">
        {sidebarCollapsed ? (
          <div className="flex flex-col items-center space-y-2">
            <button
              onClick={() => navigate('/settings')}
              title="Bobby Singh (Super Admin)"
              className="p-1 rounded-full hover:ring-2 hover:ring-blue-500 transition-all"
            >
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces"
                alt="Bobby Singh"
                className="w-8 h-8 rounded-full object-cover ring-2 ring-blue-500/40"
              />
            </button>
            <button
              onClick={handleLogout}
              title="Logout"
              className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div
            onClick={() => navigate('/settings')}
            className="flex items-center justify-between cursor-pointer group hover:opacity-95 transition-opacity"
          >
            <div className="flex items-center gap-3 truncate">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=faces"
                  alt="Bobby Singh"
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-500/30 group-hover:ring-blue-500/60 transition-all"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-[#080D20]"></span>
              </div>
              <div className="truncate text-left">
                <p className="text-sm font-bold text-white truncate leading-tight group-hover:text-blue-400 transition-colors">
                  Bobby Singh
                </p>
                <p className="text-xs text-[#8292AD] truncate mt-0.5">Super Admin</p>
              </div>
            </div>

            <ChevronDown className="w-4 h-4 text-[#8292AD] group-hover:text-white transition-colors flex-shrink-0 ml-2" />
          </div>
        )}
      </div>
    </aside>
  );
};
