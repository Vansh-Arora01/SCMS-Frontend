import api from "./api.ts";

export const staffService = {
  getAssignedComplaints: async () => {
    const res = await api.get("/staff/assigned");
    return res.data;
  },

  getAssignedComplaintById: async (id: string) => {
    const res = await api.get(`/staff/assigned/${id}`);
    return res.data;
  },

  updateComplaintStatus: async (id: string, data: any) => {
    const res = await api.patch(`/staff/${id}/status`, data);
    return res.data;
  },

  getStaffProfile: async () => {
    const res = await api.get("/staff/profile");
    return res.data;
  },

  requestReassignment: async (id: string, reason: string) => {
    const res = await api.patch(
      `/staff/${id}/request-reassignment`,
      { reason }
    );
    return res.data;
  }
};
