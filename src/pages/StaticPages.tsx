import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Compass,
  Phone,
  Mail,
  MapPin,
  Shield,
  HelpCircle,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Send,
  Radio,
} from 'lucide-react';

// ==========================================
// 1. ABOUT PAGE
// ==========================================
export const AboutPage: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full">
          About Sathwika Travels & Tourism
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 font-heading">
          Explore More. Travel Smarter. Create Memories.
        </h1>
        <p className="text-slate-600 text-sm leading-relaxed">
          Sathwika Travels & Tourism is a unified digital tourism platform dedicated to helping pilgrims, families, and adventurers explore India and the world effortlessly.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
            🎯
          </div>
          <h3 className="font-extrabold text-xl text-slate-900">Our Mission</h3>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            To eliminate travel friction by unifying pilgrimage guides, hotel reservations, intercity transportation, regional food delivery, 24x7 healthcare safety, and live GPS geolocation under one intuitive platform.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
            🌟
          </div>
          <h3 className="font-extrabold text-xl text-slate-900">Our Vision</h3>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            To become the premier trusted travel companion for millions of pilgrims visiting Tirupati, sacred temple circuits, pristine waterfalls, and global bucket-list destinations through modern AI and authentic hospitality.
          </p>
        </div>
      </div>

      {/* Official Ownership & Developer Card */}
      <div className="bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-700/60 pb-6">
          <div>
            <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block mb-1">
              Official Ownership & Development Profile
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Sathwika Travels & Tourism
            </h2>
            <p className="text-emerald-200 text-sm mt-1">
              Developed and Owned By: <strong className="text-white">DEVANDLA HARSHA VARDHAN</strong>
            </p>
          </div>
          <div className="text-left sm:text-right">
            <span className="text-xs text-emerald-300 block">Contact Mobile</span>
            <a href="tel:9391892404" className="text-xl font-black text-amber-300 hover:underline">
              9391892404
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
          <div className="space-y-2">
            <h4 className="font-bold text-white text-sm">Application Purpose</h4>
            <p>
              Travel, Tourism, Trip Planning, Location Services, Bookings, Nearby Services, AI Travel Assistance, Maps, Destinations and Travel Utilities.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-white text-sm">Project Classification</h4>
            <p>
              Original application project created, architected, and maintained by DEVANDLA HARSHA VARDHAN.
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-emerald-700/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-emerald-200">
          <span>© 2026 DEVANDLA HARSHA VARDHAN. All Rights Reserved.</span>
          <button
            onClick={() => navigateTo('developer')}
            className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold transition-all shadow-md"
          >
            View Developer Profile
          </button>
        </div>
      </div>

      {/* Intellectual Property Notice */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <h3 className="font-bold text-lg text-slate-900 border-b border-slate-100 pb-3">
          INTELLECTUAL PROPERTY NOTICE
        </h3>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          The original application concept, source code, application architecture, original UI implementation,
          branding, layouts, custom components, database structure, workflows, prompts, and original content
          created specifically for <strong>Sathwika Travels & Tourism</strong> are the intellectual property of{' '}
          <strong className="text-slate-900">DEVANDLA HARSHA VARDHAN</strong>, subject to applicable law and any third-party licenses.
        </p>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          Unauthorized copying, reproduction, redistribution, modification, resale, or republishing of the original application or its proprietary components is not permitted without authorization from the owner, except where permitted by applicable law or third-party license terms.
        </p>
      </div>

      {/* Third-Party Services Notice */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <h3 className="font-bold text-lg text-slate-900 border-b border-slate-100 pb-3">
          THIRD-PARTY SERVICES NOTICE
        </h3>
        <blockquote className="border-l-4 border-emerald-500 pl-4 py-1 text-xs sm:text-sm text-slate-700 italic bg-emerald-50/50 rounded-r-xl">
          &ldquo;Some functionality may use third-party services, APIs, open-source libraries, map services, payment services, AI providers, or external data sources. Such third-party technology and trademarks remain the property of their respective owners and are subject to their respective terms and licenses.&rdquo;
        </blockquote>
        <p className="text-xs text-slate-500">
          Technologies acknowledged include Google Maps Platform, Google Gemini, OpenStreetMap, Leaflet, and standard open-source npm dependencies.
        </p>
      </div>

      {/* Services Overview */}
      <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200 space-y-6">
        <h3 className="text-xl font-bold text-slate-900 text-center">Comprehensive Tourism Services</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
          <div className="bg-white p-4 rounded-2xl shadow-2xs">
            <span className="font-bold text-slate-900 block">🛕 Pilgrimage Hubs</span>
            <span className="text-slate-500">Tirupati Balaji special focus, darshan guidelines, and temple accommodation.</span>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-2xs">
            <span className="font-bold text-slate-900 block">🗺️ AI Trip Itineraries</span>
            <span className="text-slate-500">Day-by-day smart travel synthesis with budget calculations in ₹.</span>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-2xs">
            <span className="font-bold text-slate-900 block">🏨 Verified Hotels</span>
            <span className="text-slate-500">5-star luxury resorts, budget rooms, and temple guest houses.</span>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-2xs">
            <span className="font-bold text-slate-900 block">📍 Live GPS Radar</span>
            <span className="text-slate-500">Browser-native real-time navigation with strict privacy controls.</span>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-2xs">
            <span className="font-bold text-slate-900 block">🏥 24x7 Emergency Care</span>
            <span className="text-slate-500">Direct hospital directory, ambulance hotline 108, and trauma support.</span>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-2xs">
            <span className="font-bold text-slate-900 block">🍽️ Local Cuisine</span>
            <span className="text-slate-500">Authentic Andhra meals, filter coffee, and fast hotel delivery.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 2. CONTACT PAGE
// ==========================================
export const ContactPage: React.FC = () => {
  const { showToast } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Your message has been sent to our customer care team!', 'success');
  };

  const handleClear = () => {
    setName('');
    setEmail('');
    setPhone('');
    setSubject('');
    setMessage('');
    setSubmitted(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full">
          24x7 Traveler Support
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-heading">
          Get in Touch with Sathwika
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Have questions about your Tirumala pilgrimage, hotel booking, or trip plan? Our support team is here to assist.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Contact Info Col */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-6">
          <h3 className="font-bold text-lg">Contact Information</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Reach out via phone, email, or visit our central coordination office in Tirupati.
          </p>

          <div className="space-y-4 text-xs">
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-white">Central Operations Office</strong>
                <span className="text-slate-400">TP Area, Near Central Station, Tirupati, Andhra Pradesh - 517501</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-white">Owner & Developer Mobile</strong>
                <a href="tel:9391892404" className="text-amber-300 font-bold hover:underline">
                  9391892404
                </a>
                <span className="block text-[11px] text-slate-400">DEVANDLA HARSHA VARDHAN</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-white">Email Address</strong>
                <span className="text-slate-400">support@sathwikatravels.com</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-400 space-y-1">
            <p className="text-emerald-300 font-semibold">
              © 2026 DEVANDLA HARSHA VARDHAN. All Rights Reserved.
            </p>
            <p>🚨 Police: 100 | Medical: 108 | TTD Darshan: +91 877 227 7777</p>
          </div>
        </div>

        {/* Contact Form Col */}
        <div className="md:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md">
          {submitted ? (
            <div className="text-center py-12 space-y-3">
              <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="font-bold text-lg text-slate-900">Message Received!</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Thank you, {name}. A Sathwika travel advisor will contact you within 2 business hours.
              </p>
              <button
                onClick={handleClear}
                className="mt-4 px-5 py-2 bg-emerald-700 text-white rounded-xl text-xs font-bold"
              >
                Send Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Your Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full Name"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@example.com"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Mobile Number</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98480 00000"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Subject</label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Tirupati Package Inquiry"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Message / Travel Requirements</label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share details of your travel query or feedback..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  required
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleClear}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 rounded-xl font-bold text-slate-700"
                >
                  Clear Form
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold shadow-md flex items-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Message</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 3. FAQ PAGE
// ==========================================
export const FaqPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How do I create and customize an itinerary?',
      a: 'Navigate to "Trip Planner" from the main menu, specify your origin, destination (e.g. Tirupati), dates, budget, and travel type. Our AI planner will automatically synthesize a complete Day 1, 2, 3 schedule with morning, afternoon, evening activities. You can edit, add, or delete items, and save the plan directly to My Trips.',
    },
    {
      q: 'How does Live GPS Location work?',
      a: 'Live Location uses your device\'s hardware GPS via the standard browser API `navigator.geolocation.watchPosition()`. We do NOT simulate coordinates or collect location in the background. Tracking only occurs while explicitly turned ON, and stops instantly when you click "Stop Live Location".',
    },
    {
      q: 'How do I book a hotel or transportation on Sathwika?',
      a: 'Browse through our curated list of verified hotels or travel options (buses, trains, flights, cabs). Tap "Book Now", select your room/seat preference, fill in guest details, and confirm via demo payment. A digital booking reference and printable voucher are generated immediately.',
    },
    {
      q: 'How does "Nearby Me" find facilities?',
      a: 'The Nearby Me module looks for hospitals, restaurants, ATMs, petrol stations, and temples relative to your location. If GPS is enabled, it computes approximate distances and offers one-tap Google Maps directions and phone dialer access.',
    },
    {
      q: 'Are my location or private data stored on your servers?',
      a: 'No. Sathwika Travels follows strict privacy-first architecture. Real GPS coordinates stay on your device for map rendering and are cleared from memory when you stop tracking.',
    },
    {
      q: 'What is special about the Tirupati pilgrimage focus?',
      a: 'Tirupati & Tirumala is our premier featured destination. We provide comprehensive coverage of Sri Venkateswara Temple darshan tips, Kapila Theertham sacred falls, Talakona trekking, verified hotels near Alipiri, and authentic South Indian dining.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full">
          Frequently Asked Questions
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-heading">
          Traveler Help & FAQ
        </h1>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs"
          >
            <button
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-slate-900 text-sm hover:bg-slate-50 transition-colors"
            >
              <span>{faq.q}</span>
              {openIndex === idx ? (
                <ChevronUp className="w-4 h-4 text-emerald-700 shrink-0" />
              ) : (
                <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
              )}
            </button>
            {openIndex === idx && (
              <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// ==========================================
// 4. PRIVACY POLICY
// ==========================================
export const PrivacyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 text-xs sm:text-sm leading-relaxed text-slate-700">
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full">
          Legal & Privacy Charter
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading">
          Privacy Policy & Location Notice
        </h1>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6">
        <div>
          <h3 className="font-bold text-base text-slate-900 mb-2">1. Location Data & Live GPS Privacy</h3>
          <p>
            At Swastik Travels, we take location privacy seriously. Live GPS location is requested <strong>ONLY after explicit user activation</strong> in the UI. 
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1 text-slate-600">
            <li>We do NOT track or collect your location in background processes.</li>
            <li>Tracking terminates instantly when you select "STOP LIVE LOCATION".</li>
            <li>Your coordinates are utilized solely on the client side to render your marker on the interactive radar map and search nearby amenities.</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-base text-slate-900 mb-2">2. Information We Collect</h3>
          <p>
            When you register an account or book travel services, we collect your name, email, contact telephone number, and travel preferences to generate digital booking vouchers and notify you of trip updates.
          </p>
        </div>

        <div>
          <h3 className="font-bold text-base text-slate-900 mb-2">3. Third-Party Links & External Services</h3>
          <p>
            Some functionality may use third-party services, APIs, open-source libraries, map services, payment services, AI providers, or external data sources. Such third-party technology and trademarks remain the property of their respective owners and are subject to their respective terms and licenses.
          </p>
        </div>

        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <span>© 2026 DEVANDLA HARSHA VARDHAN. All Rights Reserved.</span>
          <span>Owner & Developer: DEVANDLA HARSHA VARDHAN (9391892404)</span>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 5. TERMS & CONDITIONS
// ==========================================
export const TermsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 text-xs sm:text-sm leading-relaxed text-slate-700">
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full">
          Terms of Service
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading">
          Terms & Conditions
        </h1>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6">
        <div>
          <h3 className="font-bold text-base text-slate-900 mb-2">1. Intellectual Property Notice</h3>
          <p>
            The original application concept, source code, application architecture, original UI implementation,
            branding, layouts, custom components, database structure, workflows, prompts, and original content
            created specifically for <strong>Swastik Travels</strong> are the intellectual property of{' '}
            <strong className="text-slate-900">DEVANDLA HARSHA VARDHAN</strong>, subject to applicable law and any third-party licenses.
          </p>
          <p className="mt-2 text-slate-600">
            Unauthorized copying, reproduction, redistribution, modification, resale, or republishing of the original application or its proprietary components is not permitted without authorization from the owner, except where permitted by applicable law or third-party license terms.
          </p>
        </div>

        <div>
          <h3 className="font-bold text-base text-slate-900 mb-2">2. Third-Party Services Notice</h3>
          <blockquote className="border-l-4 border-emerald-500 pl-4 py-1 italic bg-emerald-50/50 rounded-r-xl text-slate-700">
            &ldquo;Some functionality may use third-party services, APIs, open-source libraries, map services,
            payment services, AI providers, or external data sources. Such third-party technology and trademarks
            remain the property of their respective owners and are subject to their respective terms and licenses.&rdquo;
          </blockquote>
        </div>

        <div>
          <h3 className="font-bold text-base text-slate-900 mb-2">3. Itinerary & Recommendation Accuracy</h3>
          <p>
            AI-generated travel itineraries and budget estimations are designed as recommendations. Travelers are encouraged to verify temple darshan quotas, ghat road traffic timings, and forest check-post guidelines locally.
          </p>
        </div>

        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <span>© 2026 DEVANDLA HARSHA VARDHAN. All Rights Reserved.</span>
          <span>Owner & Developer: DEVANDLA HARSHA VARDHAN (9391892404)</span>
        </div>
      </div>
    </div>
  );
};
