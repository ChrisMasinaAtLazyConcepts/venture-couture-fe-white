import React, { useState } from 'react';
import { 
  Package, Search, Filter, Plus, Download, 
  AlertTriangle, CheckCircle, XCircle, Edit,
  Trash2, Eye, Tag, TrendingDown, TrendingUp,
  Layers, Archive, RefreshCw, BarChart3,
  ShoppingCart, QrCode, Copy, ExternalLink,
  Warehouse, Box, Truck, Clock, 
  Grid, List, SortAsc, SortDesc,
  MapPin, LayoutGrid, Database
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
  minStockLevel: number;
  reorderQuantity: number;
  image: string;
  supplier: string;
  leadTime: number; // in days
  shelf: {
    id: string;
    aisle: string;
    section: string;
    level: number;
    position: number;
    capacity: number;
    current: number;
  };
  status: 'in_stock' | 'low_stock' | 'out_of_stock';
  lastUpdated: string;
}

interface ShelfVisual {
  id: string;
  aisle: string;
  sections: {
    id: string;
    level: number;
    products: Product[];
    capacity: number;
    current: number;
  }[];
}

const InventoryManagementPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showLowStock, setShowLowStock] = useState(false);
  const [viewMode, setViewMode] = useState<'table' | 'shelf'>('table');
  const [reorderQuantities, setReorderQuantities] = useState<Record<string, number>>({});
  const [selectedShelf, setSelectedShelf] = useState<string>('A1');

  const categories = ['All Categories', 'Shoes', 'Clothing', 'Accessories', 'Footwear', 'Electronics', 'Home'];
  
  const statusColors = {
    in_stock: 'bg-green-100 text-green-800',
    low_stock: 'bg-yellow-100 text-yellow-800',
    out_of_stock: 'bg-red-100 text-red-800'
  };

  const [products, setProducts] = useState<Product[]>([
    { 
      id: '1', 
      sku: 'VC-NM-270-BLK', 
      name: 'Nike Air Max 270', 
      category: 'Shoes', 
      size: 'US 10', 
      color: 'Black/White', 
      price: 2499.99, 
      stock: 45, 
      minStockLevel: 10,
      reorderQuantity: 50,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=150&h=150&fit=crop',
      supplier: 'Nike Direct',
      leadTime: 7,
      shelf: {
        id: 'A1',
        aisle: 'A',
        section: 'S1',
        level: 2,
        position: 15,
        capacity: 60,
        current: 45
      },
      status: 'in_stock', 
      lastUpdated: '2024-01-20' 
    },
    { 
      id: '2', 
      sku: 'VC-AD-UB22-CBLK', 
      name: 'Adidas Ultraboost 22', 
      category: 'Shoes', 
      size: 'US 9', 
      color: 'Core Black', 
      price: 2999.99, 
      stock: 8, 
      minStockLevel: 15,
      reorderQuantity: 30,
      image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=150&h=150&fit=crop',
      supplier: 'Adidas Wholesale',
      leadTime: 5,
      shelf: {
        id: 'A1',
        aisle: 'A',
        section: 'S1',
        level: 2,
        position: 18,
        capacity: 40,
        current: 8
      },
      status: 'low_stock', 
      lastUpdated: '2024-01-20' 
    },
    { 
      id: '3', 
      sku: 'VC-PU-RSX-RBL', 
      name: 'Puma RS-X', 
      category: 'Shoes', 
      size: 'US 11', 
      color: 'Red/Blue', 
      price: 1799.99, 
      stock: 0, 
      minStockLevel: 5,
      reorderQuantity: 25,
      image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=150&h=150&fit=crop',
      supplier: 'Puma Distributors',
      leadTime: 10,
      shelf: {
        id: 'A1',
        aisle: 'A',
        section: 'S1',
        level: 3,
        position: 5,
        capacity: 30,
        current: 0
      },
      status: 'out_of_stock', 
      lastUpdated: '2024-01-19' 
    },
    { 
      id: '4', 
      sku: 'VC-NB-990-GRY', 
      name: 'New Balance 990v6', 
      category: 'Shoes', 
      size: 'US 8.5', 
      color: 'Grey', 
      price: 3499.99, 
      stock: 23, 
      minStockLevel: 8,
      reorderQuantity: 40,
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=150&h=150&fit=crop',
      supplier: 'New Balance SA',
      leadTime: 14,
      shelf: {
        id: 'B2',
        aisle: 'B',
        section: 'S2',
        level: 1,
        position: 12,
        capacity: 50,
        current: 23
      },
      status: 'in_stock', 
      lastUpdated: '2024-01-20' 
    },
    { 
      id: '5', 
      sku: 'VC-NI-TS-WHT-M', 
      name: 'Nike Sport T-shirt', 
      category: 'Clothing', 
      size: 'M', 
      color: 'White', 
      price: 499.99, 
      stock: 3, 
      minStockLevel: 20,
      reorderQuantity: 100,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=150&h=150&fit=crop',
      supplier: 'Nike Apparel',
      leadTime: 3,
      shelf: {
        id: 'C3',
        aisle: 'C',
        section: 'S3',
        level: 2,
        position: 8,
        capacity: 200,
        current: 3
      },
      status: 'low_stock', 
      lastUpdated: '2024-01-18' 
    },
    { 
      id: '6', 
      sku: 'VC-AD-TP-BLK-L', 
      name: 'Adidas Track Pants', 
      category: 'Clothing', 
      size: 'L', 
      color: 'Black', 
      price: 799.99, 
      stock: 67, 
      minStockLevel: 25,
      reorderQuantity: 80,
      image: 'https://images.unsplash.com/photo-1544441893-675973e31985?w=150&h=150&fit=crop',
      supplier: 'Adidas Sportswear',
      leadTime: 4,
      shelf: {
        id: 'C3',
        aisle: 'C',
        section: 'S3',
        level: 3,
        position: 15,
        capacity: 150,
        current: 67
      },
      status: 'in_stock', 
      lastUpdated: '2024-01-20' 
    },
  ]);

  // Group products by shelf for visualization
  const shelves: ShelfVisual[] = products.reduce((acc: ShelfVisual[], product) => {
    const shelfId = product.shelf.id;
    const existingShelf = acc.find(s => s.id === shelfId);
    
    if (existingShelf) {
      const existingSection = existingShelf.sections.find(s => 
        s.id === product.shelf.section && s.level === product.shelf.level
      );
      
      if (existingSection) {
        existingSection.products.push(product);
        existingSection.current += product.stock;
      } else {
        existingShelf.sections.push({
          id: product.shelf.section,
          level: product.shelf.level,
          products: [product],
          capacity: product.shelf.capacity,
          current: product.stock
        });
      }
    } else {
      acc.push({
        id: shelfId,
        aisle: product.shelf.aisle,
        sections: [{
          id: product.shelf.section,
          level: product.shelf.level,
          products: [product],
          capacity: product.shelf.capacity,
          current: product.stock
        }]
      });
    }
    
    return acc;
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesLowStock = !showLowStock || product.status === 'low_stock' || product.status === 'out_of_stock';
    
    return matchesSearch && matchesCategory && matchesLowStock;
  });

  const inventoryStats = {
    totalValue: 245892,
    totalItems: products.reduce((sum, p) => sum + p.stock, 0),
    lowStock: products.filter(p => p.status === 'low_stock').length,
    outOfStock: products.filter(p => p.status === 'out_of_stock').length,
    shelvesOccupied: shelves.length,
    capacityUtilization: Math.round(
      (products.reduce((sum, p) => sum + p.stock, 0) / 
      products.reduce((sum, p) => sum + p.shelf.capacity, 0)) * 100
    )
  };

  const handleQuickReorder = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      const quantity = reorderQuantities[productId] || product.reorderQuantity;
      setProducts(products.map(p => 
        p.id === productId 
          ? { 
              ...p, 
              stock: p.stock + quantity, 
              status: p.stock + quantity <= p.minStockLevel ? 'low_stock' : 'in_stock',
              shelf: { ...p.shelf, current: p.shelf.current + quantity }
            }
          : p
      ));
      alert(`Ordered ${quantity} units of ${product.name}`);
    }
  };

  const handleDelete = (productId: string) => {
    setProducts(products.filter(p => p.id !== productId));
  };

  const copySKU = (sku: string) => {
    navigator.clipboard.writeText(sku);
    alert(`SKU ${sku} copied to clipboard!`);
  };

  // Shelf Visualization Component
  const ShelfVisualization = () => (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900">Warehouse Shelf Layout</h3>
          <p className="text-gray-600">Visual representation of stock levels</p>
        </div>
        <div className="flex gap-2">
          {shelves.map(shelf => (
            <button
              key={shelf.id}
              onClick={() => setSelectedShelf(shelf.id)}
              className={`px-4 py-2 rounded-lg border transition ${
                selectedShelf === shelf.id 
                  ? 'bg-red-600 text-white border-red-600' 
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              Shelf {shelf.id}
            </button>
          ))}
        </div>
      </div>

      {shelves.filter(s => s.id === selectedShelf).map(shelf => (
        <div key={shelf.id} className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-bold text-gray-900">Shelf {shelf.id} - Aisle {shelf.aisle}</h4>
              <p className="text-sm text-gray-600">{shelf.sections.length} sections</p>
            </div>
            <div className="flex gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {shelf.sections.reduce((sum, s) => sum + s.current, 0)}
                </div>
                <div className="text-sm text-gray-600">Current Stock</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {shelf.sections.reduce((sum, s) => sum + s.capacity, 0)}
                </div>
                <div className="text-sm text-gray-600">Total Capacity</div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {shelf.sections.sort((a, b) => a.level - b.level).map(section => {
              const utilization = Math.round((section.current / section.capacity) * 100);
              return (
                <div key={`${section.id}-${section.level}`} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <LayoutGrid size={20} className="text-blue-600" />
                      </div>
                      <div>
                        <h5 className="font-bold text-gray-900">
                          Section {section.id} - Level {section.level}
                        </h5>
                        <p className="text-sm text-gray-600">
                          Position {section.products[0]?.shelf.position || 'N/A'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="font-bold text-gray-900">
                          {section.current} / {section.capacity}
                        </div>
                        <div className="text-sm text-gray-600">Items</div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-sm font-bold ${
                        utilization >= 80 ? 'bg-green-100 text-green-800' :
                        utilization >= 50 ? 'bg-blue-100 text-blue-800' :
                        utilization >= 20 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {utilization}% full
                      </div>
                    </div>
                  </div>

                  {/* Capacity bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Capacity Utilization</span>
                      <span>{utilization}%</span>
                    </div>
                    <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-500 ${
                          utilization >= 80 ? 'bg-green-500' :
                          utilization >= 50 ? 'bg-blue-500' :
                          utilization >= 20 ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`}
                        style={{ width: `${utilization}%` }}
                      />
                    </div>
                  </div>

                  {/* Products in this section */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {section.products.map(product => (
                      <div key={product.id} className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition">
                        <div className="flex items-start gap-3">
                          <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                            <img 
                              src={product.image} 
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h6 className="font-medium text-gray-900 truncate">{product.name}</h6>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs text-gray-500">{product.sku}</span>
                              <button 
                                onClick={() => copySKU(product.sku)}
                                className="text-gray-400 hover:text-gray-600"
                                title="Copy SKU"
                              >
                                <Copy size={12} />
                              </button>
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                              <span className={`px-2 py-1 rounded text-xs font-medium ${statusColors[product.status]}`}>
                                {product.stock} units
                              </span>
                              <button 
                                onClick={() => handleQuickReorder(product.id)}
                                className="text-xs text-red-600 hover:text-red-800 font-medium"
                              >
                                Reorder {product.reorderQuantity}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <AdminLayout 
      title="Inventory Management" 
      subtitle="Manage stock levels, SKUs, shelf positions, and reorder products"
    >
      {/* Inventory Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6 border border-gray-200">
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
            <span className="text-sm">{products.length} products</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Shelves Occupied</p>
              <p className="text-2xl font-bold text-gray-900">{inventoryStats.shelvesOccupied}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Warehouse size={24} className="text-purple-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-purple-600">
            <LayoutGrid size={16} />
            <span className="text-sm">Capacity: {inventoryStats.capacityUtilization}%</span>
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
                placeholder="Search by SKU, product name, shelf..."
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
            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('table')}
                className={`px-3 py-2 ${viewMode === 'table' ? 'bg-red-600 text-white' : 'bg-white text-gray-700'}`}
              >
                <Grid size={20} />
              </button>
              <button
                onClick={() => setViewMode('shelf')}
                className={`px-3 py-2 ${viewMode === 'shelf' ? 'bg-red-600 text-white' : 'bg-white text-gray-700'}`}
              >
                <Warehouse size={20} />
              </button>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
              <Plus size={20} />
              Add Product
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
              <Download size={20} />
              Export CSV
            </button>
          </div>
        </div>
      </div>

      {viewMode === 'table' ? (
        <>
          {/* Products Table */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden mb-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="py-3 px-6 text-left text-sm font-semibold text-gray-900">Product</th>
                    <th className="py-3 px-6 text-left text-sm font-semibold text-gray-900">SKU</th>
                    <th className="py-3 px-6 text-left text-sm font-semibold text-gray-900">Shelf Location</th>
                    <th className="py-3 px-6 text-left text-sm font-semibold text-gray-900">Stock Level</th>
                    <th className="py-3 px-6 text-left text-sm font-semibold text-gray-900">Status</th>
                    <th className="py-3 px-6 text-left text-sm font-semibold text-gray-900">Reorder</th>
                    <th className="py-3 px-6 text-left text-sm font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredProducts.map((product) => {
                    const stockPercentage = (product.stock / product.shelf.capacity) * 100;
                    const needsReorder = product.stock <= product.minStockLevel;
                    
                    return (
                      <tr key={product.id} className="hover:bg-gray-50 transition">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                              <img 
                                src={product.image} 
                                alt={product.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="min-w-0">
                              <div className="font-medium text-gray-900 truncate">{product.name}</div>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-sm text-gray-500">{product.category}</span>
                                <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded">
                                  {product.size}
                                </span>
                                <div className="w-3 h-3 rounded-full border border-gray-300" 
                                     style={{ backgroundColor: product.color.toLowerCase().includes('black') ? '#000' : 
                                              product.color.toLowerCase().includes('white') ? '#fff' :
                                              product.color.toLowerCase().includes('red') ? '#ef4444' :
                                              product.color.toLowerCase().includes('blue') ? '#3b82f6' :
                                              product.color.toLowerCase().includes('grey') ? '#9ca3af' : '#ccc' }}
                                />
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-sm text-gray-900">{product.sku}</span>
                            <button 
                              onClick={() => copySKU(product.sku)}
                              className="text-gray-400 hover:text-gray-600"
                              title="Copy SKU"
                            >
                              <Copy size={14} />
                            </button>
                          </div>
                          <div className="text-xs text-gray-500 mt-1">R{product.price.toFixed(2)}</div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                              <Warehouse size={14} className="text-gray-400" />
                              <span className="font-medium text-gray-900">Shelf {product.shelf.id}</span>
                            </div>
                            <div className="text-sm text-gray-600 mt-1">
                              Aisle {product.shelf.aisle} • Sec {product.shelf.section} • Lvl {product.shelf.level}
                            </div>
                            <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div 
                                  className={`h-full ${
                                    stockPercentage >= 80 ? 'bg-green-500' :
                                    stockPercentage >= 50 ? 'bg-blue-500' :
                                    stockPercentage >= 20 ? 'bg-yellow-500' :
                                    'bg-red-500'
                                  }`}
                                  style={{ width: `${stockPercentage}%` }}
                                />
                              </div>
                              <span>{product.stock}/{product.shelf.capacity}</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex flex-col">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                              product.stock > 20 
                                ? 'bg-green-100 text-green-800'
                                : product.stock > 0
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {product.stock} units
                            </span>
                            <div className="text-xs text-gray-500 mt-1">
                              Min: {product.minStockLevel} • Lead: {product.leadTime} days
                            </div>
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
                            {needsReorder ? (
                              <>
                                <button
                                  onClick={() => handleQuickReorder(product.id)}
                                  className="flex items-center gap-2 px-3 py-1.5 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition"
                                >
                                  <ShoppingCart size={14} />
                                  Order {product.reorderQuantity}
                                </button>
                                <input
                                  type="number"
                                  min="1"
                                  value={reorderQuantities[product.id] || product.reorderQuantity}
                                  onChange={(e) => setReorderQuantities({
                                    ...reorderQuantities,
                                    [product.id]: parseInt(e.target.value) || product.reorderQuantity
                                  })}
                                  className="w-20 px-2 py-1.5 border border-gray-300 rounded text-sm"
                                />
                              </>
                            ) : (
                              <span className="text-sm text-gray-500">Stock OK</span>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => handleQuickReorder(product.id)}
                              className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition"
                              title="Quick Reorder"
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
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <ShelfVisualization />
      )}

      {/* Warehouse Summary */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Warehouse className="text-red-600" size={20} />
            Warehouse Summary
          </h3>
          <div className="space-y-4">
            {shelves.map(shelf => {
              const totalCurrent = shelf.sections.reduce((sum, s) => sum + s.current, 0);
              const totalCapacity = shelf.sections.reduce((sum, s) => sum + s.capacity, 0);
              const utilization = Math.round((totalCurrent / totalCapacity) * 100);
              
              return (
                <div key={shelf.id} className="border border-gray-200 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">Shelf {shelf.id}</span>
                    <span className={`text-sm px-2 py-1 rounded-full ${
                      utilization >= 80 ? 'bg-green-100 text-green-800' :
                      utilization >= 50 ? 'bg-blue-100 text-blue-800' :
                      utilization >= 20 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {utilization}% full
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>{totalCurrent} items</span>
                    <span>Capacity: {totalCapacity}</span>
                  </div>
                  <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${
                        utilization >= 80 ? 'bg-green-500' :
                        utilization >= 50 ? 'bg-blue-500' :
                        utilization >= 20 ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`}
                      style={{ width: `${utilization}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <ShoppingCart className="text-red-600" size={20} />
            Quick Reorder Suggestions
          </h3>
          <div className="space-y-3">
            {products
              .filter(p => p.stock <= p.minStockLevel)
              .slice(0, 4)
              .map(product => (
                <div key={product.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 text-sm">{product.name}</div>
                      <div className="text-xs text-gray-500">{product.sku}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      product.stock === 0 ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {product.stock} left
                    </span>
                    <button 
                      onClick={() => handleQuickReorder(product.id)}
                      className="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 transition"
                    >
                      Order {product.reorderQuantity}
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Clock className="text-red-600" size={20} />
            Recent Activities
          </h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-full">
                <CheckCircle size={16} className="text-green-600" />
              </div>
              <div>
                <p className="text-sm">Nike Air Max 270 restocked (20 units)</p>
                <p className="text-xs text-gray-500">Shelf A1 • 10 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-full">
                <XCircle size={16} className="text-red-600" />
              </div>
              <div>
                <p className="text-sm">Puma RS-X went out of stock</p>
                <p className="text-xs text-gray-500">Shelf A1 • 2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-full">
                <Truck size={16} className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm">New shipment received (Section B2)</p>
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