import { ShoppingCart, Search, User, Heart, Menu, X, Package, FileText, CreditCard, HelpCircle, LogOut, Settings, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

export default function Header() {
  const { state, dispatch } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  // Mock user authentication state - you can replace this with actual auth logic
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Change to false for logged out state
  const [userName] = useState('John Doe');

  const toggleCart = () => {
    dispatch({ type: 'TOGGLE_CART' });
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsUserMenuOpen(false);
    // Add your logout logic here
    console.log('User logged out');
    navigate('/');
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    // Add your login logic here
    console.log('User logged in');
    navigate('/login');
  };

  const userMenuItems = [
    { icon: <User size={16} />, label: 'My Profile', href: '/profile' },
    { icon: <Package size={16} />, label: 'Past Purchases', href: '/orders' },
    { icon: <FileText size={16} />, label: 'Invoices', href: '/invoices' },
    { icon: <Package size={16} />, label: 'Returns & Exchanges', href: '/returns' },
    { icon: <CreditCard size={16} />, label: 'Manage Cards', href: '/payment-methods' },
    { icon: <Settings size={16} />, label: 'Account Settings', href: '/settings' },
    { icon: <HelpCircle size={16} />, label: 'Support', href: '/support' },
    { icon: <LogOut size={16} />, label: 'Logout', onClick: handleLogout, isDanger: true },
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        {/* Main header - all items in one line */}
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center flex-shrink-0">
            <div className="flex items-center">
              <img src="/assets/images/vc.logo1.png" className="object-contain w-60 h-20" />
            </div>
          </a>

          {/* Desktop Navigation with Top Bar items integrated */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Main navigation */}
            <nav className="flex items-center gap-1">
              {['Home', 'Women', 'Men', 'Accessories', 'New', 'Collections'].map((item) => (
                <a
                  key={item}
                  href="/"
                  className="px-3 py-2 text-gray-800 hover:text-black hover:bg-gray-100 rounded transition font-medium text-sm"
                >
                  {item}
                </a>
              ))}
              <a
                href="/sale"
                className="px-3 py-2 bg-black text-white rounded font-bold hover:bg-gray-800 transition text-sm ml-1"
              >
                SALE
              </a>
            </nav>
          </div>
          
          <div className="hidden lg:flex items-center gap-4 pr-4 border-r border-gray-200">
            <a href="/contact" className="text-gray-600 hover:text-black transition text-sm font-medium">
              Contact
            </a>
            <a href="/track-order" className="text-red-600 hover:text-black transition text-sm font-medium">
              Track Order
            </a>
          </div>

          {/* Right side icons */}
          <div className="flex items-center gap-2">
            <button 
              onClick={() => navigate('/search')}
              className="p-2 text-gray-700 hover:text-black hover:bg-gray-100 rounded transition"
              title="Search"
            >
              <Search size={18} />
            </button>
            <button className="p-2 text-gray-700 hover:text-black hover:bg-gray-100 rounded transition" title="Wishlist">
              <Heart size={18} />
            </button>
            
            {/* User Account Menu */}
            <div className="relative">
              {isLoggedIn ? (
                <>
                  <button
                    onClick={toggleUserMenu}
                    className="p-2 text-gray-700 hover:text-black hover:bg-gray-100 rounded transition flex items-center gap-1"
                    title="Account"
                  >
                    <User size={18} />
                    <ChevronDown size={14} className={`transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {/* User Dropdown Menu */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50 py-2">
                      {/* User Info */}
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="font-medium text-gray-900">{userName}</p>
                        <p className="text-sm text-gray-600">Premium Member</p>
                      </div>
                      
                      {/* Menu Items */}
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
                  className="p-2 text-gray-700 hover:text-black hover:bg-gray-100 rounded transition flex items-center gap-1"
                  title="Login"
                >
                  <User size={18} />
                  <span className="text-sm hidden md:inline">Login</span>
                </button>
              )}
            </div>
            
            <button 
              onClick={toggleCart}
              className="p-2 text-gray-700 hover:text-black hover:bg-gray-100 rounded transition relative"
              title="Cart"
            >
              <ShoppingCart size={18} />
              {state.itemCount > 0 && (
                <span className="bg-red-600 absolute -top-1 -right-1 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">
                  {state.itemCount}
                </span>
              )}
            </button>
            
            {/* Mobile menu button */}
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
          <nav className="lg:hidden border-t border-gray-200 pt-4 mt-3">
            {/* Mobile Top Bar Items */}
            <div className="pl-10 flex flex-wrap gap-3 mb-4 pb-4 border-b border-gray-200">
              <a href="/contact" className="text-gray-600 hover:text-black transition text-sm font-medium">
                Contact
              </a>
              <a href="/track-order" className="text-gray-600 hover:text-black transition text-sm font-medium">
                Track Order
              </a>
            </div>
            
            {/* Mobile Navigation */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              {['Home', 'Women', 'Men', 'Accessories', 'New Arrivals', 'Collections', 'Size Guide', 'About Us'].map((item) => (
                <a
                  key={item}
                  href={`/${item.toLowerCase().replace(' ', '-')}`}
                  className="px-3 py-2 text-gray-800 hover:text-black hover:bg-gray-100 rounded transition font-medium text-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <a
                href="/sale"
                className="px-3 py-2 bg-black text-white rounded font-bold hover:bg-gray-800 transition col-span-2 text-center text-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                SALE - UP TO 50% OFF
              </a>
            </div>

            {/* Mobile User Menu (only shows if logged in) */}
            {isLoggedIn && (
              <div className="border-t border-gray-200 pt-4">
                <div className="px-4 mb-3">
                  <p className="font-medium text-gray-900">{userName}</p>
                  <p className="text-sm text-gray-600">Premium Member</p>
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
                          ? 'text-red-600 hover:bg-red-50 hover:text-red-700' 
                          : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                    >
                      <span className="flex-shrink-0 ">{item.icon}</span>
                      <span>{item.label}</span>
                   Cart
                    </a>
                  ))}
                  {/* Logout button full width */}
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="col-span-2 flex items-center justify-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 rounded transition mt-2"
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}

            {/* Mobile Login Button (only shows if logged out) */}
            {!isLoggedIn && (
              <div className="border-t border-gray-200 pt-4">
                <button
                  onClick={() => {
                    handleLogin();
                    setIsMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 px-3 py-3 bg-gray-900 text-white rounded font-medium hover:bg-black transition"
                >
                  <User size={18} />
                  <span>Login / Register</span>
                </button>
                <p className="text-center text-sm text-gray-600 mt-2">
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