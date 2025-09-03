import { QuoteType } from '@/app/(app)/token/[address]/_components/header/select-quote';
import {
  EsitmateSwapPayload,
  SubmitSwapPayload,
  SwapPayload,
  SwapRequestDexHunterPayload,
  SwapRequestMinswapPayload,
} from '@/services/dexhunter/types';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  selectAccessToken,
  selectAuthData,
  selectError,
  selectIsAuthenticated,
  selectIsLoading,
  selectRefreshToken,
} from '@/store/selectors/authSelectors';
import {
  clearError,
  logout as logoutAction,
  sessionExpired,
  setAuth,
  setError,
  setLoading,
} from '@/store/slices/authSlice';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef } from 'react';
import { UpdateUserPayload } from './type';
import { EEventStatus } from '../events/use-event';

// Global singleton to prevent multiple getMe() calls across different hook instances
const globalGetMeState = {
  isProcessing: false,
  lastProcessedToken: null as string | null,
  callCount: 0,
  pendingPromise: null as Promise<any> | null,
};

export interface SignMessageData {
  signature: string;
  address: string;
  publicKey: string;
  stakeAddress: string;
  referralCode: string;
  role: string;
  nonce: string;
  walletType: string;
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
  lastUsedWallet: string;
}

export const useSpidexCore = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const auth = useAppSelector(selectAuthData);
  const loading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectError);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const accessToken = useAppSelector(selectAccessToken);
  const refreshToken = useAppSelector(selectRefreshToken);

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
      // Check if the auth data has actually changed to prevent unnecessary updates
      if (newAuth && auth) {
        const currentAuthString = JSON.stringify({
          userId: auth.userId,
          accessToken: auth.accessToken,
          refreshToken: auth.refreshToken,
          user: auth.user,
          avatar: auth.avatar,
          walletName: auth.walletName,
        });
        const newAuthString = JSON.stringify({
          userId: newAuth.userId,
          accessToken: newAuth.accessToken,
          refreshToken: newAuth.refreshToken,
          user: newAuth.user,
          avatar: newAuth.avatar,
          walletName: newAuth.walletName,
        });

        if (currentAuthString === newAuthString) {
          return;
        }
      }
      dispatch(setAuth(newAuth));
    },
    [validateAuth, dispatch, auth]
  );

  // Logout function that can be used anywhere
  const performLogout = useCallback(() => {
    try {
      dispatch(logoutAction());
      router.push('/chat');
      console.log('🔄 performLogout: Redirected to /chat');
    } catch (error) {
      console.error('❌ performLogout: Error during logout process', error);
    }
  }, [router, auth, dispatch]);

  // Track if we've already fetched user data for this session
  const hasFetchedUserData = useRef(false);
  const lastAccessToken = useRef<string | null>(null);
  const getMeCallCount = useRef(0);

  useEffect(() => {
    const currentAccessToken = auth?.accessToken;

    // Only call getMe() when:
    // 1. We have an access token
    // 2. The access token has changed (new login)
    // 3. We haven't fetched user data for this token yet
    // 4. No other hook instance is already processing this token (GLOBAL CHECK)
    if (
      currentAccessToken &&
      currentAccessToken !== lastAccessToken.current &&
      !hasFetchedUserData.current &&
      !globalGetMeState.isProcessing &&
      currentAccessToken !== globalGetMeState.lastProcessedToken
    ) {
      // Mark as processing globally
      globalGetMeState.isProcessing = true;
      globalGetMeState.lastProcessedToken = currentAccessToken;

      lastAccessToken.current = currentAccessToken;
      hasFetchedUserData.current = true;
      getMe();
    }

    // Reset flag when user logs out
    if (!currentAccessToken) {
      hasFetchedUserData.current = false;
      lastAccessToken.current = null;
      // Reset global state on logout
      globalGetMeState.isProcessing = false;
      globalGetMeState.lastProcessedToken = null;
    }
  }, [accessToken]); // Use accessToken from selector instead of auth?.accessToken

  // Fetch manager to handle API requests
  const fetchWithAuth = useCallback(
    async (url: string, options: RequestInit = {}) => {
      dispatch(setLoading(true));
      dispatch(clearError());

      // Default headers with content type and authorization if token exists
      const headers = {
        ...(accessToken && {
          Authorization: `Bearer ${accessToken}`,
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

        // Handle 401 Unauthorized (expired token)
        if (response.status === 401 && refreshToken) {
          // Try to refresh the token
          const refreshResponse = await fetch(
            `${process.env.NEXT_PUBLIC_SPIDEX_CORE_API_URL}/auth/refresh-token`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ refreshToken }),
            }
          );

          if (refreshResponse.status === 200) {
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

            dispatch(setLoading(false));
            if (retryResponse.status !== 200) {
              throw new Error(`API error: ${retryResponse.status}`);
            }
            return await retryResponse.json();
          } else {
            dispatch(sessionExpired());
            performLogout();
            throw new Error('Session expired. Please login again.');
          }
        }

        // Handle 401 without refresh token - this should trigger session expiry
        if (response.status === 401) {
          dispatch(sessionExpired());
          performLogout();
          throw new Error('Authentication required. Please login again.');
        }

        dispatch(setLoading(false));
        const data = await response.json();
        if (response.status !== 200) {
          throw data?.message || 'An error occurred';
        }

        return data;
      } catch (err: any) {
        dispatch(setError(err.message || 'An error occurred'));
        dispatch(setLoading(false));
        console.error('Spidex API error:', err);
        throw err || 'An error occurred';
      }
    },
    [accessToken, refreshToken, auth, setAuthSafely, performLogout, dispatch]
  );

  // Special fetch function for social connections that doesn't trigger logout on 401
  const fetchSocialConnect = useCallback(
    async (url: string, options: RequestInit = {}) => {
      dispatch(setLoading(true));
      dispatch(clearError());

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

        dispatch(setLoading(false));
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
        dispatch(setError(err.message || 'An error occurred'));
        dispatch(setLoading(false));
        console.error('Social connection error:', err);
        throw err || 'An error occurred';
      }
    },
    [auth?.accessToken, dispatch]
  );

  const getMe = useCallback(async () => {
    getMeCallCount.current += 1;
    globalGetMeState.callCount += 1;

    // If there's already a pending promise, return it to avoid duplicate calls
    if (globalGetMeState.pendingPromise) {
      return globalGetMeState.pendingPromise;
    }

    try {
      // Store the promise globally to prevent duplicate calls
      const apiPromise = fetchWithAuth('/auth/me');
      globalGetMeState.pendingPromise = apiPromise;

      const data = await apiPromise;

      if (auth) {
        // Only update auth if user data has actually changed
        const currentUserData = JSON.stringify(auth.user);
        const newUserData = JSON.stringify(data.data);

        if (
          currentUserData !== newUserData ||
          auth.avatar !== data.data.avatar
        ) {
          const updatedAuth = {
            ...auth,
            user: data.data,
            avatar: data.data.avatar,
          };
          setAuthSafely(updatedAuth);
        }
      }
      return data.data;
    } catch (err) {
      // Error is already handled in fetchWithAuth
      return null;
    } finally {
      // Reset global state when done
      globalGetMeState.isProcessing = false;
      globalGetMeState.pendingPromise = null;
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
        return data.data as {
          nonce: string;
          challengeMessage: string;
          expiresAt: string;
        };
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

  const refreshAuthToken = useCallback(async () => {
    if (!auth) {
      dispatch(setError('No auth token found'));
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
  }, [fetchWithAuth, auth, setAuthSafely, dispatch]);

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
    } catch (error) { }
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

  const getPortfolioToken = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWithAuth(`/portfolio`);
      return data.data;
    } catch (error) {
      return null;
    } finally {
      setLoading(false);
    }
  }, [fetchWithAuth, auth]);

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
    async (page = 1, perPage = 20) => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchWithAuth(
          `/portfolio/transactions?page=${page}&count=${perPage}&order=desc`
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

  const buildSwapRequestDexHunter = useCallback(
    async (payload: SwapRequestDexHunterPayload) => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchWithAuth(`/swap/build/dexhunter`, {
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


  const buildSwapRequestMinswap = useCallback(
    async (payload: SwapRequestMinswapPayload) => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchWithAuth(`/swap/build/minswap`, {
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

  const getRankLeaderboard = useCallback(async (page = 1, perPage = 10, orderBy = 'point') => {
    try {
      const data = await fetchWithAuth(
        `/user-point/leaderboard?page=${page}&limit=${perPage}&orderBy=${orderBy}`
      );
      return data;
    } catch (error) {
      throw error;
    } finally {

    }
  }, [])

  const getUserRankLeaderboard = useCallback(async (orderBy: 'point' | 'referral' = 'point') => {
    try {
      const data = await fetchWithAuth(`/user-point/me/rank?orderBy=${orderBy}`);
      return data.data;
    } catch (error) {
      throw error;
    }
  }, [fetchWithAuth, auth]);

  const getEvents = useCallback(async (status: EEventStatus) => {
    try {
      const data = await fetchWithAuth(`/events?status=${status}`);
      return data.data;
    } catch (error) {
      throw error;
    }
  }, [fetchWithAuth, auth]);

  const getEventDetail = useCallback(async (id: number) => {
    try {
      const data = await fetchWithAuth(`/events/${id}`);
      return data.data;
    } catch (error) {
      throw error;
    }
  }, [fetchWithAuth, auth]);

  const getLeaderboardEvent = useCallback(async (id: number, limit = 50, offset = 0) => {
    try {
      const data = await fetchWithAuth(`/events/${id}/leaderboard?limit=${limit}&offset=${offset}`);
      return data.data;
    } catch (error) {
      throw error;
    }
  }, [fetchWithAuth, auth]);

  const getMyRankLeaderboardEvent = useCallback(async (id: number) => {
    try {
      const data = await fetchWithAuth(`/events/${id}/my-stats`);
      return data.data;
    } catch (error) {
      throw error;
    }
  }, [fetchWithAuth, auth]);


  return {
    auth,
    loading,
    error,
    getMe,
    getTopTokensByVolume,
    getTopTokensByMcap,
    getNounce,
    signMessage,
    refreshToken: refreshAuthToken,
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
    getRankLeaderboard,
    getUserRankLeaderboard,
    buildSwapRequestDexHunter,
    buildSwapRequestMinswap,
    getEvents,
    getEventDetail,
    getLeaderboardEvent,
    getMyRankLeaderboardEvent,
  };
};
