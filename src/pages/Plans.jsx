import React, { useState } from 'react';
import {
  Layers,
  Check,
  Plus,
  Sparkles,
  Zap,
  Building,
  ShieldCheck,
  Edit2,
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Plans = () => {
  const { plans, setPlans, showToast } = useApp();
  const [isYearly, setIsYearly] = useState(true);
  const [editingPlan, setEditingPlan] = useState(null);
  const [isAddPlanOpen, setIsAddPlanOpen] = useState(false);

  const [newPlan, setNewPlan] = useState({
    name: '',
    tier: 'Growth',
    monthlyPrice: 15999,
    yearlyPrice: 12999,
    description: '',
    companiesCount: 0,
    features: ['Up to 20 Users', 'Basic Automations', '100 GB Storage', 'Standard Support'],
    isPopular: false
  });

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editingPlan) return;
    setPlans(plans.map(p => p.id === editingPlan.id ? editingPlan : p));
    setEditingPlan(null);
    showToast(`Plan ${editingPlan.name} updated!`);
  };

  const handleAddPlan = (e) => {
    e.preventDefault();
    const created = {
      ...newPlan,
      id: `plan-${Date.now()}`,
      badge: newPlan.tier
    };
    setPlans([...plans, created]);
    setIsAddPlanOpen(false);
    showToast(`New tier "${created.name}" created!`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#172033] tracking-tight">
            Plans & Pricing Tiers
          </h1>
          <p className="text-xs md:text-sm text-[#8292AD] mt-1 font-medium">
            Configure subscription packages, quotas, entitlement features, and billing cycles
          </p>
        </div>

        <button
          onClick={() => setIsAddPlanOpen(true)}
          className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-[#2563EB] hover:bg-blue-700 rounded-xl shadow-md shadow-blue-500/20 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Tier</span>
        </button>
      </div>

      {/* Monthly / Yearly Billing Toggle */}
      <div className="flex items-center justify-center my-6">
        <div className="bg-white p-1.5 rounded-2xl border border-[#E5EAF2] shadow-xs flex items-center gap-2">
          <button
            onClick={() => setIsYearly(false)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              !isYearly ? 'bg-blue-600 text-white shadow-xs' : 'text-[#8292AD] hover:text-[#172033]'
            }`}
          >
            Monthly Billing
          </button>
          <button
            onClick={() => setIsYearly(true)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              isYearly ? 'bg-blue-600 text-white shadow-xs' : 'text-[#8292AD] hover:text-[#172033]'
            }`}
          >
            <span>Annual Billing</span>
            <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-extrabold ${
              isYearly ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-800'
            }`}>
              SAVE 20%
            </span>
          </button>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {plans.map((plan) => {
          const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;

          return (
            <div
              key={plan.id}
              className={`relative bg-white rounded-2xl p-6 border transition-all duration-200 flex flex-col justify-between ${
                plan.isPopular
                  ? 'border-blue-500 ring-2 ring-blue-500/20 shadow-xl shadow-blue-500/5'
                  : 'border-[#E5EAF2] shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:border-slate-300'
              }`}
            >
              {plan.isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-extrabold uppercase px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Most Popular
                </div>
              )}

              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-[#172033]">{plan.name}</h3>
                  <button
                    onClick={() => setEditingPlan(plan)}
                    className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition-colors"
                    title="Edit Plan"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <p className="text-xs text-[#8292AD] mt-1 min-h-[32px] leading-relaxed">
                  {plan.description}
                </p>

                {/* Price */}
                <div className="my-5 pb-5 border-b border-[#E5EAF2]">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-[#172033] tracking-tight">
                      ₹{price.toLocaleString()}
                    </span>
                    <span className="text-xs font-medium text-[#8292AD]">
                      / month
                    </span>
                  </div>
                  <span className="text-[11px] text-[#8292AD] mt-1 block">
                    {isYearly ? 'Billed annually' : 'Billed monthly'} • {plan.companiesCount} tenants active
                  </span>
                </div>

                {/* Features list */}
                <div className="space-y-2.5">
                  <p className="text-[11px] font-bold text-[#172033] uppercase tracking-wider">
                    Plan Inclusions:
                  </p>
                  <ul className="space-y-2">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-[#172033]">
                        <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span className="leading-snug">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-6 mt-6 border-t border-[#E5EAF2]">
                <button
                  onClick={() => setEditingPlan(plan)}
                  className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all ${
                    plan.isPopular
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20'
                      : 'bg-[#F7F9FC] hover:bg-slate-100 text-[#172033] border border-[#E5EAF2]'
                  }`}
                >
                  Configure Tier
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Edit Plan Modal */}
      {editingPlan && (
        <div className="fixed top-10 bottom-0 right-0 left-0 md:left-[76px] z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="fixed top-10 bottom-0 right-0 left-0 md:left-[76px]" onClick={() => setEditingPlan(null)} />
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-[#E5EAF2] p-6 space-y-4 z-10 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5EAF2]">
              <h3 className="text-base font-bold text-[#172033]">Edit {editingPlan.name}</h3>
              <button onClick={() => setEditingPlan(null)} className="p-1.5 text-slate-400 hover:text-slate-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#172033] mb-1">Tier Name</label>
                <input
                  type="text"
                  value={editingPlan.name}
                  onChange={(e) => setEditingPlan({ ...editingPlan, name: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5EAF2] focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#172033] mb-1">Monthly Price (₹)</label>
                  <input
                    type="number"
                    value={editingPlan.monthlyPrice}
                    onChange={(e) => setEditingPlan({ ...editingPlan, monthlyPrice: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5EAF2] focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#172033] mb-1">Yearly Discounted (₹)</label>
                  <input
                    type="number"
                    value={editingPlan.yearlyPrice}
                    onChange={(e) => setEditingPlan({ ...editingPlan, yearlyPrice: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5EAF2] focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#172033] mb-1">Description</label>
                <textarea
                  rows={2}
                  value={editingPlan.description}
                  onChange={(e) => setEditingPlan({ ...editingPlan, description: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5EAF2] focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="pt-3 border-t border-[#E5EAF2] flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setEditingPlan(null)}
                  className="px-4 py-2 text-xs font-semibold text-[#8292AD]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create New Plan Modal */}
      {isAddPlanOpen && (
        <div className="fixed top-10 bottom-0 right-0 left-0 md:left-[76px] z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="fixed top-10 bottom-0 right-0 left-0 md:left-[76px]" onClick={() => setIsAddPlanOpen(false)} />
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-[#E5EAF2] p-6 space-y-4 z-10 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5EAF2]">
              <h3 className="text-base font-bold text-[#172033]">Create New Pricing Tier</h3>
              <button onClick={() => setIsAddPlanOpen(false)} className="p-1.5 text-slate-400 hover:text-slate-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddPlan} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#172033] mb-1">Tier Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Scale Pro Plus"
                  value={newPlan.name}
                  onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5EAF2] focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#172033] mb-1">Monthly Price (₹)</label>
                  <input
                    type="number"
                    value={newPlan.monthlyPrice}
                    onChange={(e) => setNewPlan({ ...newPlan, monthlyPrice: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5EAF2] focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#172033] mb-1">Yearly Price (₹)</label>
                  <input
                    type="number"
                    value={newPlan.yearlyPrice}
                    onChange={(e) => setNewPlan({ ...newPlan, yearlyPrice: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5EAF2] focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#172033] mb-1">Description</label>
                <textarea
                  rows={2}
                  placeholder="Short tier summary..."
                  value={newPlan.description}
                  onChange={(e) => setNewPlan({ ...newPlan, description: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5EAF2] focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="pt-3 border-t border-[#E5EAF2] flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsAddPlanOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-[#8292AD]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl"
                >
                  Create Tier
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

