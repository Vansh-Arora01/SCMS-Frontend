// import api from "./api.ts"; // adjust path if needed

// export const useAdminService = () => {
//   return {
//     getUnassigned: () => api.get("/admin/unassigned"),

//     assignComplaint: (id: string, data: any) =>
//       api.patch(`/admin/assign/${id}`, data),

//     reassignComplaint: (id: string, data: any) =>
//       api.patch(`/admin/reassign/${id}`, data),

//     createStaff: (data: {
//       name: string;
//       email: string;
//       password: string;
//       department: string;
      
//       enrollment: string;
//       role: "STAFF";
//     }) =>
//       api.post("/admin/createStaff", data),

//     deleteStaff: (id: string) =>
//       api.delete(`/admin/${id}`),

//     getProfile: () =>
//       api.get("/admin/profile"),

//     getSortedComplaints: () =>
//       api.get("/admin/sorted-by-department"),

//     getAllStaff: () => 
//    api.get("/admin/all-staff"),



//   getAdminStats : () => 
//   api.get("/admin/dashboard-stats"),
  


//   };
// };
import api from "./api";

export const useAdminService = () => {
  return {

    getUnassigned: () =>
      api.get("/admin/unassigned"),

    assignComplaint: (
      id: string,
      data: { enrollment: string; name?: string }
    ) =>
      api.patch(`/admin/assign/${id}`, data),

    reassignComplaint: (
      id: string,
      data: { assignedTo: string }
    ) =>
      api.patch(`/admin/reassign/${id}`, data),

    createStaff: (data: {
      name: string;
      email: string;
      password: string;
      department: string;
      enrollment: string;
      role: "STAFF";
    }) =>
      api.post("/admin/createStaff", data),

    deleteStaff: (id: string) =>
      api.delete(`/admin/${id}`),

    getProfile: () =>
      api.get("/admin/profile"),

    getSortedComplaints: () =>
      api.get("/admin/sorted-by-department"),

    getAllStaff: () =>
      api.get("/admin/all-staff"),

    getAdminStats: () =>
      api.get("/admin/dashboard-stats")

  };
};