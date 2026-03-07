import { Outlet, NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Vote,
  Bell,
  User,
  Home,
  Menu,
  X,
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import StudentHeader from "../../components/student/StudentHeader";

import { useState } from "react";

const StudentDashboard = () => {
  
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();

  const navItemStyle = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-3 lg:px-4 py-2 lg:py-3 rounded-xl transition-all duration-300 ${
      isActive
        ? "bg-indigo-600/20 text-indigo-400 border border-indigo-500/30"
        : "text-slate-400 hover:text-white hover:bg-slate-800/50"
    }`;

  return (
    <div className="flex min-h-screen bg-[#0f172a] text-slate-200">

      {/* Background Glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 lg:w-96 lg:h-96 bg-indigo-500/10 blur-[140px] rounded-full" />
        <div className="absolute -bottom-40 -right-40 w-80 h-80 lg:w-96 lg:h-96 bg-purple-500/10 blur-[140px] rounded-full" />
      </div>

      {/* Overlay for mobile */}
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

        {/* Close button (mobile) */}
        <button
          onClick={() => setSidebarOpen(false)}
          className="absolute top-4 right-4 md:hidden text-white"
        >
          <X size={22} />
        </button>

        {/* Logo */}
        <div className="flex items-center gap-3 mb-8 lg:mb-10">
          <div className="p-2 bg-indigo-600 rounded-lg shadow-lg shadow-indigo-600/30">
            <LayoutDashboard size={20} className="text-white" />
          </div>
          <h2 className="text-lg lg:text-xl font-bold text-white">
            Student Panel
          </h2>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2 flex-1">

          <NavLink to="/" className={navItemStyle}>
            <Home size={18} />
            Home
          </NavLink>

          <NavLink to="/student/mycomplaints" end className={navItemStyle}>
            <FileText size={18} />
            My Complaints
          </NavLink>

          <NavLink to="/student/voteable" className={navItemStyle}>
            <Vote size={18} />
            Voteable
          </NavLink>

          <NavLink to="/student/notifications" className={navItemStyle}>
            <Bell size={18} />
            Notifications
          </NavLink>

          <NavLink to="/student/profile" className={navItemStyle}>
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
                : "U"}
            </div>

            <div>
              <p className="text-sm font-semibold text-white">
                {user?.name || "Loading..."}
              </p>
              <p className="text-xs text-slate-500">
                ID: {user?.enrollment || "--"}
              </p>
            </div>

          </div>
        </div>

      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative z-0 min-w-0 w-full">

        <div className="flex-1 px-4 py-5 md:px-6 md:py-6 lg:px-8 lg:py-8 overflow-y-auto space-y-6 lg:space-y-8">

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700"
            >
              <Menu size={22} />
            </button>
          </div>

          {/* Header */}
          <StudentHeader />

          {/* Dynamic Page */}
          <Outlet />

        </div>

      </main>

      {/* Change Password Modal */}
     

    </div>
  );
};

export default StudentDashboard;