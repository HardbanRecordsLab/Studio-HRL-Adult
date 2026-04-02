import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState, User, RegisterData } from '@/types';
import { authApi } from '@/utils/api';
import { STORAGE_KEYS } from '@/utils/constants';

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        try {
          const response = await authApi.login(email, password);
          
          if (response.success && response.data) {
            const { token, user } = response.data;
            
            // Store token
            localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
            
            set({
              user,
              isAuthenticated: true,
              isLoading: false,
            });
            
            return Promise.resolve();
          } else {
            throw new Error(response.error || 'Login failed');
          }
        } catch (error: any) {
          set({ isLoading: false });
          throw new Error(error.message || 'Login failed');
        }
      },

      logout: () => {
        // Remove token
        localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
        
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });

        // Call logout API (optional)
        authApi.logout().catch(() => {
          // Ignore errors during logout
        });
      },

      register: async (userData: RegisterData) => {
        set({ isLoading: true });
        try {
          const response = await authApi.register(userData);
          
          if (response.success && response.data) {
            const { token, user } = response.data;
            
            // Store token
            localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
            
            set({
              user,
              isAuthenticated: true,
              isLoading: false,
            });
            
            return Promise.resolve();
          } else {
            throw new Error(response.error || 'Registration failed');
          }
        } catch (error: any) {
          set({ isLoading: false });
          throw new Error(error.message || 'Registration failed');
        }
      },
    }),
    {
      name: STORAGE_KEYS.USER_DATA,
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// Hook for checking authentication status
export const useAuth = () => {
  const auth = useAuthStore();
  
  // Check if token exists and is valid
  const checkAuth = async () => {
    const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    
    if (token && !auth.isAuthenticated) {
      try {
        const response = await authApi.verifyToken();
        
        if (response.success && response.data?.valid) {
          // Token is valid, but we need user data
          // You might want to add an endpoint to get current user
          // For now, we'll just set isAuthenticated to true
          set({ isAuthenticated: true });
        } else {
          // Token is invalid, remove it
          auth.logout();
        }
      } catch (error) {
        // Token verification failed, remove it
        auth.logout();
      }
    }
  };

  return {
    ...auth,
    checkAuth,
  };
};
