import { ShoppingCart, Search, User, Heart, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

export default function Header() {
  const { state, dispatch } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleCart = () => {
    dispatch({ type: 'TOGGLE_CART' });
  };

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
 {/* Top bar items */}
            <div className="flex items-center gap-4 pr-4 border-r border-gray-200">
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
            <button className="p-2 text-gray-700 hover:text-black hover:bg-gray-100 rounded transition" title="Account">
              <User size={18} />
            </button>
            <button 
              onClick={toggleCart}
              className="p-2 text-gray-700 hover:text-black hover:bg-gray-100 rounded transition relative"
              title="Cart"
            >
              <ShoppingCart size={18} />
              {state.itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">
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
            <div className="grid grid-cols-2 gap-2">
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
          </nav>
        )}
      </div>
    </header>
  );
}