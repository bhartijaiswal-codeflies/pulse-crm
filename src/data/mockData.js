// Pulse CRM Mock Data

export const KPI_DATA = {
  totalCompanies: {
    value: 248,
    growth: 12,
    previousText: "vs previous 30 days",
    trend: "up"
  },
  activeSubscriptions: {
    value: 225,
    growth: 8,
    previousText: "vs previous 30 days",
    trend: "up"
  },
  mrr: {
    value: "₹17.6L",
    growth: 14,
    previousText: "vs previous 30 days",
    trend: "up"
  },
  pendingPayments: {
    value: 12,
    amount: "₹2.4L",
    statusText: "₹2.4L outstanding",
    trend: "warning"
  }
};

export const REVENUE_DATA = {
  monthly: [
    { name: 'Jan', revenue: 9.8, subscriptions: 180, expenses: 3.2 },
    { name: 'Feb', revenue: 10.5, subscriptions: 186, expenses: 3.4 },
    { name: 'Mar', revenue: 11.2, subscriptions: 194, expenses: 3.5 },
    { name: 'Apr', revenue: 12.0, subscriptions: 201, expenses: 3.8 },
    { name: 'May', revenue: 12.8, subscriptions: 205, expenses: 3.9 },
    { name: 'Jun', revenue: 13.4, subscriptions: 210, expenses: 4.1 },
    { name: 'Jul', revenue: 14.2, subscriptions: 214, expenses: 4.2 },
    { name: 'Aug', revenue: 15.1, subscriptions: 218, expenses: 4.4 },
    { name: 'Sep', revenue: 15.9, subscriptions: 220, expenses: 4.5 },
    { name: 'Oct', revenue: 16.7, subscriptions: 222, expenses: 4.7 },
    { name: 'Nov', revenue: 17.6, subscriptions: 225, expenses: 4.8 },
    { name: 'Dec', revenue: 18.5, subscriptions: 232, expenses: 5.0 },
  ],
  weekly: [
    { name: 'Week 1', revenue: 4.1, subscriptions: 220, expenses: 1.1 },
    { name: 'Week 2', revenue: 4.3, subscriptions: 222, expenses: 1.2 },
    { name: 'Week 3', revenue: 4.5, subscriptions: 224, expenses: 1.2 },
    { name: 'Week 4', revenue: 4.7, subscriptions: 225, expenses: 1.3 },
  ],
  yearly: [
    { name: '2022', revenue: 68.4, subscriptions: 120, expenses: 22.0 },
    { name: '2023', revenue: 114.2, subscriptions: 175, expenses: 36.5 },
    { name: '2024', revenue: 162.8, subscriptions: 212, expenses: 48.0 },
    { name: '2025', revenue: 198.5, subscriptions: 238, expenses: 55.4 },
    { name: '2026 (YTD)', revenue: 184.2, subscriptions: 248, expenses: 51.2 },
  ]
};

export const SUBSCRIPTION_STATUS_DATA = [
  { name: 'Active', value: 225, color: '#10B981', percentage: '90.7%' },
  { name: 'Trial', value: 8, color: '#3B82F6', percentage: '3.2%' },
  { name: 'Cancelled', value: 7, color: '#EF4444', percentage: '2.8%' },
  { name: 'Expired', value: 8, color: '#F59E0B', percentage: '3.2%' },
];

