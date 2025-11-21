import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Vendor, Booking, Service, Product } from '../types';
import { api } from '../api/mockApi';
import {
  Calendar,
  DollarSign,
  Package,
  Plus,
  Edit,
  Trash2,
  Upload,
  Clock,
  CheckCircle,
} from 'lucide-react';

export const VendorDashboard = () => {
  const { theme } = useTheme();
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'services' | 'portfolio' | 'bookings' | 'products'>('overview');
  const [loading, setLoading] = useState(true);

  const bgColor = theme === 'dark' ? 'bg-dark-bg' : 'bg-pink-bg';
  const textColor = theme === 'dark' ? 'text-dark-text' : 'text-pink-text';
  const textSecondary = theme === 'dark' ? 'text-dark-textSecondary' : 'text-pink-textSecondary';
  const cardBg = theme === 'dark' ? 'bg-dark-card' : 'bg-pink-card';
  const borderColor = theme === 'dark' ? 'border-dark-border' : 'border-pink-border';
  const accentColor = theme === 'dark' ? 'text-dark-accent' : 'text-pink-accent';

  useEffect(() => {
    // In a real app, this would get the logged-in vendor's ID
    loadVendorData('1'); // Using first vendor as example
  }, []);

  const loadVendorData = async (vendorId: string) => {
    setLoading(true);
    const vendorData = await api.getVendor(vendorId);
    const vendorBookings = await api.getVendorBookings(vendorId);
    setVendor(vendorData);
    setBookings(vendorBookings);
    setLoading(false);
  };

  if (loading || !vendor) {
    return (
      <div className={`min-h-screen ${bgColor} flex items-center justify-center`}>
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  const upcomingBookings = bookings.filter(
    (b) => b.status === 'pending' || b.status === 'confirmed'
  );
  const totalRevenue = bookings
    .filter((b) => b.status === 'completed')
    .reduce((sum, b) => sum + b.price, 0);

  return (
    <div className={`min-h-screen ${bgColor} py-8`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className={`text-3xl font-bold ${textColor}`}>Vendor Dashboard</h1>
            <p className={`${textSecondary} mt-1`}>{vendor.name}</p>
          </div>
        </div>

        {/* Stats Cards */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className={`${cardBg} rounded-lg p-6`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`${textSecondary} text-sm mb-1`}>Upcoming Bookings</p>
                  <p className={`text-2xl font-bold ${textColor}`}>{upcomingBookings.length}</p>
                </div>
                <Calendar className={accentColor} size={32} />
              </div>
            </div>
            <div className={`${cardBg} rounded-lg p-6`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`${textSecondary} text-sm mb-1`}>Total Revenue</p>
                  <p className={`text-2xl font-bold ${textColor}`}>₹{totalRevenue}</p>
                </div>
                <DollarSign className={accentColor} size={32} />
              </div>
            </div>
            <div className={`${cardBg} rounded-lg p-6`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`${textSecondary} text-sm mb-1`}>Services</p>
                  <p className={`text-2xl font-bold ${textColor}`}>{vendor.services.length}</p>
                </div>
                <Package className={accentColor} size={32} />
              </div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex space-x-1 mb-6 border-b border-gray-800 overflow-x-auto">
          {(['overview', 'services', 'portfolio', 'bookings', 'products'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-medium transition capitalize whitespace-nowrap ${
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

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className={`${cardBg} rounded-lg p-6`}>
              <h2 className={`text-xl font-semibold ${textColor} mb-4`}>Recent Bookings</h2>
              {upcomingBookings.length === 0 ? (
                <p className={textSecondary}>No upcoming bookings</p>
              ) : (
                <div className="space-y-3">
                  {upcomingBookings.slice(0, 5).map((booking) => (
                    <div
                      key={booking.id}
                      className={`${theme === 'dark' ? 'bg-dark-bg' : 'bg-gray-50'} rounded-lg p-4`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className={`font-semibold ${textColor}`}>{booking.serviceName}</p>
                          <p className={`text-sm ${textSecondary}`}>
                            {new Date(booking.date).toLocaleDateString('en-IN')} at {booking.time}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className={`font-semibold ${accentColor}`}>₹{booking.price}</p>
                          <p className={`text-xs ${textSecondary}`}>{booking.status}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Services Tab */}
        {activeTab === 'services' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className={`text-xl font-semibold ${textColor}`}>Services</h2>
              <button
                className={`${theme === 'dark' ? 'bg-dark-accent' : 'bg-pink-accent'} text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:opacity-90`}
              >
                <Plus size={18} />
                <span>Add Service</span>
              </button>
            </div>
            <div className="space-y-3">
              {vendor.services.map((service) => (
                <div
                  key={service.id}
                  className={`${cardBg} ${borderColor} border rounded-lg p-4`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className={`font-semibold ${textColor}`}>{service.name}</h3>
                      <p className={`text-sm ${textSecondary} mt-1`}>{service.description}</p>
                      <div className="flex items-center space-x-4 mt-2 text-sm">
                        <span className={textSecondary}>Duration: {service.duration} min</span>
                        <span className={`font-semibold ${accentColor}`}>₹{service.price}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className={`${textSecondary} hover:opacity-80`}>
                        <Edit size={18} />
                      </button>
                      <button className={`${textSecondary} hover:opacity-80`}>
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Portfolio Tab */}
        {activeTab === 'portfolio' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-xl font-semibold ${textColor}`}>Portfolio</h2>
              <button
                className={`${theme === 'dark' ? 'bg-dark-accent' : 'bg-pink-accent'} text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:opacity-90`}
              >
                <Upload size={18} />
                <span>Upload Image</span>
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {vendor.portfolio.map((image, index) => (
                <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                  <img src={image} alt={`Portfolio ${index + 1}`} className="w-full h-full object-cover" />
                  <button className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <div>
            <h2 className={`text-xl font-semibold ${textColor} mb-4`}>All Bookings</h2>
            {bookings.length === 0 ? (
              <div className={`${cardBg} rounded-lg p-8 text-center`}>
                <p className={textSecondary}>No bookings yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <div
                    key={booking.id}
                    className={`${cardBg} ${borderColor} border rounded-lg p-6`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className={`font-semibold ${textColor}`}>{booking.serviceName}</h3>
                        <p className={`text-sm ${textSecondary} mt-1`}>
                          {new Date(booking.date).toLocaleDateString('en-IN', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}{' '}
                          at {booking.time}
                        </p>
                        <p className={`text-sm ${textSecondary}`}>
                          {booking.visitType === 'home' ? 'Home Visit' : 'Salon'}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className={`font-semibold text-lg ${accentColor}`}>₹{booking.price}</p>
                        <div className="flex items-center space-x-1 mt-2">
                          {booking.status === 'pending' && (
                            <button className={`${theme === 'dark' ? 'bg-dark-accent' : 'bg-pink-accent'} text-white px-3 py-1 rounded text-sm hover:opacity-90`}>
                              Confirm
                            </button>
                          )}
                          <span className={`text-sm ${textSecondary}`}>{booking.status}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-xl font-semibold ${textColor}`}>Products</h2>
              <button
                className={`${theme === 'dark' ? 'bg-dark-accent' : 'bg-pink-accent'} text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:opacity-90`}
              >
                <Plus size={18} />
                <span>Add Product</span>
              </button>
            </div>
            {vendor.products.length === 0 ? (
              <div className={`${cardBg} rounded-lg p-8 text-center`}>
                <p className={textSecondary}>No products yet</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {vendor.products.map((product) => (
                  <div key={product.id} className={`${cardBg} ${borderColor} border rounded-lg overflow-hidden`}>
                    <div className="aspect-square">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className={`font-semibold ${textColor}`}>{product.name}</h3>
                      <p className={`text-sm ${textSecondary} mt-1`}>{product.description}</p>
                      <div className="flex items-center justify-between mt-3">
                        <span className={`font-bold ${accentColor}`}>₹{product.price}</span>
                        <div className="flex space-x-2">
                          <button className={`${textSecondary} hover:opacity-80`}>
                            <Edit size={18} />
                          </button>
                          <button className={`${textSecondary} hover:opacity-80`}>
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

