import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  Calendar,
  Bell,
  Sun,
  Moon,
  ChevronDown,
  Menu,
  PanelLeft,
  Check,
  User,
  Shield,
  CreditCard,
  LogOut,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';

const DATE_OPTIONS = [
  'Today: Nov 12, 2026',
  'Last 7 Days',
  'Last 30 Days',
  'This Month: Nov 2026',
  'This Quarter (Q4)',
  'Year to Date (2026)'
];

export const Header = () => {
  const {
    sidebarCollapsed,
    setSidebarCollapsed,
    selectedDateRange,
    setSelectedDateRange,
    setMobileMenuOpen,
    setIsCommandPaletteOpen,
    notifications,
    setNotifications,
    showToast
  } = useApp();

  const navigate = useNavigate();

  // Dropdown states
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const dateRef = useRef(null);
  const notifRef = useRef(null);
  const profileRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dateRef.current && !dateRef.current.contains(event.target)) {
        setIsDateOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setIsNotifOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadCount = notifications.filter(n => n.unread).length;

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
    showToast('All notifications marked as read', 'info');
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    showToast(isDarkMode ? 'Light mode enabled' : 'Dark accent mode active');
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-white border-b border-[#E5EAF2] px-4 md:px-8 flex items-center justify-between shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
      {/* Left: Mobile hamburger, sidebar collapse toggle & Search bar */}
      <div className="flex items-center gap-2.5 flex-1 max-w-xl">
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="md:hidden p-2 rounded-xl text-[#8292AD] hover:text-[#172033] hover:bg-slate-100 transition-colors"
          aria-label="Open mobile menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Desktop Sidebar Rail/Full Toggle */}
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="hidden md:flex p-2 rounded-xl text-[#8292AD] hover:text-[#172033] hover:bg-[#F7F9FC] border border-[#E5EAF2] transition-colors"
          title={sidebarCollapsed ? "Expand Sidebar" : "Collapse to Rail View"}
        >
          <PanelLeft className="w-4 h-4" />
        </button>

        {/* Global Search Input (matches screenshot) */}
        <div
          onClick={() => setIsCommandPaletteOpen(true)}
          className="relative flex items-center w-full max-w-md bg-[#F7F9FC] hover:bg-slate-100/80 border border-[#E5EAF2] rounded-xl px-3.5 py-2 cursor-pointer transition-all duration-200 group focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100"
        >
          <Search className="w-4 h-4 text-[#8292AD] group-hover:text-blue-500 transition-colors mr-2.5 flex-shrink-0" />
          <input
            type="text"
            readOnly
            placeholder="Search companies, subscriptions, invoices... [⌘K]"
            className="w-full bg-transparent text-sm text-[#172033] placeholder-[#8292AD] focus:outline-none cursor-pointer select-none"
          />
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[11px] font-semibold text-[#8292AD] bg-white border border-[#E5EAF2] rounded shadow-xs ml-2">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right: Date selector, Theme toggle, Notification, Profile */}
      <div className="flex items-center gap-2 md:gap-3.5">
        {/* Date Selector Dropdown (matches screenshot pill) */}
        <div className="relative" ref={dateRef}>
          <button
            onClick={() => setIsDateOpen(!isDateOpen)}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-[#172033] bg-[#F7F9FC] hover:bg-slate-100 border border-[#E5EAF2] rounded-xl transition-colors shadow-xs"
          >
            <Calendar className="w-3.5 h-3.5 text-blue-600" />
            <span>{selectedDateRange}</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#8292AD]" />
          </button>

          {isDateOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white border border-[#E5EAF2] rounded-2xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-3 py-1 text-[11px] font-bold text-[#8292AD] uppercase tracking-wider">
                Select Date Period
              </div>
              {DATE_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  onClick={() => {
                    setSelectedDateRange(opt);
                    setIsDateOpen(false);
                    showToast(`Filtered by ${opt}`);
                  }}
                  className={`w-full px-3 py-2 text-xs flex items-center justify-between text-left hover:bg-[#F7F9FC] transition-colors ${
                    selectedDateRange === opt ? 'font-semibold text-blue-600 bg-blue-50/50' : 'text-[#172033]'
                  }`}
                >
                  <span>{opt}</span>
                  {selectedDateRange === opt && <Check className="w-3.5 h-3.5 text-blue-600" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Quick Theme Toggle (matches sun icon in screenshot) */}
        <button
          onClick={toggleTheme}
          className="p-2 text-[#8292AD] hover:text-[#172033] hover:bg-[#F7F9FC] rounded-xl border border-transparent hover:border-[#E5EAF2] transition-colors"
          title="Toggle Display Theme"
        >
          {isDarkMode ? (
            <Moon className="w-4 h-4 text-blue-600" />
          ) : (
            <Sun className="w-4 h-4 text-amber-500 hover:rotate-45 transition-transform" />
          )}
        </button>

        {/* Notification Bell Dropdown (matches screenshot) */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className="relative p-2 text-[#8292AD] hover:text-[#172033] hover:bg-[#F7F9FC] rounded-xl border border-transparent hover:border-[#E5EAF2] transition-colors"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white"></span>
            )}
          </button>

          {isNotifOpen && (
            <div className="absolute right-0 mt-2 w-80 md:w-96 bg-white border border-[#E5EAF2] rounded-2xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-4 py-2 border-b border-[#E5EAF2] flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-[#172033]">Notifications</h4>
                  <p className="text-[11px] text-[#8292AD]">You have {unreadCount} unread alerts</p>
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllRead}
                    className="text-xs text-blue-600 hover:underline font-semibold"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="max-h-72 overflow-y-auto divide-y divide-[#E5EAF2]">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`p-3.5 hover:bg-[#F7F9FC] transition-colors cursor-pointer flex items-start gap-3 ${
                      n.unread ? 'bg-blue-50/30' : ''
                    }`}
                  >
                    <span className={`w-2 h-2 mt-1.5 rounded-full flex-shrink-0 ${
                      n.unread ? 'bg-blue-600' : 'bg-slate-300'
                    }`} />
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-[#172033] leading-snug">{n.title}</p>
                      <p className="text-[11px] text-[#8292AD] mt-0.5">{n.description}</p>
                      <span className="text-[10px] text-slate-400 mt-1 block">{n.time}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-2 border-t border-[#E5EAF2] text-center">
                <button
                  onClick={() => {
                    setIsNotifOpen(false);
                    navigate('/activity');
                  }}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700 py-1"
                >
                  View Full Activity Stream →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Dropdown (matches exact screenshot profile pill!) */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2.5 p-1 sm:pl-2 sm:pr-3 sm:py-1 rounded-xl hover:bg-[#F7F9FC] border border-transparent hover:border-[#E5EAF2] transition-colors group"
          >
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces"
                alt="Bobby Singh"
                className="w-8 h-8 rounded-full object-cover ring-2 ring-blue-500/20 group-hover:ring-blue-500/50 transition-all"
              />
              <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white"></span>
            </div>
            <div className="text-left hidden sm:block">
              <p className="text-xs font-bold text-[#172033] leading-tight">Bobby Singh</p>
              <p className="text-[10px] text-[#8292AD] leading-tight font-medium">Super Admin</p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-[#8292AD] group-hover:text-[#172033] transition-colors hidden sm:block" />
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white border border-[#E5EAF2] rounded-2xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-4 py-3 border-b border-[#E5EAF2]">
                <p className="text-xs text-[#8292AD]">Signed in as</p>
                <p className="text-sm font-bold text-[#172033]">bobby.singh@pulsecrm.io</p>
                <div className="mt-1.5 inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                  <Shield className="w-2.5 h-2.5 mr-1" /> Super Admin Role
                </div>
              </div>

              <div className="py-1">
                <button
                  onClick={() => {
                    setIsProfileOpen(false);
                    navigate('/settings');
                  }}
                  className="w-full px-4 py-2 text-xs text-[#172033] hover:bg-[#F7F9FC] flex items-center gap-2.5"
                >
                  <User className="w-4 h-4 text-[#8292AD]" />
                  <span>Profile Settings</span>
                </button>
                <button
                  onClick={() => {
                    setIsProfileOpen(false);
                    navigate('/billing');
                  }}
                  className="w-full px-4 py-2 text-xs text-[#172033] hover:bg-[#F7F9FC] flex items-center gap-2.5"
                >
                  <CreditCard className="w-4 h-4 text-[#8292AD]" />
                  <span>Billing & Subscriptions</span>
                </button>
                <button
                  onClick={() => {
                    setIsProfileOpen(false);
                    navigate('/activity');
                  }}
                  className="w-full px-4 py-2 text-xs text-[#172033] hover:bg-[#F7F9FC] flex items-center gap-2.5"
                >
                  <ExternalLink className="w-4 h-4 text-[#8292AD]" />
                  <span>Audit Logs</span>
                </button>
              </div>

              <div className="border-t border-[#E5EAF2] pt-1">
                <button
                  onClick={() => {
                    setIsProfileOpen(false);
                    showToast('Signed out of session', 'info');
                  }}
                  className="w-full px-4 py-2 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2.5 font-medium"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

