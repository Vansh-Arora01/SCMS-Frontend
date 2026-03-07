


import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";

// Public Pages
import Home from "./pages/public/Home";
import Login from "./pages/public/Login";
import Register from "./pages/public/Register";
import VerifyEmail from "./pages/public/VerifyEmail";
import ForgotPassword from "./pages/public/ForgotPassword";
import ResetPassword from "./pages/public/ResetPassword";

// Role Protected Route
import RoleProtectedRoute from "./routes/RoleProtectedRoute";

// Student
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentHome from "./pages/student/StudentHome";
import MyComplaints from "./pages/student/MyComplaints";
import VoteableComplaints from "./pages/student/VoteableComplaints";
import Notifications from "./pages/student/Notifications";
import StudentProfile from "./pages/student/StudentProfile";
import CreateComplaint from "./pages/student/CreateComplaint";

// Staff
import StaffDashboard from "./pages/staff/StaffDashboard";
import AssignedComplaints from "./pages/staff/AssignedComplaints";
import ComplaintDetails from "./pages/staff/ComplaintDetails";
import StaffProfile from "./pages/staff/StaffProfile";

// Admin
import AdminDashboard from "./pages/admin/AdminDashboard";
import UnassignedComplaints from "./pages/admin/UnassignedComplaints";
import SortedComplaints from "./pages/admin/SortedComplaints";
import ManageStaff from "./pages/admin/ManageStaff";
import AdminProfile from "./pages/admin/AdminProfile";

// shared route 
import ChangePasswordPage from "./pages/shared/ChangePasswordPage";

const App: React.FC = () => {
  return (
    <>
      <Routes>
        {/*  PUBLIC ROUTES*/}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-email/:token" element={<VerifyEmail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/*  STUDENT ROUTES */}
        <Route
          path="/student"
          element={
            <RoleProtectedRoute role="STUDENT">
              <StudentDashboard />
            </RoleProtectedRoute>
          }
        >
          {/* <Route index element={<MyComplaints />} /> */}
          <Route index element={<StudentHome />} />
           <Route path="mycomplaints" element={<MyComplaints />} />
          <Route path="voteable" element={<VoteableComplaints />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="profile" element={<StudentProfile />} />
          <Route path="create-complaint" element={<CreateComplaint />} />
        </Route>

        {/* STAFF ROUTES ) */}
        <Route
          path="/staff"
          element={
            <RoleProtectedRoute role="STAFF">
              <StaffDashboard />
            </RoleProtectedRoute>
          }
        >
          <Route path="dashboard" element={<AssignedComplaints />} />
          <Route path="assigned" element={<AssignedComplaints />} />
          <Route path="assigned/:id" element={<ComplaintDetails />} />
          <Route path="profile" element={<StaffProfile />} />
        </Route>

        {/* ADMIN ROUTES (UNCHANGED) */}
        <Route
          path="/admin"
          element={
            <RoleProtectedRoute role="ADMIN">
              <AdminDashboard />
            </RoleProtectedRoute>
          }
        >
          {/* <Route index element={<UnassignedComplaints />} /> */}
          <Route path="unassigned" element={<UnassignedComplaints />} />
          <Route path="sorted" element={<SortedComplaints />} />
          <Route path="staff" element={<ManageStaff />} />
          <Route path="profile" element={<AdminProfile />} />
        </Route>


          {/* SHARED ROUTES */}
           <Route path="/account/change-password" element={<ChangePasswordPage />} />

           
        {/* Catch All */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Toaster position="top-right" richColors />
    </>
  );
};

export default App;