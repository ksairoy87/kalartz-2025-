
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Store, Info, Truck, CreditCard, Palette, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';

const VendorSettings = () => {
  const [settings, setSettings] = useState({
    storeName: 'My Awesome Store',
    storeDescription: 'Selling the best products online!',
    contactEmail: 'vendor@example.com',
    phoneNumber: '555-123-4567',
    address: '123 Vendor Lane, Commerce City, CS 12345',
    shippingPolicy: 'Standard shipping: 3-5 business days. Express: 1-2 days.',
    returnPolicy: '30-day free returns on all eligible items.',
    paymentMethods: ['Stripe', 'PayPal'], // Example
    themeColor: '#6D28D9', // Purple
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSaveSettings = (section) => {
    toast({
      title: "Settings Saved",
      description: `${section} settings have been updated. (This is a mock action)`,
    });
  };

  const settingsSections = [
    {
      id: 'storeInfo',
      title: 'Store Information',
      icon: Store,
      fields: [
        { name: 'storeName', label: 'Store Name', type: 'text' },
        { name: 'storeDescription', label: 'Store Description', type: 'textarea' },
      ]
    },
    {
      id: 'contactDetails',
      title: 'Contact Details',
      icon: Info,
      fields: [
        { name: 'contactEmail', label: 'Contact Email', type: 'email' },
        { name: 'phoneNumber', label: 'Phone Number', type: 'tel' },
        { name: 'address', label: 'Store Address', type: 'text' },
      ]
    },
    {
      id: 'policies',
      title: 'Shipping & Return Policies',
      icon: Truck,
      fields: [
        { name: 'shippingPolicy', label: 'Shipping Policy', type: 'textarea' },
        { name: 'returnPolicy', label: 'Return Policy', type: 'textarea' },
      ]
    },
    {
      id: 'payment',
      title: 'Payment Setup',
      icon: CreditCard,
      description: "Configure your payment receiving methods.",
      fields: [] // Placeholder for actual payment integration fields (e.g., Stripe API keys)
    },
    {
      id: 'branding',
      title: 'Store Branding',
      icon: Palette,
      fields: [
        { name: 'themeColor', label: 'Theme Color (Hex)', type: 'text', placeholder: '#FFFFFF' },
        // Add fields for logo upload, banner image upload etc.
      ]
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold">Store Settings</h1>
        <p className="text-gray-600">Manage your store's details and configurations.</p>
      </motion.div>

      {/* Settings Sections */}
      {settingsSections.map((section, sectionIndex) => {
        const SectionIcon = section.icon;
        return (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: sectionIndex * 0.15 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <SectionIcon className="w-6 h-6 mr-3 text-purple-600" />
                  {section.title}
                </CardTitle>
                {section.description && <CardDescription>{section.description}</CardDescription>}
              </CardHeader>
              <CardContent className="space-y-4">
                {section.fields.length > 0 ? (
                    section.fields.map(field => (
                    <div key={field.name} className="space-y-1">
                        <label htmlFor={field.name} className="text-sm font-medium">
                        {field.label}
                        </label>
                        {field.type === 'textarea' ? (
                        <textarea
                            id={field.name}
                            name={field.name}
                            value={settings[field.name]}
                            onChange={handleInputChange}
                            rows={3}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            placeholder={field.placeholder}
                        />
                        ) : (
                        <Input
                            id={field.name}
                            name={field.name}
                            type={field.type}
                            value={settings[field.name]}
                            onChange={handleInputChange}
                            placeholder={field.placeholder}
                        />
                        )}
                    </div>
                    ))
                ) : (
                  <p className="text-gray-500 text-sm">
                    Further configuration options for {section.title.toLowerCase()} will be available here.
                  </p>
                )}
                <div className="flex justify-end pt-4">
                  <Button onClick={() => handleSaveSettings(section.title)}>
                    <Save className="w-4 h-4 mr-2" />
                    Save {section.title.replace(' Settings', '').replace(' Details','').replace(' Setup','')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
};

export default VendorSettings;
