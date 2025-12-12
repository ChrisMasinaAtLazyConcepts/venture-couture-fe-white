import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, X, Grid, List, SlidersHorizontal, Palette, Sparkles, Tag } from 'lucide-react';
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

// ACCESSORIES DUMMY DATA
const dummyProducts: ProductWithImage[] = [
  {
    id: 'acc1',
    name: 'Designer Leather Handbag',
    category: 'Bags',
    category_id: 'cat_bag_001',
    description: 'Premium leather handbag with gold hardware',
    base_price: 199.99,
    sale_price: 149.99,
    sku: 'BAG-LEATHER-01',
    brand: 'Coach',
    image_url: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=800',
    discount_percentage: 25,
    rating: 4.9,
    is_active: true,
    is_featured: true,
    slug: 'designer-leather-handbag',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    sizes: ['One Size'],
    colors: ['Black', 'Brown', 'Navy', 'Red']
  },
  {
    id: 'acc2',
    name: 'Luxury Stainless Steel Watch',
    category: 'Watches',
    category_id: 'cat_watch_001',
    description: 'Elegant stainless steel watch with leather strap',
    base_price: 299.99,
    sale_price: 249.99,
    sku: 'WATCH-SS-01',
    brand: 'Fossil',
    image_url: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=800',
    discount_percentage: 17,
    rating: 4.8,
    is_active: true,
    is_featured: true,
    slug: 'luxury-stainless-steel-watch',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    sizes: ['One Size'],
    colors: ['Silver', 'Gold', 'Rose Gold', 'Black']
  },
  {
    id: 'acc3',
    name: 'Sunglasses Polarized',
    category: 'Eyewear',
    category_id: 'cat_eyewear_001',
    description: 'Polarized sunglasses with UV protection',
    base_price: 89.99,
    sale_price: 69.99,
    sku: 'SUNGLASSES-01',
    brand: 'Ray-Ban',
    image_url: 'https://images.pexels.com/photos/157675/fashion-men-s-individuality-black-and-white-157675.jpeg?auto=compress&cs=tinysrgb&w=800',
    discount_percentage: 22,
    rating: 4.7,
    is_active: true,
    is_featured: false,
    slug: 'sunglasses-polarized',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    sizes: ['One Size'],
    colors: ['Black', 'Brown', 'Tortoise', 'Gold']
  },
  {
    id: 'acc4',
    name: 'Designer Silk Scarf',
    category: 'Scarves',
    category_id: 'cat_scarf_001',
    description: 'Luxury silk scarf with printed pattern',
    base_price: 59.99,
    sale_price: 44.99,
    sku: 'SCARF-SILK-01',
    brand: 'Hermès',
    image_url: 'https://images.pexels.com/photos/137603/pexels-photo-137603.jpeg?auto=compress&cs=tinysrgb&w=800',
    discount_percentage: 25,
    rating: 4.6,
    is_active: true,
    is_featured: true,
    slug: 'designer-silk-scarf',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    sizes: ['One Size'],
    colors: ['Multicolor', 'Blue', 'Red', 'Green']
  },
  {
    id: 'acc5',
    name: 'Leather Wallet with RFID',
    category: 'Wallets',
    category_id: 'cat_wallet_001',
    description: 'Genuine leather wallet with RFID protection',
    base_price: 49.99,
    sale_price: 39.99,
    sku: 'WALLET-LEATHER-01',
    brand: 'Bellroy',
    image_url: 'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=800',
    discount_percentage: 20,
    rating: 4.5,
    is_active: true,
    is_featured: false,
    slug: 'leather-wallet-rfid',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    sizes: ['One Size'],
    colors: ['Brown', 'Black', 'Tan', 'Navy']
  },
  {
    id: 'acc6',
    name: 'Silver Jewelry Set',
    category: 'Jewelry',
    category_id: 'cat_jewelry_001',
    description: 'Elegant silver necklace and earrings set',
    base_price: 79.99,
    sale_price: 59.99,
    sku: 'JEWELRY-SET-01',
    brand: 'Pandora',
    image_url: 'https://images.pexels.com/photos/884979/pexels-photo-884979.jpeg?auto=compress&cs=tinysrgb&w=800',
    discount_percentage: 25,
    rating: 4.8,
    is_active: true,
    is_featured: true,
    slug: 'silver-jewelry-set',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    sizes: ['One Size'],
    colors: ['Silver', 'Gold', 'Rose Gold']
  },
  {
    id: 'acc7',
    name: 'Designer Belt',
    category: 'Belts',
    category_id: 'cat_belt_001',
    description: 'Genuine leather belt with metal buckle',
    base_price: 69.99,
    sale_price: 49.99,
    sku: 'BELT-LEATHER-01',
    brand: 'Gucci',
    image_url: 'https://images.pexels.com/photos/325876/pexels-photo-325876.jpeg?auto=compress&cs=tinysrgb&w=800',
    discount_percentage: 29,
    rating: 4.7,
    is_active: true,
    is_featured: false,
    slug: 'designer-belt',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Brown', 'Tan']
  },
  {
    id: 'acc8',
    name: 'Beanie Wool Blend',
    category: 'Hats',
    category_id: 'cat_hat_001',
    description: 'Warm wool blend beanie for winter',
    base_price: 29.99,
    sale_price: 19.99,
    sku: 'BEANIE-WOOL-01',
    brand: 'Carhartt',
    image_url: 'https://images.pexels.com/photos/35185/hats-fedora-hat-manufacture-stack.jpg?auto=compress&cs=tinysrgb&w=800',
    discount_percentage: 33,
    rating: 4.6,
    is_active: true,
    is_featured: true,
    slug: 'beanie-wool-blend',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    sizes: ['One Size'],
    colors: ['Black', 'Gray', 'Navy', 'Burgundy']
  }
];

