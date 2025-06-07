'use client';

import type { TokenTopHolders } from '@/hooks/queries/token/type';
import { useSpidexCoreContext } from '@/app/_contexts/spidex-core';
import { useEffect } from 'react';
import { useState } from 'react';

export const useTopHolders = (tokenId: string) => {
  const { getTokenTopHolders } = useSpidexCoreContext();

  const [data, setData] = useState<TokenTopHolders[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (tokenId) {
      fetchTopHolders();
    }
  }, [tokenId]);

  const fetchTopHolders = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getTokenTopHolders(tokenId);
      if (response && response.length > 0) {
        setData(response);
      } else {
        setData([]);
      }
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error };
};
