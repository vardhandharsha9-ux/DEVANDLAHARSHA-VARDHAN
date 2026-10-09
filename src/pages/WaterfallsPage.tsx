import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import {
  Droplets,
  MapPin,
  Calendar,
  Mountain,
  Heart,
  ArrowRight,
  ExternalLink,
  Compass,
} from 'lucide-react';
import { WATERFALLS } from '../data/mockData';
import { Waterfall } from '../types';

export const WaterfallsPage: React.FC = () => {
  const { navigateTo, isFavorite, toggleFavorite } = useApp();
  const [selectedState, setSelectedState] = useState('All');
  const [selectedWaterfall, setSelectedWaterfall] = useState<Waterfall | null>(null);

  const states = ['All', 'Andhra Pradesh', 'Kerala', 'Karnataka', 'Goa'];

  const filteredWaterfalls = useMemo(() => {
    if (selectedState === 'All') return WATERFALLS;
    return WATERFALLS.filter((w) => w.state === selectedState);
  }, [selectedState]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold text-cyan-700 uppercase tracking-widest bg-cyan-50 px-3 py-1 rounded-full">
          Nature Wonders & Cascades
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-heading">
          Spectacular Waterfalls
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Discover the healing waters of Talakona, the sacred cascade of Kapila Theertham, Jog Falls, and Athirappilly.
        </p>
      </div>

      {/* State Filter Pills */}
      <div className="flex justify-center items-center gap-2 overflow-x-auto pb-1 text-xs">
        {states.map((st) => (
          <button
            key={st}
            onClick={() => setSelectedState(st)}
            className={`px-4 py-2 rounded-xl font-bold transition-colors cursor-pointer ${
              selectedState === st
                ? 'bg-cyan-700 text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {st}
          </button>
        ))}
      </div>

      {/* Waterfalls Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWaterfalls.map((wf) => (
          <div
            key={wf.id}
            className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
          >
            <div className="relative h-56 overflow-hidden">
              <img
                src={wf.imageUrl}
                alt={wf.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <button
                onClick={() => toggleFavorite(wf.id, wf.name)}
                className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-md text-slate-700 hover:text-rose-500 transition-colors shadow-xs"
              >
                <Heart
                  className={`w-4 h-4 ${
                    isFavorite(wf.id) ? 'fill-rose-500 text-rose-500' : ''
                  }`}
                />
              </button>
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-slate-900 text-xs font-bold px-3 py-1 rounded-full shadow-xs">
                {wf.height}
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center gap-1 text-xs text-slate-500">
                  <MapPin className="w-3.5 h-3.5 text-cyan-600" />
                  <span>
                    {wf.district}, {wf.state}
                  </span>
                </div>

                <h3 className="font-extrabold text-lg text-slate-900 mt-1 group-hover:text-cyan-700 transition-colors">
                  {wf.name}
                </h3>

                <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                  {wf.description}
                </p>

                <div className="mt-3 text-[11px] text-slate-500 space-y-1">
                  <p>
                    🗓️ <strong>Best Season:</strong> {wf.bestSeason}
                  </p>
                  <p>
                    🥾 <strong>Trek Difficulty:</strong>{' '}
                    <span
                      className={`font-bold ${
                        wf.trekkingDifficulty === 'Easy'
                          ? 'text-emerald-700'
                          : wf.trekkingDifficulty === 'Moderate'
                          ? 'text-amber-700'
                          : 'text-rose-700'
                      }`}
                    >
                      {wf.trekkingDifficulty}
                    </span>
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <button
                  onClick={() => setSelectedWaterfall(wf)}
                  className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl transition-colors cursor-pointer"
                >
                  View Details
                </button>

                <button
                  onClick={() =>
                    navigateTo('trip-planner', { defaultDestination: `${wf.name}, ${wf.state}` })
                  }
                  className="px-4 py-2 bg-cyan-700 hover:bg-cyan-800 text-white font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>Plan Visit</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Waterfall Detail Modal */}
      {selectedWaterfall && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 space-y-4 text-xs sm:text-sm">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <div>
                <span className="text-cyan-700 font-bold uppercase text-[10px]">
                  {selectedWaterfall.height}
                </span>
                <h3 className="font-extrabold text-lg text-slate-900">{selectedWaterfall.name}</h3>
                <p className="text-xs text-slate-500">
                  {selectedWaterfall.district}, {selectedWaterfall.state}
                </p>
              </div>
              <button
                onClick={() => setSelectedWaterfall(null)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-500"
              >
                ✕
              </button>
            </div>

            <img
              src={selectedWaterfall.imageUrl}
              alt={selectedWaterfall.name}
              className="w-full h-52 object-cover rounded-2xl"
            />

            <p className="text-slate-600 leading-relaxed">{selectedWaterfall.description}</p>

            <div className="p-3 bg-slate-50 rounded-2xl space-y-2">
              <p>
                <strong>Nearest City:</strong> {selectedWaterfall.nearestCity}
              </p>
              <p>
                <strong>Best Time to Visit:</strong> {selectedWaterfall.bestSeason}
              </p>
              <p>
                <strong>Trek Difficulty:</strong> {selectedWaterfall.trekkingDifficulty}
              </p>
            </div>

            <div>
              <h4 className="font-bold text-slate-800 mb-1">Nearby Attractions:</h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedWaterfall.nearbyAttractions.map((a, i) => (
                  <span key={i} className="px-2.5 py-1 bg-cyan-50 text-cyan-900 rounded-lg text-xs font-medium">
                    ✓ {a}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-slate-100">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  selectedWaterfall.name + ' ' + selectedWaterfall.state
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-700 font-bold flex items-center gap-1 hover:underline text-xs"
              >
                <span>Google Maps Directions</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={() => {
                  const wf = selectedWaterfall;
                  setSelectedWaterfall(null);
                  navigateTo('trip-planner', { defaultDestination: `${wf.name}, ${wf.state}` });
                }}
                className="px-5 py-2.5 bg-cyan-700 hover:bg-cyan-800 text-white font-bold rounded-xl text-xs"
              >
                Plan Itinerary
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