const AccessoriesPage: React.FC = () => {
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

  // Accessories specific colors
  const availableColors = [
    { name: 'Black', hex: '#000000' },
    { name: 'Brown', hex: '#A52A2A' },
    { name: 'Silver', hex: '#C0C0C0' },
    { name: 'Gold', hex: '#FFD700' },
    { name: 'Navy', hex: '#000080' },
    { name: 'Red', hex: '#FF0000' },
    { name: 'Tan', hex: '#D2B48C' },
    { name: 'Gray', hex: '#808080' },
    { name: 'Rose Gold', hex: '#E0BFB8' },
    { name: 'Blue', hex: '#0000FF' },
    { name: 'Green', hex: '#008000' },
    { name: 'Burgundy', hex: '#800020' },
    { name: 'Multicolor', hex: 'linear-gradient(45deg, #FF0000, #00FF00, #0000FF)' }
  ];

  // Accessories specific categories
  const categories = ['All', 'Bags', 'Watches', 'Eyewear', 'Scarves', 'Wallets', 'Jewelry', 'Belts', 'Hats'];
  const sizes = ['One Size', 'S', 'M', 'L', 'XL', 'XXL'];
  const brands = ['Coach', 'Fossil', 'Ray-Ban', 'Hermès', 'Bellroy', 'Pandora', 'Gucci', 'Carhartt', 'Michael Kors', 'Kate Spade', 'Tiffany & Co.'];

  useEffect(() => {
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

    // Category filter
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
    setProducts(dummyProducts);
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
      {/* Page Title Section with Teal & White Theme */}
      <section className="bg-gradient-to-b from-white to-teal-50 border-b border-teal-100 pt-12 pb-8 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-64 h-64 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center justify-center mb-4">
              <span className="bg-gradient-to-r from-teal-500 to-teal-700 text-white px-6 py-2 rounded-full text-sm font-bold tracking-wider uppercase flex items-center gap-2 shadow-lg">
                <Tag size={14} />
                Premium Accessories Collection
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight">
              <span className="bg-gradient-to-r from-teal-500 to-teal-700 bg-clip-text text-transparent">
                Accessories
              </span>
              <span className="block text-2xl md:text-3xl text-gray-700 mt-2 font-normal">
                Complete Your Look with Style
              </span>
            </h1>
            
            <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto mb-6">
              Curated collection of premium accessories. From statement pieces to everyday essentials.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <div className="bg-white border border-teal-200 shadow-sm px-6 py-3 rounded-xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
                  <span className="text-teal-600 font-bold text-lg">{dummyProducts.length}</span>
                </div>
                <div className="text-left">
                  <div className="text-gray-500 text-xs">Premium Items</div>
                  <div className="text-gray-900 font-semibold">Handpicked Selection</div>
                </div>
              </div>
              
              <div className="bg-white border border-teal-200 shadow-sm px-6 py-3 rounded-xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
                  <Sparkles className="text-teal-600" size={20} />
                </div>
                <div className="text-left">
                  <div className="text-gray-500 text-xs">Top Brands</div>
                  <div className="text-gray-900 font-semibold">Designer Quality</div>
                </div>
              </div>
              
              <div className="bg-white border border-teal-200 shadow-sm px-6 py-3 rounded-xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
                  <span className="text-teal-600 font-bold text-lg">4.7</span>
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

      {/* Search Section - Teal & White Theme */}
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
                <Search className="text-teal-500" size={28} />
                <div className="ml-3 w-px h-6 bg-teal-200"></div>
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search accessories: watches, bags, jewelry, sunglasses..."
                className="w-full pl-24 pr-12 py-5 text-lg rounded-xl border-2 border-teal-200 focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all duration-200 shadow-sm bg-white"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 hover:text-teal-600 transition"
                >
                  <X size={24} />
                </button>
              )}
            </div>
            
            <div className="flex flex-wrap gap-3 mt-4 justify-center">
              <span className="text-sm text-gray-600">Browse by:</span>
              {['Watches', 'Bags', 'Jewelry', 'Sunglasses', 'Wallets', 'Scarves', 'Belts', 'Hats'].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => setSearchTerm(suggestion)}
                  className="text-sm bg-teal-50 hover:bg-teal-100 text-teal-700 hover:text-teal-900 border border-teal-200 px-3 py-1.5 rounded-lg transition-colors font-medium"
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
          {/* Filters Sidebar - Teal & White Theme */}
          <aside className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white p-6 rounded-xl shadow-sm border border-teal-100 sticky top-24"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 flex items-center">
                  <Filter className="mr-2 text-teal-600" size={20} />
                  Refine Results
                </h3>
                <button
                  onClick={clearFilters}
                  className="text-sm text-teal-600 hover:text-teal-800 font-medium bg-teal-50 hover:bg-teal-100 px-3 py-1.5 rounded-lg transition"
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
                            ? 'bg-teal-600 text-white font-semibold border border-teal-600'
                            : 'text-gray-700 hover:bg-teal-50 border border-gray-200 hover:border-teal-300'
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
                      className="w-full accent-teal-600"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>R0</span>
                      <span className="font-bold text-teal-600">R{priceRange[1]}</span>
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
                            ? 'border-teal-600 bg-teal-600 text-white'
                            : 'border-gray-300 text-gray-700 hover:border-teal-400 bg-white'
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
                    <Palette className="mr-2 text-teal-600" size={16} />
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
                              ? 'ring-2 ring-offset-2 ring-teal-600 border-white shadow-md scale-110'
                              : 'border-gray-200 group-hover:scale-110'
                          }`}
                          style={color.name === 'Multicolor' 
                            ? { background: color.hex as string }
                            : { backgroundColor: color.hex }
                          }
                          title={color.name}
                        />
                        <span className={`text-xs mt-1 transition-colors ${
                          selectedColors.includes(color.name)
                            ? 'text-teal-600 font-medium'
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
                      <label key={brand} className="flex items-center space-x-3 p-2 hover:bg-teal-50 rounded-lg cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedBrands.includes(brand)}
                          onChange={() => toggleBrand(brand)}
                          className="rounded border-gray-300 text-teal-600 focus:ring-teal-600"
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
                  <span className="font-bold text-gray-900">{filteredProducts.length}</span> premium accessories
                </p>
                {(searchTerm || selectedCategory !== 'all' || selectedSizes.length > 0 || selectedBrands.length > 0 || selectedColors.length > 0 || priceRange[1] < 500) && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-teal-600 hover:text-teal-800 font-medium bg-teal-50 hover:bg-teal-100 px-3 py-1.5 rounded-lg transition"
                  >
                    Clear filters
                  </button>
                )}
              </div>

              <div className="flex items-center gap-4">
                {/* View Toggle */}
                <div className="flex bg-white rounded-lg border border-teal-200 p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-md transition ${
                      viewMode === 'grid' 
                        ? 'bg-teal-600 text-white' 
                        : 'text-gray-600 hover:text-teal-600'
                    }`}
                  >
                    <Grid size={20} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-md transition ${
                      viewMode === 'list' 
                        ? 'bg-teal-600 text-white' 
                        : 'text-gray-600 hover:text-teal-600'
                    }`}
                  >
                    <List size={20} />
                  </button>
                </div>

                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-teal-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 bg-white text-gray-700"
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
                  className="lg:hidden flex items-center gap-2 bg-teal-600 text-white px-4 py-2.5 rounded-lg font-bold hover:bg-teal-700 transition"
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
                  <div key={color} className="flex items-center bg-teal-50 text-teal-700 px-3 py-1.5 rounded-lg text-sm border border-teal-200">
                    {color === 'Multicolor' ? (
                      <div className="w-3 h-3 rounded-full mr-2 bg-gradient-to-r from-red-500 via-green-500 to-blue-500" />
                    ) : (
                      <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: availableColors.find(c => c.name === color)?.hex }} />
                    )}
                    {color}
                    <button onClick={() => toggleColor(color)} className="ml-2 text-teal-800 hover:text-teal-900">
                      <X size={14} />
                    </button>
                  </div>
                ))}
                {selectedSizes.map(size => (
                  <div key={size} className="flex items-center bg-teal-50 text-teal-700 px-3 py-1.5 rounded-lg text-sm border border-teal-200">
                    Size: {size}
                    <button onClick={() => toggleSize(size)} className="ml-2 text-teal-800 hover:text-teal-900">
                      <X size={14} />
                    </button>
                  </div>
                ))}
                {selectedBrands.map(brand => (
                  <div key={brand} className="flex items-center bg-teal-50 text-teal-700 px-3 py-1.5 rounded-lg text-sm border border-teal-200">
                    {brand}
                    <button onClick={() => toggleBrand(brand)} className="ml-2 text-teal-800 hover:text-teal-900">
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </motion.div>
            )}

            {/* Products Grid/List */}
            {loading ? (
              <div className="text-center py-20">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
                <p className="mt-4 text-gray-600">Loading accessories...</p>
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
                <div className="bg-white rounded-xl shadow-sm border border-teal-100 p-12 max-w-md mx-auto">
                  <Search className="mx-auto text-teal-200 mb-4" size={64} />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">No accessories match your search</h3>
                  <p className="text-gray-600 mb-8">Try adjusting your filters or search terms</p>
                  <button
                    onClick={clearFilters}
                    className="bg-teal-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-teal-700 transition w-full"
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

export default AccessoriesPage;