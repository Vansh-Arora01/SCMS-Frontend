// import UnassignedComplaints from "./UnassignedComplaints.tsx";
// import SortedComplaints from "./SortedComplaints.tsx";
// import ManageStaff from "./ManageStaff.tsx";
// import AdminProfile from "./AdminProfile.tsx";

// const AdminDashboard = () => {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#0B1120] via-[#111827] to-[#1e1b4b] text-white p-10">

//       <h1 className="text-4xl font-bold mb-12 text-indigo-400">
//         Admin Dashboard
//       </h1>

//       <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
//         <UnassignedComplaints />
//         <SortedComplaints />
//         <ManageStaff />
//         <AdminProfile />
//       </div>

//     </div>
//   );
// };

import { Outlet, NavLink } from "react-router-dom";
import { useState } from "react";
import AdminHeader from "../../components/admin/AdminHeader";
import ChangePassword from "../../components/shared/ChangePassword";

const AdminDashboard = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B1120] via-[#111827] to-[#1e1b4b] text-white p-10">

      <AdminHeader setOpenModal={setOpenModal} />

      <div className="flex gap-6 mt-10 mb-10 border-b border-white/10 pb-4">

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

      <Outlet />

      {openModal && (
  <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
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