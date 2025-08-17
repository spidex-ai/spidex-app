import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Auth, UserSpidex } from '@/hooks/core/useSpidexCore';

// Auth state interface
export interface AuthState {
  auth: Auth | null;
  loading: boolean;
  error: string | null;
  isProcessingOAuth: boolean;
  lastSavedUrl: string | null;
}

// Initial state
const initialState: AuthState = {
  auth: null,
  loading: false,
  error: null,
  isProcessingOAuth: false,
  lastSavedUrl: null,
};

// Auth slice
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Set authentication data
    setAuth: (state, action: PayloadAction<Auth | null>) => {
      state.auth = action.payload;
      state.error = null;
    },

    // Update user data within auth
    updateUser: (state, action: PayloadAction<UserSpidex>) => {
      if (state.auth) {
        state.auth.user = action.payload;
        state.auth.avatar = action.payload.avatar || state.auth.avatar;
      }
    },

    // Update avatar
    updateAvatar: (state, action: PayloadAction<string>) => {
      if (state.auth) {
        state.auth.avatar = action.payload;
        if (state.auth.user) {
          state.auth.user.avatar = action.payload;
        }
      }
    },

    // Set loading state
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    // Set error state
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    // Clear error
    clearError: (state) => {
      state.error = null;
    },

    // Set OAuth processing state
    setIsProcessingOAuth: (state, action: PayloadAction<boolean>) => {
      state.isProcessingOAuth = action.payload;
    },

    // Update tokens (for refresh)
    updateTokens: (state, action: PayloadAction<{ accessToken: string; refreshToken: string }>) => {
      if (state.auth) {
        state.auth.accessToken = action.payload.accessToken;
        state.auth.refreshToken = action.payload.refreshToken;
      }
    },

    // Logout - clear all auth data
    logout: (state) => {
      state.auth = null;
      state.error = null;
      state.loading = false;
      state.isProcessingOAuth = false;
    },

    // Save last URL for redirect after auth
    saveLastUrl: (state, action: PayloadAction<string>) => {
      state.lastSavedUrl = action.payload;
    },

    // Clear saved URL
    clearSavedUrl: (state) => {
      state.lastSavedUrl = null;
    },

    // Session expired - clear auth but keep error message
    sessionExpired: (state) => {
      state.auth = null;
      state.loading = false;
      state.isProcessingOAuth = false;
      state.error = 'Session expired. Please login again.';
    },
  },
});

// Export actions
export const {
  setAuth,
  updateUser,
  updateAvatar,
  setLoading,
  setError,
  clearError,
  setIsProcessingOAuth,
  updateTokens,
  logout,
  saveLastUrl,
  clearSavedUrl,
  sessionExpired,
} = authSlice.actions;

// Export reducer
export default authSlice.reducer;
