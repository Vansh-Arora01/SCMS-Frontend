import StaffSidebar from "../../components/staff/StaffSidebar";
import StaffHeader from "../../components/staff/StaffHeader";
import ChangePassword from "../../components/shared/ChangePassword";
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import { ClipboardList, Clock, CheckCircle,ArrowRight } from "lucide-react";
import { useApi } from "../../hooks/useApi";
import { staffService } from "../../services/staff.service";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
const StaffDashboard = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const location = useLocation();
const isMainDashboard = location.pathname === "/staff";

  // 🔥 Fetch assigned complaints once
  const { data, loading } = useApi(
    staffService.getAssignedComplaints,
    { immediate: true }
  );

  const complaints = data?.data || [];

  // 🔥 Real Stats Calculation
  const stats = useMemo(() => {
    const total = complaints.length;
    const resolved = complaints.filter(
      (c: any) => c.status === "RESOLVED"
    ).length;

    const inProgress = complaints.filter(
      (c: any) => c.status === "IN_PROGRESS"
    ).length;

    const pending = total - resolved;

    return { total, resolved, pending, inProgress };
  }, [complaints]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex text-white relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] 
      bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <StaffSidebar />

      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="flex-1 p-8 flex flex-col gap-8 relative z-10"
      >
        <StaffHeader setOpenModal={setOpenModal} />

        {/* 🔥 Real Stats Section */}
        {isMainDashboard && !loading && (
          <div className="grid md:grid-cols-3 gap-6">

            <div className="bg-slate-900/60 border border-slate-700 
            rounded-2xl p-6 backdrop-blur-xl">
              <p className="text-slate-400 text-sm">Total Assigned</p>
              <div className="flex items-center justify-between mt-3">
                <h2 className="text-2xl font-bold">
                  {stats.total}
                </h2>
                <ClipboardList className="text-blue-400" />
              </div>
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/30 
            rounded-2xl p-6">
              <p className="text-yellow-400 text-sm">Pending / Active</p>
              <div className="flex items-center justify-between mt-3">
                <h2 className="text-2xl font-bold text-yellow-300">
                  {stats.pending}
                </h2>
                <Clock className="text-yellow-400" />
              </div>
            </div>

            <div className="bg-green-500/10 border border-green-500/30 
            rounded-2xl p-6">
              <p className="text-green-400 text-sm">Resolved</p>
              <div className="flex items-center justify-between mt-3">
                <h2 className="text-2xl font-bold text-green-300">
                  {stats.resolved}
                </h2>
                <CheckCircle className="text-green-400" />
              </div>
            </div>
          </div>
        )}

         {/* Quick Actions */}
         {isMainDashboard && !loading && (
          <div className="grid md:grid-cols-2 gap-6">

          <div className="bg-slate-900/60 border border-slate-700 
          rounded-2xl p-6 backdrop-blur-xl hover:border-blue-500/40 transition cursor-pointer">
            <h3 className="text-lg font-semibold mb-2">
              Review Assigned Complaints
            </h3>
            <p className="text-slate-400 text-sm mb-4">
              View and manage complaints assigned to you.
            </p>
            <div 
            onClick={() => navigate("/staff/assigned")}
            className="flex items-center gap-2 text-blue-400 text-sm">
              Go to complaints <ArrowRight size={14} />
              
            </div>
          </div>

          <div className="bg-slate-900/60 border border-slate-700 
          rounded-2xl p-6 backdrop-blur-xl hover:border-indigo-500/40 transition cursor-pointer">
            <h3 className="text-lg font-semibold mb-2">
              Monitor Performance
            </h3>
            <p className="text-slate-400 text-sm mb-4">
              Track resolution time and performance metrics.
            </p>
            <div className="flex items-center gap-2 text-indigo-400 text-sm">
              View stats <ArrowRight size={14} />
            </div>
          </div>
        </div>
         )}
        




        {/* Nested Route Content */}
        <div className="flex-1">
          <Outlet />
        </div>
      </motion.div>

      {/* Change Password Modal */}
      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md">
          <div className="relative w-full max-w-3xl mx-4 rounded-2xl 
          bg-slate-900 border border-slate-700 shadow-[0_0_60px_rgba(0,0,0,0.6)] overflow-hidden">

            <button
              onClick={() => setOpenModal(false)}
              className="absolute top-4 right-4 z-20 
              w-9 h-9 flex items-center justify-center 
              rounded-full bg-slate-800/80 hover:bg-slate-700 
              border border-slate-600 text-white transition"
            >
              ✕
            </button>

            <ChangePassword />
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffDashboard;