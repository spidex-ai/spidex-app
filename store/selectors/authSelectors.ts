import { RootState } from '../index';

// Base auth selector
export const selectAuth = (state: RootState) => state.auth;

// Auth data selectors
export const selectAuthData = (state: RootState) => state.auth.auth;

export const selectUser = (state: RootState) => state.auth.auth?.user || null;

export const selectUserId = (state: RootState) => state.auth.auth?.user?.id || null;

export const selectWalletAddress = (state: RootState) => state.auth.auth?.user?.walletAddress || null;

export const selectUserAvatar = (state: RootState) => state.auth.auth?.avatar || null;

export const selectWalletName = (state: RootState) => state.auth.auth?.walletName || null;

// Token selectors
export const selectAccessToken = (state: RootState) => state.auth.auth?.accessToken || null;

export const selectRefreshToken = (state: RootState) => state.auth.auth?.refreshToken || null;

// State selectors
export const selectIsAuthenticated = (state: RootState) => Boolean(state.auth.auth?.accessToken && state.auth.auth?.userId);

export const selectIsLoading = (state: RootState) => state.auth.loading;

export const selectError = (state: RootState) => state.auth.error;

export const selectIsProcessingOAuth = (state: RootState) => state.auth.isProcessingOAuth;

export const selectLastSavedUrl = (state: RootState) => state.auth.lastSavedUrl;

// Social connection selectors
export const selectSocialConnections = (state: RootState) => {
  const user = state.auth.auth?.user;
  if (!user) return null;

  return {
    discord: {
      connected: Boolean(user.discordLink || user.discordUsername),
      username: user.discordUsername,
      link: user.discordLink,
    },
    telegram: {
      connected: Boolean(user.telegramLink || user.telegramUsername),
      username: user.telegramUsername,
      link: user.telegramLink,
    },
    x: {
      connected: Boolean(user.xId || user.xUsername || user.xLink),
      id: user.xId,
      username: user.xUsername,
      link: user.xLink,
    },
    google: {
      connected: Boolean(user.email),
      email: user.email,
    },
  };
};

// Combined auth info selector for debugging
export const selectAuthInfo = (state: RootState) => ({
  hasAuth: Boolean(state.auth.auth),
  isAuthenticated: Boolean(state.auth.auth?.accessToken && state.auth.auth?.userId),
  userId: state.auth.auth?.userId || null,
  hasAccessToken: Boolean(state.auth.auth?.accessToken),
  hasRefreshToken: Boolean(state.auth.auth?.refreshToken),
  loading: state.auth.loading,
  error: state.auth.error,
  isProcessingOAuth: state.auth.isProcessingOAuth,
  lastSavedUrl: state.auth.lastSavedUrl,
});
