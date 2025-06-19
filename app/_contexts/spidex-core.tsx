'use client';

import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { Auth, useSpidexCore } from '@/hooks/core/useSpidexCore';
import { SubmitSwapPayload, SwapPayload } from '@/services/dexhunter/types';
import { EsitmateSwapPayload } from '@/services/dexhunter/types';
import { UpdateUserPayload } from '@/hooks/core/type';
import { QuoteType } from '../(app)/token/[address]/_components/header/select-quote';

interface SpidexCoreContextType {
  auth: Auth | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  isProcessingOAuth: boolean;
  setIsProcessingOAuth: (processing: boolean) => void;
  getMe: () => Promise<any>;
  getTopTokensByVolume: (
    timeframe?: string,
    page?: number,
    perPage?: number
  ) => Promise<any>;
  getTopTokensByMcap: (page?: number, perPage?: number) => Promise<any>;
  getNounce: () => Promise<any>;
  signMessage: (message: any, walletName: string) => Promise<any>;
  refreshToken: () => Promise<any>;
  connectX: (
    code: string,
    redirectUrl: string,
    referralCode?: string
  ) => Promise<any>;
  connectGoogle: (idToken: string, referralCode?: string) => Promise<any>;
  connectDiscord: (
    code: string,
    redirectUri: string,
    referralCode?: string
  ) => Promise<any>;
  connectTelegram: (
    id: string,
    first_name: string,
    last_name: string,
    username: string,
    photo_url: string,
    auth_date: number,
    hash: string,
    referralCode?: string
  ) => Promise<any>;
  fetchWithAuth: (url: string, options?: RequestInit) => Promise<any>;
  logout: () => Promise<void>;
  setLocalAuth: (auth: Auth) => void;
  onSessionExpired: () => void;
  getUserRefMeInfo: () => Promise<any>;
  getUserRefMeReferredUsers: (page?: number, perPage?: number) => Promise<any>;
  getUserRefHistory: (page?: number, perPage?: number) => Promise<any>;
  getUserPointMeInfo: () => Promise<any>;
  getUserQuests: (page?: number, perPage?: number) => Promise<any>;
  getUserPointHistory: (page?: number, perPage?: number) => Promise<any>;
  getPortfolioToken: (address?: string) => Promise<any>;
  getPortfolioTransaction: (
    address?: string,
    page?: number,
    pageSize?: number
  ) => Promise<any>;
  getTokenTradeHistory: (tokenId: string) => Promise<any>;
  getTokenTopHolders: (tokenId: string) => Promise<any>;
  getTokenTopTraders: (tokenId: string) => Promise<any>;
  getSwapPoolStats: (inputToken: string, outputToken: string) => Promise<any>;
  buildSwapRequest: (payload: SwapPayload) => Promise<any>;
  estimateSwap: (payload: EsitmateSwapPayload) => Promise<any>;
  submitSwapRequest: (payload: SubmitSwapPayload) => Promise<any>;
  triggerSocialQuest: (id: number) => Promise<any>;
  verifySocialQuest: (id: number) => Promise<any>;
  startSocialQuest: (id: number) => Promise<any>;
  triggerDailyLogin: () => Promise<any>;
  uploadAvatar: (file: FormData) => Promise<any>;
  updateUserInfo: (payload: UpdateUserPayload) => Promise<any>;
  getTokenDetailCore: (tokenId: string) => Promise<any>;
  getTokenOHLCV: (
    tokenId: string,
    interval: string,
    numIntervals: number,
    quote: QuoteType
  ) => Promise<any>;
  getTokenStats: (tokenId: string) => Promise<any>;
  getAchievements: () => Promise<any>;
}

export const STORAGE_KEY = 'spidex_auth';
export const LOGOUT_EVENT_KEY = 'spidex_logout_event';
export const SESSION_EXPIRED_KEY = 'spidex_session_expired';

// Cross-tab communication types
interface LogoutEvent {
  type: 'INTENTIONAL_LOGOUT' | 'SESSION_EXPIRED';
  timestamp: number;
  tabId: string;
}

