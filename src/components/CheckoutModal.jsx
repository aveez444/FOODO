import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, CreditCard, DollarSign, User, Mail, Phone, Home, Truck } from 'lucide-react';
import emailjs from '@emailjs/browser';
import PaymentModal from './PaymentModal';
import OrderSuccessModal from './OrderSuccessModal';

const CheckoutModal = ({ isOpen, onClose, items, total, onOrderComplete }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    paymentMethod: 'cod',
  });
  const [isPaymentOpen, setPaymentOpen] = useState(false);
  const [isSuccessOpen, setSuccessOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.paymentMethod === 'cod') {
      sendOrderEmail();
      setSuccessOpen(true);
    } else {
      setPaymentOpen(true);
    }
  };

  const sendOrderEmail = () => {
    const templateParams = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: `${formData.address}, ${formData.city}, ${formData.state} ${formData.zip}`,
      items: items.map((item) => `${item.title} x ${item.quantity}`).join(', '),
      total: `₹${total.toFixed(2)}`,
      paymentMethod: formData.paymentMethod,
    };

    emailjs
      .send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams, 'YOUR_PUBLIC_KEY')
      .then((response) => {
        console.log('Email sent successfully!', response.status, response.text);
      })
      .catch((err) => {
        console.error('Failed to send email.', err);
      });
  };

  const handlePaymentComplete = () => {
    sendOrderEmail();
    setPaymentOpen(false);
    setSuccessOpen(true);
  };

  if (!isOpen) return null;

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl overflow-hidden max-h-[90vh]"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-6 relative">
                <button 
                  onClick={onClose} 
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-200"
                >
                  <X size={20} className="text-white" />
                </button>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-white/20 rounded-full">
                    <CreditCard size={24} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Secure Checkout</h2>
                    <p className="text-white/80">Complete your order safely</p>
                  </div>
                </div>
              </div>

              <div className="flex max-h-[calc(90vh-120px)]">
                {/* Order Summary Sidebar */}
                <div className="w-1/3 bg-gray-50 p-6 border-r overflow-y-auto">
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <Truck size={20} className="text-emerald-500" />
                    Order Summary
                  </h3>
                  
                  <div className="space-y-3 mb-6">
                    {items.map((item) => (
                      <div key={item.id} className="bg-white p-3 rounded-xl shadow-sm">
                        <div className="flex gap-3">
                          <img 
                            src={item.image} 
                            alt={item.title}
                            className="w-12 h-12 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-sm line-clamp-2">{item.title}</h4>
                            <div className="flex justify-between text-sm text-gray-600 mt-1">
                              <span>Qty: {item.quantity}</span>
                              <span className="font-semibold">₹{(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal:</span>
                      <span>₹{total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Shipping:</span>
                      <span>FREE</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg pt-2 border-t">
                      <span>Total:</span>
                      <span className="text-emerald-600">₹{total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Checkout Form */}
                <div className="flex-1 p-6 overflow-y-auto">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Personal Information */}
                    <div>
                      <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                        <User size={20} className="text-blue-500" />
                        Personal Information
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="relative">
                          <User size={18} className="absolute left-3 top-3 text-gray-400" />
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                            placeholder="Full Name"
                            required
                          />
                        </div>
                        
                        <div className="relative">
                          <Mail size={18} className="absolute left-3 top-3 text-gray-400" />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                            placeholder="Email Address"
                            required
                          />
                        </div>
                        
                        <div className="relative md:col-span-2">
                          <Phone size={18} className="absolute left-3 top-3 text-gray-400" />
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                            placeholder="Phone Number"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* Shipping Address */}
                    <div>
                      <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                        <MapPin size={20} className="text-purple-500" />
                        Shipping Address
                      </h3>
                      <div className="space-y-4">
                        <div className="relative">
                          <Home size={18} className="absolute left-3 top-3 text-gray-400" />
                          <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                            placeholder="Street Address"
                            required
                          />
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4">
                          <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                            placeholder="City"
                            required
                          />
                          <input
                            type="text"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                            placeholder="State"
                            required
                          />
                          <input
                            type="text"
                            name="zip"
                            value={formData.zip}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                            placeholder="ZIP Code"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* Payment Method */}
                    <div>
                      <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                        <CreditCard size={20} className="text-green-500" />
                        Payment Method
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <motion.label 
                          className={`relative cursor-pointer transition-all duration-200 ${
                            formData.paymentMethod === 'cod' 
                              ? 'ring-2 ring-emerald-500' 
                              : 'hover:ring-1 hover:ring-gray-300'
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="cod"
                            checked={formData.paymentMethod === 'cod'}
                            onChange={handleChange}
                            className="sr-only"
                          />
                          <div className="p-4 border rounded-xl bg-gradient-to-br from-orange-50 to-amber-50">
                            <div className="flex items-center gap-3">
                              <DollarSign size={24} className="text-orange-500" />
                              <div>
                                <p className="font-semibold">Cash on Delivery</p>
                                <p className="text-sm text-gray-600">Pay when you receive</p>
                              </div>
                            </div>
                          </div>
                        </motion.label>
                        
                        <motion.label 
                          className={`relative cursor-pointer transition-all duration-200 ${
                            formData.paymentMethod === 'online' 
                              ? 'ring-2 ring-emerald-500' 
                              : 'hover:ring-1 hover:ring-gray-300'
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="online"
                            checked={formData.paymentMethod === 'online'}
                            onChange={handleChange}
                            className="sr-only"
                          />
                          <div className="p-4 border rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50">
                            <div className="flex items-center gap-3">
                              <CreditCard size={24} className="text-blue-500" />
                              <div>
                                <p className="font-semibold">Online Payment</p>
                                <p className="text-sm text-gray-600">Card, UPI, Wallet</p>
                              </div>
                            </div>
                          </div>
                        </motion.label>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                      whileTap={{ scale: 0.98 }}
                    >
                      {formData.paymentMethod === 'cod' ? '🚚 Place Order' : '💳 Proceed to Payment'}
                    </motion.button>
                  </form>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <PaymentModal
        isOpen={isPaymentOpen}
        onClose={() => setPaymentOpen(false)}
        total={total}
        onComplete={handlePaymentComplete}
      />
      <OrderSuccessModal
        isOpen={isSuccessOpen}
        onClose={() => {
          setSuccessOpen(false);
          onOrderComplete();
          onClose();
        }}
        paymentMethod={formData.paymentMethod}
      />
    </>
  );
};

export default CheckoutModal;