import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PlusCircle, Tag, DollarSign, Image as ImageIcon, FileText, Box, Save, X, CheckSquare, PackagePlus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { Link, useNavigate } from 'react-router-dom';

// Mock categories
const categories = [
  { id: 'electronics', name: 'Electronics' },
  { id: 'fashion', name: 'Fashion' },
  { id: 'home-garden', name: 'Home & Garden' },
  { id: 'sports', name: 'Sports & Fitness' },
  { id: 'books', name: 'Books & Media' },
];

const AddProductPage = () => {
  const navigate = useNavigate();
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stockQuantity: '',
    sku: '',
    images: [], // Store file objects or URLs
    tags: '', // Comma-separated
  });
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + productData.images.length > 5) {
      toast({ title: "Image Limit Exceeded", description: "You can upload a maximum of 5 images.", variant: "destructive"});
      return;
    }
    setProductData(prev => ({ ...prev, images: [...prev.images, ...files] }));

    const newPreviews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(prev => [...prev, ...newPreviews]);
  };

  const removeImage = (index) => {
    setProductData(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!productData.name || !productData.price || !productData.category || !productData.stockQuantity) {
        toast({ title: "Missing Required Fields", description: "Please fill Name, Price, Category, and Stock.", variant: "destructive"});
        return;
    }
    // Mock product addition
    const newProduct = {
      id: `prod_${Date.now()}`, // Simple unique ID
      ...productData,
      price: parseFloat(productData.price),
      stockQuantity: parseInt(productData.stockQuantity),
      tags: productData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      // In a real app, images would be uploaded and URLs stored
      imageUrls: imagePreviews, // Using previews for mock
    };

    // Retrieve existing products from localStorage or initialize if not present
    const existingProducts = JSON.parse(localStorage.getItem('vendor-products') || '[]');
    localStorage.setItem('vendor-products', JSON.stringify([...existingProducts, newProduct]));
    
    toast({
      title: "Product Added!",
      description: `${productData.name} has been successfully added.`,
    });
    // Reset form or navigate away
    setProductData({ name: '', description: '', price: '', category: '', stockQuantity: '', sku: '', images: [], tags: '' });
    setImagePreviews([]);
    navigate('/vendor/products'); 
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-lime-50 to-emerald-50 py-8">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center">
            <PackagePlus className="w-10 h-10 text-green-600 mr-3" />
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-lime-500 to-emerald-600">
              Add New Product
            </h1>
          </div>
          <Link to="/vendor/products">
            <Button variant="outline"><X className="w-4 h-4 mr-2"/> Cancel</Button>
          </Link>
        </motion.div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Main Details */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-2 space-y-6"
            >
              <Card className="shadow-xl card-hover">
                <CardHeader>
                  <CardTitle className="text-2xl text-green-700 flex items-center">
                    <FileText className="w-6 h-6 mr-2" /> Product Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
                    <Input name="name" value={productData.name} onChange={handleChange} placeholder="e.g., Premium Wireless Headphones" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea 
                      name="description" 
                      value={productData.description} 
                      onChange={handleChange} 
                      rows={5}
                      placeholder="Detailed description of your product..."
                      className="w-full p-2 border border-input rounded-md focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-xl card-hover">
                <CardHeader>
                  <CardTitle className="text-2xl text-green-700 flex items-center">
                    <ImageIcon className="w-6 h-6 mr-2" /> Product Images (Max 5)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Input type="file" multiple accept="image/*" onChange={handleImageChange} className="mb-4"/>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                    {imagePreviews.map((previewUrl, index) => (
                      <div key={index} className="relative aspect-square border rounded-md overflow-hidden group">
                        <img  src={previewUrl} alt={`Preview ${index + 1}`} className="w-full h-full object-cover"/>
                        <Button 
                          type="button"
                          variant="destructive" 
                          size="icon" 
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="w-3 h-3"/>
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Right Column: Pricing, Category, Stock */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-1 space-y-6"
            >
              <Card className="shadow-xl card-hover">
                <CardHeader>
                  <CardTitle className="text-2xl text-green-700 flex items-center">
                    <DollarSign className="w-6 h-6 mr-2" /> Pricing & Category
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price (USD) *</label>
                    <Input type="number" name="price" value={productData.price} onChange={handleChange} placeholder="e.g., 49.99" step="0.01" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                    <select 
                      name="category" 
                      value={productData.category} 
                      onChange={handleChange} 
                      required
                      className="w-full p-2 border border-input rounded-md focus:ring-2 focus:ring-green-500"
                    >
                      <option value="">Select Category</option>
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                   <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma-separated)</label>
                    <Input name="tags" value={productData.tags} onChange={handleChange} placeholder="e.g., wireless, audio, noise-cancelling" />
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-xl card-hover">
                <CardHeader>
                  <CardTitle className="text-2xl text-green-700 flex items-center">
                    <Box className="w-6 h-6 mr-2" /> Inventory
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity *</label>
                    <Input type="number" name="stockQuantity" value={productData.stockQuantity} onChange={handleChange} placeholder="e.g., 100" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">SKU (Stock Keeping Unit)</label>
                    <Input name="sku" value={productData.sku} onChange={handleChange} placeholder="e.g., WRL-HP-BLK-001" />
                  </div>
                </CardContent>
              </Card>
              
              <Button type="submit" size="lg" className="w-full bg-green-600 hover:bg-green-700 text-lg">
                <Save className="w-5 h-5 mr-2" /> Add Product
              </Button>
            </motion.div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductPage;