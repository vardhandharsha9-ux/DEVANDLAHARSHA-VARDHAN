import React, { useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Bell, Check, Trash2, Calendar, MapPin, Ticket, Info, ExternalLink } from 'lucide-react';

interface NotificationDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationDropdown: React.FC<NotificationDropdownProps> = ({ isOpen, onClose }) => {
  const { notifications, markNotificationAsRead, clearAllNotifications, navigateTo } = useApp();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const getIcon = (type: string) => {
    switch (type) {
      case 'booking':
        return <Ticket className="w-4 h-4 text-emerald-600" />;
      case 'trip':
        return <Calendar className="w-4 h-4 text-amber-600" />;
      case 'location':
        return <MapPin className="w-4 h-4 text-cyan-600" />;
      default:
        return <Info className="w-4 h-4 text-blue-600" />;
    }
  };

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-100 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200"
    >
      <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell className="w-5 h-5 text-emerald-400" />
          <h3 className="font-semibold text-sm">Notifications</h3>
          <span className="bg-emerald-500/20 text-emerald-300 text-xs px-2 py-0.5 rounded-full font-medium">
            {notifications.length}
          </span>
        </div>
        {notifications.length > 0 && (
          <button
            onClick={clearAllNotifications}
            className="text-xs text-slate-400 hover:text-rose-300 flex items-center gap-1 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" /> Clear all
          </button>
        )}
      </div>

      <div className="max-h-96 overflow-y-auto divide-y divide-slate-100">
        {notifications.length === 0 ? (
          <div className="p-8 text-center text-slate-400">
            <Bell className="w-8 h-8 mx-auto mb-2 text-slate-300 stroke-[1.5]" />
            <p className="text-sm font-medium">No notifications yet</p>
            <p className="text-xs text-slate-400 mt-1">We'll alert you on trips and bookings updates.</p>
          </div>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => {
                markNotificationAsRead(n.id);
                if (n.linkToRoute) {
                  navigateTo(n.linkToRoute);
                  onClose();
                }
              }}
              className={`p-3.5 hover:bg-slate-50 transition-colors cursor-pointer flex gap-3 ${
                !n.isRead ? 'bg-emerald-50/40' : ''
              }`}
            >
              <div className="mt-0.5 p-2 bg-slate-100 rounded-xl shrink-0 h-fit">
                {getIcon(n.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <h4 className="text-xs font-semibold text-slate-800 truncate">{n.title}</h4>
                  <span className="text-[10px] text-slate-400 shrink-0">{n.timestamp}</span>
                </div>
                <p className="text-xs text-slate-600 mt-0.5 line-clamp-2 leading-relaxed">{n.message}</p>
                {n.linkToRoute && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 hover:text-emerald-700 mt-1">
                    View Details <ExternalLink className="w-3 h-3" />
                  </span>
                )}
              </div>
              {!n.isRead && (
                <div className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 self-center"></div>
              )}
            </div>
          ))
        )}
      </div>

      {notifications.length > 0 && (
        <div className="p-2.5 bg-slate-50 text-center border-t border-slate-100">
          <button
            onClick={() => {
              notifications.forEach((n) => markNotificationAsRead(n.id));
              onClose();
            }}
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center justify-center gap-1.5 w-full py-1"
          >
            <Check className="w-3.5 h-3.5" /> Mark all as read
          </button>
        </div>
      )}
    </div>
  );
};
