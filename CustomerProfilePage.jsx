import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Lock, Save, Edit3, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';

const CustomerProfilePage = () => {
  const { user, updateUser: updateAuthUser } = useAuth(); // Assuming updateUser updates context and localStorage

  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleProfileChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleProfileSave = (e) => {
    e.preventDefault();
    // Mock update. In a real app, this would call an API.
    updateAuthUser({ ...user, ...profileData }); // Update context/localStorage
    toast({
      title: "Profile Updated!",
      description: "Your profile information has been saved.",
    });
    setIsEditing(false);
  };

  const handlePasswordSave = (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Passwords Don't Match",
        description: "The new password and confirmation password must match.",
        variant: "destructive",
      });
      return;
    }
    if (passwordData.newPassword.length < 6) {
      toast({
        title: "Password Too Short",
        description: "New password must be at least 6 characters long.",
        variant: "destructive",
      });
      return;
    }
    // Mock password change.
    toast({
      title: "Password Updated!",
      description: "Your password has been changed successfully. (This is a mock action)",
    });
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleAvatarUpload = () => {
    toast({ title: "🚧 Feature Not Implemented", description: "Avatar upload will be available soon!" });
  };

  if (!user) {
    return <div className="text-center p-8">Loading profile...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center mb-8"
        >
          <User className="w-10 h-10 text-indigo-600 mr-3" />
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-500 to-blue-600">
            My Profile
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Picture Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <Card className="shadow-xl text-center card-hover">
              <CardHeader>
                <CardTitle className="text-2xl text-indigo-700">Profile Picture</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative w-40 h-40 mx-auto rounded-full overflow-hidden mb-4 border-4 border-indigo-200 shadow-md">
                  <img  src={user.avatar || "https://images.unsplash.com/photo-1605903018902-a07815887869"} alt="User Avatar" className="w-full h-full object-cover" />
                  <Button
                    size="icon"
                    variant="outline"
                    className="absolute bottom-2 right-2 bg-white/80 hover:bg-white rounded-full shadow"
                    onClick={handleAvatarUpload}
                  >
                    <Camera className="w-5 h-5 text-indigo-600" />
                  </Button>
                </div>
                <h2 className="text-2xl font-semibold">{user.name}</h2>
                <p className="text-gray-600">{user.email}</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Profile Information Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="shadow-xl card-hover">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-2xl text-indigo-700">Account Information</CardTitle>
                <Button variant="ghost" onClick={() => setIsEditing(!isEditing)}>
                  <Edit3 className="w-5 h-5 mr-2" /> {isEditing ? 'Cancel' : 'Edit Profile'}
                </Button>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileSave} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input name="name" value={profileData.name} onChange={handleProfileChange} disabled={!isEditing} className="pl-10" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                     <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input type="email" name="email" value={profileData.email} onChange={handleProfileChange} disabled={!isEditing} className="pl-10" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number (Optional)</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input name="phone" value={profileData.phone} onChange={handleProfileChange} disabled={!isEditing} placeholder="e.g., +1 555 123 4567" className="pl-10" />
                    </div>
                  </div>
                  {isEditing && (
                    <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700">
                      <Save className="w-4 h-4 mr-2" /> Save Changes
                    </Button>
                  )}
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Change Password Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-3"
          >
            <Card className="shadow-xl card-hover">
              <CardHeader>
                <CardTitle className="text-2xl text-indigo-700">Change Password</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePasswordSave} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input type="password" name="currentPassword" value={passwordData.currentPassword} onChange={handlePasswordChange} required className="pl-10" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                       <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input type="password" name="newPassword" value={passwordData.newPassword} onChange={handlePasswordChange} required className="pl-10" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input type="password" name="confirmPassword" value={passwordData.confirmPassword} onChange={handlePasswordChange} required className="pl-10" />
                      </div>
                    </div>
                  </div>
                  <Button type="submit" className="w-full md:w-auto bg-purple-600 hover:bg-purple-700">
                    <Save className="w-4 h-4 mr-2" /> Update Password
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CustomerProfilePage;