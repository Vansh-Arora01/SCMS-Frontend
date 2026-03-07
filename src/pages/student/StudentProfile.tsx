import { useAuth } from "../../hooks/useAuth";
import { motion } from "framer-motion";
import {
  MailCheck,
  MailWarning,
  GraduationCap,
  Shield,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const StudentProfile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
    : "U";

  const handleLogout = async () => {
    await logout();
    navigate("/", { replace: true });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-4xl mx-auto bg-slate-900/60 backdrop-blur-xl 
      border border-slate-800 rounded-2xl p-5 sm:p-6 md:p-8 shadow-lg"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-8">

        {/* Left Section */}
        <div className="flex items-center gap-4 sm:gap-6">

          <div
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl 
            bg-gradient-to-tr from-indigo-500 to-purple-500 
            flex items-center justify-center text-white 
            text-xl sm:text-2xl font-bold shadow-lg shadow-indigo-500/30"
          >
            {initials}
          </div>

          <div>
            <h1 className="text-xl sm:text-2xl font-semibold text-white">
              {user?.name}
            </h1>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-2">

              {/* Role Badge */}
              <span
                className="px-3 py-1 text-xs 
                bg-indigo-500/10 text-indigo-400 
                border border-indigo-500/30 
                rounded-full flex items-center gap-1"
              >
                <Shield size={12} />
                {user?.role}
              </span>

              {/* Email Verification */}
              {user?.isEmailVerified ? (
                <span
                  className="px-3 py-1 text-xs 
                  bg-green-500/10 text-green-400 
                  border border-green-500/30 
                  rounded-full flex items-center gap-1"
                >
                  <MailCheck size={12} />
                  Verified
                </span>
              ) : (
                <span
                  className="px-3 py-1 text-xs 
                  bg-yellow-500/10 text-yellow-400 
                  border border-yellow-500/30 
                  rounded-full flex items-center gap-1"
                >
                  <MailWarning size={12} />
                  Not Verified
                </span>
              )}

            </div>
          </div>

        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 px-4 py-2 
          bg-red-600 hover:bg-red-500 
          text-white text-sm font-medium 
          rounded-lg transition shadow-lg shadow-red-600/30
          w-full sm:w-auto"
        >
          <LogOut size={16} />
          Logout
        </button>

      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">

        {/* Email */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
          <p className="text-slate-400 text-sm">Email</p>
          <p className="text-white font-medium mt-1 break-words">
            {user?.email}
          </p>
        </div>

        {/* College */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
          <p className="text-slate-400 text-sm">College</p>
          <p className="text-white font-medium mt-1 flex items-center gap-2">
            <GraduationCap size={14} className="text-indigo-400" />
            {user?.college || "N/A"}
          </p>
        </div>

        {/* Enrollment */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
          <p className="text-slate-400 text-sm">Enrollment</p>
          <p className="text-white font-medium mt-1">
            {user?.enrollment}
          </p>
        </div>

        {/* Account Status */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
          <p className="text-slate-400 text-sm">Account Status</p>
          <p className="text-green-400 font-medium mt-1">
            Active
          </p>
        </div>

      </div>
    </motion.div>
  );
};

export default StudentProfile;