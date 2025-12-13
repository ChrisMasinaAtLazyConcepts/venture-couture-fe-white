import { useEffect, useState, useRef } from 'react';
import ProductCard from './ProductCard';
import { useCart } from '../contexts/CartContext';
import { Loader2, X, ShoppingBag, Maximize2, RotateCw, Palette, Star, ZoomIn, Tag, Flame, Clock, AlertCircle } from 'lucide-react';
// Add these imports with your other imports
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Winter collection stock images for main slider (store scenes)
const WINTER_COLLECTION_IMAGES = [
  '/assets/images/virtual-isle/store-scene-1.jpg',
  '/assets/images/virtual-isle/store-scene-2.jpg',
  '/assets/images/virtual-isle/store-scene-3.jpg',
  '/assets/images/virtual-isle/store-scene-4.jpg',
  '/assets/images/virtual-isle/store-scene-5.jpg',
];

// Fallback images if local ones don't exist
const FALLBACK_STORE_IMAGES = [
  'https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1021694/pexels-photo-1021694.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/3768005/pexels-photo-3768005.jpeg?auto=compress&cs=tinysrgb&w=800',
];

// Local hanger item images
const HANGER_ITEM_IMAGES = {
  winter_coats: [
    '/assets/images/virtual-isle/hanger-coat-1.jfif',
    '/assets/images/virtual-isle/hanger-coat-2.jfif',
    '/assets/images/virtual-isle/hanger-coat-3.jfif',
    '/assets/images/virtual-isle/hanger-coat-4.jfif',
    '/assets/images/virtual-isle/hanger-coat-5.jfif',
    '/assets/images/virtual-isle/hanger-coat-6.jfif',
  ],
  african_prints: [
    '/assets/images/virtual-isle/hanger-dress-1.jfif',
    '/assets/images/virtual-isle/hanger-dress-2.jfif',
    '/assets/images/virtual-isle/hanger-dress-3.jfif',
    '/assets/images/virtual-isle/hanger-dress-4.jfif',
    '/assets/images/virtual-isle/hanger-dress-5.jfif',
    '/assets/images/virtual-isle/hanger-dress-6.jfif',
  ],
  casual_wear: [
    '/assets/images/virtual-isle/hanger-casual-1.jfif',
    '/assets/images/virtual-isle/hanger-casual-2.jfif',
    '/assets/images/virtual-isle/hanger-casual-3.jfif',
    '/assets/images/virtual-isle/hanger-casual-4.jfif',
    '/assets/images/virtual-isle/hanger-casual-5.jfif',
    '/assets/images/virtual-isle/hanger-casual-6.jfif',
  ],
  formal_wear: [
    '/assets/images/virtual-isle/hanger-formal-1.jfif',
    '/assets/images/virtual-isle/hanger-formal-2.jfif',
    '/assets/images/virtual-isle/hanger-formal-3.jfif',
    '/assets/images/virtual-isle/hanger-formal-4.jfif',
    '/assets/images/virtual-isle/hanger-formal-5.jfif',
    '/assets/images/virtual-isle/hanger-formal-6.jfif',
  ],
  accessories: [
    '/assets/images/virtual-isle/hanger-accessory-1.jfif',
    '/assets/images/virtual-isle/hanger-accessory-2.jfif',
    '/assets/images/virtual-isle/hanger-accessory-3.jfif',
    '/assets/images/virtual-isle/hanger-accessory-4.jfif',
    '/assets/images/virtual-isle/hanger-accessory-5.jfif',
    '/assets/images/virtual-isle/hanger-accessory-6.jfif',
  ],
  footwear: [
    '/assets/images/virtual-isle/hanger-shoe-1.jfif',
    '/assets/images/virtual-isle/hanger-shoe-2.jfif',
    '/assets/images/virtual-isle/hanger-shoe-3.jfif',
    '/assets/images/virtual-isle/hanger-shoe-4.jfif',
    '/assets/images/virtual-isle/hanger-shoe-5.jfif',
    '/assets/images/virtual-isle/hanger-shoe-6.jfif',
  ]
};

