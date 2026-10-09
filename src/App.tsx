/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { APIProvider } from '@vis.gl/react-google-maps';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/ToastContainer';
import { GlobalSearchModal } from './components/GlobalSearchModal';

// Pages
import { HomePage } from './pages/HomePage';
import { DashboardPage } from './pages/DashboardPage';
import { ExplorePage } from './pages/ExplorePage';
import { IndiaRouteExplorerPage } from './pages/IndiaRouteExplorerPage';
import { TripPlannerPage } from './pages/TripPlannerPage';
import { HotelsPage } from './pages/HotelsPage';
import { TravelPage } from './pages/TravelPage';
import { FoodPage } from './pages/FoodPage';
import { LiveLocationPage } from './pages/LiveLocationPage';
import { NearbyPage } from './pages/NearbyPage';
import { HospitalsPage } from './pages/HospitalsPage';
import { WaterfallsPage } from './pages/WaterfallsPage';
import { ZooParksPage } from './pages/ZooParksPage';
import { BookMyShowPage } from './pages/BookMyShowPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { MyBookingsPage } from './pages/MyBookingsPage';
import { MyTripsPage } from './pages/MyTripsPage';
import { AIAssistantPage } from './pages/AIAssistantPage';
import { ProfilePage } from './pages/ProfilePage';
import { AuthPage } from './pages/AuthPage';
import { AboutPage, ContactPage, FaqPage, PrivacyPage, TermsPage } from './pages/StaticPages';
import { OwnerSettingsPage } from './pages/OwnerSettingsPage';
import { TicketBookingPage } from './pages/TicketBookingPage';
import { DeveloperProfilePage } from './pages/DeveloperProfilePage';
import { SecurityPrivacyPage } from './pages/SecurityPrivacyPage';

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

const MainContent: React.FC = () => {
  const { currentRoute } = useApp();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [quotaExceeded, setQuotaExceeded] = useState(false);

  useEffect(() => {
    const handleQuotaExceeded = () => {
      setQuotaExceeded(true);
    };
    window.addEventListener('gmp-quota-exceeded', handleQuotaExceeded);
    return () => {
      window.removeEventListener('gmp-quota-exceeded', handleQuotaExceeded);
    };
  }, []);

  const renderCurrentView = () => {
    switch (currentRoute) {
      case 'home':
        return <HomePage onOpenSearch={() => setIsSearchOpen(true)} />;
      case 'dashboard':
        return <DashboardPage />;
      case 'explore':
      case 'destinations':
        return <ExplorePage />;
      case 'route-explorer':
        return <IndiaRouteExplorerPage />;
      case 'trip-planner':
        return <TripPlannerPage />;
      case 'hotels':
        return <HotelsPage />;
      case 'travel':
        return <TravelPage />;
      case 'food':
        return <FoodPage />;
      case 'live-location':
        return <LiveLocationPage />;
      case 'nearby':
        return <NearbyPage />;
      case 'hospitals':
        return <HospitalsPage />;
      case 'waterfalls':
        return <WaterfallsPage />;
      case 'zoo-parks':
        return <ZooParksPage />;
      case 'bookmyshow':
        return <BookMyShowPage />;
      case 'favorites':
        return <FavoritesPage />;
      case 'my-trips':
        return <MyTripsPage />;
      case 'my-bookings':
        return <MyBookingsPage />;
      case 'ai-assistant':
        return <AIAssistantPage />;
      case 'profile':
        return <ProfilePage />;
      case 'owner-profile':
      case 'owner-settings':
      case 'owner-dashboard':
        return <OwnerSettingsPage />;
      case 'ticket-booking':
      case 'my-tickets':
        return <TicketBookingPage />;
      case 'developer':
        return <DeveloperProfilePage />;
      case 'security':
        return <SecurityPrivacyPage />;
      case 'login':
        return <AuthPage initialMode="login" />;
      case 'register':
        return <AuthPage initialMode="register" />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'faq':
        return <FaqPage />;
      case 'privacy':
        return <PrivacyPage />;
      case 'terms':
        return <TermsPage />;
      default:
        return <HomePage onOpenSearch={() => setIsSearchOpen(true)} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans selection:bg-emerald-600 selection:text-white">
      {/* Mandatory Demo Key Quota Reached Banner */}
      {quotaExceeded && (
        <div className="bg-amber-50 border-b border-amber-200 text-amber-900 px-4 py-2.5 text-xs md:text-sm text-center sticky top-0 z-50 shadow-sm">
          <span>
            Google Maps Platform quota reached. If you are the app owner, visit{' '}
            <a
              href="https://developers.google.com/maps/ai/ai-studio?utm_campaign=gmp_mcp_codeassist_v1_aistudio#quota_exceeded_errors"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-semibold text-amber-950 hover:text-amber-800"
            >
              maps developer site
            </a>{' '}
            for instructions to update your account.
          </span>
        </div>
      )}

      {/* Top Navbar */}
      <Navbar onOpenSearch={() => setIsSearchOpen(true)} />

      {/* Main View Area */}
      <main className="flex-1 w-full">
        {renderCurrentView()}
      </main>

      {/* Footer */}
      <Footer />

      {/* Bottom Nav for mobile screens */}
      <MobileBottomNav />

      {/* Global Interactive Search Modal */}
      <GlobalSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Floating Toast Notification Stack */}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  const [apiKey, setApiKey] = useState<string>(GOOGLE_MAPS_API_KEY);

  useEffect(() => {
    if (!apiKey) {
      fetch('/api/config')
        .then((res) => res.json())
        .then((data) => {
          if (data?.googleMapsApiKey) {
            setApiKey(data.googleMapsApiKey);
          }
        })
        .catch((e) => {
          console.warn('Config fetch skipped:', e);
        });
    }
  }, [apiKey]);

  return (
    <APIProvider
      apiKey={apiKey}
      libraries={['places', 'routes', 'geometry', 'marker']}
      onLoad={() => {
        // Broadcast custom event that Maps is fully ready
        window.dispatchEvent(new CustomEvent('gmp-api-ready'));
      }}
      onError={(err) => {
        console.warn('Google Maps API initialization warning:', err);
      }}
    >
      <AppProvider>
        <MainContent />
      </AppProvider>
    </APIProvider>
  );
}
