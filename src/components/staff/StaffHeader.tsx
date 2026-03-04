import api from "../../services/api";
import { useAuth } from "../../hooks/useAuth";
import { motion } from "framer-motion";
import { MailCheck, MailWarning, ClipboardList, KeyRound } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Props {
  setOpenModal: (val: boolean) => void;
}

export default function StaffHeader({ setOpenModal }: Props) {
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
      className="relative bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 flex justify-between items-center shadow-lg"
    >
      {/* Gradient Glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/5 to-indigo-500/5 pointer-events-none" />

      {/* Left Section */}
      <div className="flex items-center gap-4 z-10">
        {/* Avatar */}
        <div className="w-14 h-14 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-500/30">
          {initials}
        </div>

        <div>
          <h1 className="text-2xl font-semibold text-white">
            Staff Panel — {user?.name}
          </h1>

          <div className="flex items-center gap-2 mt-1">
            <p className="text-slate-400 text-sm">{user?.email}</p>

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

      {/* Right Section */}
      <div className="flex gap-3 z-10">

        {/* View Assigned Complaints */}
        <button
          onClick={() => navigate("/staff/assigned")}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 transition text-white rounded-lg text-sm font-medium shadow-lg shadow-blue-600/30"
        >
          <ClipboardList size={16} />
          Assigned Complaints
        </button>

        {/* Verify Email */}
        {!user?.isEmailVerified && (
          <button
            onClick={resendVerification}
            className="flex items-center gap-2 px-4 py-2 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 rounded-lg text-sm font-medium border border-yellow-500/30 transition"
          >
            <MailWarning size={16} />
            Verify Email
          </button>
        )}

        {/* Change Password */}
       <button
  onClick={() => setOpenModal(true)}
  className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-sm font-medium border border-slate-700 transition"
>
  <KeyRound size={16} />
  Change Password
</button>
      </div>
    </motion.div>
  );
}