export const INITIAL_COMPANIES = [
  {
    id: 'CMP-1001',
    name: 'Acme Technologies',
    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&h=100&fit=crop&crop=faces',
    industry: 'Enterprise Software',
    plan: 'Enterprise',
    planColor: 'purple',
    status: 'Active',
    users: 48,
    mrr: '₹49,999',
    nextBilling: 'Nov 24, 2026',
    email: 'contact@acmetech.io',
    contactPerson: 'Elena Rostova',
    phone: '+91 98765 43210',
    location: 'Bangalore, India',
    joinedDate: 'Jan 15, 2024'
  },
  {
    id: 'CMP-1002',
    name: 'Nimbus Cloud Labs',
    logo: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=100&h=100&fit=crop&crop=faces',
    industry: 'Cloud Infrastructure',
    plan: 'Growth',
    planColor: 'blue',
    status: 'Active',
    users: 24,
    mrr: '₹19,999',
    nextBilling: 'Nov 28, 2026',
    email: 'billing@nimbuslabs.com',
    contactPerson: 'Marcus Vance',
    phone: '+91 98111 22334',
    location: 'Hyderabad, India',
    joinedDate: 'Mar 10, 2024'
  },
  {
    id: 'CMP-1003',
    name: 'Starlight Media',
    logo: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=100&h=100&fit=crop&crop=faces',
    industry: 'Digital Marketing',
    plan: 'Growth',
    planColor: 'blue',
    status: 'Active',
    users: 18,
    mrr: '₹19,999',
    nextBilling: 'Dec 02, 2026',
    email: 'hello@starlightmedia.co',
    contactPerson: 'Aisha Al-Mansoor',
    phone: '+91 98450 99887',
    location: 'Mumbai, India',
    joinedDate: 'May 05, 2024'
  },
  {
    id: 'CMP-1004',
    name: 'CyberPulse Security',
    logo: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=100&h=100&fit=crop&crop=faces',
    industry: 'Cybersecurity',
    plan: 'Enterprise',
    planColor: 'purple',
    status: 'Active',
    users: 64,
    mrr: '₹59,999',
    nextBilling: 'Dec 05, 2026',
    email: 'admin@cyberpulse.net',
    contactPerson: 'David Chen',
    phone: '+91 97234 11223',
    location: 'Pune, India',
    joinedDate: 'Feb 18, 2024'
  },
  {
    id: 'CMP-1005',
    name: 'Hyperion Logistics',
    logo: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=100&h=100&fit=crop&crop=faces',
    industry: 'Supply Chain',
    plan: 'Starter',
    planColor: 'emerald',
    status: 'Active',
    users: 8,
    mrr: '₹7,999',
    nextBilling: 'Nov 19, 2026',
    email: 'ops@hyperionlog.com',
    contactPerson: 'Alexei Ivanov',
    phone: '+91 99001 55443',
    location: 'Delhi NCR, India',
    joinedDate: 'Aug 12, 2024'
  },
  {
    id: 'CMP-1006',
    name: 'Vortex FinTech',
    logo: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=100&h=100&fit=crop&crop=faces',
    industry: 'Financial Services',
    plan: 'Enterprise',
    planColor: 'purple',
    status: 'Active',
    users: 82,
    mrr: '₹79,999',
    nextBilling: 'Dec 14, 2026',
    email: 'accounts@vortexfin.io',
    contactPerson: 'Priya Sharma',
    phone: '+91 98888 77665',
    location: 'Bangalore, India',
    joinedDate: 'Jun 22, 2024'
  },
  {
    id: 'CMP-1007',
    name: 'Aurora Healthcare',
    logo: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=100&h=100&fit=crop&crop=faces',
    industry: 'HealthTech',
    plan: 'Growth',
    planColor: 'blue',
    status: 'Pending Payment',
    users: 32,
    mrr: '₹19,999',
    nextBilling: 'Nov 14, 2026',
    email: 'billing@aurorahealth.org',
    contactPerson: 'Sarah Connor',
    phone: '+91 98123 45678',
    location: 'Chennai, India',
    joinedDate: 'Sep 01, 2024'
  },
  {
    id: 'CMP-1008',
    name: 'Zenith Retail Solutions',
    logo: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=100&h=100&fit=crop&crop=faces',
    industry: 'E-commerce',
    plan: 'Starter',
    planColor: 'emerald',
    status: 'Trial',
    users: 6,
    mrr: '₹0 (Trial)',
    nextBilling: 'Nov 20, 2026',
    email: 'founders@zenithretail.in',
    contactPerson: 'Amara Okafor',
    phone: '+91 99123 99887',
    location: 'Kolkata, India',
    joinedDate: 'Nov 06, 2026'
  },
  {
    id: 'CMP-1009',
    name: 'Kite AI Labs',
    logo: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=100&h=100&fit=crop&crop=faces',
    industry: 'Artificial Intelligence',
    plan: 'Enterprise',
    planColor: 'purple',
    status: 'Active',
    users: 54,
    mrr: '₹59,999',
    nextBilling: 'Dec 18, 2026',
    email: 'support@kiteai.tech',
    contactPerson: 'Chloe Tremblay',
    phone: '+91 98760 12345',
    location: 'Bangalore, India',
    joinedDate: 'Apr 14, 2024'
  },
  {
    id: 'CMP-1010',
    name: 'Solaria Solar Energy',
    logo: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=100&h=100&fit=crop&crop=faces',
    industry: 'CleanTech',
    plan: 'Growth',
    planColor: 'blue',
    status: 'Cancelled',
    users: 14,
    mrr: '₹19,999',
    nextBilling: 'Expired',
    email: 'finance@solariapower.com',
    contactPerson: 'Michael Scott',
    phone: '+91 98451 22334',
    location: 'Ahmedabad, India',
    joinedDate: 'Feb 10, 2024'
  }
];

