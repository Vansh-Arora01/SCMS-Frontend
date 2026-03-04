import { NavLink } from "react-router-dom";
import { Home, ClipboardList, User, Shield } from "lucide-react";

const StaffSidebar = () => {
  return (
    <div className="w-72 min-h-screen bg-slate-900/70 backdrop-blur-xl 
    border-r border-slate-800 p-6 flex flex-col">

      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl 
          bg-gradient-to-tr from-blue-500 to-indigo-600 
          flex items-center justify-center text-white shadow-md">
            <Shield size={18} />
          </div>

          <h2 className="text-xl font-bold text-white">
            Staff Panel
          </h2>
        </div>

        <p className="text-slate-400 text-xs mt-3 uppercase tracking-wider">
          Navigation
        </p>
      </div>

      {/* Navigation Links */}
      <div className="flex flex-col gap-3">

        {/* Home */}
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              isActive
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`
          }
        >
          <Home size={18} />
          <span>Home</span>
        </NavLink>

        {/* Assigned Complaints */}
        <NavLink
          to="assigned"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              isActive
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`
          }
        >
          <ClipboardList size={18} />
          <span>Assigned Complaints</span>
        </NavLink>

        {/* Profile */}
        <NavLink
          to="profile"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              isActive
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`
          }
        >
          <User size={18} />
          <span>Profile</span>
        </NavLink>
      </div>

      {/* Footer */}
      <div className="mt-auto pt-8">
        <div className="bg-slate-800/50 border border-slate-700 
        rounded-xl p-4 text-xs text-slate-400">
          Staff Access Portal  
          <br />
          Secure Role-Based Dashboard
        </div>
      </div>
    </div>
  );
};

export default StaffSidebar;