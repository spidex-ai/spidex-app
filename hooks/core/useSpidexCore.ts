import { useSpidexCoreContext } from "@/app/_contexts/spidex-core";
import { EsitmateSwapPayload, SubmitSwapPayload, SwapPayload } from "@/services/dexhunter/types";
import { STORAGE_KEY } from "@raydium-io/raydium-sdk-v2";
import { useCallback, useEffect, useMemo, useState } from "react";
export interface SignMessageData {
  signature: string;
  address: string;
  publicKey: string;
  role: string;
}

export interface Auth {
  accessToken: string;
  refreshToken: string;
  userId: number;
  user: UserSpidex;
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
  xLink: string | null;
  createdAt: Date;
}

export const useSpidexCore = (initialAuth: Auth | null = null) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [auth, setAuth] = useState<Auth | null>(initialAuth);
  const [error, setError] = useState<string | null>(null);

  // Cập nhật auth khi initialAuth thay đổi từ bên ngoài
  useEffect(() => {
    if (
      initialAuth &&
      (!auth || initialAuth.accessToken !== auth.accessToken)
    ) {
      setAuth(initialAuth);
    }
  }, [initialAuth]);

  useEffect(() => {
    console.log("Current auth in useSpidexCoreInternal:", auth);
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
        "Content-Type": "application/json",
        ...(auth?.accessToken && {
          Authorization: `Bearer ${auth.accessToken}`,
        }),
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
        if (response.status === 401 && auth?.refreshToken) {
          // Try to refresh the token
          const refreshResponse = await fetch(
            `${process.env.NEXT_PUBLIC_SPIDEX_CORE_API_URL}/auth/refresh-token`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ refreshToken: auth.refreshToken }),
            }
          );

          if (refreshResponse.ok) {
            const refreshData = await refreshResponse.json();
            const newAuth = { ...auth, ...refreshData.data };
            setAuth(newAuth);

            // Retry the original request with new access token
            const retryResponse = await fetch(
              `${process.env.NEXT_PUBLIC_SPIDEX_CORE_API_URL}${url}`,
              {
                ...options,
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${newAuth.accessToken}`,
                  ...options.headers,
                },
              }
            );

            setLoading(false);
            if (!retryResponse.ok) {
              throw new Error(`API error: ${retryResponse.status}`);
            }
            return await retryResponse.json();
          } else {
            logout();
            throw new Error("Session expired. Please login again.");
          }
        }

        setLoading(false);
        if (!response.ok) {
          return null;
          throw new Error(`API error: ${response.status}`);
        }

        return await response.json();
      } catch (err: any) {
        setError(err.message || "An error occurred");
        setLoading(false);
        console.error("Spidex API error:", err);
        throw err;
      }
    },
    [auth]
  );

  const getMe = useCallback(async () => {
    try {
      const data = await fetchWithAuth("/auth/me");
      if (auth) {
        setAuth({ ...auth, user: data.data });
      }
      return data.data;
    } catch (err) {
      // Error is already handled in fetchWithAuth
      return null;
    }
  }, [fetchWithAuth, auth]);

  const getTopTokensByVolume = useCallback(
    async (timeframe = "24h", page = 1, perPage = 10) => {
      try {
        const data = await fetchWithAuth(
          `/tokens/top/volume?timeframe=${timeframe}&page=${page}&perPage=${perPage}`
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
          `/tokens/top/mcap?page=${page}&perPage=${perPage}`
        );
        return data.data;
      } catch (err) {
        return null;
      }
    },
    [fetchWithAuth]
  );

  const getNounce = useCallback(async () => {
    try {
      const data = await fetchWithAuth("/auth/connect-wallet/sign-message");
      return data.data;
    } catch (err) {
      return null;
    }
  }, [fetchWithAuth]);

  const signMessage = useCallback(
    async (message: SignMessageData) => {
      try {
        const data = await fetchWithAuth("/auth/connect-wallet", {
          method: "POST",
          body: JSON.stringify(message),
        });
        setAuth(data.data);
        return data.data;
      } catch (err) {
        return null;
      }
    },
    [fetchWithAuth]
  );

  const refreshToken = useCallback(async () => {
    if (!auth) {
      setError("No auth token found");
      return null;
    }

    try {
      const data = await fetchWithAuth("/auth/refresh-token", {
        method: "POST",
        body: JSON.stringify({
          refreshToken: auth.refreshToken,
        }),
      });
      const newAuth = { ...auth, ...data.data };
      setAuth(newAuth);
      return newAuth;
    } catch (err) {
      return null;
    }
  }, [fetchWithAuth, auth]);

  const connectX = useCallback(
    async (code: string, redirectUri: string) => {
      try {
        const data = await fetchWithAuth("/auth/connect/x", {
          method: "POST",
          body: JSON.stringify({
            code,
            redirectUri,
          }),
        });
        setAuth(data.data);
        return data.data;
      } catch (err) {
        return null;
      }
    },
    [fetchWithAuth]
  );

  const connectGoogle = useCallback(
    async (idToken: string) => {
      try {
        const data = await fetchWithAuth("/auth/connect/google", {
          method: "POST",
          body: JSON.stringify({
            idToken,
          }),
        });
        setAuth(data.data);
        return data.data;
      } catch (err) {
        return null;
      }
    },
    [fetchWithAuth]
  );

  const logout = useCallback(async () => {
    setAuth(null);
  }, [fetchWithAuth]);

  const getUserRefMeInfo = useCallback(async () => {
    setLoading(true);
    setError(null);
    console.log("auth:::", auth);
    console.log("auth?.accessToken:::", auth?.accessToken);
    try {
      const data = await fetchWithAuth("/user-referral/me/info");
      return data.data;
    } catch (err: any) {
      setError(err.message || "An error occurred");
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
        return data.data;
      } catch (err: any) {
        setError(err.message || "An error occurred");
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
        return data.data;
      } catch (err: any) {
        setError(err.message || "An error occurred");
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
    } catch (error) {

    }
  }, [fetchWithAuth, auth])

  const getUserQuests = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWithAuth("/user-quest?limit=10&page=1");
      return data.data;
    } catch (error) {
      return null;
    } finally {
      setLoading(false);
    }
  }, [fetchWithAuth, auth]);

  const getUserPointHistory = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWithAuth("/user-point/me/history?limit=10&page=1");
      return data.data;
    } catch (error) {
      return null;
    } finally {
      setLoading(false);
    }
  }, [fetchWithAuth, auth]);

  const getPortfolioToken = useCallback(async (address?: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWithAuth(`/portfolio/${address || 'addr1q9gykktajrgrmj5am8vwlhp65a72emlwn2s3e5cadkhe3vrfkfxs6yajls3ft0yn42uqlcnrq6qcn3l0lunkxy6aplgspxm6da'}`);
      return data.data;
    } catch (error) { 
      return null;
    } finally {
      setLoading(false);
    }
  }, [fetchWithAuth, auth]);


  const getPortfolioTransaction = useCallback(async (address?: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWithAuth(`/portfolio/${address || 'addr1q9gykktajrgrmj5am8vwlhp65a72emlwn2s3e5cadkhe3vrfkfxs6yajls3ft0yn42uqlcnrq6qcn3l0lunkxy6aplgspxm6da'}/transactions?page=1&count=20&order=desc`);
      return data.data;
    } catch (error) {
      return null;
    } finally {
      setLoading(false);
    }
  }, [fetchWithAuth, auth]); 

  const getTokenTradeHistory = useCallback(async (tokenId: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWithAuth(`/tokens/${tokenId}/trades?timeFrame=1h`);
      return data.data;
    } catch (error) {
      return null;
    } finally {
      setLoading(false);
    }
  }, [fetchWithAuth, auth]);

  const getTokenTopHolders = useCallback(async (tokenId: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWithAuth(`/tokens/${tokenId}/top-holders?limit=10&page=1`);
      return data.data;
    } catch (error) {
      return null;
    } finally {
      setLoading(false);
    }
  }, [fetchWithAuth, auth]);

  const getTokenTopTraders = useCallback(async (tokenId: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWithAuth(`/tokens/${tokenId}/top-traders?timeFrame=1h&limit=10&page=1`);
      return data.data;
    } catch (error) {
      return null;
    } finally {
      setLoading(false);
    }
  }, [fetchWithAuth, auth]);

  const getSwapPoolStats = useCallback(async (inputToken: string, outputToken: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWithAuth(`/swap/pool-stats/${inputToken}/${outputToken}`);
      return data.data;
    } catch (error) {
      return null;
    } finally {
      setLoading(false);
    }
  }, [fetchWithAuth, auth]);

  const buildSwapRequest = useCallback(async (payload: SwapPayload) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWithAuth(`/swap/build`, {
        method: "POST",
        body: JSON.stringify(payload)
      });
      return data.data;
    } catch (error) { 
      return null;
    } finally {
      setLoading(false);
    }
  }, [fetchWithAuth, auth]);

  const estimateSwap = useCallback(async (payload: EsitmateSwapPayload) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWithAuth(`/swap/estimate`, {
        method: "POST", 
        body: JSON.stringify(payload)
      });
      return data.data;
    } catch (error) {
      return null;
    } finally {
      setLoading(false); 
    }
  }, [fetchWithAuth, auth]);

  const submitSwapRequest = useCallback(async (payload: SubmitSwapPayload) => {
    setLoading(true);
    setError(null);
    try { 
      const data = await fetchWithAuth(`/swap/submit`, {
        method: "POST",
        body: JSON.stringify(payload)
      });
      return data.data;
    } catch (error) {
      return error;
    } finally {
      setLoading(false);
    }
  }, [fetchWithAuth, auth]);

  const triggerSocialQuest = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWithAuth(`/user-quest/trigger-social-quest/${id}`, {
        method: "PUT",
      });
      return data.data;
    } catch (error) {
      return null;
    } finally {
      setLoading(false);
    }
  }, [fetchWithAuth, auth]);

  return {
    auth,
    loading,
    error,
    getTopTokensByVolume,
    getTopTokensByMcap,
    getNounce,
    signMessage,
    refreshToken,
    connectX,
    connectGoogle,
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
    triggerSocialQuest
  };
};

// export const useSpidexCore = () => {
//   const { auth } = useSpidexCoreContext();
//   return useSpidexCoreInternal(auth);
// };
