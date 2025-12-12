import { useEffect, useState } from 'react';
import { Filter, SlidersHorizontal, X, MapPin, Sparkles, Star, Trophy, Award } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { supabase, Product } from '../lib/supabase';

type ProductWithImage = Product & { image_url: string };

// South African Local Brands & Products - Lekker Edition!
const southAfricanProducts: ProductWithImage[] = [
  {
    id: 'sa1',
    name: 'Shweshwe Print Dress',
    category: 'Traditional',
    category_id: 'cat_traditional_sa001',
    description: 'Authentic South African Shweshwe print dress with intricate patterns',
    base_price: 1299.99,
    sale_price: 999.99,
    sku: 'SHWE-DRS-001',
    brand: 'LekkerWear',
    image_url: 'https://images.pexels.com/photos/1375736/pexels-photo-1375736.jpeg?auto=compress&cs=tinysrgb&w=800',
    discount_percentage: 23,
    rating: 4.8,
    is_active: true,
    is_featured: true,
    slug: 'shweshwe-print-dress',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    sizes: ['S', 'M', 'L', 'XL'],
    location: 'Cape Town'
  },
  {
    id: 'sa2',
    name: 'Zulu Beaded Bracelet Set',
    category: 'Jewelry',
    category_id: 'cat_jewelry_sa001',
    description: 'Handcrafted Zulu beadwork bracelet set from KwaZulu-Natal',
    base_price: 499.99,
    sale_price: 349.99,
    sku: 'ZULU-BRAC-001',
    brand: 'UbuntuBeads',
    image_url: 'https://images.pexels.com/photos/2253821/pexels-photo-2253821.jpeg?auto=compress&cs=tinysrgb&w=800',
    discount_percentage: 30,
    rating: 4.9,
    is_active: true,
    is_featured: true,
    slug: 'zulu-beaded-bracelet-set',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    sizes: ['One Size'],
    location: 'Durban'
  },
  {
    id: 'sa3',
    name: 'Rooibos Tea Gift Set',
    category: 'Food & Beverage',
    category_id: 'cat_food_sa001',
    description: 'Premium Rooibos tea from the Cederberg Mountains',
    base_price: 299.99,
    sale_price: 249.99,
    sku: 'ROOIBOS-SET-001',
    brand: 'CederbergTea',
    image_url: 'https://images.pexels.com/photos/5947050/pexels-photo-5947050.jpeg?auto=compress&cs=tinysrgb&w=800',
    discount_percentage: 17,
    rating: 4.7,
    is_active: true,
    is_featured: true,
    slug: 'rooibos-tea-gift-set',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    sizes: ['200g', '500g'],
    location: 'Cederberg'
  },
  {
    id: 'sa4',
    name: 'Springbok Leather Wallet',
    category: 'Accessories',
    category_id: 'cat_accessories_sa001',
    description: 'Handmade leather wallet with Springbok embossing',
    base_price: 899.99,
    sale_price: 699.99,
    sku: 'BOK-WALLET-001',
    brand: 'SafariLeather',
    image_url: 'https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?auto=compress&cs=tinysrgb&w=800',
    discount_percentage: 22,
    rating: 4.6,
    is_active: true,
    is_featured: true,
    slug: 'springbok-leather-wallet',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    sizes: ['Standard'],
    location: 'Johannesburg'
  },
  {
    id: 'sa5',
    name: 'Wire Art Sculpture',
    category: 'Home & Decor',
    category_id: 'cat_home_sa001',
    description: 'Hand-twisted wire art sculpture by local artist',
    base_price: 1499.99,
    sale_price: 1199.99,
    sku: 'WIRE-ART-001',
    brand: 'JoburgArtists',
    image_url: 'https://images.pexels.com/photos/326058/pexels-photo-326058.jpeg?auto=compress&cs=tinysrgb&w=800',
    discount_percentage: 20,
    rating: 4.8,
    is_active: true,
    is_featured: true,
    slug: 'wire-art-sculpture',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    sizes: ['30cm', '50cm'],
    location: 'Soweto'
  },
  {
    id: 'sa6',
    name: 'Biltong Spice Pack',
    category: 'Food & Beverage',
    category_id: 'cat_food_sa002',
    description: 'Authentic South African biltong spice mix',
    base_price: 199.99,
    sale_price: 149.99,
    sku: 'BILTONG-SPICE-001',
    brand: 'BoereworsCo',
    image_url: 'https://images.pexels.com/photos/566566/pexels-photo-566566.jpeg?auto=compress&cs=tinysrgb&w=800',
    discount_percentage: 25,
    rating: 4.9,
    is_active: true,
    is_featured: false,
    slug: 'biltong-spice-pack',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    sizes: ['100g', '250g'],
    location: 'Pretoria'
  },
  {
    id: 'sa7',
    name: 'Madiba Shirt',
    category: 'Clothing',
    category_id: 'cat_clothing_sa001',
    description: 'Colorful Madiba shirt inspired by Nelson Mandela',
    base_price: 799.99,
    sale_price: 599.99,
    sku: 'MADIBA-SHIRT-001',
    brand: 'MadibaStyle',
    image_url: 'https://images.pexels.com/photos/1300550/pexels-photo-1300550.jpeg?auto=compress&cs=tinysrgb&w=800',
    discount_percentage: 25,
    rating: 4.7,
    is_active: true,
    is_featured: true,
    slug: 'madiba-shirt',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    sizes: ['S', 'M', 'L', 'XL'],
    location: 'Qunu'
  },
  {
    id: 'sa8',
    name: 'Cape Malay Spice Box',
    category: 'Food & Beverage',
    category_id: 'cat_food_sa003',
    description: 'Traditional Cape Malay spice collection',
    base_price: 349.99,
    sale_price: 279.99,
    sku: 'CAPE-SPICE-001',
    brand: 'CapeFlavors',
    image_url: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=800',
    discount_percentage: 20,
    rating: 4.8,
    is_active: true,
    is_featured: true,
    slug: 'cape-malay-spice-box',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    sizes: ['Set of 6'],
    location: 'Bo-Kaap'
  },
  {
    id: 'sa9',
    name: 'Ndebele Print Cushions',
    category: 'Home & Decor',
    category_id: 'cat_home_sa002',
    description: 'Vibrant Ndebele geometric print cushion covers',
    base_price: 399.99,
    sale_price: 299.99,
    sku: 'NDEBELE-CUSH-001',
    brand: 'MzansiDecor',
    image_url: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
    discount_percentage: 25,
    rating: 4.6,
    is_active: true,
    is_featured: false,
    slug: 'ndebele-print-cushions',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    sizes: ['45x45cm'],
    location: 'Mpumalanga'
  },
  {
    id: 'sa10',
    name: 'Veldskoen Boots',
    category: 'Footwear',
    category_id: 'cat_footwear_sa001',
    description: 'Traditional South African leather boots',
    base_price: 1299.99,
    sale_price: 999.99,
    sku: 'VELDSKOEN-001',
    brand: 'VeldskoenCo',
    image_url: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800',
    discount_percentage: 23,
    rating: 4.9,
    is_active: true,
    is_featured: true,
    slug: 'veldskoen-boots',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    sizes: ['7', '8', '9', '10', '11'],
    location: 'Port Elizabeth'
  },
  {
    id: 'sa11',
    name: 'Baobab Powder',
    category: 'Health & Wellness',
    category_id: 'cat_health_sa001',
    description: 'Organic Baobab fruit powder from Limpopo',
    base_price: 249.99,
    sale_price: 199.99,
    sku: 'BAOBAB-POW-001',
    brand: 'AfricanSuperfoods',
    image_url: 'https://images.pexels.com/photos/128420/pexels-photo-128420.jpeg?auto=compress&cs=tinysrgb&w=800',
    discount_percentage: 20,
    rating: 4.7,
    is_active: true,
    is_featured: true,
    slug: 'baobab-powder',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    sizes: ['250g', '500g'],
    location: 'Limpopo'
  },
  {
    id: 'sa12',
    name: 'Protea Ceramic Vase',
    category: 'Home & Decor',
    category_id: 'cat_home_sa003',
    description: 'Hand-painted ceramic vase with Protea flower design',
    base_price: 699.99,
    sale_price: 549.99,
    sku: 'PROTEA-VASE-001',
    brand: 'FynbosCraft',
    image_url: 'https://images.pexels.com/photos/6168516/pexels-photo-6168516.jpeg?auto=compress&cs=tinysrgb&w=800',
    discount_percentage: 21,
    rating: 4.8,
    is_active: true,
    is_featured: true,
    slug: 'protea-ceramic-vase',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    sizes: ['25cm'],
    location: 'Stellenbosch'
  }
];

