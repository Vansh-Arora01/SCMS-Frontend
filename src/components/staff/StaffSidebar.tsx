import { NavLink } from "react-router-dom";
import { Home, ClipboardList, User, Shield } from "lucide-react";

const StaffSidebar = () => {
  return (
    <aside
      className="fixed md:relative top-0 left-0 h-full w-64 lg:w-72
      bg-slate-900/90 backdrop-blur-xl border-r border-slate-800
      p-4 md:p-6 flex flex-col z-40"
    >

      {/* Header */}
      <div className="mb-8 md:mb-12">
        <div className="flex items-center gap-3">

          <div
            className="w-9 h-9 md:w-10 md:h-10 rounded-xl
            bg-gradient-to-tr from-blue-500 to-indigo-600
            flex items-center justify-center text-white shadow-md"
          >
            <Shield size={18} />
          </div>

          <h2 className="text-lg md:text-xl font-bold text-white">
            Staff Panel
          </h2>

        </div>

        <p className="text-slate-400 text-xs mt-3 uppercase tracking-wider">
          Navigation
        </p>
      </div>

      {/* Navigation Links */}
      <div className="flex flex-col gap-2 md:gap-3">

        {/* Home */}
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 md:px-4 py-2 md:py-3 rounded-xl transition-all duration-200 ${
              isActive
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`
          }
        >
          <Home size={18} />
          <span className="text-sm md:text-base">Home</span>
        </NavLink>

        {/* Assigned Complaints */}
        <NavLink
          to="assigned"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 md:px-4 py-2 md:py-3 rounded-xl transition-all duration-200 ${
              isActive
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`
          }
        >
          <ClipboardList size={18} />
          <span className="text-sm md:text-base">
            Assigned Complaints
          </span>
        </NavLink>

        {/* Profile */}
        <NavLink
          to="profile"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 md:px-4 py-2 md:py-3 rounded-xl transition-all duration-200 ${
              isActive
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`
          }
        >
          <User size={18} />
          <span className="text-sm md:text-base">Profile</span>
        </NavLink>

      </div>

      {/* Footer */}
      <div className="mt-auto pt-6 md:pt-8">
        <div
          className="bg-slate-800/50 border border-slate-700
          rounded-xl p-3 md:p-4 text-xs text-slate-400"
        >
          Staff Access Portal
          <br />
          Secure Role-Based Dashboard
        </div>
      </div>

    </aside>
  );
};

export default StaffSidebar;