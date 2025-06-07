'use client';
import { useSpidexCoreContext } from '@/app/_contexts/spidex-core';
import { useEffect } from 'react';
import { useState } from 'react';
import { TokenTradeHistory } from './type';

export const useTradeHistory = (tokenId: string) => {
  const { getTokenTradeHistory } = useSpidexCoreContext();

  const [data, setData] = useState<TokenTradeHistory[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchTradeHistory();
  }, [tokenId]);

  const fetchTradeHistory = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getTokenTradeHistory(tokenId);
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
