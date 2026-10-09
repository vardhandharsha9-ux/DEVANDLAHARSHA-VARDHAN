import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Compass, Map, Calendar, Ticket, Grid, X, MapPin, Building, Utensils, Heart, User, Film, Sparkles } from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const { currentRoute, navigateTo, favoriteIds } = useApp();
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const mainTabs = [
    { label: 'Home', route: 'home', icon: Compass },
    { label: 'Explore', route: 'explore', icon: Map },
    { label: 'Plan', route: 'trip-planner', icon: Calendar },
    { label: 'Bookings', route: 'my-bookings', icon: Ticket },
  ];

  return (
    <>
      {/* More Modal for Mobile */}
      {isMoreOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex flex-col justify-end xl:hidden">
          <div className="bg-white rounded-t-3xl p-5 shadow-2xl animate-in slide-in-from-bottom duration-200 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-800 text-sm">All Swastik Services</h3>
              <button
                onClick={() => setIsMoreOpen(false)}
                className="p-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-4 gap-3 py-4 text-center">
              <button
                onClick={() => {
                  navigateTo('route-explorer');
                  setIsMoreOpen(false);
                }}
                className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-slate-50"
              >
                <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center text-lg shadow-2xs font-bold">
                  🛣️
                </div>
                <span className="text-[11px] font-semibold text-slate-700">Routes</span>
              </button>

              <button
                onClick={() => {
                  navigateTo('ticket-booking');
                  setIsMoreOpen(false);
                }}
                className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-slate-50"
              >
                <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center text-lg shadow-2xs font-bold">
                  🎫
                </div>
                <span className="text-[11px] font-semibold text-slate-700">Tickets</span>
              </button>

              <button
                onClick={() => {
                  navigateTo('owner-settings');
                  setIsMoreOpen(false);
                }}
                className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-slate-50"
              >
                <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center text-lg shadow-2xs font-bold">
                  ⚙️
                </div>
                <span className="text-[11px] font-semibold text-slate-700">Owner</span>
              </button>

              <button
                onClick={() => {
                  navigateTo('hotels');
                  setIsMoreOpen(false);
                }}
                className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-slate-50"
              >
                <div className="w-11 h-11 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center text-lg shadow-2xs">
                  🏨
                </div>
                <span className="text-[11px] font-semibold text-slate-700">Hotels</span>
              </button>

              <button
                onClick={() => {
                  navigateTo('travel');
                  setIsMoreOpen(false);
                }}
                className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-slate-50"
              >
                <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center text-lg shadow-2xs">
                  🚌
                </div>
                <span className="text-[11px] font-semibold text-slate-700">Travel</span>
              </button>

              <button
                onClick={() => {
                  navigateTo('food');
                  setIsMoreOpen(false);
                }}
                className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-slate-50"
              >
                <div className="w-11 h-11 rounded-2xl bg-orange-50 text-orange-700 flex items-center justify-center text-lg shadow-2xs">
                  🍽️
                </div>
                <span className="text-[11px] font-semibold text-slate-700">Food</span>
              </button>

              <button
                onClick={() => {
                  navigateTo('live-location');
                  setIsMoreOpen(false);
                }}
                className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-slate-50"
              >
                <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center text-lg shadow-2xs">
                  📍
                </div>
                <span className="text-[11px] font-semibold text-slate-700">Live GPS</span>
              </button>

              <button
                onClick={() => {
                  navigateTo('hospitals');
                  setIsMoreOpen(false);
                }}
                className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-slate-50"
              >
                <div className="w-11 h-11 rounded-2xl bg-rose-50 text-rose-700 flex items-center justify-center text-lg shadow-2xs">
                  🏥
                </div>
                <span className="text-[11px] font-semibold text-slate-700">Hospitals</span>
              </button>

              <button
                onClick={() => {
                  navigateTo('waterfalls');
                  setIsMoreOpen(false);
                }}
                className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-slate-50"
              >
                <div className="w-11 h-11 rounded-2xl bg-cyan-50 text-cyan-700 flex items-center justify-center text-lg shadow-2xs">
                  💧
                </div>
                <span className="text-[11px] font-semibold text-slate-700">Waterfalls</span>
              </button>

              <button
                onClick={() => {
                  navigateTo('zoo-parks');
                  setIsMoreOpen(false);
                }}
                className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-slate-50"
              >
                <div className="w-11 h-11 rounded-2xl bg-yellow-50 text-yellow-700 flex items-center justify-center text-lg shadow-2xs">
                  🦁
                </div>
                <span className="text-[11px] font-semibold text-slate-700">Zoo Parks</span>
              </button>

              <button
                onClick={() => {
                  navigateTo('bookmyshow');
                  setIsMoreOpen(false);
                }}
                className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-slate-50"
              >
                <div className="w-11 h-11 rounded-2xl bg-red-50 text-red-700 flex items-center justify-center text-lg shadow-2xs">
                  🎬
                </div>
                <span className="text-[11px] font-semibold text-slate-700">Movies</span>
              </button>

              <button
                onClick={() => {
                  navigateTo('ai-assistant');
                  setIsMoreOpen(false);
                }}
                className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-slate-50"
              >
                <div className="w-11 h-11 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center text-lg shadow-2xs">
                  <Sparkles className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-semibold text-slate-700">AI Assist</span>
              </button>

              <button
                onClick={() => {
                  navigateTo('favorites');
                  setIsMoreOpen(false);
                }}
                className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-slate-50"
              >
                <div className="w-11 h-11 rounded-2xl bg-rose-50 text-rose-700 flex items-center justify-center text-lg shadow-2xs">
                  <Heart className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-semibold text-slate-700">Favorites</span>
              </button>

              <button
                onClick={() => {
                  navigateTo('nearby');
                  setIsMoreOpen(false);
                }}
                className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-slate-50"
              >
                <div className="w-11 h-11 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center text-lg shadow-2xs">
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-semibold text-slate-700">Nearby</span>
              </button>

              <button
                onClick={() => {
                  navigateTo('profile');
                  setIsMoreOpen(false);
                }}
                className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-slate-50"
              >
                <div className="w-11 h-11 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center text-lg shadow-2xs">
                  <User className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-semibold text-slate-700">Profile</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Persistent Bottom Bar for mobile */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 px-2 py-1 flex items-center justify-around xl:hidden shadow-lg">
        {mainTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentRoute === tab.route;
          return (
            <button
              key={tab.label}
              onClick={() => navigateTo(tab.route as any)}
              className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition-all ${
                isActive ? 'text-emerald-700 font-bold' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
              <span className="text-[10px] mt-0.5">{tab.label}</span>
            </button>
          );
        })}

        {/* More button */}
        <button
          onClick={() => setIsMoreOpen(true)}
          className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition-all ${
            isMoreOpen ? 'text-emerald-700 font-bold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Grid className="w-5 h-5 stroke-[1.8]" />
          <span className="text-[10px] mt-0.5">More</span>
        </button>
      </nav>
    </>
  );
};
