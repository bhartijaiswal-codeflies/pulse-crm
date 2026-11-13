import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Clock,
  Briefcase,
  CreditCard,
  Users,
  Laptop,
  Calendar,
  User,
  LogOut
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SIDEBAR_ITEMS = [
  {
    name: 'Dashboard',
    path: '/',
    matchPaths: ['/'],
    icon: LayoutDashboard,
    hasNotification: false
  },
  {
    name: 'Attendance',
    path: '/attendance',
    matchPaths: ['/attendance', '/activity'],
    icon: Clock,
    hasNotification: false
  },
  {
    name: 'Candidates',
    path: '/candidates',
    matchPaths: ['/candidates', '/companies'],
    icon: Briefcase,
    hasNotification: false
  },
  {
    name: 'Finances',
    path: '/finances',
    matchPaths: ['/finances', '/billing', '/subscriptions'],
    icon: CreditCard,
    hasNotification: false
  },
  {
    name: 'Users',
    path: '/users',
    matchPaths: ['/users'],
    icon: Users,
    hasNotification: false
  },
  {
    name: 'Assets',
    path: '/assets',
    matchPaths: ['/assets', '/usage', '/plans'],
    icon: Laptop,
    hasNotification: false
  },
  {
    name: 'Calendar',
    path: '/calendar',
    matchPaths: ['/calendar'],
    icon: Calendar,
    hasNotification: false
  },
  {
    name: 'Profile',
    path: '/profile',
    matchPaths: ['/profile', '/settings'],
    icon: User,
    hasNotification: true
  }
];

export const NAV_ITEMS = SIDEBAR_ITEMS;
export const MAIN_NAV_ITEMS = SIDEBAR_ITEMS;

export const Sidebar = () => {
  const { showToast } = useApp();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    showToast('Signed out of session', 'info');
  };

  const isItemActive = (item) => {
    if (item.path === '/') {
      return location.pathname === '/';
    }
    return item.matchPaths.some((p) => location.pathname.startsWith(p));
  };

  return (
    <aside className="hidden md:flex flex-col items-center w-[76px] h-screen sticky top-0 py-4 select-none z-40 flex-shrink-0 justify-between overflow-hidden transition-colors duration-200 bg-[#060A18] border-r border-[#131B33]">
      <div className="flex flex-col items-center w-full flex-1 overflow-hidden">
        {/* Top Logo Container */}
        <div
          onClick={() => navigate('/')}
          className="relative group cursor-pointer pt-3 mb-4 flex-shrink-0"
        >
          <div
            className="w-[46px] h-[46px] rounded-full bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] flex items-center justify-center p-2 ring-2 ring-[#3B82F6]/70 shadow-[0_0_16px_rgba(37,99,235,0.45)] transition-transform duration-200 group-hover:scale-105"
            style={{ outline: 'rgb(255, 255, 255) solid 1px', outlineOffset: '-2px' }}
          >
            <img
              src="/logo.png"
              alt="Pulse Logo"
              className="w-full h-full object-contain brightness-0 invert"
            />
          </div>
          {/* Tooltip */}
          <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-2.5 py-1 text-[11px] font-semibold rounded-md shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap bg-[#0D152D] text-white border border-[#1A2544]">
            Pulse HR
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex flex-col items-center w-full overflow-y-auto no-scrollbar flex-1 py-1">
          {SIDEBAR_ITEMS.map((item, index) => {
            const Icon = item.icon;
            const active = isItemActive(item);

            return (
              <React.Fragment key={item.name}>
                <NavLink
                  to={item.path}
                  className={`group relative w-[62px] h-[52px] flex-shrink-0 flex flex-col items-center justify-center rounded-xl transition-all duration-150 ${
                    active
                      ? 'bg-[#0D1938] border border-blue-500/50 text-white shadow-[0_0_14px_rgba(37,99,235,0.28)]'
                      : 'text-[#76849D] hover:text-white hover:bg-[#0D152D]/80 border border-transparent'
                  }`}
                >
                  {/* Coral Pulsating Notification Dot for Profile */}
                  {item.hasNotification && (
                    <span className="absolute top-1.5 right-2 w-2 h-2 rounded-full bg-[#FF3B5B] ring-2 animate-pulse ring-[#060A18]" />
                  )}

                  <Icon
                    className={`w-[18px] h-[18px] mb-1 transition-transform group-hover:scale-105 stroke-[1.8] ${
                      active
                        ? 'text-[#3B82F6]'
                        : 'text-[#e8eaed] group-hover:text-white'
                    }`}
                  />
                  <span
                    className={`text-[10px] tracking-tight leading-none text-center truncate max-w-[58px] ${
                      active
                        ? 'font-semibold text-[#93C5FD]'
                        : 'font-medium text-[#e8eaed] group-hover:text-[#E2E8F0]'
                    }`}
                  >
                    {item.name}
                  </span>

                  {/* Tooltip on hover */}
                  <div className="absolute left-full ml-3 px-2.5 py-1 text-[11px] font-semibold rounded-md shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap bg-[#0D152D] text-white border border-[#1A2544]">
                    {item.name}
                  </div>
                </NavLink>

                {/* 1px divider between items */}
                {index < SIDEBAR_ITEMS.length - 1 && (
                  <div className="w-full h-[1px] my-1 flex-shrink-0 transition-colors bg-[#141E38]" />
                )}
              </React.Fragment>
            );
          })}
        </nav>
      </div>

      {/* Logout button at bottom */}
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
