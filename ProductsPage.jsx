
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Star, Heart, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { toast } from '@/components/ui/use-toast';
import { Link } from 'react-router-dom';

const ProductsPage = () => {
  const { addItem: addItemToCart } = useCart();
  const { addItem: addItemToWishlist, removeItem: removeItemFromWishlist, isItemInWishlist } = useWishlist();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const products = [
    { id: 1, name: 'Premium Wireless Headphones X2000', price: 299.99, rating: 4.8, reviews: 124, image: 'Premium wireless headphones with noise cancellation in black', category: 'Electronics', vendor: 'TechGear Pro Sound' },
    { id: 2, name: 'Smart Fitness Watch Series 5', price: 199.99, rating: 4.6, reviews: 89, image: 'Modern smartwatch with bright display and fitness tracking icons', category: 'Wearables', vendor: 'FitTech Dynamics' },
    { id: 3, name: 'Artisanal Dark Roast Coffee Beans', price: 24.99, rating: 4.9, reviews: 256, image: 'Elegant bag of premium dark roast organic coffee beans', category: 'Food & Beverage', vendor: 'Bean Masters Co.' },
    { id: 4, name: 'Urban Explorer Laptop Backpack', price: 89.99, rating: 4.7, reviews: 67, image: 'Stylish and durable designer laptop backpack in grey', category: 'Fashion', vendor: 'Urban Style Co.' },
    { id: 5, name: 'Portable Bluetooth Speaker X-Bass', price: 79.99, rating: 4.5, reviews: 143, image: 'Compact portable bluetooth speaker with rich bass sound', category: 'Electronics', vendor: 'SoundWave Audio' },
    { id: 6, name: 'Eco-Friendly Yoga Mat Pro', price: 49.99, rating: 4.8, reviews: 92, image: 'High-quality eco-friendly yoga mat in teal color', category: 'Sports', vendor: 'ZenFit Wellness' }
  ];

  const categories = ['all', 'Electronics', 'Fashion', 'Food & Beverage', 'Wearables', 'Sports'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || product.vendor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (product) => {
    addItemToCart(product);
    toast({
      title: "Added to cart!",
      description: `${product.name} has been added.`,
      action: <Link to="/cart"><Button variant="outline" size="sm">View Cart</Button></Link>,
    });
  };

  const handleToggleWishlist = (product) => {
    if (isItemInWishlist(product.id)) {
      removeItemFromWishlist(product.id);
      toast({ title: "Removed from Wishlist", description: `${product.name} removed.` });
    } else {
      addItemToWishlist(product);
      toast({ title: "Added to Wishlist!", description: `${product.name} added.` });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 py-8 md:py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 md:mb-12 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600">
            Explore Our Products
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Find everything you need, from cutting-edge electronics to stylish fashion and gourmet treats.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-xl shadow-xl p-6 mb-8 md:mb-12 border border-gray-200"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="flex-1 relative w-full">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search products or vendors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-3 text-base rounded-lg shadow-inner"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="capitalize transition-all duration-200 hover:shadow-md"
                >
                  {category}
                </Button>
              ))}
            </div>

            <Button
              variant="outline"
              onClick={() => toast({ title: "🚧 More filters not implemented" })}
              className="transition-all duration-200 hover:shadow-md"
            >
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>
        </motion.div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="h-full"
              >
                <Card className="card-hover overflow-hidden h-full flex flex-col rounded-xl shadow-lg border border-gray-200 transition-all duration-300 hover:border-purple-400">
                  <div className="relative">
                    <Link to={`/products/${product.id}`}>
                      <img  className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105" alt={`${product.image}`} src={`https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600&h=600&fit=crop&product_name=${encodeURIComponent(product.image)}`} />
                    </Link>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-3 right-3 bg-white/80 hover:bg-white rounded-full shadow-md w-9 h-9"
                      onClick={() => handleToggleWishlist(product)}
                    >
                      <Heart className={`w-5 h-5 transition-colors ${isItemInWishlist(product.id) ? 'text-red-500 fill-red-500' : 'text-gray-500'}`} />
                    </Button>
                    <div className="absolute top-3 left-3 bg-purple-600 text-white text-xs px-2.5 py-1 rounded-full shadow-md">
                      {product.category}
                    </div>
                  </div>
                  
                  <CardContent className="p-5 flex flex-col flex-grow">
                    <div className="flex-1 mb-3">
                      <p className="text-xs text-gray-500 mb-1">by {product.vendor}</p>
                      <Link to={`/products/${product.id}`}>
                        <h3 className="font-semibold text-lg text-gray-800 mb-1.5 line-clamp-2 hover:text-purple-700 transition-colors">{product.name}</h3>
                      </Link>
                      <div className="flex items-center">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                          ))}
                        </div>
                        <span className="text-xs text-gray-500 ml-1.5">({product.rating} / {product.reviews} reviews)</span>
                      </div>
                    </div>
                    
                    <div className="mt-auto">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-2xl font-bold text-purple-700">${product.price.toFixed(2)}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          size="sm"
                          className="flex-1 bg-purple-600 hover:bg-purple-700"
                          onClick={() => handleAddToCart(product)}
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" /> Add
                        </Button>
                        <Link to={`/products/${product.id}`} className="flex-1">
                          <Button variant="outline" size="sm" className="w-full border-purple-600 text-purple-600 hover:bg-purple-50">
                            View
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Search className="w-20 h-20 text-gray-300 mx-auto mb-6" />
            <p className="text-2xl text-gray-600">No products found.</p>
            <p className="text-gray-500 mt-2">Try adjusting your search or filters.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
