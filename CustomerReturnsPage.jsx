import React from 'react';
import { motion } from 'framer-motion';
import { PackageCheck, RotateCcw, HelpCircle, FileText, MessageSquare, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const CustomerReturnsPage = () => {
  const steps = [
    {
      icon: PackageCheck,
      title: 'Check Eligibility',
      description: 'Most items can be returned within 30 days of delivery. Check the product page or your order details for specific vendor return policies.'
    },
    {
      icon: FileText,
      title: 'Initiate Return',
      description: 'Go to your "Order History" in your dashboard, select the order, and click "Return Items". Follow the on-screen instructions.'
    },
    {
      icon: RotateCcw,
      title: 'Prepare Package',
      description: 'Securely pack the item in its original packaging, if possible. Include any accessories, manuals, or parts that came with it.'
    },
    {
      icon: Truck,
      title: 'Ship Your Return',
      description: 'Follow the shipping instructions provided by the vendor. You may receive a prepaid label or need to arrange your own shipping.'
    },
    {
      icon: MessageSquare,
      title: 'Refund Processed',
      description: 'Once the vendor receives and inspects the return, your refund will be processed to your original payment method within 5-7 business days.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.section
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <RotateCcw className="w-20 h-20 text-red-500 mx-auto mb-6 animate-spin [animation-duration:5s]" />
          <h1 className="text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-pink-600 to-rose-700">
            Returns & Refunds
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            We want you to be completely satisfied with your purchase. Here's how our return process works.
          </p>
        </motion.section>

        {/* How to Return Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-10">How to Return an Item</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.15 }}
                >
                  <Card className="h-full shadow-lg hover:shadow-xl transition-shadow duration-300 border-t-4 border-red-400">
                    <CardHeader className="pb-4">
                      <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                        <Icon className="w-7 h-7 text-red-600" />
                      </div>
                      <CardTitle className="text-xl font-semibold text-red-700">{index + 1}. {step.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 leading-relaxed">{step.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Important Notes Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mb-16"
        >
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-800">Important Notes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-gray-700">
              <p>• Items must be in their original condition, unused, and with all tags attached (if applicable).</p>
              <p>• Some items, like personalized products or digital downloads, may not be eligible for return. Please check product details.</p>
              <p>• Return shipping costs may apply depending on the vendor's policy and reason for return.</p>
              <p>• If you received a damaged or incorrect item, please contact the vendor or Kalartz support immediately.</p>
            </CardContent>
          </Card>
        </motion.section>

        {/* Call to Action / Links */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold mb-6">Need Help or Have Questions?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard">
              <Button size="lg" className="bg-red-500 hover:bg-red-600 px-8 py-3">
                Go to My Orders
              </Button>
            </Link>
            <Link to="/help">
              <Button size="lg" variant="outline" className="border-red-500 text-red-500 hover:bg-red-50 px-8 py-3">
                <HelpCircle className="w-5 h-5 mr-2" />
                Visit Help Center
              </Button>
            </Link>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default CustomerReturnsPage;