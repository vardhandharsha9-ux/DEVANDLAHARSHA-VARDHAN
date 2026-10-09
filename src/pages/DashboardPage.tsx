import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Compass,
  MapPin,
  Calendar,
  Building,
  Plane,
  Utensils,
  Heart,
  Ticket,
  Sparkles,
  ArrowRight,
  Clock,
  ShieldAlert,
  Film,
  Droplets,
  PawPrint,
  User,
} from 'lucide-react';
import { DESTINATIONS } from '../data/mockData';

export const DashboardPage: React.FC = () => {
  const {
    currentUser,
    trips,
    hotelBookings,
    travelBookings,
    ticketBookings,
    foodOrders,
    favoriteIds,
    liveLocation,
    navigateTo,
  } = useApp();

  const upcomingTrip = trips.find((t) => t.status === 'Upcoming') || trips[0];

  const dashboardServices = [
    { id: 'route-explorer', title: 'Route Explorer', emoji: '🛣️', route: 'route-explorer', subtitle: 'Pan-India Routes & Live GPS', count: 'All 36 States' },
    { id: 'hotels', title: 'Hotels', emoji: '🏨', route: 'hotels', subtitle: 'Book verified stays', count: `${hotelBookings.length} Booked` },
    { id: 'travel', title: 'Travel Booking', emoji: '🚌', route: 'travel', subtitle: 'Bus, Train, Flight & Cab', count: `${travelBookings.length} Tickets` },
    { id: 'ticket-booking', title: 'Ticket Booking', emoji: '🎫', route: 'ticket-booking', subtitle: 'Bus, Train, Flight, Cab & Vehicle', count: `${ticketBookings.length} Issued` },
    { id: 'food', title: 'Food Ordering', emoji: '🍽️', route: 'food', subtitle: 'Authentic local cuisine', count: `${foodOrders.length} Orders` },
    { id: 'trip-planner', title: 'Trip Planner', emoji: '🗺️', route: 'trip-planner', subtitle: 'Auto-generate itineraries', count: `${trips.length} Trips` },
    { id: 'live-location', title: 'Live Location', emoji: '📍', route: 'live-location', subtitle: 'Real-time GPS tracker', count: liveLocation.isTracking ? 'Active' : 'Standby' },
    { id: 'hospitals', title: 'Hospitals', emoji: '🏥', route: 'hospitals', subtitle: 'Emergency 24x7 & Doctors', count: 'Emergency Guide' },
    { id: 'waterfalls', title: 'Waterfalls', emoji: '💧', route: 'waterfalls', subtitle: 'Talakona & South India', count: '10+ Spots' },
    { id: 'zoo-parks', title: 'Zoo Parks', emoji: '🦁', route: 'zoo-parks', subtitle: 'Wildlife & Lion Safaris', count: 'Asia 2nd Largest' },
    { id: 'bookmyshow', title: 'BookMyShow', emoji: '🎬', route: 'bookmyshow', subtitle: 'Movies, Plays & Events', count: 'External Booking' },
    { id: 'favorites', title: 'Favorites', emoji: '❤️', route: 'favorites', subtitle: 'Saved travel gems', count: `${favoriteIds.length} Saved` },
    { id: 'nearby', title: 'Nearby Places', emoji: '📌', route: 'nearby', subtitle: 'ATMs, Fuel & Temples', count: 'GPS Range' },
    { id: 'explore', title: 'Explore Destinations', emoji: '🌍', route: 'explore', subtitle: 'All Indian states & World', count: 'Hierarchical' },
    { id: 'ai-assistant', title: 'AI Travel Assistant', emoji: '🤖', route: 'ai-assistant', subtitle: 'Ask itineraries & budget', count: 'Smart Agent' },
  ];

  const favoriteDests = DESTINATIONS.filter((d) => favoriteIds.includes(d.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Owner Dashboard Banner (Requirement 5: Only when OWNER or ADMIN is logged in) */}
      {(currentUser?.role === 'OWNER' || currentUser?.role === 'ADMIN') && (
        <div className="bg-gradient-to-r from-amber-500/10 via-emerald-500/10 to-teal-500/10 rounded-3xl p-6 border-2 border-emerald-500/30 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-[11px] font-black uppercase tracking-wider">
              <span>👑 AUTHENTICATED OWNER ACCESS</span>
            </div>
            <h3 className="text-xl font-black text-slate-900 font-heading">
              DEVANDLA HARSHA VARDHAN &bull; Owner Dashboard
            </h3>
            <p className="text-xs text-slate-600">
              Swastik Travels &bull; Manage application settings, API health, security controls, and role-based permissions.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => navigateTo('owner-settings')}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-xl shadow-sm transition-all flex items-center gap-1.5"
            >
              <span>⚙️ Owner Settings</span>
            </button>
            <button
              onClick={() => navigateTo('owner-profile')}
              className="px-4 py-2.5 bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 font-bold text-xs rounded-xl shadow-xs transition-colors"
            >
              <span>👤 View Profile</span>
            </button>
          </div>
        </div>
      )}

      {/* Welcome Banner */}
      <div className="bg-linear-to-r from-emerald-900 via-teal-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold mb-3">
            <span>✨ Traveler Dashboard</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold font-heading">
            Welcome to Swastik Travels
          </h1>
          <p className="text-slate-300 text-sm mt-1">
            Logged in as <strong className="text-white">{currentUser?.name || 'Explorer'}</strong> ({currentUser?.email})
          </p>
          <div className="flex flex-wrap items-center gap-4 mt-4 text-xs text-slate-300">
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-lg">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" /> Current Focus: <strong>Tirupati & Tirumala</strong>
            </span>
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-lg">
              <Calendar className="w-3.5 h-3.5 text-amber-400" /> Next Trip: <strong>15 Oct 2026</strong>
            </span>
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-lg">
              <Ticket className="w-3.5 h-3.5 text-cyan-400" /> Active Bookings: <strong>{hotelBookings.length + travelBookings.length}</strong>
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <button
            onClick={() => navigateTo('route-explorer')}
            className="px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>🛣️ Route Explorer</span>
          </button>
          <button
            onClick={() => navigateTo('trip-planner')}
            className="px-5 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-2xl text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span>Plan New Trip</span>
          </button>
          <button
            onClick={() => navigateTo('live-location')}
            className="px-5 py-3 bg-emerald-700 hover:bg-emerald-600 text-white font-bold rounded-2xl text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>📍 Live GPS</span>
          </button>
        </div>
      </div>

      {/* 13 Clickable Dashboard Service Cards */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading">
            Travel Services & Shortcuts
          </h2>
          <span className="text-xs text-slate-500">Tap any service to open</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {dashboardServices.map((svc) => (
            <div
              key={svc.id}
              onClick={() => navigateTo(svc.route as any)}
              className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-100 hover:border-emerald-300 hover:shadow-xl transition-all duration-300 cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-slate-50 group-hover:bg-emerald-50 flex items-center justify-center text-2xl mb-3 shadow-2xs group-hover:scale-110 transition-transform">
                  {svc.emoji}
                </div>
                <h3 className="font-bold text-sm text-slate-900 group-hover:text-emerald-700 transition-colors">
                  {svc.title}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">{svc.subtitle}</p>
              </div>

              <div className="mt-4 pt-2 border-t border-slate-50 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">
                  {svc.count}
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-700 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Upcoming Trip Section & Recent Bookings */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upcoming Trip Highlight (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-emerald-600" />
              <span>Upcoming Journey</span>
            </h3>
            <button
              onClick={() => navigateTo('my-trips')}
              className="text-xs font-semibold text-emerald-700 hover:underline"
            >
              Manage Trips
            </button>
          </div>

          {upcomingTrip ? (
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-md space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div>
                  <span className="inline-block bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-1">
                    {upcomingTrip.status} • {upcomingTrip.travelType}
                  </span>
                  <h4 className="text-lg sm:text-xl font-bold text-slate-900">{upcomingTrip.title}</h4>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600" /> {upcomingTrip.startLocation} ➔ {upcomingTrip.destination}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Trip Dates</span>
                  <span className="text-xs sm:text-sm font-bold text-slate-800">
                    {upcomingTrip.startDate} to {upcomingTrip.endDate}
                  </span>
                </div>
              </div>

              {/* Itinerary Preview */}
              <div className="space-y-3">
                <h5 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Day 1 Overview: {upcomingTrip.itinerary[0]?.title}
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {upcomingTrip.itinerary[0]?.items.slice(0, 3).map((item) => (
                    <div key={item.id} className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-xs space-y-1">
                      <span className="text-[10px] font-bold text-emerald-700 uppercase">{item.timeSlot}</span>
                      <p className="font-semibold text-slate-800 line-clamp-1">{item.place}</p>
                      <p className="text-[11px] text-slate-500 line-clamp-2">{item.activity}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-xs font-bold text-slate-700">
                  Estimated Budget: <span className="text-emerald-700">₹{upcomingTrip.budget.toLocaleString()}</span>
                </span>
                <button
                  onClick={() => navigateTo('my-trips')}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-colors"
                >
                  View Full Itinerary
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-8 border border-slate-100 text-center text-slate-400">
              <Calendar className="w-10 h-10 mx-auto mb-2 text-slate-300" />
              <p className="text-sm font-semibold text-slate-700">No upcoming trips planned</p>
              <button
                onClick={() => navigateTo('trip-planner')}
                className="mt-3 px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl"
              >
                Plan a Trip Now
              </button>
            </div>
          )}
        </div>

        {/* Recent Bookings (1 col) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Ticket className="w-5 h-5 text-emerald-600" />
              <span>Recent Bookings</span>
            </h3>
            <button
              onClick={() => navigateTo('my-bookings')}
              className="text-xs font-semibold text-emerald-700 hover:underline"
            >
              View All
            </button>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-md space-y-3">
            {hotelBookings.slice(0, 1).map((hb) => (
              <div key={hb.id} className="p-3 rounded-2xl bg-blue-50/50 border border-blue-100 text-xs space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-blue-900">🏨 Hotel Booking</span>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {hb.status}
                  </span>
                </div>
                <p className="font-semibold text-slate-800">{hb.hotelName}</p>
                <p className="text-[11px] text-slate-500">
                  {hb.checkInDate} • {hb.roomType}
                </p>
                <div className="flex justify-between items-center pt-1 text-[11px]">
                  <span className="text-slate-400">Ref: {hb.bookingRef}</span>
                  <span className="font-bold text-slate-900">₹{hb.pricing.totalAmount}</span>
                </div>
              </div>
            ))}

            {travelBookings.slice(0, 1).map((tb) => (
              <div key={tb.id} className="p-3 rounded-2xl bg-amber-50/50 border border-amber-100 text-xs space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-amber-900">🚌 {tb.mode} Ticket</span>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {tb.status}
                  </span>
                </div>
                <p className="font-semibold text-slate-800">{tb.operator}</p>
                <p className="text-[11px] text-slate-500">
                  {tb.origin} ➔ {tb.destination} • {tb.departureDate}
                </p>
                <div className="flex justify-between items-center pt-1 text-[11px]">
                  <span className="text-slate-400">Ref: {tb.bookingRef}</span>
                  <span className="font-bold text-slate-900">₹{tb.totalPrice}</span>
                </div>
              </div>
            ))}

            <button
              onClick={() => navigateTo('my-bookings')}
              className="w-full py-2.5 text-center text-xs font-bold text-emerald-700 hover:bg-emerald-50 rounded-xl transition-colors"
            >
              Open Booking Manager ➔
            </button>
          </div>
        </div>
      </div>

      {/* Favorite Destinations Row */}
      {favoriteDests.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
              <span>Your Saved Favorites ({favoriteDests.length})</span>
            </h3>
            <button
              onClick={() => navigateTo('favorites')}
              className="text-xs font-semibold text-emerald-700 hover:underline"
            >
              See All Favorites
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {favoriteDests.slice(0, 4).map((d) => (
              <div
                key={d.id}
                onClick={() => navigateTo('explore', { destinationId: d.id })}
                className="bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-lg transition-all cursor-pointer group"
              >
                <div className="h-32 overflow-hidden relative">
                  <img
                    src={d.imageUrl}
                    alt={d.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-2 left-2 bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {d.category}
                  </span>
                </div>
                <div className="p-3">
                  <h4 className="font-bold text-xs text-slate-800 truncate group-hover:text-emerald-700">
                    {d.name}
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    {d.hierarchy.city}, {d.hierarchy.state}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
