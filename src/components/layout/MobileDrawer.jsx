import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  X,
  LayoutGrid,
  Building2,
  CreditCard,
  WalletCards,
  Users,
  Tag,
  Gauge,
  BarChart3,
  LifeBuoy,
  History,
  User,
  LogOut
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const MOBILE_NAV_ITEMS = [
  { name: 'Dashboard', path: '/', icon: LayoutGrid },
  { name: 'Companies', path: '/companies', icon: Building2 },
  { name: 'Subscriptions', path: '/subscriptions', icon: CreditCard },
  { name: 'Billing & Payments', path: '/billing', icon: WalletCards },
  { name: 'Users', path: '/users', icon: Users },
  { name: 'Plans & Pricing', path: '/plans', icon: Tag },
  { name: 'Usage & Limits', path: '/usage', icon: Gauge },
  { name: 'Analytics', path: '/analytics', icon: BarChart3 },
  { name: 'Support Tickets', path: '/support', icon: LifeBuoy, hasDot: true },
  { name: 'Activity Log', path: '/activity', icon: History },
  { name: 'Profile & Settings', path: '/settings', icon: User },
];

export const MobileDrawer = () => {
  const {
    mobileMenuOpen,
    setMobileMenuOpen,
    showToast
  } = useApp();
  const location = useLocation();

  if (!mobileMenuOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] md:hidden flex animate-in fade-in duration-200">
      {/* Dark backdrop blur */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity z-[100]"
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Drawer Slide-over Panel */}
      <div className="relative w-80 max-w-[85vw] bg-white dark:bg-[#0D152D] text-[#172033] dark:text-white h-full flex flex-col shadow-2xl z-[101] animate-in slide-in-from-left duration-200 border-r border-[#E5EAF2] dark:border-[#1E2D54]">
        {/* Brand Header */}
        <div className="h-20 flex items-center justify-between px-5 border-b border-[#E5EAF2] dark:border-[#1E2D54] flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#2563EB] flex items-center justify-center text-white shadow-sm flex-shrink-0">
              <X className="w-5 h-5 text-white stroke-[2.5]" />
            </div>
            <div>
              <span className="font-bold text-lg text-[#172033] dark:text-white tracking-tight leading-tight block">
                XyroCRM
              </span>
              <p className="text-xs text-[#8292AD] dark:text-slate-400 font-normal leading-tight mt-0.5">
                SaaS Management Console
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            className="p-1.5 rounded-xl text-[#8292AD] hover:text-[#172033] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#1E2D54] transition-colors cursor-pointer"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Links Navigation */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-1">
          <nav className="space-y-1">
            {MOBILE_NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = item.path === '/'
                ? location.pathname === '/'
                : location.pathname.startsWith(item.path) || (item.path === '/settings' && location.pathname.startsWith('/profile'));

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-2.5 rounded-2xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-[#2563EB] text-white font-semibold shadow-md shadow-blue-600/25'
                      : 'text-[#475569] dark:text-slate-300 hover:text-[#172033] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#16203f]'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-white' : 'text-[#64748B] dark:text-slate-400'}`} />
                    <span>{item.name}</span>
                  </div>
                  {item.hasDot && (
                    <span className="w-2 h-2 rounded-full bg-[#EF4444] shadow-xs flex-shrink-0" />
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* User Profile Footer */}
        <div className="p-4 border-t border-[#E5EAF2] dark:border-[#1E2D54] bg-white dark:bg-[#0D152D] flex items-center justify-between mt-auto flex-shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] text-white font-bold text-sm flex items-center justify-center shadow-sm">
                BS
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#10B981] ring-2 ring-white dark:ring-[#0D152D]" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-[#172033] dark:text-white leading-tight truncate">
                Bobby Singh
              </p>
              <p className="text-xs text-[#8292AD] dark:text-slate-400 font-normal leading-tight mt-0.5 truncate">
                Super Admin
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              showToast('Signed out of session', 'info');
              navigate('/login');
            }}
            className="p-2 text-[#8292AD] hover:text-[#172033] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#1E2D54] rounded-xl transition-colors cursor-pointer flex-shrink-0"
            title="Sign out"
            aria-label="Sign out"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
