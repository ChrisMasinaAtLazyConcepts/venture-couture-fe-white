import { useEffect, useState } from 'react';
import { Filter, SlidersHorizontal, X } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { supabase, Product, ProductImage } from '../lib/supabase';

type ProductWithImage = Product & { image_url: string };

// Dummy African fashion products
const dummyProducts: ProductWithImage[] = [
  {
    id: '1',
    name: 'Ankara Print Kaftan',
    category: 'Traditional',
    category_id: 'cat_traditional_001',
    description: 'Beautiful handcrafted kaftan with vibrant Ankara patterns',
    base_price: 1299.99,
    sale_price: 999.99,
    sku: 'ANK-KAFT-001',
    brand: 'AfroStyle',
    image_url: 'https://images.pexels.com/photos/1375736/pexels-photo-1375736.jpeg?auto=compress&cs=tinysrgb&w=800',
    discount_percentage: 23,
    rating: 4.8,
    is_active: true,
    is_featured: true,
    slug: 'ankara-print-kaftan',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: '2',
    name: 'African Print Dashiki',
    category: 'Traditional',
    category_id: 'cat_traditional_002',
    description: 'Authentic African dashiki shirt with intricate embroidery',
    base_price: 899.99,
    sale_price: 699.99,
    sku: 'DASH-AFR-001',
    brand: 'Kente Kings',
    image_url: 'https://images.pexels.com/photos/1300550/pexels-photo-1300550.jpeg?auto=compress&cs=tinysrgb&w=800',
    discount_percentage: 22,
    rating: 4.7,
    is_active: true,
    is_featured: true,
    slug: 'african-print-dashiki',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    sizes: ['M', 'L', 'XL', 'XXL']
  },
  {
    id: '3',
    name: 'Zulu Beaded Necklace',
    category: 'Accessories',
    category_id: 'cat_accessories_001',
    description: 'Hand-beaded Zulu necklace with traditional patterns',
    base_price: 349.99,
    sale_price: 249.99,
    sku: 'NECK-ZULU-01',
    brand: 'ZuluCraft',
    image_url: 'https://images.pexels.com/photos/2253821/pexels-photo-2253821.jpeg?auto=compress&cs=tinysrgb&w=800',
    discount_percentage: 29,
    rating: 4.9,
    is_active: true,
    is_featured: false,
    slug: 'zulu-beaded-necklace',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    sizes: ['One Size']
  },
  {
    id: '4',
    name: 'Kente Cloth Handbag',
    category: 'Accessories',
    category_id: 'cat_accessories_002',
    description: 'Handwoven Kente cloth handbag with leather accents',
    base_price: 599.99,
    sale_price: 449.99,
    sku: 'BAG-KENTE-01',
    brand: 'GhanaGold',
    image_url: 'https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?auto=compress&cs=tinysrgb&w=800',
    discount_percentage: 25,
    rating: 4.6,
    is_active: true,
    is_featured: true,
    slug: 'kente-cloth-handbag',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    sizes: ['One Size']
  },
  {
    id: '5',
    name: 'Maasai Shuka Blanket',
    category: 'Home & Living',
    category_id: 'cat_home_001',
    description: 'Authentic Maasai shuka blanket in bold red patterns',
    base_price: 799.99,
    sale_price: 599.99,
    sku: 'BLNK-MAAS-01',
    brand: 'MaasaiHeritage',
    image_url: 'https://images.pexels.com/photos/1342609/pexels-photo-1342609.jpeg?auto=compress&cs=tinysrgb&w=800',
    discount_percentage: 25,
    rating: 4.8,
    is_active: true,
    is_featured: true,
    slug: 'maasai-shuka-blanket',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    sizes: ['Small', 'Medium', 'Large']
  },
  {
    id: '6',
    name: 'Beaded Leather Sandals',
    category: 'Footwear',
    category_id: 'cat_footwear_001',
    description: 'Handcrafted leather sandals with African beadwork',
    base_price: 699.99,
    sale_price: 549.99,
    sku: 'SAND-BEAD-01',
    brand: 'SafariSoles',
    image_url: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800',
    discount_percentage: 21,
    rating: 4.5,
    is_active: true,
    is_featured: false,
    slug: 'beaded-leather-sandals',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    sizes: ['6', '7', '8', '9', '10']
  },
  {
    id: '7',
    name: 'African Wax Print Dress',
    category: 'Women',
    category_id: 'cat_women_001',
    description: 'Elegant dress made from premium African wax print fabric',
    base_price: 1199.99,
    sale_price: 899.99,
    sku: 'DRS-WAX-001',
    brand: 'AfroChic',
    image_url: 'https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=compress&cs=tinysrgb&w=800',
    discount_percentage: 25,
    rating: 4.7,
    is_active: true,
    is_featured: true,
    slug: 'african-wax-print-dress',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    sizes: ['XS', 'S', 'M', 'L', 'XL']
  },
  {
    id: '8',
    name: 'Bamboo Wooden Mask',
    category: 'Home & Living',
    category_id: 'cat_home_002',
    description: 'Hand-carved bamboo mask with traditional symbols',
    base_price: 449.99,
    sale_price: 349.99,
    sku: 'MASK-BAM-01',
    brand: 'TribalArts',
    image_url: 'https://images.pexels.com/photos/326058/pexels-photo-326058.jpeg?auto=compress&cs=tinysrgb&w=800',
    discount_percentage: 22,
    rating: 4.6,
    is_active: true,
    is_featured: false,
    slug: 'bamboo-wooden-mask',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    sizes: ['One Size']
  },
  {
    id: '9',
    name: 'Mudcloth Throw Pillow',
    category: 'Home & Living',
    category_id: 'cat_home_003',
    description: 'Handwoven mudcloth pillow with geometric patterns',
    base_price: 299.99,
    sale_price: 199.99,
    sku: 'PILL-MUD-01',
    brand: 'MaliMudcloth',
    image_url: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
    discount_percentage: 33,
    rating: 4.4,
    is_active: true,
    is_featured: false,
    slug: 'mudcloth-throw-pillow',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    sizes: ['18x18']
  },
  {
    id: '10',
    name: 'Silver Tribal Earrings',
    category: 'Jewelry',
    category_id: 'cat_jewelry_001',
    description: 'Sterling silver earrings with tribal geometric designs',
    base_price: 249.99,
    sale_price: 179.99,
    sku: 'EARR-TRIB-01',
    brand: 'SilverNomad',
    image_url: 'https://images.pexels.com/photos/3266700/pexels-photo-3266700.jpeg?auto=compress&cs=tinysrgb&w=800',
    discount_percentage: 28,
    rating: 4.9,
    is_active: true,
    is_featured: true,
    slug: 'silver-tribal-earrings',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    sizes: ['One Size']
  },
  {
    id: '11',
    name: 'African Print Headwrap',
    category: 'Accessories',
    category_id: 'cat_accessories_003',
    description: 'Versatile headwrap made from premium African fabric',
    base_price: 199.99,
    sale_price: 149.99,
    sku: 'WRAP-AFR-01',
    brand: 'CrownHeritage',
    image_url: 'https://images.pexels.com/photos/3679601/pexels-photo-3679601.jpeg?auto=compress&cs=tinysrgb&w=800',
    discount_percentage: 25,
    rating: 4.7,
    is_active: true,
    is_featured: false,
    slug: 'african-print-headwrap',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    sizes: ['One Size']
  },
  {
    id: '12',
    name: 'Carved Wooden Bowl Set',
    category: 'Home & Living',
    category_id: 'cat_home_004',
    description: 'Hand-carved wooden bowl set with tribal patterns',
    base_price: 599.99,
    sale_price: 449.99,
    sku: 'BOWL-WOOD-01',
    brand: 'ArtisanWood',
    image_url: 'https://images.pexels.com/photos/6168516/pexels-photo-6168516.jpeg?auto=compress&cs=tinysrgb&w=800',
    discount_percentage: 25,
    rating: 4.6,
    is_active: true,
    is_featured: true,
    slug: 'carved-wooden-bowl-set',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    sizes: ['Set of 3']
  }
];

