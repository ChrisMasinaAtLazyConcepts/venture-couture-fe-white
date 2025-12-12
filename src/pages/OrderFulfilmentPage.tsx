import { useState, useEffect } from 'react';
import { 
  Package, 
  Truck, 
  Warehouse, 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  Download, 
  Printer, 
  Flag, 
  ExternalLink, 
  MapPin, 
  User, 
  CreditCard, 
  Shield, 
  MessageCircle,
  MoreVertical,
  Star,
  ChevronRight
} from 'lucide-react';
import AdminHeader from '../components/AdminHeader';

interface TrackingEvent {
  id: string;
  status: string;
  location: string;
  timestamp: string;
  description: string;
  carrierUpdate?: boolean;
}

interface OrderStage {
  id: number;
  name: string;
  icon: React.ReactNode;
  status: 'completed' | 'active' | 'pending';
  date: string;
  time: string;
  estimatedDate: string;
  details: string[];
}

interface Carrier {
  name: string;
  trackingNumber: string;
  service: string;
  estimatedDelivery: string;
  currentStatus: string;
  trackingUrl: string;
}

interface OrderItem {
  id: string;
  name: string;
  sku: string;
  quantity: number;
  price: number;
  image: string;
  status: string;
}

interface Order {
  id: string;
  orderNumber: string;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  shipping: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
    instructions: string;
  };
  billing: {
    address: string;
    method: string;
    lastFour: string;
  };
  items: OrderItem[];
  placementDate: string;
  estimatedDelivery: string;
  guaranteedDelivery?: string;
  progress: number;
  currentStatus: string;
  carrier: Carrier;
  trackingEvents: TrackingEvent[];
  stages: OrderStage[];
  isDelayed: boolean;
  delayReason?: string;
  isOnTime: boolean;
  isShipped: boolean;
  isDelivered: boolean;
  deliveryWindow?: {
    start: string;
    end: string;
  };
  totalAmount: number;
  shippingCost: number;
  tax: number;
  grandTotal: number;
}

