import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Building2,
  Repeat,
  CreditCard,
  Users,
  Layers,
  Gauge,
  BarChart3,
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

export const MAIN_NAV_ITEMS = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard, short: 'Dashboard' },
  { name: 'Companies', path: '/companies', icon: Building2, short: 'Companies' },
  { name: 'Subscriptions', path: '/subscriptions', icon: Repeat, short: 'Subscriptions' },
  { name: 'Billing & Payments', path: '/billing', icon: CreditCard, short: 'Billing' },
  { name: 'Users', path: '/users', icon: Users, short: 'Users' },
  { name: 'Plans & Pricing', path: '/plans', icon: Layers, short: 'Plans' },
  { name: 'Usage & Limits', path: '/usage', icon: Gauge, short: 'Usage' },
  { name: 'Analytics', path: '/analytics', icon: BarChart3, short: 'Analytics' },
  { name: 'Support Tickets', path: '/support', icon: Headphones, short: 'Support' },
  { name: 'Activity Log', path: '/activity', icon: Clock, short: 'Activity' },
  { name: 'Settings', path: '/settings', icon: Settings, short: 'Settings' },
];

export const NAV_ITEMS = MAIN_NAV_ITEMS;

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
      className={`hidden md:flex flex-col h-screen sticky top-0 select-none z-40 flex-shrink-0 justify-between overflow-hidden transition-all duration-300 ease-in-out bg-[#060A18] border-r border-[#131B33] ${
        sidebarCollapsed ? 'w-[76px] py-4 items-center' : 'w-64 py-4 px-3'
      }`}
    >
      <div className="flex flex-col w-full flex-1 overflow-hidden">
        {/* Brand / Logo Header */}
        {sidebarCollapsed ? (
          <div className="relative group cursor-pointer pt-2 mb-3 flex-shrink-0 mx-auto">
            <div
              onClick={() => setSidebarCollapsed(false)}
              className="w-[46px] h-[46px] rounded-full bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] flex items-center justify-center p-2 ring-2 ring-[#3B82F6]/70 shadow-[0_0_16px_rgba(37,99,235,0.45)] transition-transform duration-200 group-hover:scale-105"
              style={{ outline: 'rgb(255, 255, 255) solid 1px', outlineOffset: '-2px' }}
              title="Click to expand sidebar"
            >
              <img
                src="/pulse-logo.png"
                alt="Pulse CRM"
                className="w-full h-full object-contain brightness-0 invert"
              />
            </div>
            {/* Tooltip on hover */}
            <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-2.5 py-1 text-[11px] font-semibold rounded-md shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap bg-[#0D152D] text-white border border-[#1A2544]">
              Expand Pulse CRM
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between px-2 pb-3 mb-2 border-b border-[#131B33] flex-shrink-0">
            <div className="flex items-center gap-3 overflow-hidden cursor-pointer" onClick={() => navigate('/')}>
              <div
                className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] flex items-center justify-center p-2 ring-2 ring-[#3B82F6]/70 shadow-[0_0_14px_rgba(37,99,235,0.35)] flex-shrink-0"
                style={{ outline: 'rgb(255, 255, 255) solid 1px', outlineOffset: '-2px' }}
              >
                <img
                  src="/pulse-logo.png"
                  alt="Pulse CRM"
                  className="w-full h-full object-contain brightness-0 invert"
                />
              </div>
              <div className="flex flex-col truncate">
                <span className="font-extrabold text-sm tracking-tight text-white flex items-center gap-1.5 leading-snug">
                  Pulse <span className="text-[#3B82F6]">CRM</span>
                </span>
                <span className="text-[10px] text-[#8292AD] font-medium tracking-wide">
                  SaaS Management
                </span>
              </div>
            </div>

            <button
              onClick={() => setSidebarCollapsed(true)}
              className="p-1.5 rounded-lg text-[#8292AD] hover:text-white hover:bg-[#0D152D] transition-colors"
              title="Collapse sidebar to icon rail"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Navigation Items (Main Navigation) */}
        <nav className="flex flex-col w-full overflow-y-auto no-scrollbar flex-1 py-1 space-y-1">
          {MAIN_NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            // Collapsed Rail View
            if (sidebarCollapsed) {
              return (
                <React.Fragment key={item.path}>
                  <NavLink
                    to={item.path}
                    className={`group relative w-[62px] h-[50px] mx-auto flex-shrink-0 flex flex-col items-center justify-center rounded-xl transition-all duration-150 ${
                      isActive
                        ? 'bg-[#0D1938] border border-blue-500/50 text-white shadow-[0_0_14px_rgba(37,99,235,0.28)]'
                        : 'text-[#76849D] hover:text-white hover:bg-[#0D152D]/80 border border-transparent'
                    }`}
                  >
                    <Icon
                      className={`w-[18px] h-[18px] mb-0.5 transition-transform group-hover:scale-105 stroke-[1.8] ${
                        isActive ? 'text-[#3B82F6]' : 'text-[#e8eaed] group-hover:text-white'
                      }`}
                    />
                    <span
                      className={`text-[9.5px] tracking-tight leading-none text-center truncate max-w-[58px] ${
                        isActive
                          ? 'font-semibold text-[#93C5FD]'
                          : 'font-medium text-[#e8eaed] group-hover:text-[#E2E8F0]'
                      }`}
                    >
                      {item.short}
                    </span>

                    {/* Tooltip on hover */}
                    <div className="absolute left-full ml-3 px-2.5 py-1 text-[11px] font-semibold rounded-md shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap bg-[#0D152D] text-white border border-[#1A2544]">
                      {item.name}
                    </div>
                  </NavLink>
                </React.Fragment>
              );
            }

            // Expanded Mode Navigation Items (Matches Screenshot with solid blue active pill)
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs transition-all duration-150 group ${
                  isActive
                    ? 'bg-[#2563EB] text-white font-bold shadow-md shadow-blue-600/30'
                    : 'text-[#e8eaed] hover:text-white hover:bg-[#131B38] font-medium'
                }`}
              >
                <Icon
                  className={`w-[18px] h-[18px] flex-shrink-0 stroke-[1.8] ${
                    isActive ? 'text-white' : 'text-[#e8eaed] group-hover:text-white'
                  }`}
                />
                <span className="truncate">{item.name}</span>
              </NavLink>
            );
          })}

          {/* Quick Actions Card (⚡ Quick Actions) */}
          {!sidebarCollapsed ? (
            <div className="pt-3 pb-1">
              <div className="bg-[#0D152D] rounded-xl p-3 border border-[#1A2544] shadow-xs">
                <div className="flex items-center gap-1.5 text-white font-bold text-xs mb-2.5">
                  <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span className="tracking-tight">Quick Actions</span>
                </div>
                <div className="space-y-1.5">
                  <button
                    onClick={() => setIsAddCompanyOpen(true)}
                    className="w-full flex items-center gap-2 py-1.5 px-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-white/[0.06] rounded-lg transition-colors text-left group"
                  >
                    <PlusCircle className="w-3.5 h-3.5 text-[#3B82F6] group-hover:scale-110 transition-transform" />
                    <span>Add Company</span>
                  </button>
                  <button
                    onClick={() => navigate('/billing')}
                    className="w-full flex items-center gap-2 py-1.5 px-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-white/[0.06] rounded-lg transition-colors text-left group"
                  >
                    <Clock className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
                    <span>View Pending Payments</span>
                  </button>
                  <button
                    onClick={() => navigate('/plans')}
                    className="w-full flex items-center gap-2 py-1.5 px-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-white/[0.06] rounded-lg transition-colors text-left group"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-purple-400 group-hover:scale-110 transition-transform" />
                    <span>Upgrade Plan</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Collapsed Quick Action trigger */
            <div className="pt-2 mx-auto">
              <button
                onClick={() => setIsAddCompanyOpen(true)}
                className="group relative w-[62px] h-[44px] flex flex-col items-center justify-center rounded-xl bg-[#0D152D] text-amber-400 border border-[#1A2544] hover:bg-[#131B38] transition-all"
                title="Quick Add Company"
              >
                <Zap className="w-4 h-4 fill-amber-400" />
                <span className="text-[9px] font-semibold text-slate-300 mt-0.5">Quick</span>
                <div className="absolute left-full ml-3 px-2.5 py-1 text-[11px] font-semibold rounded-md shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap bg-[#0D152D] text-white border border-[#1A2544]">
                  Quick Actions ⚡
                </div>
              </button>
            </div>
          )}
        </nav>
      </div>

      {/* Footer Profile Section (Bobby Singh / Super Admin) */}
      <div className="w-full pt-3 mt-1 flex-shrink-0 border-t border-[#131B33]">
        {sidebarCollapsed ? (
          <div className="flex flex-col items-center space-y-2">
            <NavLink
              to="/settings"
              className="group relative w-[42px] h-[42px] rounded-full flex items-center justify-center"
              title="Bobby Singh (Super Admin)"
            >
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces"
                alt="Bobby Singh"
                className="w-9 h-9 rounded-full object-cover ring-2 ring-blue-500/30 group-hover:ring-blue-500/70 transition-all"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-[#060A18]" />
              <div className="absolute left-full ml-3 px-2.5 py-1 text-[11px] font-semibold rounded-md shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap bg-[#0D152D] text-white border border-[#1A2544]">
                Bobby Singh • Super Admin
              </div>
            </NavLink>

            <button
              onClick={handleLogout}
              className="group relative w-[42px] h-[36px] flex items-center justify-center rounded-xl text-[#76849D] hover:text-rose-400 hover:bg-[#1A1222] transition-colors"
              title="Sign out"
            >
              <LogOut className="w-4 h-4" />
              <div className="absolute left-full ml-3 px-2.5 py-1 text-[11px] font-semibold rounded-md shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap bg-[#1A1222] text-rose-300 border border-rose-900/50">
                Logout
              </div>
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between p-2 rounded-xl hover:bg-[#0D152D] cursor-pointer group transition-colors">
            <div
              onClick={() => navigate('/settings')}
              className="flex items-center gap-2.5 min-w-0 flex-1 truncate"
            >
              <div className="relative flex-shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces"
                  alt="Bobby Singh"
                  className="w-9 h-9 rounded-full object-cover ring-2 ring-white/10 group-hover:ring-blue-500/50 transition-all"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-[#060A18]" />
              </div>
              <div className="truncate text-left">
                <p className="text-xs font-bold text-white truncate leading-snug group-hover:text-[#93C5FD] transition-colors">
                  Bobby Singh
                </p>
                <p className="text-[10px] text-[#8292AD] truncate leading-tight">
                  Super Admin
                </p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="p-1.5 text-[#8292AD] hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors ml-1"
              title="Sign out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};
