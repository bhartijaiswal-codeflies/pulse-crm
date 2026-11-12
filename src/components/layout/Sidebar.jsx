import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Building2,
  Repeat,
  CreditCard,
  Users,
  Layers,
  Activity,
  BarChart3,
  LifeBuoy,
  History,
  Settings,
  PlusCircle,
  AlertTriangle,
  Zap,
  ChevronLeft,
  ChevronRight,
  LogOut,
  UserCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const NAV_ITEMS = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard, short: 'Dashboard' },
  { name: 'Companies', path: '/companies', icon: Building2, short: 'Companies' },
  { name: 'Subscriptions', path: '/subscriptions', icon: Repeat, short: 'Subscripts' },
  { name: 'Billing & Payments', path: '/billing', icon: CreditCard, short: 'Billing', badge: '12' },
  { name: 'Users', path: '/users', icon: Users, short: 'Users' },
  { name: 'Plans & Pricing', path: '/plans', icon: Layers, short: 'Plans' },
  { name: 'Usage & Limits', path: '/usage', icon: Activity, short: 'Limits' },
  { name: 'Analytics', path: '/analytics', icon: BarChart3, short: 'Analytics' },
  { name: 'Support Tickets', path: '/support', icon: LifeBuoy, short: 'Support', badge: '3' },
  { name: 'Activity Log', path: '/activity', icon: History, short: 'Logs' },
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
      <div className="h-16 flex items-center justify-between px-4 border-b border-[#131B38]">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-10 h-10 rounded-xl bg-[#0F172A] border border-[#1E293B] flex items-center justify-center p-1.5 flex-shrink-0 shadow-inner">
            <img
              src="/pulse-logo.png"
              alt="Pulse CRM"
              className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]"
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

        {/* Collapse toggle button */}
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="p-1.5 rounded-lg text-[#8292AD] hover:text-white hover:bg-[#131B38] transition-colors"
          title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {sidebarCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Navigation Links Scrollable Area */}
      <div className="flex-1 overflow-y-auto sidebar-scroll py-3 px-2 space-y-6">
        {/* Main Section */}
        <div>
          {!sidebarCollapsed && (
            <div className="px-3 mb-2 text-[11px] font-semibold tracking-wider text-[#8292AD] uppercase">
              Main
            </div>
          )}
          <nav className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              if (sidebarCollapsed) {
                // Rail style matching uploaded screenshot: icon on top, small label below
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    title={item.name}
                    className={`flex flex-col items-center justify-center py-2.5 px-1 rounded-xl transition-all duration-200 group relative ${
                      isActive
                        ? 'bg-[#2563EB] text-white shadow-md shadow-blue-600/30 font-semibold'
                        : 'text-[#8292AD] hover:text-white hover:bg-[#131B38]'
                    }`}
                  >
                    <Icon className={`w-5 h-5 mb-1 transition-transform group-hover:scale-110 ${isActive ? 'text-white' : ''}`} />
                    <span className="text-[10px] text-center leading-tight truncate w-full px-0.5">
                      {item.short}
                    </span>
                    {item.badge && !isActive && (
                      <span className="absolute top-1 right-2 w-2 h-2 rounded-full bg-red-500 ring-2 ring-[#080D20]"></span>
                    )}
                  </NavLink>
                );
              }

              // Expanded sidebar item style
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
          </nav>
        </div>

        {/* Quick Actions Section */}
        {!sidebarCollapsed ? (
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
        ) : (
          <div className="pt-2 border-t border-[#131B38] flex flex-col items-center space-y-2">
            <button
              onClick={() => setIsAddCompanyOpen(true)}
              title="Add Company"
              className="p-2.5 rounded-xl text-emerald-400 hover:bg-[#131B38] transition-colors"
            >
              <PlusCircle className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {/* User Profile / Logout Section at Bottom */}
      <div className="p-3 border-t border-[#131B38] bg-[#070b1b]">
        {sidebarCollapsed ? (
          <div className="flex flex-col items-center space-y-2">
            <NavLink
              to="/settings"
              title="Profile & Settings"
              className="flex flex-col items-center justify-center p-2 rounded-xl text-[#8292AD] hover:text-white hover:bg-[#131B38] transition-colors"
            >
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces"
                alt="Saurabh H."
                className="w-7 h-7 rounded-full object-cover ring-2 ring-blue-500/40"
              />
              <span className="text-[9px] mt-1 text-[#8292AD]">Profile</span>
            </NavLink>
            <button
              onClick={handleLogout}
              title="Logout"
              className="flex flex-col items-center justify-center p-2 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-[9px] mt-1 text-red-400">Logout</span>
            </button>
          </div>
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

