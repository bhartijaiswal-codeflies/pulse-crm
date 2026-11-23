import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { MobileDrawer } from './MobileDrawer';
import { CommandPalette } from '../common/CommandPalette';
import { AddCompanyModal } from '../common/AddCompanyModal';
import { ToastContainer } from '../common/ToastContainer';

export const MainLayout = () => {
  return (
    <div className="flex h-screen w-full bg-[#F7F9FC] overflow-hidden text-[#172033] font-sans">
      {/* Mobile Drawer (visible only on small screens) */}
      <MobileDrawer />

      {/* Desktop / Tablet Sidebar (w-[76px] or w-64) */}
      <Sidebar />

      {/* Main Content Area (Scrolls independently) */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto overflow-x-hidden min-w-0">
        {/* Header */}
        <Header />

        {/* Page Inner Container (max-w-[1720px] matches user snippet) */}
        <main className="flex-1 px-4 md:px-6 lg:px-8 pt-6 md:pt-7 pb-12 w-full max-w-[1720px] mx-auto animate-in fade-in duration-200 min-w-0">
          <Outlet />
        </main>
      </div>

      {/* Global Modals & Notifications */}
      <CommandPalette />
      <AddCompanyModal />
      <ToastContainer />
    </div>
  );
};
