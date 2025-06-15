import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Tag, Percent, Clock, ShoppingCart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/components/ui/use-toast';

const CustomerDealsPage = () => {
  const { addItem } = useCart();

  const deals = [
    {
      id: 1,
      name: 'Flash Sale: Smart Home Bundle',
      discount: 40, // Percentage
      originalPrice: 499.99,
      dealPrice: 299.99,
      description: 'Get a smart speaker, smart light bulb, and smart plug at an unbeatable price!',
      image: 'Bundle of smart home devices',
      category: 'Electronics',
      endDate: '2025-06-16T23:59:59',
      rating: 4.7
    },
    {
      id: 2,
      name: 'Weekend Fashion Blowout',
      discount: 25,
      originalPrice: 120.00,
      dealPrice: 90.00,
      description: 'Save 25% on select summer dresses and t-shirts. Limited stock!',
      image: 'Collection of summer fashion items',
      category: 'Fashion',
      endDate: '2025-06-17T23:59:59',
      rating: 4.5
    },
    {
      id: 3,
      name: 'Gourmet Coffee Special',
      discount: 15,
      originalPrice: 29.99,
      dealPrice: 25.49,
      description: 'Enjoy premium Arabica coffee beans with a 15% discount. Perfect for coffee lovers.',
      image: 'Bag of gourmet coffee beans with a coffee cup',
      category: 'Food & Beverage',
      endDate: '2025-06-20T23:59:59',
      rating: 4.9
    },
    {
      id: 4,
      name: 'Fitness Gear Clearance',
      discount: 50,
      originalPrice: 199.99,
      dealPrice: 99.99,
      description: 'Half price on last season\'s fitness trackers and yoga mats. Grab them while they last!',
      image: 'Fitness tracker and yoga mat',
      category: 'Sports & Fitness',
      endDate: '2025-06-18T23:59:59',
      rating: 4.6
    }
  ];

  const calculateTimeLeft = (endDate) => {
    const difference = +new Date(endDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
      };
    }
    return timeLeft;
  };

  const handleAddToCart = (deal) => {
    addItem({ ...deal, price: deal.dealPrice }, 1); // Add item with deal price
    toast({
      title: "Deal Added to Cart!",
      description: `${deal.name} has been added to your cart.`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-red-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <Percent className="w-16 h-16 text-red-500 mx-auto mb-4 animate-pulse-slow" />
          <h1 className="text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-pink-500 to-purple-600">
            Hot Deals & Special Offers
          </h1>
          <p className="text-xl text-gray-700">Don't miss out on these amazing savings!</p>
        </motion.div>

        {/* Deals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {deals.map((deal, index) => {
            const timeLeft = calculateTimeLeft(deal.endDate);
            const isExpired = !timeLeft.days && !timeLeft.hours && !timeLeft.minutes;
            return (
              <motion.div
                key={deal.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="h-full"
              >
                <Card className="card-hover overflow-hidden h-full flex flex-col group border-2 border-transparent hover:border-red-400 transition-all duration-300 shadow-xl">
                  <div className="relative">
                    <img  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300" alt={deal.image} src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e" />
                    <div className="absolute top-0 left-0 bg-red-500 text-white px-4 py-2 text-lg font-bold rounded-br-lg shadow-md">
                      {deal.discount}% OFF
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-3">
                      <div className="flex items-center text-sm">
                        <Clock className="w-4 h-4 mr-1.5" />
                        {isExpired ? (
                          <span>Deal Expired</span>
                        ) : (
                          <span>
                            Ends in: {timeLeft.days > 0 && `${timeLeft.days}d `}
                            {timeLeft.hours > 0 && `${timeLeft.hours}h `}
                            {timeLeft.minutes}m
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6 flex flex-col flex-grow">
                    <p className="text-sm text-purple-600 font-medium mb-1">{deal.category}</p>
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-red-600 transition-colors duration-300">{deal.name}</h3>
                    <p className="text-gray-600 mb-3 text-sm line-clamp-2 flex-grow">{deal.description}</p>
                    
                    <div className="flex items-center mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < Math.floor(deal.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                      ))}
                      <span className="text-sm text-gray-500 ml-1.5">({deal.rating})</span>
                    </div>

                    <div className="flex items-baseline space-x-2 mb-4">
                      <span className="text-3xl font-bold text-red-600">${deal.dealPrice.toFixed(2)}</span>
                      <span className="text-lg text-gray-500 line-through">${deal.originalPrice.toFixed(2)}</span>
                    </div>
                    
                    <div className="mt-auto flex space-x-3">
                      <Button 
                        className="flex-1 bg-red-500 hover:bg-red-600" 
                        onClick={() => handleAddToCart(deal)}
                        disabled={isExpired}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        {isExpired ? 'Deal Expired' : 'Add to Cart'}
                      </Button>
                      <Link to={`/products/${deal.id}`} className="flex-1">
                        <Button variant="outline" className="w-full border-red-500 text-red-500 hover:bg-red-50">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CustomerDealsPage;