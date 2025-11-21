import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Search } from './pages/Search';
import { VendorProfile } from './pages/VendorProfile';
import { UserDashboard } from './pages/UserDashboard';
import { VendorDashboard } from './pages/VendorDashboard';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { BookingSuccess } from './pages/BookingSuccess';
import { CheckoutSuccess } from './pages/CheckoutSuccess';
import { useEffect } from 'react';

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="/search" element={<PageWrapper><Search /></PageWrapper>} />
        <Route path="/vendor/:id" element={<PageWrapper><VendorProfile /></PageWrapper>} />
        <Route path="/dashboard" element={<PageWrapper><UserDashboard /></PageWrapper>} />
        <Route path="/vendor-dashboard" element={<PageWrapper><VendorDashboard /></PageWrapper>} />
        <Route path="/cart" element={<PageWrapper><Cart /></PageWrapper>} />
        <Route path="/checkout" element={<PageWrapper><Checkout /></PageWrapper>} />
        <Route path="/booking-success/:code" element={<PageWrapper><BookingSuccess /></PageWrapper>} />
        <Route path="/checkout-success" element={<PageWrapper><CheckoutSuccess /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
};

const AppContent = () => {
  const { theme } = useTheme();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.style.backgroundColor = '#0A0B0D';
      document.documentElement.style.color = '#F9FAFB';
      document.body.className = 'bg-dark-bg text-dark-text transition-colors duration-300';
    } else {
      document.documentElement.style.backgroundColor = '#FEFBFD';
      document.documentElement.style.color = '#1F2937';
      document.body.className = 'bg-pink-bg text-pink-text transition-colors duration-300';
    }
  }, [theme]);

  return (
    <Router>
      <div className="min-h-screen">
        <Navbar />
        <AnimatedRoutes />
      </div>
    </Router>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;

