import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Heart, Trash2, ArrowRight, Compass, Building, Droplets, PawPrint } from 'lucide-react';
import { DESTINATIONS, HOTELS, WATERFALLS, ZOO_PARKS } from '../data/mockData';

export const FavoritesPage: React.FC = () => {
  const { favoriteIds, toggleFavorite, navigateTo } = useApp();
  const [filterType, setFilterType] = useState('All');

  const savedDestinations = DESTINATIONS.filter((d) => favoriteIds.includes(d.id));
  const savedHotels = HOTELS.filter((h) => favoriteIds.includes(h.id));
  const savedWaterfalls = WATERFALLS.filter((w) => favoriteIds.includes(w.id));
  const savedZoos = ZOO_PARKS.filter((z) => favoriteIds.includes(z.id));

  const totalCount = savedDestinations.length + savedHotels.length + savedWaterfalls.length + savedZoos.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-bold uppercase tracking-wider">
          <Heart className="w-3.5 h-3.5 fill-rose-600 text-rose-600" />
          <span>Saved Places & Stays</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-heading">
          My Favorites
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Your bookmarked destinations, boutique hotels, cascades, and wildlife attractions.
        </p>
      </div>

      {totalCount === 0 ? (
        <div className="bg-white rounded-3xl p-16 text-center border border-slate-100 max-w-md mx-auto space-y-3">
          <Heart className="w-12 h-12 mx-auto text-slate-300 stroke-[1.2]" />
          <h3 className="font-bold text-slate-800 text-lg">No favorites yet</h3>
          <p className="text-xs text-slate-500">
            Browse our destinations, hotels, and waterfalls, and tap the heart icon to save places you love.
          </p>
          <button
            onClick={() => navigateTo('explore')}
            className="mt-3 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors cursor-pointer"
          >
            Start Exploring
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Destinations */}
          {savedDestinations.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
                <Compass className="w-4 h-4 text-emerald-600" />
                <span>Saved Destinations ({savedDestinations.length})</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {savedDestinations.map((d) => (
                  <div
                    key={d.id}
                    className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-2xs p-4 flex gap-4 items-center justify-between"
                  >
                    <img
                      src={d.imageUrl}
                      alt={d.name}
                      className="w-20 h-20 rounded-xl object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-sm text-slate-900 truncate">{d.name}</h4>
                      <p className="text-xs text-slate-500 truncate">
                        {d.hierarchy.city}, {d.hierarchy.state}
                      </p>
                      <button
                        onClick={() => navigateTo('explore', { destinationId: d.id })}
                        className="text-xs font-bold text-emerald-700 hover:underline mt-1 inline-block"
                      >
                        Explore ➔
                      </button>
                    </div>
                    <button
                      onClick={() => toggleFavorite(d.id, d.name)}
                      className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl transition-colors"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Hotels */}
          {savedHotels.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
                <Building className="w-4 h-4 text-blue-600" />
                <span>Saved Hotels & Stays ({savedHotels.length})</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {savedHotels.map((h) => (
                  <div
                    key={h.id}
                    className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-2xs p-4 flex gap-4 items-center justify-between"
                  >
                    <img
                      src={h.imageUrl}
                      alt={h.name}
                      className="w-20 h-20 rounded-xl object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-sm text-slate-900 truncate">{h.name}</h4>
                      <p className="text-xs text-slate-500">₹{h.pricePerNight} / night</p>
                      <button
                        onClick={() => navigateTo('hotels', { searchCity: h.city })}
                        className="text-xs font-bold text-blue-700 hover:underline mt-1 inline-block"
                      >
                        Book Stay ➔
                      </button>
                    </div>
                    <button
                      onClick={() => toggleFavorite(h.id, h.name)}
                      className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl transition-colors"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Waterfalls */}
          {savedWaterfalls.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
                <Droplets className="w-4 h-4 text-cyan-600" />
                <span>Saved Waterfalls ({savedWaterfalls.length})</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {savedWaterfalls.map((w) => (
                  <div
                    key={w.id}
                    className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-2xs p-4 flex gap-4 items-center justify-between"
                  >
                    <img
                      src={w.imageUrl}
                      alt={w.name}
                      className="w-20 h-20 rounded-xl object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-sm text-slate-900 truncate">{w.name}</h4>
                      <p className="text-xs text-slate-500">{w.height}</p>
                      <button
                        onClick={() => navigateTo('waterfalls')}
                        className="text-xs font-bold text-cyan-700 hover:underline mt-1 inline-block"
                      >
                        Details ➔
                      </button>
                    </div>
                    <button
                      onClick={() => toggleFavorite(w.id, w.name)}
                      className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
