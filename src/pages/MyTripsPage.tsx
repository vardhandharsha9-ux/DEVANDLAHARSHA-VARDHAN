import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Calendar,
  MapPin,
  Users,
  Wallet,
  Clock,
  Trash2,
  Share2,
  Download,
  Plus,
  ArrowRight,
  Eye,
  CheckCircle,
} from 'lucide-react';
import { Trip } from '../types';

export const MyTripsPage: React.FC = () => {
  const { trips, deleteTrip, navigateTo, showToast } = useApp();
  const [selectedTripModal, setSelectedTripModal] = useState<Trip | null>(null);

  const handleShare = (trip: Trip) => {
    navigator.clipboard.writeText(window.location.href);
    showToast(`Share link for "${trip.title}" copied!`, 'success');
  };

  const handleDownload = (trip: Trip) => {
    let content = `=========================================\n`;
    content += `SATHWIKA TRAVELS & TOURISM - ITINERARY\n`;
    content += `Trip: ${trip.title}\n`;
    content += `Route: ${trip.startLocation} -> ${trip.destination}\n`;
    content += `Dates: ${trip.startDate} to ${trip.endDate}\n`;
    content += `Travelers: ${trip.travelers.adults} Adults, ${trip.travelers.children} Children\n`;
    content += `Estimated Budget: ₹${trip.budget}\n`;
    content += `=========================================\n\n`;

    trip.itinerary.forEach((day) => {
      content += `DAY ${day.dayNumber}: ${day.title}\n`;
      content += `-----------------------------------------\n`;
      day.items.forEach((item) => {
        content += `[${item.timeSlot}] ${item.place}\n`;
        content += `  Activity: ${item.activity}\n`;
        content += `  Distance & Time: ${item.distance} (${item.travelTime})\n`;
        content += `  Cost: ₹${item.estimatedCost} | Notes: ${item.notes}\n\n`;
      });
      content += `\n`;
    });

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Swastik-${trip.destination.split(',')[0].trim().replace(/\s+/g, '_')}-Plan.txt`;
    link.click();
    showToast('Itinerary downloaded!', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full">
            Personal Itinerary Vault
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading mt-2">
            My Planned Trips
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Access your custom and AI-synthesized travel plans with full day-by-day schedules.
          </p>
        </div>

        <button
          onClick={() => navigateTo('trip-planner')}
          className="px-5 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-md transition-all flex items-center gap-2 cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Plan New Trip</span>
        </button>
      </div>

      {/* Trips List */}
      {trips.length === 0 ? (
        <div className="bg-white rounded-3xl p-16 text-center border border-slate-100 max-w-md mx-auto space-y-3">
          <Calendar className="w-12 h-12 mx-auto text-slate-300 stroke-[1.2]" />
          <h3 className="font-bold text-slate-800 text-lg">No trips yet</h3>
          <p className="text-xs text-slate-500">
            Start planning your first adventure to Tirupati, Munnar, or any bucket-list destination.
          </p>
          <button
            onClick={() => navigateTo('trip-planner')}
            className="mt-3 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors cursor-pointer"
          >
            Create Your First Itinerary
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {trips.map((trip) => (
            <div
              key={trip.id}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-md space-y-5"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                      {trip.status} • {trip.travelType}
                    </span>
                    <span className="text-xs text-slate-400">Created: {trip.createdAt}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">{trip.title}</h3>
                  <p className="text-xs text-slate-600 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{trip.startLocation} ➔ {trip.destination}</span>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleShare(trip)}
                    className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl"
                    title="Share trip"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDownload(trip)}
                    className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl"
                    title="Download itinerary"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteTrip(trip.id)}
                    className="p-2 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl"
                    title="Delete trip"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Trip Metadata Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-2xl">
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">Dates</span>
                  <span className="font-bold text-slate-800">{trip.startDate} to {trip.endDate}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl">
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">Travelers</span>
                  <span className="font-bold text-slate-800">
                    {trip.travelers.adults} Adults, {trip.travelers.children} Kids
                  </span>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl">
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">Est. Budget</span>
                  <span className="font-bold text-emerald-700">₹{trip.budget.toLocaleString()}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl">
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">Schedule</span>
                  <span className="font-bold text-slate-800">{trip.itinerary.length} Days Planned</span>
                </div>
              </div>

              {/* Itinerary Preview */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Day 1 Snapshot: {trip.itinerary[0]?.title}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {trip.itinerary[0]?.items.slice(0, 3).map((item) => (
                    <div key={item.id} className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-xs space-y-1">
                      <span className="text-[10px] font-bold text-emerald-700 uppercase">{item.timeSlot}</span>
                      <p className="font-semibold text-slate-800 truncate">{item.place}</p>
                      <p className="text-[11px] text-slate-500 line-clamp-1">{item.activity}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="flex justify-between items-center pt-2">
                <button
                  onClick={() => setSelectedTripModal(trip)}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Eye className="w-4 h-4" />
                  <span>View All {trip.itinerary.length} Days Itinerary</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Full Itinerary Modal */}
      {selectedTripModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 space-y-6 text-xs sm:text-sm">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <div>
                <span className="text-emerald-700 font-bold uppercase text-[10px]">
                  Complete Trip Itinerary
                </span>
                <h3 className="font-black text-xl text-slate-900">{selectedTripModal.title}</h3>
                <p className="text-xs text-slate-500">
                  {selectedTripModal.startLocation} ➔ {selectedTripModal.destination}
                </p>
              </div>
              <button
                onClick={() => setSelectedTripModal(null)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-500"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              {selectedTripModal.itinerary.map((day) => (
                <div key={day.dayNumber} className="border border-slate-200 rounded-2xl p-4 bg-slate-50/50 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-700 text-white font-bold text-xs flex items-center justify-center">
                      {day.dayNumber}
                    </span>
                    <h4 className="font-bold text-slate-900 text-sm">
                      Day {day.dayNumber}: {day.title}
                    </h4>
                  </div>

                  <div className="space-y-2">
                    {day.items.map((item) => (
                      <div key={item.id} className="p-3 bg-white rounded-xl border border-slate-100 text-xs space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-emerald-800 uppercase text-[10px]">
                            {item.timeSlot} • {item.place}
                          </span>
                          <span className="font-bold text-slate-900">₹{item.estimatedCost}</span>
                        </div>
                        <p className="text-slate-600">{item.activity}</p>
                        <p className="text-[11px] text-slate-400">
                          {item.distance} ({item.travelTime}) • Note: {item.notes}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                onClick={() => handleDownload(selectedTripModal)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl font-bold text-xs flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" /> Download Summary
              </button>
              <button
                onClick={() => setSelectedTripModal(null)}
                className="px-5 py-2 bg-slate-900 text-white rounded-xl font-bold text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
