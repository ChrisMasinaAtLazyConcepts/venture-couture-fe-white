import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Package, RefreshCw, Clock, CheckCircle, XCircle, AlertCircle, Plus, FileText, Truck, CreditCard, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface RefundRequest {
  id: string;
  orderId: string;
  orderDate: string;
  refundDate: string;
  items: {
    id: string;
    name: string;
    quantity: number;
    price: number;
    imageUrl?: string;
  }[];
  totalAmount: number;
  refundAmount: number;
  status: 'pending' | 'approved' | 'rejected' | 'processing' | 'completed';
  reason: string;
  method: 'original' | 'store-credit';
}

const RefundsAndReturnsPage: React.FC = () => {
  const navigate = useNavigate();
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<RefundRequest | null>(null);
  
  // Mock data
  const [refunds, setRefunds] = useState<RefundRequest[]>([
    {
      id: 'REF-001',
      orderId: 'ORD-7890',
      orderDate: '2024-01-15',
      refundDate: '2024-01-20',
      items: [
        { id: '1', name: 'Nike Air Max 270', quantity: 1, price: 2499.99 },
        { id: '2', name: 'Running Socks', quantity: 2, price: 199.99 },
      ],
      totalAmount: 2899.97,
      refundAmount: 2899.97,
      status: 'completed',
      reason: 'Wrong size ordered',
      method: 'original'
    },
    {
      id: 'REF-002',
      orderId: 'ORD-7891',
      orderDate: '2024-01-10',
      refundDate: '2024-01-18',
      items: [
        { id: '3', name: 'Adidas Ultraboost', quantity: 1, price: 2999.99 },
      ],
      totalAmount: 2999.99,
      refundAmount: 2999.99,
      status: 'processing',
      reason: 'Product defect',
      method: 'original'
    },
    {
      id: 'REF-003',
      orderId: 'ORD-7892',
      orderDate: '2024-01-05',
      refundDate: '2024-01-12',
      items: [
        { id: '4', name: 'Puma T-Shirt', quantity: 1, price: 499.99 },
        { id: '5', name: 'Puma Shorts', quantity: 1, price: 699.99 },
      ],
      totalAmount: 1199.98,
      refundAmount: 1199.98,
      status: 'approved',
      reason: 'Changed my mind',
      method: 'store-credit'
    },
    {
      id: 'REF-004',
      orderId: 'ORD-7893',
      orderDate: '2024-01-02',
      refundDate: '2024-01-08',
      items: [
        { id: '6', name: 'New Balance 574', quantity: 1, price: 1799.99 },
      ],
      totalAmount: 1799.99,
      refundAmount: 0,
      status: 'rejected',
      reason: 'Item used/worn',
      method: 'original'
    },
  ]);

  const [newRequest, setNewRequest] = useState({
    orderId: '',
    reason: '',
    items: [] as { id: string; name: string; quantity: number; reason: string }[],
    method: 'original' as 'original' | 'store-credit',
    comments: '',
  });

  const [orders, setOrders] = useState([
    { id: 'ORD-7894', date: '2024-01-20', items: [{ id: '7', name: 'Nike Air Force 1', quantity: 1 }], total: 2199.99, eligible: true },
    { id: 'ORD-7895', date: '2024-01-18', items: [{ id: '8', name: 'Adidas Hoodie', quantity: 1 }], total: 1299.99, eligible: true },
    { id: 'ORD-7896', date: '2024-01-12', items: [{ id: '9', name: 'Puma Backpack', quantity: 1 }], total: 899.99, eligible: false },
  ]);

  const getStatusIcon = (status: RefundRequest['status']) => {
    switch (status) {
      case 'pending': return <Clock className="text-yellow-500" size={16} />;
      case 'approved': return <CheckCircle className="text-green-500" size={16} />;
      case 'rejected': return <XCircle className="text-red-500" size={16} />;
      case 'processing': return <RefreshCw className="text-blue-500" size={16} />;
      case 'completed': return <CheckCircle className="text-green-500" size={16} />;
    }
  };

  const getStatusColor = (status: RefundRequest['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
    }
  };

  const handleSubmitRequest = () => {
    if (!newRequest.orderId || !newRequest.reason || newRequest.items.length === 0) return;

    const order = orders.find(o => o.id === newRequest.orderId);
    if (!order) return;

    const newRefund: RefundRequest = {
      id: `REF-00${refunds.length + 1}`,
      orderId: newRequest.orderId,
      orderDate: order.date,
      refundDate: new Date().toISOString().split('T')[0],
      items: order.items.map(item => ({
        ...item,
        price: 0, // In real app, this would come from order data
      })),
      totalAmount: order.total,
      refundAmount: order.total,
      status: 'pending',
      reason: newRequest.reason,
      method: newRequest.method
    };

    setRefunds([newRefund, ...refunds]);
    setNewRequest({
      orderId: '',
      reason: '',
      items: [],
      method: 'original',
      comments: '',
    });
    setShowRequestForm(false);
  };

  const handleSelectOrder = (orderId: string) => {
    const order = orders.find(o => o.id === orderId);
    if (order) {
      setNewRequest({
        ...newRequest,
        orderId,
        items: order.items.map(item => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          reason: ''
        }))
      });
    }
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
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Refunds & Returns</h1>
              <p className="text-gray-600 mt-2">Manage your returns and refund requests</p>
            </div>
            <button
              onClick={() => setShowRequestForm(true)}
              className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition"
            >
              <Plus size={20} />
              Request Refund
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Stats & Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Return Policy Card */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FileText size={20} className="text-red-600" />
                Return Policy
              </h2>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                  <span>30-day return policy from delivery date</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Items must be unused with original packaging</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Free return shipping on defective items</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Refunds processed within 5-10 business days</span>
                </li>
              </ul>
            </div>

            {/* Statistics */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Your Refunds</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">Total Requests</span>
                  <span className="font-bold text-gray-900">{refunds.length}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="text-gray-700">Successful</span>
                  <span className="font-bold text-green-700">
                    {refunds.filter(r => r.status === 'completed').length}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="text-gray-700">In Progress</span>
                  <span className="font-bold text-blue-700">
                    {refunds.filter(r => ['pending', 'approved', 'processing'].includes(r.status)).length}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                  <span className="text-gray-700">Rejected</span>
                  <span className="font-bold text-red-700">
                    {refunds.filter(r => r.status === 'rejected').length}
                  </span>
                </div>
              </div>
            </div>

            {/* Help Card */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <AlertCircle size={20} className="text-red-600" />
                Need Help?
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Our support team is here to help with your returns and refunds.
              </p>
              <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition">
                Contact Support
              </button>
            </div>
          </div>

          {/* Right Column - Refund History Table */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Refund History</h2>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Refund ID
                      </th>
                      <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order Details
                      </th>
                      <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {refunds.map((refund) => (
                      <tr key={refund.id} className="hover:bg-gray-50">
                        <td className="py-4 px-6">
                          <div>
                            <p className="font-medium text-gray-900">{refund.id}</p>
                            <p className="text-sm text-gray-500">Order: {refund.orderId}</p>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div>
                            <p className="font-medium text-gray-900">{refund.items.length} item(s)</p>
                            <p className="text-sm text-gray-500">
                              {refund.items[0]?.name}
                              {refund.items.length > 1 && ` +${refund.items.length - 1} more`}
                            </p>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <p className="font-bold text-gray-900">R{refund.refundAmount.toFixed(2)}</p>
                          <p className="text-sm text-gray-500 capitalize">{refund.method.replace('-', ' ')}</p>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(refund.status)}
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(refund.status)}`}>
                              {refund.status.charAt(0).toUpperCase() + refund.status.slice(1)}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <button
                            onClick={() => setSelectedRequest(refund)}
                            className="text-red-600 hover:text-red-800 text-sm font-medium"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {refunds.length === 0 && (
                <div className="text-center py-12">
                  <Package className="mx-auto text-gray-400" size={48} />
                  <h3 className="mt-4 text-lg font-medium text-gray-900">No refund requests</h3>
                  <p className="mt-2 text-gray-500">You haven't made any refund requests yet.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Request Refund Modal */}
      <AnimatePresence>
        {showRequestForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowRequestForm(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900">Request Refund</h2>
                  <button
                    onClick={() => setShowRequestForm(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <XCircle size={24} className="text-gray-500" />
                  </button>
                </div>
                <p className="text-gray-600 mt-2">Fill out the form below to request a refund</p>
              </div>

              <div className="p-6 space-y-6">
                {/* Step 1: Select Order */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                    <span className="w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-sm">1</span>
                    Select Order
                  </h3>
                  <div className="space-y-3">
                    {orders.map((order) => (
                      <button
                        key={order.id}
                        onClick={() => handleSelectOrder(order.id)}
                        className={`w-full p-4 border rounded-lg text-left transition-all ${
                          newRequest.orderId === order.id
                            ? 'border-red-600 bg-red-50'
                            : 'border-gray-300 hover:border-gray-400'
                        } ${!order.eligible ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={!order.eligible}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium text-gray-900">{order.id}</p>
                            <p className="text-sm text-gray-600">Ordered: {order.date}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-gray-900">R{order.total.toFixed(2)}</p>
                            {!order.eligible ? (
                              <p className="text-xs text-red-600">Not eligible for return</p>
                            ) : newRequest.orderId === order.id ? (
                              <p className="text-xs text-green-600">Selected</p>
                            ) : null}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 2: Select Items & Reason */}
                {newRequest.orderId && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                      <span className="w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-sm">2</span>
                      Select Items & Reason
                    </h3>
                    <div className="space-y-4">
                      {newRequest.items.map((item) => (
                        <div key={item.id} className="p-4 border border-gray-200 rounded-lg">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <p className="font-medium text-gray-900">{item.name}</p>
                              <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={true}
                                onChange={() => {}}
                                className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                              />
                              <span className="text-sm text-gray-600">Return</span>
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Reason for return
                            </label>
                            <select
                              value={item.reason}
                              onChange={(e) => {
                                const updatedItems = newRequest.items.map(i =>
                                  i.id === item.id ? { ...i, reason: e.target.value } : i
                                );
                                setNewRequest({ ...newRequest, items: updatedItems });
                              }}
                              className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            >
                              <option value="">Select reason</option>
                              <option value="wrong-size">Wrong size</option>
                              <option value="not-as-described">Not as described</option>
                              <option value="defective">Defective item</option>
                              <option value="changed-mind">Changed my mind</option>
                              <option value="better-price">Found better price</option>
                            </select>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 3: Refund Method */}
                {newRequest.orderId && newRequest.items.some(item => item.reason) && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                      <span className="w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-sm">3</span>
                      Refund Method
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <button
                        onClick={() => setNewRequest({ ...newRequest, method: 'original' })}
                        className={`p-4 border rounded-lg transition-all ${
                          newRequest.method === 'original' ? 'border-red-600 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <CreditCard size={24} className={newRequest.method === 'original' ? 'text-red-600' : 'text-gray-500'} />
                          <div className="text-left">
                            <p className={`font-medium ${newRequest.method === 'original' ? 'text-red-700' : 'text-gray-700'}`}>
                              Original Payment Method
                            </p>
                            <p className="text-sm text-gray-600">5-10 business days</p>
                          </div>
                        </div>
                      </button>
                      <button
                        onClick={() => setNewRequest({ ...newRequest, method: 'store-credit' })}
                        className={`p-4 border rounded-lg transition-all ${
                          newRequest.method === 'store-credit' ? 'border-red-600 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Package size={24} className={newRequest.method === 'store-credit' ? 'text-red-600' : 'text-gray-500'} />
                          <div className="text-left">
                            <p className={`font-medium ${newRequest.method === 'store-credit' ? 'text-red-700' : 'text-gray-700'}`}>
                              Store Credit
                            </p>
                            <p className="text-sm text-gray-600">Instant • +10% bonus</p>
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 4: Additional Comments */}
                {newRequest.orderId && newRequest.items.some(item => item.reason) && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                      <span className="w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-sm">4</span>
                      Additional Information
                    </h3>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Comments (Optional)
                      </label>
                      <textarea
                        value={newRequest.comments}
                        onChange={(e) => setNewRequest({ ...newRequest, comments: e.target.value })}
                        rows={3}
                        className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="Any additional information about your return..."
                      />
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <div className="flex gap-3 pt-4 border-t border-gray-200">
                  <button
                    onClick={handleSubmitRequest}
                    disabled={!newRequest.orderId || !newRequest.items.some(item => item.reason)}
                    className="flex-1 bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Submit Refund Request
                  </button>
                  <button
                    onClick={() => setShowRequestForm(false)}
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

      {/* Refund Details Modal */}
      <AnimatePresence>
        {selectedRequest && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedRequest(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-900">Refund Details</h2>
                  <button
                    onClick={() => setSelectedRequest(null)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <XCircle size={24} className="text-gray-500" />
                  </button>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  {getStatusIcon(selectedRequest.status)}
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedRequest.status)}`}>
                    {selectedRequest.status.charAt(0).toUpperCase() + selectedRequest.status.slice(1)}
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Order Info */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Order Information</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Refund ID</p>
                      <p className="font-medium text-gray-900">{selectedRequest.id}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Order ID</p>
                      <p className="font-medium text-gray-900">{selectedRequest.orderId}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Order Date</p>
                      <p className="font-medium text-gray-900">{selectedRequest.orderDate}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Refund Date</p>
                      <p className="font-medium text-gray-900">{selectedRequest.refundDate}</p>
                    </div>
                  </div>
                </div>

                {/* Items */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Items Returning</h3>
                  <div className="space-y-3">
                    {selectedRequest.items.map((item) => (
                      <div key={item.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{item.name}</p>
                          <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-bold text-gray-900">R{item.price.toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Summary */}
                <div className="border-t border-gray-200 pt-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-gray-700">
                      <span>Subtotal</span>
                      <span>R{selectedRequest.totalAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg text-gray-900">
                      <span>Refund Amount</span>
                      <span>R{selectedRequest.refundAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Truck size={14} />
                      <span>Return shipping label will be emailed to you</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RefundsAndReturnsPage;