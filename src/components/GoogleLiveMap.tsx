/// <reference types="@types/google.maps" />
import React, { useState } from 'react';
import { Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { Navigation, MapPin, Phone } from 'lucide-react';

export interface GoogleLiveMapMarker {
  id: string;
  title: string;
  lat: number;
  lng: number;
  category?: string;
  address?: string;
  phone?: string;
}

export interface GoogleLiveMapProps {
  center: { lat: number; lng: number };
  zoom?: number;
  userLocation?: {
    lat: number;
    lng: number;
    heading?: number | null;
    accuracy?: number | null;
  } | null;
  markers?: GoogleLiveMapMarker[];
}

export const GoogleLiveMap: React.FC<GoogleLiveMapProps> = ({
  center,
  zoom = 13,
  userLocation,
  markers = [],
}) => {
  const [selectedMarker, setSelectedMarker] = useState<GoogleLiveMapMarker | null>(null);

  return (
    <div className="w-full h-full relative">
      <Map
        defaultCenter={center}
        defaultZoom={zoom}
        gestureHandling="greedy"
        disableDefaultUI={false}
        mapId="DEMO_MAP_ID"
        className="w-full h-full"
      >
        {/* User Current Live GPS Location Marker */}
        {userLocation && (
          <AdvancedMarker
            position={{ lat: userLocation.lat, lng: userLocation.lng }}
            title="Your Live GPS Location"
          >
            <div className="relative flex items-center justify-center">
              <span className="absolute w-8 h-8 rounded-full bg-blue-500/30 animate-ping pointer-events-none" />
              <div className="w-5 h-5 rounded-full bg-blue-600 border-2 border-white shadow-lg flex items-center justify-center text-white">
                <Navigation className="w-3 h-3 fill-white" />
              </div>
            </div>
          </AdvancedMarker>
        )}

        {/* POI / Nearby Place Markers */}
        {markers.map((marker) => (
          <AdvancedMarker
            key={marker.id}
            position={{ lat: marker.lat, lng: marker.lng }}
            title={marker.title}
            onClick={() => setSelectedMarker(marker)}
          >
            <Pin
              background="#059669"
              glyphColor="#ffffff"
              borderColor="#064e3b"
            />
          </AdvancedMarker>
        ))}
      </Map>

      {/* Selected Marker Popup Card */}
      {selectedMarker && (
        <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:max-w-xs bg-white rounded-2xl p-4 shadow-xl border border-slate-200 z-10 space-y-2 animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                {selectedMarker.category || 'Facility'}
              </span>
              <h4 className="font-extrabold text-slate-900 text-sm mt-1">
                {selectedMarker.title}
              </h4>
            </div>
            <button
              onClick={() => setSelectedMarker(null)}
              className="text-slate-400 hover:text-slate-700 p-1 text-xs"
            >
              ✕
            </button>
          </div>
          {selectedMarker.address && (
            <p className="text-xs text-slate-500 flex items-start gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
              <span>{selectedMarker.address}</span>
            </p>
          )}
          {selectedMarker.phone && (
            <a
              href={`tel:${selectedMarker.phone}`}
              className="inline-flex items-center gap-1.5 text-xs text-emerald-700 font-bold hover:underline"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{selectedMarker.phone}</span>
            </a>
          )}
        </div>
      )}
    </div>
  );
};
