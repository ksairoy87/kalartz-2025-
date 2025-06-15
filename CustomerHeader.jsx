
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Search, Heart, Menu, LogIn, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { toast } from '@/components/ui/use-toast';

const CustomerHeader = () => {
  const { user, logout } = useAuth();
  const { getTotalItems: getTotalCartItems } = useCart();
  const { wishlistItems } = useWishlist(); // Directly use wishlistItems.length
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out successfully",
      description: "See you soon!"
    });
    navigate('/');
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/products", label: "Products" },
    { to: "/categories", label: "Categories" },
    { to: "/deals", label: "Deals" },
    { to: "/about", label: "About Us" },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 border-b border-gray-200">
      <div className="container mx-auto px-4">
        {/* Top Bar: Logo and Auth/Actions */}
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-3">
            <img src="https://storage.googleapis.com/hostinger-horizons-assets-prod/62e67930-f4e8-4ec4-a65d-cbee00a9d575/2d4e61dba6bbe8e092f7a2fff0d23cfd.png" alt="Kalartz Logo" className="h-12 w-auto" />
            <span className="text-2xl font-bold text-purple-700 hidden sm:inline">Kalartz</span>
          </Link>

          {/* Search Bar - more prominent for website */}
          <div className="hidden lg:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for products, brands, and more"
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-base shadow-sm"
                onClick={() => toast({
                  title: "🚧 Search feature coming soon!"
                })}
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-3 md:space-x-4">
            <Link to="/wishlist" className="relative text-gray-600 hover:text-purple-600 transition-colors">
              <Heart className="w-6 h-6" />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlistItems.length}
                </span>
              )}
            </Link>
            
            <Link to="/cart" className="relative text-gray-600 hover:text-purple-600 transition-colors">
              <ShoppingCart className="w-6 h-6" />
              {getTotalCartItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getTotalCartItems()}
                </span>
              )}
            </Link>

            {user ? (
              <div className="flex items-center space-x-2">
                <Link to="/dashboard" className="text-gray-600 hover:text-purple-600 transition-colors">
                  <User className="w-6 h-6" />
                </Link>
                <Button variant="outline" size="sm" onClick={handleLogout} className="border-purple-500 text-purple-600 hover:bg-purple-50">
                  Logout
                </Button>
              </div>
            ) : (
              <div className="hidden sm:flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="ghost" className="text-purple-600 hover:bg-purple-50">
                    <LogIn className="w-4 h-4 mr-2"/> Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    <UserPlus className="w-4 h-4 mr-2"/> Sign Up
                  </Button>
                </Link>
              </div>
            )}
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => toast({ title: "🚧 Mobile menu not implemented" })}>
              <Menu className="w-6 h-6" />
            </Button>
          </div>
        </div>
        
        {/* Bottom Bar: Navigation Links */}
        <nav className="hidden md:flex items-center justify-center h-12 border-t border-gray-100">
          <ul className="flex space-x-8">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link 
                  to={link.to} 
                  className="text-base font-medium text-gray-700 hover:text-purple-600 transition-colors pb-1 border-b-2 border-transparent hover:border-purple-500"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default CustomerHeader;