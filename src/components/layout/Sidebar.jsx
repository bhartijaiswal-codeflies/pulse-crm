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
  User,
  LogOut,
  ChevronLeft,
  ChevronRight,
  PlusCircle,
  Zap
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const NAV_ITEMS = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard, short: 'Dashboard' },
  { name: 'Companies', path: '/companies', icon: Building2, short: 'Companies' },
  { name: 'Subscriptions', path: '/subscriptions', icon: Repeat, short: 'Subscripts' },
  { name: 'Billing & Payments', path: '/billing', icon: CreditCard, short: 'Finances' },
  { name: 'Users', path: '/users', icon: Users, short: 'Users' },
  { name: 'Plans & Pricing', path: '/plans', icon: Layers, short: 'Plans' },
  { name: 'Usage & Limits', path: '/usage', icon: Activity, short: 'Assets' },
  { name: 'Analytics', path: '/analytics', icon: BarChart3, short: 'Analytics' },
  { name: 'Support Tickets', path: '/support', icon: LifeBuoy, short: 'Support' },
  { name: 'Activity Log', path: '/activity', icon: History, short: 'Calendar' },
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
      className={`hidden md:flex flex-col items-center h-screen sticky top-0 py-4 select-none z-40 flex-shrink-0 justify-between overflow-hidden transition-all duration-200 bg-[#060A18] border-r border-[#131B33] ${
        sidebarCollapsed ? 'w-[76px]' : 'w-64'
      }`}
    >
      <div className="flex flex-col items-center w-full flex-1 overflow-hidden">
        {/* Logo Container (exact from snippet) */}
        <div className="relative group cursor-pointer pt-3 mb-4 flex-shrink-0">
          <div
            className="w-[46px] h-[46px] rounded-full bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] flex items-center justify-center p-2 ring-2 ring-[#3B82F6]/70 shadow-[0_0_16px_rgba(37,99,235,0.45)] transition-transform duration-200 group-hover:scale-105"
            style={{ outline: 'rgb(255, 255, 255) solid 1px', outlineOffset: '-2px' }}
          >
            <img
              src="/pulse-logo.png"
              alt="Pulse CRM"
              className="w-full h-full object-contain brightness-0 invert"
            />
          </div>
          {/* Tooltip on hover */}
          <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-2.5 py-1 text-[11px] font-semibold rounded-md shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap bg-[#0D152D] text-white border border-[#1A2544]">
            Pulse CRM
          </div>
        </div>

        {/* Navigation items scrollable area */}
        <nav className="flex flex-col items-center w-full overflow-y-auto no-scrollbar flex-1 py-1">
          {NAV_ITEMS.map((item, index) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            if (sidebarCollapsed) {
              return (
                <React.Fragment key={item.path}>
                  <NavLink
                    to={item.path}
                    className={`group relative w-[62px] h-[52px] flex-shrink-0 flex flex-col items-center justify-center rounded-xl transition-all duration-150 ${
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
                      className={`text-[10px] tracking-tight leading-none text-center truncate max-w-[58px] ${
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

                  {/* Divider line between items matching snippet */}
                  <div className="w-full h-[1px] my-1 flex-shrink-0 transition-colors bg-[#141E38]" />
                </React.Fragment>
              );
            }

            // Expanded Mode
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`w-full flex items-center gap-3.5 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 group ${
                  isActive
                    ? 'bg-[#0D1938] border border-blue-500/50 text-[#93C5FD] shadow-[0_0_14px_rgba(37,99,235,0.28)]'
                    : 'text-[#e8eaed] hover:text-white hover:bg-[#0D152D]/80 border border-transparent'
                }`}
              >
                <Icon
                  className={`w-[18px] h-[18px] flex-shrink-0 stroke-[1.8] ${
                    isActive ? 'text-[#3B82F6]' : 'text-[#e8eaed] group-hover:text-white'
                  }`}
                />
                <span className="truncate">{item.name}</span>
              </NavLink>
            );
          })}

          {/* Profile Item with pulsating coral dot (exact from snippet) */}
          {sidebarCollapsed ? (
            <NavLink
              to="/settings"
              className={`group relative w-[62px] h-[52px] flex-shrink-0 flex flex-col items-center justify-center rounded-xl transition-all duration-150 ${
                location.pathname === '/settings'
                  ? 'bg-[#0D1938] border border-blue-500/50 text-white shadow-[0_0_14px_rgba(37,99,235,0.28)]'
                  : 'text-[#76849D] hover:text-white hover:bg-[#0D152D]/80 border border-transparent'
              }`}
            >
              <span className="absolute top-1.5 right-2 w-2 h-2 rounded-full bg-[#FF3B5B] ring-2 animate-pulse ring-[#060A18]" />
              <User
                className={`w-[18px] h-[18px] mb-1 transition-transform group-hover:scale-105 stroke-[1.8] ${
                  location.pathname === '/settings' ? 'text-[#3B82F6]' : 'text-[#e8eaed] group-hover:text-white'
                }`}
              />
              <span
                className={`text-[10px] tracking-tight leading-none text-center truncate max-w-[58px] ${
                  location.pathname === '/settings'
                    ? 'font-semibold text-[#93C5FD]'
                    : 'font-medium text-[#e8eaed] group-hover:text-[#E2E8F0]'
                }`}
              >
                Profile
              </span>
              <div className="absolute left-full ml-3 px-2.5 py-1 text-[11px] font-semibold rounded-md shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap bg-[#0D152D] text-white border border-[#1A2544]">
                Profile & Settings
              </div>
            </NavLink>
          ) : (
            <div className="w-full px-2 pt-2">
              <div className="bg-[#0E1738] rounded-xl p-3 border border-[#1B274F]">
                <div className="flex items-center gap-2 text-white font-bold text-xs mb-2">
                  <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span>Quick Actions</span>
                </div>
                <div className="space-y-1">
                  <button
                    onClick={() => setIsAddCompanyOpen(true)}
                    className="w-full flex items-center gap-2 py-1 px-1.5 text-xs text-slate-300 hover:text-white hover:bg-white/[0.05] rounded-lg transition-colors text-left"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>Add Company</span>
                  </button>
                  <button
                    onClick={() => navigate('/billing')}
                    className="w-full flex items-center gap-2 py-1 px-1.5 text-xs text-slate-300 hover:text-white hover:bg-white/[0.05] rounded-lg transition-colors text-left"
                  >
                    <CreditCard className="w-3.5 h-3.5" />
                    <span>Pending Payments</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </nav>
      </div>

      {/* Logout button at bottom (exact from snippet) */}
      <div className="w-full px-1.5 pt-2 flex-shrink-0 mt-1 transition-colors border-t border-[#141E38]">
        <button
          onClick={handleLogout}
          className="group relative w-[62px] h-[50px] mx-auto flex flex-col items-center justify-center rounded-xl transition-all duration-150 text-[#76849D] hover:text-rose-400 hover:bg-[#1A1222]"
          title="Sign out"
        >
          <LogOut className="w-[18px] h-[18px] mb-1 group-hover:scale-105 transition-transform stroke-[1.8] text-current" />
          <span className="text-[10px] font-medium leading-none">Logout</span>
          <div className="absolute left-full ml-3 px-2.5 py-1 text-[11px] font-semibold rounded-md shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap bg-[#1A1222] text-rose-300 border border-rose-900/50">
            Logout
          </div>
        </button>
      </div>
    </aside>
  );
};
