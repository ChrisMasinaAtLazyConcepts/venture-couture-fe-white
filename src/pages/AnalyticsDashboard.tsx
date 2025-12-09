import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Package } from 'lucide-react';
import Header from '../components/Header';

export default function AnalyticsDashboard() {
  const salesData = [
    { month: 'Jan', revenue: 45000, orders: 120 },
    { month: 'Feb', revenue: 52000, orders: 145 },
    { month: 'Mar', revenue: 48000, orders: 132 },
    { month: 'Apr', revenue: 61000, orders: 168 },
    { month: 'May', revenue: 73000, orders: 192 },
    { month: 'Jun', revenue: 68000, orders: 178 },
    { month: 'Jul', revenue: 82000, orders: 215 },
    { month: 'Aug', revenue: 91000, orders: 238 },
    { month: 'Sep', revenue: 87000, orders: 225 },
    { month: 'Oct', revenue: 125480, orders: 156 }
  ];

  const topRegions = [
    { name: 'Gauteng', sales: 48250, percentage: 38 },
    { name: 'Western Cape', sales: 35680, percentage: 28 },
    { name: 'KwaZulu-Natal', sales: 25340, percentage: 20 },
    { name: 'Other', sales: 16210, percentage: 14 }
  ];

  const customerInsights = {
    totalCustomers: 482,
    newThisMonth: 67,
    returningCustomers: 215,
    averageOrderValue: 804,
    customerRetentionRate: 68
  };

  const maxRevenue = Math.max(...salesData.map(d => d.revenue));

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="bg-[#B84037]  text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">Analytics & Reports</h1>
          <p className="text-white/90 mt-1">Comprehensive business insights and performance metrics</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                <DollarSign className="text-white" size={24} />
              </div>
              <div className="flex items-center gap-1 text-green-600 text-sm font-bold">
                <TrendingUp size={16} />
                <span>+18.5%</span>
              </div>
            </div>
            <h3 className="text-gray-600 text-sm mb-1">Monthly Revenue</h3>
            <p className="text-3xl font-bold text-gray-900">R125,480</p>
            <p className="text-xs text-gray-500 mt-2">vs R106,200 last month</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <ShoppingCart className="text-white" size={24} />
              </div>
              <div className="flex items-center gap-1 text-green-600 text-sm font-bold">
                <TrendingUp size={16} />
                <span>+12%</span>
              </div>
            </div>
            <h3 className="text-gray-600 text-sm mb-1">Total Orders</h3>
            <p className="text-3xl font-bold text-gray-900">156</p>
            <p className="text-xs text-gray-500 mt-2">vs 139 last month</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Users className="text-white" size={24} />
              </div>
              <div className="flex items-center gap-1 text-green-600 text-sm font-bold">
                <TrendingUp size={16} />
                <span>+8%</span>
              </div>
            </div>
            <h3 className="text-gray-600 text-sm mb-1">New Customers</h3>
            <p className="text-3xl font-bold text-gray-900">{customerInsights.newThisMonth}</p>
            <p className="text-xs text-gray-500 mt-2">vs 62 last month</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                <Package className="text-white" size={24} />
              </div>
              <div className="flex items-center gap-1 text-red-600 text-sm font-bold">
                <TrendingDown size={16} />
                <span>-3%</span>
              </div>
            </div>
            <h3 className="text-gray-600 text-sm mb-1">Avg Order Value</h3>
            <p className="text-3xl font-bold text-gray-900">R{customerInsights.averageOrderValue}</p>
            <p className="text-xs text-gray-500 mt-2">vs R829 last month</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Revenue Trend</h2>
              <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-bold focus:outline-none focus:ring-2 focus:ring-orange-600">
                <option>Last 10 Months</option>
                <option>Last 6 Months</option>
                <option>Last Year</option>
              </select>
            </div>

            <div className="space-y-4">
              {salesData.map((data, index) => {
                const barWidth = (data.revenue / maxRevenue) * 100;
                return (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-bold text-gray-700 w-12">{data.month}</span>
                      <div className="flex-1 mx-4">
                        <div className="h-8 bg-gray-100 rounded-lg overflow-hidden">
                          <div
                            className="h-full bg-[#B84037]  rounded-lg transition-all duration-500 flex items-center justify-end pr-3"
                            style={{ width: `${barWidth}%` }}
                          >
                            {barWidth > 30 && (
                              <span className="text-white text-xs font-bold">R{data.revenue.toLocaleString()}</span>
                            )}
                          </div>
                        </div>
                      </div>
                      <span className="text-sm text-gray-600 w-20 text-right">{data.orders} orders</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Sales by Region</h2>
            <div className="space-y-6">
              {topRegions.map((region, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-gray-900">{region.name}</span>
                    <span className="text-sm font-bold text-orange-600">{region.percentage}%</span>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-orange-600 to-red-600 rounded-full transition-all duration-500"
                      style={{ width: `${region.percentage}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">R{region.sales.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold mb-4">Customer Retention</h3>
            <div className="flex items-end gap-4">
              <div className="text-5xl font-bold">{customerInsights.customerRetentionRate}%</div>
              <div className="flex items-center gap-1 text-blue-200 mb-2">
                <TrendingUp size={16} />
                <span className="text-sm font-bold">+5%</span>
              </div>
            </div>
            <p className="text-blue-100 text-sm mt-3">
              {customerInsights.returningCustomers} returning customers this month
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-600 to-green-700 text-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold mb-4">Conversion Rate</h3>
            <div className="flex items-end gap-4">
              <div className="text-5xl font-bold">3.2%</div>
              <div className="flex items-center gap-1 text-green-200 mb-2">
                <TrendingUp size={16} />
                <span className="text-sm font-bold">+0.4%</span>
              </div>
            </div>
            <p className="text-green-100 text-sm mt-3">
              156 orders from 4,875 visitors
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-600 to-purple-700 text-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold mb-4">Cart Abandonment</h3>
            <div className="flex items-end gap-4">
              <div className="text-5xl font-bold">24%</div>
              <div className="flex items-center gap-1 text-purple-200 mb-2">
                <TrendingDown size={16} />
                <span className="text-sm font-bold">-6%</span>
              </div>
            </div>
            <p className="text-purple-100 text-sm mt-3">
              Improved from 30% last month
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
