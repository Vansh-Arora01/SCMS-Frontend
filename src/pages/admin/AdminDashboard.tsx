// import { Outlet, NavLink } from "react-router-dom";
// import {
//   LayoutDashboard,
//   Home,
//   ClipboardList,
//   UserCog,
//   Users,
//   User,
//   Menu,
//   X,
// } from "lucide-react";
// import { useState } from "react";
// import { useAuth } from "../../hooks/useAuth";
// import AdminHeader from "../../components/admin/AdminHeader";


// const AdminDashboard = () => {
 
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const { user } = useAuth();

//   const navItemStyle = ({ isActive }: { isActive: boolean }) =>
//     `flex items-center gap-3 px-3 lg:px-4 py-2 lg:py-3 rounded-xl transition-all duration-300 ${
//       isActive
//         ? "bg-indigo-600/20 text-indigo-400 border border-indigo-500/30"
//         : "text-slate-400 hover:text-white hover:bg-slate-800/50"
//     }`;

//   return (
//     <div className="flex min-h-screen bg-[#0f172a] text-slate-200">

//       {/* Background Glow */}
//       <div className="fixed inset-0 pointer-events-none">
//         <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-500/10 blur-[140px] rounded-full" />
//         <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-500/10 blur-[140px] rounded-full" />
//       </div>

//       {/* Overlay mobile */}
//       {sidebarOpen && (
//         <div
//           onClick={() => setSidebarOpen(false)}
//           className="fixed inset-0 bg-black/50 z-30 md:hidden"
//         />
//       )}

//       {/* Sidebar */}
//       <aside
//         className={`fixed md:relative top-0 left-0 min-h-screen w-64 lg:w-72 flex-shrink-0 bg-slate-900/95 backdrop-blur-xl border-r border-slate-800 p-4 lg:p-6 flex flex-col z-40 transform transition-transform duration-300
//         ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
//         md:translate-x-0`}
//       >

//         {/* Close button */}
//         <button
//           onClick={() => setSidebarOpen(false)}
//           className="absolute top-4 right-4 md:hidden text-white"
//         >
//           <X size={22} />
//         </button>

//         {/* Logo */}
//         <div className="flex items-center gap-3 mb-10">
//           <div className="p-2 bg-indigo-600 rounded-lg shadow-lg shadow-indigo-600/30">
//             <LayoutDashboard size={20} className="text-white" />
//           </div>
//           <h2 className="text-lg lg:text-xl font-bold text-white">
//             Admin Panel
//           </h2>
//         </div>

//         {/* Navigation */}
//         <nav className="flex flex-col gap-2 flex-1">

//           <NavLink to="/" className={navItemStyle}>
//             <Home size={18} />
//             Home
//           </NavLink>

//           <NavLink to="/admin/unassigned" end className={navItemStyle}>
//             <ClipboardList size={18} />
//             Unassigned Complaints
//           </NavLink>

//           <NavLink to="/admin/sorted" className={navItemStyle}>
//             <ClipboardList size={18} />
//             Sorted Complaints
//           </NavLink>

//           <NavLink to="/admin/staff" className={navItemStyle}>
//             <Users size={18} />
//             Staff Management
//           </NavLink>

//           <NavLink to="/admin/profile" className={navItemStyle}>
//             <User size={18} />
//             Profile
//           </NavLink>

//         </nav>

//         {/* User Info */}
//         <div className="mt-auto pt-6 border-t border-slate-800">
//           <div className="flex items-center gap-3">

//             <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-xs font-bold text-white">
//               {user?.name
//                 ? user.name
//                     .split(" ")
//                     .map((n: string) => n[0])
//                     .join("")
//                     .toUpperCase()
//                 : "A"}
//             </div>

//             <div>
//               <p className="text-sm font-semibold text-white">
//                 {user?.name || "Admin"}
//               </p>
//               <p className="text-xs text-slate-500">
//                 Role: Admin
//               </p>
//             </div>

//           </div>
//         </div>

//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 flex flex-col relative z-0 min-w-0 w-full">

