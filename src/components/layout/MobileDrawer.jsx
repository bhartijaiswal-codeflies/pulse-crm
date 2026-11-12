import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { X, PlusCircle, AlertTriangle, Zap, LogOut } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { NAV_ITEMS } from './Sidebar';

export const MobileDrawer = () => {
  const {
    mobileMenuOpen,
    setMobileMenuOpen,
    setIsAddCompanyOpen,
    showToast
  } = useApp();
  const location = useLocation();
  const navigate = useNavigate();

  if (!mobileMenuOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Drawer */}
      <div className="relative w-72 max-w-[85vw] bg-[#080D20] text-white h-full flex flex-col shadow-2xl z-10 animate-in slide-in-from-left duration-200">
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-[#131B38]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#0F172A] border border-[#1E293B] flex items-center justify-center p-1.5 shadow-inner">
              <img
                src="/pulse-logo.png"
                alt="Pulse CRM"
                className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]"
              />
            </div>
            <div>
              <span className="font-bold text-base tracking-tight text-white flex items-center gap-1">
                Pulse <span className="text-[#3B82F6]">CRM</span>
              </span>
              <p className="text-[10px] text-[#8292AD] font-medium">SaaS Admin Hub</p>
            </div>
          </div>

          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 rounded-lg text-[#8292AD] hover:text-white hover:bg-[#131B38]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Links */}
        <div className="flex-1 overflow-y-auto sidebar-scroll p-3 space-y-6">
          <div>
            <div className="px-3 mb-2 text-[11px] font-semibold tracking-wider text-[#8292AD] uppercase">
              Main Navigation
            </div>
            <nav className="space-y-1">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-[#2563EB] text-white shadow-md shadow-blue-600/30 font-semibold'
                        : 'text-[#8292AD] hover:text-white hover:bg-[#131B38]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-[#8292AD]'}`} />
                      <span>{item.name}</span>
                    </div>
                    {item.badge && (
                      <span className="text-[11px] px-1.5 py-0.5 rounded-full bg-red-500/20 text-red-300 font-semibold">
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </nav>
          </div>

          {/* Quick Actions */}
          <div>
            <div className="px-3 mb-2 text-[11px] font-semibold tracking-wider text-[#8292AD] uppercase">
              Quick Actions
            </div>
            <div className="space-y-1">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsAddCompanyOpen(true);
                }}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-[#8292AD] hover:text-white hover:bg-[#131B38]"
              >
                <PlusCircle className="w-4 h-4 text-emerald-400" />
                <span>Add Company</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate('/billing');
                }}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium text-[#8292AD] hover:text-white hover:bg-[#131B38]"
              >
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  <span>Pending Payments</span>
                </div>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded-full font-semibold">
                  12
                </span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate('/plans');
                }}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-[#8292AD] hover:text-white hover:bg-[#131B38]"
              >
                <Zap className="w-4 h-4 text-blue-400" />
                <span>Upgrade Plans</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#131B38] bg-[#070b1b] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces"
              alt="Bobby Singh"
              className="w-9 h-9 rounded-full object-cover ring-2 ring-blue-500/50"
            />
            <div>
              <p className="text-sm font-semibold text-white">Bobby Singh</p>
              <p className="text-[11px] text-[#8292AD]">Super Admin</p>
            </div>
          </div>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              showToast('Logged out of session', 'info');
            }}
            className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

