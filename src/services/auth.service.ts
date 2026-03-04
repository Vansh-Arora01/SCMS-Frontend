import api from "./api";
import {
  LoginCredentials,
  AuthResponse,
  User,
} from "../types/auth.types";

export const authService = {
  login: async (credentials: LoginCredentials) => {
    const res = await api.post<AuthResponse>("/auth/login", credentials);
    return res.data.data; // { user }
  },

  register: async (data: any): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/auth/register", data);
    return response.data;
  },

  changePassword: async (data: {
  password: string;
  newPassword: string;
}) => {
  await api.post('/auth/change-password', data);
},

  // ✅ FIXED (NO const here)
  forgotPassword: async (data: { email: string; enrollment: string }) => {
    const response = await api.post(
      "/auth/forgot-password",
      data
    );
    return response.data;
  },

  // ✅ FIXED (NO const here)
  resetPassword: async ({
  token,
  newPassword,
}: {
  token: string;
  newPassword: string;
}) => {
  const res = await api.post(`/auth/reset-password/${token}`, {
    newPassword,
  });

  return res.data;
},

  logout: async (): Promise<void> => {
    await api.post("/auth/logout");
  },

  getCurrentUser: async () => {
    const res = await api.post<{
      success: boolean;
      data: any;
    }>("/auth/current-user");

    return res.data.data; // user object
  },

  refreshToken: async (): Promise<void> => {
    await api.post("/auth/refresh-token");
  },
};