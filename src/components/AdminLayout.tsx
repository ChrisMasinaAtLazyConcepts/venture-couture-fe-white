import React, { useState } from 'react';
import AdminHeader from './AdminHeader';
import { 
  BarChart3, Package, MessageSquare, Megaphone, Tag, 
  Users, Truck, FileText, Mail, Settings, Home,
  ShoppingBag, CreditCard, Shield, HelpCircle, Bell,
  TrendingUp, Layers, Filter, Database, Download
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title, subtitle }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const navigationItems = [
    { icon: <Home size={20} />, label: 'Dashboard', href: '/admin/dashboard', badge: null },
    { icon: <Package size={20} />, label: 'Inventory', href: '/admin/inventory', badge: '12' },
    { icon: <ShoppingBag size={20} />, label: 'Orders', href: '/admin/orders', badge: '45' },
    { icon: <Users size={20} />, label: 'Customers', href: '/admin/customers', badge: '1.2k' },
    { icon: <Truck size={20} />, label: 'Supply Chain', href: '/admin/supply-chain', badge: '8' },
    { icon: <Megaphone size={20} />, label: 'Advertising', href: '/admin/advertising', badge: null },
    { icon: <Tag size={20} />, label: 'Promotions', href: '/admin/promotions', badge: '3' },
    { icon: <Mail size={20} />, label: 'Communications', href: '/admin/communications', badge: '24' },
    { icon: <MessageSquare size={20} />, label: 'Support Centre', href: '/admin/support', badge: '18' },
    { icon: <BarChart3 size={20} />, label: 'Analytics', href: '/admin/analytics', badge: null },
    { icon: <FileText size={20} />, label: 'Reports', href: '/admin/reports', badge: null },
    { icon: <Settings size={20} />, label: 'Settings', href: '/admin/settings', badge: null },
  ];

  const quickStats = [
    { label: 'Today\'s Revenue', value: 'R45,892', change: '+12%', icon: <TrendingUp size={16} />, color: 'text-green-500' },
    { label: 'Pending Orders', value: '24', change: '-3', icon: <ShoppingBag size={16} />, color: 'text-yellow-500' },
    { label: 'Low Stock', value: '8 items', change: 'Alert', icon: <Layers size={16} />, color: 'text-red-500' },
    { label: 'Support Tickets', value: '18', change: '+4', icon: <HelpCircle size={16} />, color: 'text-blue-500' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      <div className="flex">
        {/* Sidebar */}
        {isSidebarOpen && (
          <div className="w-64 bg-gray-900 border-r border-gray-800 min-h-[calc(100vh-64px)]">
            <div className="p-4">
              {/* Quick Stats */}
              <div className="mb-6">
                <h3 className="text-gray-400 text-xs font-semibold uppercase mb-3">Quick Stats</h3>
                <div className="space-y-2">
                  {quickStats.map((stat, index) => (
                    <div key={index} className="bg-gray-800/50 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-gray-400 text-xs">{stat.label}</span>
                        <span className={`${stat.color} flex items-center gap-1`}>
                          {stat.icon}
                        </span>
                      </div>
                      <div className="flex items-end justify-between">
                        <span className="text-white font-bold text-lg">{stat.value}</span>
                        <span className="text-gray-500 text-xs">{stat.change}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation */}
              <nav className="space-y-1">
                {navigationItems.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className="flex items-center justify-between px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-gray-400 group-hover:text-red-400">{item.icon}</span>
                      <span className="font-medium">{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="bg-red-600 text-white text-xs rounded-full px-2 py-1">
                        {item.badge}
                      </span>
                    )}
                  </a>
                ))}
              </nav>

              {/* System Status */}
              <div className="mt-8 p-4 bg-gray-800/30 rounded-lg border border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">System Status</span>
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span>All systems operational</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1">
          {/* Page Header */}
          {(title || subtitle) && (
            <div className="bg-white border-b border-gray-200 px-8 py-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
                  {subtitle && <p className="text-gray-600 mt-1">{subtitle}</p>}
                </div>
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
                    <Filter size={16} />
                    <span>Filter</span>
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
                    <Download size={16} />
                    <span>Export</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Page Content */}
          <div className="p-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;