import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { Truck, Package, CheckCircle, XCircle, ShoppingBag, ArrowLeft, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';

// Mock data - in a real app, this would come from an API
const mockOrderData = {
  'ORDER123': {
    id: 'ORDER123',
    productName: 'NovaSound Pro Headphones',
    productImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
    status: 'Shipped',
    estimatedDelivery: '2025-06-18',
    currentLocation: 'Cityville Hub, Sorting Facility',
    trackingHistory: [
      { status: 'Order Placed', date: '2025-06-14', location: 'Kalartz Warehouse' },
      { status: 'Processing', date: '2025-06-14', location: 'Kalartz Warehouse' },
      { status: 'Packed', date: '2025-06-15', location: 'Kalartz Warehouse' },
      { status: 'Shipped', date: '2025-06-15', location: 'Departed Kalartz Hub' },
      { status: 'In Transit', date: '2025-06-16', location: 'Cityville Hub, Sorting Facility' }
    ],
    courier: 'Shiprocket Express',
    trackingNumber: 'SRKT123456789'
  },
  'ORDER456': {
    id: 'ORDER456',
    productName: 'UrbanExplorer Backpack',
    productImage: 'https://images.unsplash.com/photo-1553062407-98eeb68c6a62',
    status: 'Delivered',
    estimatedDelivery: '2025-06-15',
    currentLocation: 'Delivered to Customer',
    trackingHistory: [
      { status: 'Order Placed', date: '2025-06-12', location: 'Vendor Storefront' },
      { status: 'Shipped', date: '2025-06-13', location: 'Departed Vendor Hub' },
      { status: 'Out for Delivery', date: '2025-06-15', location: 'Local Delivery Office' },
      { status: 'Delivered', date: '2025-06-15', location: 'Customer Address' }
    ],
    courier: 'Shiprocket Standard',
    trackingNumber: 'SRKT987654321'
  }
};

const getStatusIcon = (status) => {
  switch (status.toLowerCase()) {
    case 'order placed':
    case 'processing':
      return <ShoppingBag className="w-5 h-5 text-blue-500" />;
    case 'packed':
      return <Package className="w-5 h-5 text-yellow-500" />;
    case 'shipped':
    case 'in transit':
    case 'out for delivery':
      return <Truck className="w-5 h-5 text-orange-500 animate-pulse" />;
    case 'delivered':
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    case 'cancelled':
    case 'returned':
      return <XCircle className="w-5 h-5 text-red-500" />;
    default:
      return <Package className="w-5 h-5 text-gray-500" />;
  }
};

const CustomerTrackOrderPage = () => {
  const { orderId: paramOrderId } = useParams();
  const [orderIdInput, setOrderIdInput] = useState(paramOrderId || '');
  const [orderDetails, setOrderDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchOrderDetails = (idToFetch) => {
    if (!idToFetch) {
      setError('Please enter an Order ID.');
      setOrderDetails(null);
      return;
    }
    setIsLoading(true);
    setError('');
    // Simulate API call
    setTimeout(() => {
      const data = mockOrderData[idToFetch.toUpperCase()];
      if (data) {
        setOrderDetails(data);
      } else {
        setError(`Order ID "${idToFetch}" not found. Please check the ID and try again.`);
        setOrderDetails(null);
        toast({ title: "Order Not Found", description: `Could not find details for Order ID: ${idToFetch}`, variant: "destructive" });
      }
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    if (paramOrderId) {
      fetchOrderDetails(paramOrderId);
    }
  }, [paramOrderId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchOrderDetails(orderIdInput);
  };
  
  const handleRefresh = () => {
    if (orderDetails) {
        toast({ title: "Refreshing Status...", description: `Updating tracking for ${orderDetails.id}`});
        fetchOrderDetails(orderDetails.id);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-sky-50 py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center">
            <Truck className="w-10 h-10 text-cyan-600 mr-3" />
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-teal-500 to-sky-600">
              Track Your Order
            </h1>
          </div>
           <Link to="/dashboard">
            <Button variant="outline" className="border-cyan-500 text-cyan-600 hover:bg-cyan-50">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
            </Button>
          </Link>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 p-6 bg-white rounded-xl shadow-xl border-t-4 border-cyan-500 flex flex-col md:flex-row items-center gap-4"
        >
          <Input
            type="text"
            value={orderIdInput}
            onChange={(e) => setOrderIdInput(e.target.value)}
            placeholder="Enter your Order ID (e.g., ORDER123)"
            className="flex-grow text-lg py-3"
            required
          />
          <Button type="submit" size="lg" className="w-full md:w-auto bg-cyan-600 hover:bg-cyan-700" disabled={isLoading}>
            {isLoading ? 'Tracking...' : 'Track Order'}
          </Button>
        </motion.form>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-4 mb-6 bg-red-100 text-red-700 rounded-lg shadow flex items-center"
          >
            <XCircle className="w-5 h-5 mr-2"/> {error}
          </motion.div>
        )}

        {isLoading && !orderDetails && (
           <div className="text-center py-10">
             <RefreshCw className="w-12 h-12 text-cyan-500 mx-auto animate-spin mb-4" />
             <p className="text-xl text-gray-600">Loading order details...</p>
           </div>
        )}

        {orderDetails && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="shadow-2xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-cyan-500 to-teal-600 text-white p-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div>
                        <CardTitle className="text-3xl font-bold">Order ID: {orderDetails.id}</CardTitle>
                        <p className="opacity-90">Status: <span className="font-semibold">{orderDetails.status}</span></p>
                    </div>
                    <Button variant="outline" size="sm" onClick={handleRefresh} className="mt-2 md:mt-0 bg-white/20 hover:bg-white/30 border-white text-white">
                        <RefreshCw className="w-4 h-4 mr-2"/> Refresh Status
                    </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                  <div className="md:col-span-1">
                    <img  src={orderDetails.productImage} alt={orderDetails.productName} className="w-full h-auto max-h-48 object-contain rounded-lg shadow-md border" />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <h3 className="text-xl font-semibold text-gray-800">{orderDetails.productName}</h3>
                    <p className="text-gray-600"><strong>Courier:</strong> {orderDetails.courier}</p>
                    <p className="text-gray-600"><strong>Tracking No:</strong> {orderDetails.trackingNumber}</p>
                    <p className="text-gray-600"><strong>Estimated Delivery:</strong> {new Date(orderDetails.estimatedDelivery).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    <p className="text-gray-600"><strong>Current Location:</strong> {orderDetails.currentLocation}</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-semibold mb-4 text-gray-700">Tracking History (via Shiprocket)</h4>
                  <div className="relative pl-5 border-l-2 border-cyan-300 space-y-6">
                    {orderDetails.trackingHistory.slice().reverse().map((event, index) => (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="relative flex items-start"
                      >
                        <div className="absolute -left-[2.05rem] top-1.5 w-8 h-8 bg-cyan-500 rounded-full border-4 border-white flex items-center justify-center shadow">
                          {getStatusIcon(event.status)}
                        </div>
                        <div className="ml-6 p-4 bg-gray-50 rounded-lg shadow-sm flex-1">
                          <p className="font-semibold text-cyan-700">{event.status}</p>
                          <p className="text-sm text-gray-500">{new Date(event.date).toLocaleString()} - {event.location}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CustomerTrackOrderPage;