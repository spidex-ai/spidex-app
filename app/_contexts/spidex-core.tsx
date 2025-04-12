"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useSpidexCore, Auth } from '@/hooks/core/useSpidexCore';

interface SpidexCoreContextType {
  auth: Auth | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  getTopTokensByVolume: (timeframe?: string, page?: number, perPage?: number) => Promise<any>;
  getTopTokensByMcap: (page?: number, perPage?: number) => Promise<any>;
  getNounce: () => Promise<any>;
  signMessage: (message: any) => Promise<any>;
  refreshToken: () => Promise<any>;
  connectX: (code: string, redirectUrl: string) => Promise<any>;
  connectGoogle: (idToken: string) => Promise<any>;
  fetchWithAuth: (url: string, options?: RequestInit) => Promise<any>;
  logout: () => Promise<void>;
  setLocalAuth: (auth: Auth) => void;
}

const STORAGE_KEY = 'spidex_auth';

const SpidexCoreContext = createContext<SpidexCoreContextType | undefined>(undefined);

export const SpidexCoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const spidexCore = useSpidexCore();
  const [localAuth, setLocalAuth] = useState<Auth | null>(null);
  
  // Custom setter for auth that also updates localStorage
  const handleSetLocalAuth = (auth: Auth) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(auth));
      setLocalAuth(auth);
    }
  };
  
  // Custom logout that clears localStorage
  const handleLogout = async () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
      setLocalAuth(null);
    }
    await spidexCore.logout();
  };
  
  // Initialize auth from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedAuth = localStorage.getItem(STORAGE_KEY);
        if (savedAuth) {
          const parsedAuth = JSON.parse(savedAuth);
          setLocalAuth(parsedAuth);
        }
      } catch (error) {
        console.error('Failed to parse saved auth data', error);
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);
  
  // When spidexCore.auth changes, update localStorage
  useEffect(() => {
    if (typeof window !== 'undefined' && spidexCore.auth) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(spidexCore.auth));
      setLocalAuth(spidexCore.auth);
    }
  }, [spidexCore.auth]);
  
  // Use either the local state or the spidexCore state
  const currentAuth = localAuth || spidexCore.auth;
  const isAuthenticated = Boolean(currentAuth?.accessToken && currentAuth?.userId);
  
  // The value object matches the interface exactly
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
    connectX: spidexCore.connectX,
    connectGoogle: spidexCore.connectGoogle,
    fetchWithAuth: spidexCore.fetchWithAuth,
    logout: handleLogout,
    setLocalAuth: handleSetLocalAuth
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
    throw new Error('useSpidexCoreContext must be used within a SpidexCoreProvider');
  }
  return context;
}; 