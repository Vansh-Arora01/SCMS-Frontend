
import { Outlet, NavLink } from "react-router-dom";
import { LayoutDashboard, FileText, Vote, Bell, User, Home } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import StudentHeader from "../../components/student/StudentHeader";
import ChangePassword from "../../components/shared/ChangePassword";
// import ComplaintModal from "../../components/student/ComplaintModal";
import { useState } from "react";
const StudentDashboard = () => {
  const [openModal, setOpenModal] = useState(false);
  const { user } = useAuth();
  const navItemStyle = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
      isActive
        ? "bg-indigo-600/20 text-indigo-400 border border-indigo-500/30"
        : "text-slate-400 hover:text-white hover:bg-slate-800/50"
    }`;

  return (
    <div className="flex min-h-screen bg-[#0f172a] text-slate-200">

      {/* Background Glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-500/10 blur-[140px] rounded-full" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-500/10 blur-[140px] rounded-full" />
      </div>

      {/* Sidebar */}
      <aside className="w-72 bg-slate-900/60 backdrop-blur-xl border-r border-slate-800 p-6 flex flex-col z-10">

        {/* Logo */}
        <div className="flex items-center gap-3 mb-10">
          <div className="p-2 bg-indigo-600 rounded-lg shadow-lg shadow-indigo-600/30">
            <LayoutDashboard size={22} className="text-white" />
          </div>
          <h2 className="text-xl font-bold text-white">
            Student Panel
          </h2>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2 flex-1">

          <NavLink to="/" className={navItemStyle}>
            <Home size={18} />
            Home
          </NavLink>

          <NavLink to="/student" end className={navItemStyle}>
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

        {/* User Info Section */}
        {/* User Info Section */}
<div className="mt-auto pt-6 border-t border-slate-800">
  <div className="flex items-center gap-3">

    {/* Avatar with Initials */}
    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-xs font-bold text-white">
      {user?.name
        ? user.name
            .split(" ")
            .map((n: string) => n[0])
            .join("")
            .toUpperCase()
        : "U"}
    </div>

    {/* Real User Details */}
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

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative z-0 overflow-hidden">

  <div className="flex-1 p-8 overflow-y-auto space-y-8">

    {/* 🔥 Premium Student Header */}
    <StudentHeader setOpenModal={setOpenModal} />

    {/* 🔥 Dynamic Page Content */}
    <Outlet />
    {/* 🔐 Change Password Modal */}
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

      {/* Your Reusable Component */}
      <ChangePassword />
    </div>
  </div>
)}

  </div>

</main>
    </div>
  );
};

export default StudentDashboard;