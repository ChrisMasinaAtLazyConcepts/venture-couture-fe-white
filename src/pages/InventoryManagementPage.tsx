import React, { useState } from 'react';
import { 
  Package, Search, Filter, Plus, Download, 
  AlertTriangle, CheckCircle, XCircle, Edit,
  Trash2, Eye, Tag, TrendingDown, TrendingUp,
  Layers, Archive, RefreshCw, BarChart3
} from 'lucide-react';
import AdminLayout from '../components/AdminLayout';

interface Product {
  id: string;
  sku: string;
  name: string;
  category: string;
  size: string;
  color: string;
  price: number;
  stock: number;
  status: 'in_stock' | 'low_stock' | 'out_of_stock';
  lastUpdated: string;
}

const InventoryManagementPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showLowStock, setShowLowStock] = useState(false);

  const categories = ['All Categories', 'Shoes', 'Clothing', 'Accessories', 'Footwear'];
  const statusColors = {
    in_stock: 'bg-green-100 text-green-800',
    low_stock: 'bg-yellow-100 text-yellow-800',
    out_of_stock: 'bg-red-100 text-red-800'
  };

  const [products, setProducts] = useState<Product[]>([
    { id: '1', sku: 'VC-NM-270', name: 'Nike Air Max 270', category: 'Shoes', size: 'US 10', color: 'Black/White', price: 2499.99, stock: 45, status: 'in_stock', lastUpdated: '2024-01-20' },
    { id: '2', sku: 'VC-AD-UB22', name: 'Adidas Ultraboost 22', category: 'Shoes', size: 'US 9', color: 'Core Black', price: 2999.99, stock: 8, status: 'low_stock', lastUpdated: '2024-01-20' },
    { id: '3', sku: 'VC-PU-RSX', name: 'Puma RS-X', category: 'Shoes', size: 'US 11', color: 'Red/Blue', price: 1799.99, stock: 0, status: 'out_of_stock', lastUpdated: '2024-01-19' },
    { id: '4', sku: 'VC-NB-990', name: 'New Balance 990v6', category: 'Shoes', size: 'US 8.5', color: 'Grey', price: 3499.99, stock: 23, status: 'in_stock', lastUpdated: '2024-01-20' },
    { id: '5', sku: 'VC-NI-TS', name: 'Nike Sport T-shirt', category: 'Clothing', size: 'M', color: 'White', price: 499.99, stock: 3, status: 'low_stock', lastUpdated: '2024-01-18' },
    { id: '6', sku: 'VC-AD-TP', name: 'Adidas Track Pants', category: 'Clothing', size: 'L', color: 'Black', price: 799.99, stock: 67, status: 'in_stock', lastUpdated: '2024-01-20' },
    { id: '7', sku: 'VC-CO-CH70', name: 'Converse Chuck 70', category: 'Shoes', size: 'US 9', color: 'Black', price: 1299.99, stock: 12, status: 'in_stock', lastUpdated: '2024-01-17' },
    { id: '8', sku: 'VC-PU-BP', name: 'Puma Backpack', category: 'Accessories', size: 'One Size', color: 'Black/Red', price: 899.99, stock: 0, status: 'out_of_stock', lastUpdated: '2024-01-16' },
  ]);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesLowStock = !showLowStock || product.status === 'low_stock' || product.status === 'out_of_stock';
    
    return matchesSearch && matchesCategory && matchesLowStock;
  });

  const inventoryStats = {
    totalValue: 245892,
    totalItems: 158,
    lowStock: 12,
    outOfStock: 5
  };

  const handleRestock = (productId: string, quantity: number) => {
    setProducts(products.map(p => 
      p.id === productId 
        ? { ...p, stock: p.stock + quantity, status: p.stock + quantity <= 10 ? 'low_stock' : 'in_stock' }
        : p
    ));
  };

  const handleDelete = (productId: string) => {
    setProducts(products.filter(p => p.id !== productId));
  };

  return (
    <AdminLayout 
      title="Inventory Management" 
      subtitle="Manage stock levels, SKUs, and product variants"
    >
      {/* Inventory Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Inventory Value</p>
              <p className="text-2xl font-bold text-gray-900">R{inventoryStats.totalValue.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <BarChart3 size={24} className="text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-green-600">
            <TrendingUp size={16} />
            <span className="text-sm">+8% from last month</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Items</p>
              <p className="text-2xl font-bold text-gray-900">{inventoryStats.totalItems}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Package size={24} className="text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-blue-600">
            <Layers size={16} />
            <span className="text-sm">Across 12 categories</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Low Stock Items</p>
              <p className="text-2xl font-bold text-gray-900">{inventoryStats.lowStock}</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <AlertTriangle size={24} className="text-yellow-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-yellow-600">
            <RefreshCw size={16} />
            <span className="text-sm">Needs attention</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Out of Stock</p>
              <p className="text-2xl font-bold text-gray-900">{inventoryStats.outOfStock}</p>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <XCircle size={24} className="text-red-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-red-600">
            <TrendingDown size={16} />
            <span className="text-sm">Requires restocking</span>
          </div>
        </div>
      </div>

      {/* Filters and Actions */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 mb-6">
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <div className="flex flex-col md:flex-row gap-4 flex-1">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by SKU, product name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg"
            >
              {categories.map(cat => (
                <option key={cat} value={cat === 'All Categories' ? 'all' : cat.toLowerCase()}>
                  {cat}
                </option>
              ))}
            </select>

            {/* Low Stock Toggle */}
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={showLowStock}
                onChange={(e) => setShowLowStock(e.target.checked)}
                className="rounded border-gray-300 text-red-600 focus:ring-red-500"/>
              <span className="text-gray-700">Show Low Stock Only</span>
            </label>
          </div>

          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
              <Plus size={20} />
              Add Product
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
              <Download size={20} />
              Export CSV
            </button>
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
              <RefreshCw size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="py-3 px-6 text-left text-sm font-semibold text-gray-900">Product</th>
                <th className="py-3 px-6 text-left text-sm font-semibold text-gray-900">Category</th>
                <th className="py-3 px-6 text-left text-sm font-semibold text-gray-900">Size</th>
                <th className="py-3 px-6 text-left text-sm font-semibold text-gray-900">Color</th>
                <th className="py-3 px-6 text-left text-sm font-semibold text-gray-900">Price</th>
                <th className="py-3 px-6 text-left text-sm font-semibold text-gray-900">Stock</th>
                <th className="py-3 px-6 text-left text-sm font-semibold text-gray-900">Status</th>
                <th className="py-3 px-6 text-left text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition">
                  <td className="py-4 px-6">
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-900">{product.name}</span>
                      <span className="text-sm text-gray-500">{product.sku}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                      {product.category}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-700">{product.size}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-4 h-4 rounded-full border border-gray-300"
                        style={{ backgroundColor: product.color.toLowerCase().includes('black') ? '#000' : 
                                 product.color.toLowerCase().includes('white') ? '#fff' :
                                 product.color.toLowerCase().includes('red') ? '#ef4444' :
                                 product.color.toLowerCase().includes('blue') ? '#3b82f6' :
                                 product.color.toLowerCase().includes('grey') ? '#9ca3af' : '#ccc' }}
                      />
                      <span>{product.color}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 font-medium text-gray-900">
                    R{product.price.toLocaleString()}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <span className={`px-2 py-1 rounded-full text-sm ${
                        product.stock > 20 
                          ? 'bg-green-100 text-green-800'
                          : product.stock > 0
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {product.stock} units
                      </span>
                      {product.stock < 10 && product.stock > 0 && (
                        <button 
                          onClick={() => handleRestock(product.id, 20)}
                          className="text-sm text-red-600 hover:text-red-800 font-medium"
                        >
                          Restock +
                        </button>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[product.status]}`}>
                      {product.status === 'in_stock' ? 'In Stock' :
                       product.status === 'low_stock' ? 'Low Stock' : 'Out of Stock'}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleRestock(product.id, 10)}
                        className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition"
                        title="Restock"
                      >
                        <RefreshCw size={18} />
                      </button>
                      <button 
                        className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                        title="View Details"
                      >
                        <Eye size={18} />
                      </button>
                      <button 
                        className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition"
                        title="Edit"
                      >
                        <Edit size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(product.id)}
                        className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">{filteredProducts.length}</span> of <span className="font-medium">{products.length}</span> products
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50">
              Previous
            </button>
            <button className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700">
              1
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50">
              2
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50">
              3
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <h3 className="font-medium text-gray-900 mb-4">Stock Overview</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">In Stock</span>
                <span className="text-sm font-medium">64%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: '64%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Low Stock</span>
                <span className="text-sm font-medium">24%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-yellow-500 rounded-full" style={{ width: '24%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Out of Stock</span>
                <span className="text-sm font-medium">12%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-red-500 rounded-full" style={{ width: '12%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <h3 className="font-medium text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Package size={20} className="text-blue-600" />
                </div>
                <span>Bulk Restock</span>
              </div>
              <Plus size={20} className="text-gray-400" />
            </button>
            <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Tag size={20} className="text-purple-600" />
                </div>
                <span>Update Prices</span>
              </div>
              <Plus size={20} className="text-gray-400" />
            </button>
            <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Archive size={20} className="text-orange-600" />
                </div>
                <span>Archive Items</span>
              </div>
              <Plus size={20} className="text-gray-400" />
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <h3 className="font-medium text-gray-900 mb-4">Recent Activities</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-full">
                <CheckCircle size={16} className="text-green-600" />
              </div>
              <div>
                <p className="text-sm">Adidas Ultraboost 22 restocked</p>
                <p className="text-xs text-gray-500">10 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-full">
                <XCircle size={16} className="text-red-600" />
              </div>
              <div>
                <p className="text-sm">Puma Backpack went out of stock</p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-full">
                <Edit size={16} className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm">Nike Air Max 270 price updated</p>
                <p className="text-xs text-gray-500">Yesterday, 14:32</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default InventoryManagementPage;