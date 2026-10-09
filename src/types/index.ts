export type RouteName =
  | 'home'
  | 'dashboard'
  | 'explore'
  | 'destinations'
  | 'route-explorer'
  | 'ticket-booking'
  | 'my-tickets'
  | 'trip-planner'
  | 'hotels'
  | 'travel'
  | 'food'
  | 'live-location'
  | 'nearby'
  | 'hospitals'
  | 'waterfalls'
  | 'zoo-parks'
  | 'bookmyshow'
  | 'favorites'
  | 'my-trips'
  | 'my-bookings'
  | 'profile'
  | 'owner-profile'
  | 'owner-settings'
  | 'owner-dashboard'
  | 'developer'
  | 'security'
  | 'ai-assistant'
  | 'about'
  | 'contact'
  | 'faq'
  | 'privacy'
  | 'terms'
  | 'login'
  | 'register';

export type UserRole = 'USER' | 'OWNER' | 'ADMIN';

export interface UserSecuritySettings {
  twoFactorEnabled: boolean;
  activeSessionsCount: number;
  lastPasswordChange: string;
  loginAlerts: boolean;
}

export interface UserPrivacySettings {
  locationPermission: 'granted' | 'denied' | 'prompt';
  liveGpsEnabled: boolean;
  saveTrips: boolean;
  shareAnalytics: boolean;
  publicProfile: boolean;
  allowBookingHistoryExport: boolean;
}

export interface UserNotificationPreferences {
  bookings: boolean;
  tickets: boolean;
  tripReminders: boolean;
  securityAlerts: boolean;
  emailAlerts: boolean;
  appUpdates: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatarUrl?: string;
  role?: UserRole;
  developerRole?: string;
  ownerBio?: string;
  appName?: string;
  appYear?: string;
  website?: string;
  socialLinks?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
  preferredTravelType: 'Solo' | 'Family' | 'Couple' | 'Friends' | 'Adventure' | 'Pilgrimage';
  preferredDestinations: string[];
  budgetPreference: 'Budget' | 'Moderate' | 'Luxury';
  emergencyContact?: string;
  joinedDate: string;
  securitySettings?: UserSecuritySettings;
  privacySettings?: UserPrivacySettings;
  notificationPreferences?: UserNotificationPreferences;
  appearanceMode?: 'light' | 'dark' | 'system';
  selectedLanguage?: string;
}

export interface DestinationHierarchy {
  country: string;
  state: string;
  district: string;
  city: string;
  mandal?: string;
  village?: string;
}

export interface Destination {
  id: string;
  name: string;
  tagline: string;
  description: string;
  hierarchy: DestinationHierarchy;
  category:
    | 'Pilgrimage'
    | 'Hill Stations'
    | 'Waterfalls'
    | 'Beaches'
    | 'Historical Places'
    | 'Wildlife'
    | 'Zoo Parks'
    | 'Temples'
    | 'Forts'
    | 'Adventure'
    | 'Family Trips'
    | 'Cultural Places';
  imageUrl: string;
  rating: number;
  reviewCount: number;
  bestTimeToVisit: string;
  estimatedBudget: number;
  coordinates: {
    lat: number;
    lng: number;
  };
  highlights: string[];
  isFeatured?: boolean;
  isTirupatiSpecial?: boolean;
}

export interface Hotel {
  id: string;
  name: string;
  location: string;
  city: string;
  state: string;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  pricePerNight: number;
  originalPrice?: number;
  amenities: string[];
  roomTypes: {
    id: string;
    name: string;
    price: number;
    capacity: number;
    beds: string;
  }[];
  coordinates: {
    lat: number;
    lng: number;
  };
  distanceFromTempleOrCenter?: string;
  phone: string;
}

export interface HotelBooking {
  id: string;
  hotelId: string;
  hotelName: string;
  hotelImage: string;
  location: string;
  checkInDate: string;
  checkOutDate: string;
  roomType: string;
  roomsCount: number;
  guestCount: {
    adults: number;
    children: number;
  };
  primaryGuest: {
    name: string;
    email: string;
    phone: string;
    specialRequests?: string;
  };
  pricing: {
    nightlyRate: number;
    nights: number;
    roomTotal: number;
    taxes: number;
    discount: number;
    totalAmount: number;
  };
  status: 'Confirmed' | 'Pending' | 'Completed' | 'Cancelled';
  bookedAt: string;
  bookingRef: string;
}

export type TravelMode = 'BUS' | 'TRAIN' | 'FLIGHT' | 'CAB';

export interface TravelOption {
  id: string;
  mode: TravelMode;
  operator: string;
  vehicleNumber?: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  availableSeats: number;
  rating: number;
  type: string; // e.g. "Volvo AC Multi-Axle", "Vande Bharat Express", "Economy Class", "Sedan AC"
  amenities: string[];
}

export interface TravelBooking {
  id: string;
  travelOptionId: string;
  mode: TravelMode;
  operator: string;
  type: string;
  origin: string;
  destination: string;
  departureDate: string;
  departureTime: string;
  arrivalTime: string;
  passengers: {
    name: string;
    age: number;
    gender: string;
    seatNumber?: string;
  }[];
  totalPrice: number;
  taxes: number;
  status: 'Confirmed' | 'Pending' | 'Completed' | 'Cancelled';
  bookingRef: string;
  bookedAt: string;
}

export interface FoodItem {
  id: string;
  name: string;
  restaurantId: string;
  restaurantName: string;
  category:
    | 'Breakfast'
    | 'Lunch'
    | 'Dinner'
    | 'Snacks'
    | 'Vegetarian'
    | 'Non-Vegetarian'
    | 'South Indian'
    | 'North Indian'
    | 'Fast Food'
    | 'Desserts';
  isVeg: boolean;
  price: number;
  rating: number;
  description: string;
  imageUrl: string;
  preparationTime: string;
}

