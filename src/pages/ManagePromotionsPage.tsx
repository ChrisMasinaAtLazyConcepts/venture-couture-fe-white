import React, { useState } from 'react';
import { 
  Tag, Percent, Calendar, Users, DollarSign,
  Plus, Filter, Download, Edit, Trash2,
  Eye, Clock, CheckCircle, XCircle, TrendingUp,
  Copy, Share2, Bell, BarChart3
} from 'lucide-react';
import AdminLayout from '../components/AdminLayout';

interface Promotion {
  id: string;
  name: string;
  type: 'percentage' | 'fixed' | 'bogo' | 'shipping';
  value: number;
  code: string;
  status: 'active' | 'scheduled' | 'expired' | 'draft';
  usageLimit: number;
  usedCount: number;
  minPurchase: number;
  startDate: string;
  endDate: string;
  totalDiscount: number;
  totalOrders: number;
}

const ManagePromotionsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const [promotions, setPromotions] = useState<Promotion[]>([
    { id: 'PROMO-001', name: 'Summer Sale', type: 'percentage', value: 20, code: 'SUMMER20', status: 'active', usageLimit: 1000, usedCount: 645, minPurchase: 0, startDate: '2024-01-01', endDate: '2024-01-31', totalDiscount: 128900, totalOrders: 245 },
    { id: 'PROMO-002', name: 'Free Shipping', type: 'shipping', value: 0, code: 'FREESHIP', status: 'active', usageLimit: 500, usedCount: 189, minPurchase: 500, startDate: '2024-01-15', endDate: '2024-02-15', totalDiscount: 9450, totalOrders: 189 },
    { id: 'PROMO-003', name: 'New Customer', type: 'fixed', value: 100, code: 'WELCOME100', status: 'scheduled', usageLimit: 200, usedCount: 0, minPurchase: 300, startDate: '2024-02-01', endDate: '2024-02-28', totalDiscount: 0, totalOrders: 0 },
    { id: 'PROMO-004', name: 'Buy One Get One', type: 'bogo', value: 50, code: 'BOGO50', status: 'expired', usageLimit: 300, usedCount: 142, minPurchase: 0, startDate: '2023-12-01', endDate: '2023-12-31', totalDiscount: 28400, totalOrders: 71 },
    { id: 'PROMO-005', name: 'Clearance Sale', type: 'percentage', value: 30, code: 'CLEAR30', status: 'draft', usageLimit: 0, usedCount: 0, minPurchase: 0, startDate: '2024-02-01', endDate: '2024-02-15', totalDiscount: 0, totalOrders: 0 },
    { id: 'PROMO-006', name: 'Flash Sale', type: 'percentage', value: 15, code: 'FLASH15', status: 'active', usageLimit: 100, usedCount: 89, minPurchase: 100, startDate: '2024-01-20', endDate: '2024-01-21', totalDiscount: 6675, totalOrders: 89 },
  ]);

  const promotionStats = {
    activePromotions: 3,
    totalDiscount: 144775,
    totalRedemptions: 1065,
    avgDiscountRate: 18.3
  };

  const handleDuplicate = (promotion: Promotion) => {
    const newPromotion = {
      ...promotion,
      id: `PROMO-${Date.now().toString().slice(-6)}`,
      name: `${promotion.name} (Copy)`,
      status: 'draft',
      usedCount: 0,
      totalDiscount: 0,
      totalOrders: 0
    };
    setPromotions([...promotions, newPromotion]);
  };

  const handleToggleStatus = (promotionId: string, newStatus: Promotion['status']) => {
    setPromotions(promotions.map(p => 
      p.id === promotionId ? { ...p, status: newStatus } : p
    ));
  };

  const getTypeIcon = (type: Promotion['type']) => {
    switch (type) {
      case 'percentage': return <Percent size={16} />;
      case 'fixed': return <DollarSign size={16} />;
      case 'bogo': return <Tag size={16} />;
      case 'shipping': return <Truck size={16} />;
      default: return <Tag size={16} />;
    }
  };

  return (
    <AdminLayout 
      title="Manage Promotions" 
      subtitle="Create and manage discount codes and special offers"
    >
      {/* Promotion Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Active Promotions</p>
              <p className="text-2xl font-bold text-gray-900">{promotionStats.activePromotions}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <Tag size={24} className="text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-green-600">
            <CheckCircle size={16} />
            <span className="text-sm">Currently running</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Discount Given</p>
              <p className="text-2xl font-bold text-gray-900">R{promotionStats.totalDiscount.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <DollarSign size={24} className="text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-blue-600">
            <TrendingUp size={16} />
            <span className="text-sm">+15% from last month</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Redemptions</p>
              <p className="text-2xl font-bold text-gray-900">{promotionStats.totalRedemptions}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Users size={24} className="text-purple-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-purple-600">
            <BarChart3 size={16} />
            <span className="text-sm">2.1% redemption rate</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Avg. Discount Rate</p>
              <p className="text-2xl font-bold text-gray-900">{promotionStats.avgDiscountRate}%</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Percent size={24} className="text-yellow-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-yellow-600">
            <Bell size={16} />
            <span className="text-sm">Optimal discount level</span>
          </div>
        </div>
      </div>

      {/* Create New Promotion */}
      <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-xl shadow-lg p-6 border border-red-200 mb-8">
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Create New Promotion</h3>
            <p className="text-gray-600">Boost sales with targeted discounts and special offers</p>
          </div>
          <div className="flex flex-col md:flex-row gap-3">
            <button className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium">
              <Plus size={20} />
              <span>Create Promotion</span>
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium">
              <Copy size={20} />
              <span>Use Template</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 mb-6">
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <div className="flex flex-col md:flex-row gap-4 flex-1">
            <div className="relative flex-1">
              <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search promotions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>

            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg"
            >
              <option value="all">All Types</option>
              <option value="percentage">Percentage</option>
              <option value="fixed">Fixed Amount</option>
              <option value="bogo">Buy One Get One</option>
              <option value="shipping">Free Shipping</option>
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="scheduled">Scheduled</option>
              <option value="expired">Expired</option>
              <option value="draft">Draft</option>
            </select>
          </div>

          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
              <Filter size={16} />
              <span>Advanced Filter</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
              <Download size={16} />
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Promotions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {promotions.map((promotion) => (
          <div key={promotion.id} className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="p-6">
              {/* Promotion Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    promotion.type === 'percentage' ? 'bg-blue-100' :
                    promotion.type === 'fixed' ? 'bg-green-100' :
                    promotion.type === 'bogo' ? 'bg-purple-100' : 'bg-gray-100'
                  }`}>
                    <span className={`${
                      promotion.type === 'percentage' ? 'text-blue-600' :
                      promotion.type === 'fixed' ? 'text-green-600' :
                      promotion.type === 'bogo' ? 'text-purple-600' : 'text-gray-600'
                    }`}>
                      {getTypeIcon(promotion.type)}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{promotion.name}</h3>
                    <p className="text-gray-500 text-sm">Code: {promotion.code}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  promotion.status === 'active' ? 'bg-green-100 text-green-800' :
                  promotion.status === 'scheduled' ? 'bg-yellow-100 text-yellow-800' :
                  promotion.status === 'expired' ? 'bg-gray-100 text-gray-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {promotion.status.charAt(0).toUpperCase() + promotion.status.slice(1)}
                </span>
              </div>

              {/* Promotion Details */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Discount Value</span>
                  <span className="font-bold text-gray-900">
                    {promotion.type === 'percentage' ? `${promotion.value}%` : 
                     promotion.type === 'fixed' ? `R${promotion.value}` :
                     promotion.type === 'bogo' ? 'Buy 1 Get 1' : 'Free Shipping'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Min. Purchase</span>
                  <span className="font-medium text-gray-900">
                    {promotion.minPurchase > 0 ? `R${promotion.minPurchase}` : 'None'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Usage</span>
                  <span className="font-medium text-gray-900">
                    {promotion.usedCount}/{promotion.usageLimit || '∞'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Total Discount</span>
                  <span className="font-bold text-green-600">R{promotion.totalDiscount.toLocaleString()}</span>
                </div>
              </div>

              {/* Progress Bar */}
              {promotion.usageLimit > 0 && (
                <div className="mb-6">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-600">Usage Progress</span>
                    <span className="font-medium">{Math.round((promotion.usedCount / promotion.usageLimit) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        (promotion.usedCount / promotion.usageLimit) > 0.8 ? 'bg-red-500' :
                        (promotion.usedCount / promotion.usageLimit) > 0.5 ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${(promotion.usedCount / promotion.usageLimit) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {/* Dates */}
              <div className="mb-6">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>{promotion.startDate}</span>
                  </div>
                  <span>to</span>
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>{promotion.endDate}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleToggleStatus(promotion.id, promotion.status === 'active' ? 'expired' : 'active')}
                  className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg ${
                    promotion.status === 'active'
                      ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      : 'bg-green-100 text-green-700 hover:bg-green-200'
                  }`}
                >
                  {promotion.status === 'active' ? <XCircle size={16} /> : <CheckCircle size={16} />}
                  <span>{promotion.status === 'active' ? 'Deactivate' : 'Activate'}</span>
                </button>
                <button
                  onClick={() => handleDuplicate(promotion)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                  title="Duplicate"
                >
                  <Copy size={16} />
                </button>
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg" title="Share">
                  <Share2 size={16} />
                </button>
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg" title="Edit">
                  <Edit size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Analytics Section */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 mt-8">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Promotion Performance Analytics</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h4 className="font-medium text-gray-700 mb-4">Top Performing Promotions</h4>
            <div className="space-y-4">
              {promotions
                .filter(p => p.usedCount > 0)
                .sort((a, b) => b.totalDiscount - a.totalDiscount)
                .map((promo, index) => (
                  <div key={index} className="p-3 hover:bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                          {getTypeIcon(promo.type)}
                        </div>
                        <div>
                          <p className="font-medium">{promo.name}</p>
                          <p className="text-gray-500 text-sm">{promo.code}</p>
                        </div>
                      </div>
                      <span className="font-bold text-green-600">R{promo.totalDiscount.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">{promo.usedCount} redemptions</span>
                      <span className="text-gray-600">{promo.totalOrders} orders</span>
                      <span className="text-gray-600">Avg: R{Math.round(promo.totalDiscount / promo.usedCount)}/order</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div>
            <h4 className="font-medium text-gray-700 mb-4">Promotion Schedule</h4>
            <div className="space-y-4">
              {promotions
                .filter(p => p.status === 'scheduled' || p.status === 'active')
                .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
                .map((promo, index) => (
                  <div key={index} className="p-3 border-l-4 border-green-500 bg-green-50 rounded-r-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{promo.name}</p>
                        <p className="text-gray-600 text-sm">{promo.code}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2">
                          <Clock size={14} className="text-gray-500" />
                          <span className="text-gray-700 text-sm">
                            {promo.startDate} → {promo.endDate}
                          </span>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          promo.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {promo.status === 'active' ? 'Live Now' : 'Starts Soon'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            
            <div className="mt-8">
              <h4 className="font-medium text-gray-700 mb-4">Quick Stats</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-600 text-sm">Best Day for Promotions</p>
                  <p className="font-bold text-gray-900">Friday</p>
                  <p className="text-gray-500 text-xs">+35% higher redemption</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-600 text-sm">Optimal Discount</p>
                  <p className="font-bold text-gray-900">15-25%</p>
                  <p className="text-gray-500 text-xs">Highest conversion rate</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ManagePromotionsPage;