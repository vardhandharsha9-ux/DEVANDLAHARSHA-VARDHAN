import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Ticket,
  Building,
  Plane,
  UtensilsCrossed,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  FileText,
  Printer,
  X,
  QrCode,
} from 'lucide-react';
import { HotelBooking, TravelBooking, FoodOrder, TicketBookingRecord } from '../types';

export const MyBookingsPage: React.FC = () => {
  const {
    hotelBookings,
    travelBookings,
    foodOrders,
    ticketBookings,
    cancelHotelBooking,
    cancelTravelBooking,
    cancelTicketBooking,
    navigateTo,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'All' | 'Tickets' | 'Hotels' | 'Travel' | 'Food'>('All');
  const [selectedVoucher, setSelectedVoucher] = useState<{
    type: 'hotel' | 'travel' | 'food' | 'ticket';
    data: any;
  } | null>(null);

  const [cancellingId, setCancellingId] = useState<{ type: string; id: string } | null>(null);

  const totalBookingsCount =
    hotelBookings.length + travelBookings.length + foodOrders.length + (ticketBookings?.length || 0);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full">
          Confirmed Vouchers & Tickets
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-heading">
          My Bookings & Orders
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          View digital check-in vouchers, boarding passes, travel tickets, food order status, and manage cancellations.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex justify-center">
        <div className="bg-slate-100 p-1.5 rounded-2xl flex items-center gap-1 overflow-x-auto max-w-full">
          {(['All', 'Tickets', 'Hotels', 'Travel', 'Food'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === tab
                  ? 'bg-emerald-700 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab === 'Tickets' ? `🎫 Tickets (${ticketBookings?.length || 0})` : tab}
            </button>
          ))}
        </div>
      </div>

      {totalBookingsCount === 0 ? (
        <div className="bg-white rounded-3xl p-16 text-center border border-slate-100 max-w-md mx-auto space-y-3">
          <Ticket className="w-12 h-12 mx-auto text-slate-300 stroke-[1.2]" />
          <h3 className="font-bold text-slate-800 text-lg">No bookings yet</h3>
          <p className="text-xs text-slate-500">
            Your confirmed travel tickets (Bus, Train, Flight), hotel reservations, and food deliveries will appear here.
          </p>
          <div className="flex flex-wrap justify-center gap-2 pt-2">
            <button
              onClick={() => navigateTo('ticket-booking')}
              className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-md transition-colors cursor-pointer"
            >
              🎫 Book Travel Ticket
            </button>
            <button
              onClick={() => navigateTo('hotels')}
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors cursor-pointer"
            >
              🏨 Book Hotel
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Travel Ticket Bookings (All-India Corridor) */}
          {(activeTab === 'All' || activeTab === 'Tickets') &&
            ticketBookings &&
            ticketBookings.map((tkt) => (
              <div
                key={tkt.id}
                className="bg-white rounded-3xl p-6 border border-emerald-200/80 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="bg-emerald-100 text-emerald-900 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase flex items-center gap-1">
                      <span>🎫</span> {tkt.transportType} E-Ticket
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        tkt.status === 'Confirmed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {tkt.status}
                    </span>
                    <span className="text-[11px] font-mono font-bold text-slate-500">
                      PNR: <strong className="text-slate-900">{tkt.pnrNumber}</strong>
                    </span>
                  </div>

                  <h3 className="font-extrabold text-lg text-slate-900">{tkt.operator}</h3>
                  <p className="text-xs text-slate-500">{tkt.serviceNumber}</p>

                  <div className="bg-slate-50 p-2.5 rounded-xl text-xs space-y-1 text-slate-700">
                    <div>
                      <span className="text-emerald-700 font-bold">🟢 Origin: </span>
                      <span className="font-semibold">{tkt.origin}</span>
                    </div>
                    <div>
                      <span className="text-rose-700 font-bold">🔴 Destination: </span>
                      <span className="font-semibold">{tkt.destination}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-slate-600">
                    <span>
                      📅 Date: <strong>{tkt.journeyDate}</strong>
                    </span>
                    <span>•</span>
                    <span>
                      Dep: <strong>{tkt.departureTime}</strong> | Arr: <strong>{tkt.arrivalTime}</strong>
                    </span>
                    <span>•</span>
                    <span>
                      Travelers: <strong>{tkt.passengers.length}</strong> ({tkt.passengers.map((p) => p.name).join(', ')})
                    </span>
                    <span>•</span>
                    <span>Class: <strong>{tkt.travelClass}</strong></span>
                  </div>
                </div>

                <div className="flex md:flex-col items-center md:items-end justify-between w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-slate-100 gap-3 shrink-0">
                  <div className="text-left md:text-right">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Total Fare</span>
                    <span className="text-xl font-black text-emerald-800">₹{tkt.totalAmount}</span>
                    <span className="text-[10px] text-slate-400 block">Inc. GST</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedVoucher({ type: 'ticket', data: tkt })}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm"
                    >
                      <QrCode className="w-3.5 h-3.5" />
                      <span>View Ticket</span>
                    </button>
                    {tkt.status === 'Confirmed' && (
                      <button
                        onClick={() => setCancellingId({ type: 'ticket', id: tkt.id })}
                        className="px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs rounded-xl transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          {/* Hotels Bookings */}
          {(activeTab === 'All' || activeTab === 'Hotels') &&
            hotelBookings.map((hb) => (
              <div
                key={hb.id}
                className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={hb.hotelImage}
                    alt={hb.hotelName}
                    className="w-24 h-24 rounded-2xl object-cover shrink-0 hidden sm:block"
                  />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                        🏨 Hotel Reservation
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          hb.status === 'Confirmed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {hb.status}
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900">{hb.hotelName}</h3>
                    <p className="text-xs text-slate-500">{hb.location}</p>

                    <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-slate-600">
                      <span>
                        📅 Check-in: <strong>{hb.checkInDate}</strong>
                      </span>
                      <span>•</span>
                      <span>
                        Checkout: <strong>{hb.checkOutDate}</strong> ({hb.pricing.nights} Nights)
                      </span>
                      <span>•</span>
                      <span>Room: <strong>{hb.roomType}</strong></span>
                    </div>

                    <p className="text-[11px] text-slate-400 font-mono pt-0.5">
                      Ref: <strong>{hb.bookingRef}</strong> | Guest: {hb.primaryGuest.name}
                    </p>
                  </div>
                </div>

                <div className="flex md:flex-col items-center md:items-end justify-between w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-slate-100 gap-3">
                  <div className="text-left md:text-right">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Paid Total</span>
                    <span className="text-xl font-black text-slate-900">₹{hb.pricing.totalAmount}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedVoucher({ type: 'hotel', data: hb })}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-colors cursor-pointer"
                    >
                      View Voucher
                    </button>
                    {hb.status === 'Confirmed' && (
                      <button
                        onClick={() => setCancellingId({ type: 'hotel', id: hb.id })}
                        className="px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs rounded-xl transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}

          {/* Travel Bookings */}
          {(activeTab === 'All' || activeTab === 'Travel') &&
            travelBookings.map((tb) => (
              <div
                key={tb.id}
                className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                      🚌 {tb.mode} Boarding Pass
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        tb.status === 'Confirmed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {tb.status}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-lg text-slate-900">{tb.operator}</h3>
                  <p className="text-xs text-slate-700 font-semibold">
                    {tb.origin} ➔ {tb.destination}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-slate-600">
                    <span>
                      📅 Travel Date: <strong>{tb.departureDate}</strong>
                    </span>
                    <span>•</span>
                    <span>
                      Dep: <strong>{tb.departureTime}</strong> | Arr: <strong>{tb.arrivalTime}</strong>
                    </span>
                    <span>•</span>
                    <span>Passengers: <strong>{tb.passengers.length}</strong></span>
                  </div>

                  <p className="text-[11px] text-slate-400 font-mono pt-0.5">
                    Ticket Ref: <strong>{tb.bookingRef}</strong> | Class: {tb.type}
                  </p>
                </div>

                <div className="flex md:flex-col items-center md:items-end justify-between w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-slate-100 gap-3">
                  <div className="text-left md:text-right">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Total Fare</span>
                    <span className="text-xl font-black text-slate-900">₹{tb.totalPrice}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedVoucher({ type: 'travel', data: tb })}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-colors cursor-pointer"
                    >
                      View Ticket
                    </button>
                    {tb.status === 'Confirmed' && (
                      <button
                        onClick={() => setCancellingId({ type: 'travel', id: tb.id })}
                        className="px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs rounded-xl transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}

          {/* Food Orders */}
          {(activeTab === 'All' || activeTab === 'Food') &&
            foodOrders.map((ord) => (
              <div
                key={ord.id}
                className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="bg-orange-100 text-orange-900 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                      🍽️ Food Delivery Order
                    </span>
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {ord.status}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-base sm:text-lg text-slate-900">{ord.restaurantName}</h3>
                  <div className="text-xs text-slate-600">
                    {ord.items.map((i) => `${i.item.name} (${i.quantity}x)`).join(', ')}
                  </div>

                  <p className="text-xs text-slate-500 pt-0.5">
                    Delivery To: {ord.deliveryAddress.street}, {ord.deliveryAddress.city} • {ord.orderedAt}
                  </p>

                  <p className="text-[11px] text-slate-400 font-mono">
                    Order Ref: <strong>{ord.orderRef}</strong>
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Paid Total</span>
                  <span className="text-xl font-black text-slate-900">₹{ord.totalAmount}</span>
                </div>
              </div>
            ))}
        </div>
      )}

      {/* Cancellation Confirmation Dialog */}
      {cancellingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900">Cancel Booking?</h3>
            <p className="text-xs text-slate-500">
              Are you sure you want to cancel this booking? A 100% demo refund will be logged to your account.
            </p>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setCancellingId(null)}
                className="w-1/2 py-2.5 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-bold"
              >
                Keep Booking
              </button>
              <button
                onClick={() => {
                  if (cancellingId.type === 'hotel') {
                    cancelHotelBooking(cancellingId.id);
                  } else if (cancellingId.type === 'travel') {
                    cancelTravelBooking(cancellingId.id);
                  } else if (cancellingId.type === 'ticket') {
                    cancelTicketBooking(cancellingId.id);
                  }
                  setCancellingId(null);
                }}
                className="w-1/2 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Printable Digital Voucher / Ticket Modal */}
      {selectedVoucher && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 space-y-5 text-xs sm:text-sm">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <div>
                <span className="text-emerald-700 font-extrabold uppercase text-[10px]">
                  {selectedVoucher.type === 'ticket'
                    ? 'Official Sathwika Travels E-Ticket'
                    : 'Official Sathwika Travel Voucher'}
                </span>
                <h3 className="font-black text-lg text-slate-900">
                  {selectedVoucher.type === 'hotel'
                    ? selectedVoucher.data.hotelName
                    : selectedVoucher.data.operator}
                </h3>
              </div>
              <button
                onClick={() => setSelectedVoucher(null)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-500"
              >
                ✕
              </button>
            </div>

            {/* Voucher Details */}
            {selectedVoucher.type === 'ticket' ? (
              <div className="space-y-4">
                <div className="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-200 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-500">PNR Number:</span>
                    <span className="font-black font-mono text-emerald-800 text-base">
                      {selectedVoucher.data.pnrNumber}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Booking Reference:</span>
                    <span className="font-bold font-mono text-slate-800">
                      {selectedVoucher.data.bookingRef}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Transport Mode:</span>
                    <span className="font-bold text-slate-800">
                      {selectedVoucher.data.transportType} ({selectedVoucher.data.travelClass})
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Journey Date:</span>
                    <span className="font-bold text-slate-800">
                      {selectedVoucher.data.journeyDate} (Dep: {selectedVoucher.data.departureTime} - Arr: {selectedVoucher.data.arrivalTime})
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Total Fare:</span>
                    <span className="font-black text-emerald-800 text-base">
                      ₹{selectedVoucher.data.totalAmount}
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl space-y-1 text-xs">
                  <p>
                    <strong className="text-emerald-700">From:</strong> {selectedVoucher.data.origin}
                  </p>
                  <p>
                    <strong className="text-rose-700">To:</strong> {selectedVoucher.data.destination}
                  </p>
                </div>

                <div className="border border-slate-200 rounded-xl p-3 space-y-1 text-xs">
                  <span className="font-bold text-slate-700 block">Passengers:</span>
                  {selectedVoucher.data.passengers.map((p: any, i: number) => (
                    <div key={i} className="flex justify-between text-slate-600">
                      <span>{p.name} ({p.age}y, {p.gender})</span>
                      <strong className="text-emerald-800">{p.seatOrBerth}</strong>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Booking Reference:</span>
                  <span className="font-bold font-mono text-slate-900">
                    {selectedVoucher.data.bookingRef}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Status:</span>
                  <span className="font-bold text-emerald-700">{selectedVoucher.data.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Date:</span>
                  <span className="font-bold text-slate-900">
                    {selectedVoucher.type === 'hotel'
                      ? `${selectedVoucher.data.checkInDate} to ${selectedVoucher.data.checkOutDate}`
                      : selectedVoucher.data.departureDate}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Total Amount:</span>
                  <span className="font-bold text-emerald-800 text-base">
                    ₹{selectedVoucher.data.pricing?.totalAmount || selectedVoucher.data.totalPrice}
                  </span>
                </div>
              </div>
            )}

            <div className="flex justify-between items-center pt-2">
              <span className="text-[11px] text-slate-400">
                Issued by Sathwika Travels & Tourism • 24x7 Support
              </span>
              <button
                onClick={handlePrint}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold flex items-center gap-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>Print Ticket</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
