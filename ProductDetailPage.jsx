
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Heart, Truck, Shield, ArrowLeft, Plus, Minus, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { toast } from '@/components/ui/use-toast';

const ProductDetailPage = () => {
  const { id } = useParams();
  const { addItem: addItemToCart } = useCart();
  const { addItem: addItemToWishlist, removeItem: removeItemFromWishlist, isItemInWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isInWishlist, setIsInWishlist] = useState(false);

  // Mock product data - in real app, this would be fetched based on ID
  const product = {
    id: parseInt(id),
    name: 'Premium Wireless Headphones X2000',
    price: 299.99,
    originalPrice: 399.99,
    rating: 4.8,
    reviews: 124,
    category: 'Electronics',
    vendor: 'TechGear Pro Sound',
    description: 'Experience immersive, high-fidelity sound with our state-of-the-art X2000 wireless headphones. Featuring adaptive noise cancellation, 40-hour battery life, plush memory foam earcups, and intuitive touch controls for an unparalleled audio experience.',
    features: [
      'Adaptive Noise Cancellation',
      '40-hour extended battery life',
      'Plush memory foam earcups',
      'Bluetooth 5.2 with multi-point',
      'Quick charge: 10 min for 5 hours',
      'Studio-grade microphone array',
      'Durable carrying case included'
    ],
    specifications: {
      'Driver Size': '45mm Dynamic',
      'Frequency Response': '15Hz - 25kHz',
      'Impedance': '32 Ohms',
      'Weight': '230g',
      'Connectivity': 'Bluetooth 5.2, USB-C, 3.5mm Jack',
      'Battery': '40 hours playback (ANC on)'
    },
    images: [
      'Premium wireless headphones main view in sleek black',
      'Headphones side profile showing earcup design',
      'Headphones folded neatly in their premium carrying case',
      'Close-up of plush memory foam padding on earcup'
    ],
    inStock: true,
    stockCount: 15
  };

  useEffect(() => {
    setIsInWishlist(isItemInWishlist(product.id));
  }, [isItemInWishlist, product.id]);

  const reviews = [
    { id: 1, user: 'John D.', rating: 5, comment: 'Absolutely phenomenal sound quality and supreme comfort. Best headphones I have ever owned!', date: '2025-06-10' },
    { id: 2, user: 'Sarah M.', rating: 4, comment: 'Excellent noise cancellation, ideal for travel. The battery life is incredible. A bit pricey but worth it.', date: '2025-06-08' },
    { id: 3, user: 'Mike R.', rating: 5, comment: 'Premium build, crystal clear audio, and the microphone is surprisingly good for calls. Highly recommend!', date: '2025-06-05' }
  ];

  const handleAddToCart = () => {
    addItemToCart(product, quantity);
    toast({
      title: "Added to cart!",
      description: `${quantity} x ${product.name} added.`,
      action: <Link to="/cart"><Button variant="outline" size="sm">View Cart</Button></Link>,
    });
  };

  const handleToggleWishlist = () => {
    if (isInWishlist) {
      removeItemFromWishlist(product.id);
      toast({ title: "Removed from Wishlist", description: `${product.name} removed.` });
    } else {
      addItemToWishlist(product);
      toast({ title: "Added to Wishlist!", description: `${product.name} added.` });
    }
    setIsInWishlist(!isInWishlist);
  };


  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= product.stockCount) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 py-8 md:py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 md:mb-8"
        >
          <Link to="/products" className="inline-flex items-center text-purple-700 hover:text-purple-900 transition-colors group">
            <ArrowLeft className="w-5 h-5 mr-2 transform transition-transform group-hover:-translate-x-1" />
            Back to Products
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-4"
          >
            <div className="aspect-square bg-white rounded-xl overflow-hidden shadow-2xl border border-gray-200">
              <img  className="w-full h-full object-contain p-4 transition-transform duration-500 hover:scale-105" alt={`${product.images[selectedImage]}`} src={`https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200&ixid=eyJhcHBfaWQiOjEyMDd9&fit=max&product_name=${encodeURIComponent(product.images[selectedImage])}`} />
            </div>
            
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((imageDesc, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square bg-white rounded-lg overflow-hidden border-2 transition-all duration-200 hover:shadow-md ${
                    selectedImage === index ? 'border-purple-600 ring-2 ring-purple-300 shadow-lg' : 'border-gray-200 hover:border-purple-400'
                  }`}
                >
                  <img  className="w-full h-full object-contain p-1" alt={`${imageDesc}`} src={`https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=200&h=200&fit=crop&product_name=${encodeURIComponent(imageDesc)}`} />
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <p className="text-sm text-purple-700 font-medium mb-1">Sold by: <span className="font-semibold">{product.vendor}</span></p>
              <h1 className="text-3xl md:text-4xl font-bold mb-3">{product.name}</h1>
              
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                  ))}
                </div>
                <span className="text-base text-gray-600 ml-2">{product.rating} ({product.reviews} reviews)</span>
              </div>

              <div className="flex items-baseline space-x-3 mb-5">
                <span className="text-4xl font-bold text-purple-700">${product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <span className="text-2xl text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>
                )}
                <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">
                  SAVE ${((product.originalPrice || 0) - product.price).toFixed(2)}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-gray-700 text-base leading-relaxed">{product.description}</p>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center"> <Truck className="w-4 h-4 mr-1.5 text-green-600" /> Free Shipping </div>
                <div className="flex items-center"> <Shield className="w-4 h-4 mr-1.5 text-blue-600" /> 2-Year Warranty </div>
              </div>
              {product.inStock ? (
                <p className="text-green-600 font-medium flex items-center"><CheckCircle className="w-4 h-4 mr-1.5" /> In Stock ({product.stockCount} left)</p>
              ) : (
                <p className="text-red-600 font-medium">Out of Stock</p>
              )}
            </div>

            <div className="space-y-4 pt-2">
              <div className="flex items-center space-x-4">
                <span className="font-medium text-gray-800">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded-lg shadow-sm">
                  <Button variant="ghost" size="icon" onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1} className="h-10 w-10"> <Minus className="w-4 h-4" /> </Button>
                  <span className="px-5 py-2 font-medium text-lg">{quantity}</span>
                  <Button variant="ghost" size="icon" onClick={() => handleQuantityChange(1)} disabled={quantity >= product.stockCount || !product.inStock} className="h-10 w-10"> <Plus className="w-4 h-4" /> </Button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <Button size="lg" onClick={handleAddToCart} className="flex-1 text-lg py-3 h-auto bg-purple-600 hover:bg-purple-700" disabled={!product.inStock}>
                  Add to Cart - ${(product.price * quantity).toFixed(2)}
                </Button>
                <Button variant={isInWishlist ? "secondary" : "outline"} size="lg" onClick={handleToggleWishlist} className="flex-1 text-lg py-3 h-auto border-purple-600 text-purple-600 hover:bg-purple-50">
                  <Heart className={`w-5 h-5 mr-2 ${isInWishlist ? 'fill-red-500 text-red-500' : ''}`} />
                  {isInWishlist ? 'In Wishlist' : 'Add to Wishlist'}
                </Button>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <Card className="shadow-xl border-t-4 border-purple-500">
            <CardContent className="p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Key Features</h3>
                  <ul className="space-y-2 text-gray-700">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-purple-600 rounded-full mr-3 mt-[0.4rem] flex-shrink-0"></div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4">Specifications</h3>
                  <div className="space-y-2 text-gray-700">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between border-b border-gray-100 pb-1.5 last:border-b-0">
                        <span className="font-medium text-gray-600">{key}:</span>
                        <span className="text-right">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-12 md:mt-16"
        >
          <Card className="shadow-xl">
            <CardContent className="p-6 md:p-8">
              <h3 className="text-2xl font-bold mb-6">Customer Reviews</h3>
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-100 pb-6 last:border-b-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <span className="font-semibold text-gray-800">{review.user}</span>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 text-center">
                <Button variant="outline" onClick={() => toast({ title: "🚧 Load more reviews not implemented" })}>
                  Load More Reviews
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
