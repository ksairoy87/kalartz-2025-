import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { CartProvider } from '@/contexts/CartContext';
import { WishlistProvider } from '@/contexts/WishlistContext';

// Customer Pages
import CustomerLayout from '@/components/layouts/CustomerLayout';
import HomePage from '@/pages/customer/HomePage';
import ProductsPage from '@/pages/customer/ProductsPage';
import ProductDetailPage from '@/pages/customer/ProductDetailPage';
import CartPage from '@/pages/customer/CartPage';
import CheckoutPage from '@/pages/customer/CheckoutPage';
import CustomerDashboard from '@/pages/customer/CustomerDashboard';
import CustomerCategoriesPage from '@/pages/customer/CustomerCategoriesPage';
import CustomerDealsPage from '@/pages/customer/CustomerDealsPage';
import CustomerAboutPage from '@/pages/customer/CustomerAboutPage';
import CustomerHelpPage from '@/pages/customer/CustomerHelpPage';
import CustomerReturnsPage from '@/pages/customer/CustomerReturnsPage';
import CustomerShippingPage from '@/pages/customer/CustomerShippingPage';
import CustomerContactPage from '@/pages/customer/CustomerContactPage';
import CustomerWishlistPage from '@/pages/customer/CustomerWishlistPage';
import CustomerAddressesPage from '@/pages/customer/CustomerAddressesPage';
import CustomerProfilePage from '@/pages/customer/CustomerProfilePage';
import CustomerTrackOrderPage from '@/pages/customer/CustomerTrackOrderPage';


// Vendor Pages
import VendorLayout from '@/components/layouts/VendorLayout';
import VendorDashboard from '@/pages/vendor/VendorDashboard';
import VendorProducts from '@/pages/vendor/VendorProducts';
import AddProductPage from '@/pages/vendor/AddProductPage';
import VendorOrders from '@/pages/vendor/VendorOrders';
import VendorAnalytics from '@/pages/vendor/VendorAnalytics';
import VendorSettings from '@/pages/vendor/VendorSettings';

// Admin Pages
import AdminLayout from '@/components/layouts/AdminLayout';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import AdminUsers from '@/pages/admin/AdminUsers';
import AdminProducts from '@/pages/admin/AdminProducts';
import AdminOrders from '@/pages/admin/AdminOrders';
import AdminCategories from '@/pages/admin/AdminCategories';
import AdminReports from '@/pages/admin/AdminReports';
import AdminSettings from '@/pages/admin/AdminSettings';


// Auth Pages
import LoginPage from '@/pages/auth/LoginPage';
import RegisterPage from '@/pages/auth/RegisterPage';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    switch (user.role) {
      case 'admin':
        return <Navigate to="/admin" replace />;
      case 'vendor':
        return <Navigate to="/vendor" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }

  return children;
};


function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <Router>
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
              <Routes>
                {/* Auth Routes */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                {/* Customer Routes */}
                <Route path="/" element={<CustomerLayout />}>
                  <Route index element={<HomePage />} />
                  <Route path="products" element={<ProductsPage />} />
                  <Route path="products/:id" element={<ProductDetailPage />} />
                  <Route path="categories" element={<CustomerCategoriesPage />} />
                  <Route path="deals" element={<CustomerDealsPage />} />
                  <Route path="about" element={<CustomerAboutPage />} />
                  <Route path="help" element={<CustomerHelpPage />} />
                  <Route path="returns" element={<CustomerReturnsPage />} />
                  <Route path="shipping" element={<CustomerShippingPage />} />
                  <Route path="contact" element={<CustomerContactPage />} />
                  <Route path="cart" element={<ProtectedRoute allowedRoles={['customer']}><CartPage /></ProtectedRoute>} />
                  <Route path="checkout" element={<ProtectedRoute allowedRoles={['customer']}><CheckoutPage /></ProtectedRoute>} />
                  <Route path="dashboard" element={<ProtectedRoute allowedRoles={['customer']}><CustomerDashboard /></ProtectedRoute>} />
                  <Route path="wishlist" element={<ProtectedRoute allowedRoles={['customer']}><CustomerWishlistPage /></ProtectedRoute>} />
                  <Route path="addresses" element={<ProtectedRoute allowedRoles={['customer']}><CustomerAddressesPage /></ProtectedRoute>} />
                  <Route path="profile" element={<ProtectedRoute allowedRoles={['customer']}><CustomerProfilePage /></ProtectedRoute>} />
                  <Route path="track-order" element={<ProtectedRoute allowedRoles={['customer']}><CustomerTrackOrderPage /></ProtectedRoute>} />
                   <Route path="track-order/:orderId" element={<ProtectedRoute allowedRoles={['customer']}><CustomerTrackOrderPage /></ProtectedRoute>} />
                </Route>

                {/* Vendor Routes */}
                <Route path="/vendor" element={<ProtectedRoute allowedRoles={['vendor']}><VendorLayout /></ProtectedRoute>}>
                  <Route index element={<VendorDashboard />} />
                  <Route path="products" element={<VendorProducts />} />
                  <Route path="products/add" element={<AddProductPage />} />
                  <Route path="orders" element={<VendorOrders />} />
                  <Route path="analytics" element={<VendorAnalytics />} />
                  <Route path="settings" element={<VendorSettings />} />
                </Route>

                {/* Admin Routes */}
                <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']}><AdminLayout /></ProtectedRoute>}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="users" element={<AdminUsers />} />
                  <Route path="products" element={<AdminProducts />} />
                  <Route path="orders" element={<AdminOrders />} />
                  <Route path="categories" element={<AdminCategories />} />
                  <Route path="reports" element={<AdminReports />} />
                  <Route path="settings" element={<AdminSettings />} />
                </Route>
              </Routes>
              <Toaster />
            </div>
          </Router>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;