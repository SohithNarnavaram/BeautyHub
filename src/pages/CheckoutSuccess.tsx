import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { CheckCircle, Package, ArrowLeft, ShoppingBag } from 'lucide-react';

export const CheckoutSuccess = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const bgColor = theme === 'dark' ? 'bg-dark-bg' : 'bg-pink-bg';
  const textColor = theme === 'dark' ? 'text-dark-text' : 'text-pink-text';
  const textSecondary = theme === 'dark' ? 'text-dark-textSecondary' : 'text-pink-textSecondary';
  const cardBg = theme === 'dark' ? 'bg-dark-card' : 'bg-pink-card';
  const accentColor = theme === 'dark' ? 'text-dark-accent' : 'text-pink-accent';

  return (
    <div className={`min-h-screen ${bgColor} flex items-center justify-center py-12 px-4`}>
      <div className={`${cardBg} rounded-2xl p-8 sm:p-12 max-w-2xl w-full text-center`}>
        <div className="flex justify-center mb-6">
          <div className={`${theme === 'dark' ? 'bg-dark-accent' : 'bg-pink-accent'} rounded-full p-4`}>
            <CheckCircle className="text-white" size={64} />
          </div>
        </div>
        <h1 className={`text-3xl font-bold ${textColor} mb-4`}>Order Placed Successfully!</h1>
        <p className={`${textSecondary} text-lg mb-8`}>
          Thank you for your purchase. Your order will be processed and shipped soon.
        </p>
        <div className={`${theme === 'dark' ? 'bg-dark-bg' : 'bg-gray-50'} rounded-lg p-6 mb-8`}>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Package className={accentColor} size={24} />
            <span className={`font-semibold ${textColor}`}>Order Details</span>
          </div>
          <p className={`${textSecondary} text-sm`}>
            You'll receive an email confirmation with tracking details shortly.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate('/dashboard')}
            className={`${theme === 'dark' ? 'bg-dark-accent' : 'bg-pink-accent'} text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 flex items-center justify-center space-x-2`}
          >
            <ShoppingBag size={18} />
            <span>View Orders</span>
          </button>
          <button
            onClick={() => navigate('/')}
            className={`${theme === 'dark' ? 'bg-dark-bg' : 'bg-gray-100'} ${textColor} px-6 py-3 rounded-lg font-semibold hover:opacity-80 flex items-center justify-center space-x-2`}
          >
            <ArrowLeft size={18} />
            <span>Continue Shopping</span>
          </button>
        </div>
      </div>
    </div>
  );
};

