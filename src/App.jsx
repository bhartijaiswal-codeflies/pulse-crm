import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { MainLayout } from './components/layout/MainLayout';

// Pages
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Companies } from './pages/Companies';
import { Subscriptions } from './pages/Subscriptions';
import { Billing } from './pages/Billing';
import { Users } from './pages/Users';
import { Plans } from './pages/Plans';
import { Usage } from './pages/Usage';
import { Analytics } from './pages/Analytics';
import { SupportTickets } from './pages/SupportTickets';
import { ActivityLog } from './pages/ActivityLog';
import { Settings } from './pages/Settings';

export function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            {/* Core CRM Routes */}
            <Route path="companies" element={<Companies />} />
            <Route path="subscriptions" element={<Subscriptions />} />
            <Route path="billing" element={<Billing />} />
            <Route path="users" element={<Users />} />
            <Route path="plans" element={<Plans />} />
            <Route path="usage" element={<Usage />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="support" element={<SupportTickets />} />
            <Route path="activity" element={<ActivityLog />} />
            <Route path="settings" element={<Settings />} />

            {/* HR / Workforce Navigation Aliases from Snippet */}
            <Route path="attendance" element={<ActivityLog />} />
            <Route path="candidates" element={<Companies />} />
            <Route path="finances" element={<Billing />} />
            <Route path="assets" element={<Usage />} />
            <Route path="calendar" element={<ActivityLog />} />
            <Route path="profile" element={<Settings />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
