import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Truck, Shield, Check, Smartphone, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const { items, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Mock payment processing
    toast({
      title: "Order placed successfully!",
      description: `Thank you for your purchase using ${paymentMethod}. You'll receive a confirmation email shortly.`
    });
    
    clearCart();
    navigate('/dashboard');
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
    toast({
      title: `Payment method changed to ${method}`,
      description: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2">Checkout</h1>
          <p className="text-xl text-gray-600">Complete your purchase</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center mr-3 text-sm font-bold">
                      1
                    </div>
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </CardContent>
              </Card>

              {/* Shipping Address */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center mr-3 text-sm font-bold">
                      2
                    </div>
                    Shipping Address
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      type="text"
                      name="firstName"
                      placeholder="First name"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                    <Input
                      type="text"
                      name="lastName"
                      placeholder="Last name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <Input
                    type="text"
                    name="address"
                    placeholder="Street address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                    />
                    <Input
                      type="text"
                      name="state"
                      placeholder="State"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                    />
                    <Input
                      type="text"
                      name="zipCode"
                      placeholder="ZIP code"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Payment Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center mr-3 text-sm font-bold">
                      3
                    </div>
                    Payment Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex space-x-2 mb-4">
                    <Button
                      type="button"
                      variant={paymentMethod === 'card' ? 'default' : 'outline'}
                      onClick={() => setPaymentMethod('card')}
                      className="flex-1"
                    >
                      <CreditCard className="w-4 h-4 mr-2" /> Credit/Debit Card
                    </Button>
                    <Button
                      type="button"
                      variant={paymentMethod === 'phonepe' ? 'default' : 'outline'}
                      onClick={() => handlePaymentMethodChange('PhonePe')}
                      className="flex-1"
                    >
                      <Smartphone className="w-4 h-4 mr-2" /> PhonePe
                    </Button>
                    <Button
                      type="button"
                      variant={paymentMethod === 'razorpay' ? 'default' : 'outline'}
                      onClick={() => handlePaymentMethodChange('Razorpay')}
                      className="flex-1"
                    >
                      <Zap className="w-4 h-4 mr-2" /> Razorpay
                    </Button>
                  </div>

                  {paymentMethod === 'card' && (
                    <>
                      <Input
                        type="text"
                        name="nameOnCard"
                        placeholder="Name on card"
                        value={formData.nameOnCard}
                        onChange={handleInputChange}
                        required
                      />
                      <Input
                        type="text"
                        name="cardNumber"
                        placeholder="Card number"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        required
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          type="text"
                          name="expiryDate"
                          placeholder="MM/YY"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          required
                        />
                        <Input
                          type="text"
                          name="cvv"
                          placeholder="CVV"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </>
                  )}
                  {paymentMethod === 'phonepe' && (
                    <div className="text-center p-4 border rounded-md bg-purple-50 text-purple-700">
                      <Smartphone className="w-8 h-8 mx-auto mb-2" />
                      <p>Proceed to pay with PhonePe. You will be redirected to the PhonePe app.</p>
                    </div>
                  )}
                  {paymentMethod === 'razorpay' && (
                     <div className="text-center p-4 border rounded-md bg-blue-50 text-blue-700">
                      <Zap className="w-8 h-8 mx-auto mb-2" />
                      <p>Proceed to pay with Razorpay. A secure payment popup will appear.</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Button type="submit" size="lg" className="w-full">
                <CreditCard className="w-5 h-5 mr-2" />
                Complete Order
              </Button>
            </form>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            {/* Order Items */}
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <img  className="w-full h-full object-cover" alt={`${item.name} product image`} src="https://images.unsplash.com/photo-1677693972403-db681288b5da" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate">{item.name}</h4>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Pricing */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span className="text-green-600">Free (via Shiprocket)</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax:</span>
                  <span>${(getTotalPrice() * 0.08).toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-xl font-bold">
                    <span>Total:</span>
                    <span className="text-purple-600">
                      ${(getTotalPrice() * 1.08).toFixed(2)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security Features */}
            <Card>
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <Shield className="w-4 h-4 mr-2 text-green-600" />
                    SSL encrypted checkout
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Truck className="w-4 h-4 mr-2 text-blue-600" />
                    Reliable shipping via Shiprocket
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Check className="w-4 h-4 mr-2 text-purple-600" />
                    30-day return policy
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;