/// <reference types="@types/google.maps" />
import React, { useEffect, useState, useRef } from 'react';
import {
  Map,
  AdvancedMarker,
  Pin,
  useMap,
  useMapsLibrary,
  useApiIsLoaded,
  useApiLoadingStatus,
} from '@vis.gl/react-google-maps';
import {
  Navigation,
  MapPin,
  Compass,
  AlertCircle,
  Sparkles,
  Phone,
  RefreshCw,
  Layers,
} from 'lucide-react';
import { FlatLocationResult } from '../data/indiaLocations';

export interface RouteHighlightItem {
  id: string;
  name: string;
  category: 'Hospital' | 'Waterfall' | 'Restaurant' | 'Temple' | 'Zoo' | 'Fuel / Stop';
  lat: number;
  lng: number;
  description: string;
  phone?: string;
}

interface GoogleRouteMapProps {
  origin: FlatLocationResult | null;
  destination: FlatLocationResult | null;
  travelMode: 'DRIVING' | 'TRANSIT' | 'TWO_WHEELER' | 'WALKING';
  liveLocation?: { lat: number; lng: number; heading?: number | null; speed?: number | null } | null;
  highlightItems?: RouteHighlightItem[];
  onRouteCalculated?: (details: { distanceKm: number; durationMinutes: number; summary: string }) => void;
}