// Helper function to get random badge
const getRandomBadge = () => {
  const badges = [
    { type: 'hot', label: 'Hot Item', icon: <Flame className="w-3 h-3" />, color: 'bg-red-500 text-white' },
    { type: 'new', label: 'New Arrival', icon: <Clock className="w-3 h-3" />, color: 'bg-green-500 text-white' },
    { type: 'sale', label: '30% OFF', icon: <Tag className="w-3 h-3" />, color: 'bg-orange-500 text-white' },
    { type: 'limited', label: 'Limited', icon: <AlertCircle className="w-3 h-3" />, color: 'bg-purple-500 text-white' },
    { type: 'featured', label: 'Featured', icon: <Star className="w-3 h-3" />, color: 'bg-blue-500 text-white' },
    { type: 'none', label: null, icon: null, color: '' }
  ];
  return badges[Math.floor(Math.random() * badges.length)];
};

// Helper function to determine if out of stock
const isOutOfStock = () => Math.random() > 0.85; // 15% chance of out of stock

// Generate extensive product data with local images
const generateIsleProducts = () => {
  const isles = [];
  const aisleTypes = ['winter_coats', 'african_prints', 'casual_wear', 'formal_wear', 'accessories', 'footwear'];
  const aisleTitles = ['Winter Coats', 'African Prints', 'Casual Wear', 'Formal Wear', 'Accessories', 'Footwear'];
  
  for (let i = 1; i <= 6; i++) {
    const aisleType = aisleTypes[i - 1];
    const aisleImages = HANGER_ITEM_IMAGES[aisleType] || [];
    const isleItems = [];
    
    for (let j = 1; j <= 15; j++) {
      const itemId = (i - 1) * 15 + j;
      const isOutOfStockItem = isOutOfStock();
      const badge = getRandomBadge();
      
      const imageIndex = (j - 1) % Math.max(aisleImages.length, 1);
      
      isleItems.push({
        id: itemId,
        name: `${aisleTitles[i - 1]} ${j} - Premium Item`,
        price: `R ${Math.floor(Math.random() * 2000) + 299}`,
        originalPrice: Math.random() > 0.5 ? `R ${Math.floor(Math.random() * 2500) + 500}` : null,
        image: aisleImages[imageIndex] || '/assets/images/virtual-isle/placeholder.jpg',
        colors: ['#3B82F6', '#DC2626', '#10B981', '#F59E0B', '#8B5CF6'].slice(0, Math.floor(Math.random() * 5) + 1),
        description: 'Premium quality item with excellent craftsmanship and attention to detail',
        badge,
        isOutOfStock: isOutOfStockItem,
        stockCount: isOutOfStockItem ? 0 : Math.floor(Math.random() * 50) + 5,
        rating: (Math.random() * 1 + 4).toFixed(1),
        reviewCount: Math.floor(Math.random() * 100) + 5,
        material: ['Cotton', 'Wool', 'Silk', 'Leather', 'Polyester'][Math.floor(Math.random() * 5)],
        size: ['S', 'M', 'L', 'XL'][Math.floor(Math.random() * 4)]
      });
    }
    
    isles.push({
      id: `isle-${i}`,
      title: aisleTitles[i - 1],
      type: aisleType,
      items: isleItems
    });
  }
  
  return isles;
};

const VIRTUAL_ISLE_PRODUCTS = generateIsleProducts();