export const RECENT_ACTIVITIES = [
  {
    id: 'act-1',
    type: 'payment',
    title: 'Payment received',
    description: 'Vortex FinTech paid ₹79,999 for Enterprise Plan renewal via Razorpay',
    time: '8 mins ago',
    icon: 'CheckCircle2',
    iconColor: 'text-emerald-500',
    iconBg: 'bg-emerald-50',
    company: 'Vortex FinTech'
  },
  {
    id: 'act-2',
    type: 'company',
    title: 'New company registered',
    description: 'Zenith Retail Solutions signed up for 14-day Enterprise Trial',
    time: '24 mins ago',
    icon: 'Building2',
    iconColor: 'text-blue-500',
    iconBg: 'bg-blue-50',
    company: 'Zenith Retail Solutions'
  },
  {
    id: 'act-3',
    type: 'upgrade',
    title: 'Plan upgraded',
    description: 'CyberPulse Security upgraded from Growth to Enterprise (64 seats)',
    time: '2 hours ago',
    icon: 'TrendingUp',
    iconColor: 'text-indigo-500',
    iconBg: 'bg-indigo-50',
    company: 'CyberPulse Security'
  },
  {
    id: 'act-4',
    type: 'ticket',
    title: 'Support ticket resolved',
    description: 'Ticket #TKT-8849 "Custom Domain SSL renewal" marked resolved by Saurabh H.',
    time: '3 hours ago',
    icon: 'LifeBuoy',
    iconColor: 'text-amber-500',
    iconBg: 'bg-amber-50',
    company: 'Acme Technologies'
  },
  {
    id: 'act-5',
    type: 'cancelled',
    title: 'Subscription cancelled',
    description: 'Solaria Solar Energy initiated cancellation for Growth Plan',
    time: '5 hours ago',
    icon: 'AlertCircle',
    iconColor: 'text-red-500',
    iconBg: 'bg-red-50',
    company: 'Solaria Solar Energy'
  },
  {
    id: 'act-6',
    type: 'user',
    title: 'New team member added',
    description: 'Elena Rostova invited 4 new workspace collaborators to Acme Technologies',
    time: '7 hours ago',
    icon: 'UserPlus',
    iconColor: 'text-cyan-500',
    iconBg: 'bg-cyan-50',
    company: 'Acme Technologies'
  }
];

export const INVOICES_DATA = [
  {
    id: 'INV-2026-0891',
    company: 'Vortex FinTech',
    companyLogo: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=100&h=100&fit=crop&crop=faces',
    plan: 'Enterprise (Annual)',
    amount: '₹79,999',
    rawAmount: 79999,
    status: 'Paid',
    date: 'Nov 12, 2026',
    dueDate: 'Nov 12, 2026',
    method: 'Razorpay Auto-Debit',
    pdfUrl: '#'
  },
  {
    id: 'INV-2026-0890',
    company: 'Aurora Healthcare',
    companyLogo: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=100&h=100&fit=crop&crop=faces',
    plan: 'Growth (Monthly)',
    amount: '₹19,999',
    rawAmount: 19999,
    status: 'Pending',
    date: 'Nov 10, 2026',
    dueDate: 'Nov 17, 2026',
    method: 'Net Banking (Pending)',
    pdfUrl: '#'
  },
  {
    id: 'INV-2026-0889',
    company: 'CyberPulse Security',
    companyLogo: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=100&h=100&fit=crop&crop=faces',
    plan: 'Enterprise Upgrade',
    amount: '₹59,999',
    rawAmount: 59999,
    status: 'Paid',
    date: 'Nov 09, 2026',
    dueDate: 'Nov 09, 2026',
    method: 'Credit Card (Stripe)',
    pdfUrl: '#'
  },
  {
    id: 'INV-2026-0888',
    company: 'Hyperion Logistics',
    companyLogo: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=100&h=100&fit=crop&crop=faces',
    plan: 'Starter (Quarterly)',
    amount: '₹23,997',
    rawAmount: 23997,
    status: 'Overdue',
    date: 'Oct 28, 2026',
    dueDate: 'Nov 04, 2026',
    method: 'UPI AutoPay (Failed)',
    pdfUrl: '#'
  },
  {
    id: 'INV-2026-0887',
    company: 'Acme Technologies',
    companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&h=100&fit=crop&crop=faces',
    plan: 'Enterprise (Monthly)',
    amount: '₹49,999',
    rawAmount: 49999,
    status: 'Paid',
    date: 'Oct 24, 2026',
    dueDate: 'Oct 24, 2026',
    method: 'Corporate Card',
    pdfUrl: '#'
  },
  {
    id: 'INV-2026-0886',
    company: 'Nimbus Cloud Labs',
    companyLogo: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=100&h=100&fit=crop&crop=faces',
    plan: 'Growth (Monthly)',
    amount: '₹19,999',
    rawAmount: 19999,
    status: 'Paid',
    date: 'Oct 28, 2026',
    dueDate: 'Oct 28, 2026',
    method: 'Razorpay UPI',
    pdfUrl: '#'
  },
  {
    id: 'INV-2026-0885',
    company: 'Starlight Media',
    companyLogo: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=100&h=100&fit=crop&crop=faces',
    plan: 'Growth (Monthly)',
    amount: '₹19,999',
    rawAmount: 19999,
    status: 'Pending',
    date: 'Nov 02, 2026',
    dueDate: 'Nov 16, 2026',
    method: 'Bank Wire',
    pdfUrl: '#'
  }
];