// Inner route controller to compute and render route polyline on the active map instance
const RouteRenderer: React.FC<{
  origin: FlatLocationResult | null;
  destination: FlatLocationResult | null;
  travelMode: 'DRIVING' | 'TRANSIT' | 'TWO_WHEELER' | 'WALKING';
  onRouteCalculated?: (details: { distanceKm: number; durationMinutes: number; summary: string }) => void;
}> = ({ origin, destination, travelMode, onRouteCalculated }) => {
  const map = useMap();
  const routesLib = useMapsLibrary('routes');
  const polylinesRef = useRef<any[]>([]);
  const isApiLoaded = useApiIsLoaded();

  useEffect(() => {
    // Ensure all dependencies, map instance, and routes library are loaded
    if (!map || !routesLib || !isApiLoaded || !origin || !destination) {
      return;
    }

    // Clean up any previously drawn polylines
    polylinesRef.current.forEach((p) => {
      try {
        if (p && typeof p.setMap === 'function') {
          p.setMap(null);
        }
      } catch (e) {
        console.warn('Error clearing polyline:', e);
      }
    });
    polylinesRef.current = [];

    const originLatLng = { lat: origin.coordinates.lat, lng: origin.coordinates.lng };
    const destinationLatLng = { lat: destination.coordinates.lat, lng: destination.coordinates.lng };

    // Map travel mode to Routes API mode
    let gmpTravelMode = 'DRIVING';
    if (travelMode === 'TRANSIT') gmpTravelMode = 'TRANSIT';
    else if (travelMode === 'WALKING') gmpTravelMode = 'WALKING';
    else if (travelMode === 'TWO_WHEELER') gmpTravelMode = 'TWO_WHEELER';

    // Haversine fallback distance estimation helper
    const computeFallbackRoadMetrics = () => {
      const dLat = destination.coordinates.lat - origin.coordinates.lat;
      const dLng = destination.coordinates.lng - origin.coordinates.lng;
      const R = 6371; // Earth radius in km
      const radLat1 = (origin.coordinates.lat * Math.PI) / 180;
      const radLat2 = (destination.coordinates.lat * Math.PI) / 180;
      const deltaLat = (dLat * Math.PI) / 180;
      const deltaLng = (dLng * Math.PI) / 180;
      const a =
        Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
        Math.cos(radLat1) * Math.cos(radLat2) * Math.sin(deltaLng / 2) * Math.sin(deltaLng / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const airKm = R * c;
      const roadKm = Math.max(1, Math.round(airKm * 1.32 * 10) / 10);
      const durationMins = Math.max(2, Math.round((roadKm / 46) * 60));

      // Draw graceful curved corridor polyline if google.maps is ready
      const maps = (window as any).google?.maps;
      if (maps && typeof maps.Polyline === 'function' && typeof maps.LatLngBounds === 'function') {
        const pathPoints: { lat: number; lng: number }[] = [];
        const segments = 16;
        for (let i = 0; i <= segments; i++) {
          const t = i / segments;
          const curveOffset = Math.sin(t * Math.PI) * 0.04;
          pathPoints.push({
            lat: origin.coordinates.lat + dLat * t + curveOffset,
            lng: origin.coordinates.lng + dLng * t - curveOffset * 0.5,
          });
        }

        const fallbackPoly = new maps.Polyline({
          path: pathPoints,
          strokeColor: '#059669', // Emerald brand
          strokeWeight: 6,
          strokeOpacity: 0.85,
          map,
        });
        polylinesRef.current = [fallbackPoly];

        const bounds = new maps.LatLngBounds();
        bounds.extend(originLatLng);
        bounds.extend(destinationLatLng);
        map.fitBounds(bounds, 60);
      }

      if (onRouteCalculated) {
        onRouteCalculated({
          distanceKm: roadKm,
          durationMinutes: durationMins,
          summary: `Roadway corridor: ${origin.locality || origin.title} to ${destination.locality || destination.title}`,
        });
      }
    };

    // Verify if modern Route.computeRoutes is available on routesLib
    const routeClass = (routesLib as any)?.Route;
    if (!routeClass || typeof routeClass.computeRoutes !== 'function') {
      computeFallbackRoadMetrics();
      return;
    }

    const request = {
      origin: originLatLng,
      destination: destinationLatLng,
      travelMode: gmpTravelMode,
      fields: ['path', 'distanceMeters', 'durationMillis', 'viewport', 'legs'],
    };

    routeClass
      .computeRoutes(request)
      .then(({ routes }: { routes: any[] }) => {
        if (!routes || routes.length === 0) {
          throw new Error('No route returned by Routes API');
        }

        const primaryRoute = routes[0];

        // Draw route polylines using native createPolylines() if available
        if (typeof primaryRoute.createPolylines === 'function') {
          const newPolylines = primaryRoute.createPolylines();
          newPolylines.forEach((p: any) => {
            if (p && typeof p.setOptions === 'function') {
              p.setOptions({
                strokeColor: '#059669',
                strokeWeight: 6,
                strokeOpacity: 0.85,
              });
              p.setMap(map);
            }
          });
          polylinesRef.current = newPolylines;
        }

        // Fit map bounds
        if (primaryRoute.viewport && typeof map.fitBounds === 'function') {
          map.fitBounds(primaryRoute.viewport, 60);
        }

        const distanceMeters = primaryRoute.distanceMeters ?? 0;
        const durationMillis = primaryRoute.durationMillis ?? 0;
        const distanceKm = Math.max(1, Math.round((distanceMeters / 1000) * 10) / 10);
        const durationMinutes = Math.max(1, Math.round(durationMillis / 60000));

        if (onRouteCalculated) {
          onRouteCalculated({
            distanceKm,
            durationMinutes,
            summary: `Route via ${origin.subDivision || origin.district} - ${destination.subDivision || destination.district}`,
          });
        }
      })
      .catch((err: any) => {
        console.warn('Routes API computeRoutes fallback:', err?.message);
        computeFallbackRoadMetrics();
      });

    return () => {
      polylinesRef.current.forEach((p) => {
        try {
          if (p && typeof p.setMap === 'function') {
            p.setMap(null);
          }
        } catch {
          // ignore cleanup errors
        }
      });
      polylinesRef.current = [];
    };
  }, [map, routesLib, isApiLoaded, origin, destination, travelMode, onRouteCalculated]);

  return null;
};

export const GoogleRouteMap: React.FC<GoogleRouteMapProps> = ({
  origin,
  destination,
  travelMode,
  liveLocation,
  highlightItems = [],
  onRouteCalculated,
}) => {
  const isApiLoaded = useApiIsLoaded();
  const apiStatus = useApiLoadingStatus();
  const [selectedHighlight, setSelectedHighlight] = useState<RouteHighlightItem | null>(null);

  // Default center: Sacred Tirupati Balaji (Hub of Swastik Travels)
  const defaultCenter = origin?.coordinates || { lat: 13.6288, lng: 79.4192 };

  // 1. Loading State: Wait for APIProvider to be fully ready before mounting Map & Markers
  if (!isApiLoaded || apiStatus === 'LOADING') {
    return (
      <div className="relative w-full h-full min-h-[460px] rounded-2xl flex flex-col items-center justify-center bg-slate-50 border border-emerald-100 p-6 text-center">
        <div className="relative w-14 h-14 mb-3">
          <div className="w-14 h-14 rounded-full border-4 border-emerald-100 border-t-emerald-600 animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center text-emerald-700">
            <Navigation className="w-5 h-5 rotate-45 animate-pulse" />
          </div>
        </div>
        <h4 className="text-sm font-bold text-slate-800">Initializing Google Maps Platform Engine...</h4>
        <p className="text-xs text-slate-500 mt-1 max-w-sm">
          Loading Routes API, Places Library, and Advanced Markers.
        </p>
      </div>
    );
  }

  // 2. Error State: Handle API failure gracefully
  if (apiStatus === 'FAILED') {
    return (
      <div className="relative w-full h-full min-h-[460px] rounded-2xl flex flex-col items-center justify-center bg-amber-50/70 border border-amber-200 p-6 text-center">
        <AlertCircle className="w-10 h-10 text-amber-600 mb-2.5" />
        <h4 className="text-sm font-bold text-slate-800">Google Maps Engine Unavailable</h4>
        <p className="text-xs text-slate-600 mt-1 max-w-md">
          The map cannot be displayed right now. Roadway distance calculations and waypoint directions remain fully operational below.
        </p>
      </div>
    );
  }

  // 3. Ready State: Google Maps API is loaded and verified
  return (
    <div className="relative w-full h-full min-h-[460px] rounded-2xl overflow-hidden shadow-inner border border-emerald-100 bg-slate-100">
      <Map
        defaultCenter={defaultCenter}
        defaultZoom={origin && destination ? 10 : 12}
        mapId="DEMO_MAP_ID"
        gestureHandling="greedy"
        fullscreenControl={true}
        internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
        style={{ width: '100%', height: '100%' }}
      >
        {/* Route computation and polyline renderer */}
        <RouteRenderer
          origin={origin}
          destination={destination}
          travelMode={travelMode}
          onRouteCalculated={onRouteCalculated}
        />

        {/* Origin Marker */}
        {origin && (
          <AdvancedMarker
            position={{ lat: origin.coordinates.lat, lng: origin.coordinates.lng }}
            title={`Origin: ${origin.title}`}
          >
            <Pin background="#0284c7" borderColor="#0369a1" glyphColor="#ffffff" />
          </AdvancedMarker>
        )}

        {/* Destination Marker */}
        {destination && (
          <AdvancedMarker
            position={{ lat: destination.coordinates.lat, lng: destination.coordinates.lng }}
            title={`Destination: ${destination.title}`}
          >
            <Pin background="#059669" borderColor="#047857" glyphColor="#ffffff" />
          </AdvancedMarker>
        )}

        {/* Live GPS position marker */}
        {liveLocation && (
          <AdvancedMarker
            position={{ lat: liveLocation.lat, lng: liveLocation.lng }}
            title="Your Live Position"
          >
            <div className="relative flex items-center justify-center">
              <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-blue-400 opacity-75"></span>
              <div className="relative z-10 w-6 h-6 rounded-full bg-blue-600 border-2 border-white shadow-lg flex items-center justify-center text-white text-[10px]">
                <Navigation className="w-3.5 h-3.5 rotate-45" />
              </div>
            </div>
          </AdvancedMarker>
        )}

        {/* Intermediate highway stops & nearby highlights */}
        {highlightItems.map((item) => (
          <AdvancedMarker
            key={item.id}
            position={{ lat: item.lat, lng: item.lng }}
            title={item.name}
            onClick={() => setSelectedHighlight(item)}
          >
            <div
              className={`p-1.5 rounded-full border-2 border-white shadow-md cursor-pointer transition-transform hover:scale-125 ${
                item.category === 'Hospital'
                  ? 'bg-rose-500 text-white'
                  : item.category === 'Waterfall'
                  ? 'bg-cyan-500 text-white'
                  : item.category === 'Temple'
                  ? 'bg-amber-500 text-white'
                  : item.category === 'Zoo'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-indigo-500 text-white'
              }`}
            >
              <MapPin className="w-4 h-4" />
            </div>
          </AdvancedMarker>
        ))}
      </Map>

      {/* Floating Selected Highlight Info Card */}
      {selectedHighlight && (
        <div className="absolute bottom-4 left-4 right-4 md:left-6 md:right-auto md:max-w-sm z-20 bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-xl border border-emerald-100 animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                {selectedHighlight.category}
              </span>
              <h4 className="font-bold text-slate-900 text-sm mt-1">{selectedHighlight.name}</h4>
              <p className="text-xs text-slate-600 mt-0.5 line-clamp-2">{selectedHighlight.description}</p>
              {selectedHighlight.phone && (
                <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-medium mt-2">
                  <Phone className="w-3.5 h-3.5" />
                  <span>{selectedHighlight.phone}</span>
                </div>
              )}
            </div>
            <button
              onClick={() => setSelectedHighlight(null)}
              className="text-slate-400 hover:text-slate-700 p-1 rounded-md"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Map Attribution Badge */}
      <div className="absolute top-3 right-3 z-10 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-md text-[11px] font-medium text-slate-700 shadow-sm border border-slate-200 flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
        <span>Google Maps Routes & Live GPS</span>
      </div>
    </div>
  );
};