export default function OrderFulfillmentPage() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orders, setOrders] = useState<Order[]>([
    {
      id: '1',
      orderNumber: 'VC-2025-001',
      customer: {
        name: 'Sarah Ndlovu',
        email: 'sarah.ndlovu@example.com',
        phone: '+27 71 234 5678'
      },
      shipping: {
        address: '123 Main Street',
        city: 'Johannesburg',
        postalCode: '2000',
        country: 'South Africa',
        instructions: 'Leave at front door if no one answers'
      },
      billing: {
        address: '123 Main Street, Johannesburg 2000',
        method: 'Credit Card',
        lastFour: '4242'
      },
      items: [
        {
          id: '1',
          name: 'Ankara Print Maxi Dress',
          sku: 'VC-DRESS-001',
          quantity: 1,
          price: 1299,
          image: 'https://images.unsplash.com/photo-1567095761054-7a02e69e5c43',
          status: 'Shipped'
        },
        {
          id: '2',
          name: 'African Print Headwrap',
          sku: 'VC-ACC-005',
          quantity: 2,
          price: 299,
          image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b',
          status: 'Shipped'
        }
      ],
      placementDate: '2025-10-06 14:30:00',
      estimatedDelivery: '2025-10-12',
      guaranteedDelivery: '2025-10-12 by 9 PM',
      progress: 75,
      currentStatus: 'Out for delivery',
      carrier: {
        name: 'RAM Courier',
        trackingNumber: 'RAM789012345678',
        service: 'Standard Delivery',
        estimatedDelivery: '2025-10-12',
        currentStatus: 'On the way',
        trackingUrl: 'https://tracking.ram.co.za/789012345678'
      },
      trackingEvents: [
        {
          id: '1',
          status: 'Delivered',
          location: 'Johannesburg, South Africa',
          timestamp: '2025-10-12 10:30 AM',
          description: 'Delivered to front door'
        },
        {
          id: '2',
          status: 'Out for delivery',
          location: 'Johannesburg Distribution Center',
          timestamp: '2025-10-12 6:45 AM',
          description: 'Package left facility',
          carrierUpdate: true
        },
        {
          id: '3',
          status: 'Arrived at facility',
          location: 'Johannesburg Distribution Center',
          timestamp: '2025-10-11 11:20 PM',
          description: 'Arrived at local facility',
          carrierUpdate: true
        },
        {
          id: '4',
          status: 'In transit',
          location: 'Durban, South Africa',
          timestamp: '2025-10-10 3:15 PM',
          description: 'Departed from Durban hub',
          carrierUpdate: true
        },
        {
          id: '5',
          status: 'Shipped',
          location: 'Cape Town Warehouse',
          timestamp: '2025-10-09 2:30 PM',
          description: 'Package picked up by carrier',
          carrierUpdate: true
        },
        {
          id: '6',
          status: 'Order confirmed',
          location: 'Cape Town Warehouse',
          timestamp: '2025-10-06 2:45 PM',
          description: 'Order received and confirmed'
        }
      ],
      stages: [
        {
          id: 1,
          name: 'Order placed',
          icon: <CheckCircle size={20} />,
          status: 'completed',
          date: 'Oct 6',
          time: '2:30 PM',
          estimatedDate: 'Oct 6',
          details: ['Payment confirmed', 'Order received']
        },
        {
          id: 2,
          name: 'Processing',
          icon: <Package size={20} />,
          status: 'completed',
          date: 'Oct 7',
          time: '10:15 AM',
          estimatedDate: 'Oct 7',
          details: ['Items picked', 'Quality checked']
        },
        {
          id: 3,
          name: 'Shipped',
          icon: <Truck size={20} />,
          status: 'completed',
          date: 'Oct 9',
          time: '2:30 PM',
          estimatedDate: 'Oct 9',
          details: ['Carrier: RAM Courier', 'Tracking number issued']
        },
        {
          id: 4,
          name: 'In transit',
          icon: <Warehouse size={20} />,
          status: 'active',
          date: 'Oct 10',
          time: '3:15 PM',
          estimatedDate: 'Oct 11',
          details: ['Expected delivery: Oct 12', 'Last scan: Johannesburg']
        },
        {
          id: 5,
          name: 'Out for delivery',
          icon: <Truck size={20} />,
          status: 'pending',
          date: 'Estimated Oct 12',
          time: '8:00 AM',
          estimatedDate: 'Oct 12',
          details: ['Delivery window: 9 AM - 9 PM']
        },
        {
          id: 6,
          name: 'Delivered',
          icon: <CheckCircle size={20} />,
          status: 'pending',
          date: '',
          time: '',
          estimatedDate: 'Oct 12',
          details: []
        }
      ],
      isDelayed: false,
      isOnTime: true,
      isShipped: true,
      isDelivered: false,
      deliveryWindow: {
        start: '9:00 AM',
        end: '9:00 PM'
      },
      totalAmount: 1299,
      shippingCost: 99,
      tax: 259.8,
      grandTotal: 1657.8
    }
  ]);

  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Amazon-style progress bar with milestones
  const ProgressBar = ({ progress, stages }: { progress: number; stages: OrderStage[] }) => {
    const completedStages = stages.filter(s => s.status === 'completed').length;
    const totalStages = stages.length;
    
    return (
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-bold text-gray-700">Order Progress</span>
          <span className="text-sm font-bold text-orange-600">{progress}% Complete</span>
        </div>
        
        {/* Main progress bar */}
        <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="absolute left-0 top-0 h-full bg-gradient-to-r from-orange-500 to-orange-600 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
          
          {/* Stage markers */}
          <div className="absolute inset-0 flex justify-between items-center px-1">
            {stages.map((stage, index) => (
              <div key={stage.id} className="relative">
                <div className={`w-3 h-3 rounded-full border-2 ${
                  stage.status === 'completed' ? 'bg-orange-600 border-orange-600' :
                  stage.status === 'active' ? 'bg-white border-orange-600' :
                  'bg-white border-gray-300'
                }`} />
                <div className="absolute top-5 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-xs text-gray-600">
                  {stage.name}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Stage details */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-8">
          {stages.map((stage) => (
            <div key={stage.id} className={`p-3 rounded-lg border ${
              stage.status === 'completed' ? 'bg-green-50 border-green-200' :
              stage.status === 'active' ? 'bg-orange-50 border-orange-200' :
              'bg-gray-50 border-gray-200'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                <div className={`p-1 rounded ${
                  stage.status === 'completed' ? 'bg-green-100 text-green-600' :
                  stage.status === 'active' ? 'bg-orange-100 text-orange-600' :
                  'bg-gray-100 text-gray-400'
                }`}>
                  {stage.icon}
                </div>
                <span className={`text-sm font-bold ${
                  stage.status === 'completed' ? 'text-green-700' :
                  stage.status === 'active' ? 'text-orange-700' :
                  'text-gray-500'
                }`}>
                  {stage.name}
                </span>
              </div>
              <div className="text-xs text-gray-600">
                {stage.status === 'completed' ? `Completed ${stage.date}` :
                 stage.status === 'active' ? 'In progress' :
                 'Pending'}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Amazon-style tracking timeline
  const TrackingTimeline = ({ events }: { events: TrackingEvent[] }) => (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900">Tracking Updates</h3>
        <a 
          href={selectedOrder?.carrier.trackingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-orange-600 hover:text-orange-700 font-bold"
        >
          <ExternalLink size={16} />
          Track on carrier website
        </a>
      </div>
      
      <div className="space-y-6">
        {events.map((event, index) => (
          <div key={event.id} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className={`w-3 h-3 rounded-full ${
                index === 0 ? 'bg-green-500' : 'bg-gray-300'
              }`} />
              {index < events.length - 1 && (
                <div className="w-0.5 h-12 bg-gray-300 mt-1" />
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex justify-between items-start mb-1">
                <span className={`font-bold ${
                  index === 0 ? 'text-green-700' : 'text-gray-700'
                }`}>
                  {event.status}
                </span>
                <span className="text-sm text-gray-500">{event.timestamp}</span>
              </div>
              
              <div className="flex items-center gap-2 mb-1">
                <MapPin size={14} className="text-gray-400" />
                <span className="text-sm text-gray-600">{event.location}</span>
                {event.carrierUpdate && (
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                    Carrier Update
                  </span>
                )}
              </div>
              
              <p className="text-sm text-gray-600">{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Order summary card (Amazon-style)
  const OrderSummary = ({ order }: { order: Order }) => (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h3>
      
      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="text-gray-600">Items total:</span>
          <span className="font-bold">R{order.totalAmount.toLocaleString()}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping:</span>
          <span className="font-bold">R{order.shippingCost.toLocaleString()}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Tax:</span>
          <span className="font-bold">R{order.tax.toLocaleString()}</span>
        </div>
        
        <div className="border-t pt-4 flex justify-between">
          <span className="text-lg font-bold text-gray-900">Order total:</span>
          <span className="text-xl font-bold text-orange-600">
            R{order.grandTotal.toLocaleString()}
          </span>
        </div>
      </div>
      
      <div className="mt-6 pt-6 border-t">
        <h4 className="font-bold text-gray-900 mb-3">Carrier Information</h4>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Carrier:</span>
            <span className="font-bold">{order.carrier.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Tracking #:</span>
            <span className="font-bold text-blue-600">{order.carrier.trackingNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Service:</span>
            <span>{order.carrier.service}</span>
          </div>
        </div>
      </div>
    </div>
  );

  // Order items list
  const OrderItems = ({ items }: { items: OrderItem[] }) => (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Order Items</h3>
      
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex gap-4 p-3 border border-gray-100 rounded-lg hover:bg-gray-50">
            <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center">
              <Package className="text-gray-400" size={24} />
            </div>
            
            <div className="flex-1">
              <h4 className="font-bold text-gray-900 mb-1">{item.name}</h4>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>SKU: {item.sku}</span>
                <span>Qty: {item.quantity}</span>
                <span>Price: R{item.price}</span>
              </div>
            </div>
            
            <div className={`px-3 py-1 rounded-full text-xs font-bold ${
              item.status === 'Shipped' ? 'bg-green-100 text-green-700' :
              'bg-yellow-100 text-yellow-700'
            }`}>
              {item.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Report generation section (Amazon-style)
  const ReportSection = () => (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900">Generate Reports</h3>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-bold text-gray-700 transition">
            <Printer size={16} />
            Print Summary
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-sm font-bold transition">
            <Download size={16} />
            Download PDF
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button className="p-4 border border-gray-200 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition text-left">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
              <BarChart size={20} />
            </div>
            <span className="font-bold text-gray-900">Delivery Performance</span>
          </div>
          <p className="text-sm text-gray-600">On-time delivery rates and delays</p>
        </button>
        
        <button className="p-4 border border-gray-200 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition text-left">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-100 text-green-600 rounded-lg">
              <Truck size={20} />
            </div>
            <span className="font-bold text-gray-900">Carrier Analytics</span>
          </div>
          <p className="text-sm text-gray-600">Performance by shipping provider</p>
        </button>
        
        <button className="p-4 border border-gray-200 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition text-left">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
              <Flag size={20} />
            </div>
            <span className="font-bold text-gray-900">Issue Reports</span>
          </div>
          <p className="text-sm text-gray-600">Delays, damages, and complaints</p>
        </button>
      </div>
    </div>
  );

  // Filter buttons (Amazon-style)
  const FilterButtons = () => (
    <div className="flex flex-wrap gap-2 mb-6">
      <button
        onClick={() => setFilter('all')}
        className={`px-4 py-2 rounded-full text-sm font-bold transition ${
          filter === 'all' 
          ? 'bg-orange-600 text-white' 
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        All Orders
      </button>
      <button
        onClick={() => setFilter('in-transit')}
        className={`px-4 py-2 rounded-full text-sm font-bold transition ${
          filter === 'in-transit' 
          ? 'bg-orange-600 text-white' 
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        In Transit
      </button>
      <button
        onClick={() => setFilter('delayed')}
        className={`px-4 py-2 rounded-full text-sm font-bold transition ${
          filter === 'delayed' 
          ? 'bg-orange-600 text-white' 
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        Delayed Orders
      </button>
      <button
        onClick={() => setFilter('delivered')}
        className={`px-4 py-2 rounded-full text-sm font-bold transition ${
          filter === 'delivered' 
          ? 'bg-orange-600 text-white' 
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        Delivered
      </button>
      <button
        onClick={() => setFilter('pending')}
        className={`px-4 py-2 rounded-full text-sm font-bold transition ${
          filter === 'pending' 
          ? 'bg-orange-600 text-white' 
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        Pending Shipment
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      
      {/* Header */}
      <div className="bg-[#B84037] text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Order Fulfillment & Tracking</h1>
              <p className="text-white/90 mt-1">Monitor orders from placement to delivery</p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search orders or tracking..."
                  className="pl-10 pr-4 py-2 rounded-lg bg-white/10 placeholder-white/70 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="absolute left-3 top-2.5">
                  <svg className="w-5 h-5 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filter buttons */}
        <FilterButtons />
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Orders list sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-bold text-gray-900">Recent Orders</h3>
              </div>
              
              <div className="divide-y divide-gray-100">
                {orders.map((order) => (
                  <button
                    key={order.id}
                    onClick={() => setSelectedOrder(order)}
                    className={`w-full p-4 text-left hover:bg-gray-50 transition ${
                      selectedOrder?.id === order.id ? 'bg-orange-50 border-l-4 border-orange-500' : ''
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-bold text-gray-900">{order.orderNumber}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        order.isDelayed ? 'bg-red-100 text-red-700' :
                        order.isOnTime ? 'bg-green-100 text-green-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {order.isDelayed ? 'Delayed' : order.currentStatus}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-2">{order.customer.name}</p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Placed: {order.placementDate.split(' ')[0]}</span>
                      <span>R{order.grandTotal}</span>
                    </div>
                    
                    {order.isDelayed && (
                      <div className="mt-2 flex items-center gap-1 text-xs text-red-600">
                        <AlertCircle size={12} />
                        <span>Check for updates</span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Quick stats */}
            <div className="mt-6 bg-white rounded-lg border border-gray-200 p-4">
              <h4 className="font-bold text-gray-900 mb-3">Fulfillment Stats</h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">On-time delivery</span>
                    <span className="text-sm font-bold text-green-600">94%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500" style={{ width: '94%' }} />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">Avg processing time</span>
                    <span className="text-sm font-bold text-gray-900">1.2 days</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500" style={{ width: '80%' }} />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">Carrier performance</span>
                    <span className="text-sm font-bold text-amber-600">88%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500" style={{ width: '88%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Main content */}
          <div className="lg:col-span-3">
            {selectedOrder ? (
              <>
                {/* Order header */}
                <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-xl font-bold text-gray-900">
                          Order {selectedOrder.orderNumber}
                        </h2>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          selectedOrder.isDelayed ? 'bg-red-100 text-red-700' :
                          selectedOrder.isOnTime ? 'bg-green-100 text-green-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {selectedOrder.currentStatus}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>Placed on: {selectedOrder.placementDate}</span>
                        <span>•</span>
                        <span>Customer: {selectedOrder.customer.name}</span>
                        <span>•</span>
                        <span className="font-bold text-gray-900">
                          R{selectedOrder.grandTotal.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-bold text-gray-700 transition">
                        <MessageCircle size={16} />
                        Contact Customer
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-sm font-bold transition">
                        <Flag size={16} />
                        Flag Issue
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600">
                        <MoreVertical size={20} />
                      </button>
                    </div>
                  </div>
                  
                  {/* Delivery promise */}
                  <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Shield className="text-orange-600" size={18} />
                          <span className="font-bold text-gray-900">Delivery Guarantee</span>
                        </div>
                        <p className="text-sm text-gray-600">
                          {selectedOrder.guaranteedDelivery || `Estimated delivery: ${selectedOrder.estimatedDelivery}`}
                        </p>
                      </div>
                      {selectedOrder.isOnTime && !selectedOrder.isDelayed && (
                        <span className="flex items-center gap-1 text-sm text-green-600 font-bold">
                          <CheckCircle size={16} />
                          On track
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Progress bar */}
                <ProgressBar progress={selectedOrder.progress} stages={selectedOrder.stages} />
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                  <div className="lg:col-span-2">
                    <TrackingTimeline events={selectedOrder.trackingEvents} />
                  </div>
                  <div>
                    <OrderSummary order={selectedOrder} />
                  </div>
                </div>
                
                <OrderItems items={selectedOrder.items} />
                
                {/* Report section */}
                <div className="mt-6">
                  <ReportSection />
                </div>
              </>
            ) : (
              <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="text-gray-400" size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No Order Selected</h3>
                <p className="text-gray-600 mb-6">Select an order from the list to view tracking and fulfillment details</p>
                <button className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg transition">
                  View Sample Order
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}