import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Booking } from '../types';
import { api } from '../api/mockApi';
import {
  Calendar,
  Clock,
  MapPin,
  Heart,
  ShoppingBag,
  CheckCircle,
  XCircle,
  Package,
} from 'lucide-react';

export const UserDashboard = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [activeTab, setActiveTab] = useState<'bookings' | 'saved' | 'orders'>('bookings');
  const [loading, setLoading] = useState(true);

  const bgColor = theme === 'dark' ? 'bg-dark-bg' : 'bg-pink-bg';
  const textColor = theme === 'dark' ? 'text-dark-text' : 'text-pink-text';
  const textSecondary = theme === 'dark' ? 'text-dark-textSecondary' : 'text-pink-textSecondary';
  const cardBg = theme === 'dark' ? 'bg-dark-card' : 'bg-pink-card';
  const borderColor = theme === 'dark' ? 'border-dark-border' : 'border-pink-border';
  const accentColor = theme === 'dark' ? 'text-dark-accent' : 'text-pink-accent';

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    setLoading(true);
    const data = await api.getUserBookings();
    setBookings(data);
    setLoading(false);
  };

  const upcomingBookings = bookings.filter(
    (b) => b.status === 'pending' || b.status === 'confirmed'
  );
  const pastBookings = bookings.filter((b) => b.status === 'completed' || b.status === 'cancelled');

  const getStatusColor = (status: Booking['status']) => {
    switch (status) {
      case 'confirmed':
        return 'text-green-500';
      case 'pending':
        return 'text-yellow-500';
      case 'completed':
        return 'text-blue-500';
      case 'cancelled':
        return 'text-red-500';
      default:
        return textSecondary;
    }
  };

  const getStatusIcon = (status: Booking['status']) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="text-green-500" size={20} />;
      case 'pending':
        return <Clock className="text-yellow-500" size={20} />;
      case 'completed':
        return <CheckCircle className="text-blue-500" size={20} />;
      case 'cancelled':
        return <XCircle className="text-red-500" size={20} />;
      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen ${bgColor} py-8`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className={`text-3xl font-bold ${textColor} mb-8`}>My Dashboard</h1>

        {/* Tabs */}
        <div className="flex space-x-1 mb-6 border-b border-gray-800">
          {(['bookings', 'saved', 'orders'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-medium transition capitalize ${
                activeTab === tab
                  ? `${accentColor} border-b-2 ${
                      theme === 'dark' ? 'border-dark-accent' : 'border-pink-accent'
                    }`
                  : textSecondary
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <div className="space-y-6">
            {/* Upcoming Bookings */}
            <div>
              <h2 className={`text-xl font-semibold ${textColor} mb-4 flex items-center space-x-2`}>
                <Calendar className={accentColor} size={24} />
                <span>Upcoming Bookings</span>
              </h2>
              {loading ? (
                <div className="space-y-4">
                  {[1, 2].map((i) => (
                    <div key={i} className={`${cardBg} rounded-lg h-32 animate-pulse`} />
                  ))}
                </div>
              ) : upcomingBookings.length === 0 ? (
                <div className={`${cardBg} rounded-lg p-8 text-center`}>
                  <Calendar className={`${textSecondary} mx-auto mb-4`} size={48} />
                  <p className={textSecondary}>No upcoming bookings</p>
                  <button
                    onClick={() => navigate('/search')}
                    className={`mt-4 ${accentColor} hover:opacity-80`}
                  >
                    Book a service
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {upcomingBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className={`${cardBg} ${borderColor} border rounded-lg p-6`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <h3 className={`font-semibold text-lg ${textColor}`}>
                              {booking.serviceName}
                            </h3>
                            {getStatusIcon(booking.status)}
                          </div>
                          <p className={textSecondary}>{booking.vendorName}</p>
                          <div className="flex flex-wrap items-center gap-4 text-sm">
                            <div className="flex items-center space-x-1">
                              <Calendar className={textSecondary} size={16} />
                              <span className={textSecondary}>
                                {new Date(booking.date).toLocaleDateString('en-IN', {
                                  weekday: 'long',
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric',
                                })}
                              </span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className={textSecondary} size={16} />
                              <span className={textSecondary}>{booking.time}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MapPin className={textSecondary} size={16} />
                              <span className={textSecondary}>
                                {booking.visitType === 'home' ? 'Home Visit' : 'Salon'}
                              </span>
                            </div>
                          </div>
                          {booking.address && (
                            <p className={`text-sm ${textSecondary}`}>{booking.address}</p>
                          )}
                        </div>
                        <div className="mt-4 sm:mt-0 sm:text-right">
                          <div className={`font-bold text-xl ${accentColor}`}>₹{booking.price}</div>
                          <div className={`text-sm mt-1 ${getStatusColor(booking.status)}`}>
                            {booking.status.toUpperCase()}
                          </div>
                          <div className={`text-xs ${textSecondary} mt-2`}>
                            Code: {booking.bookingCode}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Past Bookings */}
            <div>
              <h2 className={`text-xl font-semibold ${textColor} mb-4`}>Past Bookings</h2>
              {pastBookings.length === 0 ? (
                <div className={`${cardBg} rounded-lg p-8 text-center`}>
                  <p className={textSecondary}>No past bookings</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {pastBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className={`${cardBg} ${borderColor} border rounded-lg p-6 opacity-75`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <h3 className={`font-semibold ${textColor}`}>{booking.serviceName}</h3>
                            {getStatusIcon(booking.status)}
                          </div>
                          <p className={textSecondary}>{booking.vendorName}</p>
                          <p className={`text-sm ${textSecondary}`}>
                            {new Date(booking.date).toLocaleDateString('en-IN')} at {booking.time}
                          </p>
                        </div>
                        <div className="mt-4 sm:mt-0">
                          {booking.status === 'completed' && (
                            <button
                              className={`${theme === 'dark' ? 'bg-dark-accent' : 'bg-pink-accent'} text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90`}
                            >
                              Write Review
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Saved Tab */}
        {activeTab === 'saved' && (
          <div>
            <h2 className={`text-xl font-semibold ${textColor} mb-4 flex items-center space-x-2`}>
              <Heart className={accentColor} size={24} />
              <span>Saved Vendors</span>
            </h2>
            <div className={`${cardBg} rounded-lg p-8 text-center`}>
              <Heart className={`${textSecondary} mx-auto mb-4`} size={48} />
              <p className={textSecondary}>No saved vendors yet</p>
              <button
                onClick={() => navigate('/search')}
                className={`mt-4 ${accentColor} hover:opacity-80`}
              >
                Explore vendors
              </button>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div>
            <h2 className={`text-xl font-semibold ${textColor} mb-4 flex items-center space-x-2`}>
              <ShoppingBag className={accentColor} size={24} />
              <span>Product Orders</span>
            </h2>
            <div className={`${cardBg} rounded-lg p-8 text-center`}>
              <Package className={`${textSecondary} mx-auto mb-4`} size={48} />
              <p className={textSecondary}>No orders yet</p>
              <button
                onClick={() => navigate('/search')}
                className={`mt-4 ${accentColor} hover:opacity-80`}
              >
                Browse products
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

