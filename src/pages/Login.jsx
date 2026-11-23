import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Zap,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Shield,
  Users,
  Laptop,
  Globe,
  Sun,
  Moon,
  CheckCircle2,
  Check
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Login = () => {
  const navigate = useNavigate();
  const { themeMode, setThemeMode, showToast } = useApp();

  const isDarkMode = themeMode === 'dark';

  // Demo accounts data matching reference UI
  const DEMO_ROLES = [
    {
      id: 'hr_admin',
      role: 'HR Admin',
      name: 'saurabh.h',
      email: 'saurabh.h@pulsehr.com',
      password: '••••••••••••••',
    },
    {
      id: 'team_lead',
      role: 'Team Lead',
      name: 'Elena Rostova',
      email: 'elena.r@pulsehr.com',
      password: '••••••••••••••',
    },
    {
      id: 'employee',
      role: 'Employee',
      name: 'Marcus Vance',
      email: 'marcus.v@pulsehr.com',
      password: '••••••••••••••',
    },
  ];

  const [selectedRole, setSelectedRole] = useState('hr_admin');
  const [email, setEmail] = useState('saurabh.h@pulsehr.com');
  const [password, setPassword] = useState('PulseEnterprise2026!');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Handle Demo Role Selection
  const handleSelectRole = (role) => {
    setSelectedRole(role.id);
    setEmail(role.email);
    setPassword('PulseEnterprise2026!');
    showToast(`Auto-filled demo credentials for ${role.role}`, 'info');
  };

  // Handle Sign In submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      showToast('Please enter your work email', 'error');
      return;
    }
    setIsLoading(true);
    showToast('Signing into Pulse Enterprise Console...', 'info');
    setTimeout(() => {
      setIsLoading(false);
      showToast(`Welcome back, ${email.split('@')[0]}!`, 'success');
      navigate('/');
    }, 600);
  };

  // Handle Google Workspace SSO simulation
  const handleGoogleSSO = () => {
    setIsLoading(true);
    showToast('Authenticating with Google Workspace SSO...', 'info');
    setTimeout(() => {
      setIsLoading(false);
      showToast('Google Workspace authentication successful!', 'success');
      navigate('/');
    }, 700);
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-white dark:bg-[#070B18] text-[#172033] dark:text-white font-sans transition-colors duration-200">
      {/* ================= LEFT SIDE: FORM ================= */}
      <div className="w-full lg:w-[48%] xl:w-[46%] min-h-screen flex flex-col justify-between px-6 sm:px-10 xl:px-14 py-6 sm:py-8 z-10">
        {/* Top Header Row */}
        <div className="flex items-center justify-between gap-3 w-full">
          {/* Logo Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center p-2 text-white shadow-sm ring-2 ring-blue-500/20">
              <img
                src="/pulse-logo.png"
                alt="Pulse"
                className="w-full h-full object-contain brightness-0 invert"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-[#172033] dark:text-white tracking-tight leading-none">
                  Pulse
                </span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900/60">
                  v2.4 Enterprise
                </span>
              </div>
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mt-0.5 leading-none">
                BY CODEFLIES
              </p>
            </div>
          </div>

          {/* Right Controls: Theme Toggle & Enterprise SSO */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Light / Dark Mode Toggle Pill */}
            <div className="bg-[#F1F5F9] dark:bg-[#131B38] p-1 rounded-full border border-slate-200 dark:border-[#1E2D54] flex items-center gap-0.5">
              <button
                type="button"
                onClick={() => setThemeMode('light')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold transition-all ${
                  !isDarkMode
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Light Mode"
              >
                <Sun className="w-3.5 h-3.5 text-amber-500" />
                <span className="hidden sm:inline">Light</span>
              </button>
              <button
                type="button"
                onClick={() => setThemeMode('dark')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold transition-all ${
                  isDarkMode
                    ? 'bg-[#2563EB] text-white shadow-2xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
                title="Dark Mode"
              >
                <Moon className="w-3.5 h-3.5 text-blue-200" />
                <span className="hidden sm:inline">Dark</span>
              </button>
            </div>

            {/* Enterprise SSO Button */}
            <button
              type="button"
              onClick={() => showToast('Enterprise SAML/SSO directory connected (Okta & Azure AD ready)', 'info')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/80 shadow-2xs hover:bg-emerald-100/70 dark:hover:bg-emerald-900/40 transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Enterprise SSO</span>
            </button>
          </div>
        </div>

        {/* Center: Sign In Form Box */}
        <div className="max-w-[430px] w-full mx-auto my-auto py-8">
          {/* Badge Above Title */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border border-blue-200/80 dark:border-blue-900/60 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-blue-500" />
            <span>Centralized Workforce Operating System</span>
          </div>

          {/* Heading & Subtitle */}
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#172033] dark:text-white tracking-tight">
            Sign In to your Account
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1.5 font-normal leading-relaxed">
            Welcome back! Access your enterprise workforce, payroll, and asset workspace.
          </p>

          {/* 1-Click Demo Login Box */}
          <div className="mt-5 bg-[#F8FAFC] dark:bg-[#0E1733] border border-[#E2E8F0] dark:border-[#1E2D54] rounded-2xl p-3 sm:p-3.5 shadow-2xs">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-[11px] font-bold tracking-wider text-[#172033] dark:text-white flex items-center gap-1.5 uppercase">
                <Zap className="w-3.5 h-3.5 text-blue-500 fill-blue-500" />
                1-Click Demo Login
              </span>
              <span className="text-[10px] text-slate-400 font-medium">
                Auto-fill role
              </span>
            </div>

            {/* Role Card Grid */}
            <div className="grid grid-cols-3 gap-2">
              {DEMO_ROLES.map((role) => {
                const isSelected = selectedRole === role.id;
                return (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => handleSelectRole(role)}
                    className={`relative p-2 sm:p-2.5 rounded-xl text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'border-2 border-blue-600 bg-white dark:bg-[#121D3D] shadow-xs text-blue-600 dark:text-blue-400 ring-2 ring-blue-500/10'
                        : 'border border-[#E2E8F0] dark:border-[#1E2D54] bg-white/80 dark:bg-[#0A1128] text-slate-700 dark:text-slate-200 hover:border-blue-300 dark:hover:border-blue-700'
                    }`}
                  >
                    {isSelected && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 absolute top-2 right-2" />
                    )}
                    <p className={`text-xs font-bold leading-tight ${isSelected ? 'text-blue-600 dark:text-blue-400' : 'text-[#172033] dark:text-white'}`}>
                      {role.role}
                    </p>
                    <p className="text-[10px] text-slate-400 dark:text-slate-400 font-normal mt-0.5 truncate">
                      {role.name}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Continue with Google Workspace */}
          <button
            type="button"
            onClick={handleGoogleSSO}
            className="w-full mt-3.5 flex items-center justify-center gap-2.5 py-2.5 px-4 bg-white dark:bg-[#0E1733] hover:bg-slate-50 dark:hover:bg-[#142045] border border-slate-300 dark:border-[#1E2D54] rounded-xl text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 shadow-2xs transition-all cursor-pointer"
          >
            {/* Google 4-color G icon */}
            <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            <span>Continue with Google Workspace</span>
          </button>

          {/* Divider */}
          <div className="relative my-4 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-slate-800" />
            </div>
            <span className="relative bg-white dark:bg-[#070B18] px-3 text-[10px] uppercase font-bold tracking-wider text-slate-400">
              OR SIGN IN WITH EMAIL
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {/* Work Email */}
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1 block">
                Work Email Address
              </label>
              <div className="relative flex items-center">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  required
                  className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-white dark:bg-[#0A1128] border border-slate-300 dark:border-[#1E2D54] rounded-xl focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/30 text-[#172033] dark:text-white placeholder:text-slate-400 transition-colors shadow-2xs"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => showToast('Password reset link has been dispatched to your work email', 'info')}
                  className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative flex items-center">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••••"
                  required
                  className="w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm bg-white dark:bg-[#0A1128] border border-slate-300 dark:border-[#1E2D54] rounded-xl focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/30 text-[#172033] dark:text-white placeholder:text-slate-400 transition-colors shadow-2xs"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer p-0.5"
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Keep me logged in checkbox */}
            <div className="flex items-center gap-2 pt-0.5">
              <input
                id="rememberMe"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 border-slate-300 dark:border-slate-700 focus:ring-blue-500 cursor-pointer"
              />
              <label
                htmlFor="rememberMe"
                className="text-xs text-slate-600 dark:text-slate-400 font-medium cursor-pointer select-none"
              >
                Keep me logged in for 30 days
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-4 py-3 px-4 bg-[#2563EB] hover:bg-blue-700 active:bg-blue-800 text-white font-semibold rounded-xl shadow-md shadow-blue-600/30 flex items-center justify-center gap-2 text-sm transition-all cursor-pointer disabled:opacity-70"
            >
              <span>{isLoading ? 'Signing in...' : 'Sign In to Dashboard'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Bottom Link: Request Provisioning */}
          <div className="text-center mt-4 text-xs text-slate-500 dark:text-slate-400">
            <span>New team member without an account? </span>
            <button
              type="button"
              onClick={() => showToast('Provisioning request sent to your company tenant administrator', 'info')}
              className="text-blue-600 dark:text-blue-400 font-semibold hover:underline cursor-pointer"
            >
              Request Provisioning
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-400 dark:text-slate-500 pt-4 border-t border-slate-100 dark:border-[#131B38] w-full">
          <span>© 2026 Pulse by Codeflies. All rights reserved.</span>
          <div className="flex items-center gap-1.5 text-slate-400 dark:text-slate-400">
            <Shield className="w-3.5 h-3.5 text-emerald-500" />
            <span>256-Bit SSL Encrypted</span>
          </div>
        </div>
      </div>

      {/* ================= RIGHT SIDE: SHOWCASE ================= */}
      <div className="hidden lg:flex flex-col items-center justify-center relative p-8 xl:p-12 overflow-hidden flex-1 bg-gradient-to-br from-[#EEF4FF] via-[#F1F5F9] to-[#E2E8F0] dark:from-[#090F24] dark:via-[#0D152D] dark:to-[#060A18] border-l border-slate-200 dark:border-[#131B38]">
        {/* Soft radial glow backdrops */}
        <div className="absolute w-[500px] h-[500px] bg-blue-400/20 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-[400px] h-[400px] bg-indigo-400/20 dark:bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Dark MacOS Window Container */}
        <div className="w-full max-w-[550px] xl:max-w-[580px] bg-[#070D1E] rounded-[28px] border border-[#1A264D] shadow-[0_25px_60px_-15px_rgba(3,7,18,0.45)] p-5 sm:p-6 text-white relative select-none overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-300">
          {/* Window Title Bar */}
          <div className="flex items-center justify-between pb-4 border-b border-[#131E3D]">
            <div className="flex items-center gap-2">
              {/* MacOS window dots */}
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
              </div>
              <span className="text-xs text-slate-400 font-medium ml-1.5 tracking-tight">
                Pulse OS • Enterprise Workforce Hub
              </span>
            </div>

            {/* Badges on right of titlebar */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950/70 border border-emerald-800/80 px-2 py-0.5 rounded-full flex items-center gap-1.5 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                SYSTEM ONLINE
              </span>
              <span className="text-[10px] font-semibold text-blue-400 bg-blue-950/70 border border-blue-800/80 px-2 py-0.5 rounded-full flex items-center gap-1 shadow-2xs">
                <Shield className="w-2.5 h-2.5 text-blue-400" />
                SOC-2 Type II
              </span>
            </div>
          </div>

          {/* Window Canvas Body */}
          <div className="relative py-4 sm:py-6 flex flex-col items-center justify-center">
            {/* Floating Badge: Top-Left (224 Active Today) */}
            <div className="absolute top-2 left-0 bg-[#0E1736]/90 backdrop-blur-md border border-[#202E5A] rounded-2xl p-2 sm:p-2.5 flex items-center gap-2.5 shadow-xl z-20">
              <div className="w-8 h-8 rounded-xl bg-blue-600/30 border border-blue-500/40 text-blue-400 flex items-center justify-center flex-shrink-0">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-1.5 leading-none">
                  <span className="text-xs font-bold text-white">224 Active Today</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                </div>
                <p className="text-[10px] text-slate-400 font-normal mt-1 leading-none">
                  99.2% Attendance Recorded
                </p>
              </div>
            </div>

            {/* Floating Badge: Top-Right (ISO 27001 & SOC-2) */}
            <div className="absolute top-10 right-0 bg-[#0E1736]/90 backdrop-blur-md border border-[#202E5A] rounded-xl px-2.5 py-1.5 text-[10px] font-semibold text-slate-300 flex items-center gap-1.5 shadow-xl z-20">
              <Shield className="w-3 h-3 text-blue-400" />
              <span>ISO 27001 & SOC-2</span>
            </div>

            {/* Central Glowing Cosmic Illustration */}
            <div className="w-[280px] h-[280px] sm:w-[310px] sm:h-[310px] my-3 sm:my-4 relative flex items-center justify-center">
              {/* Outer pulsing neon glow ring */}
              <div className="absolute inset-0 rounded-full bg-blue-500/25 blur-xl animate-pulse pointer-events-none" />
              
              {/* Circular Graphic Container */}
              <div className="w-full h-full rounded-full overflow-hidden relative border-2 border-blue-400/50 shadow-[0_0_50px_rgba(37,99,235,0.4)] ring-4 ring-blue-500/10">
                <img
                  src="/login-orb.jpg"
                  alt="Pulse OS Workforce Hub"
                  className="w-full h-full object-cover scale-110"
                />
              </div>
            </div>

            {/* Floating Badge: Bottom-Right (234 Hardware Assets) */}
            <div className="absolute bottom-2 right-0 bg-[#0E1736]/90 backdrop-blur-md border border-[#202E5A] rounded-2xl p-2 sm:p-2.5 flex items-center gap-2.5 shadow-xl z-20">
              <div className="w-8 h-8 rounded-xl bg-emerald-600/30 border border-emerald-500/40 text-emerald-400 flex items-center justify-center flex-shrink-0">
                <Laptop className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-white leading-none">
                  234 Hardware Assets
                </p>
                <p className="text-[10px] text-slate-400 font-normal mt-1 leading-none">
                  Inventory Synced & Active
                </p>
              </div>
            </div>
          </div>

          {/* Window Footer: Feature Pills */}
          <div className="pt-4 border-t border-[#131E3D] flex items-center justify-center gap-2 flex-wrap">
            <span className="text-[10px] font-medium text-slate-300 bg-[#0E1736] border border-[#1E2D54] px-2.5 py-1 rounded-lg">
              ✨ Smart Payroll
            </span>
            <span className="text-[10px] font-medium text-slate-300 bg-[#0E1736] border border-[#1E2D54] px-2.5 py-1 rounded-lg">
              📊 Live Attendance
            </span>
            <span className="text-[10px] font-medium text-slate-300 bg-[#0E1736] border border-[#1E2D54] px-2.5 py-1 rounded-lg">
              💻 Asset Management
            </span>
            <span className="text-[10px] font-medium text-slate-300 bg-[#0E1736] border border-[#1E2D54] px-2.5 py-1 rounded-lg">
              👥 Candidate Portal
            </span>
          </div>
        </div>

        {/* Bottom Floating Capsule */}
        <div className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 dark:bg-[#0D152D]/90 backdrop-blur-md border border-slate-200 dark:border-[#1E2D54] shadow-md text-xs font-semibold text-slate-700 dark:text-slate-300 z-10">
          <Globe className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span>Unified HR, Payroll, Attendance & Asset Infrastructure for Codeflies</span>
        </div>
      </div>
    </div>
  );
};
