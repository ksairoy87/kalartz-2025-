
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bell, User, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';

const AdminHeader = () => {
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
    <header className="bg-white shadow-sm border-b">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-4">
          <Link to="/admin" className="flex items-center space-x-2">
             <img src="https://storage.googleapis.com/hostinger-horizons-assets-prod/62e67930-f4e8-4ec4-a65d-cbee00a9d575/2d4e61dba6bbe8e092f7a2fff0d23cfd.png" alt="Kalartz Logo" className="h-10 w-auto" />
            <span className="text-2xl font-bold text-red-600">Kalartz Admin</span>
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => toast({
              title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
            })}
          >
            <Bell className="w-5 h-5" />
          </Button>
          
          <Link to="/admin/settings">
            <Button
              variant="ghost"
              size="icon"
            >
              <Settings className="w-5 h-5" />
            </Button>
          </Link>

          <div className="flex items-center space-x-3">
             {user?.avatar && (
               <img
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 rounded-full"
              />
            )}
            <div className="hidden md:block">
              <p className="text-sm font-medium">{user?.name}</p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
          </div>

          <Button variant="outline" size="sm" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
