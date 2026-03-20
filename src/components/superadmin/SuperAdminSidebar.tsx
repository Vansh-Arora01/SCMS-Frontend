import { NavLink } from "react-router-dom";
import {
  Home,
  Users,
  Building2,
  UserPlus,
  PlusCircle,
  ShieldCheck,
  Menu,
  X,
  User
} from "lucide-react";
import { useState } from "react";

const SuperAdminSidebar = (): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false);

  const navStyle = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-3 md:px-4 py-2 md:py-3 rounded-xl transition-all duration-200 ${
      isActive
        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
        : "text-slate-400 hover:text-white hover:bg-slate-800"
    }`;

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-slate-800 rounded-lg"
      >
        <Menu size={22} />
      </button>

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
        fixed md:relative top-0 left-0 min-h-screen w-64 lg:w-72
        bg-slate-900/90 backdrop-blur-xl border-r border-slate-800
        p-4 md:p-6 flex flex-col z-50
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
        `}
      >
        {/* Mobile Close */}
        <button
          onClick={() => setOpen(false)}
          className="md:hidden absolute top-4 right-4 text-slate-400"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="mb-8 md:mb-12">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 md:w-10 md:h-10 rounded-xl
              bg-gradient-to-tr from-indigo-500 to-purple-600
              flex items-center justify-center text-white shadow-md"
            >
              <ShieldCheck size={18} />
            </div>

            <h2 className="text-lg md:text-xl font-bold text-white">
              Super Admin
            </h2>
          </div>

          <p className="text-slate-400 text-xs mt-3 uppercase tracking-wider">
            System Control
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-col gap-2 md:gap-3">

          <NavLink
            to="/superadmin"
            className={navStyle}
            onClick={() => setOpen(false)}
          >
            <Home size={18} />
            <span className="text-sm md:text-base">Dashboard</span>
          </NavLink>

          <NavLink
            to="/superadmin/admins"
            className={navStyle}
            onClick={() => setOpen(false)}
          >
            <Users size={18} />
            <span className="text-sm md:text-base">Admins</span>
          </NavLink>

          <NavLink
            to="/superadmin/colleges"
            className={navStyle}
            onClick={() => setOpen(false)}
          >
            <Building2 size={18} />
            <span className="text-sm md:text-base">Colleges</span>
          </NavLink>

          <NavLink
            to="/superadmin/create-admin"
            className={navStyle}
            onClick={() => setOpen(false)}
          >
            <UserPlus size={18} />
            <span className="text-sm md:text-base">Create Admin</span>
          </NavLink>

          <NavLink
            to="/superadmin/create-college"
            className={navStyle}
            onClick={() => setOpen(false)}
          >
            <PlusCircle size={18} />
            <span className="text-sm md:text-base">Create College</span>
          </NavLink>
          <NavLink
            to="profile"
            className={navStyle}
            onClick={() => setOpen(false)}
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
            Super Admin Control Panel
            <br />
            Full System Access & Governance
          </div>
        </div>

      </aside>
    </>
  );
};

export default SuperAdminSidebar;