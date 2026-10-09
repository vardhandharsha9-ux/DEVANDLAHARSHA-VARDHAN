import React, { useState, useMemo } from 'react';
import {
  HeartPulse,
  Search,
  Phone,
  Navigation,
  Star,
  ShieldAlert,
  Ambulance,
  MapPin,
  Clock,
  Filter,
} from 'lucide-react';
import { HOSPITALS } from '../data/mockData';
import { LeafletMap } from '../components/LeafletMap';

export const HospitalsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');

  const filteredHospitals = useMemo(() => {
    return HOSPITALS.filter((h) => {
      if (selectedType !== 'All' && h.type !== selectedType) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          h.name.toLowerCase().includes(q) ||
          h.specialties.some((s) => s.toLowerCase().includes(q)) ||
          h.city.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [selectedType, searchQuery]);

  const mapMarkers = useMemo(() => {
    return filteredHospitals.map((h) => ({
      id: h.id,
      title: h.name,
      lat: h.coordinates.lat,
      lng: h.coordinates.lng,
      category: 'Hospital',
      address: h.address,
      phone: h.emergencyHotline,
    }));
  }, [filteredHospitals]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold text-rose-700 uppercase tracking-widest bg-rose-50 px-3 py-1 rounded-full">
          24x7 Traveler Health & Safety
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-heading">
          Hospitals & Emergency Medical Care
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Instant access to premier trauma centers, SVIMS super-specialty, government hospitals, and emergency ambulance hotlines.
        </p>
      </div>

      {/* Emergency Hotlines Alert Bar */}
      <div className="bg-linear-to-r from-rose-900 via-rose-800 to-slate-900 rounded-3xl p-6 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-rose-300">
            <Ambulance className="w-7 h-7 animate-pulse" />
          </div>
          <div>
            <h3 className="font-extrabold text-base sm:text-lg">Emergency Ambulance Hotline: 108</h3>
            <p className="text-xs text-rose-200">
              National Free Emergency Response & SVIMS Trauma Centre: +91 877 228 7777
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="tel:108"
            className="px-6 py-2.5 bg-rose-500 hover:bg-rose-400 text-white font-bold text-xs rounded-xl shadow-md transition-colors flex items-center gap-2"
          >
            <Phone className="w-4 h-4" />
            <span>Call 108 Emergency</span>
          </a>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-md space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search hospital, cardiology, ICU..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-medium outline-hidden"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 text-xs">
            {['All', 'Emergency 24x7', 'Government', 'Private', 'Multi-Specialty'].map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-3.5 py-1.5 rounded-xl font-bold shrink-0 transition-colors cursor-pointer ${
                  selectedType === type
                    ? 'bg-rose-600 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Hospital Map View */}
      <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-md space-y-2">
        <div className="flex justify-between items-center text-xs text-slate-500 px-1">
          <span className="font-bold text-slate-800">Hospital Locations Map ({mapMarkers.length} Facilities)</span>
          <span className="text-[11px] text-rose-600 font-semibold">Red pins represent certified healthcare hubs</span>
        </div>
        <LeafletMap
          markers={mapMarkers}
          height="380px"
          zoom={13}
          center={[13.6394, 79.4084]}
        />
      </div>

      {/* Hospitals Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredHospitals.map((hospital) => (
          <div
            key={hospital.id}
            className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs hover:shadow-xl transition-all flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between">
                <span
                  className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-md ${
                    hospital.type === 'Emergency 24x7'
                      ? 'bg-rose-100 text-rose-800'
                      : hospital.type === 'Government'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}
                >
                  {hospital.type}
                </span>
                <span className="text-xs font-bold text-slate-600">~{hospital.distanceKm} km away</span>
              </div>

              <h3 className="font-extrabold text-base sm:text-lg text-slate-900 mt-2">
                {hospital.name}
              </h3>
              <p className="text-xs text-slate-500 mt-1 flex items-start gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                <span>{hospital.address}</span>
              </p>

              {/* Specialties */}
              <div className="mt-3 space-y-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Specialties & Facilities</span>
                <div className="flex flex-wrap gap-1.5">
                  {hospital.specialties.map((spec, i) => (
                    <span
                      key={i}
                      className="text-[10px] bg-slate-50 border border-slate-200 text-slate-700 px-2 py-0.5 rounded-md font-medium"
                    >
                      {spec}
                    </span>
                  ))}
                  {hospital.hasAmbulance && (
                    <span className="text-[10px] bg-rose-50 text-rose-700 border border-rose-200 px-2 py-0.5 rounded-md font-bold">
                      🚑 Ambulance On-Duty
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="text-[11px] text-slate-600">
                <span className="font-bold">Hotline:</span>{' '}
                <strong className="text-rose-700">{hospital.emergencyHotline}</strong>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`tel:${hospital.phone.replace(/[^0-9+]/g, '')}`}
                  className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-800 rounded-xl font-bold flex items-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Now</span>
                </a>
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${hospital.coordinates.lat},${hospital.coordinates.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold flex items-center gap-1.5 shadow-2xs transition-colors"
                >
                  <span>Directions</span>
                  <Navigation className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
