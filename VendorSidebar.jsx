
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  BarChart3, 
  Settings,
  Store,
  PlusCircle,
  LogOut,
  MessageSquare
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';

const VendorSidebar = () => {
  const location = useLocation();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/vendor' },
    { icon: Package, label: 'Products', path: '/vendor/products' },
    { icon: PlusCircle, label: 'Add Product', path: '/vendor/products/add' },
    { icon: ShoppingBag, label: 'Orders', path: '/vendor/orders' },
    { icon: BarChart3, label: 'Analytics', path: '/vendor/analytics' },
    { icon: MessageSquare, label: 'Messages', path: '/vendor/messages' },
    { icon: Store, label: 'Store Settings', path: '/vendor/settings' },
  ];

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out successfully",
      description: "See you soon!"
    });
    navigate('/login');
  };

  return (
    <aside className="w-64 bg-gradient-to-b from-slate-800 to-slate-900 text-slate-100 shadow-xl border-r border-slate-700 h-screen fixed left-0 top-0 flex flex-col z-40"> {/* Fixed width, full height */}
      {/* Logo Area */}
      <div className="h-16 flex items-center justify-center px-4 border-b border-slate-700">
        <Link to="/vendor" className="flex items-center space-x-2">
            <img src="https://storage.googleapis.com/hostinger-horizons-assets-prod/62e67930-f4e8-4ec4-a65d-cbee00a9d575/2d4e61dba6bbe8e092f7a2fff0d23cfd.png" alt="Kalartz Logo" className="h-8 w-auto filter brightness-0 invert" />
            <span className="text-lg font-semibold text-white">Kalartz Vendor</span>
        </Link>
      </div>
      
      <nav className="flex-1 px-4 py-4 space-y-1.5 overflow-y-auto scrollbar-hide">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path || 
                           (item.path !== '/vendor' && location.pathname.startsWith(item.path) && item.path !== '/vendor/products/add') ||
                           (item.path === '/vendor/products/add' && location.pathname === '/vendor/products/add') ||
                           (item.path === '/vendor/messages' && location.pathname === '/vendor/messages');
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-150 ease-in-out group",
                isActive 
                  ? "bg-purple-600 text-white shadow-lg transform scale-102" 
                  : "text-slate-300 hover:bg-slate-700 hover:text-white"
              )}
            >
              <Icon className={cn("w-5 h-5 transition-transform duration-150", isActive ? "text-white" : "text-slate-400 group-hover:text-white")} />
              <span className="font-medium text-sm">{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="p-4 mt-auto border-t border-slate-700">
          <Button variant="ghost" className="w-full justify-start text-slate-300 hover:bg-red-600 hover:text-white" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
      </div>
    </aside>
  );
};

export default VendorSidebar;