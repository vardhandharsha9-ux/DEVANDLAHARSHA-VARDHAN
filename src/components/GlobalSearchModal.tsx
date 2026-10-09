import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { Search, X, MapPin, Building, Utensils, Droplets, PawPrint, HeartPulse, ArrowRight, History } from 'lucide-react';
import { DESTINATIONS, HOTELS, RESTAURANTS, HOSPITALS, WATERFALLS, ZOO_PARKS } from '../data/mockData';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({ isOpen, onClose }) => {
  const { navigateTo } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<'All' | 'Destinations' | 'Hotels' | 'Food' | 'Waterfalls' | 'Zoos' | 'Hospitals'>('All');
  const [recentSearches, setRecentSearches] = useState<string[]>([
    'Tirupati',
    'Talakona Waterfalls',
    'Woodys Restaurant',
    'SVIMS Hospital',
  ]);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const results = useMemo(() => {
    if (!searchTerm.trim()) return [];
    const term = searchTerm.toLowerCase();

    const items: Array<{
      id: string;
      title: string;
      subtitle: string;
      type: 'Destinations' | 'Hotels' | 'Food' | 'Waterfalls' | 'Zoos' | 'Hospitals';
      route: any;
      routeParams?: any;
    }> = [];

    // Destinations
    if (activeCategory === 'All' || activeCategory === 'Destinations') {
      DESTINATIONS.forEach((d) => {
        if (
          d.name.toLowerCase().includes(term) ||
          d.hierarchy.state.toLowerCase().includes(term) ||
          d.hierarchy.city.toLowerCase().includes(term) ||
          d.category.toLowerCase().includes(term)
        ) {
          items.push({
            id: d.id,
            title: d.name,
            subtitle: `${d.category} • ${d.hierarchy.city}, ${d.hierarchy.state}`,
            type: 'Destinations',
            route: 'explore',
            routeParams: { destinationId: d.id },
          });
        }
      });
    }

    // Hotels
    if (activeCategory === 'All' || activeCategory === 'Hotels') {
      HOTELS.forEach((h) => {
        if (
          h.name.toLowerCase().includes(term) ||
          h.city.toLowerCase().includes(term) ||
          h.location.toLowerCase().includes(term)
        ) {
          items.push({
            id: h.id,
            title: h.name,
            subtitle: `Hotel • ${h.city} • ₹${h.pricePerNight}/night`,
            type: 'Hotels',
            route: 'hotels',
            routeParams: { hotelId: h.id },
          });
        }
      });
    }

    // Restaurants
    if (activeCategory === 'All' || activeCategory === 'Food') {
      RESTAURANTS.forEach((r) => {
        if (
          r.name.toLowerCase().includes(term) ||
          r.cuisine.some((c) => c.toLowerCase().includes(term)) ||
          r.city.toLowerCase().includes(term)
        ) {
          items.push({
            id: r.id,
            title: r.name,
            subtitle: `Dining • ${r.cuisine.join(', ')} • ${r.city}`,
            type: 'Food',
            route: 'food',
            routeParams: { restaurantId: r.id },
          });
        }
      });
    }

    // Waterfalls
    if (activeCategory === 'All' || activeCategory === 'Waterfalls') {
      WATERFALLS.forEach((w) => {
        if (
          w.name.toLowerCase().includes(term) ||
          w.state.toLowerCase().includes(term) ||
          w.district.toLowerCase().includes(term)
        ) {
          items.push({
            id: w.id,
            title: w.name,
            subtitle: `Waterfall • ${w.district}, ${w.state} • ${w.height}`,
            type: 'Waterfalls',
            route: 'waterfalls',
            routeParams: { waterfallId: w.id },
          });
        }
      });
    }

    // Zoo Parks
    if (activeCategory === 'All' || activeCategory === 'Zoos') {
      ZOO_PARKS.forEach((z) => {
        if (
          z.name.toLowerCase().includes(term) ||
          z.city.toLowerCase().includes(term) ||
          z.state.toLowerCase().includes(term)
        ) {
          items.push({
            id: z.id,
            title: z.name,
            subtitle: `${z.type} • ${z.city}, ${z.state}`,
            type: 'Zoos',
            route: 'zoo-parks',
            routeParams: { zooId: z.id },
          });
        }
      });
    }

    // Hospitals
    if (activeCategory === 'All' || activeCategory === 'Hospitals') {
      HOSPITALS.forEach((h) => {
        if (
          h.name.toLowerCase().includes(term) ||
          h.city.toLowerCase().includes(term) ||
          h.specialties.some((s) => s.toLowerCase().includes(term))
        ) {
          items.push({
            id: h.id,
            title: h.name,
            subtitle: `Hospital (${h.type}) • ${h.city} • Emergency Hotline: ${h.emergencyHotline}`,
            type: 'Hospitals',
            route: 'hospitals',
            routeParams: { hospitalId: h.id },
          });
        }
      });
    }

    return items;
  }, [searchTerm, activeCategory]);

  if (!isOpen) return null;

  const handleSelectResult = (item: any) => {
    if (!recentSearches.includes(searchTerm) && searchTerm.trim()) {
      setRecentSearches((prev) => [searchTerm, ...prev.slice(0, 4)]);
    }
    navigateTo(item.route, item.routeParams);
    onClose();
  };

  const getBadgeIcon = (type: string) => {
    switch (type) {
      case 'Destinations':
        return <MapPin className="w-4 h-4 text-emerald-600" />;
      case 'Hotels':
        return <Building className="w-4 h-4 text-blue-600" />;
      case 'Food':
        return <Utensils className="w-4 h-4 text-orange-600" />;
      case 'Waterfalls':
        return <Droplets className="w-4 h-4 text-cyan-600" />;
      case 'Zoos':
        return <PawPrint className="w-4 h-4 text-amber-600" />;
      case 'Hospitals':
        return <HeartPulse className="w-4 h-4 text-rose-600" />;
      default:
        return <Search className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-12 sm:pt-20 px-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden border border-slate-100 animate-in zoom-in-95 duration-200">
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center gap-3">
          <Search className="w-6 h-6 text-emerald-600 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Tirupati, Talakona, hotels, food, hospitals, waterfalls..."
            className="w-full text-base sm:text-lg font-medium text-slate-800 placeholder:text-slate-400 outline-hidden"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2.5 py-1 text-xs font-semibold text-slate-500 hover:text-slate-800 bg-slate-100 rounded-lg"
          >
            ESC
          </button>
        </div>

        {/* Category Pills */}
        <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-100 flex items-center gap-2 overflow-x-auto text-xs no-scrollbar">
          {(['All', 'Destinations', 'Hotels', 'Food', 'Waterfalls', 'Zoos', 'Hospitals'] as const).map(
            (cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-xl font-medium shrink-0 transition-colors ${
                  activeCategory === cat
                    ? 'bg-emerald-600 text-white shadow-2xs'
                    : 'bg-white text-slate-600 hover:bg-slate-200/70 border border-slate-200/60'
                }`}
              >
                {cat}
              </button>
            )
          )}
        </div>

        {/* Search Content */}
        <div className="max-h-96 overflow-y-auto p-4 divide-y divide-slate-100">
          {!searchTerm ? (
            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                  <History className="w-3.5 h-3.5" /> Recent Searches
                </h4>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((recent) => (
                    <button
                      key={recent}
                      onClick={() => setSearchTerm(recent)}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 rounded-xl text-xs font-medium transition-colors"
                    >
                      {recent}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Popular Highlights
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    onClick={() => {
                      navigateTo('destinations', { destinationId: 'dest-tirupati-tirumala' });
                      onClose();
                    }}
                    className="p-2.5 rounded-xl border border-slate-100 hover:bg-emerald-50 text-left transition-colors flex items-center gap-2"
                  >
                    <span className="text-base">🛕</span>
                    <div>
                      <p className="font-semibold text-slate-800">Tirupati & Tirumala</p>
                      <p className="text-[10px] text-slate-400">Sacred 7 Hills Pilgrimage</p>
                    </div>
                  </button>
                  <button
                    onClick={() => {
                      navigateTo('waterfalls');
                      onClose();
                    }}
                    className="p-2.5 rounded-xl border border-slate-100 hover:bg-cyan-50 text-left transition-colors flex items-center gap-2"
                  >
                    <span className="text-base">💧</span>
                    <div>
                      <p className="font-semibold text-slate-800">Talakona Falls</p>
                      <p className="text-[10px] text-slate-400">270 ft medicinal cascade</p>
                    </div>
                  </button>
                  <button
                    onClick={() => {
                      navigateTo('hospitals');
                      onClose();
                    }}
                    className="p-2.5 rounded-xl border border-slate-100 hover:bg-rose-50 text-left transition-colors flex items-center gap-2"
                  >
                    <span className="text-base">🏥</span>
                    <div>
                      <p className="font-semibold text-slate-800">SVIMS Hospital</p>
                      <p className="text-[10px] text-slate-400">24x7 Emergency Helpline</p>
                    </div>
                  </button>
                  <button
                    onClick={() => {
                      navigateTo('food');
                      onClose();
                    }}
                    className="p-2.5 rounded-xl border border-slate-100 hover:bg-orange-50 text-left transition-colors flex items-center gap-2"
                  >
                    <span className="text-base">🍽️</span>
                    <div>
                      <p className="font-semibold text-slate-800">Authentic Andhra Thali</p>
                      <p className="text-[10px] text-slate-400">Woodys & Minerva Grand</p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="py-12 text-center text-slate-400">
              <Search className="w-10 h-10 mx-auto mb-2 text-slate-300" />
              <p className="text-sm font-semibold text-slate-700">No results found for "{searchTerm}"</p>
              <p className="text-xs text-slate-400 mt-1">Try searching for Tirupati, Talakona, hotels, or restaurants.</p>
            </div>
          ) : (
            results.map((item) => (
              <div
                key={item.id}
                onClick={() => handleSelectResult(item)}
                className="py-3 px-2 hover:bg-slate-50 rounded-xl cursor-pointer flex items-center justify-between transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-100 group-hover:bg-white rounded-xl shadow-2xs">
                    {getBadgeIcon(item.type)}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-800 group-hover:text-emerald-700 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-500">{item.subtitle}</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-600 transform group-hover:translate-x-1 transition-all" />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
