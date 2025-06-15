import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { Link } from 'react-router-dom';

const CustomerContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock submission
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you shortly. (This is a mock action)",
    });
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactDetails = [
    { icon: Mail, label: 'Email Us', value: 'support@kalartz.com', href: 'mailto:support@kalartz.com' },
    { icon: Phone, label: 'Call Us', value: '+1 (555) KAL-ARTZ', href: 'tel:+15555252789' },
    { icon: MapPin, label: 'Our Office', value: '123 Kalartz Avenue, Ecom City, EC 54321', href: '#' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.section
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <MessageSquare className="w-20 h-20 text-indigo-600 mx-auto mb-6 animate-pulse-slow" />
          <h1 className="text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-600">
            Get In Touch
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            We're here to help and answer any question you might have. We look forward to hearing from you!
          </p>
        </motion.section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <Card className="shadow-xl border-t-4 border-indigo-500">
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-indigo-700">Send Us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <Input type="text" name="name" id="name" placeholder="Your Name" value={formData.name} onChange={handleInputChange} required />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      <Input type="email" name="email" id="email" placeholder="your.email@example.com" value={formData.email} onChange={handleInputChange} required />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                    <Input type="text" name="subject" id="subject" placeholder="What's this about?" value={formData.subject} onChange={handleInputChange} required />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea
                      name="message"
                      id="message"
                      rows={5}
                      placeholder="Your message here..."
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      className="w-full p-2 border border-input rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                  <Button type="submit" size="lg" className="w-full bg-indigo-600 hover:bg-indigo-700 text-lg">
                    <Send className="w-5 h-5 mr-2" /> Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Information & Quick Links */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="space-y-8"
          >
            <Card className="shadow-xl border-t-4 border-purple-500">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-purple-700">Contact Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {contactDetails.map((detail, index) => {
                  const Icon = detail.icon;
                  return (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <Icon className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{detail.label}</p>
                        <a href={detail.href} className="text-purple-600 hover:text-purple-800 transition-colors break-all">
                          {detail.value}
                        </a>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            <Card className="shadow-xl border-t-4 border-pink-500">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-pink-700">Quick Help</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-gray-700">
                  Many common questions are answered in our Help Center. Check it out for quick solutions!
                </p>
                <Link to="/help">
                  <Button variant="outline" className="w-full border-pink-500 text-pink-600 hover:bg-pink-50">
                    <HelpCircle className="w-5 h-5 mr-2" /> Visit Help Center
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CustomerContactPage;