export type Theme = 'dark' | 'pink';

export type Gender = 'male' | 'female' | 'unisex';

export type VisitType = 'home' | 'salon';

export interface Vendor {
  id: string;
  name: string;
  profession: string;
  city: string;
  avatar: string;
  coverImage: string;
  verified: boolean;
  rating: number;
  reviewCount: number;
  gender: Gender;
  homeVisit: boolean;
  salonAddress?: string;
  salonName?: string;
  bio: string;
  services: Service[];
  portfolio: string[];
  availability: Availability;
  products: Product[];
  testimonials: Testimonial[];
}

export interface Service {
  id: string;
  name: string;
  description: string;
  duration: number; // in minutes
  price: number;
  gender: Gender;
  homeVisit: boolean;
}

export interface Availability {
  [day: string]: {
    available: boolean;
    slots: string[]; // e.g., ["09:00", "10:00", "14:00"]
  };
}

export interface Booking {
  id: string;
  vendorId: string;
  vendorName: string;
  serviceId: string;
  serviceName: string;
  date: string;
  time: string;
  visitType: VisitType;
  address?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  bookingCode: string;
  price: number;
  createdAt: string;
}

export interface Product {
  id: string;
  vendorId: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  inStock: boolean;
}

export interface Testimonial {
  id: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  date: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface SearchFilters {
  city: string;
  service?: string;
  gender?: Gender;
  homeVisit?: boolean;
  minRating?: number;
  maxPrice?: number;
}

