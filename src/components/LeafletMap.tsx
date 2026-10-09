import React, { useEffect, useRef } from 'react';
import L from 'leaflet';

export interface MapMarkerItem {
  id: string;
  title: string;
  lat: number;
  lng: number;
  category?: string;
  description?: string;
  phone?: string;
  address?: string;
}

interface LeafletMapProps {
  center?: [number, number];
  zoom?: number;
  userLocation?: {
    latitude: number;
    longitude: number;
    accuracy?: number;
  } | null;
  markers?: MapMarkerItem[];
  height?: string;
  className?: string;
  onMarkerClick?: (marker: MapMarkerItem) => void;
}

export const LeafletMap: React.FC<LeafletMapProps> = ({
  center = [13.6288, 79.4192], // Default to Tirupati
  zoom = 12,
  userLocation,
  markers = [],
  height = '420px',
  className = '',
  onMarkerClick,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const userMarkerRef = useRef<L.LayerGroup | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const initialCenter: [number, number] = userLocation
        ? [userLocation.latitude, userLocation.longitude]
        : center;

      const map = L.map(mapContainerRef.current, {
        center: initialCenter,
        zoom: zoom,
        zoomControl: true,
        scrollWheelZoom: true,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);

      mapInstanceRef.current = map;
      markersLayerRef.current = L.layerGroup().addTo(map);
      userMarkerRef.current = L.layerGroup().addTo(map);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update center when user location or center prop changes
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    if (userLocation) {
      mapInstanceRef.current.setView([userLocation.latitude, userLocation.longitude], Math.max(zoom, 14));
    } else {
      mapInstanceRef.current.setView(center, zoom);
    }
  }, [userLocation?.latitude, userLocation?.longitude, center[0], center[1], zoom]);

  // Render markers
  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerRef.current) return;

    markersLayerRef.current.clearLayers();

    markers.forEach((m) => {
      let iconColor = '#059669'; // Emerald
      let badgeIcon = '📍';

      if (m.category?.toLowerCase().includes('hospital')) {
        iconColor = '#ef4444';
        badgeIcon = '🏥';
      } else if (m.category?.toLowerCase().includes('hotel')) {
        iconColor = '#3b82f6';
        badgeIcon = '🏨';
      } else if (m.category?.toLowerCase().includes('waterfall')) {
        iconColor = '#0284c7';
        badgeIcon = '💧';
      } else if (m.category?.toLowerCase().includes('zoo')) {
        iconColor = '#f59e0b';
        badgeIcon = '🦁';
      } else if (m.category?.toLowerCase().includes('restaurant') || m.category?.toLowerCase().includes('food')) {
        iconColor = '#ea580c';
        badgeIcon = '🍽️';
      }

      const customIcon = L.divIcon({
        className: 'custom-map-pin',
        html: `
          <div style="
            background: ${iconColor};
            color: white;
            width: 34px;
            height: 34px;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 10px rgba(0,0,0,0.3);
            border: 2px solid #ffffff;
            cursor: pointer;
          ">
            <span style="transform: rotate(45deg); font-size: 15px;">${badgeIcon}</span>
          </div>
        `,
        iconSize: [34, 34],
        iconAnchor: [17, 34],
        popupAnchor: [0, -32],
      });

      const marker = L.marker([m.lat, m.lng], { icon: customIcon });

      const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${m.lat},${m.lng}`;

      const popupContent = `
        <div style="font-family: inherit; padding: 4px; min-width: 180px;">
          <div style="font-size: 11px; text-transform: uppercase; font-weight: 700; color: ${iconColor}; letter-spacing: 0.5px;">${m.category || 'Location'}</div>
          <h4 style="font-size: 14px; font-weight: 700; margin: 4px 0 2px 0; color: #1e293b;">${m.title}</h4>
          ${m.address ? `<p style="font-size: 12px; color: #64748b; margin: 0 0 6px 0;">${m.address}</p>` : ''}
          ${m.phone ? `<p style="font-size: 12px; color: #0284c7; margin: 0 0 8px 0; font-weight: 600;">📞 ${m.phone}</p>` : ''}
          <a href="${googleMapsUrl}" target="_blank" rel="noopener noreferrer" style="
            display: inline-block;
            background: #0f766e;
            color: #ffffff;
            font-size: 11px;
            font-weight: 600;
            padding: 5px 10px;
            border-radius: 6px;
            text-decoration: none;
            margin-top: 4px;
          ">
            Get Directions ↗
          </a>
        </div>
      `;

      marker.bindPopup(popupContent);
      marker.on('click', () => {
        if (onMarkerClick) onMarkerClick(m);
      });

      markersLayerRef.current?.addLayer(marker);
    });
  }, [markers, onMarkerClick]);

  // Render User GPS Location
  useEffect(() => {
    if (!mapInstanceRef.current || !userMarkerRef.current) return;

    userMarkerRef.current.clearLayers();

    if (userLocation) {
      const { latitude, longitude, accuracy } = userLocation;

      // Accuracy circle
      if (accuracy && accuracy < 5000) {
        const circle = L.circle([latitude, longitude], {
          radius: accuracy,
          color: '#059669',
          fillColor: '#10b981',
          fillOpacity: 0.15,
          weight: 1.5,
        });
        userMarkerRef.current.addLayer(circle);
      }

      // Pulsing user dot
      const userDotIcon = L.divIcon({
        className: 'user-gps-pulse',
        html: `
          <div style="position: relative; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center;">
            <div style="
              position: absolute;
              width: 24px;
              height: 24px;
              border-radius: 50%;
              background: rgba(16, 185, 129, 0.45);
              animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
            "></div>
            <div style="
              width: 14px;
              height: 14px;
              border-radius: 50%;
              background: #059669;
              border: 3px solid #ffffff;
              box-shadow: 0 0 8px rgba(5, 150, 105, 0.8);
            "></div>
          </div>
        `,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      });

      const userMarker = L.marker([latitude, longitude], { icon: userDotIcon });
      userMarker.bindPopup(`
        <div style="font-family: inherit; font-size: 13px;">
          <strong style="color: #059669;">📍 Your Live GPS Location</strong>
          <p style="margin: 4px 0 0 0; color: #475569; font-size: 11px;">
            Accuracy: ~${accuracy || 15}m<br/>
            Lat: ${latitude.toFixed(5)}, Lng: ${longitude.toFixed(5)}
          </p>
        </div>
      `);

      userMarkerRef.current.addLayer(userMarker);
    }
  }, [userLocation]);

  return (
    <div
      className={`relative w-full rounded-2xl overflow-hidden shadow-inner border border-slate-200/80 bg-slate-100 ${className}`}
      style={{ height }}
    >
      <div ref={mapContainerRef} className="w-full h-full" />
    </div>
  );
};
