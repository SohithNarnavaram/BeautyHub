import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { CartItem } from '../types';
import { api } from '../api/mockApi';
import { CreditCard, Lock } from 'lucide-react';

export const Checkout = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    paymentMethod: 'card',
  });
  const [processing, setProcessing] = useState(false);

  const bgColor = theme === 'dark' ? 'bg-dark-bg' : 'bg-pink-bg';
  const textColor = theme === 'dark' ? 'text-dark-text' : 'text-pink-text';
  const textSecondary = theme === 'dark' ? 'text-dark-textSecondary' : 'text-pink-textSecondary';
  const cardBg = theme === 'dark' ? 'bg-dark-card' : 'bg-pink-card';
  const borderColor = theme === 'dark' ? 'border-dark-border' : 'border-pink-border';
  const accentColor = theme === 'dark' ? 'text-dark-accent' : 'text-pink-accent';

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    const data = await api.getCart();
    setCart(data);
  };

  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0) + 100;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    await api.clearCart();
    setProcessing(false);
    navigate('/checkout-success');
  };

  if (cart.length === 0) {
    return (
      <div className={`min-h-screen ${bgColor} flex items-center justify-center`}>
        <div className={`${cardBg} rounded-lg p-8 text-center`}>
          <p className={textColor}>Your cart is empty</p>
          <button
            onClick={() => navigate('/cart')}
            className={`mt-4 ${accentColor} hover:opacity-80`}
          >
            Go to Cart
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${bgColor} py-8`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className={`text-3xl font-bold ${textColor} mb-8`}>Checkout</h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Information */}
            <div className={`${cardBg} rounded-lg p-6`}>
              <h2 className={`text-xl font-semibold ${textColor} mb-4`}>Shipping Information</h2>
              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium ${textColor} mb-2`}>Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full p-3 rounded-lg ${theme === 'dark' ? 'bg-dark-bg text-dark-text border-dark-border' : 'bg-gray-50 text-pink-text border-pink-border'} border focus:outline-none focus:ring-2 ${
                      theme === 'dark' ? 'focus:ring-dark-accent' : 'focus:ring-pink-accent'
                    }`}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium ${textColor} mb-2`}>Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full p-3 rounded-lg ${theme === 'dark' ? 'bg-dark-bg text-dark-text border-dark-border' : 'bg-gray-50 text-pink-text border-pink-border'} border focus:outline-none focus:ring-2 ${
                        theme === 'dark' ? 'focus:ring-dark-accent' : 'focus:ring-pink-accent'
                      }`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${textColor} mb-2`}>Phone</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={`w-full p-3 rounded-lg ${theme === 'dark' ? 'bg-dark-bg text-dark-text border-dark-border' : 'bg-gray-50 text-pink-text border-pink-border'} border focus:outline-none focus:ring-2 ${
                        theme === 'dark' ? 'focus:ring-dark-accent' : 'focus:ring-pink-accent'
                      }`}
                    />
                  </div>
                </div>
                <div>
                  <label className={`block text-sm font-medium ${textColor} mb-2`}>Address</label>
                  <textarea
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    rows={3}
                    className={`w-full p-3 rounded-lg ${theme === 'dark' ? 'bg-dark-bg text-dark-text border-dark-border' : 'bg-gray-50 text-pink-text border-pink-border'} border focus:outline-none focus:ring-2 ${
                      theme === 'dark' ? 'focus:ring-dark-accent' : 'focus:ring-pink-accent'
                    }`}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium ${textColor} mb-2`}>City</label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className={`w-full p-3 rounded-lg ${theme === 'dark' ? 'bg-dark-bg text-dark-text border-dark-border' : 'bg-gray-50 text-pink-text border-pink-border'} border focus:outline-none focus:ring-2 ${
                        theme === 'dark' ? 'focus:ring-dark-accent' : 'focus:ring-pink-accent'
                      }`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${textColor} mb-2`}>Pincode</label>
                    <input
                      type="text"
                      required
                      value={formData.pincode}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                      className={`w-full p-3 rounded-lg ${theme === 'dark' ? 'bg-dark-bg text-dark-text border-dark-border' : 'bg-gray-50 text-pink-text border-pink-border'} border focus:outline-none focus:ring-2 ${
                        theme === 'dark' ? 'focus:ring-dark-accent' : 'focus:ring-pink-accent'
                      }`}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className={`${cardBg} rounded-lg p-6`}>
              <h2 className={`text-xl font-semibold ${textColor} mb-4 flex items-center space-x-2`}>
                <CreditCard className={accentColor} size={24} />
                <span>Payment Method</span>
              </h2>
              <div className="space-y-3">
                <label className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer ${
                  formData.paymentMethod === 'card'
                    ? theme === 'dark' ? 'border-dark-accent bg-dark-accent/20' : 'border-pink-accent bg-pink-accent/20'
                    : borderColor
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={formData.paymentMethod === 'card'}
                    onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                    className="mr-2"
                  />
                  <CreditCard size={20} />
                  <span className={textColor}>Credit/Debit Card</span>
                </label>
                <label className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer ${
                  formData.paymentMethod === 'upi'
                    ? theme === 'dark' ? 'border-dark-accent bg-dark-accent/20' : 'border-pink-accent bg-pink-accent/20'
                    : borderColor
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    value="upi"
                    checked={formData.paymentMethod === 'upi'}
                    onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                    className="mr-2"
                  />
                  <span className={textColor}>UPI</span>
                </label>
                <label className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer ${
                  formData.paymentMethod === 'cod'
                    ? theme === 'dark' ? 'border-dark-accent bg-dark-accent/20' : 'border-pink-accent bg-pink-accent/20'
                    : borderColor
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                    className="mr-2"
                  />
                  <span className={textColor}>Cash on Delivery</span>
                </label>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className={`${cardBg} ${borderColor} border rounded-lg p-6 sticky top-24`}>
              <h2 className={`text-xl font-semibold ${textColor} mb-4`}>Order Summary</h2>
              <div className="space-y-3 mb-6">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex justify-between text-sm">
                    <span className={textSecondary}>
                      {item.product.name} x {item.quantity}
                    </span>
                    <span className={textColor}>₹{item.product.price * item.quantity}</span>
                  </div>
                ))}
                <div className="border-t border-gray-800 pt-3 space-y-2">
                  <div className="flex justify-between">
                    <span className={textSecondary}>Subtotal</span>
                    <span className={textColor}>₹{total - 100}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={textSecondary}>Shipping</span>
                    <span className={textColor}>₹100</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-800">
                    <span className={`font-semibold text-lg ${textColor}`}>Total</span>
                    <span className={`font-bold text-xl ${accentColor}`}>₹{total}</span>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                disabled={processing}
                className={`w-full ${theme === 'dark' ? 'bg-dark-accent' : 'bg-pink-accent'} text-white py-3 rounded-lg font-semibold hover:opacity-90 disabled:opacity-50 flex items-center justify-center space-x-2`}
              >
                {processing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Lock size={18} />
                    <span>Place Order</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

