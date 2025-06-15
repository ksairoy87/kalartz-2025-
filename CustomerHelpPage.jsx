import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, Search, ChevronDown, ChevronUp, ShoppingBag, Truck, User, CreditCard } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const faqs = [
  {
    category: 'Orders & Shipping',
    icon: ShoppingBag,
    questions: [
      { q: 'How do I track my order?', a: 'You can track your order from your Customer Dashboard under "My Orders". Click on the specific order to see tracking details provided by the vendor and Shiprocket.' },
      { q: 'What are the shipping costs?', a: 'Shipping costs vary depending on the vendor and your location. Some vendors offer free shipping. Final shipping costs are calculated at checkout.' },
      { q: 'How long does shipping take?', a: 'Shipping times depend on the vendor and your location. Estimated delivery times are provided on the product page and at checkout. Standard shipping is typically 3-7 business days.' },
    ]
  },
  {
    category: 'Returns & Refunds',
    icon: Truck,
    questions: [
      { q: 'What is your return policy?', a: 'Most vendors on Kalartz offer a 30-day return policy for eligible items. Please check the specific vendor\'s return policy on the product page or contact them directly. You can initiate a return from your order history.' },
      { q: 'How do I request a refund?', a: 'If you\'re eligible for a refund, you can request it through your order details page after initiating a return. Refunds are typically processed within 5-7 business days after the returned item is received by the vendor.' },
    ]
  },
  {
    category: 'Account Management',
    icon: User,
    questions: [
      { q: 'How do I update my account information?', a: 'You can update your profile, shipping addresses, and payment methods in your Customer Dashboard under "Account Settings".' },
      { q: 'I forgot my password. What should I do?', a: 'Click on the "Forgot Password" link on the login page. You\'ll receive an email with instructions to reset your password.' },
    ]
  },
  {
    category: 'Payments',
    icon: CreditCard,
    questions: [
      { q: 'What payment methods do you accept?', a: 'We accept major credit/debit cards (via Stripe), PhonePe, and Razorpay. Available options may vary slightly by vendor or region.' },
      { q: 'Is my payment information secure?', a: 'Yes, all payments are processed through secure, PCI-compliant gateways like Stripe. Kalartz does not store your full credit card details.' },
    ]
  }
];

const CustomerHelpPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openCategory, setOpenCategory] = useState(null);
  const [openQuestion, setOpenQuestion] = useState(null);

  const toggleCategory = (index) => {
    setOpenCategory(openCategory === index ? null : index);
    setOpenQuestion(null); // Close any open question when category changes
  };

  const toggleQuestion = (qIndex) => {
    setOpenQuestion(openQuestion === qIndex ? null : qIndex);
  };

  const filteredFaqs = faqs.map(cat => ({
    ...cat,
    questions: cat.questions.filter(
      q => q.q.toLowerCase().includes(searchTerm.toLowerCase()) || q.a.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(cat => cat.questions.length > 0 || cat.category.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.section
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <HelpCircle className="w-20 h-20 text-purple-600 mx-auto mb-6 animate-bounce" />
          <h1 className="text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-blue-500 to-indigo-600">
            Kalartz Help Center
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Have questions? We're here to help! Find answers to common queries below or contact our support team.
          </p>
        </motion.section>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-10 max-w-3xl mx-auto"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search for help articles, FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-4 py-3 text-lg rounded-full shadow-lg border-purple-300 focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
        </motion.div>

        {/* FAQ Sections */}
        <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
          {filteredFaqs.map((categoryItem, catIndex) => {
            const CategoryIcon = categoryItem.icon;
            return (
              <motion.div
                key={catIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + catIndex * 0.1 }}
              >
                <Card className="overflow-hidden shadow-xl border-t-4 border-purple-500">
                  <CardHeader 
                    className="cursor-pointer hover:bg-purple-50 transition-colors p-6"
                    onClick={() => toggleCategory(catIndex)}
                  >
                    <CardTitle className="flex items-center justify-between text-2xl font-bold text-purple-700">
                      <div className="flex items-center">
                        <CategoryIcon className="w-7 h-7 mr-3" />
                        {categoryItem.category}
                      </div>
                      {openCategory === catIndex ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
                    </CardTitle>
                  </CardHeader>
                  {openCategory === catIndex && (
                    <CardContent className="p-6 space-y-4 bg-white">
                      {categoryItem.questions.map((faq, qIndex) => (
                        <motion.div
                          key={qIndex}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="border-b border-gray-200 last:border-b-0 pb-4"
                        >
                          <button
                            className="flex justify-between items-center w-full text-left py-3 focus:outline-none"
                            onClick={() => toggleQuestion(qIndex)}
                          >
                            <span className="text-lg font-medium text-gray-800">{faq.q}</span>
                            {openQuestion === qIndex ? <ChevronUp className="w-5 h-5 text-purple-600" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
                          </button>
                          {openQuestion === qIndex && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3 }}
                              className="pt-2 pl-2 pr-2 text-gray-600 leading-relaxed"
                            >
                              <p>{faq.a}</p>
                            </motion.div>
                          )}
                        </motion.div>
                      ))}
                    </CardContent>
                  )}
                </Card>
              </motion.div>
            );
          })}
        </div>

        {filteredFaqs.length === 0 && searchTerm && (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-xl text-gray-600 mt-12"
          >
            No results found for "{searchTerm}". Try a different search term.
          </motion.p>
        )}

        {/* Contact Support Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 + filteredFaqs.length * 0.1 }}
          className="mt-16 text-center py-12 bg-white rounded-xl shadow-xl"
        >
          <h2 className="text-3xl font-bold mb-4">Can't find what you're looking for?</h2>
          <p className="text-lg text-gray-700 mb-8 max-w-lg mx-auto">
            Our support team is ready to assist you with any questions or issues you might have.
          </p>
          <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-lg px-8 py-4">
            Contact Support
          </Button>
        </motion.section>
      </div>
    </div>
  );
};

export default CustomerHelpPage;