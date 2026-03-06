import { Outlet, NavLink } from "react-router-dom";
import { useState } from "react";
import AdminHeader from "../../components/admin/AdminHeader";
import ChangePassword from "../../components/shared/ChangePassword";

const AdminDashboard = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B1120] via-[#111827] to-[#1e1b4b] text-white px-4 sm:px-6 md:px-8 lg:px-10 py-6 md:py-8">

      <AdminHeader setOpenModal={setOpenModal} />

      {/* Navigation */}
      <div className="flex flex-wrap gap-4 md:gap-6 mt-6 md:mt-10 mb-6 md:mb-10 border-b border-white/10 pb-4 text-sm md:text-base">

        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-indigo-400 font-medium"
              : "hover:text-indigo-400 text-slate-400"
          }
        >
          Home
        </NavLink>

        <NavLink
          to="unassigned"
          className={({ isActive }) =>
            isActive
              ? "text-indigo-400 font-medium"
              : "hover:text-indigo-400 text-slate-400"
          }
        >
          Unassigned
        </NavLink>

        <NavLink
          to="sorted"
          className={({ isActive }) =>
            isActive
              ? "text-indigo-400 font-medium"
              : "hover:text-indigo-400 text-slate-400"
          }
        >
          Sorted
        </NavLink>

        <NavLink
          to="staff"
          end
          className={({ isActive }) =>
            isActive
              ? "text-indigo-400 font-medium"
              : "hover:text-indigo-400 text-slate-400"
          }
        >
          Staff
        </NavLink>

        <NavLink
          to="profile"
          className={({ isActive }) =>
            isActive
              ? "text-indigo-400 font-medium"
              : "hover:text-indigo-400 text-slate-400"
          }
        >
          Profile
        </NavLink>

      </div>

      {/* Page Content */}
      <div className="w-full max-w-7xl mx-auto">
        <Outlet />
      </div>

      {/* Change Password Modal */}
      {openModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">

          <div className="relative w-full max-w-4xl">

            {/* Close Button */}
            <button
              onClick={() => setOpenModal(false)}
              className="absolute top-4 right-4 text-white text-xl hover:opacity-70"
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

export default AdminDashboard;