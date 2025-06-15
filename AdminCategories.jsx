import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Edit, Trash2, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';

const AdminCategories = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    {
      id: 1,
      name: 'Electronics',
      description: 'Electronic devices and gadgets',
      productCount: 245,
      status: 'Active',
      color: 'from-blue-500 to-purple-600',
      createdDate: '2025-06-01'
    },
    {
      id: 2,
      name: 'Fashion',
      description: 'Clothing, accessories, and fashion items',
      productCount: 189,
      status: 'Active',
      color: 'from-pink-500 to-rose-600',
      createdDate: '2025-06-02'
    },
    {
      id: 3,
      name: 'Home & Garden',
      description: 'Home improvement and garden supplies',
      productCount: 156,
      status: 'Active',
      color: 'from-green-500 to-emerald-600',
      createdDate: '2025-06-03'
    },
    {
      id: 4,
      name: 'Sports & Fitness',
      description: 'Sports equipment and fitness gear',
      productCount: 98,
      status: 'Active',
      color: 'from-orange-500 to-red-600',
      createdDate: '2025-06-04'
    },
    {
      id: 5,
      name: 'Food & Beverage',
      description: 'Food items and beverages',
      productCount: 67,
      status: 'Active',
      color: 'from-yellow-500 to-orange-600',
      createdDate: '2025-06-05'
    },
    {
      id: 6,
      name: 'Books & Media',
      description: 'Books, movies, music, and digital media',
      productCount: 134,
      status: 'Active',
      color: 'from-indigo-500 to-purple-600',
      createdDate: '2025-06-06'
    },
    {
      id: 7,
      name: 'Health & Beauty',
      description: 'Health products and beauty items',
      productCount: 89,
      status: 'Active',
      color: 'from-teal-500 to-cyan-600',
      createdDate: '2025-06-07'
    },
    {
      id: 8,
      name: 'Automotive',
      description: 'Car parts and automotive accessories',
      productCount: 45,
      status: 'Draft',
      color: 'from-gray-500 to-slate-600',
      createdDate: '2025-06-08'
    }
  ];

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'Inactive':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleEdit = (categoryId) => {
    toast({
      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  const handleDelete = (categoryId) => {
    toast({
      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  const handleAddCategory = () => {
    toast({
      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold">Category Management</h1>
          <p className="text-gray-600">Organize and manage product categories</p>
        </div>
        <Button onClick={handleAddCategory}>
          <Plus className="w-4 h-4 mr-2" />
          Add Category
        </Button>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex items-center space-x-4"
      >
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </motion.div>

      {/* Categories Grid */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {filteredCategories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <Card className="card-hover h-full">
              <div className={`h-32 bg-gradient-to-r ${category.color} rounded-t-lg flex items-center justify-center relative`}>
                <Tag className="w-12 h-12 text-white" />
                <Badge className={`absolute top-2 right-2 ${getStatusColor(category.status)}`}>
                  {category.status}
                </Badge>
              </div>
              
              <CardContent className="p-4 flex flex-col h-[calc(100%-8rem)]">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{category.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Products:</span>
                      <span className="font-medium">{category.productCount}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Created:</span>
                      <span className="font-medium">{category.createdDate}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t mt-4">
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(category.id)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(category.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toast({
                      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
                    })}
                  >
                    View Products
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {filteredCategories.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Tag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-xl text-gray-500">No categories found matching your search.</p>
        </motion.div>
      )}

      {/* Summary Stats */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">{categories.length}</p>
            <p className="text-sm text-gray-600">Total Categories</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">
              {categories.filter(c => c.status === 'Active').length}
            </p>
            <p className="text-sm text-gray-600">Active Categories</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-yellow-600">
              {categories.filter(c => c.status === 'Draft').length}
            </p>
            <p className="text-sm text-gray-600">Draft Categories</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-purple-600">
              {categories.reduce((sum, c) => sum + c.productCount, 0)}
            </p>
            <p className="text-sm text-gray-600">Total Products</p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AdminCategories;