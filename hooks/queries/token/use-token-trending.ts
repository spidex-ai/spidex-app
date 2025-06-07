'use client';

import { useSpidexCore } from '@/hooks/core/useSpidexCore';
import { TopToken } from '@/services/taptools/types';
import { useEffect, useState } from 'react';

export const useTokenTrending = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<TopToken[]>([]);
  const { getTopTokensByVolume } = useSpidexCore();

  useEffect(() => {
    fetchTopTokenTreding({
      timeframe: '24h',
      page: 1,
      perPage: 15,
    });
  }, []);

  const fetchTopTokenTreding = async ({
    timeframe = '24h',
    page = 1,
    perPage = 12,
  }: {
    timeframe?: string;
    page?: number;
    perPage?: number;
  }) => {
    setIsLoading(true);
    try {
      const data = await getTopTokensByVolume(timeframe, page, perPage);
      if (data.length > 0) {
        setData(data);
      } else {
        setData([]);
        setError('No data found');
      }
    } catch (error) {
      setError(error as string);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    data,
  };
};

export const useTokenTopMcap = (page: number, perPage: number) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<TopToken[]>([]);
  const { getTopTokensByMcap } = useSpidexCore();

  useEffect(() => {
    fetchTopTokenMcap();
  }, []);

  const fetchTopTokenMcap = async () => {
    setIsLoading(true);
    try {
      const data = await getTopTokensByMcap(page, perPage);

      if (data.length > 0) {
        setData(data);
      } else {
        setData([]);
        setError('No data found');
      }
    } catch (error) {
      setError(error as string);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    data,
  };
};
