import api from "./api";

export const superAdminService = {

  // 🏫 Get all colleges
  getColleges: async () => {
    const res = await api.get("/superadmin/colleges"); // ✅ FIXED
    return res.data.data;
  },

  // 👨‍💼 Get all admins
  getAdmins: async () => {
    const res = await api.get("/superadmin/all-admins"); // ✅ FIXED
    return res.data.data;
  },

  // ➕ Create admin
  createAdmin: async (data: any) => {
    const res = await api.post("/superadmin/createAdmin", data); // ✅ FIXED
    return res.data.data;
  },

  // ❌ Delete admin
  deleteAdmin: async (id: string) => {
    const res = await api.delete(`/superadmin/${id}`); // ✅ FIXED
    return res.data.data;
  },

  // 🔍 Filter admins
  getAdminsByCollege: async (collegeId: string) => {
    const res = await api.get(`/superadmin/all-admins?collegeId=${collegeId}`); // ✅ FIXED
    return res.data.data;
  },

  // 👤 Profile
  getSuperAdminProfile: async () => {
    const res = await api.get("/superadmin/profile");
    return res.data.data;
  },

  // ➕ Create college
  createCollege: async (data: any) => {
    const res = await api.post("/superadmin/createCollege", data); // already correct
    return res.data.data;
  }
};