export const USERS_DATA = [
  {
    id: 'USR-201',
    name: 'Bobby Singh',
    email: 'bobby.singh@pulsecrm.io',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=faces',
    role: 'Super Admin',
    company: 'Pulse CRM HQ',
    department: 'Executive Operations',
    status: 'Active',
    lastActive: 'Just now',
    phone: '+91 99887 66554'
  },
  {
    id: 'USR-202',
    name: 'Elena Rostova',
    email: 'elena@acmetech.io',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=faces',
    role: 'Company Admin',
    company: 'Acme Technologies',
    department: 'Product Strategy',
    status: 'Active',
    lastActive: '12m ago',
    phone: '+91 98765 43210'
  },
  {
    id: 'USR-203',
    name: 'Marcus Vance',
    email: 'marcus@nimbuslabs.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=faces',
    role: 'Billing Manager',
    company: 'Nimbus Cloud Labs',
    department: 'Finance',
    status: 'Active',
    lastActive: '35m ago',
    phone: '+91 98111 22334'
  },
  {
    id: 'USR-204',
    name: 'Aisha Al-Mansoor',
    email: 'aisha@starlightmedia.co',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&h=120&fit=crop&crop=faces',
    role: 'Support Agent',
    company: 'Starlight Media',
    department: 'Customer Success',
    status: 'Active',
    lastActive: '1h ago',
    phone: '+91 98450 99887'
  },
  {
    id: 'USR-205',
    name: 'David Chen',
    email: 'david.c@cyberpulse.net',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=faces',
    role: 'Developer',
    company: 'CyberPulse Security',
    department: 'SecOps',
    status: 'Active',
    lastActive: '3h ago',
    phone: '+91 97234 11223'
  },
  {
    id: 'USR-206',
    name: 'Priya Sharma',
    email: 'priya@vortexfin.io',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&h=120&fit=crop&crop=faces',
    role: 'Company Admin',
    company: 'Vortex FinTech',
    department: 'Executive',
    status: 'Active',
    lastActive: '4h ago',
    phone: '+91 98888 77665'
  },
  {
    id: 'USR-207',
    name: 'Alexei Ivanov',
    email: 'alexei@hyperionlog.com',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120&h=120&fit=crop&crop=faces',
    role: 'Member',
    company: 'Hyperion Logistics',
    department: 'Supply Chain',
    status: 'Inactive',
    lastActive: '3 days ago',
    phone: '+91 99001 55443'
  }
];

