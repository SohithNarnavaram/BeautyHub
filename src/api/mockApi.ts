import { Vendor, Booking, SearchFilters, Product, CartItem } from '../types';
import { mockVendors, mockBookings, mockCart } from './mockData';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  // Search vendors
  searchVendors: async (filters: SearchFilters): Promise<Vendor[]> => {
    await delay(500);
    let results = [...mockVendors];

    if (filters.city) {
      results = results.filter(v => v.city.toLowerCase() === filters.city.toLowerCase());
    }

    if (filters.service) {
      results = results.filter(v =>
        v.services.some(s => s.name.toLowerCase().includes(filters.service!.toLowerCase()))
      );
    }

    if (filters.gender) {
      results = results.filter(v => v.gender === filters.gender || v.gender === 'unisex');
    }

    if (filters.homeVisit !== undefined) {
      results = results.filter(v => v.homeVisit === filters.homeVisit);
    }

    if (filters.minRating) {
      results = results.filter(v => v.rating >= filters.minRating!);
    }

    if (filters.maxPrice) {
      results = results.filter(v =>
        v.services.some(s => s.price <= filters.maxPrice!)
      );
    }

    return results;
  },

  // Get vendor by ID
  getVendor: async (id: string): Promise<Vendor | null> => {
    await delay(300);
    return mockVendors.find(v => v.id === id) || null;
  },

  // Get all vendors
  getAllVendors: async (): Promise<Vendor[]> => {
    await delay(300);
    return mockVendors;
  },

  // Create booking
  createBooking: async (booking: Omit<Booking, 'id' | 'bookingCode' | 'createdAt'>): Promise<Booking> => {
    await delay(800);
    const newBooking: Booking = {
      ...booking,
      id: `booking-${Date.now()}`,
      bookingCode: `BH${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      createdAt: new Date().toISOString(),
      status: 'pending',
    };
    mockBookings.push(newBooking);
    return newBooking;
  },

  // Get user bookings
  getUserBookings: async (): Promise<Booking[]> => {
    await delay(400);
    return [...mockBookings];
  },

  // Get vendor bookings
  getVendorBookings: async (vendorId: string): Promise<Booking[]> => {
    await delay(400);
    return mockBookings.filter(b => b.vendorId === vendorId);
  },

  // Get products by vendor
  getVendorProducts: async (vendorId: string): Promise<Product[]> => {
    await delay(300);
    const vendor = mockVendors.find(v => v.id === vendorId);
    return vendor?.products || [];
  },

  // Get all products
  getAllProducts: async (): Promise<Product[]> => {
    await delay(300);
    return mockVendors.flatMap(v => v.products);
  },

  // Cart operations
  getCart: async (): Promise<CartItem[]> => {
    await delay(200);
    return [...mockCart];
  },

  addToCart: async (product: Product, quantity: number = 1): Promise<void> => {
    await delay(300);
    const existing = mockCart.find(item => item.product.id === product.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      mockCart.push({ product, quantity });
    }
  },

  removeFromCart: async (productId: string): Promise<void> => {
    await delay(200);
    const index = mockCart.findIndex(item => item.product.id === productId);
    if (index > -1) {
      mockCart.splice(index, 1);
    }
  },

  updateCartQuantity: async (productId: string, quantity: number): Promise<void> => {
    await delay(200);
    const item = mockCart.find(item => item.product.id === productId);
    if (item) {
      item.quantity = quantity;
    }
  },

  clearCart: async (): Promise<void> => {
    await delay(200);
    mockCart.length = 0;
  },
};