// Dummy products for Featured Products section
const DUMMY_FEATURED_PRODUCTS = [
  {
    id: '1',
    name: 'Ankara Print Kaftan',
    base_price: 1299.99,
    sale_price: 999.99,
    image_url: 'https://images.pexels.com/photos/1375736/pexels-photo-1375736.jpeg?auto=compress&cs=tinysrgb&w=800',
    slug: 'ankara-print-kaftan',
    is_featured: true,
    inStock: true
  },
  {
    id: '2',
    name: 'African Print Dashiki',
    base_price: 899.99,
    sale_price: 699.99,
    image_url: 'https://images.pexels.com/photos/1300550/pexels-photo-1300550.jpeg?auto=compress&cs=tinysrgb&w=800',
    slug: 'african-print-dashiki',
    is_featured: true,
    inStock: true
  },
  {
    id: '3',
    name: 'Zulu Beaded Necklace',
    base_price: 349.99,
    sale_price: 249.99,
    image_url: 'https://images.pexels.com/photos/2253821/pexels-photo-2253821.jpeg?auto=compress&cs=tinysrgb&w=800',
    slug: 'zulu-beaded-necklace',
    is_featured: false,
    inStock: true
  },
  {
    id: '4',
    name: 'Kente Cloth Handbag',
    base_price: 599.99,
    sale_price: 449.99,
    image_url: 'https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?auto=compress&cs=tinysrgb&w=800',
    slug: 'kente-cloth-handbag',
    is_featured: true,
    inStock: true
  },
  {
    id: '5',
    name: 'Maasai Shuka Blanket',
    base_price: 799.99,
    sale_price: 599.99,
    image_url: 'https://images.pexels.com/photos/1342609/pexels-photo-1342609.jpeg?auto=compress&cs=tinysrgb&w=800',
    slug: 'maasai-shuka-blanket',
    is_featured: true,
    inStock: true
  },
  {
    id: '6',
    name: 'Beaded Leather Sandals',
    base_price: 699.99,
    sale_price: 549.99,
    image_url: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800',
    slug: 'beaded-leather-sandals',
    is_featured: false,
    inStock: true
  },
  {
    id: '7',
    name: 'African Wax Print Dress',
    base_price: 1199.99,
    sale_price: 899.99,
    image_url: 'https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=compress&cs=tinysrgb&w=800',
    slug: 'african-wax-print-dress',
    is_featured: true,
    inStock: true
  },
  {
    id: '8',
    name: 'Bamboo Wooden Mask',
    base_price: 449.99,
    sale_price: 349.99,
    image_url: 'https://images.pexels.com/photos/326058/pexels-photo-326058.jpeg?auto=compress&cs=tinysrgb&w=800',
    slug: 'bamboo-wooden-mask',
    is_featured: false,
    inStock: true
  },
];


