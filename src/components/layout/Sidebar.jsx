import React, { useState, useRef, useEffect } from 'react';
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
  LogOut,
  User as UserIcon
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const MAIN_NAV_ITEMS = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard, short: 'Dashboard' },
  { name: 'Companies', path: '/companies', icon: Building2, short: 'Companies' },
  { name: 'Subscriptions', path: '/subscriptions', icon: Repeat, short: 'Subscripts' },
  { name: 'Billing & Payments', path: '/billing', icon: CreditCard, short: 'Finances' },
  { name: 'Users', path: '/users', icon: Users, short: 'Users' },
  { name: 'Plans & Pricing', path: '/plans', icon: Layers, short: 'Plans' },
  { name: 'Usage & Limits', path: '/usage', icon: Gauge, short: 'Assets' },
  { name: 'Analytics', path: '/analytics', icon: BarChart3, short: 'Analytics' },
  { name: 'Support Tickets', path: '/support', icon: Headphones, short: 'Support' },
  { name: 'Activity Log', path: '/activity', icon: Clock, short: 'Calendar' },
  { name: 'Settings', path: '/settings', icon: Settings, short: 'Settings' },
];

export const NAV_ITEMS = MAIN_NAV_ITEMS;

export const Sidebar = () => {
  const { setIsAddCompanyOpen, showToast } = useApp();
  const location = useLocation();
  const navigate = useNavigate();

  const [isQuickOpen, setIsQuickOpen] = useState(false);
  const quickRef = useRef(null);

  // Close Quick Actions menu on click outside or Escape key
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (quickRef.current && !quickRef.current.contains(event.target)) {
        setIsQuickOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsQuickOpen(false);
    };

    if (isQuickOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isQuickOpen]);

  // Close Quick Actions menu when route changes
  useEffect(() => {
    setIsQuickOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    showToast('Signed out of Pulse CRM session', 'info');
  };

  return (
    <aside className="hidden md:flex flex-col items-center w-[76px] h-screen sticky top-0 py-2 select-none z-50 flex-shrink-0 justify-between bg-[#060A18] border-r border-[#131B33]">
      <div className="flex flex-col items-center w-full flex-1 min-h-0">
        {/* Top Logo Container */}
        <div className="relative group cursor-pointer pt-0.5 mb-1.5 flex-shrink-0">
          <div
            onClick={() => navigate('/')}
            className="w-[42px] h-[42px] rounded-full bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] flex items-center justify-center p-2 ring-2 ring-[#3B82F6]/70 shadow-[0_0_16px_rgba(37,99,235,0.45)] transition-transform duration-200 group-hover:scale-105"
            style={{ outline: 'rgb(255, 255, 255) solid 1px', outlineOffset: '-2px' }}
          >
            <img
              src="/pulse-logo.png"
              alt="Pulse CRM Logo"
              className="w-full h-full object-contain brightness-0 invert"
            />
          </div>
          {/* Tooltip on hover */}
          <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-2.5 py-1 text-[11px] font-semibold rounded-md shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap bg-[#0D152D] text-white border border-[#1A2544]">
            Pulse CRM
          </div>
        </div>

        {/* Navigation Items (Main Navigation) - Optimized for tablet & desktop heights */}
        <nav className="flex flex-col items-center w-full flex-1 py-0.5 overflow-visible">
          {MAIN_NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <React.Fragment key={item.path}>
                <NavLink
                  to={item.path}
                  className={`group relative w-[60px] h-[43px] 2xl:h-[48px] flex-shrink-0 flex flex-col items-center justify-center rounded-xl transition-all duration-150 ${
                    isActive
                      ? 'bg-[#0D1938] border border-blue-500/50 text-white shadow-[0_0_14px_rgba(37,99,235,0.28)]'
                      : 'text-[#76849D] hover:text-white hover:bg-[#0D152D]/80 border border-transparent'
                  }`}
                >
                  <Icon
                    className={`w-[17px] h-[17px] mb-0.5 transition-transform group-hover:scale-105 stroke-[1.8] ${
                      isActive ? 'text-[#3B82F6]' : 'text-[#e8eaed] group-hover:text-white'
                    }`}
                  />
                  <span
                    className={`text-[10px] tracking-tight leading-none text-center truncate max-w-[56px] ${
                      isActive
                        ? 'font-semibold text-[#93C5FD]'
                        : 'font-medium text-[#e8eaed] group-hover:text-[#E2E8F0]'
                    }`}
                  >
                    {item.short}
                  </span>

                  {/* Tooltip on hover - Fully visible without clipping */}
                  <div className="absolute left-full ml-3 px-2.5 py-1 text-[11px] font-semibold rounded-md shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap bg-[#0D152D] text-white border border-[#1A2544]">
                    {item.name}
                  </div>
                </NavLink>

                {/* 1px divider between items */}
                <div className="w-[46px] h-[1px] my-[0.5px] flex-shrink-0 transition-colors bg-[#141E38]" />
              </React.Fragment>
            );
          })}

          {/* Quick Actions ⚡ Card (Click to open) */}
          <div ref={quickRef} className="relative">
            <button
              type="button"
              onClick={() => setIsQuickOpen((prev) => !prev)}
              aria-expanded={isQuickOpen}
              aria-haspopup="true"
              title="Quick Actions (Click to open)"
              className={`group relative w-[60px] h-[43px] 2xl:h-[48px] flex-shrink-0 flex flex-col items-center justify-center rounded-xl transition-all duration-150 cursor-pointer ${
                isQuickOpen
                  ? 'bg-[#0D1938] border border-amber-500/60 text-white shadow-[0_0_14px_rgba(245,158,11,0.35)]'
                  : 'text-[#76849D] hover:text-white hover:bg-[#0D152D]/80 border border-transparent'
              }`}
            >
              <Zap
                className={`w-[17px] h-[17px] mb-0.5 transition-transform group-hover:scale-105 stroke-[1.8] ${
                  isQuickOpen ? 'text-amber-400 fill-amber-400 scale-105' : 'text-amber-400 fill-amber-400'
                }`}
              />
              <span className="text-[10px] tracking-tight leading-none text-center truncate max-w-[56px] font-medium text-amber-300">
                Quick ⚡
              </span>

              {/* Tooltip on hover only when menu is closed */}
              {!isQuickOpen && (
                <div className="absolute left-full ml-3 px-2.5 py-1 text-[11px] font-semibold rounded-md shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap bg-[#0D152D] text-white border border-[#1A2544]">
                  Quick Actions (Click)
                </div>
              )}
            </button>

            {/* Quick Actions Flyout Popover (Opens on click and stays open) */}
            {isQuickOpen && (
              <div className="absolute left-[calc(100%+8px)] top-1/2 -translate-y-1/2 w-56 bg-[#0D152D] border border-[#1A2544] rounded-2xl shadow-2xl p-2 z-[60] animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between px-2.5 py-1.5 text-xs font-bold text-white border-b border-[#1A2544] mb-1">
                  <div className="flex items-center gap-2">
                    <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span>Quick Actions ⚡</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-normal">Esc</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setIsAddCompanyOpen(true);
                    setIsQuickOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-2.5 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-white/[0.08] rounded-xl transition-colors text-left cursor-pointer"
                >
                  <PlusCircle className="w-4 h-4 text-[#3B82F6]" />
                  <span>Add Company</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    navigate('/billing');
                    setIsQuickOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-2.5 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-white/[0.08] rounded-xl transition-colors text-left cursor-pointer"
                >
                  <CreditCard className="w-4 h-4 text-amber-400" />
                  <span>View Pending Payments</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    navigate('/plans');
                    setIsQuickOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-2.5 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-white/[0.08] rounded-xl transition-colors text-left cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span>Upgrade Plan</span>
                </button>
              </div>
            )}
          </div>

          <div className="w-[46px] h-[1px] my-[0.5px] flex-shrink-0 transition-colors bg-[#141E38]" />

          {/* Profile Item with pulsating coral dot */}
          <NavLink
            to="/settings"
            className={`group relative w-[60px] h-[43px] 2xl:h-[48px] flex-shrink-0 flex flex-col items-center justify-center rounded-xl transition-all duration-150 ${
              location.pathname === '/settings'
                ? 'bg-[#0D1938] border border-blue-500/50 text-white shadow-[0_0_14px_rgba(37,99,235,0.28)]'
                : 'text-[#76849D] hover:text-white hover:bg-[#0D152D]/80 border border-transparent'
            }`}
          >
            <span className="absolute top-1 right-2.5 w-2 h-2 rounded-full bg-[#FF3B5B] ring-2 ring-[#060A18] animate-pulse" />
            <UserIcon
              className={`w-[17px] h-[17px] mb-0.5 transition-transform group-hover:scale-105 stroke-[1.8] ${
                location.pathname === '/settings'
                  ? 'text-[#3B82F6]'
                  : 'text-[#e8eaed] group-hover:text-white'
              }`}
            />
            <span
              className={`text-[10px] tracking-tight leading-none text-center truncate max-w-[56px] ${
                location.pathname === '/settings'
                  ? 'font-semibold text-[#93C5FD]'
                  : 'font-medium text-[#e8eaed] group-hover:text-[#E2E8F0]'
              }`}
            >
              Profile
            </span>
            <div className="absolute left-full ml-3 px-2.5 py-1 text-[11px] font-semibold rounded-md shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap bg-[#0D152D] text-white border border-[#1A2544]">
              Bobby Singh • Super Admin
            </div>
          </NavLink>
        </nav>
      </div>

      {/* Logout button at bottom */}
      <div className="w-full px-1 pt-1.5 flex-shrink-0 transition-colors border-t border-[#141E38]">
        <button
          onClick={handleLogout}
          className="group relative w-[60px] h-[42px] 2xl:h-[46px] mx-auto flex flex-col items-center justify-center rounded-xl transition-all duration-150 text-[#76849D] hover:text-rose-400 hover:bg-[#1A1222]"
          title="Sign out"
        >
          <LogOut className="w-[17px] h-[17px] mb-0.5 group-hover:scale-105 transition-transform stroke-[1.8] text-current" />
          <span className="text-[10px] font-medium leading-none">Logout</span>
          <div className="absolute left-full ml-3 px-2.5 py-1 text-[11px] font-semibold rounded-md shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap bg-[#1A1222] text-rose-300 border border-rose-900/50">
            Logout
          </div>
        </button>
      </div>
    </aside>
  );
};
