import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, MapPin, Home, Building2, CheckCircle, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { Vendor } from '../types';

interface VendorCardProps {
  vendor: Vendor;
  index?: number;
}

export const VendorCard = ({ vendor, index = 0 }: VendorCardProps) => {
  const { theme } = useTheme();
  const bgColor = theme === 'dark' ? 'bg-dark-card' : 'bg-pink-card';
  const cardHover = theme === 'dark' ? 'hover:bg-dark-cardHover' : 'hover:bg-pink-cardHover';
  const textColor = theme === 'dark' ? 'text-dark-text' : 'text-pink-text';
  const textSecondary = theme === 'dark' ? 'text-dark-textSecondary' : 'text-pink-textSecondary';
  const accentColor = theme === 'dark' ? 'text-dark-accent' : 'text-pink-accent';
  const borderColor = theme === 'dark' ? 'border-dark-border' : 'border-pink-border';
  const shadowColor = theme === 'dark' ? '' : 'shadow-soft hover:shadow-soft-lg';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={theme === 'dark' ? {} : { y: -8, scale: 1.02 }}
      className="h-full"
    >
      <Link to={`/vendor/${vendor.id}`} className="block h-full">
        <div className={`${bgColor} ${cardHover} ${borderColor} border ${
          theme === 'dark' ? 'rounded-md' : 'rounded-2xl'
        } overflow-hidden ${
          theme === 'dark' ? '' : shadowColor
        } transition-all ${
          theme === 'dark' ? 'duration-200' : 'duration-500'
        } h-full flex flex-col group`}>
          <div className="relative h-56 overflow-hidden">
            <motion.img
              src={vendor.coverImage}
              alt={vendor.name}
              className={`w-full h-full object-cover transition-transform ${
                theme === 'dark' ? 'group-hover:scale-105 duration-500' : 'group-hover:scale-110 duration-700'
              }`}
              whileHover={theme === 'dark' ? {} : { scale: 1.1 }}
            />
            <div className={`absolute inset-0 ${
              theme === 'dark' 
                ? 'bg-gradient-to-t from-black/70 via-black/10 to-transparent' 
                : 'bg-gradient-to-t from-black/80 via-black/20 to-transparent'
            }`} />
            {vendor.verified && (
              <div className={`absolute top-3 right-3 ${
                theme === 'dark' 
                  ? 'bg-dark-card/90 backdrop-blur-sm' 
                  : 'glass-dark'
              } ${theme === 'dark' ? 'rounded-md' : 'rounded-full'} p-1.5 ${theme !== 'dark' ? 'shadow-lg' : ''}`}>
                <CheckCircle className="text-blue-400" size={theme === 'dark' ? 16 : 20} />
              </div>
            )}
            <div className={`absolute bottom-0 left-0 right-0 ${
              theme === 'dark' ? 'p-4' : 'p-5'
            }`}>
              <div className="flex items-center space-x-3">
                <img
                  src={vendor.avatar}
                  alt={vendor.name}
                  className={`${
                    theme === 'dark' ? 'w-12 h-12 border-2' : 'w-14 h-14 border-3'
                  } rounded-full border-white/90 ${theme !== 'dark' ? 'shadow-xl' : ''}`}
                />
                <div>
                  <h3 className={`${
                    theme === 'dark' ? 'font-semibold text-base' : 'font-bold text-lg'
                  } text-white ${theme !== 'dark' ? 'drop-shadow-lg' : ''}`}>{vendor.name}</h3>
                  <p className={`${
                    theme === 'dark' ? 'text-xs' : 'text-sm'
                  } text-white/90 font-medium`}>{vendor.profession}</p>
                </div>
              </div>
            </div>
          </div>

          <div className={`${
            theme === 'dark' ? 'p-3 space-y-2' : 'p-5 space-y-4'
          } flex-1 flex flex-col`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <Star className={`${accentColor} fill-current`} size={theme === 'dark' ? 16 : 20} />
                  <span className={`${textColor} ${
                    theme === 'dark' ? 'font-medium text-sm' : 'font-bold text-lg'
                  }`}>{vendor.rating}</span>
                </div>
                <span className={`${textSecondary} ${
                  theme === 'dark' ? 'text-xs' : 'text-sm'
                } ${theme === 'dark' ? 'font-normal' : 'font-medium'}`}>({vendor.reviewCount})</span>
              </div>
              <div className="flex items-center space-x-2">
                {vendor.homeVisit && (
                  <div className={`${
                    theme === 'dark' ? 'bg-dark-accent/10' : 'bg-pink-accent/20'
                  } p-1.5 rounded-lg`}>
                    <Home className={accentColor} size={16} />
                  </div>
                )}
                {vendor.salonAddress && (
                  <div className={`${
                    theme === 'dark' ? 'bg-dark-accent/10' : 'bg-pink-accent/20'
                  } p-1.5 rounded-lg`}>
                    <Building2 className={accentColor} size={16} />
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-2 text-sm">
              <MapPin className={textSecondary} size={16} />
              <span className={`${textSecondary} font-medium`}>{vendor.city}</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {vendor.services.slice(0, 2).map((service) => (
                <span
                  key={service.id}
                  className={`text-xs ${
                    theme === 'dark' ? 'px-2 py-1' : 'px-3 py-1.5'
                  } rounded-full font-medium ${
                    theme === 'dark' 
                      ? 'bg-dark-bg/40 text-dark-textSecondary border border-dark-border/50' 
                      : 'bg-gray-100 text-gray-700 border border-gray-200'
                  }`}
                >
                  {service.name}
                </span>
              ))}
              {vendor.services.length > 2 && (
                <span className={`text-xs ${textSecondary} font-medium self-center`}>
                  +{vendor.services.length - 2} more
                </span>
              )}
            </div>

            <div className="pt-2 mt-auto">
              <div className={`inline-flex items-center space-x-2 ${
                theme === 'dark' ? 'bg-dark-accent/10' : 'bg-pink-accent/10'
              } ${
                theme === 'dark' ? 'px-2 py-1 rounded-md' : 'px-4 py-2 rounded-xl'
              }`}>
                {theme !== 'dark' && <Sparkles className={accentColor} size={16} />}
                <span className={`${
                  theme === 'dark' ? 'text-xs font-medium' : 'text-base font-bold'
                } ${accentColor}`}>
                  From ₹{Math.min(...vendor.services.map(s => s.price))}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

