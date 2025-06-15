
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, DollarSign, Package, Users, Calendar, BarChart2, PieChart, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const VendorAnalytics = () => {
  const analyticsData = {
    revenue: { current: 12450, previous: 11200, change: 11.2 },
    orders: { current: 156, previous: 142, change: 9.9 },
    productsViews: { current: 2405, previous: 2100, change: 14.5 },
    conversionRate: { current: 6.48, previous: 5.9, change: 9.8 } // As percentage
  };

  const topProducts = [
    { name: 'NovaSound Pro Headphones', revenue: 13455, sales: 45, views: 300, image: 'Sleek black wireless headphones' },
    { name: 'ChronoFit Smartwatch X1', revenue: 5597, sales: 28, views: 250, image: 'Modern smartwatch displaying health data' },
    { name: 'AuraGlow Desk Lamp', revenue: 2559, sales: 43, views: 180, image: 'Minimalist LED desk lamp' },
  ];

  const salesByChannel = [
    { channel: 'Direct Traffic', sales: 68, revenue: 5400 },
    { channel: 'Organic Search', sales: 45, revenue: 3800 },
    { channel: 'Social Media', sales: 32, revenue: 2300 },
    { channel: 'Referrals', sales: 11, revenue: 950 },
  ];

  const formatCurrency = (amount) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  const getChangeColor = (change) => change >= 0 ? 'text-green-600' : 'text-red-600';
  const getChangeIcon = (change) => change >= 0 ? '↗' : '↘';

  const chartPlaceholder = (title, icon) => (
    <div className="h-64 flex flex-col items-center justify-center bg-gray-100 rounded-lg p-4 text-center">
      {React.createElement(icon, { className: "w-12 h-12 text-gray-300 mb-3" })}
      <p className="text-sm text-gray-500 mb-1">{title}</p>
      <p className="text-xs text-gray-400">Detailed chart visualization will appear here.</p>
      <Button variant="link" size="sm" className="mt-2" onClick={() => toast({ title: "🚧 Chart details not implemented."})}>View Details</Button>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold">Store Analytics</h1>
          <p className="text-gray-600">Deep dive into your store's performance.</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => toast({ title: "🚧 Feature not implemented" })}>
            <Calendar className="w-4 h-4 mr-2" /> Last 30 Days
          </Button>
          <Button onClick={() => toast({ title: "🚧 Feature not implemented" })}>Export Detailed Report</Button>
        </div>
      </motion.div>

      {/* Key Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {[
          { title: 'Total Revenue', value: formatCurrency(analyticsData.revenue.current), change: analyticsData.revenue.change, prev: formatCurrency(analyticsData.revenue.previous), icon: DollarSign, color: 'text-green-600' },
          { title: 'Total Orders', value: analyticsData.orders.current, change: analyticsData.orders.change, prev: analyticsData.orders.previous, icon: Package, color: 'text-blue-600' },
          { title: 'Product Views', value: analyticsData.productsViews.current.toLocaleString(), change: analyticsData.productsViews.change, prev: analyticsData.productsViews.previous.toLocaleString(), icon: Eye, color: 'text-purple-600' },
          { title: 'Conversion Rate', value: `${analyticsData.conversionRate.current}%`, change: analyticsData.conversionRate.change, prev: `${analyticsData.conversionRate.previous}%`, icon: TrendingUp, color: 'text-orange-600' },
        ].map(stat => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="card-hover">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <Icon className={`w-7 h-7 ${stat.color}`} />
                  <span className={`text-sm font-semibold ${getChangeColor(stat.change)} flex items-center`}>
                    {getChangeIcon(stat.change)} {Math.abs(stat.change)}%
                  </span>
                </div>
                <div>
                  <p className="text-2xl font-bold mb-1">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">vs {stat.prev} prev. period</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </motion.div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
          <Card>
            <CardHeader><CardTitle>Revenue Over Time</CardTitle></CardHeader>
            <CardContent>{chartPlaceholder("Monthly Revenue Trend", BarChart2)}</CardContent>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
          <Card>
            <CardHeader><CardTitle>Orders by Status</CardTitle></CardHeader>
            <CardContent>{chartPlaceholder("Order Status Distribution", PieChart)}</CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Top Products & Sales by Channel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="lg:col-span-2">
          <Card>
            <CardHeader><CardTitle>Top Performing Products</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center p-3 border rounded-lg hover:shadow-sm transition-shadow">
                  <img  className="w-12 h-12 rounded-md object-cover mr-4" alt={product.image} src="https://images.unsplash.com/photo-1635865165118-917ed9e20936" />
                  <div className="flex-grow">
                    <p className="font-medium truncate">{product.name}</p>
                    <p className="text-xs text-gray-500">{product.views.toLocaleString()} views</p>
                  </div>
                  <div className="text-right ml-4">
                    <p className="font-semibold text-green-600">{formatCurrency(product.revenue)}</p>
                    <p className="text-xs text-gray-500">{product.sales} sales</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }} className="lg:col-span-1">
          <Card>
            <CardHeader><CardTitle>Sales by Channel</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {salesByChannel.map((channel, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium text-sm">{channel.channel}</span>
                    <span className="font-semibold text-green-600 text-sm">{formatCurrency(channel.revenue)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: `${(channel.revenue / salesByChannel.reduce((sum, c) => sum + c.revenue, 0)) * 100}%` }}></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{channel.sales} sales</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default VendorAnalytics;
