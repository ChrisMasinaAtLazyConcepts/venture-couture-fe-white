import { useEffect, useState } from 'react';
import { Filter, SlidersHorizontal, X, Sparkles, TrendingUp, Clock, Star, Tag, ShoppingBag } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { supabase, Product } from '../lib/supabase';

type ProductWithImage = Product & { image_url: string };

// Updated Dummy Data for New Arrivals - Sleek & Modern
const newArrivals: ProductWithImage[] = [
  {
    id: 'na1',
    name: 'Urban Edge Hoodie',
    category: 'Streetwear',
    category_id: 'cat_streetwear_001',
    description: 'Limited edition hoodie with minimalist design and premium cotton blend',
    base_price: 1899.99,
    sale_price: 1499.99,
    sku: 'URB-HOOD-001',
    brand: 'UrbanVibe',
    image_url: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=800',
    discount_percentage: 21,
    rating: 4.9,
    is_active: true,
    is_featured: true,
    slug: 'urban-edge-hoodie',
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    updated_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    sizes: ['S', 'M', 'L', 'XL'],
    tags: ['new', 'limited', 'streetwear']
  },
  {
    id: 'na2',
    name: 'Techwear Cargo Pants',
    category: 'Streetwear',
    category_id: 'cat_streetwear_002',
    description: 'Water-resistant cargo pants with multiple utility pockets',
    base_price: 2399.99,
    sale_price: null,
    sku: 'TECH-CRG-001',
    brand: 'CyberTech',
    image_url: 'https://images.pexels.com/photos/9558699/pexels-photo-9558699.jpeg?auto=compress&cs=tinysrgb&w=800',
    discount_percentage: null,
    rating: 4.8,
    is_active: true,
    is_featured: true,
    slug: 'techwear-cargo-pants',
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    updated_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    sizes: ['28', '30', '32', '34'],
    tags: ['new', 'techwear', 'water-resistant']
  },
  {
    id: 'na3',
    name: 'Minimalist Sneakers',
    category: 'Footwear',
    category_id: 'cat_footwear_na001',
    description: 'All-white premium leather sneakers with ergonomic design',
    base_price: 2799.99,
    sale_price: 2249.99,
    sku: 'SNEAK-MIN-001',
    brand: 'PureForm',
    image_url: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800',
    discount_percentage: 20,
    rating: 4.7,
    is_active: true,
    is_featured: true,
    slug: 'minimalist-sneakers',
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    updated_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    sizes: ['7', '8', '9', '10', '11'],
    tags: ['new', 'limited', 'premium']
  },
  {
    id: 'na4',
    name: 'Smartwatch Pro',
    category: 'Tech',
    category_id: 'cat_tech_001',
    description: 'Latest generation smartwatch with health monitoring',
    base_price: 5499.99,
    sale_price: 4899.99,
    sku: 'WATCH-PRO-001',
    brand: 'TechPulse',
    image_url: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=800',
    discount_percentage: 11,
    rating: 4.9,
    is_active: true,
    is_featured: true,
    slug: 'smartwatch-pro',
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    updated_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    sizes: ['42mm', '46mm'],
    tags: ['new', 'tech', 'smartwatch']
  },
  {
    id: 'na5',
    name: 'Designer Backpack',
    category: 'Accessories',
    category_id: 'cat_accessories_na001',
    description: 'Waterproof backpack with laptop compartment and USB port',
    base_price: 3299.99,
    sale_price: 2899.99,
    sku: 'BACK-DES-001',
    brand: 'UrbanGear',
    image_url: 'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=800',
    discount_percentage: 12,
    rating: 4.6,
    is_active: true,
    is_featured: false,
    slug: 'designer-backpack',
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
    updated_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    sizes: ['One Size'],
    tags: ['new', 'waterproof', 'designer']
  },
  {
    id: 'na6',
    name: 'Wireless Earbuds Pro',
    category: 'Tech',
    category_id: 'cat_tech_002',
    description: 'Noise-cancelling wireless earbuds with 30-hour battery',
    base_price: 2399.99,
    sale_price: 1999.99,
    sku: 'BUDS-PRO-001',
    brand: 'SoundSync',
    image_url: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800',
    discount_percentage: 17,
    rating: 4.8,
    is_active: true,
    is_featured: true,
    slug: 'wireless-earbuds-pro',
    created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days ago
    updated_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    sizes: ['One Size'],
    tags: ['new', 'tech', 'audio']
  },
  {
    id: 'na7',
    name: 'Premium Denim Jacket',
    category: 'Outerwear',
    category_id: 'cat_outerwear_001',
    description: 'Raw denim jacket with custom hardware details',
    base_price: 4199.99,
    sale_price: 3599.99,
    sku: 'DENIM-JKT-001',
    brand: 'RawEdge',
    image_url: 'https://images.pexels.com/photos/1082528/pexels-photo-1082528.jpeg?auto=compress&cs=tinysrgb&w=800',
    discount_percentage: 14,
    rating: 4.7,
    is_active: true,
    is_featured: true,
    slug: 'premium-denim-jacket',
    created_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(), // 6 days ago
    updated_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    sizes: ['S', 'M', 'L', 'XL'],
    tags: ['new', 'denim', 'limited']
  },
  {
    id: 'na8',
    name: 'Gaming Keyboard',
    category: 'Tech',
    category_id: 'cat_tech_003',
    description: 'Mechanical gaming keyboard with RGB lighting',
    base_price: 1899.99,
    sale_price: 1599.99,
    sku: 'KEYB-GAM-001',
    brand: 'GameMaster',
    image_url: 'https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg?auto=compress&cs=tinysrgb&w=800',
    discount_percentage: 16,
    rating: 4.5,
    is_active: true,
    is_featured: false,
    slug: 'gaming-keyboard',
    created_at: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(), // 8 days ago
    updated_at: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    sizes: ['Standard'],
    tags: ['new', 'gaming', 'tech']
  },
  {
    id: 'na9',
    name: 'Yoga Set Bundle',
    category: 'Activewear',
    category_id: 'cat_activewear_001',
    description: 'Complete yoga set with mat, blocks, and strap',
    base_price: 2899.99,
    sale_price: 2399.99,
    sku: 'YOGA-SET-001',
    brand: 'ZenFlow',
    image_url: 'https://images.pexels.com/photos/4056535/pexels-photo-4056535.jpeg?auto=compress&cs=tinysrgb&w=800',
    discount_percentage: 17,
    rating: 4.6,
    is_active: true,
    is_featured: true,
    slug: 'yoga-set-bundle',
    created_at: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(), // 9 days ago
    updated_at: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
    sizes: ['One Size'],
    tags: ['new', 'fitness', 'bundle']
  },
  {
    id: 'na10',
    name: 'Designer Sunglasses',
    category: 'Accessories',
    category_id: 'cat_accessories_na002',
    description: 'Polarized sunglasses with UV400 protection',
    base_price: 1899.99,
    sale_price: 1499.99,
    sku: 'SUNGL-DES-001',
    brand: 'SunShield',
    image_url: 'https://images.pexels.com/photos/157675/fashion-men-s-individuality-black-and-white-157675.jpeg?auto=compress&cs=tinysrgb&w=800',
    discount_percentage: 21,
    rating: 4.8,
    is_active: true,
    is_featured: true,
    slug: 'designer-sunglasses',
    created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
    updated_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    sizes: ['One Size'],
    tags: ['new', 'accessories', 'designer']
  },
  {
    id: 'na11',
    name: 'Performance Running Shoes',
    category: 'Footwear',
    category_id: 'cat_footwear_na002',
    description: 'Lightweight running shoes with carbon fiber plate',
    base_price: 3499.99,
    sale_price: 2999.99,
    sku: 'RUN-PERF-001',
    brand: 'SpeedTech',
    image_url: 'https://images.pexels.com/photos/1599005/pexels-photo-1599005.jpeg?auto=compress&cs=tinysrgb&w=800',
    discount_percentage: 14,
    rating: 4.9,
    is_active: true,
    is_featured: true,
    slug: 'performance-running-shoes',
    created_at: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000).toISOString(), // 11 days ago
    updated_at: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000).toISOString(),
    sizes: ['7', '8', '9', '10', '11', '12'],
    tags: ['new', 'running', 'performance']
  },
  {
    id: 'na12',
    name: 'Luxury Watch',
    category: 'Accessories',
    category_id: 'cat_accessories_na003',
    description: 'Automatic mechanical watch with sapphire crystal',
    base_price: 12999.99,
    sale_price: 10999.99,
    sku: 'WATCH-LUX-001',
    brand: 'TimeMaster',
    image_url: 'https://images.pexels.com/photos/125779/pexels-photo-125779.jpeg?auto=compress&cs=tinysrgb&w=800',
    discount_percentage: 15,
    rating: 4.9,
    is_active: true,
    is_featured: true,
    slug: 'luxury-watch',
    created_at: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(), // 12 days ago
    updated_at: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    sizes: ['One Size'],
    tags: ['new', 'luxury', 'limited']
  }
];

