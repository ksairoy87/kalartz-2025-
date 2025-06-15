import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2, AlertTriangle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useWishlist } from '@/contexts/WishlistContext';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/components/ui/use-toast';

const CustomerWishlistPage = () => {
  const { wishlistItems, removeItemFromWishlist, clearWishlist } = useWishlist();
  const { addItem: addItemToCart } = useCart();

  const handleMoveToCart = (product) => {
    addItemToCart(product, 1);
    removeItemFromWishlist(product.id);
    toast({
      title: "Moved to Cart",
      description: `${product.name} has been moved to your cart.`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50 py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center">
            <Heart className="w-10 h-10 text-red-500 mr-3" />
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-pink-500 to-purple-600">
              My Wishlist
            </h1>
          </div>
          <Link to="/products">
            <Button variant="outline" className="border-purple-500 text-purple-600 hover:bg-purple-50">
              <ArrowLeft className="w-4 h-4 mr-2" /> Continue Shopping
            </Button>
          </Link>
        </motion.div>

        {wishlistItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center py-16"
          >
            <Heart className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">Your Wishlist is Empty</h2>
            <p className="text-gray-500 mb-6">Looks like you haven't added anything to your wishlist yet. Explore our products and find something you love!</p>
            <Link to="/products">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                Discover Products
              </Button>
            </Link>
          </motion.div>
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-6 flex justify-end"
            >
              <Button variant="destructive" onClick={() => {
                clearWishlist();
                toast({ title: "Wishlist Cleared", description: "All items removed from your wishlist."});
              }}>
                <Trash2 className="w-4 h-4 mr-2" /> Clear Wishlist
              </Button>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {wishlistItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="h-full"
                >
                  <Card className="card-hover overflow-hidden h-full flex flex-col group shadow-lg">
                    <Link to={`/products/${item.id}`} className="block relative aspect-square">
                      <img  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" alt={item.image || 'Product Image'} src={item.image || "https://images.unsplash.com/photo-1580527713511-903126083f3c"} />
                    </Link>
                    <CardContent className="p-4 flex flex-col flex-grow">
                      <p className="text-xs text-gray-500 mb-1">{item.category || 'Uncategorized'}</p>
                      <Link to={`/products/${item.id}`}>
                        <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors duration-300 flex-grow">{item.name}</h3>
                      </Link>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xl font-bold text-purple-600">${item.price.toFixed(2)}</span>
                        {item.originalPrice && (
                          <span className="text-sm text-gray-400 line-through">${item.originalPrice.toFixed(2)}</span>
                        )}
                      </div>
                      <div className="mt-auto flex flex-col space-y-2">
                        <Button 
                          onClick={() => handleMoveToCart(item)}
                          className="w-full bg-purple-600 hover:bg-purple-700"
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" /> Move to Cart
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => removeItemFromWishlist(item.id)}
                          className="w-full border-red-500 text-red-500 hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 className="w-4 h-4 mr-2" /> Remove
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CustomerWishlistPage;