export const PLANS_DATA = [
  {
    id: 'plan-starter',
    name: 'Starter Plan',
    tier: 'Starter',
    monthlyPrice: 7999,
    yearlyPrice: 6399,
    description: 'Essential CRM tools for emerging startups and boutique teams.',
    companiesCount: 42,
    badge: 'Popular for Bootstrapped',
    features: [
      'Up to 10 Team Members',
      '5,000 Contacts & Leads',
      'Basic Pipeline Management',
      'Email & Calendar Sync',
      'Standard SSL & Security',
      '50 GB Storage Limit',
      'Standard Email Support'
    ],
    limits: { users: 10, contacts: 5000, storage: '50 GB', apiCalls: '50k/mo' },
    isPopular: false
  },
  {
    id: 'plan-growth',
    name: 'Growth Pro',
    tier: 'Growth',
    monthlyPrice: 19999,
    yearlyPrice: 15999,
    description: 'Advanced automations, multi-pipeline CRM, and deep analytics for scaling businesses.',
    companiesCount: 128,
    badge: 'Most Popular',
    features: [
      'Up to 35 Team Members',
      '25,000 Contacts & Leads',
      'Unlimited Pipelines & Deals',
      'Custom Workflow Automations',
      'Two-way WhatsApp & SMS Sync',
      '250 GB Cloud Storage',
      'Role-based Access Controls',
      'Priority 24/7 Support'
    ],
    limits: { users: 35, contacts: 25000, storage: '250 GB', apiCalls: '500k/mo' },
    isPopular: true
  },
  {
    id: 'plan-enterprise',
    name: 'Enterprise Ultra',
    tier: 'Enterprise',
    monthlyPrice: 49999,
    yearlyPrice: 39999,
    description: 'Complete data governance, dedicated IP, custom AI models, and 99.99% uptime SLA.',
    companiesCount: 68,
    badge: 'Enterprise Grade',
    features: [
      'Unlimited Team Members',
      'Unlimited Contacts & Leads',
      'Dedicated Database Instance',
      'Audit Logs & SAML SSO',
      'Custom Webhooks & REST API',
      '1 TB High-speed Storage',
      'Dedicated Account Manager',
      '1-Hour Response SLA'
    ],
    limits: { users: 999, contacts: 999999, storage: '1 TB', apiCalls: '5M/mo' },
    isPopular: false
  },
  {
    id: 'plan-custom',
    name: 'Custom Scale',
    tier: 'Custom',
    monthlyPrice: 89999,
    yearlyPrice: 74999,
    description: 'Tailored on-premise or sovereign cloud hosting for regulated institutions.',
    companiesCount: 10,
    badge: 'Custom Contract',
    features: [
      'Custom Deployment (AWS / Azure / GCP)',
      'Custom Compliance (HIPAA, SOC2 Type II)',
      'White-label Brand Portal',
      'Custom Machine Learning Workflows',
      'Unlimited Storage & Bandwidth',
      '24/7 Dedicated Phone Hotline'
    ],
    limits: { users: 'Unlimited', contacts: 'Unlimited', storage: 'Unlimited', apiCalls: 'Custom' },
    isPopular: false
  }
];

export const USAGE_METRICS = {
  storage: {
    used: 7.4,
    total: 10,
    unit: 'TB',
    percentage: 74,
    trend: '+4.2% this month'
  },
  apiRequests: {
    used: 14.8,
    total: 20,
    unit: 'M',
    percentage: 74,
    trend: '+12.5% this month'
  },
  activeSeats: {
    used: 1984,
    total: 2500,
    unit: 'seats',
    percentage: 79.3,
    trend: '+92 seats this week'
  },
  emailCredits: {
    used: 480,
    total: 600,
    unit: 'k',
    percentage: 80,
    trend: 'Renews in 18 days'
  },
  topCompaniesUsage: [
    { name: 'CyberPulse Security', plan: 'Enterprise', storage: '1.8 TB', apiCalls: '4.2M', users: 64, status: 'Normal' },
    { name: 'Vortex FinTech', plan: 'Enterprise', storage: '1.4 TB', apiCalls: '3.8M', users: 82, status: 'Warning 85%' },
    { name: 'Acme Technologies', plan: 'Enterprise', storage: '1.1 TB', apiCalls: '2.6M', users: 48, status: 'Normal' },
    { name: 'Nimbus Cloud Labs', plan: 'Growth', storage: '230 GB', apiCalls: '480k', users: 24, status: 'Normal' },
    { name: 'Starlight Media', plan: 'Growth', storage: '210 GB', apiCalls: '390k', users: 18, status: 'Normal' },
  ]
};

