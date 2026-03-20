import SuperAdminSidebar from "../../components/superadmin/SuperAdminSidebar";
import SuperAdminHeader from "../../components/superadmin/SuperAdminHeader";
import { College, Admin } from "../../types/superadmin.types";

import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useMemo } from "react";
import { Building2, Users, ArrowRight } from "lucide-react";
import { useApi } from "../../hooks/useApi";
import { superAdminService } from "../../services/superadmin.service";

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

const COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444"];

const SuperAdminDashboard = (): JSX.Element => {

  const navigate = useNavigate();
  const location = useLocation();
  const isMainDashboard = location.pathname === "/superadmin";

  // 🔥 API CALLS
  const { data: collegeData, loading: collegeLoading } = useApi(
    superAdminService.getColleges,
    { immediate: true }
  );

  const { data: adminData, loading: adminLoading } = useApi(
    superAdminService.getAdmins,
    { immediate: true }
  );

  // ✅ TYPE SAFE DATA
  const colleges: College[] = collegeData?.data ?? [];
  const admins: Admin[] = adminData?.data ?? [];

  const loading = collegeLoading || adminLoading;

  // 🔥 STATS
  const stats = useMemo(() => {
    return {
      totalColleges: colleges.length,
      totalAdmins: admins.length,
    };
  }, [colleges, admins]);

  // 🔥 CHART DATA
  const overviewChartData = [
    { name: "Colleges", value: stats.totalColleges },
    { name: "Admins", value: stats.totalAdmins }
  ];

  const distributionChartData = useMemo(() => {
    return colleges.map((c: College) => {
      const count = admins.filter(
        (a: Admin) => a.collegeId?._id === c._id
      ).length;

      return {
        name: c.name,
        value: count
      };
    });
  }, [colleges, admins]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex text-white relative overflow-hidden">

      {/* Glow */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-3xl" />

      <SuperAdminSidebar />

      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="flex-1 px-6 py-8 flex flex-col gap-8"
      >

        <SuperAdminHeader />

        {/* 🔥 STATS */}
        {isMainDashboard && !loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div className="bg-slate-900/60 border border-slate-700 rounded-2xl p-6">
              <p className="text-slate-400 text-sm">Total Colleges</p>
              <div className="flex justify-between mt-3">
                <h2 className="text-2xl font-bold">{stats.totalColleges}</h2>
                <Building2 className="text-indigo-400" />
              </div>
            </div>

            <div className="bg-slate-900/60 border border-slate-700 rounded-2xl p-6">
              <p className="text-slate-400 text-sm">Total Admins</p>
              <div className="flex justify-between mt-3">
                <h2 className="text-2xl font-bold">{stats.totalAdmins}</h2>
                <Users className="text-green-400" />
              </div>
            </div>

          </div>
        )}

        {/* 🔥 QUICK ACTIONS */}
        {isMainDashboard && !loading && (
          <div className="grid md:grid-cols-2 gap-6">

            <div
              onClick={() => navigate("/superadmin/admins")}
              className="bg-slate-900/60 border border-slate-700 rounded-2xl p-6 cursor-pointer hover:border-indigo-500"
            >
              <h3 className="text-lg font-semibold mb-2">Manage Admins</h3>
              <p className="text-slate-400 text-sm mb-4">
                View and manage all college admins
              </p>
              <div className="flex gap-2 text-indigo-400 text-sm">
                Go <ArrowRight size={14} />
              </div>
            </div>

            <div
              onClick={() => navigate("/superadmin/colleges")}
              className="bg-slate-900/60 border border-slate-700 rounded-2xl p-6 cursor-pointer hover:border-blue-500"
            >
              <h3 className="text-lg font-semibold mb-2">View Colleges</h3>
              <p className="text-slate-400 text-sm mb-4">
                Monitor all registered colleges
              </p>
              <div className="flex gap-2 text-blue-400 text-sm">
                Explore <ArrowRight size={14} />
              </div>
            </div>

          </div>
        )}

        {/* 🔥 CHARTS */}
        {isMainDashboard && !loading && (
          <div className="grid lg:grid-cols-2 gap-6">

            {/* Overview Pie */}
            <div className="bg-slate-900/60 border border-slate-700 rounded-2xl p-6">
              <h3 className="mb-4 font-semibold">System Overview</h3>

              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie
                    data={overviewChartData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={100}
                  >
                    {overviewChartData.map((_, i: number) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Distribution */}
            <div className="bg-slate-900/60 border border-slate-700 rounded-2xl p-6">
              <h3 className="mb-4 font-semibold">
                Admin Distribution per College
              </h3>

              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={distributionChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="name" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip
                  contentStyle={{
        backgroundColor: "#1e293b", // slate-800
        border: "1px solid #334155",
        borderRadius: "8px",
        color: "#e2e8f0"
      }}
      labelStyle={{ color: "#cbd5f5" }}
      cursor={{ fill: "rgba(99,102,241,0.1)" }} />
                  <Legend wrapperStyle={{ color: "#cbd5f5" }} />
                  <Bar dataKey="value" fill="#6366f1" />
                </BarChart>
              </ResponsiveContainer>
            </div>

          </div>
        )}

        {/* Nested Pages */}
        <div className="flex-1">
          <Outlet />
        </div>

      </motion.div>
    </div>
  );
};

export default SuperAdminDashboard;