import { useEffect, useState, useRef } from 'react';
import ProductCard from './ProductCard';
import { supabase, Product, ProductImage } from '../lib/supabase';
import { Loader2, Pause, Play } from 'lucide-react';

type ProductWithImage = Product & { image_url: string };

// Winter collection stock images - 20 images as requested
const WINTER_COLLECTION_IMAGES = [
  'https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1021694/pexels-photo-1021694.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/3768005/pexels-photo-3768005.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/3768006/pexels-photo-3768006.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/3768007/pexels-photo-3768007.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/3768008/pexels-photo-3768008.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/3768009/pexels-photo-3768009.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/3768010/pexels-photo-3768010.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1884582/pexels-photo-1884582.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1884583/pexels-photo-1884583.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1884584/pexels-photo-1884584.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1884585/pexels-photo-1884585.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1884586/pexels-photo-1884586.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1884587/pexels-photo-1884587.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1884588/pexels-photo-1884588.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1884589/pexels-photo-1884589.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1884590/pexels-photo-1884590.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1884591/pexels-photo-1884591.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1884592/pexels-photo-1884592.jpeg?auto=compress&cs=tinysrgb&w=800',
];

export default function FeaturedProducts() {
  const [products, setProducts] = useState<ProductWithImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSliderPaused, setIsSliderPaused] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    fetchFeaturedProducts();
    startSliderAnimation();
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isSliderPaused]);

  async function fetchFeaturedProducts() {
    try {
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select('*')
        .eq('is_featured', true)
        .eq('is_active', true)
        .limit(8);

      if (productsError) throw productsError;

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
            image_url: image?.image_url || 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=800'
          };
        });

        setProducts(productsWithImages);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  }

  const startSliderAnimation = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    let position = 0;
    const speed = 0.5;
    const sliderWidth = sliderRef.current?.scrollWidth || 0;
    const containerWidth = sliderRef.current?.parentElement?.clientWidth || 0;

    const animate = () => {
      if (!isSliderPaused && sliderRef.current) {
        position -= speed;
        
        if (Math.abs(position) >= sliderWidth / 2) {
          position = 0;
        }
        
        sliderRef.current.style.transform = `translateX(${position}px)`;
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
  };

  const toggleSlider = () => {
    setIsSliderPaused(!isSliderPaused);
  };

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin text-orange-600" size={48} />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Winter Collection Slider with Virtual Isle Title */}
        <div className="mb-8 text-center">
          <h2 className="text-5xl font-bold text-black mb-4">
            Virtual Isle
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Take a virtual stroll through our winter collection
          </p>
        </div>

        <div 
          className="mb-16 relative overflow-hidden rounded-xl shadow-2xl group"
          onMouseEnter={() => setIsSliderPaused(true)}
          onMouseLeave={() => setIsSliderPaused(false)}
        >
          <div className="absolute top-4 right-4 z-10">
            <button
              onClick={toggleSlider}
              className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full backdrop-blur-sm transition-all"
              aria-label={isSliderPaused ? "Play slider" : "Pause slider"}
            >
              {isSliderPaused ? (
                <Play className="w-6 h-6" />
              ) : (
                <Pause className="w-6 h-6" />
              )}
            </button>
          </div>
          
          <div className="relative h-96">
            <div 
              ref={sliderRef}
              className="flex absolute top-0 left-0 h-full"
              style={{ willChange: 'transform' }}
            >
              {[...WINTER_COLLECTION_IMAGES, ...WINTER_COLLECTION_IMAGES].map((image, index) => (
                <div 
                  key={`slider-image-${index}`}
                  className="flex-shrink-0 w-full h-full"
                  style={{ width: '100vw' }}
                >
                  <img 
                    src={image} 
                    alt={`Winter collection ${index + 1}`}
                    className="w-full h-full object-cover"
                    loading={index < 4 ? "eager" : "lazy"}
                  />
                </div>
              ))}
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
            
            <div className="absolute inset-0 flex items-center justify-center z-5">
              <div className="text-center text-white px-4">
                <h3 className="text-5xl font-bold mb-4 drop-shadow-2xl">
                  Winter Collection 2026
                </h3>
                <p className="text-xl opacity-90 drop-shadow-lg">
                  Discover our cozy African-inspired winter essentials
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-[#B84037] bg-clip-text text-transparent">
            Featured Collection
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Handpicked pieces that showcase the beauty and diversity of African fashion
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
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

        <div className="text-center mt-12">
          <a
            href="/shop"
            className="inline-block bg-[#B84037] hover:from-orange-700 hover:via-red-700 hover:to-amber-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            View All Products
          </a>
        </div>
      </div>
    </section>
  );
}