import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, FileText, Download, Printer, Mail, Calendar, Package, ChevronDown, ChevronUp, Eye, CreditCard, Building, User, MapPin, Hash, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface InvoiceItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  total: number;
}

interface Invoice {
  id: string;
  invoiceNumber: string;
  orderId: string;
  date: string;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue' | 'draft';
  totalAmount: number;
  taxAmount: number;
  subtotal: number;
  items: InvoiceItem[];
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
  };
  paymentMethod: string;
  paymentDate?: string;
  notes?: string;
}

const InvoicesPage: React.FC = () => {
  const navigate = useNavigate();
  const [expandedInvoice, setExpandedInvoice] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock data
  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: '1',
      invoiceNumber: 'INV-2024-001',
      orderId: 'ORD-7890',
      date: '2024-01-15',
      dueDate: '2024-02-14',
      status: 'paid',
      totalAmount: 2899.97,
      taxAmount: 434.99,
      subtotal: 2464.98,
      items: [
        { id: '1', name: 'Nike Air Max 270', quantity: 1, price: 2499.99, total: 2499.99 },
        { id: '2', name: 'Running Socks', quantity: 2, price: 199.99, total: 399.98 },
      ],
      customer: {
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+27 83 123 4567',
        address: '123 Main Street',
        city: 'Cape Town',
        postalCode: '8001'
      },
      paymentMethod: 'Credit Card (Visa)',
      paymentDate: '2024-01-15',
      notes: 'Thank you for your business!'
    },
    {
      id: '2',
      invoiceNumber: 'INV-2024-002',
      orderId: 'ORD-7891',
      date: '2024-01-18',
      dueDate: '2024-02-17',
      status: 'pending',
      totalAmount: 2999.99,
      taxAmount: 450.00,
      subtotal: 2549.99,
      items: [
        { id: '3', name: 'Adidas Ultraboost 22', quantity: 1, price: 2999.99, total: 2999.99 },
      ],
      customer: {
        name: 'Sarah Smith',
        email: 'sarah.smith@example.com',
        phone: '+27 83 987 6543',
        address: '456 Oak Avenue',
        city: 'Johannesburg',
        postalCode: '2000'
      },
      paymentMethod: 'PayPal',
      notes: 'Payment due within 30 days'
    },
    {
      id: '3',
      invoiceNumber: 'INV-2024-003',
      orderId: 'ORD-7892',
      date: '2024-01-10',
      dueDate: '2024-02-09',
      status: 'overdue',
      totalAmount: 1799.99,
      taxAmount: 270.00,
      subtotal: 1529.99,
      items: [
        { id: '4', name: 'Puma RS-X', quantity: 1, price: 1799.99, total: 1799.99 },
      ],
      customer: {
        name: 'Mike Johnson',
        email: 'mike.j@example.com',
        phone: '+27 83 555 1234',
        address: '789 Pine Road',
        city: 'Durban',
        postalCode: '4000'
      },
      paymentMethod: 'Bank Transfer',
      notes: 'Please make payment as soon as possible'
    },
    {
      id: '4',
      invoiceNumber: 'INV-2024-004',
      orderId: 'ORD-7893',
      date: '2024-01-25',
      dueDate: '2024-02-24',
      status: 'paid',
      totalAmount: 5498.97,
      taxAmount: 824.85,
      subtotal: 4674.12,
      items: [
        { id: '5', name: 'New Balance 990v6', quantity: 1, price: 3499.99, total: 3499.99 },
        { id: '6', name: 'Nike Sport T-shirt', quantity: 3, price: 499.99, total: 1499.97 },
        { id: '7', name: 'Adidas Track Pants', quantity: 1, price: 799.99, total: 799.99 },
      ],
      customer: {
        name: 'Emma Wilson',
        email: 'emma.w@example.com',
        phone: '+27 83 777 8888',
        address: '321 Beach Road',
        city: 'Port Elizabeth',
        postalCode: '6001'
      },
      paymentMethod: 'Credit Card (Mastercard)',
      paymentDate: '2024-01-26',
      notes: 'Bulk order discount applied'
    },
    {
      id: '5',
      invoiceNumber: 'INV-2024-005',
      orderId: 'ORD-7894',
      date: '2024-02-01',
      dueDate: '2024-03-02',
      status: 'pending',
      totalAmount: 1299.99,
      taxAmount: 195.00,
      subtotal: 1104.99,
      items: [
        { id: '8', name: 'Converse Chuck 70', quantity: 1, price: 1299.99, total: 1299.99 },
      ],
      customer: {
        name: 'David Brown',
        email: 'david.b@example.com',
        phone: '+27 83 222 3333',
        address: '654 Hill Street',
        city: 'Pretoria',
        postalCode: '0001'
      },
      paymentMethod: 'Ozow EFT',
      notes: ''
    },
  ]);

  const getStatusIcon = (status: Invoice['status']) => {
    switch (status) {
      case 'paid': return <CheckCircle className="text-green-500" size={16} />;
      case 'pending': return <Calendar className="text-yellow-500" size={16} />;
      case 'overdue': return <span className="text-red-500 font-bold text-sm">R</span>;
      case 'draft': return <FileText className="text-gray-500" size={16} />;
    }
  };

  const getStatusColor = (status: Invoice['status']) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
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

  const filteredInvoices = invoices.filter(invoice => {
    const matchesStatus = filterStatus === 'all' || invoice.status === filterStatus;
    const matchesSearch = invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.customer.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const stats = {
    total: invoices.length,
    paid: invoices.filter(i => i.status === 'paid').length,
    pending: invoices.filter(i => i.status === 'pending').length,
    overdue: invoices.filter(i => i.status === 'overdue').length,
    totalAmount: invoices.reduce((sum, invoice) => sum + invoice.totalAmount, 0),
    paidAmount: invoices.filter(i => i.status === 'paid').reduce((sum, invoice) => sum + invoice.totalAmount, 0),
  };

  const handlePrintInvoice = (invoice: Invoice) => {
    // In a real app, this would generate a PDF
    console.log('Printing invoice:', invoice.invoiceNumber);
    alert(`Printing invoice ${invoice.invoiceNumber}`);
  };

  const handleDownloadInvoice = (invoice: Invoice) => {
    // In a real app, this would download a PDF
    console.log('Downloading invoice:', invoice.invoiceNumber);
    alert(`Downloading invoice ${invoice.invoiceNumber} as PDF`);
  };

  const handleSendInvoice = (invoice: Invoice) => {
    // In a real app, this would send via email
    console.log('Sending invoice:', invoice.invoiceNumber);
    alert(`Invoice ${invoice.invoiceNumber} sent to ${invoice.customer.email}`);
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
              <h1 className="text-3xl font-bold text-gray-900">Invoices</h1>
              <p className="text-gray-600 mt-2">View and manage your invoices</p>
            </div>
            <button
              onClick={() => alert('This would generate a new invoice in a real app')}
              className="hidden md:flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition"
            >
              <FileText size={20} />
              Create Invoice
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Invoices</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <FileText className="text-blue-600" size={24} />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Amount</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.totalAmount)}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <span className="text-green-600 font-bold text-xl">R</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Paid Invoices</p>
                <p className="text-2xl font-bold text-gray-900">{stats.paid}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle className="text-green-600" size={24} />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Outstanding</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.totalAmount - stats.paidAmount)}</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Calendar className="text-yellow-600" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search invoices by number, order ID, or customer..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full p-3 pl-10 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
                <div className="absolute left-3 top-3.5">
                  <FileText size={18} className="text-gray-400" />
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="overdue">Overdue</option>
                <option value="draft">Draft</option>
              </select>
              <button
                onClick={() => alert('Export functionality would be implemented here')}
                className="flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition"
              >
                <Download size={18} />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Invoices Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Invoice History</h2>
            <p className="text-gray-600 text-sm mt-1">{filteredInvoices.length} invoices found</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Invoice
                  </th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
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
                {filteredInvoices.map((invoice) => (
                  <React.Fragment key={invoice.id}>
                    <tr className="hover:bg-gray-50 cursor-pointer" onClick={() => setExpandedInvoice(expandedInvoice === invoice.id ? null : invoice.id)}>
                      <td className="py-4 px-6">
                        <div>
                          <p className="font-medium text-gray-900">{invoice.invoiceNumber}</p>
                          <p className="text-sm text-gray-500">Order: {invoice.orderId}</p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <p className="font-medium text-gray-900">{invoice.customer.name}</p>
                        <p className="text-sm text-gray-500">{invoice.customer.email}</p>
                      </td>
                      <td className="py-4 px-6">
                        <p className="font-medium text-gray-900">{formatDate(invoice.date)}</p>
                        <p className="text-sm text-gray-500">Due: {formatDate(invoice.dueDate)}</p>
                      </td>
                      <td className="py-4 px-6">
                        <p className="font-bold text-gray-900">{formatCurrency(invoice.totalAmount)}</p>
                        <p className="text-sm text-gray-500">{invoice.items.length} item(s)</p>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(invoice.status)}
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                            {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setExpandedInvoice(expandedInvoice === invoice.id ? null : invoice.id);
                            }}
                            className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg"
                          >
                            {expandedInvoice === invoice.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDownloadInvoice(invoice);
                            }}
                            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                          >
                            <Download size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                    
                    {/* Expanded Invoice Details */}
                    <AnimatePresence>
                      {expandedInvoice === invoice.id && (
                        <motion.tr
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <td colSpan={6} className="p-0">
                            <div className="bg-gray-50 border-t border-gray-200">
                              <div className="p-6">
                                {/* Invoice Header */}
                                <div className="flex justify-between items-start mb-8">
                                  <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Invoice Details</h3>
                                    <div className="flex items-center gap-4 text-sm text-gray-600">
                                      <div className="flex items-center gap-1">
                                        <Hash size={14} />
                                        <span>{invoice.invoiceNumber}</span>
                                      </div>
                                      <div className="flex items-center gap-1">
                                        <Calendar size={14} />
                                        <span>Issued: {formatDate(invoice.date)}</span>
                                      </div>
                                      <div className="flex items-center gap-1">
                                        <Calendar size={14} />
                                        <span>Due: {formatDate(invoice.dueDate)}</span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <div className="flex items-center gap-2 mb-2">
                                      {getStatusIcon(invoice.status)}
                                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(invoice.status)}`}>
                                        {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                                      </span>
                                    </div>
                                    <p className="text-2xl font-bold text-gray-900">{formatCurrency(invoice.totalAmount)}</p>
                                  </div>
                                </div>

                                {/* Two Column Layout */}
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                  {/* Left Column - Customer & Company Info */}
                                  <div className="lg:col-span-1 space-y-6">
                                    {/* Company Info */}
                                    <div className="bg-white rounded-lg border border-gray-200 p-4">
                                      <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                        <Building size={16} className="text-red-600" />
                                        From
                                      </h4>
                                      <div className="space-y-2 text-sm">
                                        <p className="font-medium text-gray-900">Veldskoen Co.</p>
                                        <p className="text-gray-600">123 Business Street</p>
                                        <p className="text-gray-600">Cape Town, 8000</p>
                                        <p className="text-gray-600">South Africa</p>
                                        <p className="text-gray-600">VAT: ZA123456789</p>
                                      </div>
                                    </div>

                                    {/* Customer Info */}
                                    <div className="bg-white rounded-lg border border-gray-200 p-4">
                                      <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                        <User size={16} className="text-red-600" />
                                        Bill To
                                      </h4>
                                      <div className="space-y-2 text-sm">
                                        <p className="font-medium text-gray-900">{invoice.customer.name}</p>
                                        <p className="text-gray-600">{invoice.customer.email}</p>
                                        <p className="text-gray-600">{invoice.customer.phone}</p>
                                        <div className="pt-2 border-t border-gray-100">
                                          <p className="text-gray-600">{invoice.customer.address}</p>
                                          <p className="text-gray-600">{invoice.customer.city}, {invoice.customer.postalCode}</p>
                                        </div>
                                      </div>
                                    </div>

                                    {/* Payment Info */}
                                    <div className="bg-white rounded-lg border border-gray-200 p-4">
                                      <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                        <CreditCard size={16} className="text-red-600" />
                                        Payment Information
                                      </h4>
                                      <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                          <span className="text-gray-600">Method:</span>
                                          <span className="font-medium text-gray-900">{invoice.paymentMethod}</span>
                                        </div>
                                        {invoice.paymentDate && (
                                          <div className="flex justify-between">
                                            <span className="text-gray-600">Paid On:</span>
                                            <span className="font-medium text-green-600">{formatDate(invoice.paymentDate)}</span>
                                          </div>
                                        )}
                                        <div className="flex justify-between">
                                          <span className="text-gray-600">Due Date:</span>
                                          <span className={`font-medium ${invoice.status === 'overdue' ? 'text-red-600' : 'text-gray-900'}`}>
                                            {formatDate(invoice.dueDate)}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Right Column - Items & Summary */}
                                  <div className="lg:col-span-2">
                                    {/* Items Table */}
                                    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-6">
                                      <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                                        <h4 className="font-bold text-gray-900">Items</h4>
                                      </div>
                                      <table className="w-full">
                                        <thead className="bg-gray-50">
                                          <tr>
                                            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                                            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                                            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                                          </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                          {invoice.items.map((item) => (
                                            <tr key={item.id}>
                                              <td className="py-3 px-4">
                                                <p className="font-medium text-gray-900">{item.name}</p>
                                              </td>
                                              <td className="py-3 px-4 text-gray-600">{item.quantity}</td>
                                              <td className="py-3 px-4 text-gray-600">{formatCurrency(item.price)}</td>
                                              <td className="py-3 px-4 font-medium text-gray-900">{formatCurrency(item.total)}</td>
                                            </tr>
                                          ))}
                                        </tbody>
                                      </table>
                                    </div>

                                    {/* Summary */}
                                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                                      <div className="space-y-3">
                                        <div className="flex justify-between text-gray-700">
                                          <span>Subtotal</span>
                                          <span>{formatCurrency(invoice.subtotal)}</span>
                                        </div>
                                        <div className="flex justify-between text-gray-700">
                                          <span>Tax (15%)</span>
                                          <span>{formatCurrency(invoice.taxAmount)}</span>
                                        </div>
                                        <div className="border-t border-gray-300 pt-3">
                                          <div className="flex justify-between font-bold text-lg text-gray-900">
                                            <span>Total</span>
                                            <span>{formatCurrency(invoice.totalAmount)}</span>
                                          </div>
                                          <p className="text-xs text-gray-500 mt-1">VAT included</p>
                                        </div>
                                      </div>

                                      {/* Notes */}
                                      {invoice.notes && (
                                        <div className="mt-6 pt-6 border-t border-gray-200">
                                          <h4 className="font-bold text-gray-900 mb-2">Notes</h4>
                                          <p className="text-sm text-gray-600">{invoice.notes}</p>
                                        </div>
                                      )}

                                      {/* Action Buttons */}
                                      <div className="mt-8 flex flex-wrap gap-3">
                                        <button
                                          onClick={() => handleDownloadInvoice(invoice)}
                                          className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition"
                                        >
                                          <Download size={16} />
                                          Download PDF
                                        </button>
                                        <button
                                          onClick={() => handlePrintInvoice(invoice)}
                                          className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition"
                                        >
                                          <Printer size={16} />
                                          Print
                                        </button>
                                        <button
                                          onClick={() => handleSendInvoice(invoice)}
                                          className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition"
                                        >
                                          <Mail size={16} />
                                          Send Email
                                        </button>
                                        {invoice.status !== 'paid' && (
                                          <button
                                            onClick={() => alert(`This would initiate payment for ${invoice.invoiceNumber}`)}
                                            className="flex-1 min-w-[120px] px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition"
                                          >
                                            Pay Now
                                          </button>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>
                        </motion.tr>
                      )}
                    </AnimatePresence>
                  </React.Fragment>
                ))}
              </tbody>
            </table>

            {filteredInvoices.length === 0 && (
              <div className="text-center py-12">
                <FileText className="mx-auto text-gray-400" size={48} />
                <h3 className="mt-4 text-lg font-medium text-gray-900">No invoices found</h3>
                <p className="mt-2 text-gray-500">No invoices match your current filters.</p>
                {(searchTerm || filterStatus !== 'all') && (
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setFilterStatus('all');
                    }}
                    className="mt-4 px-4 py-2 text-sm text-red-600 hover:text-red-800"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Summary Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-sm text-gray-600">
                Showing {filteredInvoices.length} of {invoices.length} invoices
              </div>
              <div className="flex items-center gap-4">
                <div className="text-sm text-gray-600">
                  Total: <span className="font-bold text-gray-900">{formatCurrency(stats.totalAmount)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-sm text-gray-600">Paid: {formatCurrency(stats.paidAmount)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoicesPage;