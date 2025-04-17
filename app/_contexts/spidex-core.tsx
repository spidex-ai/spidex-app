"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Auth, useSpidexCore } from "@/hooks/core/useSpidexCore";
import { SubmitSwapPayload, SwapPayload } from "@/services/dexhunter/types";
import { EsitmateSwapPayload } from "@/services/dexhunter/types";

interface SpidexCoreContextType {
  auth: Auth | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  getTopTokensByVolume: (
    timeframe?: string,
    page?: number,
    perPage?: number
  ) => Promise<any>;
  getTopTokensByMcap: (page?: number, perPage?: number) => Promise<any>;
  getNounce: () => Promise<any>;
  signMessage: (message: any) => Promise<any>;
  refreshToken: () => Promise<any>;
  connectX: (code: string, redirectUrl: string) => Promise<any>;
  connectGoogle: (idToken: string) => Promise<any>;
  fetchWithAuth: (url: string, options?: RequestInit) => Promise<any>;
  logout: () => Promise<void>;
  setLocalAuth: (auth: Auth) => void;
  getUserRefMeInfo: () => Promise<any>;
  getUserRefMeReferredUsers: (page?: number, perPage?: number) => Promise<any>;
  getUserRefHistory: (page?: number, perPage?: number) => Promise<any>;
  getUserPointMeInfo: () => Promise<any>;
  getUserQuests: () => Promise<any>;
  getUserPointHistory: () => Promise<any>;
  getPortfolioToken: (address?: string) => Promise<any>;
  getPortfolioTransaction: (address?: string) => Promise<any>;
  getTokenTradeHistory: (tokenId: string) => Promise<any>;
  getTokenTopHolders: (tokenId: string) => Promise<any>;
  getTokenTopTraders: (tokenId: string) => Promise<any>;
  getSwapPoolStats: (inputToken: string, outputToken: string) => Promise<any>;
  buildSwapRequest: (payload: SwapPayload) => Promise<any>;
  estimateSwap: (payload: EsitmateSwapPayload) => Promise<any>;
  submitSwapRequest: (payload: SubmitSwapPayload) => Promise<any>;
  triggerSocialQuest: (id: number) => Promise<any>;
  triggerDailyLogin: () => Promise<any>;
}

const STORAGE_KEY = "spidex_auth";

const SpidexCoreContext = createContext<SpidexCoreContextType | undefined>(
  undefined
);

export const SpidexCoreProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [localAuth, setLocalAuth] = useState<Auth | null>(() => {
    if (typeof window !== "undefined") {
      try {
        const savedAuth = localStorage.getItem(STORAGE_KEY);
        if (savedAuth) {
          return JSON.parse(savedAuth);
        }
      } catch (error) {
        console.error("Failed to parse saved auth data", error);
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    return null;
  });
  const spidexCore = useSpidexCore(localAuth);


  const handleSetLocalAuth = (auth: Auth) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(auth));
      setLocalAuth(auth);
    }
  };

  const handleLogout = async () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEY);
      setLocalAuth(null);
    }
    await spidexCore.logout();
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const savedAuth = localStorage.getItem(STORAGE_KEY);
        if (savedAuth) {
          const parsedAuth = JSON.parse(savedAuth);
          setLocalAuth(parsedAuth);
        }
      } catch (error) {
        console.error("Failed to parse saved auth data", error);
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  // When spidexCore.auth changes, update localStorage
  useEffect(() => {
    if (typeof window !== "undefined" && spidexCore.auth) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(spidexCore.auth));
      setLocalAuth(spidexCore.auth);
    }
  }, [spidexCore.auth]);

  
  const currentAuth = localAuth || spidexCore.auth;

  const isAuthenticated = Boolean(
    currentAuth?.accessToken && currentAuth?.userId
  );


  
  const contextValue: SpidexCoreContextType = {
    auth: currentAuth,
    loading: spidexCore.loading,
    error: spidexCore.error,
    isAuthenticated,
    getTopTokensByVolume: spidexCore.getTopTokensByVolume,
    getTopTokensByMcap: spidexCore.getTopTokensByMcap,
    getNounce: spidexCore.getNounce,
    signMessage: async (message) => {
      const result = await spidexCore.signMessage(message);
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
    connectX: async (code, redirectUrl) => {
      const result = await spidexCore.connectX(code, redirectUrl);
      if (result) {
        handleSetLocalAuth(result);
      }
      return result;
    },
    connectGoogle: async (idToken) => {
      const result = await spidexCore.connectGoogle(idToken);
      if (result) {
        handleSetLocalAuth(result);
      }
      return result;
    },
    fetchWithAuth: spidexCore.fetchWithAuth,
    logout: handleLogout,
    setLocalAuth: handleSetLocalAuth,
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
    triggerDailyLogin: spidexCore.triggerDailyLogin
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
      "useSpidexCoreContext must be used within a SpidexCoreProvider"
    );
  }
  return context;
};
