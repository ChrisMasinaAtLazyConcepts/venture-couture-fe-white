import { useState } from 'react';
import { Package, Truck, CheckCircle, Clock, MapPin } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function OrderTracking() {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [orderData, setOrderData] = useState<any>(null);

  const mockOrder = {
    orderNumber: 'VC-2025-001',
    status: 'in_transit',
    estimatedDelivery: '2025-10-10',
    items: [
      { name: 'Ankara Print Maxi Dress', quantity: 1, size: 'M', price: 999 }
    ],
    timeline: [
      { status: 'Order Placed', date: '2025-10-06 10:30', completed: true, icon: CheckCircle },
      { status: 'Order Confirmed', date: '2025-10-06 11:15', completed: true, icon: CheckCircle },
      { status: 'Processing', date: '2025-10-06 14:00', completed: true, icon: Package },
      { status: 'Shipped', date: '2025-10-07 09:00', completed: true, icon: Truck },
      { status: 'In Transit', date: '2025-10-07 16:30', completed: true, icon: Truck, current: true },
      { status: 'Out for Delivery', date: 'Pending', completed: false, icon: MapPin },
      { status: 'Delivered', date: 'Pending', completed: false, icon: CheckCircle }
    ]
  };

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingNumber) {
      setOrderData(mockOrder);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">

      <div className=" text-black py-16">
        <div className="container mx-auto px-4 text-center">
          <Package size={48} className="mx-auto mb-4" />
          <h1 className="text-5xl font-bold mb-4">Track Your Order</h1>
          <p className="text-xl text-black">Enter your tracking number to see your order status</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                placeholder="Enter tracking or order number (e.g., VC-2025-001)"
                className="flex-1 px-6 py-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent"
              />
              <button
                type="submit"
                className="bg-[#B84037]  hover:from-orange-700 hover:via-red-700 hover:to-amber-700 text-white px-8 py-4 rounded-lg font-bold transition-all transform hover:scale-105 shadow-lg"
              >
                Track Order
              </button>
            </form>
          </div>

          {orderData && (
            <>
              <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-200">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Order {orderData.orderNumber}</h2>
                    <p className="text-gray-600">Estimated Delivery: <span className="font-bold text-orange-600">{orderData.estimatedDelivery}</span></p>
                  </div>
                  <div className="text-right">
                    <span className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-bold">
                      {orderData.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  {orderData.items.map((item: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-bold text-gray-900">{item.name}</h4>
                        <p className="text-sm text-gray-600">Size: {item.size} | Qty: {item.quantity}</p>
                      </div>
                      <p className="font-bold text-gray-900">R{item.price}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-8">Order Timeline</h3>
                <div className="relative">
                  <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>

                  {orderData.timeline.map((event: any, index: number) => {
                    const Icon = event.icon;
                    return (
                      <div key={index} className="relative flex items-start mb-8 last:mb-0">
                        <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center ${
                          event.completed
                            ? event.current
                              ? 'bg-gradient-to-br from-orange-600 to-red-600 ring-4 ring-orange-200'
                              : 'bg-gradient-to-br from-green-500 to-green-600'
                            : 'bg-gray-300'
                        }`}>
                          <Icon className="text-white" size={24} />
                        </div>
                        <div className="ml-6 flex-1">
                          <h4 className={`font-bold mb-1 ${
                            event.completed ? 'text-gray-900' : 'text-gray-500'
                          }`}>
                            {event.status}
                          </h4>
                          <p className={`text-sm ${
                            event.completed ? 'text-gray-600' : 'text-gray-400'
                          }`}>
                            {event.date}
                          </p>
                          {event.current && (
                            <div className="mt-2 inline-block bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-bold">
                              Current Status
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                <div className="flex items-start gap-4">
                  <MapPin className="text-blue-600 flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Delivery Address</h4>
                    <p className="text-gray-700">123 Main Street, Sandton, Johannesburg, 2196, South Africa</p>
                  </div>
                </div>
              </div>
            </>
          )}

          {!orderData && (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
              <Clock size={64} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Enter Your Tracking Number</h3>
              <p className="text-gray-600">Track your order in real-time and see when it will arrive</p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
