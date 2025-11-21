import { motion } from 'framer-motion';
import { Clock, IndianRupee, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { Service } from '../types';

interface ServiceCardProps {
  service: Service;
  onSelect?: () => void;
  selected?: boolean;
}

export const ServiceCard = ({ service, onSelect, selected }: ServiceCardProps) => {
  const { theme } = useTheme();
  const bgColor = theme === 'dark' ? 'bg-dark-card' : 'bg-pink-card';
  const cardHover = theme === 'dark' ? 'hover:bg-dark-cardHover' : 'hover:bg-pink-cardHover';
  const textColor = theme === 'dark' ? 'text-dark-text' : 'text-pink-text';
  const textSecondary = theme === 'dark' ? 'text-dark-textSecondary' : 'text-pink-textSecondary';
  const borderColor = theme === 'dark' ? 'border-dark-border' : 'border-pink-border';
  const accentColor = theme === 'dark' ? 'text-dark-accent' : 'text-pink-accent';
  const selectedBg = theme === 'dark'
    ? 'bg-gradient-to-br from-dark-accent/20 to-dark-accent/5 border-dark-accent/50'
    : 'bg-gradient-to-br from-pink-accent/20 to-pink-accent/5 border-pink-accent/50';

  return (
    <motion.div
      onClick={onSelect}
      whileHover={theme === 'dark' ? {} : { scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`${bgColor} ${cardHover} ${selected ? selectedBg : borderColor} ${
        selected ? 'border-2' : 'border'
      } ${
        theme === 'dark' ? 'rounded-lg p-3' : 'rounded-2xl p-5'
      } cursor-pointer transition-all duration-300 ${
        theme === 'dark' 
          ? '' 
          : 'shadow-soft hover:shadow-soft-lg'
      } ${
        selected && theme !== 'dark' ? 'ring-2 ring-opacity-30' : ''
      }`}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className={`${
          theme === 'dark' ? 'font-medium text-sm' : 'font-bold text-lg'
        } ${textColor} flex items-center space-x-2`}>
          {selected && theme !== 'dark' && <Sparkles className={accentColor} size={18} />}
          <span>{service.name}</span>
        </h3>
        <div className={`flex items-center space-x-1 ${accentColor} ${
          theme === 'dark' ? 'bg-dark-accent/10 px-2 py-1 rounded-md' : 'bg-opacity-10 px-3 py-1.5 rounded-xl bg-pink-accent/20'
        }`}>
          <IndianRupee size={theme === 'dark' ? 16 : 20} />
          <span className={`${
            theme === 'dark' ? 'font-semibold text-base' : 'font-extrabold text-xl'
          }`}>{service.price}</span>
        </div>
      </div>
      <p className={`${theme === 'dark' ? 'text-xs' : 'text-sm'} ${textSecondary} ${
        theme === 'dark' ? 'mb-2 leading-tight' : 'mb-4 leading-relaxed'
      }`}>{service.description}</p>
      <div className="flex items-center justify-between">
        <div className={`flex items-center space-x-2 text-sm font-medium ${textSecondary}`}>
          <Clock size={16} />
          <span>{service.duration} min</span>
        </div>
        <div className="flex space-x-2">
          {service.homeVisit && (
            <motion.span
              whileHover={{ scale: 1.1 }}
              className={`text-xs px-3 py-1.5 rounded-full font-semibold ${
                theme === 'dark' 
                  ? 'bg-dark-bg/50 text-gray-300 border border-gray-700/50' 
                  : 'bg-gray-100 text-gray-700 border border-gray-200'
              }`}
            >
              Home Visit
            </motion.span>
          )}
          <motion.span
            whileHover={{ scale: 1.1 }}
            className={`text-xs px-3 py-1.5 rounded-full font-semibold ${
              theme === 'dark' 
                ? 'bg-dark-bg/50 text-gray-300 border border-gray-700/50' 
                : 'bg-gray-100 text-gray-700 border border-gray-200'
            }`}
          >
            {service.gender}
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
};

