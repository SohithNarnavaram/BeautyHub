import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { ShoppingCart, User, Menu, X, Sparkles } from 'lucide-react';
import { FemaleIcon, MaleIcon } from './icons/GenderIcons';
import { useState } from 'react';

export const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const bgColor = theme === 'dark' 
    ? 'bg-dark-card/95 backdrop-blur-2xl' 
    : 'bg-pink-card/95 backdrop-blur-2xl';
  const textColor = theme === 'dark' ? 'text-dark-text' : 'text-pink-text';
  const borderColor = theme === 'dark' ? 'border-dark-border' : 'border-pink-border';
  const accentColor = theme === 'dark' ? 'text-dark-accent' : 'text-pink-accent';

  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`${bgColor} ${borderColor} border-b sticky top-0 z-50 ${
        theme === 'dark' ? '' : 'shadow-lg'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between ${
          theme === 'dark' ? 'h-16' : 'h-20'
        }`}>
          <Link to="/" className="flex items-center space-x-2 group">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Sparkles className={accentColor} size={theme === 'dark' ? 24 : 28} />
            </motion.div>
            <motion.span
              className={`${
                theme === 'dark' ? 'text-xl font-semibold' : 'text-2xl font-extrabold'
              } ${accentColor} group-hover:opacity-80 transition-opacity`}
              whileHover={{ scale: 1.05 }}
            >
              BeautyHub
            </motion.span>
          </Link>

          <div className="hidden md:flex items-center space-x-2">
            {[
              { path: '/search', label: 'Explore' },
              { path: '/dashboard', label: 'Dashboard' },
              { path: '/vendor-dashboard', label: 'Vendor' },
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-4 py-2 ${
                  theme === 'dark' ? 'rounded-md' : 'rounded-lg'
                } transition-all`}
              >
                <motion.span
                  className={`${
                    theme === 'dark' ? 'text-dark-textSecondary' : textColor
                  } font-medium relative z-10`}
                  whileHover={{ scale: 1.05 }}
                >
                  {item.label}
                </motion.span>
                {isActive(item.path) && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className={`absolute inset-0 ${
                      theme === 'dark' ? 'bg-dark-accent/20' : 'bg-pink-accent/20'
                    } ${theme === 'dark' ? 'rounded-md' : 'rounded-lg'} border ${
                      theme === 'dark' ? 'border-dark-accent/30' : 'border-pink-accent/30'
                    }`}
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            ))}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate('/cart')}
              className={`${
                theme === 'dark' ? 'text-dark-textSecondary' : textColor
              } p-2 rounded-lg hover:bg-opacity-10 ${
                theme === 'dark' ? 'hover:bg-white' : 'hover:bg-gray-900'
              } transition-colors relative`}
              aria-label="Shopping cart"
            >
              <ShoppingCart size={22} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className={`p-2 rounded-lg hover:bg-opacity-10 ${
                theme === 'dark' ? 'hover:bg-white' : 'hover:bg-gray-900'
              } transition-colors relative`}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <MaleIcon size={22} className={accentColor} />
              ) : (
                <FemaleIcon size={22} className={accentColor} />
              )}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`${
                theme === 'dark' ? 'text-dark-textSecondary' : textColor
              } p-2 rounded-lg hover:bg-opacity-10 ${
                theme === 'dark' ? 'hover:bg-white' : 'hover:bg-gray-900'
              } transition-colors`}
              aria-label="User profile"
            >
              <User size={22} />
            </motion.button>
          </div>

          <div className="md:hidden flex items-center space-x-3">
            <motion.button
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-opacity-10 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <MaleIcon size={20} className={accentColor} />
              ) : (
                <FemaleIcon size={20} className={accentColor} />
              )}
            </motion.button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`${textColor}`}
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className={`md:hidden py-4 ${borderColor} border-t overflow-hidden`}
            >
              {[
                { path: '/search', label: 'Explore' },
                { path: '/dashboard', label: 'Dashboard' },
                { path: '/vendor-dashboard', label: 'Vendor' },
                { path: '/cart', label: 'Cart', action: () => navigate('/cart') },
              ].map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item.action ? (
                    <button
                      onClick={() => {
                        item.action?.();
                        setMobileMenuOpen(false);
                      }}
                      className={`block py-3 px-4 ${textColor} w-full text-left rounded-lg hover:bg-opacity-10 ${
                        theme === 'dark' ? 'hover:bg-white' : 'hover:bg-gray-900'
                      } transition-colors`}
                    >
                      {item.label}
                    </button>
                  ) : (
                    <Link
                      to={item.path}
                      className={`block py-3 px-4 ${textColor} rounded-lg hover:bg-opacity-10 ${
                        theme === 'dark' ? 'hover:bg-white' : 'hover:bg-gray-900'
                      } transition-colors`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

