import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  Calendar,
  Bell,
  Sun,
  Moon,
  ChevronDown,
  Menu,
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
    selectedDateRange,
    setSelectedDateRange,
    setMobileMenuOpen,
    setIsCommandPaletteOpen,
    notifications,
    setNotifications,
    isDarkMode,
    toggleTheme,
    showToast
  } = useApp();

  const navigate = useNavigate();

  // Dropdown states
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

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

  const handleToggleTheme = () => {
    toggleTheme();
    showToast(!isDarkMode ? 'Dark mode enabled' : 'Light mode enabled', 'info');
  };

  return (
    <header className="sticky top-0 z-50 h-16 bg-white dark:bg-[#080D20] border-b border-[#E5EAF2] dark:border-[#131B38] shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
      <div className="w-full max-w-[1720px] mx-auto h-full px-4 md:px-6 lg:px-8 flex py-3 items-center justify-between">
        {/* Left: Mobile hamburger & Search bar */}
        <div className="flex items-center gap-3 flex-1 max-w-xl">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden p-2 rounded-xl text-[#8292AD] hover:text-[#172033] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#131B38] transition-colors"
            aria-label="Open mobile menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Global Search Input */}
          <div
            onClick={() => setIsCommandPaletteOpen(true)}
            className="relative flex items-center w-full max-w-md lg:max-w-lg h-10 bg-[#F8FAFC] dark:bg-[#0D152D] hover:bg-slate-100/80 dark:hover:bg-[#121D3D] border border-[#E5EAF2] dark:border-[#1E2D54] rounded-xl px-3 sm:px-3.5 cursor-pointer transition-all duration-200 group focus-within:border-blue-500 dark:focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 dark:focus-within:ring-blue-900/30"
          >
            <Search className="w-4 h-4 text-[#8292AD] dark:text-slate-400 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors mr-2.5 flex-shrink-0" />
            <input
              type="text"
              readOnly
              placeholder="Search companies, subscriptions, invoices..."
              className="w-full bg-transparent dark:!bg-transparent text-xs sm:text-sm text-[#172033] dark:text-white placeholder-[#8292AD] dark:placeholder-slate-400 border-none outline-none focus:outline-none focus:ring-0 cursor-pointer select-none p-0 truncate"
            />
            <kbd className="hidden sm:inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-semibold text-[#8292AD] dark:text-slate-400 bg-white dark:bg-[#141E3C] border border-[#E5EAF2] dark:border-[#22325C] rounded-md shadow-2xs ml-2 flex-shrink-0">
              ⌘K
            </kbd>
          </div>
        </div>

        {/* Right: Date selector, Theme toggle, Notification, Profile */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Date Selector Dropdown (matches screenshot pill) */}
          <div className="relative" ref={dateRef}>
            <button
              onClick={() => setIsDateOpen(!isDateOpen)}
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-[#F7F9FC] dark:bg-[#0D152D] border border-[#E5EAF2] dark:border-[#1E2D54] rounded-xl text-xs font-semibold text-[#172033] dark:text-white hover:bg-slate-100 dark:hover:bg-[#14234b] transition-colors"
            >
              <Calendar className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>{selectedDateRange}</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#8292AD]" />
            </button>

            {isDateOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-[#0D152D] border border-[#E5EAF2] dark:border-[#1A2548] rounded-2xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                {DATE_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => {
                      setSelectedDateRange(opt);
                      setIsDateOpen(false);
                      showToast(`Filtered by ${opt}`, 'info');
                    }}
                    className={`w-full px-4 py-2 text-xs text-left flex items-center justify-between hover:bg-[#F7F9FC] dark:hover:bg-[#121D3D] ${
                      selectedDateRange === opt ? 'font-bold text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-950/40' : 'text-[#172033] dark:text-white'
                    }`}
                  >
                    <span>{opt}</span>
                    {selectedDateRange === opt && <Check className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick Theme Toggle */}
          <button
            onClick={handleToggleTheme}
            className="p-2 text-[#8292AD] hover:text-[#172033] dark:hover:text-white hover:bg-[#F7F9FC] dark:hover:bg-[#0D152D] rounded-xl border border-transparent hover:border-[#E5EAF2] dark:hover:border-[#1E2D54] transition-colors cursor-pointer"
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDarkMode ? (
              <Moon className="w-4 h-4 text-blue-400" />
            ) : (
              <Sun className="w-4 h-4 text-amber-500 hover:rotate-45 transition-transform" />
            )}
          </button>

          {/* Notification Bell Dropdown */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              className="relative p-2 text-[#8292AD] hover:text-[#172033] dark:hover:text-white hover:bg-[#F7F9FC] dark:hover:bg-[#0D152D] rounded-xl border border-transparent hover:border-[#E5EAF2] dark:hover:border-[#1E2D54] transition-colors"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-[#080D20]"></span>
              )}
            </button>

            {isNotifOpen && (
              <div className="absolute right-0 mt-2 w-[calc(100vw-2rem)] sm:w-80 md:w-96 bg-white dark:bg-[#0D152D] border border-[#E5EAF2] dark:border-[#1A2548] rounded-2xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-4 py-2 border-b border-[#E5EAF2] dark:border-[#1A2548] flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-[#172033] dark:text-white">Notifications</h4>
                    <p className="text-[11px] text-[#8292AD] dark:text-slate-400">You have {unreadCount} unread alerts</p>
                  </div>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllRead}
                      className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-semibold"
                    >
                      Mark all read
                    </button>
                  )}
                </div>

                <div className="max-h-72 overflow-y-auto divide-y divide-[#E5EAF2] dark:divide-[#1A2548]">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`p-3.5 hover:bg-[#F7F9FC] dark:hover:bg-[#121D3D] transition-colors cursor-pointer flex items-start gap-3 ${
                        n.unread ? 'bg-blue-50/30 dark:bg-blue-950/20' : ''
                      }`}
                    >
                      <span className={`w-2 h-2 mt-1.5 rounded-full flex-shrink-0 ${
                        n.unread ? 'bg-blue-600 dark:bg-blue-400' : 'bg-slate-300 dark:bg-slate-600'
                      }`} />
                      <div className="flex-1">
                        <p className="text-xs font-semibold text-[#172033] dark:text-white leading-snug">{n.title}</p>
                        <p className="text-[11px] text-[#8292AD] dark:text-slate-400 mt-0.5">{n.description}</p>
                        <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 block">{n.time}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-2 border-t border-[#E5EAF2] dark:border-[#1A2548] text-center">
                  <button
                    onClick={() => {
                      setIsNotifOpen(false);
                      navigate('/activity');
                    }}
                    className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 py-1"
                  >
                    View Full Activity Stream →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2.5 p-1 sm:pl-2 sm:pr-3 sm:py-1 rounded-xl hover:bg-[#F7F9FC] dark:hover:bg-[#0D152D] border border-transparent hover:border-[#E5EAF2] dark:hover:border-[#1E2D54] transition-colors group"
            >
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces"
                  alt="Bobby Singh"
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-blue-500/20 group-hover:ring-blue-500/50 transition-all"
                />
                <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-[#080D20]"></span>
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-xs font-bold text-[#172033] dark:text-white leading-tight">Bobby Singh</p>
                <p className="text-[10px] text-[#8292AD] dark:text-slate-400 leading-tight font-medium">Super Admin</p>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-[#8292AD] group-hover:text-[#172033] dark:group-hover:text-white transition-colors hidden sm:block" />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-[calc(100vw-2rem)] sm:w-64 bg-white dark:bg-[#0D152D] border border-[#E5EAF2] dark:border-[#1A2548] rounded-2xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-4 py-3 border-b border-[#E5EAF2] dark:border-[#1A2548]">
                  <p className="text-xs text-[#8292AD] dark:text-slate-400">Signed in as</p>
                  <p className="text-sm font-bold text-[#172033] dark:text-white">bobby.singh@pulsecrm.io</p>
                  <div className="mt-1.5 inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                    <Shield className="w-2.5 h-2.5 mr-1" /> Super Admin Role
                  </div>
                </div>

                <div className="py-1">
                  <button
                    onClick={() => {
                      setIsProfileOpen(false);
                      navigate('/settings');
                    }}
                    className="w-full px-4 py-2 text-xs text-[#172033] dark:text-white hover:bg-[#F7F9FC] dark:hover:bg-[#121D3D] flex items-center gap-2.5"
                  >
                    <User className="w-4 h-4 text-[#8292AD] dark:text-slate-400" />
                    <span>Profile Settings</span>
                  </button>
                  <button
                    onClick={() => {
                      setIsProfileOpen(false);
                      navigate('/billing');
                    }}
                    className="w-full px-4 py-2 text-xs text-[#172033] dark:text-white hover:bg-[#F7F9FC] dark:hover:bg-[#121D3D] flex items-center gap-2.5"
                  >
                    <CreditCard className="w-4 h-4 text-[#8292AD] dark:text-slate-400" />
                    <span>Billing & Subscriptions</span>
                  </button>
                  <button
                    onClick={() => {
                      setIsProfileOpen(false);
                      navigate('/activity');
                    }}
                    className="w-full px-4 py-2 text-xs text-[#172033] dark:text-white hover:bg-[#F7F9FC] dark:hover:bg-[#121D3D] flex items-center gap-2.5"
                  >
                    <ExternalLink className="w-4 h-4 text-[#8292AD] dark:text-slate-400" />
                    <span>Audit Logs</span>
                  </button>
                </div>

                <div className="border-t border-[#E5EAF2] dark:border-[#1A2548] pt-1">
                  <button
                    onClick={() => {
                      setIsProfileOpen(false);
                      showToast('Signed out of session', 'info');
                    }}
                    className="w-full px-4 py-2 text-xs text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 flex items-center gap-2.5 font-medium"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

