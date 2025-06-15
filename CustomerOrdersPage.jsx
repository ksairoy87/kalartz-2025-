
import React from 'react';
import { motion } from 'framer-motion';
import { Package, FileText, ChevronRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';


const CustomerOrdersPage = () => {
  // Mock data for orders - replace with actual data fetching
  const orders = [
    { 
      id: 'ORD-00123', 
      date: '2025-06-10', 
      status: 'Delivered', 
      total: 75.99, 
      items: [
        { name: 'Organic Green Tea Blend', quantity: 1, price: 19.99, image: 'Elegant tin of organic green tea' },
        { name: 'Minimalist Leather Wallet', quantity: 1, price: 56.00, image: 'Slim leather wallet in brown' }
      ],
      trackingNumber: 'TRK123456789'
    },
    { 
      id: 'ORD-00124', 
      date: '2025-06-12', 
      status: 'Shipped', 
      total: 120.50, 
      items: [
        { name: 'Premium Wireless Headphones X2000', quantity: 1, price: 120.50, image: 'Sleek black wireless headphones'}
      ],
      trackingNumber: 'TRK987654321'
    },
    { 
      id: 'ORD-00125', 
      date: '2025-06-14', 
      status: 'Processing', 
      total: 45.00, 
      items: [
        { name: 'Artisanal Dark Roast Coffee Beans', quantity: 2, price: 22.50, image: 'Elegant bag of premium dark roast organic coffee beans'}
      ],
      trackingNumber: null
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-800 border-green-300';
      case 'Shipped': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Processing': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Cancelled': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className="min-h-screen py-8 md:py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 md:mb-12"
        >
          <Link to="/dashboard" className="inline-flex items-center text-purple-700 hover:text-purple-900 transition-colors group mb-4">
            <ArrowLeft className="w-5 h-5 mr-2 transform transition-transform group-hover:-translate-x-1" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">My Orders</h1>
          <p className="text-lg text-gray-600">View your order history and track shipments.</p>
        </motion.div>

        {orders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-16 bg-white rounded-xl shadow-lg"
          >
            <Package className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-semibold text-gray-700 mb-3">No Orders Yet</h2>
            <p className="text-gray-500 mb-6">You haven't placed any orders. Start shopping to see them here!</p>
            <Link to="/products">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700">Shop Now</Button>
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-6 md:space-y-8">
            {orders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 rounded-xl overflow-hidden">
                  <CardHeader className="bg-gray-50 border-b p-4 md:p-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                      <div>
                        <CardTitle className="text-xl md:text-2xl text-purple-700">Order ID: {order.id}</CardTitle>
                        <p className="text-sm text-gray-500">Placed on: {order.date}</p>
                      </div>
                      <Badge variant="outline" className={`mt-2 sm:mt-0 text-sm py-1.5 px-3 border ${getStatusColor(order.status)}`}>
                        {order.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 md:p-6">
                    <div className="mb-4">
                      <h4 className="font-semibold text-md text-gray-700 mb-2">Items:</h4>
                      <div className="space-y-3">
                        {order.items.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex items-center space-x-3">
                            <img  className="w-14 h-14 rounded-md object-cover border" alt={item.name} src={`https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=100&h=100&fit=crop&product_name=${encodeURIComponent(item.image)}`} />
                            <div>
                              <p className="font-medium text-gray-800">{item.name}</p>
                              <p className="text-xs text-gray-500">Qty: {item.quantity} - Price: ${item.price.toFixed(2)}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-4 border-t">
                      <p className="text-lg font-semibold text-gray-800 mb-2 sm:mb-0">Total: <span className="text-purple-700">${order.total.toFixed(2)}</span></p>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => toast({title: `🚧 View details for ${order.id} not implemented`})}
                          className="border-purple-600 text-purple-600 hover:bg-purple-50"
                        >
                          <FileText className="w-4 h-4 mr-2" /> View Details
                        </Button>
                        {order.trackingNumber && (
                           <Button 
                            size="sm" 
                            onClick={() => toast({title: `🚧 Track shipment ${order.trackingNumber} not implemented`})}
                            className="bg-purple-600 hover:bg-purple-700"
                           >
                             Track Shipment <ChevronRight className="w-4 h-4 ml-1" />
                           </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerOrdersPage;