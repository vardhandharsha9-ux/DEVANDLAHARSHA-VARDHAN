import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  PawPrint,
  Clock,
  Ticket,
  MapPin,
  Heart,
  Navigation,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { ZOO_PARKS } from '../data/mockData';
import { ZooPark } from '../types';

export const ZooParksPage: React.FC = () => {
  const { navigateTo, isFavorite, toggleFavorite } = useApp();
  const [selectedType, setSelectedType] = useState('All');
  const [selectedZoo, setSelectedZoo] = useState<ZooPark | null>(null);

  const types = ['All', 'Zoo', 'Safari Park', 'National Park'];

  const filteredZoos = ZOO_PARKS.filter((z) => {
    if (selectedType !== 'All' && z.type !== selectedType) {
      return false;
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold text-amber-700 uppercase tracking-widest bg-amber-50 px-3 py-1 rounded-full">
          Wildlife & Forest Conservation
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-heading">
          Zoo Parks & Wildlife Safaris
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Explore Sri Venkateswara Zoo Park in Tirupati (Asia's 2nd largest zoo), Bannerghatta Tiger Safaris, and world-renowned biological parks.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex justify-center items-center gap-2 text-xs">
        {types.map((t) => (
          <button
            key={t}
            onClick={() => setSelectedType(t)}
            className={`px-4 py-2 rounded-xl font-bold transition-colors cursor-pointer ${
              selectedType === t
                ? 'bg-amber-600 text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Zoos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredZoos.map((zoo) => (
          <div
            key={zoo.id}
            className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
          >
            <div className="relative h-60 overflow-hidden">
              <img
                src={zoo.imageUrl}
                alt={zoo.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-amber-900 text-xs font-bold px-3 py-1 rounded-full shadow-xs">
                {zoo.type}
              </div>
              <button
                onClick={() => toggleFavorite(zoo.id, zoo.name)}
                className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-md text-slate-700 hover:text-rose-500 transition-colors shadow-xs"
              >
                <Heart
                  className={`w-4 h-4 ${
                    isFavorite(zoo.id) ? 'fill-rose-500 text-rose-500' : ''
                  }`}
                />
              </button>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <MapPin className="w-3.5 h-3.5 text-amber-600" />
                  <span>
                    {zoo.city}, {zoo.state}
                  </span>
                </div>

                <h3 className="font-extrabold text-xl text-slate-900 mt-1 group-hover:text-amber-700 transition-colors">
                  {zoo.name}
                </h3>

                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  {zoo.description}
                </p>

                <div className="mt-4 p-3 bg-slate-50 rounded-2xl text-[11px] text-slate-600 space-y-1">
                  <p className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span><strong>Timings:</strong> {zoo.openingHours}</span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Ticket className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span><strong>Entry Fee:</strong> {zoo.entryFee}</span>
                  </p>
                </div>

                <div className="mt-3">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1">
                    Key Attractions & Safaris
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {zoo.keyAttractions.map((a, i) => (
                      <span
                        key={i}
                        className="text-[10px] bg-amber-50 text-amber-900 px-2 py-0.5 rounded-md font-semibold"
                      >
                        ✓ {a}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    zoo.name + ' ' + zoo.city
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-700 font-bold flex items-center gap-1 hover:underline"
                >
                  <span>Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={() =>
                    navigateTo('trip-planner', { defaultDestination: `${zoo.name}, ${zoo.city}` })
                  }
                  className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>Plan Safari Trip</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
