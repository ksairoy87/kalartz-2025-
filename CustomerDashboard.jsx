
import React from 'react';
import { motion } from 'framer-motion';
import { Package, Heart, User, MapPin, CreditCard, Bell, LogOut, Edit3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { toast } from '@/components/ui/use-toast';
import { Link, useNavigate } from 'react-router-dom';

const CustomerDashboard = () => {
  const { user, logout } = useAuth();
  const { getTotalItems: getTotalCartItems } = useCart();
  const { getTotalItems: getTotalWishlistItems } = useWishlist();
  const navigate = useNavigate();


  const recentOrders = [ // Mock data
    { id: 'ORD-00123', date: '2025-06-10', status: 'Delivered', total: 75.99, items: 2 },
    { id: 'ORD-00124', date: '2025-06-12', status: 'Shipped', total: 120.50, items: 1 },
    { id: 'ORD-00125', date: '2025-06-14', status: 'Processing', total: 45.00, items: 3 },
  ];

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out successfully",
      description: "See you soon!"
    });
    navigate('/');
  };

  const dashboardStats = [
    { title: 'Total Orders', value: recentOrders.length, icon: Package, color: 'text-blue-600', link: '/dashboard/orders' },
    { title: 'Wishlist Items', value: getTotalWishlistItems(), icon: Heart, color: 'text-red-600', link: '/dashboard/wishlist' },
    { title: 'Saved Addresses', value: '2', icon: MapPin, color: 'text-green-600', link: '/dashboard/addresses' }, // Mock value
    { title: 'Cart Items', value: getTotalCartItems(), icon: CreditCard, color: 'text-purple-600', link: '/cart' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'text-green-600 bg-green-100';
      case 'Shipped': return 'text-blue-600 bg-blue-100';
      case 'Processing': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 py-8 md:py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 md:mb-12"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome back, {user?.name || 'Customer'}!</h1>
              <p className="text-lg md:text-xl text-gray-600">Here's your account overview.</p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={() => toast({ title: "🚧 Notifications not implemented" })}
              >
                <Bell className="w-4 h-4 mr-2" />
                Notifications
              </Button>
              <Link to="/dashboard/profile">
                <Button>
                  <Edit3 className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 md:mb-12"
        >
          {dashboardStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Link to={stat.link} key={index}>
                <Card className="card-hover h-full transform transition-all hover:shadow-xl hover:-translate-y-1">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">{stat.title}</p>
                        <p className="text-3xl font-bold">{stat.value}</p>
                      </div>
                      <div className={`p-3 rounded-full bg-opacity-20 ${stat.color.replace('text-', 'bg-')}`}>
                        <Icon className={`w-7 h-7 ${stat.color}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-2xl">
                  Recent Orders
                  <Link to="/dashboard/orders">
                    <Button variant="outline" size="sm">View All Orders</Button>
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentOrders.length > 0 ? recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex-1">
                      <p className="font-semibold text-purple-700">{order.id}</p>
                      <p className="text-sm text-gray-600">{order.date} - {order.items} item(s)</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-lg">${order.total.toFixed(2)}</p>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                     <Button variant="ghost" size="sm" className="ml-2" onClick={() => toast({title: `🚧 Track order ${order.id} not implemented`})}>Track</Button>
                  </div>
                )) : (
                  <p className="text-gray-500 text-center py-4">No recent orders found.</p>
                )}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="space-y-6"
          >
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/dashboard/orders" className="block">
                  <Button variant="outline" className="w-full justify-start text-base py-3 h-auto">
                    <Package className="w-5 h-5 mr-3 text-blue-500" /> Track My Orders
                  </Button>
                </Link>
                <Link to="/dashboard/wishlist" className="block">
                  <Button variant="outline" className="w-full justify-start text-base py-3 h-auto">
                    <Heart className="w-5 h-5 mr-3 text-red-500" /> View Wishlist
                  </Button>
                </Link>
                <Link to="/dashboard/addresses" className="block">
                  <Button variant="outline" className="w-full justify-start text-base py-3 h-auto">
                    <MapPin className="w-5 h-5 mr-3 text-green-500" /> Manage Addresses
                  </Button>
                </Link>
                <Link to="/dashboard/profile" className="block">
                  <Button variant="outline" className="w-full justify-start text-base py-3 h-auto">
                    <User className="w-5 h-5 mr-3 text-purple-500" /> Account Settings
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardContent className="p-6">
                <Button
                  variant="destructive"
                  className="w-full text-base py-3 h-auto"
                  onClick={handleLogout}
                >
                  <LogOut className="w-5 h-5 mr-3" />
                  Logout
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
