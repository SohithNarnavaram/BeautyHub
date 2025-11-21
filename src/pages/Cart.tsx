import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { CartItem } from '../types';
import { api } from '../api/mockApi';
import { ShoppingCart, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';

export const Cart = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

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
    setLoading(true);
    const data = await api.getCart();
    setCart(data);
    setLoading(false);
  };

  const updateQuantity = async (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      await api.removeFromCart(productId);
    } else {
      await api.updateCartQuantity(productId, newQuantity);
    }
    loadCart();
  };

  const removeItem = async (productId: string) => {
    await api.removeFromCart(productId);
    loadCart();
  };

  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  if (loading) {
    return (
      <div className={`min-h-screen ${bgColor} flex items-center justify-center`}>
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${bgColor} py-8`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className={`text-3xl font-bold ${textColor} mb-8 flex items-center space-x-2`}>
          <ShoppingCart className={accentColor} size={32} />
          <span>Shopping Cart</span>
        </h1>

        {cart.length === 0 ? (
          <div className={`${cardBg} rounded-lg p-12 text-center`}>
            <ShoppingCart className={`${textSecondary} mx-auto mb-4`} size={64} />
            <p className={`${textColor} text-lg mb-2`}>Your cart is empty</p>
            <p className={`${textSecondary} mb-6`}>Add some products to get started</p>
            <button
              onClick={() => navigate('/search')}
              className={`${theme === 'dark' ? 'bg-dark-accent' : 'bg-pink-accent'} text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90`}
            >
              Browse Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.product.id}
                  className={`${cardBg} ${borderColor} border rounded-lg p-6`}
                >
                  <div className="flex flex-col sm:flex-row gap-4">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full sm:w-32 h-32 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className={`font-semibold text-lg ${textColor}`}>{item.product.name}</h3>
                      <p className={`text-sm ${textSecondary} mt-1`}>{item.product.description}</p>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className={`${theme === 'dark' ? 'bg-dark-bg' : 'bg-gray-100'} ${textColor} p-2 rounded-lg hover:opacity-80`}
                          >
                            <Minus size={18} />
                          </button>
                          <span className={`font-semibold ${textColor} w-8 text-center`}>
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className={`${theme === 'dark' ? 'bg-dark-bg' : 'bg-gray-100'} ${textColor} p-2 rounded-lg hover:opacity-80`}
                          >
                            <Plus size={18} />
                          </button>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className={`font-bold text-lg ${accentColor}`}>
                            ₹{item.product.price * item.quantity}
                          </span>
                          <button
                            onClick={() => removeItem(item.product.id)}
                            className={`${textSecondary} hover:text-red-500`}
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className={`${cardBg} ${borderColor} border rounded-lg p-6 sticky top-24`}>
                <h2 className={`text-xl font-semibold ${textColor} mb-4`}>Order Summary</h2>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className={textSecondary}>Subtotal</span>
                    <span className={textColor}>₹{total}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={textSecondary}>Shipping</span>
                    <span className={textColor}>₹100</span>
                  </div>
                  <div className="border-t border-gray-800 pt-3">
                    <div className="flex justify-between">
                      <span className={`font-semibold text-lg ${textColor}`}>Total</span>
                      <span className={`font-bold text-xl ${accentColor}`}>₹{total + 100}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => navigate('/checkout')}
                  className={`w-full ${theme === 'dark' ? 'bg-dark-accent' : 'bg-pink-accent'} text-white py-3 rounded-lg font-semibold hover:opacity-90 flex items-center justify-center space-x-2`}
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

