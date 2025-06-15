import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, User, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'customer',
    businessName: '',
    businessDescription: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "Passwords do not match. Please try again.",
        variant: "destructive"
      });
      return;
    }

    if (formData.password.length < 6) {
      toast({
        title: "Password too short",
        description: "Password must be at least 6 characters long.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      const userData = {
        name: formData.role === 'vendor' ? formData.businessName : formData.name,
        email: formData.email,
        role: formData.role,
        businessDescription: formData.businessDescription
      };

      await register(userData);
      
      toast({
        title: "Account created successfully!",
        description: `Welcome to Kalartz! Your ${formData.role} account has been created.`
      });

      // Redirect based on role
      switch (formData.role) {
        case 'vendor':
          navigate('/vendor');
          break;
        default:
          navigate('/');
      }
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 flex items-center justify-center p-4">
      <div className="absolute inset-0 hero-pattern opacity-10"></div>
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="glass-effect border-white/20">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">K</span>
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-white">Join Kalartz</CardTitle>
            <p className="text-blue-100">Create your account and start your journey</p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Role Selection */}
              <div className="grid grid-cols-2 gap-2">
                {['customer', 'vendor'].map((role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => setFormData({ ...formData, role })}
                    className={`p-3 rounded-lg text-sm font-medium transition-colors capitalize ${
                      formData.role === role
                        ? 'bg-white text-purple-600'
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>

              {/* Name/Business Name Input */}
              <div className="relative">
                {formData.role === 'vendor' ? (
                  <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 w-4 h-4" />
                ) : (
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 w-4 h-4" />
                )}
                <Input
                  type="text"
                  name={formData.role === 'vendor' ? 'businessName' : 'name'}
                  placeholder={formData.role === 'vendor' ? 'Business name' : 'Full name'}
                  value={formData.role === 'vendor' ? formData.businessName : formData.name}
                  onChange={handleInputChange}
                  required
                  className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-white/70 focus:bg-white/30"
                />
              </div>

              {/* Email Input */}
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 w-4 h-4" />
                <Input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-white/70 focus:bg-white/30"
                />
              </div>

              {/* Business Description for Vendors */}
              {formData.role === 'vendor' && (
                <div className="relative">
                  <textarea
                    name="businessDescription"
                    placeholder="Brief description of your business"
                    value={formData.businessDescription}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full p-3 bg-white/20 border border-white/30 rounded-md text-white placeholder:text-white/70 focus:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 resize-none"
                  />
                </div>
              )}

              {/* Password Input */}
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 w-4 h-4" />
                <Input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="pl-10 pr-10 bg-white/20 border-white/30 text-white placeholder:text-white/70 focus:bg-white/30"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Confirm Password Input */}
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 w-4 h-4" />
                <Input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  className="pl-10 pr-10 bg-white/20 border-white/30 text-white placeholder:text-white/70 focus:bg-white/30"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              <Button
                type="submit"
                className="w-full bg-white text-purple-600 hover:bg-gray-100"
                disabled={loading}
              >
                {loading ? 'Creating account...' : 'Create Account'}
              </Button>
            </form>

            <div className="text-center">
              <Link
                to="/login"
                className="text-blue-100 hover:text-white transition-colors"
              >
                Already have an account? Sign in
              </Link>
            </div>

            {formData.role === 'vendor' && (
              <div className="bg-white/10 rounded-lg p-4 text-sm text-white/90">
                <p className="font-medium mb-2">Vendor Benefits:</p>
                <ul className="space-y-1 text-xs">
                  <li>• Sell your products to thousands of customers</li>
                  <li>• Powerful analytics and reporting tools</li>
                  <li>• Secure payment processing</li>
                  <li>• 24/7 customer support</li>
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default RegisterPage;