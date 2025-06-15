
import React from 'react';
import { motion } from 'framer-motion';
import { Users, Package, ShoppingBag, DollarSign, TrendingUp, AlertTriangle, BarChart2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const stats = [
    {
      title: 'Total Users',
      value: '2,847',
      change: '+12% from last month',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Total Products',
      value: '1,234',
      change: '+8% from last month',
      icon: Package,
      color: 'text-green-600'
    },
    {
      title: 'Total Orders',
      value: '5,678',
      change: '+15% from last month',
      icon: ShoppingBag,
      color: 'text-purple-600'
    },
    {
      title: 'Platform Revenue',
      value: '$89,450',
      change: '+22% from last month',
      icon: DollarSign,
      color: 'text-orange-600'
    }
  ];

  const recentUsers = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Customer',
      status: 'Active',
      joinDate: '2025-06-11'
    },
    {
      id: 2,
      name: 'TechGear Pro',
      email: 'vendor@techgear.com',
      role: 'Vendor',
      status: 'Pending',
      joinDate: '2025-06-10'
    },
    {
      id: 3,
      name: 'Sarah Smith',
      email: 'sarah@example.com',
      role: 'Customer',
      status: 'Active',
      joinDate: '2025-06-09'
    },
    {
      id: 4,
      name: 'Fashion Hub',
      email: 'info@fashionhub.com',
      role: 'Vendor',
      status: 'Active',
      joinDate: '2025-06-08'
    }
  ];

  const pendingActions = [
    {
      type: 'vendor_approval',
      message: '3 vendors pending approval',
      priority: 'high',
      count: 3,
      link: '/admin/users?status=pending&role=vendor'
    },
    {
      type: 'product_review',
      message: '12 products awaiting review',
      priority: 'medium',
      count: 12,
      link: '/admin/products?status=pending'
    },
    {
      type: 'dispute_resolution',
      message: '2 order disputes to resolve',
      priority: 'high',
      count: 2,
      link: '/admin/orders?status=disputed'
    },
    {
      type: 'refund_requests',
      message: '5 refund requests pending',
      priority: 'medium',
      count: 5,
      link: '/admin/orders?status=refund-request'
    }
  ];

  const topVendors = [
    {
      name: 'TechGear Pro',
      revenue: '$15,450',
      orders: 89,
      rating: 4.8,
      avatarInitial: 'T'
    },
    {
      name: 'Fashion Hub',
      revenue: '$12,300',
      orders: 67,
      rating: 4.6,
      avatarInitial: 'F'
    },
    {
      name: 'Home Essentials',
      revenue: '$9,800',
      orders: 54,
      rating: 4.7,
      avatarInitial: 'H'
    },
    {
      name: 'Sports World',
      revenue: '$8,200',
      orders: 43,
      rating: 4.5,
      avatarInitial: 'S'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Suspended':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-yellow-600';
      case 'low':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
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
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-600">Platform overview and management</p>
        </div>
        <Link to="/admin/reports">
          <Button>
            View Reports
          </Button>
        </Link>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="card-hover">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Icon className={`w-8 h-8 ${stat.color}`} />
                  <TrendingUp className="w-4 h-4 text-green-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold mb-1">{stat.value}</p>
                  <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-xs text-green-600">{stat.change}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pending Actions */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="lg:col-span-1"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-orange-600" />
                Pending Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {pendingActions.map((action, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${getPriorityColor(action.priority)}`}></div>
                    <div>
                      <p className="font-medium">{action.message}</p>
                      <p className="text-sm text-gray-600 capitalize">{action.priority} priority</p>
                    </div>
                  </div>
                  <Link to={action.link}>
                    <Button size="sm">Review</Button>
                  </Link>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Users */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Recent Users
                <Link to="/admin/users">
                    <Button variant="outline" size="sm">View All</Button>
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentUsers.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-gray-600">{user.email}</p>
                    <p className="text-xs text-gray-500">{user.joinDate}</p>
                  </div>
                  <div className="text-right">
                    <Badge className={getStatusColor(user.status)}>
                      {user.status}
                    </Badge>
                    <p className="text-xs text-gray-500 mt-1">{user.role}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Top Vendors */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Vendors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {topVendors.map((vendor, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-white font-bold">{vendor.avatarInitial}</span>
                    </div>
                    <h3 className="font-semibold mb-2">{vendor.name}</h3>
                    <div className="space-y-1 text-sm">
                      <p className="text-green-600 font-medium">{vendor.revenue}</p>
                      <p className="text-gray-600">{vendor.orders} orders</p>
                      <p className="text-yellow-600">★ {vendor.rating}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      {/* Analytics Placeholder */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.0 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Platform Analytics Overview</CardTitle>
          </CardHeader>
          <CardContent className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center">
              <BarChart2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Detailed platform analytics charts will be displayed here.</p>
              <Link to="/admin/reports">
                <Button variant="outline" className="mt-4">
                    View Detailed Reports
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
