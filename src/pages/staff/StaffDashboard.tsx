import StaffSidebar from "../../components/staff/StaffSidebar";
import StaffHeader from "../../components/staff/StaffHeader";

import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import { useMemo } from "react";
import { ClipboardList, Clock, CheckCircle, ArrowRight } from "lucide-react";
import { useApi } from "../../hooks/useApi";
import { staffService } from "../../services/staff.service";
import { useNavigate, useLocation } from "react-router-dom";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend
} from "recharts";

const COLORS = ["#3b82f6", "#22c55e", "#f59e0b", "#ef4444", "#a855f7"];

const StaffDashboard = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const isMainDashboard = location.pathname === "/staff";

  const { data, loading } = useApi(
    staffService.getAssignedComplaints,
    { immediate: true }
  );

  const complaints = data?.data || [];

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

  /* ---------- Chart Data ---------- */

  const statusChartData = [
    { name: "Resolved", value: stats.resolved },
    { name: "In Progress", value: stats.inProgress },
    { name: "Pending", value: stats.pending }
  ];

  const categoryChartData = complaints.reduce((acc: any[], complaint: any) => {

    const category = complaint.category || "Other";

    const existing = acc.find(c => c.name === category);

    if (existing) {
      existing.value += 1;
    } else {
      acc.push({ name: category, value: 1 });
    }

    return acc;

  }, []);

  const workloadChartData = [
    { name: "Assigned", value: stats.total },
    { name: "In Progress", value: stats.inProgress },
    { name: "Resolved", value: stats.resolved }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex text-white relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[300px] md:w-[400px] h-[300px] md:h-[400px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <StaffSidebar />

      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="flex-1 px-4 sm:px-6 md:px-8 py-6 md:py-8 flex flex-col gap-8 relative z-10"
      >

        <StaffHeader />

        {/* Stats Section */}
        {isMainDashboard && !loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

            <div className="bg-slate-900/60 border border-slate-700 rounded-2xl p-6 backdrop-blur-xl hover:border-blue-500/40 transition">
              <p className="text-slate-400 text-sm">Total Assigned</p>
              <div className="flex items-center justify-between mt-3">
                <h2 className="text-2xl font-bold">{stats.total}</h2>
                <ClipboardList className="text-blue-400" />
              </div>
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-6">
              <p className="text-yellow-400 text-sm">Pending / Active</p>
              <div className="flex items-center justify-between mt-3">
                <h2 className="text-2xl font-bold text-yellow-300">{stats.pending}</h2>
                <Clock className="text-yellow-400" />
              </div>
            </div>

            <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-6">
              <p className="text-green-400 text-sm">Resolved</p>
              <div className="flex items-center justify-between mt-3">
                <h2 className="text-2xl font-bold text-green-300">{stats.resolved}</h2>
                <CheckCircle className="text-green-400" />
              </div>
            </div>

          </div>
        )}

        {/* Quick Actions */}
        {isMainDashboard && !loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div
              onClick={() => navigate("/staff/assigned")}
              className="bg-slate-900/60 border border-slate-700 rounded-2xl p-6 backdrop-blur-xl hover:border-blue-500/40 transition cursor-pointer"
            >
              <h3 className="text-lg font-semibold mb-2">
                Review Assigned Complaints
              </h3>

              <p className="text-slate-400 text-sm mb-4">
                View and manage complaints assigned to you.
              </p>

              <div className="flex items-center gap-2 text-blue-400 text-sm">
                Go to complaints <ArrowRight size={14} />
              </div>
            </div>

            <div className="bg-slate-900/60 border border-slate-700 rounded-2xl p-6 backdrop-blur-xl hover:border-indigo-500/40 transition cursor-pointer">
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

        {/* Charts */}
        {isMainDashboard && !loading && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Status Chart */}
            <div className="bg-slate-900/60 border border-slate-700 rounded-2xl p-6 backdrop-blur-xl">
              <h3 className="text-lg font-semibold mb-4">
                Complaint Status
              </h3>

              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie
                    data={statusChartData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={60}
                    outerRadius={100}
                  >
                    {statusChartData.map((_: any, index: number) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Category Chart */}
            <div className="bg-slate-900/60 border border-slate-700 rounded-2xl p-6 backdrop-blur-xl">
              <h3 className="text-lg font-semibold mb-4">
                Complaints by Category
              </h3>

              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie
                    data={categoryChartData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={100}
                    label
                  >
                    {categoryChartData.map((_: any, index: number) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

          </div>
        )}

        {/* Workload Chart */}
        {isMainDashboard && !loading && (
          <div className="bg-slate-900/60 border border-slate-700 rounded-2xl p-6 backdrop-blur-xl">

            <h3 className="text-lg font-semibold mb-4">
              Workload Overview
            </h3>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={workloadChartData}>

                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />

                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />

                <Tooltip />
                <Legend />

                <Bar
                  dataKey="value"
                  fill="#6366f1"
                  radius={[6,6,0,0]}
                />

              </BarChart>
            </ResponsiveContainer>

          </div>
        )}

        {/* Nested Route */}
        <div className="flex-1">
          <Outlet />
        </div>

      </motion.div>
    </div>
  );
};

export default StaffDashboard;