//         <div className="flex-1 px-4 py-5 md:px-6 md:py-6 lg:px-8 lg:py-8 overflow-y-auto space-y-6">

//           {/* Mobile Menu */}
//           <div className="md:hidden flex items-center">
//             <button
//               onClick={() => setSidebarOpen(true)}
//               className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700"
//             >
//               <Menu size={22} />
//             </button>
//           </div>

//           {/* Header */}
//           <AdminHeader  />

//           {/* Dynamic Page */}
//           <Outlet />

//         </div>

//       </main>

     
      

//     </div>
//   );
// };

// export default AdminDashboard;



import { Outlet, NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Home,
  ClipboardList,
  Users,
  User,
  Menu,
  X,
  CheckCircle,
  Clock
} from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../hooks/useAuth";
import { useApi } from "../../hooks/useApi";
import { useAdminService } from "../../services/admin.service";
import AdminHeader from "../../components/admin/AdminHeader";

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

const COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444", "#3b82f6"];

const AdminDashboard = () => {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();

  const location = useLocation();
  const isMainDashboard = location.pathname === "/admin";


  const { getAdminStats } = useAdminService();


  const { data, loading } = useApi(getAdminStats, { immediate: true });

  
// console.log("ADMIN STATS:", data);

  const stats = data?.data?.data || {};


  const statusChartData = [
  { name: "Resolved", value: stats.resolvedComplaints || 0 },
  { name: "Pending", value: stats.pendingComplaints || 0 },
  { name: "Unassigned", value: stats.unassignedComplaints || 0 },
];

  const navItemStyle = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-3 lg:px-4 py-2 lg:py-3 rounded-xl transition-all duration-300 ${
      isActive
        ? "bg-indigo-600/20 text-indigo-400 border border-indigo-500/30"
        : "text-slate-400 hover:text-white hover:bg-slate-800/50"
    }`;

  const categoryChartData =
    stats?.complaintsByCategory?.map((item: any) => ({
      name: item._id,
      value: item.count
    })) || [];

  return (
    <div className="flex min-h-screen bg-[#0f172a] text-slate-200">

      {/* Background Glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-500/10 blur-[140px] rounded-full" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-500/10 blur-[140px] rounded-full" />
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:relative top-0 left-0 min-h-screen w-64 lg:w-72 flex-shrink-0 bg-slate-900/95 backdrop-blur-xl border-r border-slate-800 p-4 lg:p-6 flex flex-col z-40 transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0`}
      >

        {/* Close Button */}
        <button
          onClick={() => setSidebarOpen(false)}
          className="absolute top-4 right-4 md:hidden text-white"
        >
          <X size={22} />
        </button>

        {/* Logo */}
        <div className="flex items-center gap-3 mb-10">
          <div className="p-2 bg-indigo-600 rounded-lg shadow-lg shadow-indigo-600/30">
            <LayoutDashboard size={20} className="text-white" />
          </div>
          <h2 className="text-lg lg:text-xl font-bold text-white">
            Admin Panel
          </h2>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2 flex-1">

          <NavLink to="/" className={navItemStyle}>
            <Home size={18} />
            Home
          </NavLink>

          <NavLink to="/admin/unassigned" className={navItemStyle}>
            <ClipboardList size={18} />
            Unassigned Complaints
          </NavLink>

          <NavLink to="/admin/sorted" className={navItemStyle}>
            <ClipboardList size={18} />
            Sorted Complaints
          </NavLink>

          <NavLink to="/admin/staff" className={navItemStyle}>
            <Users size={18} />
            Staff Management
          </NavLink>

          <NavLink to="/admin/profile" className={navItemStyle}>
            <User size={18} />
            Profile
          </NavLink>

        </nav>

        {/* User Info */}
        <div className="mt-auto pt-6 border-t border-slate-800">
          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-xs font-bold text-white">
              {user?.name
                ? user.name
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")
                    .toUpperCase()
                : "A"}
            </div>

            <div>
              <p className="text-sm font-semibold text-white">
                {user?.name || "Admin"}
              </p>
              <p className="text-xs text-slate-500">
                Role: Admin
              </p>
            </div>

          </div>
        </div>

      </aside>

      {/* Main Content */}
      <motion.main
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="flex-1 flex flex-col relative z-0 min-w-0 w-full overflow-y-auto"

      >

        <div className="flex-1 px-4 py-5 md:px-6 md:py-6 lg:px-8 lg:py-8 space-y-8">

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700"
            >
              <Menu size={22} />
            </button>
          </div>

          {/* Header */}
          <AdminHeader />

          {/* Stats Cards */}
          {isMainDashboard && !loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">

              <div className="bg-slate-900/60 border border-slate-700 rounded-2xl p-6 backdrop-blur-xl">
                <p className="text-slate-400 text-sm">Total Complaints</p>
                <div className="flex items-center justify-between mt-3">
                  <h2 className="text-2xl font-bold">
                    {stats.totalComplaints}
                  </h2>
                  <ClipboardList className="text-blue-400" />
                </div>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-6">
                <p className="text-green-400 text-sm">Resolved</p>
                <div className="flex items-center justify-between mt-3">
                  <h2 className="text-2xl font-bold text-green-300">
                    {stats.resolvedComplaints}
                  </h2>
                  <CheckCircle className="text-green-400" />
                </div>
              </div>

              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-6">
                <p className="text-yellow-400 text-sm">Pending</p>
                <div className="flex items-center justify-between mt-3">
                  <h2 className="text-2xl font-bold text-yellow-300">
                    {stats.pendingComplaints}
                  </h2>
                  <Clock className="text-yellow-400" />
                </div>
              </div>

              <div className="bg-indigo-500/10 border border-indigo-500/30 rounded-2xl p-6">
                <p className="text-indigo-400 text-sm">Total Staff</p>
                <div className="flex items-center justify-between mt-3">
                  <h2 className="text-2xl font-bold text-indigo-300">
                    {stats.totalStaff}
                  </h2>
                  <Users className="text-indigo-400" />
                </div>
              </div>

            </div>
          )}

          {/* Category Chart */}
          {isMainDashboard && !loading && (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

    {/* Category Pie Chart */}
    <div className="bg-slate-900/60 border border-slate-700 rounded-2xl p-6 backdrop-blur-xl 
transition-all duration-300 
hover:border-indigo-500/40 
hover:shadow-lg hover:shadow-indigo-500/20">

      <h3 className="text-lg font-semibold mb-4">
        Complaints by Category
      </h3>

      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={categoryChartData}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            label
          >
            {categoryChartData.map((_:any, index:number) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>

    </div>

    {/* Status Donut Chart */}
    <div className="bg-slate-900/60 border border-slate-700 rounded-2xl p-6 backdrop-blur-xl 
transition-all duration-300 
hover:border-indigo-500/40 
hover:shadow-lg hover:shadow-indigo-500/20">

      <h3 className="text-lg font-semibold mb-4">
        Complaint Status
      </h3>

      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={statusChartData}
            dataKey="value"
            nameKey="name"
            innerRadius={60}
            outerRadius={100}
          >
            {statusChartData.map((_:any, index:number) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>

    </div>

  </div>
)}
{isMainDashboard && !loading && (
  <div className="bg-slate-900/60 border border-slate-700 rounded-2xl p-6 backdrop-blur-xl 
transition-all duration-300 
hover:border-indigo-500/40 
hover:shadow-lg hover:shadow-indigo-500/20">

    <h3 className="text-lg font-semibold mb-4">
      Complaint Overview
    </h3>

    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={[
          { name: "Total", value: stats.totalComplaints || 0 },
          { name: "Resolved", value: stats.resolvedComplaints || 0 },
          { name: "Pending", value: stats.pendingComplaints || 0 },
          { name: "Staff", value: stats.totalStaff || 0 }
        ]}
      >

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

          {/* Nested Routes */}
          <Outlet />

        </div>

      </motion.main>

    </div>
  );
};

export default AdminDashboard;