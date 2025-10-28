// API Service - Handles all HTTP requests to the backend

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Get auth token from localStorage
const getAuthToken = (): string | null => {
  return localStorage.getItem('auth_token');
};

// Set auth token in localStorage
export const setAuthToken = (token: string): void => {
  localStorage.setItem('auth_token', token);
};

// Remove auth token from localStorage
export const removeAuthToken = (): void => {
  localStorage.removeItem('auth_token');
};

// Generic API request function
async function apiRequest<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const token = getAuthToken();
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // Add authorization header if token exists
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.message || data.error || 'An error occurred',
      };
    }

    return {
      success: true,
      data: data.data || data,
      message: data.message,
    };
  } catch (error) {
    console.error('API Request Error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error',
    };
  }
}

// Authentication API
export const authApi = {
  register: async (userData: {
    name: string;
    email: string;
    password: string;
    phone?: string;
  }) => {
    return apiRequest('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  login: async (credentials: { email: string; password: string }) => {
    return apiRequest('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  logout: async () => {
    return apiRequest('/api/auth/logout', {
      method: 'POST',
    });
  },

  getCurrentUser: async () => {
    return apiRequest('/api/auth/me', {
      method: 'GET',
    });
  },

  updateProfile: async (userData: {
    name?: string;
    phone?: string;
    avatar_url?: string;
  }) => {
    return apiRequest('/api/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  },
};

// Service Requests API
export const serviceRequestsApi = {
  create: async (requestData: {
    projectName: string;
    serviceType: string;
    description: string;
    budgetRange?: string;
    expectedTimeline?: string;
  }) => {
    return apiRequest('/api/service-requests', {
      method: 'POST',
      body: JSON.stringify(requestData),
    });
  },

  getAll: async (params?: { status?: string; page?: number; limit?: number }) => {
    const queryString = params ? '?' + new URLSearchParams(params as any).toString() : '';
    return apiRequest(`/api/service-requests${queryString}`, {
      method: 'GET',
    });
  },

  getById: async (id: string) => {
    return apiRequest(`/api/service-requests/${id}`, {
      method: 'GET',
    });
  },

  update: async (id: string, data: any) => {
    return apiRequest(`/api/service-requests/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  delete: async (id: string) => {
    return apiRequest(`/api/service-requests/${id}`, {
      method: 'DELETE',
    });
  },

  updateStatus: async (id: string, status: string) => {
    return apiRequest(`/api/service-requests/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  },

  assignTeam: async (id: string, assignedTo: string) => {
    return apiRequest(`/api/service-requests/${id}/assign`, {
      method: 'PATCH',
      body: JSON.stringify({ assignedTo }),
    });
  },

  getStats: async () => {
    return apiRequest('/api/service-requests/stats/overview', {
      method: 'GET',
    });
  },
};

// Notifications API
export const notificationsApi = {
  getAll: async (params?: { unread?: boolean; page?: number; limit?: number }) => {
    const queryString = params ? '?' + new URLSearchParams(params as any).toString() : '';
    return apiRequest(`/api/notifications${queryString}`, {
      method: 'GET',
    });
  },

  getUnreadCount: async () => {
    return apiRequest('/api/notifications/unread-count', {
      method: 'GET',
    });
  },

  markAsRead: async (id: string) => {
    return apiRequest(`/api/notifications/${id}/read`, {
      method: 'PATCH',
    });
  },

  markAllAsRead: async () => {
    return apiRequest('/api/notifications/mark-all-read', {
      method: 'PATCH',
    });
  },

  delete: async (id: string) => {
    return apiRequest(`/api/notifications/${id}`, {
      method: 'DELETE',
    });
  },
};

// Contact API (existing)
export const contactApi = {
  submit: async (contactData: {
    name: string;
    email: string;
    phone?: string;
    company?: string;
    message: string;
  }) => {
    return apiRequest('/api/contact', {
      method: 'POST',
      body: JSON.stringify(contactData),
    });
  },
};

// Projects API (existing)
export const projectsApi = {
  getAll: async () => {
    return apiRequest('/api/projects', {
      method: 'GET',
    });
  },
};

// Users API (Admin only)
export const usersApi = {
  getAll: async (params?: { role?: string; status?: string; page?: number; limit?: number }) => {
    const queryString = params ? '?' + new URLSearchParams(params as any).toString() : '';
    return apiRequest(`/api/users${queryString}`, {
      method: 'GET',
    });
  },

  getById: async (id: string) => {
    return apiRequest(`/api/users/${id}`, {
      method: 'GET',
    });
  },

  update: async (id: string, data: any) => {
    return apiRequest(`/api/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  delete: async (id: string) => {
    return apiRequest(`/api/users/${id}`, {
      method: 'DELETE',
    });
  },

  exportExcel: async () => {
    return apiRequest('/api/users/export/excel', {
      method: 'GET',
    });
  },
};

// Health check
export const healthCheck = async () => {
  return apiRequest('/api/health', {
    method: 'GET',
  });
};

export default {
  auth: authApi,
  serviceRequests: serviceRequestsApi,
  notifications: notificationsApi,
  contact: contactApi,
  projects: projectsApi,
  users: usersApi,
  healthCheck,
};
