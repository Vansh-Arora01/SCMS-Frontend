import { Bell } from "lucide-react";
import { useState, useEffect } from "react";
import NotificationPanel from "./NotificationPanel";
import { notificationService } from "../../services/notification.service";
import { createPortal } from "react-dom";

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(0);

  const fetchCount = async () => {
    try {
      const c = await notificationService.getUnreadCount();
      setCount(c);
    } catch (err) {
      console.error("Count error", err);
    }
  };

  useEffect(() => {
    fetchCount();

    // auto refresh count
    const interval = setInterval(fetchCount, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
  const handleClickOutside = (e: any) => {
    if (!e.target.closest(".notification-container")) {
      setOpen(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);
  return (
  <div className="relative notification-container">

    {/* 🔔 Bell */}
    <button
      onClick={() => setOpen(!open)}
      className="relative p-2 rounded-lg hover:bg-slate-800"
    >
      <Bell className="text-white" />

      {count > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-xs px-1 rounded-full">
          {count}
        </span>
      )}
    </button>

    {/* 🔥 Portal Dropdown */}
    {open &&
      createPortal(
        <div className="fixed top-20 right-6 w-[350px] bg-slate-900 border border-slate-700 rounded-xl shadow-lg p-4 z-[9999] max-h-[400px] overflow-y-auto notification-container">
          <NotificationPanel />
        </div>,
        document.getElementById("portal-root")!
      )}

  </div>
);
}