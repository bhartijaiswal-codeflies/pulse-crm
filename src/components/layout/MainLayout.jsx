import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { MobileDrawer } from './MobileDrawer';
import { CommandPalette } from '../common/CommandPalette';
import { AddCompanyModal } from '../common/AddCompanyModal';
import { ToastContainer } from '../common/ToastContainer';
import { useApp } from '../../context/AppContext';

export const MainLayout = () => {
  const { sidebarCollapsed } = useApp();

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-[#172033] flex flex-col font-sans">
      {/* Mobile Drawer */}
      <MobileDrawer />

      {/* Desktop / Tablet Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${
          sidebarCollapsed ? 'md:pl-[84px]' : 'md:pl-64'
        }`}
      >
        {/* Header */}
        <Header />

        {/* Page Inner Container */}
        <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto animate-in fade-in duration-200">
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

