import React, { createContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/auth.service';
import { User, LoginCredentials, AuthContextType } from '../types/auth.types';
import { toast } from 'sonner';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // const checkAuth = useCallback(async () => {
  //   try {
  //     const currentUser = await authService.getCurrentUser();
  //     setUser(currentUser);
  //   } catch (error) {
  //     setUser(null);
  //   } finally {
  //     setLoading(false);
  //   }
  // }, []);
const checkAuth = useCallback(async () => {
  try {
    const currentUser = await authService.getCurrentUser();
    setUser(currentUser);
  } catch (error: any) {
    if (error?.response?.status === 401) {
      
    }
    // ❌ DO NOT clear user on other errors
  } finally {
    setLoading(false);
  }
}, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = async (credentials: LoginCredentials) => {
    try {
      const response = await authService.login(credentials);
      // setUser(response.user);
      await checkAuth();
      toast.success('Login successful!');

      // Role-based redirect
      switch (response.user.role) {
        case 'ADMIN':
          navigate('/admin');
          break;
        case 'STAFF':
          navigate('/staff');
          break;
        case 'STUDENT':
          navigate('/student');
          break;
        default:
          navigate('/dashboard');
      }
    } catch (error) {
      throw error;
    }
  };

  const register = async (data: any) => {
  try {
    await authService.register(data);
    toast.success("Account created successfully!");
    navigate("/login"); // ✅ redirect after register
  } catch (error) {
    throw error;
  }
};
  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
      navigate('/login');
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  const forgotPassword = async (data: { email: string; enrollment: string }) => {
  try {
    await authService.forgotPassword(data);
    toast.success("Reset link sent to your email!");
  } catch (error) {
    throw error;
  }
};

const resetPassword = async (data: {
  token: string;
  newPassword: string;
}) => {
  try {
    await authService.resetPassword(data);
    toast.success("Password reset successful!");
    navigate("/login");
  } catch (error) {
    throw error;
  }
};
const changePassword = async (data: {
  password: string;
  newPassword: string;
}) => {
  try {
    await authService.changePassword(data);
    toast.success("Password changed successfully!");
  } catch (error) {
    throw error;
  }
};
  return (
    <AuthContext.Provider value={{ user, loading, login, logout, checkAuth, register,forgotPassword,   // ✅ add
  resetPassword, changePassword}}>
      {children}
    </AuthContext.Provider>
  );
};
