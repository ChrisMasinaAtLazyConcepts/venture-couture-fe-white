import React, { useState } from 'react';
import { Bell, Search, User, Settings, LogOut, Menu, ChevronDown, BarChart3, Package, Mail, Megaphone, Tag, Users, Truck, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AdminHeaderProps {
  onMenuToggle?: () => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ onMenuToggle }) => {
  const navigate = useNavigate();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [notifications] = useState(5);

  const adminMenuItems = [
    { label: 'My Profile', href: '/admin/profile' },
    { label: 'System Settings', href: '/admin/settings', icon: <Settings size={16} /> },
    { label: 'Activity Log', href: '/admin/activity' },
    { label: 'Logout', href: '/', icon: <LogOut size={16} />, isDanger: true },
  ];

  const quickActions = [
    { label: 'New Order', color: 'bg-red-600 hover:bg-red-700' },
    { label: 'Add Product', color: 'bg-blue-600 hover:bg-blue-700' },
    { label: 'Send Broadcast', color: 'bg-green-600 hover:bg-green-700' },
  ];

  return (
    <header className="bg-white border-b border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Left Section */}
          <div className="flex items-center gap-6">
            {/* Menu Toggle */}
            <button
              onClick={onMenuToggle}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition"
            >
              <Menu size={24} />
            </button>

            {/* Logo */}
            <div className="flex items-center gap-3">
            
              <div>
                         {/* Logo */}
          <a href="/" className="flex items-center flex-shrink-0">
			  <div className="flex flex-col items-center">
			  <img 
				src="/assets/images/vc.logo.png" 
				className="object-contain w-40 h-20" 
				alt="Venture Couture" 
			  />
       <p className="text-black" >Back Office</p>
			</div>
	      </a>
              </div>
            </div>

           
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search products, orders, customers..."
                className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>

            {/* Notifications */}
            <button className="relative p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition">
              <Bell size={20} />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </button>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-3 p-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">AD</span>
                </div>
                <div className="text-left hidden md:block">
                  <p className="text-sm font-medium">Admin User</p>
                  <p className="text-xs text-gray-400">Super Admin</p>
                </div>
                <ChevronDown size={16} className="text-gray-400" />
              </button>

              {/* Dropdown Menu */}
              {isUserMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50 py-2">
                  <div className="px-4 py-3 border-b border-gray-700">
                    <p className="text-white font-medium">admin@venturecouture.com</p>
                    <p className="text-gray-400 text-sm">Last login: Today, 14:30</p>
                  </div>
                  <div className="py-2">
                    {adminMenuItems.map((item, index) => (
                      <a
                        key={index}
                        href={item.href}
                        onClick={() => setIsUserMenuOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 text-sm transition ${
                          item.isDanger
                            ? 'text-red-400 hover:bg-red-900/30 hover:text-red-300'
                            : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                        }`}
                      >
                        {item.icon && <span>{item.icon}</span>}
                        <span>{item.label}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Store Switch */}
            <button
              onClick={() => navigate('/')}
              className="hidden lg:flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition"
            >
              <span className="text-sm">Back to Store</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;