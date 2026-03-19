import api from "../../services/api";
import { useAuth } from "../../hooks/useAuth";
import { motion } from "framer-motion";
import { MailCheck, MailWarning, ClipboardList } from "lucide-react";
import { useNavigate } from "react-router-dom";
import NotificationBell from "../shared/NotificationBell";



export default function StaffHeader(){
  const navigate = useNavigate();
  const { user } = useAuth();

  const resendVerification = async () => {
    try {
      await api.post("auth/resend-email-verification");
      alert("Verification email sent ✅");
    } catch (error) {
      alert("Failed to send email ❌");
    }
  };

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
    : "S";

  return (
    <motion.div
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-4 md:p-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4 shadow-lg"
    >
      {/* Gradient Glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/5 to-indigo-500/5 pointer-events-none" />

      {/* LEFT SECTION */}
      <div className="flex items-center gap-3 md:gap-4 z-10 min-w-0">

        {/* Avatar */}
        <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-base md:text-lg shadow-lg shadow-blue-500/30 flex-shrink-0">
          {initials}
        </div>

        {/* User Info */}
        <div className="min-w-0">
          <h1 className="text-lg md:text-2xl font-semibold text-white truncate">
            Staff Panel — {user?.name}
          </h1>

          <div className="flex flex-wrap items-center gap-2 mt-1">
            <p className="text-slate-400 text-xs md:text-sm truncate">
              {user?.email}
            </p>

            {user?.isEmailVerified ? (
              <span className="flex items-center gap-1 text-green-400 text-xs bg-green-500/10 px-2 py-1 rounded-full border border-green-500/30">
                <MailCheck size={12} />
                Verified
              </span>
            ) : (
              <span className="flex items-center gap-1 text-yellow-400 text-xs bg-yellow-500/10 px-2 py-1 rounded-full border border-yellow-500/30">
                <MailWarning size={12} />
                Not Verified
              </span>
            )}
          </div>
        </div>
      </div>

      {/* RIGHT SECTION */}
     <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 z-10 w-full md:w-auto items-center">
     
       {/* 🔔 Notification Bell */}
       <div className="relative z-50">
         <NotificationBell />
       </div>

        {/* Assigned Complaints */}
        <button
          onClick={() => navigate("/staff/assigned")}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 transition text-white rounded-lg text-sm font-medium shadow-lg shadow-blue-600/30 w-full sm:w-auto"
        >
          <ClipboardList size={16} />
          Assigned Complaints
        </button>

        {/* Verify Email */}
        {!user?.isEmailVerified && (
          <button
            onClick={resendVerification}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 rounded-lg text-sm font-medium border border-yellow-500/30 transition w-full sm:w-auto"
          >
            <MailWarning size={16} />
            Verify Email
          </button>
        )}

        {/* Change Password */}
       <button
  onClick={() => navigate("/account/change-password")}
  className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-sm font-medium border border-slate-700 transition w-full sm:w-auto"
>
  🔑 Change Password
</button>


      </div>
    </motion.div>
  );
}