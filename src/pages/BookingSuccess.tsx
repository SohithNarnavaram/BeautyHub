import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { CheckCircle, Calendar, Home, ArrowLeft } from 'lucide-react';

export const BookingSuccess = () => {
  const { code } = useParams<{ code: string }>();
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
        <h1 className={`text-3xl font-bold ${textColor} mb-4`}>Booking Confirmed!</h1>
        <p className={`${textSecondary} text-lg mb-8`}>
          Your appointment has been successfully booked. You'll receive a confirmation email shortly.
        </p>
        <div className={`${theme === 'dark' ? 'bg-dark-bg' : 'bg-gray-50'} rounded-lg p-6 mb-8`}>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Calendar className={accentColor} size={24} />
            <span className={`font-semibold ${textColor}`}>Booking Code</span>
          </div>
          <div className={`text-4xl font-bold ${accentColor} font-mono`}>{code}</div>
          <p className={`${textSecondary} text-sm mt-2`}>Save this code for your records</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate('/dashboard')}
            className={`${theme === 'dark' ? 'bg-dark-accent' : 'bg-pink-accent'} text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90`}
          >
            View My Bookings
          </button>
          <button
            onClick={() => navigate('/')}
            className={`${theme === 'dark' ? 'bg-dark-bg' : 'bg-gray-100'} ${textColor} px-6 py-3 rounded-lg font-semibold hover:opacity-80 flex items-center justify-center space-x-2`}
          >
            <ArrowLeft size={18} />
            <span>Back to Home</span>
          </button>
        </div>
      </div>
    </div>
  );
};

