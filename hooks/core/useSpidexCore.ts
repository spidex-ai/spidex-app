import {
  EsitmateSwapPayload,
  SubmitSwapPayload,
  SwapPayload,
} from '@/services/dexhunter/types';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { UpdateUserPayload } from './type';
import { QuoteType } from '@/app/(app)/token/[address]/_components/header/select-quote';
import { STORAGE_KEY } from '@/app/_contexts';
export interface SignMessageData {
  signature: string;
  address: string;
  publicKey: string;
  stakeAddress: string;
  referralCode: string;
  role: string;
}

export interface Auth {
  accessToken: string;
  refreshToken: string;
  userId: number;
  user: UserSpidex;
  walletName: string;
  avatar: string;
}

export interface UserSpidex {
  id: number;
  walletAddress: string;
  username: string;
  fullName: string | null;
  xId: string | null;
  xUsername: string | null;
  email: string | null;
  bio: string | null;
  avatar: string | null;
  status: string;
  referralCode: string;
  telegramLink: string | null;
  discordLink: string | null;
  discordUsername: string | null;
  telegramUsername: string | null;
  xLink: string | null;
  createdAt: Date;
  stakeAddress: string;
}

export const useSpidexCore = (
  initialAuth: Auth | null = null,
  onSessionExpired?: () => void
) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [auth, setAuth] = useState<Auth | null>(initialAuth);
  const [error, setError] = useState<string | null>(null);

  // Update auth when initialAuth changes (but don't update localStorage here)
  useEffect(() => {
    if (
      initialAuth &&
      (!auth || initialAuth.accessToken !== auth.accessToken)
    ) {
      console.log('🔄 useSpidexCore: Updating auth from initialAuth', {
        hasInitialAuth: !!initialAuth,
        hasCurrentAuth: !!auth,
        initialAuthToken: initialAuth?.accessToken?.slice(0, 10) + '...',
        currentAuthToken: auth?.accessToken?.slice(0, 10) + '...',
      });
      setAuth(initialAuth);
    } else if (initialAuth === null && auth !== null) {
      // Handle case where initialAuth becomes null (external logout)
      console.log(
        '🧹 useSpidexCore: initialAuth is null, clearing internal auth state'
      );
      setAuth(null);
    }
  }, [initialAuth, auth]);

  // Validate auth object before setting
  const validateAuth = useCallback((authObj: Auth | null): boolean => {
    if (authObj === null) return true; // null is valid for logout

    // Check if auth object has required properties
    if (!authObj.accessToken || !authObj.refreshToken || !authObj.userId) {
      return false;
    }

    return true;
  }, []);

  // Safe auth setter with validation
  const setAuthSafely = useCallback(
    (newAuth: Auth | null) => {
      if (!validateAuth(newAuth)) {
        console.warn('Attempted to set invalid auth object, ignoring update');
        return;
      }

      setAuth(newAuth);
    },
    [validateAuth]
  );

  // Logout function that can be used anywhere
  const performLogout = useCallback(() => {
    console.log('🚪 performLogout: Starting logout process', {
      hasAuth: !!auth,
      userId: auth?.userId,
      timestamp: new Date().toISOString(),
      stackTrace: new Error().stack?.split('\n').slice(1, 4).join('\n'),
    });

    try {
      // Clear auth state first
      setAuth(null);

      // Clear localStorage with error handling
      if (typeof window !== 'undefined') {
        try {
          localStorage.removeItem(STORAGE_KEY);
          console.log('🧹 performLogout: Successfully cleared localStorage');
        } catch (error) {
          console.error(
            '❌ performLogout: Failed to clear localStorage',
            error
          );
        }
      }

      // Navigate to chat page
      router.push('/chat');
      console.log('🔄 performLogout: Redirected to /chat');
    } catch (error) {
      console.error('❌ performLogout: Error during logout process', error);
    }
  }, [router, auth]);

  useEffect(() => {
    if (auth?.accessToken) {
      getMe();
    }
  }, [auth?.accessToken]);

  const isAuthenticated = useMemo(() => {
    return auth?.accessToken && auth?.userId;
  }, [auth]);

  // Fetch manager to handle API requests
  const fetchWithAuth = useCallback(
    async (url: string, options: RequestInit = {}) => {
      setLoading(true);
      setError(null);

      // Default headers with content type and authorization if token exists
      const headers = {
        ...(auth?.accessToken && {
          Authorization: `Bearer ${auth.accessToken}`,
        }),
        ...(!options.body || !(options.body instanceof FormData)
          ? { 'Content-Type': 'application/json' }
          : {}),
        ...options.headers,
      };

      console.log({
        'fetchWithAuth called with URL:': url,
        'and options:': options,
        'from:': new Error().stack,
        'headers:': headers,
      });

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SPIDEX_CORE_API_URL}${url}`,
          {
            ...options,
            headers,
          }
        );

        // Handle 401 Unauthorized (expired token)
        if (response.status === 401 && auth?.refreshToken) {
          console.log('🔄 fetchWithAuth: Got 401, attempting token refresh', {
            url,
            hasRefreshToken: !!auth.refreshToken,
            userId: auth.userId,
          });

          // Try to refresh the token
          const refreshResponse = await fetch(
            `${process.env.NEXT_PUBLIC_SPIDEX_CORE_API_URL}/auth/refresh-token`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ refreshToken: auth.refreshToken }),
            }
          );

          if (refreshResponse.status === 200) {
            console.log('✅ fetchWithAuth: Token refresh successful');
            const refreshData = await refreshResponse.json();
            const newAuth = { ...auth, ...refreshData.data };
            setAuthSafely(newAuth);

            // Retry the original request with new access token
            const retryResponse = await fetch(
              `${process.env.NEXT_PUBLIC_SPIDEX_CORE_API_URL}${url}`,
              {
                ...options,
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${newAuth.accessToken}`,
                  ...options.headers,
                },
              }
            );

            setLoading(false);
            if (retryResponse.status !== 200) {
              throw new Error(`API error: ${retryResponse.status}`);
            }
            return await retryResponse.json();
          } else {
            console.log(
              '❌ fetchWithAuth: Token refresh failed, triggering session expiry',
              {
                refreshStatus: refreshResponse.status,
                url,
                userId: auth.userId,
              }
            );
            if (onSessionExpired) {
              onSessionExpired();
            } else {
              performLogout();
            }
            throw new Error('Session expired. Please login again.');
          }
        }

        // Handle 401 without refresh token - this should trigger session expiry
        if (response.status === 401) {
          console.log(
            '❌ fetchWithAuth: Got 401 without refresh token, triggering session expiry',
            {
              url,
              hasAuth: !!auth,
              hasRefreshToken: !!auth?.refreshToken,
              userId: auth?.userId,
            }
          );
          if (onSessionExpired) {
            onSessionExpired();
          } else {
            performLogout();
          }
          throw new Error('Authentication required. Please login again.');
        }

        setLoading(false);
        const data = await response.json();
        if (response.status !== 200) {
          throw data?.message || 'An error occurred';
        }

        return data;
      } catch (err: any) {
        setError(err.message || 'An error occurred');
        setLoading(false);
        console.error('Spidex API error:', err);
        throw err || 'An error occurred';
      }
    },
    [auth?.accessToken, setAuthSafely, performLogout, onSessionExpired]
  );

  // Special fetch function for social connections that doesn't trigger logout on 401
  const fetchSocialConnect = useCallback(
    async (url: string, options: RequestInit = {}) => {
      setLoading(true);
      setError(null);

      // Default headers with content type and authorization if token exists
      const headers = {
        ...(auth?.accessToken && {
          Authorization: `Bearer ${auth.accessToken}`,
        }),
        ...(!options.body || !(options.body instanceof FormData)
          ? { 'Content-Type': 'application/json' }
          : {}),
        ...options.headers,
      };

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SPIDEX_CORE_API_URL}${url}`,
          {
            ...options,
            headers,
          }
        );

        setLoading(false);
        const data = await response.json();

        // For social connections, don't trigger logout on 401 - just throw the error
        if (response.status !== 200) {
          throw (
            data?.message ||
            `Social connection failed with status: ${response.status}`
          );
        }

        return data;
      } catch (err: any) {
        setError(err.message || 'An error occurred');
        setLoading(false);
        console.error('Social connection error:', err);
        throw err || 'An error occurred';
      }
    },
    [auth?.accessToken]
  );

  const getMe = useCallback(async () => {
    try {
      const data = await fetchWithAuth('/auth/me');
      if (auth) {
        const updatedAuth = {
          ...auth,
          user: data.data,
          avatar: data.data.avatar,
        };
        setAuthSafely(updatedAuth);
      }
      return data.data;
    } catch (err) {
      // Error is already handled in fetchWithAuth
      return null;
    }
  }, [fetchWithAuth, auth, setAuthSafely]);

  const getTopTokensByVolume = useCallback(
    async (timeframe = '24h', page = 1, perPage = 10) => {
      try {
        const data = await fetchWithAuth(
          `/tokens/top/volume?timeframe=${timeframe}&page=${page}&limit=${perPage}`
        );
        return data.data;
      } catch (err) {
        return null;
      }
    },
    [fetchWithAuth]
  );

  const getTopTokensByMcap = useCallback(
    async (page = 1, perPage = 10) => {
      try {
        const data = await fetchWithAuth(
          `/tokens/top/mcap?page=${page}&limit=${perPage}`
        );
        return data.data;
      } catch (err) {
        return null;
      }
    },
    [fetchWithAuth]
  );

  const getNounce = useCallback(
    async (walletAddress: string) => {
      try {
        const data = await fetchWithAuth('/auth/wallet/nonce', {
          method: 'POST',
          body: JSON.stringify({
            walletAddress,
          }),
        });
        return data.data;
      } catch (err) {
        return null;
      }
    },
    [fetchWithAuth]
  );

  const signMessage = useCallback(
    async (message: SignMessageData, walletName: string) => {
      try {
        const data = await fetchWithAuth('/auth/connect-wallet', {
          method: 'POST',
          body: JSON.stringify(message),
        });
        const newAuth = { ...data.data, walletName };
        setAuthSafely(newAuth);
        return data.data;
      } catch (err) {
        throw err;
      }
    },
    [fetchWithAuth, setAuthSafely]
  );

  const refreshToken = useCallback(async () => {
    if (!auth) {
      setError('No auth token found');
      return null;
    }

    try {
      const data = await fetchWithAuth('/auth/refresh-token', {
        method: 'POST',
        body: JSON.stringify({
          refreshToken: auth.refreshToken,
        }),
      });
      const newAuth = { ...auth, ...data.data };
      setAuthSafely(newAuth);
      return newAuth;
    } catch (err) {
      return null;
    }
  }, [fetchWithAuth, auth, setAuthSafely]);

  const connectX = useCallback(
    async (code: string, redirectUri: string, referralCode?: string) => {
      try {
        const data = await fetchSocialConnect('/auth/connect/x', {
          method: 'POST',
          body: JSON.stringify({
            code,
            redirectUri,
            referralCode,
          }),
        });
        setAuthSafely({ ...data.data, walletName: auth?.walletName });
        return data.data;
      } catch (err) {
        throw err;
      }
    },
    [fetchSocialConnect, setAuthSafely]
  );

  const connectGoogle = useCallback(
    async (idToken: string, referralCode?: string) => {
      try {
        const data = await fetchSocialConnect('/auth/connect/google', {
          method: 'POST',
          body: JSON.stringify({
            idToken,
            referralCode,
          }),
        });
        setAuthSafely({ ...data.data, walletName: auth?.walletName });
        return data.data;
      } catch (err) {
        throw err;
      }
    },
    [fetchSocialConnect, setAuthSafely]
  );

  const connectDiscord = useCallback(
    async (code: string, redirectUri: string, referralCode?: string) => {
      try {
        const data = await fetchSocialConnect('/auth/connect/discord', {
          method: 'POST',
          body: JSON.stringify({
            code,
            redirectUri,
            referralCode,
          }),
        });
        setAuthSafely({ ...data.data, walletName: auth?.walletName });
        return data.data;
      } catch (err) {
        throw err;
      }
    },
    [fetchSocialConnect, setAuthSafely]
  );

  const connectTelegram = useCallback(
    async (
      id: string,
      first_name: string,
      last_name: string,
      username: string,
      photo_url: string,
      auth_date: number,
      hash: string,
      referralCode?: string
    ) => {
      try {
        const requestData = {
          id: parseInt(id),
          first_name: first_name,
          last_name: last_name || undefined,
          username: username || undefined,
          photo_url: photo_url || undefined,
          auth_date: auth_date,
          hash: hash,
          referralCode: referralCode || undefined,
        };
        const data = await fetchSocialConnect('/auth/connect/telegram', {
          method: 'POST',
          body: JSON.stringify(requestData),
        });
        setAuthSafely({ ...data.data });
        return data.data;
      } catch (err) {
        throw err;
      }
    },
    [fetchSocialConnect, setAuthSafely]
  );

  const logout = useCallback(async () => {
    performLogout();
  }, [performLogout]);

  const getUserRefMeInfo = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWithAuth('/user-referral/me/info');
      return data.data;
    } catch (err: any) {
      setError(err.message || 'An error occurred');
      return null;
    } finally {
      setLoading(false);
    }
  }, [fetchWithAuth, auth]);

  const getUserRefMeReferredUsers = useCallback(
    async (page = 1, perPage = 10) => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchWithAuth(
          `/user-referral/me/referred-users?page=${page}&limit=${perPage}`
        );
        return data;
      } catch (err: any) {
        setError(err.message || 'An error occurred');
        return null;
      } finally {
        setLoading(false);
      }
    },
    [fetchWithAuth, auth]
  );

  const getUserRefHistory = useCallback(
    async (page = 1, perPage = 10) => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchWithAuth(
          `/user-referral/me/referral-history?page=${page}&limit=${perPage}`
        );
        return data;
      } catch (err: any) {
        setError(err.message || 'An error occurred');
        return null;
      } finally {
        setLoading(false);
      }
    },
    [fetchWithAuth, auth]
  );

  const getUserPointMeInfo = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWithAuth(`/user-point/me/info`);
      return data.data;
    } catch (error) {}
  }, [fetchWithAuth, auth]);

  const getUserQuests = useCallback(
    async (page?: number, perPage?: number) => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchWithAuth(
          `/user-quest?limit=${perPage}&page=${page}`
        );
        return data;
      } catch (error) {
        return null;
      } finally {
        setLoading(false);
      }
    },
    [fetchWithAuth, auth]
  );

  const getUserPointHistory = useCallback(
    async (page?: number, perPage?: number) => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchWithAuth(
          `/user-point/me/history?limit=${perPage}&page=${page}`
        );
        return data;
      } catch (error) {
        return null;
      } finally {
        setLoading(false);
      }
    },
    [fetchWithAuth, auth]
  );

  const getPortfolioToken = useCallback(
    async (address?: string) => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchWithAuth(
          `/portfolio/${
            address ||
            'addr1q9gykktajrgrmj5am8vwlhp65a72emlwn2s3e5cadkhe3vrfkfxs6yajls3ft0yn42uqlcnrq6qcn3l0lunkxy6aplgspxm6da'
          }`
        );
        return data.data;
      } catch (error) {
        return null;
      } finally {
        setLoading(false);
      }
    },
    [fetchWithAuth, auth]
  );

  const getTokenTradeHistory = useCallback(
    async (tokenId: string) => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchWithAuth(
          `/tokens/${tokenId}/trades?timeFrame=30d&limit=100&page=1`
        );
        return data.data;
      } catch (error) {
        return null;
      } finally {
        setLoading(false);
      }
    },
    [fetchWithAuth, auth]
  );
  const getPortfolioTransaction = useCallback(
    async (address?: string, page?: number, perPage?: number) => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchWithAuth(
          `/portfolio/${
            address ||
            'addr1q9gykktajrgrmj5am8vwlhp65a72emlwn2s3e5cadkhe3vrfkfxs6yajls3ft0yn42uqlcnrq6qcn3l0lunkxy6aplgspxm6da'
          }/transactions?page=1&count=20&order=desc`
        );
        return data;
      } catch (error) {
        return null;
      } finally {
        setLoading(false);
      }
    },
    [fetchWithAuth, auth]
  );

  const getTokenTopHolders = useCallback(
    async (tokenId: string) => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchWithAuth(
          `/tokens/${tokenId}/top-holders?limit=20&page=1`
        );
        return data.data;
      } catch (error) {
        return null;
      } finally {
        setLoading(false);
      }
    },
    [fetchWithAuth, auth]
  );

  const getTokenTopTraders = useCallback(
    async (tokenId: string) => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchWithAuth(
          `/tokens/${tokenId}/top-traders?timeFrame=1h&limit=10&page=1`
        );
        return data.data;
      } catch (error) {
        return null;
      } finally {
        setLoading(false);
      }
    },
    [fetchWithAuth, auth]
  );

  const getSwapPoolStats = useCallback(
    async (inputToken: string, outputToken: string) => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchWithAuth(
          `/swap/pool-stats/${inputToken}/${outputToken}`
        );
        return data.data;
      } catch (error) {
        return null;
      } finally {
        setLoading(false);
      }
    },
    [fetchWithAuth, auth]
  );

  const buildSwapRequest = useCallback(
    async (payload: SwapPayload) => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchWithAuth(`/swap/build`, {
          method: 'POST',
          body: JSON.stringify(payload),
        });
        return data.data;
      } catch (error) {
        return null;
      } finally {
        setLoading(false);
      }
    },
    [fetchWithAuth, auth]
  );

  const estimateSwap = useCallback(
    async (payload: EsitmateSwapPayload) => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchWithAuth(`/swap/estimate`, {
          method: 'POST',
          body: JSON.stringify(payload),
        });
        return data.data;
      } catch (error) {
        return null;
      } finally {
        setLoading(false);
      }
    },
    [fetchWithAuth, auth]
  );

  const submitSwapRequest = useCallback(
    async (payload: SubmitSwapPayload) => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchWithAuth(`/swap/submit`, {
          method: 'POST',
          body: JSON.stringify(payload),
        });
        return data.data;
      } catch (error) {
        return error;
      } finally {
        setLoading(false);
      }
    },
    [fetchWithAuth, auth]
  );

  const triggerSocialQuest = useCallback(
    async (id: number) => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchWithAuth(
          `/user-quest/trigger-social-quest/${id}`,
          {
            method: 'PUT',
          }
        );
        return data.data;
      } catch (error) {
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [fetchWithAuth, auth]
  );

  const verifySocialQuest = useCallback(
    async (id: number) => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchWithAuth(`/user-quest/verify/${id}`, {
          method: 'GET',
        });
        return data.data;
      } catch (error) {
        return null;
      } finally {
        setLoading(false);
      }
    },
    [fetchWithAuth, auth]
  );

  const startSocialQuest = useCallback(
    async (id: number) => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchWithAuth(
          `/user-quest/start-social-quest/${id}`,
          {
            method: 'PUT',
            body: JSON.stringify({
              questId: id,
            }),
          }
        );
        return data.data;
      } catch (error) {
        return null;
      } finally {
        setLoading(false);
      }
    },
    [fetchWithAuth, auth]
  );

  const triggerDailyLogin = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWithAuth(`/user-quest/check-in`, {
        method: 'PUT',
      });
      return data.data;
    } catch (error) {
      return null;
    } finally {
      setLoading(false);
    }
  }, [fetchWithAuth, auth]);

  const uploadAvatar = useCallback(
    async (file: FormData) => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchWithAuth(`/medias/image`, {
          method: 'POST',
          body: file,
        });
        return data.data;
      } catch (error) {
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [fetchWithAuth, auth]
  );

  const updateUserInfo = useCallback(
    async (payload: UpdateUserPayload) => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchWithAuth(`/user/profile`, {
          method: 'PUT',
          body: JSON.stringify(payload),
        });
        return data.data;
      } catch (error) {
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [fetchWithAuth, auth]
  );

  const getTokenDetailCore = useCallback(
    async (tokenId: string) => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchWithAuth(`/tokens/${tokenId}`);
        return data.data;
      } catch (error) {
        return null;
      } finally {
        setLoading(false);
      }
    },
    [fetchWithAuth, auth]
  );

  const getTokenOHLCV = useCallback(
    async (
      tokenId: string,
      interval: string,
      numIntervals: number,
      quote: QuoteType
    ) => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchWithAuth(
          `/tokens/${tokenId}/ohlcv/quote?interval=${interval}&numIntervals=${numIntervals}&quote=${quote}`
        );
        return data.data;
      } catch (error) {
        return null;
      } finally {
        setLoading(false);
      }
    },
    [fetchWithAuth, auth]
  );

  const getTokenStats = useCallback(
    async (tokenId: string) => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchWithAuth(`/tokens/${tokenId}/stats`);
        return data.data;
      } catch (error) {
        return null;
      } finally {
        setLoading(false);
      }
    },
    [fetchWithAuth, auth]
  );

  const getAchievements = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWithAuth(`/achievements`);
      return data.data;
    } catch (error) {
      return null;
    } finally {
      setLoading(false);
    }
  }, [fetchWithAuth, auth]);

  // Debug helper - expose auth state to window for debugging
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).debugSpidexAuth = {
        currentAuth: auth,
        isAuthenticated: !!auth,
        userId: auth?.userId,
        hasToken: !!auth?.accessToken,
        timestamp: new Date().toISOString(),
        forceLogout: () => {
          console.log('🔧 Debug: Forcing logout...');
          performLogout();
        },
        getAuthInfo: () => {
          console.log('🔍 Current auth state:', {
            auth,
            isAuthenticated: !!auth,
            userId: auth?.userId,
            hasToken: !!auth?.accessToken,
            timestamp: new Date().toISOString(),
          });
          return auth;
        },
      };
    }
  }, [auth, performLogout]);

  return {
    auth,
    loading,
    error,
    getMe,
    getTopTokensByVolume,
    getTopTokensByMcap,
    getNounce,
    signMessage,
    refreshToken,
    connectX,
    connectGoogle,
    connectDiscord,
    connectTelegram,
    fetchWithAuth,
    isAuthenticated,
    logout,
    getUserRefMeInfo,
    getUserRefMeReferredUsers,
    getUserRefHistory,
    getUserPointMeInfo,
    getUserQuests,
    getUserPointHistory,
    getPortfolioToken,
    getPortfolioTransaction,
    getTokenTradeHistory,
    getTokenTopHolders,
    getTokenTopTraders,
    getSwapPoolStats,
    buildSwapRequest,
    estimateSwap,
    submitSwapRequest,
    triggerSocialQuest,
    verifySocialQuest,
    startSocialQuest,
    triggerDailyLogin,
    uploadAvatar,
    updateUserInfo,
    getTokenDetailCore,
    getTokenOHLCV,
    getTokenStats,
    getAchievements,
    // Debug helpers
    debugAuthState: () => {
      console.log('🔍 Debug Auth State:', {
        auth,
        isAuthenticated: !!auth,
        userId: auth?.userId,
        hasToken: !!auth?.accessToken,
        timestamp: new Date().toISOString(),
      });
      return auth;
    },
  };
};

// export const useSpidexCore = () => {
//   const { auth } = useSpidexCoreContext();
//   return useSpidexCoreInternal(auth);
// };
