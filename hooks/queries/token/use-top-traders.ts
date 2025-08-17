'use client';

import { useSpidexCore } from '@/hooks/core/useSpidexCore';

import { useEffect } from 'react';
import { useState } from 'react';
import { TopTraderByToken } from './type';

export const useTopTraders = (address: string) => {
  const { getTokenTopTraders } = useSpidexCore();

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