export interface Restaurant {
  id: string;
  name: string;
  location: string;
  city: string;
  cuisine: string[];
  rating: number;
  reviewCount: number;
  priceRange: '₹' | '₹₹' | '₹₹₹';
  imageUrl: string;
  isPureVeg: boolean;
  deliveryTime: string;
  address: string;
  phone: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface FoodCartItem {
  item: FoodItem;
  quantity: number;
}

export interface FoodOrder {
  id: string;
  orderRef: string;
  items: FoodCartItem[];
  restaurantName: string;
  deliveryAddress: {
    fullName: string;
    phone: string;
    street: string;
    landmark?: string;
    city: string;
  };
  subtotal: number;
  deliveryFee: number;
  taxes: number;
  totalAmount: number;
  status: 'Confirmed' | 'Preparing' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
  orderedAt: string;
  paymentMethod: string;
}

export interface ItineraryItem {
  id: string;
  timeSlot: 'Morning' | 'Afternoon' | 'Evening' | 'Night';
  place: string;
  activity: string;
  estimatedCost: number;
  distance: string;
  travelTime: string;
  notes: string;
}

export interface ItineraryDay {
  dayNumber: number;
  title: string;
  items: ItineraryItem[];
}

export interface Trip {
  id: string;
  title: string;
  startLocation: string;
  destination: string;
  hierarchy?: DestinationHierarchy;
  startDate: string;
  endDate: string;
  travelers: {
    adults: number;
    children: number;
  };
  budget: number;
  travelType: 'Solo' | 'Family' | 'Friends' | 'Couple' | 'Business' | 'Pilgrimage' | 'Adventure';
  status: 'Upcoming' | 'Active' | 'Completed' | 'Cancelled';
  itinerary: ItineraryDay[];
  notes?: string;
  createdAt: string;
}

export interface Hospital {
  id: string;
  name: string;
  type: 'Emergency 24x7' | 'Government' | 'Private' | 'Multi-Specialty';
  city: string;
  state: string;
  address: string;
  phone: string;
  emergencyHotline: string;
  specialties: string[];
  hasAmbulance: boolean;
  rating: number;
  coordinates: {
    lat: number;
    lng: number;
  };
  distanceKm?: number;
}

export interface Waterfall {
  id: string;
  name: string;
  state: string;
  district: string;
  nearestCity: string;
  height: string;
  description: string;
  bestSeason: string;
  nearbyAttractions: string[];
  trekkingDifficulty: 'Easy' | 'Moderate' | 'Challenging';
  imageUrl: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface ZooPark {
  id: string;
  name: string;
  type: 'Zoo' | 'Wildlife Sanctuary' | 'National Park' | 'Safari Park' | 'Bird Sanctuary';
  city: string;
  state: string;
  description: string;
  openingHours: string;
  entryFee: string;
  keyAttractions: string[];
  imageUrl: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface NearbyPlace {
  id: string;
  name: string;
  category:
    | 'Hospitals'
    | 'Hotels'
    | 'Restaurants'
    | 'Petrol Stations'
    | 'ATMs'
    | 'Banks'
    | 'Pharmacies'
    | 'Police Stations'
    | 'Railway Stations'
    | 'Bus Stations'
    | 'Airports'
    | 'Tourist Places'
    | 'Temples'
    | 'Shopping Malls'
    | 'Waterfalls'
    | 'Zoo Parks';
  address: string;
  distanceKm: number;
  rating: number;
  isOpen: boolean;
  phone?: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  type: 'booking' | 'trip' | 'location' | 'offer' | 'info';
  linkToRoute?: RouteName;
}

export type TicketTransportType =
  | 'BUS'
  | 'TRAIN'
  | 'FLIGHT'
  | 'CAB'
  | 'CAR'
  | 'VEHICLE'
  | 'LOCAL';

export interface TicketProviderConfigStatus {
  busConfigured: boolean;
  trainConfigured: boolean;
  flightConfigured: boolean;
  busProviderName?: string;
  trainProviderName?: string;
  flightProviderName?: string;
  isLiveProduction: boolean;
  message: string;
}

export interface TicketSearchResult {
  id: string;
  transportType: TicketTransportType;
  operator: string;
  serviceNumber: string; // e.g. "KSRTC Airavat Club Class", "12760 Charminar Exp", "6E-204 Indigo"
  origin: string;
  originState?: string;
  originDistrict?: string;
  originCoordinates: { lat: number; lng: number };
  destination: string;
  destinationState?: string;
  destinationDistrict?: string;
  destinationCoordinates: { lat: number; lng: number };
  departureTime: string;
  arrivalTime: string;
  duration: string;
  fare: number;
  availableSeats: number;
  travelClass: string;
  amenities?: string[];
  isVerifiedProvider: boolean;
  providerName: string;
  boardingPoint?: string;
  droppingPoint?: string;
  cancellationPolicy: string;
}

export interface TicketBookingRecord {
  id: string;
  bookingRef: string;
  pnrNumber: string;
  transportType: TicketTransportType;
  operator: string;
  serviceNumber: string;
  origin: string;
  originCoordinates: { lat: number; lng: number };
  destination: string;
  destinationCoordinates: { lat: number; lng: number };
  journeyDate: string;
  departureTime: string;
  arrivalTime: string;
  passengers: {
    name: string;
    age: number;
    gender: string;
    seatOrBerth: string;
  }[];
  travelClass: string;
  fare: number;
  taxes: number;
  totalAmount: number;
  status: 'Confirmed' | 'Integration Required' | 'Cancelled' | 'Pending';
  bookedAt: string;
  isVerifiedProvider: boolean;
  providerName: string;
  cancellationPolicy: string;
}
