'use client';

import { useEffect, useState } from 'react';

import type { TokenStats } from '@/services/taptools/types';
import { useSpidexCore } from '@/hooks/core/useSpidexCore';

export const useTokenStats = (tokenId: string | undefined) => {
  const { getTokenStats } = useSpidexCore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<TokenStats | null>(null);

  useEffect(() => {
    if (tokenId) {
      fetchTokenStats();
    }
  }, [tokenId]);

  const fetchTokenStats = async () => {
    try {
      setIsLoading(true);
      const response = await getTokenStats(tokenId || '');
      setData(response);
    } catch (error) {
      setError(error as Error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    data,
    isLoading,
    error,
  };
};
