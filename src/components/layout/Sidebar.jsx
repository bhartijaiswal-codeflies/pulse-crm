import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutGrid,
  Building2,
  Repeat,
  CreditCard,
  Users,
  Layers,
  Monitor,
  BarChart3,
  LifeBuoy,
  Clock,
  Settings,
  User,
  LogOut,
  ChevronLeft,
  ChevronRight,
  PlusCircle,
  AlertTriangle,
  Zap
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const NAV_ITEMS = [
  { name: 'Dashboard', path: '/', icon: LayoutGrid, short: 'Dashboard' },
  { name: 'Companies', path: '/companies', icon: Building2, short: 'Companies' },
  { name: 'Subscriptions', path: '/subscriptions', icon: Repeat, short: 'Subscripts' },
  { name: 'Billing & Payments', path: '/billing', icon: CreditCard, short: 'Finances', badge: '12' },
  { name: 'Users', path: '/users', icon: Users, short: 'Users' },
  { name: 'Plans & Pricing', path: '/plans', icon: Layers, short: 'Plans' },
  { name: 'Usage & Limits', path: '/usage', icon: Monitor, short: 'Assets' },
  { name: 'Analytics', path: '/analytics', icon: BarChart3, short: 'Analytics' },
  { name: 'Support Tickets', path: '/support', icon: LifeBuoy, short: 'Support' },
  { name: 'Activity Log', path: '/activity', icon: Clock, short: 'Calendar' },
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
      className={`fixed top-0 left-0 h-screen z-40 bg-[#080D20] text-white flex flex-col transition-all duration-300 ease-in-out border-r border-[#131B38] ${
        sidebarCollapsed ? 'w-[84px]' : 'w-64'
      } hidden md:flex`}
    >
      {/* Brand Header */}
      <div className={`flex items-center ${sidebarCollapsed ? 'justify-center py-4' : 'justify-between px-4 h-16'} border-b border-white/[0.06]`}>
        <div className="flex items-center gap-3 overflow-hidden">
          {/* Circular Blue Logo Badge matching user screenshot */}
          <div className="w-12 h-12 rounded-full bg-[#1D4ED8] border-2 border-[#3B82F6] flex items-center justify-center p-2.5 shadow-lg shadow-blue-500/20 flex-shrink-0">
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

      {/* Navigation List */}
      <div className={`flex-1 overflow-y-auto sidebar-scroll ${sidebarCollapsed ? 'py-2 px-1.5' : 'py-3 px-2 space-y-6'}`}>
        {/* Main Section */}
        <div>
          {!sidebarCollapsed && (
            <div className="px-3 mb-2 text-[11px] font-semibold tracking-wider text-[#8292AD] uppercase">
              Main
            </div>
          )}

          <nav className={sidebarCollapsed ? 'space-y-1' : 'space-y-1'}>
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              if (sidebarCollapsed) {
                // Exact Rail Mode Layout matching the uploaded reference image
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
                        className={`text-[10px] font-medium leading-none text-center tracking-tight ${
                          isActive ? 'text-white font-semibold' : 'text-slate-300 group-hover:text-white'
                        }`}
                      >
                        {item.short}
                      </span>
                    </div>

                    {/* Faint subtle separator line matching screenshot */}
                    <div className="w-8 mx-auto h-[1px] bg-white/[0.04] mt-1" />
                  </NavLink>
                );
              }

              // Expanded Sidebar Item
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                    isActive
                      ? 'bg-[#2563EB] text-white shadow-md shadow-blue-600/20'
                      : 'text-[#8292AD] hover:text-white hover:bg-[#131B38]'
                  }`}
                >
                  <div className="flex items-center gap-3 truncate">
                    <Icon className={`w-5 h-5 flex-shrink-0 transition-transform group-hover:scale-105 ${isActive ? 'text-white' : 'text-[#8292AD] group-hover:text-white'}`} />
                    <span className="truncate">{item.name}</span>
                  </div>
                  {item.badge && (
                    <span className={`text-[11px] px-1.5 py-0.5 rounded-full font-semibold ${
                      isActive ? 'bg-white/20 text-white' : 'bg-red-500/20 text-red-400'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}

            {/* Profile Item with Red Dot in Rail Mode */}
            {sidebarCollapsed && (
              <NavLink
                to="/settings"
                title="Profile & Settings"
                className="group block relative w-full pt-1"
              >
                <div className={`w-full py-2.5 px-1 rounded-2xl flex flex-col items-center justify-center transition-all duration-150 ${
                  location.pathname === '/settings'
                    ? 'border-2 border-[#2563EB] bg-[#0c1638] text-white'
                    : 'border border-transparent text-[#94A3B8] hover:text-white hover:bg-[#131B38]/60'
                }`}>
                  <div className="relative">
                    <User className="w-5 h-5 mb-1.5 text-slate-200 group-hover:text-white" />
                    {/* Coral Red Notification Dot matching user screenshot */}
                    <span className="absolute -top-0.5 -right-1 w-2.5 h-2.5 rounded-full bg-[#EF4444] ring-2 ring-[#080D20]"></span>
                  </div>
                  <span className="text-[11px] font-medium leading-tight text-center text-slate-300 group-hover:text-white">
                    Profile
                  </span>
                </div>
              </NavLink>
            )}
          </nav>
        </div>

        {/* Quick Actions (when expanded) */}
        {!sidebarCollapsed && (
          <div>
            <div className="px-3 mb-2 text-[11px] font-semibold tracking-wider text-[#8292AD] uppercase">
              Quick Actions
            </div>
            <div className="space-y-1">
              <button
                onClick={() => setIsAddCompanyOpen(true)}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-[#8292AD] hover:text-white hover:bg-[#131B38] transition-colors text-left group"
              >
                <PlusCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span className="truncate">Add Company</span>
              </button>

              <button
                onClick={() => navigate('/billing')}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-[#8292AD] hover:text-white hover:bg-[#131B38] transition-colors text-left group"
              >
                <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span className="truncate">Pending Payments</span>
                <span className="ml-auto text-[10px] bg-amber-500/20 text-amber-300 font-semibold px-1.5 py-0.2 rounded-full">12</span>
              </button>

              <button
                onClick={() => navigate('/plans')}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-[#8292AD] hover:text-white hover:bg-[#131B38] transition-colors text-left group"
              >
                <Zap className="w-4 h-4 text-blue-400 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span className="truncate">Upgrade Plans</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Pinned Logout at the Bottom matching uploaded screenshot */}
      <div className={`border-t border-white/[0.06] bg-[#060A18] ${sidebarCollapsed ? 'py-4 px-2' : 'p-3'}`}>
        {sidebarCollapsed ? (
          <button
            onClick={handleLogout}
            title="Sign Out"
            className="w-full flex flex-col items-center justify-center text-slate-300 hover:text-red-400 transition-colors group"
          >
            <LogOut className="w-5 h-5 mb-1 text-slate-300 group-hover:text-red-400 transition-colors" />
            <span className="text-[11px] font-medium text-slate-300 group-hover:text-red-400">
              Logout
            </span>
          </button>
        ) : (
          <div className="flex items-center justify-between">
            <NavLink
              to="/settings"
              className="flex items-center gap-3 truncate group hover:opacity-90 transition-opacity"
            >
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces"
                  alt="Saurabh H."
                  className="w-9 h-9 rounded-full object-cover ring-2 ring-blue-500/50"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-[#080D20]"></span>
              </div>
              <div className="truncate">
                <p className="text-sm font-semibold text-white truncate leading-tight group-hover:text-blue-400 transition-colors">
                  Saurabh H.
                </p>
                <p className="text-[11px] text-[#8292AD] truncate">Super Administrator</p>
              </div>
            </NavLink>

            <button
              onClick={handleLogout}
              className="p-1.5 rounded-lg text-[#8292AD] hover:text-red-400 hover:bg-red-500/10 transition-colors ml-1"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};
