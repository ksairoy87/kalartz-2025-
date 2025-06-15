import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Truck, Shield, Headphones, ShoppingBag, Tag, ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const HomePage = () => {
  const autoplayPlugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));

  const heroSlides = [
    {
      title: "Unbeatable Tech Deals",
      subtitle: "Explore the latest gadgets and electronics at incredible prices.",
      buttonText: "Shop Electronics",
      buttonLink: "/products?category=Electronics",
      image: "Futuristic tech gadgets on a sleek background",
      bgColor: "bg-gradient-to-tr from-blue-600 via-indigo-700 to-purple-800",
      textColor: "text-white"
    },
    {
      title: "Fresh Fashion Finds",
      subtitle: "Update your wardrobe with the newest trends and styles.",
      buttonText: "Discover Fashion",
      buttonLink: "/products?category=Fashion",
      image: "Stylish models showcasing the latest fashion trends",
      bgColor: "bg-gradient-to-tr from-pink-500 via-rose-500 to-red-600",
      textColor: "text-white"
    },
    {
      title: "Home & Garden Essentials",
      subtitle: "Everything you need to create your perfect living space.",
      buttonText: "Explore Home",
      buttonLink: "/products?category=Home",
      image: "Beautifully decorated modern living room",
      bgColor: "bg-gradient-to-tr from-green-500 via-emerald-600 to-teal-700",
      textColor: "text-white"
    }
  ];

  const featuredProducts = [
    { id: 1, name: 'NovaSound Pro Headphones', price: 299.99, rating: 4.8, image: 'Sleek black wireless headphones', category: 'Electronics' },
    { id: 2, name: 'ChronoFit Smartwatch X1', price: 199.99, rating: 4.6, image: 'Modern smartwatch displaying health data', category: 'Wearables' },
    { id: 3, name: 'AromaBlend Organic Coffee', price: 24.99, rating: 4.9, image: 'Artisanal bag of organic coffee beans', category: 'Food & Beverage' },
    { id: 4, name: 'UrbanExplorer Backpack', price: 89.99, rating: 4.7, image: 'Durable and stylish urban backpack', category: 'Fashion' },
    { id: 5, name: 'AuraGlow Desk Lamp', price: 59.99, rating: 4.5, image: 'Minimalist LED desk lamp with adjustable brightness', category: 'Home Goods' },
    { id: 6, name: 'FlexiFit Yoga Mat', price: 39.99, rating: 4.8, image: 'Premium non-slip yoga mat in vibrant color', category: 'Sports' }
  ];

  const categories = [
    { name: 'Electronics', icon: ShoppingBag, image: 'Assortment of electronic gadgets', color: 'from-blue-500 to-indigo-600' },
    { name: 'Fashion', icon: Tag, image: 'Trendy clothing items and accessories', color: 'from-pink-500 to-rose-600' },
    { name: 'Home & Garden', icon: ShoppingBag, image: 'Cozy home decor and gardening tools', color: 'from-green-500 to-emerald-600' },
    { name: 'Sports & Outdoors', icon: Tag, image: 'Various sports equipment and outdoor gear', color: 'from-orange-500 to-red-600' },
  ];

  const features = [
    { icon: Truck, title: 'Fast Shipping', description: 'Get your orders delivered quickly.' },
    { icon: Shield, title: 'Secure Payments', description: 'Shop with confidence.' },
    { icon: Headphones, title: 'Dedicated Support', description: 'We are here to help you.' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section with Carousel */}
      <section className="relative text-white overflow-hidden">
        <Carousel
          plugins={[autoplayPlugin.current]}
          className="w-full"
          opts={{ loop: true }}
        >
          <CarouselContent>
            {heroSlides.map((slide, index) => (
              <CarouselItem key={index}>
                <div className={`min-h-[70vh] md:min-h-[80vh] flex items-center justify-center ${slide.bgColor} relative`}>
                  <div className="absolute inset-0 hero-pattern opacity-10"></div>
                  <div className="container mx-auto px-4 py-20 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                      <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="space-y-6 text-center md:text-left"
                      >
                        <h1 className={`text-4xl lg:text-6xl font-bold leading-tight ${slide.textColor}`}>
                          {slide.title}
                        </h1>
                        <p className={`text-lg lg:text-xl ${slide.textColor} opacity-90 leading-relaxed`}>
                          {slide.subtitle}
                        </p>
                        <Link to={slide.buttonLink}>
                          <Button size="lg" className="bg-white text-purple-700 hover:bg-gray-100 text-lg px-8 py-4 shadow-lg">
                            {slide.buttonText}
                            <ArrowRight className="ml-2 w-5 h-5" />
                          </Button>
                        </Link>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="hidden md:block"
                      >
                        <img   className="w-full max-w-md mx-auto h-auto rounded-lg shadow-2xl object-contain" alt={slide.image} src="https://images.unsplash.com/photo-1606313564532-e9fb73932d60" />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white/50 text-white border-none" />
          <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white/50 text-white border-none" />
        </Carousel>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6 bg-white rounded-xl shadow-lg card-hover"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Featured Products</h2>
            <p className="text-xl text-gray-600">Handpicked selections just for you</p>
          </motion.div>

          <Carousel
            opts={{ align: "start", loop: true }}
            plugins={[Autoplay({ delay: 3000, stopOnInteraction: true })]}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {featuredProducts.map((product) => (
                <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4 pl-4">
                  <Card className="card-hover overflow-hidden h-full flex flex-col">
                    <div className="relative aspect-square">
                      <img   className="w-full h-full object-cover" alt={product.image} src="https://images.unsplash.com/photo-1635865165118-917ed9e20936" />
                      <div className="absolute top-2 right-2 bg-white rounded-full p-1 shadow">
                        <Heart className="w-5 h-5 text-red-500 hover:fill-red-500 transition-all" />
                      </div>
                    </div>
                    <CardContent className="p-4 flex flex-col flex-grow">
                      <p className="text-xs text-gray-500 mb-1">{product.category}</p>
                      <h3 className="font-semibold text-lg mb-2 line-clamp-2 flex-grow">{product.name}</h3>
                      <div className="flex items-center mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                        ))}
                        <span className="text-sm text-gray-500 ml-1.5">({product.rating})</span>
                      </div>
                      <div className="flex items-center justify-between mt-auto">
                        <span className="text-2xl font-bold text-purple-600">${product.price}</span>
                        <Link to={`/products/${product.id}`}>
                          <Button size="sm" variant="outline">View</Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
          </Carousel>
          <div className="text-center mt-12">
            <Link to="/products">
              <Button size="lg" className="px-8 py-4">
                View All Products
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Shop by Category</h2>
            <p className="text-xl text-gray-600">Explore our diverse range of categories</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => {
              const CategoryIcon = category.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="cursor-pointer group"
                >
                  <Card className="card-hover overflow-hidden relative h-64">
                    <img   className={`absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110`} alt={category.image} src="https://images.unsplash.com/photo-1698369234069-4966ab00f760" />
                    <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-70 group-hover:opacity-80 transition-opacity`}></div>
                    <CardContent className="relative z-10 flex flex-col items-center justify-center h-full text-white p-6">
                      <CategoryIcon className="w-12 h-12 mb-4" />
                      <h3 className="text-2xl font-semibold text-center">{category.name}</h3>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-r from-purple-700 via-blue-700 to-indigo-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-6">Join the Kalartz Community</h2>
            <p className="text-xl mb-10 opacity-90">
              Whether you're looking to shop for unique items or sell your amazing products, Kalartz is the place for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products">
                <Button size="lg" className="bg-white text-purple-700 hover:bg-gray-100 px-10 py-4 text-lg shadow-lg">
                  Start Shopping
                </Button>
              </Link>
              <Link to="/register?role=vendor">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-700 px-10 py-4 text-lg shadow-lg">
                  Become a Vendor
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;