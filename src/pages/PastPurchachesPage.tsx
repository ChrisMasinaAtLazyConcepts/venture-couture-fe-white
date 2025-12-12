import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Package, Truck, CheckCircle, Clock, XCircle, RefreshCw, Eye, User, Download, Star, ChevronDown, ChevronUp, MapPin, CreditCard, Calendar, Hash, Phone, Mail, ShoppingBag, PenTool, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PurchaseItem {
  id: string;
  name: string;
  size: string;
  color: string;
  quantity: number;
  price: number;
  salePrice?: number;
  imageUrl: string;
  eligibleForReturn: boolean;
  returnDeadline: string;
  returnStatus?: 'eligible' | 'pending' | 'returned' | 'expired';
}

interface DeliverySignature {
  name: string;
  signatureUrl?: string;
  signedAt: string;
  type: 'customer' | 'family' | 'neighbor' | 'security';
}

interface Purchase {
  id: string;
  orderNumber: string;
  date: string;
  status: 'delivered' | 'processing' | 'shipped' | 'cancelled';
  totalAmount: number;
  items: PurchaseItem[];
  deliveryAddress: string;
  paymentMethod: string;
  trackingNumber?: string;
  carrier: string;
  estimatedDelivery?: string;
  deliveredAt?: string;
  signature?: DeliverySignature;
  rating?: number;
  review?: string;
}

