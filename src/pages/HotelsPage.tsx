import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import {
  Building,
  Search,
  Star,
  MapPin,
  Calendar,
  Users,
  CheckCircle,
  ShieldCheck,
  Heart,
  ArrowRight,
  Filter,
  Phone,
  Tag,
} from 'lucide-react';
import { HOTELS } from '../data/mockData';
import { Hotel, HotelBooking } from '../types';

export const HotelsPage: React.FC = () => {
  const { addHotelBooking, navigateTo, currentUser, isFavorite, toggleFavorite, routeParams } = useApp();

  const [searchCity, setSearchCity] = useState(routeParams?.searchCity || 'Tirupati');
  const [checkInDate, setCheckInDate] = useState('2026-10-22');
  const [checkOutDate, setCheckOutDate] = useState('2026-10-25');
  const [adults, setAdults] = useState(2);
  const [roomsCount, setRoomsCount] = useState(1);
  const [selectedAmenity, setSelectedAmenity] = useState('All');
  const [maxPrice, setMaxPrice] = useState(10000);

  // Booking Modal
  const [bookingHotel, setBookingHotel] = useState<Hotel | null>(null);
  const [selectedRoomIndex, setSelectedRoomIndex] = useState(0);
  const [guestName, setGuestName] = useState(currentUser?.name || 'Vardhandharsha G.');
  const [guestEmail, setGuestEmail] = useState(currentUser?.email || 'vardhandharsha9@gmail.com');
  const [guestPhone, setGuestPhone] = useState(currentUser?.phone || '+91 98480 12345');
  const [specialRequests, setSpecialRequests] = useState('Near temple quiet room, non-smoking');
  const [couponCode, setCouponCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(0);

  const nights = useMemo(() => {
    const s = new Date(checkInDate);
    const e = new Date(checkOutDate);
    const diff = Math.ceil((e.getTime() - s.getTime()) / (1000 * 3600 * 24));
    return diff > 0 ? diff : 1;
  }, [checkInDate, checkOutDate]);

  const filteredHotels = useMemo(() => {
    return HOTELS.filter((h) => {
      if (searchCity && !h.city.toLowerCase().includes(searchCity.toLowerCase()) && !h.location.toLowerCase().includes(searchCity.toLowerCase())) {
        return false;
      }
      if (h.pricePerNight > maxPrice) {
        return false;
      }
      if (selectedAmenity !== 'All' && !h.amenities.some((a) => a.toLowerCase().includes(selectedAmenity.toLowerCase()))) {
        return false;
      }
      return true;
    });
  }, [searchCity, maxPrice, selectedAmenity]);

  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === 'SATHWIKA10') {
      setDiscountApplied(500);
    } else {
      setDiscountApplied(0);
    }
  };

  const handleConfirmBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingHotel) return;

    const selectedRoom = bookingHotel.roomTypes[selectedRoomIndex] || bookingHotel.roomTypes[0];
    const roomTotal = selectedRoom.price * nights * roomsCount;
    const taxes = Math.round(roomTotal * 0.12);
    const totalAmount = roomTotal + taxes - discountApplied;
    const bookingRef = 'SAT-HTL-' + Math.floor(100000 + Math.random() * 900000);

    const newBooking: HotelBooking = {
      id: 'hb-' + Date.now(),
      hotelId: bookingHotel.id,
      hotelName: bookingHotel.name,
      hotelImage: bookingHotel.imageUrl,
      location: `${bookingHotel.location}, ${bookingHotel.city}`,
      checkInDate,
      checkOutDate,
      roomType: selectedRoom.name,
      roomsCount,
      guestCount: { adults, children: 0 },
      primaryGuest: {
        name: guestName,
        email: guestEmail,
        phone: guestPhone,
        specialRequests,
      },
      pricing: {
        nightlyRate: selectedRoom.price,
        nights,
        roomTotal,
        taxes,
        discount: discountApplied,
        totalAmount,
      },
      status: 'Confirmed',
      bookedAt: new Date().toISOString().split('T')[0],
      bookingRef,
    };

    // Trigger Email Connector
    try {
      fetch('/api/email-connector', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipientEmail: guestEmail,
          recipientName: guestName,
          emailType: 'booking_confirmation',
          bookingDetails: {
            service: 'Hotel Stay',
            bookingRef,
            hotelName: bookingHotel.name,
            totalAmount,
          },
        }),
      }).catch(() => {});
    } catch {}

    addHotelBooking(newBooking);
    setBookingHotel(null);
    navigateTo('my-bookings');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full">
          Verified Accommodations
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-heading">
          Hotels & Luxury Resorts
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Book trusted 5-star properties, heritage suites, and temple guest retreats in Tirupati and top destinations across India.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-md space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
          {/* Destination */}
          <div className="lg:col-span-2">
            <label className="text-slate-700 font-bold block mb-1">Destination / City</label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-emerald-600 absolute left-3 top-3" />
              <input
                type="text"
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value)}
                placeholder="e.g. Tirupati, Hyderabad, Munnar"
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-hidden"
              />
            </div>
          </div>

          {/* Check-in */}
          <div>
            <label className="text-slate-700 font-bold block mb-1">Check-in</label>
            <input
              type="date"
              value={checkInDate}
              onChange={(e) => setCheckInDate(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-hidden"
            />
          </div>

          {/* Check-out */}
          <div>
            <label className="text-slate-700 font-bold block mb-1">Check-out ({nights} Nights)</label>
            <input
              type="date"
              value={checkOutDate}
              onChange={(e) => setCheckOutDate(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-hidden"
            />
          </div>

          {/* Guests */}
          <div>
            <label className="text-slate-700 font-bold block mb-1">Rooms & Guests</label>
            <div className="flex gap-2">
              <select
                value={roomsCount}
                onChange={(e) => setRoomsCount(Number(e.target.value))}
                className="w-1/2 p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-hidden"
              >
                {[1, 2, 3, 4].map((r) => (
                  <option key={r} value={r}>
                    {r} Room{r > 1 ? 's' : ''}
                  </option>
                ))}
              </select>
              <select
                value={adults}
                onChange={(e) => setAdults(Number(e.target.value))}
                className="w-1/2 p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-hidden"
              >
                {[1, 2, 3, 4, 6].map((g) => (
                  <option key={g} value={g}>
                    {g} Guest{g > 1 ? 's' : ''}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Quick filters */}
        <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-500">Amenity:</span>
            {['All', 'Wi-Fi', 'Pool', 'Dining', 'Parking', 'Spa'].map((am) => (
              <button
                key={am}
                onClick={() => setSelectedAmenity(am)}
                className={`px-3 py-1 rounded-xl font-semibold transition-colors ${
                  selectedAmenity === am
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {am}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-500">Max Budget: ₹{maxPrice}</span>
            <input
              type="range"
              min="2000"
              max="15000"
              step="500"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="accent-emerald-600 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Hotels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHotels.map((hotel) => (
          <div
            key={hotel.id}
            className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
          >
            <div className="relative h-56 overflow-hidden">
              <img
                src={hotel.imageUrl}
                alt={hotel.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <button
                onClick={() => toggleFavorite(hotel.id, hotel.name)}
                className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-md text-slate-700 hover:text-rose-500 transition-colors shadow-xs"
              >
                <Heart
                  className={`w-4 h-4 ${
                    isFavorite(hotel.id) ? 'fill-rose-500 text-rose-500' : ''
                  }`}
                />
              </button>
              <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-xl flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{hotel.rating}</span>
                <span className="text-slate-300 text-[10px]">({hotel.reviewCount} reviews)</span>
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="font-bold text-base text-slate-900 group-hover:text-emerald-700 transition-colors">
                  {hotel.name}
                </h3>
                <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{hotel.location}</span>
                </p>

                {hotel.distanceFromTempleOrCenter && (
                  <p className="text-[11px] text-amber-800 bg-amber-50 px-2 py-0.5 rounded-lg mt-2 inline-block font-medium">
                    📍 {hotel.distanceFromTempleOrCenter}
                  </p>
                )}

                {/* Amenities pills */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {hotel.amenities.slice(0, 3).map((a, i) => (
                    <span
                      key={i}
                      className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium"
                    >
                      ✓ {a}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block font-bold uppercase">Starting From</span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-lg font-black text-slate-900">₹{hotel.pricePerNight}</span>
                    <span className="text-xs text-slate-400">/ night</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setBookingHotel(hotel);
                    setSelectedRoomIndex(0);
                  }}
                  className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-1"
                >
                  <span>Book Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Modal */}
      {bookingHotel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-100 text-xs sm:text-sm animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-5 bg-slate-900 text-white flex items-center justify-between">
              <div>
                <span className="text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
                  Hotel Booking Checkout
                </span>
                <h3 className="font-bold text-base sm:text-lg">{bookingHotel.name}</h3>
                <p className="text-xs text-slate-300">{bookingHotel.location}</p>
              </div>
              <button
                onClick={() => setBookingHotel(null)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white"
              >
                ✕
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleConfirmBooking} className="p-6 space-y-4">
              {/* Room Selection */}
              <div>
                <label className="font-bold text-slate-800 block mb-1">Select Room Category</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {bookingHotel.roomTypes.map((room, idx) => (
                    <div
                      key={room.id}
                      onClick={() => setSelectedRoomIndex(idx)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all ${
                        selectedRoomIndex === idx
                          ? 'border-emerald-600 bg-emerald-50/50 shadow-2xs'
                          : 'border-slate-200 bg-slate-50'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-slate-900">{room.name}</span>
                        <span className="font-bold text-emerald-700">₹{room.price}/n</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {room.beds} • Max {room.capacity} Guests
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Guest Details */}
              <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50/50 space-y-3">
                <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-emerald-600" /> Primary Guest Information
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] text-slate-600 block mb-0.5 font-medium">Full Name</label>
                    <input
                      type="text"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-600 block mb-0.5 font-medium">Mobile Number</label>
                    <input
                      type="tel"
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs"
                      required
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-[11px] text-slate-600 block mb-0.5 font-medium">Email Address (For Vouchers)</label>
                    <input
                      type="email"
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Discount Coupon */}
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter Coupon (e.g. SATHWIKA10)"
                    className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs uppercase font-medium"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleApplyCoupon}
                  className="px-4 py-2 bg-slate-800 text-white rounded-xl text-xs font-bold"
                >
                  Apply
                </button>
              </div>

              {/* Price Breakdown */}
              {(() => {
                const room = bookingHotel.roomTypes[selectedRoomIndex] || bookingHotel.roomTypes[0];
                const base = room.price * nights * roomsCount;
                const taxes = Math.round(base * 0.12);
                const total = base + taxes - discountApplied;

                return (
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1.5 text-xs">
                    <div className="flex justify-between text-slate-600">
                      <span>Room Tariff ({nights} Nights × {roomsCount} Room)</span>
                      <span>₹{base}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Hotel Luxury Tax & GST (12%)</span>
                      <span>₹{taxes}</span>
                    </div>
                    {discountApplied > 0 && (
                      <div className="flex justify-between text-emerald-700 font-bold">
                        <span>Coupon Discount Applied</span>
                        <span>-₹{discountApplied}</span>
                      </div>
                    )}
                    <div className="border-t border-slate-200 pt-2 flex justify-between font-bold text-sm text-slate-900">
                      <span>Total Demo Payable</span>
                      <span className="text-emerald-700">₹{total}</span>
                    </div>
                  </div>
                );
              })()}

              <div className="p-3 bg-emerald-50 rounded-xl text-emerald-900 text-xs flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Demo Payment Mode. Instant confirmation voucher & Email receipt will be generated.</span>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setBookingHotel(null)}
                  className="w-1/3 py-3 bg-slate-100 hover:bg-slate-200 font-bold rounded-xl text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Confirm Demo Booking</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
