import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, X, Grid, List, SlidersHorizontal } from 'lucide-react';
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
}

// Dummy products list with fashion items including Hoodies and Drip category
const dummyProducts: ProductWithImage[] = [
  {
    id: '1',
    name: 'Oversized Graphic Hoodie',
    category: 'Hoodies',
    category_id: 'cat_hood_001',
    description: 'Comfortable oversized hoodie with bold streetwear graphic',
    base_price: 89.99,
    sale_price: 69.99,
    sku: 'HOOD-OV-GRAPH',
    brand: 'Supreme',
    image_url: 'https://images.pexels.com/photos/1472393/pexels-photo-1472393.jpeg?auto=compress&cs=tinysrgb&w=800',
    discount_percentage: 22,
    rating: 4.8,
    is_active: true,
    is_featured: true,
    slug: 'oversized-graphic-hoodie',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: '2',
    name: 'Varsity Jacket with Patches',
    category: 'Drip',
    category_id: 'cat_drip_001',
    description: 'Classic varsity jacket with custom hiphop patches',
    base_price: 129.99,
    sale_price: 99.99,
    sku: 'VARS-PATCH-01',
    brand: 'BAPE',
    image_url: 'https://images.pexels.com/photos/18160844/pexels-photo-18160844/free-photo-of-fashionable-man-in-leather-jacket.jpeg?auto=compress&cs=tinysrgb&w=800',
    discount_percentage: 23,
    rating: 4.7,
    is_active: true,
    is_featured: true,
    slug: 'varsity-jacket-patches',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    sizes: ['M', 'L', 'XL']
  },
  {
    id: '3',
    name: 'Cargo Pants with Chains',
    category: 'Drip',
    category_id: 'cat_drip_002',
    description: 'Streetwear cargo pants with detachable chain accessories',
    base_price: 79.99,
    sale_price: 59.99,
    sku: 'CRGO-CHAIN-01',
    brand: 'OFF-WHITE',
    image_url: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=800',
    discount_percentage: 25,
    rating: 4.6,
    is_active: true,
    is_featured: false,
    slug: 'cargo-pants-chains',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    sizes: ['S', 'M', 'L', 'XL', 'XXL']
  },
  {
    id: '4',
    name: 'Premium Cashmere Hoodie',
    category: 'Hoodies',
    category_id: 'cat_hood_002',
    description: 'Luxury cashmere blend hoodie for ultimate comfort',
    base_price: 149.99,
    sale_price: 119.99,
    sku: 'HOOD-CASHM-01',
    brand: 'Fear of God',
    image_url: 'https://images.pexels.com/photos/18224541/pexels-photo-18224541/free-photo-of-man-in-gray-hoodie-and-winter-hat.jpeg?auto=compress&cs=tinysrgb&w=800',
    discount_percentage: 20,
    rating: 4.9,
    is_active: true,
    is_featured: true,
    slug: 'premium-cashmere-hoodie',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    sizes: ['XS', 'S', 'M', 'L']
  },
  {
    id: '5',
    name: 'Logo Baseball Cap',
    category: 'Drip',
    category_id: 'cat_drip_003',
    description: 'Signature logo cap with adjustable strap',
    base_price: 39.99,
    sale_price: 29.99,
    sku: 'CAP-LOGO-01',
    brand: 'New Era',
    image_url: 'https://images.pexels.com/photos/1937477/pexels-photo-1937477.jpeg?auto=compress&cs=tinysrgb&w=800',
    discount_percentage: 25,
    rating: 4.5,
    is_active: true,
    is_featured: false,
    slug: 'logo-baseball-cap',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    sizes: ['One Size']
  },
  {
    id: '6',
    name: 'Distressed Denim Hoodie',
    category: 'Hoodies',
    category_id: 'cat_hood_003',
    description: 'Denim and cotton blend hoodie with distressed details',
    base_price: 94.99,
    sale_price: 74.99,
    sku: 'HOOD-DENIM-01',
    brand: 'Levi\'s',
    image_url: 'https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?auto=compress&cs=tinysrgb&w=800',
    discount_percentage: 21,
    rating: 4.4,
    is_active: true,
    is_featured: false,
    slug: 'distressed-denim-hoodie',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    sizes: ['M', 'L', 'XL', 'XXL']
  },
  {
    id: '7',
    name: 'Chunky Sneakers',
    category: 'Drip',
    category_id: 'cat_drip_004',
    description: 'Bold chunky sneakers with platform sole',
    base_price: 129.99,
    sale_price: 99.99,
    sku: 'SNKR-CHUNKY',
    brand: 'Balenciaga',
    image_url: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800',
    discount_percentage: 23,
    rating: 4.7,
    is_active: true,
    is_featured: true,
    slug: 'chunky-sneakers',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    sizes: ['7', '8', '9', '10', '11', '12']
  },
  {
    id: '8',
    name: 'Pullover Fleece Hoodie',
    category: 'Hoodies',
    category_id: 'cat_hood_004',
    description: 'Warm fleece pullover hoodie with kangaroo pocket',
    base_price: 69.99,
    sale_price: 49.99,
    sku: 'HOOD-FLEECE',
    brand: 'Champion',
    image_url: 'https://images.pexels.com/photos/18224541/pexels-photo-18224541/free-photo-of-man-in-gray-hoodie-and-winter-hat.jpeg?auto=compress&cs=tinysrgb&w=800',
    discount_percentage: 29,
    rating: 4.6,
    is_active: true,
    is_featured: false,
    slug: 'pullover-fleece-hoodie',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: '9',
    name: 'Chain Necklace Set',
    category: 'Drip',
    category_id: 'cat_drip_005',
    description: 'Layered chain necklaces in gold and silver tones',
    base_price: 59.99,
    sale_price: 44.99,
    sku: 'NECK-CHAIN',
    brand: 'Vlone',
    image_url: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=800',
    discount_percentage: 25,
    rating: 4.3,
    is_active: true,
    is_featured: false,
    slug: 'chain-necklace-set',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    sizes: ['One Size']
  },
  {
    id: '10',
    name: 'Zipped Tech Hoodie',
    category: 'Hoodies',
    category_id: 'cat_hood_005',
    description: 'Technical fabric hoodie with full zip and multiple pockets',
    base_price: 109.99,
    sale_price: 89.99,
    sku: 'HOOD-TECH-ZIP',
    brand: 'Nike',
    image_url: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=800',
    discount_percentage: 18,
    rating: 4.5,
    is_active: true,
    is_featured: true,
    slug: 'zipped-tech-hoodie',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    sizes: ['XS', 'S', 'M', 'L', 'XL']
  },
  {
    id: '11',
    name: 'Black Bomber Jacket',
    category: 'Jackets',
    category_id: 'cat_jacket_001',
    description: 'Classic black bomber jacket with ribbed cuffs',
    base_price: 89.99,
    sale_price: 69.99,
    sku: 'BOMBER-BLK-01',
    brand: 'Alpha Industries',
    image_url: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=800',
    discount_percentage: 22,
    rating: 4.6,
    is_active: true,
    is_featured: true,
    slug: 'black-bomber-jacket',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: '12',
    name: 'Classic White Sneakers',
    category: 'Shoes',
    category_id: 'cat_shoes_001',
    description: 'Clean white leather sneakers for everyday wear',
    base_price: 79.99,
    sale_price: 59.99,
    sku: 'SNEAK-WHITE-01',
    brand: 'Adidas',
    image_url: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800',
    discount_percentage: 25,
    rating: 4.7,
    is_active: true,
    is_featured: false,
    slug: 'classic-white-sneakers',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    sizes: ['7', '8', '9', '10', '11', '12']
  }
];

