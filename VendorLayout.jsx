
import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import VendorSidebar from '@/components/vendor/VendorSidebar';
import VendorHeader from '@/components/vendor/VendorHeader';
import { useAuth } from '@/contexts/AuthContext';

const VendorLayout = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-600"></div>
      </div>
    );
  }

  if (!user || user.role !== 'vendor') {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-100 to-indigo-100 overflow-hidden">
      <VendorSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <VendorHeader />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-50 p-6 md:p-8 pt-20"> {/* pt-20 to account for fixed header */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default VendorLayout;