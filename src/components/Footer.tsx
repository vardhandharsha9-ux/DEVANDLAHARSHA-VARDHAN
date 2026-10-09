import React from 'react';
import { useApp } from '../context/AppContext';
import { Compass, Phone, Mail, MapPin, Heart, Shield, HelpCircle, ExternalLink } from 'lucide-react';
import { SwastikLogo } from './SwastikLogo';

export const Footer: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-24 xl:pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="cursor-pointer" onClick={() => navigateTo('home')}>
              <SwastikLogo variant="footer" />
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              &ldquo;Explore More. Travel Better.&rdquo; <br />
              Architecting unified tourism, pilgrimage corridors, live GPS navigation, and smart ticket reservations across India.
            </p>

            <div className="pt-2 text-xs text-slate-400 space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Head Office: TP Area, Near Central Station, Tirupati, AP - 517501</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>24x7 Traveler Helpline: +91 877 220 7000 / 1800-425-TOUR</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>support@swastiktravels.com</span>
              </div>
            </div>
          </div>

          {/* Quick Discover */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Discover</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => navigateTo('explore')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Destination Hierarchy
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('destinations')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Featured Tirupati & Tirumala
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('waterfalls')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Waterfalls in South India
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('zoo-parks')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Zoo Parks & Wildlife Safaris
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('trip-planner')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  AI Itinerary Planner
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('bookmyshow')}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1"
                >
                  BookMyShow Movies <ExternalLink className="w-3 h-3 text-slate-400" />
                </button>
              </li>
            </ul>
          </div>

          {/* Travel & Bookings */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Services</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => navigateTo('hotels')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Hotel & Resort Booking
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('ticket-booking')}
                  className="hover:text-emerald-400 transition-colors text-amber-300 font-semibold flex items-center gap-1"
                >
                  <span>🎫 Ticket Booking (Bus, Train, Flight)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('travel')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Buses, Trains & Flights
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('food')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Local Restaurant Food
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('live-location')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Live GPS Tracker 📍
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('hospitals')}
                  className="hover:text-emerald-400 transition-colors text-rose-300 font-medium"
                >
                  Emergency Hospitals 24x7 🏥
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('nearby')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Nearby Places & ATMs
                </button>
              </li>
            </ul>
          </div>

          {/* Company & Support */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Ownership & Legal</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => navigateTo('owner-settings')}
                  className="text-amber-300 hover:text-amber-200 font-extrabold flex items-center gap-1 transition-colors"
                >
                  <span>👑 Owner Profile & Settings</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('developer')}
                  className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1 transition-colors"
                >
                  <span>👨‍💻 Developer Profile</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('about')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  About & Ownership
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('security')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Security & Privacy Standard
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('privacy')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Privacy Policy & GPS Notice
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('terms')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('contact')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Contact & Helpline
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('faq')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Frequently Asked Questions
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Official Ownership, Copyright & Developer Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 text-xs text-slate-400 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="space-y-1">
            <p className="font-semibold text-slate-200">
              © 2026 DEVANDLA HARSHA VARDHAN. All Rights Reserved.
            </p>
            <p className="text-[11px] text-slate-400">
              Swastik Travels &bull; Founder, Owner & Lead Application Developer: <strong className="text-white">Devandla Harsha Vardhan</strong> &bull; Contact: <a href="tel:9391892404" className="text-emerald-400 hover:underline font-bold">9391892404</a>
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-slate-400">
            <button onClick={() => navigateTo('about')} className="hover:text-emerald-400 transition-colors">
              About
            </button>
            <span>&bull;</span>
            <button onClick={() => navigateTo('developer')} className="hover:text-emerald-400 transition-colors">
              Developer Profile
            </button>
            <span>&bull;</span>
            <button onClick={() => navigateTo('security')} className="hover:text-emerald-400 transition-colors">
              Security
            </button>
            <span>&bull;</span>
            <button onClick={() => navigateTo('privacy')} className="hover:text-emerald-400 transition-colors">
              Privacy
            </button>
            <span>&bull;</span>
            <button onClick={() => navigateTo('terms')} className="hover:text-emerald-400 transition-colors">
              Terms
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
