import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Trash2, Plus, Minus, ChevronRight } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';

const CartModal: React.FC = () => {
  const { state, dispatch } = useCart();
  const navigate = useNavigate();
  const cartContentRef = useRef<HTMLDivElement>(null);

  const closeCart = () => {
    dispatch({ type: 'TOGGLE_CART' });
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(id);
      return;
    }
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const proceedToCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  // Close cart when pressing Escape key
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && state.isCartOpen) {
        closeCart();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, [state.isCartOpen]);

  // Prevent body scroll when cart is open
  useEffect(() => {
    if (state.isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [state.isCartOpen]);

  // Reset scroll position when cart opens
  useEffect(() => {
    if (state.isCartOpen && cartContentRef.current) {
      cartContentRef.current.scrollTop = 0;
    }
  }, [state.isCartOpen]);

  if (!state.isCartOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end"
        onClick={closeCart}
      >
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'tween', duration: 0.3 }}
          className="relative w-full max-w-md h-full bg-white shadow-2xl flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header - Fixed */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white flex-shrink-0">
            <div className="flex items-center gap-3">
              <ShoppingBag size={24} className="text-gray-800" />
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Your Cart</h2>
                <p className="text-sm text-gray-600 mt-1">
                  {state.itemCount} {state.itemCount === 1 ? 'item' : 'items'}
                </p>
              </div>
            </div>
            <button
              onClick={closeCart}
              className="p-2 hover:bg-gray-100 rounded-lg transition text-gray-600 hover:text-gray-900"
              aria-label="Close cart"
            >
              <X size={24} />
            </button>
          </div>

          {/* Cart Items - Scrollable */}
          <div 
            ref={cartContentRef}
            className="flex-1 overflow-y-auto overflow-x-hidden"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#9CA3AF transparent',
              scrollBehavior: 'smooth'
            }}
          >
            {state.items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                  <ShoppingBag size={64} className="text-gray-300" />
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Your cart is empty</h3>
                <p className="text-gray-500 mb-6">Add some products to get started</p>
                <button
                  onClick={closeCart}
                  className="px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="p-6">
                {/* Clear All Button */}
                <div className="flex justify-end mb-4">
                  <button
                    onClick={clearCart}
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-600 transition px-3 py-2 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 size={16} />
                    Clear All Items
                  </button>
                </div>

                {/* Items List */}
                <div className="space-y-4">
                  {state.items.map((item) => (
                    <motion.div
                      key={`${item.id}-${item.size}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex gap-4 p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition bg-white"
                    >
                      {/* Product Image */}
                      <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        {item.imageUrl ? (
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-200">
                            <ShoppingBag className="text-gray-400" size={20} />
                          </div>
                        )}
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <div className="min-w-0 pr-4">
                            <h3 className="font-medium text-gray-900 truncate">{item.name}</h3>
                            {item.color && (
                              <p className="text-sm text-gray-600 mt-1">Color: {item.color}</p>
                            )}
                            <p className="text-sm text-gray-600">Size: {item.size}</p>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-2 hover:bg-gray-100 rounded transition text-gray-400 hover:text-red-600 flex-shrink-0"
                            aria-label={`Remove ${item.name}`}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                          {/* Quantity Controls */}
                          <div className="flex items-center border border-gray-300 rounded-lg">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-2 hover:bg-gray-100 transition rounded-l-lg disabled:opacity-50 disabled:cursor-not-allowed"
                              disabled={item.quantity <= 1}
                              aria-label="Decrease quantity"
                            >
                              <Minus size={16} className={item.quantity <= 1 ? 'text-gray-300' : 'text-gray-700'} />
                            </button>
                            <span className="px-4 py-2 text-gray-900 font-medium min-w-[3rem] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-2 hover:bg-gray-100 transition rounded-r-lg"
                              aria-label="Increase quantity"
                            >
                              <Plus size={16} className="text-gray-700" />
                            </button>
                          </div>

                          {/* Price */}
                          <div className="text-right">
                            {item.salePrice ? (
                              <>
                                <p className="text-lg font-bold text-gray-900">
                                  R{(item.salePrice * item.quantity).toFixed(2)}
                                </p>
                                <p className="text-sm text-gray-500 line-through">
                                  R{(item.price * item.quantity).toFixed(2)}
                                </p>
                                <p className="text-xs text-green-600 font-medium mt-1">
                                  Save R{((item.price - item.salePrice) * item.quantity).toFixed(2)}
                                </p>
                              </>
                            ) : (
                              <p className="text-lg font-bold text-gray-900">
                                R{(item.price * item.quantity).toFixed(2)}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Order Summary */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <h3 className="font-bold text-gray-900 mb-3">Order Summary</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-gray-700">
                      <span>Subtotal ({state.itemCount} {state.itemCount === 1 ? 'item' : 'items'})</span>
                      <span>R{state.total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-700">
                      <span>Shipping</span>
                      <span className="text-green-600 font-medium">Free</span>
                    </div>
                    <div className="flex justify-between text-gray-700">
                      <span>Estimated Tax</span>
                      <span>R{(state.total * 0.15).toFixed(2)}</span>
                    </div>
                    <div className="border-t border-gray-300 pt-3 mt-3">
                      <div className="flex justify-between font-bold text-lg text-gray-900">
                        <span>Total</span>
                        <span>R{(state.total * 1.15).toFixed(2)}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">VAT included</p>
                    </div>
                  </div>
                </motion.div>

                {/* Shipping Info */}
                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2 text-sm text-green-800">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 font-bold text-xs">✓</span>
                    </div>
                    <span>Free shipping on all orders over R500</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer with Checkout Button - Fixed */}
          {state.items.length > 0 && (
            <div className="border-t border-gray-200 bg-white p-6 flex-shrink-0 shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="font-bold text-gray-900 text-lg">R{(state.total * 1.15).toFixed(2)}</p>
                  <p className="text-sm text-gray-600">Including VAT</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-green-600 font-medium">Free Shipping</p>
                  <p className="text-xs text-gray-500">Applied automatically</p>
                </div>
              </div>
              
              <button
                onClick={proceedToCheckout}
                className="w-full bg-red-600 text-white py-4 rounded-xl font-bold hover:bg-red-700 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl active:scale-[0.98]"
              >
                Proceed to Checkout
                <ChevronRight size={20} />
              </button>
              
              <div className="flex items-center justify-center gap-3 mt-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4 bg-gray-100 rounded flex items-center justify-center">
                    <span className="text-xs">✓</span>
                  </div>
                  <span>Secure Payment</span>
                </div>
                <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4 bg-gray-100 rounded flex items-center justify-center">
                    <span className="text-xs">✓</span>
                  </div>
                  <span>30-Day Returns</span>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CartModal;