export default function NewArrivalsPage() {
  const [products, setProducts] = useState<ProductWithImage[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductWithImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('newest');
  const [priceRange, setPriceRange] = useState([0, 15000]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  // Extract unique values from new arrivals
  const categories = Array.from(new Set(newArrivals.map(p => p.category)));
  const brands = Array.from(new Set(newArrivals.map(p => p.brand)));
  const tags = ['new', 'limited', 'premium', 'tech', 'designer', 'luxury', 'performance'];

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    applyFiltersAndSort();
  }, [products, sortBy, priceRange, selectedCategories, selectedBrands, selectedTags]);

  async function fetchProducts() {
    try {
      setLoading(true);
      // For demo purposes, we'll use dummy data
      // You can replace this with actual API call if needed
      setTimeout(() => {
        setProducts(newArrivals);
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts(newArrivals);
      setLoading(false);
    }
  }

  function applyFiltersAndSort() {
    let filtered = [...products];

    // Price filter
    filtered = filtered.filter(p => {
      const price = p.sale_price || p.base_price;
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(p => selectedCategories.includes(p.category));
    }

    // Brand filter
    if (selectedBrands.length > 0) {
      filtered = filtered.filter(p => selectedBrands.includes(p.brand));
    }

    // Tag filter
    if (selectedTags.length > 0) {
      filtered = filtered.filter(p => 
        p.tags?.some(tag => selectedTags.includes(tag))
      );
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => (a.sale_price || a.base_price) - (b.sale_price || b.base_price));
        break;
      case 'price-high':
        filtered.sort((a, b) => (b.sale_price || b.base_price) - (a.sale_price || a.base_price));
        break;
      case 'rating':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'discount':
        filtered.sort((a, b) => (b.discount_percentage || 0) - (a.discount_percentage || 0));
        break;
      case 'newest':
      default:
        // Sort by creation date (newest first)
        filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }

    setFilteredProducts(filtered);
  }

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev =>
      prev.includes(brand) 
        ? prev.filter(b => b !== brand) 
        : [...prev, brand]
    );
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setPriceRange([0, 15000]);
    setSortBy('newest');
    setSelectedCategories([]);
    setSelectedBrands([]);
    setSelectedTags([]);
  };

  // Helper function to get days since added
  const getDaysSinceAdded = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section - Sleek New Arrivals */}
      <div className="relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white py-16 md:py-24">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/50"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-pink-600 text-white px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-bold">FRESH DROPS</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tight">
              <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                New Arrivals
              </span>
              <br />
              <span className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-red-500 via-red-400 to-red-300 bg-clip-text text-transparent">
                Just Landed
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-2xl leading-relaxed">
              Discover the latest trends and exclusive drops. Fresh styles added daily from top brands worldwide.
            </p>
          
          </div>
        </div>

        {/* Floating Elements */}
      </div>

      {/* Featured Banners */}
      <div className="container mx-auto px-4 -mt-8 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-6 text-white shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-bold opacity-90">LIMITED TIME</div>
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2">Early Bird Special</h3>
            <p className="text-sm opacity-90">Get 25% off on first week arrivals</p>
          </div>
          
          <div className="bg-gradient-to-r from-gray-900 to-black rounded-2xl p-6 text-white shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-bold opacity-90">EXCLUSIVE</div>
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Star className="w-4 h-4" />
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2">Premium Collection</h3>
            <p className="text-sm opacity-90">Luxury items with lifetime warranty</p>
          </div>
          
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 text-white shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-bold opacity-90">TECH EDGE</div>
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2">Wearable Tech</h3>
            <p className="text-sm opacity-90">Latest tech innovations just arrived</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar - Sleek Design */}
          <aside className={`lg:w-80 ${showFilters ? 'fixed inset-0 z-50 bg-black/70 backdrop-blur-sm lg:static lg:bg-transparent' : 'hidden lg:block'}`}>
            <div className={`bg-white/95 backdrop-blur-sm border border-gray-200 p-6 rounded-2xl shadow-2xl lg:sticky lg:top-24 h-full lg:h-auto ${showFilters ? 'absolute top-4 left-4 right-4 bottom-4 overflow-auto lg:relative' : ''}`}>
              {/* Mobile close button */}
              {showFilters && (
                <button
                  onClick={() => setShowFilters(false)}
                  className="lg:hidden absolute top-4 right-4 text-gray-500 hover:text-gray-700 bg-white rounded-full p-2 shadow-lg"
                >
                  <X size={20} />
                </button>
              )}

              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 flex items-center">
                  <Filter className="mr-2" size={20} />
                  Refine Results
                </h3>
                {(priceRange[1] < 15000 || selectedCategories.length > 0 || selectedBrands.length > 0 || selectedTags.length > 0) && (
                  <button
                    onClick={clearFilters}
                    className="text-sm font-bold bg-gradient-to-r from-red-600 to-red-700 text-white px-3 py-1 rounded-lg hover:opacity-90 transition"
                  >
                    Clear All
                  </button>
                )}
              </div>

              <div className="space-y-8">
                {/* Sort Options */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Sort By
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { value: 'newest', label: 'Newest' },
                      { value: 'rating', label: 'Top Rated' },
                      { value: 'price-low', label: 'Price: Low' },
                      { value: 'price-high', label: 'Price: High' },
                      { value: 'discount', label: 'Best Deal' }
                    ].map(option => (
                      <button
                        key={option.value}
                        onClick={() => setSortBy(option.value)}
                        className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                          sortBy === option.value
                            ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range Filter */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    Price Range - R{priceRange[1].toLocaleString()}
                  </label>
                  <div className="space-y-3">
                    <input
                      type="range"
                      min="0"
                      max="15000"
                      step="100"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-red-600 [&::-webkit-slider-thumb]:to-red-700"
                    />
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">R0</span>
                      <span className="font-bold text-red-600">R{priceRange[1].toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Tags Filter */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">Product Tags</label>
                  <div className="flex flex-wrap gap-2">
                    {tags.map(tag => (
                      <button
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                          selectedTags.includes(tag)
                            ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {tag.charAt(0).toUpperCase() + tag.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Categories Filter */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">Categories</label>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <label key={category} className="flex items-center space-x-3 group cursor-pointer">
                        <div className="relative">
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes(category)}
                            onChange={() => toggleCategory(category)}
                            className="sr-only peer"
                          />
                          <div className="w-5 h-5 border-2 border-gray-300 rounded peer-checked:border-red-600 peer-checked:bg-red-600 transition-colors flex items-center justify-center">
                            {selectedCategories.includes(category) && (
                              <div className="w-2 h-2 bg-white rounded"></div>
                            )}
                          </div>
                        </div>
                        <span className="text-gray-700 group-hover:text-gray-900 transition">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Brands Filter */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">Brands</label>
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                    {brands.map(brand => (
                      <label key={brand} className="flex items-center space-x-3 group cursor-pointer">
                        <div className="relative">
                          <input
                            type="checkbox"
                            checked={selectedBrands.includes(brand)}
                            onChange={() => toggleBrand(brand)}
                            className="sr-only peer"
                          />
                          <div className="w-5 h-5 border-2 border-gray-300 rounded peer-checked:border-red-600 peer-checked:bg-red-600 transition-colors flex items-center justify-center">
                            {selectedBrands.includes(brand) && (
                              <div className="w-2 h-2 bg-white rounded"></div>
                            )}
                          </div>
                        </div>
                        <span className="text-gray-700 group-hover:text-gray-900 transition">{brand}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Header with Results and Filter Toggle */}
            <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 mb-8 shadow-lg">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Latest Arrivals</h2>
                  <p className="text-gray-600">
                    Showing <span className="font-bold text-red-600">{filteredProducts.length}</span> of {products.length} new products
                  </p>
                </div>
                
                <div className="flex items-center gap-4">
                  {(priceRange[1] < 15000 || selectedCategories.length > 0 || selectedBrands.length > 0 || selectedTags.length > 0) && (
                    <button
                      onClick={clearFilters}
                      className="text-sm font-bold text-red-600 hover:text-red-700 transition"
                    >
                      Clear filters
                    </button>
                  )}
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2.5 rounded-lg font-bold hover:opacity-90 transition"
                  >
                    <SlidersHorizontal size={18} />
                    {showFilters ? 'Hide Filters' : 'Show Filters'}
                  </button>
                </div>
              </div>
            </div>

            {/* Loading State */}
            {loading ? (
              <div className="text-center py-20">
                <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-red-600 border-t-transparent"></div>
                <p className="mt-4 text-gray-600 text-lg">Loading new arrivals...</p>
                <p className="text-sm text-gray-500 mt-2">Fresh products coming right up!</p>
              </div>
            ) : (
              /* Products Grid - Sleek Cards */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => {
                  const daysAgo = getDaysSinceAdded(product.created_at);
                  return (
                    <div key={product.id} className="group">
                      <div className="relative bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                        {/* New Badge */}
                        <div className="absolute top-3 left-3 z-10">
                          <div className="flex items-center gap-2">
                            {daysAgo <= 7 && (
                              <div className="bg-gradient-to-r from-red-600 to-red-700 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                                {daysAgo === 0 ? 'TODAY' : daysAgo === 1 ? 'YESTERDAY' : `${daysAgo} DAYS AGO`}
                              </div>
                            )}
                            {product.tags?.includes('limited') && (
                              <div className="bg-gradient-to-r from-gray-900 to-black text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                                LIMITED
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Discount Badge */}
                        {product.discount_percentage && (
                          <div className="absolute top-3 right-3 z-10">
                            <div className="bg-gradient-to-r from-green-600 to-green-500 text-white text-sm font-bold px-3 py-1.5 rounded-full shadow-lg">
                              -{product.discount_percentage}%
                            </div>
                          </div>
                        )}

                        {/* Product Image */}
                        <div className="relative h-64 bg-gray-100 overflow-hidden">
                          <img
                            src={product.image_url}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                        </div>

                        {/* Product Info */}
                        <div className="p-5">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-bold text-gray-900 text-lg mb-1 line-clamp-1">
                                {product.name}
                              </h3>
                              <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                                {product.description}
                              </p>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="text-sm font-bold text-gray-900">{product.rating}</span>
                            </div>
                          </div>

                          {/* Brand */}
                          <div className="mb-3">
                            <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                              {product.brand}
                            </span>
                          </div>

                          {/* Price */}
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <span className="text-xl font-bold text-gray-900">
                                R{(product.sale_price || product.base_price).toLocaleString()}
                              </span>
                              {product.sale_price && (
                                <span className="text-sm text-gray-500 line-through ml-2">
                                  R{product.base_price.toLocaleString()}
                                </span>
                              )}
                            </div>
                            {product.tags?.includes('new') && (
                              <div className="flex items-center gap-1">
                                <Sparkles className="w-4 h-4 text-red-500" />
                                <span className="text-xs font-bold text-red-600">NEW</span>
                              </div>
                            )}
                          </div>

                          {/* Sizes */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            {product.sizes.map(size => (
                              <div
                                key={size}
                                className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:border-red-600 hover:text-red-600 cursor-pointer transition"
                              >
                                {size}
                              </div>
                            ))}
                          </div>

                          {/* Quick Actions */}
                          <div className="flex gap-2">
                            <button className="flex-1 bg-gradient-to-r from-red-600 to-red-700 text-white py-3 rounded-lg font-bold hover:opacity-90 transition flex items-center justify-center gap-2">
                              <ShoppingBag className="w-4 h-4" />
                              Add to Cart
                            </button>
                            <button className="w-12 h-12 border border-gray-300 rounded-lg hover:border-red-600 hover:text-red-600 transition flex items-center justify-center">
                              <Heart className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Empty State */}
            {!loading && filteredProducts.length === 0 && (
              <div className="text-center py-20">
                <div className="bg-white rounded-2xl shadow-xl p-12 max-w-md mx-auto border-2 border-red-100">
                  <div className="w-20 h-20 bg-gradient-to-r from-red-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search className="w-10 h-10 text-red-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">No New Arrivals Found</h3>
                  <p className="text-gray-600 mb-6">Try adjusting your filters to see more products</p>
                  <button
                    onClick={clearFilters}
                    className="bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-3 rounded-lg font-bold hover:opacity-90 transition"
                  >
                    Reset All Filters
                  </button>
                </div>
              </div>
            )}

            {/* Load More Button */}
            {!loading && filteredProducts.length > 0 && (
              <div className="text-center mt-12">
                <button className="group bg-transparent border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-bold text-lg hover:border-red-600 hover:text-red-600 transition-all transform hover:scale-105">
                  Load More New Arrivals
                  <ArrowDown className="w-5 h-5 inline-block ml-2 group-hover:translate-y-1 transition-transform" />
                </button>
                <p className="text-gray-500 text-sm mt-4">
                  More fresh products added daily. Check back soon!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Add missing icon components
function Heart(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

function Search(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}

function ArrowDown(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 5v14" />
      <path d="m19 12-7 7-7-7" />
    </svg>
  );
}