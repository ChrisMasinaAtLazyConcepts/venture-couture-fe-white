import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, X, Grid, List, SlidersHorizontal, Palette, Crown, Sparkles } from 'lucide-react';
import ProductCard from '../components/ProductCard';

interface ProductWithImage {
  id: string;
  name: string;
  category: string;
  category_id: string;
  description: string;
  base_price: number;
  sale_price: number;
  sku: string;
  brand: string;
  image_url: string;
  discount_percentage: number;
  rating: number;
  is_active: boolean;
  is_featured: boolean;
  slug: string;
  created_at: string;
  updated_at: string;
  sizes: string[];
  colors?: string[];
}

// MEN'S FASHION DUMMY DATA
const dummyProducts: ProductWithImage[] = [
  {
    id: '1',
    name: 'Classic Denim Jacket',
    category: 'Jackets',
    category_id: 'cat_jkt_001',
    description: 'Premium quality denim jacket for everyday wear',
    base_price: 89.99,
    sale_price: 69.99,
    sku: 'DJKT-CLASSIC',
    brand: 'Levi\'s',
    image_url: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=800',
    discount_percentage: 22,
    rating: 4.7,
    is_active: true,
    is_featured: true,
    slug: 'classic-denim-jacket',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Blue', 'Black', 'Gray']
  },
  {
    id: '2',
    name: 'Premium Leather Boots',
    category: 'Shoes',
    category_id: 'cat_shoes_001',
    description: 'Handcrafted leather boots with durable soles',
    base_price: 149.99,
    sale_price: 119.99,
    sku: 'BOOT-PREMIUM',
    brand: 'Timberland',
    image_url: 'https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800',
    discount_percentage: 20,
    rating: 4.9,
    is_active: true,
    is_featured: true,
    slug: 'premium-leather-boots',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    sizes: ['8', '9', '10', '11', '12'],
    colors: ['Brown', 'Black', 'Tan']
  },
  {
    id: '3',
    name: 'Casual Polo Shirt',
    category: 'T-Shirts',
    category_id: 'cat_tshirt_001',
    description: 'Comfortable cotton polo for casual occasions',
    base_price: 39.99,
    sale_price: 29.99,
    sku: 'POLO-CASUAL',
    brand: 'Ralph Lauren',
    image_url: 'https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?auto=compress&cs=tinysrgb&w=800',
    discount_percentage: 25,
    rating: 4.5,
    is_active: true,
    is_featured: false,
    slug: 'casual-polo-shirt',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['White', 'Navy', 'Black', 'Gray']
  },
  {
    id: '4',
    name: 'Tailored Wool Suit',
    category: 'Formal Wear',
    category_id: 'cat_formal_001',
    description: 'Elegant wool suit for formal occasions',
    base_price: 299.99,
    sale_price: 249.99,
    sku: 'SUIT-WOOL-01',
    brand: 'Hugo Boss',
    image_url: 'https://images.pexels.com/photos/3731256/pexels-photo-3731256.jpeg?auto=compress&cs=tinysrgb&w=800',
    discount_percentage: 17,
    rating: 4.8,
    is_active: true,
    is_featured: true,
    slug: 'tailored-wool-suit',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    sizes: ['M', 'L', 'XL'],
    colors: ['Navy', 'Charcoal', 'Black']
  },
  {
    id: '5',
    name: 'Athletic Jogger Pants',
    category: 'Pants',
    category_id: 'cat_pants_001',
    description: 'Performance joggers for active lifestyle',
    base_price: 59.99,
    sale_price: 44.99,
    sku: 'JOGGER-ATH',
    brand: 'Nike',
    image_url: 'https://images.pexels.com/photos/4066288/pexels-photo-4066288.jpeg?auto=compress&cs=tinysrgb&w=800',
    discount_percentage: 25,
    rating: 4.6,
    is_active: true,
    is_featured: false,
    slug: 'athletic-jogger-pants',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Gray', 'Navy']
  },
  {
    id: '6',
    name: 'Winter Parka Jacket',
    category: 'Jackets',
    category_id: 'cat_jkt_002',
    description: 'Heavy-duty winter parka with fur hood',
    base_price: 199.99,
    sale_price: 159.99,
    sku: 'PARKA-WINTER',
    brand: 'The North Face',
    image_url: 'https://images.pexels.com/photos/1300550/pexels-photo-1300550.jpeg?auto=compress&cs=tinysrgb&w=800',
    discount_percentage: 20,
    rating: 4.9,
    is_active: true,
    is_featured: true,
    slug: 'winter-parka-jacket',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Navy', 'Green']
  },
  {
    id: '7',
    name: 'Designer Sneakers',
    category: 'Shoes',
    category_id: 'cat_shoes_002',
    description: 'Limited edition designer sneakers',
    base_price: 249.99,
    sale_price: 199.99,
    sku: 'SNEAKER-DESIGN',
    brand: 'Balenciaga',
    image_url: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800',
    discount_percentage: 20,
    rating: 4.8,
    is_active: true,
    is_featured: true,
    slug: 'designer-sneakers',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    sizes: ['8', '9', '10', '11'],
    colors: ['White', 'Black', 'Gray']
  },
  {
    id: '8',
    name: 'Cashmere Sweater',
    category: 'Sweaters',
    category_id: 'cat_swt_001',
    description: 'Luxury cashmere sweater for cold weather',
    base_price: 129.99,
    sale_price: 99.99,
    sku: 'SWT-CASHMERE',
    brand: 'Brunello Cucinelli',
    image_url: 'https://images.pexels.com/photos/2065195/pexels-photo-2065195.jpeg?auto=compress&cs=tinysrgb&w=800',
    discount_percentage: 23,
    rating: 4.7,
    is_active: true,
    is_featured: false,
    slug: 'cashmere-sweater',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    sizes: ['S', 'M', 'L'],
    colors: ['Beige', 'Gray', 'Navy']
  }
];