const ProductSearch: React.FC = () => {
  const [products, setProducts] = useState<ProductWithImage[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductWithImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Filter states
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  // Categories and filters - Updated to include Hoodies and Drip
  const categories = ['All', 'Hoodies', 'Drip', 'T-Shirts', 'Jeans', 'Jackets', 'Shoes', 'Accessories'];
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'One Size', '7', '8', '9', '10', '11', '12'];
  const brands = ['Supreme', 'BAPE', 'OFF-WHITE', 'Fear of God', 'Balenciaga', 'Nike', 'Adidas', 'Levi\'s', 'New Era', 'Champion', 'Vlone', 'Alpha Industries'];

  useEffect(() => {
    // Immediately set products to dummy data without API call
    setProducts(dummyProducts);
    setFilteredProducts(dummyProducts);
    setLoading(false);
  }, []);

  useEffect(() => {
    applyFiltersAndSort();
  }, [products, searchTerm, sortBy, priceRange, selectedCategory, selectedSizes, selectedBrands]);

  function applyFiltersAndSort() {
    let filtered = [...products];

    // Search filter
    if (searchTerm) {
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

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedSizes([]);
    setSelectedBrands([]);
    setPriceRange([0, 500]);
    setSortBy('featured');
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero Section */}
      <div className="bg-black text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Your Style</h1>
            <p className="text-xl text-white/90 mb-8">Discover the latest fashion trends and exclusive collections</p>
          </motion.div>
        </div>
      </div>

      {/* Large Search Bar Section */}
      <section className="bg-white border-b border-gray-200 py-8">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <div className="relative">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={28} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for products, brands, categories, or styles..."
                className="w-full pl-20 pr-6 py-5 text-lg rounded-2xl border-2 border-gray-200 focus:outline-none focus:border-orange-600 focus:ring-4 focus:ring-orange-100 transition-all duration-200 shadow-lg"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                >
                  <X size={24} />
                </button>
              )}
            </div>
            
            {/* Quick Search Suggestions */}
            <div className="flex flex-wrap gap-3 mt-4 justify-center">
              <span className="text-sm text-gray-600">Popular:</span>
              {['Hoodies', 'Drip', 'Denim', 'Sneakers', 'T-Shirts', 'Accessories'].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => setSearchTerm(suggestion)}
                  className="text-sm bg-gray-100 hover:bg-orange-100 text-gray-700 hover:text-orange-700 px-3 py-1 rounded-full transition-colors"
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
          {/* Filters Sidebar */}
          <aside className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white p-6 rounded-2xl shadow-lg sticky top-24"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 flex items-center">
                  <Filter className="mr-2" size={20} />
                  Filters
                </h3>
                <button
                  onClick={clearFilters}
                  className="text-sm text-orange-600 hover:text-orange-700 font-medium"
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
                        className={`block w-full text-left px-3 py-2 rounded-lg transition ${
                          selectedCategory === category.toLowerCase()
                            ? 'bg-orange-100 text-orange-700 font-semibold'
                            : 'text-gray-700 hover:bg-gray-100'
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
                      className="w-full accent-orange-600"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>R0</span>
                      <span className="font-bold text-orange-600">R{priceRange[1]}</span>
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
                            ? 'border-orange-600 bg-orange-600 text-white'
                            : 'border-gray-300 text-gray-700 hover:border-orange-600'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Brands */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">Brands</label>
                  <div className="space-y-2">
                    {brands.map(brand => (
                      <label key={brand} className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={selectedBrands.includes(brand)}
                          onChange={() => toggleBrand(brand)}
                          className="rounded border-gray-300 text-orange-600 focus:ring-orange-600"
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
                  <span className="font-bold text-gray-900">{filteredProducts.length}</span> products found
                </p>
                {(searchTerm || selectedCategory !== 'all' || selectedSizes.length > 0 || selectedBrands.length > 0 || priceRange[1] < 500) && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-orange-600 hover:text-orange-700 font-medium"
                  >
                    Clear filters
                  </button>
                )}
              </div>

              <div className="flex items-center gap-4">
                {/* View Toggle */}
                <div className="flex bg-white rounded-lg border border-gray-200 p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-md transition ${
                      viewMode === 'grid' 
                        ? 'bg-orange-600 text-white' 
                        : 'text-gray-600 hover:text-orange-600'
                    }`}
                  >
                    <Grid size={20} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-md transition ${
                      viewMode === 'list' 
                        ? 'bg-orange-600 text-white' 
                        : 'text-gray-600 hover:text-orange-600'
                    }`}
                  >
                    <List size={20} />
                  </button>
                </div>

                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600 bg-white"
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
                  className="lg:hidden flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-orange-700 transition"
                >
                  <SlidersHorizontal size={18} />
                  Filters
                </button>
              </div>
            </motion.div>

            {/* Products Grid/List */}
            {loading ? (
              <div className="text-center py-20">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
                <p className="mt-4 text-gray-600">Loading products...</p>
              </div>
            ) : (
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
                  />
                ))}
              </motion.div>
            )}

            {/* Empty State */}
            {!loading && filteredProducts.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md mx-auto">
                  <Search className="mx-auto text-gray-300 mb-4" size={64} />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
                  <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
                  <button
                    onClick={clearFilters}
                    className="bg-orange-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-orange-700 transition"
                  >
                    Clear All Filters
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

export default ProductSearch;