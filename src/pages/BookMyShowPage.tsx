import React, { useState } from 'react';
import {
  Film,
  Calendar,
  ExternalLink,
  Star,
  MapPin,
  Sparkles,
  Ticket,
  Music,
  Tv,
} from 'lucide-react';

export const BookMyShowPage: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState('Tirupati');

  const movies = [
    {
      id: 'mov-1',
      title: 'Devara: Part 1',
      languages: 'Telugu, Hindi, Tamil, Kannada',
      genre: 'Action / Drama / Thriller',
      rating: '9.2/10',
      votes: '142K Votes',
      theatres: 'PVR Cinemas (Garuda Mall Tirupati), PGS Cineplex',
      poster: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'mov-2',
      title: 'Kalki 2898 AD',
      languages: 'Telugu, Hindi, Tamil, Malayalam',
      genre: 'Sci-Fi / Epic / Mythological',
      rating: '9.0/10',
      votes: '280K Votes',
      theatres: 'Madhuban Cinema (TP Area), Krishna Multiplex',
      poster: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'mov-3',
      title: 'Pushpa 2: The Rule',
      languages: 'Telugu, Hindi, Tamil',
      genre: 'Action / Crime / Thriller',
      rating: '9.4/10',
      votes: '320K Votes',
      theatres: 'Venkateswara Theatre, PVR Mall',
      poster: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=600&q=80',
    },
  ];

  const events = [
    {
      id: 'ev-1',
      title: 'Annamacharya Sankeerthana Classical Concert',
      location: 'Mahati Auditorium, Tirupati',
      date: 'This Weekend (7:00 PM)',
      category: 'Carnatic Devotional Music',
      price: 'Free Entry (Pass Required)',
    },
    {
      id: 'ev-2',
      title: 'Stand-up Comedy Live Tour with Aakash Gupta',
      location: 'Taj Tirupati Convention Hall',
      date: 'Next Saturday (6:30 PM)',
      category: 'Stand-up Comedy',
      price: 'Starting ₹499',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-700 text-xs font-bold uppercase tracking-wider">
          <Film className="w-3.5 h-3.5 text-red-600" />
          <span>Official BookMyShow Integration</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-heading">
          Movies, Events & Live Shows
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Discover latest movies, cultural concerts, and theatre shows in Tirupati and your travel destination. Book officially on BookMyShow.
        </p>
      </div>

      {/* BookMyShow Hero Redirection Card */}
      <div className="bg-linear-to-r from-red-900 via-rose-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <span className="text-2xl">🎬</span>
            <span className="font-black text-xl tracking-tight text-white">book<span className="text-red-400">my</span>show</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold">
            Looking for Movie Tickets in {selectedCity}?
          </h2>
          <p className="text-xs sm:text-sm text-rose-200 max-w-xl">
            Choose from the latest blockbuster releases, luxury recliners, and live event bookings with official seat selection on BookMyShow.
          </p>
        </div>

        <a
          href={`https://in.bookmyshow.com/explore/movies-${selectedCity.toLowerCase()}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3.5 bg-red-600 hover:bg-red-500 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-lg transition-all flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <Ticket className="w-4 h-4" />
          <span>Open BookMyShow Website</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* City Switcher */}
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-slate-800 text-base sm:text-lg flex items-center gap-2">
          <span>🎥 Now Showing in</span>
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="p-1.5 bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 outline-hidden"
          >
            <option value="Tirupati">Tirupati</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Bengaluru">Bengaluru</option>
            <option value="Chennai">Chennai</option>
          </select>
        </h3>
      </div>

      {/* Movies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {movies.map((mov) => (
          <div
            key={mov.id}
            className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
          >
            <div className="relative h-64 overflow-hidden">
              <img
                src={mov.poster}
                alt={mov.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-3 left-3 bg-black/75 backdrop-blur-md px-3 py-1 rounded-xl text-amber-300 text-xs font-bold flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span>{mov.rating}</span>
                <span className="text-slate-300 text-[10px]">({mov.votes})</span>
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <h4 className="font-extrabold text-base text-slate-900 group-hover:text-red-600 transition-colors">
                  {mov.title}
                </h4>
                <p className="text-xs text-slate-500 mt-1">{mov.genre}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">{mov.languages}</p>

                <div className="mt-3 p-2 bg-slate-50 rounded-xl text-[11px] text-slate-600">
                  <span className="font-bold text-slate-700 block">Popular Theatres:</span>
                  <span className="truncate block">{mov.theatres}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <a
                  href={`https://in.bookmyshow.com/search?query=${encodeURIComponent(mov.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Ticket className="w-3.5 h-3.5" />
                  <span>Book on BookMyShow</span>
                  <ExternalLink className="w-3 h-3 text-red-200" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Live Concerts & Events */}
      <div className="space-y-4">
        <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
          <Music className="w-5 h-5 text-red-600" />
          <span>Live Cultural Events & Shows</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {events.map((ev) => (
            <div
              key={ev.id}
              className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs hover:shadow-md transition-shadow flex items-start justify-between gap-4"
            >
              <div className="space-y-1">
                <span className="bg-red-50 text-red-700 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase">
                  {ev.category}
                </span>
                <h4 className="font-bold text-sm text-slate-900 mt-1">{ev.title}</h4>
                <p className="text-xs text-slate-500 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{ev.location}</span>
                </p>
                <p className="text-xs text-slate-500 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{ev.date}</span>
                </p>
                <p className="text-xs font-bold text-emerald-700 pt-1">{ev.price}</p>
              </div>

              <a
                href="https://in.bookmyshow.com/explore/events"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-slate-100 hover:bg-red-50 hover:text-red-700 text-slate-800 font-bold text-xs rounded-xl transition-colors shrink-0 flex items-center gap-1"
              >
                <span>Book</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
