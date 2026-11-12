import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutGrid,
  Building2,
  Repeat,
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
  { name: 'Subscriptions', path: '/subscriptions', icon: Repeat, short: 'Subscriptions' },
  { name: 'Billing & Payments', path: '/billing', icon: CreditCard, short: 'Billing' },
  { name: 'Users', path: '/users', icon: Users, short: 'Users' },
  { name: 'Plans & Pricing', path: '/plans', icon: Tag, short: 'Plans' },
  { name: 'Usage & Limits', path: '/usage', icon: Gauge, short: 'Usage' },
  { name: 'Analytics', path: '/analytics', icon: TrendingUp, short: 'Analytics' },
  { name: 'Support Tickets', path: '/support', icon: Headphones, short: 'Support' },
  { name: 'Activity Log', path: '/activity', icon: Clock, short: 'Activity' },
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

  const handleUpgradePlan = () => {
    navigate('/plans');
    showToast('Navigated to Plans & Pricing to choose an upgrade tier', 'info');
  };

  return (
    <aside
      className={`hidden md:flex flex-col h-screen sticky top-0 py-3.5 select-none z-40 flex-shrink-0 justify-between transition-all duration-200 bg-[#060A18] border-r border-[#131B33] ${
        sidebarCollapsed ? 'w-[76px] items-center px-1' : 'w-64 px-3'
      }`}
    >
      <div className="flex flex-col w-full flex-1 overflow-hidden">
        {/* Brand Header */}
        <div
          className={`flex items-center pb-3 mb-2 border-b border-[#141E38] ${
            sidebarCollapsed ? 'justify-center' : 'justify-between px-1'
          }`}
        >
          <div
            onClick={() => navigate('/')}
            className="flex items-center gap-3 cursor-pointer group overflow-hidden"
          >
            {/* Circular Blue Logo Badge matching user screenshot */}
            <div
              className="w-[42px] h-[42px] rounded-full bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] flex items-center justify-center p-2 ring-2 ring-[#3B82F6]/70 shadow-[0_0_16px_rgba(37,99,235,0.45)] transition-transform duration-200 group-hover:scale-105 flex-shrink-0"
              style={{ outline: 'rgb(255, 255, 255) solid 1px', outlineOffset: '-2px' }}
            >
              <img
                src="/pulse-logo.png"
                alt="Pulse CRM"
                className="w-full h-full object-contain brightness-0 invert"
              />
            </div>

            {!sidebarCollapsed && (
              <div className="flex flex-col truncate">
                <span className="font-extrabold text-base tracking-tight text-white flex items-center gap-1">
                  Pulse <span className="text-[#3B82F6]">CRM</span>
                </span>
                <span className="text-[10px] text-[#8292AD] font-medium tracking-wide">
                  SaaS Management
                </span>
              </div>
            )}
          </div>

          {/* Toggle Button */}
          {!sidebarCollapsed && (
            <button
              onClick={() => setSidebarCollapsed(true)}
              className="p-1.5 rounded-lg text-[#8292AD] hover:text-white hover:bg-[#131B38] transition-colors"
              title="Collapse to Rail View"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Scrollable Navigation Items */}
        <nav className="flex flex-col w-full overflow-y-auto no-scrollbar flex-1 py-1 space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            if (sidebarCollapsed) {
              // Rail Mode
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
                      className={`w-[18px] h-[18px] mb-1 transition-transform group-hover:scale-105 stroke-[1.8] ${
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

                  {/* Divider */}
                  <div className="w-[52px] mx-auto h-[1px] my-0.5 flex-shrink-0 transition-colors bg-[#141E38]" />
                </React.Fragment>
              );
            }

            // Expanded Mode (Matches Screenshot #4)
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 group ${
                  isActive
                    ? 'bg-[#2563EB] text-white shadow-md shadow-blue-600/30 font-bold'
                    : 'text-[#e8eaed] hover:text-white hover:bg-[#131B38] border border-transparent'
                }`}
              >
                <Icon
                  className={`w-4 h-4 flex-shrink-0 stroke-[1.8] transition-transform group-hover:scale-105 ${
                    isActive ? 'text-white' : 'text-[#8292AD] group-hover:text-white'
                  }`}
                />
                <span className="truncate">{item.name}</span>
              </NavLink>
            );
          })}

          {/* Quick Actions ⚡ Box (Visible in Expanded Mode) */}
          {!sidebarCollapsed && (
            <div className="pt-3 pb-1">
              <div className="w-full h-[1px] mb-3 bg-[#141E38]" />
              <div className="bg-[#0D1938] rounded-xl p-3 border border-[#1B274F] shadow-xs">
                {/* Header with Lightning Icon */}
                <div className="flex items-center gap-1.5 text-white font-bold text-xs mb-2">
                  <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span>Quick Actions</span>
                </div>

                {/* Quick Action Items */}
                <div className="space-y-1">
                  <button
                    onClick={() => setIsAddCompanyOpen(true)}
                    className="w-full flex items-center gap-2 py-1.5 px-2 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-white/[0.08] transition-colors text-left group"
                  >
                    <PlusCircle className="w-3.5 h-3.5 text-slate-400 group-hover:text-white flex-shrink-0" />
                    <span className="truncate">Add Company</span>
                  </button>

                  <button
                    onClick={() => navigate('/billing')}
                    className="w-full flex items-center gap-2 py-1.5 px-2 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-white/[0.08] transition-colors text-left group"
                  >
                    <Clock className="w-3.5 h-3.5 text-slate-400 group-hover:text-white flex-shrink-0" />
                    <span className="truncate">View Pending Payments</span>
                  </button>

                  <button
                    onClick={handleUpgradePlan}
                    className="w-full flex items-center gap-2 py-1.5 px-2 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-white/[0.08] transition-colors text-left group"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-slate-400 group-hover:text-white flex-shrink-0" />
                    <span className="truncate">Upgrade Plan</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </nav>
      </div>

      {/* User Profile Section at Bottom (Matches Bobby Singh in user image) */}
      <div className="w-full pt-2 flex-shrink-0 border-t border-[#141E38]">
        {sidebarCollapsed ? (
          <div className="flex flex-col items-center space-y-2">
            <button
              onClick={() => navigate('/settings')}
              title="Bobby Singh (Super Admin)"
              className="relative p-1 rounded-full hover:ring-2 hover:ring-blue-500 transition-all"
            >
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces"
                alt="Bobby Singh"
                className="w-8 h-8 rounded-full object-cover ring-2 ring-blue-500/40"
              />
              <span className="absolute bottom-0.5 right-0.5 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-[#060A18]" />
            </button>
            <button
              onClick={handleLogout}
              title="Logout"
              className="p-2 text-[#76849D] hover:text-rose-400 hover:bg-[#1A1222] rounded-xl transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div
            onClick={() => navigate('/settings')}
            className="flex items-center justify-between p-2 rounded-xl hover:bg-[#0D152D] cursor-pointer group transition-colors"
          >
            <div className="flex items-center gap-2.5 truncate">
              <div className="relative flex-shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=faces"
                  alt="Bobby Singh"
                  className="w-9 h-9 rounded-full object-cover ring-2 ring-blue-500/30 group-hover:ring-blue-500/60 transition-all"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-[#060A18]" />
              </div>
              <div className="truncate text-left">
                <p className="text-xs font-bold text-white truncate leading-tight group-hover:text-blue-400 transition-colors">
                  Bobby Singh
                </p>
                <p className="text-[10px] text-[#8292AD] truncate mt-0.5 font-medium">
                  Super Admin
                </p>
              </div>
            </div>

            <ChevronDown className="w-3.5 h-3.5 text-[#8292AD] group-hover:text-white transition-colors flex-shrink-0 ml-1.5" />
          </div>
        )}
      </div>
    </aside>
  );
};
