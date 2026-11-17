import React, { useState } from 'react';
import { X, Building2, Mail, Phone, MapPin, Users, Layers, IndianRupee } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ImageUploadOption } from './ImageUploadOption';

export const AddCompanyModal = () => {
  const { isAddCompanyOpen, setIsAddCompanyOpen, addCompany, plans } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    logo: '',
    industry: 'Enterprise Software',
    contactPerson: '',
    email: '',
    phone: '',
    location: 'Bangalore, India',
    plan: 'Growth',
    users: '15',
    mrr: '₹19,999',
    status: 'Active',
    nextBilling: 'Dec 12, 2026'
  });

  const [errors, setErrors] = useState({});

  if (!isAddCompanyOpen) return null;

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Company name is required';
    if (!formData.contactPerson.trim()) errs.contactPerson = 'Contact person is required';
    if (!formData.email.trim() || !formData.email.includes('@')) errs.email = 'Valid email is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    addCompany({
      ...formData,
      users: parseInt(formData.users) || 10
    });

    setIsAddCompanyOpen(false);
    setFormData({
      name: '',
      industry: 'Enterprise Software',
      contactPerson: '',
      email: '',
      phone: '',
      location: 'Bangalore, India',
      plan: 'Growth',
      users: '15',
      mrr: '₹19,999',
      status: 'Active',
      nextBilling: 'Dec 12, 2026'
    });
  };

  return (
    <div className="fixed top-16 bottom-0 right-0 left-0 md:left-[76px] z-40 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="absolute inset-0"
        onClick={() => setIsAddCompanyOpen(false)}
      />

      <div className="relative w-full max-w-lg bg-white dark:bg-[#0D152D] rounded-2xl shadow-2xl border border-[#E5EAF2] dark:border-[#1A2548] overflow-hidden z-10 animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-[#E5EAF2] dark:border-[#1A2548] flex items-center justify-between bg-[#F7F9FC] dark:bg-[#0A1128]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900/60 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#172033] dark:text-white">Add New Company</h3>
              <p className="text-xs text-[#8292AD] dark:text-slate-400">Register a new client company account</p>
            </div>
          </div>
          <button
            onClick={() => setIsAddCompanyOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-3.5 sm:space-y-4 max-h-[88vh] sm:max-h-[80vh] overflow-y-auto">
          {/* Company Logo Option */}
          <ImageUploadOption
            value={formData.logo}
            onChange={(newLogo) => setFormData({ ...formData, logo: newLogo })}
            label="Company Logo / Image"
            shape="rounded-xl"
            type="company"
          />

          {/* Company Name */}
          <div>
            <label className="block text-xs font-semibold text-[#172033] dark:text-white mb-1">
              Company Name *
            </label>
            <div className="relative">
              <Building2 className="w-4 h-4 absolute left-3 top-3 text-[#8292AD] dark:text-slate-400" />
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Apex Innovations Ltd"
                className={`w-full pl-9 pr-3 py-2 text-xs rounded-xl border ${
                  errors.name ? 'border-red-500' : 'border-[#E5EAF2] dark:border-[#1E2D54]'
                } focus:outline-none focus:border-blue-500 bg-white dark:bg-[#0D1938] text-[#172033] dark:text-white placeholder:text-[#8292AD] dark:placeholder:text-slate-500`}
              />
            </div>
            {errors.name && <p className="text-[11px] text-red-500 mt-1">{errors.name}</p>}
          </div>

          {/* Industry & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#172033] dark:text-white mb-1">
                Industry Sector
              </label>
              <select
                value={formData.industry}
                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5EAF2] dark:border-[#1E2D54] focus:outline-none focus:border-blue-500 bg-white dark:bg-[#0D1938] text-[#172033] dark:text-white"
              >
                <option value="Enterprise Software">Enterprise Software</option>
                <option value="Cloud Infrastructure">Cloud Infrastructure</option>
                <option value="FinTech">FinTech</option>
                <option value="HealthTech">HealthTech</option>
                <option value="E-commerce">E-commerce</option>
                <option value="Cybersecurity">Cybersecurity</option>
                <option value="Artificial Intelligence">Artificial Intelligence</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#172033] dark:text-white mb-1">
                Headquarters
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 absolute left-3 top-3 text-[#8292AD] dark:text-slate-400" />
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="City, Country"
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-[#E5EAF2] dark:border-[#1E2D54] focus:outline-none focus:border-blue-500 bg-white dark:bg-[#0D1938] text-[#172033] dark:text-white placeholder:text-[#8292AD] dark:placeholder:text-slate-500"
                />
              </div>
            </div>
          </div>

          {/* Primary Contact Person & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#172033] dark:text-white mb-1">
                Primary Contact *
              </label>
              <input
                type="text"
                value={formData.contactPerson}
                onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                placeholder="Full Name"
                className={`w-full px-3 py-2 text-xs rounded-xl border ${
                  errors.contactPerson ? 'border-red-500' : 'border-[#E5EAF2] dark:border-[#1E2D54]'
                } focus:outline-none focus:border-blue-500 bg-white dark:bg-[#0D1938] text-[#172033] dark:text-white placeholder:text-[#8292AD] dark:placeholder:text-slate-500`}
              />
              {errors.contactPerson && (
                <p className="text-[11px] text-red-500 mt-1">{errors.contactPerson}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#172033] dark:text-white mb-1">
                Official Email *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-3 text-[#8292AD] dark:text-slate-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="admin@company.com"
                  className={`w-full pl-9 pr-3 py-2 text-xs rounded-xl border ${
                    errors.email ? 'border-red-500' : 'border-[#E5EAF2] dark:border-[#1E2D54]'
                  } focus:outline-none focus:border-blue-500 bg-white dark:bg-[#0D1938] text-[#172033] dark:text-white placeholder:text-[#8292AD] dark:placeholder:text-slate-500`}
                />
              </div>
              {errors.email && <p className="text-[11px] text-red-500 mt-1">{errors.email}</p>}
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-xs font-semibold text-[#172033] dark:text-white mb-1">
              Contact Phone
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 absolute left-3 top-3 text-[#8292AD] dark:text-slate-400" />
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 98765 43210"
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-[#E5EAF2] dark:border-[#1E2D54] focus:outline-none focus:border-blue-500 bg-white dark:bg-[#0D1938] text-[#172033] dark:text-white placeholder:text-[#8292AD] dark:placeholder:text-slate-500"
              />
            </div>
          </div>

          {/* Plan & User Seats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#172033] dark:text-white mb-1">
                Subscription Plan
              </label>
              <select
                value={formData.plan}
                onChange={(e) => {
                  const p = e.target.value;
                  let m = '₹19,999';
                  if (p === 'Starter') m = '₹7,999';
                  if (p === 'Enterprise') m = '₹49,999';
                  if (p === 'Custom') m = '₹89,999';
                  setFormData({ ...formData, plan: p, mrr: m });
                }}
                className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5EAF2] dark:border-[#1E2D54] focus:outline-none focus:border-blue-500 bg-white dark:bg-[#0D1938] text-[#172033] dark:text-white"
              >
                <option value="Starter">Starter (₹7,999/mo)</option>
                <option value="Growth">Growth (₹19,999/mo)</option>
                <option value="Enterprise">Enterprise (₹49,999/mo)</option>
                <option value="Custom">Custom Scale</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#172033] dark:text-white mb-1">
                User Seats
              </label>
              <div className="relative">
                <Users className="w-4 h-4 absolute left-3 top-3 text-[#8292AD] dark:text-slate-400" />
                <input
                  type="number"
                  min="1"
                  max="1000"
                  value={formData.users}
                  onChange={(e) => setFormData({ ...formData, users: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-[#E5EAF2] dark:border-[#1E2D54] focus:outline-none focus:border-blue-500 bg-white dark:bg-[#0D1938] text-[#172033] dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#172033] dark:text-white mb-1">
                Initial Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5EAF2] dark:border-[#1E2D54] focus:outline-none focus:border-blue-500 bg-white dark:bg-[#0D1938] text-[#172033] dark:text-white"
              >
                <option value="Active">Active</option>
                <option value="Trial">14-Day Trial</option>
                <option value="Pending Payment">Pending Payment</option>
              </select>
            </div>
          </div>

          {/* Footer buttons */}
          <div className="pt-4 border-t border-[#E5EAF2] dark:border-[#1A2548] flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2 sm:gap-2.5">
            <button
              type="button"
              onClick={() => setIsAddCompanyOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-[#8292AD] dark:text-slate-400 hover:text-[#172033] dark:hover:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer text-center"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-[#2563EB] hover:bg-blue-700 rounded-xl shadow-md shadow-blue-500/20 transition-colors cursor-pointer text-center"
            >
              Save Company
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

