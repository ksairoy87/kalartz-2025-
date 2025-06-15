import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Eye, Package, Truck, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';
import { useLocation } from 'react-router-dom';

const AdminOrders = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState(queryParams.get('status') || 'all');

  const orders = [
    {
      id: 'ORD-001',
      customer: 'John Doe',
      vendor: 'TechGear Pro',
      product: 'Premium Wireless Headphones',
      amount: 299.99,
      status: 'Processing',
      date: '2025-06-11',
      shippingAddress: '123 Main St, New York, NY 10001'
    },
    {
      id: 'ORD-002',
      customer: 'Sarah Smith',
      vendor: 'SoundWave',
      product: 'Bluetooth Speaker',
      amount: 79.99,
      status: 'Shipped',
      date: '2025-06-10',
      shippingAddress: '456 Oak Ave, Los Angeles, CA 90210'
    },
    {
      id: 'ORD-003',
      customer: 'Mike Johnson',
      vendor: 'FitTech',
      product: 'Smart Fitness Watch',
      amount: 199.99,
      status: 'Delivered',
      date: '2025-06-09',
      shippingAddress: '789 Pine St, Chicago, IL 60601'
    },
    {
      id: 'ORD-004',
      customer: 'Emily Davis',
      vendor: 'Fashion Hub',
      product: 'Designer Backpack',
      amount: 89.99,
      status: 'Processing',
      date: '2025-06-08',
      shippingAddress: '321 Elm St, Houston, TX 77001'
    },
    {
      id: 'ORD-005',
      customer: 'David Wilson',
      vendor: 'TechGear Pro',
      product: 'Wireless Charger',
      amount: 49.99,
      status: 'Cancelled',
      date: '2025-06-07',
      shippingAddress: '654 Maple Dr, Phoenix, AZ 85001'
    },
    {
      id: 'ORD-006',
      customer: 'Lisa Brown',
      vendor: 'Bean Masters',
      product: 'Organic Coffee Beans',
      amount: 24.99,
      status: 'Refunded',
      date: '2025-06-06',
      shippingAddress: '987 Cedar Ln, Miami, FL 33101'
    },
    {
      id: 'ORD-007',
      customer: 'Tom Green',
      vendor: 'Sports World',
      product: 'Yoga Mat',
      amount: 39.99,
      status: 'Disputed',
      date: '2025-06-05',
      shippingAddress: '111 Birch Ave, Seattle, WA 98101'
    },
    {
      id: 'ORD-008',
      customer: 'Nancy White',
      vendor: 'Home Essentials',
      product: 'Kitchen Blender',
      amount: 129.99,
      status: 'Refund Request',
      date: '2025-06-04',
      shippingAddress: '222 Oak St, Denver, CO 80202'
    }
  ];

  const statusOptions = ['all', 'Processing', 'Shipped', 'Delivered', 'Cancelled', 'Refunded', 'Disputed', 'Refund Request'];

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.product.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status.toLowerCase().replace(' ', '-') === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'Shipped':
        return 'bg-blue-100 text-blue-800';
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      case 'Refunded':
      case 'Disputed':
      case 'Refund Request':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Delivered':
        return <CheckCircle className="w-4 h-4" />;
      case 'Shipped':
        return <Truck className="w-4 h-4" />;
      case 'Processing':
        return <Package className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const handleViewOrder = (orderId) => {
    toast({
      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  const handleUpdateStatus = (orderId, newStatus) => {
    toast({
      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold">Order Management</h1>
          <p className="text-gray-600">Monitor and manage all platform orders</p>
        </div>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2 flex-wrap">
          {statusOptions.map((status) => (
            <Button
              key={status}
              variant={statusFilter.toLowerCase() === status.toLowerCase().replace(' ', '-') ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter(status.toLowerCase().replace(' ', '-'))}
              className="capitalize"
            >
              {status}
            </Button>
          ))}
        </div>
      </motion.div>

      {/* Orders List */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="space-y-4"
      >
        {filteredOrders.map((order, index) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Card className="card-hover">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div>
                      <h3 className="font-semibold text-lg">{order.id}</h3>
                      <p className="text-sm text-gray-600">{order.date}</p>
                    </div>
                    <Badge className={`${getStatusColor(order.status)} flex items-center gap-1`}>
                      {getStatusIcon(order.status)}
                      {order.status}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewOrder(order.id)}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Customer</p>
                    <p className="font-medium">{order.customer}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-600">Vendor</p>
                    <p className="font-medium">{order.vendor}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-600">Product</p>
                    <p className="font-medium truncate">{order.product}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-600">Amount</p>
                    <p className="font-bold text-lg text-green-600">${order.amount}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-600">Shipping Address</p>
                    <p className="text-sm truncate">{order.shippingAddress}</p>
                  </div>
                </div>

                {/* Action buttons for specific statuses */}
                {(order.status === 'Processing' || order.status === 'Shipped' || order.status === 'Disputed' || order.status === 'Refund Request') && (
                  <div className="mt-4 pt-4 border-t flex gap-2">
                    {order.status === 'Processing' && (
                      <Button
                        size="sm"
                        onClick={() => handleUpdateStatus(order.id, 'Shipped')}
                      >
                        <Truck className="w-4 h-4 mr-2" />
                        Mark as Shipped
                      </Button>
                    )}
                    {order.status === 'Shipped' && (
                      <Button
                        size="sm"
                        onClick={() => handleUpdateStatus(order.id, 'Delivered')}
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Mark as Delivered
                      </Button>
                    )}
                     {(order.status === 'Disputed' || order.status === 'Refund Request') && (
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => toast({ title: "🚧 Action Required", description: `Handle ${order.status} for ${order.id}`})}
                      >
                        Resolve Issue
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {filteredOrders.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-xl text-gray-500">No orders found matching your criteria.</p>
        </motion.div>
      )}

      {/* Summary Stats */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-8 gap-4"
      >
        {statusOptions.map(status => (
          <Card key={status}>
            <CardContent className="p-4 text-center">
              <p className={`text-2xl font-bold ${getStatusColor(status).split(' ')[1]}`}>
                {orders.filter(o => o.status.toLowerCase().replace(' ', '-') === status.toLowerCase().replace(' ', '-')).length}
              </p>
              <p className="text-sm text-gray-600 capitalize">{status}</p>
            </CardContent>
          </Card>
        ))}
      </motion.div>
    </div>
  );
};

export default AdminOrders;