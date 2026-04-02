import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { ApiResponse, PaginatedResponse } from '@/types';

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor for auth token
    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('auth_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Handle unauthorized access
          localStorage.removeItem('auth_token');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  // Generic GET request
  async get<T>(url: string, params?: any): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<ApiResponse<T>> = await this.client.get(url, { params });
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || 'Request failed',
      };
    }
  }

  // Generic POST request
  async post<T>(url: string, data?: any): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<ApiResponse<T>> = await this.client.post(url, data);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || 'Request failed',
      };
    }
  }

  // Generic PUT request
  async put<T>(url: string, data?: any): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<ApiResponse<T>> = await this.client.put(url, data);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || 'Request failed',
      };
    }
  }

  // Generic DELETE request
  async delete<T>(url: string): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<ApiResponse<T>> = await this.client.delete(url);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || 'Request failed',
      };
    }
  }

  // File upload
  async uploadFile(url: string, file: File, onProgress?: (progress: number) => void): Promise<ApiResponse<any>> {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response: AxiosResponse<ApiResponse<any>> = await this.client.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          if (onProgress && progressEvent.total) {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            onProgress(progress);
          }
        },
      });

      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || 'Upload failed',
      };
    }
  }

  // Paginated GET request
  async getPaginated<T>(url: string, page: number = 1, limit: number = 10, params?: any): Promise<ApiResponse<PaginatedResponse<T>>> {
    try {
      const response: AxiosResponse<ApiResponse<PaginatedResponse<T>>> = await this.client.get(url, {
        params: { page, limit, ...params },
      });
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || 'Request failed',
      };
    }
  }
}

// Create singleton instance
const api = new ApiClient();

// API Endpoints
export const authApi = {
  login: (email: string, password: string) => 
    api.post<{ token: string; user: any }>('/auth/login', { email, password }),
  
  register: (userData: any) => 
    api.post<{ token: string; user: any }>('/auth/register', userData),
  
  logout: () => 
    api.post('/auth/logout'),
  
  refreshToken: () => 
    api.post<{ token: string }>('/auth/refresh'),
  
  verifyToken: () => 
    api.get<{ valid: boolean }>('/auth/verify'),
};

export const partnersApi = {
  getPartners: (page?: number, limit?: number) => 
    api.getPaginated<any[]>('/partners', page, limit),
  
  getPartner: (id: string) => 
    api.get<any>(`/partners/${id}`),
  
  createPartner: (partnerData: any) => 
    api.post<any>('/partners', partnerData),
  
  updatePartner: (id: string, updates: any) => 
    api.put<any>(`/partners/${id}`, updates),
  
  deletePartner: (id: string) => 
    api.delete<any>(`/partners/${id}`),
  
  getPartnerStats: (id: string) => 
    api.get<any>(`/partners/${id}/stats`),
};

export const platformsApi = {
  getPlatforms: () => 
    api.get<any[]>('/platforms'),
  
  connectPlatform: (platformId: string, credentials: any) => 
    api.post<any>(`/platforms/${platformId}/connect`, credentials),
  
  disconnectPlatform: (platformId: string) => 
    api.post<any>(`/platforms/${platformId}/disconnect`),
  
  getPlatformStats: (platformId: string) => 
    api.get<any>(`/platforms/${platformId}/stats`),
  
  syncPlatform: (platformId: string) => 
    api.post<any>(`/platforms/${platformId}/sync`),
};

export const contentApi = {
  getContent: (type?: string, page?: number, limit?: number) => 
    api.getPaginated<any[]>('/content', page, limit, { type }),
  
  getContentItem: (id: string) => 
    api.get<any>(`/content/${id}`),
  
  uploadContent: (contentData: any, file?: File, onProgress?: (progress: number) => void) => 
    file 
      ? api.uploadFile('/content/upload', file, onProgress)
      : api.post<any>('/content', contentData),
  
  updateContent: (id: string, updates: any) => 
    api.put<any>(`/content/${id}`, updates),
  
  deleteContent: (id: string) => 
    api.delete<any>(`/content/${id}`),
  
  getPodcasts: () => 
    api.get<any[]>('/content/podcasts'),
  
  getVideos: (level?: string) => 
    api.get<any[]>('/content/videos', { level }),
  
  getGuides: () => 
    api.get<any[]>('/content/guides'),
};

export const financeApi = {
  getDashboardStats: () => 
    api.get<any>('/finance/dashboard'),
  
  getEarnings: (period?: string) => 
    api.get<any>('/finance/earnings', { period }),
  
  getReports: (startDate: string, endDate: string) => 
    api.get<any[]>('/finance/reports', { startDate, endDate }),
  
  getPartnerEarnings: (partnerId: string, period?: string) => 
    api.get<any>(`/finance/partners/${partnerId}/earnings`, { period }),
  
  processPayouts: (partnerIds: string[]) => 
    api.post<any>('/finance/payouts', { partnerIds }),
};

export const documentsApi = {
  getDocuments: () => 
    api.get<any[]>('/documents'),
  
  uploadDocument: (file: File, metadata: any, onProgress?: (progress: number) => void) => 
    api.uploadFile('/documents/upload', file, onProgress),
  
  deleteDocument: (id: string) => 
    api.delete<any>(`/documents/${id}`),
  
  getDocumentUrl: (id: string) => 
    api.get<{ url: string }>(`/documents/${id}/url`),
};

export const castingApi = {
  submitApplication: (applicationData: any, files: { photos: File[]; video: File }) => 
    api.post<any>('/casting/apply', applicationData),
  
  getApplications: (status?: string, page?: number, limit?: number) => 
    api.getPaginated<any[]>('/casting/applications', page, limit, { status }),
  
  updateApplication: (id: string, updates: any) => 
    api.put<any>(`/casting/applications/${id}`, updates),
  
  getApplication: (id: string) => 
    api.get<any>(`/casting/applications/${id}`),
};

export default api;
