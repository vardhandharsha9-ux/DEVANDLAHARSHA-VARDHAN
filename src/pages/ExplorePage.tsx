import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import {
  Search,
  Filter,
  MapPin,
  Heart,
  Star,
  Clock,
  Compass,
  ArrowRight,
  Sparkles,
  Calendar,
  Layers,
  ChevronDown,
  ExternalLink,
} from 'lucide-react';
import { DESTINATIONS, INDIAN_STATES_AND_UTS, WORLD_COUNTRIES, SAMPLE_HIERARCHIES } from '../data/mockData';
import { Destination } from '../types';

export const ExplorePage: React.FC = () => {
  const { navigateTo, isFavorite, toggleFavorite, routeParams } = useApp();

  const [selectedCountry, setSelectedCountry] = useState('India');
  const [selectedState, setSelectedState] = useState(routeParams?.state || '');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState(routeParams?.query || '');
  const [selectedDestinationDetail, setSelectedDestinationDetail] = useState<Destination | null>(null);

  // Check if a specific destination was passed in route params
  React.useEffect(() => {
    if (routeParams?.destinationId) {
      const found = DESTINATIONS.find((d) => d.id === routeParams.destinationId);
      if (found) {
        setSelectedDestinationDetail(found);
      }
    }
  }, [routeParams]);

  const categories = [
    'All',
    'Pilgrimage',
    'Hill Stations',
    'Waterfalls',
    'Beaches',
    'Historical Places',
    'Forts',
    'Wildlife',
    'Family Trips',
  ];

  const filteredDestinations = useMemo(() => {
    return DESTINATIONS.filter((d) => {
      // Country
      if (selectedCountry && selectedCountry !== 'All' && d.hierarchy.country !== selectedCountry) {
        return false;
      }
      // State
      if (selectedState && selectedState !== 'All' && d.hierarchy.state !== selectedState) {
        return false;
      }
      // District
      if (selectedDistrict && !d.hierarchy.district.toLowerCase().includes(selectedDistrict.toLowerCase())) {
        return false;
      }
      // City
      if (selectedCity && !d.hierarchy.city.toLowerCase().includes(selectedCity.toLowerCase())) {
        return false;
      }
      // Category
      if (selectedCategory !== 'All' && d.category !== selectedCategory) {
        return false;
      }
      // Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = d.name.toLowerCase().includes(q);
        const matchesDesc = d.description.toLowerCase().includes(q);
        const matchesCity = d.hierarchy.city.toLowerCase().includes(q);
        const matchesState = d.hierarchy.state.toLowerCase().includes(q);
        const matchesCat = d.category.toLowerCase().includes(q);
        return matchesName || matchesDesc || matchesCity || matchesState || matchesCat;
      }
      return true;
    });
  }, [selectedCountry, selectedState, selectedDistrict, selectedCity, selectedCategory, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full">
          Global & Indian Heritage
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-heading">
          Destination Explorer
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Discover sacred temple towns, misty hill peaks, hidden waterfalls, and worldwide bucket-list wonders with hierarchical drill-down filtering.
        </p>
      </div>

      {/* Hierarchical Drill-down Filter Panel */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-md space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-emerald-600" />
            <h3 className="font-bold text-sm text-slate-800">Hierarchical Location Filter</h3>
          </div>
          <button
            onClick={() => {
              setSelectedCountry('India');
              setSelectedState('');
              setSelectedDistrict('');
              setSelectedCity('');
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="text-xs font-semibold text-emerald-700 hover:underline"
          >
            Reset Filters
          </button>
        </div>

        {/* Level 1: Country -> State -> District -> City */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          {/* Country */}
          <div>
            <label className="text-[11px] font-bold text-slate-500 uppercase">1. Country</label>
            <select
              value={selectedCountry}
              onChange={(e) => {
                setSelectedCountry(e.target.value);
                setSelectedState('');
              }}
              className="mt-1 w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 outline-hidden"
            >
              <option value="All">All Countries</option>
              {WORLD_COUNTRIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* State / Province */}
          <div>
            <label className="text-[11px] font-bold text-slate-500 uppercase">2. State / Province</label>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="mt-1 w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 outline-hidden"
            >
              <option value="">All States / UTs</option>
              {selectedCountry === 'India' &&
                INDIAN_STATES_AND_UTS.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
            </select>
          </div>

          {/* District / Region */}
          <div>
            <label className="text-[11px] font-bold text-slate-500 uppercase">3. District / Region</label>
            <input
              type="text"
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              placeholder="e.g. Tirupati, Idukki, Alluri"
              className="mt-1 w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 outline-hidden"
            />
          </div>

          {/* City / Mandal */}
          <div>
            <label className="text-[11px] font-bold text-slate-500 uppercase">4. City / Town</label>
            <input
              type="text"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              placeholder="e.g. Tirupati, Munnar, Panaji"
              className="mt-1 w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 outline-hidden"
            />
          </div>
        </div>

        {/* Keyword Search & Category Pills */}
        <div className="pt-2 flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search keyword (e.g. temple, waterfalls)..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-hidden font-medium"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-colors ${
                  selectedCategory === cat
                    ? 'bg-emerald-700 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between">
        <p className="text-xs sm:text-sm font-semibold text-slate-700">
          Showing <span className="text-emerald-700 font-bold">{filteredDestinations.length}</span> destinations
          {selectedState ? ` in ${selectedState}` : ''}
        </p>
      </div>

      {/* Destinations Grid */}
      {filteredDestinations.length === 0 ? (
        <div className="bg-white rounded-3xl p-16 text-center border border-slate-100 text-slate-400 max-w-lg mx-auto space-y-3">
          <Compass className="w-12 h-12 mx-auto text-slate-300 stroke-[1.2]" />
          <h3 className="font-bold text-slate-700 text-base">No destinations match your criteria</h3>
          <p className="text-xs text-slate-500">
            Try adjusting your location hierarchy filter or search for "Tirupati" or "Andhra Pradesh".
          </p>
          <button
            onClick={() => {
              setSelectedCountry('India');
              setSelectedState('');
              setSelectedDistrict('');
              setSelectedCity('');
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDestinations.map((dest) => (
            <div
              key={dest.id}
              className={`bg-white rounded-3xl overflow-hidden border transition-all duration-300 flex flex-col justify-between group shadow-2xs hover:shadow-xl ${
                dest.isTirupatiSpecial ? 'border-amber-300/80 ring-2 ring-amber-400/20' : 'border-slate-100'
              }`}
            >
              {/* Image & Badges */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={dest.imageUrl}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 flex flex-col gap-1">
                  <span className="bg-white/95 backdrop-blur-md text-slate-800 text-[11px] font-bold px-3 py-1 rounded-full shadow-xs">
                    {dest.category}
                  </span>
                  {dest.isTirupatiSpecial && (
                    <span className="bg-amber-500 text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-xs">
                      ⭐ Featured Tirupati
                    </span>
                  )}
                </div>
                <button
                  onClick={() => toggleFavorite(dest.id, dest.name)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-white/85 backdrop-blur-md text-slate-700 hover:text-rose-500 transition-colors shadow-xs"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      isFavorite(dest.id) ? 'fill-rose-500 text-rose-500' : ''
                    }`}
                  />
                </button>
                <div className="absolute bottom-3 right-3 bg-slate-950/75 backdrop-blur-md text-amber-300 text-xs font-bold px-2.5 py-1 rounded-xl flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>{dest.rating}</span>
                  <span className="text-slate-300 text-[10px]">({dest.reviewCount.toLocaleString()})</span>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="truncate">
                      {dest.hierarchy.city}, {dest.hierarchy.district}, {dest.hierarchy.state}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mt-1 group-hover:text-emerald-700 transition-colors">
                    {dest.name}
                  </h3>

                  <p className="text-xs text-slate-600 mt-1.5 line-clamp-2 leading-relaxed">
                    {dest.description}
                  </p>

                  <div className="mt-3 flex items-center gap-2 text-[11px] text-slate-500">
                    <Clock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Best Time: <strong>{dest.bestTimeToVisit}</strong></span>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Estimated Budget</span>
                    <span className="font-extrabold text-slate-900 text-sm">₹{dest.estimatedBudget}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedDestinationDetail(dest)}
                      className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                    >
                      Details
                    </button>
                    <button
                      onClick={() => navigateTo('trip-planner', { defaultDestination: `${dest.name}, ${dest.hierarchy.state}` })}
                      className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <span>Plan Trip</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Destination Detail Modal */}
      {selectedDestinationDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-200">
            <div className="relative h-64 sm:h-72 overflow-hidden">
              <img
                src={selectedDestinationDetail.imageUrl}
                alt={selectedDestinationDetail.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedDestinationDetail(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-black transition-colors"
              >
                ✕
              </button>
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                <div>
                  <span className="bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {selectedDestinationDetail.category}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black mt-1 drop-shadow-md">
                    {selectedDestinationDetail.name}
                  </h3>
                </div>
                <div className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-xl text-amber-300 font-bold text-sm flex items-center gap-1">
                  <Star className="w-4 h-4 fill-current" />
                  <span>{selectedDestinationDetail.rating}</span>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-5 text-xs sm:text-sm">
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex flex-wrap items-center gap-2 text-xs">
                <span className="font-bold text-slate-700">Hierarchy:</span>
                <span className="bg-white px-2 py-1 rounded border border-slate-200 font-medium">
                  {selectedDestinationDetail.hierarchy.country}
                </span>
                <span>➔</span>
                <span className="bg-white px-2 py-1 rounded border border-slate-200 font-medium">
                  {selectedDestinationDetail.hierarchy.state}
                </span>
                <span>➔</span>
                <span className="bg-white px-2 py-1 rounded border border-slate-200 font-medium">
                  {selectedDestinationDetail.hierarchy.district}
                </span>
                <span>➔</span>
                <span className="bg-white px-2 py-1 rounded border border-slate-200 font-medium">
                  {selectedDestinationDetail.hierarchy.city}
                </span>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-1">About Destination</h4>
                <p className="text-slate-600 leading-relaxed">{selectedDestinationDetail.description}</p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-2">Must-Visit Highlights</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedDestinationDetail.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 p-2 bg-emerald-50/60 rounded-xl text-emerald-900 text-xs font-medium">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 p-4 bg-slate-50 rounded-2xl">
                <div>
                  <span className="text-slate-400 uppercase text-[10px] font-bold block">Best Time to Visit</span>
                  <span className="font-bold text-slate-800">{selectedDestinationDetail.bestTimeToVisit}</span>
                </div>
                <div>
                  <span className="text-slate-400 uppercase text-[10px] font-bold block">Estimated Budget</span>
                  <span className="font-bold text-emerald-700">₹{selectedDestinationDetail.estimatedBudget} / person</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    selectedDestinationDetail.name + ' ' + selectedDestinationDetail.hierarchy.city
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-emerald-700 flex items-center gap-1 hover:underline"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      toggleFavorite(selectedDestinationDetail.id, selectedDestinationDetail.name);
                    }}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 font-bold text-xs"
                  >
                    {isFavorite(selectedDestinationDetail.id) ? '❤️ Saved' : '🤍 Save'}
                  </button>
                  <button
                    onClick={() => {
                      const dest = selectedDestinationDetail;
                      setSelectedDestinationDetail(null);
                      navigateTo('trip-planner', { defaultDestination: `${dest.name}, ${dest.hierarchy.state}` });
                    }}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs shadow-md"
                  >
                    Generate Trip Itinerary ➔
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
