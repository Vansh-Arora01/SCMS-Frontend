import api from "./api";

export const superAdminService = {

  // 🏫 Get all colleges
  getColleges: async () => {
    const res = await api.get("/superadmin/college");
    return res.data;
  },

  // 👨‍💼 Get all admins
  getAdmins: async () => {
    const res = await api.get("/superadmin/admins");
    return res.data;
  },

  // ➕ Create admin
  createAdmin: async (data: any) => {
    const res = await api.post("/superadmin/create-admin", data);
    return res.data;
  },

  // ❌ Delete admin (if you added backend)
  deleteAdmin: async (id: string) => {
    const res = await api.delete(`/superadmin/admin/${id}`);
    return res.data;
  },

  // 🔍 (Optional) Get admins by college
  getAdminsByCollege: async (collegeId: string) => {
    const res = await api.get(`/superadmin/admins?collegeId=${collegeId}`);
    return res.data;
  },
  getSuperAdminProfile: async () => {
    const res = await api.get("/superadmin/profile");
    return res.data;
  },
  createCollege: async (data: any) => {
    const res = await api.post("/superadmin/createCollege", data);
    return res.data;
  }

};