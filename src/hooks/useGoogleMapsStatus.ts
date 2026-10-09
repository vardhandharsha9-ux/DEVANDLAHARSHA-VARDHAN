import { useState, useEffect } from 'react';
import { useMapsLibrary } from '@vis.gl/react-google-maps';

export interface GoogleMapsStatusResult {
  isReady: boolean;
  status: 'READY' | 'LOADING' | 'UNAVAILABLE' | 'ERROR';
  error: string | null;
}

export function useGoogleMapsStatus(): GoogleMapsStatusResult {
  const mapsLib = useMapsLibrary('maps');
  const [quotaExceeded, setQuotaExceeded] = useState(false);

  useEffect(() => {
    const handleQuota = () => setQuotaExceeded(true);
    window.addEventListener('gmp-quota-exceeded', handleQuota);
    return () => window.removeEventListener('gmp-quota-exceeded', handleQuota);
  }, []);

  if (quotaExceeded) {
    return {
      isReady: false,
      status: 'ERROR',
      error: 'Google Maps quota exceeded or auth error',
    };
  }

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  if (!apiKey || apiKey === 'YOUR_GOOGLE_MAPS_API_KEY') {
    return {
      isReady: false,
      status: 'UNAVAILABLE',
      error: 'Google Maps API key not configured',
    };
  }

  if (!mapsLib) {
    return {
      isReady: false,
      status: 'LOADING',
      error: null,
    };
  }

  return {
    isReady: true,
    status: 'READY',
    error: null,
  };
}
