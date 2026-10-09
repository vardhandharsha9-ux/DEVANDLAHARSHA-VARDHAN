import React, { useState, useMemo, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { GoogleRouteMap, RouteHighlightItem } from '../components/GoogleRouteMap';
import { useGoogleMapsStatus } from '../hooks/useGoogleMapsStatus';
import {
  INDIA_STATES_DATA,
  searchIndianLocations,
  findNearestIndianLocation,
  POPULAR_ROUTE_PRESETS,
  FlatLocationResult,
  StateData,
  DistrictData,
  SubDivision,
} from '../data/indiaLocations';
import { HOSPITALS, WATERFALLS, ZOO_PARKS, RESTAURANTS } from '../data/mockData';
import {
  MapPin,
  Navigation,
  Compass,
  Search,
  ArrowRight,
  Car,
  Bus,
  Train,
  Bike,
  Route,
  Sparkles,
  ShieldCheck,
  Calendar,
  Clock,
  HeartPulse,
  Droplets,
  PawPrint,
  UtensilsCrossed,
  Fuel,
  ChevronDown,
  Layers,
  CheckCircle2,
  RefreshCw,
  ExternalLink,
  ChevronRight,
  AlertTriangle,
  Radio,
  BookmarkPlus,
} from 'lucide-react';

export const IndiaRouteExplorerPage: React.FC = () => {
  const { navigateTo, addTrip, liveLocation, startLiveLocation, stopLiveLocation, showToast } = useApp();
  const mapsStatus = useGoogleMapsStatus();

  // Selected Origin & Destination
  const [origin, setOrigin] = useState<FlatLocationResult>(POPULAR_ROUTE_PRESETS[0].origin);
  const [destination, setDestination] = useState<FlatLocationResult>(POPULAR_ROUTE_PRESETS[0].destination);
  const [travelMode, setTravelMode] = useState<'DRIVING' | 'TRANSIT' | 'TWO_WHEELER'>('DRIVING');

  // Input selection mode: 'search' | 'hierarchy'
  const [originSelectMode, setOriginSelectMode] = useState<'search' | 'hierarchy'>('search');
  const [destSelectMode, setDestSelectMode] = useState<'search' | 'hierarchy'>('search');

  // Search queries
  const [originSearch, setOriginSearch] = useState('');
  const [destSearch, setDestSearch] = useState('');
  const [isOriginSearching, setIsOriginSearching] = useState(false);
  const [isDestSearching, setIsDestSearching] = useState(false);

  // Manual Hierarchy Pickers (Origin)
  const [originState, setOriginState] = useState<string>('Andhra Pradesh');
  const [originDistrict, setOriginDistrict] = useState<string>('Tirupati');
  const [originSubDiv, setOriginSubDiv] = useState<string>('Tirupati Urban');
  const [originLocality, setOriginLocality] = useState<string>('Tirupati Central');

  // Manual Hierarchy Pickers (Destination)
  const [destState, setDestState] = useState<string>('Andhra Pradesh');
  const [destDistrict, setDestDistrict] = useState<string>('Tirupati');
  const [destSubDiv, setDestSubDiv] = useState<string>('Tirumala Hills');
  const [destLocality, setDestLocality] = useState<string>('Sri Venkateswara Temple (Tirumala)');

  // Route Metrics
  const [routeDistanceKm, setRouteDistanceKm] = useState<number>(22.4);
  const [routeDurationMins, setRouteDurationMins] = useState<number>(45);
  const [routeSummary, setRouteSummary] = useState<string>('Scenic Ghat Road Corridor');

  // Active highway filter category
  const [activeAmenityCategory, setActiveAmenityCategory] = useState<
    'all' | 'hospital' | 'waterfall' | 'restaurant' | 'zoo'
  >('all');

  // Real GPS Loading
  const [isGpsResolving, setIsGpsResolving] = useState(false);

  // Autocomplete search suggestions
  const originSuggestions = useMemo(() => {
    return searchIndianLocations(originSearch);
  }, [originSearch]);

  const destSuggestions = useMemo(() => {
    return searchIndianLocations(destSearch);
  }, [destSearch]);

  // Derived options for origin hierarchy dropdowns
  const currentOriginStateObj = useMemo(() => {
    return INDIA_STATES_DATA.find((s) => s.name === originState) || INDIA_STATES_DATA[0];
  }, [originState]);

  const currentOriginDistrictObj = useMemo(() => {
    return (
      currentOriginStateObj.districts.find((d) => d.name === originDistrict) ||
      currentOriginStateObj.districts[0]
    );
  }, [currentOriginStateObj, originDistrict]);

  const currentOriginSubDivObj = useMemo(() => {
    return (
      currentOriginDistrictObj.subDivisions.find((sd) => sd.name === originSubDiv) ||
      currentOriginDistrictObj.subDivisions[0]
    );
  }, [currentOriginDistrictObj, originSubDiv]);

  // Derived options for dest hierarchy dropdowns
  const currentDestStateObj = useMemo(() => {
    return INDIA_STATES_DATA.find((s) => s.name === destState) || INDIA_STATES_DATA[0];
  }, [destState]);

  const currentDestDistrictObj = useMemo(() => {
    return (
      currentDestStateObj.districts.find((d) => d.name === destDistrict) ||
      currentDestStateObj.districts[0]
    );
  }, [currentDestStateObj, destDistrict]);

  const currentDestSubDivObj = useMemo(() => {
    return (
      currentDestDistrictObj.subDivisions.find((sd) => sd.name === destSubDiv) ||
      currentDestDistrictObj.subDivisions[0]
    );
  }, [currentDestDistrictObj, destSubDiv]);

  // Handle Current GPS Location selection
  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      showToast('Geolocation is not supported by your browser', 'error');
      return;
    }

    setIsGpsResolving(true);
    showToast('Acquiring real-time GPS coordinates...', 'info');

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setIsGpsResolving(false);
        const { latitude, longitude } = pos.coords;
        const matched = findNearestIndianLocation(latitude, longitude);
        setOrigin(matched);
        showToast(`Origin set to: ${matched.title}`, 'success');
      },
      (err) => {
        setIsGpsResolving(false);
        console.warn('GPS location error:', err.message);
        // Graceful fallback to default Tirupati hub
        setOrigin(POPULAR_ROUTE_PRESETS[0].origin);
        showToast('Location permission denied. Defaulted to Tirupati Hub.', 'info');
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  // Apply manual hierarchy for Origin
  const handleApplyOriginHierarchy = () => {
    const loc = currentOriginSubDivObj.locations.find((l) => l.name === originLocality) || currentOriginSubDivObj.locations[0];
    if (loc) {
      setOrigin({
        id: loc.id,
        title: loc.name,
        subtitle: `${currentOriginSubDivObj.name} ${currentOriginSubDivObj.type}, ${currentOriginDistrictObj.name}, ${currentOriginStateObj.name}`,
        state: currentOriginStateObj.name,
        district: currentOriginDistrictObj.name,
        subDivision: currentOriginSubDivObj.name,
        subDivisionType: currentOriginSubDivObj.type,
        locality: loc.name,
        pinCode: loc.pinCode,
        coordinates: loc.coordinates,
      });
      showToast(`Origin updated: ${loc.name}`, 'success');
    }
  };

  // Apply manual hierarchy for Destination
  const handleApplyDestHierarchy = () => {
    const loc = currentDestSubDivObj.locations.find((l) => l.name === destLocality) || currentDestSubDivObj.locations[0];
    if (loc) {
      setDestination({
        id: loc.id,
        title: loc.name,
        subtitle: `${currentDestSubDivObj.name} ${currentDestSubDivObj.type}, ${currentDestDistrictObj.name}, ${currentDestStateObj.name}`,
        state: currentDestStateObj.name,
        district: currentDestDistrictObj.name,
        subDivision: currentDestSubDivObj.name,
        subDivisionType: currentDestSubDivObj.type,
        locality: loc.name,
        pinCode: loc.pinCode,
        coordinates: loc.coordinates,
      });
      showToast(`Destination updated: ${loc.name}`, 'success');
    }
  };

  // Swap Origin and Destination
  const handleSwap = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
    showToast('Origin & Destination swapped', 'info');
  };

  // Highway amenities / nearby attractions along the route
  const highwayHighlights: RouteHighlightItem[] = useMemo(() => {
    const items: RouteHighlightItem[] = [];

    // Map hospitals
    HOSPITALS.forEach((h) => {
      items.push({
        id: `h-${h.id}`,
        name: h.name,
        category: 'Hospital',
        lat: h.coordinates.lat,
        lng: h.coordinates.lng,
        description: `${h.type} • 24/7 Emergency • ${h.emergencyHotline}`,
        phone: h.emergencyHotline,
      });
    });

    // Map waterfalls
    WATERFALLS.forEach((w) => {
      items.push({
        id: `w-${w.id}`,
        name: w.name,
        category: 'Waterfall',
        lat: w.coordinates.lat,
        lng: w.coordinates.lng,
        description: `${w.height} Height • ${w.trekkingDifficulty} Trek • ${w.bestSeason}`,
      });
    });

    // Map zoo parks
    ZOO_PARKS.forEach((z) => {
      items.push({
        id: `z-${z.id}`,
        name: z.name,
        category: 'Zoo',
        lat: z.coordinates.lat,
        lng: z.coordinates.lng,
        description: `${z.openingHours} • Safari Available • ${z.entryFee}`,
      });
    });

    // Map restaurants
    RESTAURANTS.forEach((r) => {
      items.push({
        id: `r-${r.id}`,
        name: r.name,
        category: 'Restaurant',
        lat: r.coordinates.lat,
        lng: r.coordinates.lng,
        description: `${r.cuisine.join(', ')} • Rating: ${r.rating}★ • ${r.address}`,
        phone: r.phone,
      });
    });

    return items;
  }, []);

  // Filtered highlights based on active category
  const filteredHighlights = useMemo(() => {
    if (activeAmenityCategory === 'all') return highwayHighlights;
    if (activeAmenityCategory === 'hospital')
      return highwayHighlights.filter((h) => h.category === 'Hospital');
    if (activeAmenityCategory === 'waterfall')
      return highwayHighlights.filter((h) => h.category === 'Waterfall');
    if (activeAmenityCategory === 'restaurant')
      return highwayHighlights.filter((h) => h.category === 'Restaurant');
    if (activeAmenityCategory === 'zoo')
      return highwayHighlights.filter((h) => h.category === 'Zoo');
    return highwayHighlights;
  }, [highwayHighlights, activeAmenityCategory]);

  // Estimated fuel / fare cost calculations
  const costBreakdown = useMemo(() => {
    const km = routeDistanceKm || 20;
    if (travelMode === 'DRIVING') {
      const fuelLiters = Math.round((km / 14) * 10) / 10;
      const fuelCost = Math.round(fuelLiters * 104);
      const cabFare = Math.max(350, Math.round(km * 16 + 200));
      return {
        fuelLiters,
        fuelCost,
        fareEstimate: cabFare,
        label: 'Cab / Private Vehicle',
        tollEstimate: km > 50 ? Math.round(km * 1.8) : 0,
      };
    } else if (travelMode === 'TRANSIT') {
      const busFare = Math.max(50, Math.round(km * 2.2));
      return {
        fuelLiters: 0,
        fuelCost: 0,
        fareEstimate: busFare,
        label: 'Express Bus / Public Transit',
        tollEstimate: 0,
      };
    } else {
      const bikeFuel = Math.round((km / 42) * 10) / 10;
      const bikeCost = Math.round(bikeFuel * 104);
      return {
        fuelLiters: bikeFuel,
        fuelCost: bikeCost,
        fareEstimate: bikeCost,
        label: 'Two-Wheeler / Motorcycle',
        tollEstimate: 0,
      };
    }
  }, [routeDistanceKm, travelMode]);

  // Turn-by-turn highway corridor waypoints
  const simulatedWaypoints = useMemo(() => {
    const originName = origin.locality || origin.title;
    const destName = destination.locality || destination.title;
    const km = routeDistanceKm;

    return [
      {
        step: 1,
        instruction: `Depart from ${originName}`,
        distance: '0.0 km',
        note: 'Check tire pressure, toll FASTag & fuel',
      },
      {
        step: 2,
        instruction: `Merge onto Highway NH corridor toward ${destination.district || destination.state}`,
        distance: `${Math.round(km * 0.25)} km`,
        note: '4-Lane Express corridor with posted speed limit 80-100 km/h',
      },
      {
        step: 3,
        instruction: 'Highway Rest Stop & Fuel Plaza',
        distance: `${Math.round(km * 0.5)} km`,
        note: 'Clean restrooms, highway restaurants & emergency medical kiosk',
      },
      {
        step: 4,
        instruction: `Take exit ramp toward ${destName}`,
        distance: `${Math.round(km * 0.85)} km`,
        note: 'Follow tourist signboards & ghat road advisories',
      },
      {
        step: 5,
        instruction: `Arrive at Destination: ${destName}`,
        distance: `${km} km`,
        note: 'Safe parking & reception point',
      },
    ];
  }, [origin, destination, routeDistanceKm]);

  // Save this route to My Trips
  const handleSaveToMyTrips = () => {
    const today = new Date().toISOString().split('T')[0];
    const nextWeek = new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0];

    addTrip({
      id: `trip-${Date.now()}`,
      title: `${origin.locality} to ${destination.locality} Journey`,
      startLocation: origin.locality,
      destination: destination.locality,
      hierarchy: {
        country: 'India',
        state: destination.state,
        district: destination.district,
        city: destination.locality,
        mandal: destination.subDivision,
      },
      startDate: today,
      endDate: nextWeek,
      travelers: {
        adults: 2,
        children: 0,
      },
      budget: costBreakdown.fareEstimate + 2500,
      status: 'Active',
      travelType: 'Adventure',
      itinerary: [
        {
          dayNumber: 1,
          title: 'Roadway Navigation & Arrival',
          items: [
            {
              id: 'it-1',
              timeSlot: 'Morning',
              place: origin.locality,
              activity: `Departure via Highway toward ${destination.locality}`,
              estimatedCost: costBreakdown.fareEstimate,
              distance: `${routeDistanceKm} km`,
              travelTime: `${routeDurationMins} mins`,
              notes: 'Safe cruising with FASTag checkpoints & rest stops',
            },
          ],
        },
      ],
      notes: `Planned via Swastik India Route Explorer. Mode: ${travelMode}. Estimated duration: ${routeDurationMins} mins.`,
      createdAt: new Date().toISOString(),
    });

    showToast('Route saved to My Trips!', 'success');
    navigateTo('my-trips');
  };

  return (
    <div className="bg-slate-50 min-h-screen py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Page Header */}
        <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-72 h-72 bg-emerald-600/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-700/50 text-emerald-200 text-xs font-semibold uppercase tracking-wider border border-emerald-600/50">
                  <Compass className="w-3.5 h-3.5 text-amber-400" />
                  <span>Pan-India Administrative Explorer</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-900/60 text-xs font-medium border border-emerald-600/40 text-emerald-200">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      mapsStatus.isReady ? 'bg-emerald-400' : mapsStatus.status === 'LOADING' ? 'bg-amber-400 animate-ping' : 'bg-slate-400'
                    }`}
                  />
                  <span>
                    {mapsStatus.isReady
                      ? 'Google Maps Platform: Active'
                      : mapsStatus.status === 'LOADING'
                      ? 'Google Maps: Initializing...'
                      : 'Google Maps: Offline Fallback'}
                  </span>
                </div>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
                India Route Explorer & Live GPS
              </h1>
              <p className="text-emerald-100/90 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
                Connect any origin to destination across all 36 Indian States & UTs with normalized
                administrative divisions (Mandal / Taluk / Tehsil / Block), turn-by-turn routing, highway amenities, and live GPS tracking.
              </p>
            </div>

            {/* Live GPS Active Status Badge */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <button
                onClick={() => {
                  if (liveLocation.isTracking) {
                    stopLiveLocation();
                    showToast('Live tracking paused', 'info');
                  } else {
                    startLiveLocation();
                    showToast('Real-time GPS tracking enabled', 'success');
                  }
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-md ${
                  liveLocation.isTracking
                    ? 'bg-rose-500 hover:bg-rose-600 text-white animate-pulse'
                    : 'bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold'
                }`}
              >
                <Radio className="w-4 h-4" />
                <span>{liveLocation.isTracking ? 'Live GPS Active' : 'Start Live GPS Tracking'}</span>
              </button>
            </div>
          </div>

          {/* Quick Popular Route Presets */}
          <div className="mt-6 pt-5 border-t border-emerald-700/60">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-200 mb-2.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>POPULAR CORRIDORS:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {POPULAR_ROUTE_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => {
                    setOrigin(preset.origin);
                    setDestination(preset.destination);
                    setTravelMode(preset.defaultMode);
                    showToast(`Loaded: ${preset.name}`, 'info');
                  }}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-900/60 hover:bg-emerald-700/80 text-white border border-emerald-700/80 transition-colors flex items-center gap-1.5"
                >
                  <span>{preset.name}</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-300">
                    {preset.tag}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Grid: Selectors + Map Visualization */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Origin & Destination Controls (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            {/* 1. Origin Card */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-xs">
                    A
                  </div>
                  <h3 className="font-bold text-slate-900 text-base">Origin Location</h3>
                </div>

                {/* Mode toggle: Search vs Hierarchy */}
                <div className="flex rounded-lg bg-slate-100 p-0.5 text-xs font-medium">
                  <button
                    onClick={() => setOriginSelectMode('search')}
                    className={`px-2.5 py-1 rounded-md transition-all ${
                      originSelectMode === 'search' ? 'bg-white shadow text-slate-900 font-bold' : 'text-slate-500'
                    }`}
                  >
                    Search
                  </button>
                  <button
                    onClick={() => setOriginSelectMode('hierarchy')}
                    className={`px-2.5 py-1 rounded-md transition-all ${
                      originSelectMode === 'hierarchy' ? 'bg-white shadow text-slate-900 font-bold' : 'text-slate-500'
                    }`}
                  >
                    Hierarchy
                  </button>
                </div>
              </div>

              {/* Current GPS Option Button */}
              <div className="mt-3.5">
                <button
                  onClick={handleUseCurrentLocation}
                  disabled={isGpsResolving}
                  className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-800 text-xs font-semibold border border-sky-200 transition-colors"
                >
                  <Navigation className={`w-3.5 h-3.5 ${isGpsResolving ? 'animate-spin' : ''}`} />
                  <span>{isGpsResolving ? 'Locating GPS...' : '📍 Use My Current GPS Location'}</span>
                </button>
              </div>

              {/* Search input or Hierarchy Pickers */}
              {originSelectMode === 'search' ? (
                <div className="mt-3 relative">
                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="Search city, taluk/mandal, PIN code, landmark..."
                      value={originSearch}
                      onChange={(e) => {
                        setOriginSearch(e.target.value);
                        setIsOriginSearching(true);
                      }}
                      onFocus={() => setIsOriginSearching(true)}
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  {/* Autocomplete dropdown */}
                  {isOriginSearching && originSuggestions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-1 max-h-56 overflow-y-auto bg-white rounded-xl shadow-xl border border-slate-200 z-30 p-1.5 space-y-1">
                      {originSuggestions.map((item) => (
                        <button
                          key={`orig-${item.id}`}
                          onClick={() => {
                            setOrigin(item);
                            setOriginSearch('');
                            setIsOriginSearching(false);
                            showToast(`Origin: ${item.title}`, 'success');
                          }}
                          className="w-full text-left px-3 py-2 rounded-lg hover:bg-emerald-50 text-xs flex items-start gap-2 transition-colors"
                        >
                          <MapPin className="w-3.5 h-3.5 text-sky-600 mt-0.5 shrink-0" />
                          <div>
                            <p className="font-bold text-slate-900">{item.title}</p>
                            <p className="text-[11px] text-slate-500">{item.subtitle}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                /* Manual Administrative Hierarchy Pickers */
                <div className="mt-3 space-y-2 text-xs">
                  <div>
                    <label className="text-[10px] uppercase font-bold text-slate-500">State / UT (All 36)</label>
                    <select
                      value={originState}
                      onChange={(e) => {
                        setOriginState(e.target.value);
                        const s = INDIA_STATES_DATA.find((x) => x.name === e.target.value);
                        if (s && s.districts.length > 0) {
                          setOriginDistrict(s.districts[0].name);
                          setOriginSubDiv(s.districts[0].subDivisions[0].name);
                          setOriginLocality(s.districts[0].subDivisions[0].locations[0].name);
                        }
                      }}
                      className="w-full mt-1 p-2 rounded-lg border border-slate-300 font-medium"
                    >
                      {INDIA_STATES_DATA.map((s) => (
                        <option key={s.id} value={s.name}>
                          {s.name} ({s.type})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] uppercase font-bold text-slate-500">District</label>
                      <select
                        value={originDistrict}
                        onChange={(e) => {
                          setOriginDistrict(e.target.value);
                          const d = currentOriginStateObj.districts.find((x) => x.name === e.target.value);
                          if (d && d.subDivisions.length > 0) {
                            setOriginSubDiv(d.subDivisions[0].name);
                            setOriginLocality(d.subDivisions[0].locations[0].name);
                          }
                        }}
                        className="w-full mt-1 p-2 rounded-lg border border-slate-300 font-medium"
                      >
                        {currentOriginStateObj.districts.map((d) => (
                          <option key={d.id} value={d.name}>
                            {d.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] uppercase font-bold text-slate-500">
                        {currentOriginStateObj.subDivisionTerm}
                      </label>
                      <select
                        value={originSubDiv}
                        onChange={(e) => {
                          setOriginSubDiv(e.target.value);
                          const sd = currentOriginDistrictObj.subDivisions.find((x) => x.name === e.target.value);
                          if (sd && sd.locations.length > 0) {
                            setOriginLocality(sd.locations[0].name);
                          }
                        }}
                        className="w-full mt-1 p-2 rounded-lg border border-slate-300 font-medium"
                      >
                        {currentOriginDistrictObj.subDivisions.map((sd) => (
                          <option key={sd.name} value={sd.name}>
                            {sd.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-bold text-slate-500">Village / Town / City / Landmark</label>
                    <select
                      value={originLocality}
                      onChange={(e) => setOriginLocality(e.target.value)}
                      className="w-full mt-1 p-2 rounded-lg border border-slate-300 font-medium"
                    >
                      {currentOriginSubDivObj.locations.map((loc) => (
                        <option key={loc.id} value={loc.name}>
                          {loc.name} {loc.pinCode ? `(${loc.pinCode})` : ''}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    onClick={handleApplyOriginHierarchy}
                    className="w-full mt-2 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-700 text-white font-semibold text-xs"
                  >
                    Confirm Origin Selection
                  </button>
                </div>
              )}

              {/* Origin Selected Summary Display */}
              <div className="mt-3.5 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-sky-700 uppercase">Selected Origin</span>
                  <span className="text-[10px] font-mono text-slate-400">
                    {origin.coordinates.lat.toFixed(4)}°, {origin.coordinates.lng.toFixed(4)}°
                  </span>
                </div>
                <h4 className="font-bold text-slate-900 mt-1">{origin.title}</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">{origin.subtitle}</p>
              </div>
            </div>

            {/* Swap Button */}
            <div className="flex justify-center -my-2 relative z-10">
              <button
                onClick={handleSwap}
                className="p-2 rounded-full bg-white border border-slate-300 shadow-md text-slate-600 hover:text-emerald-700 hover:border-emerald-500 transition-all"
                title="Swap Origin & Destination"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>

            {/* 2. Destination Card */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                    B
                  </div>
                  <h3 className="font-bold text-slate-900 text-base">Destination Location</h3>
                </div>

                <div className="flex rounded-lg bg-slate-100 p-0.5 text-xs font-medium">
                  <button
                    onClick={() => setDestSelectMode('search')}
                    className={`px-2.5 py-1 rounded-md transition-all ${
                      destSelectMode === 'search' ? 'bg-white shadow text-slate-900 font-bold' : 'text-slate-500'
                    }`}
                  >
                    Search
                  </button>
                  <button
                    onClick={() => setDestSelectMode('hierarchy')}
                    className={`px-2.5 py-1 rounded-md transition-all ${
                      destSelectMode === 'hierarchy' ? 'bg-white shadow text-slate-900 font-bold' : 'text-slate-500'
                    }`}
                  >
                    Hierarchy
                  </button>
                </div>
              </div>

              {destSelectMode === 'search' ? (
                <div className="mt-3 relative">
                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="Search destination, temple, waterfall, PIN code..."
                      value={destSearch}
                      onChange={(e) => {
                        setDestSearch(e.target.value);
                        setIsDestSearching(true);
                      }}
                      onFocus={() => setIsDestSearching(true)}
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  {isDestSearching && destSuggestions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-1 max-h-56 overflow-y-auto bg-white rounded-xl shadow-xl border border-slate-200 z-30 p-1.5 space-y-1">
                      {destSuggestions.map((item) => (
                        <button
                          key={`dst-${item.id}`}
                          onClick={() => {
                            setDestination(item);
                            setDestSearch('');
                            setIsDestSearching(false);
                            showToast(`Destination: ${item.title}`, 'success');
                          }}
                          className="w-full text-left px-3 py-2 rounded-lg hover:bg-emerald-50 text-xs flex items-start gap-2 transition-colors"
                        >
                          <MapPin className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                          <div>
                            <p className="font-bold text-slate-900">{item.title}</p>
                            <p className="text-[11px] text-slate-500">{item.subtitle}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="mt-3 space-y-2 text-xs">
                  <div>
                    <label className="text-[10px] uppercase font-bold text-slate-500">State / UT (All 36)</label>
                    <select
                      value={destState}
                      onChange={(e) => {
                        setDestState(e.target.value);
                        const s = INDIA_STATES_DATA.find((x) => x.name === e.target.value);
                        if (s && s.districts.length > 0) {
                          setDestDistrict(s.districts[0].name);
                          setDestSubDiv(s.districts[0].subDivisions[0].name);
                          setDestLocality(s.districts[0].subDivisions[0].locations[0].name);
                        }
                      }}
                      className="w-full mt-1 p-2 rounded-lg border border-slate-300 font-medium"
                    >
                      {INDIA_STATES_DATA.map((s) => (
                        <option key={s.id} value={s.name}>
                          {s.name} ({s.type})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] uppercase font-bold text-slate-500">District</label>
                      <select
                        value={destDistrict}
                        onChange={(e) => {
                          setDestDistrict(e.target.value);
                          const d = currentDestStateObj.districts.find((x) => x.name === e.target.value);
                          if (d && d.subDivisions.length > 0) {
                            setDestSubDiv(d.subDivisions[0].name);
                            setDestLocality(d.subDivisions[0].locations[0].name);
                          }
                        }}
                        className="w-full mt-1 p-2 rounded-lg border border-slate-300 font-medium"
                      >
                        {currentDestStateObj.districts.map((d) => (
                          <option key={d.id} value={d.name}>
                            {d.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] uppercase font-bold text-slate-500">
                        {currentDestStateObj.subDivisionTerm}
                      </label>
                      <select
                        value={destSubDiv}
                        onChange={(e) => {
                          setDestSubDiv(e.target.value);
                          const sd = currentDestDistrictObj.subDivisions.find((x) => x.name === e.target.value);
                          if (sd && sd.locations.length > 0) {
                            setDestLocality(sd.locations[0].name);
                          }
                        }}
                        className="w-full mt-1 p-2 rounded-lg border border-slate-300 font-medium"
                      >
                        {currentDestDistrictObj.subDivisions.map((sd) => (
                          <option key={sd.name} value={sd.name}>
                            {sd.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-bold text-slate-500">Village / Town / City / Landmark</label>
                    <select
                      value={destLocality}
                      onChange={(e) => setDestLocality(e.target.value)}
                      className="w-full mt-1 p-2 rounded-lg border border-slate-300 font-medium"
                    >
                      {currentDestSubDivObj.locations.map((loc) => (
                        <option key={loc.id} value={loc.name}>
                          {loc.name} {loc.pinCode ? `(${loc.pinCode})` : ''}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    onClick={handleApplyDestHierarchy}
                    className="w-full mt-2 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs"
                  >
                    Confirm Destination Selection
                  </button>
                </div>
              )}

              <div className="mt-3.5 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-emerald-700 uppercase">Selected Destination</span>
                  <span className="text-[10px] font-mono text-slate-400">
                    {destination.coordinates.lat.toFixed(4)}°, {destination.coordinates.lng.toFixed(4)}°
                  </span>
                </div>
                <h4 className="font-bold text-slate-900 mt-1">{destination.title}</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">{destination.subtitle}</p>
              </div>
            </div>

            {/* Travel Mode Selector */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/80">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-2.5">
                Mode of Travel
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setTravelMode('DRIVING')}
                  className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-xs font-medium transition-all ${
                    travelMode === 'DRIVING'
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-800 font-bold shadow-sm'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Car className="w-4 h-4 mb-1" />
                  <span>Cab / Car</span>
                </button>
                <button
                  onClick={() => setTravelMode('TRANSIT')}
                  className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-xs font-medium transition-all ${
                    travelMode === 'TRANSIT'
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-800 font-bold shadow-sm'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Bus className="w-4 h-4 mb-1" />
                  <span>Bus / Transit</span>
                </button>
                <button
                  onClick={() => setTravelMode('TWO_WHEELER')}
                  className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-xs font-medium transition-all ${
                    travelMode === 'TWO_WHEELER'
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-800 font-bold shadow-sm'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Bike className="w-4 h-4 mb-1" />
                  <span>Two-Wheeler</span>
                </button>
              </div>
            </div>

            {/* Calculated Trip Metrics & Action Buttons */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80 space-y-4">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Route className="w-4 h-4 text-emerald-600" />
                <span>Roadway Metrics & Cost Estimate</span>
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-center">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Total Distance</span>
                  <p className="text-base font-extrabold text-slate-900 mt-0.5">{routeDistanceKm} km</p>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Est. Duration</span>
                  <p className="text-base font-extrabold text-slate-900 mt-0.5">
                    {Math.floor(routeDurationMins / 60) > 0 ? `${Math.floor(routeDurationMins / 60)}h ` : ''}
                    {routeDurationMins % 60}m
                  </p>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 col-span-2 sm:col-span-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Est. Travel Cost</span>
                  <p className="text-base font-extrabold text-emerald-700 mt-0.5">
                    ₹{costBreakdown.fareEstimate.toLocaleString('en-IN')}
                  </p>
                </div>
              </div>

              {costBreakdown.fuelCost > 0 && (
                <div className="flex items-center justify-between text-xs text-slate-600 px-2 py-1.5 rounded-lg bg-emerald-50/70 border border-emerald-100">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Fuel className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Estimated Fuel Consumption</span>
                  </span>
                  <span className="font-bold text-emerald-900">
                    {costBreakdown.fuelLiters} L (~₹{costBreakdown.fuelCost})
                  </span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  onClick={handleSaveToMyTrips}
                  className="w-full flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all"
                >
                  <BookmarkPlus className="w-4 h-4" />
                  <span>Save to My Trips</span>
                </button>
                <button
                  onClick={() => {
                    navigateTo('travel', {
                      origin: origin.locality,
                      destination: destination.locality,
                    });
                  }}
                  className="w-full flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-all"
                >
                  <Bus className="w-4 h-4" />
                  <span>Book Travel / Cabs</span>
                </button>
                <button
                  onClick={() => {
                    navigateTo('trip-planner', {
                      startingLocation: origin.locality,
                      destination: destination.locality,
                    });
                  }}
                  className="w-full flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 font-bold text-xs border border-teal-200 transition-all"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>AI Plan Itinerary</span>
                </button>
                <button
                  onClick={() => {
                    navigateTo('hospitals');
                  }}
                  className="w-full flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-800 font-bold text-xs border border-rose-200 transition-all"
                >
                  <HeartPulse className="w-4 h-4" />
                  <span>Emergency Hospitals</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Google Maps Visualization & Highway Amenities (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            {/* Map Container */}
            <div className="bg-white rounded-3xl p-3 shadow-md border border-slate-200/80 overflow-hidden h-[480px] sm:h-[540px]">
              <GoogleRouteMap
                origin={origin}
                destination={destination}
                travelMode={travelMode}
                liveLocation={
                  liveLocation.isTracking && liveLocation.coords
                    ? {
                        lat: liveLocation.coords.latitude,
                        lng: liveLocation.coords.longitude,
                        heading: liveLocation.coords.heading,
                        speed: liveLocation.coords.speed,
                      }
                    : null
                }
                highlightItems={filteredHighlights}
                onRouteCalculated={(details) => {
                  setRouteDistanceKm(details.distanceKm);
                  setRouteDurationMins(details.durationMinutes);
                  setRouteSummary(details.summary);
                }}
              />
            </div>

            {/* Highway Stops & Amenities Filter Tabs */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">
                    Highway Points of Interest along Corridor
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Click any marker on the map to inspect phone numbers & services
                  </p>
                </div>

                {/* Filter category chips */}
                <div className="flex flex-wrap gap-1.5">
                  <button
                    onClick={() => setActiveAmenityCategory('all')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                      activeAmenityCategory === 'all'
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    All ({highwayHighlights.length})
                  </button>
                  <button
                    onClick={() => setActiveAmenityCategory('hospital')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all flex items-center gap-1 ${
                      activeAmenityCategory === 'hospital'
                        ? 'bg-rose-600 text-white'
                        : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                    }`}
                  >
                    <HeartPulse className="w-3 h-3" />
                    <span>Hospitals</span>
                  </button>
                  <button
                    onClick={() => setActiveAmenityCategory('waterfall')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all flex items-center gap-1 ${
                      activeAmenityCategory === 'waterfall'
                        ? 'bg-cyan-600 text-white'
                        : 'bg-cyan-50 text-cyan-700 hover:bg-cyan-100'
                    }`}
                  >
                    <Droplets className="w-3 h-3" />
                    <span>Waterfalls</span>
                  </button>
                  <button
                    onClick={() => setActiveAmenityCategory('restaurant')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all flex items-center gap-1 ${
                      activeAmenityCategory === 'restaurant'
                        ? 'bg-amber-600 text-white'
                        : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                    }`}
                  >
                    <UtensilsCrossed className="w-3 h-3" />
                    <span>Dining</span>
                  </button>
                  <button
                    onClick={() => setActiveAmenityCategory('zoo')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all flex items-center gap-1 ${
                      activeAmenityCategory === 'zoo'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                    }`}
                  >
                    <PawPrint className="w-3 h-3" />
                    <span>Wildlife</span>
                  </button>
                </div>
              </div>

              {/* Waypoints & Steps Accordion */}
              <div className="mt-4 space-y-2.5">
                <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Navigation className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Turn-by-turn Navigation Corridor Waypoints</span>
                </div>

                <div className="space-y-2">
                  {simulatedWaypoints.map((wp) => (
                    <div
                      key={wp.step}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3 hover:bg-emerald-50/40 transition-colors"
                    >
                      <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold flex items-center justify-center shrink-0 mt-0.5">
                        {wp.step}
                      </span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-bold text-xs text-slate-900">{wp.instruction}</p>
                          <span className="text-[11px] font-mono text-slate-500 font-semibold">{wp.distance}</span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">{wp.note}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
