import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  MapPin,
  Play,
  Square,
  ShieldCheck,
  AlertCircle,
  Clock,
  Compass,
  Radio,
  Navigation,
  ExternalLink,
  Layers,
} from 'lucide-react';
import { LeafletMap } from '../components/LeafletMap';
import { GoogleLiveMap } from '../components/GoogleLiveMap';

export const LiveLocationPage: React.FC = () => {
  const { liveLocation, startLiveLocation, stopLiveLocation, navigateTo } = useApp();
  const [mapEngine, setMapEngine] = useState<'google' | 'leaflet'>('google');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider">
          <Radio className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
          <span>Real-Time Browser GPS Geolocation</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-heading">
          Live GPS Location & Radar
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Track your real-time position using your browser's physical GPS hardware. Never simulated.
        </p>
      </div>

      {/* Main GPS Status Card & Controls */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-lg space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span
                className={`w-3 h-3 rounded-full ${
                  liveLocation.isTracking
                    ? 'bg-emerald-500 animate-ping'
                    : 'bg-slate-300'
                }`}
              />
              <span className="font-extrabold text-slate-900 text-base sm:text-lg">
                Tracking Status:{' '}
                <span
                  className={liveLocation.isTracking ? 'text-emerald-700' : 'text-slate-500'}
                >
                  {liveLocation.isTracking ? 'Active (Live GPS Watch)' : 'Stopped (Standby)'}
                </span>
              </span>
            </div>
            <p className="text-xs text-slate-500">
              {liveLocation.isTracking
                ? 'Continuously monitoring GPS coordinate changes on this device.'
                : 'Click "Start Live Location" to prompt browser for location access.'}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            {!liveLocation.isTracking ? (
              <button
                onClick={startLiveLocation}
                className="w-full md:w-auto px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>START LIVE LOCATION</span>
              </button>
            ) : (
              <button
                onClick={stopLiveLocation}
                className="w-full md:w-auto px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Square className="w-4 h-4 fill-current" />
                <span>STOP LIVE LOCATION</span>
              </button>
            )}
          </div>
        </div>

        {/* Error Notification */}
        {liveLocation.error && (
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 text-xs sm:text-sm flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Geolocation Notice</p>
              <p className="mt-0.5 text-rose-700">{liveLocation.error}</p>
            </div>
          </div>
        )}

        {/* GPS Telemetry Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Latitude</span>
            <span className="text-base font-extrabold text-slate-900 font-mono">
              {liveLocation.coords ? liveLocation.coords.latitude.toFixed(6) : '—'}
            </span>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Longitude</span>
            <span className="text-base font-extrabold text-slate-900 font-mono">
              {liveLocation.coords ? liveLocation.coords.longitude.toFixed(6) : '—'}
            </span>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">GPS Accuracy</span>
            <span className="text-base font-extrabold text-slate-900 font-mono">
              {liveLocation.coords ? `±${liveLocation.coords.accuracy} meters` : '—'}
            </span>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Last Ping</span>
            <span className="text-base font-extrabold text-slate-900 font-mono">
              {liveLocation.lastUpdated || '—'}
            </span>
          </div>
        </div>

        {/* Interactive Map Display */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-800">Map Visualization Engine:</span>
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

            {liveLocation.coords && (
              <a
                href={`https://www.google.com/maps?q=${liveLocation.coords.latitude},${liveLocation.coords.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-700 font-semibold flex items-center gap-1 hover:underline"
              >
                <span>Full Web Map</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

          <div className="h-[460px] rounded-2xl overflow-hidden border border-slate-200">
            {mapEngine === 'google' ? (
              <GoogleLiveMap
                center={
                  liveLocation.coords
                    ? { lat: liveLocation.coords.latitude, lng: liveLocation.coords.longitude }
                    : { lat: 13.6288, lng: 79.4192 }
                }
                zoom={liveLocation.coords ? 15 : 13}
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
              />
            ) : (
              <LeafletMap
                userLocation={liveLocation.coords}
                height="100%"
                zoom={liveLocation.coords ? 15 : 12}
                center={
                  liveLocation.coords
                    ? [liveLocation.coords.latitude, liveLocation.coords.longitude]
                    : [13.6288, 79.4192]
                }
              />
            )}
          </div>
        </div>

        {/* Action Button: Find Nearby Places around current position */}
        {liveLocation.isTracking && liveLocation.coords && (
          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div>
              <p className="font-bold text-emerald-900">Explore Nearby Facilities</p>
              <p className="text-emerald-700">Find emergency hospitals, petrol bunks, ATMs, and temples around your live coordinates.</p>
            </div>
            <button
              onClick={() => navigateTo('nearby')}
              className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shrink-0 cursor-pointer"
            >
              Scan Nearby Me ➔
            </button>
          </div>
        )}
      </div>

      {/* Strict Privacy Guarantee */}
      <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200/80 space-y-3 text-xs sm:text-sm">
        <h3 className="font-bold text-slate-900 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-600" />
          <span>Privacy & Responsible Location Handling</span>
        </h3>
        <p className="text-slate-600 leading-relaxed text-xs">
          • <strong>Explicit Consent Only:</strong> Location is requested only after you click the "START LIVE LOCATION" button.<br />
          • <strong>Instant Clean-up:</strong> Tapping "STOP LIVE LOCATION" immediately disengages <code>navigator.geolocation.clearWatch()</code>.<br />
          • <strong>No Background Telemetry:</strong> We do not track or log your coordinates in background processes. Your coordinates are used locally for real-time map centering.
        </p>
      </div>
    </div>
  );
};
