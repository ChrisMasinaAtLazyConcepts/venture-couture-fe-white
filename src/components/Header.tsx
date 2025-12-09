import { ShoppingCart, Search, User, Heart, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext'; // Adjust path if needed

export default function Header() {
  const { state, dispatch } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleCart = () => {
    dispatch({ type: 'TOGGLE_CART' });
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 pt-3">
       

        {/* Main header */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <a href="/" className="flex items-center">
            <div className="flex items-center gap-2 pt-4">
              <div className="hidden sm:block">
                <img src="/assets/images/vc.logo1.png" className="w-40 h-25" />
              </div>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {['Home', 'Women', 'Men', 'Accessories', 'New', 'Collections'].map((item) => (
              <a
                key={item}
                href="/"
                className="px-4 py-2 text-gray-800 hover:text-black hover:bg-gray-100 rounded-lg transition font-medium text-sm"
              >
                {item}
              </a>
            ))}
            <a
              href="/sale"
              className="px-4 py-2 bg-black text-white rounded-lg font-bold hover:bg-gray-800 transition ml-2"
            >
              SALE
            </a>
          </nav>

          {/* Right side icons */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate('/search')}
              className="p-2 text-gray-700 hover:text-black hover:bg-gray-100 rounded-lg transition"
            >
              <Search size={20} />
            </button>
            <button className="p-2 text-gray-700 hover:text-black hover:bg-gray-100 rounded-lg transition">
              <Heart size={20} />
            </button>
            <button className="p-2 text-gray-700 hover:text-black hover:bg-gray-100 rounded-lg transition">
              <User size={20} />
            </button>
            <button 
              onClick={toggleCart}
              className="p-2 text-gray-700 hover:text-black hover:bg-gray-100 rounded-lg transition relative"
            >
              <ShoppingCart size={20} />
              {state.itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {state.itemCount}
                </span>
              )}
            </button>
            
            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 text-gray-700 hover:text-black hover:bg-gray-100 rounded-lg transition"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <nav className="lg:hidden border-t border-gray-200 py-4">
            <div className="grid grid-cols-2 gap-2">
              {['Home', 'Women', 'Men', 'Accessories', 'New Arrivals', 'Collections', 'Size Guide', 'About Us'].map((item) => (
                <a
                  key={item}
                  href={`/${item.toLowerCase().replace(' ', '-')}`}
                  className="px-4 py-3 text-gray-800 hover:text-black hover:bg-gray-100 rounded-lg transition font-medium text-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <a
                href="/sale"
                className="px-4 py-3 bg-black text-white rounded-lg font-bold hover:bg-gray-800 transition col-span-2 text-center"
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