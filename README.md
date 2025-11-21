# BeautyHub - Beauty Services Marketplace

A modern, responsive web application for booking beauty professionals (Beauticians, Barbers, Stylists, Makeup Artists, and Salons) in major cities, starting with Bangalore.

## 🎯 Features

- **Discover Professionals**: Browse and search for beauty professionals by service, location, gender, and visit type
- **Vendor Profiles**: View detailed profiles with ratings, portfolio, services, and availability
- **Booking System**: 4-step booking flow with date/time selection and location choice (Home/Salon)
- **Product Marketplace**: Mini e-commerce for vendors to sell beauty products
- **User Dashboard**: Manage bookings, saved vendors, and product orders
- **Vendor Dashboard**: Manage services, portfolio, availability, bookings, and products
- **Dual Themes**: Dark theme (Male) and Pink theme (Female) with smooth switching

## 🛠️ Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **React Router** - Routing
- **Framer Motion** - Animations (optional, ready for use)
- **Lucide React** - Icons
- **date-fns** - Date utilities

## 📦 Installation

1. **Clone the repository** (or navigate to the project directory)

2. **Install dependencies**:
```bash
npm install
```

3. **Start the development server**:
```bash
npm run dev
```

4. **Open your browser** and navigate to `http://localhost:5173`

## 🚀 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📁 Project Structure

```
BeautyHub/
├── src/
│   ├── api/
│   │   ├── mockApi.ts       # Mock API functions
│   │   └── mockData.ts      # Seed data (12 vendors)
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── SearchBar.tsx
│   │   ├── VendorCard.tsx
│   │   ├── ServiceCard.tsx
│   │   ├── BookingDrawer.tsx
│   │   ├── CalendarAvailability.tsx
│   │   ├── PortfolioGallery.tsx
│   │   └── ProductCard.tsx
│   ├── context/
│   │   └── ThemeContext.tsx  # Theme management
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Search.tsx
│   │   ├── VendorProfile.tsx
│   │   ├── UserDashboard.tsx
│   │   ├── VendorDashboard.tsx
│   │   ├── Cart.tsx
│   │   ├── Checkout.tsx
│   │   ├── BookingSuccess.tsx
│   │   └── CheckoutSuccess.tsx
│   ├── types/
│   │   └── index.ts          # TypeScript types
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── README.md
```

## 🎨 Design System

### Themes

**Dark Theme (Male)**
- Background: `#0E0F12`
- Card: `#141518`
- Accent: `#7C00FE` or `#00D1B2`
- Modern neon edges

**Pink Theme (Female)**
- Background: `#FFF7FB`
- Accent: `#F5007A`
- Soft gradients, elegant aesthetic

### UI Principles
- Modern, premium, minimal design
- 8px spacing scale
- Rounded cards
- Smooth animations
- Mobile-first responsive layout

## 🔍 Key Features

### User Flow
1. **Home** → Search for services with filters
2. **Search/Explore** → Browse vendors with advanced filters
3. **Vendor Profile** → View details, services, portfolio, products
4. **Booking Flow** → 4-step process:
   - Select service
   - Choose date & time
   - Pick location (Home/Salon)
   - Confirm & payment placeholder
5. **Dashboard** → Manage bookings, saved vendors, orders

### Vendor Flow
1. **Vendor Dashboard** → Overview, stats
2. **Manage Services** → Add/edit/delete services
3. **Portfolio** → Upload/manage portfolio images
4. **Bookings** → View and manage bookings
5. **Products** → Add/manage products for sale

## 📊 Mock Data

The application includes seed data with **12 sample vendors** in Bangalore:
- Makeup Artists
- Barbers
- Hair Stylists
- Beauticians
- Salon Owners

Each vendor has:
- Profile information
- Services with pricing
- Portfolio images
- Availability calendar
- Products (some vendors)
- Testimonials

## 🔧 Mock API

The app uses a mock API (`src/api/mockApi.ts`) that simulates:
- Vendor search and filtering
- Booking creation
- Cart operations
- Data retrieval

All API calls include simulated delays for realistic behavior.

## 📱 Responsive Design

- **Mobile-first** approach
- Breakpoints: `sm:`, `md:`, `lg:`
- Touch-friendly interactions
- Optimized layouts for all screen sizes

## 🎯 Future Enhancements

- Real backend integration
- Authentication system
- Payment gateway integration
- Real-time notifications
- Review and rating system
- Advanced search filters
- Multi-city support
- Vendor analytics
- Push notifications

## 📝 Notes

- All payment flows are placeholders
- Booking codes are randomly generated
- Cart and bookings persist in memory (refresh to reset)
- Theme preference is saved in localStorage

## 🤝 Contributing

This is a complete frontend implementation ready for backend integration. To extend:

1. Replace mock API with real endpoints
2. Add authentication
3. Integrate payment gateway
4. Add real-time features
5. Implement review system

## 📄 License

This project is created for demonstration purposes.

---

Built with ❤️ using React + TypeScript + Tailwind CSS

