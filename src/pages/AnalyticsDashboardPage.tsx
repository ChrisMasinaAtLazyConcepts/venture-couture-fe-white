import React, { useState } from 'react';
import { 
  BarChart3, TrendingUp, Users, ShoppingBag, DollarSign, 
  Package, Clock, Activity, Download, Calendar,
  ArrowUpRight, ArrowDownRight, Eye, Share2, Filter
} from 'lucide-react';
import AdminLayout from '../components/AdminLayout';

const AnalyticsDashboardPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState('month');

  const stats = [
    { label: 'Total Revenue', value: 'R245,892', change: '+12.5%', icon: <DollarSign size={24} />, color: 'bg-green-500' },
    { label: 'Total Orders', value: '1,245', change: '+8.2%', icon: <ShoppingBag size={24} />, color: 'bg-blue-500' },
    { label: 'Active Customers', value: '8,492', change: '+5.7%', icon: <Users size={24} />, color: 'bg-purple-500' },
    { label: 'Avg. Order Value', value: 'R197.45', change: '+3.1%', icon: <Package size={24} />, color: 'bg-yellow-500' },
  ];

  const topProducts = [
    { name: 'Nike Air Max 270', sales: 245, revenue: 'R48,900', growth: '+18%' },
    { name: 'Adidas Ultraboost', sales: 189, revenue: 'R56,700', growth: '+22%' },
    { name: 'Puma RS-X', sales: 156, revenue: 'R31,200', growth: '+15%' },
    { name: 'New Balance 574', sales: 134, revenue: 'R26,800', growth: '+12%' },
    { name: 'Converse Chuck 70', sales: 98, revenue: 'R19,600', growth: '+8%' },
  ];

  const trafficSources = [
    { source: 'Direct', visitors: '4,892', percentage: 35, color: 'bg-blue-500' },
    { source: 'Social Media', visitors: '3,456', percentage: 25, color: 'bg-purple-500' },
    { source: 'Google Ads', visitors: '2,789', percentage: 20, color: 'bg-green-500' },
    { source: 'Email Marketing', visitors: '1,234', percentage: 9, color: 'bg-yellow-500' },
    { source: 'Referrals', visitors: '987', percentage: 7, color: 'bg-red-500' },
  ];

  return (
    <AdminLayout 
      title="Analytics Dashboard" 
      subtitle="Track performance, sales, and customer insights"
    >
      {/* Time Range Selector */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <Calendar size={20} className="text-gray-400" />
          <select 
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="bg-gray-100 border border-gray-300 rounded-lg px-4 py-2"
          >
            <option value="week">Last 7 days</option>
            <option value="month">Last 30 days</option>
            <option value="quarter">Last quarter</option>
            <option value="year">Last year</option>
          </select>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
            <Filter size={16} />
            <span>Filter</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
            <Download size={16} />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 ${stat.color} rounded-lg`}>
                {stat.icon}
              </div>
              <span className={`flex items-center gap-1 text-sm font-medium ${
                stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change.startsWith('+') ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                {stat.change}
              </span>
            </div>
            <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Charts & Graphs Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Revenue Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Revenue Overview</h3>
              <p className="text-gray-600 text-sm">Monthly revenue breakdown</p>
            </div>
            <button className="p-2 text-gray-400 hover:text-gray-600">
              <Share2 size={18} />
            </button>
          </div>
          <div className="h-64 flex items-end gap-2">
            {[65, 80, 75, 90, 85, 95, 100, 85, 75, 80, 90, 95].map((height, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div 
                  className="w-full bg-gradient-to-t from-red-500 to-red-400 rounded-t-lg"
                  style={{ height: `${height}%` }}
                ></div>
                <span className="text-gray-500 text-xs mt-2">{['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][index]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Traffic Sources</h3>
          <div className="space-y-4">
            {trafficSources.map((source, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">{source.source}</span>
                  <span className="text-gray-900 font-medium">{source.visitors} ({source.percentage}%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${source.color}`}
                    style={{ width: `${source.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Products */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Top Selling Products</h3>
            <p className="text-gray-600 text-sm">Best performing products this month</p>
          </div>
          <button className="flex items-center gap-2 text-red-600 hover:text-red-700">
            <Eye size={16} />
            <span>View All</span>
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-3 text-left text-gray-600 font-medium">Product</th>
                <th className="py-3 text-left text-gray-600 font-medium">Units Sold</th>
                <th className="py-3 text-left text-gray-600 font-medium">Revenue</th>
                <th className="py-3 text-left text-gray-600 font-medium">Growth</th>
                <th className="py-3 text-left text-gray-600 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {topProducts.map((product, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
                      <span className="font-medium">{product.name}</span>
                    </div>
                  </td>
                  <td className="py-4">{product.sales}</td>
                  <td className="py-4 font-bold text-gray-900">{product.revenue}</td>
                  <td className="py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      product.growth.startsWith('+') 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {product.growth}
                    </span>
                  </td>
                  <td className="py-4">
                    <button className="px-3 py-1 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Insights Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl p-6 text-white">
          <TrendingUp size={32} className="mb-4" />
          <h4 className="text-lg font-bold mb-2">Peak Hours</h4>
          <p className="text-blue-100 mb-4">Most orders placed between 2PM - 6PM</p>
          <div className="flex items-center gap-2">
            <Clock size={16} />
            <span>Increase ad spend during these hours</span>
          </div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl p-6 text-white">
          <Users size={32} className="mb-4" />
          <h4 className="text-lg font-bold mb-2">Customer Retention</h4>
          <p className="text-purple-100 mb-4">45% of customers return within 30 days</p>
          <div className="flex items-center gap-2">
            <Activity size={16} />
            <span>Send follow-up emails at day 25</span>
          </div>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-emerald-400 rounded-xl p-6 text-white">
          <ShoppingBag size={32} className="mb-4" />
          <h4 className="text-lg font-bold mb-2">Cart Abandonment</h4>
          <p className="text-green-100 mb-4">22% lower than industry average</p>
          <div className="flex items-center gap-2">
            <BarChart3 size={16} />
            <span>Excellent checkout experience</span>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AnalyticsDashboardPage;