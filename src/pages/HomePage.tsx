import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Search,
  Compass,
  MapPin,
  Calendar,
  Sparkles,
  ShieldCheck,
  Star,
  ArrowRight,
  Heart,
  Droplets,
  PawPrint,
  Clock,
  PhoneCall,
  ExternalLink,
} from 'lucide-react';
import { DESTINATIONS, INDIAN_STATES_AND_UTS, HOTELS } from '../data/mockData';

export const HomePage: React.FC<{ onOpenSearch: () => void }> = ({ onOpenSearch }) => {
  const { navigateTo, isFavorite, toggleFavorite } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('');

  const featuredTirupati = DESTINATIONS.find((d) => d.id === 'dest-tirupati-tirumala') || DESTINATIONS[0];
  const otherDestinations = DESTINATIONS.filter((d) => d.id !== 'dest-tirupati-tirumala').slice(0, 5);

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigateTo('explore', { query: searchQuery, state: selectedState });
    } else {
      navigateTo('explore');
    }
  };

  const serviceCards = [
    { id: 'route-explorer', label: 'Route Explorer', emoji: '🛣️', desc: 'India Maps & GPS', route: 'route-explorer', color: 'from-emerald-500/10 to-teal-600/5' },
    { id: 'hotels', label: 'Hotels', emoji: '🏨', desc: 'Resorts & Stays', route: 'hotels', color: 'from-blue-500/10 to-blue-600/5' },
    { id: 'ticket-booking', label: 'Ticket Booking', emoji: '🎫', desc: 'All-India Bus, Train & Flight', route: 'ticket-booking', color: 'from-emerald-500/10 to-teal-600/5' },
    { id: 'travel', label: 'Travel Booking', emoji: '🚌', desc: 'Bus, Train, Flight & Cab', route: 'travel', color: 'from-amber-500/10 to-amber-600/5' },
    { id: 'food', label: 'Food', emoji: '🍽️', desc: 'Authentic Local Meals', route: 'food', color: 'from-orange-500/10 to-orange-600/5' },
    { id: 'trip-planner', label: 'Trip Planner', emoji: '🗺️', desc: 'AI Day-by-Day Plan', route: 'trip-planner', color: 'from-teal-500/10 to-teal-600/5' },
    { id: 'live-location', label: 'Live Location', emoji: '📍', desc: 'Real GPS Radar', route: 'live-location', color: 'from-emerald-500/10 to-emerald-600/5' },
    { id: 'hospitals', label: 'Hospitals', emoji: '🏥', desc: '24x7 Emergency Care', route: 'hospitals', color: 'from-rose-500/10 to-rose-600/5' },
    { id: 'waterfalls', label: 'Waterfalls', emoji: '💧', desc: 'Talakona & More', route: 'waterfalls', color: 'from-cyan-500/10 to-cyan-600/5' },
    { id: 'zoo-parks', label: 'Zoo Parks', emoji: '🦁', desc: 'Wildlife & Safaris', route: 'zoo-parks', color: 'from-yellow-500/10 to-yellow-600/5' },
    { id: 'bookmyshow', label: 'BookMyShow', emoji: '🎬', desc: 'Movies & Events', route: 'bookmyshow', color: 'from-red-500/10 to-red-600/5' },
    { id: 'favorites', label: 'Favorites', emoji: '❤️', desc: 'Saved Destinations', route: 'favorites', color: 'from-pink-500/10 to-pink-600/5' },
    { id: 'nearby', label: 'Nearby Places', emoji: '📌', desc: 'ATMs, Fuel & Temples', route: 'nearby', color: 'from-indigo-500/10 to-indigo-600/5' },
    { id: 'ai-assistant', label: 'AI Assistant', emoji: '🤖', desc: 'Smart Itineraries', route: 'ai-assistant', color: 'from-purple-500/10 to-purple-600/5' },
  ];

  return (
    <div className="space-y-16 pb-12">
      {/* Hero Section */}
      <section className="relative min-h-[620px] flex items-center justify-center rounded-3xl overflow-hidden mx-4 sm:mx-6 lg:mx-8 mt-4 shadow-2xl">
        {/* Background Image with Gradient Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center transform scale-105 transition-transform duration-1000"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1920&q=85')`,
          }}
        />
        <div className="absolute inset-0 bg-linear-to-b from-slate-950/75 via-slate-900/65 to-emerald-950/85" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-16 text-center text-white space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-400/30 text-emerald-300 text-xs sm:text-sm font-semibold animate-pulse">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Swastik Travels • Explore More. Travel Better.</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight font-heading leading-tight max-w-4xl mx-auto">
            Explore the World with{' '}
            <span className="bg-linear-to-r from-emerald-300 via-teal-200 to-amber-200 bg-clip-text text-transparent">
              Swastik Travels
            </span>
          </h1>

          <p className="text-base sm:text-xl text-slate-200 max-w-2xl mx-auto font-light leading-relaxed">
            Discover destinations, plan unforgettable journeys, book luxury stays, and manage your entire trip in one place.
          </p>

          {/* Interactive Hero Search Form */}
          <form
            onSubmit={handleQuickSearch}
            className="bg-white/95 backdrop-blur-xl p-3 sm:p-4 rounded-3xl shadow-2xl max-w-3xl mx-auto border border-white/20 text-slate-800"
          >
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="flex-1 flex items-center gap-3 px-3 py-2 bg-slate-50 rounded-2xl w-full border border-slate-200/80">
                <Search className="w-5 h-5 text-emerald-600 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Where do you want to go? (e.g. Tirupati, Munnar, Goa)"
                  className="w-full text-xs sm:text-sm bg-transparent outline-hidden font-medium placeholder:text-slate-400"
                />
              </div>

              <div className="w-full sm:w-48 bg-slate-50 rounded-2xl px-3 py-2 border border-slate-200/80">
                <select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="w-full text-xs bg-transparent outline-hidden font-medium text-slate-700 cursor-pointer"
                >
                  <option value="">All States / UTs</option>
                  {INDIAN_STATES_AND_UTS.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-lg hover:shadow-emerald-900/30 transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
              >
                <span>Search</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Quick Action Pill Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => navigateTo('explore')}
              className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold backdrop-blur-md border border-white/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Compass className="w-4 h-4 text-emerald-300" />
              <span>Explore Destinations</span>
            </button>
            <button
              onClick={() => navigateTo('trip-planner')}
              className="px-5 py-2.5 rounded-full bg-amber-500/90 hover:bg-amber-500 text-slate-900 text-xs sm:text-sm font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Plan My Trip</span>
            </button>
            <button
              onClick={() => navigateTo('live-location')}
              className="px-5 py-2.5 rounded-full bg-emerald-600/90 hover:bg-emerald-600 text-white text-xs sm:text-sm font-semibold backdrop-blur-md shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>📍 Live GPS Radar</span>
            </button>
          </div>
        </div>
      </section>

      {/* 12 Service Shortcut Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
          <div>
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest">
              All-In-One Tourism Platform
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading mt-1">
              Travel Services at Your Fingertips
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 sm:mt-0 max-w-sm">
            Everything you need for seamless holidays, temple pilgrimages, and outdoor adventures.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {serviceCards.map((svc) => (
            <div
              key={svc.id}
              onClick={() => navigateTo(svc.route as any)}
              className="group p-4 rounded-2xl bg-white border border-slate-100 hover:border-emerald-300 hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-slate-50 group-hover:bg-emerald-50 flex items-center justify-center text-2xl mb-3 shadow-2xs group-hover:scale-110 transition-transform">
                  {svc.emoji}
                </div>
                <h3 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-emerald-700 transition-colors">
                  {svc.label}
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">{svc.desc}</p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-50 flex items-center justify-between text-[11px] font-semibold text-emerald-700 opacity-80 group-hover:opacity-100">
                <span>Open</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Tirupati Section (Prompt Priority) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-linear-to-br from-emerald-900 via-teal-900 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />

          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 relative z-10">
            {/* Image Banner */}
            <div className="w-full lg:w-1/2 rounded-2xl overflow-hidden shadow-2xl relative group">
              <img
                src={featuredTirupati.imageUrl}
                alt="Tirumala Venkateswara Temple"
                className="w-full h-72 sm:h-96 object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 bg-amber-500 text-slate-950 text-xs font-black px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span>Featured Pilgrimage Hub</span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(featuredTirupati.id, featuredTirupati.name);
                }}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/40 backdrop-blur-md text-white hover:text-rose-400 transition-colors"
              >
                <Heart
                  className={`w-5 h-5 ${
                    isFavorite(featuredTirupati.id) ? 'fill-rose-500 text-rose-500' : ''
                  }`}
                />
              </button>
            </div>

            {/* Info Column */}
            <div className="w-full lg:w-1/2 space-y-5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold">
                <span>🛕 Sri Venkateswara Sacred Circuit</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold font-heading tracking-tight leading-tight">
                Explore Tirupati & Tirumala Balaji
              </h2>

              <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-light">
                {featuredTirupati.description}
              </p>

              {/* Highlights tags */}
              <div className="space-y-2 pt-1">
                <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                  Top Sacred Landmarks & Excursions:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {featuredTirupati.highlights.map((h, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-xl bg-white/10 text-slate-100 text-xs font-medium backdrop-blur-xs border border-white/10"
                    >
                      ✓ {h}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <button
                  onClick={() => navigateTo('destinations', { destinationId: featuredTirupati.id })}
                  className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs sm:text-sm rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Explore Tirupati Hub</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => navigateTo('hotels', { searchCity: 'Tirupati' })}
                  className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm rounded-xl backdrop-blur-md border border-white/20 transition-all cursor-pointer"
                >
                  Book Tirupati Hotels
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Tourist Destinations Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest">
              Breathtaking Escapes
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading mt-1">
              Popular Destinations Across India & Beyond
            </h2>
          </div>
          <button
            onClick={() => navigateTo('explore')}
            className="text-xs sm:text-sm font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 group cursor-pointer"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherDestinations.map((dest) => (
            <div
              key={dest.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-100 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={dest.imageUrl}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-slate-800 text-xs font-bold px-3 py-1 rounded-full shadow-xs">
                  {dest.category}
                </div>
                <button
                  onClick={() => toggleFavorite(dest.id, dest.name)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-md text-slate-700 hover:text-rose-500 transition-colors shadow-xs"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      isFavorite(dest.id) ? 'fill-rose-500 text-rose-500' : ''
                    }`}
                  />
                </button>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                    <span>
                      {dest.hierarchy.city}, {dest.hierarchy.state}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mt-1 group-hover:text-emerald-700 transition-colors">
                    {dest.name}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 mt-1 leading-relaxed">
                    {dest.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Estimated Budget</span>
                    <span className="font-bold text-slate-900 text-sm">₹{dest.estimatedBudget}</span>
                  </div>
                  <button
                    onClick={() => navigateTo('explore', { destinationId: dest.id })}
                    className="px-4 py-2 bg-emerald-50 hover:bg-emerald-600 text-emerald-800 hover:text-white font-bold rounded-xl transition-all cursor-pointer"
                  >
                    Explore
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Swastik Travels */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 border border-slate-200/80 rounded-3xl p-8 sm:p-12">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest">
              Trusted By Thousands
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
              Why Travel with Swastik?
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              We bridge traditional hospitality with cutting-edge travel technology for an unmatched journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-2xs space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-lg">
                📍
              </div>
              <h4 className="font-bold text-sm text-slate-900">Live Browser GPS</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Watch your position in real-time on our interactive radar map with one-tap start and stop privacy controls.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-2xs space-y-2">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-lg">
                🏨
              </div>
              <h4 className="font-bold text-sm text-slate-900">Verified Stays & Hotels</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Handpicked resorts, temple guest houses, and 5-star hotels with transparent pricing and no hidden fees.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-2xs space-y-2">
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center font-bold text-lg">
                🏥
              </div>
              <h4 className="font-bold text-sm text-slate-900">Emergency Healthcare</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Dedicated directory for 24x7 emergency hospitals, SVIMS super-specialty, and instant 108 ambulance hotlines.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-2xs space-y-2">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold text-lg">
                🤖
              </div>
              <h4 className="font-bold text-sm text-slate-900">AI Travel Assistance</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tailored multi-day itineraries, budget estimation in rupees, and local cultural tips powered by AI.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
