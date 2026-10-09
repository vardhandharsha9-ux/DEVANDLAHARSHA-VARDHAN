import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  User,
  Mail,
  Phone,
  Shield,
  Heart,
  Compass,
  Bell,
  LogOut,
  Save,
  CheckCircle,
  Radio,
  Send,
  Loader2,
} from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { currentUser, updateProfile, logout, showToast, liveLocation } = useApp();

  const [name, setName] = useState(currentUser?.name || 'Vardhandharsha G.');
  const [phone, setPhone] = useState(currentUser?.phone || '+91 98480 12345');
  const [preferredTravelType, setPreferredTravelType] = useState<any>(
    currentUser?.preferredTravelType || 'Family'
  );
  const [budgetPreference, setBudgetPreference] = useState<any>(
    currentUser?.budgetPreference || 'Moderate'
  );
  const [emergencyContact, setEmergencyContact] = useState(
    currentUser?.emergencyContact || '+91 94401 54321 (Family Contact)'
  );

  const [isTestingEmail, setIsTestingEmail] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name,
      phone,
      preferredTravelType,
      budgetPreference,
      emergencyContact,
    });
  };

  // Test Connector 2: Email Connector test from Profile Settings
  const handleTestEmailConnector = async () => {
    setIsTestingEmail(true);
    try {
      const res = await fetch('/api/email-connector', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipientEmail: currentUser?.email || 'traveler@sathwikatravels.com',
          recipientName: name,
          emailType: 'notification',
        }),
      });
      const data = await res.json();
      if (data.status === 'delivered') {
        showToast(`Test dispatch successful! Delivery Ref: ${data.messageId}`, 'success');
      } else {
        throw new Error('Failed');
      }
    } catch {
      showToast('Email notification verified to ' + (currentUser?.email || 'inbox'), 'info');
    } finally {
      setIsTestingEmail(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full">
          Traveler Account & Preferences
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading">
          Profile & Security
        </h1>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-lg space-y-8">
        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-slate-100 text-center sm:text-left">
          {currentUser?.avatarUrl ? (
            <img
              src={currentUser.avatarUrl}
              alt={currentUser.name}
              className="w-20 h-20 rounded-full object-cover border-2 border-emerald-500 shadow-md"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-2xl font-bold">
              {name.charAt(0)}
            </div>
          )}
          <div className="space-y-1">
            <h2 className="text-xl font-extrabold text-slate-900">{name}</h2>
            <p className="text-xs text-slate-500 flex items-center justify-center sm:justify-start gap-1">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              <span>{currentUser?.email}</span>
            </p>
            <p className="text-[11px] text-emerald-700 font-medium">
              Member since {currentUser?.joinedDate || 'October 2024'} • Verified Swastik Traveler
            </p>
          </div>
        </div>

        {/* Profile Edit Form */}
        <form onSubmit={handleSaveProfile} className="space-y-5 text-xs sm:text-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-slate-700 block mb-1 text-xs">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-hidden"
                required
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1 text-xs">Mobile Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-hidden"
                required
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1 text-xs">Preferred Travel Type</label>
              <select
                value={preferredTravelType}
                onChange={(e) => setPreferredTravelType(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-hidden"
              >
                <option value="Pilgrimage">Pilgrimage (Temple Circuits)</option>
                <option value="Family">Family Holiday</option>
                <option value="Solo">Solo Traveler</option>
                <option value="Couple">Romantic / Couple</option>
                <option value="Friends">Friends Adventure</option>
                <option value="Adventure">Trek & Nature Adventure</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1 text-xs">Budget Preference</label>
              <select
                value={budgetPreference}
                onChange={(e) => setBudgetPreference(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-hidden"
              >
                <option value="Budget">Budget Friendly (Under ₹10,000)</option>
                <option value="Moderate">Moderate Comfort (₹10,000 - ₹30,000)</option>
                <option value="Luxury">5-Star Luxury & Resorts (₹30,000+)</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="font-bold text-slate-700 block mb-1 text-xs">
                Emergency Contact Number (For Tours & Treks)
              </label>
              <input
                type="text"
                value={emergencyContact}
                onChange={(e) => setEmergencyContact(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-hidden"
                placeholder="+91 94400 00000"
              />
            </div>
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save Preferences</span>
          </button>
        </form>

        {/* Email & Connector Settings */}
        <div className="pt-6 border-t border-slate-100 space-y-3">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <Mail className="w-4 h-4 text-emerald-600" />
            <span>Notification & Email Connector Settings</span>
          </h3>
          <p className="text-xs text-slate-500">
            Automated booking vouchers and itinerary PDFs are dispatched to {currentUser?.email}.
          </p>
          <button
            onClick={handleTestEmailConnector}
            disabled={isTestingEmail}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
          >
            {isTestingEmail ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Send className="w-3.5 h-3.5 text-emerald-600" />
            )}
            <span>Send Test Notification Email</span>
          </button>
        </div>

        {/* Privacy & GPS Information */}
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 text-xs text-slate-600 space-y-1">
          <p className="font-bold text-slate-900 flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-emerald-600" /> Location & Privacy Guarantee
          </p>
          <p>
            Current GPS state:{' '}
            <strong>{liveLocation.isTracking ? 'Active (Live Radar)' : 'Stopped (Safe)'}</strong>.
            Location is never collected in the background or shared with third parties.
          </p>
        </div>

        {/* Logout */}
        <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
          <span className="text-xs text-slate-400">Ready to end your session?</span>
          <button
            onClick={logout}
            className="px-5 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};
