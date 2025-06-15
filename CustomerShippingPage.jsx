import React from 'react';
import { motion } from 'framer-motion';
import { Truck, MapPin, Clock, Package, Globe, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CustomerShippingPage = () => {
  const shippingInfo = [
    {
      icon: Clock,
      title: 'Estimated Delivery Times',
      details: [
        'Standard Shipping: 3-7 business days.',
        'Express Shipping: 1-3 business days (where available).',
        'Delivery times may vary based on vendor location, product availability, and your destination.',
        'You will see an estimated delivery date at checkout.'
      ]
    },
    {
      icon: MapPin,
      title: 'Shipping Zones & Costs',
      details: [
        'We ship to most locations domestically. International shipping availability depends on the vendor.',
        'Shipping costs are calculated at checkout based on package weight, dimensions, and destination.',
        'Some vendors may offer free shipping promotions or on orders over a certain amount.'
      ]
    },
    {
      icon: Package,
      title: 'Order Tracking (via Shiprocket)',
      details: [
        'Once your order is shipped, you will receive a tracking number via email.',
        'You can track your package status through your Kalartz dashboard ("My Orders" section) or directly on the Shiprocket tracking page.',
        'Tracking updates may take 24-48 hours to appear after shipment.'
      ]
    },
    {
      icon: Shield,
      title: 'Packaging & Handling',
      details: [
        'Vendors are responsible for securely packaging items to prevent damage during transit.',
        'If your item arrives damaged, please contact the vendor or Kalartz support immediately with photos of the damage.',
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-cyan-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.section
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <Truck className="w-20 h-20 text-green-500 mx-auto mb-6 animate-float" />
          <h1 className="text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-teal-600 to-cyan-700">
            Shipping Information
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Everything you need to know about how we get your orders to you, powered by Shiprocket.
          </p>
        </motion.section>

        {/* Shipping Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {shippingInfo.map((info, index) => {
            const Icon = info.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.15 }}
              >
                <Card className="h-full shadow-lg hover:shadow-xl transition-shadow duration-300 border-t-4 border-green-400">
                  <CardHeader className="pb-4">
                    <div className="flex items-center mb-3">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                        <Icon className="w-7 h-7 text-green-600" />
                      </div>
                      <CardTitle className="text-2xl font-semibold text-green-700">{info.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-gray-600 leading-relaxed">
                      {info.details.map((detail, i) => (
                        <li key={i} className="flex">
                          <span className="mr-2 text-green-500">•</span>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
        
        {/* Shiprocket Integration Note */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 + shippingInfo.length * 0.15 }}
          className="mb-16"
        >
          <Card className="bg-white shadow-lg border-l-4 border-blue-500">
            <CardContent className="p-8 flex flex-col md:flex-row items-center gap-6">
              <img  src="https://via.placeholder.com/150x50?text=Shiprocket+Logo" alt="Shiprocket Logo - Placeholder" className="h-12 object-contain" />
              <div>
                <h3 className="text-xl font-semibold text-blue-700 mb-2">Powered by Shiprocket</h3>
                <p className="text-gray-700 leading-relaxed">
                  Kalartz partners with Shiprocket to provide reliable and efficient shipping solutions. This allows our vendors to offer multiple courier options, real-time tracking, and streamlined logistics for a better delivery experience.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.section>


        {/* Call to Action / Links */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 + shippingInfo.length * 0.15 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold mb-6">Have More Questions?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard">
              <Button size="lg" className="bg-green-500 hover:bg-green-600 px-8 py-3">
                Track My Order
              </Button>
            </Link>
            <Link to="/help">
              <Button size="lg" variant="outline" className="border-green-500 text-green-500 hover:bg-green-50 px-8 py-3">
                Visit Help Center
              </Button>
            </Link>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default CustomerShippingPage;