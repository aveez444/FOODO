import React from 'react';
import { motion } from 'framer-motion';
import { Minus, Plus, X, Check } from 'lucide-react';

const CartItem = ({ item, onUpdateQuantity, onRemove, selected, onSelect }) => {
  return (
    <motion.div 
      className={`relative p-4 rounded-2xl border-2 transition-all duration-300 ${
        selected 
          ? 'border-amber-400 bg-amber-50 shadow-lg' 
          : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
      }`}
      whileHover={{ scale: 1.02 }}
      layout
    >
      {/* Selection Indicator */}
      <div className="absolute -top-2 -left-2">
        <motion.div
          initial={false}
          animate={{ 
            scale: selected ? 1 : 0,
            rotate: selected ? 0 : -180 
          }}
          className="w-6 h-6 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg"
        >
          <Check size={14} className="text-white" />
        </motion.div>
      </div>

      <div className="flex items-center gap-4">
        {/* Checkbox */}
        <div className="relative">
          <input
            type="checkbox"
            checked={selected}
            onChange={() => onSelect(item.id)}
            className="sr-only"
          />
          <motion.div
            onClick={() => onSelect(item.id)}
            className={`w-6 h-6 rounded-lg border-2 cursor-pointer flex items-center justify-center transition-all duration-200 ${
              selected 
                ? 'border-amber-400 bg-gradient-to-r from-amber-400 to-orange-400' 
                : 'border-gray-300 hover:border-amber-400'
            }`}
            whileTap={{ scale: 0.9 }}
          >
            {selected && <Check size={14} className="text-white" />}
          </motion.div>
        </div>

        {/* Product Image */}
        <div className="relative">
          <img
            src={item.image}
            alt={item.title}
            className="h-20 w-20 object-cover rounded-xl shadow-md"
          />
          {selected && (
            <div className="absolute inset-0 bg-amber-400/20 rounded-xl"></div>
          )}
        </div>

        {/* Product Details */}
        <div className="flex-1">
          <h3 className="font-bold text-gray-800 mb-1 line-clamp-2">{item.title}</h3>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl font-bold text-amber-600">₹{item.price.toFixed(2)}</span>
            <span className="text-sm text-gray-400">per item</span>
          </div>
          
          {/* Quantity Controls */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-600">Quantity:</span>
            <div className="flex items-center bg-gray-100 rounded-xl p-1">
              <motion.button
                onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                className="p-2 hover:bg-white rounded-lg transition-colors duration-200"
                whileTap={{ scale: 0.9 }}
              >
                <Minus size={16} className="text-gray-600" />
              </motion.button>
              
              <div className="px-4 py-2 bg-white rounded-lg mx-1 min-w-[50px] text-center">
                <span className="font-bold text-gray-800">{item.quantity}</span>
              </div>
              
              <motion.button
                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                className="p-2 hover:bg-white rounded-lg transition-colors duration-200"
                whileTap={{ scale: 0.9 }}
              >
                <Plus size={16} className="text-gray-600" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Price and Remove */}
        <div className="text-right">
          <div className="mb-2">
            <p className="text-sm text-gray-500">Subtotal</p>
            <p className="text-xl font-bold text-gray-800">
              ₹{(item.price * item.quantity).toFixed(2)}
            </p>
          </div>
          
          <motion.button 
            onClick={() => onRemove(item.id)}
            className="p-2 bg-red-50 hover:bg-red-100 text-red-500 rounded-xl transition-all duration-200"
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
          >
            <X size={18} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default CartItem;