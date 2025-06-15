
import React from 'react';
import { motion } from 'framer-motion';
import { Package, ShoppingBag, DollarSign, TrendingUp, Eye, Plus, Users, AlertTriangle, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';
import { Link } from 'react-router-dom';

const VendorDashboard = () => {
  const { user } = useAuth();

  const stats = [
    { title: 'Active Listings', value: '24', change: '+3 this month', icon: Package, color: 'text-blue-600', link: '/vendor/products' },
    { title: 'Pending Orders', value: '12', change: '+5 new', icon: ShoppingBag, color: 'text-orange-600', link: '/vendor/orders' },
    { title: 'Monthly Revenue', value: '$12,450', change: '+8.2%', icon: DollarSign, color: 'text-green-600', link: '/vendor/analytics' },
    { title: 'Store Profile Views', value: '2.3k', change: '+15% this week', icon: Eye, color: 'text-purple-600', link: '/vendor/analytics' },
  ];

  const recentOrders = [
    { id: 'ORD-VC001', customer: 'Alice Wonderland', productCount: 3, amount: 145.50, status: 'Processing', date: '2025-06-14' },
    { id: 'ORD-VC002', customer: 'Bob The Builder', productCount: 1, amount: 79.99, status: 'Shipped', date: '2025-06-13' },
    { id: 'ORD-VC003', customer: 'Carol Danvers', productCount: 5, amount: 320.00, status: 'Awaiting Payment', date: '2025-06-14' },
  ];

  const topProducts = [
    { name: 'Premium Wireless Headphones X2000', sales: 45, revenue: '$13,499.55', image: 'Sleek black wireless headphones', stock: 12 },
    { name: 'Portable Bluetooth Speaker X-Bass', sales: 32, revenue: '$2,559.68', image: 'Compact bluetooth speaker', stock: 8 },
    { name: 'Smart Fitness Watch Series 5', sales: 28, revenue: '$5,599.72', image: 'Modern fitness smartwatch', stock: 5 },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'text-green-600 bg-green-100';
      case 'Shipped': return 'text-blue-600 bg-blue-100';
      case 'Processing': return 'text-yellow-600 bg-yellow-100';
      case 'Awaiting Payment': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6 md:space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between"
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Vendor Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.name || 'Vendor'}!</p>
        </div>
        <Link to="/vendor/products/add" className="mt-3 sm:mt-0">
          <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md hover:shadow-lg transition-shadow">
            <Plus className="w-5 h-5 mr-2" />
            Add New Product
          </Button>
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6"
      >
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Link to={stat.link} key={index}>
              <Card className="card-hover transform transition-all hover:shadow-xl hover:-translate-y-1 border-l-4 border-purple-500">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-2.5 rounded-full bg-opacity-20 ${stat.color.replace('text-', 'bg-')}`}>
                      <Icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                    <span className={`text-xs font-semibold ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change}
                    </span>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-800 mb-0.5">{stat.value}</p>
                    <p className="text-sm text-gray-500">{stat.title}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="lg:col-span-2"
        >
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-xl">
                Recent Orders
                <Link to="/vendor/orders">
                  <Button variant="outline" size="sm">View All Orders</Button>
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentOrders.length > 0 ? recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div>
                    <p className="font-medium text-purple-700">{order.id}</p>
                    <p className="text-sm text-gray-600">{order.customer} - {order.productCount} item(s)</p>
                    <p className="text-xs text-gray-400">{order.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-md">${order.amount.toFixed(2)}</p>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              )) : (
                 <p className="text-gray-500 text-center py-4">No recent orders.</p>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
        >
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl">Top Selling Products</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <img  className="w-full h-full object-cover" alt={`${product.image}`} src={`https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=100&h=100&fit=crop&product_name=${encodeURIComponent(product.image)}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-gray-800 truncate">{product.name}</p>
                    <p className="text-xs text-gray-500">{product.sales} sales - Stock: {product.stock}</p>
                  </div>
                  <p className="font-semibold text-sm text-green-600">{product.revenue}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">Quick Actions & Alerts</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
                <Link to="/vendor/products/add" className="block">
                  <Button variant="outline" className="w-full justify-start py-3 h-auto"><PlusCircle className="w-5 h-5 mr-2 text-green-500" /> Add New Product</Button>
                </Link>
                <Link to="/vendor/orders?status=pending" className="block">
                  <Button variant="outline" className="w-full justify-start py-3 h-auto"><ShoppingBag className="w-5 h-5 mr-2 text-blue-500" /> View Pending Orders</Button>
                </Link>
                <Link to="/vendor/analytics" className="block">
                  <Button variant="outline" className="w-full justify-start py-3 h-auto"><TrendingUp className="w-5 h-5 mr-2 text-purple-500" /> View Performance</Button>
                </Link>
            </div>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md space-y-2">
                <div className="flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2 text-yellow-600" />
                    <h4 className="font-semibold text-yellow-700">Low Stock Alerts</h4>
                </div>
                <p className="text-sm text-yellow-700">Smart Fitness Watch Series 5 (5 left)</p>
                <p className="text-sm text-yellow-700">Portable Bluetooth Speaker X-Bass (8 left)</p>
                <Link to="/vendor/products?filter=lowstock">
                    <Button variant="link" size="sm" className="text-yellow-700 p-0 h-auto">Manage Stock</Button>
                </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default VendorDashboard;