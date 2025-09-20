import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Truck, Clock, Phone, Star } from 'lucide-react';

const OrderSuccessModal = ({ isOpen, onClose, paymentMethod }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 20 }}
          transition={{ type: "spring", duration: 0.6 }}
          className="bg-white rounded-3xl max-w-md w-full shadow-2xl overflow-hidden"
        >
          {/* Success Animation */}
          <div className="bg-gradient-to-r from-green-400 to-emerald-500 p-8 text-center relative overflow-hidden">
            {/* Confetti Animation */}
            <div className="absolute inset-0">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-white rounded-full"
                  initial={{ 
                    opacity: 0, 
                    scale: 0,
                    x: Math.random() * 300 - 150,
                    y: Math.random() * 200 - 100
                  }}
                  animate={{ 
                    opacity: [0, 1, 0], 
                    scale: [0, 1, 0],
                    y: [0, -50, 100],
                    rotate: 360
                  }}
                  transition={{ 
                    duration: 2,
                    delay: i * 0.1,
                    repeat: Infinity,
                    repeatDelay: 3
                  }}
                />
              ))}
            </div>
            
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="relative z-10"
            >
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <CheckCircle size={48} className="text-green-500" />
              </div>
              <motion.h2 
                className="text-3xl font-bold text-white mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Order Confirmed! 🎉
              </motion.h2>
              <motion.p 
                className="text-green-100"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                Thank you for your purchase
              </motion.p>
            </motion.div>
          </div>

          <div className="p-6">
            {/* Order Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-2xl mb-6 border border-blue-200"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-blue-500 rounded-full">
                  <Truck size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Order Status</h3>
                  <p className="text-sm text-gray-600">
                    {paymentMethod === 'cod'
                      ? 'Your order has been placed successfully'
                      : 'Payment confirmed and order placed'}
                  </p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-green-700 font-medium">Order Confirmed</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-yellow-700">Preparing for dispatch</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                  <span className="text-gray-500">Out for delivery</span>
                </div>
              </div>
            </motion.div>

            {/* Next Steps */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="space-y-4 mb-6"
            >
              <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                <Clock size={18} className="text-orange-500" />
                What happens next?
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-blue-600">1</span>
                  </div>
                  <div>
                    <p className="font-medium text-sm">Order Processing</p>
                    <p className="text-xs text-gray-600">We'll prepare your items for shipping</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-orange-600">2</span>
                  </div>
                  <div>
                    <p className="font-medium text-sm">Contact & Delivery</p>
                    <p className="text-xs text-gray-600">We'll call you to confirm delivery details</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-green-600">3</span>
                  </div>
                  <div>
                    <p className="font-medium text-sm">Delivery</p>
                    <p className="text-xs text-gray-600">Your order will be delivered safely</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="p-4 bg-gray-50 rounded-2xl mb-6"
            >
              <div className="flex items-center gap-2 mb-2">
                <Phone size={16} className="text-blue-500" />
                <span className="font-medium text-sm">Need Help?</span>
              </div>
              <p className="text-xs text-gray-600">
                Our team will contact you soon. For any queries, feel free to reach out to our support team.
              </p>
            </motion.div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <motion.button
                onClick={onClose}
                className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-2xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 }}
              >
                Continue Shopping
              </motion.button>
              
              <motion.button
                className="w-full py-3 bg-white border-2 border-gray-200 hover:border-amber-400 text-gray-700 hover:text-amber-600 rounded-2xl font-medium transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6 }}
              >
                ⭐ Rate Your Experience
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default OrderSuccessModal;