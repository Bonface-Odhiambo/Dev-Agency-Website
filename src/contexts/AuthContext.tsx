import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authApi, setAuthToken, removeAuthToken } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'client' | 'admin' | 'super_admin';
  status: string;
  email_verified: boolean;
  phone?: string;
  avatar_url?: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<User | null>;
  register: (name: string, email: string, password: string, phone?: string) => Promise<boolean>;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Check if user is already logged in on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('auth_token');
    
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await authApi.getCurrentUser();
      
      if (response.success && response.data) {
        setUser(response.data);
      } else {
        // Token is invalid, remove it
        removeAuthToken();
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      removeAuthToken();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<User | null> => {
    try {
      const response = await authApi.login({ email, password });

      if (response.success && response.data) {
        const { user: userData, token } = response.data;
        
        // Store token
        setAuthToken(token);
        
        // Set user
        setUser(userData);

        toast({
          title: 'Welcome back!',
          description: `Logged in as ${userData.name}`,
        });

        return userData;
      } else {
        toast({
          title: 'Login failed',
          description: response.error || 'Invalid credentials',
          variant: 'destructive',
        });
        return null;
      }
    } catch (error) {
      toast({
        title: 'Login error',
        description: 'An unexpected error occurred',
        variant: 'destructive',
      });
      return null;
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    phone?: string
  ): Promise<boolean> => {
    try {
      const response = await authApi.register({ name, email, password, phone });

      if (response.success && response.data) {
        const { user: userData, token } = response.data;
        
        // Store token
        setAuthToken(token);
        
        // Set user
        setUser(userData);

        toast({
          title: 'Account created!',
          description: `Welcome, ${userData.name}!`,
        });

        return true;
      } else {
        toast({
          title: 'Registration failed',
          description: response.error || 'Could not create account',
          variant: 'destructive',
        });
        return false;
      }
    } catch (error) {
      toast({
        title: 'Registration error',
        description: 'An unexpected error occurred',
        variant: 'destructive',
      });
      return false;
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear token and user regardless of API response
      removeAuthToken();
      setUser(null);
      
      toast({
        title: 'Logged out',
        description: 'You have been logged out successfully',
      });
    }
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...userData });
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
