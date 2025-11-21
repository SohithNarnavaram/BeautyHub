import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Home, Building2, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { Gender } from '../types';

interface SearchBarProps {
  onSearch: (filters: {
    city: string;
    service?: string;
    gender?: Gender;
    homeVisit?: boolean;
  }) => void;
  initialCity?: string;
  initialService?: string;
  initialGender?: Gender;
  initialHomeVisit?: boolean;
}

export const SearchBar = ({
  onSearch,
  initialCity = 'Bangalore',
  initialService = '',
  initialGender,
  initialHomeVisit,
}: SearchBarProps) => {
  const { theme } = useTheme();
  const [city, setCity] = useState(initialCity);
  const [service, setService] = useState(initialService);
  // Default gender based on theme if not provided
  const defaultGender = theme === 'dark' ? 'male' : 'female';
  const [gender, setGender] = useState<Gender | undefined>(initialGender ?? defaultGender);
  const [homeVisit, setHomeVisit] = useState<boolean | undefined>(initialHomeVisit);

  // Update gender when theme changes (if no initial gender was provided)
  useEffect(() => {
    if (!initialGender) {
      const newDefaultGender = theme === 'dark' ? 'male' : 'female';
      setGender(newDefaultGender);
    }
  }, [theme, initialGender]);

  const bgColor = theme === 'dark' 
    ? 'bg-dark-card border-dark-border' 
    : 'bg-pink-card backdrop-blur-2xl border-pink-border';
  const textColor = theme === 'dark' ? 'text-dark-text' : 'text-pink-text';
  const inputBg = theme === 'dark' ? 'bg-dark-bg border-dark-border/30' : 'bg-gray-50/80';
  const accentColor = theme === 'dark' ? 'text-dark-accent' : 'text-pink-accent';
  const borderColor = theme === 'dark' ? 'border-dark-border/30' : 'border-pink-border';
  const buttonBg = theme === 'dark'
    ? 'bg-gradient-to-r from-dark-accent to-dark-accentHover'
    : 'bg-gradient-to-r from-pink-accent to-pink-accentHover hover:shadow-[0_0_30px_rgba(236,72,153,0.5)]';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ city, service, gender, homeVisit });
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      onSubmit={handleSubmit}
      className={`${bgColor} border ${
        theme === 'dark' ? 'rounded-md p-4' : 'rounded-3xl p-8 shadow-2xl'
      }`}
    >
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <motion.div
            whileFocus={{ scale: 1.02 }}
            className="relative"
          >
            <MapPin className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${accentColor} opacity-70`} size={22} />
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City"
              className={`w-full pl-12 pr-4 ${theme === 'dark' ? 'py-3' : 'py-4'} ${inputBg} ${textColor} ${borderColor} border ${
                theme === 'dark' ? 'rounded-md' : 'rounded-xl'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                theme === 'dark' 
                  ? 'focus:ring-dark-accent/50 focus:ring-offset-dark-bg placeholder:text-dark-textSecondary/60' 
                  : 'focus:ring-pink-accent focus:ring-offset-pink-bg'
              } transition-all duration-300`}
            />
          </motion.div>
          <motion.div
            whileFocus={{ scale: 1.02 }}
            className="relative"
          >
            <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${accentColor} opacity-70`} size={22} />
            <input
              type="text"
              value={service}
              onChange={(e) => setService(e.target.value)}
              placeholder="Service (e.g., Haircut, Makeup)"
              className={`w-full pl-12 pr-4 ${theme === 'dark' ? 'py-3' : 'py-4'} ${inputBg} ${textColor} ${borderColor} border ${
                theme === 'dark' ? 'rounded-md' : 'rounded-xl'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                theme === 'dark' 
                  ? 'focus:ring-dark-accent/50 focus:ring-offset-dark-bg placeholder:text-dark-textSecondary/60' 
                  : 'focus:ring-pink-accent focus:ring-offset-pink-bg'
              } transition-all duration-300`}
            />
          </motion.div>
        </div>

        <div className="flex flex-wrap items-center gap-5">
          <div className="flex items-center space-x-3">
            <span className={`${
              theme === 'dark' ? 'text-dark-textSecondary' : textColor
            } text-sm font-semibold`}>Gender:</span>
            <div className="flex space-x-2">
              {(['male', 'female', 'unisex'] as Gender[]).map((g) => (
                <motion.button
                  key={g}
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setGender(gender === g ? undefined : g)}
                  className={`px-5 ${theme === 'dark' ? 'py-2 rounded-md' : 'py-2.5 rounded-xl'} text-sm ${
                    theme === 'dark' ? 'font-medium' : 'font-semibold'
                  } transition-all duration-300 ${
                    gender === g
                      ? `${buttonBg} text-white ${theme !== 'dark' ? 'shadow-lg' : ''}`
                      : `${inputBg} ${
                          theme === 'dark' ? 'text-dark-textSecondary' : textColor
                        } ${borderColor} border hover:border-opacity-100`
                  }`}
                >
                  {g.charAt(0).toUpperCase() + g.slice(1)}
                </motion.button>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <span className={`${
              theme === 'dark' ? 'text-dark-textSecondary' : textColor
            } text-sm font-semibold`}>Visit Type:</span>
            <div className="flex space-x-2">
              <motion.button
                type="button"
                whileHover={theme === 'dark' ? {} : { scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setHomeVisit(homeVisit === true ? undefined : true)}
                className={`px-5 ${theme === 'dark' ? 'py-2 rounded-md' : 'py-2.5 rounded-xl'} text-sm ${
                  theme === 'dark' ? 'font-medium' : 'font-semibold'
                } transition-all duration-300 flex items-center space-x-2 ${
                  homeVisit === true
                    ? `${buttonBg} text-white ${theme !== 'dark' ? 'shadow-lg' : ''}`
                    : `${inputBg} ${
                        theme === 'dark' ? 'text-dark-textSecondary' : textColor
                      } ${borderColor} border hover:border-opacity-100`
                }`}
              >
                <Home size={18} />
                <span>Home Visit</span>
              </motion.button>
              <motion.button
                type="button"
                whileHover={theme === 'dark' ? {} : { scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setHomeVisit(homeVisit === false ? undefined : false)}
                className={`px-5 ${theme === 'dark' ? 'py-2 rounded-md' : 'py-2.5 rounded-xl'} text-sm ${
                  theme === 'dark' ? 'font-medium' : 'font-semibold'
                } transition-all duration-300 flex items-center space-x-2 ${
                  homeVisit === false
                    ? `${buttonBg} text-white ${theme !== 'dark' ? 'shadow-lg' : ''}`
                    : `${inputBg} ${
                        theme === 'dark' ? 'text-dark-textSecondary' : textColor
                      } ${borderColor} border hover:border-opacity-100`
                }`}
              >
                <Building2 size={18} />
                <span>Salon</span>
              </motion.button>
            </div>
          </div>
        </div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full ${theme === 'dark' ? 'py-3 rounded-md font-semibold' : 'py-4 rounded-xl font-bold'} text-white transition-all duration-300 ${buttonBg} flex items-center justify-center space-x-2 ${
            theme !== 'dark' ? 'shadow-xl' : ''
          }`}
        >
          <Sparkles size={20} />
          <span>Search</span>
        </motion.button>
      </div>
    </motion.form>
  );
};

