import { ShoppingCart, ChevronRight, Trash2, X } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useState } from 'react';

export default function CartFooter() {
  const { state, dispatch } = useCart();
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  
  if (state.itemCount === 0 || !isVisible) return null;

  const toggleCart = () => {
    dispatch({ type: 'TOGGLE_CART' });
  };

  const toggleCheckout = () => {
    dispatch({ type: 'OPEN_CHECKOUT' });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
    setShowClearConfirm(false);
  };

  const handleClearClick = () => {
    if (showClearConfirm) {
      clearCart();
    } else {
      setShowClearConfirm(true);
      // Auto-hide confirmation after 3 seconds
      setTimeout(() => {
        setShowClearConfirm(false);
      }, 3000);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div className="bg-gradient-to-r from-gray-900 via-black to-gray-900 border-t-2 border-gray-800 shadow-2xl">
        <div className="container mx-auto px-4 py-3 relative">
          {/* Close Button */}
          <button
            onClick={() => setIsVisible(false)}
            className="absolute top-1/2 -translate-y-1/2 right-4 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 text-white rounded-full hover:from-gray-600 hover:via-gray-500 hover:to-gray-600 transition-all shadow-lg hover:shadow-xl"
            aria-label="Close cart footer"
            title="Hide cart summary"
          >
            <X size={18} className="md:w-5 md:h-5" />
          </button>
          
          <div className="flex items-center justify-between pr-12 md:pr-14">
            <div className="flex items-center gap-4">
              <div className="relative">
                <ShoppingCart className="text-white" size={24} />
                <span className="absolute -top-2 -right-2 bg-white text-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {state.itemCount}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-300">{state.itemCount} item{state.itemCount !== 1 ? 's' : ''} in cart</p>
                <p className="text-lg font-bold text-white">R{state.total.toFixed(2)}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Clear Cart Button */}
              <button
                onClick={handleClearClick}
                className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 text-sm font-medium ${
                  showClearConfirm
                    ? 'bg-white text-black hover:bg-gray-100'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
                title={showClearConfirm ? "Click again to confirm" : "Clear all items"}
              >
                <Trash2 size={16} />
                {showClearConfirm ? 'Confirm Clear' : 'Clear Cart'}
              </button>
              
              {/* View Cart Button */}
              <button
                onClick={toggleCart}
                className="px-4 py-2 border border-gray-700 text-gray-300 hover:text-white hover:border-gray-600 rounded-lg transition text-sm"
              >
                View Cart
              </button>
              
              {/* Checkout Button */}
              <button
                onClick={toggleCheckout}
                className="px-6 py-2 bg-white text-black font-bold rounded-lg hover:bg-gray-100 transition-all flex items-center gap-2 shadow-lg"
              >
                Checkout
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}