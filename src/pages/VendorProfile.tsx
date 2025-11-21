import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Vendor, Service } from '../types';
import { api } from '../api/mockApi';
import { PortfolioGallery } from '../components/PortfolioGallery';
import { ServiceCard } from '../components/ServiceCard';
import { BookingDrawer } from '../components/BookingDrawer';
import { ProductCard } from '../components/ProductCard';
import {
  Star,
  MapPin,
  CheckCircle,
  Home,
  Building2,
  Calendar,
  ShoppingBag,
  ArrowLeft,
} from 'lucide-react';

export const VendorProfile = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [showBookingDrawer, setShowBookingDrawer] = useState(false);
  const [activeTab, setActiveTab] = useState<'services' | 'portfolio' | 'products'>('services');

  const bgColor = theme === 'dark' ? 'bg-dark-bg' : 'bg-pink-bg';
  const textColor = theme === 'dark' ? 'text-dark-text' : 'text-pink-text';
  const textSecondary = theme === 'dark' ? 'text-dark-textSecondary' : 'text-pink-textSecondary';
  const cardBg = theme === 'dark' ? 'bg-dark-card' : 'bg-pink-card';
  const accentColor = theme === 'dark' ? 'text-dark-accent' : 'text-pink-accent';

  useEffect(() => {
    if (id) {
      loadVendor();
    }
  }, [id]);

  const loadVendor = async () => {
    if (!id) return;
    setLoading(true);
    const data = await api.getVendor(id);
    setVendor(data);
    setLoading(false);
  };

  const handleBookService = (service: Service) => {
    setSelectedService(service);
    setShowBookingDrawer(true);
  };

  if (loading) {
    return (
      <div className={`min-h-screen ${bgColor} flex items-center justify-center`}>
        <div className={`${cardBg} rounded-lg p-8`}>
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-700 rounded w-48"></div>
            <div className="h-4 bg-gray-700 rounded w-32"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!vendor) {
    return (
      <div className={`min-h-screen ${bgColor} flex items-center justify-center`}>
        <div className={`${cardBg} rounded-lg p-8 text-center`}>
          <p className={textColor}>Vendor not found</p>
          <button
            onClick={() => navigate('/')}
            className={`mt-4 ${accentColor} hover:opacity-80`}
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${bgColor}`}>
      {/* Cover Image */}
      <div className="relative h-64 sm:h-80 overflow-hidden">
        <img
          src={vendor.coverImage}
          alt={vendor.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <button
          onClick={() => navigate(-1)}
          className={`absolute top-4 left-4 ${cardBg} rounded-full p-2 ${textColor} hover:opacity-80`}
        >
          <ArrowLeft size={20} />
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        {/* Profile Header */}
        <div className={`${cardBg} rounded-2xl p-6 shadow-lg mb-6`}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <img
              src={vendor.avatar}
              alt={vendor.name}
              className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
            />
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <h1 className={`text-2xl font-bold ${textColor}`}>{vendor.name}</h1>
                {vendor.verified && (
                  <CheckCircle className="text-blue-500" size={24} />
                )}
              </div>
              <p className={`${textSecondary} mb-2`}>{vendor.profession}</p>
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center space-x-1">
                  <Star className={`${accentColor} fill-current`} size={18} />
                  <span className={textColor}>{vendor.rating}</span>
                  <span className={textSecondary}>({vendor.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className={textSecondary} size={16} />
                  <span className={textSecondary}>{vendor.city}</span>
                </div>
                {vendor.homeVisit && (
                  <div className="flex items-center space-x-1">
                    <Home className={textSecondary} size={16} />
                    <span className={textSecondary}>Home Visit</span>
                  </div>
                )}
                {vendor.salonAddress && (
                  <div className="flex items-center space-x-1">
                    <Building2 className={textSecondary} size={16} />
                    <span className={textSecondary}>{vendor.salonName}</span>
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={() => {
                if (vendor.services.length > 0) {
                  handleBookService(vendor.services[0]);
                }
              }}
              className={`${theme === 'dark' ? 'bg-dark-accent hover:bg-opacity-90' : 'bg-pink-accent hover:bg-opacity-90'} text-white px-6 py-3 rounded-lg font-semibold transition flex items-center space-x-2`}
            >
              <Calendar size={20} />
              <span>Book Now</span>
            </button>
          </div>
        </div>

        {/* Bio */}
        <div className={`${cardBg} rounded-lg p-6 mb-6`}>
          <h2 className={`font-semibold text-lg ${textColor} mb-2`}>About</h2>
          <p className={textSecondary}>{vendor.bio}</p>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-6 border-b border-gray-800">
          {(['services', 'portfolio', 'products'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-medium transition ${
                activeTab === tab
                  ? `${accentColor} border-b-2 ${
                      theme === 'dark' ? 'border-dark-accent' : 'border-pink-accent'
                    }`
                  : textSecondary
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Services Tab */}
        {activeTab === 'services' && (
          <div className="space-y-4 mb-6">
            <h2 className={`text-xl font-bold ${textColor} mb-4`}>Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {vendor.services.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  selected={selectedService?.id === service.id}
                  onSelect={() => handleBookService(service)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Portfolio Tab */}
        {activeTab === 'portfolio' && (
          <div className="mb-6">
            <h2 className={`text-xl font-bold ${textColor} mb-4`}>Portfolio</h2>
            <PortfolioGallery images={vendor.portfolio} vendorName={vendor.name} />
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="mb-6">
            <h2 className={`text-xl font-bold ${textColor} mb-4 flex items-center space-x-2`}>
              <ShoppingBag size={24} />
              <span>Products</span>
            </h2>
            {vendor.products.length === 0 ? (
              <div className={`${cardBg} rounded-lg p-8 text-center`}>
                <p className={textSecondary}>No products available</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {vendor.products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Testimonials */}
        {vendor.testimonials.length > 0 && (
          <div className={`${cardBg} rounded-lg p-6 mb-6`}>
            <h2 className={`text-xl font-bold ${textColor} mb-4`}>Testimonials</h2>
            <div className="space-y-4">
              {vendor.testimonials.map((testimonial) => (
                <div key={testimonial.id} className={`${theme === 'dark' ? 'bg-dark-bg' : 'bg-gray-50'} rounded-lg p-4`}>
                  <div className="flex items-center space-x-3 mb-2">
                    <img
                      src={testimonial.userAvatar}
                      alt={testimonial.userName}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <div className={`font-semibold ${textColor}`}>{testimonial.userName}</div>
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={
                              i < testimonial.rating
                                ? `${accentColor} fill-current`
                                : textSecondary
                            }
                            size={14}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className={textSecondary}>{testimonial.comment}</p>
                  <p className={`${textSecondary} text-xs mt-2`}>{testimonial.date}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sticky Book Button (Mobile) */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-opacity-95 backdrop-blur-sm md:hidden z-40">
        <button
          onClick={() => {
            if (vendor.services.length > 0) {
              handleBookService(vendor.services[0]);
            }
          }}
          className={`w-full ${theme === 'dark' ? 'bg-dark-accent' : 'bg-pink-accent'} text-white py-3 rounded-lg font-semibold shadow-lg`}
        >
          Book Now
        </button>
      </div>

      {/* Booking Drawer */}
      {showBookingDrawer && vendor && (
        <BookingDrawer
          vendor={vendor}
          isOpen={showBookingDrawer}
          onClose={() => {
            setShowBookingDrawer(false);
            setSelectedService(null);
          }}
        />
      )}
    </div>
  );
};

