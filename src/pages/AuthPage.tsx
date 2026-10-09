import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Compass,
  Lock,
  Mail,
  User,
  Phone,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
} from 'lucide-react';
import { SwastikLogo } from '../components/SwastikLogo';

export const AuthPage: React.FC<{ initialMode?: 'login' | 'register' }> = ({
  initialMode = 'login',
}) => {
  const { login, register, navigateTo, showToast } = useApp();

  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>(initialMode);
  const [showPassword, setShowPassword] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [forgotSuccess, setForgotSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    try {
      if (mode === 'login') {
        const res = await login(email, password);
        if (!res.success) {
          setErrorMsg(res.error || 'Failed to login');
        } else {
          navigateTo('dashboard');
        }
      } else if (mode === 'register') {
        if (password !== confirmPassword) {
          setErrorMsg('Passwords do not match');
          setIsLoading(false);
          return;
        }
        const res = await register({ name, email, phone, password });
        if (!res.success) {
          setErrorMsg(res.error || 'Failed to register');
        } else {
          navigateTo('dashboard');
        }
      } else if (mode === 'forgot') {
        if (!email.includes('@')) {
          setErrorMsg('Please enter a valid email address');
          setIsLoading(false);
          return;
        }
        setForgotSuccess(true);
        showToast('Password reset link sent to ' + email, 'success');
      }
    } catch {
      setErrorMsg('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-3xl p-6 sm:p-10 max-w-md w-full border border-slate-200/80 shadow-2xl space-y-6 animate-in zoom-in-95 duration-200">
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <div
            onClick={() => navigateTo('home')}
            className="flex justify-center cursor-pointer hover:opacity-95 transition-opacity"
          >
            <SwastikLogo variant="primary" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 font-heading pt-1">
            {mode === 'login'
              ? 'Sign in to Swastik Travels'
              : mode === 'register'
              ? 'Create Traveler Account'
              : 'Reset Password'}
          </h2>
          <p className="text-xs text-slate-500">
            {mode === 'login'
              ? 'Access your trips, saved bookings, and personalized recommendations.'
              : mode === 'register'
              ? 'Join Swastik Travels for seamless holidays and pilgrimage booking.'
              : 'Enter your registered email to receive a password reset link.'}
          </p>
        </div>

        {/* Error Notification */}
        {errorMsg && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs font-semibold">
            {errorMsg}
          </div>
        )}

        {forgotSuccess && mode === 'forgot' ? (
          <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-3">
            <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto" />
            <h3 className="font-bold text-sm text-emerald-950">Password Reset Email Dispatched</h3>
            <p className="text-xs text-emerald-800">
              We have sent password recovery instructions to <strong>{email}</strong>.
            </p>
            <button
              onClick={() => {
                setForgotSuccess(false);
                setMode('login');
              }}
              className="mt-2 text-xs font-bold text-emerald-700 underline"
            >
              Back to Login
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {/* Full Name for register */}
            {mode === 'register' && (
              <div>
                <label className="font-bold text-slate-700 block mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Vardhandharsha G."
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-hidden"
                    required
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div>
              <label className="font-bold text-slate-700 block mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. traveler@swastiktravels.com"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-hidden"
                  required
                />
              </div>
            </div>

            {/* Mobile number for register */}
            {mode === 'register' && (
              <div>
                <label className="font-bold text-slate-700 block mb-1">Mobile Number</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98480 12345"
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-hidden"
                    required
                  />
                </div>
              </div>
            )}

            {/* Password */}
            {mode !== 'forgot' && (
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="font-bold text-slate-700">Password</label>
                  {mode === 'login' && (
                    <button
                      type="button"
                      onClick={() => setMode('forgot')}
                      className="text-[11px] text-emerald-700 hover:underline"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-hidden"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )}

            {/* Confirm Password for register */}
            {mode === 'register' && (
              <div>
                <label className="font-bold text-slate-700 block mb-1">Confirm Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-hidden"
                    required
                  />
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
            >
              <span>
                {isLoading
                  ? 'Processing...'
                  : mode === 'login'
                  ? 'Sign In to Account'
                  : mode === 'register'
                  ? 'Complete Registration'
                  : 'Send Reset Link'}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* Mode Toggle Footer */}
        <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-500 space-y-3">
          {mode === 'login' ? (
            <p>
              Don't have an account?{' '}
              <button
                onClick={() => {
                  setErrorMsg('');
                  setMode('register');
                }}
                className="font-bold text-emerald-700 hover:underline"
              >
                Register now
              </button>
            </p>
          ) : (
            <p>
              Already registered?{' '}
              <button
                onClick={() => {
                  setErrorMsg('');
                  setMode('login');
                }}
                className="font-bold text-emerald-700 hover:underline"
              >
                Sign in
              </button>
            </p>
          )}

          <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-400">
            <p className="font-medium text-slate-500">© 2026 DEVANDLA HARSHA VARDHAN. All Rights Reserved.</p>
            <p className="mt-0.5 text-[10px]">
              Swastik Travels &bull; Founder, Owner & Lead Application Developer: Devandla Harsha Vardhan
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
