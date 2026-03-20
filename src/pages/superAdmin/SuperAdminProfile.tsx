import { motion } from "framer-motion";
import { useApi } from "../../hooks/useApi";
import { superAdminService } from "../../services/superadmin.service";
import {
  MailCheck,
  MailWarning,
  ShieldCheck,
  Building2,
  Users,
  LogOut
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const SuperAdminProfile = (): JSX.Element => {

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const { data, loading } = useApi(
    superAdminService.getSuperAdminProfile, // optional: can replace with profile API later
    { immediate: true }
  );

  const admins = data?.data || [];

  const handleLogout = async (): Promise<void> => {
    await logout();
    navigate("/", { replace: true });
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-60">
        <div className="animate-spin w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full" />
      </div>
    );

  const initials: string = user?.name
    ? user.name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
    : "SA";

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-5xl mx-auto bg-slate-900/60 backdrop-blur-xl 
      border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg space-y-8"
    >

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">

        <div className="flex items-center gap-6">

          <div className="w-20 h-20 rounded-2xl 
          bg-gradient-to-tr from-indigo-500 to-purple-600 
          flex items-center justify-center text-white 
          text-2xl font-bold shadow-lg shadow-indigo-500/30">
            {initials}
          </div>

          <div>
            <h1 className="text-2xl font-semibold text-white">
              {user?.name}
            </h1>

            <div className="flex items-center gap-3 mt-2 flex-wrap">

              {/* Role */}
              <span className="px-3 py-1 text-xs 
              bg-indigo-500/10 text-indigo-400 
              border border-indigo-500/30 
              rounded-full flex items-center gap-1">
                <ShieldCheck size={12} />
                SUPER ADMIN
              </span>

              {/* Email Status */}
              {user?.isEmailVerified ? (
                <span className="px-3 py-1 text-xs 
                bg-green-500/10 text-green-400 
                border border-green-500/30 
                rounded-full flex items-center gap-1">
                  <MailCheck size={12} />
                  Verified
                </span>
              ) : (
                <span className="px-3 py-1 text-xs 
                bg-yellow-500/10 text-yellow-400 
                border border-yellow-500/30 
                rounded-full flex items-center gap-1">
                  <MailWarning size={12} />
                  Not Verified
                </span>
              )}
            </div>
          </div>

        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 
          bg-red-600 hover:bg-red-500 
          text-white text-sm font-medium 
          rounded-lg transition shadow-lg shadow-red-600/30"
        >
          <LogOut size={16} />
          Logout
        </button>

      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

        {/* Email */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
          <p className="text-slate-400 text-sm">Email</p>
          <p className="text-white font-medium mt-1">
            {user?.email}
          </p>
        </div>

        {/* Total Admins */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
          <p className="text-slate-400 text-sm">Total Admins</p>
          <p className="text-white font-medium mt-1 flex items-center gap-2">
            <Users size={14} className="text-indigo-400" />
            {admins.length}
          </p>
        </div>

        {/* System Scope */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
          <p className="text-slate-400 text-sm">Access Level</p>
          <p className="text-white font-medium mt-1 flex items-center gap-2">
            <Building2 size={14} className="text-purple-400" />
            Global System Access
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

export default SuperAdminProfile;