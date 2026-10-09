/*
 * Swastik Travels
 * Original Application Project
 *
 * Owner & Developer:
 * DEVANDLA HARSHA VARDHAN
 *
 * Contact:
 * 9391892404
 *
 * Copyright © 2026 DEVANDLA HARSHA VARDHAN.
 * All Rights Reserved, subject to applicable law
 * and third-party license terms.
 */

import React from 'react';
import { useApp } from '../context/AppContext';
import {
  UserCheck,
  Code2,
  Phone,
  ShieldCheck,
  Sparkles,
  MapPin,
  Calendar,
  Globe2,
  Lock,
  FileText,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  Layers,
  Award,
} from 'lucide-react';

export const DeveloperProfilePage: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <div className="bg-slate-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header Hero Banner */}
        <div className="bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-700/60 text-emerald-200 text-xs font-semibold uppercase tracking-wider mb-4 border border-emerald-600/50">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>Official Application Ownership & Profile</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-heading">
                DEVANDLA HARSHA VARDHAN
              </h1>
              <p className="text-lg text-emerald-300 font-semibold mt-1">
                Owner & Lead Application Developer
              </p>
              <p className="text-emerald-100/90 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
                Sole creator, developer, and intellectual property owner of{' '}
                <strong className="text-white">Swastik Travels</strong> — a modern, unified
                full-stack travel platform for pilgrimage discovery, trip planning, smart bookings, highway routing,
                and AI-assisted tourism.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start md:items-end gap-3 shrink-0">
              <a
                href="tel:9391892404"
                className="flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm shadow-lg shadow-amber-400/20 transition-all cursor-pointer"
              >
                <Phone className="w-4 h-4 text-slate-950" />
                <span>Call: 9391892404</span>
              </a>
            </div>
          </div>
        </div>

        {/* Official Application Profile Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Owner & Developer Details */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <UserCheck className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] uppercase font-bold text-slate-400 tracking-wider">
                  Owner & Developer
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 mt-0.5">
                  DEVANDLA HARSHA VARDHAN
                </h3>
              </div>
              <div className="space-y-2 pt-2 text-xs border-t border-slate-100 text-slate-600">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-medium">Role:</span>
                  <span className="font-bold text-slate-900">Application Owner & Developer</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-medium">Contact Mobile:</span>
                  <a href="tel:9391892404" className="font-bold text-emerald-700 hover:underline">
                    9391892404
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-medium">Project Status:</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                    Original Application
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-medium">Copyright:</span>
                  <span className="font-bold text-slate-900">© 2026 DEVANDLA HARSHA VARDHAN</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100">
              <p className="text-[11px] text-slate-500 italic">
                © 2026 DEVANDLA HARSHA VARDHAN. All Rights Reserved.
              </p>
            </div>
          </div>

          {/* Card 2: Application Scope & Architecture */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center">
                <Code2 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] uppercase font-bold text-slate-400 tracking-wider">
                  Application Platform
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 mt-0.5">
                  Swastik Travels
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Comprehensive modern tourism engine built for seamless discovery of Indian destinations,
                with custom focus on sacred pilgrimage hubs (Tirupati, Tirumala, Srisailam, Lepakshi),
                nature trails, and interstate routes.
              </p>
              <div className="space-y-1.5 text-xs text-slate-700 font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Interactive 36-State India Location Explorer</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Google Maps Platform & Live GPS Navigation</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>AI Travel Assistant & Smart Itinerary Engine</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Hotels, Buses, Trains, Cabs & Food Delivery</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100">
              <button
                onClick={() => navigateTo('route-explorer')}
                className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
              >
                <span>Launch Route Explorer</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 3: Security & IP Protection */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] uppercase font-bold text-slate-400 tracking-wider">
                  Intellectual Property & Security
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 mt-0.5">
                  Protected Original Work
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Architecture, user interfaces, branding, custom state engines, and integration
                pipelines are protected under applicable intellectual property laws.
              </p>
              <div className="space-y-2 text-xs text-slate-600">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="font-bold text-slate-800 block mb-0.5">Zero Secret Leakage</span>
                  <span>Server-side API keys, HTTPS communications, and strict input validation.</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="font-bold text-slate-800 block mb-0.5">GPS Privacy Standard</span>
                  <span>Explicit user consent for location tracking with single-tap stop controls.</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100">
              <button
                onClick={() => navigateTo('security')}
                className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs border border-emerald-200 transition-colors"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>View Security & Privacy Details</span>
              </button>
            </div>
          </div>
        </div>

        {/* Intellectual Property Notice Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                INTELLECTUAL PROPERTY NOTICE
              </h2>
              <p className="text-xs text-slate-500">
                Official ownership notice for Swastik Travels
              </p>
            </div>
          </div>

          <div className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3">
            <p>
              The original application concept, source code, application architecture, original UI implementation,
              branding, layouts, custom components, database structure, workflows, prompts, and original content
              created specifically for <strong>Swastik Travels</strong> are the intellectual property of{' '}
              <strong className="text-slate-900">DEVANDLA HARSHA VARDHAN</strong>, subject to applicable law and
              any third-party licenses.
            </p>
            <p>
              Unauthorized copying, reproduction, redistribution, modification, resale, or republishing of the
              original application or its proprietary components is not permitted without authorization from the
              owner, except where permitted by applicable law or third-party license terms.
            </p>
          </div>
        </div>

        {/* Third-Party Services & Technologies Notice */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
            <div className="w-9 h-9 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center">
              <Globe2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                THIRD-PARTY SERVICES & ATTRIBUTION NOTICE
              </h2>
              <p className="text-xs text-slate-500">
                Proper acknowledgement of external platforms, open-source libraries, and APIs
              </p>
            </div>
          </div>

          <div className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3">
            <blockquote className="border-l-4 border-emerald-500 pl-4 py-1 text-slate-800 italic bg-emerald-50/50 rounded-r-xl">
              &ldquo;Some functionality may use third-party services, APIs, open-source libraries, map services,
              payment services, AI providers, or external data sources. Such third-party technology and trademarks
              remain the property of their respective owners and are subject to their respective terms and licenses.&rdquo;
            </blockquote>

            <p className="pt-2 text-xs text-slate-600 font-medium">
              Swastik Travels respectfully incorporates and acknowledges the following technologies:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-1 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="font-bold text-slate-900 block">Google Maps Platform</span>
                <span className="text-slate-500 text-[11px]">
                  Maps JavaScript API, Routes API, Places API (New). Subject to Google Maps Terms of Service.
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="font-bold text-slate-900 block">Google Gemini API</span>
                <span className="text-slate-500 text-[11px]">
                  Powering the Swastik AI Travel Assistant via Google GenAI TypeScript SDK.
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="font-bold text-slate-900 block">React & Vite Ecosystem</span>
                <span className="text-slate-500 text-[11px]">
                  React 19, Vite 8, Tailwind CSS, Lucide Icons, and Motion under open-source licenses.
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="font-bold text-slate-900 block">Leaflet Maps</span>
                <span className="text-slate-500 text-[11px]">
                  Interactive OpenStreetMap tile navigation for secondary radar and offline caching.
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="font-bold text-slate-900 block">BookMyShow Integration</span>
                <span className="text-slate-500 text-[11px]">
                  BookMyShow trademarks and ticketing gateways belong to Bigtree Entertainment Pvt. Ltd.
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="font-bold text-slate-900 block">Express.js Proxy Server</span>
                <span className="text-slate-500 text-[11px]">
                  High-performance Node/Express backend for secure server-side secrets isolation.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Developer Contact & Copyright Box */}
        <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-slate-100 rounded-3xl p-6 sm:p-8 border border-emerald-200/80 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-extrabold text-slate-900 text-lg">
              Swastik Travels
            </h3>
            <p className="text-sm font-semibold text-emerald-800">
              Owned & Developed by DEVANDLA HARSHA VARDHAN
            </p>
            <p className="text-xs text-slate-600">
              Official Mobile: <strong className="text-slate-900">9391892404</strong>
            </p>
            <p className="text-xs text-slate-500 mt-2">
              © 2026 DEVANDLA HARSHA VARDHAN. All Rights Reserved.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="tel:9391892404"
              className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-md transition-colors flex items-center gap-2"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Contact Developer</span>
            </a>
            <button
              onClick={() => navigateTo('home')}
              className="px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 font-bold text-xs border border-slate-200 shadow-sm transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
