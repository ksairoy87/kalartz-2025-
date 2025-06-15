
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Shield, Truck, Percent, Globe, Image as ImageIcon, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    platformName: 'Kalartz',
    defaultCurrency: 'USD',
    taxRate: '8.00',
    shippingFlatRate: '5.00',
    seoTitle: 'Kalartz - Premium E-commerce Platform',
    seoDescription: 'Discover amazing products on Kalartz.',
    logoUrl: 'https://storage.googleapis.com/hostinger-horizons-assets-prod/62e67930-f4e8-4ec4-a65d-cbee00a9d575/2d4e61dba6bbe8e092f7a2fff0d23cfd.png',
    faviconUrl: 'https://storage.googleapis.com/hostinger-horizons-assets-prod/62e67930-f4e8-4ec4-a65d-cbee00a9d575/2d4e61dba6bbe8e092f7a2fff0d23cfd.png',
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
      id: 'general',
      title: 'General Settings',
      icon: Settings,
      fields: [
        { name: 'platformName', label: 'Platform Name', type: 'text' },
        { name: 'defaultCurrency', label: 'Default Currency (e.g., USD, EUR)', type: 'text' },
      ]
    },
    {
      id: 'financial',
      title: 'Financial Settings',
      icon: Percent,
      fields: [
        { name: 'taxRate', label: 'Default Tax Rate (%)', type: 'number', step: '0.01' },
        { name: 'shippingFlatRate', label: 'Default Shipping Flat Rate ($)', type: 'number', step: '0.01' },
      ]
    },
    {
      id: 'seo',
      title: 'SEO & Branding',
      icon: Globe,
      fields: [
        { name: 'seoTitle', label: 'Default SEO Title', type: 'text' },
        { name: 'seoDescription', label: 'Default SEO Meta Description', type: 'textarea' },
        { name: 'logoUrl', label: 'Logo URL', type: 'text', placeholder: 'https://example.com/logo.png' },
        { name: 'faviconUrl', label: 'Favicon URL', type: 'text', placeholder: 'https://example.com/favicon.ico' },
      ]
    },
    {
      id: 'security',
      title: 'Security Settings',
      icon: Shield,
      description: "Manage platform security configurations.",
      fields: [] // Add fields like password policy, 2FA settings etc.
    },
    {
      id: 'shipping',
      title: 'Shipping Configuration',
      icon: Truck,
      description: "Set up shipping zones, methods, and integrations.",
      fields: [] // Add fields for shipping zones, integration keys etc.
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold">Platform Settings</h1>
        <p className="text-gray-600">Configure various aspects of the Kalartz platform.</p>
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
                  <SectionIcon className="w-6 h-6 mr-3 text-red-600" />
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
                          step={field.step}
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
                    Save {section.title.replace(' Settings', '')}
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

export default AdminSettings;