export const SUPPORT_TICKETS = [
  {
    id: 'TKT-8852',
    subject: 'Webhook signature verification failing in sandbox',
    company: 'Nimbus Cloud Labs',
    author: 'Marcus Vance',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=faces',
    priority: 'High',
    status: 'Open',
    category: 'API & Integrations',
    createdAt: '42 mins ago',
    replies: 2
  },
  {
    id: 'TKT-8851',
    subject: 'Request invoice copy with GSTIN update for Q3',
    company: 'Aurora Healthcare',
    author: 'Sarah Connor',
    avatar: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=100&h=100&fit=crop&crop=faces',
    priority: 'Medium',
    status: 'In Progress',
    category: 'Billing & Invoicing',
    createdAt: '2 hours ago',
    replies: 4
  },
  {
    id: 'TKT-8850',
    subject: 'SSO SAML Azure AD configuration callback mismatch',
    company: 'Vortex FinTech',
    author: 'Priya Sharma',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&h=120&fit=crop&crop=faces',
    priority: 'Critical',
    status: 'Open',
    category: 'Security & Auth',
    createdAt: '4 hours ago',
    replies: 5
  },
  {
    id: 'TKT-8849',
    subject: 'Custom Domain SSL renewal automated check',
    company: 'Acme Technologies',
    author: 'Elena Rostova',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=faces',
    priority: 'Low',
    status: 'Resolved',
    category: 'Domains',
    createdAt: '1 day ago',
    replies: 3
  },
  {
    id: 'TKT-8848',
    subject: 'Export customer contacts timeout on 100k+ rows',
    company: 'CyberPulse Security',
    author: 'David Chen',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=faces',
    priority: 'Medium',
    status: 'Resolved',
    category: 'Data Management',
    createdAt: '2 days ago',
    replies: 6
  }
];

export const ACTIVITY_LOGS = [
  {
    id: 'log-101',
    actor: 'Saurabh H. (Super Admin)',
    action: 'Modified plan pricing tier',
    target: 'Growth Pro - Yearly discount updated to 20%',
    ip: '103.21.244.18',
    category: 'Admin',
    time: 'Nov 12, 2026 12:45 PM',
    status: 'Success'
  },
  {
    id: 'log-102',
    actor: 'Payment Gateway (System)',
    action: 'Webhook: Payment captured ₹79,999',
    target: 'INV-2026-0891 (Vortex FinTech)',
    ip: '52.66.192.4',
    category: 'System',
    time: 'Nov 12, 2026 11:20 AM',
    status: 'Success'
  },
  {
    id: 'log-103',
    actor: 'Marcus Vance (Nimbus Cloud Labs)',
    action: 'Rotated API Secret Key',
    target: 'Production API Key ************a9b2',
    ip: '14.139.128.5',
    category: 'Company',
    time: 'Nov 12, 2026 10:14 AM',
    status: 'Success'
  },
  {
    id: 'log-104',
    actor: 'Elena Rostova (Acme Technologies)',
    action: 'User Invite Sent',
    target: 'alex.kumar@acmetech.io (Role: Sales Rep)',
    ip: '49.207.211.90',
    category: 'User',
    time: 'Nov 12, 2026 09:30 AM',
    status: 'Success'
  },
  {
    id: 'log-105',
    actor: 'System Cron',
    action: 'Automated Invoice Generation',
    target: 'Generated 14 recurring renewal invoices',
    ip: '127.0.0.1',
    category: 'System',
    time: 'Nov 12, 2026 00:00 AM',
    status: 'Success'
  },
  {
    id: 'log-106',
    actor: 'Hyperion Logistics (AutoPay)',
    action: 'Mandate debit failed',
    target: 'INV-2026-0888 (Reason: Insufficient funds)',
    ip: '13.235.11.8',
    category: 'System',
    time: 'Nov 11, 2026 04:12 PM',
    status: 'Failed'
  }
];

export const NOTIFICATIONS_DATA = [
  {
    id: 'notif-1',
    title: 'New payment received: ₹79,999',
    description: 'Vortex FinTech renewed Enterprise Annual plan.',
    time: '8m ago',
    unread: true,
    type: 'payment'
  },
  {
    id: 'notif-2',
    title: 'New company registration',
    description: 'Zenith Retail Solutions joined 14-day trial.',
    time: '24m ago',
    unread: true,
    type: 'company'
  },
  {
    id: 'notif-3',
    title: 'Payment overdue warning',
    description: 'Hyperion Logistics invoice INV-2026-0888 is overdue.',
    time: '1h ago',
    unread: true,
    type: 'warning'
  },
  {
    id: 'notif-4',
    title: 'System backup completed',
    description: 'Automated DB snapshot completed in 4.2 seconds.',
    time: '6h ago',
    unread: false,
    type: 'system'
  }
];

