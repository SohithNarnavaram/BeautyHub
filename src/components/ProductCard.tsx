import { motion } from 'framer-motion';
import { ShoppingCart, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { Product } from '../types';
import { api } from '../api/mockApi';

interface ProductCardProps {
  product: Product;
  onAddToCart?: () => void;
  index?: number;
}

export const ProductCard = ({ product, onAddToCart, index = 0 }: ProductCardProps) => {
  const { theme } = useTheme();
  const bgColor = theme === 'dark' ? 'bg-dark-card' : 'bg-pink-card';
  const cardHover = theme === 'dark' ? 'hover:bg-dark-cardHover' : 'hover:bg-pink-cardHover';
  const textColor = theme === 'dark' ? 'text-dark-text' : 'text-pink-text';
  const textSecondary = theme === 'dark' ? 'text-dark-textSecondary' : 'text-pink-textSecondary';
  const borderColor = theme === 'dark' ? 'border-dark-border' : 'border-pink-border';
  const accentColor = theme === 'dark' ? 'text-dark-accent' : 'text-pink-accent';
  const buttonBg = theme === 'dark'
    ? 'bg-dark-accent hover:bg-dark-accentHover'
    : 'bg-gradient-to-r from-pink-accent to-[#ff4da6] hover:shadow-[0_0_20px_rgba(245,0,122,0.4)]';

  const handleAddToCart = async () => {
    await api.addToCart(product, 1);
    onAddToCart?.();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={theme === 'dark' ? {} : { y: -8, scale: 1.02 }}
      className={`${bgColor} ${cardHover} ${borderColor} border ${
        theme === 'dark' ? 'rounded-lg' : 'rounded-2xl'
      } overflow-hidden ${
        theme === 'dark' ? '' : 'shadow-lg hover:shadow-2xl'
      } transition-all duration-300 h-full flex flex-col`}
    >
      <div className="relative aspect-square overflow-hidden group">
        <motion.img
          src={product.image}
          alt={product.name}
          className={`w-full h-full object-cover transition-transform ${
            theme === 'dark' ? 'group-hover:scale-105 duration-500' : 'group-hover:scale-110 duration-700'
          }`}
          whileHover={theme === 'dark' ? {} : { scale: 1.1 }}
        />
        {!product.inStock && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center"
          >
            <span className={`${textColor} font-bold text-lg`}>Out of Stock</span>
          </motion.div>
        )}
        {product.inStock && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileHover={{ opacity: 1, scale: 1 }}
            className="absolute top-3 right-3"
          >
            <div className={`${theme === 'dark' ? 'bg-dark-accent/20' : 'bg-pink-accent/20'} backdrop-blur-md rounded-full p-2`}>
              <Sparkles className={accentColor} size={20} />
            </div>
          </motion.div>
        )}
      </div>
      <div className={`${
        theme === 'dark' ? 'p-4 space-y-2' : 'p-5 space-y-3'
      } flex-1 flex flex-col`}>
        <h3 className={`font-semibold ${
          theme === 'dark' ? 'text-base' : 'text-lg font-bold'
        } ${textColor}`}>{product.name}</h3>
        <p className={`text-sm ${textSecondary} line-clamp-2 ${
          theme === 'dark' ? 'leading-normal' : 'leading-relaxed'
        } flex-1`}>
          {product.description}
        </p>
        <div className="flex items-center justify-between pt-2">
          <span className={`${
            theme === 'dark' ? 'font-bold text-xl' : 'font-extrabold text-2xl'
          } ${accentColor}`}>
            ₹{product.price}
          </span>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`${buttonBg} text-white ${
              theme === 'dark' ? 'px-4 py-2 rounded-md' : 'px-5 py-2.5 rounded-xl'
            } flex items-center space-x-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
              theme === 'dark' ? 'font-medium' : 'font-semibold'
            } ${theme !== 'dark' ? 'shadow-lg' : ''}`}
          >
            <ShoppingCart size={theme === 'dark' ? 18 : 20} />
            <span>Add</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

