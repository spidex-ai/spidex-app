'use client';

import { useState } from 'react';

import { useSpidexCoreContext } from '@/app/_contexts';
import { useIsTokenSaved } from './use-is-token-saved';
import { useSavedTokens } from './use-saved-tokens';

export const useSaveToken = (address: string) => {
  const { auth } = useSpidexCoreContext();

  const { mutate: mutateSavedTokens } = useSavedTokens();

  const {
    mutate: mutateIsTokenSaved,
    isLoading,
    data: isTokenSaved,
  } = useIsTokenSaved(address);

  const [isUpdating, setIsUpdating] = useState(false);

  const makeTokenRequest = async (method: 'POST' | 'DELETE') => {
    console.log("🚀 ~ useSaveToken ~ address:", address)
    // Check token saved state matches intended action
    if (
      (method === 'POST' && isTokenSaved) ||
      (method === 'DELETE' && !isTokenSaved)
    ) {
      return;
    }

    setIsUpdating(true);

    try {
      const accessToken = auth?.accessToken;
      if (!accessToken) {
        throw new Error('Not authenticated');
      }

      const res = await fetch(`/api/saved-tokens/${address}`, {
        method,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }).then(res => res.json());
      if (!res) {
        throw new Error('Failed to save token');
      }

      mutateSavedTokens();
      mutateIsTokenSaved();
    } catch (error) {
      console.log("🚀 ~ makeTokenRequest ~ error:", error)
      throw error;
    } finally {
      setIsUpdating(false);
    }
  };

  const saveToken = () => makeTokenRequest('POST');
  const deleteToken = () => makeTokenRequest('DELETE');

  return {
    saveToken,
    deleteToken,
    isLoading,
    isUpdating,
    isTokenSaved,
  };
};
