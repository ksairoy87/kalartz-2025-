import React from 'react';
import { motion } from 'framer-motion';
import { Users, ShoppingBag, Shield, Globe, Target, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CustomerAboutPage = () => {
  const teamMembers = [
    { name: 'Alice Wonderland', role: 'CEO & Founder', image: 'Professional portrait of Alice Wonderland', quote: 'Our vision is to connect buyers and sellers seamlessly.' },
    { name: 'Bob The Builder', role: 'Head of Technology', image: 'Professional portrait of Bob The Builder', quote: 'Building a robust and scalable platform is my passion.' },
    { name: 'Carol Danvers', role: 'Marketing Director', image: 'Professional portrait of Carol Danvers', quote: 'Spreading the word about Kalartz and its amazing community.' },
  ];

  const values = [
    { icon: Users, title: 'Customer Centric', description: 'We prioritize our customers and vendors, ensuring a great experience for everyone.' },
    { icon: Shield, title: 'Trust & Safety', description: 'Security and trust are paramount. We strive to create a safe marketplace.' },
    { icon: Zap, title: 'Innovation', description: 'Continuously improving and innovating to provide the best e-commerce solutions.' },
    { icon: Globe, title: 'Community', description: 'Fostering a vibrant community of buyers and sellers from all around the world.' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 py-16 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 rounded-xl shadow-2xl text-white"
        >
          <div className="absolute inset-0 hero-pattern opacity-10 rounded-xl"></div>
          <div className="relative z-10">
            <ShoppingBag className="w-20 h-20 mx-auto mb-6 opacity-80" />
            <h1 className="text-5xl font-extrabold mb-6">About Kalartz</h1>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed opacity-90">
              Kalartz is more than just an e-commerce platform. We are a thriving community dedicated to connecting passionate sellers with discerning buyers, offering a diverse range of quality products and a seamless shopping experience.
            </p>
          </div>
        </motion.section>

        {/* Our Mission Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-16"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Target className="w-12 h-12 text-purple-600 mb-4" />
              <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                To empower vendors by providing them with the tools and platform to reach a global audience, and to offer customers a curated selection of high-quality products with unparalleled convenience and trust.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                We believe in fair trade, sustainable practices, and fostering a marketplace where creativity and entrepreneurship can flourish.
              </p>
            </div>
            <div className="rounded-xl overflow-hidden shadow-xl">
              <img  className="w-full h-auto object-cover" alt="Diverse group of people collaborating happily" src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f" />
            </div>
          </div>
        </motion.section>

        {/* Our Values Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mb-16 py-12 bg-white rounded-xl shadow-lg"
        >
          <h2 className="text-4xl font-bold text-center mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  className="text-center p-6 border border-gray-200 rounded-lg hover:shadow-xl transition-shadow"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-gray-600 text-sm">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Meet The Team Section (Optional) */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold text-center mb-12">Meet Our Team (Placeholder)</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                className="text-center bg-white p-8 rounded-xl shadow-lg card-hover"
              >
                <img  className="w-32 h-32 rounded-full mx-auto mb-6 object-cover shadow-md" alt={member.image} src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e" />
                <h3 className="text-2xl font-semibold mb-1">{member.name}</h3>
                <p className="text-purple-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 italic text-sm">"{member.quote}"</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="text-center py-12"
        >
          <h2 className="text-3xl font-bold mb-6">Ready to Join the Kalartz Family?</h2>
          <p className="text-lg text-gray-700 mb-8 max-w-xl mx-auto">
            Whether you're looking to discover unique products or start selling your own, Kalartz is the place for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/products">
              <Button size="lg" className="px-10 py-4 text-lg">
                Start Shopping
              </Button>
            </Link>
            <Link to="/register?role=vendor">
              <Button size="lg" variant="outline" className="px-10 py-4 text-lg">
                Become a Vendor
              </Button>
            </Link>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default CustomerAboutPage;