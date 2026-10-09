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
  ShieldCheck,
  Lock,
  MapPin,
  EyeOff,
  Server,
  FileCheck,
  UserCheck,
  Phone,
  Radio,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';

export const SecurityPrivacyPage: React.FC = () => {
  const { liveLocation, startLiveLocation, stopLiveLocation, navigateTo } = useApp();

  return (
    <div className="bg-slate-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-3 border border-emerald-400/30">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span>Application Trust & Security Standard</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-heading">
            Security & Privacy Architecture
          </h1>
          <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
            Swastik Travels implements strict security principles, zero-secret frontend leakage,
            transparent GPS controls, and robust user data safeguards designed by owner and developer{' '}
            <strong className="text-white">DEVANDLA HARSHA VARDHAN</strong>.
          </p>
        </div>

        {/* Live Location Privacy Control Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Live GPS Location Privacy</h3>
                <p className="text-xs text-slate-500">
                  Explicit user-controlled location access with no background or covert tracking
                </p>
              </div>
            </div>

            <span
              className={`px-3 py-1 rounded-full text-xs font-bold ${
                liveLocation.isTracking
                  ? 'bg-rose-100 text-rose-700 animate-pulse'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              {liveLocation.isTracking ? 'Active Tracking' : 'Tracking Stopped'}
            </span>
          </div>

          <blockquote className="text-xs sm:text-sm text-slate-700 bg-slate-50 p-4 rounded-2xl border border-slate-200/80 leading-relaxed">
            &ldquo;Location permission is requested only when required for location-based features. Location data
            must not be secretly tracked or collected.&rdquo;
          </blockquote>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <div className="text-xs text-slate-600">
              <p className="font-semibold text-slate-900">Current GPS Status:</p>
              <p className="text-slate-500">
                {liveLocation.isTracking
                  ? `Active on: ${liveLocation.address || 'Real-time coordinate radar'}`
                  : 'GPS sensors are inactive. No continuous location data is gathered.'}
              </p>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              {liveLocation.isTracking ? (
                <button
                  onClick={stopLiveLocation}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md transition-colors"
                >
                  🛑 Stop Live Location
                </button>
              ) : (
                <button
                  onClick={startLiveLocation}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-colors"
                >
                  📍 Start Live Location
                </button>
              )}
            </div>
          </div>
        </div>

        {/* 4 Pillars of Application Security */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pillar 1: API & Secret Security */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 space-y-4">
            <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center">
              <Server className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">API Key & Secrets Isolation</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Never expose private API keys, database admin tokens, or LLM keys in frontend browser bundles,
              localStorage, sessionStorage, or public repositories.
            </p>
            <ul className="text-xs text-slate-700 space-y-2 pt-1 font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Backend Express proxy routes for Gemini AI processing</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Environment variable isolation (`.env` server secrets)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Restricted domain referrers for Google Maps Platform</span>
              </li>
            </ul>
          </div>

          {/* Pillar 2: User Account & Data Protection */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 space-y-4">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">User Data & Session Protection</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Safeguard user bookings, profile settings, emergency contacts, and personal preferences with
              modern data hygiene and input validation.
            </p>
            <ul className="text-xs text-slate-700 space-y-2 pt-1 font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Zero plaintext password exposure</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Sanitized inputs to prevent cross-site scripting (XSS)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Protected traveler privacy for itineraries and tickets</span>
              </li>
            </ul>
          </div>

          {/* Pillar 3: AI Assistant & LLM Safety */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 space-y-4">
            <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">AI Safety & Prompt Integrity</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              The Swastik AI Travel Assistant operates with strict system instructions, safe prompt
              templates, rate limiting, and defensive fallback engines.
            </p>
            <ul className="text-xs text-slate-700 space-y-2 pt-1 font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Transparent AI identity disclosure</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>No sensitive personal data sent to prompt contexts</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Graceful offline fallback for network disruptions</span>
              </li>
            </ul>
          </div>

          {/* Pillar 4: Third-Party License Compliance */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 space-y-4">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <FileCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Third-Party Technology Ownership</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Third-party APIs, maps, SDKs, open-source modules, and services remain the exclusive property of
              their respective owners and governed by their respective licenses.
            </p>
            <ul className="text-xs text-slate-700 space-y-2 pt-1 font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Preservation of all open-source licensing notices</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Full compliance with Google Maps Platform Terms of Service</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>No false proprietary claims over external services</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Ownership, Developer & Copyright Footer Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <UserCheck className="w-4 h-4 text-emerald-700" />
              <h4 className="font-bold text-slate-900 text-sm">
                Owner & Developer: DEVANDLA HARSHA VARDHAN
              </h4>
            </div>
            <p className="text-xs text-slate-600">
              Mobile Contact: <strong className="text-slate-900">9391892404</strong>
            </p>
            <p className="text-xs text-slate-500 pt-1">
              © 2026 DEVANDLA HARSHA VARDHAN. All Rights Reserved.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigateTo('developer')}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors"
            >
              Developer Profile
            </button>
            <button
              onClick={() => navigateTo('about')}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors"
            >
              About Application
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
