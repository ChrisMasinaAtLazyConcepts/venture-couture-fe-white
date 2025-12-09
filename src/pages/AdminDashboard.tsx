import { useState, useEffect } from 'react';
import { Package, ShoppingCart, Users, TrendingUp, DollarSign, AlertCircle, BarChart3, Clock } from 'lucide-react';
import { supabase } from '../lib/supabase';
import Header from '../components/Header';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalOrders: 156,
    totalRevenue: 125480,
    totalCustomers: 482,
    pendingOrders: 23,
    lowStockItems: 12,
    monthlyGrowth: 18.5
  });

  const [recentOrders, setRecentOrders] = useState([
    { id: '1', orderNumber: 'VC-2025-001', customer: 'Sarah Ndlovu', amount: 1299, status: 'processing', date: '2025-10-06' },
    { id: '2', orderNumber: 'VC-2025-002', customer: 'Thabo Mokoena', amount: 2599, status: 'shipped', date: '2025-10-06' },
    { id: '3', orderNumber: 'VC-2025-003', customer: 'Amara Okafor', amount: 899, status: 'delivered', date: '2025-10-05' },
    { id: '4', orderNumber: 'VC-2025-004', customer: 'Zanele Dlamini', amount: 1799, status: 'pending', date: '2025-10-05' },
  ]);

  const [topProducts, setTopProducts] = useState([
    { id: '1', name: 'Ankara Print Maxi Dress', sales: 45, revenue: 44955 },
    { id: '2', name: 'Dashiki Shirt', sales: 38, revenue: 20862 },
    { id: '3', name: 'Kente Wrap Skirt', sales: 32, revenue: 25568 },
    { id: '4', name: 'African Print Jumpsuit', sales: 28, revenue: 41972 },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-700';
      case 'shipped': return 'bg-blue-100 text-blue-700';
      case 'processing': return 'bg-yellow-100 text-yellow-700';
      case 'pending': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="bg-[#B84037]  text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-white/90 mt-1">Welcome back, Admin</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                <ShoppingCart className="text-white" size={24} />
              </div>
              <span className="text-green-600 text-sm font-bold">+12%</span>
            </div>
            <h3 className="text-gray-600 text-sm mb-1">Total Orders</h3>
            <p className="text-3xl font-bold text-gray-900">{stats.totalOrders}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                <DollarSign className="text-white" size={24} />
              </div>
              <span className="text-green-600 text-sm font-bold">+{stats.monthlyGrowth}%</span>
            </div>
            <h3 className="text-gray-600 text-sm mb-1">Total Revenue</h3>
            <p className="text-3xl font-bold text-gray-900">R{stats.totalRevenue.toLocaleString()}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center">
                <Users className="text-white" size={24} />
              </div>
              <span className="text-green-600 text-sm font-bold">+8%</span>
            </div>
            <h3 className="text-gray-600 text-sm mb-1">Total Customers</h3>
            <p className="text-3xl font-bold text-gray-900">{stats.totalCustomers}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-600 to-red-600 rounded-lg flex items-center justify-center">
                <Clock className="text-white" size={24} />
              </div>
              <span className="text-orange-600 text-sm font-bold">Action needed</span>
            </div>
            <h3 className="text-gray-600 text-sm mb-1">Pending Orders</h3>
            <p className="text-3xl font-bold text-gray-900">{stats.pendingOrders}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
              <a href="/admin/orders" className="text-orange-600 hover:text-orange-700 font-bold text-sm">
                View All
              </a>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-2 text-sm font-bold text-gray-700">Order #</th>
                    <th className="text-left py-3 px-2 text-sm font-bold text-gray-700">Customer</th>
                    <th className="text-left py-3 px-2 text-sm font-bold text-gray-700">Amount</th>
                    <th className="text-left py-3 px-2 text-sm font-bold text-gray-700">Status</th>
                    <th className="text-left py-3 px-2 text-sm font-bold text-gray-700">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                      <td className="py-3 px-2 text-sm font-medium text-gray-900">{order.orderNumber}</td>
                      <td className="py-3 px-2 text-sm text-gray-600">{order.customer}</td>
                      <td className="py-3 px-2 text-sm font-bold text-gray-900">R{order.amount}</td>
                      <td className="py-3 px-2">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 px-2 text-sm text-gray-600">{order.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Alerts & Notifications</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg">
                <AlertCircle className="text-red-600 flex-shrink-0 mt-1" size={20} />
                <div>
                  <h4 className="font-bold text-red-900 text-sm mb-1">Low Stock Alert</h4>
                  <p className="text-red-700 text-sm">{stats.lowStockItems} items need restocking</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-lg">
                <Package className="text-orange-600 flex-shrink-0 mt-1" size={20} />
                <div>
                  <h4 className="font-bold text-orange-900 text-sm mb-1">Pending Orders</h4>
                  <p className="text-orange-700 text-sm">{stats.pendingOrders} orders awaiting processing</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
                <TrendingUp className="text-green-600 flex-shrink-0 mt-1" size={20} />
                <div>
                  <h4 className="font-bold text-green-900 text-sm mb-1">Sales Growth</h4>
                  <p className="text-green-700 text-sm">+{stats.monthlyGrowth}% increase this month</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center gap-3 mb-6">
            <BarChart3 className="text-orange-600" size={24} />
            <h2 className="text-xl font-bold text-gray-900">Top Selling Products</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {topProducts.map((product, index) => (
              <div key={product.id} className="p-4 bg-gradient-to-br from-gray-50 to-white rounded-lg border border-gray-200 hover:shadow-md transition">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl font-bold text-orange-600">#{index + 1}</span>
                  <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                    {product.sales} sales
                  </span>
                </div>
                <h4 className="font-bold text-gray-900 mb-2 line-clamp-2">{product.name}</h4>
                <p className="text-sm text-gray-600">Revenue: <span className="font-bold text-gray-900">R{product.revenue.toLocaleString()}</span></p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <a href="/admin/products" className="bg-gradient-to-br from-orange-600 to-orange-700 text-white p-6 rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1">
            <Package size={32} className="mb-3" />
            <h3 className="text-xl font-bold mb-2">Manage Products</h3>
            <p className="text-white/90 text-sm">Add, edit, or remove products from your catalog</p>
          </a>

          <a href="/admin/inventory" className="bg-gradient-to-br from-red-600 to-red-700 text-white p-6 rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1">
            <TrendingUp size={32} className="mb-3" />
            <h3 className="text-xl font-bold mb-2">Inventory Management</h3>
            <p className="text-white/90 text-sm">Track stock levels across warehouses</p>
          </a>

          <a href="/admin/analytics" className="bg-gradient-to-br from-amber-600 to-amber-700 text-white p-6 rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1">
            <BarChart3 size={32} className="mb-3" />
            <h3 className="text-xl font-bold mb-2">Analytics & Reports</h3>
            <p className="text-white/90 text-sm">View detailed sales and performance metrics</p>
          </a>
        </div>
      </div>
    </div>
  );
}
