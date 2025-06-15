
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bell, Settings, Menu as MenuIcon, Search, UserCircle, ChevronDown, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


const VendorHeader = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out successfully",
      description: "See you soon!"
    });
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-sm fixed top-0 left-64 right-0 z-30 h-16 border-b border-gray-200"> {/* Adjusted left margin for sidebar */}
      <div className="px-6 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Search Bar */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search orders, products..."
                className="w-full pl-10 pr-4 py-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm shadow-sm"
                onClick={() => toast({ title: "🚧 Search coming soon!" })}
              />
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-full"
              onClick={() => toast({ title: "🚧 Notifications not implemented yet" })}
            >
              <Bell className="w-5 h-5" />
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100">
                  {user?.avatar ? (
                     <img src={user.avatar} alt={user.name || 'Vendor'} className="w-8 h-8 rounded-full object-cover border border-gray-300" />
                  ) : (
                    <UserCircle className="w-8 h-8 text-gray-500" />
                  )}
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium text-gray-700">{user?.name || 'Vendor User'}</p>
                    <p className="text-xs text-gray-500">{user?.role || 'Vendor'}</p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400 hidden md:block" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/vendor/settings" className="cursor-pointer">
                    <Settings className="w-4 h-4 mr-2" />
                    Store Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => toast({title: "🚧 Profile page coming soon!"})} className="cursor-pointer">
                  <UserCircle className="w-4 h-4 mr-2" />
                  View Profile
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-600 focus:bg-red-50 cursor-pointer">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Mobile Menu Button - if sidebar is collapsible on mobile */}
            {/* <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => toast({title: "🚧 Mobile menu toggle not implemented"})}>
              <MenuIcon className="w-6 h-6" />
            </Button> */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default VendorHeader;
