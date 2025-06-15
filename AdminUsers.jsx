import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Edit, Trash2, UserCheck, UserX, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';
import { useLocation } from 'react-router-dom';

const AdminUsers = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState(queryParams.get('role') || 'all');
  const [statusFilter, setStatusFilter] = useState(queryParams.get('status') || 'all');


  const users = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Customer',
      status: 'Active',
      joinDate: '2025-06-11',
      orders: 12,
      totalSpent: 1450.99,
      avatarInitial: 'J'
    },
    {
      id: 2,
      name: 'TechGear Pro',
      email: 'vendor@techgear.com',
      role: 'Vendor',
      status: 'Pending',
      joinDate: '2025-06-10',
      orders: 89,
      totalSpent: 15450.00,
      avatarInitial: 'T'
    },
    {
      id: 3,
      name: 'Sarah Smith',
      email: 'sarah@example.com',
      role: 'Customer',
      status: 'Active',
      joinDate: '2025-06-09',
      orders: 8,
      totalSpent: 890.50,
      avatarInitial: 'S'
    },
    {
      id: 4,
      name: 'Fashion Hub',
      email: 'info@fashionhub.com',
      role: 'Vendor',
      status: 'Active',
      joinDate: '2025-06-08',
      orders: 67,
      totalSpent: 12300.00,
      avatarInitial: 'F'
    },
    {
      id: 5,
      name: 'Mike Johnson',
      email: 'mike@example.com',
      role: 'Customer',
      status: 'Suspended',
      joinDate: '2025-06-07',
      orders: 3,
      totalSpent: 299.99,
      avatarInitial: 'M'
    },
    {
      id: 6,
      name: 'Home Essentials',
      email: 'contact@homeessentials.com',
      role: 'Vendor',
      status: 'Active',
      joinDate: '2025-06-06',
      orders: 54,
      totalSpent: 9800.00,
      avatarInitial: 'H'
    }
  ];

  const roleOptions = ['all', 'Customer', 'Vendor', 'Admin'];
  const statusOptions = ['all', 'Active', 'Pending', 'Suspended'];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Suspended':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'Admin':
        return 'bg-purple-100 text-purple-800';
      case 'Vendor':
        return 'bg-blue-100 text-blue-800';
      case 'Customer':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleApprove = (userId) => {
    toast({
      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  const handleSuspend = (userId) => {
    toast({
      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  const handleEdit = (userId) => {
    toast({
      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  const handleDelete = (userId) => {
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
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="text-gray-600">Manage customers, vendors, and administrators</p>
        </div>
        <Button onClick={() => toast({
          title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
        })}>
          <Plus className="w-4 h-4 mr-2" />
          Add User
        </Button>
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
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2 flex-wrap">
            {roleOptions.map((role) => (
              <Button
                key={role}
                variant={roleFilter === role ? "default" : "outline"}
                size="sm"
                onClick={() => setRoleFilter(role)}
                className="capitalize"
              >
                {role}
              </Button>
            ))}
        </div>
          
        <div className="flex gap-2 flex-wrap">
            {statusOptions.map((status) => (
              <Button
                key={status}
                variant={statusFilter === status ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter(status)}
                className="capitalize"
              >
                {status}
              </Button>
            ))}
        </div>
      </motion.div>

      {/* Users List */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="space-y-4"
      >
        {filteredUsers.map((user, index) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Card className="card-hover">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                  <div className="flex items-center space-x-4 mb-4 md:mb-0">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">{user.avatarInitial}</span>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-lg">{user.name}</h3>
                      <p className="text-gray-600">{user.email}</p>
                      <p className="text-sm text-gray-500">Joined: {user.joinDate}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 md:gap-6">
                    <div className="text-center">
                      <p className="text-xs text-gray-600">Role</p>
                      <Badge className={getRoleColor(user.role)}>
                        {user.role}
                      </Badge>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-xs text-gray-600">Status</p>
                      <Badge className={getStatusColor(user.status)}>
                        {user.status}
                      </Badge>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-xs text-gray-600">Orders</p>
                      <p className="font-semibold">{user.orders}</p>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-xs text-gray-600">
                        {user.role === 'Vendor' ? 'Revenue' : 'Spent'}
                      </p>
                      <p className="font-semibold text-green-600">
                        ${user.totalSpent.toLocaleString()}
                      </p>
                    </div>

                    <div className="flex items-center space-x-2">
                      {user.status === 'Pending' && (
                        <Button
                          size="sm"
                          onClick={() => handleApprove(user.id)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <UserCheck className="w-4 h-4 mr-1" />
                          Approve
                        </Button>
                      )}
                      
                      {user.status === 'Active' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleSuspend(user.id)}
                          className="text-red-600 border-red-600 hover:bg-red-50"
                        >
                          <UserX className="w-4 h-4 mr-1" />
                          Suspend
                        </Button>
                      )}
                      
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleEdit(user.id)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleDelete(user.id)}
                        className="text-red-600 border-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {filteredUsers.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-xl text-gray-500">No users found matching your criteria.</p>
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
            <p className="text-2xl font-bold text-blue-600">{users.length}</p>
            <p className="text-sm text-gray-600">Total Users</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">
              {users.filter(u => u.status === 'Active').length}
            </p>
            <p className="text-sm text-gray-600">Active Users</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-yellow-600">
              {users.filter(u => u.status === 'Pending').length}
            </p>
            <p className="text-sm text-gray-600">Pending Approval</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-purple-600">
              {users.filter(u => u.role === 'Vendor').length}
            </p>
            <p className="text-sm text-gray-600">Vendors</p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AdminUsers;