
import React from 'react';
import { motion } from 'framer-motion';
import { Download, Calendar, Filter, BarChart2, PieChart, Users, DollarSign, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';

const AdminReports = () => {
  const reportSections = [
    {
      title: "Sales Reports",
      icon: DollarSign,
      description: "Track revenue, sales trends, and payment summaries.",
      reports: [
        { name: "Monthly Revenue", period: "Last 30 Days" },
        { name: "Sales by Category", period: "Last Quarter" },
        { name: "Payment Gateway Summary", period: "Year-to-Date" },
      ]
    },
    {
      title: "User Reports",
      icon: Users,
      description: "Analyze user activity, registrations, and vendor performance.",
      reports: [
        { name: "New User Registrations", period: "Last 7 Days" },
        { name: "Top Performing Vendors", period: "Last 30 Days" },
        { name: "Customer Demographics", period: "All Time" },
      ]
    },
    {
      title: "Product Reports",
      icon: ShoppingBag,
      description: "Monitor product performance, inventory, and category insights.",
      reports: [
        { name: "Best Selling Products", period: "Last 30 Days" },
        { name: "Inventory Levels", period: "Current" },
        { name: "Products by Category", period: "All Time" },
      ]
    }
  ];

  const handleDownloadReport = (reportName) => {
    toast({
      title: "Download Started",
      description: `Downloading "${reportName}" report. (This is a mock action)`,
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold">Platform Reports</h1>
          <p className="text-gray-600">Generate and view detailed reports on platform activity.</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => toast({ title: "🚧 Feature not implemented" })}>
            <Calendar className="w-4 h-4 mr-2" />
            Select Date Range
          </Button>
          <Button variant="outline" onClick={() => toast({ title: "🚧 Feature not implemented" })}>
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>
      </motion.div>

      {/* Report Sections */}
      {reportSections.map((section, sectionIndex) => {
        const SectionIcon = section.icon;
        return (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: sectionIndex * 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <SectionIcon className="w-6 h-6 mr-3 text-red-600" />
                  {section.title}
                </CardTitle>
                <p className="text-gray-500">{section.description}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {section.reports.map((report, reportIndex) => (
                  <motion.div
                    key={report.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: (sectionIndex * 0.2) + (reportIndex * 0.1) }}
                    className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div>
                      <p className="font-semibold text-lg">{report.name}</p>
                      <p className="text-sm text-gray-500">Period: {report.period}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toast({ title: `Viewing ${report.name}`, description: "Chart placeholder." })}
                      >
                        {reportIndex % 2 === 0 ? <BarChart2 className="w-5 h-5 text-gray-600" /> : <PieChart className="w-5 h-5 text-gray-600" />}
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleDownloadReport(report.name)}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        );
      })}

      {/* Custom Report Placeholder */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: reportSections.length * 0.2 }}
      >
        <Card className="border-dashed border-2 border-gray-300">
          <CardContent className="p-8 text-center">
            <BarChart2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Create Custom Report</h3>
            <p className="text-gray-500 mb-4">Need specific data? Build your own report.</p>
            <Button onClick={() => toast({ title: "🚧 Feature not implemented" })}>
              Build Custom Report
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AdminReports;
