import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Plus, Edit, Trash2, Home, Briefcase, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';

const AddressForm = ({ address, onSave, onCancel }) => {
  const [formData, setFormData] = useState(
    address || { id: null, type: 'Home', name: '', street: '', city: '', state: '', zip: '', country: '', isDefault: false }
  );

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.street || !formData.city || !formData.state || !formData.zip || !formData.country) {
        toast({ title: "Missing Fields", description: "Please fill all required fields.", variant: "destructive"});
        return;
    }
    onSave(formData);
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="space-y-4 p-6 bg-gray-50 rounded-lg shadow"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input name="name" placeholder="Full Name (e.g., John Doe)" value={formData.name} onChange={handleChange} required />
        <Input name="street" placeholder="Street Address" value={formData.street} onChange={handleChange} required />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
        <Input name="state" placeholder="State / Province" value={formData.state} onChange={handleChange} required />
        <Input name="zip" placeholder="ZIP / Postal Code" value={formData.zip} onChange={handleChange} required />
      </div>
      <Input name="country" placeholder="Country" value={formData.country} onChange={handleChange} required />
      <div className="flex items-center space-x-4">
        <label className="flex items-center">
          <input type="radio" name="type" value="Home" checked={formData.type === 'Home'} onChange={handleChange} className="mr-2 accent-purple-600" /> Home
        </label>
        <label className="flex items-center">
          <input type="radio" name="type" value="Work" checked={formData.type === 'Work'} onChange={handleChange} className="mr-2 accent-purple-600" /> Work
        </label>
      </div>
      <label className="flex items-center">
        <input type="checkbox" name="isDefault" checked={formData.isDefault} onChange={handleChange} className="mr-2 accent-purple-600" /> Set as default address
      </label>
      <div className="flex justify-end space-x-3 pt-2">
        <Button type="button" variant="outline" onClick={onCancel}><X className="w-4 h-4 mr-1" /> Cancel</Button>
        <Button type="submit"><Save className="w-4 h-4 mr-1" /> Save Address</Button>
      </div>
    </motion.form>
  );
};

const CustomerAddressesPage = () => {
  const [addresses, setAddresses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  useEffect(() => {
    const storedAddresses = localStorage.getItem('kalartz-addresses');
    if (storedAddresses) {
      setAddresses(JSON.parse(storedAddresses));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('kalartz-addresses', JSON.stringify(addresses));
  }, [addresses]);

  const handleSaveAddress = (addressData) => {
    setAddresses(prev => {
      let updatedAddresses;
      if (addressData.id) { // Editing existing
        updatedAddresses = prev.map(addr => addr.id === addressData.id ? addressData : addr);
      } else { // Adding new
        updatedAddresses = [...prev, { ...addressData, id: Date.now().toString() }];
      }

      if (addressData.isDefault) { // Ensure only one default
        updatedAddresses = updatedAddresses.map(addr => ({ ...addr, isDefault: addr.id === addressData.id }));
      }
      toast({ title: "Address Saved!", description: `Address for ${addressData.name} has been saved.` });
      return updatedAddresses;
    });
    setShowForm(false);
    setEditingAddress(null);
  };

  const handleDeleteAddress = (addressId) => {
    setAddresses(prev => prev.filter(addr => addr.id !== addressId));
    toast({ title: "Address Deleted", variant: "destructive" });
  };

  const handleSetDefault = (addressId) => {
    setAddresses(prev => prev.map(addr => ({ ...addr, isDefault: addr.id === addressId })));
    toast({ title: "Default Address Set" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center">
            <MapPin className="w-10 h-10 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600">
              Manage Addresses
            </h1>
          </div>
          <Button onClick={() => { setEditingAddress(null); setShowForm(true); }}>
            <Plus className="w-4 h-4 mr-2" /> Add New Address
          </Button>
        </motion.div>

        {showForm && (
          <AddressForm
            address={editingAddress}
            onSave={handleSaveAddress}
            onCancel={() => { setShowForm(false); setEditingAddress(null); }}
          />
        )}

        {addresses.length === 0 && !showForm ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <MapPin className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">No Addresses Found</h2>
            <p className="text-gray-500 mb-6">Add your shipping addresses for faster checkout.</p>
            <Button onClick={() => { setEditingAddress(null); setShowForm(true); }} size="lg">
              Add Your First Address
            </Button>
          </motion.div>
        ) : (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {addresses.map((addr, index) => (
              <motion.div
                key={addr.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className={`card-hover shadow-lg ${addr.isDefault ? 'border-2 border-purple-500 bg-purple-50' : 'border-transparent'}`}>
                  <CardHeader className="flex flex-row items-center justify-between pb-3">
                    <CardTitle className="text-xl font-semibold text-purple-700 flex items-center">
                      {addr.type === 'Home' ? <Home className="w-5 h-5 mr-2" /> : <Briefcase className="w-5 h-5 mr-2" />}
                      {addr.name}
                    </CardTitle>
                    {addr.isDefault && (
                      <span className="px-2 py-0.5 bg-purple-500 text-white text-xs rounded-full">Default</span>
                    )}
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{addr.street}</p>
                    <p className="text-gray-600">{addr.city}, {addr.state} {addr.zip}</p>
                    <p className="text-gray-600">{addr.country}</p>
                    <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="icon" onClick={() => { setEditingAddress(addr); setShowForm(true); }}>
                          <Edit className="w-4 h-4 text-blue-600" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteAddress(addr.id)}>
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </Button>
                      </div>
                      {!addr.isDefault && (
                        <Button variant="outline" size="sm" onClick={() => handleSetDefault(addr.id)}>
                          Set as Default
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerAddressesPage;