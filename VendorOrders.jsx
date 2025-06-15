import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Eye, Package, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';

const VendorOrders = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const orders = [
    {
      id: 'ORD-001',
      customer: 'John Doe',
      email: 'john@example.com',
      product: 'Premium Wireless Headphones',
      quantity: 1,
      amount: 299.99,
      status: 'Processing',
      date: '2025-06-11',
      address: '123 Main St, New York, NY 10001'
    },
    {
      id: 'ORD-002',
      customer: 'Sarah Smith',
      email: 'sarah@example.com',
      product: 'Bluetooth Speaker',
      quantity: 2,
      amount: 159.98,
      status: 'Shipped',
      date: '2025-06-10',
      address: '456 Oak Ave, Los Angeles, CA 90210'
    },
    {
      id: 'ORD-003',
      customer: 'Mike Johnson',
      email: 'mike@example.com',
      product: 'Smart Fitness Watch',
      quantity: 1,
      amount: 199.99,
      status: 'Delivered',
      date: '2025-06-09',
      address: '789 Pine St, Chicago, IL 60601'
    },
    {
      id: 'ORD-004',
      customer: 'Emily Davis',
      email: 'emily@example.com',
      product: 'Wireless Charger',
      quantity: 3,
      amount: 149.97,
      status: 'Processing',
      date: '2025-06-08',
      address: '321 Elm St, Houston, TX 77001'
    },
    {
      id: 'ORD-005',
      customer: 'David Wilson',
      email: 'david@example.com',
      product: 'Gaming Mouse',
      quantity: 1,
      amount: 89.99,
      status: 'Cancelled',
      date: '2025-06-07',
      address: '654 Maple Dr, Phoenix, AZ 85001'
    }
  ];

  const statusOptions = ['all', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.product.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
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
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleUpdateStatus = (orderId, newStatus) => {
    toast({
      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  const handleViewOrder = (orderId) => {
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
          <h1 className="text-3xl font-bold">Orders</h1>
          <p className="text-gray-600">Manage your customer orders</p>
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
        
        <div className="flex gap-2">
          {statusOptions.map((status) => (
            <Button
              key={status}
              variant={statusFilter === status ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter(status)}
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
                    <Badge className={getStatusColor(order.status)}>
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
                      View
                    </Button>
                    {order.status === 'Processing' && (
                      <Button
                        size="sm"
                        onClick={() => handleUpdateStatus(order.id, 'Shipped')}
                      >
                        <Truck className="w-4 h-4 mr-2" />
                        Ship
                      </Button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Customer</p>
                    <p className="font-medium">{order.customer}</p>
                    <p className="text-sm text-gray-500">{order.email}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-600">Product</p>
                    <p className="font-medium">{order.product}</p>
                    <p className="text-sm text-gray-500">Qty: {order.quantity}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-600">Amount</p>
                    <p className="font-bold text-lg text-green-600">${order.amount}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-600">Shipping Address</p>
                    <p className="text-sm">{order.address}</p>
                  </div>
                </div>
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
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">{orders.length}</p>
            <p className="text-sm text-gray-600">Total Orders</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-yellow-600">
              {orders.filter(o => o.status === 'Processing').length}
            </p>
            <p className="text-sm text-gray-600">Processing</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">
              {orders.filter(o => o.status === 'Shipped').length}
            </p>
            <p className="text-sm text-gray-600">Shipped</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">
              {orders.filter(o => o.status === 'Delivered').length}
            </p>
            <p className="text-sm text-gray-600">Delivered</p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default VendorOrders;