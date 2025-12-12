import React, { useState } from 'react';
import { 
  MessageSquare, Phone, Mail, Clock, User, 
  AlertCircle, CheckCircle, XCircle, Search,
  Filter, Plus, Download, Eye, Reply, 
  Star, Archive, RefreshCw, TrendingUp
} from 'lucide-react';
import AdminLayout from '../components/AdminLayout';

interface Ticket {
  id: string;
  customer: string;
  email: string;
  subject: string;
  category: string;
  status: 'open' | 'pending' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  createdAt: string;
  lastUpdated: string;
  assignedTo: string;
}

const SupportCentrePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');

  const [tickets, setTickets] = useState<Ticket[]>([
    { id: 'TKT-001', customer: 'John Doe', email: 'john@example.com', subject: 'Order not delivered', category: 'Delivery', status: 'open', priority: 'high', createdAt: '2024-01-20', lastUpdated: '2024-01-20', assignedTo: 'Sarah Johnson' },
    { id: 'TKT-002', customer: 'Emma Wilson', email: 'emma@example.com', subject: 'Wrong size received', category: 'Returns', status: 'pending', priority: 'medium', createdAt: '2024-01-19', lastUpdated: '2024-01-20', assignedTo: 'Mike Chen' },
    { id: 'TKT-003', customer: 'David Brown', email: 'david@example.com', subject: 'Payment refund request', category: 'Refunds', status: 'resolved', priority: 'high', createdAt: '2024-01-18', lastUpdated: '2024-01-19', assignedTo: 'Sarah Johnson' },
    { id: 'TKT-004', customer: 'Lisa Taylor', email: 'lisa@example.com', subject: 'Product quality issue', category: 'Quality', status: 'open', priority: 'urgent', createdAt: '2024-01-20', lastUpdated: '2024-01-20', assignedTo: 'Unassigned' },
    { id: 'TKT-005', customer: 'Robert Kim', email: 'robert@example.com', subject: 'Account access problem', category: 'Account', status: 'closed', priority: 'low', createdAt: '2024-01-15', lastUpdated: '2024-01-18', assignedTo: 'Mike Chen' },
    { id: 'TKT-006', customer: 'Maria Garcia', email: 'maria@example.com', subject: 'Exchange request', category: 'Exchanges', status: 'pending', priority: 'medium', createdAt: '2024-01-19', lastUpdated: '2024-01-19', assignedTo: 'Sarah Johnson' },
    { id: 'TKT-007', customer: 'James Wilson', email: 'james@example.com', subject: 'Shipping address change', category: 'Order', status: 'open', priority: 'low', createdAt: '2024-01-20', lastUpdated: '2024-01-20', assignedTo: 'Unassigned' },
    { id: 'TKT-008', customer: 'Sophie Martin', email: 'sophie@example.com', subject: 'Product recommendation', category: 'General', status: 'resolved', priority: 'low', createdAt: '2024-01-17', lastUpdated: '2024-01-18', assignedTo: 'Mike Chen' },
  ]);

  const priorityColors = {
    low: 'bg-gray-100 text-gray-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-orange-100 text-orange-800',
    urgent: 'bg-red-100 text-red-800'
  };

  const statusColors = {
    open: 'bg-blue-100 text-blue-800',
    pending: 'bg-yellow-100 text-yellow-800',
    resolved: 'bg-green-100 text-green-800',
    closed: 'bg-gray-100 text-gray-800'
  };

  const supportStats = {
    totalTickets: 156,
    openTickets: 24,
    avgResponseTime: '2.4h',
    satisfaction: '94%'
  };

  const handleAssignTicket = (ticketId: string, agent: string) => {
    setTickets(tickets.map(t => 
      t.id === ticketId ? { ...t, assignedTo: agent } : t
    ));
  };

  const handleUpdateStatus = (ticketId: string, status: Ticket['status']) => {
    setTickets(tickets.map(t => 
      t.id === ticketId ? { ...t, status, lastUpdated: new Date().toISOString().split('T')[0] } : t
    ));
  };

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.customer.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || ticket.status === selectedStatus;
    const matchesPriority = selectedPriority === 'all' || ticket.priority === selectedPriority;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <AdminLayout 
      title="Support Centre" 
      subtitle="Manage customer support tickets and inquiries"
    >
      {/* Support Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Tickets</p>
              <p className="text-2xl font-bold text-gray-900">{supportStats.totalTickets}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <MessageSquare size={24} className="text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-blue-600">
            <TrendingUp size={16} />
            <span className="text-sm">+12% this week</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Open Tickets</p>
              <p className="text-2xl font-bold text-gray-900">{supportStats.openTickets}</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <AlertCircle size={24} className="text-yellow-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-yellow-600">
            <RefreshCw size={16} />
            <span className="text-sm">Requires attention</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Avg. Response Time</p>
              <p className="text-2xl font-bold text-gray-900">{supportStats.avgResponseTime}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <Clock size={24} className="text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-green-600">
            <CheckCircle size={16} />
            <span className="text-sm">Industry leading</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Customer Satisfaction</p>
              <p className="text-2xl font-bold text-gray-900">{supportStats.satisfaction}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Star size={24} className="text-purple-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-purple-600">
            <TrendingUp size={16} />
            <span className="text-sm">+5% from last month</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 mb-6">
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <div className="flex flex-col md:flex-row gap-4 flex-1">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search tickets by customer, subject..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg"
            >
              <option value="all">All Status</option>
              <option value="open">Open</option>
              <option value="pending">Pending</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>

            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg"
            >
              <option value="all">All Priorities</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>

          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
              <Plus size={16} />
              <span>New Ticket</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
              <Download size={16} />
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tickets Table */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Ticket ID</th>
                <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Customer</th>
                <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Subject</th>
                <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Category</th>
                <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Priority</th>
                <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Status</th>
                <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Assigned To</th>
                <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredTickets.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div className="font-medium text-gray-900">{ticket.id}</div>
                    <div className="text-gray-500 text-sm">{ticket.createdAt}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                      <div>
                        <div className="font-medium text-gray-900">{ticket.customer}</div>
                        <div className="text-gray-500 text-sm">{ticket.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-medium text-gray-900">{ticket.subject}</div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                      {ticket.category}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${priorityColors[ticket.priority]}`}>
                      {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[ticket.status]}`}>
                      {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      {ticket.assignedTo === 'Unassigned' ? (
                        <span className="text-gray-500">Unassigned</span>
                      ) : (
                        <>
                          <div className="w-6 h-6 bg-blue-100 rounded-full"></div>
                          <span className="text-gray-900">{ticket.assignedTo}</span>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleAssignTicket(ticket.id, 'Sarah Johnson')}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                        title="Assign"
                      >
                        <User size={16} />
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(ticket.id, 'resolved')}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                        title="Resolve"
                      >
                        <CheckCircle size={16} />
                      </button>
                      <button
                        onClick={() => window.open(`/admin/support/ticket/${ticket.id}`, '_blank')}
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                        title="View"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => window.open(`mailto:${ticket.email}`, '_blank')}
                        className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg"
                        title="Reply"
                      >
                        <Reply size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Support Team Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Support Team Performance</h3>
          <div className="space-y-4">
            {[
              { name: 'Sarah Johnson', tickets: 42, satisfaction: '96%', responseTime: '1.8h' },
              { name: 'Mike Chen', tickets: 38, satisfaction: '92%', responseTime: '2.4h' },
              { name: 'Alex Rodriguez', tickets: 31, satisfaction: '94%', responseTime: '2.1h' },
              { name: 'Lisa Wang', tickets: 28, satisfaction: '98%', responseTime: '1.5h' },
            ].map((agent, index) => (
              <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                  <div>
                    <p className="font-medium text-gray-900">{agent.name}</p>
                    <p className="text-gray-500 text-sm">{agent.tickets} tickets</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-medium text-gray-900">{agent.satisfaction}</p>
                      <p className="text-gray-500 text-sm">Satisfaction</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">{agent.responseTime}</p>
                      <p className="text-gray-500 text-sm">Avg. response</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Common Issues</h3>
          <div className="space-y-4">
            {[
              { issue: 'Delivery delays', count: 45, trend: '+12%' },
              { issue: 'Wrong size received', count: 32, trend: '+8%' },
              { issue: 'Payment issues', count: 28, trend: '-5%' },
              { issue: 'Product quality', count: 21, trend: '+15%' },
              { issue: 'Return processing', count: 18, trend: '+3%' },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                    <MessageSquare size={16} className="text-gray-600" />
                  </div>
                  <span className="text-gray-700">{item.issue}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-medium text-gray-900">{item.count} cases</span>
                  <span className={`px-2 py-1 rounded text-xs ${
                    item.trend.startsWith('+') 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {item.trend}
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h4 className="font-medium text-gray-900 mb-3">Quick Responses</h4>
            <div className="space-y-2">
              <button className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg">
                "Your order has been shipped and will arrive in 3-5 business days."
              </button>
              <button className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg">
                "We apologize for the delay. Your refund will be processed within 5-10 business days."
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default SupportCentrePage;