export default function FeaturedProducts() {
  const [products, setProducts] = useState(DUMMY_FEATURED_PRODUCTS);
  const [loading, setLoading] = useState(false);
  const [isSliderPaused, setIsSliderPaused] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState('');
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [show3DModal, setShow3DModal] = useState(false);
  const [hoveredAisle, setHoveredAisle] = useState(null);
  const [speedMultiplier, setSpeedMultiplier] = useState(1.5);
  
  const { dispatch } = useCart();
  
  // Separate animation refs for each aisle
  const mainSliderRef = useRef(null);
  const miniSlidersRef = useRef([]);
  const animationRefs = useRef([]);
  const positionRefs = useRef([]);
  const positionRef = useRef(0);
  const animationRef = useRef(null);
  const baseSpeedRef = useRef(0.3);

  // Initialize position refs for each aisle
  useEffect(() => {
    positionRefs.current = VIRTUAL_ISLE_PRODUCTS.map(() => ({ current: 0 }));
  }, []);

  useEffect(() => {
    startSliderAnimation();
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      // Clean up all aisle animations
      animationRefs.current.forEach(ref => {
        if (ref) cancelAnimationFrame(ref);
      });
    };
  }, [isSliderPaused, speedMultiplier]);

  const startSliderAnimation = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    const animate = () => {
      if (!isSliderPaused) {
        const currentSpeed = baseSpeedRef.current * speedMultiplier * 0.5;
        positionRef.current -= currentSpeed;
        
        if (mainSliderRef.current) {
          const sliderWidth = mainSliderRef.current.scrollWidth / 2;
          if (Math.abs(positionRef.current) >= sliderWidth) {
            positionRef.current = 0;
          }
          mainSliderRef.current.style.transform = `translateX(${positionRef.current}px)`;
          mainSliderRef.current.style.transition = 'transform 0.3s linear';
        }
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
  };

  // Start individual aisle animations
  const startAisleAnimation = (aisleIndex) => {
    if (animationRefs.current[aisleIndex]) {
      cancelAnimationFrame(animationRefs.current[aisleIndex]);
    }

    const animateAisle = () => {
      if (!isSliderPaused && hoveredAisle === null) {
        const currentSpeed = baseSpeedRef.current * speedMultiplier * 0.5;
        positionRefs.current[aisleIndex].current -= currentSpeed;
        
        const slider = miniSlidersRef.current[aisleIndex];
        if (slider) {
          // Calculate total width (all items width)
          const totalWidth = slider.children.length * 100;
          const containerWidth = 100;
          
          // Reset position when we've scrolled through all items
          if (Math.abs(positionRefs.current[aisleIndex].current) >= totalWidth - containerWidth) {
            positionRefs.current[aisleIndex].current = 0;
          }
          
          slider.style.transform = `translateX(${positionRefs.current[aisleIndex].current}%)`;
          slider.style.transition = 'transform 0.3s linear';
        }
      }
      
      animationRefs.current[aisleIndex] = requestAnimationFrame(animateAisle);
    };

    animationRefs.current[aisleIndex] = requestAnimationFrame(animateAisle);
  };

  // Start animations for all aisles
  useEffect(() => {
    VIRTUAL_ISLE_PRODUCTS.forEach((_, index) => {
      startAisleAnimation(index);
    });
  }, [isSliderPaused, speedMultiplier, hoveredAisle]);

  const toggleSlider = () => {
    setIsSliderPaused(!isSliderPaused);
  };

  const increaseSpeed = () => {
    setSpeedMultiplier(prev => Math.min(prev + 0.2, 2.0));
  };

  const decreaseSpeed = () => {
    setSpeedMultiplier(prev => Math.max(prev - 0.2, 0.3));
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setSelectedColor(product.colors?.[0] || '#3B82F6');
    setShowDetailModal(true);
  };

  const open3DTryOn = () => {
    setShow3DModal(true);
  };

  const close3DModal = () => {
    setShow3DModal(false);
  };

  const closeDetailModal = () => {
    setShowDetailModal(false);
    setSelectedProduct(null);
  };

  // Unified addToCart function
// Unified addToCart function - FIXED VERSION
// Unified addToCart function - FIXED following ProductCard pattern
const addToCart = (product, isFromVirtualIsle = false) => {
  // First check stock status
  if (isFromVirtualIsle) {
    if (product.isOutOfStock) {
      alert('This item is out of stock!');
      return;
    }
  } else {
    if (product.inStock === false) {
      alert('This item is out of stock!');
      return;
    }
  }
  
  // Prepare the payload EXACTLY like ProductCard does
  // ProductCard uses: { id, name, price, salePrice, imageUrl, quantity: 1 }
  const payload = {
    id: product.id || `item-${Date.now()}`,
    name: product.name,
    // Use numeric price (extract from string if needed)
    price: isFromVirtualIsle ? 
      parseFloat(product.price.replace('R ', '').replace(',', '')) : 
      (product.sale_price || product.base_price),
    // For virtual isle products, check if there's an original price
    salePrice: isFromVirtualIsle && product.originalPrice ? 
      parseFloat(product.originalPrice.replace('R ', '').replace(',', '')) : 
      (isFromVirtualIsle ? null : product.sale_price),
    imageUrl: product.image || product.image_url,
    quantity: 1
  };
  
  // Dispatch with the same structure as ProductCard
  if (dispatch) {
    dispatch({
      type: 'ADD_ITEM',
      payload: payload
    });
    
    // Show success toast instead of alert
    toast.success(`Added ${product.name} to cart!`, {
      position: "top-right",
      autoClose: 3000,
      theme: "colored",
      style: { backgroundColor: '#10B981' } // Green background
    });
  }
  
  // Close modals if open
  if (showDetailModal) closeDetailModal();
  if (show3DModal) close3DModal();
};

  // Add to cart handler specifically for ProductCard components (Featured Collection)
  const handleAddToCartFromCard = (product) => {
    const productToAdd = {
      ...product,
      price: `R ${product.sale_price || product.base_price}`,
      inStock: product.inStock !== false
    };
    addToCart(productToAdd, false);
  };

  // Add to cart handler for virtual isle products
  const handleAddToCartFromVirtualIsle = (product) => {
    addToCart(product, true);
  };

  const handleImageError = (e, imageSrc) => {
    console.log(`Image failed to load: ${imageSrc}`);
    e.target.style.display = 'none';
    e.target.parentElement.innerHTML = `
      <div class="w-full h-full flex items-center justify-center bg-gray-100 rounded">
        <span class="text-gray-400 text-sm">Image not available</span>
      </div>
    `;
  };

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin text-red-600" size={48} />
          </div>
        </div>
      </section>
    );
  }

  return ( 
    <section className="w-full min-h-screen bg-white">
      <div className="w-full px-4">
        {/* Header Section */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h2 className="text-5xl md:text-6xl font-bold mb-4 text-red-700">
                Virtual Isle
              </h2>
              <p className="text-xl text-red-600 max-w-xl">
                Walk through our virtual store just like real life!
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={decreaseSpeed}
                  className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-lg hover:bg-gray-200"
                  title="Slower"
                >
                  <span className="text-lg">−</span>
                </button>
                <div className="text-center min-w-[100px]">
                  <div className="text-sm text-gray-600">Speed</div>
                  <div className="text-lg font-bold text-red-600">{speedMultiplier.toFixed(1)}x</div>
                </div>
                <button
                  onClick={increaseSpeed}
                  className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-lg hover:bg-gray-200"
                  title="Faster"
                >
                  <span className="text-lg">+</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Full Width Main Store Scene Slider */}
        <div 
          className="mb-12 relative overflow-hidden rounded-xl shadow-lg group w-full"
          onMouseEnter={() => hoveredAisle === null && setIsSliderPaused(true)}
          onMouseLeave={() => hoveredAisle === null && setIsSliderPaused(false)}
        >
          <div className="relative h-96 w-full">
            <div 
              ref={mainSliderRef}
              className="flex absolute top-0 left-0 h-full w-full"
              style={{ willChange: 'transform' }}
            >
              {[...WINTER_COLLECTION_IMAGES, ...WINTER_COLLECTION_IMAGES].map((image, index) => (
                <div 
                  key={`slider-image-${index}`}
                  className="flex-shrink-0 w-full h-full"
                  style={{ width: '100%' }}
                >
                  <img 
                    src={image}
                    alt={`Store scene ${index + 1}`}
                    className="w-full h-full object-cover"
                    loading={index < 4 ? "eager" : "lazy"}
                    onError={(e) => {
                      e.target.src = FALLBACK_STORE_IMAGES[index % FALLBACK_STORE_IMAGES.length];
                    }}
                  />
                </div>
              ))}
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
            
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="text-center text-white px-4 bg-black/40 backdrop-blur-sm py-6 rounded-xl">
                <h3 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-2xl">
                  Winter Collection 2026
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* Full Width Hanger Item Sliders Grid */}
        <div className="w-full mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            {VIRTUAL_ISLE_PRODUCTS.slice(0, 6).map((aisle, aisleIndex) => (
              <div 
                key={aisle.id}
                className="relative group w-full"
                onMouseEnter={() => {
                  setHoveredAisle(aisleIndex);
                  setIsSliderPaused(true);
                }}
                onMouseLeave={() => {
                  setHoveredAisle(null);
                  setIsSliderPaused(false);
                }}
              >
                {/* Aisle Label */}
                <div className="mb-4 flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-red-600 to-red-800 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      {aisleIndex + 1}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{aisle.title}</h3>
                      <p className="text-sm text-gray-500">Items on hangers</p>
                    </div>
                  </div>
                  <span className="text-gray-500 animate-pulse">→</span>
                </div>

                {/* Hanger Item Slider Container */}
                <div className="relative h-72 overflow-hidden rounded-xl bg-gradient-to-b from-white to-gray-50 border border-gray-200 shadow-lg w-full">
                  <div 
                    ref={(el) => (miniSlidersRef.current[aisleIndex] = el)}
                    className="flex absolute top-0 left-0 h-full w-full"
                    style={{ willChange: 'transform' }}
                  >
                    {aisle.items.map((item, itemIndex) => (
                      <div
                        key={`${aisle.id}-item-${itemIndex}`}
                        className="flex-shrink-0 w-full h-full flex items-center justify-center cursor-pointer"
                        onClick={() => handleProductClick(item)}
                      >
                        {/* Hanger Item Card - Takes full width */}
                        <div className="relative w-full h-full flex flex-col items-center justify-center transform transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-white rounded-lg border border-gray-100 p-4">
                          
                          {/* Badge */}
                          {item.badge.label && (
                            <div className={`absolute -top-2 left-3 z-10 ${item.badge.color} px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-md`}>
                              {item.badge.icon}
                              <span>{item.badge.label}</span>
                            </div>
                          )}
                          
                          {/* Out of Stock Badge */}
                          {item.isOutOfStock && (
                            <div className="absolute top-10 right-3 z-10 bg-gray-800 text-white px-2 py-1 rounded text-xs font-bold flex items-center gap-1 shadow-md">
                              <AlertCircle className="w-3 h-3" />
                              <span>Sold Out</span>
                            </div>
                          )}
                          
                          {/* Hanger Item Image - Larger */}
                          <div className="relative w-48 h-48 flex items-center justify-center mt-6">
                            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-12 h-6">
                              <div className="w-full h-full bg-gray-300 rounded-t-full"></div>
                            </div>
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-contain pt-2"
                              style={{
                                opacity: item.isOutOfStock ? 0.5 : 1,
                                filter: item.isOutOfStock ? 'grayscale(50%)' : 'none'
                              }}
                              onError={(e) => handleImageError(e, item.image)}
                            />
                          </div>
                          
                          {/* Item Info */}
                          <div className="p-3 w-full text-center">
                            <h4 className="font-bold text-gray-900 text-base truncate mb-1">
                              {item.name}
                            </h4>
                            
                            {/* Price */}
                            <div className="flex items-center justify-center gap-2 mb-2">
                              <span className="text-lg font-bold text-red-600">{item.price}</span>
                              {item.originalPrice && (
                                <span className="text-sm text-gray-500 line-through">{item.originalPrice}</span>
                              )}
                            </div>
                            
                            {/* Rating */}
                            <div className="flex items-center justify-center gap-1 mb-3">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="text-sm font-bold text-gray-900">{item.rating}</span>
                              <span className="text-sm text-gray-500">({item.reviewCount})</span>
                            </div>
                            
                            {/* Quick View Button */}
                            <button className="w-full py-2 bg-red-50 text-red-600 rounded-lg text-sm font-bold hover:bg-red-100 transition-all duration-300 flex items-center justify-center gap-2">
                              <ZoomIn className="w-4 h-4" />
                              Quick View
                            </button>
                            
                            {/* Add to Cart Button */}
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAddToCartFromVirtualIsle(item);
                              }}
                              disabled={item.isOutOfStock}
                              className={`w-full py-2 mt-2 rounded-lg text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
                                item.isOutOfStock
                                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                  : 'bg-red-600 text-white hover:bg-red-700'
                              }`}
                            >
                              <ShoppingBag className="w-4 h-4" />
                              {item.isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
                            </button>
                          </div>
                          
                          {/* Stock Indicator */}
                          {!item.isOutOfStock && item.stockCount < 10 && (
                            <div className="absolute bottom-2 left-2 bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded">
                              Only {item.stockCount} left
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Gradient fade edges */}
                  <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white via-white/90 to-transparent pointer-events-none"></div>
                  <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white via-white/90 to-transparent pointer-events-none"></div>
                  
                  {/* Aisle number indicator */}
                  <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold text-gray-700 shadow-md">
                    {aisleIndex + 1}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Product Detail Modal - NO VERTICAL SCROLLBAR */}
      {showDetailModal && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl max-w-4xl w-full border border-gray-200 shadow-2xl">
            <div className="p-6">
              {/* Top Header with Title, Badges, and Colors */}
              <div className="flex justify-between items-start mb-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {selectedProduct.badge?.label && (
                      <div className={`${selectedProduct.badge.color} px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1`}>
                        {selectedProduct.badge.icon}
                        <span>{selectedProduct.badge.label}</span>
                      </div>
                    )}
                    {selectedProduct.isOutOfStock && (
                      <div className="bg-gray-800 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>Out of Stock</span>
                      </div>
                    )}
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900">{selectedProduct.name}</h3>
                  <p className="text-gray-600 mt-2">{selectedProduct.description}</p>
                </div>
                
                {/* Right Side - Colors and Close Button */}
                <div className="flex flex-col items-end gap-4 ml-4">
                  <button
                    onClick={closeDetailModal}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors self-end"
                  >
                    <X className="w-6 h-6 text-gray-700" />
                  </button>
                  
                  {/* Colors moved here */}
                  {selectedProduct.colors?.length > 0 && (
                    <div className="mt-2">
                      <div className="flex items-center gap-2 mb-2 justify-end">
                        <span className="text-sm font-medium text-gray-700">Colors</span>
                        <Palette className="w-4 h-4 text-gray-500" />
                      </div>
                      <div className="flex gap-2 flex-wrap justify-end max-w-[200px]">
                        {selectedProduct.colors.map((color, index) => (
                          <button
                            key={index}
                            onClick={() => setSelectedColor(color)}
                            className={`w-8 h-8 rounded-full border-2 transition-all ${
                              selectedColor === color ? 'border-red-600 scale-110 shadow-md' : 'border-gray-300'
                            }`}
                            style={{ backgroundColor: color }}
                            title={`Color ${index + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                {/* Left Column - Product Image */}
                <div>
                  <div className="relative h-96 flex items-center justify-center mb-6 bg-gray-50 rounded-lg">
                    <div className="relative w-80 h-80">
                      {/* Hanger Display */}
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-12 h-6 bg-gray-300 rounded-t-full"></div>
                      <div className="absolute inset-0 flex items-center justify-center bg-white rounded-lg">
                        <img
                          src={selectedProduct.image}
                          alt={selectedProduct.name}
                          className="w-full h-full object-contain pt-4"
                          onError={(e) => handleImageError(e, selectedProduct.image)}
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Size Selection moved here for better flow */}
                  <div className="mb-6">
                    <h4 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <Tag className="w-5 h-5" />
                      Available Sizes
                    </h4>
                    <div className="flex gap-3">
                      {selectedProduct.size ? (
                        <div className="flex gap-2">
                          {Array.isArray(selectedProduct.size) ? (
                            selectedProduct.size.map((size, index) => (
                              <button
                                key={index}
                                className="px-4 py-2 border border-gray-300 rounded-lg hover:border-red-600 hover:text-red-600 transition"
                              >
                                {size}
                              </button>
                            ))
                          ) : (
                            <span className="text-gray-700">{selectedProduct.size}</span>
                          )}
                        </div>
                      ) : (
                        <p className="text-gray-500">One Size Fits All</p>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Right Column - Product Details */}
                <div>
                  <div className="bg-gray-50 rounded-xl p-6 mb-6">
                    {/* Price and Rating */}
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <span className="text-3xl font-bold text-gray-900">{selectedProduct.price}</span>
                        {selectedProduct.originalPrice && (
                          <span className="text-lg text-gray-500 line-through ml-2">{selectedProduct.originalPrice}</span>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-5 h-5 text-yellow-400 fill-current" />
                        <span className="font-bold text-gray-900">{selectedProduct.rating}</span>
                        <span className="text-gray-600">({selectedProduct.reviewCount} reviews)</span>
                      </div>
                    </div>
                    
                    {/* Product Details */}
                    <div className="space-y-4 mb-6">
                      <div className="flex items-center justify-between py-2 border-b border-gray-200">
                        <span className="text-gray-600">Stock Status</span>
                        <span className={`font-bold ${selectedProduct.isOutOfStock ? 'text-red-600' : 'text-green-600'}`}>
                          {selectedProduct.isOutOfStock ? 'Out of Stock' : `In Stock (${selectedProduct.stockCount || 10} left)`}
                        </span>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b border-gray-200">
                        <span className="text-gray-600">Material</span>
                        <span className="text-gray-900 font-medium">{selectedProduct.material || 'Cotton'}</span>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b border-gray-200">
                        <span className="text-gray-600">Delivery</span>
                        <span className="text-red-600 font-medium">2-3 Business Days</span>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b border-gray-200">
                        <span className="text-gray-600">Return Policy</span>
                        <span className="text-green-600 font-medium">30 Days Return</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Action Buttons - FIXED: Using correct function name */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => handleAddToCartFromVirtualIsle(selectedProduct)}
                      disabled={selectedProduct.isOutOfStock}
                      className={`flex-1 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
                        selectedProduct.isOutOfStock
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-red-600 text-white hover:bg-red-700'
                      }`}
                    >
                      <ShoppingBag className="w-5 h-5" />
                      {selectedProduct.isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
                    </button>
                    <button 
                      onClick={open3DTryOn}
                      className="px-6 py-4 border border-red-600 text-red-600 rounded-xl font-bold hover:bg-red-50 transition-all flex items-center justify-center gap-2"
                    >
                      <RotateCw className="w-5 h-5" />
                      3D Try-On
                    </button>
                  </div>
                  
                  <p className="text-sm text-gray-600 mt-4 text-center">
                    Click "3D Try-On" to see this item on our virtual avatar
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3D Try-On Modal - Also remove scrollbar */}
      {show3DModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl max-w-5xl w-full border border-gray-200 shadow-2xl">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-3xl font-bold text-gray-900">3D Virtual Try-On</h3>
                  <p className="text-gray-600 mt-2">
                    Try {selectedProduct?.name || 'our clothing'} on our virtual avatar
                  </p>
                </div>
                <button
                  onClick={close3DModal}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-gray-700" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-4 flex flex-col items-center justify-center h-[400px]">
                  <div className="text-center mb-4">
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Virtual Avatar</h4>
                    <p className="text-gray-600">360° view with selected outfit</p>
                  </div>
                  
                  <div className="relative w-72 h-72 bg-white rounded-full flex items-center justify-center border-4 border-red-100 shadow-xl">
                    <div className="text-center">
                      <div className="text-7xl mb-4">👕</div>
                      <p className="text-gray-700 font-medium text-lg">
                        {selectedProduct?.name || 'Select an item'}
                      </p>
                      {selectedProduct && (
                        <p className="text-gray-600 mt-2">{selectedProduct.price}</p>
                      )}
                    </div>
                    
                    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3">
                      <button className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all">
                        <RotateCw className="w-5 h-5 text-gray-700" />
                      </button>
                      <button className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all">
                        <Maximize2 className="w-5 h-5 text-gray-700" />
                      </button>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mt-4 text-center">
                    Drag to rotate • Scroll to zoom
                  </p>
                </div>

                <div>
                  <div className="bg-gray-50 rounded-xl p-6 mb-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-4">Try-On Options</h4>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                          Avatar Type
                        </label>
                        <select className="w-full p-3 border border-gray-300 rounded-lg bg-white">
                          <option>Female Model</option>
                          <option>Male Model</option>
                          <option>Custom Avatar</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                          View Angle
                        </label>
                        <div className="flex gap-2">
                          {['Front', 'Back', 'Side', '360°'].map((angle) => (
                            <button
                              key={angle}
                              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
                            >
                              {angle}
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                          Current Outfit
                        </label>
                        <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
                          {selectedProduct ? (
                            <>
                              <div className="relative">
                                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-6 h-3 bg-gray-300 rounded-t-full"></div>
                                <img
                                  src={selectedProduct.image}
                                  alt={selectedProduct.name}
                                  className="w-16 h-16 object-cover rounded"
                                  onError={(e) => handleImageError(e, selectedProduct.image)}
                                />
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">{selectedProduct.name}</p>
                                <p className="text-sm text-gray-600">{selectedProduct.price}</p>
                              </div>
                            </>
                          ) : (
                            <p className="text-gray-600">No item selected</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        alert('Outfit saved to your profile!');
                        close3DModal();
                      }}
                      className="flex-1 py-4 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-all"
                    >
                      Save Outfit
                    </button>
                    <button
                      onClick={() => handleAddToCartFromVirtualIsle(selectedProduct)}
                      className="flex-1 py-4 border border-red-600 text-red-600 rounded-xl font-bold hover:bg-red-50 transition-all"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}