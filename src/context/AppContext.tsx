import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  RouteName,
  UserProfile,
  Trip,
  HotelBooking,
  TravelBooking,
  FoodOrder,
  FoodCartItem,
  FoodItem,
  NotificationItem,
  TicketBookingRecord,
} from '../types';
import {
  INITIAL_USER,
  INITIAL_TRIPS,
  INITIAL_HOTEL_BOOKINGS,
  INITIAL_TRAVEL_BOOKINGS,
  INITIAL_FOOD_ORDERS,
  INITIAL_NOTIFICATIONS,
  INITIAL_TICKET_BOOKINGS,
} from '../data/mockData';

interface LiveLocationState {
  isTracking: boolean;
  coords: {
    latitude: number;
    longitude: number;
    accuracy: number;
    heading: number | null;
    speed: number | null;
    altitude: number | null;
  } | null;
  address: string;
  lastUpdated: string | null;
  error: string | null;
  watchId: number | null;
}

interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface AppContextType {
  currentRoute: RouteName;
  routeParams: any;
  navigateTo: (route: RouteName, params?: any) => void;
  // Auth
  currentUser: UserProfile | null;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: { name: string; email: string; phone: string; password: string }) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (data: Partial<UserProfile>) => void;
  switchRole: (role: 'USER' | 'OWNER' | 'ADMIN') => void;
  // Trips
  trips: Trip[];
  addTrip: (trip: Trip) => void;
  updateTrip: (trip: Trip) => void;
  deleteTrip: (id: string) => void;
  // Bookings
  hotelBookings: HotelBooking[];
  addHotelBooking: (booking: HotelBooking) => void;
  cancelHotelBooking: (id: string) => void;
  travelBookings: TravelBooking[];
  addTravelBooking: (booking: TravelBooking) => void;
  cancelTravelBooking: (id: string) => void;
  // All-India Ticket Bookings (Bus, Train, Flight)
  ticketBookings: TicketBookingRecord[];
  addTicketBooking: (booking: TicketBookingRecord) => void;
  cancelTicketBooking: (id: string) => void;
  // Food
  foodOrders: FoodOrder[];
  addFoodOrder: (order: FoodOrder) => void;
  cartItems: FoodCartItem[];
  addToCart: (item: FoodItem, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateCartQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  // Favorites
  favoriteIds: string[];
  toggleFavorite: (id: string, name?: string) => void;
  isFavorite: (id: string) => boolean;
  // Live GPS
  liveLocation: LiveLocationState;
  startLiveLocation: () => void;
  stopLiveLocation: () => void;
  // Notifications
  notifications: NotificationItem[];
  markNotificationAsRead: (id: string) => void;
  clearAllNotifications: () => void;
  addNotification: (item: Omit<NotificationItem, 'id' | 'timestamp' | 'isRead'>) => void;
  unreadNotificationsCount: number;
  // Toasts
  toasts: ToastMessage[];
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  dismissToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation
  const [currentRoute, setCurrentRoute] = useState<RouteName>('home');
  const [routeParams, setRouteParams] = useState<any>(null);

  // Authentication
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('swastik_user') || localStorage.getItem('sathwika_user');
      return saved ? JSON.parse(saved) : INITIAL_USER;
    } catch {
      return INITIAL_USER;
    }
  });

  // Data states with localStorage persistence
  const [trips, setTrips] = useState<Trip[]>(() => {
    try {
      const saved = localStorage.getItem('swastik_trips') || localStorage.getItem('sathwika_trips');
      return saved ? JSON.parse(saved) : INITIAL_TRIPS;
    } catch {
      return INITIAL_TRIPS;
    }
  });

  const [hotelBookings, setHotelBookings] = useState<HotelBooking[]>(() => {
    try {
      const saved = localStorage.getItem('swastik_hotel_bookings') || localStorage.getItem('sathwika_hotel_bookings');
      return saved ? JSON.parse(saved) : INITIAL_HOTEL_BOOKINGS;
    } catch {
      return INITIAL_HOTEL_BOOKINGS;
    }
  });

  const [travelBookings, setTravelBookings] = useState<TravelBooking[]>(() => {
    try {
      const saved = localStorage.getItem('swastik_travel_bookings') || localStorage.getItem('sathwika_travel_bookings');
      return saved ? JSON.parse(saved) : INITIAL_TRAVEL_BOOKINGS;
    } catch {
      return INITIAL_TRAVEL_BOOKINGS;
    }
  });

  const [ticketBookings, setTicketBookings] = useState<TicketBookingRecord[]>(() => {
    try {
      const saved = localStorage.getItem('swastik_ticket_bookings') || localStorage.getItem('sathwika_ticket_bookings');
      return saved ? JSON.parse(saved) : INITIAL_TICKET_BOOKINGS;
    } catch {
      return INITIAL_TICKET_BOOKINGS;
    }
  });

  const [foodOrders, setFoodOrders] = useState<FoodOrder[]>(() => {
    try {
      const saved = localStorage.getItem('swastik_food_orders') || localStorage.getItem('sathwika_food_orders');
      return saved ? JSON.parse(saved) : INITIAL_FOOD_ORDERS;
    } catch {
      return INITIAL_FOOD_ORDERS;
    }
  });

  const [cartItems, setCartItems] = useState<FoodCartItem[]>(() => {
    try {
      const saved = localStorage.getItem('sathwika_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('sathwika_favorites');
      return saved
        ? JSON.parse(saved)
        : ['dest-tirupati-tirumala', 'dest-talakona-waterfalls', 'hotel-taj-tirupati', 'wf-kapila-theertham'];
    } catch {
      return ['dest-tirupati-tirumala', 'dest-talakona-waterfalls'];
    }
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    try {
      const saved = localStorage.getItem('sathwika_notifications');
      return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
    } catch {
      return INITIAL_NOTIFICATIONS;
    }
  });

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Live Location State (Real Browser GPS)
  const [liveLocation, setLiveLocation] = useState<LiveLocationState>({
    isTracking: false,
    coords: null,
    address: 'Awaiting GPS Permission...',
    lastUpdated: null,
    error: null,
    watchId: null,
  });

  // Persist to local storage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('sathwika_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('sathwika_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('sathwika_trips', JSON.stringify(trips));
  }, [trips]);

  useEffect(() => {
    localStorage.setItem('sathwika_hotel_bookings', JSON.stringify(hotelBookings));
  }, [hotelBookings]);

  useEffect(() => {
    localStorage.setItem('sathwika_travel_bookings', JSON.stringify(travelBookings));
  }, [travelBookings]);

  useEffect(() => {
    localStorage.setItem('sathwika_ticket_bookings', JSON.stringify(ticketBookings));
  }, [ticketBookings]);

  useEffect(() => {
    localStorage.setItem('sathwika_food_orders', JSON.stringify(foodOrders));
  }, [foodOrders]);

  useEffect(() => {
    localStorage.setItem('sathwika_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('sathwika_favorites', JSON.stringify(favoriteIds));
  }, [favoriteIds]);

  useEffect(() => {
    localStorage.setItem('sathwika_notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Toast Helper
  const showToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Navigation
  const navigateTo = useCallback((route: RouteName, params?: any) => {
    setCurrentRoute(route);
    setRouteParams(params || null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Authentication Actions
  const login = async (email: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    if (!email || !pass) {
      return { success: false, error: 'Please enter both email and password' };
    }
    // Simulate auth verify
    const loggedUser: UserProfile = {
      id: 'usr-' + Date.now(),
      name: email.split('@')[0].toUpperCase(),
      email: email.trim().toLowerCase(),
      phone: '+91 98765 43210',
      preferredTravelType: 'Family',
      preferredDestinations: ['Tirupati & Tirumala', 'Araku Valley'],
      budgetPreference: 'Moderate',
      joinedDate: 'October 2026',
    };
    setCurrentUser(loggedUser);
    showToast(`Welcome back, ${loggedUser.name}!`, 'success');
    addNotification({
      title: 'Successful Login',
      message: `Signed in as ${loggedUser.email} on ${new Date().toLocaleTimeString()}`,
      type: 'info',
    });
    return { success: true };
  };

  const register = async (data: { name: string; email: string; phone: string; password: string }): Promise<{ success: boolean; error?: string }> => {
    if (!data.name || !data.email || !data.password) {
      return { success: false, error: 'All fields are required' };
    }
    const newUser: UserProfile = {
      id: 'usr-' + Date.now(),
      name: data.name.trim(),
      email: data.email.trim().toLowerCase(),
      phone: data.phone.trim(),
      preferredTravelType: 'Family',
      preferredDestinations: ['Tirupati', 'Waterfalls', 'Hill Stations'],
      budgetPreference: 'Moderate',
      joinedDate: 'October 2026',
    };
    setCurrentUser(newUser);
    showToast(`Welcome to Swastik Travels, ${newUser.name}!`, 'success');
    addNotification({
      title: 'Account Created 🎉',
      message: 'Your Swastik Travels account has been created successfully. Start exploring!',
      type: 'info',
    });
    return { success: true };
  };

  const logout = () => {
    setCurrentUser(null);
    showToast('You have been logged out successfully', 'info');
    navigateTo('home');
  };

  const updateProfile = (data: Partial<UserProfile>) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...data };
    setCurrentUser(updated);
    showToast('Profile updated successfully', 'success');
  };

  const switchRole = (newRole: 'USER' | 'OWNER' | 'ADMIN') => {
    if (!currentUser) return;
    const updated = { ...currentUser, role: newRole };
    setCurrentUser(updated);
    showToast(`Switched active role to: ${newRole}`, 'info');
  };

  // Trips Actions
  const addTrip = (trip: Trip) => {
    setTrips((prev) => [trip, ...prev]);
    showToast(`Trip to ${trip.destination} saved!`, 'success');
    addNotification({
      title: 'Trip Created 🗺️',
      message: `Your trip "${trip.title}" (${trip.startDate} - ${trip.endDate}) is saved.`,
      type: 'trip',
      linkToRoute: 'my-trips',
    });
  };

  const updateTrip = (updatedTrip: Trip) => {
    setTrips((prev) => prev.map((t) => (t.id === updatedTrip.id ? updatedTrip : t)));
    showToast('Trip itinerary updated', 'success');
  };

  const deleteTrip = (id: string) => {
    setTrips((prev) => prev.filter((t) => t.id !== id));
    showToast('Trip removed', 'info');
  };

  // Bookings Actions
  const addHotelBooking = (booking: HotelBooking) => {
    setHotelBookings((prev) => [booking, ...prev]);
    showToast(`Hotel booked successfully! Ref: ${booking.bookingRef}`, 'success');
    addNotification({
      title: 'Hotel Booking Confirmed 🏨',
      message: `Your reservation at ${booking.hotelName} is confirmed for ${booking.checkInDate}.`,
      type: 'booking',
      linkToRoute: 'my-bookings',
    });
  };

  const cancelHotelBooking = (id: string) => {
    setHotelBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: 'Cancelled' } : b))
    );
    showToast('Hotel booking has been cancelled', 'info');
  };

  const addTravelBooking = (booking: TravelBooking) => {
    setTravelBookings((prev) => [booking, ...prev]);
    showToast(`Travel booked successfully! Ref: ${booking.bookingRef}`, 'success');
    addNotification({
      title: `${booking.mode} Booking Confirmed 🚌`,
      message: `Ticket from ${booking.origin} to ${booking.destination} on ${booking.departureDate}.`,
      type: 'booking',
      linkToRoute: 'my-bookings',
    });
  };

  const cancelTravelBooking = (id: string) => {
    setTravelBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: 'Cancelled' } : b))
    );
    showToast('Travel ticket cancelled', 'info');
  };

  // Ticket Bookings Actions (All India Routes)
  const addTicketBooking = (booking: TicketBookingRecord) => {
    setTicketBookings((prev) => [booking, ...prev]);
    showToast(`Ticket reserved! PNR: ${booking.pnrNumber}`, 'success');
    addNotification({
      title: `${booking.transportType} Ticket Issued 🎫`,
      message: `${booking.operator} (${booking.serviceNumber}): PNR ${booking.pnrNumber} confirmed.`,
      type: 'booking',
      linkToRoute: 'ticket-booking',
    });
  };

  const cancelTicketBooking = (id: string) => {
    setTicketBookings((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: 'Cancelled' } : t))
    );
    showToast('Ticket cancelled. Refund initiated as per policy.', 'info');
  };

  // Food Ordering Actions
  const addToCart = (item: FoodItem, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.item.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.item.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { item, quantity }];
    });
    showToast(`Added ${item.name} to cart`, 'success');
  };

  const removeFromCart = (itemId: string) => {
    setCartItems((prev) => prev.filter((i) => i.item.id !== itemId));
  };

  const updateCartQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((i) => (i.item.id === itemId ? { ...i, quantity } : i))
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartTotal = cartItems.reduce((acc, curr) => acc + curr.item.price * curr.quantity, 0);
  const cartCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);

  const addFoodOrder = (order: FoodOrder) => {
    setFoodOrders((prev) => [order, ...prev]);
    clearCart();
    showToast(`Order placed successfully! Ref: ${order.orderRef}`, 'success');
    addNotification({
      title: 'Food Order Placed 🍽️',
      message: `Delicious meal from ${order.restaurantName} is preparing! Total: ₹${order.totalAmount}`,
      type: 'booking',
      linkToRoute: 'my-bookings',
    });
  };

  // Favorites
  const toggleFavorite = (id: string, name?: string) => {
    setFavoriteIds((prev) => {
      const exists = prev.includes(id);
      if (exists) {
        showToast(name ? `Removed ${name} from favorites` : 'Removed from favorites', 'info');
        return prev.filter((i) => i !== id);
      } else {
        showToast(name ? `Added ${name} to favorites ❤️` : 'Added to favorites ❤️', 'success');
        return [...prev, id];
      }
    });
  };

  const isFavorite = (id: string) => favoriteIds.includes(id);

  // Live Location Tracking (Real Browser GPS watchPosition)
  const stopLiveLocation = useCallback(() => {
    if (liveLocation.watchId !== null && navigator.geolocation) {
      navigator.geolocation.clearWatch(liveLocation.watchId);
    }
    setLiveLocation((prev) => ({
      ...prev,
      isTracking: false,
      watchId: null,
      error: null,
    }));
    showToast('Live Location tracking stopped', 'info');
  }, [liveLocation.watchId, showToast]);

  const startLiveLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setLiveLocation((prev) => ({
        ...prev,
        error: 'Geolocation is not supported by your browser.',
        isTracking: false,
      }));
      showToast('Geolocation is not supported by your browser.', 'error');
      return;
    }

    setLiveLocation((prev) => ({
      ...prev,
      isTracking: true,
      error: null,
    }));

    showToast('Requesting GPS permission...', 'info');

    const id = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude, accuracy, heading, speed, altitude } = pos.coords;
        const now = new Date().toLocaleTimeString();

        // Approximate location context or city based on coordinates
        let detectedAddress = `Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}`;
        // Check if near Tirupati coordinates (~13.6, 79.4)
        if (Math.abs(latitude - 13.6288) < 0.5 && Math.abs(longitude - 79.4192) < 0.5) {
          detectedAddress = `Tirupati Region, Andhra Pradesh (${latitude.toFixed(4)}° N, ${longitude.toFixed(4)}° E)`;
        } else if (Math.abs(latitude - 17.385) < 0.5 && Math.abs(longitude - 78.4867) < 0.5) {
          detectedAddress = `Hyderabad Region, Telangana (${latitude.toFixed(4)}° N, ${longitude.toFixed(4)}° E)`;
        } else if (Math.abs(latitude - 12.9716) < 0.5 && Math.abs(longitude - 77.5946) < 0.5) {
          detectedAddress = `Bengaluru Region, Karnataka (${latitude.toFixed(4)}° N, ${longitude.toFixed(4)}° E)`;
        }

        setLiveLocation({
          isTracking: true,
          coords: {
            latitude,
            longitude,
            accuracy: Math.round(accuracy),
            heading,
            speed,
            altitude,
          },
          address: detectedAddress,
          lastUpdated: now,
          error: null,
          watchId: id,
        });
      },
      (err) => {
        let msg = 'Your location could not be determined.';
        if (err.code === err.PERMISSION_DENIED) {
          msg = 'Location permission was denied. Please enable location permission in your browser settings.';
        } else if (err.code === err.TIMEOUT) {
          msg = 'Location request timed out. Please try again.';
        }
        setLiveLocation((prev) => ({
          ...prev,
          isTracking: false,
          watchId: null,
          error: msg,
        }));
        showToast(msg, 'error');
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 5000,
      }
    );

    setLiveLocation((prev) => ({
      ...prev,
      watchId: id,
    }));
  }, [showToast]);

  // Clean up watcher on unmount
  useEffect(() => {
    return () => {
      if (liveLocation.watchId !== null && navigator.geolocation) {
        navigator.geolocation.clearWatch(liveLocation.watchId);
      }
    };
  }, [liveLocation.watchId]);

  // Notifications
  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    showToast('All notifications cleared', 'info');
  };

  const addNotification = (item: Omit<NotificationItem, 'id' | 'timestamp' | 'isRead'>) => {
    const newItem: NotificationItem = {
      ...item,
      id: 'notif-' + Date.now(),
      timestamp: 'Just now',
      isRead: false,
    };
    setNotifications((prev) => [newItem, ...prev]);
  };

  const unreadNotificationsCount = notifications.filter((n) => !n.isRead).length;

  return (
    <AppContext.Provider
      value={{
        currentRoute,
        routeParams,
        navigateTo,
        currentUser,
        login,
        register,
        logout,
        updateProfile,
        switchRole,
        trips,
        addTrip,
        updateTrip,
        deleteTrip,
        hotelBookings,
        addHotelBooking,
        cancelHotelBooking,
        travelBookings,
        addTravelBooking,
        cancelTravelBooking,
        ticketBookings,
        addTicketBooking,
        cancelTicketBooking,
        foodOrders,
        addFoodOrder,
        cartItems,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartTotal,
        cartCount,
        favoriteIds,
        toggleFavorite,
        isFavorite,
        liveLocation,
        startLiveLocation,
        stopLiveLocation,
        notifications,
        markNotificationAsRead,
        clearAllNotifications,
        addNotification,
        unreadNotificationsCount,
        toasts,
        showToast,
        dismissToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
