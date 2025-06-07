'use client';

import useSWR from 'swr';
import { CandleStickInterval } from './../../../services/hellomoon/types/candlestick';
import {
  TokenPriceCandlestick,
  CandlestickGranularity,
} from '@/services/hellomoon/types';
import { useTaptools } from '@/hooks/useTaptools';
import { useEffect, useState } from 'react';
import { useSpidexCoreContext } from '@/app/_contexts';
import { QuoteType } from '@/app/(app)/token/[address]/_components/header/select-quote';

export const usePriceChart = (
  mint: string,
  timeframe: CandlestickGranularity,
  numDays: number
) => {
  const { data, isLoading, error, mutate } = useSWR<TokenPriceCandlestick[]>(
    `/api/token/${mint}/prices/${timeframe}/${numDays}`,
    async () =>
      fetch(`/api/token/${mint}/prices`, {
        method: 'POST',
        body: JSON.stringify({
          timeframe,
          numDays,
        }),
      }).then(res => res.json()),
    {
      refreshInterval: 5000,
    }
  );

  return {
    data: data || [],
    isLoading,
    error,
    mutate,
  };
};

export const usePriceChartTaptools = (
  unit: string,
  interval: CandleStickInterval,
  numIntervals: number
) => {
  const { getTokenOHLCV } = useTaptools();

  const [data, setData] = useState<TokenPriceCandlestick[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (unit) {
      fetchDataChart();
    }
  }, [unit, interval, numIntervals]);

  const refetchDataChart = async () => {
    try {
      const data = await getTokenOHLCV(unit, interval, numIntervals);
      setData(data);
    } catch (error) {}
  };

  const fetchDataChart = async () => {
    try {
      setIsLoading(true);

      const data = await getTokenOHLCV(unit, interval, numIntervals);
      setData(data);
    } catch (error) {
      setData([]);
      console.error(error);
      setError(error as string);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    data,
    isLoading,
    error,
    fetchDataChart,
    refetchDataChart,
  };
};

export const usePriceChartCore = (
  unit: string,
  interval: CandleStickInterval,
  numIntervals: number,
  quote: QuoteType
) => {
  const { getTokenOHLCV } = useSpidexCoreContext();

  const [data, setData] = useState<TokenPriceCandlestick[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (unit) {
      fetchDataChart();
    }
  }, [unit, interval, numIntervals, quote]);

  const fetchDataChart = async () => {
    try {
      setIsLoading(true);
      const data = await getTokenOHLCV(unit, interval, numIntervals, quote);

      setData(data);
    } catch (error) {
      setData([]);
      console.error(error);
      setError(error as string);
    } finally {
      setIsLoading(false);
    }
  };

  const refetchDataChart = async () => {
    try {
      const data = await getTokenOHLCV(unit, interval, numIntervals, quote);
      if (data && data.length > 0) {
        setData(data);
      }
    } catch (error) {
      throw error;
    }
  };
  return { data, isLoading, error, fetchDataChart, refetchDataChart };
};