// South African Local Brands
const southAfricanBrands = [
  { name: 'LekkerWear', location: 'Cape Town', category: 'Clothing' },
  { name: 'UbuntuBeads', location: 'Durban', category: 'Jewelry' },
  { name: 'CederbergTea', location: 'Cederberg', category: 'Food & Beverage' },
  { name: 'SafariLeather', location: 'Johannesburg', category: 'Accessories' },
  { name: 'JoburgArtists', location: 'Soweto', category: 'Art' },
  { name: 'BoereworsCo', location: 'Pretoria', category: 'Food & Beverage' },
  { name: 'MadibaStyle', location: 'Qunu', category: 'Clothing' },
  { name: 'CapeFlavors', location: 'Bo-Kaap', category: 'Food & Beverage' },
  { name: 'MzansiDecor', location: 'Mpumalanga', category: 'Home Decor' },
  { name: 'VeldskoenCo', location: 'Port Elizabeth', category: 'Footwear' },
  { name: 'AfricanSuperfoods', location: 'Limpopo', category: 'Health & Wellness' },
  { name: 'FynbosCraft', location: 'Stellenbosch', category: 'Home Decor' }
];

export default function LocalIsLekkerPage() {
  const [products, setProducts] = useState<ProductWithImage[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductWithImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  
  // Extract unique values from South African products
  const categories = Array.from(new Set(southAfricanProducts.map(p => p.category)));
  const brands = Array.from(new Set(southAfricanProducts.map(p => p.brand)));
  const locations = Array.from(new Set(southAfricanProducts.map(p => p.location)));

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    applyFiltersAndSort();
  }, [products, sortBy, priceRange, selectedCategories, selectedBrands, selectedLocations]);

  async function fetchProducts() {
    try {
      setLoading(true);
      // For demo purposes, we'll use dummy data
      // You can replace this with actual API call if needed
      setTimeout(() => {
        setProducts(southAfricanProducts);
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts(southAfricanProducts);
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

    // Location filter
    if (selectedLocations.length > 0) {
      filtered = filtered.filter(p => selectedLocations.includes(p.location));
    }

    // Sort
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
      case 'location':
        filtered.sort((a, b) => (a.location || '').localeCompare(b.location || ''));
        break;
      default:
        filtered.sort((a, b) => (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0));
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

  const toggleLocation = (location: string) => {
    setSelectedLocations(prev =>
      prev.includes(location) 
        ? prev.filter(l => l !== location) 
        : [...prev, location]
    );
  };

  const clearFilters = () => {
    setPriceRange([0, 2000]);
    setSortBy('featured');
    setSelectedCategories([]);
    setSelectedBrands([]);
    setSelectedLocations([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-yellow-50">
      {/* Hero Section - South African Theme */}
      <div className="relative overflow-hidden bg-gradient-to-br from-green-600 via-green-500 to-yellow-500 text-white py-16 md:py-24">
        {/* South African Pattern Background */}
        <div className="absolute inset-0 opacity-10">
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* South African Flag Colors */}
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="w-4 h-8 bg-black"></div>
              <div className="w-4 h-8 bg-yellow-500"></div>
              <div className="w-4 h-8 bg-green-600"></div>
              <div className="w-4 h-8 bg-red-600"></div>
              <div className="w-4 h-8 bg-blue-600"></div>
              <div className="w-4 h-8 bg-white"></div>
            </div>

            <div className="text-center">
              {/* Main Title */}
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tighter">
                <span className="bg-gradient-to-r from-yellow-300 via-white to-green-300 bg-clip-text text-transparent drop-shadow-2xl">
                  LOCAL IS LEKKER!
                </span>
              </h1>
              
              <p className="text-2xl md:text-3xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
                Support <span className="font-bold text-yellow-300">South African</span> makers. 
                Shop authentic products from our local artisans and entrepreneurs.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-3xl mx-auto">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="text-3xl md:text-4xl font-black text-yellow-300">100%</div>
                  <div className="text-sm text-white/80">South African</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="text-3xl md:text-4xl font-black text-yellow-300">50+</div>
                  <div className="text-sm text-white/80">Local Brands</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="text-3xl md:text-4xl font-black text-yellow-300">9</div>
                  <div className="text-sm text-white/80">Provinces</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="text-3xl md:text-4xl font-black text-yellow-300">⭐ 4.8</div>
                  <div className="text-sm text-white/80">Avg Rating</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap justify-center gap-4">
                <button className="group bg-white text-green-700 px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-300 hover:text-green-800 transition-all transform hover:scale-105 shadow-2xl hover:shadow-yellow-500/30 flex items-center gap-3">
                  <Sparkles className="w-5 h-5" />
                  Shop Local Now
                  <Award className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                </button>
                <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-all">
                  Meet Our Makers
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* South African Elements */}
        <div className="absolute top-10 right-10 w-64 h-64 bg-yellow-300/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-green-300/20 rounded-full blur-3xl"></div>
        
        {/* Protea Flower */}
        <div className="absolute top-1/4 left-1/4 opacity-20">
          <div className="text-6xl">🌺</div>
        </div>
      </div>

      {/* Featured South African Brands */}
      <div className="container mx-auto px-4 -mt-8 relative z-20">
        <div className="bg-white rounded-3xl shadow-2xl p-8 border-2 border-green-100">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-green-900 flex items-center gap-3">
                <Trophy className="w-8 h-8 text-yellow-500" />
                Featured SA Brands
              </h2>
              <p className="text-green-600 mt-2">Proudly South African since day one</p>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-600"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-red-600"></div>
              <div className="w-3 h-3 rounded-full bg-blue-600"></div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {southAfricanBrands.slice(0, 12).map((brand, index) => (
              <div key={index} className="bg-gradient-to-br from-green-50 to-yellow-50 rounded-2xl p-4 border border-green-200 hover:border-green-400 transition-all hover:scale-105">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-yellow-500 flex items-center justify-center text-white font-bold">
                    {brand.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-green-900">{brand.name}</div>
                    <div className="flex items-center gap-1 text-xs text-green-600">
                      <MapPin className="w-3 h-3" />
                      {brand.location}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* South African Provinces Filter */}
      <div className="container mx-auto px-4 mt-8">
        <div className="bg-gradient-to-r from-green-600 to-yellow-500 rounded-2xl p-6 shadow-xl">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Shop By Province
          </h3>
          <div className="flex flex-wrap gap-3">
            {[
              'Western Cape', 'Eastern Cape', 'Northern Cape',
              'Free State', 'KwaZulu-Natal', 'North West',
              'Gauteng', 'Mpumalanga', 'Limpopo'
            ].map(province => (
              <button
                key={province}
                onClick={() => {
                  const provinceLocations: Record<string, string[]> = {
                    'Western Cape': ['Cape Town', 'Stellenbosch', 'Cederberg', 'Bo-Kaap'],
                    'KwaZulu-Natal': ['Durban'],
                    'Gauteng': ['Johannesburg', 'Soweto', 'Pretoria'],
                    'Eastern Cape': ['Port Elizabeth', 'Qunu'],
                    'Mpumalanga': ['Mpumalanga'],
                    'Limpopo': ['Limpopo']
                  };
                  const locations = provinceLocations[province] || [];
                  setSelectedLocations(locations);
                }}
                className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-white/30 transition-all text-sm font-medium"
              >
                {province}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar - South African Theme */}
          <aside className={`lg:w-80 ${showFilters ? 'fixed inset-0 z-50 bg-black/70 backdrop-blur-sm lg:static lg:bg-transparent' : 'hidden lg:block'}`}>
            <div className={`bg-white border-2 border-green-200 p-6 rounded-2xl shadow-xl lg:sticky lg:top-24 h-full lg:h-auto ${showFilters ? 'absolute top-4 left-4 right-4 bottom-4 overflow-auto lg:relative' : ''}`}>
              {/* Mobile close button */}
              {showFilters && (
                <button
                  onClick={() => setShowFilters(false)}
                  className="lg:hidden absolute top-4 right-4 text-green-700 hover:text-green-900 bg-white rounded-full p-2 shadow-lg border border-green-200"
                >
                  <X size={20} />
                </button>
              )}

              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-green-900 flex items-center">
                  <Filter className="mr-2" size={20} />
                  Filter Products
                </h3>
                {(priceRange[1] < 2000 || selectedCategories.length > 0 || selectedBrands.length > 0 || selectedLocations.length > 0) && (
                  <button
                    onClick={clearFilters}
                    className="text-sm font-bold bg-gradient-to-r from-green-600 to-yellow-500 text-white px-3 py-1 rounded-lg hover:opacity-90 transition"
                  >
                    Clear All
                  </button>
                )}
              </div>

              <div className="space-y-8">
                {/* Sort Options */}
                <div>
                  <label className="block text-sm font-bold text-green-900 mb-3 flex items-center">
                    <Star className="w-4 h-4 mr-2" />
                    Sort By
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { value: 'featured', label: 'Featured' },
                      { value: 'price-low', label: 'Price: Low' },
                      { value: 'price-high', label: 'Price: High' },
                      { value: 'rating', label: 'Top Rated' },
                      { value: 'location', label: 'Location' },
                      { value: 'name', label: 'Name' }
                    ].map(option => (
                      <button
                        key={option.value}
                        onClick={() => setSortBy(option.value)}
                        className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                          sortBy === option.value
                            ? 'bg-gradient-to-r from-green-600 to-yellow-500 text-white shadow-lg'
                            : 'bg-green-50 text-green-700 hover:bg-green-100'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range Filter */}
                <div>
                  <label className="block text-sm font-bold text-green-900 mb-3">
                    Price Range - R{priceRange[1].toLocaleString()}
                  </label>
                  <div className="space-y-3">
                    <input
                      type="range"
                      min="0"
                      max="2000"
                      step="50"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                      className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-green-600 [&::-webkit-slider-thumb]:to-yellow-500"
                    />
                    <div className="flex justify-between text-sm">
                      <span className="text-green-600">R0</span>
                      <span className="font-bold text-green-700">R{priceRange[1].toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Location Filter */}
                <div>
                  <label className="block text-sm font-bold text-green-900 mb-3 flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    Made In
                  </label>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {locations.map(location => (
                      <label key={location} className="flex items-center space-x-3 group cursor-pointer">
                        <div className="relative">
                          <input
                            type="checkbox"
                            checked={selectedLocations.includes(location)}
                            onChange={() => toggleLocation(location)}
                            className="sr-only peer"
                          />
                          <div className="w-5 h-5 border-2 border-green-300 rounded peer-checked:border-green-600 peer-checked:bg-green-600 transition-colors flex items-center justify-center">
                            {selectedLocations.includes(location) && (
                              <div className="w-2 h-2 bg-white rounded"></div>
                            )}
                          </div>
                        </div>
                        <span className="text-green-700 group-hover:text-green-900 transition flex items-center gap-2">
                          {location}
                          <span className="text-xs text-green-500">• SA</span>
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Categories Filter */}
                <div>
                  <label className="block text-sm font-bold text-green-900 mb-3">Categories</label>
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
                          <div className="w-5 h-5 border-2 border-green-300 rounded peer-checked:border-green-600 peer-checked:bg-green-600 transition-colors flex items-center justify-center">
                            {selectedCategories.includes(category) && (
                              <div className="w-2 h-2 bg-white rounded"></div>
                            )}
                          </div>
                        </div>
                        <span className="text-green-700 group-hover:text-green-900 transition">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Brands Filter */}
                <div>
                  <label className="block text-sm font-bold text-green-900 mb-3">Local Brands</label>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {brands.map(brand => (
                      <label key={brand} className="flex items-center space-x-3 group cursor-pointer">
                        <div className="relative">
                          <input
                            type="checkbox"
                            checked={selectedBrands.includes(brand)}
                            onChange={() => toggleBrand(brand)}
                            className="sr-only peer"
                          />
                          <div className="w-5 h-5 border-2 border-green-300 rounded peer-checked:border-green-600 peer-checked:bg-green-600 transition-colors flex items-center justify-center">
                            {selectedBrands.includes(brand) && (
                              <div className="w-2 h-2 bg-white rounded"></div>
                            )}
                          </div>
                        </div>
                        <span className="text-green-700 group-hover:text-green-900 transition">{brand}</span>
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
            <div className="bg-white/90 backdrop-blur-sm border-2 border-green-200 rounded-2xl p-6 mb-8 shadow-lg">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-green-900 mb-2">Local is Lekker!</h2>
                  <p className="text-green-600">
                    Showing <span className="font-bold text-green-700">{filteredProducts.length}</span> proudly South African products
                  </p>
                </div>
                
                <div className="flex items-center gap-4">
                  {(priceRange[1] < 2000 || selectedCategories.length > 0 || selectedBrands.length > 0 || selectedLocations.length > 0) && (
                    <button
                      onClick={clearFilters}
                      className="text-sm font-bold text-green-700 hover:text-green-900 transition"
                    >
                      Clear filters
                    </button>
                  )}
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden flex items-center gap-2 bg-gradient-to-r from-green-600 to-yellow-500 text-white px-4 py-2.5 rounded-lg font-bold hover:opacity-90 transition"
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
                <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-green-600 border-t-transparent"></div>
                <p className="mt-4 text-green-700 text-lg">Loading lekker local products...</p>
                <p className="text-sm text-green-500 mt-2">Supporting local businesses!</p>
              </div>
            ) : (
              /* Products Grid - South African Theme */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="group">
                    <div className="relative bg-white rounded-2xl border-2 border-green-200 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                      {/* South African Flag Badge */}
                      <div className="absolute top-3 left-3 z-10">
                        <div className="flex items-center gap-2">
                          <div className="bg-gradient-to-r from-green-600 to-yellow-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                            <div className="w-2 h-2 bg-black rounded-full"></div>
                            <span>Proudly SA</span>
                          </div>
                          {product.is_featured && (
                            <div className="bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                              FEATURED
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Location Badge */}
                      <div className="absolute top-3 right-3 z-10">
                        <div className="bg-white/90 backdrop-blur-sm text-green-700 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {product.location}
                        </div>
                      </div>

                      {/* Discount Badge */}
                      {product.discount_percentage && (
                        <div className="absolute top-14 right-3 z-10">
                          <div className="bg-yellow-500 text-green-900 text-sm font-bold px-3 py-1.5 rounded-full shadow-lg">
                            -{product.discount_percentage}%
                          </div>
                        </div>
                      )}

                      {/* Product Image */}
                      <div className="relative h-64 bg-gradient-to-br from-green-50 to-yellow-50 overflow-hidden">
                        <img
                          src={product.image_url}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-green-900/20 to-transparent"></div>
                      </div>

                      {/* Product Info */}
                      <div className="p-5">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-bold text-green-900 text-lg mb-1 line-clamp-1">
                              {product.name}
                            </h3>
                            <p className="text-sm text-green-600 mb-3 line-clamp-2">
                              {product.description}
                            </p>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm font-bold text-green-900">{product.rating}</span>
                          </div>
                        </div>

                        {/* Brand & Location */}
                        <div className="mb-3">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-green-700 uppercase tracking-wide">
                              {product.brand}
                            </span>
                            <div className="flex items-center gap-1 text-xs text-green-600">
                              <MapPin className="w-3 h-3" />
                              {product.location}
                            </div>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <span className="text-xl font-bold text-green-900">
                              R{(product.sale_price || product.base_price).toLocaleString()}
                            </span>
                            {product.sale_price && (
                              <span className="text-sm text-green-500 line-through ml-2">
                                R{product.base_price.toLocaleString()}
                              </span>
                            )}
                          </div>
                          <div className="text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded">
                            🇿🇦 LOCAL
                          </div>
                        </div>

                        {/* Sizes */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {product.sizes.map(size => (
                            <div
                              key={size}
                              className="px-3 py-1.5 text-sm border border-green-300 rounded-lg hover:border-green-600 hover:text-green-600 cursor-pointer transition"
                            >
                              {size}
                            </div>
                          ))}
                        </div>

                        {/* Quick Actions */}
                        <div className="flex gap-2">
                          <button className="flex-1 bg-gradient-to-r from-green-600 to-yellow-500 text-white py-3 rounded-lg font-bold hover:opacity-90 transition flex items-center justify-center gap-2">
                            <ShoppingBag className="w-4 h-4" />
                            Add to Cart
                          </button>
                          <button className="w-12 h-12 border border-green-300 rounded-lg hover:border-green-600 hover:text-green-600 transition flex items-center justify-center">
                            <Heart className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Empty State */}
            {!loading && filteredProducts.length === 0 && (
              <div className="text-center py-20">
                <div className="bg-white rounded-2xl shadow-xl p-12 max-w-md mx-auto border-2 border-green-200">
                  <div className="w-20 h-20 bg-gradient-to-r from-green-100 to-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-green-900 mb-3">Geen Produkte Nie</h3>
                  <p className="text-green-600 mb-6">Try adjusting your filters to see more lekker local products</p>
                  <button
                    onClick={clearFilters}
                    className="bg-gradient-to-r from-green-600 to-yellow-500 text-white px-8 py-3 rounded-lg font-bold hover:opacity-90 transition"
                  >
                    Reset All Filters
                  </button>
                </div>
              </div>
            )}

            {/* Support Local Message */}
            {!loading && filteredProducts.length > 0 && (
              <div className="mt-12 text-center">
                <div className="bg-gradient-to-r from-green-600 to-yellow-500 rounded-2xl p-8 text-white shadow-xl">
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <div className="text-4xl">🇿🇦</div>
                    <div className="text-4xl">❤️</div>
                    <div className="text-4xl">🛍️</div>
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Buy Local, Build South Africa!</h3>
                  <p className="mb-6 max-w-2xl mx-auto">
                    Every purchase supports South African artisans, creates jobs, and grows our economy. 
                    <span className="font-bold block mt-2 text-yellow-300">Lekker, my bru!</span>
                  </p>
                  <button className="bg-white text-green-700 px-8 py-3 rounded-full font-bold hover:bg-yellow-300 transition">
                    Learn About Our Makers
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Add missing icon components
function ShoppingBag(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

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