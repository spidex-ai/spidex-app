'use client';

import type { TopTraderByToken } from '@/services/birdeye/types';
import { useSpidexCoreContext } from '@/app/_contexts/spidex-core';
import { useEffect } from 'react';
import { useState } from 'react';

export const useTopTraders = (address: string) => {
  const { getTokenTopTraders } = useSpidexCoreContext();

  const [data, setData] = useState<TopTraderByToken[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchTopTraders();
  }, [address]);

  const fetchTopTraders = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getTokenTopTraders(address);
      setData(response);
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error };
};