// Generate unique tab ID for this session
const generateTabId = () => `tab_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
const CURRENT_TAB_ID = typeof window !== 'undefined' ? generateTabId() : 'ssr';

const SpidexCoreContext = createContext<SpidexCoreContextType | undefined>(
  undefined
);

export const SpidexCoreProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [localAuth, setLocalAuth] = useState<Auth | null>(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedAuth = localStorage.getItem(STORAGE_KEY);
        if (savedAuth) {
          const parsedAuth = JSON.parse(savedAuth);
          console.log('🔄 SpidexCoreProvider: Loaded auth from localStorage', {
            hasAuth: !!parsedAuth,
            userId: parsedAuth?.userId,
            hasAccessToken: !!parsedAuth?.accessToken,
            hasRefreshToken: !!parsedAuth?.refreshToken
          });
          return parsedAuth;
        }
      } catch (error) {
        console.error('❌ SpidexCoreProvider: Failed to parse saved auth data', error);
        try {
          localStorage.removeItem(STORAGE_KEY);
          console.log('🧹 SpidexCoreProvider: Cleared corrupted localStorage data');
        } catch (clearError) {
          console.error('❌ SpidexCoreProvider: Failed to clear corrupted localStorage', clearError);
        }
      }
    }
    return null;
  });
  const [isProcessingOAuth, setIsProcessingOAuth] = useState<boolean>(false);
  const [isHydrated, setIsHydrated] = useState<boolean>(false);
  const tabIdRef = useRef<string>(CURRENT_TAB_ID);

  // Handle SSR hydration
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Add logging for OAuth processing state changes
  useEffect(() => {
    console.log('Global OAuth processing state changed:', isProcessingOAuth);
  }, [isProcessingOAuth]);

  // Enhanced cross-tab communication system
  useEffect(() => {
    if (!isHydrated || typeof window === 'undefined') return;

    const handleStorageChange = (e: StorageEvent) => {
      // Handle auth data changes (for login/token refresh sync)
      if (e.key === STORAGE_KEY) {
        console.log('🔍 SpidexCoreProvider: Auth localStorage changed externally', {
          key: e.key,
          oldValue: e.oldValue ? 'exists' : 'null',
          newValue: e.newValue ? 'exists' : 'null',
          url: e.url,
          timestamp: new Date().toISOString()
        });

        // Only sync auth updates (login/token refresh), not removals
        if (e.newValue && e.oldValue) {
          try {
            const parsedAuth = JSON.parse(e.newValue);
            const oldAuth = JSON.parse(e.oldValue);

            // Only update if it's a genuine auth update (not a logout)
            if (parsedAuth.accessToken && parsedAuth.userId &&
                (parsedAuth.accessToken !== oldAuth.accessToken ||
                 parsedAuth.userId !== oldAuth.userId)) {
              console.log('✅ SpidexCoreProvider: Syncing auth update from another tab');
              setLocalAuth(parsedAuth);
            }
          } catch (error) {
            console.error('❌ SpidexCoreProvider: Failed to parse external auth change', error);
          }
        }
      }

      // Handle logout events
      if (e.key === LOGOUT_EVENT_KEY && e.newValue) {
        try {
          const logoutEvent: LogoutEvent = JSON.parse(e.newValue);
          console.log('🔍 SpidexCoreProvider: Received logout event', {
            type: logoutEvent.type,
            fromTab: logoutEvent.tabId,
            currentTab: tabIdRef.current,
            timestamp: new Date(logoutEvent.timestamp).toISOString()
          });

          // Only handle session expired events from other tabs
          if (logoutEvent.type === 'SESSION_EXPIRED' && logoutEvent.tabId !== tabIdRef.current) {
            console.log('⚠️ SpidexCoreProvider: Session expired in another tab, logging out');
            setLocalAuth(null);
            if (typeof window !== 'undefined') {
              try {
                localStorage.removeItem(STORAGE_KEY);
              } catch (error) {
                console.error('❌ SpidexCoreProvider: Failed to clear localStorage on session expiry', error);
              }
            }
          }
          // Intentional logouts from other tabs are ignored to prevent cross-tab logout
        } catch (error) {
          console.error('❌ SpidexCoreProvider: Failed to parse logout event', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [isHydrated]);

  // Helper function for session expiry (called by useSpidexCore)
  const handleSessionExpired = () => {
    console.log('⚠️ SpidexCoreProvider: Session expired, broadcasting to other tabs', {
      tabId: tabIdRef.current,
      timestamp: new Date().toISOString()
    });

    // Clear local state
    setLocalAuth(null);

    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem(STORAGE_KEY);
        console.log('🧹 SpidexCoreProvider: Cleared localStorage due to session expiry');
      } catch (error) {
        console.error('❌ SpidexCoreProvider: Failed to clear localStorage', error);
      }
    }

    // Broadcast session expiry to other tabs
    broadcastLogoutEvent('SESSION_EXPIRED');
  };

  const spidexCore = useSpidexCore(localAuth, handleSessionExpired);

  const handleSetLocalAuth = (auth: Auth) => {
    if (typeof window !== 'undefined') {
      try {
        console.log('💾 SpidexCoreProvider: Saving auth to localStorage', {
          userId: auth?.userId,
          hasAccessToken: !!auth?.accessToken,
          hasRefreshToken: !!auth?.refreshToken,
          timestamp: new Date().toISOString()
        });

        localStorage.setItem(STORAGE_KEY, JSON.stringify(auth));
        setLocalAuth(auth);

        console.log('✅ SpidexCoreProvider: Successfully saved auth to localStorage');
      } catch (error) {
        console.error('❌ SpidexCoreProvider: Failed to save auth to localStorage', error);
        // Still update the state even if localStorage fails
        setLocalAuth(auth);
      }
    }
  };

  // Helper function to broadcast logout events
  const broadcastLogoutEvent = (type: 'INTENTIONAL_LOGOUT' | 'SESSION_EXPIRED') => {
    if (typeof window !== 'undefined') {
      try {
        const logoutEvent: LogoutEvent = {
          type,
          timestamp: Date.now(),
          tabId: tabIdRef.current
        };
        localStorage.setItem(LOGOUT_EVENT_KEY, JSON.stringify(logoutEvent));
        // Clean up the event after a short delay to prevent accumulation
        setTimeout(() => {
          try {
            localStorage.removeItem(LOGOUT_EVENT_KEY);
          } catch (error) {
            console.error('❌ Failed to clean up logout event', error);
          }
        }, 1000);
      } catch (error) {
        console.error('❌ SpidexCoreProvider: Failed to broadcast logout event', error);
      }
    }
  };

  const handleLogout = async () => {
    console.log('🚪 SpidexCoreProvider: Starting intentional logout process', {
      tabId: tabIdRef.current,
      timestamp: new Date().toISOString()
    });

    // Clear local state first
    setLocalAuth(null);

    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem(STORAGE_KEY);
        console.log('🧹 SpidexCoreProvider: Cleared localStorage');
      } catch (error) {
        console.error('❌ SpidexCoreProvider: Failed to clear localStorage', error);
      }
    }

    // Broadcast intentional logout (other tabs will ignore this)
    broadcastLogoutEvent('INTENTIONAL_LOGOUT');

    try {
      await spidexCore.logout();
      console.log('✅ SpidexCoreProvider: Logout completed successfully');
    } catch (error) {
      console.error('❌ SpidexCoreProvider: Error during logout', error);
    }
  };



  // When spidexCore.auth changes, update localStorage and local state
  useEffect(() => {
    if (typeof window !== 'undefined' && spidexCore.auth) {
      // Only update if the auth data is actually different
      const currentAuthString = JSON.stringify(localAuth);
      const newAuthString = JSON.stringify(spidexCore.auth);

      if (currentAuthString !== newAuthString) {
        console.log('🔄 SpidexCoreProvider: Syncing auth from spidexCore to localStorage', {
          hasSpidexAuth: !!spidexCore.auth,
          hasLocalAuth: !!localAuth,
          userId: spidexCore.auth?.userId,
          timestamp: new Date().toISOString()
        });

        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(spidexCore.auth));
          setLocalAuth(spidexCore.auth);
          console.log('✅ SpidexCoreProvider: Successfully synced auth to localStorage');
        } catch (error) {
          console.error('❌ SpidexCoreProvider: Failed to sync auth to localStorage', error);
          // Still update local state even if localStorage fails
          setLocalAuth(spidexCore.auth);
        }
      }
    }
    // Note: We no longer handle spidexCore.auth becoming null here
    // Session expiry is handled by handleSessionExpired callback
    // Intentional logout is handled by handleLogout function
  }, [spidexCore.auth, localAuth]);

  const currentAuth = localAuth || spidexCore.auth;

  const isAuthenticated = Boolean(
    currentAuth?.accessToken && currentAuth?.userId
  );

  // Debug helper - log auth state changes
  useEffect(() => {
    console.log('🔍 SpidexCoreProvider: Auth state changed', {
      hasCurrentAuth: !!currentAuth,
      hasLocalAuth: !!localAuth,
      hasSpidexCoreAuth: !!spidexCore.auth,
      isAuthenticated,
      userId: currentAuth?.userId,
      timestamp: new Date().toISOString()
    });
  }, [currentAuth, localAuth, spidexCore.auth, isAuthenticated]);

  const contextValue: SpidexCoreContextType = {
    auth: currentAuth,
    loading: spidexCore.loading,
    error: spidexCore.error,
    isAuthenticated,
    isProcessingOAuth,
    setIsProcessingOAuth,
    getMe: spidexCore.getMe,
    getTopTokensByVolume: spidexCore.getTopTokensByVolume,
    getTopTokensByMcap: spidexCore.getTopTokensByMcap,
    getNounce: spidexCore.getNounce,
    signMessage: async (message, walletName) => {
      const result = await spidexCore.signMessage(message, walletName);
      if (result) {
        handleSetLocalAuth(result);
      }
      return result;
    },
    refreshToken: async () => {
      const result = await spidexCore.refreshToken();
      if (result) {
        handleSetLocalAuth(result);
      }
      return result;
    },
    connectX: async (code, redirectUrl, referralCode) => {
      const result = await spidexCore.connectX(code, redirectUrl, referralCode);
      if (result) {
        handleSetLocalAuth(result);
      }
      return result;
    },
    connectGoogle: async (idToken, referralCode) => {
      const result = await spidexCore.connectGoogle(idToken, referralCode);
      if (result) {
        handleSetLocalAuth(result);
      }
      return result;
    },
    connectDiscord: async (code, redirectUri, referralCode) => {
      const result = await spidexCore.connectDiscord(
        code,
        redirectUri,
        referralCode
      );
      if (result) {
        handleSetLocalAuth(result);
      }
      return result;
    },
    connectTelegram: async (
      id,
      first_name,
      last_name,
      username,
      photo_url,
      auth_date,
      hash,
      referralCode
    ) => {
      const result = await spidexCore.connectTelegram(
        id,
        first_name,
        last_name,
        username,
        photo_url,
        auth_date,
        hash,
        referralCode
      );
      if (result) {
        handleSetLocalAuth(result);
      }
      return result;
    },
    fetchWithAuth: spidexCore.fetchWithAuth,
    logout: handleLogout,
    setLocalAuth: handleSetLocalAuth,
    onSessionExpired: handleSessionExpired,
    getUserRefMeInfo: spidexCore.getUserRefMeInfo,
    getUserRefMeReferredUsers: spidexCore.getUserRefMeReferredUsers,
    getUserRefHistory: spidexCore.getUserRefHistory,
    getUserPointMeInfo: spidexCore.getUserPointMeInfo,
    getUserQuests: spidexCore.getUserQuests,
    getUserPointHistory: spidexCore.getUserPointHistory,
    getPortfolioToken: spidexCore.getPortfolioToken,
    getPortfolioTransaction: spidexCore.getPortfolioTransaction,
    getTokenTradeHistory: spidexCore.getTokenTradeHistory,
    getTokenTopHolders: spidexCore.getTokenTopHolders,
    getTokenTopTraders: spidexCore.getTokenTopTraders,
    getSwapPoolStats: spidexCore.getSwapPoolStats,
    buildSwapRequest: spidexCore.buildSwapRequest,
    estimateSwap: spidexCore.estimateSwap,
    submitSwapRequest: spidexCore.submitSwapRequest,
    triggerSocialQuest: spidexCore.triggerSocialQuest,
    verifySocialQuest: spidexCore.verifySocialQuest,
    triggerDailyLogin: spidexCore.triggerDailyLogin,
    startSocialQuest: spidexCore.startSocialQuest,
    uploadAvatar: spidexCore.uploadAvatar,
    updateUserInfo: spidexCore.updateUserInfo,
    getTokenDetailCore: spidexCore.getTokenDetailCore,
    getTokenOHLCV: spidexCore.getTokenOHLCV,
    getTokenStats: spidexCore.getTokenStats,
    getAchievements: spidexCore.getAchievements,
  };

  return (
    <SpidexCoreContext.Provider value={contextValue}>
      {children}
    </SpidexCoreContext.Provider>
  );
};

export const useSpidexCoreContext = () => {
  const context = useContext(SpidexCoreContext);
  if (context === undefined) {
    throw new Error(
      'useSpidexCoreContext must be used within a SpidexCoreProvider'
    );
  }
  return context;
};