export default function ShopPage() {
  const [products, setProducts] = useState<ProductWithImage[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductWithImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  
  // Categories and brands from dummy products
  const categories = Array.from(new Set(dummyProducts.map(p => p.category)));
  const brands = Array.from(new Set(dummyProducts.map(p => p.brand)));

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    applyFiltersAndSort();
  }, [products, sortBy, priceRange, selectedCategories, selectedBrands]);

  async function fetchProducts() {
    try {
      setLoading(true);
      // Try API first
      const { data: productsData, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true);

      if (error) throw error;

      if (productsData && productsData.length > 0) {
        const productIds = productsData.map(p => p.id);
        const { data: imagesData } = await supabase
          .from('product_images')
          .select('*')
          .in('product_id', productIds)
          .eq('is_primary', true);

        const productsWithImages = productsData.map(product => {
          const image = imagesData?.find(img => img.product_id === product.id);
          return {
            ...product,
            image_url: image?.image_url || dummyProducts[0].image_url
          };
        });

        setProducts(productsWithImages);
      } else {
        // Fallback to dummy data
        setProducts(dummyProducts);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      // Fallback to dummy data
      setProducts(dummyProducts);
    } finally {
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

  const clearFilters = () => {
    setPriceRange([0, 5000]);
    setSortBy('featured');
    setSelectedCategories([]);
    setSelectedBrands([]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Hero Section */}
      <div className="bg-pink/90 text-white py-16">
      <div className="container mx-auto px-4 text-center">
  <h1 className="text-4xl md:text-5xl font-bold mb-4 text-black">
    Shop Authentic African Fashion
  </h1>
  <p className="text-xl text-red-500">
    Discover handcrafted pieces that celebrate heritage and style
  </p>
</div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className={`lg:w-72 ${showFilters ? 'fixed inset-0 z-50 bg-black bg-opacity-50 lg:static lg:bg-transparent' : 'hidden lg:block'}`}>
            <div className={`bg-white p-6 rounded-xl shadow-lg lg:sticky lg:top-24 h-full lg:h-auto ${showFilters ? 'absolute top-0 left-0 right-0 bottom-0 overflow-auto lg:relative' : ''}`}>
              {/* Mobile close button */}
              {showFilters && (
                <button
                  onClick={() => setShowFilters(false)}
                  className="lg:hidden absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              )}

              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 flex items-center">
                  <Filter className="mr-2" size={20} />
                  Filters
                </h3>
                {(priceRange[1] < 5000 || selectedCategories.length > 0 || selectedBrands.length > 0) && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-red-600 hover:text-red-700 font-bold"
                  >
                    Clear All
                  </button>
                )}
              </div>

              <div className="space-y-6">
                {/* Categories Filter */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">Categories</label>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <label key={category} className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category)}
                          onChange={() => toggleCategory(category)}
                          className="rounded border-gray-300 text-red-600 focus:ring-red-600"
                        />
                        <span className="text-gray-700">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Brands Filter */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">Brands</label>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {brands.map(brand => (
                      <label key={brand} className="flex items-center space-x-3">
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

                {/* Price Range Filter */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    Price Range - R{priceRange[1]}
                  </label>
                  <div className="space-y-3">
                    <input
                      type="range"
                      min="0"
                      max="5000"
                      step="100"
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

                {/* Sort Options */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">Sort By</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 bg-white"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="name">Name: A to Z</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Mobile Filter Toggle and Results */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <p className="text-gray-600">
                  <span className="font-bold text-gray-900">{filteredProducts.length}</span> products found
                </p>
                {(priceRange[1] < 5000 || selectedCategories.length > 0 || selectedBrands.length > 0) && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-red-600 hover:text-red-700 font-bold"
                  >
                    Clear filters
                  </button>
                )}
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-red-700 transition"
              >
                <SlidersHorizontal size={18} />
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </button>
            </div>

            {/* Loading State */}
            {loading ? (
              <div className="text-center py-20">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
                <p className="mt-4 text-gray-600">Loading products...</p>
              </div>
            ) : (
              /* Products Grid */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
              </div>
            )}

            {/* Empty State */}
            {!loading && filteredProducts.length === 0 && (
              <div className="text-center py-20">
                <div className="bg-white rounded-xl shadow-lg p-8 max-w-md mx-auto border-2 border-red-100">
                  <p className="text-gray-600 text-lg mb-4">No products found matching your filters</p>
                  <button
                    onClick={clearFilters}
                    className="bg-red-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700 transition"
                  >
                    Clear All Filters
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