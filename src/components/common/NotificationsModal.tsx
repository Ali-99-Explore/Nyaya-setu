import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, Bell, Calendar, FileText, CheckCircle2, MessageSquare, AlertCircle } from 'lucide-react';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({ isOpen, onClose }) => {
  const { notifications, markNotificationAsRead, role } = useApp();

  if (!isOpen) return null;

  const relevantNotifications = notifications.filter(
    (n) => !n.targetRole || n.targetRole === role
  );

  const getIcon = (type: string) => {
    switch (type) {
      case 'hearing':
        return <Calendar className="w-4 h-4 text-[#D96B27]" />;
      case 'analysis':
        return <FileText className="w-4 h-4 text-[#168C88]" />;
      case 'consultation':
        return <MessageSquare className="w-4 h-4 text-[#142B4A]" />;
      default:
        return <AlertCircle className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[80vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-[#FAF8F3]">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-[#142B4A]/10 text-[#142B4A]">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-[#142B4A]">Notifications</h3>
              <p className="text-[11px] text-slate-500">
                Updates for {role === 'citizen' ? 'Citizen' : role === 'lawyer' ? 'Advocate' : 'Law Student'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* List */}
        <div className="p-4 overflow-y-auto divide-y divide-slate-100 space-y-2">
          {relevantNotifications.length === 0 ? (
            <div className="py-8 text-center text-slate-400 text-xs">
              No recent notifications for this role.
            </div>
          ) : (
            relevantNotifications.map((n) => (
              <div
                key={n.id}
                onClick={() => markNotificationAsRead(n.id)}
                className={`pt-2.5 pb-2 cursor-pointer flex items-start gap-3 transition-colors rounded-lg px-2 ${
                  !n.read ? 'bg-[#168C88]/5 font-medium' : 'hover:bg-slate-50'
                }`}
              >
                <div className="p-2 rounded-xl bg-slate-100 shrink-0 mt-0.5">
                  {getIcon(n.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-xs font-semibold text-[#142B4A] truncate">{n.title}</h4>
                    <span className="text-[10px] text-slate-400 whitespace-nowrap">{n.timestamp}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">{n.message}</p>
                </div>
                {!n.read && (
                  <span className="w-2 h-2 rounded-full bg-[#168C88] mt-2 shrink-0" />
                )}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <span>Realistic simulated alerts</span>
          <button
            onClick={() => {
              relevantNotifications.forEach((n) => markNotificationAsRead(n.id));
            }}
            className="text-[#168C88] font-semibold hover:underline"
          >
            Mark all as read
          </button>
        </div>
      </div>
    </div>
  );
};
