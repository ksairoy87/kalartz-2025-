
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Edit, Trash2, Eye, Filter, Package, DollarSign, BarChart, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';
import { Link } from 'react-router-dom';

const VendorProducts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const products = [
    { id: 1, name: 'Premium Wireless Headphones X2000', price: 299.99, stock: 12, status: 'Active', category: 'Electronics', sales: 45, image: 'Sleek black wireless headphones' },
    { id: 2, name: 'Portable Bluetooth Speaker X-Bass', price: 79.99, stock: 8, status: 'Active', category: 'Electronics', sales: 32, image: 'Compact bluetooth speaker' },
    { id: 3, name: 'Smart Fitness Watch Series 5', price: 199.99, stock: 5, status: 'Low Stock', category: 'Wearables', sales: 28, image: 'Modern fitness smartwatch' },
    { id: 4, name: 'Ergonomic Wireless Charger Pad', price: 49.99, stock: 25, status: 'Active', category: 'Electronics', sales: 18, image: 'Slim wireless charger pad' },
    { id: 5, name: 'Pro Gaming Mouse RGB', price: 89.99, stock: 0, status: 'Out of Stock', category: 'Electronics', sales: 15, image: 'Gaming mouse with RGB lighting' },
    { id: 6, name: 'Organic Green Tea Blend', price: 19.99, stock: 50, status: 'Active', category: 'Food & Beverage', sales: 60, image: 'Elegant tin of organic green tea' },
    { id: 7, name: 'Minimalist Leather Wallet', price: 59.99, stock: 3, status: 'Low Stock', category: 'Fashion', sales: 22, image: 'Slim leather wallet in brown' },
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || product.status.toLowerCase().replace(' ', '') === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800 border-green-300';
      case 'Low Stock': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Out of Stock': return 'bg-red-100 text-red-800 border-red-300';
      case 'Draft': return 'bg-gray-100 text-gray-800 border-gray-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };
  
  const filterOptions = ['all', 'active', 'lowstock', 'outofstock', 'draft'];

  const handleEdit = (productId) => toast({ title: `🚧 Edit product ${productId} not implemented` });
  const handleDelete = (productId) => toast({ title: `🚧 Delete product ${productId} not implemented` });
  const handleView = (productId) => toast({ title: `🚧 View product ${productId} not implemented` });

  const summaryStats = [
    { title: "Total Products", value: products.length, icon: Package, color: "text-blue-500" },
    { title: "Total Sales Value", value: `$${products.reduce((sum, p) => sum + p.sales * p.price, 0).toFixed(2)}`, icon: DollarSign, color: "text-green-500" },
    { title: "Items Sold", value: products.reduce((sum, p) => sum + p.sales, 0), icon: BarChart, color: "text-purple-500" },
    { title: "Low Stock Items", value: products.filter(p => p.status === 'Low Stock').length, icon: AlertCircle, color: "text-yellow-500" },
  ];


  return (
    <div className="space-y-6 md:space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between"
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">My Products</h1>
          <p className="text-gray-600">Manage your product inventory and listings.</p>
        </div>
        <Link to="/vendor/products/add">
          <Button className="mt-3 sm:mt-0 bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md hover:shadow-lg transition-shadow">
            <Plus className="w-5 h-5 mr-2" />
            Add New Product
          </Button>
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="bg-white p-5 rounded-xl shadow-lg border border-gray-200"
      >
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="flex-1 relative w-full">
            <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search by product name or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-11 pr-4 py-2.5 text-base rounded-lg shadow-inner"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {filterOptions.map(status => (
              <Button
                key={status}
                variant={filterStatus === status ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterStatus(status)}
                className="capitalize transition-all duration-200 hover:shadow-md"
              >
                {status.replace('outofstock', 'Out of Stock').replace('lowstock', 'Low Stock')}
              </Button>
            ))}
          </div>
        </div>
      </motion.div>
      
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {summaryStats.map(stat => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="border-l-4 border-purple-500 shadow-md">
              <CardContent className="p-5 flex items-center space-x-4">
                <div className={`p-2.5 rounded-full bg-opacity-20 ${stat.color.replace('text-', 'bg-')}`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-xl font-semibold text-gray-800">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.title}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </motion.div>


      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
      >
        {filteredProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="h-full"
          >
            <Card className="card-hover overflow-hidden h-full flex flex-col rounded-xl shadow-lg border border-gray-200 transition-all duration-300 hover:border-purple-400">
              <div className="relative">
                <img  className="w-full h-48 object-cover" alt={`${product.image}`} src={`https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=400&h=400&fit=crop&product_name=${encodeURIComponent(product.image)}`} />
                <Badge variant="outline" className={`absolute top-3 right-3 text-xs font-semibold py-1 px-2.5 border ${getStatusColor(product.status)}`}>
                  {product.status}
                </Badge>
              </div>
              
              <CardContent className="p-5 flex flex-col flex-grow">
                <div className="flex-1 mb-3">
                  <p className="text-xs text-gray-500 mb-0.5">{product.category}</p>
                  <h3 className="font-semibold text-md text-gray-800 mb-1.5 line-clamp-2">{product.name}</h3>
                   <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Sales: {product.sales}</span>
                    <span>Stock: {product.stock}</span>
                  </div>
                </div>
                
                <div className="mt-auto">
                    <p className="text-xl font-bold text-purple-700 mb-3">${product.price.toFixed(2)}</p>
                  <div className="flex items-center justify-between space-x-2">
                    <Button variant="ghost" size="icon" onClick={() => handleView(product.id)} className="hover:bg-blue-100 text-blue-600"> <Eye className="w-4 h-4" /> </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(product.id)} className="hover:bg-yellow-100 text-yellow-600"> <Edit className="w-4 h-4" /> </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(product.id)} className="hover:bg-red-100 text-red-600"> <Trash2 className="w-4 h-4" /> </Button>
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
          className="text-center py-16"
        >
          <Package className="w-20 h-20 text-gray-300 mx-auto mb-6" />
          <p className="text-2xl text-gray-600">No products found.</p>
          <p className="text-gray-500 mt-2">Try adjusting your search or filters, or add a new product!</p>
        </motion.div>
      )}
    </div>
  );
};

export default VendorProducts;
