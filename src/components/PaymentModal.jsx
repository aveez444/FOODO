import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, Smartphone, Shield, Lock, Check } from 'lucide-react';

const PaymentModal = ({ isOpen, onClose, total, onComplete }) => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    upiId: '',
    cardName: '',
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleChange = (e) => {
    let value = e.target.value;
    
    // Format card number with spaces
    if (e.target.name === 'cardNumber') {
      value = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
      value = value.substring(0, 19); // Limit to 16 digits + 3 spaces
    }
    
    // Format expiry date
    if (e.target.name === 'expiry') {
      value = value.replace(/\D/g, '').substring(0, 4);
      if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2);
      }
    }
    
    // Format CVV
    if (e.target.name === 'cvv') {
      value = value.replace(/\D/g, '').substring(0, 4);
    }

    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      onComplete();
    }, 2500);
  };

  const getCardType = (number) => {
    const num = number.replace(/\s/g, '');
    if (num.startsWith('4')) return 'visa';
    if (num.startsWith('5') || num.startsWith('2')) return 'mastercard';
    if (num.startsWith('3')) return 'amex';
    return 'card';
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="bg-white rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 relative">
            <button 
              onClick={onClose} 
              className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-200"
              disabled={isProcessing}
            >
              <X size={20} className="text-white" />
            </button>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white/20 rounded-full">
                <Lock size={24} className="text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Secure Payment</h2>
                <div className="flex items-center gap-2 text-white/80">
                  <Shield size={16} />
                  <p className="text-sm">256-bit SSL encrypted</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6">
            {/* Amount Display */}
            <div className="text-center mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200">
              <p className="text-sm text-gray-600 mb-1">Amount to pay</p>
              <p className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                ₹{total.toFixed(2)}
              </p>
            </div>

            {/* Payment Method Selection */}
            <div className="mb-6">
              <h3 className="font-semibold mb-4 text-gray-800">Choose Payment Method</h3>
              <div className="grid grid-cols-2 gap-3">
                <motion.button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 rounded-2xl border-2 transition-all duration-200 ${
                    paymentMethod === 'card'
                      ? 'border-blue-500 bg-blue-50 shadow-lg'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <CreditCard size={24} className={paymentMethod === 'card' ? 'text-blue-500' : 'text-gray-600'} />
                  <p className="text-sm font-medium mt-2">Card</p>
                </motion.button>
                
                <motion.button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-4 rounded-2xl border-2 transition-all duration-200 ${
                    paymentMethod === 'upi'
                      ? 'border-purple-500 bg-purple-50 shadow-lg'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Smartphone size={24} className={paymentMethod === 'upi' ? 'text-purple-500' : 'text-gray-600'} />
                  <p className="text-sm font-medium mt-2">UPI</p>
                </motion.button>
              </div>
            </div>

            {/* Payment Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {paymentMethod === 'card' ? (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4"
                >
                  {/* Card Number */}
                  <div className="relative">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Card Number
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 font-mono text-lg tracking-wider"
                        placeholder="1234 5678 9012 3456"
                        required
                      />
                      <div className="absolute right-3 top-3">
                        {getCardType(formData.cardNumber) === 'visa' && (
                          <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">VISA</div>
                        )}
                        {getCardType(formData.cardNumber) === 'mastercard' && (
                          <div className="w-8 h-5 bg-red-500 rounded text-white text-xs flex items-center justify-center font-bold">MC</div>
                        )}
                        {formData.cardNumber.length === 0 && (
                          <CreditCard size={20} className="text-gray-400" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Cardholder Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  {/* Expiry and CVV */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        name="expiry"
                        value={formData.expiry}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 font-mono"
                        placeholder="MM/YY"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        CVV
                      </label>
                      <input
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 font-mono"
                        placeholder="123"
                        required
                      />
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4"
                >
                  {/* UPI ID */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      UPI ID
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="upiId"
                        value={formData.upiId}
                        onChange={handleChange}
                        className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                        placeholder="yourname@paytm"
                        required
                      />
                      <Smartphone size={20} className="absolute right-3 top-3 text-purple-500" />
                    </div>
                  </div>

                  {/* Popular UPI Apps */}
                  <div className="grid grid-cols-4 gap-2">
                    {['@paytm', '@gpay', '@phonepe', '@ybl'].map((suffix) => (
                      <motion.button
                        key={suffix}
                        type="button"
                        onClick={() => setFormData({...formData, upiId: formData.upiId.split('@')[0] + suffix})}
                        className="p-2 text-xs bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-lg transition-all duration-200"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {suffix}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Security Notice */}
              <div className="flex items-center gap-2 p-3 bg-green-50 rounded-xl border border-green-200">
                <Shield size={16} className="text-green-600" />
                <p className="text-xs text-green-700">
                  Your payment information is encrypted and secure
                </p>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isProcessing}
                className={`w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300 ${
                  isProcessing
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-lg hover:shadow-xl transform hover:-translate-y-1'
                } text-white`}
                whileTap={{ scale: isProcessing ? 1 : 0.98 }}
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing Payment...
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <Lock size={18} />
                    Pay ₹{total.toFixed(2)}
                  </div>
                )}
              </motion.button>
            </form>

            {/* Accepted Payment Methods */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500 text-center mb-2">We accept</p>
              <div className="flex justify-center items-center gap-3">
                <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">VISA</div>
                <div className="w-8 h-5 bg-red-500 rounded text-white text-xs flex items-center justify-center font-bold">MC</div>
                <div className="w-8 h-5 bg-purple-600 rounded text-white text-xs flex items-center justify-center font-bold">UPI</div>
                <div className="w-8 h-5 bg-green-600 rounded text-white text-xs flex items-center justify-center font-bold">GPay</div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PaymentModal;