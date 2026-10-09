import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import {
  Bus,
  Train,
  Plane,
  Car,
  Search,
  Calendar,
  Clock,
  Users,
  ShieldCheck,
  CheckCircle,
  ArrowRight,
  MapPin,
  Star,
  Luggage,
} from 'lucide-react';
import { TRAVEL_OPTIONS } from '../data/mockData';
import { TravelMode, TravelOption, TravelBooking } from '../types';

export const TravelPage: React.FC = () => {
  const { addTravelBooking, navigateTo, currentUser } = useApp();

  const [activeMode, setActiveMode] = useState<TravelMode>('BUS');
  const [origin, setOrigin] = useState('Hyderabad (MGBS)');
  const [destination, setDestination] = useState('Tirupati (Central Bus Station)');
  const [travelDate, setTravelDate] = useState('2026-10-21');
  const [passengerCount, setPassengerCount] = useState(2);

  // Booking Flow
  const [selectedTravel, setSelectedTravel] = useState<TravelOption | null>(null);
  const [passengerName, setPassengerName] = useState(currentUser?.name || 'Vardhandharsha G.');
  const [passengerAge, setPassengerAge] = useState(29);
  const [passengerGender, setPassengerGender] = useState('Male');
  const [seatPreference, setSeatPreference] = useState('Window Seat');

  const filteredOptions = useMemo(() => {
    return TRAVEL_OPTIONS.filter((t) => t.mode === activeMode);
  }, [activeMode]);

  const handleConfirmTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTravel) return;

    const bookingRef = `SAT-${activeMode}-${Math.floor(100000 + Math.random() * 900000)}`;
    const totalPrice = selectedTravel.price * passengerCount;
    const taxes = Math.round(totalPrice * 0.05);

    const newBooking: TravelBooking = {
      id: 'tb-' + Date.now(),
      travelOptionId: selectedTravel.id,
      mode: activeMode,
      operator: selectedTravel.operator,
      type: selectedTravel.type,
      origin: selectedTravel.origin,
      destination: selectedTravel.destination,
      departureDate: travelDate,
      departureTime: selectedTravel.departureTime,
      arrivalTime: selectedTravel.arrivalTime,
      passengers: Array.from({ length: passengerCount }).map((_, idx) => ({
        name: idx === 0 ? passengerName : `Passenger ${idx + 1}`,
        age: passengerAge,
        gender: passengerGender,
        seatNumber: `${seatPreference} ${idx + 1}`,
      })),
      totalPrice: totalPrice + taxes,
      taxes,
      status: 'Confirmed',
      bookingRef,
      bookedAt: new Date().toISOString().split('T')[0],
    };

    // Trigger Email Connector
    try {
      fetch('/api/email-connector', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipientEmail: currentUser?.email || 'traveler@sathwikatravels.com',
          recipientName: passengerName,
          emailType: 'booking_confirmation',
          bookingDetails: {
            service: `${activeMode} Ticket`,
            bookingRef,
            operator: selectedTravel.operator,
            totalAmount: totalPrice + taxes,
          },
        }),
      }).catch(() => {});
    } catch {}

    addTravelBooking(newBooking);
    setSelectedTravel(null);
    navigateTo('my-bookings');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full">
          Intercity Transportation
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-heading">
          Travel Booking
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Book state-run & private luxury buses, Vande Bharat high-speed trains, flights, and dedicated chauffeur cabs.
        </p>
      </div>

      {/* Mode Selector Tabs */}
      <div className="flex justify-center">
        <div className="bg-slate-100 p-1.5 rounded-2xl flex items-center gap-1 shadow-inner">
          <button
            onClick={() => setActiveMode('BUS')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeMode === 'BUS' ? 'bg-emerald-700 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Bus className="w-4 h-4" />
            <span>BUS 🚌</span>
          </button>
          <button
            onClick={() => setActiveMode('TRAIN')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeMode === 'TRAIN' ? 'bg-emerald-700 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Train className="w-4 h-4" />
            <span>TRAIN 🚆</span>
          </button>
          <button
            onClick={() => setActiveMode('FLIGHT')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeMode === 'FLIGHT' ? 'bg-emerald-700 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Plane className="w-4 h-4" />
            <span>FLIGHT ✈️</span>
          </button>
          <button
            onClick={() => setActiveMode('CAB')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeMode === 'CAB' ? 'bg-emerald-700 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Car className="w-4 h-4" />
            <span>CAB 🚕</span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-md">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div>
            <label className="text-slate-700 font-bold block mb-1">From (Origin)</label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-emerald-600 absolute left-3 top-3" />
              <input
                type="text"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                placeholder="e.g. Hyderabad, Bengaluru, Chennai"
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className="text-slate-700 font-bold block mb-1">To (Destination)</label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-amber-600 absolute left-3 top-3" />
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="e.g. Tirupati, Vijayawada"
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className="text-slate-700 font-bold block mb-1">Departure Date</label>
            <div className="relative">
              <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="date"
                value={travelDate}
                onChange={(e) => setTravelDate(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className="text-slate-700 font-bold block mb-1">Passengers</label>
            <div className="relative">
              <Users className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <select
                value={passengerCount}
                onChange={(e) => setPassengerCount(Number(e.target.value))}
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-hidden"
              >
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <option key={n} value={n}>
                    {n} Traveler{n > 1 ? 's' : ''}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Travel Results List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span className="font-bold text-slate-700">
            Available {activeMode} Services ({filteredOptions.length})
          </span>
          <span>Prices verified in Demo Mode</span>
        </div>

        <div className="space-y-3">
          {filteredOptions.map((opt) => (
            <div
              key={opt.id}
              className="bg-white rounded-3xl p-5 border border-slate-200 hover:border-emerald-300 hover:shadow-lg transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                    {opt.type}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-amber-500 font-bold">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{opt.rating}</span>
                  </div>
                </div>

                <h3 className="font-extrabold text-slate-900 text-base">{opt.operator}</h3>

                {/* Times & Route */}
                <div className="flex items-center gap-4 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px] font-bold">Departure</span>
                    <span className="font-black text-slate-900 text-sm">{opt.departureTime}</span>
                    <span className="text-[11px] text-slate-500 block truncate max-w-[120px]">{opt.origin}</span>
                  </div>

                  <div className="text-center px-2">
                    <span className="text-[10px] text-emerald-700 font-bold">{opt.duration}</span>
                    <div className="w-20 sm:w-28 h-0.5 bg-slate-200 relative my-1">
                      <div className="w-2 h-2 rounded-full bg-emerald-600 absolute -top-0.75 right-0" />
                    </div>
                    <span className="text-[10px] text-slate-400">Direct Route</span>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[10px] font-bold">Arrival</span>
                    <span className="font-black text-slate-900 text-sm">{opt.arrivalTime}</span>
                    <span className="text-[11px] text-slate-500 block truncate max-w-[120px]">{opt.destination}</span>
                  </div>
                </div>

                {/* Amenities */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {opt.amenities.map((am, i) => (
                    <span key={i} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                      ✓ {am}
                    </span>
                  ))}
                </div>
              </div>

              {/* Price & Book */}
              <div className="flex md:flex-col items-center md:items-end justify-between w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-slate-100 gap-3">
                <div className="text-left md:text-right">
                  <span className="text-slate-400 block text-[10px] font-bold uppercase">Fare per traveler</span>
                  <span className="text-xl font-black text-slate-900">₹{opt.price}</span>
                  <span className="text-[10px] text-emerald-700 font-semibold block">
                    {opt.availableSeats} seats left
                  </span>
                </div>

                <button
                  onClick={() => setSelectedTravel(opt)}
                  className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <span>Select & Book</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ticket Modal */}
      {selectedTravel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <form
            onSubmit={handleConfirmTicket}
            className="bg-white rounded-3xl max-w-lg w-full max-h-[92vh] overflow-y-auto shadow-2xl p-6 space-y-4 text-xs animate-in zoom-in-95 duration-200"
          >
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <div>
                <span className="text-emerald-700 font-bold uppercase tracking-wider text-[10px]">
                  {selectedTravel.mode} Booking Confirmation
                </span>
                <h3 className="text-base font-bold text-slate-900">{selectedTravel.operator}</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedTravel(null)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-500"
              >
                ✕
              </button>
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl space-y-1">
              <p className="font-semibold text-slate-800">
                {selectedTravel.origin} ➔ {selectedTravel.destination}
              </p>
              <p className="text-slate-500">
                Date: {travelDate} | Departure: {selectedTravel.departureTime} | Duration: {selectedTravel.duration}
              </p>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Primary Passenger Name</label>
              <input
                type="text"
                value={passengerName}
                onChange={(e) => setPassengerName(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Age</label>
                <input
                  type="number"
                  value={passengerAge}
                  onChange={(e) => setPassengerAge(Number(e.target.value))}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  min="1"
                  max="100"
                  required
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Seat Preference</label>
                <select
                  value={seatPreference}
                  onChange={(e) => setSeatPreference(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                >
                  <option value="Window Seat">Window Seat</option>
                  <option value="Aisle Seat">Aisle Seat</option>
                  <option value="Middle Seat">Middle Seat</option>
                  <option value="Lower Berth">Lower Berth</option>
                  <option value="Upper Berth">Upper Berth</option>
                </select>
              </div>
            </div>

            {/* Price breakdown */}
            <div className="p-3 bg-slate-50 rounded-2xl space-y-1 border border-slate-200">
              <div className="flex justify-between text-slate-600">
                <span>Base Fare ({passengerCount} × ₹{selectedTravel.price})</span>
                <span>₹{selectedTravel.price * passengerCount}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Reservation & IRCTC / Bus Taxes</span>
                <span>₹{Math.round(selectedTravel.price * passengerCount * 0.05)}</span>
              </div>
              <div className="border-t border-slate-200 pt-1 flex justify-between font-bold text-slate-900 text-sm">
                <span>Total Demo Payable</span>
                <span className="text-emerald-700">
                  ₹{Math.round(selectedTravel.price * passengerCount * 1.05)}
                </span>
              </div>
            </div>

            <div className="p-2.5 bg-emerald-50 rounded-xl text-emerald-800 text-[11px] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Demo Mode: No payment charged. Instant digital ticket generated.</span>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setSelectedTravel(null)}
                className="w-1/3 py-2.5 bg-slate-100 hover:bg-slate-200 rounded-xl font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-2/3 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Confirm Ticket Booking</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
