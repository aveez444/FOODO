import React, { useContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CartContext, CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Homepage from './pages/Homepage';
import Account from './pages/Account';
import ProductDetailPage from './pages/Almonds';
import ProductDetailPage1 from './pages/WholeCashews';
import FreshGreenPistachios from './pages/FreshGreenPistachios';
import ProductDetailPageMedjoolDates from './pages/MedjoolDates';
import PremiumKhajoorDates from './pages/PremiumKhajoorDates';
import OrganicAlmonds from './pages/OrganicAlmonds';
import RoastedCashews from './pages/RoastedCashews';
import SaffronPistachios from './pages/SaffronPistachios';
import FoodOMixedNuts from './pages/FoodOMixedNuts';
import CartItem from './components/CartItem';
import CheckoutModal from './components/CheckoutModal';
import { ShoppingCart } from 'lucide-react';

function Cart() {
  const { cartItems, updateQuantity, removeFromCart, cartTotal, clearCart } = useContext(CartContext);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isCheckoutOpen, setCheckoutOpen] = useState(false);

  const toggleSelect = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const selectAll = () => {
    setSelectedItems(cartItems.map((item) => item.id));
  };

  const deselectAll = () => {
    setSelectedItems([]);
  };

  const handleCheckout = () => {
    if (selectedItems.length > 0) {
      setCheckoutOpen(true);
    }
  };

  const handleOrderComplete = () => {
    selectedItems.forEach((id) => removeFromCart(id));
    setSelectedItems([]);
    setCheckoutOpen(false);
  };

  const selectedTotal = cartItems
    .filter((item) => selectedItems.includes(item.id))
    .reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-white p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Your Cart</h1>
      {cartItems.length === 0 ? (
        <div className="text-center text-neutral-600">
          <ShoppingCart size={48} className="mx-auto mb-4 text-amber-500" />
          <p>Your cart is empty.</p>
        </div>
      ) : (
        <>
          <div className="flex justify-between mb-4">
            <button onClick={selectAll} className="text-amber-600 text-sm font-medium">
              Select All
            </button>
            <button onClick={deselectAll} className="text-amber-600 text-sm font-medium">
              Deselect All
            </button>
          </div>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onUpdateQuantity={updateQuantity}
                onRemove={removeFromCart}
                selected={selectedItems.includes(item.id)}
                onSelect={toggleSelect}
              />
            ))}
          </div>
          <div className="mt-6 border-t pt-4">
            <div className="flex justify-between font-semibold text-lg">
              <span>Total ({selectedItems.length} items)</span>
              <span>₹{selectedTotal.toFixed(2)}</span>
            </div>
            <button
              onClick={handleCheckout}
              disabled={selectedItems.length === 0}
              className="w-full mt-4 bg-amber-500 text-white rounded-lg py-3 font-semibold hover:bg-amber-600 disabled:bg-gray-300"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setCheckoutOpen(false)}
        items={cartItems.filter((item) => selectedItems.includes(item.id))}
        total={selectedTotal}
        onOrderComplete={handleOrderComplete}
      />
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/account" element={<Account />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/PremiumAlmonds" element={<ProductDetailPage />} />
          <Route path="/WholeCashews" element={<ProductDetailPage1 />} />
          <Route path="/fresh-green-pistachios" element={<FreshGreenPistachios />} />
          <Route path="/medjool-dates" element={<ProductDetailPageMedjoolDates />} />
          <Route path="/khajoor-dates" element={<PremiumKhajoorDates />} />
          <Route path="/organic-almonds" element={<OrganicAlmonds />} />
          <Route path="/roasted-cashews" element={<RoastedCashews />} />
          <Route path="/saffron-pistachios" element={<SaffronPistachios />} />
          <Route path="/food-o-mixed-nuts" element={<FoodOMixedNuts />} />
        </Routes>
        <Footer />
      </Router>
    </CartProvider>
  );
}

export default App;