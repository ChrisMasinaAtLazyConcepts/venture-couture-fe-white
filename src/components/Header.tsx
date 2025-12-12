import { ShoppingCart, Search, User, Heart, Menu, X, Package, FileText, CreditCard, HelpCircle, LogOut, Settings, ChevronDown, Tag } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

export default function Header() {
  const { state, dispatch } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [showTopBar, setShowTopBar] = useState(true);
  const navigate = useNavigate();
  
  // Mock user authentication state
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userName] = useState('Kalenda@vc.co.za');

  // Use refs for stable values
  const lastScrollY = useRef(0);
  const scrollCount = useRef(0);
  const scrollDirection = useRef('none'); // 'up' or 'down'
  const scrollTimeout = useRef(null);
  const isTopBarVisible = useRef(true);
  const lastToggleTime = useRef(0); // Timestamp of last toggle
  const throttleTimeout = useRef(null); // For scroll throttling

  // Simple, efficient scroll handler
  const handleScroll = () => {
    // Throttle scroll events to reduce processing
    if (throttleTimeout.current) {
      return; // Skip this scroll event if we're still processing
    }
    
    throttleTimeout.current = setTimeout(() => {
      const currentScrollY = window.scrollY;
      const currentDirection = currentScrollY > lastScrollY.current ? 'down' : 'up';
      const now = Date.now();
      
      // Always show at top of page
      if (currentScrollY <= 100) {
        if (!isTopBarVisible.current) {
          isTopBarVisible.current = true;
          setShowTopBar(true);
          scrollCount.current = 0; // Reset counter
          lastToggleTime.current = now;
        }
        lastScrollY.current = currentScrollY;
        throttleTimeout.current = null;
        return;
      }
      
      // Reset counter if direction changes
      if (currentDirection !== scrollDirection.current) {
        scrollCount.current = 0;
        scrollDirection.current = currentDirection;
      }
      
      // Increment scroll count for current direction
      scrollCount.current++;
      
      // Only toggle after 4 scroll events in the same direction
      // AND only if at least 1 second has passed since last toggle
      if (scrollCount.current >= 4 && (now - lastToggleTime.current) > 1000) {
        // Show when scrolling up, hide when scrolling down
        const shouldShow = currentDirection === 'up';
        
        // Only update if state actually changed
        if (shouldShow !== isTopBarVisible.current) {
          isTopBarVisible.current = shouldShow;
          setShowTopBar(shouldShow);
          lastToggleTime.current = now;
          
          // Reset count to 2 (so it takes 2 more scrolls to toggle again)
          scrollCount.current = 2;
        }
      }
      
      lastScrollY.current = currentScrollY;
      throttleTimeout.current = null;
    }, 50); // 50ms throttle for smoothness
  };

  useEffect(() => {
    // Initial scroll position
    lastScrollY.current = window.scrollY;
    
    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      if (throttleTimeout.current) {
        clearTimeout(throttleTimeout.current);
      }
    };
  }, []);

  const toggleCart = () => {
    dispatch({ type: 'TOGGLE_CART' });
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsUserMenuOpen(false);
    navigate('/');
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    navigate('/admin-dashboard');
  };

  const userMenuItems = [
    { icon: <User size={16} />, label: 'My Profile', href: '/profile' },
    { icon: <Package size={16} />, label: 'Past Purchases', href: '/orders' },
    { icon: <FileText size={16} />, label: 'Invoices', href: '/invoices' },
    { icon: <Package size={16} />, label: 'Returns & Exchanges', href: '/returns' },
    { icon: <CreditCard size={16} />, label: 'Manage Payment Methods', href: '/payment-methods' },
    { icon: <HelpCircle size={16} />, label: 'Support', href: '/support' },
    { icon: <LogOut size={16} />, label: 'Logout', onClick: handleLogout, isDanger: true },
  ];

  return (
    <header className="bg-black sticky top-0 z-50 shadow-sm">
      {/* Top Bar - VC Login Section */}
      <div 
        className={`bg-black border-b border-gray-800 transition-all duration-300 ease-in-out ${
          showTopBar 
            ? 'translate-y-0 opacity-100 h-auto' // Visible state
            : '-translate-y-full opacity-0 h-0 overflow-hidden' // Hidden state
        }`}
      >
        <div className="container mx-auto px-4 py-2">
          <div className="flex justify-center items-center">
            <h2 className="text-gray-300 flex items-baseline">
              <span className="align-middle">Venture</span>
              <strong className="text-white ml-1 align-middle">Couture</strong>
            </h2>
            <button
              onClick={() => navigate('/admin-login')}
              className="px-4 py-2 text-sm font-medium bg-transparent text-white hover:bg-white hover:text-black rounded transition ml-2 hover:border-white"
              title="Staff Login"
            >
              VC Login
            </button>
          </div>
        </div>
      </div>
      
      {/* Main Header */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <a href="/" className="flex items-center flex-shrink-0">
            <div className="flex flex-col items-center">
              <img 
                src="/assets/images/vc.logo.png" 
                className="object-contain w-40 h-25" 
                alt="Venture Couture" 
              />
            </div>
          </a>

          <div className="hidden lg:flex items-center gap-4">
            <nav className="flex items-center gap-1">
              {['Home', 'Women', 'Men', 'Accessories', 'New', 'Collections'].map((item) => (
                <a
                  key={item}
                  href="/"
                  className="mr-5 px-3 py-2 text-white hover:text-black hover:bg-gray-100 rounded transition font-medium text-sm"
                >
                  {item}
                </a>
              ))}
              <a
                href="/sale"
                className="mr-4 flex items-center px-4 py-2 text-red-400 rounded transition font-medium text-sm ml-1 hover:bg-red-400/10"
              >
                <Tag className="w-3 h-3 mr-2" />
                <span>Red Sale</span>
              </a>
              <a
                href="/track-order"
                className="px-3 py-2 text-white border rounded transition font-medium text-sm ml-1 hover:bg-white/10"
              >
                Track Order
              </a>
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => navigate('/search')}
              className="p-2 text-gray-700 hover:text-black hover:bg-gray-100 rounded transition"
              title="Search"
            >
              <Search size={18} className="text-white" />
            </button>
            <button className="p-2 text-white hover:text-black hover:bg-gray-100 rounded transition" title="Wishlist">
              <Heart size={18} />
            </button>
            
            <div className="relative">
              {isLoggedIn ? (
                <>
                  <button
                    onClick={toggleUserMenu}
                    className="p-2 text-white hover:text-black hover:bg-gray-100 rounded transition flex items-center gap-1"
                    title="Account"
                  >
                    <User size={18} className="text-white" />
                    <ChevronDown 
                      size={14} 
                      className={`text-white transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} 
                    />
                  </button>
                  
                  {isUserMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50 py-2">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="font-medium text-gray-900">{userName}</p>
                        <p className="text-sm text-gray-600">Premium Member</p>
                      </div>
                      
                      <div className="py-1">
                        {userMenuItems.map((item, index) => (
                          <a
                            key={index}
                            href={item.href}
                            onClick={(e) => {
                              if (item.onClick) {
                                e.preventDefault();
                                item.onClick();
                              }
                              setIsUserMenuOpen(false);
                            }}
                            className={`flex items-center gap-3 px-4 py-3 text-sm transition ${
                              item.isDanger 
                                ? 'text-red-600 hover:bg-red-50 hover:text-red-700' 
                                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                            }`}
                          >
                            <span className="flex-shrink-0">{item.icon}</span>
                            <span>{item.label}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <button
                  onClick={handleLogin}
                  className="p-2 text-white hover:text-black hover:bg-gray-100 rounded transition flex items-center gap-1"
                  title="Login"
                >
                  <User size={18} />
                  <span className="text-sm hidden md:inline">Login</span>
                </button>
              )}
            </div>
            
            <button 
              onClick={toggleCart}
              className="p-2 text-white hover:text-black hover:bg-gray-100 rounded transition relative"
              title="Cart"
            >
              <ShoppingCart size={18} />
              {state.itemCount > 0 && (
                <span className="bg-red-600 absolute -top-1 -right-1 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">
                  {state.itemCount}
                </span>
              )}
            </button>
            
            <button
              className="lg:hidden p-2 text-gray-700 hover:text-black hover:bg-gray-100 rounded transition ml-1"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <nav className="lg:hidden border-t border-gray-800 pt-4 mt-3">
            <div className="pl-10 flex flex-wrap gap-3 mb-4 pb-4 border-b border-gray-800">
              <a href="/contact" className="text-gray-400 hover:text-white transition text-sm font-medium">
                Contact
              </a>
              <a href="/track-order" className="text-gray-400 hover:text-white transition text-sm font-medium">
                Track Order
              </a>
            </div>
            
            <div className="grid grid-cols-2 gap-2 mb-4">
              {['Home', 'Women', 'Men', 'Accessories', 'New Arrivals', 'Collections', 'Size Guide', 'About Us'].map((item) => (
                <a
                  key={item}
                  href={`/${item.toLowerCase().replace(' ', '-')}`}
                  className="px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded transition font-medium text-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <a
                href="/sale"
                className="px-3 py-2 bg-white text-red rounded font-bold hover:bg-gray-800 transition col-span-2 text-center text-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                SALE - UP TO 50% OFF
              </a>
            </div>

            {isLoggedIn && (
              <div className="border-t border-gray-800 pt-4">
                <div className="px-4 mb-3">
                  <p className="font-medium text-gray-300">{userName}</p>
                  <p className="text-sm text-gray-400">Premium Member</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {userMenuItems.slice(0, 6).map((item, index) => (
                    <a
                      key={index}
                      href={item.href}
                      onClick={(e) => {
                        if (item.onClick) {
                          e.preventDefault();
                          item.onClick();
                        }
                        setIsMenuOpen(false);
                      }}
                      className={`flex items-center gap-2 px-3 py-2 text-sm rounded transition ${
                        item.isDanger 
                          ? 'text-red-400 hover:bg-red-900/30 hover:text-red-300' 
                          : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                      }`}
                    >
                      <span className="flex-shrink-0">{item.icon}</span>
                      <span>{item.label}</span>
                    </a>
                  ))}
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="col-span-2 flex items-center justify-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-red-900/30 hover:text-red-300 rounded transition mt-2"
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}

            {!isLoggedIn && (
              <div className="border-t border-gray-800 pt-4">
                <button
                  onClick={() => {
                    handleLogin();
                    setIsMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 px-3 py-3 bg-gray-800 text-white rounded font-medium hover:bg-gray-700 transition"
                >
                  <User size={18} />
                  <span>Login / Register</span>
                </button>
                <p className="text-center text-sm text-gray-400 mt-2">
                  Access your orders, wishlist, and more
                </p>
              </div>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}