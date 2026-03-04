import { motion } from "framer-motion";
import { useApi } from "../../hooks/useApi";
import { staffService } from "../../services/staff.service";
import { MailCheck, MailWarning, Shield, Building2, ClipboardList } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
const StaffProfile = () => {
  const { user } = useAuth();

  const { data, loading } = useApi(
    staffService.getStaffProfile,
    { immediate: true }
  );

  const profile = data?.data;

  if (loading)
    return (
      <div className="flex justify-center items-center h-60">
        <div className="animate-spin w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full" />
      </div>
    );

  if (!profile) return <div>No profile found</div>;

  const initials = profile.name
    ? profile.name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
    : "S";

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-5xl mx-auto bg-slate-900/60 backdrop-blur-xl 
      border border-slate-800 rounded-2xl p-8 shadow-lg space-y-8"
    >
      {/* Header Section */}
      <div className="flex items-center gap-6">
        <div className="w-20 h-20 rounded-2xl 
        bg-gradient-to-tr from-blue-500 to-indigo-600 
        flex items-center justify-center text-white 
        text-2xl font-bold shadow-lg shadow-blue-500/30">
          {initials}
        </div>

        <div>
          <h1 className="text-2xl font-semibold text-white">
            {user?.name}
          </h1>

          <div className="flex items-center gap-3 mt-2 flex-wrap">

            {/* Role Badge */}
            <span className="px-3 py-1 text-xs 
            bg-blue-500/10 text-blue-400 
            border border-blue-500/30 
            rounded-full flex items-center gap-1">
              <Shield size={12} />
              {profile.role || "STAFF"}
            </span>

            {/* Email Verification */}
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

      {/* Info Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

        {/* Email */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
          <p className="text-slate-400 text-sm">Email</p>
          <p className="text-white font-medium mt-1">
            {user?.email}
          </p>
        </div>

        {/* Department */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
          <p className="text-slate-400 text-sm">Department</p>
          <p className="text-white font-medium mt-1 flex items-center gap-2">
            <Building2 size={14} className="text-indigo-400" />
            {user?.department || "N/A"}
          </p>
        </div>

        {/* Assigned Complaints */}
        {/* <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
          <p className="text-slate-400 text-sm">Assigned Complaints</p>
          <p className="text-white font-medium mt-1 flex items-center gap-2">
            <ClipboardList size={14} className="text-blue-400" />
            {user?.assignedCount || 0}
          </p>
        </div> */}

        {/* College */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
          <p className="text-slate-400 text-sm">College</p>
          <p className="text-white font-medium mt-1">
            {user?.college || "N/A"}
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

export default StaffProfile;