const MensPage: React.FC = () => {
  const [products, setProducts] = useState<ProductWithImage[]>(dummyProducts);
  const [filteredProducts, setFilteredProducts] = useState<ProductWithImage[]>(dummyProducts);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  const availableColors = [
    { name: 'Black', hex: '#000000' },
    { name: 'White', hex: '#FFFFFF' },
    { name: 'Gray', hex: '#808080' },
    { name: 'Navy', hex: '#000080' },
    { name: 'Blue', hex: '#0000FF' },
    { name: 'Brown', hex: '#A52A2A' },
    { name: 'Green', hex: '#008000' },
    { name: 'Beige', hex: '#F5F5DC' },
    { name: 'Tan', hex: '#D2B48C' },
    { name: 'Charcoal', hex: '#36454F' }
  ];

  // Men's specific categories
  const categories = ['All', 'Jackets', 'Shoes', 'T-Shirts', 'Formal Wear', 'Pants', 'Sweaters', 'Accessories'];
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '8', '9', '10', '11', '12'];
  const brands = ['Levi\'s', 'Timberland', 'Ralph Lauren', 'Hugo Boss', 'Nike', 'The North Face', 'Balenciaga', 'Brunello Cucinelli', 'Adidas', 'Tommy Hilfiger'];

  useEffect(() => {
    // Apply initial filters on page load
    applyFiltersAndSort();
  }, []);

  useEffect(() => {
    // Apply filters whenever filter criteria change
    applyFiltersAndSort();
  }, [searchTerm, sortBy, priceRange, selectedCategory, selectedSizes, selectedBrands, selectedColors]);

  function applyFiltersAndSort() {
    let filtered = [...dummyProducts];

    // Search filter
    if (searchTerm.trim()) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter - ALL products are men's products by default
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => 
        product.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Price range filter
    filtered = filtered.filter(product => {
      const price = product.sale_price || product.base_price;
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // Size filter
    if (selectedSizes.length > 0) {
      filtered = filtered.filter(product => 
        product.sizes && product.sizes.some((size: string) => selectedSizes.includes(size))
      );
    }

    // Brand filter
    if (selectedBrands.length > 0) {
      filtered = filtered.filter(product => 
        product.brand && selectedBrands.includes(product.brand)
      );
    }

    // Color filter
    if (selectedColors.length > 0) {
      filtered = filtered.filter(product => 
        product.colors && product.colors.some((color: string) => 
          selectedColors.includes(color)
        )
      );
    }

    // Sort results
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => (a.sale_price || a.base_price) - (b.sale_price || b.base_price));
        break;
      case 'price-high':
        filtered.sort((a, b) => (b.sale_price || b.base_price) - (a.sale_price || a.base_price));
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'rating':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      default:
        filtered.sort((a, b) => (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0));
    }

    setFilteredProducts(filtered);
    setProducts(dummyProducts); // Set products state for reference
  }

  const toggleSize = (size: string) => {
    setSelectedSizes(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const toggleColor = (colorName: string) => {
    setSelectedColors(prev =>
      prev.includes(colorName) ? prev.filter(c => c !== colorName) : [...prev, colorName]
    );
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedSizes([]);
    setSelectedBrands([]);
    setSelectedColors([]);
    setPriceRange([0, 500]);
    setSortBy('featured');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Page Title Section with Red & White Theme */}
      <section className="bg-gradient-to-b from-white to-red-50 border-b border-red-100 pt-12 pb-8 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-64 h-64 bg-red-600 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-red-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center justify-center mb-4">
              <span className="bg-gradient-to-r from-red-600 to-red-800 text-white px-6 py-2 rounded-full text-sm font-bold tracking-wider uppercase flex items-center gap-2 shadow-lg">
                <Sparkles size={14} />
                Exclusive Men's Collection
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight">
              <span className="bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
                Men's Fashion
              </span>
              <span className="block text-2xl md:text-3xl text-gray-700 mt-2 font-normal">
                Redefining Style & Sophistication
              </span>
            </h1>
            
            <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto mb-6">
              Curated collection of premium menswear. From boardroom elegance to weekend casual.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <div className="bg-white border border-red-200 shadow-sm px-6 py-3 rounded-xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <span className="text-red-600 font-bold text-lg">{dummyProducts.length}</span>
                </div>
                <div className="text-left">
                  <div className="text-gray-500 text-xs">Premium Items</div>
                  <div className="text-gray-900 font-semibold">Handpicked Selection</div>
                </div>
              </div>
              
              <div className="bg-white border border-red-200 shadow-sm px-6 py-3 rounded-xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <span className="text-red-600 font-bold text-lg">20+</span>
                </div>
                <div className="text-left">
                  <div className="text-gray-500 text-xs">Top Brands</div>
                  <div className="text-gray-900 font-semibold">World-Class Designers</div>
                </div>
              </div>
              
              <div className="bg-white border border-red-200 shadow-sm px-6 py-3 rounded-xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <span className="text-red-600 font-bold text-lg">4.8</span>
                </div>
                <div className="text-left">
                  <div className="text-gray-500 text-xs">Avg Rating</div>
                  <div className="text-gray-900 font-semibold">★★★★★</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search Section - Red & White Theme */}
      <section className="bg-white py-8">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <div className="relative">
              <div className="absolute left-6 top-1/2 -translate-y-1/2 flex items-center">
                <Search className="text-red-500" size={28} />
                <div className="ml-3 w-px h-6 bg-red-200"></div>
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search men's fashion: jackets, shoes, suits, accessories..."
                className="w-full pl-24 pr-12 py-5 text-lg rounded-xl border-2 border-red-200 focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all duration-200 shadow-sm bg-white"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-600 transition"
                >
                  <X size={24} />
                </button>
              )}
            </div>
            
            <div className="flex flex-wrap gap-3 mt-4 justify-center">
              <span className="text-sm text-gray-600">Browse by:</span>
              {['Jackets', 'Shoes', 'Suits', 'Sweaters', 'Pants', 'Accessories', 'Formal', 'Casual'].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => setSearchTerm(suggestion)}
                  className="text-sm bg-red-50 hover:bg-red-100 text-red-700 hover:text-red-900 border border-red-200 px-3 py-1.5 rounded-lg transition-colors font-medium"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar - Red & White Theme */}
          <aside className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white p-6 rounded-xl shadow-sm border border-red-100 sticky top-24"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 flex items-center">
                  <Filter className="mr-2 text-red-600" size={20} />
                  Refine Results
                </h3>
                <button
                  onClick={clearFilters}
                  className="text-sm text-red-600 hover:text-red-800 font-medium bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition"
                >
                  Clear All
                </button>
              </div>

              <div className="space-y-6">
                {/* Categories */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">Categories</label>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category.toLowerCase())}
                        className={`block w-full text-left px-3 py-2.5 rounded-lg transition ${
                          selectedCategory === category.toLowerCase()
                            ? 'bg-red-600 text-white font-semibold border border-red-600'
                            : 'text-gray-700 hover:bg-red-50 border border-gray-200 hover:border-red-300'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    Price Range - R{priceRange[1]}
                  </label>
                  <div className="space-y-3">
                    <input
                      type="range"
                      min="0"
                      max="500"
                      step="50"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                      className="w-full accent-red-600"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>R0</span>
                      <span className="font-bold text-red-600">R{priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                {/* Sizes */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">Sizes</label>
                  <div className="flex flex-wrap gap-2">
                    {sizes.map(size => (
                      <button
                        key={size}
                        onClick={() => toggleSize(size)}
                        className={`px-4 py-2 border-2 rounded-lg font-medium transition-all ${
                          selectedSizes.includes(size)
                            ? 'border-red-600 bg-red-600 text-white'
                            : 'border-gray-300 text-gray-700 hover:border-red-400 bg-white'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Colors */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center">
                    <Palette className="mr-2 text-red-600" size={16} />
                    Colors
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {availableColors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => toggleColor(color.name)}
                        className="flex flex-col items-center group"
                      >
                        <div
                          className={`w-10 h-10 rounded-full border-2 transition-all duration-200 ${
                            selectedColors.includes(color.name)
                              ? 'ring-2 ring-offset-2 ring-red-600 border-white shadow-md scale-110'
                              : 'border-gray-200 group-hover:scale-110'
                          }`}
                          style={{ backgroundColor: color.hex }}
                          title={color.name}
                        />
                        <span className={`text-xs mt-1 transition-colors ${
                          selectedColors.includes(color.name)
                            ? 'text-red-600 font-medium'
                            : 'text-gray-600'
                        }`}>
                          {color.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Brands */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">Brands</label>
                  <div className="space-y-2">
                    {brands.map(brand => (
                      <label key={brand} className="flex items-center space-x-3 p-2 hover:bg-red-50 rounded-lg cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedBrands.includes(brand)}
                          onChange={() => toggleBrand(brand)}
                          className="rounded border-gray-300 text-red-600 focus:ring-red-600"
                        />
                        <span className="text-gray-700">{brand}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </aside>

          {/* Products Section */}
          <div className="flex-1">
            {/* Controls Bar */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4"
            >
              <div className="flex items-center gap-4">
                <p className="text-gray-600">
                  <span className="font-bold text-gray-900">{filteredProducts.length}</span> premium items
                </p>
                {(searchTerm || selectedCategory !== 'all' || selectedSizes.length > 0 || selectedBrands.length > 0 || selectedColors.length > 0 || priceRange[1] < 500) && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-red-600 hover:text-red-800 font-medium bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition"
                  >
                    Clear filters
                  </button>
                )}
              </div>

              <div className="flex items-center gap-4">
                {/* View Toggle */}
                <div className="flex bg-white rounded-lg border border-red-200 p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-md transition ${
                      viewMode === 'grid' 
                        ? 'bg-red-600 text-white' 
                        : 'text-gray-600 hover:text-red-600'
                    }`}
                  >
                    <Grid size={20} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-md transition ${
                      viewMode === 'list' 
                        ? 'bg-red-600 text-white' 
                        : 'text-gray-600 hover:text-red-600'
                    }`}
                  >
                    <List size={20} />
                  </button>
                </div>

                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-red-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 bg-white text-gray-700"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name: A to Z</option>
                  <option value="rating">Highest Rated</option>
                </select>

                {/* Mobile Filter Toggle */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden flex items-center gap-2 bg-red-600 text-white px-4 py-2.5 rounded-lg font-bold hover:bg-red-700 transition"
                >
                  <SlidersHorizontal size={18} />
                  Filters
                </button>
              </div>
            </motion.div>

            {/* Active Filters Display */}
            {(selectedSizes.length > 0 || selectedBrands.length > 0 || selectedColors.length > 0) && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 flex flex-wrap gap-2"
              >
                {selectedColors.map(color => (
                  <div key={color} className="flex items-center bg-red-50 text-red-700 px-3 py-1.5 rounded-lg text-sm border border-red-200">
                    <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: availableColors.find(c => c.name === color)?.hex }} />
                    {color}
                    <button onClick={() => toggleColor(color)} className="ml-2 text-red-800 hover:text-red-900">
                      <X size={14} />
                    </button>
                  </div>
                ))}
                {selectedSizes.map(size => (
                  <div key={size} className="flex items-center bg-red-50 text-red-700 px-3 py-1.5 rounded-lg text-sm border border-red-200">
                    Size: {size}
                    <button onClick={() => toggleSize(size)} className="ml-2 text-red-800 hover:text-red-900">
                      <X size={14} />
                    </button>
                  </div>
                ))}
                {selectedBrands.map(brand => (
                  <div key={brand} className="flex items-center bg-red-50 text-red-700 px-3 py-1.5 rounded-lg text-sm border border-red-200">
                    {brand}
                    <button onClick={() => toggleBrand(brand)} className="ml-2 text-red-800 hover:text-red-900">
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </motion.div>
            )}

            {/* Products Grid/List */}
            {loading ? (
              <div className="text-center py-20">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
                <p className="mt-4 text-gray-600">Loading products...</p>
              </div>
            ) : filteredProducts.length > 0 ? (
              <motion.div
                layout
                className={viewMode === 'grid' 
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                  : 'space-y-6'
                }
              >
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    price={product.base_price}
                    salePrice={product.sale_price}
                    imageUrl={product.image_url}
                    slug={product.slug}
                    isFeatured={product.is_featured}
                    colors={product.colors}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <div className="bg-white rounded-xl shadow-sm border border-red-100 p-12 max-w-md mx-auto">
                  <Search className="mx-auto text-red-200 mb-4" size={64} />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">No products match your search</h3>
                  <p className="text-gray-600 mb-8">Try adjusting your filters or search terms</p>
                  <button
                    onClick={clearFilters}
                    className="bg-red-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-red-700 transition w-full"
                  >
                    Reset All Filters
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MensPage;