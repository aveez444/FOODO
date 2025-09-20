import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, Check, Package } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import CartItem from './CartItem';
import CheckoutModal from './CheckoutModal';

const BuyNowModal = ({ isOpen, onClose, product, quantity }) => {
  const { cartItems, addToCart, updateQuantity, removeFromCart } = useContext(CartContext);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isCheckoutOpen, setCheckoutOpen] = useState(false);

  const allItems = product ? [{ ...product, quantity, image: product.images[0] }, ...cartItems] : cartItems;

  const toggleSelect = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const selectAll = () => {
    setSelectedItems(allItems.map((item) => item.id));
  };

  const deselectAll = () => {
    setSelectedItems([]);
  };

  const handleProceed = () => {
    if (selectedItems.length === 0) return;
    setCheckoutOpen(true);
  };

  const handleOrderComplete = () => {
    selectedItems.forEach((id) => {
      if (id === product?.id && !cartItems.some((item) => item.id === id)) {
        // If product was not in cart, no need to remove
      } else {
        removeFromCart(id);
      }
    });
    setCheckoutOpen(false);
    setSelectedItems([]);
  };

  if (!isOpen) return null;

  const total = allItems
    .filter((item) => selectedItems.includes(item.id))
    .reduce((sum, item) => sum + item.price * item.quantity, 0);

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
              className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-6 relative">
                <button 
                  onClick={onClose} 
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-200"
                >
                  <X size={20} className="text-white" />
                </button>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-white/20 rounded-full">
                    <ShoppingCart size={24} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Your Cart</h2>
                    <p className="text-white/80">Select items to proceed with your order</p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                {allItems.length === 0 ? (
                  <div className="text-center py-12">
                    <Package size={64} className="text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">No items in your cart</p>
                    <p className="text-gray-400 text-sm">Add some products to get started</p>
                  </div>
                ) : (
                  <>
                    {/* Selection Controls */}
                    <div className="flex justify-between items-center mb-6 p-4 bg-gray-50 rounded-2xl">
                      <div className="flex items-center gap-2">
                        <Check size={20} className="text-amber-500" />
                        <span className="font-medium text-gray-700">
                          {selectedItems.length} of {allItems.length} items selected
                        </span>
                      </div>
                      <div className="flex gap-3">
                        <button 
                          onClick={selectAll} 
                          className="px-4 py-2 bg-amber-100 hover:bg-amber-200 text-amber-700 rounded-xl font-medium transition-all duration-200"
                        >
                          Select All
                        </button>
                        <button 
                          onClick={deselectAll} 
                          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-all duration-200"
                        >
                          Clear All
                        </button>
                      </div>
                    </div>

                    {/* Items List */}
                    <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
                      {allItems.map((item, index) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <CartItem
                            item={item}
                            onUpdateQuantity={updateQuantity}
                            onRemove={removeFromCart}
                            selected={selectedItems.includes(item.id)}
                            onSelect={toggleSelect}
                          />
                        </motion.div>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="mt-6 p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl">
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <p className="text-gray-600">Total Amount</p>
                          <p className="text-3xl font-bold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                            ₹{total.toFixed(2)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">{selectedItems.length} items</p>
                          <p className="text-xs text-gray-400">Taxes included</p>
                        </div>
                      </div>
                      
                      <motion.button
                        onClick={handleProceed}
                        disabled={selectedItems.length === 0}
                        className={`w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300 ${
                          selectedItems.length === 0
                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1'
                        }`}
                        whileTap={{ scale: 0.98 }}
                      >
                        {selectedItems.length === 0 ? 'Select items to continue' : 'Proceed to Checkout'}
                      </motion.button>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setCheckoutOpen(false)}
        items={allItems.filter((item) => selectedItems.includes(item.id))}
        total={total}
        onOrderComplete={handleOrderComplete}
      />

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #fbbf24;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #f59e0b;
        }
      `}</style>
    </>
  );
};

export default BuyNowModal;