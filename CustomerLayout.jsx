
import React from 'react';
import { Outlet } from 'react-router-dom';
import CustomerHeader from '@/components/customer/CustomerHeader';
import CustomerFooter from '@/components/customer/CustomerFooter';

const CustomerLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <CustomerHeader />
      <main className="flex-grow w-full">
        <Outlet />
      </main>
      <CustomerFooter />
    </div>
  );
};

export default CustomerLayout;