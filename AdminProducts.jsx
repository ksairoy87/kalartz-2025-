import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Edit, Trash2, Eye, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';
import { useLocation } from 'react-router-dom';

const AdminProducts = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState(queryParams.get('status') === 'pending' ? 'Pending Review' : 'all');


  const products = [
    {
      id: 1,
      name: 'Premium Wireless Headphones',
      vendor: 'TechGear Pro',
      category: 'Electronics',
      price: 299.99,
      stock: 15,
      status: 'Active',
      sales: 45,
      rating: 4.8,
      image: 'Premium wireless headphones product'
    },
    {
      id: 2,
      name: 'Bluetooth Speaker',
      vendor: 'SoundWave',
      category: 'Electronics',
      price: 79.99,
      stock: 8,
      status: 'Pending Review',
      sales: 32,
      rating: 4.5,
      image: 'Bluetooth speaker product'
    },
    {
      id: 3,
      name: 'Smart Fitness Watch',
      vendor: 'FitTech',
      category: 'Wearables',
      price: 199.99,
      stock: 0,
      status: 'Out of Stock',
      sales: 28,
      rating: 4.6,
      image: 'Smart fitness watch product'
    },
    {
      id: 4,
      name: 'Designer Backpack',
      vendor: 'Fashion Hub',
      category: 'Fashion',
      price: 89.99,
      stock: 25,
      status: 'Active',
      sales: 18,
      rating: 4.7,
      image: 'Designer backpack product'
    },
    {
      id: 5,
      name: 'Organic Coffee Beans',
      vendor: 'Bean Masters',
      category: 'Food & Beverage',
      price: 24.99,
      stock: 50,
      status: 'Rejected',
      sales: 0,
      rating: 0,
      image: 'Organic coffee beans product'
    },
    {
      id: 6,
      name: 'Wireless Charger',
      vendor: 'TechGear Pro',
      category: 'Electronics',
      price: 49.99,
      stock: 30,
      status: 'Active',
      sales: 22,
      rating: 4.4,
      image: 'Wireless charger product'
    }
  ];

  const categories = ['all', 'Electronics', 'Fashion', 'Food & Beverage', 'Wearables', 'Sports'];
  const statuses = ['all', 'Active', 'Pending Review', 'Out of Stock', 'Rejected'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.vendor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || product.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Pending Review':
        return 'bg-yellow-100 text-yellow-800';
      case 'Out of Stock':
        return 'bg-red-100 text-red-800';
      case 'Rejected':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleApprove = (productId) => {
    toast({
      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  const handleReject = (productId) => {
    toast({
      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  const handleEdit = (productId) => {
    toast({
      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  const handleDelete = (productId) => {
    toast({
      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  const handleView = (productId) => {
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
          <h1 className="text-3xl font-bold">Product Management</h1>
          <p className="text-gray-600">Review and manage all platform products</p>
        </div>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex flex-col lg:flex-row gap-4"
      >
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2 flex-wrap">
          {categories.map((category) => (
            <Button
              key={category}
              variant={categoryFilter === category ? "default" : "outline"}
              size="sm"
              onClick={() => setCategoryFilter(category)}
              className="capitalize"
            >
              {category}
            </Button>
          ))}
        </div>
        
        <div className="flex gap-2 flex-wrap">
          {statuses.map((status) => (
            <Button
              key={status}
              variant={statusFilter === status ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter(status)}
              className="capitalize"
            >
              {status === 'all' ? 'All Status' : status}
            </Button>
          ))}
        </div>
      </motion.div>

      {/* Products Grid */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Card className="card-hover">
              <div className="relative">
                <img  className="w-full h-48 object-cover rounded-t-lg" alt={`${product.image} product image`} src="https://images.unsplash.com/photo-1635865165118-917ed9e20936" />
                <Badge className={`absolute top-2 right-2 ${getStatusColor(product.status)}`}>
                  {product.status}
                </Badge>
              </div>
              
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold text-lg truncate">{product.name}</h3>
                    <p className="text-sm text-gray-600">by {product.vendor}</p>
                    <p className="text-xs text-gray-500">{product.category}</p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-purple-600">${product.price}</span>
                    <span className="text-sm text-gray-600">Stock: {product.stock}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">{product.sales} sales</span>
                    {product.rating > 0 && (
                      <span className="text-yellow-600">★ {product.rating}</span>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between pt-2 border-t">
                    <div className="flex space-x-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleView(product.id)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(product.id)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(product.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    {product.status === 'Pending Review' && (
                      <div className="flex space-x-1">
                        <Button
                          size="sm"
                          onClick={() => handleApprove(product.id)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Approve
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleReject(product.id)}
                          className="text-red-600 border-red-600 hover:bg-red-50"
                        >
                          <XCircle className="w-4 h-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {filteredProducts.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-xl text-gray-500">No products found matching your criteria.</p>
        </motion.div>
      )}

      {/* Summary Stats */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-5 gap-4"
      >
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">{products.length}</p>
            <p className="text-sm text-gray-600">Total Products</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">
              {products.filter(p => p.status === 'Active').length}
            </p>
            <p className="text-sm text-gray-600">Active</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-yellow-600">
              {products.filter(p => p.status === 'Pending Review').length}
            </p>
            <p className="text-sm text-gray-600">Pending Review</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-red-600">
              {products.filter(p => p.status === 'Out of Stock').length}
            </p>
            <p className="text-sm text-gray-600">Out of Stock</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-gray-600">
              {products.filter(p => p.status === 'Rejected').length}
            </p>
            <p className="text-sm text-gray-600">Rejected</p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AdminProducts;