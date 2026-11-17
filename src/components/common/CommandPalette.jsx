import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Building2,
  Users,
  CreditCard,
  PlusCircle,
  Layers,
  BarChart3,
  LifeBuoy,
  Settings,
  X,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CommandPalette = () => {
  const {
    isCommandPaletteOpen,
    setIsCommandPaletteOpen,
    companies,
    users,
    invoices,
    setIsAddCompanyOpen
  } = useApp();

  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  // Keyboard shortcut listener (Cmd+K or Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
      if (e.key === 'Escape' && isCommandPaletteOpen) {
        setIsCommandPaletteOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCommandPaletteOpen, setIsCommandPaletteOpen]);

  if (!isCommandPaletteOpen) return null;

  const filteredCompanies = companies.filter(c =>
    c.name.toLowerCase().includes(query.toLowerCase()) ||
    c.industry.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 4);

  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(query.toLowerCase()) ||
    u.email.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 3);

  const filteredInvoices = invoices.filter(i =>
    i.id.toLowerCase().includes(query.toLowerCase()) ||
    i.company.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 3);

  const pages = [
    { title: 'Dashboard', path: '/', icon: BarChart3 },
    { title: 'Companies Management', path: '/companies', icon: Building2 },
    { title: 'Subscriptions', path: '/subscriptions', icon: Layers },
    { title: 'Billing & Payments', path: '/billing', icon: CreditCard },
    { title: 'User Management', path: '/users', icon: Users },
    { title: 'Plans & Pricing', path: '/plans', icon: Layers },
    { title: 'Support Tickets', path: '/support', icon: LifeBuoy },
    { title: 'System Settings', path: '/settings', icon: Settings },
  ].filter(p => p.title.toLowerCase().includes(query.toLowerCase()));

  const handleSelect = (action) => {
    setIsCommandPaletteOpen(false);
    setQuery('');
    action();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-8 sm:pt-16 px-2 sm:px-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="fixed inset-0"
        onClick={() => setIsCommandPaletteOpen(false)}
      />

      <div className="relative w-full max-w-2xl bg-white dark:bg-[#0D152D] rounded-2xl shadow-2xl border border-[#E5EAF2] dark:border-[#1A2548] overflow-hidden z-10 animate-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-[#E5EAF2] dark:border-[#1A2548] bg-[#F7F9FC] dark:bg-[#0A1128]">
          <Search className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-3 flex-shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search companies, invoices, users..."
            className="w-full bg-transparent dark:!bg-transparent text-sm text-[#172033] dark:text-white placeholder-[#8292AD] dark:placeholder-slate-400 border-none outline-none focus:outline-none focus:ring-0 p-0"
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1 text-[#8292AD] hover:text-[#172033] dark:hover:text-white cursor-pointer">
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block text-[10px] font-mono bg-white dark:bg-[#141E3C] px-2 py-0.5 rounded border border-[#E5EAF2] dark:border-[#22325C] text-[#8292AD] dark:text-slate-400 ml-2">
            ESC
          </kbd>
        </div>

        {/* Results Container */}
        <div className="max-h-96 overflow-y-auto p-3 space-y-4">
          {/* Quick Actions */}
          {query === '' && (
            <div>
              <p className="px-3 text-[11px] font-bold text-[#8292AD] uppercase tracking-wider mb-1">
                Quick Actions
              </p>
              <div className="space-y-1">
                <button
                  onClick={() => handleSelect(() => setIsAddCompanyOpen(true))}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-[#172033] hover:bg-blue-50/60 hover:text-blue-600 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <PlusCircle className="w-4 h-4 text-emerald-500" />
                    <span>Create New Company Profile</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </button>
                <button
                  onClick={() => handleSelect(() => navigate('/billing'))}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-[#172033] hover:bg-blue-50/60 hover:text-blue-600 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <CreditCard className="w-4 h-4 text-amber-500" />
                    <span>View 12 Pending Invoices</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </button>
              </div>
            </div>
          )}

          {/* Navigation Pages */}
          {pages.length > 0 && (
            <div>
              <p className="px-3 text-[11px] font-bold text-[#8292AD] uppercase tracking-wider mb-1">
                Pages
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                {pages.map((p) => {
                  const Icon = p.icon;
                  return (
                    <button
                      key={p.path}
                      onClick={() => handleSelect(() => navigate(p.path))}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-[#172033] hover:bg-slate-100 transition-colors text-left"
                    >
                      <Icon className="w-4 h-4 text-blue-600" />
                      <span>{p.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Companies match */}
          {filteredCompanies.length > 0 && (
            <div>
              <p className="px-3 text-[11px] font-bold text-[#8292AD] uppercase tracking-wider mb-1">
                Companies ({filteredCompanies.length})
              </p>
              <div className="space-y-1">
                {filteredCompanies.map(comp => (
                  <button
                    key={comp.id}
                    onClick={() => handleSelect(() => navigate('/companies'))}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs hover:bg-[#F7F9FC] transition-colors text-left"
                  >
                    <div className="flex items-center gap-2.5">
                      <img src={comp.logo} alt={comp.name} className="w-6 h-6 rounded-md object-cover" />
                      <div>
                        <p className="font-semibold text-[#172033]">{comp.name}</p>
                        <p className="text-[11px] text-[#8292AD]">{comp.industry} • {comp.plan} Plan</p>
                      </div>
                    </div>
                    <span className="text-[11px] font-semibold text-emerald-600">{comp.mrr}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Users match */}
          {filteredUsers.length > 0 && (
            <div>
              <p className="px-3 text-[11px] font-bold text-[#8292AD] uppercase tracking-wider mb-1">
                Users ({filteredUsers.length})
              </p>
              <div className="space-y-1">
                {filteredUsers.map(u => (
                  <button
                    key={u.id}
                    onClick={() => handleSelect(() => navigate('/users'))}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs hover:bg-[#F7F9FC] transition-colors text-left"
                  >
                    <div className="flex items-center gap-2.5">
                      <img src={u.avatar} alt={u.name} className="w-6 h-6 rounded-full object-cover" />
                      <div>
                        <p className="font-semibold text-[#172033]">{u.name}</p>
                        <p className="text-[11px] text-[#8292AD]">{u.email} • {u.role}</p>
                      </div>
                    </div>
                    <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full font-medium">
                      {u.company}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Invoices match */}
          {filteredInvoices.length > 0 && (
            <div>
              <p className="px-3 text-[11px] font-bold text-[#8292AD] uppercase tracking-wider mb-1">
                Invoices ({filteredInvoices.length})
              </p>
              <div className="space-y-1">
                {filteredInvoices.map(inv => (
                  <button
                    key={inv.id}
                    onClick={() => handleSelect(() => navigate('/billing'))}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs hover:bg-[#F7F9FC] transition-colors text-left"
                  >
                    <div>
                      <span className="font-mono font-semibold text-blue-600">{inv.id}</span>
                      <p className="text-[11px] text-[#8292AD]">{inv.company} • {inv.plan}</p>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-[#172033]">{inv.amount}</span>
                      <span className={`block text-[10px] font-semibold ${
                        inv.status === 'Paid' ? 'text-emerald-600' : 'text-amber-600'
                      }`}>{inv.status}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 bg-[#F7F9FC] border-t border-[#E5EAF2] flex items-center justify-between text-[11px] text-[#8292AD]">
          <span>Tip: Use ↑ ↓ arrows to navigate, Enter to select</span>
          <span>Pulse CRM v2.4</span>
        </div>
      </div>
    </div>
  );
};

