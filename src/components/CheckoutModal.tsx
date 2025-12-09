import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, Lock, Shield, Check } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const CheckoutModal: React.FC = () => {
  const { state, dispatch } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | 'ozow'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setIsComplete(true);
    
    setTimeout(() => {
      dispatch({ type: 'CLEAR_CART' });
      dispatch({ type: 'CLOSE_CHECKOUT' });
      setIsComplete(false);
    }, 3000);
  };

  if (!state.showCheckout) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
        onClick={() => dispatch({ type: 'CLOSE_CHECKOUT' })}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-gradient-to-b from-white to-blue-50 border border-blue-200 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-blue-200 bg-blue-600">
            <div>
              <h2 className="text-2xl font-bold text-white">Secure Checkout</h2>
              <p className="text-sm text-blue-100 mt-1">Complete your purchase</p>
            </div>
            <button
              onClick={() => dispatch({ type: 'CLOSE_CHECKOUT' })}
              className="p-2 hover:bg-blue-700 rounded-lg transition text-white hover:text-blue-50"
            >
              <X size={20} />
            </button>
          </div>

          <div className="overflow-y-auto max-h-[calc(90vh-200px)]">
            {isComplete ? (
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="text-white" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h3>
                <p className="text-gray-600">Your order has been confirmed. You will receive an email with tracking details.</p>
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-700">Order #VC{Date.now().toString().slice(-6)}</p>
                  <p className="text-lg font-bold text-gray-900 mt-1">R{state.total.toFixed(2)}</p>
                </div>
              </div>
            ) : (
              <div className="p-6 space-y-6">
                {/* Order Summary */}
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <h3 className="font-bold text-gray-900 mb-3">Order Summary</h3>
                  <div className="space-y-3">
                    {state.items.map((item) => (
                      <div key={item.id} className="flex justify-between items-center">
                        <div>
                          <p className="font-medium text-gray-900">{item.name}</p>
                          <p className="text-sm text-gray-600">Qty: {item.quantity} • Size: {item.size}</p>
                        </div>
                        <p className="font-bold text-gray-900">R{((item.salePrice || item.price) * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-blue-200 pt-3 mt-3">
                    <div className="flex justify-between text-gray-700 text-sm">
                      <span>Subtotal</span>
                      <span>R{state.total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-700 text-sm mt-2">
                      <span>Shipping</span>
                      <span className="text-green-600">Free</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg text-gray-900 mt-3 pt-3 border-t border-blue-200">
                      <span>Total</span>
                      <span>R{state.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Payment Methods */}
                <div>
                  <h3 className="font-bold text-gray-900 mb-4">Payment Method</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <PaymentOption
                      method="card"
                      label="Credit Card"
                      icon={<CreditCard size={20} />}
                      selected={paymentMethod === 'card'}
                      onSelect={() => setPaymentMethod('card')}
                    />
                    <PaymentOption
                      method="paypal"
                      label="PayPal"
                      icon={<div className="text-blue-500 font-bold">PayPal</div>}
                      selected={paymentMethod === 'paypal'}
                      onSelect={() => setPaymentMethod('paypal')}
                    />
                    <PaymentOption
                      method="ozow"
                      label="Ozow"
                      icon={<div className="text-green-500 font-bold">OZOW</div>}
                      selected={paymentMethod === 'ozow'}
                      onSelect={() => setPaymentMethod('ozow')}
                    />
                  </div>
                </div>

                {/* Payment Form */}
                {paymentMethod === 'card' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Card Number
                      </label>
                      <input
                        type="text"
                        placeholder="•••• •••• •••• ••••"
                        className="w-full p-3 bg-white border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="w-full p-3 bg-white border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          CVV
                        </label>
                        <input
                          type="text"
                          placeholder="•••"
                          className="w-full p-3 bg-white border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Security Badge */}
                <div className="flex items-center justify-center gap-3 text-sm text-gray-600 bg-blue-50 p-3 rounded-lg border border-blue-200">
                  <Lock size={16} className="text-green-600" />
                  <Shield size={16} className="text-green-600" />
                  <span>256-bit SSL encryption • PCI compliant</span>
                </div>

                {/* Pay Button */}
                <button
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="w-full bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 text-white py-4 rounded-lg font-bold hover:from-blue-700 hover:via-blue-600 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    `Pay R${state.total.toFixed(2)}`
                  )}
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const PaymentOption: React.FC<{
  method: string;
  label: string;
  icon: React.ReactNode;
  selected: boolean;
  onSelect: () => void;
}> = ({ method, label, icon, selected, onSelect }) => (
  <button
    onClick={onSelect}
    className={`p-4 border rounded-lg transition-all ${
      selected
        ? 'border-blue-600 bg-blue-50'
        : 'border-blue-200 bg-white hover:border-blue-300'
    }`}
  >
    <div className="flex flex-col items-center gap-2">
      <div className={`p-2 rounded ${
        selected ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-600'
      }`}>
        {icon}
      </div>
      <span className={`font-medium ${selected ? 'text-blue-700' : 'text-gray-700'}`}>
        {label}
      </span>
    </div>
  </button>
);

export default CheckoutModal;