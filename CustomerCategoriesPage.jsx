import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Tag, Search, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const CustomerCategoriesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    {
      id: 1,
      name: 'Electronics',
      description: 'Discover the latest in tech, from smartphones to home entertainment systems.',
      productCount: 245,
      image: 'A collection of modern electronic gadgets',
      color: 'from-blue-500 to-purple-600',
      slug: 'electronics'
    },
    {
      id: 2,
      name: 'Fashion',
      description: 'Stay stylish with our wide range of clothing, shoes, and accessories for all.',
      productCount: 189,
      image: 'Trendy fashion items displayed on mannequins',
      color: 'from-pink-500 to-rose-600',
      slug: 'fashion'
    },
    {
      id: 3,
      name: 'Home & Garden',
      description: 'Everything you need to make your house a home, inside and out.',
      productCount: 156,
      image: 'A beautifully arranged living room with garden plants',
      color: 'from-green-500 to-emerald-600',
      slug: 'home-garden'
    },
    {
      id: 4,
      name: 'Sports & Fitness',
      description: 'Gear up for your favorite activities with our sports and fitness equipment.',
      productCount: 98,
      image: 'Various sports equipment like dumbbells, yoga mats, and balls',
      color: 'from-orange-500 to-red-600',
      slug: 'sports-fitness'
    },
    {
      id: 5,
      name: 'Food & Beverage',
      description: 'Explore gourmet foods, snacks, and beverages from around the world.',
      productCount: 67,
      image: 'A spread of delicious food items and beverages',
      color: 'from-yellow-500 to-orange-600',
      slug: 'food-beverage'
    },
    {
      id: 6,
      name: 'Books & Media',
      description: 'Dive into new worlds with our collection of books, movies, and music.',
      productCount: 134,
      image: 'A stack of books with headphones and a tablet',
      color: 'from-indigo-500 to-purple-600',
      slug: 'books-media'
    },
  ];

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center"
        >
          <h1 className="text-4xl font-bold mb-4">Explore Our Categories</h1>
          <p className="text-xl text-gray-600">Find exactly what you're looking for.</p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8 max-w-2xl mx-auto"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-4 py-3 text-lg rounded-full shadow-md"
            />
          </div>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
              whileHover={{ y: -5 }}
              className="h-full"
            >
              <Card className="card-hover overflow-hidden h-full flex flex-col group">
                <div className={`relative h-48 bg-gradient-to-br ${category.color} flex items-center justify-center`}>
                  <img  className="w-full h-full object-cover opacity-50 group-hover:opacity-75 transition-opacity duration-300" alt={category.image} src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
                  <Tag className="absolute w-16 h-16 text-white opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <CardContent className="p-6 flex flex-col flex-grow">
                  <h3 className="text-2xl font-semibold mb-2">{category.name}</h3>
                  <p className="text-gray-600 mb-4 text-sm line-clamp-3 flex-grow">{category.description}</p>
                  <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                    <span>{category.productCount} products</span>
                  </div>
                  <Link to={`/products?category=${category.slug}`} className="mt-auto">
                    <Button className="w-full group-hover:bg-purple-700 transition-colors duration-300">
                      Shop {category.name}
                      <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredCategories.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Tag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <p className="text-2xl text-gray-500">No categories found matching your search.</p>
            <p className="text-gray-400 mt-2">Try a different keyword or explore all categories.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CustomerCategoriesPage;