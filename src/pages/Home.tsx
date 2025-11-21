import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { SearchBar } from '../components/SearchBar';
import { VendorCard } from '../components/VendorCard';
import { api } from '../api/mockApi';
import { Vendor, Gender } from '../types';
import { Sparkles, Star, TrendingUp, ArrowRight, Award, Users, Calendar, Zap } from 'lucide-react';

export const Home = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [featuredVendors, setFeaturedVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);

  const bgColor = theme === 'dark' ? 'bg-dark-bg' : 'bg-pink-bg';
  const textColor = theme === 'dark' ? 'text-dark-text' : 'text-pink-text';
  const textSecondary = theme === 'dark' ? 'text-dark-textSecondary' : 'text-pink-textSecondary';
  const accentColor = theme === 'dark' ? 'text-dark-accent' : 'text-pink-accent';
  const cardBg = theme === 'dark' ? 'bg-dark-card' : 'bg-pink-card';
  const cardHover = theme === 'dark' ? 'hover:bg-dark-cardHover' : 'hover:bg-pink-cardHover';

  useEffect(() => {
    const loadFeatured = async () => {
      const vendors = await api.getAllVendors();
      // Filter vendors by gender based on theme
      const filteredVendors = theme === 'dark' 
        ? vendors.filter(v => v.gender === 'male' || v.gender === 'unisex')
        : vendors.filter(v => v.gender === 'female' || v.gender === 'unisex');
      // Get top rated vendors
      const sorted = filteredVendors.sort((a, b) => b.rating - a.rating).slice(0, 6);
      setFeaturedVendors(sorted);
      setLoading(false);
    };
    loadFeatured();
  }, [theme]);

  const handleSearch = (filters: {
    city: string;
    service?: string;
    gender?: Gender;
    homeVisit?: boolean;
  }) => {
    const params = new URLSearchParams();
    params.set('city', filters.city);
    if (filters.service) params.set('service', filters.service);
    if (filters.gender) params.set('gender', filters.gender);
    if (filters.homeVisit !== undefined) params.set('homeVisit', String(filters.homeVisit));
    navigate(`/search?${params.toString()}`);
  };

  // Men's categories (Dark theme)
  const mensCategories = [
    { name: 'Barber', icon: '✂️', count: 28 },
    { name: 'Haircut', icon: '💇', count: 35 },
    { name: 'Beard Grooming', icon: '🧔', count: 22 },
    { name: 'Hair Styling', icon: '💇‍♂️', count: 18 },
    { name: 'Spa & Massage', icon: '🧖', count: 15 },
    { name: 'Grooming', icon: '✨', count: 20 },
  ];

  // Women's categories (Pink theme)
  const womensCategories = [
    { name: 'Hair Styling', icon: '💇', count: 45 },
    { name: 'Makeup', icon: '💄', count: 32 },
    { name: 'Nail Art', icon: '💅', count: 22 },
    { name: 'Beautician', icon: '✨', count: 38 },
    { name: 'Spa', icon: '🧖', count: 15 },
    { name: 'Facial', icon: '🌸', count: 28 },
  ];

  const categories = theme === 'dark' ? mensCategories : womensCategories;

  return (
    <div className={`min-h-screen ${bgColor} overflow-hidden`}>
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Simple background for dark theme */}
        <div className={`absolute inset-0 ${
          theme === 'dark' 
            ? 'bg-dark-bg' 
            : 'bg-gradient-to-br from-pink-bg via-[#fff9fc] to-white'
        }`} />
        
        {/* Minimal decorative elements - only for pink theme */}
        {theme !== 'dark' && (
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
            <motion.div
              animate={{
                y: [0, -30, 0],
                rotate: [0, 10, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className={`absolute top-20 left-10 ${accentColor} opacity-10`}
            >
              <Sparkles size={120} />
            </motion.div>
            <motion.div
              animate={{
                y: [0, 20, 0],
                rotate: [0, -15, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
              className={`absolute bottom-20 right-10 ${accentColor} opacity-10`}
            >
              <Star size={100} />
            </motion.div>
          </div>
        )}

        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${
          theme === 'dark' ? 'py-12 sm:py-16' : 'py-20 sm:py-32'
        } relative z-10`}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: theme === 'dark' ? 0.3 : 0.6 }}
            className={`text-center ${theme === 'dark' ? 'space-y-4' : 'space-y-8'}`}
          >
            {theme === 'dark' ? (
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-3xl sm:text-4xl md:text-5xl font-semibold text-dark-text leading-tight"
              >
                Find Your Perfect
                <br />
                <span className="block mt-2 text-dark-accent">
                  Grooming Professional
                </span>
              </motion.h1>
            ) : (
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-tight"
              >
                Find Your Perfect
                <br />
                <span className="block mt-2 gradient-text-pink">
                  Beauty Professional
                </span>
              </motion.h1>
            )}
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`${
                theme === 'dark' 
                  ? 'text-base sm:text-lg font-normal' 
                  : 'text-xl sm:text-2xl font-light'
              } ${textSecondary} max-w-3xl mx-auto ${
                theme === 'dark' ? 'leading-normal' : 'leading-relaxed'
              }`}
            >
              {theme === 'dark' 
                ? 'Book appointments with verified barbers, stylists, and grooming professionals in Bangalore'
                : 'Book appointments with verified beauticians, barbers, stylists, and makeup artists in Bangalore'}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className={`max-w-4xl mx-auto ${theme === 'dark' ? 'mt-6' : 'mt-12'}`}
            >
              <SearchBar onSearch={handleSearch} />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Promotional Banner - Simplified for dark theme */}
      {theme !== 'dark' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`${cardBg} rounded-3xl p-8 md:p-12 overflow-hidden relative`}
          >
            <div className={`absolute inset-0 bg-gradient-to-r from-pink-accent/10 via-transparent to-pink-accentAlt/10`} />
            <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
              <div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className={`inline-block px-4 py-2 rounded-full bg-pink-accent/20 text-pink-accent text-sm font-bold mb-4`}
                >
                  🎉 New User Offer
                </motion.div>
                <h2 className={`text-3xl md:text-4xl font-bold ${textColor} mb-4`}>
                  Get <span className={accentColor}>20% Off</span> Your First Booking
                </h2>
                <p className={`${textSecondary} text-lg mb-6`}>
                  Book your first appointment and enjoy exclusive discounts on premium beauty services
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/search')}
                  className={`bg-pink-accent hover:bg-pink-accentHover text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all`}
                >
                  Explore Services
                </motion.button>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="hidden md:block"
              >
                <div className="grid grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <motion.div
                      key={i}
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                      className={`${cardHover} rounded-2xl p-4 border border-pink-border`}
                    >
                      <div className={`w-12 h-12 rounded-xl bg-pink-accent/20 flex items-center justify-center mb-2`}>
                        <Star className={accentColor} size={24} />
                      </div>
                      <div className={`${textColor} font-semibold text-sm`}>Premium Service</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Categories */}
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${
        theme === 'dark' ? 'py-8' : 'py-16'
      } relative z-10`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className={`flex items-center justify-between ${
            theme === 'dark' ? 'mb-6' : 'mb-10'
          }`}>
            <h2 className={`${
              theme === 'dark' 
                ? 'text-xl sm:text-2xl font-medium' 
                : 'text-3xl sm:text-4xl font-bold'
            } ${
              theme === 'dark' ? 'text-dark-text' : textColor
            }`}>
              Shop by Category
            </h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate('/search')}
              className={`${textSecondary} hover:${accentColor} text-sm font-medium transition-colors flex items-center space-x-1`}
            >
              <span>View All</span>
              <ArrowRight size={16} />
            </motion.button>
          </div>
          <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 ${
            theme === 'dark' ? 'gap-3' : 'gap-4'
          }`}>
            {categories.map((category, index) => (
              <motion.button
                key={category.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={theme === 'dark' ? {} : { scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSearch({ city: 'Bangalore', service: category.name })}
                className={`${cardBg} ${cardHover} border ${
                  theme === 'dark' ? 'border-dark-border/50' : 'border-pink-border'
                } ${
                  theme === 'dark' 
                    ? 'rounded-md p-3' 
                    : 'rounded-2xl p-6'
                } text-center transition-all duration-300 ${
                  theme === 'dark' 
                    ? '' 
                    : 'shadow-soft hover:shadow-soft-lg'
                } group`}
              >
                <div className={`${
                  theme === 'dark' ? 'text-2xl mb-2' : 'text-5xl mb-4'
                }`}>
                  {category.icon}
                </div>
                <div className={`${
                  theme === 'dark' ? 'font-medium text-xs' : 'font-semibold text-sm'
                } ${
                  theme === 'dark' ? 'text-dark-text mb-1' : `${textColor} mb-2`
                } group-hover:${accentColor} transition-colors`}>
                  {category.name}
                </div>
                <div className={`text-xs ${textSecondary} ${
                  theme === 'dark' ? 'font-normal' : 'font-medium'
                }`}>
                  {category.count} professionals
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Featured Vendors */}
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${
        theme === 'dark' ? 'py-8' : 'py-16'
      } relative z-10`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`flex items-center justify-between ${
            theme === 'dark' ? 'mb-8' : 'mb-10'
          }`}
        >
          <h2 className={`${
            theme === 'dark' 
              ? 'text-2xl sm:text-3xl font-semibold' 
              : 'text-3xl sm:text-4xl font-bold'
          } ${
            theme === 'dark' ? 'text-dark-textSecondary' : textColor
          } flex items-center space-x-3`}>
            {theme !== 'dark' && (
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <TrendingUp className={accentColor} size={32} />
              </motion.div>
            )}
            {theme === 'dark' && <TrendingUp className={accentColor} size={24} />}
            <span>Featured Professionals</span>
          </h2>
          <motion.button
            whileHover={{ scale: 1.05, x: 5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/search')}
            className={`flex items-center space-x-2 ${accentColor} hover:opacity-80 ${
              theme === 'dark' ? 'font-medium' : 'font-semibold'
            } transition-colors text-sm`}
          >
            <span>View All</span>
            <ArrowRight size={16} />
          </motion.button>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                className={`${theme === 'dark' ? 'bg-dark-card/50' : 'bg-white/50'} backdrop-blur-xl rounded-2xl h-96 animate-pulse`}
              />
            ))}
          </div>
        ) : (
          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ${
            theme === 'dark' ? 'gap-6' : 'gap-8'
          }`}>
            {featuredVendors.map((vendor, index) => (
              <VendorCard key={vendor.id} vendor={vendor} index={index} />
            ))}
          </div>
        )}
      </div>

      {/* Stats Section - Simplified for dark theme */}
      <div className={`${cardBg} ${
        theme === 'dark' ? 'py-8 mt-8' : 'py-20 mt-20'
      } relative overflow-hidden border-t ${
        theme === 'dark' ? 'border-dark-border' : 'border-pink-border'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`grid grid-cols-2 md:grid-cols-4 ${
              theme === 'dark' ? 'gap-6' : 'gap-8'
            }`}
          >
            {[
              { value: '500+', label: 'Professionals', icon: Users },
              { value: '10K+', label: 'Happy Customers', icon: Award },
              { value: '50K+', label: 'Bookings', icon: Calendar },
              { value: '4.8★', label: 'Average Rating', icon: Star },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={theme === 'dark' ? {} : { scale: 1.05, y: -5 }}
                className={`${
                  theme === 'dark' 
                    ? 'text-center' 
                    : `${cardHover} border border-pink-border rounded-2xl p-6 text-center group`
                } transition-all duration-300`}
              >
                {theme !== 'dark' && (
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-pink-accent/20 mb-4`}>
                    <stat.icon className={accentColor} size={28} />
                  </div>
                )}
                <motion.div
                  className={`${
                    theme === 'dark' 
                      ? 'text-2xl md:text-3xl font-semibold' 
                      : 'text-4xl md:text-5xl font-extrabold'
                  } ${accentColor} ${theme === 'dark' ? 'mb-1' : 'mb-2'}`}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
                >
                  {stat.value}
                </motion.div>
                <div className={`${textSecondary} ${
                  theme === 'dark' ? 'text-xs font-medium' : 'text-sm font-semibold'
                } ${theme !== 'dark' ? `group-hover:${accentColor}` : ''} transition-colors`}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