const PastPurchasesPage: React.FC = () => {
  const navigate = useNavigate();
  const [expandedPurchase, setExpandedPurchase] = useState<string | null>(null);
  const [selectedItemForReturn, setSelectedItemForReturn] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [showSignatureModal, setShowSignatureModal] = useState<string | null>(null);
  
  // Mock data (same as before)
  const [purchases, setPurchases] = useState<Purchase[]>([
    {
      id: '1',
      orderNumber: 'ORD-7890',
      date: '2024-01-15',
      status: 'delivered',
      totalAmount: 2899.97,
      items: [
        {
          id: '1',
          name: 'Nike Air Max 270',
          size: 'US 10',
          color: 'Black/White',
          quantity: 1,
          price: 2499.99,
          imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
          eligibleForReturn: true,
          returnDeadline: '2024-02-14',
          returnStatus: 'eligible'
        },
        {
          id: '2',
          name: 'Running Socks',
          size: 'One Size',
          color: 'Black',
          quantity: 2,
          price: 199.99,
          imageUrl: 'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w-400&h=400&fit=crop',
          eligibleForReturn: true,
          returnDeadline: '2024-02-14',
          returnStatus: 'eligible'
        }
      ],
      deliveryAddress: '123 Main Street, Cape Town, 8001',
      paymentMethod: 'Credit Card (Visa)',
      trackingNumber: 'TRK789012345',
      carrier: 'The Courier Guy',
      estimatedDelivery: '2024-01-18',
      deliveredAt: '2024-01-17',
      signature: {
        name: 'John Doe',
        signatureUrl: 'https://signatures.com/sig123.png',
        signedAt: '2024-01-17 14:30',
        type: 'customer'
      },
      rating: 5,
      review: 'Great shoes! Very comfortable.'
    },
    {
      id: '2',
      orderNumber: 'ORD-7891',
      date: '2024-01-18',
      status: 'shipped',
      totalAmount: 2999.99,
      items: [
        {
          id: '3',
          name: 'Adidas Ultraboost 22',
          size: 'US 9',
          color: 'Core Black',
          quantity: 1,
          price: 2999.99,
          imageUrl: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=400&h=400&fit=crop',
          eligibleForReturn: true,
          returnDeadline: '2024-02-17',
          returnStatus: 'eligible'
        }
      ],
      deliveryAddress: '456 Oak Avenue, Johannesburg, 2000',
      paymentMethod: 'PayPal',
      trackingNumber: 'TRK789012346',
      carrier: 'Aramex',
      estimatedDelivery: '2024-01-22',
      deliveredAt: '2024-01-21',
      signature: {
        name: 'Sarah Smith',
        signedAt: '2024-01-21 11:15',
        type: 'customer'
      }
    },
    {
      id: '3',
      orderNumber: 'ORD-7892',
      date: '2024-01-10',
      status: 'delivered',
      totalAmount: 1799.99,
      items: [
        {
          id: '4',
          name: 'Puma RS-X',
          size: 'US 11',
          color: 'Red/Blue',
          quantity: 1,
          price: 1799.99,
          imageUrl: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop',
          eligibleForReturn: false,
          returnDeadline: '2024-02-09',
          returnStatus: 'expired'
        }
      ],
      deliveryAddress: '789 Pine Road, Durban, 4000',
      paymentMethod: 'Bank Transfer',
      trackingNumber: 'TRK789012347',
      carrier: 'DHL',
      estimatedDelivery: '2024-01-15',
      deliveredAt: '2024-01-14',
      signature: {
        name: 'Mike Johnson',
        signatureUrl: 'https://signatures.com/sig124.png',
        signedAt: '2024-01-14 16:45',
        type: 'family'
      },
      rating: 4
    },
    {
      id: '4',
      orderNumber: 'ORD-7893',
      date: '2024-01-25',
      status: 'processing',
      totalAmount: 5498.97,
      items: [
        {
          id: '5',
          name: 'New Balance 990v6',
          size: 'US 8.5',
          color: 'Grey',
          quantity: 1,
          price: 3499.99,
          imageUrl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop',
          eligibleForReturn: true,
          returnDeadline: '2024-02-24',
          returnStatus: 'eligible'
        },
        {
          id: '6',
          name: 'Nike Sport T-shirt',
          size: 'M',
          color: 'White',
          quantity: 3,
          price: 499.99,
          salePrice: 399.99,
          imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
          eligibleForReturn: true,
          returnDeadline: '2024-02-24',
          returnStatus: 'eligible'
        }
      ],
      deliveryAddress: '321 Beach Road, Port Elizabeth, 6001',
      paymentMethod: 'Credit Card (Mastercard)',
      carrier: 'FedEx',
      estimatedDelivery: '2024-01-30'
    },
    {
      id: '5',
      orderNumber: 'ORD-7894',
      date: '2024-02-01',
      status: 'delivered',
      totalAmount: 1299.99,
      items: [
        {
          id: '7',
          name: 'Converse Chuck 70',
          size: 'US 9',
          color: 'Black',
          quantity: 1,
          price: 1299.99,
          imageUrl: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400&h=400&fit=crop',
          eligibleForReturn: true,
          returnDeadline: '2024-03-02',
          returnStatus: 'eligible'
        }
      ],
      deliveryAddress: '654 Hill Street, Pretoria, 0001',
      paymentMethod: 'Ozow EFT',
      trackingNumber: 'TRK789012348',
      carrier: 'PostNet',
      estimatedDelivery: '2024-02-05',
      deliveredAt: '2024-02-04',
      signature: {
        name: 'Security Guard',
        signedAt: '2024-02-04 09:30',
        type: 'security'
      }
    }
  ]);

  // Update the icon import and usage
  const getStatusIcon = (status: Purchase['status']) => {
    switch (status) {
      case 'delivered': return <CheckCircle className="text-green-500" size={16} />;
      case 'processing': return <Clock className="text-yellow-500" size={16} />;
      case 'shipped': return <Truck className="text-blue-500" size={16} />;
      case 'cancelled': return <XCircle className="text-red-500" size={16} />;
    }
  };

  const getStatusColor = (status: Purchase['status']) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'shipped': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
    }
  };

  const getSignatureTypeColor = (type: DeliverySignature['type']) => {
    switch (type) {
      case 'customer': return 'bg-green-100 text-green-800';
      case 'family': return 'bg-blue-100 text-blue-800';
      case 'neighbor': return 'bg-purple-100 text-purple-800';
      case 'security': return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount: number) => {
    return `R${amount.toFixed(2)}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-ZA', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatDateTime = (dateTimeString: string) => {
    return new Date(dateTimeString).toLocaleString('en-ZA', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredPurchases = purchases.filter(purchase => {
    return filterStatus === 'all' || purchase.status === filterStatus;
  });

  const handleReturnItem = (purchaseId: string, itemId: string) => {
    // In a real app, this would initiate a return process
    console.log('Initiating return for item:', itemId, 'from purchase:', purchaseId);
    setSelectedItemForReturn(null);
    
    // Update the item's return status
    setPurchases(purchases.map(purchase => {
      if (purchase.id === purchaseId) {
        return {
          ...purchase,
          items: purchase.items.map(item => 
            item.id === itemId ? { ...item, returnStatus: 'pending' } : item
          )
        };
      }
      return purchase;
    }));
    
    alert('Return request submitted. You will receive a return label via email.');
  };

  const handleRateOrder = (purchaseId: string, rating: number) => {
    setPurchases(purchases.map(purchase => {
      if (purchase.id === purchaseId) {
        return { ...purchase, rating };
      }
      return purchase;
    }));
  };

  const renderStars = (rating: number, purchaseId: string) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => handleRateOrder(purchaseId, star)}
            className="focus:outline-none"
          >
            <Star
              size={18}
              className={star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft size={20} />
            Back to Account
          </button>
          <div className="flex justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Past Purchases</h1>
              <p className="text-gray-600 mt-2">View your order history and manage returns</p>
            </div>
            <button
              onClick={() => alert('This would download all purchase history')}
              className="hidden md:flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition"
            >
              <Download size={20} />
              Export History
            </button>
          </div>
        </div>

        {/* Stats & Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900">{purchases.length}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <ShoppingBag className="text-blue-600" size={24} />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Spent</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(purchases.reduce((sum, p) => sum + p.totalAmount, 0))}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <CreditCard className="text-green-600" size={24} />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Delivered</p>
                <p className="text-2xl font-bold text-gray-900">
                  {purchases.filter(p => p.status === 'delivered').length}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle className="text-green-600" size={24} />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">In Transit</p>
                <p className="text-2xl font-bold text-gray-900">
                  {purchases.filter(p => p.status === 'shipped').length}
                </p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Truck className="text-yellow-600" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilterStatus('all')}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  filterStatus === 'all' 
                    ? 'bg-red-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Orders
              </button>
              <button
                onClick={() => setFilterStatus('delivered')}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  filterStatus === 'delivered' 
                    ? 'bg-green-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Delivered
              </button>
              <button
                onClick={() => setFilterStatus('shipped')}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  filterStatus === 'shipped' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Shipped
              </button>
              <button
                onClick={() => setFilterStatus('processing')}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  filterStatus === 'processing' 
                    ? 'bg-yellow-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Processing
              </button>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search orders..."
                className="w-full md:w-64 p-3 pl-10 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
              <div className="absolute left-3 top-3.5">
                <ShoppingBag size={18} className="text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Purchases List */}
        <div className="space-y-6">
          {filteredPurchases.map((purchase) => (
            <div key={purchase.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Purchase Header */}
              <div 
                className="p-6 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition"
                onClick={() => setExpandedPurchase(expandedPurchase === purchase.id ? null : purchase.id)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-gray-900">{purchase.orderNumber}</h3>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(purchase.status)}
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(purchase.status)}`}>
                          {purchase.status.charAt(0).toUpperCase() + purchase.status.slice(1)}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>{formatDate(purchase.date)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Package size={14} />
                        <span>{purchase.items.length} item(s)</span>
                      </div>
                      {purchase.trackingNumber && (
                        <div className="flex items-center gap-1">
                          <Hash size={14} />
                          <span>{purchase.trackingNumber}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="text-xl font-bold text-gray-900">{formatCurrency(purchase.totalAmount)}</p>
                    <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg">
                      {expandedPurchase === purchase.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Expanded Purchase Details */}
              <AnimatePresence>
                {expandedPurchase === purchase.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-gray-200"
                  >
                    <div className="p-6">
                      {/* Items Grid */}
                      <div className="mb-8">
                        <h4 className="text-lg font-bold text-gray-900 mb-4">Items Purchased</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {purchase.items.map((item) => (
                            <div key={item.id} className="flex gap-4 p-4 border border-gray-200 rounded-lg">
                              <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                <img 
                                  src={item.imageUrl} 
                                  alt={item.name} 
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex-1">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h5 className="font-medium text-gray-900">{item.name}</h5>
                                    <p className="text-sm text-gray-600">
                                      {item.color} • {item.size} • Qty: {item.quantity}
                                    </p>
                                    <p className="font-bold text-gray-900 mt-1">
                                      {formatCurrency((item.salePrice || item.price) * item.quantity)}
                                    </p>
                                  </div>
                                  <div className="text-right">
                                    {item.eligibleForReturn && item.returnStatus === 'eligible' ? (
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setSelectedItemForReturn(`${purchase.id}-${item.id}`);
                                        }}
                                        className="px-3 py-1 bg-red-50 text-red-600 text-sm font-medium rounded-lg hover:bg-red-100 transition"
                                      >
                                        Return Item
                                      </button>
                                    ) : item.returnStatus === 'pending' ? (
                                      <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm font-medium rounded-lg">
                                        Return Pending
                                      </span>
                                    ) : item.returnStatus === 'expired' ? (
                                      <span className="px-3 py-1 bg-gray-100 text-gray-800 text-sm font-medium rounded-lg">
                                        Return Expired
                                      </span>
                                    ) : null}
                                    <p className="text-xs text-gray-500 mt-1">
                                      Return until {formatDate(item.returnDeadline)}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Order Details Grid */}
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Delivery Information */}
                        <div className="space-y-4">
                          <div className="bg-gray-50 rounded-lg p-4">
                            <h5 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                              <Truck size={16} className="text-red-600" />
                              Delivery Information
                            </h5>
                            <div className="space-y-2 text-sm">
                              <div className="flex items-start gap-2">
                                <MapPin size={14} className="text-gray-400 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-600">{purchase.deliveryAddress}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Package size={14} className="text-gray-400 flex-shrink-0" />
                                <span className="text-gray-600">Carrier: {purchase.carrier}</span>
                              </div>
                              {purchase.trackingNumber && (
                                <div className="flex items-center gap-2">
                                  <Hash size={14} className="text-gray-400 flex-shrink-0" />
                                  <span className="text-gray-600">Tracking: {purchase.trackingNumber}</span>
                                </div>
                              )}
                              {purchase.estimatedDelivery && (
                                <div className="flex items-center gap-2">
                                  <Calendar size={14} className="text-gray-400 flex-shrink-0" />
                                  <span className="text-gray-600">
                                    Estimated: {formatDate(purchase.estimatedDelivery)}
                                  </span>
                                </div>
                              )}
                              {purchase.deliveredAt && (
                                <div className="flex items-center gap-2">
                                  <CheckCircle size={14} className="text-green-500 flex-shrink-0" />
                                  <span className="text-green-600">
                                    Delivered: {formatDate(purchase.deliveredAt)}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Signature Information - Updated icon from Signature to PenTool */}
                          {purchase.signature && (
                            <div className="bg-gray-50 rounded-lg p-4">
                              <h5 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                <PenTool size={16} className="text-red-600" />
                                Delivery Signature
                              </h5>
                              <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <User size={14} className="text-gray-400" />
                                    <span className="text-gray-900 font-medium">{purchase.signature.name}</span>
                                  </div>
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSignatureTypeColor(purchase.signature.type)}`}>
                                    {purchase.signature.type.charAt(0).toUpperCase() + purchase.signature.type.slice(1)}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                  <Calendar size={14} className="flex-shrink-0" />
                                  <span>Signed: {formatDateTime(purchase.signature.signedAt)}</span>
                                </div>
                                {purchase.signature.signatureUrl && (
                                  <button
                                    onClick={() => setShowSignatureModal(purchase.id)}
                                    className="w-full flex items-center justify-center gap-2 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                                  >
                                    <Eye size={16} />
                                    View Signature
                                  </button>
                                )}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Payment & Status */}
                        <div className="space-y-4">
                          <div className="bg-gray-50 rounded-lg p-4">
                            <h5 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                              <CreditCard size={16} className="text-red-600" />
                              Payment Information
                            </h5>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-600">Method:</span>
                                <span className="font-medium text-gray-900">{purchase.paymentMethod}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Total:</span>
                                <span className="font-bold text-gray-900">{formatCurrency(purchase.totalAmount)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Order Date:</span>
                                <span className="font-medium text-gray-900">{formatDate(purchase.date)}</span>
                              </div>
                            </div>
                          </div>

                          {/* Order Status Timeline */}
                          <div className="bg-gray-50 rounded-lg p-4">
                            <h5 className="font-bold text-gray-900 mb-3">Order Status</h5>
                            <div className="space-y-3">
                              <div className="flex items-center gap-3">
                                <div className={`w-3 h-3 rounded-full ${purchase.status === 'delivered' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                <div>
                                  <p className="text-sm font-medium text-gray-900">Order Placed</p>
                                  <p className="text-xs text-gray-500">{formatDate(purchase.date)}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <div className={`w-3 h-3 rounded-full ${purchase.status === 'delivered' ? 'bg-green-500' : purchase.status === 'shipped' ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                                <div>
                                  <p className="text-sm font-medium text-gray-900">Shipped</p>
                                  {purchase.deliveredAt && (
                                    <p className="text-xs text-gray-500">{formatDate(purchase.deliveredAt)}</p>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <div className={`w-3 h-3 rounded-full ${purchase.status === 'delivered' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                <div>
                                  <p className="text-sm font-medium text-gray-900">Delivered</p>
                                  {purchase.deliveredAt && (
                                    <p className="text-xs text-gray-500">{formatDate(purchase.deliveredAt)}</p>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Rating & Actions */}
                        <div className="space-y-4">
                          {/* Rating */}
                          <div className="bg-gray-50 rounded-lg p-4">
                            <h5 className="font-bold text-gray-900 mb-3">Rate Your Order</h5>
                            <div className="flex items-center gap-3 mb-3">
                              {purchase.rating ? (
                                <>
                                  {renderStars(purchase.rating, purchase.id)}
                                  <span className="text-sm text-gray-600">{purchase.rating}/5</span>
                                </>
                              ) : (
                                renderStars(0, purchase.id)
                              )}
                            </div>
                            {purchase.review && (
                              <p className="text-sm text-gray-600 italic">"{purchase.review}"</p>
                            )}
                          </div>

                          {/* Actions */}
                          <div className="bg-gray-50 rounded-lg p-4">
                            <h5 className="font-bold text-gray-900 mb-3">Actions</h5>
                            <div className="space-y-2">
                              <button
                                onClick={() => alert(`Reorder ${purchase.orderNumber}`)}
                                className="w-full flex items-center justify-center gap-2 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition"
                              >
                                <RefreshCw size={16} />
                                Reorder Items
                              </button>
                              <button
                                onClick={() => navigate(`/invoice/${purchase.orderNumber}`)}
                                className="w-full flex items-center justify-center gap-2 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition"
                              >
                                <FileText size={16} />
                                View Invoice
                              </button>
                              {purchase.items.some(item => item.eligibleForReturn && item.returnStatus === 'eligible') && (
                                <button
                                  onClick={() => alert(`Initiate return for ${purchase.orderNumber}`)}
                                  className="w-full flex items-center justify-center gap-2 py-2 border border-red-300 text-red-600 rounded-lg font-medium hover:bg-red-50 transition"
                                >
                                  <RefreshCw size={16} />
                                  Return Items
                                </button>
                              )}
                              <button
                                onClick={() => alert(`Contact support for ${purchase.orderNumber}`)}
                                className="w-full flex items-center justify-center gap-2 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition"
                              >
                                <Mail size={16} />
                                Contact Support
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}

          {filteredPurchases.length === 0 && (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
              <ShoppingBag className="mx-auto text-gray-400" size={64} />
              <h3 className="mt-4 text-2xl font-bold text-gray-900">No purchases found</h3>
              <p className="mt-2 text-gray-600">You haven't made any purchases yet.</p>
              <button
                onClick={() => navigate('/products')}
                className="mt-6 px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition"
              >
                Start Shopping
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Return Item Modal */}
      <AnimatePresence>
        {selectedItemForReturn && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedItemForReturn(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl shadow-2xl max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-900">Return Item</h2>
                  <button
                    onClick={() => setSelectedItemForReturn(null)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <XCircle size={24} className="text-gray-500" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <p className="text-gray-600">
                  Are you sure you want to return this item? You will receive a return label via email.
                </p>
                
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Return Policy</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Items must be unused and in original packaging</li>
                    <li>• Return shipping is free for defective items</li>
                    <li>• Refunds are processed within 5-10 business days</li>
                    <li>• Store credit option available with 10% bonus</li>
                  </ul>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      const [purchaseId, itemId] = selectedItemForReturn.split('-');
                      handleReturnItem(purchaseId, itemId);
                    }}
                    className="flex-1 bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700 transition"
                  >
                    Confirm Return
                  </button>
                  <button
                    onClick={() => setSelectedItemForReturn(null)}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Signature Modal - Updated with PenTool instead of Signature */}
      <AnimatePresence>
        {showSignatureModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowSignatureModal(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl shadow-2xl max-w-lg w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-900">Delivery Signature</h2>
                  <button
                    onClick={() => setShowSignatureModal(null)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <XCircle size={24} className="text-gray-500" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                {purchases.find(p => p.id === showSignatureModal)?.signature?.signatureUrl ? (
                  <div className="text-center">
                    <div className="mb-6 p-4 bg-gray-100 rounded-lg">
                      <div className="h-48 flex items-center justify-center bg-white border-2 border-dashed border-gray-300 rounded-lg mb-4">
                        <div className="text-center">
                          <PenTool size={48} className="text-gray-400 mx-auto mb-2" />
                          <p className="text-lg font-bold text-gray-900">
                            {purchases.find(p => p.id === showSignatureModal)?.signature?.name}
                          </p>
                          <p className="text-sm text-gray-600">Digital Signature</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="text-left">
                          <p className="text-gray-600">Signed By</p>
                          <p className="font-medium text-gray-900">
                            {purchases.find(p => p.id === showSignatureModal)?.signature?.name}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-gray-600">Signature Type</p>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSignatureTypeColor(purchases.find(p => p.id === showSignatureModal)?.signature?.type || 'customer')}`}>
                            {purchases.find(p => p.id === showSignatureModal)?.signature?.type?.charAt(0).toUpperCase()}
                            {purchases.find(p => p.id === showSignatureModal)?.signature?.type?.slice(1)}
                          </span>
                        </div>
                        <div className="text-left">
                          <p className="text-gray-600">Signed At</p>
                          <p className="font-medium text-gray-900">
                            {formatDateTime(purchases.find(p => p.id === showSignatureModal)?.signature?.signedAt || '')}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-gray-600">Order</p>
                          <p className="font-medium text-gray-900">
                            {purchases.find(p => p.id === showSignatureModal)?.orderNumber}
                          </p>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => alert('Downloading signature...')}
                      className="w-full py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition"
                    >
                      Download Signature Proof
                    </button>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <PenTool size={64} className="text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-gray-900 mb-2">No Digital Signature Available</h3>
                    <p className="text-gray-600">
                      This delivery was signed for verbally or with a physical signature pad.
                    </p>
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">
                        Signed by: <span className="font-medium text-gray-900">
                          {purchases.find(p => p.id === showSignatureModal)?.signature?.name}
                        </span>
                      </p>
                      <p className="text-sm text-gray-600">
                        At: <span className="font-medium text-gray-900">
                          {formatDateTime(purchases.find(p => p.id === showSignatureModal)?.signature?.signedAt || '')}
                        </span>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PastPurchasesPage;