// export interface User {
//   id: string;
//   email: string;
//   name: string;
//   role: 'user' | 'staff' | 'admin';
//   department?: string;
//   avatar?: string;
//   createdAt: string;
// }

// export interface LoginCredentials {
//   email: string;
//   password: string;
// }

// export interface AuthResponse {
//   user: User;
//   message: string;
// }

// export interface AuthContextType {
//   user: User | null;
//   loading: boolean;
//   login: (credentials: LoginCredentials) => Promise<void>;
//   logout: () => Promise<void>;
//   checkAuth: () => Promise<void>;
// }
// ==============================
// USER MODEL (as backend sends)
// ==============================
export interface User {
  _id: string;                 // MongoDB ID
  email: string;
  enrollment:string;
  college:string;
  name: string;
  role: 'STUDENT' | 'STAFF' | 'ADMIN'| 'SUPER_ADMIN';
  department?: string;
  avatar?: string;
  createdAt: string;           // ISO string
  updatedAt?: string;
  isEmailVerified: boolean;
}

// ==============================
// LOGIN INPUT
// ==============================
export interface LoginCredentials {
  email: string;
  enrollment:string;
  password: string;
}

// ==============================
// GENERIC API RESPONSE
// (matches backend pattern)
// ==============================
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// ==============================
// AUTH-SPECIFIC RESPONSES
// ==============================
export type AuthResponse = ApiResponse<{
  user: User;
}>;

// ==============================
// AUTH CONTEXT SHAPE
// ==============================
export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  register: (data: any) => Promise<void>; 
forgotPassword: (data: { email: string; enrollment: string }) => Promise<void>;
  resetPassword: (data: { token: string; newPassword: string }) => Promise<void>;
  changePassword: (data: {
  password: string;
  newPassword: string;
}) => Promise<void>;
}
