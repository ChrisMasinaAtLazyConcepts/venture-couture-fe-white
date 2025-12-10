import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Trash2, Plus, Minus, ChevronRight } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';

const CartModal: React.FC = () => {
  const { state, dispatch } = useCart();
  
  // This should be checking state.isCartOpen
  if (!state.isCartOpen) return null;
  
  
  const navigate = useNavigate();

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
          className="relative w-full max-w-md h-full bg-white shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white">
            <div className="flex items-center gap-3">
              <ShoppingBag size={24} className="text-gray-800" />
              <h2 className="text-2xl font-bold text-gray-900">Your Cart</h2>
            </div>
            <button
              onClick={closeCart}
              className="p-2 hover:bg-gray-100 rounded-lg transition text-gray-600 hover:text-gray-900"
            >
              <X size={24} />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto pb-32">
            {state.items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                <ShoppingBag size={64} className="text-gray-300 mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Your cart is empty</h3>
                <p className="text-gray-500 mb-6">Add items to get started</p>
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
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-600 transition"
                  >
                    <Trash2 size={16} />
                    Clear All
                  </button>
                </div>

                {/* Items List */}
                <div className="space-y-4">
                  {state.items.map((item) => (
                    <div
                      key={`${item.id}-${item.size}`}
                      className="flex gap-4 p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition"
                    >
                      {/* Product Image */}
                      <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        {item.imageUrl ? (
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-200">
                            <ShoppingBag className="text-gray-400" size={24} />
                          </div>
                        )}
                      </div>

                      {/* Product Details */}
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium text-gray-900">{item.name}</h3>
                            {item.color && (
                              <p className="text-sm text-gray-600 mt-1">Color: {item.color}</p>
                            )}
                            <p className="text-sm text-gray-600">Size: {item.size}</p>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-1 hover:bg-gray-100 rounded transition text-gray-400 hover:text-red-600"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                          {/* Quantity Controls */}
                          <div className="flex items-center border border-gray-300 rounded-lg">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-2 hover:bg-gray-100 transition"
                              disabled={item.quantity <= 1}
                            >
                              <Minus size={16} className={item.quantity <= 1 ? 'text-gray-300' : 'text-gray-700'} />
                            </button>
                            <span className="px-4 py-2 text-gray-900 font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-2 hover:bg-gray-100 transition"
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
                              </>
                            ) : (
                              <p className="text-lg font-bold text-gray-900">
                                R{(item.price * item.quantity).toFixed(2)}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Summary */}
                <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h3 className="font-bold text-gray-900 mb-3">Order Summary</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-gray-700">
                      <span>Subtotal ({state.itemCount} items)</span>
                      <span>R{state.total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-700">
                      <span>Shipping</span>
                      <span className="text-green-600 font-medium">Free</span>
                    </div>
                    <div className="border-t border-gray-300 pt-2 mt-2">
                      <div className="flex justify-between font-bold text-lg text-gray-900">
                        <span>Total</span>
                        <span>R{state.total.toFixed(2)}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">VAT included</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer with Checkout Button */}
          {state.items.length > 0 && (
            <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-6">
              <button
                onClick={proceedToCheckout}
                className="w-full bg-red-600 text-white py-4 rounded-lg font-bold hover:bg-red-700 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
              >
                Proceed to Checkout
                <ChevronRight size={20} />
              </button>
              <p className="text-center text-sm text-gray-500 mt-4">
                Free shipping on orders over R500
              </p>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CartModal;