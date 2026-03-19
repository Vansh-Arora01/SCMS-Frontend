import { useEffect, useState } from "react";
import { notificationService } from "../../services/notification.service";
import {
  Notification,
  NotificationType,
} from "../../types/notification.types";
import { motion } from "framer-motion";
import { Bell, CheckCircle, AlertCircle } from "lucide-react";

export default function NotificationPanel() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = await notificationService.getNotifications();

        // ✅ data is already Notification[]
        setNotifications(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch notifications", err);
        setNotifications([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  // ✅ safer type handling
  const getIcon = (type: NotificationType | string) => {
    switch (type?.toUpperCase()) {
      case "RESOLVED":
        return <CheckCircle size={18} />;
      case "ASSIGNED":
        return <Bell size={18} />;
      case "REJECTED":
        return <AlertCircle size={18} />;
      default:
        return <Bell size={18} />;
    }
  };

  // ✅ safe date handling
  const formatTime = (date?: string) => {
    if (!date) return "Unknown time";

    const created = new Date(date).getTime();
    if (isNaN(created)) return "Invalid date";

    const now = Date.now();
    const diffMinutes = Math.floor((now - created) / 60000);

    if (diffMinutes < 1) return "Just now";
    if (diffMinutes < 60) return `${diffMinutes} min ago`;
    if (diffMinutes < 1440) return `${Math.floor(diffMinutes / 60)} hrs ago`;
    return `${Math.floor(diffMinutes / 1440)} days ago`;
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="h-20 bg-slate-800/50 rounded-xl animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (!notifications.length) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mb-4">
          <Bell className="text-slate-500" />
        </div>
        <h3 className="text-lg font-semibold text-white">
          No Notifications
        </h3>
        <p className="text-slate-400 text-sm mt-1">
          You're all caught up 🎉
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {notifications.map((n, index) => {
        const isRead = Boolean(n.isRead);

        return (
          <motion.div
            key={n._id || index} // ✅ fallback added
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -3 }}
            className={`relative p-5 rounded-2xl border backdrop-blur-xl transition-all ${
              isRead
                ? "bg-slate-900/50 border-slate-800"
                : "bg-indigo-600/10 border-indigo-500/30 shadow-md shadow-indigo-500/10"
            }`}
          >
            {!isRead && (
              <span className="absolute top-4 right-4 w-2 h-2 bg-indigo-500 rounded-full" />
            )}

            <div className="flex items-start gap-4">
              <div
                className={`p-2 rounded-lg ${
                  isRead
                    ? "bg-slate-800 text-slate-400"
                    : "bg-indigo-600/20 text-indigo-400"
                }`}
              >
                {getIcon(n.type)}
              </div>

              <div className="flex-1">
                <h4 className="text-white font-semibold">
                  {n.title}
                </h4>
                <p className="text-slate-400 text-sm mt-1">
                  {n.message}
                </p>
                <p className="text-xs text-slate-500 mt-2">
                  {formatTime(n.createdAt)}
                </p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}