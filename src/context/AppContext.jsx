import React, { createContext, useContext, useState } from 'react';
import {
  INITIAL_COMPANIES,
  INVOICES_DATA,
  SUPPORT_TICKETS,
  USERS_DATA,
  ACTIVITY_LOGS,
  NOTIFICATIONS_DATA,
  PLANS_DATA
} from '../data/mockData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [companies, setCompanies] = useState(INITIAL_COMPANIES);
  const [invoices, setInvoices] = useState(INVOICES_DATA);
  const [tickets, setTickets] = useState(SUPPORT_TICKETS);
  const [users, setUsers] = useState(USERS_DATA);
  const [activityLogs, setActivityLogs] = useState(ACTIVITY_LOGS);
  const [notifications, setNotifications] = useState(NOTIFICATIONS_DATA);
  const [plans, setPlans] = useState(PLANS_DATA);

  // Layout states (default to expanded sidebar as requested)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState('Today: Nov 12, 2026');

  // Modals & Palettes
  const [isAddCompanyOpen, setIsAddCompanyOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  // Toast system
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = 'success') => {
    const id = Date.now() + Math.random().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Company Actions
  const addCompany = (newComp) => {
    const company = {
      ...newComp,
      id: `CMP-${Math.floor(1011 + Math.random() * 900)}`,
      joinedDate: 'Nov 12, 2026',
      users: Number(newComp.users) || 5,
      logo: newComp.logo || 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop&crop=faces'
    };
    setCompanies([company, ...companies]);
    
    // Add activity log
    const newLog = {
      id: `log-${Date.now()}`,
      actor: 'Bobby Singh (Super Admin)',
      action: 'Created new company account',
      target: `${company.name} (${company.plan} Plan)`,
      ip: '103.21.244.18',
      category: 'Admin',
      time: 'Just now',
      status: 'Success'
    };
    setActivityLogs([newLog, ...activityLogs]);
    showToast(`Company "${company.name}" created successfully!`);
  };

  const updateCompany = (id, updatedFields) => {
    setCompanies(companies.map(c => c.id === id ? { ...c, ...updatedFields } : c));
    showToast('Company information updated successfully!');
  };

  const deleteCompany = (id) => {
    const comp = companies.find(c => c.id === id);
    setCompanies(companies.filter(c => c.id !== id));
    showToast(`Company "${comp?.name || 'Item'}" deleted.`, 'info');
  };

  // Invoice Actions
  const markInvoicePaid = (id) => {
    setInvoices(invoices.map(inv => {
      if (inv.id === id) {
        return { ...inv, status: 'Paid', method: inv.method.replace('(Pending)', '').replace('(Failed)', '') + '(Settled)' };
      }
      return inv;
    }));
    showToast(`Invoice ${id} marked as Paid!`);
  };

  const addInvoice = (newInv) => {
    const inv = {
      ...newInv,
      id: `INV-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      date: 'Nov 12, 2026',
      status: 'Pending',
      pdfUrl: '#'
    };
    setInvoices([inv, ...invoices]);
    showToast(`Invoice ${inv.id} created successfully!`);
  };

  // User Actions
  const addUser = (newUser) => {
    const user = {
      ...newUser,
      id: `USR-${Math.floor(210 + Math.random() * 500)}`,
      avatar: newUser.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&h=120&fit=crop&crop=faces',
      status: 'Active',
      lastActive: 'Just now'
    };
    setUsers([user, ...users]);
    showToast(`User ${user.name} invited!`);
  };

  // Ticket Actions
  const addTicket = (newTkt) => {
    const tkt = {
      ...newTkt,
      id: `TKT-${Math.floor(8860 + Math.random() * 500)}`,
      createdAt: 'Just now',
      status: 'Open',
      replies: 0,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&crop=faces'
    };
    setTickets([tkt, ...tickets]);
    showToast(`Support ticket ${tkt.id} created.`);
  };

  const updateTicketStatus = (id, newStatus) => {
    setTickets(tickets.map(t => t.id === id ? { ...t, status: newStatus } : t));
    showToast(`Ticket ${id} status updated to ${newStatus}.`);
  };

  return (
    <AppContext.Provider
      value={{
        companies,
        addCompany,
        updateCompany,
        deleteCompany,
        invoices,
        markInvoicePaid,
        addInvoice,
        tickets,
        addTicket,
        updateTicketStatus,
        users,
        addUser,
        plans,
        setPlans,
        activityLogs,
        notifications,
        setNotifications,
        sidebarCollapsed,
        setSidebarCollapsed,
        mobileMenuOpen,
        setMobileMenuOpen,
        selectedDateRange,
        setSelectedDateRange,
        isAddCompanyOpen,
        setIsAddCompanyOpen,
        isCommandPaletteOpen,
        setIsCommandPaletteOpen,
        toasts,
        showToast,
        removeToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

