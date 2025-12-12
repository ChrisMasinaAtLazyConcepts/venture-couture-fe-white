import React, { useState } from 'react';
import { 
  Megaphone, TrendingUp, Eye, MousePointer, 
  DollarSign, Filter, Plus, Download, 
  Edit, Trash2, Play, Pause, Calendar,
  BarChart3, Target, RefreshCw, CreditCard
} from 'lucide-react';
import AdminLayout from '../components/AdminLayout';

interface Campaign {
  id: string;
  name: string;
  platform: 'google' | 'facebook' | 'instagram' | 'email';
  status: 'active' | 'paused' | 'completed' | 'draft';
  budget: number;
  spent: number;
  impressions: number;
  clicks: number;
  conversions: number;
  roi: number;
  startDate: string;
  endDate: string;
}

const AdvertisingPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const [campaigns, setCampaigns] = useState<Campaign[]>([
    { id: 'AD-001', name: 'Back to School Sale', platform: 'google', status: 'active', budget: 5000, spent: 3200, impressions: 124500, clicks: 2450, conversions: 189, roi: 3.8, startDate: '2024-01-01', endDate: '2024-01-31' },
    { id: 'AD-002', name: 'New Collection Launch', platform: 'instagram', status: 'active', budget: 8000, spent: 4200, impressions: 256000, clicks: 1890, conversions: 142, roi: 2.4, startDate: '2024-01-10', endDate: '2024-02-10' },
    { id: 'AD-003', name: 'Black Friday Promo', platform: 'facebook', status: 'completed', budget: 15000, spent: 15000, impressions: 589000, clicks: 8900, conversions: 645, roi: 5.2, startDate: '2023-11-20', endDate: '2023-11-27' },
    { id: 'AD-004', name: 'Email Newsletter', platform: 'email', status: 'active', budget: 2000, spent: 800, impressions: 45000, clicks: 3450, conversions: 210, roi: 8.7, startDate: '2024-01-15', endDate: '2024-02-15' },
    { id: 'AD-005', name: 'Winter Collection', platform: 'google', status: 'paused', budget: 6000, spent: 1800, impressions: 89000, clicks: 1200, conversions: 89, roi: 1.8, startDate: '2023-12-01', endDate: '2024-01-31' },
    { id: 'AD-006', name: 'Influencer Campaign', platform: 'instagram', status: 'draft', budget: 10000, spent: 0, impressions: 0, clicks: 0, conversions: 0, roi: 0, startDate: '2024-02-01', endDate: '2024-02-28' },
  ]);

  const adStats = {
    totalBudget: 46000,
    totalSpent: 21800,
    totalConversions: 1275,
    avgROI: 4.38
  };

  const handleToggleStatus = (campaignId: string) => {
    setCampaigns(campaigns.map(c => {
      if (c.id === campaignId) {
        return {
          ...c,
          status: c.status === 'active' ? 'paused' : 'active'
        };
      }
      return c;
    }));
  };

  const handleDuplicate = (campaign: Campaign) => {
    const newCampaign = {
      ...campaign,
      id: `AD-${Date.now().toString().slice(-6)}`,
      name: `${campaign.name} (Copy)`,
      status: 'draft',
      spent: 0,
      impressions: 0,
      clicks: 0,
      conversions: 0,
      roi: 0
    };
    setCampaigns([...campaigns, newCampaign]);
  };

  return (
    <AdminLayout 
      title="Advertising" 
      subtitle="Manage ad campaigns and marketing strategies"
    >
      {/* Advertising Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Budget</p>
              <p className="text-2xl font-bold text-gray-900">R{adStats.totalBudget.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <CreditCard size={24} className="text-blue-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Spent</span>
              <span className="font-medium text-gray-900">R{adStats.totalSpent.toLocaleString()}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div 
                className="bg-green-500 h-2 rounded-full" 
                style={{ width: `${(adStats.totalSpent / adStats.totalBudget) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Conversions</p>
              <p className="text-2xl font-bold text-gray-900">{adStats.totalConversions}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <TrendingUp size={24} className="text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-green-600">
            <Target size={16} />
            <span className="text-sm">+24% from last month</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Average ROI</p>
              <p className="text-2xl font-bold text-gray-900">{adStats.avgROI}x</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <BarChart3 size={24} className="text-purple-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-purple-600">
            <DollarSign size={16} />
            <span className="text-sm">For every R1 spent</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Click-through Rate</p>
              <p className="text-2xl font-bold text-gray-900">2.1%</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <MousePointer size={24} className="text-yellow-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-yellow-600">
            <Eye size={16} />
            <span className="text-sm">Above industry average</span>
          </div>
        </div>
      </div>

      {/* Campaign Management */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 mb-6">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="flex flex-col md:flex-row gap-4 flex-1">
            <div className="relative flex-1">
              <Megaphone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search campaigns..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>

            <select
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value)}
              className="px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg"
            >
              <option value="all">All Platforms</option>
              <option value="google">Google Ads</option>
              <option value="facebook">Facebook</option>
              <option value="instagram">Instagram</option>
              <option value="email">Email</option>
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="paused">Paused</option>
              <option value="completed">Completed</option>
              <option value="draft">Draft</option>
            </select>
          </div>

          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
              <Plus size={16} />
              <span>New Campaign</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
              <Download size={16} />
              <span>Export Data</span>
            </button>
          </div>
        </div>
      </div>

      {/* Campaigns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map((campaign) => (
          <div key={campaign.id} className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="p-6">
              {/* Campaign Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    campaign.platform === 'google' ? 'bg-blue-100' :
                    campaign.platform === 'facebook' ? 'bg-blue-50' :
                    campaign.platform === 'instagram' ? 'bg-pink-100' : 'bg-gray-100'
                  }`}>
                    <span className={`font-medium ${
                      campaign.platform === 'google' ? 'text-blue-600' :
                      campaign.platform === 'facebook' ? 'text-blue-700' :
                      campaign.platform === 'instagram' ? 'text-pink-600' : 'text-gray-600'
                    }`}>
                      {campaign.platform.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{campaign.name}</h3>
                    <p className="text-gray-500 text-sm">ID: {campaign.id}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  campaign.status === 'active' ? 'bg-green-100 text-green-800' :
                  campaign.status === 'paused' ? 'bg-yellow-100 text-yellow-800' :
                  campaign.status === 'completed' ? 'bg-gray-100 text-gray-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                </span>
              </div>

              {/* Campaign Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-gray-600 text-sm">Budget</p>
                  <p className="font-bold text-gray-900">R{campaign.budget.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Spent</p>
                  <p className="font-bold text-gray-900">R{campaign.spent.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">ROI</p>
                  <p className={`font-bold ${
                    campaign.roi >= 4 ? 'text-green-600' :
                    campaign.roi >= 2 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {campaign.roi}x
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Conversions</p>
                  <p className="font-bold text-gray-900">{campaign.conversions}</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-600">Budget Usage</span>
                  <span className="font-medium">{((campaign.spent / campaign.budget) * 100).toFixed(0)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      (campaign.spent / campaign.budget) > 0.8 ? 'bg-red-500' :
                      (campaign.spent / campaign.budget) > 0.5 ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${(campaign.spent / campaign.budget) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleToggleStatus(campaign.id)}
                  className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg ${
                    campaign.status === 'active'
                      ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      : 'bg-green-100 text-green-700 hover:bg-green-200'
                  }`}
                >
                  {campaign.status === 'active' ? <Pause size={16} /> : <Play size={16} />}
                  <span>{campaign.status === 'active' ? 'Pause' : 'Activate'}</span>
                </button>
                <button
                  onClick={() => handleDuplicate(campaign)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                  title="Duplicate"
                >
                  <RefreshCw size={16} />
                </button>
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg" title="Edit">
                  <Edit size={16} />
                </button>
                <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg" title="Delete">
                  <Trash2 size={16} />
                </button>
              </div>

              {/* Dates */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>{campaign.startDate}</span>
                  </div>
                  <span>to</span>
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>{campaign.endDate}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Performance Chart */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 mt-8">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Campaign Performance</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h4 className="font-medium text-gray-700 mb-4">Platform Performance</h4>
            <div className="space-y-4">
              {[
                { platform: 'Google Ads', spend: 8500, conversions: 834, cpa: 'R10.19' },
                { platform: 'Instagram', spend: 4200, conversions: 142, cpa: 'R29.58' },
                { platform: 'Facebook', spend: 15000, conversions: 645, cpa: 'R23.26' },
                { platform: 'Email', spend: 800, conversions: 210, cpa: 'R3.81' },
              ].map((platform, index) => (
                <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      platform.platform === 'Google Ads' ? 'bg-blue-100' :
                      platform.platform === 'Instagram' ? 'bg-pink-100' :
                      platform.platform === 'Facebook' ? 'bg-blue-50' : 'bg-gray-100'
                    }`}>
                      <span className={`font-medium ${
                        platform.platform === 'Google Ads' ? 'text-blue-600' :
                        platform.platform === 'Instagram' ? 'text-pink-600' :
                        platform.platform === 'Facebook' ? 'text-blue-700' : 'text-gray-600'
                      }`}>
                        {platform.platform.charAt(0)}
                      </span>
                    </div>
                    <span className="font-medium">{platform.platform}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">{platform.conversions} conversions</p>
                    <p className="text-gray-500 text-sm">CPA: {platform.cpa}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-medium text-gray-700 mb-4">Top Converting Campaigns</h4>
            <div className="space-y-4">
              {[
                { name: 'Black Friday Promo', conversions: 645, roi: '5.2x' },
                { name: 'Email Newsletter', conversions: 210, roi: '8.7x' },
                { name: 'Back to School Sale', conversions: 189, roi: '3.8x' },
                { name: 'New Collection Launch', conversions: 142, roi: '2.4x' },
              ].map((campaign, index) => (
                <div key={index} className="p-3 hover:bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{campaign.name}</span>
                    <span className="font-bold text-green-600">{campaign.roi} ROI</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">{campaign.conversions} conversions</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${(campaign.conversions / 645) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-gray-500">{Math.round((campaign.conversions / 645) * 100)}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdvertisingPage;