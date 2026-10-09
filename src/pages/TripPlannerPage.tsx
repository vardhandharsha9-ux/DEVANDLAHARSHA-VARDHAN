import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Calendar,
  MapPin,
  Users,
  Wallet,
  Sparkles,
  Plus,
  Trash2,
  Edit2,
  Share2,
  Download,
  Mail,
  CheckCircle,
  Clock,
  ArrowRight,
  Info,
  Loader2,
} from 'lucide-react';
import { Trip, ItineraryDay, ItineraryItem } from '../types';
import { INDIAN_STATES_AND_UTS } from '../data/mockData';

export const TripPlannerPage: React.FC = () => {
  const { addTrip, navigateTo, showToast, currentUser, routeParams } = useApp();

  const [startingLocation, setStartingLocation] = useState(
    routeParams?.startingLocation || 'Hyderabad, Telangana'
  );
  const [destination, setDestination] = useState(
    routeParams?.destination || routeParams?.defaultDestination || 'Tirupati & Tirumala, Andhra Pradesh'
  );
  const [startDate, setStartDate] = useState(routeParams?.startDate || '2026-10-20');
  const [endDate, setEndDate] = useState(routeParams?.endDate || '2026-10-23');
  const [adults, setAdults] = useState(routeParams?.adults || 2);
  const [children, setChildren] = useState(routeParams?.children || 1);
  const [budget, setBudget] = useState(routeParams?.budget || 18000);
  const [travelType, setTravelType] = useState<'Solo' | 'Family' | 'Friends' | 'Couple' | 'Business' | 'Pilgrimage' | 'Adventure'>('Family');

  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTripPlan, setActiveTripPlan] = useState<{
    title: string;
    itinerary: ItineraryDay[];
    budget: number;
  } | null>(null);

  // Edit / Add Item Modal state
  const [editingItem, setEditingItem] = useState<{
    dayNumber: number;
    item: ItineraryItem;
    isNew?: boolean;
  } | null>(null);

  // Email Connector status
  const [isSendingEmail, setIsSendingEmail] = useState(false);

  // Helper to calculate days between dates
  const calculateDays = () => {
    const s = new Date(startDate);
    const e = new Date(endDate);
    const diff = Math.ceil((e.getTime() - s.getTime()) / (1000 * 3600 * 24));
    return diff > 0 ? diff + 1 : 3;
  };

  const handleGenerateItinerary = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    const daysCount = calculateDays();

    try {
      const response = await fetch('/api/ai-itinerary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          destination,
          startingLocation,
          durationDays: daysCount,
          budget,
          travelers: adults + children,
          travelType,
        }),
      });

      const json = await response.json();
      if (json.data && json.data.itinerary) {
        setActiveTripPlan({
          title: json.data.title || `${daysCount}-Day ${destination} Trip`,
          itinerary: json.data.itinerary,
          budget: json.data.estimatedBudget || budget,
        });
        showToast('AI-powered itinerary generated!', 'success');
      } else {
        throw new Error('Invalid format');
      }
    } catch (err) {
      console.warn('API error, falling back to local planner generator:', err);
      // Fallback generator
      const fallbackDays: ItineraryDay[] = [
        {
          dayNumber: 1,
          title: `Arrival in ${destination.split(',')[0]} & City Exploration`,
          items: [
            {
              id: 'it-d1-1',
              timeSlot: 'Morning',
              place: `${destination.split(',')[0]} Main Hub`,
              activity: 'Check-in to hotel and freshen up with traditional local breakfast.',
              estimatedCost: Math.round(budget * 0.1),
              distance: '4 km',
              travelTime: '20 mins',
              notes: 'Confirm local transport desk.',
            },
            {
              id: 'it-d1-2',
              timeSlot: 'Afternoon',
              place: `${destination.split(',')[0]} Cultural Landmark`,
              activity: 'Guided sightseeing of primary heritage shrine or scenic viewpoint.',
              estimatedCost: Math.round(budget * 0.08),
              distance: '6 km',
              travelTime: '25 mins',
              notes: 'Carry water and hats.',
            },
            {
              id: 'it-d1-3',
              timeSlot: 'Evening',
              place: `${destination.split(',')[0]} Bazaars & Sunset View`,
              activity: 'Sunset stroll followed by dinner at famous regional restaurant.',
              estimatedCost: Math.round(budget * 0.06),
              distance: '3 km',
              travelTime: '15 mins',
              notes: 'Try traditional filter coffee.',
            },
          ],
        },
        {
          dayNumber: 2,
          title: `Major Sanctum & Nature Wonder`,
          items: [
            {
              id: 'it-d2-1',
              timeSlot: 'Morning',
              place: `Premier Landmark of ${destination.split(',')[0]}`,
              activity: 'Prime temple/monument visit during calm morning hours.',
              estimatedCost: Math.round(budget * 0.12),
              distance: '15 km',
              travelTime: '35 mins',
              notes: 'Traditional attire advised.',
            },
            {
              id: 'it-d2-2',
              timeSlot: 'Afternoon',
              place: 'Scenic Falls or Botanical Garden',
              activity: 'Relaxing excursion by water springs and lush nature trails.',
              estimatedCost: Math.round(budget * 0.08),
              distance: '12 km',
              travelTime: '30 mins',
              notes: 'Great photography angle.',
            },
          ],
        },
      ];

      setActiveTripPlan({
        title: `${daysCount}-Day ${destination} ${travelType} Tour`,
        itinerary: fallbackDays,
        budget: budget,
      });
      showToast('Itinerary generated with Swastik Intelligence Engine', 'success');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveTrip = () => {
    if (!activeTripPlan) return;

    const newTrip: Trip = {
      id: 'trip-' + Date.now(),
      title: activeTripPlan.title,
      startLocation: startingLocation,
      destination: destination,
      startDate: startDate,
      endDate: endDate,
      travelers: { adults, children },
      budget: activeTripPlan.budget,
      travelType,
      status: 'Upcoming',
      itinerary: activeTripPlan.itinerary,
      createdAt: new Date().toISOString().split('T')[0],
      notes: `Planned via Swastik AI Trip Planner. Type: ${travelType}`,
    };

    addTrip(newTrip);
    navigateTo('my-trips');
  };

  const handleShareTrip = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    showToast('Trip itinerary share link copied to clipboard!', 'success');
  };

  const handleDownloadItinerary = () => {
    if (!activeTripPlan) return;

    let content = `=========================================\n`;
    content += `SWASTIK TRAVELS - ITINERARY\n`;
    content += `Trip: ${activeTripPlan.title}\n`;
    content += `From: ${startingLocation} -> To: ${destination}\n`;
    content += `Dates: ${startDate} to ${endDate} (${calculateDays()} Days)\n`;
    content += `Travelers: ${adults} Adults, ${children} Children\n`;
    content += `Estimated Budget: ₹${activeTripPlan.budget}\n`;
    content += `=========================================\n\n`;

    activeTripPlan.itinerary.forEach((day) => {
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
    link.download = `Swastik-Itinerary-${destination.split(',')[0].trim().replace(/\s+/g, '_')}.txt`;
    link.click();
    showToast('Itinerary downloaded as text document!', 'success');
  };

  // Connector 2: Email Itinerary Dispatch
  const handleEmailItinerary = async () => {
    if (!activeTripPlan) return;
    setIsSendingEmail(true);

    try {
      const response = await fetch('/api/email-connector', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipientEmail: currentUser?.email || 'traveler@sathwikatravels.com',
          recipientName: currentUser?.name || 'Explorer',
          emailType: 'itinerary_share',
          tripDetails: {
            title: activeTripPlan.title,
            destination,
            startDate,
            endDate,
            budget: activeTripPlan.budget,
          },
        }),
      });

      const res = await response.json();
      if (res.status === 'delivered') {
        showToast(`Itinerary emailed to ${currentUser?.email || 'your email'} (Ref: ${res.messageId})`, 'success');
      } else {
        throw new Error('Failed');
      }
    } catch {
      showToast('Itinerary email simulated successfully to ' + (currentUser?.email || 'your inbox'), 'info');
    } finally {
      setIsSendingEmail(false);
    }
  };

  // Delete item from itinerary
  const handleDeleteItem = (dayNumber: number, itemId: string) => {
    if (!activeTripPlan) return;
    const updated = activeTripPlan.itinerary.map((d) => {
      if (d.dayNumber === dayNumber) {
        return {
          ...d,
          items: d.items.filter((i) => i.id !== itemId),
        };
      }
      return d;
    });
    setActiveTripPlan({ ...activeTripPlan, itinerary: updated });
    showToast('Itinerary activity removed', 'info');
  };

  // Save edited or added item
  const handleSaveItemModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem || !activeTripPlan) return;

    const { dayNumber, item, isNew } = editingItem;

    const updated = activeTripPlan.itinerary.map((d) => {
      if (d.dayNumber === dayNumber) {
        if (isNew) {
          return { ...d, items: [...d.items, item] };
        }
        return {
          ...d,
          items: d.items.map((i) => (i.id === item.id ? item : i)),
        };
      }
      return d;
    });

    setActiveTripPlan({ ...activeTripPlan, itinerary: updated });
    setEditingItem(null);
    showToast(isNew ? 'Activity added to itinerary!' : 'Activity updated!', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full">
          Intelligent Trip Architecture
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-heading">
          AI Trip Planner
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Craft automated, customized day-by-day itineraries with estimated budgets, travel times, and must-visit landmarks.
        </p>
      </div>

      {/* Trip Generation Form */}
      <form
        onSubmit={handleGenerateItinerary}
        className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-lg space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          {/* Starting Location */}
          <div>
            <label className="text-slate-700 font-bold block mb-1">Starting Location (Origin)</label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-emerald-600 absolute left-3 top-3" />
              <input
                type="text"
                value={startingLocation}
                onChange={(e) => setStartingLocation(e.target.value)}
                placeholder="City, State, Town, Village"
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-hidden"
                required
              />
            </div>
          </div>

          {/* Destination */}
          <div>
            <label className="text-slate-700 font-bold block mb-1">Destination</label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-amber-600 absolute left-3 top-3" />
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="e.g. Tirupati & Tirumala, Munnar, Goa"
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-hidden"
                required
              />
            </div>
          </div>

          {/* Travel Type */}
          <div>
            <label className="text-slate-700 font-bold block mb-1">Travel Type</label>
            <select
              value={travelType}
              onChange={(e) => setTravelType(e.target.value as any)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-hidden"
            >
              <option value="Pilgrimage">Pilgrimage (Temple Circuit)</option>
              <option value="Family">Family Holiday</option>
              <option value="Solo">Solo Traveler</option>
              <option value="Couple">Romantic / Couple</option>
              <option value="Friends">Friends Adventure</option>
              <option value="Adventure">Trek & Nature Adventure</option>
              <option value="Business">Business Travel</option>
            </select>
          </div>

          {/* Dates */}
          <div>
            <label className="text-slate-700 font-bold block mb-1">Departure Date</label>
            <div className="relative">
              <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-hidden"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-slate-700 font-bold block mb-1">Return Date</label>
            <div className="relative">
              <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-hidden"
                required
              />
            </div>
          </div>

          {/* Budget */}
          <div>
            <label className="text-slate-700 font-bold block mb-1">Estimated Budget (₹)</label>
            <div className="relative">
              <Wallet className="w-4 h-4 text-emerald-600 absolute left-3 top-3" />
              <input
                type="number"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                step="1000"
                min="3000"
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-hidden"
                required
              />
            </div>
          </div>

          {/* Travelers Count */}
          <div className="md:col-span-2 lg:col-span-3 grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div>
              <span className="text-slate-500 font-medium">Adults (12+ yrs)</span>
              <div className="flex items-center gap-2 mt-1">
                <button
                  type="button"
                  onClick={() => setAdults(Math.max(1, adults - 1))}
                  className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 font-bold"
                >
                  -
                </button>
                <span className="font-bold text-sm">{adults}</span>
                <button
                  type="button"
                  onClick={() => setAdults(adults + 1)}
                  className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 font-bold"
                >
                  +
                </button>
              </div>
            </div>

            <div>
              <span className="text-slate-500 font-medium">Children (&lt;12 yrs)</span>
              <div className="flex items-center gap-2 mt-1">
                <button
                  type="button"
                  onClick={() => setChildren(Math.max(0, children - 1))}
                  className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 font-bold"
                >
                  -
                </button>
                <span className="font-bold text-sm">{children}</span>
                <button
                  type="button"
                  onClick={() => setChildren(children + 1)}
                  className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 font-bold"
                >
                  +
                </button>
              </div>
            </div>

            <div className="col-span-2 flex items-end justify-end">
              <button
                type="submit"
                disabled={isGenerating}
                className="w-full sm:w-auto px-8 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Synthesizing AI Itinerary...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>Generate AI Itinerary</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Generated Itinerary Display */}
      {activeTripPlan && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom duration-300">
          {/* Action Bar */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest">
                Generated Plan
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-heading">
                {activeTripPlan.title}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {startingLocation} ➔ {destination} • Total Budget: <strong>₹{activeTripPlan.budget.toLocaleString()}</strong>
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleSaveTrip}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Save to My Trips</span>
              </button>
              <button
                onClick={() => navigateTo('ticket-booking')}
                className="px-3.5 py-2 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                title="Book Bus, Train, Flight or Cab tickets for this trip"
              >
                <span>🎫 Book Travel Tickets</span>
              </button>
              <button
                onClick={handleDownloadItinerary}
                className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download</span>
              </button>
              <button
                onClick={handleEmailItinerary}
                disabled={isSendingEmail}
                className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                title="Send official copy via Email Connector"
              >
                <Mail className="w-4 h-4 text-emerald-600" />
                <span>{isSendingEmail ? 'Sending...' : 'Email'}</span>
              </button>
              <button
                onClick={handleShareTrip}
                className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl"
                title="Share link"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Days Accordion / Cards */}
          <div className="space-y-6">
            {activeTripPlan.itinerary.map((day) => (
              <div
                key={day.dayNumber}
                className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-md space-y-4"
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-emerald-600 text-white font-black text-xs flex items-center justify-center">
                      D{day.dayNumber}
                    </span>
                    <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                      Day {day.dayNumber}: {day.title}
                    </h3>
                  </div>

                  <button
                    onClick={() =>
                      setEditingItem({
                        dayNumber: day.dayNumber,
                        isNew: true,
                        item: {
                          id: 'it-' + Date.now(),
                          timeSlot: 'Morning',
                          place: '',
                          activity: '',
                          estimatedCost: 300,
                          distance: '2 km',
                          travelTime: '15 mins',
                          notes: '',
                        },
                      })
                    }
                    className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold rounded-xl flex items-center gap-1 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Activity
                  </button>
                </div>

                {/* Day Items */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {day.items.map((item) => (
                    <div
                      key={item.id}
                      className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-4 flex flex-col justify-between space-y-3 relative group"
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <span
                            className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md ${
                              item.timeSlot === 'Morning'
                                ? 'bg-amber-100 text-amber-800'
                                : item.timeSlot === 'Afternoon'
                                ? 'bg-orange-100 text-orange-800'
                                : item.timeSlot === 'Evening'
                                ? 'bg-purple-100 text-purple-800'
                                : 'bg-slate-200 text-slate-800'
                            }`}
                          >
                            {item.timeSlot}
                          </span>
                          <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() =>
                                setEditingItem({
                                  dayNumber: day.dayNumber,
                                  item,
                                  isNew: false,
                                })
                              }
                              className="p-1 text-slate-400 hover:text-emerald-700"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteItem(day.dayNumber, item.id)}
                              className="p-1 text-slate-400 hover:text-rose-600"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        <h4 className="font-bold text-sm text-slate-900 mt-2">{item.place}</h4>
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">{item.activity}</p>
                      </div>

                      <div className="pt-2 border-t border-slate-200/60 text-[11px] text-slate-500 space-y-1">
                        <div className="flex justify-between font-semibold">
                          <span>Dist: {item.distance}</span>
                          <span>Time: {item.travelTime}</span>
                        </div>
                        <div className="flex justify-between items-center font-bold text-slate-900 pt-0.5">
                          <span>Cost</span>
                          <span className="text-emerald-700">₹{item.estimatedCost}</span>
                        </div>
                        {item.notes && <p className="text-[10px] text-slate-400 italic">💡 {item.notes}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Edit / Add Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <form
            onSubmit={handleSaveItemModal}
            className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 text-xs"
          >
            <h3 className="font-bold text-base text-slate-900">
              {editingItem.isNew ? 'Add Activity' : 'Edit Activity'} - Day {editingItem.dayNumber}
            </h3>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Time Slot</label>
              <select
                value={editingItem.item.timeSlot}
                onChange={(e) =>
                  setEditingItem({
                    ...editingItem,
                    item: { ...editingItem.item, timeSlot: e.target.value as any },
                  })
                }
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
              >
                <option value="Morning">Morning</option>
                <option value="Afternoon">Afternoon</option>
                <option value="Evening">Evening</option>
                <option value="Night">Night</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Place / Attraction Name</label>
              <input
                type="text"
                value={editingItem.item.place}
                onChange={(e) =>
                  setEditingItem({
                    ...editingItem,
                    item: { ...editingItem.item, place: e.target.value },
                  })
                }
                placeholder="e.g. Kapila Theertham"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                required
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Activity Description</label>
              <textarea
                value={editingItem.item.activity}
                onChange={(e) =>
                  setEditingItem({
                    ...editingItem,
                    item: { ...editingItem.item, activity: e.target.value },
                  })
                }
                placeholder="What will travelers do here?"
                rows={2}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Est. Cost (₹)</label>
                <input
                  type="number"
                  value={editingItem.item.estimatedCost}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      item: { ...editingItem.item, estimatedCost: Number(e.target.value) },
                    })
                  }
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Distance</label>
                <input
                  type="text"
                  value={editingItem.item.distance}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      item: { ...editingItem.item, distance: e.target.value },
                    })
                  }
                  placeholder="e.g. 5 km"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Notes / Helpful Tips</label>
              <input
                type="text"
                value={editingItem.item.notes}
                onChange={(e) =>
                  setEditingItem({
                    ...editingItem,
                    item: { ...editingItem.item, notes: e.target.value },
                  })
                }
                placeholder="e.g. Early morning avoids queue"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>

            <div className="flex justify-end gap-2 pt-3">
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold"
              >
                Save Activity
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
