import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star, ShoppingBag, Clock, Tag } from 'lucide-react';
import { supabase, Product } from '../lib/supabase';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface ProductWithImage extends Product {
  image_url: string;
  discount_percentage?: number;
}

const Sale: React.FC = () => {
  const [saleProducts, setSaleProducts] = useState<ProductWithImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [featuredSale, setFeaturedSale] = useState<ProductWithImage | null>(null);

  useEffect(() => {
    fetchSaleProducts();
  }, []);

  async function fetchSaleProducts() {
    try {
      const { data: productsData, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .not('sale_price', 'is', null)
        .order('created_at', { ascending: false });

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
          const discount = product.sale_price 
            ? Math.round(((product.base_price - product.sale_price) / product.base_price) * 100)
            : 0;

          return {
            ...product,
            image_url: image?.image_url || 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=800',
            discount_percentage: discount
          };
        });

        setSaleProducts(productsWithImages);
        // Set the first product as featured sale
        if (productsWithImages.length > 0) {
          setFeaturedSale(productsWithImages[0]);
        }
      }
    } catch (error) {
      console.error('Error fetching sale products:', error);
    } finally {
      setLoading(false);
    }
  }

// Sample sale products if no data from API
const sampleSaleProducts: ProductWithImage[] = [
  {
    id: '1',
    name: 'Distressed Denim Jacket',
    category: 'Denim',
    category_id: 'cat_denim_001',
    description: 'Classic denim jacket with distressed detailing and comfortable fit',
    base_price: 89.99,
    sale_price: 64.99,
    sku: 'DJ-DIST-001',
    brand: 'Levi\'s',
    image_url: 'https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?auto=compress&cs=tinysrgb&w=800',
    discount_percentage: 28,
    rating: 4.7,
    is_active: true,
    is_featured: true,
    slug: 'distressed-denim-jacket',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '2',
    name: 'High-Waisted Denim Shorts',
    category: 'Denim',
    category_id: 'cat_denim_002',
    description: 'Summer essential high-waisted shorts with frayed hem',
    base_price: 49.99,
    sale_price: 34.99,
    sku: 'DS-HW-SUMMER',
    brand: 'Zara',
    image_url: 'https://images.pexels.com/photos/975006/pexels-photo-975006.jpeg?auto=compress&cs=tinysrgb&w=800',
    discount_percentage: 30,
    rating: 4.5,
    is_active: true,
    is_featured: false,
    slug: 'high-waisted-denim-shorts',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Floral Summer Dress',
    category: 'Summer Wear',
    category_id: 'cat_summer_001',
    description: 'Lightweight floral print dress perfect for sunny days',
    base_price: 79.99,
    sale_price: 59.99,
    sku: 'SD-FLORAL-01',
    brand: 'H&M',
    image_url: 'https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=compress&cs=tinysrgb&w=800',
    discount_percentage: 25,
    rating: 4.6,
    is_active: true,
    is_featured: true,
    slug: 'floral-summer-dress',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Slim Fit Denim Jeans',
    category: 'Denim',
    category_id: 'cat_denim_003',
    description: 'Classic slim fit jeans with stretch comfort',
    base_price: 99.99,
    sale_price: 74.99,
    sku: 'DJ-SLIM-002',
    brand: 'Wrangler',
    image_url: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=800',
    discount_percentage: 25,
    rating: 4.4,
    is_active: true,
    is_featured: false,
    slug: 'slim-fit-denim-jeans',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '5',
    name: 'Linen Button-Down Shirt',
    category: 'Summer Wear',
    category_id: 'cat_summer_002',
    description: 'Breathable linen shirt in classic summer colors',
    base_price: 69.99,
    sale_price: 49.99,
    sku: 'SS-LINEN-01',
    brand: 'Uniqlo',
    image_url: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=800',
    discount_percentage: 29,
    rating: 4.3,
    is_active: true,
    is_featured: false,
    slug: 'linen-button-down-shirt',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '6',
    name: 'Beach Cover-Up Kimono',
    category: 'Summer Wear',
    category_id: 'cat_summer_003',
    description: 'Lightweight kimono perfect for beach days or casual outings',
    base_price: 54.99,
    sale_price: 39.99,
    sku: 'SK-KIMONO-01',
    brand: 'Free People',
    image_url: 'https://images.pexels.com/photos/3738363/pexels-photo-3738363.jpeg?auto=compress&cs=tinysrgb&w=800',
    discount_percentage: 27,
    rating: 4.8,
    is_active: true,
    is_featured: true,
    slug: 'beach-cover-up-kimono',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '7',
    name: 'Denim Overalls',
    category: 'Denim',
    category_id: 'cat_denim_004',
    description: 'Trendy denim overalls with adjustable straps',
    base_price: 109.99,
    sale_price: 79.99,
    sku: 'DO-OVERALL-01',
    brand: 'Lee',
    image_url: 'https://images.pexels.com/photos/5704849/pexels-photo-5704849.jpeg?auto=compress&cs=tinysrgb&w=800',
    discount_percentage: 27,
    rating: 4.5,
    is_active: true,
    is_featured: false,
    slug: 'denim-overalls',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '8',
    name: 'Straw Sun Hat',
    category: 'Summer Accessories',
    category_id: 'cat_summer_004',
    description: 'Wide-brim straw hat for sun protection with ribbon detail',
    base_price: 39.99,
    sale_price: 29.99,
    sku: 'SA-HAT-01',
    brand: 'J.Crew',
    image_url: 'https://images.pexels.com/photos/1456613/pexels-photo-1456613.jpeg?auto=compress&cs=tinysrgb&w=800',
    discount_percentage: 25,
    rating: 4.6,
    is_active: true,
    is_featured: false,
    slug: 'straw-sun-hat',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

  const displayProducts = saleProducts.length > 0 ? saleProducts : sampleSaleProducts;

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero Section */}
      {/* <div className="bg-[#B84037]  text-white py-16"> */}
         <div className="text-black py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center mb-4">
              <Tag className="w-8 h-8 mr-3" />
              <h1 className="text-5xl font-bold text-black">SALE</h1>
            </div>
            <p className="text-xl text-red-500 mb-8">Limited Time Offers - Don't Miss Out!</p>
            <div className="flex items-center justify-center space-x-4 text-sm">
              <div className="flex items-center bg-white/20 px-3 py-1 rounded-full">
                <Clock className="w-4 h-4 mr-1" />
                <span>Ends Soon</span>
              </div>
              <div className="flex items-center bg-white/20 px-3 py-1 rounded-full">
                <span>Up to 50% Off</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Featured Sale Banner */}
      {featuredSale && (
        <section className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-black shadow-2xl overflow-hidden"
          >
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 p-8 text-white">
                <div className="bg-white/20 inline-block px-3 py-1 rounded-full text-sm font-bold mb-4">
                  🔥 FEATURED DEAL
                </div>
                <h2 className="text-3xl font-bold mb-4">{featuredSale.name}</h2>
                <p className="text-white/90 mb-6">Limited time offer - Get this exclusive deal before it's gone!</p>
                <div className="flex items-center space-x-4 mb-6">
                  <span className="text-2xl font-bold">R{featuredSale.sale_price}</span>
                  <span className="text-lg line-through opacity-70">R{featuredSale.base_price}</span>
                  <span className="bg-white text-red-600 px-2 py-1 rounded-lg font-bold text-sm">
                    {featuredSale.discount_percentage}% OFF
                  </span>
                </div>
                <button className="bg-white text-red-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition flex items-center">
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Shop Now
                </button>
              </div>
              <div className="md:w-1/2">
                <img
                  src={featuredSale.image_url}
                  alt={featuredSale.name}
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </section>
      )}

      {/* Sale Products Grid */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">On Sale Now</h2>
          <button className="flex items-center text-orange-600 font-bold hover:text-orange-700 transition">
            View All
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
            <p className="mt-4 text-gray-600">Loading sale products...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
              >
                {/* Sale Badge */}
                <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold z-10">
                  SALE
                </div>

                {/* Product Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {/* Discount Badge */}
                  <div className="absolute top-3 right-3 bg-orange-600 text-white px-2 py-1 rounded-lg font-bold text-sm">
                    {product.discount_percentage}% OFF
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-orange-600 transition">
                    {product.name}
                  </h3>
                  
                  {/* Rating */}
                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 R{
                            star <= 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-2">(4.0)</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-gray-900">
                        R{product.sale_price}
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        ${product.base_price}
                      </span>
                    </div>
                    
                    <button className="bg-orange-600 hover:bg-orange-700 text-white p-2 rounded-lg transition">
                      <ShoppingBag className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-3">
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>Sold: 24</span>
                      <span>Available: 12</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full" 
                        style={{ width: '67%' }}
                      ></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* CTA Section */}
        <div className="text-center mt-12">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-8 py-4 rounded-lg font-bold hover:from-orange-700 hover:to-red-700 transition shadow-lg"
          >
            View All Sale Items
          </motion.button>
          <p className="text-gray-600 mt-4">Limited time offers - Shop before they're gone!</p>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-gray-100 py-12 mt-8">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Get Notified of Future Sales</h3>
          <p className="text-gray-600 mb-6">Be the first to know about our exclusive deals and promotions</p>
          <div className="max-w-md mx-auto flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-600"
            />
            <button className="bg-orange-600 text-white px-6 py-3 rounded-r-lg font-bold hover:bg-orange-700 transition">
              Subscribe
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Sale;