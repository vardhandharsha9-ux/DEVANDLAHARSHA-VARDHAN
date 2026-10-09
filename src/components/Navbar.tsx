import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Compass,
  Heart,
  ShoppingBag,
  Bell,
  MapPin,
  Menu,
  X,
  User,
  Sparkles,
  Plane,
  Building,
  UtensilsCrossed,
  Map,
  Shield,
  ShieldCheck,
  Film,
  LogOut,
  ChevronDown,
  Search,
} from 'lucide-react';
import { NotificationDropdown } from './NotificationDropdown';
import { FoodCartDrawer } from './FoodCartDrawer';
import { SwastikLogo } from './SwastikLogo';

export const Navbar: React.FC<{ onOpenSearch?: () => void }> = ({ onOpenSearch }) => {
  const {
    currentRoute,
    navigateTo,
    currentUser,
    logout,
    favoriteIds,
    cartCount,
    unreadNotificationsCount,
    liveLocation,
    stopLiveLocation,
  } = useApp();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const navLinks: { label: string; route: any; icon: React.ReactNode }[] = [
    { label: 'Home', route: 'home', icon: <Compass className="w-4 h-4" /> },
    { label: 'Explore', route: 'explore', icon: <Map className="w-4 h-4" /> },
    { label: 'Route Explorer', route: 'route-explorer', icon: <span className="text-xs">📍</span> },
    { label: 'Trip Planner', route: 'trip-planner', icon: <Compass className="w-4 h-4" /> },
    { label: 'Hotels', route: 'hotels', icon: <Building className="w-4 h-4" /> },
    { label: 'Travel', route: 'travel', icon: <Plane className="w-4 h-4" /> },
    { label: 'Ticket Booking', route: 'ticket-booking', icon: <span className="text-xs">🎫</span> },
    { label: 'Food', route: 'food', icon: <UtensilsCrossed className="w-4 h-4" /> },
    { label: 'Nearby', route: 'nearby', icon: <MapPin className="w-4 h-4" /> },
    { label: 'Live GPS', route: 'live-location', icon: <span className="text-xs">📍</span> },
    { label: 'AI Assistant', route: 'ai-assistant', icon: <Sparkles className="w-4 h-4 text-amber-500" /> },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-2xs">
        {/* Top Emergency / Live Location Bar if Tracking is active */}
        {liveLocation.isTracking && (
          <div className="bg-emerald-700 text-white text-xs px-4 py-1.5 flex items-center justify-between transition-all">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-300 animate-ping" />
              <span className="font-semibold">Live GPS Active:</span>
              <span className="text-emerald-100 truncate max-w-xs sm:max-w-md">{liveLocation.address}</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigateTo('live-location')}
                className="underline hover:text-emerald-200 text-[11px]"
              >
                View Radar
              </button>
              <button
                onClick={stopLiveLocation}
                className="bg-emerald-800 hover:bg-emerald-900 px-2 py-0.5 rounded text-[10px] font-semibold transition-colors"
              >
                Stop GPS
              </button>
            </div>
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <div
              onClick={() => navigateTo('home')}
              className="cursor-pointer"
            >
              <SwastikLogo variant="header" />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = currentRoute === link.route;
                return (
                  <button
                    key={link.label}
                    onClick={() => navigateTo(link.route)}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                      isActive
                        ? 'bg-emerald-50 text-emerald-800 shadow-2xs font-bold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                    }`}
                  >
                    {link.icon}
                    <span>{link.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Right Action Icons */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* Quick Search */}
              {onOpenSearch && (
                <button
                  onClick={onOpenSearch}
                  className="p-2 sm:px-3 sm:py-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 flex items-center gap-2 transition-colors"
                  title="Search places, hotels, waterfalls"
                >
                  <Search className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                  <span className="hidden md:inline text-xs font-medium text-slate-500">Search...</span>
                </button>
              )}

              {/* Favorites */}
              <button
                onClick={() => navigateTo('favorites')}
                className={`relative p-2 rounded-xl transition-colors ${
                  currentRoute === 'favorites'
                    ? 'bg-rose-50 text-rose-600'
                    : 'text-slate-600 hover:text-rose-600 hover:bg-slate-100'
                }`}
                title="Saved Favorites"
              >
                <Heart className="w-5 h-5" />
                {favoriteIds.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {favoriteIds.length}
                  </span>
                )}
              </button>

              {/* Food Cart */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 rounded-xl text-slate-600 hover:text-emerald-700 hover:bg-slate-100 transition-colors"
                title="Food Cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center animate-bounce">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setIsNotifOpen(!isNotifOpen)}
                  className="relative p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                  title="Notifications"
                >
                  <Bell className="w-5 h-5" />
                  {unreadNotificationsCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                      {unreadNotificationsCount}
                    </span>
                  )}
                </button>
                <NotificationDropdown
                  isOpen={isNotifOpen}
                  onClose={() => setIsNotifOpen(false)}
                />
              </div>

              {/* User Profile / Dashboard Menu */}
              {currentUser ? (
                <div className="relative">
                  <button
                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                    className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-xl hover:bg-slate-100 transition-colors"
                  >
                    {currentUser.avatarUrl ? (
                      <img
                        src={currentUser.avatarUrl}
                        alt={currentUser.name}
                        className="w-8 h-8 rounded-full object-cover border border-emerald-400"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                        {currentUser.name.charAt(0)}
                      </div>
                    )}
                    <span className="hidden lg:inline text-xs font-semibold text-slate-800 max-w-[90px] truncate">
                      {currentUser.name.split(' ')[0]}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </button>

                  {isProfileMenuOpen && (
                    <div
                      className="absolute right-0 mt-2 w-72 bg-white rounded-3xl shadow-2xl border border-slate-200/90 p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150 space-y-3"
                      onMouseLeave={() => setIsProfileMenuOpen(false)}
                    >
                      {/* Owner Profile Card (Requirement 19) */}
                      {currentUser.role === 'OWNER' || currentUser.role === 'ADMIN' ? (
                        <div className="bg-gradient-to-br from-emerald-950 via-teal-900 to-slate-900 rounded-2xl p-4 text-white shadow-md space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-black uppercase tracking-wider text-amber-300 bg-amber-400/20 px-2 py-0.5 rounded-md">
                              👤 OWNER PROFILE
                            </span>
                            <span className="text-[10px] text-emerald-200 font-bold">2026</span>
                          </div>
                          <div>
                            <h4 className="text-sm font-extrabold text-white">
                              DEVANDLA HARSHA VARDHAN
                            </h4>
                            <p className="text-[11px] text-emerald-300 font-semibold">
                              Owner & Developer
                            </p>
                            <p className="text-[10px] text-slate-300">
                              Swastik Travels
                            </p>
                          </div>
                          <div className="text-[11px] text-emerald-100 flex items-center gap-1.5 pt-1 border-t border-emerald-700/60">
                            <span>📱</span>
                            <strong className="text-white">9391892404</strong>
                          </div>

                          <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
                            <button
                              onClick={() => {
                                navigateTo('owner-profile');
                                setIsProfileMenuOpen(false);
                              }}
                              className="w-full py-1.5 px-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-[11px] transition-colors"
                            >
                              View Profile
                            </button>
                            <button
                              onClick={() => {
                                navigateTo('owner-settings');
                                setIsProfileMenuOpen(false);
                              }}
                              className="w-full py-1.5 px-2 bg-white/20 hover:bg-white/30 text-white rounded-xl font-bold text-[11px] transition-colors"
                            >
                              Settings ⚙️
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="px-3 py-2 border-b border-slate-100">
                          <p className="text-xs font-bold text-slate-800">{currentUser.name}</p>
                          <p className="text-[11px] text-slate-500 truncate">{currentUser.email}</p>
                        </div>
                      )}

                      <div className="py-1 space-y-0.5 text-xs">
                        <button
                          onClick={() => {
                            navigateTo('owner-settings');
                            setIsProfileMenuOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 font-bold text-emerald-800 hover:bg-emerald-50 rounded-xl flex items-center gap-2 transition-colors"
                        >
                          <ShieldCheck className="w-4 h-4 text-emerald-600" />
                          <span>⚙️ Owner Settings & RBAC</span>
                        </button>
                        <button
                          onClick={() => {
                            navigateTo('dashboard');
                            setIsProfileMenuOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 font-medium text-slate-700 hover:bg-slate-50 rounded-xl flex items-center gap-2 transition-colors"
                        >
                          <Compass className="w-4 h-4 text-emerald-600" />
                          <span>Travel Dashboard</span>
                        </button>
                        <button
                          onClick={() => {
                            navigateTo('ticket-booking');
                            setIsProfileMenuOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 font-medium text-slate-700 hover:bg-slate-50 rounded-xl flex items-center gap-2 transition-colors"
                        >
                          <span className="text-xs">🎫</span>
                          <span>Ticket Booking (Bus, Train, Flight)</span>
                        </button>
                        <button
                          onClick={() => {
                            navigateTo('my-trips');
                            setIsProfileMenuOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 font-medium text-slate-700 hover:bg-slate-50 rounded-xl flex items-center gap-2 transition-colors"
                        >
                          <Map className="w-4 h-4 text-teal-600" />
                          <span>My Trips</span>
                        </button>
                        <button
                          onClick={() => {
                            navigateTo('my-bookings');
                            setIsProfileMenuOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 font-medium text-slate-700 hover:bg-slate-50 rounded-xl flex items-center gap-2 transition-colors"
                        >
                          <Plane className="w-4 h-4 text-emerald-600" />
                          <span>My Bookings</span>
                        </button>
                        <button
                          onClick={() => {
                            navigateTo('profile');
                            setIsProfileMenuOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 font-medium text-slate-700 hover:bg-slate-50 rounded-xl flex items-center gap-2 transition-colors"
                        >
                          <User className="w-4 h-4 text-cyan-600" />
                          <span>Traveler Profile</span>
                        </button>
                      </div>

                      <div className="border-t border-slate-100 pt-1">
                        <button
                          onClick={() => {
                            logout();
                            setIsProfileMenuOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl flex items-center gap-2 transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => navigateTo('login')}
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-sm transition-all"
                >
                  Sign In
                </button>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="xl:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Full Menu Drawer */}
        {isMobileMenuOpen && (
          <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-1 shadow-lg max-h-[85vh] overflow-y-auto animate-in slide-in-from-top duration-200">
            <div className="py-2 border-b border-slate-100 grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  navigateTo('dashboard');
                  setIsMobileMenuOpen(false);
                }}
                className="p-2.5 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold flex items-center gap-2"
              >
                <Compass className="w-4 h-4 text-emerald-600" /> Travel Dashboard
              </button>
              <button
                onClick={() => {
                  navigateTo('live-location');
                  setIsMobileMenuOpen(false);
                }}
                className="p-2.5 rounded-xl bg-cyan-50 text-cyan-800 text-xs font-bold flex items-center gap-2"
              >
                <span>📍</span> Live GPS Radar
              </button>
            </div>

            <div className="py-2 space-y-1">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => {
                    navigateTo(link.route);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 ${
                    currentRoute === link.route
                      ? 'bg-emerald-600 text-white font-bold'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </button>
              ))}

              <button
                onClick={() => {
                  navigateTo('hospitals');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 text-slate-700 hover:bg-slate-100"
              >
                <span>🏥</span> Hospitals (Emergency & 24x7)
              </button>
              <button
                onClick={() => {
                  navigateTo('waterfalls');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 text-slate-700 hover:bg-slate-100"
              >
                <span>💧</span> Waterfalls
              </button>
              <button
                onClick={() => {
                  navigateTo('zoo-parks');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 text-slate-700 hover:bg-slate-100"
              >
                <span>🦁</span> Zoo Parks & Wildlife
              </button>
              <button
                onClick={() => {
                  navigateTo('bookmyshow');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 text-slate-700 hover:bg-slate-100"
              >
                <span>🎬</span> BookMyShow Movies & Events
              </button>
              <button
                onClick={() => {
                  navigateTo('my-trips');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 text-slate-700 hover:bg-slate-100"
              >
                <Map className="w-4 h-4 text-emerald-600" /> My Trips & Itineraries
              </button>
              <button
                onClick={() => {
                  navigateTo('my-bookings');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 text-slate-700 hover:bg-slate-100"
              >
                <Building className="w-4 h-4 text-emerald-600" /> My Bookings (Hotels, Travel, Food)
              </button>
            </div>

            {currentUser && (
              <div className="pt-2 border-t border-slate-100">
                <button
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 text-xs font-semibold text-rose-600 flex items-center gap-2 hover:bg-rose-50 rounded-xl"
                >
                  <LogOut className="w-4 h-4" /> Sign Out ({currentUser.name})
                </button>
              </div>
            )}
          </div>
        )}
      </header>

      {/* Cart Drawer */}
      <FoodCartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};
