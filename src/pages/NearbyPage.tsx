import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import {
  MapPin,
  Navigation,
  Phone,
  Star,
  ExternalLink,
  ShieldCheck,
  Compass,
  Radio,
  Layers,
} from 'lucide-react';
import { NEARBY_PLACES } from '../data/mockData';
import { LeafletMap } from '../components/LeafletMap';
import { GoogleLiveMap } from '../components/GoogleLiveMap';

export const NearbyPage: React.FC = () => {
  const { liveLocation, startLiveLocation, navigateTo } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [mapEngine, setMapEngine] = useState<'google' | 'leaflet'>('google');

  const categories = [
    'All',
    'Hospitals',
    'Hotels',
    'Restaurants',
    'ATMs',
    'Petrol Stations',
    'Temples',
    'Zoo Parks',
    'Railway Stations',
    'Police Stations',
  ];

  const filteredPlaces = useMemo(() => {
    return NEARBY_PLACES.filter((p) => {
      if (selectedCategory !== 'All' && p.category !== selectedCategory) {
        return false;
      }
      return true;
    });
  }, [selectedCategory]);

  const mapMarkers = useMemo(() => {
    return filteredPlaces.map((p) => ({
      id: p.id,
      title: p.name,
      lat: p.coordinates.lat,
      lng: p.coordinates.lng,
      category: p.category,
      address: p.address,
      phone: p.phone,
    }));
  }, [filteredPlaces]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full">
          Proximity Locator
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-heading">
          Nearby Me Explorer
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Find essential facilities, 24x7 hospitals, petrol pumps, ATMs, holy shrines, and dining spots around your location.
        </p>
      </div>

      {/* GPS Status Banner */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-2xl flex items-center justify-center text-lg ${
              liveLocation.isTracking ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
            }`}
          >
            📍
          </div>
          <div>
            <h4 className="font-bold text-sm text-slate-900">
              {liveLocation.isTracking ? 'GPS Tracking Active' : 'GPS in Standby'}
            </h4>
            <p className="text-xs text-slate-500">
              {liveLocation.isTracking
                ? `Center: ${liveLocation.address}`
                : 'Enable GPS for exact distance calculations from your current location.'}
            </p>
          </div>
        </div>

        {!liveLocation.isTracking ? (
          <button
            onClick={startLiveLocation}
            className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <Radio className="w-3.5 h-3.5" />
            <span>Enable Live GPS</span>
          </button>
        ) : (
          <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
            ✓ Live Positioning Synchronized
          </span>
        )}
      </div>

      {/* Categories Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-2 rounded-xl font-bold shrink-0 transition-colors cursor-pointer ${
              selectedCategory === cat
                ? 'bg-emerald-700 text-white shadow-2xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Interactive Map */}
      <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-md space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-500 px-1">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">Map View ({mapMarkers.length} Markers)</span>
            <div className="inline-flex rounded-lg bg-slate-100 p-0.5 text-xs font-semibold">
              <button
                onClick={() => setMapEngine('google')}
                className={`px-3 py-1 rounded-md transition-all ${
                  mapEngine === 'google'
                    ? 'bg-white shadow-xs text-emerald-800 font-bold'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Google Maps Platform
              </button>
              <button
                onClick={() => setMapEngine('leaflet')}
                className={`px-3 py-1 rounded-md transition-all ${
                  mapEngine === 'leaflet'
                    ? 'bg-white shadow-xs text-emerald-800 font-bold'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                OpenStreetMap
              </button>
            </div>
          </div>
          <span className="text-[11px]">Click any pin to inspect or get directions</span>
        </div>

        <div className="h-[420px] rounded-2xl overflow-hidden border border-slate-200">
          {mapEngine === 'google' ? (
            <GoogleLiveMap
              center={
                liveLocation.coords
                  ? { lat: liveLocation.coords.latitude, lng: liveLocation.coords.longitude }
                  : { lat: 13.6288, lng: 79.4192 }
              }
              zoom={13}
              userLocation={
                liveLocation.coords
                  ? {
                      lat: liveLocation.coords.latitude,
                      lng: liveLocation.coords.longitude,
                      heading: liveLocation.coords.heading,
                      accuracy: liveLocation.coords.accuracy,
                    }
                  : null
              }
              markers={mapMarkers.map((m) => ({
                id: m.id,
                title: m.title,
                lat: m.lat,
                lng: m.lng,
                category: m.category,
                address: m.address,
                phone: m.phone,
              }))}
            />
          ) : (
            <LeafletMap
              markers={mapMarkers}
              userLocation={liveLocation.coords}
              height="100%"
              zoom={13}
            />
          )}
        </div>
      </div>

      {/* Places Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPlaces.map((place) => (
          <div
            key={place.id}
            className="bg-white rounded-2xl p-5 border border-slate-100 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-3"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase">
                  {place.category}
                </span>
                <span className="text-emerald-700 font-bold text-xs">~{place.distanceKm} km away</span>
              </div>

              <h3 className="font-bold text-base text-slate-900 mt-2">{place.name}</h3>
              <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate">{place.address}</span>
              </p>

              <div className="flex items-center gap-3 mt-2 text-xs">
                <span className="flex items-center gap-0.5 text-amber-500 font-bold">
                  <Star className="w-3.5 h-3.5 fill-current" /> {place.rating}
                </span>
                <span className="text-slate-300">•</span>
                <span className={place.isOpen ? 'text-emerald-700 font-semibold' : 'text-slate-400'}>
                  {place.isOpen ? '● Open Now' : 'Closed'}
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              {place.phone ? (
                <a
                  href={`tel:${place.phone.replace(/[^0-9+]/g, '')}`}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-bold flex items-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Call</span>
                </a>
              ) : (
                <span />
              )}

              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${place.coordinates.lat},${place.coordinates.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold flex items-center gap-1.5 shadow-2xs transition-colors"
              >
                <span>Directions</span>
                <Navigation className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
