import React, { useState } from 'react';
import {
  Layers,
  Check,
  Plus,
  Sparkles,
  Zap,
  Building2,
  ShieldCheck,
  Edit2,
  X,
  TrendingUp,
  Users,
  HardDrive,
  Activity,
  Copy,
  Trash2,
  Download,
  Rocket,
  Crown,
  ChevronDown,
  ChevronUp,
  Minus,
  HelpCircle,
  ArrowRight,
  ShieldAlert,
  Server
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Plans = () => {
  const { plans, setPlans, showToast } = useApp();
  const [isYearly, setIsYearly] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [isComparisonOpen, setIsComparisonOpen] = useState(true);
  const [editingPlan, setEditingPlan] = useState(null);
  const [isAddPlanOpen, setIsAddPlanOpen] = useState(false);
  const [deletingPlan, setDeletingPlan] = useState(null);

  // New feature input temp state for modals
  const [newFeatureInput, setNewFeatureInput] = useState('');

  const [newPlan, setNewPlan] = useState({
    name: '',
    tier: 'Growth',
    monthlyPrice: 19999,
    yearlyPrice: 15999,
    description: '',
    companiesCount: 0,
    badge: 'Popular for Teams',
    features: [
      'Up to 25 Team Members',
      '15,000 Contacts & Leads',
      'Advanced Automation Workflows',
      '150 GB Storage Limit',
      '24/7 Priority Support'
    ],
    limits: { users: 25, contacts: 15000, storage: '150 GB', apiCalls: '250k/mo' },
    isPopular: false
  });

  // Calculate high level metrics
  const totalTenants = plans.reduce((acc, p) => acc + (p.companiesCount || 0), 0);
  const totalMRR = plans.reduce((acc, p) => acc + (p.companiesCount || 0) * (p.monthlyPrice || 0), 0);
  const projectedARR = totalMRR * 12;
  const mostPopular = [...plans].sort((a, b) => (b.companiesCount || 0) - (a.companiesCount || 0))[0];

  // Filter plans based on category tab
  const filteredPlans = plans.filter((plan) => {
    if (activeCategory === 'All') return true;
    if (activeCategory === 'Standard') return plan.tier === 'Starter' || plan.tier === 'Growth';
    if (activeCategory === 'Enterprise') return plan.tier === 'Enterprise' || plan.tier === 'Custom';
    if (activeCategory === 'Popular') return plan.isPopular || plan.badge?.toLowerCase().includes('popular');
    return true;
  });

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editingPlan) return;
    setPlans(plans.map(p => p.id === editingPlan.id ? editingPlan : p));
    setEditingPlan(null);
    showToast(`Tier "${editingPlan.name}" updated successfully!`, 'success');
  };

  const handleAddPlan = (e) => {
    e.preventDefault();
    if (!newPlan.name.trim()) return;
    const created = {
      ...newPlan,
      id: `plan-${Date.now()}`,
      companiesCount: 0
    };
    setPlans([...plans, created]);
    setIsAddPlanOpen(false);
    setNewPlan({
      name: '',
      tier: 'Growth',
      monthlyPrice: 19999,
      yearlyPrice: 15999,
      description: '',
      companiesCount: 0,
      badge: 'Popular for Teams',
      features: ['Up to 25 Team Members', '15,000 Contacts & Leads', 'Advanced Automation Workflows'],
      limits: { users: 25, contacts: 15000, storage: '150 GB', apiCalls: '250k/mo' },
      isPopular: false
    });
    showToast(`New tier "${created.name}" created!`, 'success');
  };

  const handleDuplicatePlan = (plan) => {
    const clone = {
      ...plan,
      id: `plan-${Date.now()}`,
      name: `${plan.name} (Copy)`,
      companiesCount: 0,
      isPopular: false
    };
    setPlans([...plans, clone]);
    showToast(`Duplicated "${plan.name}" into "${clone.name}"`, 'success');
  };

  const handleDeletePlan = (id) => {
    const target = plans.find(p => p.id === id);
    setPlans(plans.filter(p => p.id !== id));
    setDeletingPlan(null);
    showToast(`Tier "${target?.name || id}" archived!`, 'info');
  };

  const exportSpecsCSV = () => {
    const headers = 'ID,Name,Tier,MonthlyPrice,YearlyPrice,ActiveTenants,UsersLimit,Storage,APICalls,Popular\n';
    const rows = plans.map(p =>
      `"${p.id}","${p.name}","${p.tier}",${p.monthlyPrice},${p.yearlyPrice},${p.companiesCount || 0},"${p.limits?.users || 'N/A'}","${p.limits?.storage || 'N/A'}","${p.limits?.apiCalls || 'N/A'}",${p.isPopular ? 'Yes' : 'No'}`
    ).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Pulse_CRM_Pricing_Tiers.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Exported pricing tiers specs to CSV', 'success');
  };

  // Helper for tier visual styling
  const getTierMeta = (tier, isPopular) => {
    switch (tier?.toLowerCase()) {
      case 'starter':
        return {
          icon: Rocket,
          badgeColor: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800',
          gradient: 'from-emerald-500 to-teal-600',
          ring: 'focus:ring-emerald-500/20',
          bulletColor: 'text-emerald-500'
        };
      case 'growth':
        return {
          icon: Zap,
          badgeColor: 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800',
          gradient: 'from-blue-600 to-indigo-600',
          ring: 'focus:ring-blue-500/20',
          bulletColor: 'text-blue-500'
        };
      case 'enterprise':
        return {
          icon: ShieldCheck,
          badgeColor: 'bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800',
          gradient: 'from-purple-600 to-indigo-700',
          ring: 'focus:ring-purple-500/20',
          bulletColor: 'text-purple-500'
        };
      case 'custom':
      default:
        return {
          icon: Crown,
          badgeColor: 'bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800',
          gradient: 'from-amber-500 to-orange-600',
          ring: 'focus:ring-amber-500/20',
          bulletColor: 'text-amber-500'
        };
    }
  };

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-200">
      {/* 1. Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172033] dark:text-white tracking-tight">
              Plans & Pricing Tiers
            </h1>
            <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900/60">
              {plans.length} Active Tiers • {totalTenants} Subscribed
            </span>
          </div>
          <p className="text-xs md:text-sm text-[#8292AD] dark:text-slate-400 mt-1 font-medium">
            Configure subscription packages, multi-tenant quotas, feature entitlements, and billing cycles.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto flex-wrap">
          <button
            onClick={exportSpecsCSV}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#172033] dark:text-slate-200 bg-white dark:bg-[#0D152D] hover:bg-slate-50 dark:hover:bg-[#14234b] border border-[#E5EAF2] dark:border-[#1A2548] rounded-xl shadow-2xs transition-colors cursor-pointer"
            title="Export CSV specifications"
          >
            <Download className="w-3.5 h-3.5 text-[#8292AD] dark:text-slate-400" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={() => setIsAddPlanOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-[0.98] rounded-xl shadow-md shadow-blue-500/20 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Create New Tier</span>
          </button>
        </div>
      </div>

      {/* 2. Executive KPI Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#0D152D] border border-[#E5EAF2] dark:border-[#1A2548] shadow-2xs relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#8292AD] dark:text-slate-400">Total Subscribed Tenants</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2.5 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-[#172033] dark:text-white tracking-tight">{totalTenants}</span>
            <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" /> +14%
            </span>
          </div>
          <p className="text-[11px] text-[#8292AD] dark:text-slate-400 mt-1">Active client organizations</p>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#0D152D] border border-[#E5EAF2] dark:border-[#1A2548] shadow-2xs relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#8292AD] dark:text-slate-400">Monthly Tier MRR</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2.5 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-[#172033] dark:text-white tracking-tight">₹17.6L</span>
            <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">+15% vs last mo</span>
          </div>
          <p className="text-[11px] text-[#8292AD] dark:text-slate-400 mt-1">Recurring subscription volume</p>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#0D152D] border border-[#E5EAF2] dark:border-[#1A2548] shadow-2xs relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#8292AD] dark:text-slate-400">Annual Run Rate (ARR)</span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2.5 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-[#172033] dark:text-white tracking-tight">₹2.11 Cr</span>
            <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400">Projected</span>
          </div>
          <p className="text-[11px] text-[#8292AD] dark:text-slate-400 mt-1">Full-year contract pipeline</p>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#0D152D] border border-[#E5EAF2] dark:border-[#1A2548] shadow-2xs relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#8292AD] dark:text-slate-400">Highest Adoption Tier</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2.5 flex items-baseline gap-2">
            <span className="text-xl sm:text-2xl font-black text-[#172033] dark:text-white tracking-tight truncate">
              {mostPopular?.name || 'Growth Pro'}
            </span>
          </div>
          <p className="text-[11px] text-amber-600 dark:text-amber-400 mt-1 font-semibold">
            {mostPopular?.companiesCount || 128} tenants (51.6% share)
          </p>
        </div>
      </div>

      {/* 3. Controls & Billing Switcher Bar */}
      <div className="bg-white dark:bg-[#0D152D] p-3 sm:p-4 rounded-2xl border border-[#E5EAF2] dark:border-[#1A2548] shadow-2xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 md:pb-0">
          {[
            { id: 'All', label: `All Tiers (${plans.length})` },
            { id: 'Standard', label: 'Standard Plans' },
            { id: 'Enterprise', label: 'Enterprise & Custom' },
            { id: 'Popular', label: 'Most Adopted' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                activeCategory === tab.id
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'bg-slate-50 dark:bg-[#0A1128] text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#14234b]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Monthly / Annual Toggle Slider */}
        <div className="flex items-center justify-center sm:justify-end gap-3 flex-shrink-0">
          <div className="bg-slate-100 dark:bg-[#0A1128] p-1 rounded-xl border border-slate-200 dark:border-[#1E2D54] flex items-center gap-1">
            <button
              type="button"
              onClick={() => setIsYearly(false)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                !isYearly
                  ? 'bg-white dark:bg-[#0D1938] text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-[#8292AD] dark:text-slate-400 hover:text-[#172033] dark:hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setIsYearly(true)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                isYearly
                  ? 'bg-white dark:bg-[#0D1938] text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-[#8292AD] dark:text-slate-400 hover:text-[#172033] dark:hover:text-white'
              }`}
            >
              <span>Annual</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full font-extrabold bg-emerald-500 text-white">
                SAVE 20%
              </span>
            </button>
          </div>

          <button
            type="button"
            onClick={() => setIsComparisonOpen(!isComparisonOpen)}
            className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#8292AD] dark:text-slate-400 hover:text-[#172033] dark:hover:text-white hover:bg-slate-50 dark:hover:bg-[#0A1128] border border-[#E5EAF2] dark:border-[#1E2D54] rounded-xl transition-colors cursor-pointer"
          >
            <span>Comparison Matrix</span>
            {isComparisonOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* 4. Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        {filteredPlans.map((plan) => {
          const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
          const meta = getTierMeta(plan.tier, plan.isPopular);
          const TierIcon = meta.icon;
          const adoptionPct = totalTenants > 0 ? Math.round(((plan.companiesCount || 0) / totalTenants) * 100) : 0;
          const annualSavings = (plan.monthlyPrice - plan.yearlyPrice) * 12;

          return (
            <div
              key={plan.id}
              className={`relative bg-white dark:bg-[#0D152D] rounded-2xl p-5 sm:p-6 border transition-all duration-200 flex flex-col justify-between group ${
                plan.isPopular
                  ? 'border-blue-500 dark:border-blue-500 ring-2 ring-blue-500/20 shadow-xl shadow-blue-500/10'
                  : 'border-[#E5EAF2] dark:border-[#1A2548] shadow-2xs hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              {/* Popular glowing top badge */}
              {plan.isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[10px] font-extrabold uppercase px-3 py-0.5 rounded-full shadow-md flex items-center gap-1 tracking-wider">
                  <Sparkles className="w-3 h-3 text-amber-300" />
                  Most Popular
                </div>
              )}

              <div>
                {/* Tier Top Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${meta.gradient} text-white flex items-center justify-center shadow-md flex-shrink-0`}>
                      <TierIcon className="w-5 h-5 stroke-[2.2]" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-[#172033] dark:text-white leading-tight">
                        {plan.name}
                      </h3>
                      <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-md mt-1 border ${meta.badgeColor}`}>
                        {plan.badge || plan.tier}
                      </span>
                    </div>
                  </div>

                  {/* Edit Plan Button */}
                  <button
                    onClick={() => setEditingPlan(plan)}
                    className="p-1.5 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-[#14234b] rounded-lg transition-colors cursor-pointer"
                    title="Edit Plan Tiers & Features"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-xs text-[#8292AD] dark:text-slate-400 mt-3 min-h-[36px] leading-relaxed">
                  {plan.description}
                </p>

                {/* Adoption Progress Meter */}
                <div className="mt-3.5 p-2.5 rounded-xl bg-[#F8FAFC] dark:bg-[#0A1128] border border-[#E5EAF2] dark:border-[#1A2548]">
                  <div className="flex items-center justify-between text-[11px] mb-1.5">
                    <span className="font-semibold text-[#172033] dark:text-slate-300">Tenant Adoption</span>
                    <span className="font-bold text-blue-600 dark:text-blue-400">
                      {plan.companiesCount || 0} ({adoptionPct}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${meta.gradient}`}
                      style={{ width: `${Math.min(adoptionPct, 100)}%` }}
                    />
                  </div>
                </div>

                {/* Price Display */}
                <div className="my-4 py-4 border-y border-[#E5EAF2] dark:border-[#1A2548]">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl font-black text-[#172033] dark:text-white tracking-tight">
                      ₹{price.toLocaleString()}
                    </span>
                    <span className="text-xs font-semibold text-[#8292AD] dark:text-slate-400">
                      / month
                    </span>
                  </div>

                  <div className="mt-1 text-[11px] text-[#8292AD] dark:text-slate-400 flex items-center justify-between">
                    <span>{isYearly ? 'Billed annually' : 'Billed monthly'}</span>
                    {isYearly && annualSavings > 0 && (
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                        Save ₹{annualSavings.toLocaleString()}/yr
                      </span>
                    )}
                  </div>
                </div>

                {/* Quota Highlights Box */}
                <div className="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-[#0A1128] border border-[#E5EAF2] dark:border-[#1A2548] mb-4 text-center">
                  <div>
                    <span className="text-[10px] text-[#8292AD] dark:text-slate-400 block font-medium">Team</span>
                    <span className="text-xs font-bold text-[#172033] dark:text-white truncate block">
                      {plan.limits?.users ? (plan.limits.users === 999 ? 'Unlimited' : `${plan.limits.users} Seats`) : '10 Seats'}
                    </span>
                  </div>
                  <div className="border-x border-[#E5EAF2] dark:border-[#1E2D54]">
                    <span className="text-[10px] text-[#8292AD] dark:text-slate-400 block font-medium">Storage</span>
                    <span className="text-xs font-bold text-[#172033] dark:text-white truncate block">
                      {plan.limits?.storage || '50 GB'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#8292AD] dark:text-slate-400 block font-medium">API Limit</span>
                    <span className="text-xs font-bold text-[#172033] dark:text-white truncate block">
                      {plan.limits?.apiCalls || '50k/mo'}
                    </span>
                  </div>
                </div>

                {/* Features list */}
                <div className="space-y-2">
                  <p className="text-[11px] font-bold text-[#172033] dark:text-white uppercase tracking-wider">
                    Included Features:
                  </p>
                  <ul className="space-y-2">
                    {plan.features?.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-[#172033] dark:text-slate-200">
                        <Check className={`w-3.5 h-3.5 ${meta.bulletColor} flex-shrink-0 mt-0.5 stroke-[2.5]`} />
                        <span className="leading-snug">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-5 mt-5 border-t border-[#E5EAF2] dark:border-[#1A2548] space-y-2.5">
                <button
                  onClick={() => setEditingPlan(plan)}
                  className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    plan.isPopular
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 active:scale-[0.98]'
                      : 'bg-slate-100 hover:bg-slate-200 dark:bg-[#14234b] dark:hover:bg-[#1e3470] text-[#172033] dark:text-white'
                  }`}
                >
                  <span>Configure Tier</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                {/* Card Secondary Action Bar */}
                <div className="flex items-center justify-between pt-1 text-[11px] text-slate-400">
                  <button
                    type="button"
                    onClick={() => handleDuplicatePlan(plan)}
                    className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                    title="Duplicate Tier"
                  >
                    <Copy className="w-3 h-3" />
                    <span>Clone</span>
                  </button>

                  {plans.length > 1 && (
                    <button
                      type="button"
                      onClick={() => setDeletingPlan(plan)}
                      className="flex items-center gap-1 hover:text-rose-500 dark:hover:text-rose-400 transition-colors cursor-pointer"
                      title="Archive Tier"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Archive</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 5. Comprehensive Feature Comparison Matrix */}
      {isComparisonOpen && (
        <div className="bg-white dark:bg-[#0D152D] rounded-2xl border border-[#E5EAF2] dark:border-[#1A2548] shadow-2xs overflow-hidden transition-all">
          <div className="px-5 py-4 border-b border-[#E5EAF2] dark:border-[#1A2548] flex items-center justify-between bg-slate-50/60 dark:bg-[#0A1128]/80">
            <div>
              <h2 className="text-sm sm:text-base font-bold text-[#172033] dark:text-white">
                Detailed Feature & Limit Comparison Matrix
              </h2>
              <p className="text-xs text-[#8292AD] dark:text-slate-400">
                Side-by-side entitlement matrix comparing quotas, permissions, and service level agreements
              </p>
            </div>
            <button
              onClick={() => setIsComparisonOpen(false)}
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
            >
              Hide Table
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#E5EAF2] dark:border-[#1A2548] bg-slate-50 dark:bg-[#0A1128]">
                  <th className="py-3 px-4 font-bold text-[#172033] dark:text-white w-1/4">Specification</th>
                  <th className="py-3 px-4 font-bold text-[#172033] dark:text-white text-center">Starter</th>
                  <th className="py-3 px-4 font-bold text-blue-600 dark:text-blue-400 text-center bg-blue-50/40 dark:bg-blue-950/20">Growth Pro</th>
                  <th className="py-3 px-4 font-bold text-[#172033] dark:text-white text-center">Enterprise</th>
                  <th className="py-3 px-4 font-bold text-[#172033] dark:text-white text-center">Custom Scale</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5EAF2] dark:divide-[#1A2548]">
                {/* Category 1: Capacity & Quotas */}
                <tr className="bg-slate-100/50 dark:bg-slate-900/50 font-bold text-[#172033] dark:text-slate-300">
                  <td colSpan={5} className="py-2.5 px-4 text-[11px] uppercase tracking-wider text-blue-600 dark:text-blue-400">
                    1. Quotas & User Seats
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-[#172033] dark:text-white">Included Team Members</td>
                  <td className="py-3 px-4 text-center text-slate-600 dark:text-slate-300">10 Seats</td>
                  <td className="py-3 px-4 text-center font-bold text-blue-600 dark:text-blue-400 bg-blue-50/20 dark:bg-blue-950/10">35 Seats</td>
                  <td className="py-3 px-4 text-center text-slate-600 dark:text-slate-300">Unlimited</td>
                  <td className="py-3 px-4 text-center text-slate-600 dark:text-slate-300">Custom Unlimited</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-[#172033] dark:text-white">Contact & Account Records</td>
                  <td className="py-3 px-4 text-center text-slate-600 dark:text-slate-300">5,000</td>
                  <td className="py-3 px-4 text-center font-bold text-blue-600 dark:text-blue-400 bg-blue-50/20 dark:bg-blue-950/10">25,000</td>
                  <td className="py-3 px-4 text-center text-slate-600 dark:text-slate-300">Unlimited</td>
                  <td className="py-3 px-4 text-center text-slate-600 dark:text-slate-300">Bespoke Cluster</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-[#172033] dark:text-white">Cloud Document Storage</td>
                  <td className="py-3 px-4 text-center text-slate-600 dark:text-slate-300">50 GB</td>
                  <td className="py-3 px-4 text-center font-bold text-blue-600 dark:text-blue-400 bg-blue-50/20 dark:bg-blue-950/10">250 GB</td>
                  <td className="py-3 px-4 text-center text-slate-600 dark:text-slate-300">1 TB NVMe</td>
                  <td className="py-3 px-4 text-center text-slate-600 dark:text-slate-300">Unlimited S3 Storage</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-[#172033] dark:text-white">Monthly API Request Quota</td>
                  <td className="py-3 px-4 text-center text-slate-600 dark:text-slate-300">50k/mo</td>
                  <td className="py-3 px-4 text-center font-bold text-blue-600 dark:text-blue-400 bg-blue-50/20 dark:bg-blue-950/10">500k/mo</td>
                  <td className="py-3 px-4 text-center text-slate-600 dark:text-slate-300">5,000,000/mo</td>
                  <td className="py-3 px-4 text-center text-slate-600 dark:text-slate-300">Dedicated Gateway</td>
                </tr>

                {/* Category 2: CRM & Automations */}
                <tr className="bg-slate-100/50 dark:bg-slate-900/50 font-bold text-[#172033] dark:text-slate-300">
                  <td colSpan={5} className="py-2.5 px-4 text-[11px] uppercase tracking-wider text-blue-600 dark:text-blue-400">
                    2. CRM & Automation Capabilities
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-[#172033] dark:text-white">Multi-Pipeline Management</td>
                  <td className="py-3 px-4 text-center"><Check className="w-4 h-4 text-emerald-500 mx-auto" /></td>
                  <td className="py-3 px-4 text-center bg-blue-50/20 dark:bg-blue-950/10"><Check className="w-4 h-4 text-emerald-500 mx-auto" /></td>
                  <td className="py-3 px-4 text-center"><Check className="w-4 h-4 text-emerald-500 mx-auto" /></td>
                  <td className="py-3 px-4 text-center"><Check className="w-4 h-4 text-emerald-500 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-[#172033] dark:text-white">Automated Trigger Workflows</td>
                  <td className="py-3 px-4 text-center text-slate-600 dark:text-slate-300">Basic (5 rules)</td>
                  <td className="py-3 px-4 text-center font-bold text-blue-600 dark:text-blue-400 bg-blue-50/20 dark:bg-blue-950/10">Unlimited Custom</td>
                  <td className="py-3 px-4 text-center text-slate-600 dark:text-slate-300">Advanced AI Engine</td>
                  <td className="py-3 px-4 text-center text-slate-600 dark:text-slate-300">Dedicated Microservice</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-[#172033] dark:text-white">WhatsApp & SMS Gateway</td>
                  <td className="py-3 px-4 text-center"><Minus className="w-4 h-4 text-slate-400 mx-auto" /></td>
                  <td className="py-3 px-4 text-center bg-blue-50/20 dark:bg-blue-950/10"><Check className="w-4 h-4 text-emerald-500 mx-auto" /></td>
                  <td className="py-3 px-4 text-center"><Check className="w-4 h-4 text-emerald-500 mx-auto" /></td>
                  <td className="py-3 px-4 text-center"><Check className="w-4 h-4 text-emerald-500 mx-auto" /></td>
                </tr>

                {/* Category 3: Security & Governance */}
                <tr className="bg-slate-100/50 dark:bg-slate-900/50 font-bold text-[#172033] dark:text-slate-300">
                  <td colSpan={5} className="py-2.5 px-4 text-[11px] uppercase tracking-wider text-blue-600 dark:text-blue-400">
                    3. Security, Governance & Compliance
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-[#172033] dark:text-white">SAML 2.0 / Okta SSO</td>
                  <td className="py-3 px-4 text-center"><Minus className="w-4 h-4 text-slate-400 mx-auto" /></td>
                  <td className="py-3 px-4 text-center bg-blue-50/20 dark:bg-blue-950/10"><Minus className="w-4 h-4 text-slate-400 mx-auto" /></td>
                  <td className="py-3 px-4 text-center"><Check className="w-4 h-4 text-emerald-500 mx-auto" /></td>
                  <td className="py-3 px-4 text-center"><Check className="w-4 h-4 text-emerald-500 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-[#172033] dark:text-white">Granular Role Permissions</td>
                  <td className="py-3 px-4 text-center text-slate-600 dark:text-slate-300">Standard 3 Roles</td>
                  <td className="py-3 px-4 text-center font-bold text-blue-600 dark:text-blue-400 bg-blue-50/20 dark:bg-blue-950/10">Full Custom RBAC</td>
                  <td className="py-3 px-4 text-center text-slate-600 dark:text-slate-300">Enterprise IAM Matrix</td>
                  <td className="py-3 px-4 text-center text-slate-600 dark:text-slate-300">Custom LDAP / ActiveDir</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-[#172033] dark:text-white">Immutable Audit Trail Retention</td>
                  <td className="py-3 px-4 text-center text-slate-600 dark:text-slate-300">7 Days</td>
                  <td className="py-3 px-4 text-center font-bold text-blue-600 dark:text-blue-400 bg-blue-50/20 dark:bg-blue-950/10">90 Days</td>
                  <td className="py-3 px-4 text-center text-slate-600 dark:text-slate-300">2 Years Retention</td>
                  <td className="py-3 px-4 text-center text-slate-600 dark:text-slate-300">Indefinite SOC2 Vault</td>
                </tr>

                {/* Category 4: Support & SLA */}
                <tr className="bg-slate-100/50 dark:bg-slate-900/50 font-bold text-[#172033] dark:text-slate-300">
                  <td colSpan={5} className="py-2.5 px-4 text-[11px] uppercase tracking-wider text-blue-600 dark:text-blue-400">
                    4. Support & Guaranteed SLA
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-[#172033] dark:text-white">Support Channels</td>
                  <td className="py-3 px-4 text-center text-slate-600 dark:text-slate-300">Email</td>
                  <td className="py-3 px-4 text-center font-bold text-blue-600 dark:text-blue-400 bg-blue-50/20 dark:bg-blue-950/10">24/7 Email & Chat</td>
                  <td className="py-3 px-4 text-center text-slate-600 dark:text-slate-300">Phone & Slack Channel</td>
                  <td className="py-3 px-4 text-center text-slate-600 dark:text-slate-300">Dedicated Account Exec</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-[#172033] dark:text-white">Uptime Guarantee SLA</td>
                  <td className="py-3 px-4 text-center text-slate-600 dark:text-slate-300">99.5%</td>
                  <td className="py-3 px-4 text-center font-bold text-blue-600 dark:text-blue-400 bg-blue-50/20 dark:bg-blue-950/10">99.9%</td>
                  <td className="py-3 px-4 text-center text-slate-600 dark:text-slate-300">99.99%</td>
                  <td className="py-3 px-4 text-center text-slate-600 dark:text-slate-300">99.999% High Availability</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 6. Pricing Governance FAQ / Callout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#0D152D] border border-[#E5EAF2] dark:border-[#1A2548] shadow-2xs">
          <div className="flex items-center gap-2.5 text-blue-600 dark:text-blue-400 font-bold text-xs mb-2">
            <Zap className="w-4 h-4" />
            <span>Instant Proration</span>
          </div>
          <p className="text-xs text-[#8292AD] dark:text-slate-400 leading-relaxed">
            When a tenant switches between monthly and annual plans or upgrades their tier, changes apply immediately with real-time pro-rated credit adjustments.
          </p>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#0D152D] border border-[#E5EAF2] dark:border-[#1A2548] shadow-2xs">
          <div className="flex items-center gap-2.5 text-emerald-600 dark:text-emerald-400 font-bold text-xs mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span>Quota Enforcement</span>
          </div>
          <p className="text-xs text-[#8292AD] dark:text-slate-400 leading-relaxed">
            Tenants reaching 80% and 100% of their storage or user quotas receive automated warning alerts, followed by a 14-day grace window before overage throttling.
          </p>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#0D152D] border border-[#E5EAF2] dark:border-[#1A2548] shadow-2xs">
          <div className="flex items-center gap-2.5 text-purple-600 dark:text-purple-400 font-bold text-xs mb-2">
            <Crown className="w-4 h-4" />
            <span>Custom Scale Tiers</span>
          </div>
          <p className="text-xs text-[#8292AD] dark:text-slate-400 leading-relaxed">
            For regulated enterprises requiring custom database residency, HIPAA/SOC2 compliance, or bespoke SLAs, dedicated contracts can be authored on demand.
          </p>
        </div>
      </div>

      {/* 7. Edit Plan Modal (Scoped Backdrop) */}
      {editingPlan && (
        <div className="fixed top-16 bottom-0 right-0 left-0 md:left-[76px] z-40 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="absolute inset-0" onClick={() => setEditingPlan(null)} />
          <div className="relative w-full max-w-xl bg-white dark:bg-[#0D152D] rounded-2xl shadow-2xl border border-[#E5EAF2] dark:border-[#1A2548] overflow-hidden z-10 animate-in zoom-in-95 max-h-[90vh] sm:max-h-[85vh] flex flex-col">
            {/* Header */}
            <div className="px-5 py-4 border-b border-[#E5EAF2] dark:border-[#1A2548] flex items-center justify-between bg-slate-50 dark:bg-[#0A1128]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                  <Edit2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#172033] dark:text-white">Configure {editingPlan.name}</h3>
                  <p className="text-xs text-[#8292AD] dark:text-slate-400">Update rates, badges, entitlement lists and quotas</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setEditingPlan(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSaveEdit} className="p-5 space-y-4 overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#172033] dark:text-white mb-1">Tier Name</label>
                  <input
                    type="text"
                    required
                    value={editingPlan.name}
                    onChange={(e) => setEditingPlan({ ...editingPlan, name: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5EAF2] dark:border-[#1E2D54] bg-white dark:bg-[#0A1128] text-[#172033] dark:text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#172033] dark:text-white mb-1">Badge Callout</label>
                  <input
                    type="text"
                    value={editingPlan.badge || ''}
                    onChange={(e) => setEditingPlan({ ...editingPlan, badge: e.target.value })}
                    placeholder="e.g. Most Popular"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5EAF2] dark:border-[#1E2D54] bg-white dark:bg-[#0A1128] text-[#172033] dark:text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Pricing Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#172033] dark:text-white mb-1">Monthly Billing (₹)</label>
                  <input
                    type="number"
                    value={editingPlan.monthlyPrice}
                    onChange={(e) => setEditingPlan({ ...editingPlan, monthlyPrice: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5EAF2] dark:border-[#1E2D54] bg-white dark:bg-[#0A1128] text-[#172033] dark:text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#172033] dark:text-white mb-1">Annual Billing Equivalent (₹/mo)</label>
                  <input
                    type="number"
                    value={editingPlan.yearlyPrice}
                    onChange={(e) => setEditingPlan({ ...editingPlan, yearlyPrice: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5EAF2] dark:border-[#1E2D54] bg-white dark:bg-[#0A1128] text-[#172033] dark:text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Quota Limits */}
              <div className="p-3 bg-slate-50 dark:bg-[#0A1128] rounded-xl border border-[#E5EAF2] dark:border-[#1A2548] space-y-3">
                <p className="text-[11px] font-bold text-[#172033] dark:text-white uppercase tracking-wider">
                  Resource Limits & Quotas
                </p>
                <div className="grid grid-cols-3 gap-2.5">
                  <div>
                    <label className="block text-[10px] font-semibold text-[#8292AD] dark:text-slate-400 mb-1">Users (999=Unlim)</label>
                    <input
                      type="number"
                      value={editingPlan.limits?.users || 10}
                      onChange={(e) => setEditingPlan({
                        ...editingPlan,
                        limits: { ...(editingPlan.limits || {}), users: parseInt(e.target.value) || 0 }
                      })}
                      className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-[#E5EAF2] dark:border-[#1E2D54] bg-white dark:bg-[#0D1938] text-[#172033] dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-[#8292AD] dark:text-slate-400 mb-1">Storage</label>
                    <input
                      type="text"
                      value={editingPlan.limits?.storage || '50 GB'}
                      onChange={(e) => setEditingPlan({
                        ...editingPlan,
                        limits: { ...(editingPlan.limits || {}), storage: e.target.value }
                      })}
                      className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-[#E5EAF2] dark:border-[#1E2D54] bg-white dark:bg-[#0D1938] text-[#172033] dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-[#8292AD] dark:text-slate-400 mb-1">API Calls</label>
                    <input
                      type="text"
                      value={editingPlan.limits?.apiCalls || '50k/mo'}
                      onChange={(e) => setEditingPlan({
                        ...editingPlan,
                        limits: { ...(editingPlan.limits || {}), apiCalls: e.target.value }
                      })}
                      className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-[#E5EAF2] dark:border-[#1E2D54] bg-white dark:bg-[#0D1938] text-[#172033] dark:text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-[#172033] dark:text-white mb-1">Description</label>
                <textarea
                  rows={2}
                  value={editingPlan.description}
                  onChange={(e) => setEditingPlan({ ...editingPlan, description: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5EAF2] dark:border-[#1E2D54] bg-white dark:bg-[#0A1128] text-[#172033] dark:text-white focus:border-blue-500 focus:outline-none"
                />
              </div>

              {/* Features List with Add/Remove */}
              <div>
                <label className="block text-xs font-semibold text-[#172033] dark:text-white mb-1.5">
                  Feature Inclusions ({editingPlan.features?.length || 0})
                </label>
                <div className="space-y-1.5 max-h-36 overflow-y-auto mb-2">
                  {editingPlan.features?.map((feat, idx) => (
                    <div key={idx} className="flex items-center justify-between px-2.5 py-1 bg-slate-50 dark:bg-[#0A1128] rounded-lg text-xs border border-[#E5EAF2] dark:border-[#1A2548]">
                      <span className="truncate text-[#172033] dark:text-slate-300">{feat}</span>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = editingPlan.features.filter((_, i) => i !== idx);
                          setEditingPlan({ ...editingPlan, features: updated });
                        }}
                        className="text-slate-400 hover:text-rose-500 p-0.5"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Add new feature input */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newFeatureInput}
                    onChange={(e) => setNewFeatureInput(e.target.value)}
                    placeholder="Add a new feature inclusion..."
                    className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-[#E5EAF2] dark:border-[#1E2D54] bg-white dark:bg-[#0A1128] text-[#172033] dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (newFeatureInput.trim()) {
                        setEditingPlan({
                          ...editingPlan,
                          features: [...(editingPlan.features || []), newFeatureInput.trim()]
                        });
                        setNewFeatureInput('');
                      }
                    }}
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Popularity Toggle */}
              <label className="flex items-center gap-2 cursor-pointer pt-2">
                <input
                  type="checkbox"
                  checked={editingPlan.isPopular}
                  onChange={(e) => setEditingPlan({ ...editingPlan, isPopular: e.target.checked })}
                  className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                />
                <span className="text-xs font-semibold text-[#172033] dark:text-white">
                  Highlight as "Most Popular" Tier
                </span>
              </label>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-[#E5EAF2] dark:border-[#1A2548] flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setEditingPlan(null)}
                  className="px-4 py-2 text-xs font-semibold text-[#8292AD] dark:text-slate-400 hover:text-[#172033] dark:hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 8. Create New Plan Modal (Scoped Backdrop) */}
      {isAddPlanOpen && (
        <div className="fixed top-16 bottom-0 right-0 left-0 md:left-[76px] z-40 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="absolute inset-0" onClick={() => setIsAddPlanOpen(false)} />
          <div className="relative w-full max-w-lg bg-white dark:bg-[#0D152D] rounded-2xl shadow-2xl border border-[#E5EAF2] dark:border-[#1A2548] overflow-hidden z-10 animate-in zoom-in-95 max-h-[90vh] sm:max-h-[85vh] flex flex-col">
            <div className="px-5 py-4 border-b border-[#E5EAF2] dark:border-[#1A2548] flex items-center justify-between bg-slate-50 dark:bg-[#0A1128]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                  <Plus className="w-4 h-4 stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#172033] dark:text-white">Author New Pricing Tier</h3>
                  <p className="text-xs text-[#8292AD] dark:text-slate-400">Define billing prices, quotas, and entitlements</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsAddPlanOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddPlan} className="p-5 space-y-4 overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#172033] dark:text-white mb-1">Tier Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Scale Pro Max"
                    value={newPlan.name}
                    onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5EAF2] dark:border-[#1E2D54] bg-white dark:bg-[#0A1128] text-[#172033] dark:text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#172033] dark:text-white mb-1">Category Tier</label>
                  <select
                    value={newPlan.tier}
                    onChange={(e) => setNewPlan({ ...newPlan, tier: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5EAF2] dark:border-[#1E2D54] bg-white dark:bg-[#0A1128] text-[#172033] dark:text-white focus:border-blue-500"
                  >
                    <option value="Starter">Starter Tier</option>
                    <option value="Growth">Growth Tier</option>
                    <option value="Enterprise">Enterprise Tier</option>
                    <option value="Custom">Custom Tier</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#172033] dark:text-white mb-1">Monthly Billing (₹)</label>
                  <input
                    type="number"
                    value={newPlan.monthlyPrice}
                    onChange={(e) => {
                      const m = parseInt(e.target.value) || 0;
                      setNewPlan({ ...newPlan, monthlyPrice: m, yearlyPrice: Math.round(m * 0.8) });
                    }}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5EAF2] dark:border-[#1E2D54] bg-white dark:bg-[#0A1128] text-[#172033] dark:text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#172033] dark:text-white mb-1">Annual Billing (₹/mo with -20%)</label>
                  <input
                    type="number"
                    value={newPlan.yearlyPrice}
                    onChange={(e) => setNewPlan({ ...newPlan, yearlyPrice: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5EAF2] dark:border-[#1E2D54] bg-white dark:bg-[#0A1128] text-[#172033] dark:text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#172033] dark:text-white mb-1">Description</label>
                <textarea
                  rows={2}
                  placeholder="Target audience and capability summary..."
                  value={newPlan.description}
                  onChange={(e) => setNewPlan({ ...newPlan, description: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5EAF2] dark:border-[#1E2D54] bg-white dark:bg-[#0A1128] text-[#172033] dark:text-white focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="pt-4 border-t border-[#E5EAF2] dark:border-[#1A2548] flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsAddPlanOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-[#8292AD] dark:text-slate-400 hover:text-[#172033] dark:hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs"
                >
                  Create Plan Tier
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 9. Delete / Archive Confirmation Modal (Scoped Backdrop) */}
      {deletingPlan && (
        <div className="fixed top-16 bottom-0 right-0 left-0 md:left-[76px] z-40 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="absolute inset-0" onClick={() => setDeletingPlan(null)} />
          <div className="relative w-full max-w-md bg-white dark:bg-[#0D152D] rounded-2xl shadow-2xl border border-[#E5EAF2] dark:border-[#1A2548] p-5 sm:p-6 z-10 animate-in zoom-in-95 text-center">
            <div className="w-12 h-12 mx-auto rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center mb-3">
              <ShieldAlert className="w-6 h-6 stroke-[2]" />
            </div>
            <h3 className="text-base font-bold text-[#172033] dark:text-white">
              Archive Tier "{deletingPlan.name}"?
            </h3>
            <p className="text-xs text-[#8292AD] dark:text-slate-400 mt-2 leading-relaxed">
              Archiving this pricing tier will remove it from public tenant registration. Existing {deletingPlan.companiesCount || 0} subscribed accounts will remain unaffected.
            </p>
            <div className="mt-5 flex items-center justify-center gap-2.5">
              <button
                type="button"
                onClick={() => setDeletingPlan(null)}
                className="px-4 py-2 text-xs font-semibold text-[#8292AD] dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDeletePlan(deletingPlan.id)}
                className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-xs"
              >
                Yes, Archive Tier
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
